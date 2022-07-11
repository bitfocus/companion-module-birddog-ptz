const { sortByLabel, filterModelDetails } = require('./utils')
var { MODELS } = require('./models.js')
const CHOICES = require('./choices.js')

module.exports = {
	getActions() {
		this.debug(this?.camera?.model)

		//MODEL_VALUES = MODELS.find((MODELS) => MODELS.id == this.camera.model)?.actions
		MODEL_VALUES = filterModelDetails(MODELS, this.camera.model, 'actions', this.camera.firmware.major)

		if (!MODEL_VALUES && this.currentStatus != 2) {
			this.log('error', `Unrecognized camera model: ${this.camera.model}`)
			this.status(this.STATUS_ERROR)
			if (this.poll_interval !== undefined) {
				clearInterval(this.poll_interval)
			}
		}

		let actions = {}

		// General Camera Actions

		// VISCA Actions
		if (MODEL_VALUES?.standby) {
			actions['standby'] = {
				label: 'VISCA - Standby On/Off',
				options: [
					{
						type: 'dropdown',
						label: 'On/Standby',
						id: 'val',
						choices: MODEL_VALUES.standby.choices,
						default: MODEL_VALUES.standby.default,
					},
				],
			}
		}

		if (MODEL_VALUES?.freeze) {
			actions['freeze'] = {
				label: 'VISCA - Freeze',
				options: [
					{
						type: 'dropdown',
						label: 'On / Off',
						id: 'val',
						choices: MODEL_VALUES.freeze.choices,
						default: MODEL_VALUES.freeze.default,
					},
				],
			}
		}

		// Analog Audio Actions

		if (MODEL_VALUES?.analogAudioInGain) {
			actions['analogAudioInGain'] = {
				label: 'Analog Audio - Analog Audio In Gain',
				options: [
					{
						type: 'number',
						label:
							'Analog Audio In Gain (dB) (' +
							MODEL_VALUES.analogAudioInGain.range.min +
							' to ' +
							MODEL_VALUES.analogAudioInGain.range.max +
							')',
						id: 'val',
						default: MODEL_VALUES.analogAudioInGain.range.default,
						min: MODEL_VALUES.analogAudioInGain.range.min,
						max: MODEL_VALUES.analogAudioInGain.range.max,
					},
				],
			}
		}

		if (MODEL_VALUES?.analogAudioOutGain) {
			actions['analogAudioOutGain'] = {
				label: 'Analog Audio - Analog Audio Out Gain',
				options: [
					{
						type: 'number',
						label:
							'Analog Audio Out Gain (dB) (' +
							MODEL_VALUES.analogAudioOutGain.range.min +
							' to ' +
							MODEL_VALUES.analogAudioOutGain.range.max +
							')',
						id: 'val',
						default: MODEL_VALUES.analogAudioOutGain.range.default,
						min: MODEL_VALUES.analogAudioOutGain.range.min,
						max: MODEL_VALUES.analogAudioOutGain.range.max,
					},
				],
			}
		}

		if (MODEL_VALUES?.analogAudioOutput) {
			actions['analogAudioOutput'] = {
				label: 'Analog Audio - Analog Audio Output Select',
				options: [
					{
						type: 'dropdown',
						label: 'Mode',
						id: 'val',
						choices: MODEL_VALUES.analogAudioOutput.choices,
						default: MODEL_VALUES.analogAudioOutput.default,
					},
				],
			}
		}

		// Video Output Interface Actions

		if (MODEL_VALUES?.video_output) {
			actions['video_output'] = {
				label: 'Video Output - Video Mode',
				options: [
					{
						type: 'dropdown',
						label: 'Mode',
						id: 'val',
						choices: MODEL_VALUES.video_output.choices,
						default: MODEL_VALUES.video_output.default,
					},
				],
			}
		}

		// Encode Setup Actions

		if (MODEL_VALUES?.bandwidth_mode) {
			actions['bandwidth_mode'] = {
				label: 'Encode Setup - Encode Bandwidth',
				options: [
					{
						type: 'dropdown',
						label: 'Manual / NDI Managed',
						id: 'val',
						choices: MODEL_VALUES.bandwidth_mode.choices,
						default: MODEL_VALUES.bandwidth_mode.default,
					},
					{
						type: 'number',
						label:
							'Bandwidth Select (' +
							MODEL_VALUES.bandwidth_select.range.min +
							' to ' +
							MODEL_VALUES.bandwidth_select.range.max +
							')',
						id: 'bandwidth',
						default: MODEL_VALUES.bandwidth_select.range.default,
						min: MODEL_VALUES.bandwidth_select.range.min,
						max: MODEL_VALUES.bandwidth_select.range.max,
						isVisible: (action) => action.options.val === 'Manual',
					},
				],
			}
		}

		if (MODEL_VALUES?.ndiAudio) {
			actions['ndiAudio'] = {
				label: 'Encode Setup - NDI Audio',
				options: [
					{
						type: 'dropdown',
						label: 'Analog / Mute',
						id: 'val',
						choices: MODEL_VALUES.ndiAudio.choices,
						default: MODEL_VALUES.ndiAudio.default,
					},
				],
			}
		}

		if (MODEL_VALUES?.ndiGroupEnable) {
			actions['ndiGroupEnable'] = {
				label: 'Encode Setup - NDI Group Enable',
				options: [
					{
						type: 'dropdown',
						label: 'NDI Group Enable',
						id: 'val',
						choices: MODEL_VALUES.ndiGroupEnable.choices,
						default: MODEL_VALUES.ndiGroupEnable.default,
					},
				],
			}
		}

		if (MODEL_VALUES?.tally) {
			actions['tally'] = {
				label: 'Encode Setup - Tally Mode',
				options: [
					{
						type: 'dropdown',
						label: 'On / Off',
						id: 'val',
						choices: MODEL_VALUES.tally.choices,
						default: MODEL_VALUES.tally.default,
					},
				],
			}
		}

		// Encode Transport Actions

		if (MODEL_VALUES?.transmit_method) {
			actions['transmit_method'] = {
				label: 'Encode Transport - Transmit Method',
				options: [
					{
						type: 'dropdown',
						label: 'Method',
						id: 'val',
						choices: MODEL_VALUES.transmit_method.choices,
						default: MODEL_VALUES.transmit_method.default,
					},
				],
			}
		}

		// NDI Discovery Actions

		if (MODEL_VALUES?.ndi_discovery_server) {
			actions['ndi_discovery_server'] = {
				label: 'NDI Discovery - Server',
				options: [
					{
						type: 'dropdown',
						label: 'Enabled / Disabled',
						id: 'val',
						choices: MODEL_VALUES.ndi_discovery_server.choices,
						default: MODEL_VALUES.ndi_discovery_server.default,
					},
				],
			}
		}

		// PTZ Actions

		if (MODEL_VALUES?.pt) {
			actions['pt'] = {
				label: 'PTZ - Pan/Tilt',
				options: [
					{
						type: 'dropdown',
						label: 'Direction',
						id: 'val',
						choices: MODEL_VALUES.pt.choices,
						default: MODEL_VALUES.pt.default,
					},
					{
						type: 'dropdown',
						label: 'Pan Position',
						id: 'posPan',
						choices: MODEL_VALUES.pt.posPanChoices,
						default: MODEL_VALUES.pt.posPanDefault,
						isVisible: (action) => action.options.val === 'direct',
					},
					{
						type: 'dropdown',
						label: 'Tilt Position',
						id: 'posTilt',
						choices: MODEL_VALUES.pt.posTiltChoices,
						default: MODEL_VALUES.pt.posTiltDefault,
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
						label: 'Pan Speed(' + MODEL_VALUES.panSpeed.range.min + ' to ' + MODEL_VALUES.panSpeed.range.max + ')',
						id: 'panSpeed',
						default: MODEL_VALUES.panSpeed.range.default,
						min: MODEL_VALUES.panSpeed.range.min,
						max: MODEL_VALUES.panSpeed.range.max,
						isVisible: (action) => action.options.override === true || action.options.val === 'direct',
					},
					{
						type: 'number',
						label: 'Tilt Speed (' + MODEL_VALUES.tiltSpeed.range.min + ' to ' + MODEL_VALUES.tiltSpeed.range.max + ')',
						id: 'tiltSpeed',
						default: MODEL_VALUES.tiltSpeed.range.default,
						min: MODEL_VALUES.tiltSpeed.range.min,
						max: MODEL_VALUES.tiltSpeed.range.max,
						isVisible: (action) => action.options.override === true || action.options.val === 'direct',
					},
				],
			}
		}

		if (MODEL_VALUES?.zoom) {
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
						choices: MODEL_VALUES.zoom.posZoomChoices,
						default: MODEL_VALUES.zoom.posZoomDefault,
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
						label: 'Speed (' + MODEL_VALUES.zoomSpeed.range.min + ' to ' + MODEL_VALUES.zoomSpeed.range.max + ')',
						id: 'speed',
						default: MODEL_VALUES.zoomSpeed.range.default,
						min: MODEL_VALUES.zoomSpeed.range.min,
						max: MODEL_VALUES.zoomSpeed.range.max,
						isVisible: (action) => action.options.override === true,
					},
				],
			}
		}

		if (MODEL_VALUES?.panSpeed) {
			actions['panSpeed'] = {
				label: 'PTZ - Pan Speed',
				options: [
					{
						type: 'dropdown',
						label: 'Action',
						id: 'type',
						choices: MODEL_VALUES.panSpeed.choices,
						default: MODEL_VALUES.panSpeed.default,
					},
					{
						type: 'number',
						label: 'Speed (' + MODEL_VALUES.panSpeed.range.min + ' to ' + MODEL_VALUES.panSpeed.range.max + ')',
						id: 'value',
						default: MODEL_VALUES.panSpeed.range.default,
						min: MODEL_VALUES.panSpeed.range.min,
						max: MODEL_VALUES.panSpeed.range.max,
						isVisible: (action) => action.options.type === 'value',
					},
				],
			}
		}

		if (MODEL_VALUES?.tiltSpeed) {
			actions['tiltSpeed'] = {
				label: 'PTZ - Tilt Speed',
				options: [
					{
						type: 'dropdown',
						label: 'Action',
						id: 'type',
						choices: MODEL_VALUES.tiltSpeed.choices,
						default: MODEL_VALUES.tiltSpeed.default,
					},
					{
						type: 'number',
						label: 'Speed (' + MODEL_VALUES.tiltSpeed.range.min + ' to ' + MODEL_VALUES.tiltSpeed.range.max + ')',
						id: 'value',
						default: MODEL_VALUES.tiltSpeed.range.default,
						min: MODEL_VALUES.tiltSpeed.range.min,
						max: MODEL_VALUES.tiltSpeed.range.max,
						isVisible: (action) => action.options.type === 'value',
					},
				],
			}
		}

		if (MODEL_VALUES?.zoomSpeed) {
			actions['zoomSpeed'] = {
				label: 'PTZ - Zoom Speed',
				options: [
					{
						type: 'dropdown',
						label: 'Action',
						id: 'type',
						choices: MODEL_VALUES.zoomSpeed.choices,
						default: MODEL_VALUES.zoomSpeed.default,
					},
					{
						type: 'number',
						label: 'Speed (' + MODEL_VALUES.zoomSpeed.range.min + ' to ' + MODEL_VALUES.zoomSpeed.range.max + ')',
						id: 'value',
						default: MODEL_VALUES.zoomSpeed.range.default,
						min: MODEL_VALUES.zoomSpeed.range.min,
						max: MODEL_VALUES.zoomSpeed.range.max,
						isVisible: (action) => action.options.type === 'value',
					},
				],
			}
		}

		if (MODEL_VALUES?.savePset) {
			actions['savePset'] = {
				label: 'PTZ - Save Preset',
				options: [
					{
						type: 'number',
						label: 'Preset Number (' + MODEL_VALUES.savePset.range.min + ' to ' + MODEL_VALUES.savePset.range.max + ')',
						id: 'val',
						default: MODEL_VALUES.savePset.range.default,
						min: MODEL_VALUES.savePset.range.min,
						max: MODEL_VALUES.savePset.range.max,
					},
				],
			}
		}

		if (MODEL_VALUES?.recallPset) {
			actions['recallPset'] = {
				label: 'PTZ - Recall Preset',
				options: [
					{
						type: 'number',
						label: 'Preset Number (' + MODEL_VALUES.savePset.range.min + ' to ' + MODEL_VALUES.savePset.range.max + ')',
						id: 'val',
						default: MODEL_VALUES.savePset.range.default,
						min: MODEL_VALUES.savePset.range.min,
						max: MODEL_VALUES.savePset.range.max,
					},
				],
			}
		}

		// Focus Actions

		if (MODEL_VALUES?.focus) {
			actions['focus'] = {
				label: 'Focus - Focus Action',
				options: [
					{
						type: 'dropdown',
						label: 'Direction',
						id: 'val',
						choices: MODEL_VALUES.focus.choices,
						default: MODEL_VALUES.focus.default,
					},
				],
			}
		}

		if (MODEL_VALUES?.focusM) {
			actions['focusM'] = {
				label: 'Focus - Focus Mode',
				options: [
					{
						type: 'dropdown',
						label: 'Mode',
						id: 'val',
						choices: MODEL_VALUES.focusM.choices,
						default: MODEL_VALUES.focusM.default,
					},
				],
			}
		}

		// Exposure Actions

		if (MODEL_VALUES?.ae_response) {
			actions['ae_response'] = {
				label: 'Exposure - Ae Repsonse',
				options: [
					{
						type: 'number',
						label:
							'Ae Response (' + MODEL_VALUES.ae_response.range.min + ' to ' + MODEL_VALUES.ae_response.range.max + ')',
						id: 'level',
						default: MODEL_VALUES.ae_response.range.default,
						min: MODEL_VALUES.ae_response.range.min,
						max: MODEL_VALUES.ae_response.range.max,
					},
				],
			}
		}

		if (MODEL_VALUES?.backlight) {
			actions['backlight'] = {
				label: 'Exposure - Backlight',
				options: [
					{
						type: 'dropdown',
						label: 'On / Off',
						id: 'mode',
						choices: MODEL_VALUES.backlight.choices,
						default: MODEL_VALUES.backlight.default,
					},
				],
			}
		}

		if (MODEL_VALUES?.bright_level) {
			actions['bright_level'] = {
				label: 'Exposure - Bright Level',
				options: [
					{
						type: 'number',
						label: 'Level (' + MODEL_VALUES.bright_level.range.min + ' to ' + MODEL_VALUES.bright_level.range.max + ')',
						id: 'level',
						default: MODEL_VALUES.bright_level.range.default,
						min: MODEL_VALUES.bright_level.range.min,
						max: MODEL_VALUES.bright_level.range.max,
					},
				],
			}
		}

		if (MODEL_VALUES?.expComp) {
			actions['expComp'] = {
				label: 'Exposure - Exposure Compensation',
				options: [
					{
						type: 'dropdown',
						label: 'On / Off',
						id: 'val',
						choices: MODEL_VALUES.expComp.choices,
						default: MODEL_VALUES.expComp.default,
					},
					{
						type: 'number',
						label:
							'Exposure Compensation Level (' +
							MODEL_VALUES.expCompLvl.range.min +
							' to ' +
							MODEL_VALUES.expCompLvl.range.max +
							')',
						id: 'level',
						default: MODEL_VALUES.expCompLvl.range.default,
						min: MODEL_VALUES.expCompLvl.range.min,
						max: MODEL_VALUES.expCompLvl.range.max,
						isVisible: (action) => action.options.val === 'On',
					},
				],
			}
		}

		if (MODEL_VALUES?.exposure_mode) {
			actions['expM'] = {
				label: 'Exposure - Exposure Mode',
				options: [
					{
						type: 'dropdown',
						label: 'Mode',
						id: 'val',
						choices: MODEL_VALUES.exposure_mode.choices,
						default: MODEL_VALUES.exposure_mode.default,
					},
				],
			}
		}

		if (MODEL_VALUES?.gain) {
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
						choices: MODEL_VALUES.gain.choices,
						default: MODEL_VALUES.gain.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
			}
		}

		if (MODEL_VALUES?.gain_limit) {
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
						choices: MODEL_VALUES.gain.choices.slice(
							MODEL_VALUES.gain_limit.range.min - 1,
							MODEL_VALUES.gain_limit.range.max + 1
						),
						default: MODEL_VALUES.gain_limit.range.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
			}
		}

		if (MODEL_VALUES?.gain_point) {
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

		if (MODEL_VALUES?.gain_point) {
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
						choices: MODEL_VALUES.gain.choices.slice(
							0,
							parseInt(
								this.camera.expsetup?.GainLimit ? this.camera.expsetup?.GainLimit : MODEL_VALUES.gain.default,
								10
							) + 1
						),
						default: MODEL_VALUES.gain.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
			}
		}

		if (MODEL_VALUES?.high_sensitivity) {
			actions['highSensitivity'] = {
				label: 'Exposure - High Sensitivity Mode',
				options: [
					{
						type: 'dropdown',
						label: 'On / Off',
						id: 'val',
						choices: MODEL_VALUES.high_sensitivity.choices,
						default: MODEL_VALUES.high_sensitivity.default,
					},
				],
			}
		}

		if (MODEL_VALUES?.iris) {
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
						choices: MODEL_VALUES.iris.choices,
						default: MODEL_VALUES.iris.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
			}
		}

		if (MODEL_VALUES?.shutter_control_overwrite) {
			actions['shutter_control_overwrite'] = {
				label: 'Exposure - Shutter Control Overwrite',
				options: [
					{
						type: 'dropdown',
						label: 'On/Off',
						id: 'val',
						choices: MODEL_VALUES.shutter_control_overwrite.choices,
						default: MODEL_VALUES.shutter_control_overwrite.default,
					},
				],
			}
		}

		if (MODEL_VALUES?.shutter_max_speed) {
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
						choices: MODEL_VALUES.shut?.['shutter_' + [this.camera.framerate]].slice(
							MODEL_VALUES.shutter_max_speed.range.min,
							MODEL_VALUES.shutter_max_speed.range.max + 1
						),
						default: MODEL_VALUES.shutter_max_speed.range.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
			}
		}

		if (MODEL_VALUES?.shutter_min_speed) {
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
						choices: MODEL_VALUES.shut?.['shutter_' + [this.camera.framerate]].slice(
							MODEL_VALUES.shutter_min_speed.range.min,
							parseInt(this.camera.expsetup?.ShutterMaxSpeed, 10) + 1
						),
						default: MODEL_VALUES.shutter_max_speed.range.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
			}
		}

		if (MODEL_VALUES?.shutter_speed) {
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
						choices: MODEL_VALUES.shutter_speed?.['shutter_' + [this.camera.framerate]],
						default: MODEL_VALUES.shutter_speed.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
			}
		}

		if (MODEL_VALUES?.shutter_speed_overwrite) {
			actions['shutter_speed_overwrite'] = {
				label: 'Exposure - Shutter Speed Overwrite',
				options: [
					{
						type: 'number',
						label:
							'Hz (' +
							MODEL_VALUES.shutter_speed_overwrite.range.min +
							' to ' +
							MODEL_VALUES.shutter_speed_overwrite.range.max +
							')',
						id: 'level',
						default: MODEL_VALUES.shutter_speed_overwrite.range.default,
						min: MODEL_VALUES.shutter_speed_overwrite.range.min,
						max: MODEL_VALUES.shutter_speed_overwrite.range.max,
					},
				],
			}
		}

		if (MODEL_VALUES?.slow_shutter_en) {
			actions['slow_shutter_en'] = {
				label: 'Exposure - Slow Shutter Enable',
				options: [
					{
						type: 'dropdown',
						label: 'On/Off',
						id: 'val',
						choices: MODEL_VALUES.slow_shutter_en.choices,
						default: MODEL_VALUES.slow_shutter_en.default,
					},
				],
			}
		}

		if (MODEL_VALUES?.slow_shutter_limit) {
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
						choices: MODEL_VALUES.shutter_speed?.['shutter_' + [this.camera.framerate]].slice(
							MODEL_VALUES.slow_shutter_limit.range.min,
							MODEL_VALUES.slow_shutter_limit.range.max + 1
						),
						default: MODEL_VALUES.slow_shutter_limit.range.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
			}
		}

		if (MODEL_VALUES?.spotlight) {
			actions['spotlight'] = {
				label: 'Exposure - Spotlight',
				options: [
					{
						type: 'dropdown',
						label: 'On/Off',
						id: 'val',
						choices: MODEL_VALUES.spotlight.choices,
						default: MODEL_VALUES.spotlight.default,
					},
				],
			}
		}

		// White Balance Actions

		if (MODEL_VALUES?.bg) {
			actions['bg'] = {
				label: 'White Balance - BG',
				options: [
					{
						type: 'number',
						label: 'Value (' + MODEL_VALUES.bg.range.min + ' to ' + MODEL_VALUES.bg.range.max + ')',
						id: 'value',
						default: MODEL_VALUES.bg.range.default,
						min: MODEL_VALUES.bg.range.min,
						max: MODEL_VALUES.bg.range.max,
					},
				],
			}
		}

		if (MODEL_VALUES?.br) {
			actions['br'] = {
				label: 'White Balance - BR',
				options: [
					{
						type: 'number',
						label: 'Value (' + MODEL_VALUES.br.range.min + ' to ' + MODEL_VALUES.br.range.max + ')',
						id: 'value',
						default: MODEL_VALUES.br.range.default,
						min: MODEL_VALUES.br.range.min,
						max: MODEL_VALUES.br.range.max,
					},
				],
			}
		}

		if (MODEL_VALUES?.blue_gain) {
			actions['blue_gain'] = {
				label: 'White Balance - Blue Gain',
				options: [
					{
						type: 'dropdown',
						label: 'Blue Gain',
						id: 'val',
						choices: MODEL_VALUES.blue_gain.choices,
						default: MODEL_VALUES.blue_gain.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_VALUES.blue_gain.range.min + ' to ' + MODEL_VALUES.blue_gain.range.max + ')',
						id: 'value',
						default: MODEL_VALUES.blue_gain.range.default,
						min: MODEL_VALUES.blue_gain.range.min,
						max: MODEL_VALUES.blue_gain.range.max,
						isVisible: (action) => action.options.val === 'value',
					},
				],
			}
		}

		if (MODEL_VALUES?.color_temp) {
			actions['color_temp'] = {
				label: 'White Balance - Color Temperature',
				options: [
					{
						type: 'dropdown',
						label: 'Color Temperature (k)',
						id: 'val',
						choices: MODEL_VALUES.color_temp.choices,
						default: MODEL_VALUES.color_temp.default,
					},
				],
			}
		}

		if (MODEL_VALUES?.gb) {
			actions['gb'] = {
				label: 'White Balance - GB',
				options: [
					{
						type: 'number',
						label: 'Value (' + MODEL_VALUES.gb.range.min + ' to ' + MODEL_VALUES.gb.range.max + ')',
						id: 'value',
						default: MODEL_VALUES.gb.range.default,
						min: MODEL_VALUES.gb.range.min,
						max: MODEL_VALUES.gr.range.max,
					},
				],
			}
		}

		if (MODEL_VALUES?.gr) {
			actions['gr'] = {
				label: 'White Balance - GR',
				options: [
					{
						type: 'number',
						label: 'Value (' + MODEL_VALUES.gr.range.min + ' to ' + MODEL_VALUES.gr.range.max + ')',
						id: 'value',
						default: MODEL_VALUES.gr.range.default,
						min: MODEL_VALUES.gr.range.min,
						max: MODEL_VALUES.gr.range.max,
					},
				],
			}
		}

		if (MODEL_VALUES?.level) {
			actions['level'] = {
				label: 'White Balance - Level',
				options: [
					{
						type: 'number',
						label: 'Level (' + MODEL_VALUES.level.range.min + ' to ' + MODEL_VALUES.level.range.max + ')',
						id: 'value',
						default: MODEL_VALUES.level.range.default,
						min: MODEL_VALUES.level.range.min,
						max: MODEL_VALUES.level.range.max,
					},
				],
			}
		}

		if (MODEL_VALUES?.matrix) {
			actions['matrix'] = {
				label: 'White Balance - Matrix',
				options: [
					{
						type: 'dropdown',
						label: 'On/Off',
						id: 'val',
						choices: MODEL_VALUES.matrix.choices,
						default: MODEL_VALUES.matrix.default,
					},
				],
			}
		}

		if (MODEL_VALUES?.offset) {
			actions['offset'] = {
				label: 'White Balance - Offset',
				options: [
					{
						type: 'number',
						label: 'Value (' + MODEL_VALUES.offset.range.min + ' to ' + MODEL_VALUES.offset.range.max + ')',
						id: 'value',
						default: MODEL_VALUES.offset.range.default,
						min: MODEL_VALUES.offset.range.min,
						max: MODEL_VALUES.offset.range.max,
					},
				],
			}
		}

		if (MODEL_VALUES?.phase) {
			actions['phase'] = {
				label: 'White Balance - Phase',
				options: [
					{
						type: 'number',
						label: 'Value (' + MODEL_VALUES.phase.range.min + ' to ' + MODEL_VALUES.phase.range.max + ')',
						id: 'value',
						default: MODEL_VALUES.phase.range.default,
						min: MODEL_VALUES.phase.range.min,
						max: MODEL_VALUES.phase.range.max,
					},
				],
			}
		}

		if (MODEL_VALUES?.rb) {
			actions['rb'] = {
				label: 'White Balance - RB',
				options: [
					{
						type: 'number',
						label: 'Value (' + MODEL_VALUES.rb.range.min + ' to ' + MODEL_VALUES.rb.range.max + ')',
						id: 'value',
						default: MODEL_VALUES.rb.range.default,
						min: MODEL_VALUES.rb.range.min,
						max: MODEL_VALUES.rb.range.max,
					},
				],
			}
		}

		if (MODEL_VALUES?.rg) {
			actions['rg'] = {
				label: 'White Balance - RG',
				options: [
					{
						type: 'number',
						label: 'Value (' + MODEL_VALUES.rg.range.min + ' to ' + MODEL_VALUES.rg.range.max + ')',
						id: 'value',
						default: MODEL_VALUES.rg.range.default,
						min: MODEL_VALUES.rg.range.min,
						max: MODEL_VALUES.rg.range.max,
					},
				],
			}
		}

		if (MODEL_VALUES?.red_gain) {
			actions['red_gain'] = {
				label: 'White Balance - Red Gain',
				options: [
					{
						type: 'dropdown',
						label: 'Red Gain',
						id: 'val',
						choices: MODEL_VALUES.red_gain.choices,
						default: MODEL_VALUES.red_gain.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_VALUES.red_gain.range.min + ' to ' + MODEL_VALUES.red_gain.range.max + ')',
						id: 'value',
						default: MODEL_VALUES.red_gain.range.default,
						min: MODEL_VALUES.red_gain.range.min,
						max: MODEL_VALUES.red_gain.range.max,
						isVisible: (action) => action.options.val === 'value',
					},
				],
			}
		}

		if (MODEL_VALUES?.select) {
			actions['select'] = {
				label: 'White Balance - Select',
				options: [
					{
						type: 'dropdown',
						label: 'On/Off',
						id: 'val',
						choices: MODEL_VALUES.select.choices,
						default: MODEL_VALUES.select.default,
					},
				],
			}
		}

		if (MODEL_VALUES?.speed) {
			actions['speed'] = {
				label: 'White Balance - Speed',
				options: [
					{
						type: 'number',
						label: 'Value (' + MODEL_VALUES.speed.range.min + ' to ' + MODEL_VALUES.speed.range.max + ')',
						id: 'value',
						default: MODEL_VALUES.speed.range.default,
						min: MODEL_VALUES.speed.range.min,
						max: MODEL_VALUES.speed.range.max,
					},
				],
			}
		}

		if (MODEL_VALUES?.wb_mode) {
			actions['wb_mode'] = {
				label: 'White Balance - White Balance Mode',
				options: [
					{
						type: 'dropdown',
						label: 'Mode',
						id: 'val',
						choices: MODEL_VALUES.wb_mode.choices,
						default: MODEL_VALUES.wb_mode.default,
					},
				],
			}
		}
		if (MODEL_VALUES?.wbOnePush) {
			actions['wbOnePush'] = {
				label: 'White Balance - One Push Trigger',
				description: 'Camera must be in One Push mode in order to use this action',
			}
		}

		// Picture Setup Actions

		if (MODEL_VALUES?.backlight_com) {
			actions['backlight_com'] = {
				label: 'Picture Setup - Backlight Compensation',
				options: [
					{
						type: 'dropdown',
						label: 'On/Off',
						id: 'val',
						choices: MODEL_VALUES.backlight_com.choices,
						default: MODEL_VALUES.backlight_com.default,
					},
				],
			}
		}

		if (MODEL_VALUES?.chroma_suppress) {
			actions['chroma_suppress'] = {
				label: 'Picture Setup - Chroma Suppress',
				options: [
					{
						type: 'dropdown',
						label: 'Mode',
						id: 'val',
						choices: MODEL_VALUES.chroma_suppress.choices,
						default: MODEL_VALUES.chroma_suppress.default,
					},
				],
			}
		}

		if (MODEL_VALUES?.color) {
			actions['color'] = {
				label: 'Picture Setup - Color',
				options: [
					{
						type: 'dropdown',
						label: 'Color',
						id: 'val',
						choices: MODEL_VALUES.color.choices,
						default: MODEL_VALUES.color.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_VALUES.color.range.min + ' to ' + MODEL_VALUES.color.range.max + ')',
						id: 'value',
						min: MODEL_VALUES.color.range.min,
						max: MODEL_VALUES.color.range.max,
						default: MODEL_VALUES.color.range.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
			}
		}

		if (MODEL_VALUES?.contrast) {
			actions['contrast'] = {
				label: 'Picture Setup - Contrast',
				options: [
					{
						type: 'dropdown',
						label: 'Contrast',
						id: 'val',
						choices: MODEL_VALUES.contrast.choices,
						default: MODEL_VALUES.contrast.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_VALUES.contrast.range.min + ' to ' + MODEL_VALUES.contrast.range.max + ')',
						id: 'value',
						min: MODEL_VALUES.contrast.range.min,
						max: MODEL_VALUES.contrast.range.max,
						default: MODEL_VALUES.contrast.range.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
			}
		}

		if (MODEL_VALUES?.pictureEffect) {
			actions['pictureEffect'] = {
				label: 'Picture Setup - Effect',
				options: [
					{
						type: 'dropdown',
						label: 'Effect',
						id: 'val',
						choices: MODEL_VALUES.pictureEffect.choices,
						default: MODEL_VALUES.pictureEffect.default,
					},
				],
			}
		}

		if (MODEL_VALUES?.picFlip) {
			actions['picFlip'] = {
				label: 'Picture Setup - Flip',
				options: [
					{
						type: 'dropdown',
						label: 'On / Off',
						id: 'val',
						choices: MODEL_VALUES.picFlip.choices,
						default: MODEL_VALUES.picFlip.default,
					},
				],
			}
		}

		if (MODEL_VALUES?.gamma) {
			actions['gamma'] = {
				label: 'Picture Setup - Gamma',
				options: [
					{
						type: 'dropdown',
						label: 'Gamma',
						id: 'val',
						choices: MODEL_VALUES.gamma.choices,
						default: MODEL_VALUES.gamma.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_VALUES.gamma.range.min + ' to ' + MODEL_VALUES.gamma.range.max + ')',
						id: 'value',
						min: MODEL_VALUES.gamma.range.min,
						max: MODEL_VALUES.gamma.range.max,
						default: MODEL_VALUES.gamma.range.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
			}
		}

		if (MODEL_VALUES?.highlight_comp) {
			actions['highlight_comp'] = {
				label: 'Picture Setup - Highlight Compensation',
				options: [
					{
						type: 'dropdown',
						label: 'Highlight Compensation',
						id: 'val',
						choices: MODEL_VALUES.highlight_comp.choices,
						default: MODEL_VALUES.highlight_comp.default,
					},
				],
			}
		}

		if (MODEL_VALUES?.highlight_comp_mask) {
			actions['highlight_comp_mask'] = {
				label: 'Picture Setup - Highlight Compensation Mask',
				options: [
					{
						type: 'dropdown',
						label: 'Highlight Compensation Mask',
						id: 'val',
						choices: MODEL_VALUES.highlight_comp_mask.choices,
						default: MODEL_VALUES.highlight_comp_mask.default,
					},
					{
						type: 'number',
						label:
							'Value (' +
							MODEL_VALUES.highlight_comp_mask.range.min +
							' to ' +
							MODEL_VALUES.highlight_comp_mask.range.max +
							')',
						id: 'value',
						min: MODEL_VALUES.highlight_comp_mask.range.min,
						max: MODEL_VALUES.highlight_comp_mask.range.max,
						default: MODEL_VALUES.highlight_comp_mask.range.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
			}
		}

		if (MODEL_VALUES?.hue) {
			actions['hue'] = {
				label: 'Picture Setup - Hue',
				options: [
					{
						type: 'dropdown',
						label: 'Hue',
						id: 'val',
						choices: MODEL_VALUES.hue.choices,
						default: MODEL_VALUES.hue.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_VALUES.hue.range.min + ' to ' + MODEL_VALUES.hue.range.max + ')',
						id: 'value',
						min: MODEL_VALUES.hue.range.min,
						max: MODEL_VALUES.hue.range.max,
						default: MODEL_VALUES.hue.range.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
			}
		}

		if (MODEL_VALUES?.ir_cutfilter) {
			actions['ir_cutfilter'] = {
				label: 'Picture Setup - IR Cut Filter',
				options: [
					{
						type: 'dropdown',
						label: 'Mode',
						id: 'val',
						choices: MODEL_VALUES.ir_cutfilter.choices,
						default: MODEL_VALUES.ir_cutfilter.default,
					},
				],
			}
		}

		if (MODEL_VALUES?.low_latency) {
			actions['low_latency'] = {
				label: 'Picture Setup - Low Latency',
				options: [
					{
						type: 'dropdown',
						label: 'On / Off',
						id: 'val',
						choices: MODEL_VALUES.low_latency.choices,
						default: MODEL_VALUES.low_latency.default,
					},
				],
			}
		}

		if (MODEL_VALUES?.picMirror) {
			actions['picMirror'] = {
				label: 'Picture Setup - Mirror',
				options: [
					{
						type: 'dropdown',
						label: 'On / Off',
						id: 'val',
						choices: MODEL_VALUES.picMirror.choices,
						default: MODEL_VALUES.picMirror.default,
					},
				],
			}
		}

		if (MODEL_VALUES?.nd_filter) {
			actions['nd_filter'] = {
				label: 'Picture Setup - ND Filter',
				options: [
					{
						type: 'dropdown',
						label: 'ND Filter',
						id: 'val',
						choices: MODEL_VALUES.nd_filter.choices,
						default: MODEL_VALUES.nd_filter.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_VALUES.nd_filter.range.min + ' to ' + MODEL_VALUES.nd_filter.range.max + ')',
						id: 'value',
						min: MODEL_VALUES.nd_filter.range.min,
						max: MODEL_VALUES.nd_filter.range.max,
						default: MODEL_VALUES.nd_filter.range.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
			}
		}

		if (MODEL_VALUES?.noise_reduction) {
			actions['noise_reduction'] = {
				label: 'Picture Setup - Noise Reduction',
				options: [
					{
						type: 'dropdown',
						label: 'Noise Reduction',
						id: 'val',
						choices: MODEL_VALUES.noise_reduction.choices,
						default: MODEL_VALUES.noise_reduction.default,
					},
				],
			}
		}

		if (MODEL_VALUES?.sharpness) {
			actions['sharpness'] = {
				label: 'Picture Setup - Sharpness',
				options: [
					{
						type: 'dropdown',
						label: 'Sharpness',
						id: 'val',
						choices: MODEL_VALUES.sharpness.choices,
						default: MODEL_VALUES.sharpness.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_VALUES.sharpness.range.min + ' to ' + MODEL_VALUES.sharpness.range.max + ')',
						id: 'value',
						min: MODEL_VALUES.sharpness.range.min,
						max: MODEL_VALUES.sharpness.range.max,
						default: MODEL_VALUES.sharpness.range.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
			}
		}

		if (MODEL_VALUES?.stabilizer) {
			actions['stabilizer'] = {
				label: 'Picture Setup - Stabilizer',
				options: [
					{
						type: 'dropdown',
						label: 'On / Off',
						id: 'val',
						choices: MODEL_VALUES.stabilizer.choices,
						default: MODEL_VALUES.stabilizer.default,
					},
				],
			}
		}

		if (MODEL_VALUES?.threed_nr) {
			actions['threed_nr'] = {
				label: 'Picture Setup - 3D Noise Reduction',
				options: [
					{
						type: 'dropdown',
						label: '3D NR',
						id: 'val',
						choices: MODEL_VALUES.threed_nr.choices,
						default: MODEL_VALUES.threed_nr.default,
					},
				],
			}
		}

		if (MODEL_VALUES?.twod_nr) {
			actions['twod_nr'] = {
				label: 'Picture Setup - 2D Noise Reduction',
				options: [
					{
						type: 'dropdown',
						label: '2D NR',
						id: 'val',
						choices: MODEL_VALUES.twod_nr.choices,
						default: MODEL_VALUES.twod_nr.default,
					},
				],
			}
		}

		if (MODEL_VALUES?.wide_dynamic_range) {
			actions['wide_dynamic_range'] = {
				label: 'Picture Setup - Wide Dynamic Range',
				options: [
					{
						type: 'dropdown',
						label: 'Wide Dynamic Range',
						id: 'val',
						choices: MODEL_VALUES.wide_dynamic_range.choices,
						default: MODEL_VALUES.wide_dynamic_range.default,
					},
				],
			}
		}

		// Color Matrix Actions

		if (MODEL_VALUES?.cm_blue_gain) {
			actions['cm_blue_gain'] = {
				label: 'Color Matrix - Blue Gain',
				options: [
					{
						type: 'dropdown',
						label: 'Blue Gain',
						id: 'val',
						choices: MODEL_VALUES.cm_blue_gain.choices,
						default: MODEL_VALUES.cm_blue_gain.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_VALUES.cm_blue_gain.range.min + ' to ' + MODEL_VALUES.cm_blue_gain.range.max + ')',
						id: 'value',
						min: MODEL_VALUES.cm_blue_gain.range.min,
						max: MODEL_VALUES.cm_blue_gain.range.max,
						default: MODEL_VALUES.cm_blue_gain.range.default,
						isVisible: (action) => action.options.val == 'value',
					},
				],
			}
		}

		if (MODEL_VALUES?.cm_blue_hue) {
			actions['cm_blue_hue'] = {
				label: 'Color Matrix - Blue Hue',
				options: [
					{
						type: 'dropdown',
						label: 'Blue Hue',
						id: 'val',
						choices: MODEL_VALUES.cm_blue_hue.choices,
						default: MODEL_VALUES.cm_blue_hue.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_VALUES.cm_blue_hue.range.min + ' to ' + MODEL_VALUES.cm_blue_hue.range.max + ')',
						id: 'value',
						min: MODEL_VALUES.cm_blue_hue.range.min,
						max: MODEL_VALUES.cm_blue_hue.range.max,
						default: MODEL_VALUES.cm_blue_hue.range.default,
						isVisible: (action) => action.options.val == 'value',
					},
				],
			}
		}

		if (MODEL_VALUES?.cm_color_gain) {
			actions['cm_color_gain'] = {
				label: 'Color Matrix - Color Gain',
				options: [
					{
						type: 'dropdown',
						label: 'Color Gain',
						id: 'val',
						choices: MODEL_VALUES.cm_color_gain.choices,
						default: MODEL_VALUES.cm_color_gain.default,
					},
					{
						type: 'number',
						label:
							'Value (' + MODEL_VALUES.cm_color_gain.range.min + ' to ' + MODEL_VALUES.cm_color_gain.range.max + ')',
						id: 'value',
						min: MODEL_VALUES.cm_color_gain.range.min,
						max: MODEL_VALUES.cm_color_gain.range.max,
						default: MODEL_VALUES.cm_color_gain.range.default,
						isVisible: (action) => action.options.val == 'value',
					},
				],
			}
		}

		if (MODEL_VALUES?.cm_cyan_gain) {
			actions['cm_cyan_gain'] = {
				label: 'Color Matrix - Cyan Gain',
				options: [
					{
						type: 'dropdown',
						label: 'Cyan Gain',
						id: 'val',
						choices: MODEL_VALUES.cm_cyan_gain.choices,
						default: MODEL_VALUES.cm_cyan_gain.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_VALUES.cm_cyan_gain.range.min + ' to ' + MODEL_VALUES.cm_cyan_gain.range.max + ')',
						id: 'value',
						min: MODEL_VALUES.cm_cyan_gain.range.min,
						max: MODEL_VALUES.cm_cyan_gain.range.max,
						default: MODEL_VALUES.cm_cyan_gain.range.default,
						isVisible: (action) => action.options.val == 'value',
					},
				],
			}
		}

		if (MODEL_VALUES?.cm_cyan_hue) {
			actions['cm_cyan_hue'] = {
				label: 'Color Matrix - Cyan Hue',
				options: [
					{
						type: 'dropdown',
						label: 'Cyan Hue',
						id: 'val',
						choices: MODEL_VALUES.cm_cyan_hue.choices,
						default: MODEL_VALUES.cm_cyan_hue.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_VALUES.cm_cyan_hue.range.min + ' to ' + MODEL_VALUES.cm_cyan_hue.range.max + ')',
						id: 'value',
						min: MODEL_VALUES.cm_cyan_hue.range.min,
						max: MODEL_VALUES.cm_cyan_hue.range.max,
						default: MODEL_VALUES.cm_cyan_hue.range.default,
						isVisible: (action) => action.options.val == 'value',
					},
				],
			}
		}

		if (MODEL_VALUES?.cm_green_gain) {
			actions['cm_green_gain'] = {
				label: 'Color Matrix - Green Gain',
				options: [
					{
						type: 'dropdown',
						label: 'Green Gain',
						id: 'val',
						choices: MODEL_VALUES.cm_green_gain.choices,
						default: MODEL_VALUES.cm_green_gain.default,
					},
					{
						type: 'number',
						label:
							'Value (' + MODEL_VALUES.cm_green_gain.range.min + ' to ' + MODEL_VALUES.cm_green_gain.range.max + ')',
						id: 'value',
						min: MODEL_VALUES.cm_green_gain.range.min,
						max: MODEL_VALUES.cm_green_gain.range.max,
						default: MODEL_VALUES.cm_green_gain.range.default,
						isVisible: (action) => action.options.val == 'value',
					},
				],
			}
		}

		if (MODEL_VALUES?.cm_green_hue) {
			actions['cm_green_hue'] = {
				label: 'Color Matrix - Green Hue',
				options: [
					{
						type: 'dropdown',
						label: 'Green Hue',
						id: 'val',
						choices: MODEL_VALUES.cm_green_hue.choices,
						default: MODEL_VALUES.cm_green_hue.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_VALUES.cm_green_hue.range.min + ' to ' + MODEL_VALUES.cm_green_hue.range.max + ')',
						id: 'value',
						min: MODEL_VALUES.cm_green_hue.range.min,
						max: MODEL_VALUES.cm_green_hue.range.max,
						default: MODEL_VALUES.cm_green_hue.range.default,
						isVisible: (action) => action.options.val == 'value',
					},
				],
			}
		}

		if (MODEL_VALUES?.cm_hue_phase) {
			actions['cm_hue_phase'] = {
				label: 'Color Matrix - Hue Phase',
				options: [
					{
						type: 'dropdown',
						label: 'Hue Phase',
						id: 'val',
						choices: MODEL_VALUES.cm_hue_phase.choices,
						default: MODEL_VALUES.cm_hue_phase.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_VALUES.cm_hue_phase.range.min + ' to ' + MODEL_VALUES.cm_hue_phase.range.max + ')',
						id: 'value',
						min: MODEL_VALUES.cm_hue_phase.range.min,
						max: MODEL_VALUES.cm_hue_phase.range.max,
						default: MODEL_VALUES.cm_hue_phase.range.default,
						isVisible: (action) => action.options.val == 'value',
					},
				],
			}
		}

		if (MODEL_VALUES?.cm_mag_gain) {
			actions['cm_mag_gain'] = {
				label: 'Color Matrix - Magenta Gain',
				options: [
					{
						type: 'dropdown',
						label: 'Magenta Gain',
						id: 'val',
						choices: MODEL_VALUES.cm_mag_gain.choices,
						default: MODEL_VALUES.cm_mag_gain.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_VALUES.cm_mag_gain.range.min + ' to ' + MODEL_VALUES.cm_mag_gain.range.max + ')',
						id: 'value',
						min: MODEL_VALUES.cm_mag_gain.range.min,
						max: MODEL_VALUES.cm_mag_gain.range.max,
						default: MODEL_VALUES.cm_mag_gain.range.default,
						isVisible: (action) => action.options.val == 'value',
					},
				],
			}
		}

		if (MODEL_VALUES?.cm_mag_hue) {
			actions['cm_mag_hue'] = {
				label: 'Color Matrix - Magenta Hue',
				options: [
					{
						type: 'dropdown',
						label: 'Magenta Hue',
						id: 'val',
						choices: MODEL_VALUES.cm_mag_hue.choices,
						default: MODEL_VALUES.cm_mag_hue.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_VALUES.cm_mag_hue.range.min + ' to ' + MODEL_VALUES.cm_mag_hue.range.max + ')',
						id: 'value',
						min: MODEL_VALUES.cm_mag_hue.range.min,
						max: MODEL_VALUES.cm_mag_hue.range.max,
						default: MODEL_VALUES.cm_mag_hue.range.default,
						isVisible: (action) => action.options.val == 'value',
					},
				],
			}
		}

		if (MODEL_VALUES?.cm_red_gain) {
			actions['cm_red_gain'] = {
				label: 'Color Matrix - Red Gain',
				options: [
					{
						type: 'dropdown',
						label: 'Red Gain',
						id: 'val',
						choices: MODEL_VALUES.cm_red_gain.choices,
						default: MODEL_VALUES.cm_red_gain.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_VALUES.cm_red_gain.range.min + ' to ' + MODEL_VALUES.cm_red_gain.range.max + ')',
						id: 'value',
						min: MODEL_VALUES.cm_red_gain.range.min,
						max: MODEL_VALUES.cm_red_gain.range.max,
						default: MODEL_VALUES.cm_red_gain.range.default,
						isVisible: (action) => action.options.val == 'value',
					},
				],
			}
		}

		if (MODEL_VALUES?.cm_red_hue) {
			actions['cm_red_hue'] = {
				label: 'Color Matrix - Red Hue',
				options: [
					{
						type: 'dropdown',
						label: 'Red Hue',
						id: 'val',
						choices: MODEL_VALUES.cm_red_hue.choices,
						default: MODEL_VALUES.cm_red_hue.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_VALUES.cm_red_hue.range.min + ' to ' + MODEL_VALUES.cm_red_hue.range.max + ')',
						id: 'value',
						min: MODEL_VALUES.cm_red_hue.range.min,
						max: MODEL_VALUES.cm_red_hue.range.max,
						default: MODEL_VALUES.cm_red_hue.range.default,
						isVisible: (action) => action.options.val == 'value',
					},
				],
			}
		}

		if (MODEL_VALUES?.cm_yellow_gain) {
			actions['cm_yellow_gain'] = {
				label: 'Color Matrix - Yellow Gain',
				options: [
					{
						type: 'dropdown',
						label: 'Yellow Gain',
						id: 'val',
						choices: MODEL_VALUES.cm_yellow_gain.choices,
						default: MODEL_VALUES.cm_yellow_gain.default,
					},
					{
						type: 'number',
						label:
							'Value (' + MODEL_VALUES.cm_yellow_gain.range.min + ' to ' + MODEL_VALUES.cm_yellow_gain.range.max + ')',
						id: 'value',
						min: MODEL_VALUES.cm_yellow_gain.range.min,
						max: MODEL_VALUES.cm_yellow_gain.range.max,
						default: MODEL_VALUES.cm_yellow_gain.range.default,
						isVisible: (action) => action.options.val == 'value',
					},
				],
			}
		}

		if (MODEL_VALUES?.cm_yellow_hue) {
			actions['cm_yellow_hue'] = {
				label: 'Color Matrix - Yellow Hue',
				options: [
					{
						type: 'dropdown',
						label: 'Yellow Hue',
						id: 'val',
						choices: MODEL_VALUES.cm_yellow_hue.choices,
						default: MODEL_VALUES.cm_yellow_hue.default,
					},
					{
						type: 'number',
						label:
							'Value (' + MODEL_VALUES.cm_yellow_hue.range.min + ' to ' + MODEL_VALUES.cm_yellow_hue.range.max + ')',
						id: 'value',
						min: MODEL_VALUES.cm_yellow_hue.range.min,
						max: MODEL_VALUES.cm_yellow_hue.range.max,
						default: MODEL_VALUES.cm_yellow_hue.range.default,
						isVisible: (action) => action.options.val == 'value',
					},
				],
			}
		}

		// Advanced Setup Actions

		if (MODEL_VALUES?.brightness) {
			actions['brightness'] = {
				label: 'Advanced Setup - Brightness',
				options: [
					{
						type: 'dropdown',
						label: 'Brightness',
						id: 'val',
						choices: MODEL_VALUES.brightness.choices,
						default: MODEL_VALUES.brightness.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_VALUES.brightness.range.min + ' to ' + MODEL_VALUES.brightness.range.max + ')',
						id: 'value',
						min: MODEL_VALUES.brightness.range.min,
						max: MODEL_VALUES.brightness.range.max,
						default: MODEL_VALUES.brightness.range.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
			}
		}

		if (MODEL_VALUES?.brightness_comp) {
			actions['brightness_comp'] = {
				label: 'Advanced Setup - Brightness Compensation',
				options: [
					{
						type: 'dropdown',
						label: 'Mode',
						id: 'val',
						choices: MODEL_VALUES.brightness_comp.choices,
						default: MODEL_VALUES.brightness_comp.default,
					},
				],
			}
		}

		if (MODEL_VALUES?.comp_level) {
			actions['comp_level'] = {
				label: 'Advanced Setup - Compensation Level',
				options: [
					{
						type: 'dropdown',
						label: 'Level',
						id: 'val',
						choices: MODEL_VALUES.comp_level.choices,
						default: MODEL_VALUES.comp_level.default,
					},
				],
			}
		}

		if (MODEL_VALUES?.gamma_offset) {
			actions['gamma_offset'] = {
				label: 'Advanced Setup - Gamma Offset',
				options: [
					{
						type: 'dropdown',
						label: 'Gamma Offset',
						id: 'val',
						choices: MODEL_VALUES.gamma_offset.choices,
						default: MODEL_VALUES.gamma_offset.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_VALUES.gamma_offset.range.min + ' to ' + MODEL_VALUES.gamma_offset.range.max + ')',
						id: 'value',
						min: MODEL_VALUES.gamma_offset.range.min,
						max: MODEL_VALUES.gamma_offset.range.max,
						default: MODEL_VALUES.gamma_offset.range.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
			}
		}

		if (MODEL_VALUES?.high_resolution) {
			actions['high_resolution'] = {
				label: 'Advanced Setup - High Resolution',
				options: [
					{
						type: 'dropdown',
						label: 'On / Off',
						id: 'val',
						choices: MODEL_VALUES.high_resolution.choices,
						default: MODEL_VALUES.high_resolution.default,
					},
				],
			}
		}

		if (MODEL_VALUES?.video_enhancement) {
			actions['video_enhancement'] = {
				label: 'Advanced Setup - Video Enhancement',
				options: [
					{
						type: 'dropdown',
						label: 'On / Off',
						id: 'val',
						choices: MODEL_VALUES.video_enhancement.choices,
						default: MODEL_VALUES.video_enhancement.default,
					},
				],
			}
		}

		// External Setup Actions

		if (MODEL_VALUES?.aux) {
			actions['aux'] = {
				label: 'External Setup - Aux',
				options: [
					{
						type: 'dropdown',
						label: 'On / Off',
						id: 'val',
						choices: MODEL_VALUES.aux.choices,
						default: MODEL_VALUES.aux.default,
					},
				],
			}
		}

		if (MODEL_VALUES?.rain_wiper) {
			actions['rain_wiper'] = {
				label: 'External Setup - Rain Wiper',
				options: [
					{
						type: 'dropdown',
						label: 'On / Off',
						id: 'val',
						choices: MODEL_VALUES.rain_wiper.choices,
						default: MODEL_VALUES.rain_wiper.default,
					},
				],
			}
		}

		if (MODEL_VALUES?.v12vout) {
			actions['v12vout'] = {
				label: 'External Setup - 12v Out',
				options: [
					{
						type: 'dropdown',
						label: 'On / Off',
						id: 'val',
						choices: MODEL_VALUES.v12vout.choices,
						default: MODEL_VALUES.v12vout.default,
					},
				],
			}
		}

		// Detail Setup Actions

		if (MODEL_VALUES?.bandwidth) {
			actions['bandwidth'] = {
				label: 'Detail Setup - Bandwidth',
				options: [
					{
						type: 'dropdown',
						label: 'Mode',
						id: 'val',
						choices: MODEL_VALUES.bandwidth.choices,
						default: MODEL_VALUES.bandwidth.default,
					},
				],
			}
		}

		if (MODEL_VALUES?.bw_balance) {
			actions['bw_balance'] = {
				label: 'Detail Setup - BW Balance',
				options: [
					{
						type: 'dropdown',
						label: 'Mode',
						id: 'val',
						choices: MODEL_VALUES.bw_balance.choices,
						default: MODEL_VALUES.bw_balance.default,
					},
				],
			}
		}

		if (MODEL_VALUES?.crispening) {
			actions['crispening'] = {
				label: 'Detail Setup - Crispening',
				options: [
					{
						type: 'dropdown',
						label: 'Crispening',
						id: 'val',
						choices: MODEL_VALUES.crispening.choices,
						default: MODEL_VALUES.crispening.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_VALUES.crispening.range.min + ' to ' + MODEL_VALUES.crispening.range.max + ')',
						id: 'value',
						min: MODEL_VALUES.crispening.range.min,
						max: MODEL_VALUES.crispening.range.max,
						default: MODEL_VALUES.crispening.range.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
			}
		}

		if (MODEL_VALUES?.detail) {
			actions['detail'] = {
				label: 'Detail Setup - Detail',
				options: [
					{
						type: 'dropdown',
						label: 'On / Off',
						id: 'val',
						choices: MODEL_VALUES.detail.choices,
						default: MODEL_VALUES.detail.default,
					},
				],
			}
		}

		if (MODEL_VALUES?.highlight_detail) {
			actions['highlight_detail'] = {
				label: 'Detail Setup - Highlight Detail',
				options: [
					{
						type: 'dropdown',
						label: 'Highlight Detail',
						id: 'val',
						choices: MODEL_VALUES.highlight_detail.choices,
						default: MODEL_VALUES.highlight_detail.default,
					},
					{
						type: 'number',
						label:
							'Value (' +
							MODEL_VALUES.highlight_detail.range.min +
							' to ' +
							MODEL_VALUES.highlight_detail.range.max +
							')',
						id: 'value',
						min: MODEL_VALUES.highlight_detail.range.min,
						max: MODEL_VALUES.highlight_detail.range.max,
						default: MODEL_VALUES.highlight_detail.range.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
			}
		}

		if (MODEL_VALUES?.hv_balance) {
			actions['hv_balance'] = {
				label: 'Detail Setup - Hv Balance',
				options: [
					{
						type: 'dropdown',
						label: 'Hv Balance',
						id: 'val',
						choices: MODEL_VALUES.hv_balance.choices,
						default: MODEL_VALUES.hv_balance.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_VALUES.hv_balance.range.min + ' to ' + MODEL_VALUES.hv_balance.range.max + ')',
						id: 'value',
						min: MODEL_VALUES.hv_balance.range.min,
						max: MODEL_VALUES.hv_balance.range.max,
						default: MODEL_VALUES.hv_balance.range.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
			}
		}

		if (MODEL_VALUES?.limit) {
			actions['limit'] = {
				label: 'Detail Setup - Limit',
				options: [
					{
						type: 'dropdown',
						label: 'Limit',
						id: 'val',
						choices: MODEL_VALUES.limit.choices,
						default: MODEL_VALUES.limit.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_VALUES.limit.range.min + ' to ' + MODEL_VALUES.limit.range.max + ')',
						id: 'value',
						min: MODEL_VALUES.limit.range.min,
						max: MODEL_VALUES.limit.range.max,
						default: MODEL_VALUES.limit.range.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
			}
		}

		if (MODEL_VALUES?.super_low) {
			actions['super_low'] = {
				label: 'Detail Setup - Super Low',
				options: [
					{
						type: 'dropdown',
						label: 'Super Low',
						id: 'val',
						choices: MODEL_VALUES.super_low.choices,
						default: MODEL_VALUES.super_low.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_VALUES.super_low.range.min + ' to ' + MODEL_VALUES.super_low.range.max + ')',
						id: 'value',
						min: MODEL_VALUES.super_low.range.min,
						max: MODEL_VALUES.super_low.range.max,
						default: MODEL_VALUES.super_low.range.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
			}
		}

		// Gamma Setup Actions

		if (MODEL_VALUES?.black_gamma_level) {
			actions['black_gamma_level'] = {
				label: 'Gamma Setup - Black Gamma Level',
				options: [
					{
						type: 'dropdown',
						label: 'Black Gamma Level',
						id: 'val',
						choices: MODEL_VALUES.black_gamma_level.choices,
						default: MODEL_VALUES.black_gamma_level.default,
					},
					{
						type: 'number',
						label:
							'Value (' +
							MODEL_VALUES.black_gamma_level.range.min +
							' to ' +
							MODEL_VALUES.black_gamma_level.range.max +
							')',
						id: 'value',
						min: MODEL_VALUES.black_gamma_level.range.min,
						max: MODEL_VALUES.black_gamma_level.range.max,
						default: MODEL_VALUES.black_gamma_level.range.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
			}
		}

		if (MODEL_VALUES?.black_level) {
			actions['black_level'] = {
				label: 'Gamma Setup - Black Level',
				options: [
					{
						type: 'dropdown',
						label: 'Black Level',
						id: 'val',
						choices: MODEL_VALUES.black_level.choices,
						default: MODEL_VALUES.black_level.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_VALUES.black_level.range.min + ' to ' + MODEL_VALUES.black_level.range.max + ')',
						id: 'value',
						min: MODEL_VALUES.black_level.range.min,
						max: MODEL_VALUES.black_level.range.max,
						default: MODEL_VALUES.black_level.range.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
			}
		}

		if (MODEL_VALUES?.black_level_range) {
			actions['black_level_range'] = {
				label: 'Gamma Setup - Black Level Range',
				options: [
					{
						type: 'dropdown',
						label: 'Black Level Range',
						id: 'val',
						choices: MODEL_VALUES.black_level_range.choices,
						default: MODEL_VALUES.black_level_range.default,
					},
				],
			}
		}

		if (MODEL_VALUES?.effect) {
			actions['effect'] = {
				label: 'Gamma Setup - Effect',
				options: [
					{
						type: 'dropdown',
						label: 'Effect',
						id: 'val',
						choices: MODEL_VALUES.effect.choices,
						default: MODEL_VALUES.effect.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_VALUES.effect.range.min + ' to ' + MODEL_VALUES.effect.range.max + ')',
						id: 'value',
						min: MODEL_VALUES.effect.range.min,
						max: MODEL_VALUES.effect.range.max,
						default: MODEL_VALUES.effect.range.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
			}
		}

		if (MODEL_VALUES?.level) {
			actions['level'] = {
				label: 'Gamma Setup - Level',
				options: [
					{
						type: 'dropdown',
						label: 'Level',
						id: 'val',
						choices: MODEL_VALUES.level.choices,
						default: MODEL_VALUES.level.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_VALUES.level.range.min + ' to ' + MODEL_VALUES.level.range.max + ')',
						id: 'value',
						min: MODEL_VALUES.level.range.min,
						max: MODEL_VALUES.level.range.max,
						default: MODEL_VALUES.level.range.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
			}
		}

		if (MODEL_VALUES?.offset) {
			actions['offset'] = {
				label: 'Gamma Setup - Offset',
				options: [
					{
						type: 'dropdown',
						label: 'Offset',
						id: 'val',
						choices: MODEL_VALUES.offset.choices,
						default: MODEL_VALUES.offset.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_VALUES.offset.range.min + ' to ' + MODEL_VALUES.offset.range.max + ')',
						id: 'value',
						min: MODEL_VALUES.offset.range.min,
						max: MODEL_VALUES.offset.range.max,
						default: MODEL_VALUES.offset.range.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
			}
		}

		if (MODEL_VALUES?.pattern) {
			actions['pattern'] = {
				label: 'Gamma Setup - Pattern',
				options: [
					{
						type: 'dropdown',
						label: 'Pattern',
						id: 'val',
						choices: MODEL_VALUES.pattern.choices,
						default: MODEL_VALUES.pattern.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_VALUES.pattern.range.min + ' to ' + MODEL_VALUES.pattern.range.max + ')',
						id: 'value',
						min: MODEL_VALUES.pattern.range.min,
						max: MODEL_VALUES.pattern.range.max,
						default: MODEL_VALUES.pattern.range.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
			}
		}

		if (MODEL_VALUES?.pattern_fine) {
			actions['pattern_fine'] = {
				label: 'Gamma Setup - Pattern Fine',
				options: [
					{
						type: 'dropdown',
						label: 'Pattern Fine',
						id: 'val',
						choices: MODEL_VALUES.pattern_fine.choices,
						default: MODEL_VALUES.pattern_fine.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_VALUES.pattern_fine.range.min + ' to ' + MODEL_VALUES.pattern_fine.range.max + ')',
						id: 'value',
						min: MODEL_VALUES.pattern_fine.range.min,
						max: MODEL_VALUES.pattern_fine.range.max,
						default: MODEL_VALUES.pattern_fine.range.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
			}
		}

		if (MODEL_VALUES?.settings) {
			actions['settings'] = {
				label: 'Gamma Setup - Settings',
				options: [
					{
						type: 'dropdown',
						label: 'Settings',
						id: 'val',
						choices: MODEL_VALUES.settings.choices,
						default: MODEL_VALUES.settings.default,
					},
				],
			}
		}

		if (MODEL_VALUES?.visibility_enhancer) {
			actions['visibility_enhancer'] = {
				label: 'Gamma Setup - Visibility Enhancer',
				options: [
					{
						type: 'dropdown',
						label: 'Settings',
						id: 'val',
						choices: MODEL_VALUES.visibility_enhancer.choices,
						default: MODEL_VALUES.visibility_enhancer.default,
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
		if (MODEL_VALUES?.defog) {
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
		if (MODEL_VALUES?.hrMode) {
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
		return Object.fromEntries(Object.entries(actions).sort(sortByLabel))
	},
}
