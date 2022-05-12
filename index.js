const instance_skel = require('../../instance_skel')
const actions = require('./actions')
const presets = require('./presets')
const { updateVariableDefinitions, updateVariables } = require('./variables')
const { initFeedbacks } = require('./feedbacks')
const upgradeScripts = require('./upgrades')
const { addStringToBinary, strToPQRS } = require('./utils')
const VISCA = require('./constants')
var { MODELS } = require('./models.js')

const udp = require('../../udp')
const fetch = require('node-fetch')

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

		this.camera = {}

		// Initialise Objects for VISCA queries

		this.camera.position = { pan: '0000', tilt: '0000', zoom: '0000' }

		this.camera.framerate = 50
	}

	static GetUpgradeScripts() {
		return [upgradeScripts.choicesUpgrade]
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
		]
	}

	updateConfig(config) {
		this.config = config

		this.status(this.STATUS_WARNING, 'Connecting')

		if (this.config.host !== undefined) {
			this.init_udp()
		}
	}

	destroy() {
		if (this.udp !== undefined) {
			this.udp.destroy()
		}
		if (this.poll_interval !== undefined) {
			clearInterval(this.poll_interval)
		}
		debug('destroy', this.id)
	}

	init() {
		debug = this.debug
		log = this.log

		this.status(this.STATUS_WARNING, 'Connecting')

		this.port = 52381 // Visca port
		// Get Initial Camera Info
		this.sendCommand('about', 'GET')
		this.sendCommand('encodesetup', 'GET') // allow an initial query to this API to collect camera info

		this.init_udp()

		this.updateVariables()
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

		let MODEL_VALUES = MODELS.find((MODELS) => MODELS.id == this.camera.model).actions

		let panSpeed = this.camera?.ptz?.PanSpeed ? this.camera.ptz.PanSpeed : 11
		let tiltSpeed = this.camera?.ptz?.PanSpeed ? this.camera.ptz.TiltSpeed : 9
		let zoomSpeed = this.camera?.ptz?.ZoomSpeed ? this.camera.ptz.ZoomSpeed : 4
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

			// Encode Setup Actions

			case 'tally':
				body = {
					TallyMode: String(opt.val),
				}
				this.sendCommand('encodesetup', 'POST', body)
				break

			case 'encodeBandwidth':
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

			// Encode Transport Actions

			case 'transmit_method':
				body = {
					txpm: String(opt.val),
				}
				this.sendCommand('encodeTransport', 'POST', body)
				break

			// NDI Discovery Server Actions

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
						newValue = panSpeed < MODEL_VALUES.panSpeed.range.max ? ++panSpeed : MODEL_VALUES.panSpeed.range.max
						break
					case 'down':
						newValue = panSpeed > MODEL_VALUES.panSpeed.range.min ? --panSpeed : MODEL_VALUES.panSpeed.range.min
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

			case 'tiltSpeed':
				switch (opt.type) {
					case 'up':
						newValue = tiltSpeed < MODEL_VALUES.tiltSpeed.range.max ? ++tiltSpeed : MODEL_VALUES.tiltSpeed.range.max
						break
					case 'down':
						newValue = tiltSpeed > MODEL_VALUES.tiltSpeed.range.min ? --tiltSpeed : MODEL_VALUES.tiltSpeed.range.min
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
						newValue = zoomSpeed < MODEL_VALUES.zoomSpeed.range.max ? ++zoomSpeed : MODEL_VALUES.zoomSpeed.range.max
						break
					case 'down':
						newValue = zoomSpeed > MODEL_VALUES.zoomSpeed.range.min ? --zoomSpeed : MODEL_VALUES.zoomSpeed.range.min
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
						body = {
							ExpCompEn: String(opt.val),
							ExpCompLvl: String(opt.level), //Convert action range to API range
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
				let gain = this.camera?.expsetup?.GainLevel ? this.camera.expsetup.GainLevel : MODEL_VALUES.gain.default
				gainLimit = this.camera?.expsetup?.GainLimit ? this.camera.expsetup.GainLimit : MODEL_VALUES.gain.choices.length
				switch (opt.val) {
					case 'up':
						newValue = gain < gainLimit ? ++gain : gain
						break
					case 'down':
						newValue = gain > MODEL_VALUES.gain.choices[0] ? --gain : gain
						break
					case 'value':
						newValue = parseFloat(opt.value) <= gainLimit ? opt.value : gain
						break
				}
				this.debug(gainLimit)
				body = {
					GainLevel: String(newValue),
				}
				this.sendCommand('birddogexpsetup', 'POST', body)
				break

			case 'gainLimit':
				gainLimit = this.camera?.expsetup?.GainLimit
					? this.camera.expsetup.GainLimit
					: MODEL_VALUES.gain_limit.range.default
				switch (opt.val) {
					case 'up':
						newValue = gainLimit < MODEL_VALUES.gain_limit.range.max ? ++gainLimit : gainLimit
						break
					case 'down':
						newValue = gainLimit > MODEL_VALUES.gain_limit.range.min ? --gainLimit : gainLimit
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
				let gainPointPosition = this.camera?.expsetup?.GainPointPosition
					? this.camera.expsetup.GainPointPosition
					: MODEL_VALUES.gain.default
				switch (opt.val) {
					case 'up':
						newValue =
							gainPointPosition < this.camera.expsetup.GainLimit ? ++gainPointPosition : this.camera.expsetup.GainLimit
						break
					case 'down':
						newValue = gainPointPosition > MODEL_VALUES.gain[0] ? --gainPointPosition : gainPointPosition
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
				let iris = this.camera?.expsetup?.IrisLevel ? this.camera.expsetup.IrisLevel : MODEL_VALUES.iris.default
				switch (opt.val) {
					case 'up':
						newValue =
							iris === MODEL_VALUES.iris.range.closed
								? MODEL_VALUES.iris.range.min
								: iris < MODEL_VALUES.iris.range.max
								? --iris
								: MODEL_VALUES.iris.range.max
						break
					case 'down':
						newValue =
							iris === MODEL_VALUES.iris.range.min
								? MODEL_VALUES.iris.range.closed
								: iris > MODEL_VALUES.iris.range.min
								? --iris
								: MODEL_VALUES.iris.range.closed
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
				let shutter_speed = this.camera?.expsetup?.ShutterSpeed
					? this.camera.expsetup.ShutterSpeed
					: MODEL_VALUES.shut.default
				switch (opt.val) {
					case 'up':
						newValue = shutter_speed < MODEL_VALUES.shut.range.max ? ++shutter_speed : MODEL_VALUES.shut.range.max
						break
					case 'down':
						newValue = shutter_speed > MODEL_VALUES.shut.range.min ? --shutter_speed : MODEL_VALUES.shut.range.min
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
				let shutter_max_speed = this.camera?.expsetup?.ShutterMaxSpeed
					? this.camera.expsetup.ShutterMaxSpeed
					: MODEL_VALUES.shutter_max_speed.range.default
				switch (opt.val) {
					case 'up':
						newValue =
							shutter_max_speed < MODEL_VALUES.shutter_max_speed.range.max
								? ++shutter_max_speed
								: MODEL_VALUES.shutter_max_speed.range.max
						break
					case 'down':
						newValue =
							shutter_max_speed > MODEL_VALUES.shutter_max_speed.range.min
								? --shutter_max_speed
								: MODEL_VALUES.shutter_max_speed.range.min
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
				let shutter_min_speed = this.camera?.expsetup?.ShutterMinSpeed
					? this.camera.expsetup.ShutterMinSpeed
					: MODEL_VALUES.shutter_min_speed.range.default
				switch (opt.val) {
					case 'up':
						newValue =
							shutter_min_speed < this.camera.expsetup.ShutterMaxSpeed
								? ++shutter_min_speed
								: this.camera.expsetup.ShutterMaxSpeed
						break
					case 'down':
						newValue =
							shutter_min_speed > MODEL_VALUES.shutter_min_speed.range.min
								? --shutter_min_speed
								: MODEL_VALUES.shutter_min_speed.range.min
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
				let slow_shutter_limit = this.camera?.expsetup?.SlowShutterLimit
					? this.camera.expsetup.SlowShutterLimit
					: MODEL_VALUES.slow_shutter_limit.range.default
				switch (opt.val) {
					case 'up':
						newValue =
							slow_shutter_limit < MODEL_VALUES.slow_shutter_limit.range.max
								? ++slow_shutter_limit
								: MODEL_VALUES.slow_shutter_limit.range.max
						break
					case 'down':
						newValue =
							slow_shutter_limit > MODEL_VALUES.slow_shutter_limit.range.min
								? --slow_shutter_limit
								: MODEL_VALUES.slow_shutter_limit.range.min
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
				let blue_gain = this.camera?.wbsetup?.BlueGain
					? this.camera.wbsetup.BlueGain
					: MODEL_VALUES.blue_gain.range.default
				switch (opt.val) {
					case 'up':
						newValue = blue_gain < MODEL_VALUES.blue_gain.range.max ? ++blue_gain : blue_gain
						break
					case 'down':
						newValue = blue_gain > MODEL_VALUES.blue_gain.range.min ? --blue_gain : blue_gain
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
				body = {
					ColorTemp: String(opt.val),
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
				let red_gain = this.camera?.wbsetup?.RedGain ? this.camera.wbsetup.RedGain : 128
				switch (opt.val) {
					case 'up':
						newValue = red_gain < 255 ? ++red_gain : red_gain
						break
					case 'down':
						newValue = red_gain > 0 ? --red_gain : red_gain
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

			case 'contrast':
				let contrast = this.camera?.picsetup?.Contrast ? this.camera.picsetup.Contrast : 7
				switch (opt.val) {
					case 'up':
						newValue = contrast < 15 ? ++contrast : contrast
						break
					case 'down':
						newValue = contrast > 0 ? --contrast : contrast
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
			case 'irMode':
				body = {
					IRCutFilter: String(opt.val),
				}
				this.sendCommand('birddogpicsetup', 'POST', body)
				break

			case 'picFlip':
				body = {
					Flip: String(opt.val),
				}
				this.sendCommand('birddogpicsetup', 'POST', body)
				break

			case 'picMirror':
				body = {
					Mirror: String(opt.val),
				}
				this.sendCommand('birddogpicsetup', 'POST', body)
				break

			// Color Matrix Actions

			// Advanced Setup Actions

			// External Setup Actions

			// Detail Setup Actions

			// Gamma Setup Actions

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
				} else {
					this.debug(`Command failed ${url}`)
				}
			})
			.catch((err) => {
				this.debug(err)
				let errorText = String(err)
				if (errorText.match('ECONNREFUSED') || errorText.match('ENOTFOUND') || errorText.match('EHOSTDOWN')) {
					if (this.currentStatus != 2) {
						this.status(this.STATUS_ERROR)
						this.log(
							'error',
							`Connection lost to ${this.camera?.about?.HostName ? this.camera.about.HostName : 'BirdDog PTZ camera'}`
						)
					}
				}
			})
	}

	processData(cmd, data) {
		if (cmd.match('/about')) {
			if (this.currentStatus != 0 && data.FirmwareVersion) {
				this.status(this.STATUS_OK)
				this.log('info', `Connected to ${data.HostName}`)
			} else if (data.Version === '1.0' && this.currentStatus != 2) {
				this.log('error', 'Please upgrade your BirdDog camera to the latest LTS firmware to use this module')
				this.status(this.STATUS_ERROR)
				if (this.poll_interval !== undefined) {
					clearInterval(this.poll_interval)
				}
			}
			if (data.FirmwareVersion) {
				this.camera.about = data

				let model = data.FirmwareVersion.substring(
					data.FirmwareVersion.indexOf(' ') + 1,
					data.FirmwareVersion.lastIndexOf(' ')
				)
				model = model.replace(/ /g, '_')
				if (!this.camera.model || this.camera.model != model) {
					if (this.camera.model) {
						this.log('info', 'New model detected, reloading module: ' + this.camera.model)
					}
					this.camera.model = model
					this.debug('----New model detected:- ' + this.camera.model)
					this.actions()
					this.initPresets()
					this.initVariables()
					this.initFeedbacks()
				}
				this.camera.firmware = data.FirmwareVersion.substring(
					data.FirmwareVersion.lastIndexOf(' ') + 1,
					data.FirmwareVersion.length
				)
			}
		} else if (cmd.match('/analogaudiosetup')) {
			this.camera.audio = data
		} else if (cmd.match('/encodetransport')) {
			this.camera.transport = data
		} else if (cmd.match('/encodesetup')) {
			if (!this.camera?.encode || this.camera?.encode?.VideoFormat !== data.VideoFormat) {
				if (data.VideoFormat.match('24')) {
					this.camera.framerate = 24
				} else if (data.VideoFormat.match('25') || data.VideoFormat.match('50')) {
					this.camera.framerate = 50
				} else {
					this.camera.framerate = 60
				}
				this.actions()
			}
			this.camera.encode = data
		} else if (cmd.match('/NDIDisServer')) {
			this.camera.ndiserver = data
		} else if (cmd.match('/birddogptzsetup')) {
			this.camera.ptz = data
		} else if (cmd.match('/birddogexpsetup')) {
			if (this.camera.expsetup?.GainLimit !== data.GainLimit) {
				// rebuild actions if GainLimit has changed
				this.camera.expsetup.GainLimit = data.GainLimit
				this.actions()
			} else if (this.camera.expsetup?.ShutterMaxSpeed !== data.ShutterMaxSpeed) {
				// rebuild actions if ShutterMaxSpeed has changed
				this.camera.expsetup.ShutterMaxSpeed = data.ShutterMaxSpeed
				this.actions()
			}
			this.camera.expsetup = data
		} else if (cmd.match('/birddogwbsetup')) {
			this.camera.wbsetup = data
		} else if (cmd.match('/birddogpicsetup')) {
			this.camera.picsetup = data
		} else if (cmd.match('/birddogcmsetup')) {
			this.camera.cmsetup = data
		} else if (cmd.match('/birddogadvancesetup')) {
			this.camera.advancesetup = data
		} else if (cmd.match('/birddogexternalsetup')) {
			this.camera.externalsetup = data
		} else if (cmd.match('/birddogdetsetup')) {
			this.camera.detsetup = data
		} else if (cmd.match('/birddoggammasetup')) {
			this.camera.gammasetup = data
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
					this.camera.focus = JSON.parse('{"mode":"Auto"}')
				} else if (data[8] == 0x90 && data[9] == 0x50 && data[10] == 0x03 && data[11] == 0xff) {
					this.camera.focus = JSON.parse('{"mode":"Manual"}')
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
					this.camera.position.zoom =
						data[10].toString(16) + data[11].toString(16) + data[12].toString(16) + data[13].toString(16)
				}
				break
			case '5d': // Query Pan/Tilt Position
				if (data[8] == 0x90 && data[9] == 0x50 && data[18] == 0xff) {
					this.camera.position.pan =
						data[10].toString(16) + data[11].toString(16) + data[12].toString(16) + data[13].toString(16)
					this.camera.position.tilt =
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
		if (this.poll_interval !== undefined) {
			clearInterval(this.poll_interval)
		}
		if (this.config.host !== undefined) {
			this.udp = new udp(this.config.host, this.port)

			// Reset sequence number
			this.sendControlCommand('\x01')
			this.packet_counter = 0

			this.poll_interval = setInterval(this.poll.bind(this), 3000) //ms for poll
			this.poll()

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

	poll() {
		let MODEL_API = MODELS.find((MODELS) => MODELS.id == this.camera.model)?.apicalls
		// Common Device Info
		this.sendCommand('about', 'GET')
		this.sendCommand('analogaudiosetup', 'GET')
		this.sendCommand('encodetransport', 'GET')
		//this.sendCommand('encodesetup', 'GET') Temporary skip to avoid BirdDog API bug
		this.sendCommand('NDIDisServer', 'GET')
		this.sendCommand('birddogptzsetup', 'GET')
		this.sendCommand('birddogexpsetup', 'GET')
		this.sendCommand('birddogwbsetup', 'GET')
		this.sendCommand('birddogpicsetup', 'GET')
		this.sendVISCACommand(VISCA.MSG_QRY + VISCA.CAM_POWER + VISCA.END_MSG, '\x4a') // Query Standby status
		this.sendVISCACommand(VISCA.MSG_QRY + VISCA.CAM_FOCUS_AUTO + VISCA.END_MSG, '\x5a') // Query Auto Focus Mode
		this.sendVISCACommand(VISCA.MSG_QRY + VISCA.CAM_FREEZE + VISCA.END_MSG, '\x5b') // Query Freeze
		this.sendVISCACommand(VISCA.MSG_QRY + VISCA.CAM_ZOOM_DIRECT + VISCA.END_MSG, '\x5c') // Query Zoom Position
		this.sendVISCACommand(VISCA.MSG_QRY_OPERATION + VISCA.OP_PAN_POS + VISCA.END_MSG, '\x5d') // Query Pan/Tilt Position
		// Specific Model Info
		if (MODEL_API?.birddogcmsetup) {
			this.sendCommand('birddogcmsetup', 'GET')
		}
		if (MODEL_API?.birddogadvancesetup) {
			this.sendCommand('birddogadvancesetup', 'GET')
		}
		if (MODEL_API?.birddogexternalsetup) {
			this.sendCommand('birddogexternalsetup', 'GET')
		}
		if (MODEL_API?.birddogdetsetup) {
			this.sendCommand('birddogdetsetup', 'GET')
		}
		if (MODEL_API?.birddoggammasetup) {
			this.sendCommand('birddoggammasetup', 'GET')
		}

		this.debug('----Camera Setup----')
		this.debug(this.camera)
	}
}
exports = module.exports = instance
