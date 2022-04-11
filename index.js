const instance_skel = require('../../instance_skel')
const actions = require('./actions')
const presets = require('./presets')
const { updateVariableDefinitions, updateSourceVariables } = require('./variables')
const { initFeedbacks } = require('./feedbacks')
const upgradeScripts = require('./upgrades')
const choices = require('./choices.js')

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
		this.updateSourceVariables = updateSourceVariables

		this.camera = {}

		this.IRIS = [
			{ id: '17', label: 'F1.6' },
			{ id: '16', label: 'F2.0' },
			{ id: '15', label: 'F2.4' },
			{ id: '14', label: 'F2.8' },
			{ id: '13', label: 'F3.4' },
			{ id: '12', label: 'F4.0' },
			{ id: '11', label: 'F4.8' },
			{ id: '10', label: 'F5.6' },
			{ id: '9', label: 'F6.8' },
			{ id: '8', label: 'F8.0' },
			{ id: '7', label: 'F9.6' },
			{ id: '6', label: 'F11.0' },
			{ id: '5', label: 'F14.0' },
			{ id: '0', label: 'CLOSED' },
		]

		this.GAIN = [
			{ id: '1', label: '0 dB' },
			{ id: '2', label: '3.6 dB' },
			{ id: '3', label: '7.1 dB' },
			{ id: '4', label: '10.7 dB' },
			{ id: '5', label: '14.3 dB' },
			{ id: '6', label: '17.8 dB' },
			{ id: '7', label: '21.4 dB' },
			{ id: '8', label: '25.0 dB' },
			{ id: '9', label: '28.6 dB' },
			{ id: '10', label: '32.1 dB' },
			{ id: '11', label: '35.7 dB' },
			{ id: '12', label: '39.3 dB' },
			{ id: '13', label: '42.8 dB' },
			{ id: '14', label: '46.4 dB' },
			{ id: '15', label: '50.0 dB' },
		]

		this.SHUTTER_NTSC = [
			{ id: '0', label: '1/1' },
			{ id: '1', label: '1/2' },
			{ id: '2', label: '1/4' },
			{ id: '3', label: '1/8' },
			{ id: '4', label: '1/15' },
			{ id: '5', label: '1/30' },
			{ id: '6', label: '1/60' },
			{ id: '7', label: '1/90' },
			{ id: '8', label: '1/100' },
			{ id: '9', label: '1/125' },
			{ id: '10', label: '1/180' },
			{ id: '11', label: '1/250' },
			{ id: '12', label: '1/350' },
			{ id: '13', label: '1/500' },
			{ id: '14', label: '1/725' },
			{ id: '15', label: '1/1000' },
			{ id: '16', label: '1/1500' },
			{ id: '17', label: '1/2000' },
			{ id: '18', label: '1/3000' },
			{ id: '19', label: '1/4000' },
			{ id: '20', label: '1/6000' },
			{ id: '21', label: '1/10000' },
		]

		this.SHUTTER_PAL = [
			{ id: '0', label: '1/1' },
			{ id: '1', label: '1/2' },
			{ id: '2', label: '1/3' },
			{ id: '3', label: '1/6' },
			{ id: '4', label: '1/12' },
			{ id: '5', label: '1/25' },
			{ id: '6', label: '1/50' },
			{ id: '7', label: '1/75' },
			{ id: '8', label: '1/100' },
			{ id: '9', label: '1/120' },
			{ id: '10', label: '1/150' },
			{ id: '11', label: '1/215' },
			{ id: '12', label: '1/300' },
			{ id: '13', label: '1/425' },
			{ id: '14', label: '1/600' },
			{ id: '15', label: '1/1000' },
			{ id: '16', label: '1/1250' },
			{ id: '17', label: '1/1750' },
			{ id: '18', label: '1/2500' },
			{ id: '19', label: '1/3500' },
			{ id: '20', label: '1/6000' },
			{ id: '21', label: '1/10000' },
		]

		this.SHUTTER = this.SHUTTER_NTSC
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

		this.actions()
		this.initVariables()
		this.initFeedbacks()
		this.initPresets()

		this.port = 52381 // Visca port
		this.sendCommand('about', 'GET')
		this.sendCommand('analogaudiosetup', 'GET')
		this.sendCommand('encodetransport', 'GET')
		this.sendCommand('encodesetup', 'GET')
		this.sendCommand('NDIDisServer', 'GET')
		this.sendCommand('birddogptzsetup', 'GET')
		this.sendCommand('birddogexpsetup', 'GET')
		this.sendCommand('birddogwbsetup', 'GET')
		this.sendCommand('birddogpicsetup', 'GET')
		this.sendCommand('birddogcmsetup', 'GET')
		this.sendCommand('birddogadvancesetup', 'GET')
		this.init_udp()
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

		let panSpeed = this.camera?.ptz?.PanSpeed ? this.camera.ptz.PanSpeed : 11
		let tiltSpeed = this.camera?.ptz?.PanSpeed ? this.camera.ptz.TiltSpeed : 9
		let zoomSpeed = this.camera?.ptz?.ZoomSpeed ? this.camera.ptz.ZoomSpeed : 4
		let newSpeed
		let body = {}

		switch (action.action) {
			case 'power':
				switch (opt.val) {
					case 'On':
						cmd = '\x81\x01\x04\x00\x02\xFF'
						break
					case 'Off':
						cmd = '\x81\x01\x04\x00\x03\xFF'
						break
				}
				this.sendVISCACommand(cmd)
				break

			case 'pt':
				panSpeed = String.fromCharCode(parseInt(panSpeed, 16) & 0xff)
				tiltSpeed = String.fromCharCode(parseInt(tiltSpeed, 16) & 0xff)

				switch (opt.val) {
					case '0':
						cmd = `\x81\x01\x06\x01${panSpeed}${tiltSpeed}\x01\x03\xFF`
						break
					case '1':
						cmd = `\x81\x01\x06\x01${panSpeed}${tiltSpeed}\x02\x03\xFF`
						break
					case '2':
						cmd = `\x81\x01\x06\x01${panSpeed}${tiltSpeed}\x03\x01\xFF`
						break
					case '3':
						cmd = `\x81\x01\x06\x01${panSpeed}${tiltSpeed}\x03\x02\xFF`
						break
					case '4':
						cmd = `\x81\x01\x06\x01${panSpeed}${tiltSpeed}\x01\x01\xFF`
						break
					case '5':
						cmd = `\x81\x01\x06\x01${panSpeed}${tiltSpeed}\x02\x01\xFF`
						break
					case '6':
						cmd = `\x81\x01\x06\x01${panSpeed}${tiltSpeed}\x01\x02\xFF`
						break
					case '7':
						cmd = `\x81\x01\x06\x01${panSpeed}${tiltSpeed}\x02\x02\xFF`
						break
					case '8':
						cmd = `\x81\x01\x06\x01${panSpeed}${tiltSpeed}\x03\x03\xFF`
						break
					case '9':
						cmd = '\x81\x01\x06\x04\xFF'
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
						newSpeed = tiltSpeed < 18 ? ++tiltSpeed : tiltSpeed
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
					case '0':
						cmd = '\x81\x01\x04\x07\x02\xFF'
						break
					case '1':
						cmd = '\x81\x01\x04\x07\x03\xFF'
						break
					case '2':
						cmd = '\x81\x01\x04\x07\x00\xFF'
						break
				}
				this.sendVISCACommand(cmd)
				break

			case 'focus':
				switch (opt.val) {
					case '0':
						cmd = '\x81\x01\x04\x08\x03\xFF'
						break
					case '1':
						cmd = '\x81\x01\x04\x08\x02\xFF'
						break
					case '2':
						cmd = '\x81\x01\x04\x08\x00\xFF'
						break
					case '3':
						cmd = '\x81\x01\x04\x18\x01\xFF'
						break
				}
				this.sendVISCACommand(cmd)
				break

			case 'focusM':
				switch (opt.val) {
					case 'AutoFocus':
						cmd = '\x81\x01\x04\x38\x02\xFF'
						break
					case 'Manual':
						cmd = '\x81\x01\x04\x38\x03\xFF'
						break
				}
				this.sendVISCACommand(cmd)
				break

			case 'expM':
				switch (opt.val) {
					case 'FULL-AUTO':
						cmd = '\x81\x01\x04\x39\x00\xFF'
						break
					case 'MANUAL':
						cmd = '\x81\x01\x04\x39\x03\xFF'
						break
					case 'SHUTTER-PRI':
						cmd = '\x81\x01\x04\x39\x0A\xFF'
						break
					case 'IRIS-PRI':
						cmd = '\x81\x01\x04\x39\x0B\xFF'
						break
					case 'BRIGHT':
						cmd = '\x81\x01\x04\x39\x0D\xFF'
						break
					case 'GAIN-PRI':
						cmd = '\x81\x01\x04\x39\x0E\xFF'
						break
				}
				this.sendVISCACommand(cmd)
				break

			case 'wb':
				switch (opt.val) {
					case 'AUTO':
						cmd = '\x81\x01\x04\x35\x00\xFF'
						break
					case 'INDOOR':
						cmd = '\x81\x01\x04\x35\x01\xFF'
						break
					case 'OUTDOOR':
						cmd = '\x81\x01\x04\x35\x02\xFF'
						break
					case 'ONEPUSH':
						cmd = '\x81\x01\x04\x35\x03\xFF'
						break
					case 'ATW':
						cmd = '\x81\x01\x04\x35\x04\xFF'
						break
					case 'MANUAL1':
						cmd = '\x81\x01\x04\x35\x05\xFF'
						break
					case 'MANUAL2':
						cmd = '\x81\x01\x04\x35\x06\xFF'
						break
					case 'OUTDOOR-AUTO':
						cmd = '\x81\x01\x04\x35\x06\xFF'
						break
					case 'SLV-AUTO':
						cmd = '\x81\x01\x04\x35\x07\xFF'
						break
					case 'SLV':
						cmd = '\x81\x01\x04\x35\x08\xFF'
						break
					case 'SLV-OUTDOOR-AUTO':
						cmd = '\x81\x01\x04\x35\x09\xFF'
						break
				}
				this.sendVISCACommand(cmd)
				break

			case 'wbOnePush':
				cmd = '\x81\x01\x04\x10\x05\xFF'
				this.sendVISCACommand(cmd)
				break

			case 'gain':
				fb = Buffer.from('\x4c', 'binary')
				switch (opt.val) {
					case 'up':
						cmd = '\x81\x01\x04\x0C\x02\xFF'
						break
					case 'down':
						cmd = '\x81\x01\x04\x0C\x03\xFF'
						break
					case 'reset':
						cmd = '\x81\x01\x04\x0C\x00\xFF'
						break
					case 'value':
						cmd = Buffer.from('\x81\x01\x04\x4C\x00\x00\x00\x00\xFF', 'binary')
						let number = opt.value
						cmd.writeUInt8(number.toString(8) >> 4, 6)
						cmd.writeUInt8(number - parseInt(number.toString(8) >> 4) * 16, 7)
						fb = Buffer.from('\x5c', 'binary')
						break
				}
				this.sendVISCACommand(cmd, fb)
				break

			case 'gainRed':
				fb = Buffer.from('\x43', 'binary')
				switch (opt.val) {
					case 'up':
						cmd = '\x81\x01\x04\x03\x02\xFF'
						break
					case 'down':
						cmd = '\x81\x01\x04\x03\x03\xFF'
						break
					case 'reset':
						cmd = '\x81\x01\x04\x03\x00\xFF'
						break
					case 'value':
						cmd = Buffer.from('\x81\x01\x04\x43\x00\x00\x00\x00\xFF', 'binary')
						let number = opt.value.toString()
						cmd.writeUInt8(number.toString(8) >> 4, 6)
						cmd.writeUInt8(number - parseInt(number.toString(8) >> 4) * 16, 7)
						break
				}
				this.sendVISCACommand(cmd, fb)
				break

			case 'gainBlue':
				fb = Buffer.from('\x44', 'binary')
				switch (opt.val) {
					case 'up':
						cmd = '\x81\x01\x04\x04\x02\xFF'
						break
					case 'down':
						cmd = '\x81\x01\x04\x04\x03\xFF'
						break
					case 'reset':
						cmd = '\x81\x01\x04\x04\x00\xFF'
						break
					case 'value':
						cmd = Buffer.from('\x81\x01\x04\x44\x00\x00\x00\x00\xFF', 'binary')
						let number = opt.value.toString()
						cmd.writeUInt8(number.toString(8) >> 4, 6)
						cmd.writeUInt8(number - parseInt(number.toString(8) >> 4) * 16, 7)
						break
				}
				this.sendVISCACommand(cmd, fb)
				break

			case 'iris':
				fb = Buffer.from('\x4b', 'binary')
				switch (opt.val) {
					case 'up':
						cmd = '\x81\x01\x04\x0B\x02\xFF'
						break
					case 'down':
						cmd = '\x81\x01\x04\x0B\x03\xFF'
						break
					case 'reset':
						cmd = '\x81\x01\x04\x0B\x00\xFF'
						break
					case 'value':
						cmd = Buffer.from('\x81\x01\x04\x4B\x00\x00\x00\x00\xFF', 'binary')
						let number = opt.value
						if (number > 255) {
							number = '255'
						}
						debug(number)
						cmd.writeUInt8(number.toString(8) >> 4, 6)
						cmd.writeUInt8(number - parseInt(number.toString(8) >> 4) * 16, 7)
						fb = Buffer.from('\x5b', 'binary')
						break
				}
				this.sendVISCACommand(cmd, fb)
				break

			case 'shut':
				fb = Buffer.from('\x4a', 'binary')
				switch (opt.val) {
					case 'up':
						cmd = '\x81\x01\x04\x0A\x02\xFF'
						break
					case 'down':
						cmd = '\x81\x01\x04\x0A\x03\xFF'
						break
					case 'reset':
						cmd = '\x81\x01\x04\x0A\x00\xFF'
						break
					case 'value':
						cmd = Buffer.from('\x81\x01\x04\x4A\x00\x00\x00\x00\xFF', 'binary')
						let number = opt.value
						if (number > 255) {
							number = '255'
						}
						debug(number)
						cmd.writeUInt8(number.toString(8) >> 4, 6)
						cmd.writeUInt8(number - parseInt(number.toString(8) >> 4) * 16, 7)
						fb = Buffer.from('\x5a', 'binary')
						break
				}
				this.sendVISCACommand(cmd, fb)
				break

			case 'savePset':
				cmd = Buffer.from('\x81\x01\x04\x3F\x01\x00\xFF', 'binary')
				cmd.writeUInt8(opt.val - 1, 5)
				//cmd.writeUInt8((opt.val - parseInt(opt.val.toString(8) >> 4)*16),7);
				this.sendVISCACommand(cmd)
				break

			case 'recallPset':
				cmd = Buffer.from('\x81\x01\x04\x3F\x02\x00\xFF', 'binary')
				cmd.writeUInt8(opt.val - 1, 5)
				//cmd.writeUInt8((opt.val - parseInt(opt.val.toString(8) >> 4)*16),7);
				this.sendVISCACommand(cmd)
				break

			case 'pictureEffect':
				switch (opt.val) {
					case 'OFF':
						cmd = '\x81\x01\x04\x63\x00\xFF'
						break
					case 'BW':
						cmd = '\x81\x01\x04\x63\x04\xFF'
						break
				}
				this.sendVISCACommand(cmd)
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
				switch (opt.val) {
					case 'Auto':
						cmd = '\x81\x01\x04\x3F\x02\x40\xFF'
						break
					case 'On':
						cmd = '\x81\x01\x04\x3F\x01\x3F\xFF'
						break
					case 'Off':
						cmd = '\x81\x01\x04\x3F\x02\x3F\xFF'
						break
				}
				this.sendVISCACommand(cmd)
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
				switch (opt.val) {
					case 'On':
						cmd = '\x81\x01\x04\x5E\x02\xFF'
						break
					case 'Off':
						cmd = '\x81\x01\x04\x5E\x03\xFF'
						break
				}
				this.sendVISCACommand(cmd)
				break

			case 'tally':
				switch (opt.val) {
					case 'TallyOn':
						cmd = '\x81\x01\x7E\x01\x0A\x00\x02\xFF'
						break
					case 'TallyOff':
						cmd = '\x81\x01\x7E\x01\x0A\x00\x03\xFF'
						break
				}
				this.sendVISCACommand(cmd)
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
				switch (opt.val) {
					case 'On':
						cmd = '\x81\x01\x04\x66\x02\xFF'
						break
					case 'Off':
						cmd = '\x81\x01\x04\x66\x03\xFF'
						break
				}
				this.sendVISCACommand(cmd)
				break

			case 'picMirror':
				switch (opt.val) {
					case 'On':
						cmd = '\x81\x01\x04\x61\x02\xFF'
						break
					case 'Off':
						cmd = '\x81\x01\x04\x61\x03\xFF'
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
				this.camera.model = data.FirmwareVersion.substring(
					data.FirmwareVersion.indexOf(' ') + 1,
					data.FirmwareVersion.lastIndexOf(' ')
				)
				this.camera.firmware = data.FirmwareVersion.substring(
					data.FirmwareVersion.lastIndexOf(' ') + 1,
					data.FirmwareVersion.length
				)
				this.setVariable('model', this.camera.model)
				this.setVariable('firmware', this.camera.firmware)
			}
			this.setVariable('status', data.Status)
		} else if (cmd.match('/analogaudiosetup')) {
			this.camera.audio = data
			this.setVariable('audio_in_gain', data.AnalogAudioInGain)
			this.setVariable('audio_out_gain', data.AnalogAudioOutGain)
			this.setVariable('audio_output', data.AnalogAudiooutputselect)
		} else if (cmd.match('/encodetransport')) {
			this.camera.transport = data
			this.setVariable('transmit_method', data.txpm)
		} else if (cmd.match('/encodesetup')) {
			if (!this.camera?.encode || this.camera?.encode?.VideoFormat !== data.VideoFormat) {
				if (data.VideoFormat.match('25') || data.VideoFormat.match('50')) {
					this.SHUTTER = this.SHUTTER_PAL
					this.actions()
				} else {
					this.SHUTTER = this.SHUTTER_NTSC
					this.actions()
				}
			}
			this.camera.encode = data
			this.setVariable('video_format', data.VideoFormat)
			this.setVariable('bandwidth', data.BandwidthSelect)
			this.setVariable('bandwidth_mode', data.BandwidthMode)
			this.setVariable('ndi_audio', data.NDIAudio)
			this.setVariable('ndi_group', data.NDIGroup)
			this.setVariable('ndi_group_name', data.NDIGroupName)
			this.setVariable('stream_name', data.StreamName)
			this.setVariable('tally_mode', data.TallyMode)
		} else if (cmd.match('/NDIDisServer')) {
			this.camera.ndiserver = data
			this.setVariable('ndi_discovery_server', data.NDIDisServ)
			this.setVariable('ndi_discovery_server_ip', data.NDIDisServIP)
		} else if (cmd.match('/birddogptzsetup')) {
			this.camera.ptz = data
			this.setVariable('pan_speed', data.PanSpeed)
			this.ptSpeed = data.PanSpeed ? data.PanSpeed : '0C'
			this.setVariable('tilt_speed', data.TiltSpeed)
			this.setVariable('zoom_speed', data.ZoomSpeed)
		} else if (cmd.match('/birddogexpsetup')) {
			this.camera.exposure = data
			this.setVariable('exposure_mode', data.ExpMode)
			this.setVariable('exposure_comp', data.ExpCompEn)
			this.setVariable('exposure_comp_level', data.ExpCompLvl)
			this.setVariable('ae_response', data.AeReponse)
			this.setVariable('slow_shutter', data.SlowShutterEn)
			this.setVariable('slow_shutter_limit', data.SlowShutterLimit)
			this.setVariable('shutter_control_overwrite', data.ShutterControlOverwrite)
			this.setVariable('shutter_speed_overwrite', data.ShutterSpeedOverwrite)
			this.setVariable('shutter_max_speed', data.ShutterMaxSpeed)
			this.setVariable('shutter_min_speed', data.ShutterMinSpeed)
			this.setVariable('gain_point', data.GainPoint)
			this.setVariable('gain_point_position', data.GainPointPosition)
			this.setVariable('bright_level', data.BrightLevel)
			this.setVariable('high_sensitivity', data.HighSensitivity)
			this.setVariable('backlight', data.BackLight)
			this.setVariable('spotlight', data.Spotlight)
			this.setVariable('iris', data.IrisLevel == '4' ? 'CLOSED' : this.IRIS.find((o) => o.id == data.IrisLevel)?.label)
			this.setVariable('gain', this.GAIN.find((o) => o.id == data.GainLevel)?.label)
			this.setVariable('gain_limit', this.GAIN.find((o) => o.id == data.GainLimit)?.label)
			this.setVariable('shutter_speed', this.SHUTTER.find((o) => o.id == data.ShutterSpeed)?.label)
		} else if (cmd.match('/birddogwbsetup')) {
			this.camera.wb = data
			this.setVariable('wb_mode', data.WbMode)
			this.setVariable('wb_blue_gain', data.BlueGain)
			this.setVariable('wb_red_gain', data.RedGain)
			this.setVariable('color_temp', data.ColorTemp)
			this.checkFeedbacks()
		} else if (cmd.match('/birddogpicsetup')) {
			this.camera.pic = data
			this.setVariable('backlight_com', data.BackLightCom)
			this.setVariable('chroma_suppress', data.ChromeSuppress)
			this.setVariable('saturation', data.Color)
			this.setVariable('contrast', data.Contrast)
			this.setVariable('effect', data.Effect)
			this.setVariable('flip', data.Flip)
			this.setVariable('gamma', data.Gamma)
			this.setVariable('hlc_mode', data.HighlightComp)
			this.setVariable('hue', data.Hue)
			this.setVariable('ir_cutfilter', data.IRCutFilter)
			this.setVariable('mirror', data.Mirror)
			this.setVariable('noise_reduction', data.NoiseReduction)
			this.setVariable('sharpness', data.Sharpness)
			this.setVariable('stabilizer', data.Stabilizer)
			this.setVariable('2d_nr', data.TWODNR)
			this.setVariable('3d_nr', data.ThreeDNR)
			this.setVariable('wide_dynamic_range', data.WideDynamicRange)
			this.setVariable('low_latency', data.LowLatency)
			this.setVariable('nd_filter', data.NDFilter)
		} else if (cmd.match('/birddogcmsetup')) {
			this.camera.color = data
		} else if (cmd.match('/birddogadvancesetup')) {
			this.camera.advanced = data
		}
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
		switch (data[7].toString(16)) {
			case '4a': // Query Standby status
				if (data[8] == 0x90 && data[9] == 0x50 && data[10] == 0x02 && data[11] == 0xff) {
					this.camera.status = 'on'
					this.setVariable('standby', 'On')
				} else if (data[8] == 0x90 && data[9] == 0x50 && data[10] == 0x03 && data[11] == 0xff) {
					this.camera.status = 'standby'
					this.setVariable('standby', 'Standby')
				}
				this.checkFeedbacks()
				break
			case '5a': // Query Auto Focus mode
				if (data[8] == 0x90 && data[9] == 0x50 && data[10] == 0x02 && data[11] == 0xff) {
					this.camera.AFMode = 'Auto'
					this.setVariable('af_mode', 'Auto')
				} else if (data[8] == 0x90 && data[9] == 0x50 && data[10] == 0x03 && data[11] == 0xff) {
					this.camera.AFMode = 'Manual'
					this.setVariable('af_mode', 'Manual')
				}
				this.checkFeedbacks()
				break
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
			debug(this.udp.host, ':', this.port)
		}
	}

	poll() {
		this.sendCommand('about', 'GET')
		this.sendCommand('analogaudiosetup', 'GET')
		this.sendCommand('encodetransport', 'GET')
		this.sendCommand('encodesetup', 'GET')
		this.sendCommand('NDIDisServer', 'GET')
		this.sendCommand('birddogptzsetup', 'GET')
		this.sendCommand('birddogexpsetup', 'GET')
		this.sendCommand('birddogwbsetup', 'GET')
		this.sendCommand('birddogpicsetup', 'GET')
		this.sendCommand('birddogcmsetup', 'GET')
		this.sendCommand('birddogadvancesetup', 'GET')
		// Query Standby status
		this.sendVISCACommand('\x81\x09\x04\x00\xFF', '\x4a')
		// Query Auto Focus Mode
		this.sendVISCACommand('\x81\x09\x04\x38\xFF', '\x5a')
		this.checkFeedbacks()
	}
}
exports = module.exports = instance
