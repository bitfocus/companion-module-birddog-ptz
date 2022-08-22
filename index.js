const instance_skel = require('../../instance_skel')
const actions = require('./actions')
const presets = require('./presets')
const { updateVariableDefinitions, updateVariables } = require('./variables')
const { initFeedbacks } = require('./feedbacks')
const upgradeScripts = require('./upgrades')
const { addStringToBinary, strToPQRS, getModelActions, getModelQueries } = require('./utils')
const VISCA = require('./constants')
const CHOICES = require('./choices.js')
var { MODEL_QUERIES, MODEL_SPECS } = require('./models.js')

const udp = require('../../udp')
const fetch = require('node-fetch')
const WebSocket = require('ws')

let debug
let log

class instance extends instance_skel {
	constructor(system, id, config) {
		super(system, id, config)

		Object.assign(this, {
			...actions,
			...presets,
		})

		this.updateVariableDefinitions = updateVariableDefinitions
		this.updateVariables = updateVariables
		this.addStringToBinary = addStringToBinary
		this.strToPQRS = strToPQRS

		// Keep track of setInterval
		this.timers = {
			pollCameraConfig: null, // ID of setInterval for Camera Config polling
			pollCameraStatus: null, // ID of setInterval for Camera Status polling
		}
	}

	// Make sure to NOT commit this line uncommented
	//static DEVELOPER_forceStartupUpgradeScript = 2

	static GetUpgradeScripts() {
		return [upgradeScripts.choicesUpgrade, upgradeScripts.autoDetectDefault, upgradeScripts.colorTempChange]
	}

	config_fields() {
		return [
			{
				type: 'text',
				id: 'info',
				width: 12,
				label: 'Information',
				value: 'This module controls BirdDog PTZ Cameras.',
			},
			{
				type: 'textinput',
				id: 'host',
				label: 'Device IP',
				width: 6,
				regex: this.REGEX_IP,
			},
			{
				type: 'dropdown',
				id: 'model',
				label: 'BirdDog Model',
				default: 'Auto',
				choices: CHOICES.CAMERAS,
			},
		]
	}

	updateConfig(config) {
		this.config = config

		this.status(this.STATUS_WARNING, 'Connecting')

		if (this.config.host !== undefined) {
			this.debug('----Config Model Choice:- ' + this.config.model)
			this.getCameraModel()
		} else {
			this.status(
				this.STATUS_ERROR,
				'Unable to connect, please enter an IP address for your camera in the module settings'
			)
		}
	}

	destroy() {
		// Clear open connections
		if (this.udp !== undefined) {
			this.udp.destroy()
		}

		if (this.ws !== undefined) {
			this.ws.close(1000)
			delete this.ws
		}

		// Clear polling timers
		if (this.timers.pollCameraStatus !== undefined) {
			clearInterval(this.timers.pollCameraStatus)
		}
		if (this.timers.pollCameraConfig) {
			clearInterval(this.timers.pollCameraConfig)
			this.timers.pollCameraConfig = null
		}

		if (this.timers.ws_reconnect) {
			clearInterval(this.timers.ws_reconnect)
		}

		debug('destroy', this.id)
	}

	init() {
		debug = this.debug
		log = this.log

		this.status(this.STATUS_WARNING, 'Connecting')

		this.port = 52381 // Visca port

		// Get Initial Camera Info
		this.getCameraModel()
	}

	initVariables() {
		this.updateVariableDefinitions()
	}

	initFeedbacks() {
		const feedbacks = initFeedbacks.bind(this)()
		this.setFeedbackDefinitions(feedbacks)
	}

	initPresets(updates) {
		this.setPresetDefinitions(this.getPresets())
	}

	actions(system) {
		this.setActions(this.getActions())
	}

