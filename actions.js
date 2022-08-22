const { sortByAction, getModelActions } = require('./utils')
var { MODEL_SPECS } = require('./models.js')
const CHOICES = require('./choices.js')

module.exports = {
	getActions() {
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
			}
		}

		// Analog Audio Actions

		if (MODEL_ACTIONS?.analogAudioInGain) {
			actions['analogAudioInGain'] = {
				label: 'Analog Audio - Analog Audio In Gain',
				options: [
					{
						type: 'number',
						label:
							'Analog Audio In Gain (dB) (' +
							MODEL_ACTIONS.analogAudioInGain.range.min +
							' to ' +
							MODEL_ACTIONS.analogAudioInGain.range.max +
							')',
						id: 'val',
						default: MODEL_ACTIONS.analogAudioInGain.range.default,
						min: MODEL_ACTIONS.analogAudioInGain.range.min,
						max: MODEL_ACTIONS.analogAudioInGain.range.max,
					},
				],
			}
		}

		if (MODEL_ACTIONS?.analogAudioOutGain) {
			actions['analogAudioOutGain'] = {
				label: 'Analog Audio - Analog Audio Out Gain',
				options: [
					{
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
					},
				],
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
			}
		}

		if (MODEL_ACTIONS?.tally) {
			actions['tally'] = {
				label: 'Encode Setup - Tally Mode',
				options: [
					{
						type: 'dropdown',
						label: 'On / Off',
						id: 'val',
						choices: MODEL_ACTIONS.tally.choices,
						default: MODEL_ACTIONS.tally.default,
					},
				],
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
			}
		}

		if (MODEL_ACTIONS?.capture) {
			actions['capture'] = {
				label: 'Encode - Capture Screensaver',
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
			}
		}

		if (MODEL_ACTIONS?.gain_point) {
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
						id: 'level',
						default: MODEL_ACTIONS.shutter_speed_overwrite.range.default,
						min: MODEL_ACTIONS.shutter_speed_overwrite.range.min,
						max: MODEL_ACTIONS.shutter_speed_overwrite.range.max,
					},
				],
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
			}
		}
		if (MODEL_ACTIONS?.wbOnePush) {
			actions['wbOnePush'] = {
				label: 'White Balance - One Push Trigger',
				description: 'Camera must be in One Push mode in order to use this action',
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
			}
		}

		if (MODEL_ACTIONS?.color) {
			actions['color'] = {
				label: 'Picture Setup - Color',
				options: [
					{
						type: 'dropdown',
						label: 'Color',
						id: 'val',
						choices: MODEL_ACTIONS.color.choices,
						default: MODEL_ACTIONS.color.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_ACTIONS.color.range.min + ' to ' + MODEL_ACTIONS.color.range.max + ')',
						id: 'value',
						min: MODEL_ACTIONS.color.range.min,
						max: MODEL_ACTIONS.color.range.max,
						default: MODEL_ACTIONS.color.range.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
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
				],
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
				],
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
			}
		}

		// BirdDog Scope Actions

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
			}
		}

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
			}
		}
		return Object.fromEntries(Object.entries(actions).sort(sortByAction))
	},
}
