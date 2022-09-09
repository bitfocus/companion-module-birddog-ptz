const { sortByAction, getModelActions } = require('./utils')
var { MODEL_SPECS } = require('./models.js')
const VISCA = require('./constants')
const CHOICES = require('./choices.js')

module.exports = {
	getActions() {
		let cmd = ''
		let newValue
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
				label: 'VISCA - Standby On/Off',
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
				label: 'VISCA - Freeze',
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
				label: 'Analog Audio - Analog Audio In Gain',
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
					let audio_in = this.camera?.analogAudioInGain ? this.camera.analogAudioInGain : MODEL_ACTIONS.analogAudioInGain.range.default
					switch (action.options.val) {
						case 'up':
							newValue = audio_in < MODEL_ACTIONS.analogAudioInGain.range.max ? ++audio_in : audio_in
							break
						case 'down':
							newValue = audio_in > MODEL_ACTIONS.analogAudioInGain.range.min ? --audio_in : audio_in
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
				label: 'Analog Audio - Analog Audio Out Gain',
				options: [
					{
						type: 'dropdown',
						label: 'Action',
						id: 'val',
						choices: MODEL_ACTIONS.analogAudioOutGain.choices,
						default: MODEL_ACTIONS.analogAudioOutGain.default,
					},{
						type: 'number',
						label:
							'Analog Audio Out Gain (dB) (' +
							MODEL_ACTIONS.analogAudioOutGain.range.min +
							' to ' +
							MODEL_ACTIONS.analogAudioOutGain.range.max +
							')',
						id: 'val',
						default: MODEL_ACTIONS.analogAudioOutGain.range.default,
						min: MODEL_ACTIONS.analogAudioOutGain.range.min,
						max: MODEL_ACTIONS.analogAudioOutGain.range.max,
						range: true,
						isVisible: (action) => action.options.val === 'value',
					},
				],
				callback: (action) => {
					let audio_out = this.camera?.analogAudioOutGain ? this.camera.analogAudioOutGain : MODEL_ACTIONS.analogAudioOutGain.range.default
					switch (action.options.val) {
						case 'up':
							newValue = audio_out < MODEL_ACTIONS.analogAudioOutGain.range.max ? ++audio_out : audio_out
							break
						case 'down':
							newValue = audio_out > MODEL_ACTIONS.analogAudioOutGain.range.min ? --audio_out : audio_out
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
				label: 'Analog Audio - Analog Audio Output Select',
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
				label: 'Video Output - Video Mode',
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
				label: 'Encode Setup - Encode Bandwidth',
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
				label: 'Encode Setup - NDI Audio',
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
				label: 'Encode Setup - NDI Group Enable',
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
				label: 'Encode Setup - ScreenSaver Mode',
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
				label: 'Encode Setup - Stream to Network',
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
				label: 'Encode Setup - Tally Mode',
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
				label: 'Encode Transport - Transmit Method',
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
				label: 'Encode - Capture Screensaver',
				callback: (action) => {
					this.sendCommand('capture?ChNum=1&status=Encode', 'GET')
				},
			}
		}

		// NDI Discovery Actions

		if (MODEL_ACTIONS?.ndi_discovery_server) {
			actions['ndi_discovery_server'] = {
				label: 'NDI Discovery - Server',
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
				label: 'PTZ - Pan/Tilt',
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
				label: 'PTZ - Pan Speed',
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
					this.debug('--- In panSpeed action')
					let panSpeed = this.camera?.panSpeed ? this.camera.panSpeed : MODEL_ACTIONS.panSpeed.range.default
					this.debug('--- panSpeed is ', panSpeed)
					switch (action.options.type) {
						case 'up':
							newValue = panSpeed < MODEL_ACTIONS.panSpeed.range.max ? ++panSpeed : MODEL_ACTIONS.panSpeed.range.max
							break
						case 'down':
							newValue = panSpeed > MODEL_ACTIONS.panSpeed.range.min ? --panSpeed : MODEL_ACTIONS.panSpeed.range.min
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
				label: 'PTZ - Preset Mode',
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
				label: 'PTZ - Preset Speed',
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
					let preset_speed = this.camera?.preset_speed ? this.camera.preset_speed : MODEL_ACTIONS.preset_speed.default
					switch (action.options.type) {
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
				label: 'PTZ - Recall Preset',
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
				label: 'PTZ - Save Preset',
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
				label: 'PTZ - Tilt Speed',
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
					let tiltSpeed = this.camera?.tiltSpeed ? this.camera.tiltSpeed : MODEL_ACTIONS.tiltSpeed.range.default
					switch (action.options.type) {
						case 'up':
							newValue = tiltSpeed < MODEL_ACTIONS.tiltSpeed.range.max ? ++tiltSpeed : MODEL_ACTIONS.tiltSpeed.range.max
							break
						case 'down':
							newValue = tiltSpeed > MODEL_ACTIONS.tiltSpeed.range.min ? --tiltSpeed : MODEL_ACTIONS.tiltSpeed.range.min
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
				label: 'PTZ - Zoom',
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
				label: 'PTZ - Zoom Speed',
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
					let zoomSpeed = this.camera?.zoomSpeed ? this.camera.zoomSpeed : MODEL_ACTIONS.zoomSpeed.range.default
					switch (action.options.type) {
						case 'up':
							newValue = zoomSpeed < MODEL_ACTIONS.zoomSpeed.range.max ? ++zoomSpeed : MODEL_ACTIONS.zoomSpeed.range.max
							break
						case 'down':
							newValue = zoomSpeed > MODEL_ACTIONS.zoomSpeed.range.min ? --zoomSpeed : MODEL_ACTIONS.zoomSpeed.range.min
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
				label: 'Focus - Focus Action',
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
				label: 'Focus - Focus Mode',
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
				label: 'Exposure - Ae Repsonse',
				options: [
					{
						type: 'number',
						label:
							'Ae Response (' +
							MODEL_ACTIONS.ae_response.range.min +
							' to ' +
							MODEL_ACTIONS.ae_response.range.max +
							')',
						id: 'level',
						default: MODEL_ACTIONS.ae_response.range.default,
						min: MODEL_ACTIONS.ae_response.range.min,
						max: MODEL_ACTIONS.ae_response.range.max,
					},
				],
				callback: (action) => {
					body = {
						AeResponse: String(action.options.level),
					}
					this.sendCommand('birddogexpsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.backlight) {
			actions['backlight'] = {
				label: 'Exposure - Backlight',
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
				label: 'Exposure - Bright Level',
				options: [
					{
						type: 'number',
						label:
							'Level (' + MODEL_ACTIONS.bright_level.range.min + ' to ' + MODEL_ACTIONS.bright_level.range.max + ')',
						id: 'level',
						default: MODEL_ACTIONS.bright_level.range.default,
						min: MODEL_ACTIONS.bright_level.range.min,
						max: MODEL_ACTIONS.bright_level.range.max,
					},
				],
				callback: (action) => {
					body = {
						BrightLevel: String(action.options.level),
					}
					this.sendCommand('birddogexpsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.expComp) {
			actions['expComp'] = {
				label: 'Exposure - Exposure Compensation',
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
				label: 'Exposure - Exposure Mode',
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
				label: 'Exposure - Gain',
				options: [
					{
						type: 'dropdown',
						label: 'Gain',
						id: 'val',
						choices: CHOICES.UP_DOWN_VALUE,
						default: 'up',
					},
					{
						type: 'dropdown',
						label: 'Value',
						id: 'value',
						choices: MODEL_ACTIONS.gain.choices,
						default: MODEL_ACTIONS.gain.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
				callback: (action) => {
					let gain = this.camera?.gain ? this.camera.gain : MODEL_ACTIONS.gain.default
					let gainLimit = this.camera?.gain_limit
						? this.camera.gain_limit
						: MODEL_ACTIONS.gain.choices[MODEL_ACTIONS.gain.choices.length - 1].id // If no GainLimit then use max Gain
					switch (action.options.val) {
						case 'up':
							newValue = gain < gainLimit ? ++gain : gain
							break
						case 'down':
							newValue = gain > MODEL_ACTIONS.gain.choices[0]?.id ? --gain : gain
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
				label: 'Exposure - Gain Limit',
				options: [
					{
						type: 'dropdown',
						label: 'Gain Limit',
						id: 'val',
						choices: CHOICES.UP_DOWN_VALUE,
						default: 'up',
					},
					{
						type: 'dropdown',
						label: 'Value',
						id: 'value',
						choices: MODEL_ACTIONS.gain.choices.slice(
							MODEL_ACTIONS.gain_limit.range.min - 1,
							MODEL_ACTIONS.gain_limit.range.max + 1
						),
						default: MODEL_ACTIONS.gain_limit.range.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
				callback: (action) => {
					let gainLimit = this.camera?.gain_limit ? this.camera.gain_limit : MODEL_ACTIONS.gain_limit.range.default
					switch (action.options.val) {
						case 'up':
							newValue = gainLimit < MODEL_ACTIONS.gain_limit.range.max ? ++gainLimit : gainLimit
							break
						case 'down':
							newValue = gainLimit > MODEL_ACTIONS.gain_limit.range.min ? --gainLimit : gainLimit
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
				label: 'Exposure - Gain Point',
				options: [
					{
						type: 'dropdown',
						label: 'Gain Point',
						id: 'val',
						choices: CHOICES.ON_OFF,
						default: 'On',
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
				label: 'Exposure - Gain Point Position',
				options: [
					{
						type: 'dropdown',
						label: 'Gain Point',
						id: 'val',
						choices: CHOICES.UP_DOWN_VALUE,
						default: 'up',
					},
					{
						type: 'dropdown',
						label: 'Value',
						id: 'value',
						choices: MODEL_ACTIONS.gain.choices.slice(
							0,
							parseInt(
								this.camera.expsetup?.GainLimit ? this.camera.expsetup?.GainLimit : MODEL_ACTIONS.gain.default,
								10
							) + 1
						),
						default: MODEL_ACTIONS.gain.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
				callback: (action) => {
					let gainPointPosition = this.camera?.gain_point_position
						? this.camera.gain_point_position
						: MODEL_ACTIONS.gain.default
					switch (action.options.val) {
						case 'up':
							newValue =
								gainPointPosition < this.camera.expsetup.GainLimit
									? ++gainPointPosition
									: this.camera.expsetup.GainLimit
							break
						case 'down':
							newValue = gainPointPosition > MODEL_ACTIONS.gain[0] ? --gainPointPosition : gainPointPosition
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
				label: 'Exposure - High Sensitivity Mode',
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
				label: 'Exposure - Iris',
				options: [
					{
						type: 'dropdown',
						label: 'Iris',
						id: 'val',
						choices: CHOICES.UP_DOWN_VALUE,
						default: 'up',
					},
					{
						type: 'dropdown',
						label: 'Value',
						id: 'value',
						choices: MODEL_ACTIONS.iris.choices,
						default: MODEL_ACTIONS.iris.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
				callback: (action) => {
					let iris = this.camera?.iris ? this.camera.iris : MODEL_ACTIONS.iris.default
					switch (action.options.val) {
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
				label: 'Exposure - Shutter Control Overwrite',
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
				label: 'Exposure - Shutter Max Speed',
				options: [
					{
						type: 'dropdown',
						label: 'Shutter Max Speed',
						id: 'val',
						choices: CHOICES.UP_DOWN_VALUE,
						default: 'up',
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
					let shutter_max_speed = this.camera?.shutter_max_speed
						? this.camera.shutter_max_speed
						: MODEL_ACTIONS.shutter_max_speed.range.default
					switch (action.options.val) {
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
				label: 'Exposure - Shutter Min Speed',
				options: [
					{
						type: 'dropdown',
						label: 'Shutter Min Speed',
						id: 'val',
						choices: CHOICES.UP_DOWN_VALUE,
						default: 'up',
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
					let shutter_min_speed = this.camera?.shutter_min_speed
						? this.camera.shutter_min_speed
						: MODEL_ACTIONS.shutter_min_speed.range.default
					switch (action.options.val) {
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
				label: 'Exposure - Shutter Speed',
				options: [
					{
						type: 'dropdown',
						label: 'Shutter',
						id: 'val',
						choices: CHOICES.UP_DOWN_VALUE,
						default: 'up',
					},
					{
						type: 'dropdown',
						label: 'Value',
						id: 'value',
						choices: MODEL_ACTIONS.shutter_speed?.['shutter_' + [this.camera.shutter_table]],
						default: MODEL_ACTIONS.shutter_speed.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
				callback: (action) => {
					let shutter_speed = this.camera?.shutter_speed
						? this.camera.shutter_speed
						: MODEL_ACTIONS.shutter_speed.default
					switch (action.options.val) {
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
				label: 'Exposure - Shutter Speed Overwrite',
				options: [
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
					},
				],
				callback: (action) => {
					body = {
						ShutterSpeedOverwrite: String(action.options.value),
					}
					this.sendCommand('birddogexpsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.slow_shutter_en) {
			actions['slow_shutter_en'] = {
				label: 'Exposure - Slow Shutter Enable',
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
				label: 'Exposure - Slow Shutter Limit',
				options: [
					{
						type: 'dropdown',
						label: 'Slow Shutter Limit',
						id: 'val',
						choices: CHOICES.UP_DOWN_VALUE,
						default: 'up',
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
					let slow_shutter_limit = this.camera?.slow_shutter_limit
						? this.camera.slow_shutter_limit
						: MODEL_ACTIONS.slow_shutter_limit.range.default
					switch (action.options.val) {
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
				label: 'Exposure - Spotlight',
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
				label: 'White Balance - BG',
				options: [
					{
						type: 'number',
						label: 'Value (' + MODEL_ACTIONS.bg.range.min + ' to ' + MODEL_ACTIONS.bg.range.max + ')',
						id: 'value',
						default: MODEL_ACTIONS.bg.range.default,
						min: MODEL_ACTIONS.bg.range.min,
						max: MODEL_ACTIONS.bg.range.max,
					},
				],
				callback: (action) => {
					body = {
						BG: String(action.options.val),
					}
					this.sendCommand('birddogwbsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.br) {
			actions['br'] = {
				label: 'White Balance - BR',
				options: [
					{
						type: 'number',
						label: 'Value (' + MODEL_ACTIONS.br.range.min + ' to ' + MODEL_ACTIONS.br.range.max + ')',
						id: 'value',
						default: MODEL_ACTIONS.br.range.default,
						min: MODEL_ACTIONS.br.range.min,
						max: MODEL_ACTIONS.br.range.max,
					},
				],
				callback: (action) => {
					body = {
						BR: String(action.options.val),
					}
					this.sendCommand('birddogwbsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.blue_gain) {
			actions['blue_gain'] = {
				label: 'White Balance - Blue Gain',
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
					let blue_gain = this.camera?.blue_gain ? this.camera.blue_gain : MODEL_ACTIONS.blue_gain.range.default
					switch (action.options.val) {
						case 'up':
							newValue = blue_gain < MODEL_ACTIONS.blue_gain.range.max ? ++blue_gain : blue_gain
							break
						case 'down':
							newValue = blue_gain > MODEL_ACTIONS.blue_gain.range.min ? --blue_gain : blue_gain
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
				label: 'White Balance - Color Temperature',
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
					let color_temp = this.camera?.color_temp
						? this.camera.color_temp.slice(0, 2)
						: MODEL_ACTIONS.color_temp.range.default
					switch (action.options.val) {
						case 'up':
							newValue = color_temp < MODEL_ACTIONS.color_temp.range.max ? ++color_temp : color_temp
							newValue = newValue + '00'
							break
						case 'down':
							newValue = color_temp > MODEL_ACTIONS.color_temp.range.min ? --color_temp : color_temp
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
				label: 'White Balance - GB',
				options: [
					{
						type: 'number',
						label: 'Value (' + MODEL_ACTIONS.gb.range.min + ' to ' + MODEL_ACTIONS.gb.range.max + ')',
						id: 'value',
						default: MODEL_ACTIONS.gb.range.default,
						min: MODEL_ACTIONS.gb.range.min,
						max: MODEL_ACTIONS.gr.range.max,
					},
				],
				callback: (action) => {
					body = {
						GB: String(action.options.val),
					}
					this.sendCommand('birddogwbsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.gr) {
			actions['gr'] = {
				label: 'White Balance - GR',
				options: [
					{
						type: 'number',
						label: 'Value (' + MODEL_ACTIONS.gr.range.min + ' to ' + MODEL_ACTIONS.gr.range.max + ')',
						id: 'value',
						default: MODEL_ACTIONS.gr.range.default,
						min: MODEL_ACTIONS.gr.range.min,
						max: MODEL_ACTIONS.gr.range.max,
					},
				],
				callback: (action) => {
					body = {
						GR: String(action.options.val),
					}
					this.sendCommand('birddogwbsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.level) {
			actions['level'] = {
				label: 'White Balance - Level',
				options: [
					{
						type: 'number',
						label: 'Level (' + MODEL_ACTIONS.level.range.min + ' to ' + MODEL_ACTIONS.level.range.max + ')',
						id: 'value',
						default: MODEL_ACTIONS.level.range.default,
						min: MODEL_ACTIONS.level.range.min,
						max: MODEL_ACTIONS.level.range.max,
					},
				],
				callback: (action) => {
					body = {
						Level: String(action.options.val),
					}
					this.sendCommand('birddogwbsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.matrix) {
			actions['matrix'] = {
				label: 'White Balance - Matrix',
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
				label: 'White Balance - Offset',
				options: [
					{
						type: 'number',
						label: 'Value (' + MODEL_ACTIONS.offset.range.min + ' to ' + MODEL_ACTIONS.offset.range.max + ')',
						id: 'value',
						default: MODEL_ACTIONS.offset.range.default,
						min: MODEL_ACTIONS.offset.range.min,
						max: MODEL_ACTIONS.offset.range.max,
					},
				],
				callback: (action) => {
					body = {
						Offset: String(action.options.val),
					}
					this.sendCommand('birddogwbsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.phase) {
			actions['phase'] = {
				label: 'White Balance - Phase',
				options: [
					{
						type: 'number',
						label: 'Value (' + MODEL_ACTIONS.phase.range.min + ' to ' + MODEL_ACTIONS.phase.range.max + ')',
						id: 'value',
						default: MODEL_ACTIONS.phase.range.default,
						min: MODEL_ACTIONS.phase.range.min,
						max: MODEL_ACTIONS.phase.range.max,
					},
				],
				callback: (action) => {
					body = {
						Phase: String(action.options.val),
					}
					this.sendCommand('birddogwbsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.rb) {
			actions['rb'] = {
				label: 'White Balance - RB',
				options: [
					{
						type: 'number',
						label: 'Value (' + MODEL_ACTIONS.rb.range.min + ' to ' + MODEL_ACTIONS.rb.range.max + ')',
						id: 'value',
						default: MODEL_ACTIONS.rb.range.default,
						min: MODEL_ACTIONS.rb.range.min,
						max: MODEL_ACTIONS.rb.range.max,
					},
				],
				callback: (action) => {
					body = {
						RB: String(action.options.val),
					}
					this.sendCommand('birddogwbsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.rg) {
			actions['rg'] = {
				label: 'White Balance - RG',
				options: [
					{
						type: 'number',
						label: 'Value (' + MODEL_ACTIONS.rg.range.min + ' to ' + MODEL_ACTIONS.rg.range.max + ')',
						id: 'value',
						default: MODEL_ACTIONS.rg.range.default,
						min: MODEL_ACTIONS.rg.range.min,
						max: MODEL_ACTIONS.rg.range.max,
					},
				],
				callback: (action) => {
					body = {
						RG: String(action.options.val),
					}
					this.sendCommand('birddogwbsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.red_gain) {
			actions['red_gain'] = {
				label: 'White Balance - Red Gain',
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
					let red_gain = this.camera?.red_gain ? this.camera.red_gain : MODEL_ACTIONS.red_gain.range.default
					switch (action.options.val) {
						case 'up':
							newValue = red_gain < MODEL_ACTIONS.red_gain.range.max ? ++red_gain : red_gain
							break
						case 'down':
							newValue = red_gain > MODEL_ACTIONS.red_gain.range.min ? --red_gain : red_gain
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
				label: 'White Balance - Select',
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
				label: 'White Balance - Speed',
				options: [
					{
						type: 'number',
						label: 'Value (' + MODEL_ACTIONS.speed.range.min + ' to ' + MODEL_ACTIONS.speed.range.max + ')',
						id: 'value',
						default: MODEL_ACTIONS.speed.range.default,
						min: MODEL_ACTIONS.speed.range.min,
						max: MODEL_ACTIONS.speed.range.max,
					},
				],
				callback: (action) => {
					body = {
						Speed: String(action.options.val),
					}
					this.sendCommand('birddogwbsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.wb_mode) {
			actions['wb_mode'] = {
				label: 'White Balance - White Balance Mode',
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
				label: 'White Balance - One Push Trigger',
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
				label: 'Picture Setup - Backlight Compensation',
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
				label: 'Picture Setup - Chroma Suppress',
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
				label: 'Picture Setup - Saturation',
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
					let saturation = this.camera?.saturation ? this.camera.saturation : MODEL_ACTIONS.saturation.range.default
					switch (action.options.val) {
						case 'up':
							newValue = saturation < MODEL_ACTIONS.saturation.range.max ? ++saturation : saturation
							break
						case 'down':
							newValue = saturation > MODEL_ACTIONS.saturation.range.min ? --saturation : saturation
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
				label: 'Picture Setup - Contrast',
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
					let contrast = this.camera?.contrast ? this.camera.contrast : MODEL_ACTIONS.contrast.range.default
					switch (action.options.val) {
						case 'up':
							newValue = contrast < MODEL_ACTIONS.contrast.range.max ? ++contrast : contrast
							break
						case 'down':
							newValue = contrast > MODEL_ACTIONS.contrast.range.min ? --contrast : contrast
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
				label: 'Picture Setup - Effect',
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
				label: 'Picture Setup - Flip',
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
				label: 'Picture Setup - Gamma',
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
					let gamma = this.camera?.gamma ? this.camera.gamma : MODEL_ACTIONS.gamma.range.default
					switch (action.options.val) {
						case 'up':
							newValue = gamma < MODEL_ACTIONS.gamma.range.max ? ++gamma : gamma
							break
						case 'down':
							newValue = gamma > MODEL_ACTIONS.gamma.range.min ? --gamma : gamma
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
				label: 'Picture Setup - Highlight Compensation',
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
				label: 'Picture Setup - Highlight Compensation Mask',
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
					let highlight_comp_mask = this.camera?.highlight_comp_mask
						? this.camera.highlight_comp_mask
						: MODEL_ACTIONS.highlight_comp_mask.range.default
					switch (action.options.val) {
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
				label: 'Picture Setup - Hue',
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
					let hue = this.camera?.hue ? this.camera.hue : MODEL_ACTIONS.hue.range.default
					switch (action.options.val) {
						case 'up':
							newValue = hue < MODEL_ACTIONS.hue.range.max ? ++hue : hue
							break
						case 'down':
							newValue = hue > MODEL_ACTIONS.hue.range.min ? --hue : hue
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
				label: 'Picture Setup - IR Cut Filter',
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
				label: 'Picture Setup - Low Latency',
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
				label: 'Picture Setup - Mirror',
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
				label: 'Picture Setup - ND Filter',
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
					let nd_filter = this.camera?.nd_filter ? this.camera.nd_filter : MODEL_ACTIONS.nd_filter.range.default
					switch (action.options.val) {
						case 'up':
							newValue = nd_filter < MODEL_ACTIONS.nd_filter.range.max ? ++nd_filter : nd_filter
							break
						case 'down':
							newValue = nd_filter > MODEL_ACTIONS.nd_filter.range.min ? --nd_filter : nd_filter
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
				label: 'Picture Setup - Noise Reduction',
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
					let nr = this.camera?.noise_reduction
					? this.camera.noise_reduction
					: MODEL_ACTIONS.noise_reduction.value.default
				switch (action.options.val) {
					case 'up':
						newValue = nr < MODEL_ACTIONS.noise_reduction.range.max ? ++nr : nr
						break
					case 'down':
						newValue = nr > MODEL_ACTIONS.noise_reduction.range.min ? --nr : nr
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
				label: 'Picture Setup - Sharpness',
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
					let sharpness = this.camera?.sharpness ? this.camera.sharpness : MODEL_ACTIONS.sharpness.range.default
					switch (action.options.val) {
						case 'up':
							newValue = sharpness < MODEL_ACTIONS.sharpness.range.max ? ++sharpness : sharpness
							break
						case 'down':
							newValue = sharpness > MODEL_ACTIONS.sharpness.range.min ? --sharpness : sharpness
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
				label: 'Picture Setup - Stabilizer',
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
				label: 'Picture Setup - 3D Noise Reduction',
				options: [
					{
						type: 'dropdown',
						label: '3D NR',
						id: 'val',
						choices: MODEL_ACTIONS.threed_nr.choices,
						default: MODEL_ACTIONS.threed_nr.default,
					},
				],
				callback: (action) => {
					body = {
						ThreeDNR: String(action.options.val),
					}
					this.sendCommand('birddogpicsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.twod_nr) {
			actions['twod_nr'] = {
				label: 'Picture Setup - 2D Noise Reduction',
				options: [
					{
						type: 'dropdown',
						label: '2D NR',
						id: 'val',
						choices: MODEL_ACTIONS.twod_nr.choices,
						default: MODEL_ACTIONS.twod_nr.default,
					},
				],
				callback: (action) => {
					body = {
						TWODNR: String(action.options.val),
					}
					this.sendCommand('birddogpicsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.wide_dynamic_range) {
			actions['wide_dynamic_range'] = {
				label: 'Picture Setup - Wide Dynamic Range',
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
					let wdr = this.camera?.wide_dynamic_range
					? this.camera.wide_dynamic_range
					: MODEL_ACTIONS.wide_dynamic_range.value.default
				switch (action.options.val) {
					case 'up':
						newValue = wdr < MODEL_ACTIONS.wide_dynamic_range.range.max ? ++wdr : wdr
						break
					case 'down':
						newValue = wdr > MODEL_ACTIONS.wide_dynamic_range.range.min ? --wdr : wdr
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
				label: 'Color Matrix - Blue Gain',
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
					let cm_blue_gain = this.camera?.cm_blue_gain
						? this.camera.cm_blue_gain
						: MODEL_ACTIONS.cm_blue_gain.range.default
					switch (action.options.val) {
						case 'up':
							newValue = cm_blue_gain < MODEL_ACTIONS.cm_blue_gain.range.max ? ++cm_blue_gain : cm_blue_gain
							break
						case 'down':
							newValue = cm_blue_gain > MODEL_ACTIONS.cm_blue_gain.range.min ? --cm_blue_gain : cm_blue_gain
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
				label: 'Color Matrix - Blue Hue',
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
					let cm_blue_hue = this.camera?.cm_blue_hue ? this.camera.cm_blue_hue : MODEL_ACTIONS.cm_blue_hue.range.default
					switch (action.options.val) {
						case 'up':
							newValue = cm_blue_hue < MODEL_ACTIONS.cm_blue_hue.range.max ? ++cm_blue_hue : cm_blue_hue
							break
						case 'down':
							newValue = cm_blue_hue > MODEL_ACTIONS.cm_blue_hue.range.min ? --cm_blue_hue : cm_blue_hue
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
				label: 'Color Matrix - Color Gain',
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
					let cm_color_gain = this.camera?.cm_color_gain
						? this.camera.cm_color_gain
						: MODEL_ACTIONS.cm_color_gain.range.default
					switch (action.options.val) {
						case 'up':
							newValue = cm_color_gain < MODEL_ACTIONS.cm_color_gain.range.max ? ++cm_color_gain : cm_color_gain
							break
						case 'down':
							newValue = cm_color_gain > MODEL_ACTIONS.cm_color_gain.range.min ? --cm_color_gain : cm_color_gain
							break
						case 'value':
							newValue = action.options.value
							break
					}
					body = {
						ColorGain: String(newValue),
					}
					this.sendCommand('birddogcmsetup', 'POST', body)
				},
			}
		}

		if (MODEL_ACTIONS?.cm_cyan_gain) {
			actions['cm_cyan_gain'] = {
				label: 'Color Matrix - Cyan Gain',
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
					let cm_cyan_gain = this.camera?.cm_cyan_gain
						? this.camera.cm_cyan_gain
						: MODEL_ACTIONS.cm_cyan_gain.range.default
					switch (action.options.val) {
						case 'up':
							newValue = cm_cyan_gain < MODEL_ACTIONS.cm_cyan_gain.range.max ? ++cm_cyan_gain : cm_cyan_gain
							break
						case 'down':
							newValue = cm_cyan_gain > MODEL_ACTIONS.cm_cyan_gain.range.min ? --cm_cyan_gain : cm_cyan_gain
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
				label: 'Color Matrix - Cyan Hue',
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
					let cm_cyan_hue = this.camera?.cm_cyan_hue ? this.camera.cm_cyan_hue : MODEL_ACTIONS.cm_cyan_hue.range.default
					switch (action.options.val) {
						case 'up':
							newValue = cm_cyan_hue < MODEL_ACTIONS.cm_cyan_hue.range.max ? ++cm_cyan_hue : cm_cyan_hue
							break
						case 'down':
							newValue = cm_cyan_hue > MODEL_ACTIONS.cm_cyan_hue.range.min ? --cm_cyan_hue : cm_cyan_hue
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
				label: 'Color Matrix - Green Gain',
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
					let cm_green_gain = this.camera?.cm_green_gain
						? this.camera.cm_green_gain
						: MODEL_ACTIONS.cm_green_gain.range.default
					switch (action.options.val) {
						case 'up':
							newValue = cm_green_gain < MODEL_ACTIONS.cm_green_gain.range.max ? ++cm_green_gain : cm_green_gain
							break
						case 'down':
							newValue = cm_green_gain > MODEL_ACTIONS.cm_green_gain.range.min ? --cm_green_gain : cm_green_gain
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
				label: 'Color Matrix - Green Hue',
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
					let cm_green_hue = this.camera?.cm_green_hue
						? this.camera.cm_green_hue
						: MODEL_ACTIONS.cm_green_hue.range.default
					switch (action.options.val) {
						case 'up':
							newValue = cm_green_hue < MODEL_ACTIONS.cm_green_hue.range.max ? ++cm_green_hue : cm_green_hue
							break
						case 'down':
							newValue = cm_green_hue > MODEL_ACTIONS.cm_green_hue.range.min ? --cm_green_hue : cm_green_hue
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
				label: 'Color Matrix - Hue Phase',
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
					let cm_hue_phase = this.camera?.cm_hue_phase
						? this.camera.cm_hue_phase
						: MODEL_ACTIONS.cm_hue_phase.range.default
					switch (action.options.val) {
						case 'up':
							newValue = cm_hue_phase < MODEL_ACTIONS.cm_hue_phase.range.max ? ++cm_hue_phase : cm_hue_phase
							break
						case 'down':
							newValue = cm_hue_phase > MODEL_ACTIONS.cm_hue_phase.range.min ? --cm_hue_phase : cm_hue_phase
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
				label: 'Color Matrix - Magenta Gain',
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
					let cm_mag_gain = this.camera?.cm_mag_gain ? this.camera.cm_mag_gain : MODEL_ACTIONS.cm_mag_gain.range.default
					switch (action.options.val) {
						case 'up':
							newValue = cm_mag_gain < MODEL_ACTIONS.cm_mag_gain.range.max ? ++cm_mag_gain : cm_mag_gain
							break
						case 'down':
							newValue = cm_mag_gain > MODEL_ACTIONS.cm_mag_gain.range.min ? --cm_mag_gain : cm_mag_gain
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
				label: 'Color Matrix - Magenta Hue',
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
					let cm_mag_hue = this.camera?.cm_mag_hue ? this.camera.cm_mag_hue : MODEL_ACTIONS.cm_mag_hue.range.default
					switch (action.options.val) {
						case 'up':
							newValue = cm_mag_hue < MODEL_ACTIONS.cm_mag_hue.range.max ? ++cm_mag_hue : cm_mag_hue
							break
						case 'down':
							newValue = cm_mag_hue > MODEL_ACTIONS.cm_mag_hue.range.min ? --cm_mag_hue : cm_mag_hue
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
				label: 'Color Matrix - Red Gain',
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
					let cm_red_gain = this.camera?.cm_red_gain ? this.camera.cm_red_gain : MODEL_ACTIONS.cm_red_gain.range.default
					switch (action.options.val) {
						case 'up':
							newValue = cm_red_gain < MODEL_ACTIONS.cm_red_gain.range.max ? ++cm_red_gain : cm_red_gain
							break
						case 'down':
							newValue = cm_red_gain > MODEL_ACTIONS.cm_red_gain.range.min ? --cm_red_gain : cm_red_gain
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
				label: 'Color Matrix - Red Hue',
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
					let cm_red_hue = this.camera?.cm_red_hue ? this.camera.cm_red_hue : MODEL_ACTIONS.cm_red_hue.range.default
					switch (action.options.val) {
						case 'up':
							newValue = cm_red_hue < MODEL_ACTIONS.cm_red_hue.range.max ? ++cm_red_hue : cm_red_hue
							break
						case 'down':
							newValue = cm_red_hue > MODEL_ACTIONS.cm_red_hue.range.min ? --cm_red_hue : cm_red_hue
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
				label: 'Color Matrix - Yellow Gain',
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
					let cm_yellow_gain = this.camera?.cm_yellow_gain
						? this.camera.cm_yellow_gain
						: MODEL_ACTIONS.cm_yellow_gain.range.default
					switch (action.options.val) {
						case 'up':
							newValue = cm_yellow_gain < MODEL_ACTIONS.cm_yellow_gain.range.max ? ++cm_yellow_gain : cm_yellow_gain
							break
						case 'down':
							newValue = cm_yellow_gain > MODEL_ACTIONS.cm_yellow_gain.range.min ? --cm_yellow_gain : cm_yellow_gain
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
				label: 'Color Matrix - Yellow Hue',
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
					let cm_yellow_hue = this.camera?.cm_yellow_hue
						? this.camera.cm_yellow_hue
						: MODEL_ACTIONS.cm_yellow_hue.range.default
					switch (action.options.val) {
						case 'up':
							newValue = cm_yellow_hue < MODEL_ACTIONS.cm_yellow_hue.range.max ? ++cm_yellow_hue : cm_yellow_hue
							break
						case 'down':
							newValue = cm_yellow_hue > MODEL_ACTIONS.cm_yellow_hue.range.min ? --cm_yellow_hue : cm_yellow_hue
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
				label: 'Advanced Setup - Brightness',
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
					let brightness = this.camera?.brightness ? this.camera.brightness : MODEL_ACTIONS.brightness.range.default
					switch (action.options.val) {
						case 'up':
							newValue = brightness < MODEL_ACTIONS.brightness.range.max ? ++brightness : brightness
							break
						case 'down':
							newValue = brightness > MODEL_ACTIONS.brightness.range.min ? --brightness : brightness
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
				label: 'Advanced Setup - Brightness Compensation',
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
				label: 'Advanced Setup - Compensation Level',
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
				label: 'Advanced Setup - Gamma Offset',
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
					let gamma_offset = this.camera?.gamma_offset
						? this.camera.gamma_offset
						: MODEL_ACTIONS.gamma_offset.range.default
					switch (action.options.val) {
						case 'up':
							newValue = gamma_offset < MODEL_ACTIONS.gamma_offset.range.max ? ++gamma_offset : gamma_offset
							break
						case 'down':
							newValue = gamma_offset > MODEL_ACTIONS.gamma_offset.range.min ? --gamma_offset : gamma_offset
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
				label: 'Advanced Setup - High Resolution',
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
				label: 'Advanced Setup - Video Enhancement',
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
				label: 'External Setup - Aux',
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
				label: 'External Setup - Rain Wiper',
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
				label: 'External Setup - 12v Out',
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
				label: 'Detail Setup - Bandwidth',
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
				label: 'Detail Setup - BW Balance',
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
				label: 'Detail Setup - Crispening',
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
					let crispening = this.camera?.crispening ? this.camera.crispening : MODEL_ACTIONS.crispening.range.default
					switch (action.options.val) {
						case 'up':
							newValue = crispening < MODEL_ACTIONS.crispening.range.max ? ++crispening : crispening
							break
						case 'down':
							newValue = crispening > MODEL_ACTIONS.crispening.range.min ? --crispening : crispening
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
				label: 'Detail Setup - Detail',
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
				label: 'Detail Setup - Highlight Detail',
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
					let highlight_detail = this.camera?.highlight_detail
						? this.camera.highlight_detail
						: MODEL_ACTIONS.highlight_detail.range.default
					switch (action.options.val) {
						case 'up':
							newValue =
								highlight_detail < MODEL_ACTIONS.highlight_detail.range.max ? ++highlight_detail : highlight_detail
							break
						case 'down':
							newValue =
								highlight_detail > MODEL_ACTIONS.highlight_detail.range.min ? --highlight_detail : highlight_detail
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
				label: 'Detail Setup - Hv Balance',
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
					let hv_balance = this.camera?.hv_balance ? this.camera.hv_balance : MODEL_ACTIONS.hv_balance.range.default
					switch (action.options.val) {
						case 'up':
							newValue = hv_balance < MODEL_ACTIONS.hv_balance.range.max ? ++hv_balance : hv_balance
							break
						case 'down':
							newValue = hv_balance > MODEL_ACTIONS.hv_balance.range.min ? --hv_balance : hv_balance
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
				label: 'Detail Setup - Limit',
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
					let limit = this.camera?.limit ? this.camera.limit : MODEL_ACTIONS.limit.range.default
					switch (action.options.val) {
						case 'up':
							newValue = limit < MODEL_ACTIONS.limit.range.max ? ++limit : limit
							break
						case 'down':
							newValue = limit > MODEL_ACTIONS.limit.range.min ? --limit : limit
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
				label: 'Detail Setup - Super Low',
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
					let super_low = this.camera?.super_low ? this.camera.super_low : MODEL_ACTIONS.super_low.range.default
					switch (action.options.val) {
						case 'up':
							newValue = super_low < MODEL_ACTIONS.super_low.range.max ? ++super_low : super_low
							break
						case 'down':
							newValue = super_low > MODEL_ACTIONS.super_low.range.min ? --super_low : super_low
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
				label: 'Gamma Setup - Black Gamma Level',
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
					let black_gamma_level = this.camera?.black_gamma_level
						? this.camera.black_gamma_level
						: MODEL_ACTIONS.black_gamma_level.range.default
					switch (action.options.val) {
						case 'up':
							newValue =
								black_gamma_level < MODEL_ACTIONS.black_gamma_level.range.max ? ++black_gamma_level : black_gamma_level
							break
						case 'down':
							newValue =
								black_gamma_level > MODEL_ACTIONS.black_gamma_level.range.max ? --black_gamma_level : black_gamma_level
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
				label: 'Gamma Setup - Black Level',
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
					let black_level = this.camera?.black_level ? this.camera.black_level : MODEL_ACTIONS.black_level.range.default
					switch (action.options.val) {
						case 'up':
							newValue = black_level < MODEL_ACTIONS.black_level.range.max ? ++black_level : black_level
							break
						case 'down':
							newValue = black_level > MODEL_ACTIONS.black_level.range.max ? --black_level : black_level
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
				label: 'Gamma Setup - Black Level Range',
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
				label: 'Gamma Setup - Effect',
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
					let effect = this.camera?.effect ? this.camera.effect : MODEL_ACTIONS.effect.range.default
					switch (action.options.val) {
						case 'up':
							newValue = effect < MODEL_ACTIONS.effect.range.max ? ++effect : effect
							break
						case 'down':
							newValue = effect > MODEL_ACTIONS.effect.range.max ? --effect : effect
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
				label: 'Gamma Setup - Level',
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
					let level = this.camera?.level ? this.camera.level : MODEL_ACTIONS.level.range.default
					switch (action.options.val) {
						case 'up':
							newValue = level < MODEL_ACTIONS.level.range.max ? ++level : level
							break
						case 'down':
							newValue = level > MODEL_ACTIONS.level.range.max ? --level : level
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
				label: 'Gamma Setup - Offset',
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
					let offset = this.camera?.offset ? this.camera.offset : MODEL_ACTIONS.offset.range.default
					switch (action.options.val) {
						case 'up':
							newValue = offset < MODEL_ACTIONS.offset.range.max ? ++offset : offset
							break
						case 'down':
							newValue = offset > MODEL_ACTIONS.offset.range.max ? --offset : offset
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
				label: 'Gamma Setup - Pattern',
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
					let pattern = this.camera?.pattern ? this.camera.pattern : MODEL_ACTIONS.pattern.range.default
					switch (action.options.val) {
						case 'up':
							newValue = pattern < MODEL_ACTIONS.pattern.range.max ? ++pattern : pattern
							break
						case 'down':
							newValue = pattern > MODEL_ACTIONS.pattern.range.max ? --pattern : pattern
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
				label: 'Gamma Setup - Pattern Fine',
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
					let pattern_fine = this.camera?.pattern_fine
						? this.camera.pattern_fine
						: MODEL_ACTIONS.pattern_fine.range.default
					switch (action.options.val) {
						case 'up':
							newValue = pattern_fine < MODEL_ACTIONS.pattern_fine.range.max ? ++pattern_fine : pattern_fine
							break
						case 'down':
							newValue = pattern_fine > MODEL_ACTIONS.pattern_fine.range.max ? --pattern_fine : pattern_fine
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
				label: 'Gamma Setup - Settings',
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
				label: 'Gamma Setup - Visibility Enhancer',
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
				label: 'Scope - Gamma Gain',
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
					let scope_gamma_gain = this.camera?.scope_gamma_gain
						? this.camera.scope_gamma_gain
						: MODEL_ACTIONS.scope_gamma_gain.range.default
					switch (action.options.val) {
						case 'up':
							newValue =
								scope_gamma_gain < MODEL_ACTIONS.scope_gamma_gain.range.max ? ++scope_gamma_gain : scope_gamma_gain
							break
						case 'down':
							newValue =
								scope_gamma_gain > MODEL_ACTIONS.scope_gamma_gain.range.max ? --scope_gamma_gain : scope_gamma_gain
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
				label: 'Scope - Mode',
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
				label: 'Scope - Position',
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
				label: 'Scope - Preview',
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
				label: 'Scope - Program',
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
				label: 'Scope - Size',
				options: [
					{
						type: 'dropdown',
						label: 'On/Off',
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
				label: 'Scope - Transparency',
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
			label: 'Custom Visca Command',
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