	action(action) {
		let opt = action.options
		let cmd = ''
		let fb = ''

		let MODEL_ACTIONS = getModelActions(MODEL_SPECS, this.camera.firmware.major, this.camera.model)

		let panSpeed = this.camera?.panSpeed ? this.camera.PanSpeed : 11
		let tiltSpeed = this.camera?.tiltSpeed ? this.camera.tiltSpeed : 9
		let zoomSpeed = this.camera?.zoomSpeed ? this.camera.zoomSpeed : 4
		let preset_speed = this.camera?.preset_speed ? this.camera.preset_speed : 11
		let gainLimit
		let newValue
		let body = {}

		switch (action.action) {
			// General Camera Actions

			case 'standby':
				switch (opt.val) {
					case 'on':
						cmd = VISCA.MSG_CAM + VISCA.CAM_POWER + VISCA.DATA_ONVAL + VISCA.END_MSG
						break
					case 'standby':
						cmd = VISCA.MSG_CAM + VISCA.CAM_POWER + VISCA.DATA_OFFVAL + VISCA.END_MSG
						break
				}
				this.sendVISCACommand(cmd)
				break

			case 'freeze':
				switch (opt.val) {
					case 'On':
						cmd = VISCA.MSG_CAM + VISCA.CAM_FREEZE + VISCA.DATA_ONVAL + VISCA.END_MSG
						break
					case 'Off':
						cmd = VISCA.MSG_CAM + VISCA.CAM_FREEZE + VISCA.DATA_OFFVAL + VISCA.END_MSG
						break
				}
				this.sendVISCACommand(cmd)
				break

			// Analog Audio Actions

			case 'analogAudioInGain':
				body = {
					AnalogAudioInGain: String(opt.val + 50), //Convert action range to API range
				}
				this.sendCommand('analogaudiosetup', 'POST', body)
				break

			case 'analogAudioOutGain':
				body = {
					AnalogAudioOutGain: String(opt.val + 50), //Convert action range to API range
				}
				this.sendCommand('analogaudiosetup', 'POST', body)
				break

			case 'analogAudioOutput':
				body = {
					AnalogAudiooutputselect: String(opt.val),
				}
				this.sendCommand('analogaudiosetup', 'POST', body)
				break

			// Video Output Interface Actions

			case 'video_output':
				body = {
					videooutput: String(opt.val),
				}
				this.sendCommand('videooutputinterface', 'POST', body)
				break

			// Encode Setup Actions

			case 'tally':
				body = {
					TallyMode: String(opt.val),
				}
				this.sendCommand('encodesetup', 'POST', body)
				break

			case 'bandwidth_mode':
				switch (opt.val) {
					case 'NDIManaged':
						body = {
							BandwidthMode: String(opt.val),
						}
						break
					case 'Manual':
						body = {
							BandwidthMode: String(opt.val),
							BandwidthSelect: String(opt.bandwidth),
						}
						break
				}
				this.sendCommand('encodesetup', 'POST', body)
				break

			case 'ndiAudio':
				body = {
					NDIAudio: String(opt.val),
				}
				this.sendCommand('encodesetup', 'POST', body)
				break

			case 'ndiGroupEnable':
				body = {
					NDIGroup: String(opt.val),
				}
				this.sendCommand('encodesetup', 'POST', body)
				break

			case 'screensaver_mode':
				body = {
					ScreenSaverMode: String(opt.val),
				}
				this.sendCommand('encodesetup', 'POST', body)
				break

			case 'stream_to_network':
				body = {
					StreamToNetwork: String(opt.val),
				}
				this.sendCommand('encodesetup', 'POST', body)
				break

			// Encode Transport Actions

			case 'transmit_method':
				body = {
					txpm: String(opt.val),
				}
				this.sendCommand('encodeTransport', 'POST', body)
				break

			case 'capture':
				this.sendCommand('capture?ChNum=1&status=Encode', 'GET')
				break

			// NDI Discovery Server Actions

			case 'ndi_discovery_server':
				body = {
					NDIDisServ: String(opt.val),
				}
				this.sendCommand('NDIDisServer', 'POST', body)
				break

			// PTZ Actions

			case 'pt':
				panSpeed = opt.override === true ? opt.panSpeed : panSpeed
				tiltSpeed = opt.override === true ? opt.tiltSpeed : tiltSpeed
				switch (opt.val) {
					case 'left':
						cmd =
							VISCA.MSG_OPERATION +
							VISCA.OP_PAN_DRIVE +
							String.fromCharCode(panSpeed) +
							String.fromCharCode(tiltSpeed) +
							VISCA.DATA_PANLEFT +
							VISCA.DATA_NOTILT +
							VISCA.END_MSG
						break
					case 'right':
						cmd =
							VISCA.MSG_OPERATION +
							VISCA.OP_PAN_DRIVE +
							String.fromCharCode(panSpeed) +
							String.fromCharCode(tiltSpeed) +
							VISCA.DATA_PANRIGHT +
							VISCA.DATA_NOTILT +
							VISCA.END_MSG
						break
					case 'up':
						cmd =
							VISCA.MSG_OPERATION +
							VISCA.OP_PAN_DRIVE +
							String.fromCharCode(panSpeed) +
							String.fromCharCode(tiltSpeed) +
							VISCA.DATA_NOPAN +
							VISCA.DATA_TILTUP +
							VISCA.END_MSG
						break
					case 'down':
						cmd =
							VISCA.MSG_OPERATION +
							VISCA.OP_PAN_DRIVE +
							String.fromCharCode(panSpeed) +
							String.fromCharCode(tiltSpeed) +
							VISCA.DATA_NOPAN +
							VISCA.DATA_TILTDOWN +
							VISCA.END_MSG
						break
					case 'up_left':
						cmd =
							VISCA.MSG_OPERATION +
							VISCA.OP_PAN_DRIVE +
							String.fromCharCode(panSpeed) +
							String.fromCharCode(tiltSpeed) +
							VISCA.DATA_PANLEFT +
							VISCA.DATA_TILTUP +
							VISCA.END_MSG
						break
					case 'up_right':
						cmd =
							VISCA.MSG_OPERATION +
							VISCA.OP_PAN_DRIVE +
							String.fromCharCode(panSpeed) +
							String.fromCharCode(tiltSpeed) +
							VISCA.DATA_PANRIGHT +
							VISCA.DATA_TILTUP +
							VISCA.END_MSG
						break
					case 'down_left':
						cmd =
							VISCA.MSG_OPERATION +
							VISCA.OP_PAN_DRIVE +
							String.fromCharCode(panSpeed) +
							String.fromCharCode(tiltSpeed) +
							VISCA.DATA_PANLEFT +
							VISCA.DATA_TILTDOWN +
							VISCA.END_MSG
						break
					case 'down_right':
						cmd =
							VISCA.MSG_OPERATION +
							VISCA.OP_PAN_DRIVE +
							String.fromCharCode(panSpeed) +
							String.fromCharCode(tiltSpeed) +
							VISCA.DATA_PANRIGHT +
							VISCA.DATA_TILTDOWN +
							VISCA.END_MSG
						break
					case 'stop':
						cmd =
							VISCA.MSG_OPERATION +
							VISCA.OP_PAN_DRIVE +
							String.fromCharCode(panSpeed) +
							String.fromCharCode(tiltSpeed) +
							VISCA.DATA_NOPAN +
							VISCA.DATA_NOTILT +
							VISCA.END_MSG
						break
					case 'home':
						cmd = VISCA.MSG_OPERATION + VISCA.OP_PAN_HOME + VISCA.END_MSG
						break
					case 'direct':
						cmd =
							VISCA.MSG_OPERATION +
							VISCA.OP_PAN_ABSOLUTE +
							String.fromCharCode(opt.panSpeed) +
							String.fromCharCode(opt.tiltSpeed) +
							this.strToPQRS(opt.posPan) +
							this.strToPQRS(opt.posTilt) +
							VISCA.END_MSG
						break
				}
				this.sendVISCACommand(cmd)
				break

			case 'panSpeed':
				switch (opt.type) {
					case 'up':
						newValue = panSpeed < MODEL_ACTIONS.panSpeed.range.max ? ++panSpeed : MODEL_ACTIONS.panSpeed.range.max
						break
					case 'down':
						newValue = panSpeed > MODEL_ACTIONS.panSpeed.range.min ? --panSpeed : MODEL_ACTIONS.panSpeed.range.min
						break
					case 'value':
						newValue = opt.value
						break
				}
				body = {
					PanSpeed: String(newValue),
				}
				this.sendCommand('birddogptzsetup', 'POST', body)
				break

			case 'preset':
				body = {
					Preset: String(opt.val),
				}
				this.sendCommand('birddogptzsetup', 'POST', body)
				break

			case 'preset_speed':
				switch (opt.type) {
					case 'up':
						newValue =
							preset_speed < MODEL_ACTIONS.preset_speed.range.max
								? ++preset_speed
								: MODEL_ACTIONS.preset_speed.range.max
						break
					case 'down':
						newValue =
							preset_speed > MODEL_ACTIONS.preset_speed.range.min
								? --preset_speed
								: MODEL_ACTIONS.preset_speed.range.min
						break
					case 'value':
						newValue = opt.value
						break
				}
				body = {
					PresetSpeed: String(newValue),
				}
				this.sendCommand('birddogptzsetup', 'POST', body)
				break

			case 'tiltSpeed':
				switch (opt.type) {
					case 'up':
						newValue = tiltSpeed < MODEL_ACTIONS.tiltSpeed.range.max ? ++tiltSpeed : MODEL_ACTIONS.tiltSpeed.range.max
						break
					case 'down':
						newValue = tiltSpeed > MODEL_ACTIONS.tiltSpeed.range.min ? --tiltSpeed : MODEL_ACTIONS.tiltSpeed.range.min
					case 'value':
						newValue = opt.value
						break
				}
				body = {
					TiltSpeed: String(newValue),
				}
				this.sendCommand('birddogptzsetup', 'POST', body)
				break

			case 'zoomSpeed':
				switch (opt.type) {
					case 'up':
						newValue = zoomSpeed < MODEL_ACTIONS.zoomSpeed.range.max ? ++zoomSpeed : MODEL_ACTIONS.zoomSpeed.range.max
						break
					case 'down':
						newValue = zoomSpeed > MODEL_ACTIONS.zoomSpeed.range.min ? --zoomSpeed : MODEL_ACTIONS.zoomSpeed.range.min
						break
					case 'value':
						newValue = opt.value
						break
				}
				body = {
					ZoomSpeed: String(newValue),
				}
				this.sendCommand('birddogptzsetup', 'POST', body)
				break

			case 'zoom':
				zoomSpeed = opt.override === true ? opt.speed : zoomSpeed
				switch (opt.val) {
					case 'in':
						cmd =
							VISCA.MSG_CAM +
							VISCA.CAM_ZOOM +
							this.addStringToBinary(VISCA.CMD_CAM_ZOOM_TELE_WITH_SPEED, zoomSpeed) +
							VISCA.END_MSG
						break
					case 'out':
						cmd =
							VISCA.MSG_CAM +
							VISCA.CAM_ZOOM +
							this.addStringToBinary(VISCA.CMD_CAM_ZOOM_WIDE_WITH_SPEED, zoomSpeed) +
							VISCA.END_MSG
						break
					case 'direct':
						cmd = VISCA.MSG_CAM + VISCA.CAM_ZOOM_DIRECT + this.strToPQRS(opt.posZoom) + VISCA.END_MSG
						break
					case 'stop':
						cmd = VISCA.MSG_CAM + VISCA.CAM_ZOOM + VISCA.CMD_CAM_ZOOM_STOP + VISCA.END_MSG
						break
				}
				this.sendVISCACommand(cmd)
				break

			case 'savePset':
				body = {
					Preset: String('Preset-' + opt.val),
				}
				this.sendCommand('save', 'POST', body)
				break

			case 'recallPset':
				body = {
					Preset: String('Preset-' + opt.val),
				}
				this.sendCommand('recall', 'POST', body)
				break

			// Focus Actions

			case 'focus':
				switch (opt.val) {
					case 'near':
						cmd = VISCA.MSG_CAM + VISCA.CAM_FOCUS + VISCA.CMD_CAM_FOCUS_NEAR + VISCA.END_MSG
						break
					case 'far':
						cmd = VISCA.MSG_CAM + VISCA.CAM_FOCUS + VISCA.CMD_CAM_FOCUS_FAR + VISCA.END_MSG
						break
					case 'stop':
						cmd = VISCA.MSG_CAM + VISCA.CAM_FOCUS + VISCA.CMD_CAM_FOCUS_STOP + VISCA.END_MSG
						break
					case 'trigger':
						cmd = VISCA.MSG_CAM + VISCA.CAM_FOCUS_TRIGGER + VISCA.CMD_CAM_FOCUS_TRIGGER_NOW + VISCA.END_MSG
						break
				}
				this.sendVISCACommand(cmd)
				break

			case 'focusM':
				switch (opt.val) {
					case 'Auto':
						cmd = VISCA.MSG_CAM + VISCA.CAM_FOCUS_AUTO + VISCA.DATA_ONVAL + VISCA.END_MSG
						break
					case 'Manual':
						cmd = VISCA.MSG_CAM + VISCA.CAM_FOCUS_AUTO + VISCA.DATA_OFFVAL + VISCA.END_MSG
						break
				}
				this.sendVISCACommand(cmd)
				break

			// Exposure Actions

			case 'ae_response':
				body = {
					AeResponse: String(opt.level),
				}
				this.sendCommand('birddogexpsetup', 'POST', body)
				break

			case 'backlight':
				body = {
					Backlight: String(opt.val),
				}
				this.sendCommand('birddogexpsetup', 'POST', body)
				break

			case 'bright_level':
				body = {
					BrightLevel: String(opt.val),
				}
				this.sendCommand('birddogexpsetup', 'POST', body)
				break

			case 'expComp':
				switch (opt.val) {
					case 'Off':
						body = {
							ExpCompEn: String(opt.val),
						}
						break
					case 'On':
						//Convert action range to API range for P100 & PF120
						let level =
							this.camera.model === 'P100' || this.camera.model === 'PF120' ? String(opt.level + 7) : String(opt.level)
						body = {
							ExpCompEn: String(opt.val),
							ExpCompLvl: String(level),
						}
						break
				}
				this.sendCommand('birddogexpsetup', 'POST', body)
				break

			case 'expM':
				body = {
					ExpMode: String(opt.val),
				}
				this.sendCommand('birddogexpsetup', 'POST', body)
				break

			case 'gain':
				let gain = this.camera?.gain ? this.camera.gain : MODEL_ACTIONS.gain.default
				gainLimit = this.camera?.gain_limit ? this.camera.gain_limit : MODEL_ACTIONS.gain.choices.length
				switch (opt.val) {
					case 'up':
						newValue = gain < gainLimit ? ++gain : gain
						break
					case 'down':
						newValue = gain > MODEL_ACTIONS.gain.choices[0]?.id ? --gain : gain
						break
					case 'value':
						newValue = parseFloat(opt.value) <= gainLimit ? opt.value : gainLimit
						break
				}
				body = {
					GainLevel: String(newValue),
				}
				this.sendCommand('birddogexpsetup', 'POST', body)
				break

			case 'gainLimit':
				gainLimit = this.camera?.gain_limit ? this.camera.gain_limit : MODEL_ACTIONS.gain_limit.range.default
				switch (opt.val) {
					case 'up':
						newValue = gainLimit < MODEL_ACTIONS.gain_limit.range.max ? ++gainLimit : gainLimit
						break
					case 'down':
						newValue = gainLimit > MODEL_ACTIONS.gain_limit.range.min ? --gainLimit : gainLimit
						break
					case 'value':
						newValue = opt.value
						break
				}
				body = {
					GainLimit: String(newValue),
				}
				this.sendCommand('birddogexpsetup', 'POST', body)
				break

			case 'gainPoint':
				body = {
					GainPoint: String(opt.val),
				}
				this.sendCommand('birddogexpsetup', 'POST', body)
				break

			case 'gainPointPosition':
				let gainPointPosition = this.camera?.gain_point_position
					? this.camera.gain_point_position
					: MODEL_ACTIONS.gain.default
				switch (opt.val) {
					case 'up':
						newValue =
							gainPointPosition < this.camera.expsetup.GainLimit ? ++gainPointPosition : this.camera.expsetup.GainLimit
						break
					case 'down':
						newValue = gainPointPosition > MODEL_ACTIONS.gain[0] ? --gainPointPosition : gainPointPosition
						break
					case 'value':
						newValue = opt.value
						break
				}
				body = {
					GainPointPosition: String(newValue),
				}
				this.sendCommand('birddogexpsetup', 'POST', body)
				break

			case 'highSensitivity':
				body = {
					HighSensitivity: String(opt.val),
				}
				this.sendCommand('birddogexpsetup', 'POST', body)
				break

			case 'iris':
				let iris = this.camera?.iris ? this.camera.iris : MODEL_ACTIONS.iris.default
				switch (opt.val) {
					case 'up':
						newValue =
							iris === MODEL_ACTIONS.iris.range.closed
								? MODEL_ACTIONS.iris.range.min
								: iris < MODEL_ACTIONS.iris.range.max
								? ++iris
								: MODEL_ACTIONS.iris.range.max
						break
					case 'down':
						newValue =
							iris === MODEL_ACTIONS.iris.range.min
								? MODEL_ACTIONS.iris.range.closed
								: iris > MODEL_ACTIONS.iris.range.min
								? --iris
								: MODEL_ACTIONS.iris.range.closed
						break
					case 'value':
						newValue = opt.value
						break
				}
				body = {
					IrisLevel: String(newValue),
				}
				this.sendCommand('birddogexpsetup', 'POST', body)
				break

			case 'shutter_control_overwrite':
				body = {
					ShutterControlOverwrite: String(opt.val),
				}
				this.sendCommand('birddogexpsetup', 'POST', body)
				break

			case 'shut':
				let shutter_speed = this.camera?.shutter_speed ? this.camera.shutter_speed : MODEL_ACTIONS.shutter_speed.default
				switch (opt.val) {
					case 'up':
						newValue =
							shutter_speed < MODEL_ACTIONS.shutter_speed.range.max
								? ++shutter_speed
								: MODEL_ACTIONS.shutter_speed.range.max
						break
					case 'down':
						newValue =
							shutter_speed > MODEL_ACTIONS.shutter_speed.range.min
								? --shutter_speed
								: MODEL_ACTIONS.shutter_speed.range.min
						break
					case 'value':
						newValue = opt.value
						break
				}
				body = {
					ShutterSpeed: String(newValue),
				}
				this.sendCommand('birddogexpsetup', 'POST', body)
				break

			case 'shutter_max_speed':
				let shutter_max_speed = this.camera?.shutter_max_speed
					? this.camera.shutter_max_speed
					: MODEL_ACTIONS.shutter_max_speed.range.default
				switch (opt.val) {
					case 'up':
						newValue =
							shutter_max_speed < MODEL_ACTIONS.shutter_max_speed.range.max
								? ++shutter_max_speed
								: MODEL_ACTIONS.shutter_max_speed.range.max
						break
					case 'down':
						newValue =
							shutter_max_speed > MODEL_ACTIONS.shutter_max_speed.range.min
								? --shutter_max_speed
								: MODEL_ACTIONS.shutter_max_speed.range.min
						break
					case 'value':
						newValue = opt.value
						break
				}
				body = {
					ShutterMaxSpeed: String(newValue),
				}
				this.sendCommand('birddogexpsetup', 'POST', body)
				break

			case 'shutter_min_speed':
				let shutter_min_speed = this.camera?.shutter_min_speed
					? this.camera.shutter_min_speed
					: MODEL_ACTIONS.shutter_min_speed.range.default
				switch (opt.val) {
					case 'up':
						newValue =
							shutter_min_speed < this.camera.expsetup.ShutterMaxSpeed
								? ++shutter_min_speed
								: this.camera.expsetup.ShutterMaxSpeed
						break
					case 'down':
						newValue =
							shutter_min_speed > MODEL_ACTIONS.shutter_min_speed.range.min
								? --shutter_min_speed
								: MODEL_ACTIONS.shutter_min_speed.range.min
						break
					case 'value':
						newValue = opt.value
						break
				}
				body = {
					ShutterMinSpeed: String(newValue),
				}
				this.sendCommand('birddogexpsetup', 'POST', body)
				break

			case 'shutter_speed_overwrite':
				body = {
					ShutterSpeedOverwrite: String(opt.val),
				}
				this.sendCommand('birddogexpsetup', 'POST', body)
				break

			case 'slow_shutter_en':
				body = {
					SlowShutterEn: String(opt.val),
				}
				this.sendCommand('birddogexpsetup', 'POST', body)
				break

			case 'slow_shutter_limit':
				let slow_shutter_limit = this.camera?.slow_shutter_limit
					? this.camera.slow_shutter_limit
					: MODEL_ACTIONS.slow_shutter_limit.range.default
				switch (opt.val) {
					case 'up':
						newValue =
							slow_shutter_limit < MODEL_ACTIONS.slow_shutter_limit.range.max
								? ++slow_shutter_limit
								: MODEL_ACTIONS.slow_shutter_limit.range.max
						break
					case 'down':
						newValue =
							slow_shutter_limit > MODEL_ACTIONS.slow_shutter_limit.range.min
								? --slow_shutter_limit
								: MODEL_ACTIONS.slow_shutter_limit.range.min
						break
					case 'value':
						newValue = opt.value
						break
				}
				body = {
					SlowShutterLimit: String(newValue),
				}
				this.sendCommand('birddogexpsetup', 'POST', body)
				break

			case 'spotlight':
				body = {
					Spotlight: String(opt.val),
				}
				this.sendCommand('birddogexpsetup', 'POST', body)
				break

			// White Balance Actions

			case 'bg':
				body = {
					BG: String(opt.val),
				}
				this.sendCommand('birddogwbsetup', 'POST', body)
				break

			case 'br':
				body = {
					BR: String(opt.val),
				}
				this.sendCommand('birddogwbsetup', 'POST', body)
				break

			case 'blue_gain':
				let blue_gain = this.camera?.blue_gain ? this.camera.blue_gain : MODEL_ACTIONS.blue_gain.range.default
				switch (opt.val) {
					case 'up':
						newValue = blue_gain < MODEL_ACTIONS.blue_gain.range.max ? ++blue_gain : blue_gain
						break
					case 'down':
						newValue = blue_gain > MODEL_ACTIONS.blue_gain.range.min ? --blue_gain : blue_gain
						break
					case 'value':
						newValue = opt.value
						break
				}
				body = {
					BlueGain: String(newValue),
				}
				this.sendCommand('birddogwbsetup', 'POST', body)
				break

			case 'color_temp':
				let color_temp = this.camera?.color_temp
					? this.camera.color_temp.slice(0, 2)
					: MODEL_ACTIONS.color_temp.range.default
				switch (opt.val) {
					case 'up':
						newValue = color_temp < MODEL_ACTIONS.color_temp.range.max ? ++color_temp : color_temp
						newValue = newValue + '00'
						break
					case 'down':
						newValue = color_temp > MODEL_ACTIONS.color_temp.range.min ? --color_temp : color_temp
						newValue + '00'
						break
					case 'value':
						newValue = opt.value
						break
				}
				body = {
					ColorTemp: String(newValue),
				}
				this.sendCommand('birddogwbsetup', 'POST', body)
				break

			case 'gb':
				body = {
					GB: String(opt.val),
				}
				this.sendCommand('birddogwbsetup', 'POST', body)
				break

			case 'gr':
				body = {
					GR: String(opt.val),
				}
				this.sendCommand('birddogwbsetup', 'POST', body)
				break

			case 'level':
				body = {
					Level: String(opt.val),
				}
				this.sendCommand('birddogwbsetup', 'POST', body)
				break

			case 'matrix':
				body = {
					Matrix: String(opt.val),
				}
				this.sendCommand('birddogwbsetup', 'POST', body)
				break

			case 'offset':
				body = {
					Offset: String(opt.val),
				}
				this.sendCommand('birddogwbsetup', 'POST', body)
				break

			case 'phase':
				body = {
					Phase: String(opt.val),
				}
				this.sendCommand('birddogwbsetup', 'POST', body)
				break

			case 'rb':
				body = {
					RB: String(opt.val),
				}
				this.sendCommand('birddogwbsetup', 'POST', body)
				break

			case 'rg':
				body = {
					RG: String(opt.val),
				}
				this.sendCommand('birddogwbsetup', 'POST', body)
				break

			case 'red_gain':
				let red_gain = this.camera?.red_gain ? this.camera.red_gain : MODEL_ACTIONS.red_gain.range.default
				switch (opt.val) {
					case 'up':
						newValue = red_gain < MODEL_ACTIONS.red_gain.range.max ? ++red_gain : red_gain
						break
					case 'down':
						newValue = red_gain > MODEL_ACTIONS.red_gain.range.min ? --red_gain : red_gain
						break
					case 'value':
						newValue = opt.value
						break
				}
				body = {
					RedGain: String(newValue),
				}
				this.sendCommand('birddogwbsetup', 'POST', body)
				break

			case 'select':
				body = {
					Select: String(opt.val),
				}
				this.sendCommand('birddogwbsetup', 'POST', body)
				break

			case 'speed':
				body = {
					Speed: String(opt.val),
				}
				this.sendCommand('birddogwbsetup', 'POST', body)
				break

			case 'wb_mode':
				body = {
					WbMode: String(opt.val),
				}
				this.sendCommand('birddogwbsetup', 'POST', body)
				break

			case 'wbOnePush':
				cmd = VISCA.MSG_CAM + VISCA.CAM_WB_TRIGGER + VISCA.CMD_CAM_WB_TRIGGER_NOW + VISCA.END_MSG
				this.sendVISCACommand(cmd)
				break

			// Picture Setup Actions

			case 'backlight_com':
				body = {
					BackLightCom: String(opt.val),
				}
				this.sendCommand('birddogpicsetup', 'POST', body)
				break

			case 'chroma_suppress':
				body = {
					ChromeSuppress: String(opt.val),
				}
				this.sendCommand('birddogpicsetup', 'POST', body)
				break

			case 'color':
				let color = this.camera?.color ? this.camera.color : MODEL_ACTIONS.color.range.default
				switch (opt.val) {
					case 'up':
						newValue = color < MODEL_ACTIONS.color.range.max ? ++color : color
						break
					case 'down':
						newValue = color > MODEL_ACTIONS.color.range.min ? --color : color
						break
					case 'value':
						newValue = opt.value
						break
				}
				body = {
					Color: String(newValue),
				}
				this.sendCommand('birddogpicsetup', 'POST', body)
				break

			case 'contrast':
				let contrast = this.camera?.contrast ? this.camera.contrast : MODEL_ACTIONS.contrast.range.default
				switch (opt.val) {
					case 'up':
						newValue = contrast < MODEL_ACTIONS.contrast.range.max ? ++contrast : contrast
						break
					case 'down':
						newValue = contrast > MODEL_ACTIONS.contrast.range.min ? --contrast : contrast
						break
					case 'value':
						newValue = opt.value
						break
				}
				body = {
					Contrast: String(newValue),
				}
				this.sendCommand('birddogpicsetup', 'POST', body)
				break

			case 'pictureEffect':
				body = {
					Effect: String(opt.val),
				}
				this.sendCommand('birddogpicsetup', 'POST', body)
				break

			case 'picFlip':
				body = {
					Flip: String(opt.val),
				}
				this.sendCommand('birddogpicsetup', 'POST', body)
				break

			case 'gamma':
				let gamma = this.camera?.gamma ? this.camera.gamma : MODEL_ACTIONS.gamma.range.default
				switch (opt.val) {
					case 'up':
						newValue = gamma < MODEL_ACTIONS.gamma.range.max ? ++gamma : gamma
						break
					case 'down':
						newValue = gamma > MODEL_ACTIONS.gamma.range.min ? --gamma : gamma
						break
					case 'value':
						newValue = opt.value
						break
				}
				body = {
					Gamma: String(newValue),
				}
				this.sendCommand('birddogpicsetup', 'POST', body)
				break

			case 'highlight_comp':
				body = {
					HighlightComp: String(opt.val),
				}
				this.sendCommand('birddogpicsetup', 'POST', body)
				break

			case 'highlight_comp_mask':
				let highlight_comp_mask = this.camera?.highlight_comp_mask
					? this.camera.highlight_comp_mask
					: MODEL_ACTIONS.highlight_comp_mask.range.default
				switch (opt.val) {
					case 'up':
						newValue =
							highlight_comp_mask < MODEL_ACTIONS.highlight_comp_mask.range.max
								? ++highlight_comp_mask
								: highlight_comp_mask
						break
					case 'down':
						newValue =
							highlight_comp_mask > MODEL_ACTIONS.highlight_comp_mask.range.min
								? --highlight_comp_mask
								: highlight_comp_mask
						break
					case 'value':
						newValue = opt.value
						break
				}
				body = {
					HighlightCompMask: String(newValue),
				}
				this.sendCommand('birddogpicsetup', 'POST', body)
				break

			case 'hue':
				let hue = this.camera?.hue ? this.camera.hue : MODEL_ACTIONS.hue.range.default
				switch (opt.val) {
					case 'up':
						newValue = hue < MODEL_ACTIONS.hue.range.max ? ++hue : hue
						break
					case 'down':
						newValue = hue > MODEL_ACTIONS.hue.range.min ? --hue : hue
						break
					case 'value':
						newValue = opt.value
						break
				}
				body = {
					Hue: String(newValue),
				}
				this.sendCommand('birddogpicsetup', 'POST', body)
				break

			case 'ir_cutfilter':
				body = {
					IRCutFilter: String(opt.val),
				}
				this.sendCommand('birddogpicsetup', 'POST', body)
				break

			case 'low_latency':
				body = {
					LowLatency: String(opt.val),
				}
				this.sendCommand('birddogpicsetup', 'POST', body)
				break

			case 'picMirror':
				body = {
					Mirror: String(opt.val),
				}
				this.sendCommand('birddogpicsetup', 'POST', body)
				break

			case 'nd_filter':
				let nd_filter = this.camera?.nd_filter ? this.camera.nd_filter : MODEL_ACTIONS.nd_filter.range.default
				switch (opt.val) {
					case 'up':
						newValue = nd_filter < MODEL_ACTIONS.nd_filter.range.max ? ++nd_filter : nd_filter
						break
					case 'down':
						newValue = nd_filter > MODEL_ACTIONS.nd_filter.range.min ? --nd_filter : nd_filter
						break
					case 'value':
						newValue = opt.value
						break
				}
				body = {
					NDFilter: String(newValue),
				}
				this.sendCommand('birddogpicsetup', 'POST', body)
				break

			case 'noise_reduction':
				body = {
					NoiseReduction: String(opt.val),
				}
				this.sendCommand('birddogpicsetup', 'POST', body)
				break

			case 'sharpness':
				let sharpness = this.camera?.sharpness ? this.camera.sharpness : MODEL_ACTIONS.sharpness.range.default
				switch (opt.val) {
					case 'up':
						newValue = sharpness < MODEL_ACTIONS.sharpness.range.max ? ++sharpness : sharpness
						break
					case 'down':
						newValue = sharpness > MODEL_ACTIONS.sharpness.range.min ? --sharpness : sharpness
						break
					case 'value':
						newValue = opt.value
						break
				}
				body = {
					Sharpness: String(newValue),
				}
				this.sendCommand('birddogpicsetup', 'POST', body)
				break

			case 'stabilizer':
				body = {
					Stabilizer: String(opt.val),
				}
				this.sendCommand('birddogpicsetup', 'POST', body)
				break

			case 'threed_nr':
				body = {
					ThreeDNR: String(opt.val),
				}
				this.sendCommand('birddogpicsetup', 'POST', body)
				break

			case 'twod_nr':
				body = {
					TWODNR: String(opt.val),
				}
				this.sendCommand('birddogpicsetup', 'POST', body)
				break

			case 'wide_dynamic_range':
				body = {
					WideDynamicRange: String(opt.val),
				}
				this.sendCommand('birddogpicsetup', 'POST', body)
				break

			// Color Matrix Actions

			case 'cm_blue_gain':
				let cm_blue_gain = this.camera?.cm_blue_gain
					? this.camera.cm_blue_gain
					: MODEL_ACTIONS.cm_blue_gain.range.default
				switch (opt.val) {
					case 'up':
						newValue = cm_blue_gain < MODEL_ACTIONS.cm_blue_gain.range.max ? ++cm_blue_gain : cm_blue_gain
						break
					case 'down':
						newValue = cm_blue_gain > MODEL_ACTIONS.cm_blue_gain.range.min ? --cm_blue_gain : cm_blue_gain
						break
					case 'value':
						newValue = opt.value
						break
				}
				body = {
					BlueGain: String(newValue),
				}
				this.sendCommand('birddogcmsetup', 'POST', body)
				break

			case 'cm_blue_hue':
				let cm_blue_hue = this.camera?.cm_blue_hue ? this.camera.cm_blue_hue : MODEL_ACTIONS.cm_blue_hue.range.default
				switch (opt.val) {
					case 'up':
						newValue = cm_blue_hue < MODEL_ACTIONS.cm_blue_hue.range.max ? ++cm_blue_hue : cm_blue_hue
						break
					case 'down':
						newValue = cm_blue_hue > MODEL_ACTIONS.cm_blue_hue.range.min ? --cm_blue_hue : cm_blue_hue
						break
					case 'value':
						newValue = opt.value
						break
				}
				body = {
					BlueHue: String(newValue),
				}
				this.sendCommand('birddogcmsetup', 'POST', body)
				break

			case 'cm_color_gain':
				let cm_color_gain = this.camera?.cm_color_gain
					? this.camera.cm_color_gain
					: MODEL_ACTIONS.cm_color_gain.range.default
				switch (opt.val) {
					case 'up':
						newValue = cm_color_gain < MODEL_ACTIONS.cm_color_gain.range.max ? ++cm_color_gain : cm_color_gain
						break
					case 'down':
						newValue = cm_color_gain > MODEL_ACTIONS.cm_color_gain.range.min ? --cm_color_gain : cm_color_gain
						break
					case 'value':
						newValue = opt.value
						break
				}
				body = {
					ColorGain: String(newValue),
				}
				this.sendCommand('birddogcmsetup', 'POST', body)
				break

			case 'cm_cyan_gain':
				let cm_cyan_gain = this.camera?.cm_cyan_gain
					? this.camera.cm_cyan_gain
					: MODEL_ACTIONS.cm_cyan_gain.range.default
				switch (opt.val) {
					case 'up':
						newValue = cm_cyan_gain < MODEL_ACTIONS.cm_cyan_gain.range.max ? ++cm_cyan_gain : cm_cyan_gain
						break
					case 'down':
						newValue = cm_cyan_gain > MODEL_ACTIONS.cm_cyan_gain.range.min ? --cm_cyan_gain : cm_cyan_gain
						break
					case 'value':
						newValue = opt.value
						break
				}
				body = {
					CyanGain: String(newValue),
				}
				this.sendCommand('birddogcmsetup', 'POST', body)
				break

			case 'cm_cyan_hue':
				let cm_cyan_hue = this.camera?.cm_cyan_hue ? this.camera.cm_cyan_hue : MODEL_ACTIONS.cm_cyan_hue.range.default
				switch (opt.val) {
					case 'up':
						newValue = cm_cyan_hue < MODEL_ACTIONS.cm_cyan_hue.range.max ? ++cm_cyan_hue : cm_cyan_hue
						break
					case 'down':
						newValue = cm_cyan_hue > MODEL_ACTIONS.cm_cyan_hue.range.min ? --cm_cyan_hue : cm_cyan_hue
						break
					case 'value':
						newValue = opt.value
						break
				}
				body = {
					CyanHue: String(newValue),
				}
				this.sendCommand('birddogcmsetup', 'POST', body)
				break

			case 'cm_green_gain':
				let cm_green_gain = this.camera?.cm_green_gain
					? this.camera.cm_green_gain
					: MODEL_ACTIONS.cm_green_gain.range.default
				switch (opt.val) {
					case 'up':
						newValue = cm_green_gain < MODEL_ACTIONS.cm_green_gain.range.max ? ++cm_green_gain : cm_green_gain
						break
					case 'down':
						newValue = cm_green_gain > MODEL_ACTIONS.cm_green_gain.range.min ? --cm_green_gain : cm_green_gain
						break
					case 'value':
						newValue = opt.value
						break
				}
				body = {
					GreenGain: String(newValue),
				}
				this.sendCommand('birddogcmsetup', 'POST', body)
				break

			case 'cm_green_hue':
				let cm_green_hue = this.camera?.cm_green_hue
					? this.camera.cm_green_hue
					: MODEL_ACTIONS.cm_green_hue.range.default
				switch (opt.val) {
					case 'up':
						newValue = cm_green_hue < MODEL_ACTIONS.cm_green_hue.range.max ? ++cm_green_hue : cm_green_hue
						break
					case 'down':
						newValue = cm_green_hue > MODEL_ACTIONS.cm_green_hue.range.min ? --cm_green_hue : cm_green_hue
						break
					case 'value':
						newValue = opt.value
						break
				}
				body = {
					GreenHue: String(newValue),
				}
				this.sendCommand('birddogcmsetup', 'POST', body)
				break

			case 'cm_hue_phase':
				let cm_hue_phase = this.camera?.cm_hue_phase
					? this.camera.cm_hue_phase
					: MODEL_ACTIONS.cm_hue_phase.range.default
				switch (opt.val) {
					case 'up':
						newValue = cm_hue_phase < MODEL_ACTIONS.cm_hue_phase.range.max ? ++cm_hue_phase : cm_hue_phase
						break
					case 'down':
						newValue = cm_hue_phase > MODEL_ACTIONS.cm_hue_phase.range.min ? --cm_hue_phase : cm_hue_phase
						break
					case 'value':
						newValue = opt.value
						break
				}
				body = {
					HuePhase: String(newValue),
				}
				this.sendCommand('birddogcmsetup', 'POST', body)
				break

			case 'cm_mag_gain':
				let cm_mag_gain = this.camera?.cm_mag_gain ? this.camera.cm_mag_gain : MODEL_ACTIONS.cm_mag_gain.range.default
				switch (opt.val) {
					case 'up':
						newValue = cm_mag_gain < MODEL_ACTIONS.cm_mag_gain.range.max ? ++cm_mag_gain : cm_mag_gain
						break
					case 'down':
						newValue = cm_mag_gain > MODEL_ACTIONS.cm_mag_gain.range.min ? --cm_mag_gain : cm_mag_gain
						break
					case 'value':
						newValue = opt.value
						break
				}
				body = {
					MagGain: String(newValue),
				}
				this.sendCommand('birddogcmsetup', 'POST', body)
				break

			case 'cm_mag_hue':
				let cm_mag_hue = this.camera?.cm_mag_hue ? this.camera.cm_mag_hue : MODEL_ACTIONS.cm_mag_hue.range.default
				switch (opt.val) {
					case 'up':
						newValue = cm_mag_hue < MODEL_ACTIONS.cm_mag_hue.range.max ? ++cm_mag_hue : cm_mag_hue
						break
					case 'down':
						newValue = cm_mag_hue > MODEL_ACTIONS.cm_mag_hue.range.min ? --cm_mag_hue : cm_mag_hue
						break
					case 'value':
						newValue = opt.value
						break
				}
				body = {
					MagHue: String(newValue),
				}
				this.sendCommand('birddogcmsetup', 'POST', body)
				break

			case 'cm_red_gain':
				let cm_red_gain = this.camera?.cm_red_gain ? this.camera.cm_red_gain : MODEL_ACTIONS.cm_red_gain.range.default
				switch (opt.val) {
					case 'up':
						newValue = cm_red_gain < MODEL_ACTIONS.cm_red_gain.range.max ? ++cm_red_gain : cm_red_gain
						break
					case 'down':
						newValue = cm_red_gain > MODEL_ACTIONS.cm_red_gain.range.min ? --cm_red_gain : cm_red_gain
						break
					case 'value':
						newValue = opt.value
						break
				}
				body = {
					RedGain: String(newValue),
				}
				this.sendCommand('birddogcmsetup', 'POST', body)
				break

			case 'cm_red_hue':
				let cm_red_hue = this.camera?.cm_red_hue ? this.camera.cm_red_hue : MODEL_ACTIONS.cm_red_hue.range.default
				switch (opt.val) {
					case 'up':
						newValue = cm_red_hue < MODEL_ACTIONS.cm_red_hue.range.max ? ++cm_red_hue : cm_red_hue
						break
					case 'down':
						newValue = cm_red_hue > MODEL_ACTIONS.cm_red_hue.range.min ? --cm_red_hue : cm_red_hue
						break
					case 'value':
						newValue = opt.value
						break
				}
				body = {
					RedHue: String(newValue),
				}
				this.sendCommand('birddogcmsetup', 'POST', body)
				break

			case 'cm_yellow_gain':
				let cm_yellow_gain = this.camera?.cm_yellow_gain
					? this.camera.cm_yellow_gain
					: MODEL_ACTIONS.cm_yellow_gain.range.default
				switch (opt.val) {
					case 'up':
						newValue = cm_yellow_gain < MODEL_ACTIONS.cm_yellow_gain.range.max ? ++cm_yellow_gain : cm_yellow_gain
						break
					case 'down':
						newValue = cm_yellow_gain > MODEL_ACTIONS.cm_yellow_gain.range.min ? --cm_yellow_gain : cm_yellow_gain
						break
					case 'value':
						newValue = opt.value
						break
				}
				body = {
					YellowGain: String(newValue),
				}
				this.sendCommand('birddogcmsetup', 'POST', body)
				break

			case 'cm_yellow_hue':
				let cm_yellow_hue = this.camera?.cm_yellow_hue
					? this.camera.cm_yellow_hue
					: MODEL_ACTIONS.cm_yellow_hue.range.default
				switch (opt.val) {
					case 'up':
						newValue = cm_yellow_hue < MODEL_ACTIONS.cm_yellow_hue.range.max ? ++cm_yellow_hue : cm_yellow_hue
						break
					case 'down':
						newValue = cm_yellow_hue > MODEL_ACTIONS.cm_yellow_hue.range.min ? --cm_yellow_hue : cm_yellow_hue
						break
					case 'value':
						newValue = opt.value
						break
				}
				body = {
					YellowHue: String(newValue),
				}
				this.sendCommand('birddogcmsetup', 'POST', body)
				break

			// Advanced Setup Actions

			case 'brightness':
				let brightness = this.camera?.brightness ? this.camera.brightness : MODEL_ACTIONS.brightness.range.default
				switch (opt.val) {
					case 'up':
						newValue = brightness < MODEL_ACTIONS.brightness.range.max ? ++brightness : brightness
						break
					case 'down':
						newValue = brightness > MODEL_ACTIONS.brightness.range.min ? --brightness : brightness
						break
					case 'value':
						newValue = opt.value
						break
				}
				body = {
					Brightness: String(newValue),
				}
				this.sendCommand('birddogadvancesetup', 'POST', body)
				break

			case 'brightness_comp':
				body = {
					BrightnessComp: String(opt.val),
				}
				this.sendCommand('birddogadvancesetup', 'POST', body)
				break

			case 'comp_level':
				body = {
					CompLevel: String(opt.val),
				}
				this.sendCommand('birddogadvancesetup', 'POST', body)
				break

			case 'gamma_offset':
				let gamma_offset = this.camera?.gamma_offset
					? this.camera.gamma_offset
					: MODEL_ACTIONS.gamma_offset.range.default
				switch (opt.val) {
					case 'up':
						newValue = gamma_offset < MODEL_ACTIONS.gamma_offset.range.max ? ++gamma_offset : gamma_offset
						break
					case 'down':
						newValue = gamma_offset > MODEL_ACTIONS.gamma_offset.range.min ? --gamma_offset : gamma_offset
						break
					case 'value':
						newValue = opt.value
						break
				}
				body = {
					GammaOffset: String(newValue),
				}
				this.sendCommand('birddogadvancesetup', 'POST', body)
				break

			case 'high_resolution':
				body = {
					HighResolution: String(opt.val),
				}
				this.sendCommand('birddogadvancesetup', 'POST', body)
				break

			case 'video_enhancement':
				body = {
					VideoEnhancement: String(opt.val),
				}
				this.sendCommand('birddogadvancesetup', 'POST', body)
				break

			// External Setup Actions

			case 'aux':
				body = {
					Aux: String(opt.val),
				}
				this.sendCommand('birddogexternalsetup', 'POST', body)
				break

			case 'rain_wiper':
				body = {
					VideoEnhancement: String(opt.val),
				}
				this.sendCommand('birddogexternalsetup', 'POST', body)
				break

			case 'v12vout':
				body = {
					VideoEnhancement: String(opt.val),
				}
				this.sendCommand('birddogexternalsetup', 'POST', body)
				break

			// Detail Setup Actions

			case 'bandwidth':
				body = {
					Bandwidth: String(opt.val),
				}
				this.sendCommand('birddogdetsetup', 'POST', body)
				break

			case 'bw_balance':
				body = {
					BwBandwidth: String(opt.val),
				}
				this.sendCommand('birddogdetsetup', 'POST', body)
				break

			case 'crispening':
				let crispening = this.camera?.crispening ? this.camera.crispening : MODEL_ACTIONS.crispening.range.default
				switch (opt.val) {
					case 'up':
						newValue = crispening < MODEL_ACTIONS.crispening.range.max ? ++crispening : crispening
						break
					case 'down':
						newValue = crispening > MODEL_ACTIONS.crispening.range.min ? --crispening : crispening
						break
					case 'value':
						newValue = opt.value
						break
				}
				body = {
					Crispening: String(newValue),
				}
				this.sendCommand('birddogdetsetup', 'POST', body)
				break

			case 'detail':
				body = {
					Detail: String(opt.val),
				}
				this.sendCommand('birddogdetsetup', 'POST', body)
				break

			case 'highlight_detail':
				let highlight_detail = this.camera?.highlight_detail
					? this.camera.highlight_detail
					: MODEL_ACTIONS.highlight_detail.range.default
				switch (opt.val) {
					case 'up':
						newValue =
							highlight_detail < MODEL_ACTIONS.highlight_detail.range.max ? ++highlight_detail : highlight_detail
						break
					case 'down':
						newValue =
							highlight_detail > MODEL_ACTIONS.highlight_detail.range.min ? --highlight_detail : highlight_detail
						break
					case 'value':
						newValue = opt.value
						break
				}
				body = {
					HighlightDetail: String(newValue),
				}
				this.sendCommand('birddogdetsetup', 'POST', body)
				break

			case 'hv_balance':
				let hv_balance = this.camera?.hv_balance ? this.camera.hv_balance : MODEL_ACTIONS.hv_balance.range.default
				switch (opt.val) {
					case 'up':
						newValue = hv_balance < MODEL_ACTIONS.hv_balance.range.max ? ++hv_balance : hv_balance
						break
					case 'down':
						newValue = hv_balance > MODEL_ACTIONS.hv_balance.range.min ? --hv_balance : hv_balance
						break
					case 'value':
						newValue = opt.value
						break
				}
				body = {
					HvBalance: String(newValue),
				}
				this.sendCommand('birddogdetsetup', 'POST', body)
				break

			case 'limit':
				let limit = this.camera?.limit ? this.camera.limit : MODEL_ACTIONS.limit.range.default
				switch (opt.val) {
					case 'up':
						newValue = limit < MODEL_ACTIONS.limit.range.max ? ++limit : limit
						break
					case 'down':
						newValue = limit > MODEL_ACTIONS.limit.range.min ? --limit : limit
						break
					case 'value':
						newValue = opt.value
						break
				}
				body = {
					Limit: String(newValue),
				}
				this.sendCommand('birddogdetsetup', 'POST', body)
				break

			case 'super_low':
				let super_low = this.camera?.super_low ? this.camera.super_low : MODEL_ACTIONS.super_low.range.default
				switch (opt.val) {
					case 'up':
						newValue = super_low < MODEL_ACTIONS.super_low.range.max ? ++super_low : super_low
						break
					case 'down':
						newValue = super_low > MODEL_ACTIONS.super_low.range.min ? --super_low : super_low
						break
					case 'value':
						newValue = opt.value
						break
				}
				body = {
					SuperLow: String(newValue),
				}
				this.sendCommand('birddogdetsetup', 'POST', body)
				break

			// Gamma Setup Actions

			case 'black_gamma_level':
				let black_gamma_level = this.camera?.black_gamma_level
					? this.camera.black_gamma_level
					: MODEL_ACTIONS.black_gamma_level.range.default
				switch (opt.val) {
					case 'up':
						newValue =
							black_gamma_level < MODEL_ACTIONS.black_gamma_level.range.max ? ++black_gamma_level : black_gamma_level
						break
					case 'down':
						newValue =
							black_gamma_level > MODEL_ACTIONS.black_gamma_level.range.max ? --black_gamma_level : black_gamma_level
						break
					case 'value':
						newValue = opt.value
						break
				}
				body = {
					BlackGammaLevel: String(newValue),
				}
				this.sendCommand('birddoggammasetup', 'POST', body)
				break

			case 'black_level':
				let black_level = this.camera?.black_level ? this.camera.black_level : MODEL_ACTIONS.black_level.range.default
				switch (opt.val) {
					case 'up':
						newValue = black_level < MODEL_ACTIONS.black_level.range.max ? ++black_level : black_level
						break
					case 'down':
						newValue = black_level > MODEL_ACTIONS.black_level.range.max ? --black_level : black_level
						break
					case 'value':
						newValue = opt.value
						break
				}
				body = {
					BlackLevel: String(newValue),
				}
				this.sendCommand('birddoggammasetup', 'POST', body)
				break

			case 'black_level_range':
				body = {
					BlackLevelRange: String(opt.val),
				}
				this.sendCommand('birddoggammasetup', 'POST', body)
				break

			case 'effect':
				let effect = this.camera?.effect ? this.camera.effect : MODEL_ACTIONS.effect.range.default
				switch (opt.val) {
					case 'up':
						newValue = effect < MODEL_ACTIONS.effect.range.max ? ++effect : effect
						break
					case 'down':
						newValue = effect > MODEL_ACTIONS.effect.range.max ? --effect : effect
						break
					case 'value':
						newValue = opt.value
						break
				}
				body = {
					Effect: String(newValue),
				}
				this.sendCommand('birddoggammasetup', 'POST', body)
				break

			case 'level':
				let level = this.camera?.level ? this.camera.level : MODEL_ACTIONS.level.range.default
				switch (opt.val) {
					case 'up':
						newValue = level < MODEL_ACTIONS.level.range.max ? ++level : level
						break
					case 'down':
						newValue = level > MODEL_ACTIONS.level.range.max ? --level : level
						break
					case 'value':
						newValue = opt.value
						break
				}
				body = {
					Level: String(newValue),
				}
				this.sendCommand('birddoggammasetup', 'POST', body)
				break

			case 'offset':
				let offset = this.camera?.offset ? this.camera.offset : MODEL_ACTIONS.offset.range.default
				switch (opt.val) {
					case 'up':
						newValue = offset < MODEL_ACTIONS.offset.range.max ? ++offset : offset
						break
					case 'down':
						newValue = offset > MODEL_ACTIONS.offset.range.max ? --offset : offset
						break
					case 'value':
						newValue = opt.value
						break
				}
				body = {
					Offset: String(newValue),
				}
				this.sendCommand('birddoggammasetup', 'POST', body)
				break

			case 'pattern':
				let pattern = this.camera?.pattern ? this.camera.pattern : MODEL_ACTIONS.pattern.range.default
				switch (opt.val) {
					case 'up':
						newValue = pattern < MODEL_ACTIONS.pattern.range.max ? ++pattern : pattern
						break
					case 'down':
						newValue = pattern > MODEL_ACTIONS.pattern.range.max ? --pattern : pattern
						break
					case 'value':
						newValue = opt.value
						break
				}
				body = {
					Pattern: String(newValue),
				}
				this.sendCommand('birddoggammasetup', 'POST', body)
				break

			case 'pattern_fine':
				let pattern_fine = this.camera?.pattern_fine
					? this.camera.pattern_fine
					: MODEL_ACTIONS.pattern_fine.range.default
				switch (opt.val) {
					case 'up':
						newValue = pattern_fine < MODEL_ACTIONS.pattern_fine.range.max ? ++pattern_fine : pattern_fine
						break
					case 'down':
						newValue = pattern_fine > MODEL_ACTIONS.pattern_fine.range.max ? --pattern_fine : pattern_fine
						break
					case 'value':
						newValue = opt.value
						break
				}
				body = {
					PatternFine: String(newValue),
				}
				this.sendCommand('birddoggammasetup', 'POST', body)
				break

			case 'settings':
				body = {
					Settings: String(opt.val),
				}
				this.sendCommand('birddoggammasetup', 'POST', body)
				break

			case 'visibility_enhancer':
				body = {
					VisibilityEnhancer: String(opt.val),
				}
				this.sendCommand('birddoggammasetup', 'POST', body)
				break

			// BirdDog Scope Actions

			case 'scope_size':
				body = {
					DoubleSizeEnable: String(opt.val),
				}
				this.sendCommand('birddogscope', 'POST', body)
				break

			case 'scope_gamma_gain':
				let scope_gamma_gain = this.camera?.scope_gamma_gain
					? this.camera.scope_gamma_gain
					: MODEL_ACTIONS.scope_gamma_gain.range.default
				switch (opt.val) {
					case 'up':
						newValue =
							scope_gamma_gain < MODEL_ACTIONS.scope_gamma_gain.range.max ? ++scope_gamma_gain : scope_gamma_gain
						break
					case 'down':
						newValue =
							scope_gamma_gain > MODEL_ACTIONS.scope_gamma_gain.range.max ? --scope_gamma_gain : scope_gamma_gain
						break
					case 'value':
						newValue = opt.value
						break
				}
				body = {
					GammaGain: String(newValue),
				}
				this.sendCommand('birddogscope', 'POST', body)
				break

			case 'scope_mode':
				body = {
					Mode: String(opt.val),
				}
				this.sendCommand('birddogscope', 'POST', body)
				break

			case 'scope_position':
				body = {
					Position: String(opt.val),
				}
				this.sendCommand('birddogscope', 'POST', body)
				break

			case 'scope_preview':
				body = {
					PreviewEnable: String(opt.val),
				}
				this.sendCommand('birddogscope', 'POST', body)
				break

			case 'scope_program':
				body = {
					ProgramEnable: String(opt.val),
				}
				this.sendCommand('birddogscope', 'POST', body)
				break

			case 'scope_transparency':
				body = {
					TransparencyEnable: String(opt.val),
				}
				this.sendCommand('birddogscope', 'POST', body)
				break

			// Other Actions

			case 'defog':
				switch (opt.val) {
					case '0':
						cmd = VISCA.MSG_CAM + '\x37\x03\xFF'
						break
					case '1':
						cmd = VISCA.MSG_CAM + '\x37\x01\xFF'
						break
					case '2':
						cmd = VISCA.MSG_CAM + '\x37\x02\xFF'
						break
					case '3':
						cmd = VISCA.MSG_CAM + '\x37\x03\xFF'
						break
				}
				this.sendVISCACommand(cmd)
				break

			case 'hrMode':
				switch (opt.val) {
					case 'On':
						cmd = VISCA.MSG_CAM + '\x52\x02\xFF'
						break
					case 'Off':
						cmd = VISCA.MSG_CAM + '\x52\x03\xFF'
						break
				}
				this.sendVISCACommand(cmd)
				break

			case 'custom':
				let hexData = opt.custom.replace(/\s+/g, '')
				let tempBuffer = Buffer.from(hexData, 'hex')
				cmd = tempBuffer.toString('binary')
				if ((tempBuffer[0] & 0xf0) === 0x80) {
					this.sendVISCACommand(cmd)
				} else {
					this.log('error', 'Error, command "' + opt.custom + '" does not start with 8')
				}
				break
		}
	}

