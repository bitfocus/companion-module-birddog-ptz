const instance_skel = require('../../instance_skel')
const actions = require('./actions')
const presets = require('./presets')
const { updateVariableDefinitions, updateVariables } = require('./variables')
const { initFeedbacks } = require('./feedbacks')
const upgradeScripts = require('./upgrades')
const { getCameraInfo, addStringToBinary } = require('./utils')
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
		//		this.getCameraInfo = getCameraInfo
		this.addStringToBinary = addStringToBinary

		this.camera = {}

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

		//this.actions()
		this.initFeedbacks()
		this.initPresets()

		this.port = 52381 // Visca port
		this.sendCommand('about', 'GET')
		this.sendCommand('analogaudiosetup', 'GET')
		this.sendCommand('encodetransport', 'GET')
		this.sendCommand('encodesetup', 'GET') // allow an initial query to this API to collect camera info
		this.sendCommand('NDIDisServer', 'GET')
		this.sendCommand('birddogptzsetup', 'GET')
		this.sendCommand('birddogexpsetup', 'GET')
		this.sendCommand('birddogwbsetup', 'GET')
		this.sendCommand('birddogpicsetup', 'GET')

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
		let newSpeed
		let newValue
		let body = {}

		switch (action.action) {
			case 'power':
				switch (opt.val) {
					case 'On':
						cmd = VISCA.MSG_CAM + VISCA.CAM_POWER + VISCA.DATA_ONVAL + VISCA.END_MSG
						break
					case 'Off':
						cmd = VISCA.MSG_CAM + VISCA.CAM_POWER + VISCA.DATA_OFFVAL + VISCA.END_MSG
						break
				}
				this.sendVISCACommand(cmd)
				break

			case 'pt':
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
				}
				this.sendVISCACommand(cmd)
				break

			case 'panSpeed':
				switch (opt.type) {
					case 'up':
						newSpeed = panSpeed < 21 ? ++panSpeed : panSpeed
						break
					case 'down':
						newSpeed = panSpeed > 1 ? --panSpeed : panSpeed
						break
					case 'value':
						newSpeed = opt.value
						break
				}
				body = {
					PanSpeed: String(newSpeed),
				}
				this.sendCommand('birddogptzsetup', 'POST', body)
				break

			case 'tiltSpeed':
				switch (opt.type) {
					case 'up':
						break
					case 'down':
						newSpeed = tiltSpeed > 1 ? --tiltSpeed : tiltSpeed
						break
					case 'value':
						newSpeed = opt.value
						break
				}
				body = {
					TiltSpeed: String(newSpeed),
				}
				this.sendCommand('birddogptzsetup', 'POST', body)
				break

			case 'zoomSpeed':
				switch (opt.type) {
					case 'up':
						newSpeed = zoomSpeed < 7 ? ++zoomSpeed : zoomSpeed
						break
					case 'down':
						newSpeed = zoomSpeed > 1 ? --zoomSpeed : zoomSpeed
						break
					case 'value':
						newSpeed = opt.value
						break
				}
				body = {
					ZoomSpeed: String(newSpeed),
				}
				this.sendCommand('birddogptzsetup', 'POST', body)
				break

			case 'zoom':
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
					case 'stop':
						cmd = VISCA.MSG_CAM + VISCA.CAM_ZOOM + VISCA.CMD_CAM_ZOOM_STOP + VISCA.END_MSG
						break
				}
				this.sendVISCACommand(cmd)
				break

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
					case 'AutoFocus':
						cmd = VISCA.MSG_CAM + VISCA.CAM_FOCUS_AUTO + VISCA.DATA_ONVAL + VISCA.END_MSG
						break
					case 'Manual':
						cmd = VISCA.MSG_CAM + VISCA.CAM_FOCUS_AUTO + VISCA.DATA_OFFVAL + VISCA.END_MSG
						break
				}
				this.sendVISCACommand(cmd)
				break

			case 'expM':
				body = {
					ExpMode: String(opt.value),
				}
				this.sendCommand('birddogexpsetup', 'POST', body)
				break

			case 'wb':
				body = {
					WbMode: String(opt.value),
				}
				this.sendCommand('birddogwbsetup', 'POST', body)
				break

			case 'wbOnePush':
				cmd = VISCA.MSG_CAM + VISCA.CAM_WB_TRIGGER + VISCA.CMD_CAM_WB_TRIGGER_NOW + VISCA.END_MSG
				this.sendVISCACommand(cmd)
				break

			case 'gain':
				let gain = this.camera?.expsetup?.GainLevel ? this.camera.expsetup.GainLevel : 4
				switch (opt.val) {
					case 'up':
						newValue = gain < 15 ? ++gain : gain
						break
					case 'down':
						newValue = gain > 0 ? --gain : gain
						break
					case 'value':
						newValue = opt.value
						break
				}
				body = {
					GainLevel: String(newValue),
				}
				this.sendCommand('birddogexpsetup', 'POST', body)
				break

			case 'gainRed':
				let gainRed = this.camera?.wbsetup?.RedGain ? this.camera.wbsetup.RedGain : 128
				switch (opt.val) {
					case 'up':
						newValue = gainRed < 255 ? ++gainRed : gainRed
						break
					case 'down':
						newValue = gainRed > 0 ? --gainRed : gainRed
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

			case 'gainBlue':
				let gainBlue = this.camera?.wbsetup?.RedGain ? this.camera.wbsetup.RedGain : 128
				switch (opt.val) {
					case 'up':
						newValue = gainBlue < 255 ? ++gainBlue : gainBlue
						break
					case 'down':
						newValue = gainBlue > 0 ? --gainBlue : gainBlue
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

			case 'shut':
				let shutter_speed = this.camera?.expsetup?.shutter_speed ? this.camera.expsetup.shutter_speed : 0
				switch (opt.val) {
					case 'up':
						newValue = shutter_speed < 21 ? ++shutter_speed : shutter_speed
						break
					case 'down':
						newValue = shutter_speed > 0 ? ++shutter_speed : shutter_speed
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

			case 'savePset':
				body = {
					Preset: String('Preset-' + opt.value),
				}
				this.sendCommand('save', 'POST', body)
				break

			case 'recallPset':
				body = {
					Preset: String('Preset-' + opt.value),
				}
				this.sendCommand('recall', 'POST', body)
				break

			case 'pictureEffect':
				body = {
					Effect: String(opt.value),
				}
				this.sendCommand('birddogpicsetup', 'POST', body)
				break

			case 'defog':
				switch (opt.val) {
					case '0':
						cmd = '\x81\x01\x04\x37\x03\xFF'
						break
					case '1':
						cmd = '\x81\x01\x04\x37\x01\xFF'
						break
					case '2':
						cmd = '\x81\x01\x04\x37\x02\xFF'
						break
					case '3':
						cmd = '\x81\x01\x04\x37\x03\xFF'
						break
				}
				this.sendVISCACommand(cmd)
				break

			case 'irMode':
				body = {
					IRCutFilter: String(opt.value),
				}
				this.sendCommand('birddogpicsetup', 'POST', body)
				break

			case 'hrMode':
				switch (opt.val) {
					case 'On':
						cmd = '\x81\x01\x04\x52\x02\xFF'
						break
					case 'Off':
						cmd = '\x81\x01\x04\x52\x03\xFF'
						break
				}
				this.sendVISCACommand(cmd)
				break

			case 'highSensitivity':
				body = {
					HighSensitivity: String(opt.value),
				}
				this.sendCommand('birddogexpsetup', 'POST', body)
				break

			case 'tally':
				body = {
					TallyMode: String(opt.value),
				}
				this.sendCommand('encodesetup', 'POST', body)
				break

			case 'freeze':
				switch (opt.val) {
					case 'On':
						cmd = '\x81\x01\x04\x62\x02\xFF'
						break
					case 'Off':
						cmd = '\x81\x01\x04\x62\x03\xFF'
						break
				}
				this.sendVISCACommand(cmd)
				break

			case 'picFlip':
				body = {
					Flip: String(opt.value),
				}
				this.sendCommand('birddogpicsetup', 'POST', body)
				break

			case 'picMirror':
				body = {
					Mirror: String(opt.value),
				}
				this.sendCommand('birddogpicsetup', 'POST', body)
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
					this.updateVariables()
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
			this.ptSpeed = data.PanSpeed ? data.PanSpeed : '0C'
		} else if (cmd.match('/birddogexpsetup')) {
			this.camera.expsetup = data
		} else if (cmd.match('/birddogwbsetup')) {
			this.camera.wbsetup = data
		} else if (cmd.match('/birddogpicsetup')) {
			this.camera.picsetup = data
		} else if (cmd.match('/birddogcmsetup')) {
			this.camera.cmsetup = data
		} else if (cmd.match('/birddogadvancesetup')) {
			this.camera.advancesetup = data
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

		this.udp.send(newbuf)
	}

	incomingData(data) {
		this.debug('-----Incoming VISCA message -' + data)
		switch (data[7].toString(16)) {
			case '4a': // Query Standby status
				if (data[8] == 0x90 && data[9] == 0x50 && data[10] == 0x02 && data[11] == 0xff) {
					this.camera.status = 'on'
				} else if (data[8] == 0x90 && data[9] == 0x50 && data[10] == 0x03 && data[11] == 0xff) {
					this.camera.status = 'standby'
				}
				break
			case '5a': // Query Auto Focus mode
				if (data[8] == 0x90 && data[9] == 0x50 && data[10] == 0x02 && data[11] == 0xff) {
					this.camera.focus = JSON.parse('{"mode":"Auto"}')
					this.updateVariables()
				} else if (data[8] == 0x90 && data[9] == 0x50 && data[10] == 0x03 && data[11] == 0xff) {
					this.camera.focus = JSON.parse('{"mode":"Manual"}')
				}
				this.updateVariables()
				this.checkFeedbacks()
		}
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
		this.debug('----Polling for Camera Info')
		this.sendCommand('about', 'GET')
		this.sendCommand('analogaudiosetup', 'GET')
		this.sendCommand('encodetransport', 'GET')
		//this.sendCommand('encodesetup', 'GET') Temporary skip to avoid BirdDog API bug
		this.sendCommand('NDIDisServer', 'GET')
		this.sendCommand('birddogptzsetup', 'GET')
		this.sendCommand('birddogexpsetup', 'GET')
		this.sendCommand('birddogwbsetup', 'GET')
		this.sendCommand('birddogpicsetup', 'GET')
		this.sendCommand('birddogcmsetup', 'GET')
		this.sendCommand('birddogadvancesetup', 'GET')
		// Query Standby status
		this.sendVISCACommand(VISCA.MSG_QRY + VISCA.CAM_POWER + VISCA.END_MSG, '\x4a')
		// Query Auto Focus Mode
		this.sendVISCACommand(VISCA.MSG_QRY + VISCA.CAM_FOCUS_AUTO + VISCA.END_MSG, '\x5a')
		this.debug('----Camera Setup----')
		this.debug(this.camera)

		this.updateVariables()
	}
}
exports = module.exports = instance
