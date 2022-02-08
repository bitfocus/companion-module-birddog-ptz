const instance_skel = require('../../instance_skel')
const actions = require('./actions')
const presets = require('./presets')
const { updateVariableDefinitions, updateSourceVariables } = require('./variables')
const { initFeedbacks } = require('./feedbacks')

const udp = require('../../udp')

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
	}

	config_fields() {
		return [
			{
				type: 'text',
				id: 'info',
				width: 12,
				label: 'Information',
				value: 'This module controls Birddog Cameras over IP Visca protocol',
			},
			{
				type: 'textinput',
				id: 'host',
				label: 'Target IP',
				width: 6,
				regex: this.REGEX_IP,
			},
			{
				type: 'dropdown',
				id: 'pollActive',
				label: 'Activate poll every 3 sec',
				default: 'off',
				choices: [
					{ id: 'off', label: 'Off' },
					{ id: 'on', label: 'On' },
				],
			},
		]
	}

	updateConfig(config) {
		this.config = config

		if (this.udp !== undefined) {
			this.udp.destroy()
			delete this.udp
		}

		clearInterval(this.poll_interval)

		this.status(this.STATUS_UNKNOWN)

		if (this.config.host !== undefined) {
			this.udp = new udp(this.config.host, this.port)

			// poll monitoring
			if (this.config.pollActive == 'on') {
				this.poll_interval = setInterval(this.poll.bind(this), 3000) //ms for poll
				this.poll()
			}

			this.udp.on('status_change', function (status, message) {
				this.status(status, message)
			})
		}
	}

	destroy() {
		clearInterval(this.poll_interval)

		if (this.udp !== undefined) {
			this.udp.destroy()
		}
		debug('destroy', this.id)
	}

	init() {
		debug = this.debug
		log = this.log
		this.port = 52381
		this.status(this.STATUS_WARNING, 'Connecting')
		this.actions()
		this.initVariables()
		this.initFeedbacks()
		this.initPresets()

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

		switch (action.action) {
			case 'power':
				if (opt.val == '0') {
					cmd = '\x81\x01\x04\x00\x02\xFF'
				}
				if (opt.val == '1') {
					cmd = '\x81\x01\x04\x00\x03\xFF'
				}
				this.sendVISCACommand(cmd)
				break

			case 'initalize':
				if (opt.val == '0') {
					cmd = '\x81\x04\x19\x01\xFF'
				}
				if (opt.val == '1') {
					cmd = '\x81\x04\x19\x03\xFF'
				}
				this.sendVISCACommand(cmd)
				break

			case 'pt':
				switch (opt.val) {
					case '0':
						cmd =
							'\x81\x01\x06\x01' +
							String.fromCharCode(parseInt(this.ptSpeed, 16) & 0xff) +
							String.fromCharCode(parseInt(this.ptSpeed, 16) & 0xff) +
							'\x01\x03\xFF'
						break
					case '1':
						cmd =
							'\x81\x01\x06\x01' +
							String.fromCharCode(parseInt(this.ptSpeed, 16) & 0xff) +
							String.fromCharCode(parseInt(this.ptSpeed, 16) & 0xff) +
							'\x02\x03\xFF'
						break
					case '2':
						cmd =
							'\x81\x01\x06\x01' +
							String.fromCharCode(parseInt(this.ptSpeed, 16) & 0xff) +
							String.fromCharCode(parseInt(this.ptSpeed, 16) & 0xff) +
							'\x03\x01\xFF'
						break
					case '3':
						cmd =
							'\x81\x01\x06\x01' +
							String.fromCharCode(parseInt(this.ptSpeed, 16) & 0xff) +
							String.fromCharCode(parseInt(this.ptSpeed, 16) & 0xff) +
							'\x03\x02\xFF'
						break
					case '4':
						cmd =
							'\x81\x01\x06\x01' +
							String.fromCharCode(parseInt(this.ptSpeed, 16) & 0xff) +
							String.fromCharCode(parseInt(this.ptSpeed, 16) & 0xff) +
							'\x01\x01\xFF'
						break
					case '5':
						cmd =
							'\x81\x01\x06\x01' +
							String.fromCharCode(parseInt(this.ptSpeed, 16) & 0xff) +
							String.fromCharCode(parseInt(this.ptSpeed, 16) & 0xff) +
							'\x02\x01\xFF'
						break
					case '6':
						cmd =
							'\x81\x01\x06\x01' +
							String.fromCharCode(parseInt(this.ptSpeed, 16) & 0xff) +
							String.fromCharCode(parseInt(this.ptSpeed, 16) & 0xff) +
							'\x01\x02\xFF'
						break
					case '7':
						cmd =
							'\x81\x01\x06\x01' +
							String.fromCharCode(parseInt(this.ptSpeed, 16) & 0xff) +
							String.fromCharCode(parseInt(this.ptSpeed, 16) & 0xff) +
							'\x02\x02\xFF'
						break
					case '8':
						cmd =
							'\x81\x01\x06\x01' +
							String.fromCharCode(parseInt(this.ptSpeed, 16) & 0xff) +
							String.fromCharCode(parseInt(this.ptSpeed, 16) & 0xff) +
							'\x03\x03\xFF'
						break
					case '9':
						cmd = '\x81\x01\x06\x04\xFF'
						break
				}
				this.sendVISCACommand(cmd)
				break

			case 'ptSlow':
				if (opt.bol == '0') {
					cmd = '\x81\x01\x06\x44\x02\xFF'
				}
				if (opt.bol == '1') {
					cmd = '\x81\x01\x06\x44\x03\xFF'
				}
				this.sendVISCACommand(cmd)
				break

			case 'ptSpeedS':
				this.ptSpeed = opt.speed

				var idx = -1
				for (var i = 0; i < SPEED.length; ++i) {
					if (SPEED[i].id == this.ptSpeed) {
						idx = i
						break
					}
				}
				if (idx > -1) {
					this.ptSpeedIndex = idx
				}
				debug(this.ptSpeed + ' == ' + this.ptSpeedIndex)
				break

			case 'ptSpeedD':
				if (this.ptSpeedIndex == 23) {
					this.ptSpeedIndex = 23
				} else if (this.ptSpeedIndex < 23) {
					this.ptSpeedIndex++
				}
				this.ptSpeed = SPEED[this.ptSpeedIndex].id
				break

			case 'ptSpeedU':
				if (this.ptSpeedIndex == 0) {
					this.ptSpeedIndex = 0
				} else if (this.ptSpeedIndex > 0) {
					this.ptSpeedIndex--
				}
				this.ptSpeed = SPEED[this.ptSpeedIndex].id
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

			case 'ciZoom':
				if (opt.bol == 0) {
					cmd = '\x81\x01\x04\x06\x03\xFF'
				}
				if (opt.bol == 1) {
					cmd = '\x81\x01\x04\x06\x04\xFF'
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
				if (opt.bol == 0) {
					cmd = '\x81\x01\x04\x38\x02\xFF'
				}
				if (opt.bol == 1) {
					cmd = '\x81\x01\x04\x38\x03\xFF'
				}
				this.sendVISCACommand(cmd)
				break

			case 'expM':
				if (opt.val == 0) {
					cmd = '\x81\x01\x04\x39\x00\xFF'
				}
				if (opt.val == 1) {
					cmd = '\x81\x01\x04\x39\x03\xFF'
				}
				if (opt.val == 2) {
					cmd = '\x81\x01\x04\x39\x0A\xFF'
				}
				if (opt.val == 3) {
					cmd = '\x81\x01\x04\x39\x0B\xFF'
				}
				if (opt.val == 4) {
					cmd = '\x81\x01\x04\x39\x0E\xFF'
				}
				this.sendVISCACommand(cmd)
				break

			case 'wb':
				switch (opt.val) {
					case '0':
						cmd = '\x81\x01\x04\x35\x00\xFF'
						break
					case '1':
						cmd = '\x81\x01\x04\x35\x01\xFF'
						break
					case '2':
						cmd = '\x81\x01\x04\x35\x02\xFF'
						break
					case '3':
						cmd = '\x81\x01\x04\x35\x03\xFF'
						break
					case '4':
						cmd = '\x81\x01\x04\x35\x04\xFF'
						break
					case '5':
						cmd = '\x81\x01\x04\x35\x05\xFF'
						break
					case '6':
						cmd = '\x81\x01\x04\x10\x05\xFF'
						break
					case '7':
						cmd = '\x81\x01\x04\x35\x06\xFF'
						break
					case '8':
						cmd = '\x81\x01\x04\x35\x07\xFF'
						break
					case '9':
						cmd = '\x81\x01\x04\x35\x08\xFF'
						break
					case '10':
						cmd = '\x81\x01\x04\x35\x09\xFF'
						break
				}
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
						var number = opt.value
						if (number > 255) {
							number = '255'
						}
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
						var number = opt.value
						if (number > 255) {
							number = '255'
						}
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
						var number = opt.value
						if (number > 255) {
							number = '255'
						}
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
						var number = opt.value
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
						var number = opt.value
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
				cmd.writeUInt8(opt.val, 5)
				//cmd.writeUInt8((opt.val - parseInt(opt.val.toString(8) >> 4)*16),7);
				this.sendVISCACommand(cmd)
				break

			case 'recallPset':
				cmd = Buffer.from('\x81\x01\x04\x3F\x02\x00\xFF', 'binary')
				cmd.writeUInt8(opt.val, 5)
				//cmd.writeUInt8((opt.val - parseInt(opt.val.toString(8) >> 4)*16),7);
				this.sendVISCACommand(cmd)
				break

			case 'pictureEffect':
				switch (opt.val) {
					case '0':
						cmd = '\x81\x01\x04\x63\x00\xFF'
						break
					case '1':
						cmd = '\x81\x01\x04\x63\x02\xFF'
						break
					case '2':
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
				if (opt.bol == 0) {
					cmd = '\x81\x01\x04\x11\x00\xFF'
				}
				if (opt.bol == 1) {
					cmd = '\x81\x01\x04\x11\x01\xFF'
				}
				this.sendVISCACommand(cmd)
				break

			case 'hrMode':
				if (opt.bol == 0) {
					cmd = '\x81\x01\x04\x52\x03\xFF'
				}
				if (opt.bol == 1) {
					cmd = '\x81\x01\x04\x52\x02\xFF'
				}
				this.sendVISCACommand(cmd)
				break

			case 'highSensitivity':
				if (opt.bol == 0) {
					cmd = '\x81\x01\x04\x5E\x03\xFF'
				}
				if (opt.bol == 1) {
					cmd = '\x81\x01\x04\x5E\x02\xFF'
				}
				this.sendVISCACommand(cmd)
				break

			case 'tally':
				if (opt.bol == 0) {
					cmd = '\x81\x01\x7E\x01\x0A\x00\x03\xFF'
				}
				if (opt.bol == 1) {
					cmd = '\x81\x01\x7E\x01\x0A\x00\x02\xFF'
				}
				this.sendVISCACommand(cmd)
				break

			case 'freeze':
				switch (opt.val) {
					case '0':
						cmd = '\x81\x01\x04\x62\x02\xFF'
						break
					case '1':
						cmd = '\x81\x01\x04\x62\x03\xFF'
						break
				}
				this.sendVISCACommand(cmd)
				break

			case 'picFlip':
				switch (opt.val) {
					case '0':
						cmd = '\x81\x01\x04\x66\x03\xFF'
						break
					case '1':
						cmd = '\x81\x01\x04\x66\x02\xFF'
						break
				}
				this.sendVISCACommand(cmd)
				break

			case 'picMirror':
				switch (opt.val) {
					case '0':
						cmd = '\x81\x01\x04\x61\x03\xFF'
						break
					case '1':
						cmd = '\x81\x01\x04\x61\x02\xFF'
						break
				}
				this.sendVISCACommand(cmd)
				break

			case 'custom':
				var hexData = opt.custom.replace(/\s+/g, '')
				var tempBuffer = Buffer.from(hexData, 'hex')
				cmd = tempBuffer.toString('binary')
				if ((tempBuffer[0] & 0xf0) === 0x80) {
					this.sendVISCACommand(cmd)
				} else {
					this.log('error', 'Error, command "' + opt.custom + '" does not start with 8')
				}
				break
		}
	}

	///OLD

	sendVISCACommand(payload, counter) {
		var buf = Buffer.alloc(32)

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

		var newbuf = buf.slice(0, 8 + payload.length)

		// udp.send(newbuf);

		debug('sending', newbuf, 'to', this.udp.host)
		this.udp.send(newbuf)
	}

	incomingData(data) {
		debug('incoming', data)
	}

	sendResponse(data) {
		debug('test')
		//this.sendVISCACommand(cmd,data);
	}

	sendControlCommand(payload) {
		var buf = Buffer.alloc(32)

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

		var newbuf = buf.slice(0, 8 + payload.length)

		// udp.send(newbuf);

		debug('sending', newbuf, 'to', this.udp.host)
		this.udp.send(newbuf)
	}
	init_udp() {
		if (this.udp !== undefined) {
			this.udp.destroy()
			delete this.udp
		}

		if (this.config.host !== undefined) {
			this.udp = new udp(this.config.host, this.port)

			// Reset sequence number
			this.sendControlCommand('\x01')
			this.packet_counter = 0

			// poll monitoring
			if (this.config.pollActive == 'on') {
				this.poll_interval = setInterval(this.poll.bind(this), 3000) //ms for poll
				this.poll()
			}

			this.udp.on('status_change', function (status, message) {
				//this.status(status, message)
			})
			this.udp.on('data', function (data) {
				//this.instance.incomingData(data)
			})
			debug(this.udp.host, ':', this.port)
		}
	}
	poll() {
		//shutter
		this.sendVISCACommand('\x81\x09\x04\x4a\xFF', '\x4a')
		//gain
		this.sendVISCACommand('\x81\x09\x04\x4c\xFF', '\x4c')
		//gain red
		this.sendVISCACommand('\x81\x09\x04\x43\xFF', '\x43')
		//gain blue
		this.sendVISCACommand('\x81\x09\x04\x44\xFF', '\x44')
		//iris
		this.sendVISCACommand('\x81\x09\x04\x4b\xFF', '\x4b')
	}
}
exports = module.exports = instance
