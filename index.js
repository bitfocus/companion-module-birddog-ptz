import { InstanceBase, runEntrypoint, UDPHelper } from '@companion-module/base'

import { getActions } from './actions.js'
import { getPresets } from './presets.js'
import { updateVariableDefinitions, updateVariables } from './variables.js'
import { getFeedbacks } from './feedbacks.js'
import { upgradeScripts } from './upgrades.js'
import { addStringToBinary, strToPQRS, getModelQueries } from './utils.js'
import { VISCA } from './constants.js'
import CHOICES from './choices.js'
import { MODEL_QUERIES, MODEL_SPECS } from './models.js'

import fetch from 'node-fetch'
import WebSocket from 'ws'

class BirdDogPTZInstance extends InstanceBase {
	constructor(internal) {
		super(internal)
	}

	async init(config) {
		this.updateStatus('connecting')
		this.config = config

		this.port = 52381 // Visca port
		this.addStringToBinary = addStringToBinary
		this.strToPQRS = strToPQRS
		this.updateVariables = updateVariables

		// Keep track of setInterval
		this.timers = {
			pollCameraConfig: null, // ID of setInterval for Camera Config polling
			pollCameraStatus: null, // ID of setInterval for Camera Status polling
		}

		// Get Initial Camera Info
		this.getCameraModel()
	}

	async destroy() {
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
	}

	getConfigFields() {
		return [
			{
				type: 'static-text',
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

	async configUpdated(config) {
		this.config = config

		this.updateStatus('connecting')

		if (this.config.host !== undefined) {
			this.log('debug', '----Config Model Choice:- ' + this.config.model)
			this.getCameraModel()
		} else {
			this.updateStatus(
				'bad_config',
				'Unable to connect, please enter an IP address for your camera in the module settings'
			)
		}
	}

	initVariables() {
		updateVariableDefinitions.bind(this)()
	}

	initFeedbacks() {
		const feedbacks = getFeedbacks.bind(this)()
		this.setFeedbackDefinitions(feedbacks)
	}

	initPresets() {
		const presets = getPresets.bind(this)()
		this.setPresetDefinitions(presets)
	}

	initActions() {
		const actions = getActions.bind(this)()
		this.setActionDefinitions(actions)
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
					this.updateStatus('ok')
					return res.json()
				}
			})
			.then((json) => {
				let data = json
				if (data && type == 'GET') {
					this.processData(decodeURI(url), data)
				} else if ((data && type == 'PUT') || type == 'POST') {
				} else {
					this.log('debug', `Command failed ${url}`)
				}
			})
			.catch((err) => {
				this.log('debug', `Command Error: ${err}`)
				let errorText = String(err)
				if (
					errorText.match('ECONNREFUSED') ||
					errorText.match('ENOTFOUND') ||
					errorText.match('EHOSTDOWN') ||
					errorText.match('ETIMEDOUT')
				) {
					this.updateStatus('connection_failure')
					//this.log('error', `Connection lost to ${this.camera?.HostName ? this.camera.HostName : 'BirdDog PTZ camera'}`)
				}
			})
	}

