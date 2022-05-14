const { sortByLabel } = require('./utils')
var { MODELS } = require('./models.js')
const CHOICES = require('./choices.js')

exports.initFeedbacks = function () {
	const ColorWhite = this.rgb(255, 255, 255) // White
	const ColorBlack = this.rgb(0, 0, 0) // Black
	const ColorRed = this.rgb(255, 0, 0) // Red
	const ColorGreen = this.rgb(0, 255, 0) // Green
	const ColorOrange = this.rgb(255, 102, 0) // Orange

	MODEL_VALUES = MODELS.find((MODELS) => MODELS.id == this.camera.model)?.actions

	const feedbacks = {}

	// General Camera Feedback

	if (MODEL_VALUES?.standby) {
		feedbacks.standby_status = {
			type: 'boolean',
			label: 'VISCA - Standby On/Off',
			description: 'If the camera is in standby, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'On/Standby',
					id: 'val',
					choices: MODEL_VALUES.standby.choices,
					default: MODEL_VALUES.standby.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.standby == feedback.options.val
			},
		}
	}

	if (MODEL_VALUES?.freeze) {
		feedbacks.freeze_status = {
			type: 'boolean',
			label: 'VISCA - Freeze',
			description: 'If the camera matches the selected freeze status, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'On / Off',
					id: 'val',
					choices: MODEL_VALUES.freeze.choices,
					default: MODEL_VALUES.freeze.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.freeze == feedback.options.val
			},
		}
	}
	// Analog Audio Feedback

	if (MODEL_VALUES?.analogAudioInGain) {
		feedbacks.analogAudioInGain = {
			type: 'boolean',
			label: 'Analog Audio - Analog Audio In Gain',
			description: 'If the camera matches the selected Audio Out Gain, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
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
			callback: (feedback) => {
				return this.camera?.audio?.AnalogAudioInGain == feedback.options.val
			},
		}
	}

	if (MODEL_VALUES?.analogAudioOutGain) {
		feedbacks.analogAudioOutGain = {
			type: 'boolean',
			label: 'Analog Audio - Analog Audio Out Gain',
			description: 'If the camera matches the selected Audio Out Gain, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
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
			callback: (feedback) => {
				return this.camera?.audio?.AnalogAudioOutGain == feedback.options.val
			},
		}
	}

	if (MODEL_VALUES?.analogAudioOutput) {
		feedbacks.analogAudioOutput = {
			type: 'boolean',
			label: 'Analog Audio - Analog Audio Output Select',
			description: 'If the camera matches the selected audio ouptut selector, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Decode Comms / Decode Loop',
					id: 'val',
					choices: MODEL_VALUES.analogAudioOutput.choices,
					default: MODEL_VALUES.analogAudioOutput.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.audio?.AnalogAudiooutputselect == feedback.options.val
			},
		}
	}

	// Video Output Interface Feedback

	if (MODEL_VALUES?.video_output) {
		feedbacks.video_output = {
			type: 'boolean',
			label: 'Video Output - Video Mode',
			description: 'If the camera matches the selected Video Output mode, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Mode',
					id: 'val',
					choices: MODEL_VALUES.video_output.choices,
					default: MODEL_VALUES.video_output.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.video?.videooutput == feedback.options.val
			},
		}
	}

	// Encode Setup Feedback

	if (MODEL_VALUES?.bandwidth_mode) {
		feedbacks.bandwidth_mode = {
			type: 'boolean',
			label: 'Encode Setup - Bandwidth Mode',
			description: 'If the camera matches the selected encode bandwidth mode, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Manual / NDI Managed',
					id: 'val',
					choices: MODEL_VALUES.bandwidth_mode.choices,
					default: MODEL_VALUES.bandwidth_mode.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.encode?.BandwidthMode == feedback.options.val
			},
		}
	}

	if (MODEL_VALUES?.ndiAudio) {
		feedbacks.ndiAudio = {
			type: 'boolean',
			label: 'Encode Setup - NDI Audio',
			description: 'If the camera matches the selected NDI Audio selector, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Analog / Mute',
					id: 'val',
					choices: MODEL_VALUES.ndiAudio.choices,
					default: MODEL_VALUES.ndiAudio.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.encode?.NDIAudio == feedback.options.val
			},
		}
	}

	if (MODEL_VALUES?.ndiGroupEnable) {
		feedbacks.ndiGroupEnable = {
			type: 'boolean',
			label: 'Encode Setup - NDI Group Enable',
			description: 'If the camera matches the selected NDI Group Enable  selector, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'NDI Group Enable',
					id: 'val',
					choices: MODEL_VALUES.ndiGroupEnable.choices,
					default: MODEL_VALUES.ndiGroupEnable.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.encode?.NDIGroup == feedback.options.val
			},
		}
	}

	if (MODEL_VALUES?.tally) {
		feedbacks.tally = {
			type: 'boolean',
			label: 'Encode Setup - Tally Mode',
			description: 'If the camera tally matches the selected mode, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Mode',
					id: 'mode',
					choices: MODEL_VALUES.tally.choices,
					default: MODEL_VALUES.tally.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.encode?.TallyMode == feedback.options.mode
			},
		}
	}

	// Encode Transport Feedback

	if (MODEL_VALUES?.transmit_method) {
		feedbacks.transmit_method = {
			type: 'boolean',
			label: 'Encode Transport - Transmit Method',
			description: 'If the camera matches the selected transmit method, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Method',
					id: 'val',
					choices: MODEL_VALUES.transmit_method.choices,
					default: MODEL_VALUES.transmit_method.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.transport?.txpm == feedback.options.val
			},
		}
	}

	// NDI Discovery Server Feedback

	if (MODEL_VALUES?.ndi_discovery_server) {
		feedbacks.ndi_discovery_server = {
			type: 'boolean',
			label: 'NDI Discovery - Server',
			description: 'If the camera matches the selected NDI Discovery Server status, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Enabled / Disabled',
					id: 'val',
					choices: MODEL_VALUES.ndi_discovery_server.choices,
					default: MODEL_VALUES.ndi_discovery_server.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.ndiserver?.NDIDisServ == feedback.options.val
			},
		}
	}

	// PTZ Feedback

	if (MODEL_VALUES?.pt) {
		feedbacks.posPan = {
			type: 'boolean',
			label: 'PTZ - Pan Position',
			description: 'If the camera matches the selected Pan Position, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Pan Position',
					id: 'posPan',
					choices: MODEL_VALUES.pt.posPanChoices,
					default: MODEL_VALUES.pt.posPanDefault,
				},
			],
			callback: (feedback) => {
				return this.camera?.position?.pan == feedback.options.posPan
			},
		}

		feedbacks.posTilt = {
			type: 'boolean',
			label: 'PTZ - Tilt Position',
			description: 'If the camera matches the selected Tilt Position, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Tilt Position',
					id: 'posTilt',
					choices: MODEL_VALUES.pt.posTiltChoices,
					default: MODEL_VALUES.pt.posTiltDefault,
				},
			],
			callback: (feedback) => {
				return this.camera?.position?.tilt == feedback.options.posTilt
			},
		}
	}

	if (MODEL_VALUES?.zoom) {
		feedbacks.posZoom = {
			type: 'boolean',
			label: 'PTZ - Zoom Position',
			description: 'If the camera matches the selected Zoom Position, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Zoom Position',
					id: 'posZoom',
					choices: MODEL_VALUES.zoom.posZoomChoices,
					default: MODEL_VALUES.zoom.posZoomDefault,
				},
			],
			callback: (feedback) => {
				return this.camera?.position?.zoom == feedback.options.posZoom
			},
		}
	}

	if (MODEL_VALUES?.panSpeed) {
		feedbacks.panSpeed = {
			type: 'boolean',
			label: 'PTZ - Pan Speed',
			description: 'If the camera matches the selected Pan Speed, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Speed (' + MODEL_VALUES.panSpeed.range.min + ' to ' + MODEL_VALUES.panSpeed.range.max + ')',
					id: 'value',
					default: MODEL_VALUES.panSpeed.range.default,
					min: MODEL_VALUES.panSpeed.range.min,
					max: MODEL_VALUES.panSpeed.range.max,
				},
			],
			callback: (feedback) => {
				return this.camera?.ptz?.PanSpeed == feedback.options.value
			},
		}
	}

	if (MODEL_VALUES?.tiltSpeed) {
		feedbacks.tiltSpeed = {
			type: 'boolean',
			label: 'PTZ - Tilt Speed',
			description: 'If the camera matches the selected Tilt Speed, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Speed (' + MODEL_VALUES.tiltSpeed.range.min + ' to ' + MODEL_VALUES.tiltSpeed.range.max + ')',
					id: 'value',
					default: MODEL_VALUES.tiltSpeed.range.default,
					min: MODEL_VALUES.tiltSpeed.range.min,
					max: MODEL_VALUES.tiltSpeed.range.max,
				},
			],
			callback: (feedback) => {
				return this.camera?.ptz?.PanSpeed == feedback.options.value
			},
		}
	}

	if (MODEL_VALUES?.zoomSpeed) {
		feedbacks.zoomSpeed = {
			type: 'boolean',
			label: 'PTZ - Zoom Speed',
			description: 'If the camera matches the selected Zoom Speed, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Speed (' + MODEL_VALUES.zoomSpeed.range.min + ' to ' + MODEL_VALUES.zoomSpeed.range.max + ')',
					id: 'value',
					default: MODEL_VALUES.zoomSpeed.range.default,
					min: MODEL_VALUES.zoomSpeed.range.min,
					max: MODEL_VALUES.zoomSpeed.range.max,
				},
			],
			callback: (feedback) => {
				return this.camera?.ptz?.PanSpeed == feedback.options.value
			},
		}
	}

	// Focus Feedback

	if (MODEL_VALUES?.focusM) {
		feedbacks.focusMode = {
			type: 'boolean',
			label: 'Focus - Focus Mode',
			description: 'If the camera matches the selected focus mode, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Mode',
					id: 'val',
					choices: MODEL_VALUES.focusM.choices,
					default: MODEL_VALUES.focusM.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.focus?.mode == feedback.options.mode
			},
		}
	}

	// Exposure Feedback

	if (MODEL_VALUES?.ae_response) {
		feedbacks.ae_response = {
			type: 'boolean',
			label: 'Exposure - Ae Response Level',
			description: 'If the camera matches the selected Ae Response level, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
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
			callback: (feedback) => {
				return this.camera?.expsetup?.AeResponse == feedback.options.level
			},
		}
	}

	if (MODEL_VALUES?.backlight) {
		feedbacks.backlight = {
			type: 'boolean',
			label: 'Exposure - Backlight',
			description: 'If the camera has Backlight on, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'On / Off',
					id: 'mode',
					choices: MODEL_VALUES.backlight.choices,
					default: MODEL_VALUES.backlight.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.expsetup?.BackLight == feedback.options.mode
			},
		}
	}

	if (MODEL_VALUES?.bright_level) {
		feedbacks.bright_level = {
			type: 'boolean',
			label: 'Exposure - Bright Level',
			description: 'If the camera matches the selected Bright Level, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
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
			callback: (feedback) => {
				return this.camera?.expsetup?.BrightLevel == feedback.options.level
			},
		}
	}

	if (MODEL_VALUES?.expComp) {
		feedbacks.exposureCompEn = {
			type: 'boolean',
			label: 'Exposure - Exposure Compensation',
			description: 'If the camera matches the selected exposure compensation status, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'On / Off',
					id: 'mode',
					choices: MODEL_VALUES.expComp.choices,
					default: MODEL_VALUES.expComp.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.expsetup?.ExpCompEn == feedback.options.mode
			},
		}
	}

	if (MODEL_VALUES?.expCompLvl) {
		feedbacks.exposureCompLvl = {
			type: 'boolean',
			label: 'Exposure - Exposure Compensation Level',
			description: 'If the camera matches the selected exposure compensation level, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
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
				},
			],
			callback: (feedback) => {
				return this.camera?.expsetup?.ExpCompLvl == feedback.options.level
			},
		}
	}

	if (MODEL_VALUES?.exposure_mode) {
		feedbacks.exposureMode = {
			type: 'boolean',
			label: 'Exposure - Exposure Mode',
			description: 'If the camera matches the selected exposure mode, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Mode',
					id: 'mode',
					choices: MODEL_VALUES.exposure_mode.choices,
					default: MODEL_VALUES.exposure_mode.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.expsetup?.ExpMode == feedback.options.mode
			},
		}
	}

	if (MODEL_VALUES?.gain) {
		feedbacks.gain = {
			type: 'boolean',
			label: 'Exposure - Gain',
			description: 'If the camera matches the selected gain, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Gain (dB)',
					id: 'gain',
					choices: MODEL_VALUES.gain.choices,
					default: MODEL_VALUES.gain.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.expsetup?.GainLevel == feedback.options.gain
			},
		}
	}

	if (MODEL_VALUES?.gain_limit) {
		feedbacks.gain_limit = {
			type: 'boolean',
			label: 'Exposure - Gain Limit',
			description: 'If the camera matches the selected gain limit, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Gain Limit (dB)',
					id: 'gain',
					choices: MODEL_VALUES.gain.choices.slice(
						MODEL_VALUES.gain_limit.range.min - 1,
						MODEL_VALUES.gain_limit.range.max + 1
					),
					default: MODEL_VALUES.gain_limit.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.expsetup?.GainLimit == feedback.options.gain
			},
		}
	}

	if (MODEL_VALUES?.gain_point) {
		feedbacks.gain_point = {
			type: 'boolean',
			label: 'Exposure - Gain Point',
			description: 'If the camera has gain point on, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Gain Point',
					id: 'val',
					choices: CHOICES.ON_OFF,
					default: 'On',
				},
			],
			callback: (feedback) => {
				return this.camera?.expsetup?.GainPoint == feedback.options.val
			},
		}
	}

	if (MODEL_VALUES?.gain_point) {
		feedbacks.gain_point_position = {
			type: 'boolean',
			label: 'Exposure - Gain Point Position',
			description: 'If the camera matches the selected gain point, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Gain Point (dB)',
					id: 'gain',
					choices: MODEL_VALUES.gain.choices,
					default: MODEL_VALUES.gain.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.expsetup?.GainPointPosition == feedback.options.gain
			},
		}
	}

	if (MODEL_VALUES?.high_sensitivity) {
		feedbacks.high_sensitivity = {
			type: 'boolean',
			label: 'Exposure - High Sensitivity Mode',
			description: 'If the camera has high sensitivity turned on, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'On / Off',
					id: 'val',
					choices: MODEL_VALUES.high_sensitivity.choices,
					default: MODEL_VALUES.high_sensitivity.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.expsetup?.high_sensitivity == feedback.options.val
			},
		}
	}

	if (MODEL_VALUES?.iris) {
		feedbacks.iris = {
			type: 'boolean',
			label: 'Exposure - Iris',
			description: 'If the camera matches the selected Iris value, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Iris',
					id: 'val',
					choices: MODEL_VALUES.iris.choices,
					default: MODEL_VALUES.iris.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.expsetup?.IrisLevel == feedback.options.val
			},
		}
	}

	if (MODEL_VALUES?.shutter_control_overwrite) {
		feedbacks.shutter_control_overwrite = {
			type: 'boolean',
			label: 'Exposure - Shutter Control Overwrite',
			description: 'If the camera has Shutter Control Overwrite turned on, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'On/Off',
					id: 'val',
					choices: MODEL_VALUES.shutter_control_overwrite.choices,
					default: MODEL_VALUES.shutter_control_overwrite.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.expsetup?.ShutterControlOverwrite == feedback.options.val
			},
		}
	}

	if (MODEL_VALUES?.shutter_max_speed) {
		feedbacks.shushutter_max_speedt = {
			type: 'boolean',
			label: 'Exposure - Shutter Max Speed',
			description: 'If the camera matches the selected shutter max speed, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Shutter Speed',
					id: 'val',
					choices: MODEL_VALUES.shut?.['shutter_' + [this.camera.framerate]].slice(
						MODEL_VALUES.shutter_max_speed.range.min,
						MODEL_VALUES.shutter_max_speed.range.max + 1
					),
					default: MODEL_VALUES.shutter_max_speed.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.expsetup?.ShutterMaxSpeed == feedback.options.val
			},
		}
	}

	if (MODEL_VALUES?.shutter_min_speed) {
		feedbacks.shushutter_min_speedt = {
			type: 'boolean',
			label: 'Exposure - Shutter Min Speed',
			description: 'If the camera matches the selected shutter max speed, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Shutter Speed',
					id: 'val',
					choices: MODEL_VALUES.shut?.['shutter_' + [this.camera.framerate]].slice(
						MODEL_VALUES.shutter_min_speed.range.min,
						MODEL_VALUES.shutter_min_speed.range.max + 1
					),
					default: MODEL_VALUES.shutter_min_speed.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.expsetup?.ShutterMinSpeed == feedback.options.val
			},
		}
	}

	if (MODEL_VALUES?.shutter_speed) {
		feedbacks.shut = {
			type: 'boolean',
			label: 'Exposure - Shutter Speed',
			description: 'If the camera matches the selected shutter speed, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Shutter Speed',
					id: 'val',
					choices: MODEL_VALUES.shutter_speed?.['shutter_' + [this.camera.framerate]],
					default: MODEL_VALUES.shutter_speed.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.expsetup?.ShutterSpeed == feedback.options.val
			},
		}
	}

	if (MODEL_VALUES?.shutter_speed_overwrite) {
		feedbacks.shutter_speed_overwrite = {
			type: 'boolean',
			label: 'Exposure - Shutter Speed Overwrite',
			description: 'If the camera matches the selected Shutter Speed Overwrite level, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
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
			callback: (feedback) => {
				return this.camera?.expsetup?.ShutterSpeedOverwrite == feedback.options.level
			},
		}
	}

	if (MODEL_VALUES?.slow_shutter_en) {
		feedbacks.slow_shutter_en = {
			type: 'boolean',
			label: 'Exposure - Slow Shutter Enable',
			description: 'If the camera matches the Slow Shutter state, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'On/Off',
					id: 'val',
					choices: MODEL_VALUES.slow_shutter_en.choices,
					default: MODEL_VALUES.slow_shutter_en.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.expsetup?.SlowShutterEn == feedback.options.val
			},
		}
	}

	if (MODEL_VALUES?.slow_shutter_limit) {
		feedbacks.slow_shutter_limit = {
			type: 'boolean',
			label: 'Exposure - Slow Shutter Limit',
			description: 'If the camera matches the selected slow shutter limit, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Shutter Speed',
					id: 'val',
					choices: MODEL_VALUES.shutter_speed?.['shutter_' + [this.camera.framerate]].slice(
						MODEL_VALUES.slow_shutter_limit.range.min,
						MODEL_VALUES.slow_shutter_limit.range.max + 1
					),
					default: MODEL_VALUES.slow_shutter_limit.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.expsetup?.SlowShutterLimit == feedback.options.val
			},
		}
	}

	if (MODEL_VALUES?.spotlight) {
		feedbacks.spotlight = {
			type: 'boolean',
			label: 'Exposure - Spotlight',
			description: 'If the camera matches the Spotlight state, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'On/Off',
					id: 'val',
					choices: MODEL_VALUES.spotlight.choices,
					default: MODEL_VALUES.spotlight.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.expsetup?.Spotlight == feedback.options.val
			},
		}
	}

	// White Balance Feedback

	if (MODEL_VALUES?.bg) {
		feedbacks.bg = {
			type: 'boolean',
			label: 'White Balance - BG',
			description: 'If the camera matches the selected BG level, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_VALUES.bg.range.min + ' to ' + MODEL_VALUES.bg.range.max + ')',
					id: 'level',
					default: MODEL_VALUES.bg.range.default,
					min: MODEL_VALUES.bg.range.min,
					max: MODEL_VALUES.bg.range.max,
				},
			],
			callback: (feedback) => {
				return this.camera?.wbsetup?.BG == feedback.options.level
			},
		}
	}

	if (MODEL_VALUES?.br) {
		feedbacks.br = {
			type: 'boolean',
			label: 'White Balance - BR',
			description: 'If the camera matches the selected BR level, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_VALUES.br.range.min + ' to ' + MODEL_VALUES.br.range.max + ')',
					id: 'level',
					default: MODEL_VALUES.br.range.default,
					min: MODEL_VALUES.br.range.min,
					max: MODEL_VALUES.br.range.max,
				},
			],
			callback: (feedback) => {
				return this.camera?.wbsetup?.BR == feedback.options.level
			},
		}
	}

	if (MODEL_VALUES?.blue_gain) {
		feedbacks.blue_gain = {
			type: 'boolean',
			label: 'White Balance - Blue Gain',
			description: 'If the camera matches the selected BR level, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_VALUES.blue_gain.range.min + ' to ' + MODEL_VALUES.blue_gain.range.max + ')',
					id: 'level',
					default: MODEL_VALUES.blue_gain.range.default,
					min: MODEL_VALUES.blue_gain.range.min,
					max: MODEL_VALUES.blue_gain.range.max,
				},
			],
			callback: (feedback) => {
				return this.camera?.wbsetup?.BlueGain == feedback.options.level
			},
		}
	}

	if (MODEL_VALUES?.color_temp) {
		feedbacks.color_temp = {
			type: 'boolean',
			label: 'White Balance - Color Temp',
			description:
				'If the camera color temperature matches the selected color temperature, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Color Temperature (k)',
					id: 'val',
					choices: MODEL_VALUES.color_temp.choices,
					default: MODEL_VALUES.color_temp.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.wbsetup?.ColorTemp == feedback.options.val
			},
		}
	}

	if (MODEL_VALUES?.gb) {
		feedbacks.gb = {
			type: 'boolean',
			label: 'White Balance - GB',
			description: 'If the camera matches the selected GB level, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_VALUES.gb.range.min + ' to ' + MODEL_VALUES.gb.range.max + ')',
					id: 'level',
					default: MODEL_VALUES.gb.range.default,
					min: MODEL_VALUES.gb.range.min,
					max: MODEL_VALUES.gb.range.max,
				},
			],
			callback: (feedback) => {
				return this.camera?.wbsetup?.GB == feedback.options.level
			},
		}
	}

	if (MODEL_VALUES?.gr) {
		feedbacks.gr = {
			type: 'boolean',
			label: 'White Balance - GR',
			description: 'If the camera matches the selected GR level, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_VALUES.gr.range.min + ' to ' + MODEL_VALUES.gr.range.max + ')',
					id: 'level',
					default: MODEL_VALUES.gr.range.default,
					min: MODEL_VALUES.gr.range.min,
					max: MODEL_VALUES.gr.range.max,
				},
			],
			callback: (feedback) => {
				return this.camera?.wbsetup?.GR == feedback.options.level
			},
		}
	}

	if (MODEL_VALUES?.level) {
		feedbacks.level = {
			type: 'boolean',
			label: 'White Balance - Level',
			description: 'If the camera matches the selected level, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_VALUES.level.range.min + ' to ' + MODEL_VALUES.level.range.max + ')',
					id: 'level',
					default: MODEL_VALUES.level.range.default,
					min: MODEL_VALUES.level.range.min,
					max: MODEL_VALUES.level.range.max,
				},
			],
			callback: (feedback) => {
				return this.camera?.wbsetup?.Level == feedback.options.level
			},
		}
	}

	if (MODEL_VALUES?.matrix) {
		feedbacks.matrix = {
			type: 'boolean',
			label: 'White Balance - Matrix',
			description: 'If the camera matches the selected Matrix mode, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'On/Off',
					id: 'val',
					choices: MODEL_VALUES.matrix.choices,
					default: MODEL_VALUES.matrix.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.wbsetup?.Matrix == feedback.options.white_balance
			},
		}
	}

	if (MODEL_VALUES?.offset) {
		feedbacks.offset = {
			type: 'boolean',
			label: 'White Balance - Offset',
			description: 'If the camera matches the selected Offset level, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
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
			callback: (feedback) => {
				return this.camera?.wbsetup?.Offset == feedback.options.level
			},
		}
	}

	if (MODEL_VALUES?.phase) {
		feedbacks.phase = {
			type: 'boolean',
			label: 'White Balance - Phase',
			description: 'If the camera matches the selected Phase level, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
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
			callback: (feedback) => {
				return this.camera?.wbsetup?.Phase == feedback.options.level
			},
		}
	}

	if (MODEL_VALUES?.rb) {
		feedbacks.rb = {
			type: 'boolean',
			label: 'White Balance - RB',
			description: 'If the camera matches the selected RB level, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
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
			callback: (feedback) => {
				return this.camera?.wbsetup?.RB == feedback.options.level
			},
		}
	}

	if (MODEL_VALUES?.rg) {
		feedbacks.rg = {
			type: 'boolean',
			label: 'White Balance - RG',
			description: 'If the camera matches the selected RG level, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
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
			callback: (feedback) => {
				return this.camera?.wbsetup?.RG == feedback.options.level
			},
		}
	}

	if (MODEL_VALUES?.red_gain) {
		feedbacks.red_gain = {
			type: 'boolean',
			label: 'White Balance - Red Gain',
			description: 'If the camera matches the selected Red Gain level, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_VALUES.red_gain.range.min + ' to ' + MODEL_VALUES.red_gain.range.max + ')',
					id: 'level',
					default: MODEL_VALUES.red_gain.range.default,
					min: MODEL_VALUES.red_gain.range.min,
					max: MODEL_VALUES.red_gain.range.max,
				},
			],
			callback: (feedback) => {
				return this.camera?.wbsetup?.RedGain == feedback.options.level
			},
		}
	}

	if (MODEL_VALUES?.select) {
		feedbacks.select = {
			type: 'boolean',
			label: 'White Balance - Select',
			description: 'Change the style of the button based on the WB mode',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'On/Off',
					id: 'val',
					choices: MODEL_VALUES.select.choices,
					default: MODEL_VALUES.select.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.wbsetup?.Select == feedback.options.val
			},
		}
	}

	if (MODEL_VALUES?.speed) {
		feedbacks.speed = {
			type: 'boolean',
			label: 'White Balance - Speed',
			description: 'If the camera matches the selected Red Gain level, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
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
			callback: (feedback) => {
				return this.camera?.wbsetup?.Speed == feedback.options.level
			},
		}
	}

	if (MODEL_VALUES?.wb_mode) {
		feedbacks.wb_mode = {
			type: 'boolean',
			label: 'White Balance - White Balance Mode',
			description: 'Change the style of the button based on the WB mode',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'White Balance Mode',
					id: 'white_balance',
					choices: MODEL_VALUES.wb_mode.choices,
					default: MODEL_VALUES.wb_mode.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.wbsetup?.WbMode == feedback.options.white_balance
			},
		}
	}

	// Picture Setup Feedback

	if (MODEL_VALUES?.backlight_com) {
		feedbacks.backlight_com = {
			type: 'boolean',
			label: 'Picture Setup - Backlight Compensation',
			description: 'If the camera matches the selected Backlight Compensation, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'On/Off',
					id: 'val',
					choices: MODEL_VALUES.backlight_com.choices,
					default: MODEL_VALUES.backlight_com.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.picsetup?.BackLightCom == feedback.options.val
			},
		}
	}

	if (MODEL_VALUES?.chroma_suppress) {
		feedbacks.chroma_suppress = {
			type: 'boolean',
			label: 'Picture Setup - Chroma Suppress',
			description: 'If the camera matches the selected Chroma Suppression, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Mode',
					id: 'val',
					choices: MODEL_VALUES.chroma_suppress.choices,
					default: MODEL_VALUES.chroma_suppress.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.picsetup?.ChromeSuppress == feedback.options.val
			},
		}
	}

	if (MODEL_VALUES?.color) {
		feedbacks.color = {
			type: 'boolean',
			label: 'Picture Setup - Color',
			description: 'If the camera matches the selected Color level, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_VALUES.color.range.min + ' to ' + MODEL_VALUES.color.range.max + ')',
					id: 'value',
					min: MODEL_VALUES.color.range.min,
					max: MODEL_VALUES.color.range.max,
					default: MODEL_VALUES.color.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.picsetup?.Color == feedback.options.value
			},
		}
	}

	if (MODEL_VALUES?.contrast) {
		feedbacks.contrast = {
			type: 'boolean',
			label: 'Picture Setup - Contrast',
			description: 'If the camera matches the selected Contrast level, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
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
			callback: (feedback) => {
				return this.camera?.picsetup?.Contrast == feedback.options.value
			},
		}
	}

	if (MODEL_VALUES?.pictureEffect) {
		feedbacks.pictureEffect = {
			type: 'boolean',
			label: 'Picture Setup - Effect',
			description: 'If the camera matches the selected Effect mode, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Effect',
					id: 'val',
					choices: MODEL_VALUES.pictureEffect.choices,
					default: MODEL_VALUES.pictureEffect.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.picsetup?.Effect == feedback.options.val
			},
		}
	}

	if (MODEL_VALUES?.picFlip) {
		feedbacks.picFlip = {
			type: 'boolean',
			label: 'Picture Setup - Flip',
			description: 'If the camera matches the selected Flip mode, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'On / Off',
					id: 'val',
					choices: MODEL_VALUES.picFlip.choices,
					default: MODEL_VALUES.picFlip.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.picsetup?.Flip == feedback.options.val
			},
		}
	}

	if (MODEL_VALUES?.gamma) {
		feedbacks.gamma = {
			type: 'boolean',
			label: 'Picture Setup - Gamma',
			description: 'If the camera matches the selected Gamma value, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_VALUES.gamma.range.min + ' to ' + MODEL_VALUES.gamma.range.max + ')',
					id: 'value',
					min: MODEL_VALUES.gamma.range.min,
					max: MODEL_VALUES.gamma.range.max,
					default: MODEL_VALUES.gamma.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.picsetup?.Gamma == feedback.options.value
			},
		}
	}

	if (MODEL_VALUES?.highlight_comp) {
		feedbacks.highlight_comp = {
			type: 'boolean',
			label: 'Picture Setup - Highlight Compensation',
			description: 'If the camera matches the selected Highlight Compensation mode, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Highlight Compensation',
					id: 'val',
					choices: MODEL_VALUES.highlight_comp.choices,
					default: MODEL_VALUES.highlight_comp.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.picsetup?.HighlightComp == feedback.options.val
			},
		}
	}

	if (MODEL_VALUES?.highlight_comp_mask) {
		feedbacks.highlight_comp_mask = {
			type: 'boolean',
			label: 'Picture Setup - Highlight Compensation Mask',
			description:
				'If the camera matches the selected Highlight Compensation Mask value, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
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
				},
			],
			callback: (feedback) => {
				return this.camera?.picsetup?.HighlightCompMask == feedback.options.value
			},
		}
	}

	if (MODEL_VALUES?.hue) {
		feedbacks.hue = {
			type: 'boolean',
			label: 'Picture Setup - Hue',
			description: 'If the camera matches the selected Hue value, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_VALUES.hue.range.min + ' to ' + MODEL_VALUES.hue.range.max + ')',
					id: 'value',
					min: MODEL_VALUES.hue.range.min,
					max: MODEL_VALUES.hue.range.max,
					default: MODEL_VALUES.hue.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.picsetup?.Hue == feedback.options.value
			},
		}
	}

	if (MODEL_VALUES?.ir_cutfilter) {
		feedbacks.ir_cutfilter = {
			type: 'boolean',
			label: 'Picture Setup - IR Cut Filter',
			description: 'If the camera matches the selected IR Cut Filter mode, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Mode',
					id: 'val',
					choices: MODEL_VALUES.ir_cutfilter.choices,
					default: MODEL_VALUES.ir_cutfilter.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.picsetup?.IRCutFilter == feedback.options.val
			},
		}
	}

	if (MODEL_VALUES?.low_latency) {
		feedbacks.low_latency = {
			type: 'boolean',
			label: 'Picture Setup - Low Latency',
			description: 'If the camera matches the selected Low Latency mode, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'On / Off',
					id: 'val',
					choices: MODEL_VALUES.low_latency.choices,
					default: MODEL_VALUES.low_latency.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.picsetup?.LowLatency == feedback.options.val
			},
		}
	}

	if (MODEL_VALUES?.picMirror) {
		feedbacks.picMirror = {
			type: 'boolean',
			label: 'Picture Setup - Mirror',
			description: 'If the camera matches the selected Picture Mirror mode, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'On / Off',
					id: 'val',
					choices: MODEL_VALUES.picMirror.choices,
					default: MODEL_VALUES.picMirror.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.picsetup?.Mirror == feedback.options.val
			},
		}
	}

	if (MODEL_VALUES?.nd_filter) {
		feedbacks.nd_filter = {
			type: 'boolean',
			label: 'Picture Setup - ND Filter',
			description: 'If the camera matches the selected ND Filter value, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_VALUES.nd_filter.range.min + ' to ' + MODEL_VALUES.nd_filter.range.max + ')',
					id: 'value',
					min: MODEL_VALUES.nd_filter.range.min,
					max: MODEL_VALUES.nd_filter.range.max,
					default: MODEL_VALUES.nd_filter.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.picsetup?.NDFilter == feedback.options.value
			},
		}
	}

	if (MODEL_VALUES?.noise_reduction) {
		feedbacks.noise_reduction = {
			type: 'boolean',
			label: 'Picture Setup - Noise Reduction',
			description: 'If the camera matches the selected Noise Reduction mode, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Noise Reduction',
					id: 'val',
					choices: MODEL_VALUES.noise_reduction.choices,
					default: MODEL_VALUES.noise_reduction.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.picsetup?.NoiseReduction == feedback.options.val
			},
		}
	}

	if (MODEL_VALUES?.sharpness) {
		feedbacks.sharpness = {
			type: 'boolean',
			label: 'Picture Setup - Sharpness',
			description: 'If the camera matches the selected Sharpness value, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_VALUES.sharpness.range.min + ' to ' + MODEL_VALUES.sharpness.range.max + ')',
					id: 'value',
					min: MODEL_VALUES.sharpness.range.min,
					max: MODEL_VALUES.sharpness.range.max,
					default: MODEL_VALUES.sharpness.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.picsetup?.Sharpness == feedback.options.value
			},
		}
	}

	if (MODEL_VALUES?.stabilizer) {
		feedbacks.stabilizer = {
			type: 'boolean',
			label: 'Picture Setup - Stabilizer',
			description: 'If the camera matches the selected Stabilizer mode, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'On / Off',
					id: 'val',
					choices: MODEL_VALUES.stabilizer.choices,
					default: MODEL_VALUES.stabilizer.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.picsetup?.Stabilizer == feedback.options.val
			},
		}
	}

	if (MODEL_VALUES?.threed_nr) {
		feedbacks.threed_nr = {
			type: 'boolean',
			label: 'Picture Setup - 3D Noise Reduction',
			description: 'If the camera matches the selected 3D Noise Reduction mode, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: '3D NR',
					id: 'val',
					choices: MODEL_VALUES.threed_nr.choices,
					default: MODEL_VALUES.threed_nr.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.picsetup?.ThreeDNR == feedback.options.val
			},
		}
	}

	if (MODEL_VALUES?.twod_nr) {
		feedbacks.twod_nr = {
			type: 'boolean',
			label: 'Picture Setup - 2D Noise Reduction',
			description: 'If the camera matches the selected 2D Noise Reduction mode, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: '2D NR',
					id: 'val',
					choices: MODEL_VALUES.twod_nr.choices,
					default: MODEL_VALUES.twod_nr.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.picsetup?.TWODNR == feedback.options.val
			},
		}
	}

	if (MODEL_VALUES?.wide_dynamic_range) {
		feedbacks.wide_dynamic_range = {
			type: 'boolean',
			label: 'Picture Setup - Wide Dynamic Range',
			description: 'If the camera matches the selected Wide Dynamic Range mode, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Wide Dynamic Range',
					id: 'val',
					choices: MODEL_VALUES.wide_dynamic_range.choices,
					default: MODEL_VALUES.wide_dynamic_range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.picsetup?.WideDynamicRange == feedback.options.val
			},
		}
	}

	// Color Matrix Feedback

	if (MODEL_VALUES?.cm_blue_gain) {
		feedbacks.cm_blue_gain = {
			type: 'boolean',
			label: 'Color Matrix - Blue Gain',
			description: 'If the camera matches the selected Blue Gain value, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_VALUES.cm_blue_gain.range.min + ' to ' + MODEL_VALUES.cm_blue_gain.range.max + ')',
					id: 'value',
					min: MODEL_VALUES.cm_blue_gain.range.min,
					max: MODEL_VALUES.cm_blue_gain.range.max,
					default: MODEL_VALUES.cm_blue_gain.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.cmsetup?.BlueGain == feedback.options.value
			},
		}
	}

	if (MODEL_VALUES?.cm_blue_hue) {
		feedbacks.cm_blue_hue = {
			type: 'boolean',
			label: 'Color Matrix - Blue Hue',
			description: 'If the camera matches the selected Blue Hue value, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_VALUES.cm_blue_hue.range.min + ' to ' + MODEL_VALUES.cm_blue_hue.range.max + ')',
					id: 'value',
					min: MODEL_VALUES.cm_blue_hue.range.min,
					max: MODEL_VALUES.cm_blue_hue.range.max,
					default: MODEL_VALUES.cm_blue_hue.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.cmsetup?.BlueHue == feedback.options.value
			},
		}
	}

	if (MODEL_VALUES?.cm_color_gain) {
		feedbacks.cm_color_gain = {
			type: 'boolean',
			label: 'Color Matrix - Color Gain',
			description: 'If the camera matches the selected Color Gain value, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_VALUES.cm_color_gain.range.min + ' to ' + MODEL_VALUES.cm_color_gain.range.max + ')',
					id: 'value',
					min: MODEL_VALUES.cm_color_gain.range.min,
					max: MODEL_VALUES.cm_color_gain.range.max,
					default: MODEL_VALUES.cm_color_gain.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.cmsetup?.ColourGain == feedback.options.value
			},
		}
	}

	if (MODEL_VALUES?.cm_cyan_gain) {
		feedbacks.cm_cyan_gain = {
			type: 'boolean',
			label: 'Color Matrix - Cyan Gain',
			description: 'If the camera matches the selected Cyan Gain value, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_VALUES.cm_cyan_gain.range.min + ' to ' + MODEL_VALUES.cm_cyan_gain.range.max + ')',
					id: 'value',
					min: MODEL_VALUES.cm_cyan_gain.range.min,
					max: MODEL_VALUES.cm_cyan_gain.range.max,
					default: MODEL_VALUES.cm_cyan_gain.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.cmsetup?.CyanGain == feedback.options.value
			},
		}
	}

	if (MODEL_VALUES?.cm_cyan_hue) {
		feedbacks.cm_cyan_hue = {
			type: 'boolean',
			label: 'Color Matrix - Cyan Hue',
			description: 'If the camera matches the selected Cyan Hue value, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_VALUES.cm_cyan_hue.range.min + ' to ' + MODEL_VALUES.cm_cyan_hue.range.max + ')',
					id: 'value',
					min: MODEL_VALUES.cm_cyan_hue.range.min,
					max: MODEL_VALUES.cm_cyan_hue.range.max,
					default: MODEL_VALUES.cm_cyan_hue.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.cmsetup?.CyanHue == feedback.options.value
			},
		}
	}

	if (MODEL_VALUES?.cm_green_gain) {
		feedbacks.cm_green_gain = {
			type: 'boolean',
			label: 'Color Matrix - Green Gain',
			description: 'If the camera matches the selected Green Gain value, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_VALUES.cm_green_gain.range.min + ' to ' + MODEL_VALUES.cm_green_gain.range.max + ')',
					id: 'value',
					min: MODEL_VALUES.cm_green_gain.range.min,
					max: MODEL_VALUES.cm_green_gain.range.max,
					default: MODEL_VALUES.cm_green_gain.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.cmsetup?.GreenGain == feedback.options.value
			},
		}
	}

	if (MODEL_VALUES?.cm_green_hue) {
		feedbacks.cm_green_hue = {
			type: 'boolean',
			label: 'Color Matrix - Green Hue',
			description: 'If the camera matches the selected Green Hue value, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_VALUES.cm_green_hue.range.min + ' to ' + MODEL_VALUES.cm_green_hue.range.max + ')',
					id: 'value',
					min: MODEL_VALUES.cm_green_hue.range.min,
					max: MODEL_VALUES.cm_green_hue.range.max,
					default: MODEL_VALUES.cm_green_hue.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.cmsetup?.GreenHue == feedback.options.value
			},
		}
	}

	if (MODEL_VALUES?.cm_hue_phase) {
		feedbacks.cm_hue_phase = {
			type: 'boolean',
			label: 'Color Matrix - Hue Phase',
			description: 'If the camera matches the selected Hue Phase value, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_VALUES.cm_hue_phase.range.min + ' to ' + MODEL_VALUES.cm_hue_phase.range.max + ')',
					id: 'value',
					min: MODEL_VALUES.cm_hue_phase.range.min,
					max: MODEL_VALUES.cm_hue_phase.range.max,
					default: MODEL_VALUES.cm_hue_phase.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.cmsetup?.HuePhase == feedback.options.value
			},
		}
	}

	if (MODEL_VALUES?.cm_mag_gain) {
		feedbacks.cm_mag_gain = {
			type: 'boolean',
			label: 'Color Matrix - Magenta Gain',
			description: 'If the camera matches the selected Magenta Gain value, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_VALUES.cm_mag_gain.range.min + ' to ' + MODEL_VALUES.cm_mag_gain.range.max + ')',
					id: 'value',
					min: MODEL_VALUES.cm_mag_gain.range.min,
					max: MODEL_VALUES.cm_mag_gain.range.max,
					default: MODEL_VALUES.cm_mag_gain.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.cmsetup?.MagGain == feedback.options.value
			},
		}
	}

	if (MODEL_VALUES?.cm_mag_hue) {
		feedbacks.cm_mag_hue = {
			type: 'boolean',
			label: 'Color Matrix - Magenta Hue',
			description: 'If the camera matches the selected Magenta Hue value, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_VALUES.cm_mag_hue.range.min + ' to ' + MODEL_VALUES.cm_mag_hue.range.max + ')',
					id: 'value',
					min: MODEL_VALUES.cm_mag_hue.range.min,
					max: MODEL_VALUES.cm_mag_hue.range.max,
					default: MODEL_VALUES.cm_mag_hue.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.cmsetup?.MagHue == feedback.options.value
			},
		}
	}

	if (MODEL_VALUES?.cm_red_gain) {
		feedbacks.cm_red_gain = {
			type: 'boolean',
			label: 'Color Matrix - Red Gain',
			description: 'If the camera matches the selected Red Gain value, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_VALUES.cm_red_gain.range.min + ' to ' + MODEL_VALUES.cm_red_gain.range.max + ')',
					id: 'value',
					min: MODEL_VALUES.cm_red_gain.range.min,
					max: MODEL_VALUES.cm_red_gain.range.max,
					default: MODEL_VALUES.cm_red_gain.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.cmsetup?.RedGain == feedback.options.value
			},
		}
	}

	if (MODEL_VALUES?.cm_red_hue) {
		feedbacks.cm_red_hue = {
			type: 'boolean',
			label: 'Color Matrix - Red Hue',
			description: 'If the camera matches the selected Red Hue value, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_VALUES.cm_red_hue.range.min + ' to ' + MODEL_VALUES.cm_red_hue.range.max + ')',
					id: 'value',
					min: MODEL_VALUES.cm_red_hue.range.min,
					max: MODEL_VALUES.cm_red_hue.range.max,
					default: MODEL_VALUES.cm_red_hue.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.cmsetup?.RedHue == feedback.options.value
			},
		}
	}

	if (MODEL_VALUES?.cm_yellow_gain) {
		feedbacks.cm_yellow_gain = {
			type: 'boolean',
			label: 'Color Matrix - Yellow Gain',
			description: 'If the camera matches the selected Yellow Gain value, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label:
						'Value (' + MODEL_VALUES.cm_yellow_gain.range.min + ' to ' + MODEL_VALUES.cm_yellow_gain.range.max + ')',
					id: 'value',
					min: MODEL_VALUES.cm_yellow_gain.range.min,
					max: MODEL_VALUES.cm_yellow_gain.range.max,
					default: MODEL_VALUES.cm_yellow_gain.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.cmsetup?.YellowGain == feedback.options.value
			},
		}
	}

	if (MODEL_VALUES?.cm_yellow_hue) {
		feedbacks.cm_yellow_hue = {
			type: 'boolean',
			label: 'Color Matrix - Yellow Hue',
			description: 'If the camera matches the selected Yellow Hue value, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_VALUES.cm_yellow_hue.range.min + ' to ' + MODEL_VALUES.cm_yellow_hue.range.max + ')',
					id: 'value',
					min: MODEL_VALUES.cm_yellow_hue.range.min,
					max: MODEL_VALUES.cm_yellow_hue.range.max,
					default: MODEL_VALUES.cm_yellow_hue.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.cmsetup?.YellowHue == feedback.options.value
			},
		}
	}

	// Advanced Setup Feedback

	if (MODEL_VALUES?.brightness) {
		feedbacks.brightness = {
			type: 'boolean',
			label: 'Advanced Setup - Brightness',
			description: 'If the camera matches the selected Brightness value, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_VALUES.brightness.range.min + ' to ' + MODEL_VALUES.brightness.range.max + ')',
					id: 'value',
					min: MODEL_VALUES.brightness.range.min,
					max: MODEL_VALUES.brightness.range.max,
					default: MODEL_VALUES.brightness.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.advancesetup?.Brightness == feedback.options.value
			},
		}
	}

	if (MODEL_VALUES?.brightness_comp) {
		feedbacks.brightness_comp = {
			type: 'boolean',
			label: 'Advanced Setup - Brightness Compensation',
			description: 'If the camera matches the selected Brightness Compensation mode, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Mode',
					id: 'val',
					choices: MODEL_VALUES.brightness_comp.choices,
					default: MODEL_VALUES.brightness_comp.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.advancesetup?.BrightnessComp == feedback.options.val
			},
		}
	}

	if (MODEL_VALUES?.comp_level) {
		feedbacks.comp_level = {
			type: 'boolean',
			label: 'Advanced Setup - Compensation Level',
			description: 'If the camera matches the selected Compensation Level, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Level',
					id: 'val',
					choices: MODEL_VALUES.comp_level.choices,
					default: MODEL_VALUES.comp_level.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.advancesetup?.CompLevel == feedback.options.val
			},
		}
	}

	if (MODEL_VALUES?.gamma_offset) {
		feedbacks.gamma_offset = {
			type: 'boolean',
			label: 'Advanced Setup - Gamma Offset',
			description: 'If the camera matches the selected Gamma Offset value, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_VALUES.gamma_offset.range.min + ' to ' + MODEL_VALUES.gamma_offset.range.max + ')',
					id: 'value',
					min: MODEL_VALUES.gamma_offset.range.min,
					max: MODEL_VALUES.gamma_offset.range.max,
					default: MODEL_VALUES.gamma_offset.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.advancesetup?.GammaOffset == feedback.options.value
			},
		}
	}

	if (MODEL_VALUES?.high_resolution) {
		feedbacks.high_resolution = {
			type: 'boolean',
			label: 'Advanced Setup - High Resolution',
			description: 'If the camera matches the selected High Resolution mode, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'On / Off',
					id: 'val',
					choices: MODEL_VALUES.high_resolution.choices,
					default: MODEL_VALUES.high_resolution.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.advancesetup?.HighResolution == feedback.options.val
			},
		}
	}

	if (MODEL_VALUES?.video_enhancement) {
		feedbacks.video_enhancement = {
			type: 'boolean',
			label: 'Advanced Setup - Video Enhancement',
			description: 'If the camera matches the selected Video Enhancement mode, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'On / Off',
					id: 'val',
					choices: MODEL_VALUES.video_enhancement.choices,
					default: MODEL_VALUES.video_enhancement.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.advancesetup?.VideoEnhancement == feedback.options.val
			},
		}
	}

	// External Setup Feedback

	if (MODEL_VALUES?.aux) {
		feedbacks.aux = {
			type: 'boolean',
			label: 'External Setup - Aux',
			description: 'If the camera matches the selected Aux mode, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'On / Off',
					id: 'val',
					choices: MODEL_VALUES.aux.choices,
					default: MODEL_VALUES.aux.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.externalsetup?.Aux == feedback.options.val
			},
		}
	}

	if (MODEL_VALUES?.rain_wiper) {
		feedbacks.rain_wiper = {
			type: 'boolean',
			label: 'External Setup - Rain Wiper',
			description: 'If the camera matches the selected Rain Wiper mode, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'On / Off',
					id: 'val',
					choices: MODEL_VALUES.rain_wiper.choices,
					default: MODEL_VALUES.rain_wiper.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.externalsetup?.RainWiper == feedback.options.val
			},
		}
	}

	if (MODEL_VALUES?.v12vout) {
		feedbacks.v12vout = {
			type: 'boolean',
			label: 'External Setup - 12v Out',
			description: 'If the camera matches the selected 12v Out mode, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'On / Off',
					id: 'val',
					choices: MODEL_VALUES.v12vout.choices,
					default: MODEL_VALUES.v12vout.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.externalsetup?.V12vOut == feedback.options.val
			},
		}
	}

	// Detail Setup Feedback

	if (MODEL_VALUES?.bandwidth) {
		feedbacks.bandwidth = {
			type: 'boolean',
			label: 'Detail Setup - Bandwidth',
			description: 'If the camera matches the selected Bandwidth mode, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Mode',
					id: 'val',
					choices: MODEL_VALUES.bandwidth.choices,
					default: MODEL_VALUES.bandwidth.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.detsetup?.Bandwidth == feedback.options.val
			},
		}
	}

	if (MODEL_VALUES?.bw_balance) {
		feedbacks.bw_balance = {
			type: 'boolean',
			label: 'Detail Setup - BW Bandwidth',
			description: 'If the camera matches the selected BW Bandwidth mode, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Mode',
					id: 'val',
					choices: MODEL_VALUES.bw_balance.choices,
					default: MODEL_VALUES.bw_balance.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.detsetup?.BwBalance == feedback.options.val
			},
		}
	}

	if (MODEL_VALUES?.crispening) {
		feedbacks.crispening = {
			type: 'boolean',
			label: 'Detail Setup - Crispening',
			description: 'If the camera matches the selected Crispening value, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_VALUES.crispening.range.min + ' to ' + MODEL_VALUES.crispening.range.max + ')',
					id: 'value',
					min: MODEL_VALUES.crispening.range.min,
					max: MODEL_VALUES.crispening.range.max,
					default: MODEL_VALUES.crispening.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.detsetup?.Crispening == feedback.options.value
			},
		}
	}

	if (MODEL_VALUES?.detail) {
		feedbacks.detail = {
			type: 'boolean',
			label: 'Detail Setup - Detail',
			description: 'If the camera matches the selected Detail value, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'On / Off',
					id: 'val',
					choices: MODEL_VALUES.detail.choices,
					default: MODEL_VALUES.detail.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.detsetup?.Detail == feedback.options.val
			},
		}
	}

	if (MODEL_VALUES?.highlight_detail) {
		feedbacks.highlight_detail = {
			type: 'boolean',
			label: 'Detail Setup - Highlight Detail',
			description: 'If the camera matches the selected Highlight Detail value, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
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
				},
			],
			callback: (feedback) => {
				return this.camera?.detsetup?.HighLightDetail == feedback.options.value
			},
		}
	}

	if (MODEL_VALUES?.hv_balance) {
		feedbacks.hv_balance = {
			type: 'boolean',
			label: 'Detail Setup - Hv Balance',
			description: 'If the camera matches the selected Hv Balance value, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_VALUES.hv_balance.range.min + ' to ' + MODEL_VALUES.hv_balance.range.max + ')',
					id: 'value',
					min: MODEL_VALUES.hv_balance.range.min,
					max: MODEL_VALUES.hv_balance.range.max,
					default: MODEL_VALUES.hv_balance.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.detsetup?.HvBalance == feedback.options.value
			},
		}
	}

	if (MODEL_VALUES?.limit) {
		feedbacks.limit = {
			type: 'boolean',
			label: 'Detail Setup - Limit',
			description: 'If the camera matches the selected Limit value, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_VALUES.limit.range.min + ' to ' + MODEL_VALUES.limit.range.max + ')',
					id: 'value',
					min: MODEL_VALUES.limit.range.min,
					max: MODEL_VALUES.limit.range.max,
					default: MODEL_VALUES.limit.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.detsetup?.Limit == feedback.options.value
			},
		}
	}

	if (MODEL_VALUES?.super_low) {
		feedbacks.super_low = {
			type: 'boolean',
			label: 'Detail Setup - Super Low',
			description: 'If the camera matches the selected Super Low value, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_VALUES.super_low.range.min + ' to ' + MODEL_VALUES.super_low.range.max + ')',
					id: 'value',
					min: MODEL_VALUES.super_low.range.min,
					max: MODEL_VALUES.super_low.range.max,
					default: MODEL_VALUES.super_low.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.detsetup?.SuperLow == feedback.options.value
			},
		}
	}

	// Gamma Setup Feedback

	if (MODEL_VALUES?.black_gamma_level) {
		feedbacks.black_gamma_level = {
			type: 'boolean',
			label: 'Gamma Setup - Black Gamma Level',
			description: 'If the camera matches the selected Black Gamma Level, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label:
						'Level (' +
						MODEL_VALUES.black_gamma_level.range.min +
						' to ' +
						MODEL_VALUES.black_gamma_level.range.max +
						')',
					id: 'value',
					min: MODEL_VALUES.black_gamma_level.range.min,
					max: MODEL_VALUES.black_gamma_level.range.max,
					default: MODEL_VALUES.black_gamma_level.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.gammasetup?.BlackGammaLevel == feedback.options.value
			},
		}
	}

	if (MODEL_VALUES?.black_level) {
		feedbacks.black_level = {
			type: 'boolean',
			label: 'Gamma Setup - Black Gamma Level',
			description: 'If the camera matches the selected Black Level, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Level (' + MODEL_VALUES.black_level.range.min + ' to ' + MODEL_VALUES.black_level.range.max + ')',
					id: 'value',
					min: MODEL_VALUES.black_level.range.min,
					max: MODEL_VALUES.black_level.range.max,
					default: MODEL_VALUES.black_level.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.gammasetup?.BlackLevel == feedback.options.value
			},
		}
	}

	if (MODEL_VALUES?.black_level_range) {
		feedbacks.black_level_range = {
			type: 'boolean',
			label: 'Gamma Setup - Black Level Range',
			description: 'If the camera matches the selected Black Level Range, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Black Level Range',
					id: 'val',
					choices: MODEL_VALUES.black_level_range.choices,
					default: MODEL_VALUES.black_level_range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.gammasetup?.BlackLevelRange == feedback.options.value
			},
		}
	}

	if (MODEL_VALUES?.effect) {
		feedbacks.effect = {
			type: 'boolean',
			label: 'Gamma Setup - Effect',
			description: 'If the camera matches the selected Effect Range, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_VALUES.effect.range.min + ' to ' + MODEL_VALUES.effect.range.max + ')',
					id: 'value',
					min: MODEL_VALUES.effect.range.min,
					max: MODEL_VALUES.effect.range.max,
					default: MODEL_VALUES.effect.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.gammasetup?.Effect == feedback.options.value
			},
		}
	}

	if (MODEL_VALUES?.level) {
		feedbacks.level = {
			type: 'boolean',
			label: 'Gamma Setup - Level',
			description: 'If the camera matches the selected Level, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_VALUES.level.range.min + ' to ' + MODEL_VALUES.level.range.max + ')',
					id: 'value',
					min: MODEL_VALUES.level.range.min,
					max: MODEL_VALUES.level.range.max,
					default: MODEL_VALUES.level.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.gammasetup?.Level == feedback.options.value
			},
		}
	}

	if (MODEL_VALUES?.offset) {
		feedbacks.offset = {
			type: 'boolean',
			label: 'Gamma Setup - Offset',
			description: 'If the camera matches the selected Offset level, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_VALUES.offset.range.min + ' to ' + MODEL_VALUES.offset.range.max + ')',
					id: 'value',
					min: MODEL_VALUES.offset.range.min,
					max: MODEL_VALUES.offset.range.max,
					default: MODEL_VALUES.offset.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.gammasetup?.Offset == feedback.options.value
			},
		}
	}

	if (MODEL_VALUES?.pattern) {
		feedbacks.pattern = {
			type: 'boolean',
			label: 'Gamma Setup - Pattern',
			description: 'If the camera matches the selected Pattern level, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_VALUES.pattern.range.min + ' to ' + MODEL_VALUES.pattern.range.max + ')',
					id: 'value',
					min: MODEL_VALUES.pattern.range.min,
					max: MODEL_VALUES.pattern.range.max,
					default: MODEL_VALUES.pattern.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.gammasetup?.Pattern == feedback.options.value
			},
		}
	}

	if (MODEL_VALUES?.pattern_fine) {
		feedbacks.pattern_fine = {
			type: 'boolean',
			label: 'Gamma Setup - Pattern Fine',
			description: 'If the camera matches the selected Pattern Fine level, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_VALUES.pattern_fine.range.min + ' to ' + MODEL_VALUES.pattern_fine.range.max + ')',
					id: 'value',
					min: MODEL_VALUES.pattern_fine.range.min,
					max: MODEL_VALUES.pattern_fine.range.max,
					default: MODEL_VALUES.pattern_fine.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.gammasetup?.PatternFine == feedback.options.value
			},
		}
	}

	if (MODEL_VALUES?.settings) {
		feedbacks.settings = {
			type: 'boolean',
			label: 'Gamma Setup - Settings',
			description: 'If the camera matches the selected Settings mode, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Settings',
					id: 'val',
					choices: MODEL_VALUES.settings.choices,
					default: MODEL_VALUES.settings.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.gammasetup?.Settings == feedback.options.value
			},
		}
	}

	if (MODEL_VALUES?.visibility_enhancer) {
		feedbacks.visibility_enhancer = {
			type: 'boolean',
			label: 'Gamma Setup - Visibility Enhancer',
			description: 'If the camera matches the selected Visibility Enhancer mode, change the style of the button',
			style: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Settings',
					id: 'val',
					choices: MODEL_VALUES.visibility_enhancer.choices,
					default: MODEL_VALUES.visibility_enhancer.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.gammasetup?.VisibilityEnhancer == feedback.options.value
			},
		}
	}

	// Other Feedback

	this.setFeedbackDefinitions(feedbacks)

	return Object.fromEntries(Object.entries(feedbacks).sort(sortByLabel))
}