	sendCommand(cmd, type, params) {
		let url = `http://${this.config.host}:8080/${cmd}`
		let options = {
			method: type,
			headers: { 'Content-Type': 'application/json' },
		}
		if (type == 'PUT' || type == 'POST') {
			options.body = params != undefined ? JSON.stringify(params) : null
		}

		fetch(url, options)
			.then((res) => {
				if (res.status == 200) {
					return res.json()
				}
			})
			.then((json) => {
				let data = json
				if (data && type == 'GET') {
					this.processData(decodeURI(url), data)
				} else if ((data && type == 'PUT') || type == 'POST') {
					if (decodeURI(url).match('/encodesetup')) {
						//Temp workaround since encodesetup is not in poll, update if changed
						this.sendCommand('encodesetup', 'GET')
					}
				} else {
					this.debug(`Command failed ${url}`)
				}
			})
			.catch((err) => {
				this.debug(err)
				let errorText = String(err)
				if (
					errorText.match('ECONNREFUSED') ||
					errorText.match('ENOTFOUND') ||
					errorText.match('EHOSTDOWN') ||
					errorText.match('ETIMEDOUT')
				) {
					if (this.currentStatus != 2) {
						this.status(this.STATUS_ERROR)
						this.log(
							'error',
							`Connection lost to ${this.camera?.HostName ? this.camera.HostName : 'BirdDog PTZ camera'}`
						)
					}
				}
			})
	}