	processData(cmd, data) {
		let changed
		switch (cmd.slice(cmd.lastIndexOf('/') + 1)) {
			case 'about':
				changed = this.storeState(data, 'about')
				//this.camera.about = data
				break
			case 'analogaudiosetup':
				changed = this.storeState(data, 'analogaudiosetup')
				//this.camera.audio = data
				break
			case 'devicesettings':
				changed = this.storeState(data, 'devicesettings')
				//this.camera.devicesettings = data
				break
			case 'videooutputinterface':
				changed = this.storeState(data, 'videooutputinterface')
				//this.camera.video = data
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
								this.initActions()
							}
							break
						case '25':
						case '50':
							if (!(this.camera.shutter_table === '50')) {
								this.camera.shutter_table = '50'
								this.initActions()
							}
							break
						default:
							if (!(this.camera.shutter_table === '60')) {
								this.camera.shutter_table = '60'
								this.initActions()
							}
							break
					}
				}
				if (this.camera?.framerate) {
					this.camera.framerate = match[1]
				}
				//this.camera.encode = data
				break
			case 'encodetransport':
				changed = this.storeState(data, 'encodetransport')
				//this.camera.transport = data
				break
			case 'NDIDisServer':
				changed = this.storeState(data, 'NDIDisServer')
				//this.camera.ndiserver = data
				break
			case 'birddogptzsetup':
				let originalSpeedState = this.camera?.speedControl
				changed = this.storeState(data, 'birddogptzsetup')

				if (!originalSpeedState || originalSpeedState !== data.SpeedControl) {
					this.initActions()
					this.initFeedbacks()
				}

				//this.camera.ptz = data
				break
			case 'birddogexpsetup':
				changed = this.storeState(data, 'birddogexpsetup')

				if (changed.includes('gain_limit')) {
					// rebuild actions as GainLimit has changed
					this.log('debug', '-----Gain Limit changed')
					this.initActions()
					this.initFeedbacks()
				}

				if (changed.includes('shutter_max_speed')) {
					// rebuild actions as Shutter Max speed has changed
					this.log('debug', '-----ShutterMaxSpeed changed')
					this.initActions()
					this.initFeedbacks()
				}

				if (changed.includes('shutter_min_speed')) {
					// rebuild actions as Shutter Min speed has changed
					this.log('debug', '-----ShutterMinSpeed changed')
					this.initActions()
					this.initFeedbacks()
				}
				//this.camera.expsetup = data
				break
			case 'birddogwbsetup':
				changed = this.storeState(data, 'birddogwbsetup')
				//this.camera.wbsetup = data
				break
			case 'birddogpicsetup':
				changed = this.storeState(data, 'birddogpicsetup')
				//this.camera.picsetup = data
				break
			case 'birddogcmsetup':
				changed = this.storeState(data, 'birddogcmsetup')
				//this.camera.cmsetup = data
				break
			case 'birddogadvancesetup':
				changed = this.storeState(data, 'birddogadvancesetup')
				//this.camera.advancesetup = data
				break
			case 'birddogexternalsetup':
				changed = this.storeState(data, 'birddogexternalsetup')
				//this.camera.externalsetup = data
				break
			case 'birddogdetsetup':
				changed = this.storeState(data, 'birddogdetsetup')
				//this.camera.detsetup = data
				break
			case 'birddoggammasetup':
				changed = this.storeState(data, 'birddoggammasetup')
				//this.camera.gammasetup = data
				break
			case 'birddogscope':
				changed = this.storeState(data, 'birddogscope')
				//this.camera.birddogscope = data
				break
		}
		if (changed.length > 0) {
			this.updateVariables()
			this.checkFeedbacks()
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

		let newbuf = buf.subarray(0, 8 + payload.length)
		//this.log('debug', '-----Sending VISCA message: ' + Buffer.from(newbuf, 'binary').toString('hex'))
		this.udp.send(newbuf)
	}

	incomingData(data) {
		//this.log('debug', '-----Incoming VISCA message: ' + Buffer.from(data, 'binary').toString('hex'))
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
				if (
					this.validateVISCA(data, 14) &&
					data[8] == 0x90 &&
					data[9] == 0x50 &&
					data[13] !== 0x50 &&
					data[14] == 0xff
				) {
					this.camera.zoom_position =
						data[10].toString(16) + data[11].toString(16) + data[12].toString(16) + data[13].toString(16)
				}
				break
			case '5d': // Query Pan/Tilt Position
				if (this.validateVISCA(data, 18) && data[8] == 0x90 && data[9] == 0x50 && data[18] == 0xff) {
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

	validateVISCA(data, validSlot) {
		//console.log(data.indexOf(0xff, 0))
		return data.indexOf(0xff, 0) === validSlot ? true : false
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

		let newbuf = buf.subarray(0, 8 + payload.length)

		this.udp.send(newbuf)
	}

	init_udp() {
		this.log('debug', '----init udp')
		if (this.udp !== undefined) {
			this.udp.destroy()
			delete this.udp
		}
		if (this.timers.pollCameraStatus !== undefined) {
			clearInterval(this.timers.pollCameraStatus)
		}
		if (this.config.host !== undefined) {
			this.udp = new UDPHelper(this.config.host, this.port)

			// Reset sequence number
			this.sendControlCommand('\x01')
			this.packet_counter = 0

			this.startPolling()

			this.udp.on('status_change', (status, message) => {
				//this.updateStatus('unknown_error', message)
			})
			this.udp.on('data', (data) => {
				this.incomingData(data)
			})
			this.udp.on('error', (error) => {
				this.log('debug', '----UDP Error: ' + error)
			})
			this.log('debug', this.udp.host, ':', this.port)
		}
	}

	init_ws_listener() {
		this.log('debug', '----init websocket')
		clearInterval(this.timers.ws_reconnect)

		if (this.ws !== undefined) {
			this.ws.close(1000)
			delete this.ws
		}

		this.ws = new WebSocket(`ws://${this.config.host}:6790/`)

		this.ws.on('open', () => {
			this.log('debug', `WebSocket connection opened to ${this.camera.hostname}`)
		})

		this.ws.on('close', (code) => {
			this.log('debug', `---- WebSocket Connection closed with code ${code}`)
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
				this.log('debug', 'JSON Error:' + e)
			}
			//this.log('debug', `---- WebSocket received: ${JSON.stringify(data)}`)
		})

		this.ws.on('error', (data) => {
			this.log('debug', `WebSocket error: ${data}`)
		})
	}

	// Poll for BirdDog camera configuration/status
	startPolling() {
		this.stopPolling()
		//Immediately do the poll
		this.pollCameraConfig()
		this.pollCameraStatus()

		// Repeat the poll at set intervals
		this.timers.pollCameraConfig = setInterval(this.pollCameraConfig.bind(this), 10000) // No need to poll frequently
		this.timers.pollCameraStatus = setInterval(this.pollCameraStatus.bind(this), 1000) // This will be used to get status of the camera
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

		if (this.camera?.standby === 'on') {
			//Sending this while camera is in standby makes it unable to wake-up
			this.sendVISCACommand(VISCA.MSG_QRY + VISCA.CAM_ZOOM_DIRECT + VISCA.END_MSG, '\x5c') // Query Zoom Position
		}

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

		//this.log('debug', `----Camera Setup for - ${this.camera.model}`)
		//this.log('debug', this.camera)
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
						//this.log('debug',res)
						return res.text()
					}
				})
				.then((data) => {
					let model = data
					if (model) {
						model = model.replace(/BirdDog| |_/g, '')
						this.getCameraFW(this.checkCameraModel(model))
					} else if (!model) {
						this.log('error', 'Please upgrade your BirdDog camera to the latest LTS firmware to use this module')
						this.updateStatus('connection_failure')
						if (this.timers.pollCameraStatus !== undefined) {
							clearInterval(this.timers.pollCameraStatus)
						}
					}
				})
				.catch((err) => {
					this.log('debug', `Get Cam Model Error ${err}`)
					let errorText = String(err)
					if (
						errorText.match('ECONNREFUSED') ||
						errorText.match('ENOTFOUND') ||
						errorText.match('EHOSTDOWN') ||
						errorText.match('ETIMEDOUT')
					) {
						this.updateStatus('connection_failure')
						this.log('error', `Unable to connect to BirdDog PTZ Camera (Error: ${errorText?.split('reason:')[1]})`)
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
					//this.log('debug',res)
					return res.json()
				}
			})
			.then((data) => {
				if (data.FirmwareVersion) {
					let FW_major = data.FirmwareVersion.substring(data.FirmwareVersion.lastIndexOf(' ') + 1).substring(0, 1)
					let FW_minor = data.FirmwareVersion.substring(data.FirmwareVersion.lastIndexOf(' ') + 2).substring(1)

					// Set Initial State for Camera
					this.intializeState(model, data.HostName, FW_major, FW_minor)

					// InitializeCamera
					this.initializeCamera()
				} else if (data.Version === '1.0') {
					this.log('error', 'Please upgrade your BirdDog camera to the latest LTS firmware to use this module')
					this.updateStatus('connection_failure')
					if (this.timers.pollCameraStatus !== undefined) {
						clearInterval(this.timers.pollCameraStatus)
					}
				}
			})
			.catch((err) => {
				this.log('debug', `Camera Firmware Error: ${err}`)
				let errorText = String(err)
				if (
					errorText.match('ECONNREFUSED') ||
					errorText.match('ENOTFOUND') ||
					errorText.match('EHOSTDOWN') ||
					errorText.match('ETIMEDOUT')
				) {
					this.updateStatus('connection_failure')
					this.log('error', `Unable to connect to BirdDog PTZ Camera (Error: ${errorText?.split('reason:')[1]})`)
				}
			})
	}

	initializeCamera() {
		// this.log('debug','---- in initializeCamera')
		if (this.camera.firmware.major && this.camera.model) {
			this.updateStatus('ok')
			this.log('info', `Connected to ${this.camera.hostname}`)
			this.log('debug', `---- Connected to ${this.camera.hostname}`)

			this.initActions()
			this.initPresets()
			this.initVariables()
			this.initFeedbacks()

			this.init_udp()

			if (this.camera.firmware.major === '5') {
				this.init_ws_listener()
			}
		} else {
			this.updateStatus('connection_failure')
			this.log('error', `Unable to connect to ${this.camera.hostname}`)
		}
	}

	checkCameraModel(detectedModel) {
		//this.log('debug','---- In checkCameraModel with detectedModel as', detectedModel)
		let model = CHOICES.CAMERAS.find((element) => {
			// this.log('debug','---- Checking element ', element)
			if (element.id === detectedModel) {
				return detectedModel
			} else if (element?.other) {
				let tempArray = Object.entries(element)
				return tempArray[2][1].includes(detectedModel)
			} else {
				// this.log('debug','---- Returning False for ', element)
				return false
			}
		})
		if (model) {
			this.log('info', `Detected camera model: ${model.id}`)
			this.log('debug', '---- Detected camera model: ' + model.id)
			return model.id
		} else {
			this.log('error', `Unrecognized camera model: ${detectedModel}. Using "Default" camera profile`)
			this.log('debug', `Unrecognized camera model: ${detectedModel}. Using "Default" camera profile`)
			return 'Default'
		}
	}

	intializeState(model, hostname, FW_major, FW_minor) {
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
		this.camera.hostname = hostname
		this.camera.firmware = {}
		this.camera.firmware.major = FW_major
		this.camera.firmware.minor = FW_minor
		this.camera.shutter_table = 60 // Camera defaults to 59.94 on startup
		this.camera.unknown = [] // Array to store unknown API variables

		//this.log('debug', '---- Initial State for camera', this.camera)
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
					this.log('debug', `Unknown API variable returned from ${endpoint}: ${element[0]}`)
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

runEntrypoint(BirdDogPTZInstance, upgradeScripts)
