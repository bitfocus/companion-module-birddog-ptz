const { sortByAction, getModelActions } = require('./utils')
var { MODEL_SPECS } = require('./models.js')
const VISCA = require('./constants')
const CHOICES = require('./choices.js')

module.exports = {
	getActions() {
		let cmd = ''
		let newValue
		currentValue
		let body = {}

		MODEL_ACTIONS = getModelActions(MODEL_SPECS, this.camera.firmware.major, this.camera.model)

		if (!MODEL_ACTIONS && this.currentStatus != 2) {
			this.log('error', `Unrecognized camera model: ${this.camera.model}`)
			this.status(this.STATUS_ERROR)
			if (this.poll_interval !== undefined) {
				clearInterval(this.poll_interval)
			}
		}

		let actions = {}

		// General Camera Actions

		// VISCA Actions
		if (MODEL_ACTIONS?.standby) {
			actions['standby'] = {
				label: MODEL_ACTIONS.standby.name,
				options: [
					{
						type: 'dropdown',
						label: 'On/Standby',
						id: 'val',
						choices: MODEL_ACTIONS.standby.choices,
						default: MODEL_ACTIONS.standby.default,
					},
				],
				callback: (action) => {
					switch (action.options.val) {
						case 'on':
							cmd = VISCA.MSG_CAM + VISCA.CAM_POWER + VISCA.DATA_ONVAL + VISCA.END_MSG
							break
						case 'standby':
							cmd = VISCA.MSG_CAM + VISCA.CAM_POWER + VISCA.DATA_OFFVAL + VISCA.END_MSG
							break
					}
					this.sendVISCACommand(cmd)
				},
			}
		}

		if (MODEL_ACTIONS?.freeze) {
			actions['freeze'] = {
				label: MODEL_ACTIONS.freeze.name,
				options: [
					{
						type: 'dropdown',
						label: 'On / Off',
						id: 'val',
						choices: MODEL_ACTIONS.freeze.choices,
						default: MODEL_ACTIONS.freeze.default,
					},
				],
				callback: (action) => {
					switch (action.options.val) {
						case 'On':
							cmd = VISCA.MSG_CAM + VISCA.CAM_FREEZE + VISCA.DATA_ONVAL + VISCA.END_MSG
							break
						case 'Off':
							cmd = VISCA.MSG_CAM + VISCA.CAM_FREEZE + VISCA.DATA_OFFVAL + VISCA.END_MSG
							break
					}
					this.sendVISCACommand(cmd)
				},
			}
		}

		// Analog Audio Actions

		if (MODEL_ACTIONS?.analogAudioInGain) {
			actions['analogAudioInGain'] = {
				label: MODEL_ACTIONS.analogAudioInGain.name,
				options: [
					{
						type: 'dropdown',
						label: 'Action',
						id: 'val',
						choices: MODEL_ACTIONS.analogAudioInGain.choices,
						default: MODEL_ACTIONS.analogAudioInGain.default,
					},
					{
						type: 'number',
						label:
							'Analog Audio In Gain (dB) (' +
							MODEL_ACTIONS.analogAudioInGain.range.min +
							' to ' +
							MODEL_ACTIONS.analogAudioInGain.range.max +
							')',
						id: 'value',
						default: MODEL_ACTIONS.analogAudioInGain.range.default,
						min: MODEL_ACTIONS.analogAudioInGain.range.min,
						max: MODEL_ACTIONS.analogAudioInGain.range.max,
						range: true,
						isVisible: (action) => action.options.val === 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.analogAudioInGain
						? this.camera.analogAudioInGain
						: MODEL_ACTIONS.analogAudioInGain.range.default
					switch (action.options.val) {
						case 'up':
							newValue =
								currentValue < MODEL_ACTIONS.analogAudioInGain.range.max + 50
									? ++currentValue
									: MODEL_ACTIONS.analogAudioInGain.range.max
							break
						case 'down':
							newValue =
								currentValue > MODEL_ACTIONS.analogAudioInGain.range.min + 50
									? --currentValue
									: MODEL_ACTIONS.analogAudioInGain.range.min
							break
						case 'value':
							newValue = action.options.value + 50 //Convert value to API range
							break
					}
					body = {
						AnalogAudioInGain: String(newValue),
					}
					this.sendCommand('analogaudiosetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.analogAudioOutGain) {
			actions['analogAudioOutGain'] = {
				label: MODEL_ACTIONS.analogAudioOutGain.name,
				options: [
					{
						type: 'dropdown',
						label: 'Action',
						id: 'val',
						choices: MODEL_ACTIONS.analogAudioOutGain.choices,
						default: MODEL_ACTIONS.analogAudioOutGain.default,
					},
					{
						type: 'number',
						label:
							'Analog Audio Out Gain (dB) (' +
							MODEL_ACTIONS.analogAudioOutGain.range.min +
							' to ' +
							MODEL_ACTIONS.analogAudioOutGain.range.max +
							')',
						id: 'value',
						default: MODEL_ACTIONS.analogAudioOutGain.range.default,
						min: MODEL_ACTIONS.analogAudioOutGain.range.min,
						max: MODEL_ACTIONS.analogAudioOutGain.range.max,
						range: true,
						isVisible: (action) => action.options.val === 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.analogAudioOutGain
						? this.camera.analogAudioOutGain
						: MODEL_ACTIONS.analogAudioOutGain.range.default
					switch (action.options.val) {
						case 'up':
							newValue =
								currentValue < MODEL_ACTIONS.analogAudioOutGain.range.max + 50
									? ++currentValue
									: MODEL_ACTIONS.analogAudioOutGain.range.max
							break
						case 'down':
							newValue =
								currentValue > MODEL_ACTIONS.analogAudioOutGain.range.min + 50
									? --currentValue
									: MODEL_ACTIONS.analogAudioOutGain.range.min
							break
						case 'value':
							newValue = action.options.value + 50 //Convert value to API range
							break
					}
					body = {
						AnalogAudioOutGain: String(newValue), //Convert action range to API range
					}
					this.sendCommand('analogaudiosetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.analogAudioOutput) {
			actions['analogAudioOutput'] = {
				label: MODEL_ACTIONS.analogAudioOutput.name,
				options: [
					{
						type: 'dropdown',
						label: 'Mode',
						id: 'val',
						choices: MODEL_ACTIONS.analogAudioOutput.choices,
						default: MODEL_ACTIONS.analogAudioOutput.default,
					},
				],
				callback: (action) => {
					body = {
						AnalogAudiooutputselect: String(action.options.val),
					}
					this.sendCommand('analogaudiosetup', 'POST', body)
				},
			}
		}

		// Video Output Interface Actions

		if (MODEL_ACTIONS?.video_output) {
			actions['video_output'] = {
				label: MODEL_ACTIONS.video_output.name,
				options: [
					{
						type: 'dropdown',
						label: 'Mode',
						id: 'val',
						choices: MODEL_ACTIONS.video_output.choices,
						default: MODEL_ACTIONS.video_output.default,
					},
				],
				callback: (action) => {
					body = {
						videooutput: String(action.options.val),
					}
					this.sendCommand('videooutputinterface', 'POST', body)
				},
			}
		}

		// Encode Setup Actions

		if (MODEL_ACTIONS?.bandwidth_mode) {
			actions['bandwidth_mode'] = {
				label: MODEL_ACTIONS.bandwidth_mode.name,
				options: [
					{
						type: 'dropdown',
						label: 'Manual / NDI Managed',
						id: 'val',
						choices: MODEL_ACTIONS.bandwidth_mode.choices,
						default: MODEL_ACTIONS.bandwidth_mode.default,
					},
					{
						type: 'number',
						label:
							'Bandwidth Select (' +
							MODEL_ACTIONS.bandwidth_select.range.min +
							' to ' +
							MODEL_ACTIONS.bandwidth_select.range.max +
							')',
						id: 'bandwidth',
						default: MODEL_ACTIONS.bandwidth_select.range.default,
						min: MODEL_ACTIONS.bandwidth_select.range.min,
						max: MODEL_ACTIONS.bandwidth_select.range.max,
						isVisible: (action) => action.options.val === 'Manual',
					},
				],
				callback: (action) => {
					switch (action.options.val) {
						case 'NDIManaged':
							body = {
								BandwidthMode: String(action.options.val),
							}
							break
						case 'Manual':
							body = {
								BandwidthMode: String(action.options.val),
								BandwidthSelect: String(action.options.bandwidth),
							}
							break
					}
					this.sendCommand('encodesetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.ndiAudio) {
			actions['ndiAudio'] = {
				label: MODEL_ACTIONS.ndiAudio.name,
				options: [
					{
						type: 'dropdown',
						label: 'Analog / Mute',
						id: 'val',
						choices: MODEL_ACTIONS.ndiAudio.choices,
						default: MODEL_ACTIONS.ndiAudio.default,
					},
				],
				callback: (action) => {
					body = {
						NDIAudio: String(action.options.val),
					}
					this.sendCommand('encodesetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.ndiGroupEnable) {
			actions['ndiGroupEnable'] = {
				label: MODEL_ACTIONS.ndiGroupEnable.name,
				options: [
					{
						type: 'dropdown',
						label: 'NDI Group Enable',
						id: 'val',
						choices: MODEL_ACTIONS.ndiGroupEnable.choices,
						default: MODEL_ACTIONS.ndiGroupEnable.default,
					},
				],
				callback: (action) => {
					body = {
						NDIGroup: String(action.options.val),
					}
					this.sendCommand('encodesetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.screensaver_mode) {
			actions['screensaver_mode'] = {
				label: MODEL_ACTIONS.screensaver_mode.name,
				options: [
					{
						type: 'dropdown',
						label: 'ScreenSaver Mode',
						id: 'val',
						choices: MODEL_ACTIONS.screensaver_mode.choices,
						default: MODEL_ACTIONS.screensaver_mode.default,
					},
				],
				callback: (action) => {
					body = {
						ScreenSaverMode: String(action.options.val),
					}
					this.sendCommand('encodesetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.stream_to_network) {
			actions['stream_to_network'] = {
				label: MODEL_ACTIONS.stream_to_network.name,
				options: [
					{
						type: 'dropdown',
						label: 'On/Off',
						id: 'val',
						choices: MODEL_ACTIONS.stream_to_network.choices,
						default: MODEL_ACTIONS.stream_to_network.default,
					},
				],
				callback: (action) => {
					body = {
						StreamToNetwork: String(action.options.val),
					}
					this.sendCommand('encodesetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.tally_mode) {
			actions['tally_mode'] = {
				label: MODEL_ACTIONS.tally_mode.name,
				options: [
					{
						type: 'dropdown',
						label: 'On / Off',
						id: 'val',
						choices: MODEL_ACTIONS.tally_mode.choices,
						default: MODEL_ACTIONS.tally_mode.default,
					},
				],
				callback: (action) => {
					body = {
						TallyMode: String(action.options.val),
					}
					this.sendCommand('encodesetup', 'POST', body)
				},
			}
		}

		// Encode Transport Actions

		if (MODEL_ACTIONS?.transmit_method) {
			actions['transmit_method'] = {
				label: MODEL_ACTIONS.transmit_method.name,
				options: [
					{
						type: 'dropdown',
						label: 'Method',
						id: 'val',
						choices: MODEL_ACTIONS.transmit_method.choices,
						default: MODEL_ACTIONS.transmit_method.default,
					},
				],
				callback: (action) => {
					if (this.camera.firmware.major === '4') {
						body = {
							txpm: String(action.options.val),
						}
					} else {
						body = {
							Txpm: String(action.options.val),
						}
					}
					this.sendCommand('encodeTransport', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.capture_screensaver) {
			actions['capture_screensaver'] = {
				label: MODEL_ACTIONS.capture_screensaver.name,
				callback: (action) => {
					this.sendCommand('capture?ChNum=1&status=Encode', 'GET')
				},
			}
		}

		// NDI Discovery Actions

		if (MODEL_ACTIONS?.ndi_discovery_server) {
			actions['ndi_discovery_server'] = {
				label: MODEL_ACTIONS.ndi_discovery_server.name,
				options: [
					{
						type: 'dropdown',
						label: 'Enabled / Disabled',
						id: 'val',
						choices: MODEL_ACTIONS.ndi_discovery_server.choices,
						default: MODEL_ACTIONS.ndi_discovery_server.default,
					},
				],
				callback: (action) => {
					body = {
						NDIDisServ: String(action.options.val),
					}
					this.sendCommand('NDIDisServer', 'POST', body)
				},
			}
		}

		// PTZ Actions

		if (MODEL_ACTIONS?.pt) {
			actions['pt'] = {
				label: MODEL_ACTIONS.pt.name,
				options: [
					{
						type: 'dropdown',
						label: 'Direction',
						id: 'val',
						choices: MODEL_ACTIONS.pt.choices,
						default: MODEL_ACTIONS.pt.default,
					},
					{
						type: 'dropdown',
						label: 'Pan Position',
						id: 'posPan',
						choices: MODEL_ACTIONS.pt.posPanChoices,
						default: MODEL_ACTIONS.pt.posPanDefault,
						isVisible: (action) => action.options.val === 'direct',
					},
					{
						type: 'dropdown',
						label: 'Tilt Position',
						id: 'posTilt',
						choices: MODEL_ACTIONS.pt.posTiltChoices,
						default: MODEL_ACTIONS.pt.posTiltDefault,
						isVisible: (action) => action.options.val === 'direct',
					},
					{
						type: 'checkbox',
						label: 'Speed Overide',
						id: 'override',
						default: false,
						isVisible: (action) => action.options.val !== 'direct',
					},
					{
						type: 'number',
						label: 'Pan Speed(' + MODEL_ACTIONS.panSpeed.range.min + ' to ' + MODEL_ACTIONS.panSpeed.range.max + ')',
						id: 'panSpeed',
						default: MODEL_ACTIONS.panSpeed.range.default,
						min: MODEL_ACTIONS.panSpeed.range.min,
						max: MODEL_ACTIONS.panSpeed.range.max,
						isVisible: (action) => action.options.override === true || action.options.val === 'direct',
					},
					{
						type: 'number',
						label:
							'Tilt Speed (' + MODEL_ACTIONS.tiltSpeed.range.min + ' to ' + MODEL_ACTIONS.tiltSpeed.range.max + ')',
						id: 'tiltSpeed',
						default: MODEL_ACTIONS.tiltSpeed.range.default,
						min: MODEL_ACTIONS.tiltSpeed.range.min,
						max: MODEL_ACTIONS.tiltSpeed.range.max,
						isVisible: (action) => action.options.override === true || action.options.val === 'direct',
					},
				],
				callback: (action) => {
					let panSpeed = this.camera?.panSpeed ? this.camera.panSpeed : MODEL_ACTIONS.panSpeed.range.default
					let tiltSpeed = this.camera?.tiltSpeed ? this.camera.tiltSpeed : MODEL_ACTIONS.tiltSpeed.range.default

					panSpeed = action.options.override === true ? action.options.panSpeed : panSpeed
					tiltSpeed = action.options.override === true ? action.options.tiltSpeed : tiltSpeed
					switch (action.options.val) {
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
								String.fromCharCode(action.options.panSpeed) +
								String.fromCharCode(action.options.tiltSpeed) +
								this.strToPQRS(action.options.posPan) +
								this.strToPQRS(action.options.posTilt) +
								VISCA.END_MSG
							break
					}
					this.sendVISCACommand(cmd)
				},
			}
		}

		if (MODEL_ACTIONS?.panSpeed) {
			actions['panSpeed'] = {
				label: MODEL_ACTIONS.panSpeed.name,
				options: [
					{
						type: 'dropdown',
						label: 'Action',
						id: 'type',
						choices: MODEL_ACTIONS.panSpeed.choices,
						default: MODEL_ACTIONS.panSpeed.default,
					},
					{
						type: 'number',
						label: 'Speed (' + MODEL_ACTIONS.panSpeed.range.min + ' to ' + MODEL_ACTIONS.panSpeed.range.max + ')',
						id: 'value',
						default: MODEL_ACTIONS.panSpeed.range.default,
						min: MODEL_ACTIONS.panSpeed.range.min,
						max: MODEL_ACTIONS.panSpeed.range.max,
						isVisible: (action) => action.options.type === 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.panSpeed ? this.camera.panSpeed : MODEL_ACTIONS.panSpeed.range.default
					switch (action.options.type) {
						case 'up':
							newValue =
								currentValue < MODEL_ACTIONS.panSpeed.range.max ? ++currentValue : MODEL_ACTIONS.panSpeed.range.max
							break
						case 'down':
							newValue =
								currentValue > MODEL_ACTIONS.panSpeed.range.min ? --currentValue : MODEL_ACTIONS.panSpeed.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						PanSpeed: String(newValue),
					}
					this.sendCommand('birddogptzsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.preset) {
			actions['preset'] = {
				label: MODEL_ACTIONS.preset.name,
				options: [
					{
						type: 'dropdown',
						label: 'Preset Mode',
						id: 'val',
						choices: MODEL_ACTIONS.preset.choices,
						default: MODEL_ACTIONS.preset.default,
					},
				],
				callback: (action) => {
					body = {
						Preset: String(action.options.val),
					}
					this.sendCommand('birddogptzsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.preset_speed) {
			actions['preset_speed'] = {
				label: MODEL_ACTIONS.preset_speed.name,
				options: [
					{
						type: 'dropdown',
						label: 'Action',
						id: 'type',
						choices: MODEL_ACTIONS.preset_speed.choices,
						default: MODEL_ACTIONS.preset_speed.default,
					},
					{
						type: 'number',
						label:
							'Speed (' + MODEL_ACTIONS.preset_speed.range.min + ' to ' + MODEL_ACTIONS.preset_speed.range.max + ')',
						id: 'value',
						default: MODEL_ACTIONS.preset_speed.range.default,
						min: MODEL_ACTIONS.preset_speed.range.min,
						max: MODEL_ACTIONS.preset_speed.range.max,
						isVisible: (action) => action.options.type === 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.preset_speed ? this.camera.preset_speed : MODEL_ACTIONS.preset_speed.default
					switch (action.options.type) {
						case 'up':
							newValue =
								currentValue < MODEL_ACTIONS.preset_speed.range.max
									? ++currentValue
									: MODEL_ACTIONS.preset_speed.range.max
							break
						case 'down':
							newValue =
								currentValue > MODEL_ACTIONS.preset_speed.range.min
									? --currentValue
									: MODEL_ACTIONS.preset_speed.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						PresetSpeed: String(newValue),
					}
					this.sendCommand('birddogptzsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.recallPset) {
			actions['recallPset'] = {
				label: MODEL_ACTIONS.recallPset.name,
				options: [
					{
						type: 'number',
						label:
							'Preset Number (' + MODEL_ACTIONS.savePset.range.min + ' to ' + MODEL_ACTIONS.savePset.range.max + ')',
						id: 'val',
						default: MODEL_ACTIONS.savePset.range.default,
						min: MODEL_ACTIONS.savePset.range.min,
						max: MODEL_ACTIONS.savePset.range.max,
					},
				],
				callback: (action) => {
					body = {
						Preset: String('Preset-' + action.options.val),
					}
					this.sendCommand('recall', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.savePset) {
			actions['savePset'] = {
				label: MODEL_ACTIONS.savePset.name,
				options: [
					{
						type: 'number',
						label:
							'Preset Number (' + MODEL_ACTIONS.savePset.range.min + ' to ' + MODEL_ACTIONS.savePset.range.max + ')',
						id: 'val',
						default: MODEL_ACTIONS.savePset.range.default,
						min: MODEL_ACTIONS.savePset.range.min,
						max: MODEL_ACTIONS.savePset.range.max,
					},
				],
				callback: (action) => {
					body = {
						Preset: String('Preset-' + action.options.val),
					}
					this.sendCommand('save', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.tiltSpeed) {
			actions['tiltSpeed'] = {
				label: MODEL_ACTIONS.tiltSpeed.name,
				options: [
					{
						type: 'dropdown',
						label: 'Action',
						id: 'type',
						choices: MODEL_ACTIONS.tiltSpeed.choices,
						default: MODEL_ACTIONS.tiltSpeed.default,
					},
					{
						type: 'number',
						label: 'Speed (' + MODEL_ACTIONS.tiltSpeed.range.min + ' to ' + MODEL_ACTIONS.tiltSpeed.range.max + ')',
						id: 'value',
						default: MODEL_ACTIONS.tiltSpeed.range.default,
						min: MODEL_ACTIONS.tiltSpeed.range.min,
						max: MODEL_ACTIONS.tiltSpeed.range.max,
						isVisible: (action) => action.options.type === 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.tiltSpeed ? this.camera.tiltSpeed : MODEL_ACTIONS.tiltSpeed.range.default
					switch (action.options.type) {
						case 'up':
							newValue =
								currentValue < MODEL_ACTIONS.tiltSpeed.range.max ? ++currentValue : MODEL_ACTIONS.tiltSpeed.range.max
							break
						case 'down':
							newValue =
								currentValue > MODEL_ACTIONS.tiltSpeed.range.min ? --currentValue : MODEL_ACTIONS.tiltSpeed.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						TiltSpeed: String(newValue),
					}
					this.sendCommand('birddogptzsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.zoom) {
			actions['zoom'] = {
				label: MODEL_ACTIONS.zoom.name,
				options: [
					{
						type: 'dropdown',
						label: 'Direction',
						id: 'val',
						choices: CHOICES.PTZ_ZOOM,
						default: 'in',
					},
					{
						type: 'dropdown',
						label: 'Zoom Position',
						id: 'posZoom',
						choices: MODEL_ACTIONS.zoom.posZoomChoices,
						default: MODEL_ACTIONS.zoom.posZoomDefault,
						isVisible: (action) => action.options.val === 'direct',
					},
					{
						type: 'checkbox',
						label: 'Speed Overide',
						id: 'override',
						default: false,
						isVisible: (action) => action.options.val !== 'direct',
					},
					{
						type: 'number',
						label: 'Speed (' + MODEL_ACTIONS.zoomSpeed.range.min + ' to ' + MODEL_ACTIONS.zoomSpeed.range.max + ')',
						id: 'speed',
						default: MODEL_ACTIONS.zoomSpeed.range.default,
						min: MODEL_ACTIONS.zoomSpeed.range.min,
						max: MODEL_ACTIONS.zoomSpeed.range.max,
						isVisible: (action) => action.options.override === true,
					},
				],
				callback: (action) => {
					let zoomSpeed = this.camera?.zoomSpeed ? this.camera.zoomSpeed : MODEL_ACTIONS.zoomSpeed.range.default
					zoomSpeed = action.options.override === true ? action.options.speed : zoomSpeed
					switch (action.options.val) {
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
							cmd = VISCA.MSG_CAM + VISCA.CAM_ZOOM_DIRECT + this.strToPQRS(action.options.posZoom) + VISCA.END_MSG
							break
						case 'stop':
							cmd = VISCA.MSG_CAM + VISCA.CAM_ZOOM + VISCA.CMD_CAM_ZOOM_STOP + VISCA.END_MSG
							break
					}
					this.sendVISCACommand(cmd)
				},
			}
		}

		if (MODEL_ACTIONS?.zoomSpeed) {
			actions['zoomSpeed'] = {
				label: MODEL_ACTIONS.zoomSpeed.name,
				options: [
					{
						type: 'dropdown',
						label: 'Action',
						id: 'type',
						choices: MODEL_ACTIONS.zoomSpeed.choices,
						default: MODEL_ACTIONS.zoomSpeed.default,
					},
					{
						type: 'number',
						label: 'Speed (' + MODEL_ACTIONS.zoomSpeed.range.min + ' to ' + MODEL_ACTIONS.zoomSpeed.range.max + ')',
						id: 'value',
						default: MODEL_ACTIONS.zoomSpeed.range.default,
						min: MODEL_ACTIONS.zoomSpeed.range.min,
						max: MODEL_ACTIONS.zoomSpeed.range.max,
						isVisible: (action) => action.options.type === 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.zoomSpeed ? this.camera.zoomSpeed : MODEL_ACTIONS.zoomSpeed.range.default
					switch (action.options.type) {
						case 'up':
							newValue =
								currentValue < MODEL_ACTIONS.zoomSpeed.range.max ? ++currentValue : MODEL_ACTIONS.zoomSpeed.range.max
							break
						case 'down':
							newValue =
								currentValue > MODEL_ACTIONS.zoomSpeed.range.min ? --currentValue : MODEL_ACTIONS.zoomSpeed.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						ZoomSpeed: String(newValue),
					}
					this.sendCommand('birddogptzsetup', 'POST', body)
				},
			}
		}

		// Focus Actions

		if (MODEL_ACTIONS?.focus) {
			actions['focus'] = {
				label: MODEL_ACTIONS.focus.name,
				options: [
					{
						type: 'dropdown',
						label: 'Direction',
						id: 'val',
						choices: MODEL_ACTIONS.focus.choices,
						default: MODEL_ACTIONS.focus.default,
					},
				],
				callback: (action) => {
					switch (action.options.val) {
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
				},
			}
		}

		if (MODEL_ACTIONS?.focusM) {
			actions['focusM'] = {
				label: MODEL_ACTIONS.focusM.name,
				options: [
					{
						type: 'dropdown',
						label: 'Mode',
						id: 'val',
						choices: MODEL_ACTIONS.focusM.choices,
						default: MODEL_ACTIONS.focusM.default,
					},
				],
				callback: (action) => {
					switch (action.options.val) {
						case 'Auto':
							cmd = VISCA.MSG_CAM + VISCA.CAM_FOCUS_AUTO + VISCA.DATA_ONVAL + VISCA.END_MSG
							break
						case 'Manual':
							cmd = VISCA.MSG_CAM + VISCA.CAM_FOCUS_AUTO + VISCA.DATA_OFFVAL + VISCA.END_MSG
							break
					}
					this.sendVISCACommand(cmd)
				},
			}
		}

		// Exposure Actions

		if (MODEL_ACTIONS?.ae_response) {
			actions['ae_response'] = {
				label: MODEL_ACTIONS.ae_response.name,
				options: [
					{
						type: 'dropdown',
						label: 'Ae Response',
						id: 'val',
						hoices: MODEL_ACTIONS.ae_response.choices,
						default: MODEL_ACTIONS.ae_response.default,
					},
					{
						type: 'number',
						label:
							'Ae Response (' +
							MODEL_ACTIONS.ae_response.range.min +
							' to ' +
							MODEL_ACTIONS.ae_response.range.max +
							')',
						id: 'value',
						default: MODEL_ACTIONS.ae_response.range.default,
						min: MODEL_ACTIONS.ae_response.range.min,
						max: MODEL_ACTIONS.ae_response.range.max,
						isVisible: (action) => action.options.val === 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.ae_response ? this.camera.ae_response : MODEL_ACTIONS.ae_response.range.default
					switch (action.options.val) {
						case 'up':
							newValue =
								currentValue < MODEL_ACTIONS.ae_response.range.max
									? ++currentValue
									: MODEL_ACTIONS.ae_response.range.max
							break
						case 'down':
							newValue =
								currentValue > MODEL_ACTIONS.ae_response.range.min
									? --currentValue
									: MODEL_ACTIONS.ae_response.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						AeResponse: String(newValue),
					}
					this.sendCommand('birddogexpsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.backlight) {
			actions['backlight'] = {
				label: MODEL_ACTIONS.backlight.name,
				options: [
					{
						type: 'dropdown',
						label: 'On / Off',
						id: 'mode',
						choices: MODEL_ACTIONS.backlight.choices,
						default: MODEL_ACTIONS.backlight.default,
					},
				],
				callback: (action) => {
					body = {
						Backlight: String(action.options.mode),
					}
					this.sendCommand('birddogexpsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.bright_level) {
			actions['bright_level'] = {
				label: MODEL_ACTIONS.bright_level.name,
				options: [
					{
						type: 'dropdown',
						label: 'Bright Level',
						id: 'val',
						choices: MODEL_ACTIONS.bright_level.choices,
						default: MODEL_ACTIONS.bright_level.default,
					},
					{
						type: 'number',
						label:
							'Level (' + MODEL_ACTIONS.bright_level.range.min + ' to ' + MODEL_ACTIONS.bright_level.range.max + ')',
						id: 'value',
						default: MODEL_ACTIONS.bright_level.range.default,
						min: MODEL_ACTIONS.bright_level.range.min,
						max: MODEL_ACTIONS.bright_level.range.max,
						isVisible: (action) => action.options.val === 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.bright_level ? this.camera.bright_level : MODEL_ACTIONS.bright_level.range.default
					switch (action.options.val) {
						case 'up':
							newValue =
								currentValue < MODEL_ACTIONS.bright_level.range.max
									? ++currentValue
									: MODEL_ACTIONS.bright_level.range.max
							break
						case 'down':
							newValue =
								currentValue > MODEL_ACTIONS.bright_level.range.min
									? --currentValue
									: MODEL_ACTIONS.bright_level.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						BrightLevel: String(newValue),
					}
					this.sendCommand('birddogexpsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.expComp) {
			actions['expComp'] = {
				label: MODEL_ACTIONS.expComp.name,
				options: [
					{
						type: 'dropdown',
						label: 'On / Off',
						id: 'val',
						choices: MODEL_ACTIONS.expComp.choices,
						default: MODEL_ACTIONS.expComp.default,
					},
					{
						type: 'number',
						label:
							'Exposure Compensation Level (' +
							MODEL_ACTIONS.expCompLvl.range.min +
							' to ' +
							MODEL_ACTIONS.expCompLvl.range.max +
							')',
						id: 'level',
						default: MODEL_ACTIONS.expCompLvl.range.default,
						min: MODEL_ACTIONS.expCompLvl.range.min,
						max: MODEL_ACTIONS.expCompLvl.range.max,
						isVisible: (action) => action.options.val === 'On',
					},
				],
				callback: (action) => {
					switch (action.options.val) {
						case 'Off':
							body = {
								ExpCompEn: String(action.options.val),
							}
							break
						case 'On':
							//Convert action range to API range for P100 & PF120
							let level =
								this.camera.model === 'P100' || this.camera.model === 'PF120'
									? String(action.options.level + 7)
									: String(action.options.level)
							body = {
								ExpCompEn: String(action.options.val),
								ExpCompLvl: String(level),
							}
							break
					}
					this.sendCommand('birddogexpsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.exposure_mode) {
			actions['expM'] = {
				label: MODEL_ACTIONS.exposure_mode.name,
				options: [
					{
						type: 'dropdown',
						label: 'Mode',
						id: 'val',
						choices: MODEL_ACTIONS.exposure_mode.choices,
						default: MODEL_ACTIONS.exposure_mode.default,
					},
				],
				callback: (action) => {
					body = {
						ExpMode: String(action.options.val),
					}
					this.sendCommand('birddogexpsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.gain) {
			actions['gain'] = {
				label: MODEL_ACTIONS.gain.name,
				options: [
					{
						type: 'dropdown',
						label: 'Gain',
						id: 'val',
						choices: MODEL_ACTIONS.gain.choices,
						default: MODEL_ACTIONS.gain.default,
					},
					{
						type: 'dropdown',
						label: 'Value',
						id: 'value',
						choices: MODEL_ACTIONS.gain.value.choices,
						default: MODEL_ACTIONS.gain.value.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
				callback: (action) => {
					let gain = this.camera?.gain ? this.camera.gain : MODEL_ACTIONS.gain.default
					let gainLimit = this.camera?.gain_limit
						? this.camera.gain_limit
						: MODEL_ACTIONS.gain.value.choices[MODEL_ACTIONS.gain.value.choices.length - 1].id // If no GainLimit then use max Gain
					switch (action.options.val) {
						case 'up':
							newValue = parseInt(gain) < parseInt(gainLimit) ? ++gain : gainLimit
							break
						case 'down':
							newValue =
								gain > MODEL_ACTIONS.gain.value.choices[0]?.id ? --gain : MODEL_ACTIONS.gain.value.choices[0].id
							break
						case 'value':
							newValue = parseFloat(action.options.value) <= gainLimit ? action.options.value : gainLimit
							break
					}
					body = {
						GainLevel: String(newValue),
					}
					this.sendCommand('birddogexpsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.gain_limit) {
			actions['gainLimit'] = {
				label: MODEL_ACTIONS.gain_limit.name,
				options: [
					{
						type: 'dropdown',
						label: 'Gain Limit',
						id: 'val',
						choices: MODEL_ACTIONS.gain_limit.choices,
						default: MODEL_ACTIONS.gain_limit.default,
					},
					{
						type: 'dropdown',
						label: 'Value',
						id: 'value',
						choices: MODEL_ACTIONS.gain.value.choices.slice(
							MODEL_ACTIONS.gain_limit.range.min - 1,
							MODEL_ACTIONS.gain_limit.range.max + 1
						),
						default: MODEL_ACTIONS.gain_limit.range.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.gain_limit ? this.camera.gain_limit : MODEL_ACTIONS.gain_limit.range.default
					switch (action.options.val) {
						case 'up':
							newValue =
								currentValue < MODEL_ACTIONS.gain_limit.range.max ? ++currentValue : MODEL_ACTIONS.gain_limit.range.max
							break
						case 'down':
							newValue =
								currentValue > MODEL_ACTIONS.gain_limit.range.min ? --currentValue : MODEL_ACTIONS.gain_limit.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						GainLimit: String(newValue),
					}
					this.sendCommand('birddogexpsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.gain_point) {
			actions['gainPoint'] = {
				label: MODEL_ACTIONS.gain_point.name,
				options: [
					{
						type: 'dropdown',
						label: 'Gain Point',
						id: 'val',
						choices: MODEL_ACTIONS.gain_point.choices,
						default: MODEL_ACTIONS.gain_point.default,
					},
				],
				callback: (action) => {
					body = {
						GainPoint: String(action.options.val),
					}
					this.sendCommand('birddogexpsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.gain_point_position) {
			actions['gainPointPosition'] = {
				label: MODEL_ACTIONS.gain_point_position.name,
				options: [
					{
						type: 'dropdown',
						label: 'Gain Point',
						id: 'val',
						choices: MODEL_ACTIONS.gain_point_position.choices,
						default: MODEL_ACTIONS.gain_point_position.default,
					},
					{
						type: 'dropdown',
						label: 'Value',
						id: 'value',
						choices: MODEL_ACTIONS.gain.value.choices.slice(
							0,
							parseInt(
								this.camera.expsetup?.GainLimit ? this.camera.expsetup?.GainLimit : MODEL_ACTIONS.gain.value.default,
								10
							) + 1
						),
						default: MODEL_ACTIONS.gain.value.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.gain_point_position ? this.camera.gain_point_position : MODEL_ACTIONS.gain.default
					switch (action.options.val) {
						case 'up':
							newValue = currentValue < this.camera.gain_limit ? ++currentValue : this.camera.gain_limit
							break
						case 'down':
							newValue =
								currentValue > MODEL_ACTIONS.gain.value.choices[0].id
									? --currentValue
									: MODEL_ACTIONS.gain.value.choices[0].id
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						GainPointPosition: String(newValue),
					}
					this.sendCommand('birddogexpsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.high_sensitivity) {
			actions['highSensitivity'] = {
				label: MODEL_ACTIONS.high_sensitivity.name,
				options: [
					{
						type: 'dropdown',
						label: 'On / Off',
						id: 'val',
						choices: MODEL_ACTIONS.high_sensitivity.choices,
						default: MODEL_ACTIONS.high_sensitivity.default,
					},
				],
				callback: (action) => {
					body = {
						HighSensitivity: String(action.options.val),
					}
					this.sendCommand('birddogexpsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.iris) {
			actions['iris'] = {
				label: MODEL_ACTIONS.iris.name,
				options: [
					{
						type: 'dropdown',
						label: 'Iris',
						id: 'val',
						choices: MODEL_ACTIONS.iris.choices,
						default: MODEL_ACTIONS.iris.default,
					},
					{
						type: 'dropdown',
						label: 'Value',
						id: 'value',
						choices: MODEL_ACTIONS.iris.value.choices,
						default: MODEL_ACTIONS.iris.value.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.iris ? this.camera.iris : MODEL_ACTIONS.iris.default
					switch (action.options.val) {
						case 'up':
							newValue =
								currentValue === MODEL_ACTIONS.iris.value.range.closed
									? MODEL_ACTIONS.iris.value.range.min
									: iris < MODEL_ACTIONS.iris.value.range.max
									? ++currentValue
									: MODEL_ACTIONS.iris.value.range.max
							break
						case 'down':
							newValue =
								currentValue === MODEL_ACTIONS.iris.value.range.min
									? MODEL_ACTIONS.iris.value.range.closed
									: iris > MODEL_ACTIONS.iris.value.range.min
									? --currentValue
									: MODEL_ACTIONS.iris.value.range.closed
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						IrisLevel: String(newValue),
					}
					this.sendCommand('birddogexpsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.shutter_control_overwrite) {
			actions['shutter_control_overwrite'] = {
				label: MODEL_ACTIONS.shutter_control_overwrite.name,
				options: [
					{
						type: 'dropdown',
						label: 'On/Off',
						id: 'val',
						choices: MODEL_ACTIONS.shutter_control_overwrite.choices,
						default: MODEL_ACTIONS.shutter_control_overwrite.default,
					},
				],
				callback: (action) => {
					body = {
						ShutterControlOverwrite: String(action.options.val),
					}
					this.sendCommand('birddogexpsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.shutter_max_speed) {
			actions['shutter_max_speed'] = {
				label: MODEL_ACTIONS.shutter_max_speed.name,
				options: [
					{
						type: 'dropdown',
						label: 'Shutter Max Speed',
						id: 'val',
						choices: MODEL_ACTIONS.shutter_control_overwrite.choices,
						default: MODEL_ACTIONS.shutter_control_overwrite.default,
					},
					{
						type: 'dropdown',
						label: 'Value',
						id: 'value',
						choices: MODEL_ACTIONS.shut?.['shutter_' + [this.camera.shutter_table]].slice(
							MODEL_ACTIONS.shutter_max_speed.range.min,
							MODEL_ACTIONS.shutter_max_speed.range.max + 1
						),
						default: MODEL_ACTIONS.shutter_max_speed.range.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.shutter_max_speed
						? this.camera.shutter_max_speed
						: MODEL_ACTIONS.shutter_max_speed.range.default
					switch (action.options.val) {
						case 'up':
							newValue =
								currentValue < MODEL_ACTIONS.shutter_max_speed.range.max
									? ++currentValue
									: MODEL_ACTIONS.shutter_max_speed.range.max
							break
						case 'down':
							newValue =
								currentValue > MODEL_ACTIONS.shutter_max_speed.range.min
									? --currentValue
									: MODEL_ACTIONS.shutter_max_speed.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						ShutterMaxSpeed: String(newValue),
					}
					this.sendCommand('birddogexpsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.shutter_min_speed) {
			actions['shutter_min_speed'] = {
				label: MODEL_ACTIONS.shutter_min_speed.name,
				options: [
					{
						type: 'dropdown',
						label: 'Shutter Min Speed',
						id: 'val',
						choices: MODEL_ACTIONS.shutter_control_overwrite.choices,
						default: MODEL_ACTIONS.shutter_control_overwrite.default,
					},
					{
						type: 'dropdown',
						label: 'Value',
						id: 'value',
						choices: MODEL_ACTIONS.shut?.['shutter_' + [this.camera.shutter_table]].slice(
							MODEL_ACTIONS.shutter_min_speed.range.min,
							parseInt(this.camera.expsetup?.ShutterMaxSpeed, 10) + 1
						),
						default: MODEL_ACTIONS.shutter_max_speed.range.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.shutter_min_speed
						? this.camera.shutter_min_speed
						: MODEL_ACTIONS.shutter_min_speed.range.default
					switch (action.options.val) {
						case 'up':
							newValue =
								currentValue < this.camera.expsetup.ShutterMaxSpeed
									? ++currentValue
									: this.camera.expsetup.ShutterMaxSpeed
							break
						case 'down':
							newValue =
								currentValue > MODEL_ACTIONS.shutter_min_speed.range.min
									? --currentValue
									: MODEL_ACTIONS.shutter_min_speed.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						ShutterMinSpeed: String(newValue),
					}
					this.sendCommand('birddogexpsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.shutter_speed) {
			actions['shut'] = {
				label: MODEL_ACTIONS.shutter_speed.name,
				options: [
					{
						type: 'dropdown',
						label: 'Shutter',
						id: 'val',
						choices: MODEL_ACTIONS.shutter_speed.choices,
						default: MODEL_ACTIONS.shutter_speed.default,
					},
					{
						type: 'dropdown',
						label: 'Value',
						id: 'value',
						choices: MODEL_ACTIONS.shutter_speed?.['shutter_' + [this.camera.shutter_table]],
						default: MODEL_ACTIONS.shutter_speed.shutter_default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.shutter_speed
						? this.camera.shutter_speed
						: MODEL_ACTIONS.shutter_speed.shutter_default
					switch (action.options.val) {
						case 'up':
							newValue =
								currentValue < MODEL_ACTIONS.shutter_speed.range.max
									? ++currentValue
									: MODEL_ACTIONS.shutter_speed.range.max
							break
						case 'down':
							newValue =
								currentValue > MODEL_ACTIONS.shutter_speed.range.min
									? --currentValue
									: MODEL_ACTIONS.shutter_speed.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						ShutterSpeed: String(newValue),
					}
					this.sendCommand('birddogexpsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.shutter_speed_overwrite) {
			actions['shutter_speed_overwrite'] = {
				label: MODEL_ACTIONS.shutter_speed_overwrite.name,
				options: [
					{
						type: 'dropdown',
						label: 'Shutter Speed Overwrite',
						id: 'val',
						choices: MODEL_ACTIONS.shutter_speed.choices,
						default: MODEL_ACTIONS.shutter_speed.default,
					},
					{
						type: 'number',
						label:
							'Hz (' +
							MODEL_ACTIONS.shutter_speed_overwrite.range.min +
							' to ' +
							MODEL_ACTIONS.shutter_speed_overwrite.range.max +
							')',
						id: 'value',
						default: MODEL_ACTIONS.shutter_speed_overwrite.range.default,
						min: MODEL_ACTIONS.shutter_speed_overwrite.range.min,
						max: MODEL_ACTIONS.shutter_speed_overwrite.range.max,
						isVisible: (action) => action.options.val === 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.shutter_speed_overwrite
						? this.camera.shutter_speed_overwrite
						: MODEL_ACTIONS.shutter_speed_overwrite.shutter_default
					switch (action.options.val) {
						case 'up':
							newValue =
								currentValue < MODEL_ACTIONS.shutter_speed_overwrite.range.max
									? ++currentValue
									: MODEL_ACTIONS.shutter_speed_overwrite.range.max
							break
						case 'down':
							newValue =
								currentValue > MODEL_ACTIONS.shutter_speed_overwrite.range.min
									? --currentValue
									: MODEL_ACTIONS.shutter_speed_overwrite.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						ShutterSpeedOverwrite: String(newValue),
					}
					this.sendCommand('birddogexpsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.slow_shutter_en) {
			actions['slow_shutter_en'] = {
				label: MODEL_ACTIONS.slow_shutter_en.name,
				options: [
					{
						type: 'dropdown',
						label: 'On/Off',
						id: 'val',
						choices: MODEL_ACTIONS.slow_shutter_en.choices,
						default: MODEL_ACTIONS.slow_shutter_en.default,
					},
				],
				callback: (action) => {
					body = {
						SlowShutterEn: String(action.options.val),
					}
					this.sendCommand('birddogexpsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.slow_shutter_limit) {
			actions['slow_shutter_limit'] = {
				label: MODEL_ACTIONS.slow_shutter_limit.name,
				options: [
					{
						type: 'dropdown',
						label: 'Slow Shutter Limit',
						id: 'val',
						choices: MODEL_ACTIONS.shutter_speed.choices,
						default: MODEL_ACTIONS.shutter_speed.default,
					},
					{
						type: 'dropdown',
						label: 'Value',
						id: 'value',
						choices: MODEL_ACTIONS.shutter_speed?.['shutter_' + [this.camera.shutter_table]].slice(
							MODEL_ACTIONS.slow_shutter_limit.range.min,
							MODEL_ACTIONS.slow_shutter_limit.range.max + 1
						),
						default: MODEL_ACTIONS.slow_shutter_limit.range.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.slow_shutter_limit
						? this.camera.slow_shutter_limit
						: MODEL_ACTIONS.slow_shutter_limit.range.default
					switch (action.options.val) {
						case 'up':
							newValue =
								currentValue < MODEL_ACTIONS.slow_shutter_limit.range.max
									? ++currentValue
									: MODEL_ACTIONS.slow_shutter_limit.range.max
							break
						case 'down':
							newValue =
								currentValue > MODEL_ACTIONS.slow_shutter_limit.range.min
									? --currentValue
									: MODEL_ACTIONS.slow_shutter_limit.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						SlowShutterLimit: String(newValue),
					}
					this.sendCommand('birddogexpsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.spotlight) {
			actions['spotlight'] = {
				label: MODEL_ACTIONS.spotlight.name,
				options: [
					{
						type: 'dropdown',
						label: 'On/Off',
						id: 'val',
						choices: MODEL_ACTIONS.spotlight.choices,
						default: MODEL_ACTIONS.spotlight.default,
					},
				],
				callback: (action) => {
					body = {
						Spotlight: String(action.options.val),
					}
					this.sendCommand('birddogexpsetup', 'POST', body)
				},
			}
		}

		// White Balance Actions

		if (MODEL_ACTIONS?.bg) {
			actions['bg'] = {
				label: MODEL_ACTIONS.bg.name,
				options: [
					{
						type: 'dropdown',
						label: 'BG',
						id: 'val',
						choices: MODEL_ACTIONS.bg.choices,
						default: MODEL_ACTIONS.bg.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_ACTIONS.bg.range.min + ' to ' + MODEL_ACTIONS.bg.range.max + ')',
						id: 'value',
						default: MODEL_ACTIONS.bg.range.default,
						min: MODEL_ACTIONS.bg.range.min,
						max: MODEL_ACTIONS.bg.range.max,
						isVisible: (action) => action.options.val === 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.bg ? this.camera.bg : MODEL_ACTIONS.bg.range.default
					switch (action.options.val) {
						case 'up':
							newValue = currentValue < MODEL_ACTIONS.bg.range.max ? ++currentValue : MODEL_ACTIONS.bg.range.max
							break
						case 'down':
							newValue = currentValue > MODEL_ACTIONS.bg.range.min ? --currentValue : MODEL_ACTIONS.bg.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						BG: String(newValue),
					}
					this.sendCommand('birddogwbsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.br) {
			actions['br'] = {
				label: MODEL_ACTIONS.br.name,
				options: [
					{
						type: 'dropdown',
						label: 'BR',
						id: 'val',
						choices: MODEL_ACTIONS.br.choices,
						default: MODEL_ACTIONS.br.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_ACTIONS.br.range.min + ' to ' + MODEL_ACTIONS.br.range.max + ')',
						id: 'value',
						default: MODEL_ACTIONS.br.range.default,
						min: MODEL_ACTIONS.br.range.min,
						max: MODEL_ACTIONS.br.range.max,
						isVisible: (action) => action.options.val === 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.br ? this.camera.br : MODEL_ACTIONS.br.range.default
					switch (action.options.val) {
						case 'up':
							newValue = currentValue < MODEL_ACTIONS.br.range.max ? ++currentValue : MODEL_ACTIONS.br.range.max
							break
						case 'down':
							newValue = currentValue > MODEL_ACTIONS.br.range.min ? --currentValue : MODEL_ACTIONS.br.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						BR: String(newValue),
					}
					this.sendCommand('birddogwbsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.blue_gain) {
			actions['blue_gain'] = {
				label: MODEL_ACTIONS.blue_gain.name,
				options: [
					{
						type: 'dropdown',
						label: 'Blue Gain',
						id: 'val',
						choices: MODEL_ACTIONS.blue_gain.choices,
						default: MODEL_ACTIONS.blue_gain.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_ACTIONS.blue_gain.range.min + ' to ' + MODEL_ACTIONS.blue_gain.range.max + ')',
						id: 'value',
						default: MODEL_ACTIONS.blue_gain.range.default,
						min: MODEL_ACTIONS.blue_gain.range.min,
						max: MODEL_ACTIONS.blue_gain.range.max,
						isVisible: (action) => action.options.val === 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.blue_gain ? this.camera.blue_gain : MODEL_ACTIONS.blue_gain.range.default
					switch (action.options.val) {
						case 'up':
							newValue =
								currentValue < MODEL_ACTIONS.blue_gain.range.max ? ++currentValue : MODEL_ACTIONS.blue_gain.range.max
							break
						case 'down':
							newValue =
								currentValue > MODEL_ACTIONS.blue_gain.range.min ? --currentValue : MODEL_ACTIONS.blue_gain.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						BlueGain: String(newValue),
					}
					this.sendCommand('birddogwbsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.color_temp) {
			actions['color_temp'] = {
				label: MODEL_ACTIONS.color_temp.name,
				options: [
					{
						type: 'dropdown',
						label: 'Color Temperature (k)',
						id: 'val',
						choices: MODEL_ACTIONS.color_temp.choices,
						default: MODEL_ACTIONS.color_temp.default,
					},
					{
						type: 'dropdown',
						label: 'Value',
						id: 'value',
						choices: MODEL_ACTIONS.color_temp.value.choices,
						default: MODEL_ACTIONS.color_temp.value.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.color_temp
						? this.camera.color_temp.slice(0, 2)
						: MODEL_ACTIONS.color_temp.range.default
					switch (action.options.val) {
						case 'up':
							newValue =
								currentValue < MODEL_ACTIONS.color_temp.range.max ? ++currentValue : MODEL_ACTIONS.color_temp.range.max
							newValue = newValue + '00'
							break
						case 'down':
							newValue =
								currentValue > MODEL_ACTIONS.color_temp.range.min ? --currentValue : MODEL_ACTIONS.color_temp.range.min
							newValue = newValue + '00'
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						ColorTemp: String(newValue),
					}
					this.sendCommand('birddogwbsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.gb) {
			actions['gb'] = {
				label: MODEL_ACTIONS.gb.name,
				options: [
					{
						type: 'dropdown',
						label: 'GB',
						id: 'val',
						choices: MODEL_ACTIONS.gb.choices,
						default: MODEL_ACTIONS.gb.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_ACTIONS.gb.range.min + ' to ' + MODEL_ACTIONS.gb.range.max + ')',
						id: 'value',
						default: MODEL_ACTIONS.gb.range.default,
						min: MODEL_ACTIONS.gb.range.min,
						max: MODEL_ACTIONS.gr.range.max,
						isVisible: (action) => action.options.val === 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.gb ? this.camera.gb : MODEL_ACTIONS.gb.range.default
					switch (action.options.val) {
						case 'up':
							newValue = currentValue < MODEL_ACTIONS.gb.range.max ? ++currentValue : MODEL_ACTIONS.gb.range.max
							break
						case 'down':
							newValue = currentValue > MODEL_ACTIONS.gb.range.min ? --currentValue : MODEL_ACTIONS.gb.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						GB: String(newValue),
					}
					this.sendCommand('birddogwbsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.gr) {
			actions['gr'] = {
				label: MODEL_ACTIONS.gr.name,
				options: [
					{
						type: 'dropdown',
						label: 'GR',
						id: 'val',
						choices: MODEL_ACTIONS.gr.choices,
						default: MODEL_ACTIONS.gr.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_ACTIONS.gr.range.min + ' to ' + MODEL_ACTIONS.gr.range.max + ')',
						id: 'value',
						default: MODEL_ACTIONS.gr.range.default,
						min: MODEL_ACTIONS.gr.range.min,
						max: MODEL_ACTIONS.gr.range.max,
						isVisible: (action) => action.options.val === 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.gr ? this.camera.gr : MODEL_ACTIONS.gr.range.default
					switch (action.options.val) {
						case 'up':
							newValue = currentValue < MODEL_ACTIONS.gr.range.max ? ++currentValue : MODEL_ACTIONS.gr.range.max
							break
						case 'down':
							newValue = currentValue > MODEL_ACTIONS.gr.range.min ? --currentValue : MODEL_ACTIONS.gr.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						GR: String(newValue),
					}
					this.sendCommand('birddogwbsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.level) {
			actions['level'] = {
				label: MODEL_ACTIONS.level.name,
				options: [
					{
						type: 'dropdown',
						label: 'Level',
						id: 'val',
						choices: MODEL_ACTIONS.level.choices,
						default: MODEL_ACTIONS.level.default,
					},
					{
						type: 'number',
						label: 'Level (' + MODEL_ACTIONS.level.range.min + ' to ' + MODEL_ACTIONS.level.range.max + ')',
						id: 'value',
						default: MODEL_ACTIONS.level.range.default,
						min: MODEL_ACTIONS.level.range.min,
						max: MODEL_ACTIONS.level.range.max,
						isVisible: (action) => action.options.val === 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.level ? this.camera.level : MODEL_ACTIONS.level.range.default
					switch (action.options.val) {
						case 'up':
							newValue = currentValue < MODEL_ACTIONS.level.range.max ? ++currentValue : MODEL_ACTIONS.level.range.max
							break
						case 'down':
							newValue = currentValue > MODEL_ACTIONS.level.range.min ? --currentValue : MODEL_ACTIONS.level.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						Level: String(newValue),
					}
					this.sendCommand('birddogwbsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.matrix) {
			actions['matrix'] = {
				label: MODEL_ACTIONS.matrix.name,
				options: [
					{
						type: 'dropdown',
						label: 'On/Off',
						id: 'val',
						choices: MODEL_ACTIONS.matrix.choices,
						default: MODEL_ACTIONS.matrix.default,
					},
				],
				callback: (action) => {
					body = {
						Matrix: String(action.options.val),
					}
					this.sendCommand('birddogwbsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.offset) {
			actions['offset'] = {
				label: MODEL_ACTIONS.offset.name,
				options: [
					{
						type: 'dropdown',
						label: 'Offset',
						id: 'val',
						choices: MODEL_ACTIONS.level.choices,
						default: MODEL_ACTIONS.level.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_ACTIONS.offset.range.min + ' to ' + MODEL_ACTIONS.offset.range.max + ')',
						id: 'value',
						default: MODEL_ACTIONS.offset.range.default,
						min: MODEL_ACTIONS.offset.range.min,
						max: MODEL_ACTIONS.offset.range.max,
						isVisible: (action) => action.options.val === 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.offset ? this.camera.offset : MODEL_ACTIONS.offset.range.default
					switch (action.options.val) {
						case 'up':
							newValue = currentValue < MODEL_ACTIONS.offset.range.max ? ++currentValue : MODEL_ACTIONS.offset.range.max
							break
						case 'down':
							newValue = currentValue > MODEL_ACTIONS.offset.range.min ? --currentValue : MODEL_ACTIONS.offset.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						Offset: String(newValue),
					}
					this.sendCommand('birddogwbsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.phase) {
			actions['phase'] = {
				label: MODEL_ACTIONS.phase.name,
				options: [
					{
						type: 'dropdown',
						label: 'Phase',
						id: 'val',
						choices: MODEL_ACTIONS.level.choices,
						default: MODEL_ACTIONS.level.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_ACTIONS.phase.range.min + ' to ' + MODEL_ACTIONS.phase.range.max + ')',
						id: 'value',
						default: MODEL_ACTIONS.phase.range.default,
						min: MODEL_ACTIONS.phase.range.min,
						max: MODEL_ACTIONS.phase.range.max,
						isVisible: (action) => action.options.val === 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.phase ? this.camera.phase : MODEL_ACTIONS.phase.range.default
					switch (action.options.val) {
						case 'up':
							newValue = currentValue < MODEL_ACTIONS.phase.range.max ? ++currentValue : MODEL_ACTIONS.phase.range.max
							break
						case 'down':
							newValue = currentValue > MODEL_ACTIONS.phase.range.min ? --currentValue : MODEL_ACTIONS.phase.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						Phase: String(newValue),
					}
					this.sendCommand('birddogwbsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.rb) {
			actions['rb'] = {
				label: MODEL_ACTIONS.rb.name,
				options: [
					{
						type: 'dropdown',
						label: 'RB',
						id: 'val',
						choices: MODEL_ACTIONS.level.choices,
						default: MODEL_ACTIONS.level.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_ACTIONS.rb.range.min + ' to ' + MODEL_ACTIONS.rb.range.max + ')',
						id: 'value',
						default: MODEL_ACTIONS.rb.range.default,
						min: MODEL_ACTIONS.rb.range.min,
						max: MODEL_ACTIONS.rb.range.max,
						isVisible: (action) => action.options.val === 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.rb ? this.camera.rb : MODEL_ACTIONS.rb.range.default
					switch (action.options.val) {
						case 'up':
							newValue = currentValue < MODEL_ACTIONS.rb.range.max ? ++currentValue : MODEL_ACTIONS.rb.range.max
							break
						case 'down':
							newValue = currentValue > MODEL_ACTIONS.rb.range.min ? --currentValue : MODEL_ACTIONS.rb.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						RB: String(newValue),
					}
					this.sendCommand('birddogwbsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.rg) {
			actions['rg'] = {
				label: MODEL_ACTIONS.rg.name,
				options: [
					{
						type: 'dropdown',
						label: 'RG',
						id: 'val',
						choices: MODEL_ACTIONS.level.choices,
						default: MODEL_ACTIONS.level.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_ACTIONS.rg.range.min + ' to ' + MODEL_ACTIONS.rg.range.max + ')',
						id: 'value',
						default: MODEL_ACTIONS.rg.range.default,
						min: MODEL_ACTIONS.rg.range.min,
						max: MODEL_ACTIONS.rg.range.max,
						isVisible: (action) => action.options.val === 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.rg ? this.camera.rg : MODEL_ACTIONS.rg.range.default
					switch (action.options.val) {
						case 'up':
							newValue = currentValue < MODEL_ACTIONS.rg.range.max ? ++currentValue : MODEL_ACTIONS.rg.range.max
							break
						case 'down':
							newValue = currentValue > MODEL_ACTIONS.rg.range.min ? --currentValue : MODEL_ACTIONS.rg.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						RG: String(newValue),
					}
					this.sendCommand('birddogwbsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.red_gain) {
			actions['red_gain'] = {
				label: MODEL_ACTIONS.red_gain.name,
				options: [
					{
						type: 'dropdown',
						label: 'Red Gain',
						id: 'val',
						choices: MODEL_ACTIONS.red_gain.choices,
						default: MODEL_ACTIONS.red_gain.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_ACTIONS.red_gain.range.min + ' to ' + MODEL_ACTIONS.red_gain.range.max + ')',
						id: 'value',
						default: MODEL_ACTIONS.red_gain.range.default,
						min: MODEL_ACTIONS.red_gain.range.min,
						max: MODEL_ACTIONS.red_gain.range.max,
						isVisible: (action) => action.options.val === 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.red_gain ? this.camera.red_gain : MODEL_ACTIONS.red_gain.range.default
					switch (action.options.val) {
						case 'up':
							newValue =
								currentValue < MODEL_ACTIONS.red_gain.range.max ? ++currentValue : MODEL_ACTIONS.red_gain.range.max
							break
						case 'down':
							newValue =
								currentValue > MODEL_ACTIONS.red_gain.range.min ? --currentValue : MODEL_ACTIONS.red_gain.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						RedGain: String(newValue),
					}
					this.sendCommand('birddogwbsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.select) {
			actions['select'] = {
				label: MODEL_ACTIONS.select.name,
				options: [
					{
						type: 'dropdown',
						label: 'On/Off',
						id: 'val',
						choices: MODEL_ACTIONS.select.choices,
						default: MODEL_ACTIONS.select.default,
					},
				],
				callback: (action) => {
					body = {
						Select: String(action.options.val),
					}
					this.sendCommand('birddogwbsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.speed) {
			actions['speed'] = {
				label: MODEL_ACTIONS.speed.name,
				options: [
					{
						type: 'dropdown',
						label: 'Speed',
						id: 'val',
						choices: MODEL_ACTIONS.level.choices,
						default: MODEL_ACTIONS.level.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_ACTIONS.speed.range.min + ' to ' + MODEL_ACTIONS.speed.range.max + ')',
						id: 'value',
						default: MODEL_ACTIONS.speed.range.default,
						min: MODEL_ACTIONS.speed.range.min,
						max: MODEL_ACTIONS.speed.range.max,
						isVisible: (action) => action.options.val === 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.speed ? this.camera.speed : MODEL_ACTIONS.speed.range.default
					switch (action.options.val) {
						case 'up':
							newValue = currentValue < MODEL_ACTIONS.speed.range.max ? ++currentValue : MODEL_ACTIONS.speed.range.max
							break
						case 'down':
							newValue = currentValue > MODEL_ACTIONS.speed.range.min ? --currentValue : MODEL_ACTIONS.speed.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						Speed: String(newValue),
					}
					this.sendCommand('birddogwbsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.wb_mode) {
			actions['wb_mode'] = {
				label: MODEL_ACTIONS.wb_mode.name,
				options: [
					{
						type: 'dropdown',
						label: 'Mode',
						id: 'val',
						choices: MODEL_ACTIONS.wb_mode.choices,
						default: MODEL_ACTIONS.wb_mode.default,
					},
				],
				callback: (action) => {
					body = {
						WbMode: String(action.options.val),
					}
					this.sendCommand('birddogwbsetup', 'POST', body)
				},
			}
		}
		if (MODEL_ACTIONS?.wbOnePush) {
			actions['wbOnePush'] = {
				label: MODEL_ACTIONS.wbOnePush.name,
				description: 'Camera must be in One Push mode in order to use this action',
				callback: (action) => {
					cmd = VISCA.MSG_CAM + VISCA.CAM_WB_TRIGGER + VISCA.CMD_CAM_WB_TRIGGER_NOW + VISCA.END_MSG
					this.sendVISCACommand(cmd)
				},
			}
		}

		// Picture Setup Actions

		if (MODEL_ACTIONS?.backlight_com) {
			actions['backlight_com'] = {
				label: MODEL_ACTIONS.backlight_com.name,
				options: [
					{
						type: 'dropdown',
						label: 'On/Off',
						id: 'val',
						choices: MODEL_ACTIONS.backlight_com.choices,
						default: MODEL_ACTIONS.backlight_com.default,
					},
				],
				callback: (action) => {
					body = {
						BackLightCom: String(action.options.val),
					}
					this.sendCommand('birddogpicsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.chroma_suppress) {
			actions['chroma_suppress'] = {
				label: MODEL_ACTIONS.chroma_suppress.name,
				options: [
					{
						type: 'dropdown',
						label: 'Mode',
						id: 'val',
						choices: MODEL_ACTIONS.chroma_suppress.choices,
						default: MODEL_ACTIONS.chroma_suppress.default,
					},
				],
				callback: (action) => {
					body = {
						ChromeSuppress: String(action.options.val),
					}
					this.sendCommand('birddogpicsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.saturation) {
			actions['saturation'] = {
				label: MODEL_ACTIONS.saturation.name,
				options: [
					{
						type: 'dropdown',
						label: 'Saturation',
						id: 'val',
						choices: MODEL_ACTIONS.saturation.choices,
						default: MODEL_ACTIONS.saturation.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_ACTIONS.saturation.range.min + ' to ' + MODEL_ACTIONS.saturation.range.max + ')',
						id: 'value',
						min: MODEL_ACTIONS.saturation.range.min,
						max: MODEL_ACTIONS.saturation.range.max,
						default: MODEL_ACTIONS.saturation.range.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.saturation ? this.camera.saturation : MODEL_ACTIONS.saturation.range.default
					switch (action.options.val) {
						case 'up':
							newValue =
								currentValue < MODEL_ACTIONS.saturation.range.max ? ++currentValue : MODEL_ACTIONS.saturation.range.max
							break
						case 'down':
							newValue =
								currentValue > MODEL_ACTIONS.saturation.range.min ? --currentValue : MODEL_ACTIONS.saturation.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						Color: String(newValue),
					}
					this.sendCommand('birddogpicsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.contrast) {
			actions['contrast'] = {
				label: MODEL_ACTIONS.contrast.name,
				options: [
					{
						type: 'dropdown',
						label: 'Contrast',
						id: 'val',
						choices: MODEL_ACTIONS.contrast.choices,
						default: MODEL_ACTIONS.contrast.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_ACTIONS.contrast.range.min + ' to ' + MODEL_ACTIONS.contrast.range.max + ')',
						id: 'value',
						min: MODEL_ACTIONS.contrast.range.min,
						max: MODEL_ACTIONS.contrast.range.max,
						default: MODEL_ACTIONS.contrast.range.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.contrast ? this.camera.contrast : MODEL_ACTIONS.contrast.range.default
					switch (action.options.val) {
						case 'up':
							newValue =
								currentValue < MODEL_ACTIONS.contrast.range.max ? ++currentValue : MODEL_ACTIONS.contrast.range.max
							break
						case 'down':
							newValue =
								currentValue > MODEL_ACTIONS.contrast.range.min ? --currentValue : MODEL_ACTIONS.contrast.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						Contrast: String(newValue),
					}
					this.sendCommand('birddogpicsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.pictureEffect) {
			actions['pictureEffect'] = {
				label: MODEL_ACTIONS.pictureEffect.name,
				options: [
					{
						type: 'dropdown',
						label: 'Effect',
						id: 'val',
						choices: MODEL_ACTIONS.pictureEffect.choices,
						default: MODEL_ACTIONS.pictureEffect.default,
					},
				],
				callback: (action) => {
					body = {
						Effect: String(action.options.val),
					}
					this.sendCommand('birddogpicsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.picFlip) {
			actions['picFlip'] = {
				label: MODEL_ACTIONS.picFlip.name,
				options: [
					{
						type: 'dropdown',
						label: 'On / Off',
						id: 'val',
						choices: MODEL_ACTIONS.picFlip.choices,
						default: MODEL_ACTIONS.picFlip.default,
					},
				],
				callback: (action) => {
					body = {
						Flip: String(action.options.val),
					}
					this.sendCommand('birddogpicsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.gamma) {
			actions['gamma'] = {
				label: MODEL_ACTIONS.gamma.name,
				options: [
					{
						type: 'dropdown',
						label: 'Gamma',
						id: 'val',
						choices: MODEL_ACTIONS.gamma.choices,
						default: MODEL_ACTIONS.gamma.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_ACTIONS.gamma.range.min + ' to ' + MODEL_ACTIONS.gamma.range.max + ')',
						id: 'value',
						min: MODEL_ACTIONS.gamma.range.min,
						max: MODEL_ACTIONS.gamma.range.max,
						default: MODEL_ACTIONS.gamma.range.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.gamma ? this.camera.gamma : MODEL_ACTIONS.gamma.range.default
					switch (action.options.val) {
						case 'up':
							newValue = currentValue < MODEL_ACTIONS.gamma.range.max ? ++currentValue : MODEL_ACTIONS.gamma.range.max
							break
						case 'down':
							newValue = currentValue > MODEL_ACTIONS.gamma.range.min ? --currentValue : MODEL_ACTIONS.gamma.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						Gamma: String(newValue),
					}
					this.sendCommand('birddogpicsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.highlight_comp) {
			actions['highlight_comp'] = {
				label: MODEL_ACTIONS.highlight_comp.name,
				options: [
					{
						type: 'dropdown',
						label: 'Highlight Compensation',
						id: 'val',
						choices: MODEL_ACTIONS.highlight_comp.choices,
						default: MODEL_ACTIONS.highlight_comp.default,
					},
				],
				callback: (action) => {
					body = {
						HighlightComp: String(action.options.val),
					}
					this.sendCommand('birddogpicsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.highlight_comp_mask) {
			actions['highlight_comp_mask'] = {
				label: MODEL_ACTIONS.highlight_comp_mask.name,
				options: [
					{
						type: 'dropdown',
						label: 'Highlight Compensation Mask',
						id: 'val',
						choices: MODEL_ACTIONS.highlight_comp_mask.choices,
						default: MODEL_ACTIONS.highlight_comp_mask.default,
					},
					{
						type: 'number',
						label:
							'Value (' +
							MODEL_ACTIONS.highlight_comp_mask.range.min +
							' to ' +
							MODEL_ACTIONS.highlight_comp_mask.range.max +
							')',
						id: 'value',
						min: MODEL_ACTIONS.highlight_comp_mask.range.min,
						max: MODEL_ACTIONS.highlight_comp_mask.range.max,
						default: MODEL_ACTIONS.highlight_comp_mask.range.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.highlight_comp_mask
						? this.camera.highlight_comp_mask
						: MODEL_ACTIONS.highlight_comp_mask.range.default
					switch (action.options.val) {
						case 'up':
							newValue =
								currentValue < MODEL_ACTIONS.highlight_comp_mask.range.max
									? ++currentValue
									: MODEL_ACTIONS.highlight_comp_mask.range.max
							break
						case 'down':
							newValue =
								currentValue > MODEL_ACTIONS.highlight_comp_mask.range.min
									? --currentValue
									: MODEL_ACTIONS.highlight_comp_mask.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						HighlightCompMask: String(newValue),
					}
					this.sendCommand('birddogpicsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.hue) {
			actions['hue'] = {
				label: MODEL_ACTIONS.hue.name,
				options: [
					{
						type: 'dropdown',
						label: 'Hue',
						id: 'val',
						choices: MODEL_ACTIONS.hue.choices,
						default: MODEL_ACTIONS.hue.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_ACTIONS.hue.range.min + ' to ' + MODEL_ACTIONS.hue.range.max + ')',
						id: 'value',
						min: MODEL_ACTIONS.hue.range.min,
						max: MODEL_ACTIONS.hue.range.max,
						default: MODEL_ACTIONS.hue.range.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.hue ? this.camera.hue : MODEL_ACTIONS.hue.range.default
					switch (action.options.val) {
						case 'up':
							newValue = currentValue < MODEL_ACTIONS.hue.range.max ? ++currentValue : MODEL_ACTIONS.hue.range.max
							break
						case 'down':
							newValue = currentValue > MODEL_ACTIONS.hue.range.min ? --currentValue : MODEL_ACTIONS.hue.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						Hue: String(newValue),
					}
					this.sendCommand('birddogpicsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.ir_cutfilter) {
			actions['ir_cutfilter'] = {
				label: MODEL_ACTIONS.ir_cutfilter.name,
				options: [
					{
						type: 'dropdown',
						label: 'Mode',
						id: 'val',
						choices: MODEL_ACTIONS.ir_cutfilter.choices,
						default: MODEL_ACTIONS.ir_cutfilter.default,
					},
				],
				callback: (action) => {
					body = {
						IRCutFilter: String(action.options.val),
					}
					this.sendCommand('birddogpicsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.low_latency) {
			actions['low_latency'] = {
				label: MODEL_ACTIONS.low_latency.name,
				options: [
					{
						type: 'dropdown',
						label: 'On / Off',
						id: 'val',
						choices: MODEL_ACTIONS.low_latency.choices,
						default: MODEL_ACTIONS.low_latency.default,
					},
				],
				callback: (action) => {
					body = {
						LowLatency: String(action.options.val),
					}
					this.sendCommand('birddogpicsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.picMirror) {
			actions['picMirror'] = {
				label: MODEL_ACTIONS.picMirror.name,
				options: [
					{
						type: 'dropdown',
						label: 'On / Off',
						id: 'val',
						choices: MODEL_ACTIONS.picMirror.choices,
						default: MODEL_ACTIONS.picMirror.default,
					},
				],
				callback: (action) => {
					body = {
						Mirror: String(action.options.val),
					}
					this.sendCommand('birddogpicsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.nd_filter) {
			actions['nd_filter'] = {
				label: MODEL_ACTIONS.nd_filter.name,
				options: [
					{
						type: 'dropdown',
						label: 'ND Filter',
						id: 'val',
						choices: MODEL_ACTIONS.nd_filter.choices,
						default: MODEL_ACTIONS.nd_filter.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_ACTIONS.nd_filter.range.min + ' to ' + MODEL_ACTIONS.nd_filter.range.max + ')',
						id: 'value',
						min: MODEL_ACTIONS.nd_filter.range.min,
						max: MODEL_ACTIONS.nd_filter.range.max,
						default: MODEL_ACTIONS.nd_filter.range.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.nd_filter ? this.camera.nd_filter : MODEL_ACTIONS.nd_filter.range.default
					switch (action.options.val) {
						case 'up':
							newValue =
								currentValue < MODEL_ACTIONS.nd_filter.range.max ? ++currentValue : MODEL_ACTIONS.nd_filter.range.max
							break
						case 'down':
							newValue =
								currentValue > MODEL_ACTIONS.nd_filter.range.min ? --currentValue : MODEL_ACTIONS.nd_filter.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						NDFilter: String(newValue),
					}
					this.sendCommand('birddogpicsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.noise_reduction) {
			actions['noise_reduction'] = {
				label: MODEL_ACTIONS.noise_reduction.name,
				options: [
					{
						type: 'dropdown',
						label: 'Noise Reduction',
						id: 'val',
						choices: MODEL_ACTIONS.noise_reduction.choices,
						default: MODEL_ACTIONS.noise_reduction.default,
					},
					{
						type: 'dropdown',
						label: 'Value',
						id: 'value',
						choices: MODEL_ACTIONS.noise_reduction.value.choices,
						default: MODEL_ACTIONS.noise_reduction.value.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.noise_reduction
						? this.camera.noise_reduction
						: MODEL_ACTIONS.noise_reduction.value.default
					switch (action.options.val) {
						case 'up':
							newValue =
								currentValue < MODEL_ACTIONS.noise_reduction.range.max
									? ++currentValue
									: MODEL_ACTIONS.noise_reduction.range.max
							break
						case 'down':
							newValue =
								currentValue > MODEL_ACTIONS.noise_reduction.range.min
									? --currentValue
									: MODEL_ACTIONS.noise_reduction.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						NoiseReduction: String(newValue),
					}
					this.sendCommand('birddogpicsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.sharpness) {
			actions['sharpness'] = {
				label: MODEL_ACTIONS.sharpness.name,
				options: [
					{
						type: 'dropdown',
						label: 'Sharpness',
						id: 'val',
						choices: MODEL_ACTIONS.sharpness.choices,
						default: MODEL_ACTIONS.sharpness.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_ACTIONS.sharpness.range.min + ' to ' + MODEL_ACTIONS.sharpness.range.max + ')',
						id: 'value',
						min: MODEL_ACTIONS.sharpness.range.min,
						max: MODEL_ACTIONS.sharpness.range.max,
						default: MODEL_ACTIONS.sharpness.range.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.sharpness ? this.camera.sharpness : MODEL_ACTIONS.sharpness.range.default
					switch (action.options.val) {
						case 'up':
							newValue =
								currentValue < MODEL_ACTIONS.sharpness.range.max ? ++currentValue : MODEL_ACTIONS.sharpness.range.max
							break
						case 'down':
							newValue =
								currentValue > MODEL_ACTIONS.sharpness.range.min ? --currentValue : MODEL_ACTIONS.sharpness.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						Sharpness: String(newValue),
					}
					this.sendCommand('birddogpicsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.stabilizer) {
			actions['stabilizer'] = {
				label: MODEL_ACTIONS.stabilizer.name,
				options: [
					{
						type: 'dropdown',
						label: 'On / Off',
						id: 'val',
						choices: MODEL_ACTIONS.stabilizer.choices,
						default: MODEL_ACTIONS.stabilizer.default,
					},
				],
				callback: (action) => {
					body = {
						Stabilizer: String(action.options.val),
					}
					this.sendCommand('birddogpicsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.threed_nr) {
			actions['threed_nr'] = {
				label: MODEL_ACTIONS.threed_nr.name,
				options: [
					{
						type: 'dropdown',
						label: '3D NR',
						id: 'val',
						choices: MODEL_ACTIONS.threed_nr.choices,
						default: MODEL_ACTIONS.threed_nr.default,
					},
					{
						type: 'dropdown',
						label: 'Value',
						id: 'val',
						choices: MODEL_ACTIONS.threed_nr.value.choices,
						default: MODEL_ACTIONS.threed_nr.value.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.threed_nr ? this.camera.threed_nr : MODEL_ACTIONS.threed_nr.value.default
					switch (action.options.val) {
						case 'up':
							newValue =
								currentValue < MODEL_ACTIONS.threed_nr.range.max ? ++currentValue : MODEL_ACTIONS.threed_nr.range.max
							break
						case 'down':
							newValue =
								currentValue > MODEL_ACTIONS.threed_nr.range.min ? --currentValue : MODEL_ACTIONS.threed_nr.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						ThreeDNR: String(newValue),
					}
					this.sendCommand('birddogpicsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.twod_nr) {
			actions['twod_nr'] = {
				label: MODEL_ACTIONS.twod_nr.name,
				options: [
					{
						type: 'dropdown',
						label: '2D NR',
						id: 'val',
						choices: MODEL_ACTIONS.twod_nr.choices,
						default: MODEL_ACTIONS.twod_nr.default,
					},
					{
						type: 'dropdown',
						label: 'Value',
						id: 'val',
						choices: MODEL_ACTIONS.twod_nr.value.choices,
						default: MODEL_ACTIONS.twod_nr.value.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.twod_nr ? this.camera.twod_nr : MODEL_ACTIONS.twod_nr.value.default
					switch (action.options.val) {
						case 'up':
							newValue =
								currentValue < MODEL_ACTIONS.twod_nr.range.max ? ++currentValue : MODEL_ACTIONS.twod_nr.range.max
							break
						case 'down':
							newValue =
								currentValue > MODEL_ACTIONS.twod_nr.range.min ? --currentValue : MODEL_ACTIONS.twod_nr.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						TWODNR: String(newValue),
					}
					this.sendCommand('birddogpicsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.wide_dynamic_range) {
			actions['wide_dynamic_range'] = {
				label: MODEL_ACTIONS.wide_dynamic_range.name,
				options: [
					{
						type: 'dropdown',
						label: 'Wide Dynamic Range',
						id: 'val',
						choices: MODEL_ACTIONS.wide_dynamic_range.choices,
						default: MODEL_ACTIONS.wide_dynamic_range.default,
					},
					{
						type: 'dropdown',
						label: 'Value',
						id: 'value',
						choices: MODEL_ACTIONS.wide_dynamic_range.value.choices,
						default: MODEL_ACTIONS.wide_dynamic_range.value.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.wide_dynamic_range
						? this.camera.wide_dynamic_range
						: MODEL_ACTIONS.wide_dynamic_range.value.default
					switch (action.options.val) {
						case 'up':
							newValue =
								currentValue < MODEL_ACTIONS.wide_dynamic_range.range.max
									? ++currentValue
									: MODEL_ACTIONS.wide_dynamic_range.range.max
							break
						case 'down':
							newValue =
								currentValue > MODEL_ACTIONS.wide_dynamic_range.range.min
									? --currentValue
									: MODEL_ACTIONS.wide_dynamic_range.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						WideDynamicRange: String(newValue),
					}
					this.sendCommand('birddogpicsetup', 'POST', body)
				},
			}
		}

		// Color Matrix Actions

		if (MODEL_ACTIONS?.cm_blue_gain) {
			actions['cm_blue_gain'] = {
				label: MODEL_ACTIONS.cm_blue_gain.name,
				options: [
					{
						type: 'dropdown',
						label: 'Blue Gain',
						id: 'val',
						choices: MODEL_ACTIONS.cm_blue_gain.choices,
						default: MODEL_ACTIONS.cm_blue_gain.default,
					},
					{
						type: 'number',
						label:
							'Value (' + MODEL_ACTIONS.cm_blue_gain.range.min + ' to ' + MODEL_ACTIONS.cm_blue_gain.range.max + ')',
						id: 'value',
						min: MODEL_ACTIONS.cm_blue_gain.range.min,
						max: MODEL_ACTIONS.cm_blue_gain.range.max,
						default: MODEL_ACTIONS.cm_blue_gain.range.default,
						isVisible: (action) => action.options.val == 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.cm_blue_gain ? this.camera.cm_blue_gain : MODEL_ACTIONS.cm_blue_gain.range.default
					switch (action.options.val) {
						case 'up':
							newValue =
								currentValue < MODEL_ACTIONS.cm_blue_gain.range.max
									? ++currentValue
									: MODEL_ACTIONS.cm_blue_gain.range.max
							break
						case 'down':
							newValue =
								currentValue > MODEL_ACTIONS.cm_blue_gain.range.min
									? --currentValue
									: MODEL_ACTIONS.cm_blue_gain.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						BlueGain: String(newValue),
					}
					this.sendCommand('birddogcmsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.cm_blue_hue) {
			actions['cm_blue_hue'] = {
				label: MODEL_ACTIONS.cm_blue_hue.name,
				options: [
					{
						type: 'dropdown',
						label: 'Blue Hue',
						id: 'val',
						choices: MODEL_ACTIONS.cm_blue_hue.choices,
						default: MODEL_ACTIONS.cm_blue_hue.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_ACTIONS.cm_blue_hue.range.min + ' to ' + MODEL_ACTIONS.cm_blue_hue.range.max + ')',
						id: 'value',
						min: MODEL_ACTIONS.cm_blue_hue.range.min,
						max: MODEL_ACTIONS.cm_blue_hue.range.max,
						default: MODEL_ACTIONS.cm_blue_hue.range.default,
						isVisible: (action) => action.options.val == 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.cm_blue_hue ? this.camera.cm_blue_hue : MODEL_ACTIONS.cm_blue_hue.range.default
					switch (action.options.val) {
						case 'up':
							newValue =
								currentValue < MODEL_ACTIONS.cm_blue_hue.range.max
									? ++currentValue
									: MODEL_ACTIONS.cm_blue_hue.range.max
							break
						case 'down':
							newValue =
								currentValue > MODEL_ACTIONS.cm_blue_hue.range.min
									? --currentValue
									: MODEL_ACTIONS.cm_blue_hue.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						BlueHue: String(newValue),
					}
					this.sendCommand('birddogcmsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.cm_color_gain) {
			actions['cm_color_gain'] = {
				label: MODEL_ACTIONS.cm_color_gain.name,
				options: [
					{
						type: 'dropdown',
						label: 'Color Gain',
						id: 'val',
						choices: MODEL_ACTIONS.cm_color_gain.choices,
						default: MODEL_ACTIONS.cm_color_gain.default,
					},
					{
						type: 'number',
						label:
							'Value (' + MODEL_ACTIONS.cm_color_gain.range.min + ' to ' + MODEL_ACTIONS.cm_color_gain.range.max + ')',
						id: 'value',
						min: MODEL_ACTIONS.cm_color_gain.range.min,
						max: MODEL_ACTIONS.cm_color_gain.range.max,
						default: MODEL_ACTIONS.cm_color_gain.range.default,
						isVisible: (action) => action.options.val == 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.cm_color_gain
						? this.camera.cm_color_gain
						: MODEL_ACTIONS.cm_color_gain.range.default
					switch (action.options.val) {
						case 'up':
							newValue =
								currentValue < MODEL_ACTIONS.cm_color_gain.range.max
									? ++currentValue
									: MODEL_ACTIONS.cm_color_gain.range.max
							break
						case 'down':
							newValue =
								currentValue > MODEL_ACTIONS.cm_color_gain.range.min
									? --currentValue
									: MODEL_ACTIONS.cm_color_gain.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						ColourGain: String(newValue),
					}
					this.sendCommand('birddogcmsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.cm_cyan_gain) {
			actions['cm_cyan_gain'] = {
				label: MODEL_ACTIONS.cm_cyan_gain.name,
				options: [
					{
						type: 'dropdown',
						label: 'Cyan Gain',
						id: 'val',
						choices: MODEL_ACTIONS.cm_cyan_gain.choices,
						default: MODEL_ACTIONS.cm_cyan_gain.default,
					},
					{
						type: 'number',
						label:
							'Value (' + MODEL_ACTIONS.cm_cyan_gain.range.min + ' to ' + MODEL_ACTIONS.cm_cyan_gain.range.max + ')',
						id: 'value',
						min: MODEL_ACTIONS.cm_cyan_gain.range.min,
						max: MODEL_ACTIONS.cm_cyan_gain.range.max,
						default: MODEL_ACTIONS.cm_cyan_gain.range.default,
						isVisible: (action) => action.options.val == 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.cm_cyan_gain ? this.camera.cm_cyan_gain : MODEL_ACTIONS.cm_cyan_gain.range.default
					switch (action.options.val) {
						case 'up':
							newValue =
								currentValue < MODEL_ACTIONS.cm_cyan_gain.range.max
									? ++currentValue
									: MODEL_ACTIONS.cm_cyan_gain.range.max
							break
						case 'down':
							newValue =
								currentValue > MODEL_ACTIONS.cm_cyan_gain.range.min
									? --currentValue
									: MODEL_ACTIONS.cm_cyan_gain.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						CyanGain: String(newValue),
					}
					this.sendCommand('birddogcmsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.cm_cyan_hue) {
			actions['cm_cyan_hue'] = {
				label: MODEL_ACTIONS.cm_cyan_hue.name,
				options: [
					{
						type: 'dropdown',
						label: 'Cyan Hue',
						id: 'val',
						choices: MODEL_ACTIONS.cm_cyan_hue.choices,
						default: MODEL_ACTIONS.cm_cyan_hue.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_ACTIONS.cm_cyan_hue.range.min + ' to ' + MODEL_ACTIONS.cm_cyan_hue.range.max + ')',
						id: 'value',
						min: MODEL_ACTIONS.cm_cyan_hue.range.min,
						max: MODEL_ACTIONS.cm_cyan_hue.range.max,
						default: MODEL_ACTIONS.cm_cyan_hue.range.default,
						isVisible: (action) => action.options.val == 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.cm_cyan_hue ? this.camera.cm_cyan_hue : MODEL_ACTIONS.cm_cyan_hue.range.default
					switch (action.options.val) {
						case 'up':
							newValue =
								currentValue < MODEL_ACTIONS.cm_cyan_hue.range.max
									? ++currentValue
									: MODEL_ACTIONS.cm_cyan_hue.range.max
							break
						case 'down':
							newValue =
								currentValue > MODEL_ACTIONS.cm_cyan_hue.range.min
									? --currentValue
									: MODEL_ACTIONS.cm_cyan_hue.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						CyanHue: String(newValue),
					}
					this.sendCommand('birddogcmsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.cm_green_gain) {
			actions['cm_green_gain'] = {
				label: MODEL_ACTIONS.cm_green_gain.name,
				options: [
					{
						type: 'dropdown',
						label: 'Green Gain',
						id: 'val',
						choices: MODEL_ACTIONS.cm_green_gain.choices,
						default: MODEL_ACTIONS.cm_green_gain.default,
					},
					{
						type: 'number',
						label:
							'Value (' + MODEL_ACTIONS.cm_green_gain.range.min + ' to ' + MODEL_ACTIONS.cm_green_gain.range.max + ')',
						id: 'value',
						min: MODEL_ACTIONS.cm_green_gain.range.min,
						max: MODEL_ACTIONS.cm_green_gain.range.max,
						default: MODEL_ACTIONS.cm_green_gain.range.default,
						isVisible: (action) => action.options.val == 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.cm_green_gain
						? this.camera.cm_green_gain
						: MODEL_ACTIONS.cm_green_gain.range.default
					switch (action.options.val) {
						case 'up':
							newValue =
								currentValue < MODEL_ACTIONS.cm_green_gain.range.max
									? ++currentValue
									: MODEL_ACTIONS.cm_green_gain.range.max
							break
						case 'down':
							newValue =
								currentValue > MODEL_ACTIONS.cm_green_gain.range.min
									? --currentValue
									: MODEL_ACTIONS.cm_green_gain.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						GreenGain: String(newValue),
					}
					this.sendCommand('birddogcmsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.cm_green_hue) {
			actions['cm_green_hue'] = {
				label: MODEL_ACTIONS.cm_green_hue.name,
				options: [
					{
						type: 'dropdown',
						label: 'Green Hue',
						id: 'val',
						choices: MODEL_ACTIONS.cm_green_hue.choices,
						default: MODEL_ACTIONS.cm_green_hue.default,
					},
					{
						type: 'number',
						label:
							'Value (' + MODEL_ACTIONS.cm_green_hue.range.min + ' to ' + MODEL_ACTIONS.cm_green_hue.range.max + ')',
						id: 'value',
						min: MODEL_ACTIONS.cm_green_hue.range.min,
						max: MODEL_ACTIONS.cm_green_hue.range.max,
						default: MODEL_ACTIONS.cm_green_hue.range.default,
						isVisible: (action) => action.options.val == 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.cm_green_hue ? this.camera.cm_green_hue : MODEL_ACTIONS.cm_green_hue.range.default
					switch (action.options.val) {
						case 'up':
							newValue =
								currentValue < MODEL_ACTIONS.cm_green_hue.range.max
									? ++currentValue
									: MODEL_ACTIONS.cm_green_hue.range.max
							break
						case 'down':
							newValue =
								currentValue > MODEL_ACTIONS.cm_green_hue.range.min
									? --currentValue
									: MODEL_ACTIONS.cm_green_hue.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						GreenHue: String(newValue),
					}
					this.sendCommand('birddogcmsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.cm_hue_phase) {
			actions['cm_hue_phase'] = {
				label: MODEL_ACTIONS.cm_hue_phase.name,
				options: [
					{
						type: 'dropdown',
						label: 'Hue Phase',
						id: 'val',
						choices: MODEL_ACTIONS.cm_hue_phase.choices,
						default: MODEL_ACTIONS.cm_hue_phase.default,
					},
					{
						type: 'number',
						label:
							'Value (' + MODEL_ACTIONS.cm_hue_phase.range.min + ' to ' + MODEL_ACTIONS.cm_hue_phase.range.max + ')',
						id: 'value',
						min: MODEL_ACTIONS.cm_hue_phase.range.min,
						max: MODEL_ACTIONS.cm_hue_phase.range.max,
						default: MODEL_ACTIONS.cm_hue_phase.range.default,
						isVisible: (action) => action.options.val == 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.cm_hue_phase ? this.camera.cm_hue_phase : MODEL_ACTIONS.cm_hue_phase.range.default
					switch (action.options.val) {
						case 'up':
							newValue =
								currentValue < MODEL_ACTIONS.cm_hue_phase.range.max
									? ++currentValue
									: MODEL_ACTIONS.cm_hue_phase.range.max
							break
						case 'down':
							newValue =
								currentValue > MODEL_ACTIONS.cm_hue_phase.range.min
									? --currentValue
									: MODEL_ACTIONS.cm_hue_phase.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						HuePhase: String(newValue),
					}
					this.sendCommand('birddogcmsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.cm_mag_gain) {
			actions['cm_mag_gain'] = {
				label: MODEL_ACTIONS.cm_mag_gain.name,
				options: [
					{
						type: 'dropdown',
						label: 'Magenta Gain',
						id: 'val',
						choices: MODEL_ACTIONS.cm_mag_gain.choices,
						default: MODEL_ACTIONS.cm_mag_gain.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_ACTIONS.cm_mag_gain.range.min + ' to ' + MODEL_ACTIONS.cm_mag_gain.range.max + ')',
						id: 'value',
						min: MODEL_ACTIONS.cm_mag_gain.range.min,
						max: MODEL_ACTIONS.cm_mag_gain.range.max,
						default: MODEL_ACTIONS.cm_mag_gain.range.default,
						isVisible: (action) => action.options.val == 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.cm_mag_gain ? this.camera.cm_mag_gain : MODEL_ACTIONS.cm_mag_gain.range.default
					switch (action.options.val) {
						case 'up':
							newValue =
								currentValue < MODEL_ACTIONS.cm_mag_gain.range.max
									? ++currentValue
									: MODEL_ACTIONS.cm_mag_gain.range.max
							break
						case 'down':
							newValue =
								currentValue > MODEL_ACTIONS.cm_mag_gain.range.min
									? --currentValue
									: MODEL_ACTIONS.cm_mag_gain.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						MagGain: String(newValue),
					}
					this.sendCommand('birddogcmsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.cm_mag_hue) {
			actions['cm_mag_hue'] = {
				label: MODEL_ACTIONS.cm_mag_hue.name,
				options: [
					{
						type: 'dropdown',
						label: 'Magenta Hue',
						id: 'val',
						choices: MODEL_ACTIONS.cm_mag_hue.choices,
						default: MODEL_ACTIONS.cm_mag_hue.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_ACTIONS.cm_mag_hue.range.min + ' to ' + MODEL_ACTIONS.cm_mag_hue.range.max + ')',
						id: 'value',
						min: MODEL_ACTIONS.cm_mag_hue.range.min,
						max: MODEL_ACTIONS.cm_mag_hue.range.max,
						default: MODEL_ACTIONS.cm_mag_hue.range.default,
						isVisible: (action) => action.options.val == 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.cm_mag_hue ? this.camera.cm_mag_hue : MODEL_ACTIONS.cm_mag_hue.range.default
					switch (action.options.val) {
						case 'up':
							newValue =
								currentValue < MODEL_ACTIONS.cm_mag_hue.range.max ? ++currentValue : MODEL_ACTIONS.cm_mag_hue.range.max
							break
						case 'down':
							newValue =
								currentValue > MODEL_ACTIONS.cm_mag_hue.range.min ? --currentValue : MODEL_ACTIONS.cm_mag_hue.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						MagHue: String(newValue),
					}
					this.sendCommand('birddogcmsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.cm_red_gain) {
			actions['cm_red_gain'] = {
				label: MODEL_ACTIONS.cm_red_gain.name,
				options: [
					{
						type: 'dropdown',
						label: 'Red Gain',
						id: 'val',
						choices: MODEL_ACTIONS.cm_red_gain.choices,
						default: MODEL_ACTIONS.cm_red_gain.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_ACTIONS.cm_red_gain.range.min + ' to ' + MODEL_ACTIONS.cm_red_gain.range.max + ')',
						id: 'value',
						min: MODEL_ACTIONS.cm_red_gain.range.min,
						max: MODEL_ACTIONS.cm_red_gain.range.max,
						default: MODEL_ACTIONS.cm_red_gain.range.default,
						isVisible: (action) => action.options.val == 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.cm_red_gain ? this.camera.cm_red_gain : MODEL_ACTIONS.cm_red_gain.range.default
					switch (action.options.val) {
						case 'up':
							newValue =
								currentValue < MODEL_ACTIONS.cm_red_gain.range.max
									? ++currentValue
									: MODEL_ACTIONS.cm_red_gain.range.max
							break
						case 'down':
							newValue =
								currentValue > MODEL_ACTIONS.cm_red_gain.range.min
									? --currentValue
									: MODEL_ACTIONS.cm_red_gain.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						RedGain: String(newValue),
					}
					this.sendCommand('birddogcmsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.cm_red_hue) {
			actions['cm_red_hue'] = {
				label: MODEL_ACTIONS.cm_red_hue.name,
				options: [
					{
						type: 'dropdown',
						label: 'Red Hue',
						id: 'val',
						choices: MODEL_ACTIONS.cm_red_hue.choices,
						default: MODEL_ACTIONS.cm_red_hue.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_ACTIONS.cm_red_hue.range.min + ' to ' + MODEL_ACTIONS.cm_red_hue.range.max + ')',
						id: 'value',
						min: MODEL_ACTIONS.cm_red_hue.range.min,
						max: MODEL_ACTIONS.cm_red_hue.range.max,
						default: MODEL_ACTIONS.cm_red_hue.range.default,
						isVisible: (action) => action.options.val == 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.cm_red_hue ? this.camera.cm_red_hue : MODEL_ACTIONS.cm_red_hue.range.default
					switch (action.options.val) {
						case 'up':
							newValue =
								currentValue < MODEL_ACTIONS.cm_red_hue.range.max ? ++currentValue : ODEL_ACTIONS.cm_red_hue.range.max
							break
						case 'down':
							newValue =
								currentValue > MODEL_ACTIONS.cm_red_hue.range.min ? --currentValue : ODEL_ACTIONS.cm_red_hue.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						RedHue: String(newValue),
					}
					this.sendCommand('birddogcmsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.cm_yellow_gain) {
			actions['cm_yellow_gain'] = {
				label: MODEL_ACTIONS.cm_yellow_gain.name,
				options: [
					{
						type: 'dropdown',
						label: 'Yellow Gain',
						id: 'val',
						choices: MODEL_ACTIONS.cm_yellow_gain.choices,
						default: MODEL_ACTIONS.cm_yellow_gain.default,
					},
					{
						type: 'number',
						label:
							'Value (' +
							MODEL_ACTIONS.cm_yellow_gain.range.min +
							' to ' +
							MODEL_ACTIONS.cm_yellow_gain.range.max +
							')',
						id: 'value',
						min: MODEL_ACTIONS.cm_yellow_gain.range.min,
						max: MODEL_ACTIONS.cm_yellow_gain.range.max,
						default: MODEL_ACTIONS.cm_yellow_gain.range.default,
						isVisible: (action) => action.options.val == 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.cm_yellow_gain
						? this.camera.cm_yellow_gain
						: MODEL_ACTIONS.cm_yellow_gain.range.default
					switch (action.options.val) {
						case 'up':
							newValue =
								currentValue < MODEL_ACTIONS.cm_yellow_gain.range.max
									? ++currentValue
									: MODEL_ACTIONS.cm_yellow_gain.range.max
							break
						case 'down':
							newValue =
								currentValue > MODEL_ACTIONS.cm_yellow_gain.range.min
									? --currentValue
									: MODEL_ACTIONS.cm_yellow_gain.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						YellowGain: String(newValue),
					}
					this.sendCommand('birddogcmsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.cm_yellow_hue) {
			actions['cm_yellow_hue'] = {
				label: MODEL_ACTIONS.cm_yellow_hue.name,
				options: [
					{
						type: 'dropdown',
						label: 'Yellow Hue',
						id: 'val',
						choices: MODEL_ACTIONS.cm_yellow_hue.choices,
						default: MODEL_ACTIONS.cm_yellow_hue.default,
					},
					{
						type: 'number',
						label:
							'Value (' + MODEL_ACTIONS.cm_yellow_hue.range.min + ' to ' + MODEL_ACTIONS.cm_yellow_hue.range.max + ')',
						id: 'value',
						min: MODEL_ACTIONS.cm_yellow_hue.range.min,
						max: MODEL_ACTIONS.cm_yellow_hue.range.max,
						default: MODEL_ACTIONS.cm_yellow_hue.range.default,
						isVisible: (action) => action.options.val == 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.cm_yellow_hue
						? this.camera.cm_yellow_hue
						: MODEL_ACTIONS.cm_yellow_hue.range.default
					switch (action.options.val) {
						case 'up':
							newValue =
								currentValue < MODEL_ACTIONS.cm_yellow_hue.range.max
									? ++currentValue
									: MODEL_ACTIONS.cm_yellow_hue.range.max
							break
						case 'down':
							newValue =
								currentValue > MODEL_ACTIONS.cm_yellow_hue.range.min
									? --currentValue
									: MODEL_ACTIONS.cm_yellow_hue.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						YellowHue: String(newValue),
					}
					this.sendCommand('birddogcmsetup', 'POST', body)
				},
			}
		}

		// Advanced Setup Actions

		if (MODEL_ACTIONS?.brightness) {
			actions['brightness'] = {
				label: MODEL_ACTIONS.brightness.name,
				options: [
					{
						type: 'dropdown',
						label: 'Brightness',
						id: 'val',
						choices: MODEL_ACTIONS.brightness.choices,
						default: MODEL_ACTIONS.brightness.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_ACTIONS.brightness.range.min + ' to ' + MODEL_ACTIONS.brightness.range.max + ')',
						id: 'value',
						min: MODEL_ACTIONS.brightness.range.min,
						max: MODEL_ACTIONS.brightness.range.max,
						default: MODEL_ACTIONS.brightness.range.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.brightness ? this.camera.brightness : MODEL_ACTIONS.brightness.range.default
					switch (action.options.val) {
						case 'up':
							newValue =
								currentValue < MODEL_ACTIONS.brightness.range.max ? ++currentValue : MODEL_ACTIONS.brightness.range.max
							break
						case 'down':
							newValue =
								currentValue > MODEL_ACTIONS.brightness.range.min ? --currentValue : MODEL_ACTIONS.brightness.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						Brightness: String(newValue),
					}
					this.sendCommand('birddogadvancesetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.brightness_comp) {
			actions['brightness_comp'] = {
				label: MODEL_ACTIONS.brightness_comp.name,
				options: [
					{
						type: 'dropdown',
						label: 'Mode',
						id: 'val',
						choices: MODEL_ACTIONS.brightness_comp.choices,
						default: MODEL_ACTIONS.brightness_comp.default,
					},
				],
				callback: (action) => {
					body = {
						BrightnessComp: String(action.options.val),
					}
					this.sendCommand('birddogadvancesetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.comp_level) {
			actions['comp_level'] = {
				label: MODEL_ACTIONS.comp_level.name,
				options: [
					{
						type: 'dropdown',
						label: 'Level',
						id: 'val',
						choices: MODEL_ACTIONS.comp_level.choices,
						default: MODEL_ACTIONS.comp_level.default,
					},
				],
				callback: (action) => {
					body = {
						CompLevel: String(action.options.val),
					}
					this.sendCommand('birddogadvancesetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.gamma_offset) {
			actions['gamma_offset'] = {
				label: MODEL_ACTIONS.gamma_offset.name,
				options: [
					{
						type: 'dropdown',
						label: 'Gamma Offset',
						id: 'val',
						choices: MODEL_ACTIONS.gamma_offset.choices,
						default: MODEL_ACTIONS.gamma_offset.default,
					},
					{
						type: 'number',
						label:
							'Value (' + MODEL_ACTIONS.gamma_offset.range.min + ' to ' + MODEL_ACTIONS.gamma_offset.range.max + ')',
						id: 'value',
						min: MODEL_ACTIONS.gamma_offset.range.min,
						max: MODEL_ACTIONS.gamma_offset.range.max,
						default: MODEL_ACTIONS.gamma_offset.range.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.gamma_offset ? this.camera.gamma_offset : MODEL_ACTIONS.gamma_offset.range.default
					switch (action.options.val) {
						case 'up':
							newValue =
								currentValue < MODEL_ACTIONS.gamma_offset.range.max
									? ++currentValue
									: MODEL_ACTIONS.gamma_offset.range.max
							break
						case 'down':
							newValue =
								currentValue > MODEL_ACTIONS.gamma_offset.range.min
									? --currentValue
									: MODEL_ACTIONS.gamma_offset.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						GammaOffset: String(newValue),
					}
					this.sendCommand('birddogadvancesetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.high_resolution) {
			actions['high_resolution'] = {
				label: MODEL_ACTIONS.high_resolution.name,
				options: [
					{
						type: 'dropdown',
						label: 'On / Off',
						id: 'val',
						choices: MODEL_ACTIONS.high_resolution.choices,
						default: MODEL_ACTIONS.high_resolution.default,
					},
				],
				callback: (action) => {
					body = {
						HighResolution: String(action.options.val),
					}
					this.sendCommand('birddogadvancesetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.video_enhancement) {
			actions['video_enhancement'] = {
				label: MODEL_ACTIONS.video_enhancement.name,
				options: [
					{
						type: 'dropdown',
						label: 'On / Off',
						id: 'val',
						choices: MODEL_ACTIONS.video_enhancement.choices,
						default: MODEL_ACTIONS.video_enhancement.default,
					},
				],
				callback: (action) => {
					body = {
						VideoEnhancement: String(action.options.val),
					}
					this.sendCommand('birddogadvancesetup', 'POST', body)
				},
			}
		}

		// External Setup Actions

		if (MODEL_ACTIONS?.aux) {
			actions['aux'] = {
				label: MODEL_ACTIONS.aux.name,
				options: [
					{
						type: 'dropdown',
						label: 'On / Off',
						id: 'val',
						choices: MODEL_ACTIONS.aux.choices,
						default: MODEL_ACTIONS.aux.default,
					},
				],
				callback: (action) => {
					body = {
						Aux: String(action.options.val),
					}
					this.sendCommand('birddogexternalsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.rain_wiper) {
			actions['rain_wiper'] = {
				label: MODEL_ACTIONS.rain_wiper.name,
				options: [
					{
						type: 'dropdown',
						label: 'On / Off',
						id: 'val',
						choices: MODEL_ACTIONS.rain_wiper.choices,
						default: MODEL_ACTIONS.rain_wiper.default,
					},
				],
				callback: (action) => {
					body = {
						RainWiper: String(action.options.val),
					}
					this.sendCommand('birddogexternalsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.v12vout) {
			actions['v12vout'] = {
				label: MODEL_ACTIONS.v12vout.name,
				options: [
					{
						type: 'dropdown',
						label: 'On / Off',
						id: 'val',
						choices: MODEL_ACTIONS.v12vout.choices,
						default: MODEL_ACTIONS.v12vout.default,
					},
				],
				callback: (action) => {
					body = {
						V12vOut: String(action.options.val),
					}
					this.sendCommand('birddogexternalsetup', 'POST', body)
				},
			}
		}

		// Detail Setup Actions

		if (MODEL_ACTIONS?.bandwidth) {
			actions['bandwidth'] = {
				label: MODEL_ACTIONS.bandwidth.name,
				options: [
					{
						type: 'dropdown',
						label: 'Mode',
						id: 'val',
						choices: MODEL_ACTIONS.bandwidth.choices,
						default: MODEL_ACTIONS.bandwidth.default,
					},
				],
				callback: (action) => {
					body = {
						Bandwidth: String(action.options.val),
					}
					this.sendCommand('birddogdetsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.bw_balance) {
			actions['bw_balance'] = {
				label: MODEL_ACTIONS.bw_balance.name,
				options: [
					{
						type: 'dropdown',
						label: 'Mode',
						id: 'val',
						choices: MODEL_ACTIONS.bw_balance.choices,
						default: MODEL_ACTIONS.bw_balance.default,
					},
				],
				callback: (action) => {
					body = {
						BwBandwidth: String(action.options.val),
					}
					this.sendCommand('birddogdetsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.crispening) {
			actions['crispening'] = {
				label: MODEL_ACTIONS.crispening.name,
				options: [
					{
						type: 'dropdown',
						label: 'Crispening',
						id: 'val',
						choices: MODEL_ACTIONS.crispening.choices,
						default: MODEL_ACTIONS.crispening.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_ACTIONS.crispening.range.min + ' to ' + MODEL_ACTIONS.crispening.range.max + ')',
						id: 'value',
						min: MODEL_ACTIONS.crispening.range.min,
						max: MODEL_ACTIONS.crispening.range.max,
						default: MODEL_ACTIONS.crispening.range.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.crispening ? this.camera.crispening : MODEL_ACTIONS.crispening.range.default
					switch (action.options.val) {
						case 'up':
							newValue =
								currentValue < MODEL_ACTIONS.crispening.range.max ? ++currentValue : MODEL_ACTIONS.crispening.range.max
							break
						case 'down':
							newValue =
								currentValue > MODEL_ACTIONS.crispening.range.min ? --currentValue : MODEL_ACTIONS.crispening.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						Crispening: String(newValue),
					}
					this.sendCommand('birddogdetsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.detail) {
			actions['detail'] = {
				label: MODEL_ACTIONS.detail.name,
				options: [
					{
						type: 'dropdown',
						label: 'On / Off',
						id: 'val',
						choices: MODEL_ACTIONS.detail.choices,
						default: MODEL_ACTIONS.detail.default,
					},
				],
				callback: (action) => {
					body = {
						Detail: String(action.options.val),
					}
					this.sendCommand('birddogdetsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.highlight_detail) {
			actions['highlight_detail'] = {
				label: MODEL_ACTIONS.highlight_detail.name,
				options: [
					{
						type: 'dropdown',
						label: 'Highlight Detail',
						id: 'val',
						choices: MODEL_ACTIONS.highlight_detail.choices,
						default: MODEL_ACTIONS.highlight_detail.default,
					},
					{
						type: 'number',
						label:
							'Value (' +
							MODEL_ACTIONS.highlight_detail.range.min +
							' to ' +
							MODEL_ACTIONS.highlight_detail.range.max +
							')',
						id: 'value',
						min: MODEL_ACTIONS.highlight_detail.range.min,
						max: MODEL_ACTIONS.highlight_detail.range.max,
						default: MODEL_ACTIONS.highlight_detail.range.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.highlight_detail
						? this.camera.highlight_detail
						: MODEL_ACTIONS.highlight_detail.range.default
					switch (action.options.val) {
						case 'up':
							newValue =
								currentValue < MODEL_ACTIONS.highlight_detail.range.max
									? ++currentValue
									: MODEL_ACTIONS.highlight_detail.range.max
							break
						case 'down':
							newValue =
								currentValue > MODEL_ACTIONS.highlight_detail.range.min
									? --currentValue
									: MODEL_ACTIONS.highlight_detail.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						HighlightDetail: String(newValue),
					}
					this.sendCommand('birddogdetsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.hv_balance) {
			actions['hv_balance'] = {
				label: MODEL_ACTIONS.hv_balance.name,
				options: [
					{
						type: 'dropdown',
						label: 'Hv Balance',
						id: 'val',
						choices: MODEL_ACTIONS.hv_balance.choices,
						default: MODEL_ACTIONS.hv_balance.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_ACTIONS.hv_balance.range.min + ' to ' + MODEL_ACTIONS.hv_balance.range.max + ')',
						id: 'value',
						min: MODEL_ACTIONS.hv_balance.range.min,
						max: MODEL_ACTIONS.hv_balance.range.max,
						default: MODEL_ACTIONS.hv_balance.range.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.hv_balance ? this.camera.hv_balance : MODEL_ACTIONS.hv_balance.range.default
					switch (action.options.val) {
						case 'up':
							newValue =
								currentValue < MODEL_ACTIONS.hv_balance.range.max ? ++currentValue : MODEL_ACTIONS.hv_balance.range.max
							break
						case 'down':
							newValue =
								currentValue > MODEL_ACTIONS.hv_balance.range.min ? --currentValue : MODEL_ACTIONS.hv_balance.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						HvBalance: String(newValue),
					}
					this.sendCommand('birddogdetsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.limit) {
			actions['limit'] = {
				label: MODEL_ACTIONS.limit.name,
				options: [
					{
						type: 'dropdown',
						label: 'Limit',
						id: 'val',
						choices: MODEL_ACTIONS.limit.choices,
						default: MODEL_ACTIONS.limit.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_ACTIONS.limit.range.min + ' to ' + MODEL_ACTIONS.limit.range.max + ')',
						id: 'value',
						min: MODEL_ACTIONS.limit.range.min,
						max: MODEL_ACTIONS.limit.range.max,
						default: MODEL_ACTIONS.limit.range.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.limit ? this.camera.limit : MODEL_ACTIONS.limit.range.default
					switch (action.options.val) {
						case 'up':
							newValue = currentValue < MODEL_ACTIONS.limit.range.max ? ++currentValue : MODEL_ACTIONS.limit.range.max
							break
						case 'down':
							newValue = currentValue > MODEL_ACTIONS.limit.range.min ? --currentValue : MODEL_ACTIONS.limit.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						Limit: String(newValue),
					}
					this.sendCommand('birddogdetsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.super_low) {
			actions['super_low'] = {
				label: MODEL_ACTIONS.super_low.name,
				options: [
					{
						type: 'dropdown',
						label: 'Super Low',
						id: 'val',
						choices: MODEL_ACTIONS.super_low.choices,
						default: MODEL_ACTIONS.super_low.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_ACTIONS.super_low.range.min + ' to ' + MODEL_ACTIONS.super_low.range.max + ')',
						id: 'value',
						min: MODEL_ACTIONS.super_low.range.min,
						max: MODEL_ACTIONS.super_low.range.max,
						default: MODEL_ACTIONS.super_low.range.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.super_low ? this.camera.super_low : MODEL_ACTIONS.super_low.range.default
					switch (action.options.val) {
						case 'up':
							newValue =
								currentValue < MODEL_ACTIONS.super_low.range.max
									? ++sucurrentValueper_low
									: MODEL_ACTIONS.super_low.range.max
							break
						case 'down':
							newValue =
								currentValue > MODEL_ACTIONS.super_low.range.min ? --currentValue : MODEL_ACTIONS.super_low.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						SuperLow: String(newValue),
					}
					this.sendCommand('birddogdetsetup', 'POST', body)
				},
			}
		}

		// Gamma Setup Actions

		if (MODEL_ACTIONS?.black_gamma_level) {
			actions['black_gamma_level'] = {
				label: MODEL_ACTIONS.black_gamma_level.name,
				options: [
					{
						type: 'dropdown',
						label: 'Black Gamma Level',
						id: 'val',
						choices: MODEL_ACTIONS.black_gamma_level.choices,
						default: MODEL_ACTIONS.black_gamma_level.default,
					},
					{
						type: 'number',
						label:
							'Value (' +
							MODEL_ACTIONS.black_gamma_level.range.min +
							' to ' +
							MODEL_ACTIONS.black_gamma_level.range.max +
							')',
						id: 'value',
						min: MODEL_ACTIONS.black_gamma_level.range.min,
						max: MODEL_ACTIONS.black_gamma_level.range.max,
						default: MODEL_ACTIONS.black_gamma_level.range.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.black_gamma_level
						? this.camera.black_gamma_level
						: MODEL_ACTIONS.black_gamma_level.range.default
					switch (action.options.val) {
						case 'up':
							newValue =
								currentValue < MODEL_ACTIONS.black_gamma_level.range.max
									? ++currentValue
									: MODEL_ACTIONS.black_gamma_level.range.max
							break
						case 'down':
							newValue =
								currentValue > MODEL_ACTIONS.black_gamma_level.range.max
									? --currentValue
									: MODEL_ACTIONS.black_gamma_level.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						BlackGammaLevel: String(newValue),
					}
					this.sendCommand('birddoggammasetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.black_level) {
			actions['black_level'] = {
				label: MODEL_ACTIONS.black_level.name,
				options: [
					{
						type: 'dropdown',
						label: 'Black Level',
						id: 'val',
						choices: MODEL_ACTIONS.black_level.choices,
						default: MODEL_ACTIONS.black_level.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_ACTIONS.black_level.range.min + ' to ' + MODEL_ACTIONS.black_level.range.max + ')',
						id: 'value',
						min: MODEL_ACTIONS.black_level.range.min,
						max: MODEL_ACTIONS.black_level.range.max,
						default: MODEL_ACTIONS.black_level.range.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.black_level ? this.camera.black_level : MODEL_ACTIONS.black_level.range.default
					switch (action.options.val) {
						case 'up':
							newValue =
								currentValue < MODEL_ACTIONS.black_level.range.max
									? ++currentValue
									: MODEL_ACTIONS.black_level.range.max
							break
						case 'down':
							newValue =
								currentValue > MODEL_ACTIONS.black_level.range.max
									? --currentValue
									: MODEL_ACTIONS.black_level.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						BlackLevel: String(newValue),
					}
					this.sendCommand('birddoggammasetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.black_level_range) {
			actions['black_level_range'] = {
				label: MODEL_ACTIONS.black_level_range.name,
				options: [
					{
						type: 'dropdown',
						label: 'Black Level Range',
						id: 'val',
						choices: MODEL_ACTIONS.black_level_range.choices,
						default: MODEL_ACTIONS.black_level_range.default,
					},
				],
				callback: (action) => {
					body = {
						BlackLevelRange: String(action.options.val),
					}
					this.sendCommand('birddoggammasetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.effect) {
			actions['effect'] = {
				label: MODEL_ACTIONS.effect.name,
				options: [
					{
						type: 'dropdown',
						label: 'Effect',
						id: 'val',
						choices: MODEL_ACTIONS.effect.choices,
						default: MODEL_ACTIONS.effect.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_ACTIONS.effect.range.min + ' to ' + MODEL_ACTIONS.effect.range.max + ')',
						id: 'value',
						min: MODEL_ACTIONS.effect.range.min,
						max: MODEL_ACTIONS.effect.range.max,
						default: MODEL_ACTIONS.effect.range.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.effect ? this.camera.effect : MODEL_ACTIONS.effect.range.default
					switch (action.options.val) {
						case 'up':
							newValue = currentValue < MODEL_ACTIONS.effect.range.max ? ++currentValue : MODEL_ACTIONS.effect.range.max
							break
						case 'down':
							newValue = currentValue > MODEL_ACTIONS.effect.range.max ? --currentValue : MODEL_ACTIONS.effect.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						Effect: String(newValue),
					}
					this.sendCommand('birddoggammasetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.level) {
			actions['level'] = {
				label: MODEL_ACTIONS.level.name,
				options: [
					{
						type: 'dropdown',
						label: 'Level',
						id: 'val',
						choices: MODEL_ACTIONS.level.choices,
						default: MODEL_ACTIONS.level.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_ACTIONS.level.range.min + ' to ' + MODEL_ACTIONS.level.range.max + ')',
						id: 'value',
						min: MODEL_ACTIONS.level.range.min,
						max: MODEL_ACTIONS.level.range.max,
						default: MODEL_ACTIONS.level.range.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.level ? this.camera.level : MODEL_ACTIONS.level.range.default
					switch (action.options.val) {
						case 'up':
							newValue = currentValue < MODEL_ACTIONS.level.range.max ? ++currentValue : MODEL_ACTIONS.level.range.max
							break
						case 'down':
							newValue = currentValue > MODEL_ACTIONS.level.range.max ? --currentValue : MODEL_ACTIONS.level.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						Level: String(newValue),
					}
					this.sendCommand('birddoggammasetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.offset) {
			actions['offset'] = {
				label: MODEL_ACTIONS.offset.name,
				options: [
					{
						type: 'dropdown',
						label: 'Offset',
						id: 'val',
						choices: MODEL_ACTIONS.offset.choices,
						default: MODEL_ACTIONS.offset.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_ACTIONS.offset.range.min + ' to ' + MODEL_ACTIONS.offset.range.max + ')',
						id: 'value',
						min: MODEL_ACTIONS.offset.range.min,
						max: MODEL_ACTIONS.offset.range.max,
						default: MODEL_ACTIONS.offset.range.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.offset ? this.camera.offset : MODEL_ACTIONS.offset.range.default
					switch (action.options.val) {
						case 'up':
							newValue = currentValue < MODEL_ACTIONS.offset.range.max ? ++currentValue : MODEL_ACTIONS.offset.range.max
							break
						case 'down':
							newValue = currentValue > MODEL_ACTIONS.offset.range.max ? --currentValue : MODEL_ACTIONS.offset.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						Offset: String(newValue),
					}
					this.sendCommand('birddoggammasetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.pattern) {
			actions['pattern'] = {
				label: MODEL_ACTIONS.pattern.name,
				options: [
					{
						type: 'dropdown',
						label: 'Pattern',
						id: 'val',
						choices: MODEL_ACTIONS.pattern.choices,
						default: MODEL_ACTIONS.pattern.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_ACTIONS.pattern.range.min + ' to ' + MODEL_ACTIONS.pattern.range.max + ')',
						id: 'value',
						min: MODEL_ACTIONS.pattern.range.min,
						max: MODEL_ACTIONS.pattern.range.max,
						default: MODEL_ACTIONS.pattern.range.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.pattern ? this.camera.pattern : MODEL_ACTIONS.pattern.range.default
					switch (action.options.val) {
						case 'up':
							newValue =
								currentValue < MODEL_ACTIONS.pattern.range.max ? ++currentValue : MODEL_ACTIONS.pattern.range.max
							break
						case 'down':
							newValue =
								currentValue > MODEL_ACTIONS.pattern.range.max ? --currentValue : MODEL_ACTIONS.pattern.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						Pattern: String(newValue),
					}
					this.sendCommand('birddoggammasetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.pattern_fine) {
			actions['pattern_fine'] = {
				label: MODEL_ACTIONS.pattern_fine.name,
				options: [
					{
						type: 'dropdown',
						label: 'Pattern Fine',
						id: 'val',
						choices: MODEL_ACTIONS.pattern_fine.choices,
						default: MODEL_ACTIONS.pattern_fine.default,
					},
					{
						type: 'number',
						label:
							'Value (' + MODEL_ACTIONS.pattern_fine.range.min + ' to ' + MODEL_ACTIONS.pattern_fine.range.max + ')',
						id: 'value',
						min: MODEL_ACTIONS.pattern_fine.range.min,
						max: MODEL_ACTIONS.pattern_fine.range.max,
						default: MODEL_ACTIONS.pattern_fine.range.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.pattern_fine ? this.camera.pattern_fine : MODEL_ACTIONS.pattern_fine.range.default
					switch (action.options.val) {
						case 'up':
							newValue =
								currentValue < MODEL_ACTIONS.pattern_fine.range.max
									? ++currentValue
									: MODEL_ACTIONS.pattern_fine.range.max
							break
						case 'down':
							newValue =
								currentValue > MODEL_ACTIONS.pattern_fine.range.max
									? --currentValue
									: MODEL_ACTIONS.pattern_fine.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						PatternFine: String(newValue),
					}
					this.sendCommand('birddoggammasetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.settings) {
			actions['settings'] = {
				label: MODEL_ACTIONS.settings.name,
				options: [
					{
						type: 'dropdown',
						label: 'Settings',
						id: 'val',
						choices: MODEL_ACTIONS.settings.choices,
						default: MODEL_ACTIONS.settings.default,
					},
				],
				callback: (action) => {
					body = {
						Settings: String(action.options.val),
					}
					this.sendCommand('birddoggammasetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.visibility_enhancer) {
			actions['visibility_enhancer'] = {
				label: MODEL_ACTIONS.visibility_enhancer.name,
				options: [
					{
						type: 'dropdown',
						label: 'Settings',
						id: 'val',
						choices: MODEL_ACTIONS.visibility_enhancer.choices,
						default: MODEL_ACTIONS.visibility_enhancer.default,
					},
				],
				callback: (action) => {
					body = {
						VisibilityEnhancer: String(action.options.val),
					}
					this.sendCommand('birddoggammasetup', 'POST', body)
				},
			}
		}

		// BirdDog Scope Actions

		if (MODEL_ACTIONS?.scope_gamma_gain) {
			actions['scope_gamma_gain'] = {
				label: MODEL_ACTIONS.scope_gamma_gain.name,
				options: [
					{
						type: 'dropdown',
						label: 'Gamma Gain',
						id: 'val',
						choices: MODEL_ACTIONS.scope_gamma_gain.choices,
						default: MODEL_ACTIONS.scope_gamma_gain.default,
					},
					{
						type: 'number',
						label:
							'Value (' +
							MODEL_ACTIONS.scope_gamma_gain.range.min +
							' to ' +
							MODEL_ACTIONS.scope_gamma_gain.range.max +
							')',
						id: 'value',
						min: MODEL_ACTIONS.scope_gamma_gain.range.min,
						max: MODEL_ACTIONS.scope_gamma_gain.range.max,
						default: MODEL_ACTIONS.scope_gamma_gain.range.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
				callback: (action) => {
					currentValue = this.camera?.scope_gamma_gain
						? this.camera.scope_gamma_gain
						: MODEL_ACTIONS.scope_gamma_gain.range.default
					switch (action.options.val) {
						case 'up':
							newValue =
								currentValue < MODEL_ACTIONS.scope_gamma_gain.range.max
									? ++currentValue
									: MODEL_ACTIONS.scope_gamma_gain.range.max
							break
						case 'down':
							newValue =
								currentValue > MODEL_ACTIONS.scope_gamma_gain.range.max
									? --currentValue
									: MODEL_ACTIONS.scope_gamma_gain.range.min
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						GammaGain: String(newValue),
					}
					this.sendCommand('birddogscope', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.scope_mode) {
			actions['scope_mode'] = {
				label: MODEL_ACTIONS.scope_mode.name,
				options: [
					{
						type: 'dropdown',
						label: 'Mode',
						id: 'val',
						choices: MODEL_ACTIONS.scope_mode.choices,
						default: MODEL_ACTIONS.scope_mode.default,
					},
				],
				callback: (action) => {
					body = {
						Mode: String(action.options.val),
					}
					this.sendCommand('birddogscope', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.scope_position) {
			actions['scope_position'] = {
				label: MODEL_ACTIONS.scope_position.name,
				options: [
					{
						type: 'dropdown',
						label: 'Position',
						id: 'val',
						choices: MODEL_ACTIONS.scope_position.choices,
						default: MODEL_ACTIONS.scope_position.default,
					},
				],
				callback: (action) => {
					body = {
						Position: String(action.options.val),
					}
					this.sendCommand('birddogscope', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.scope_preview) {
			actions['scope_preview'] = {
				label: MODEL_ACTIONS.scope_preview.name,
				options: [
					{
						type: 'dropdown',
						label: 'On/Off',
						id: 'val',
						choices: MODEL_ACTIONS.scope_preview.choices,
						default: MODEL_ACTIONS.scope_preview.default,
					},
				],
				callback: (action) => {
					body = {
						PreviewEnable: String(action.options.val),
					}
					this.sendCommand('birddogscope', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.scope_program) {
			actions['scope_program'] = {
				label: MODEL_ACTIONS.scope_program.name,
				options: [
					{
						type: 'dropdown',
						label: 'On/Off',
						id: 'val',
						choices: MODEL_ACTIONS.scope_program.choices,
						default: MODEL_ACTIONS.scope_program.default,
					},
				],
				callback: (action) => {
					body = {
						ProgramEnable: String(action.options.val),
					}
					this.sendCommand('birddogscope', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.scope_size) {
			actions['scope_size'] = {
				label: MODEL_ACTIONS.scope_size.name,
				options: [
					{
						type: 'dropdown',
						label: 'Small/Large',
						id: 'val',
						choices: MODEL_ACTIONS.scope_size.choices,
						default: MODEL_ACTIONS.scope_size.default,
					},
				],
				callback: (action) => {
					body = {
						DoubleSizeEnable: String(action.options.val),
					}
					this.sendCommand('birddogscope', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.scope_transparency) {
			actions['scope_transparency'] = {
				label: MODEL_ACTIONS.scope_transparency.name,
				options: [
					{
						type: 'dropdown',
						label: 'On/Off',
						id: 'val',
						choices: MODEL_ACTIONS.scope_transparency.choices,
						default: MODEL_ACTIONS.scope_transparency.default,
					},
				],
				callback: (action) => {
					body = {
						TransparencyEnable: String(action.options.val),
					}
					this.sendCommand('birddogscope', 'POST', body)
				},
			}
		}

		// Other Actions

		actions['custom'] = {
			label: MODEL_ACTIONS.custom.name,
			options: [
				{
					type: 'textinput',
					label: 'Custom command, must start with 8',
					id: 'custom',
					regex: '/^8[0-9a-fA-F]\\s*([0-9a-fA-F]\\s*)+$/',
					width: 6,
				},
			],
			callback: (action) => {
				let hexData = action.options.custom.replace(/\s+/g, '')
				let tempBuffer = Buffer.from(hexData, 'hex')
				cmd = tempBuffer.toString('binary')
				if ((tempBuffer[0] & 0xf0) === 0x80) {
					this.sendVISCACommand(cmd)
				} else {
					this.log('error', 'Error, command "' + action.options.custom + '" does not start with 8')
				}
			},
		}

		if (MODEL_ACTIONS?.defog) {
			actions['defog'] = {
				label: 'VISCA - Defog',
				options: [
					{
						type: 'dropdown',
						label: 'On / Off',
						id: 'val',
						choices: [
							{ id: '0', label: 'Off' },
							{ id: '1', label: 'low' },
							{ id: '2', label: 'mid' },
							{ id: '3', label: 'high' },
						],
						default: '0',
					},
				],
				callback: (action) => {
					switch (action.options.val) {
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
				},
			}
		}
		if (MODEL_ACTIONS?.hrMode) {
			actions['hrMode'] = {
				label: 'VISCA - High Resolution Mode',
				options: [
					{
						type: 'dropdown',
						label: 'On / Off',
						id: 'val',
						choices: CHOICES.ON_OFF,
						default: 'On',
					},
				],
				callback: (action) => {
					switch (action.options.val) {
						case 'On':
							cmd = VISCA.MSG_CAM + '\x52\x02\xFF'
							break
						case 'Off':
							cmd = VISCA.MSG_CAM + '\x52\x03\xFF'
							break
					}
					this.sendVISCACommand(cmd)
				},
			}
		}
		return Object.fromEntries(Object.entries(actions).sort(sortByAction))
	},
}