	processData(cmd, data) {
		let changed
		switch (cmd.slice(cmd.lastIndexOf('/') + 1)) {
			case 'about':
				changed = this.storeState(data, 'about')
				this.camera.about = data
				break
			case 'analogaudiosetup':
				changed = this.storeState(data, 'analogaudiosetup')
				this.camera.audio = data
				break
			case 'devicesettings':
				changed = this.storeState(data, 'devicesettings')
				this.camera.devicesettings = data
				break
			case 'videooutputinterface':
				changed = this.storeState(data, 'videooutputinterface')
				this.camera.video = data
				break
			case 'encodesetup':
				changed = this.storeState(data, 'encodesetup')
				let match = data.VideoFormat.match(/\d+\D(\S*)/) // match the framerate
				if (this.camera?.shutter_table) {
					switch (match[1]) {
						// If the current stored framerate doesn't match the camera framerate, change the stored framerate and repopulate actions
						case '23.98':
						case '24':
							if (!(this.camera.shutter_table === '24')) {
								this.camera.shutter_table = '24'
								this.actions()
							}
							break
						case '25':
						case '50':
							if (!(this.camera.shutter_table === '50')) {
								this.camera.shutter_table = '50'
								this.actions()
							}
							break
						default:
							if (!(this.camera.shutter_table === '60')) {
								this.camera.shutter_table = '60'
								this.actions()
							}
							break
					}
				}
				if (this.camera?.framerate) {
					this.camera.framerate = match[1]
				}
				this.camera.encode = data
				break
			case 'encodetransport':
				changed = this.storeState(data, 'encodetransport')
				this.camera.transport = data
				break
			case 'NDIDisServer':
				changed = this.storeState(data, 'NDIDisServer')
				this.camera.ndiserver = data
				break
			case 'birddogptzsetup':
				changed = this.storeState(data, 'birddogptzsetup')
				this.camera.ptz = data
				break
			case 'birddogexpsetup':
				changed = this.storeState(data, 'birddogexpsetup')

				if (changed.includes('gain_limit')) {
					// rebuild actions as GainLimit has changed
					console.log('-----Gain Limit changed')
					this.actions()
				}

				if (changed.includes('shutter_max_speed')) {
					// rebuild actions as GainLimit has changed
					console.log('-----ShutterMaxSpeed changed')
					this.actions()
				}

				if (changed.includes('shutter_min_speed')) {
					// rebuild actions as GainLimit has changed
					console.log('-----ShutterMinSpeed changed')
					this.actions()
				}
				this.camera.expsetup = data
				break
			case 'birddogwbsetup':
				changed = this.storeState(data, 'birddogwbsetup')
				this.camera.wbsetup = data
				break
			case 'birddogpicsetup':
				changed = this.storeState(data, 'birddogpicsetup')
				this.camera.picsetup = data
				break
			case 'birddogcmsetup':
				changed = this.storeState(data, 'birddogcmsetup')
				this.camera.cmsetup = data
				break
			case 'birddogadvancesetup':
				changed = this.storeState(data, 'birddogadvancesetup')
				this.camera.advancesetup = data
				break
			case 'birddogexternalsetup':
				changed = this.storeState(data, 'birddogexternalsetup')
				this.camera.externalsetup = data
				break
			case 'birddogdetsetup':
				changed = this.storeState(data, 'birddogdetsetup')
				this.camera.detsetup = data
				break
			case 'birddoggammasetup':
				changed = this.storeState(data, 'birddoggammasetup')
				this.camera.gammasetup = data
				break
			case 'birddogscope':
				changed = this.storeState(data, 'birddogscope')
				this.camera.birddogscope = data
				break
		}
		this.updateVariables()
		this.checkFeedbacks()
	}

	sendVISCACommand(payload, counter) {
		let buf = Buffer.alloc(32)

		// 0x01 0x00 = VISCA Command
		buf[0] = 0x01
		buf[1] = 0x10

		this.packet_counter = (this.packet_counter + 1) % 0xffffffff

		buf.writeUInt16BE(payload.length, 2)
		buf.writeUInt32BE(this.packet_counter, 4)

		if (typeof payload == 'string') {
			buf.write(payload, 8, 'binary')
		} else if (typeof payload == 'object' && payload instanceof Buffer) {
			payload.copy(buf, 8)
		}
		if (typeof counter == 'string') {
			buf.write(counter, 7, 'binary')
		} else if (typeof counter == 'object' && counter instanceof Buffer) {
			counter.copy(buf, 7)
		}

		let newbuf = buf.slice(0, 8 + payload.length)
		this.debug('-----Sending VISCA message: ' + Buffer.from(newbuf, 'binary').toString('hex'))
		this.udp.send(newbuf)
	}

	incomingData(data) {
		this.debug('-----Incoming VISCA message: ' + Buffer.from(data, 'binary').toString('hex'))
		switch (data[7].toString(16)) {
			case '4a': // Query Standby status
				if (data[8] == 0x90 && data[9] == 0x50 && data[10] == 0x02 && data[11] == 0xff) {
					this.camera.standby = 'on'
				} else if (data[8] == 0x90 && data[9] == 0x50 && data[10] == 0x03 && data[11] == 0xff) {
					this.camera.standby = 'standby'
				}
				break
			case '5a': // Query Auto Focus mode
				if (data[8] == 0x90 && data[9] == 0x50 && data[10] == 0x02 && data[11] == 0xff) {
					this.camera.focusM = 'Auto'
				} else if (data[8] == 0x90 && data[9] == 0x50 && data[10] == 0x03 && data[11] == 0xff) {
					this.camera.focusM = 'Manual'
				}
				break
			case '5b': // Query Freeze Status
				if (data[8] == 0x90 && data[9] == 0x50 && data[10] == 0x02 && data[11] == 0xff) {
					this.camera.freeze = 'On'
				} else if (data[8] == 0x90 && data[9] == 0x50 && data[10] == 0x03 && data[11] == 0xff) {
					this.camera.freeze = 'Off'
				}
				break
			case '5c': // Query Zoom Position
				if (data[8] == 0x90 && data[9] == 0x50 && data[14] == 0xff) {
					this.camera.zoom_position =
						data[10].toString(16) + data[11].toString(16) + data[12].toString(16) + data[13].toString(16)
				}
				break
			case '5d': // Query Pan/Tilt Position
				if (data[8] == 0x90 && data[9] == 0x50 && data[18] == 0xff) {
					this.camera.pan_position =
						data[10].toString(16) + data[11].toString(16) + data[12].toString(16) + data[13].toString(16)
					this.camera.tilt_position =
						data[14].toString(16) + data[15].toString(16) + data[16].toString(16) + data[17].toString(16)
				}
				break
		}
		this.updateVariables()
		this.checkFeedbacks()
	}

	sendControlCommand(payload) {
		let buf = Buffer.alloc(32)

		// 0x01 0x00 = VISCA Command
		buf[0] = 0x02
		buf[1] = 0x00

		this.packet_counter = (this.packet_counter + 1) % 0xffffffff

		buf.writeUInt16BE(payload.length, 2)
		buf.writeUInt32BE(this.packet_counter, 4)

		if (typeof payload == 'string') {
			buf.write(payload, 8, 'binary')
		} else if (typeof payload == 'object' && payload instanceof Buffer) {
			payload.copy(buf, 8)
		}

		let newbuf = buf.slice(0, 8 + payload.length)

		this.udp.send(newbuf)
	}

	init_udp() {
		this.debug('----init udp')
		if (this.udp !== undefined) {
			this.udp.destroy()
			delete this.udp
		}
		if (this.timers.pollCameraStatus !== undefined) {
			clearInterval(this.timers.pollCameraStatus)
		}
		if (this.config.host !== undefined) {
			this.udp = new udp(this.config.host, this.port)

			// Reset sequence number
			this.sendControlCommand('\x01')
			this.packet_counter = 0

			this.startPolling()

			this.udp.on('status_change', (status, message) => {
				//this.status(status, message)
			})
			this.udp.on('data', (data) => {
				this.incomingData(data)
			})
			this.udp.on('error', (error) => {
				this.debug('----UDP Error: ' + error)
			})
			this.debug(this.udp.host, ':', this.port)
		}
	}

	init_ws_listener() {
		this.debug('----init webscoket')
		clearInterval(this.timers.ws_reconnect)

		if (this.ws !== undefined) {
			this.ws.close(1000)
			delete this.ws
		}

		this.ws = new WebSocket(`ws://${this.config.host}:6790/`)

		this.ws.on('open', () => {
			this.log('debug', `WebSocket connection opened to BirdDog PTZ camera`)
		})

		this.ws.on('close', (code) => {
			this.log('debug', `WebSocket Connection closed with code ${code}`)
			this.debug(`---- WebSocket Connection closed with code ${code}`)
			if (code !== 1000) {
				this.timers.ws_reconnect = setInterval(this.init_ws_listener.bind(this), 500)
			}
		})

		this.ws.on('message', (message) => {
			let data
			try {
				data = JSON.parse(message.toString())
				this.storeState(data, 'WebSocket')
			} catch (e) {
				this.debug('JSON Error:' + e)
			}
			this.debug('---- WebSocket received: ', data)
		})

		this.ws.on('error', (data) => {
			this.log('error', `WebSocket error: ${data}`)
		})
	}

	// Poll for BirdDog camera configuration/status
	startPolling() {
		//Immediately do the poll
		this.pollCameraConfig()
		this.pollCameraStatus()

		// Repeat the poll at set intervals
		this.timers.pollCameraConfig = setInterval(this.pollCameraConfig.bind(this), 10000) // No need to poll frequently
		this.timers.pollCameraStatus = setInterval(this.pollCameraStatus.bind(this), 3000) // This will be used to get status of the camera
	}

	stopPolling() {
		if (this.timers.pollCameraConfig) {
			clearInterval(this.timers.pollCameraConfig)
			this.timers.pollCameraConfig = null
		}
		if (this.timers.pollCameraStatus) {
			clearInterval(this.timers.pollCameraStatus)
			this.timers.pollCameraStatus = null
		}
	}

	// Get Camera configuration
	pollCameraConfig() {
		let MODEL_QRY = getModelQueries(MODEL_QUERIES, this.camera.model, this.camera.firmware.major)

		if (MODEL_QRY?.about) {
			this.sendCommand('about', 'GET')
		}
		if (MODEL_QRY?.encodesetup) {
			this.sendCommand('encodesetup', 'GET')
		}
		if (MODEL_QRY?.analogaudiosetup) {
			this.sendCommand('analogaudiosetup', 'GET')
		}
		if (MODEL_QRY?.devicesettings) {
			this.sendCommand('NDIDisServer', 'GET')
		}
		if (MODEL_QRY?.videooutputinterface) {
			this.sendCommand('videooutputinterface', 'GET')
		}
		if (MODEL_QRY?.encodetransport) {
			this.sendCommand('encodetransport', 'GET')
		}
		if (MODEL_QRY?.NDIDisServer) {
			this.sendCommand('NDIDisServer', 'GET')
		}
	}

	// Get Camera Status
	pollCameraStatus() {
		let MODEL_QRY = getModelQueries(MODEL_QUERIES, this.camera.model, this.camera.firmware.major)

		if (MODEL_QRY?.birddogptzsetup) {
			this.sendCommand('birddogptzsetup', 'GET')
		}
		if (MODEL_QRY?.birddogexpsetup) {
			this.sendCommand('birddogexpsetup', 'GET')
		}
		if (MODEL_QRY?.birddogwbsetup) {
			this.sendCommand('birddogwbsetup', 'GET')
		}
		if (MODEL_QRY?.birddogpicsetup) {
			this.sendCommand('birddogpicsetup', 'GET')
		}
		this.sendVISCACommand(VISCA.MSG_QRY + VISCA.CAM_POWER + VISCA.END_MSG, '\x4a') // Query Standby status
		this.sendVISCACommand(VISCA.MSG_QRY + VISCA.CAM_FOCUS_AUTO + VISCA.END_MSG, '\x5a') // Query Auto Focus Mode
		this.sendVISCACommand(VISCA.MSG_QRY + VISCA.CAM_FREEZE + VISCA.END_MSG, '\x5b') // Query Freeze
		this.sendVISCACommand(VISCA.MSG_QRY + VISCA.CAM_ZOOM_DIRECT + VISCA.END_MSG, '\x5c') // Query Zoom Position

		if (MODEL_QRY?.birddogcmsetup) {
			this.sendCommand('birddogcmsetup', 'GET')
		}
		if (MODEL_QRY?.birddogadvancesetup) {
			this.sendCommand('birddogadvancesetup', 'GET')
		}
		if (MODEL_QRY?.birddogexternalsetup) {
			this.sendCommand('birddogexternalsetup', 'GET')
		}
		if (MODEL_QRY?.birddogdetsetup) {
			this.sendCommand('birddogdetsetup', 'GET')
		}
		if (MODEL_QRY?.birddoggammasetup) {
			this.sendCommand('birddoggammasetup', 'GET')
		}
		if (MODEL_QRY?.birddogscope) {
			this.sendCommand('birddogscope', 'GET')
		}
		if (MODEL_QRY?.pt_pos) {
			this.sendVISCACommand(VISCA.MSG_QRY_OPERATION + VISCA.OP_PAN_POS + VISCA.END_MSG, '\x5d') // Query Pan/Tilt Position
		}

		this.debug('----Camera Setup for - ', this.camera.model)
		this.debug(this.camera)
	}

	getCameraModel() {
		if (this.config.model === 'Auto') {
			let url = `http://${this.config.host}:8080/version`
			let options = {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
			}
			fetch(url, options)
				.then((res) => {
					if (res.status == 200) {
						//this.debug(res)
						return res.text()
					}
				})
				.then((data) => {
					let model = data
					if (model) {
						model = model.replace(/BirdDog| |_/g, '')
						//this.debug('---- Model returned from call to "/version" is ', model, ' - now running checkCameraModel')
						//this.camera.model = this.checkCameraModel(model)
						this.getCameraFW(this.checkCameraModel(model))
					} else if (!model && this.currentStatus != 2) {
						this.log('error', 'Please upgrade your BirdDog camera to the latest LTS firmware to use this module')
						this.status(this.STATUS_ERROR)
						if (this.timers.pollCameraStatus !== undefined) {
							clearInterval(this.timers.pollCameraStatus)
						}
					}
				})
				.catch((err) => {
					this.debug(err)
					let errorText = String(err)
					if (
						errorText.match('ECONNREFUSED') ||
						errorText.match('ENOTFOUND') ||
						errorText.match('EHOSTDOWN') ||
						errorText.match('ETIMEDOUT')
					) {
						if (this.currentStatus != 2) {
							this.status(this.STATUS_ERROR)
							this.log('error', `Unable to connect to BirdDog PTZ Camera (Error: ${errorText?.split('reason:')[1]})`)
						}
					}
				})
		} else {
			//this.camera.model = this.config.model
			this.getCameraFW(this.config.model)
		}
	}

	getCameraFW(model) {
		let url = `http://${this.config.host}:8080/about`
		let options = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		}
		fetch(url, options)
			.then((res) => {
				if (res.status == 200) {
					//this.debug(res)
					return res.json()
				}
			})
			.then((data) => {
				if (data.FirmwareVersion) {
					let FW_major = data.FirmwareVersion.substring(data.FirmwareVersion.lastIndexOf(' ') + 1).substring(0, 1)
					let FW_minor = data.FirmwareVersion.substring(data.FirmwareVersion.lastIndexOf(' ') + 2).substring(1)
					//this.debug('---- Camera FW Major:' + FW_major)
					//this.debug('---- Camera FW Minor:' + FW_minor)

					// Set Initial State for Camera
					this.intializeState(model, FW_major, FW_minor)

					// InitializeCamera
					this.initializeCamera(data.HostName)
				} else if (data.Version === '1.0' && this.currentStatus != 2) {
					this.log('error', 'Please upgrade your BirdDog camera to the latest LTS firmware to use this module')
					this.status(this.STATUS_ERROR)
					if (this.timers.pollCameraStatus !== undefined) {
						clearInterval(this.timers.pollCameraStatus)
					}
				}
			})
			.catch((err) => {
				this.debug(err)
				let errorText = String(err)
				if (
					errorText.match('ECONNREFUSED') ||
					errorText.match('ENOTFOUND') ||
					errorText.match('EHOSTDOWN') ||
					errorText.match('ETIMEDOUT')
				) {
					if (this.currentStatus != 2) {
						this.status(this.STATUS_ERROR)
						this.log('error', `Unable to connect to BirdDog PTZ Camera (Error: ${errorText?.split('reason:')[1]})`)
					}
				}
			})
	}

	initializeCamera(hostname) {
		// this.debug('---- in initializeCamera')
		if (this.currentStatus != 0 && this.camera.firmware.major && this.camera.model) {
			this.status(this.STATUS_OK)
			this.log('info', `Connected to ${hostname}`)
			this.debug('---- Connected to', hostname)

			this.actions()
			this.initPresets()
			this.initVariables()
			this.initFeedbacks()

			this.init_udp()

			if (this.camera.firmware.major === '5') {
				this.init_ws_listener()
			}
		} else {
			this.status(this.STATUS_ERROR)
			this.log('error', `Unable to connect to ${hostname}`)
		}
	}

	checkCameraModel(detectedModel) {
		this.debug('---- In checkCameraModel with detectedModel as', detectedModel)
		var model = CHOICES.CAMERAS.find((element) => {
			this.debug('---- Checking element ', element)
			if (element.id === detectedModel) {
				return detectedModel
			} else if (element?.other) {
				var tempArray = Object.entries(element)
				return tempArray[2][1].includes(detectedModel)
			} else {
				this.debug('---- Returning False for ', element)
				return false
			}
		})
		if (model) {
			this.log('info', `Detected camera model: ${model.id}`)
			this.debug('---- Detected camera model: ' + model.id)
			return model.id
		} else {
			this.log('error', `Unrecognized camera model: ${detectedModel}. Using "Default" camera profile`)
			this.debug(`Unrecognized camera model: ${detectedModel}. Using "Default" camera profile`)
			return 'Default'
		}
	}

	intializeState(model, FW_major, FW_minor) {
		// Take all level 1 elements from MODEL_SPECS filtered by;
		// - All cameras or model matches
		// - FW matches
		// - 'store_state' is true
		// and add them to this.camera object

		this.camera = {}

		let filteredArray = Object.entries(MODEL_SPECS).filter(
			(array) =>
				// filter array based on: All cameras or Model matches, and FW matches & has 'store_state' object
				(array[1].camera.includes(model) || array[1].camera.includes('All')) &&
				array[1].firmware.includes(FW_major) &&
				array[1].store_state === true
		)

		Object.keys(Object.fromEntries(filteredArray))
			.sort()
			.map((element) => (this.camera[element] = {}))

		// Set some defaults
		this.camera.model = model
		this.camera.firmware.major = FW_major
		this.camera.firmware.minor = FW_minor
		this.camera.shutter_table = 60 // Camera defaults to 59.94 on startup
		this.camera.unknown = [] // Array to store unknown API variables

		// Old defaults
		//this.camera.position = { pan: '0000', tilt: '0000', zoom: '0000' }

		this.debug('---- Initial State for camera', this.camera)
	}

	storeState(data, endpoint) {
		// Returns an array of this.camera keys that have been changed
		let changed = []
		Object.entries(data).forEach((element) => {
			let stored = Object.entries(MODEL_SPECS).find(
				(array) =>
					// find location in this.camera to store API variable
					// based on: All cameras or Model matches, FW matches, api_endpoint matches & api_variable matches API element
					(array[1].camera.includes(this.camera.model) || array[1].camera.includes('All')) &&
					array[1].firmware.includes(this.camera.firmware.major) &&
					array[1]?.api_endpoint?.includes(endpoint) &&
					array[1]?.api_variable?.includes(element[0])
			)
			if (!stored) {
				if (!this.camera.unknown.includes(element[0])) {
					//Only warn about unknown API variables once
					this.log('warn', `Unknown API variable returned from ${endpoint}: ${element[0]}`)
					this.debug('---- Unknown API variable returned from ' + endpoint + ': ' + element[0])
					this.camera.unknown.push(element[0])
				}
			} else if (this.camera[stored[0]] !== element[1]) {
				changed.push(stored[0])
				this.camera[stored[0]] = element[1]
			}
		})
		return changed
	}
}

exports = module.exports = instance
