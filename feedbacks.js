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

	feedbacks.standby_status = {
		type: 'boolean',
		label: 'Camera Standby Status',
		description: 'If the camera is in standby, change the style of the button',
		style: {
			color: ColorBlack,
			bgcolor: ColorGreen,
		},
		options: [
			{
				type: 'dropdown',
				label: 'Status',
				id: 'standby',
				choices: CHOICES.STANDBY,
				default: 'on',
			},
		],
		callback: (feedback) => {
			return this.camera?.standby == feedback.options.standby
		},
	}

	feedbacks.freeze_status = {
		type: 'boolean',
		label: 'Camera Freeze Status',
		description: 'If the camera matches the selected freeze status, change the style of the button',
		style: {
			color: ColorBlack,
			bgcolor: ColorGreen,
		},
		options: [
			{
				type: 'dropdown',
				label: 'Freeze',
				id: 'freeze',
				choices: CHOICES.ON_OFF,
				default: 'On',
			},
		],
		callback: (feedback) => {
			return this.camera?.freeze == feedback.options.freeze
		},
	}

	// Analog Audio Feedback

	feedbacks.analogAudioOutput = {
		type: 'boolean',
		label: 'Analog Audio Output Select',
		description: 'If the camera matches the selected audio ouptut selector, change the style of the button',
		style: {
			color: ColorBlack,
			bgcolor: ColorGreen,
		},
		options: [
			{
				type: 'dropdown',
				label: 'Decode Comms / Decode Loop ',
				id: 'val',
				choices: CHOICES.ANALOG_AUDIO_OUTPUT,
				default: 'DecodeComms',
			},
		],
		callback: (feedback) => {
			return this.camera?.audio?.AnalogAudiooutputselect == feedback.options.val
		},
	}

	// Video Output Interface Feedback

	// Encode Setup Feedback

	feedbacks.encodeBandwidth = {
		type: 'boolean',
		label: 'Camera Encode Bandwidth Mode',
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
				choices: CHOICES.ENCODE_BANDWIDTH_MODE,
				default: 'NDIManaged',
			},
		],
		callback: (feedback) => {
			return this.camera?.encode?.BandwidthMode == feedback.options.val
		},
	}

	feedbacks.ndiAudio = {
		type: 'boolean',
		label: 'NDI Audio',
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
				choices: CHOICES.ENCODE_NDI_AUDIO,
				default: 'NDIAudioMute',
			},
		],
		callback: (feedback) => {
			return this.camera?.encode?.NDIAudio == feedback.options.val
		},
	}

	feedbacks.ndiGroupEnable = {
		type: 'boolean',
		label: 'NDI Group Enable',
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
				choices: CHOICES.ENCODE_NDIGroup,
				default: 'NDIGroupDis',
			},
		],
		callback: (feedback) => {
			return this.camera?.encode?.NDIGroup == feedback.options.val
		},
	}

	if (MODEL_VALUES?.tally) {
		feedbacks.tally = {
			type: 'boolean',
			label: 'Tally',
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
			label: 'Transmit Method',
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

	// PTZ Feedback

	// Focus Feedback

	feedbacks.focusMode = {
		type: 'boolean',
		label: 'Focus Mode',
		description: 'If the camera matches the selected focus mode, change the style of the button',
		style: {
			color: ColorBlack,
			bgcolor: ColorGreen,
		},
		options: [
			{
				type: 'dropdown',
				label: 'Mode',
				id: 'mode',
				choices: CHOICES.AUTO_FOCUS,
				default: 'Auto',
			},
		],
		callback: (feedback) => {
			return this.camera?.focus?.mode == feedback.options.mode
		},
	}

	// Exposure Feedback

	if (MODEL_VALUES?.ae_response) {
		feedbacks.ae_response = {
			type: 'boolean',
			label: 'Ae Response Level',
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
			label: 'Backlight',
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

	if (MODEL_VALUES?.expComp) {
		feedbacks.exposureCompEn = {
			type: 'boolean',
			label: 'Exposure Compensation',
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
			label: 'Exposure Compensation Level',
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

	if (MODEL_VALUES?.expM) {
		feedbacks.exposureMode = {
			type: 'boolean',
			label: 'Exposure Mode',
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
					choices: MODEL_VALUES.expM.choices,
					default: MODEL_VALUES.expM.default,
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
			label: 'Gain',
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
					choices: this.camera.expsetup?.GainLimit
						? MODEL_VALUES.gain.choices.slice(0, parseInt(this.camera.expsetup.GainLimit, 10) + 1)
						: MODEL_VALUES.gain.choices,
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
			label: 'Gain Limit',
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
						MODEL_VALUES.gainLimit.range.min,
						MODEL_VALUES.gainLimit.range.max + 1
					),
					default: MODEL_VALUES.gainLimit.range.default,
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
			label: 'Gain Point',
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
			label: 'Gain Point Position',
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
			label: 'High Sensitivity Mode',
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
			label: 'Iris',
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
			label: 'Shutter Control Overwrite',
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

	if (MODEL_VALUES?.shut) {
		feedbacks.shut = {
			type: 'boolean',
			label: 'Shutter Speed',
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
					choices: MODEL_VALUES.shut?.['shutter_' + [this.camera.framerate]],
					default: MODEL_VALUES.shut.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.expsetup?.ShutterSpeed == feedback.options.val
			},
		}
	}

	if (MODEL_VALUES?.shutter_max_speed) {
		feedbacks.shushutter_max_speedt = {
			type: 'boolean',
			label: 'Shutter Max Speed',
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
				return this.camera?.expsetup?.ShutterSpeed == feedback.options.val
			},
		}
	}

	// White Balance Feedback

	if (MODEL_VALUES?.wb) {
		feedbacks.wb_mode = {
			type: 'boolean',
			label: 'Camera White Balance Mode',
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
					choices: MODEL_VALUES.wb.choices,
					default: MODEL_VALUES.wb.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.wb?.WbMode == feedback.options.white_balance
			},
		}
	}

	if (MODEL_VALUES?.color_temp) {
		feedbacks.color_temp = {
			type: 'boolean',
			label: 'Color Temp',
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
	// Picture Setup Feedback

	// Color Matrix Feedback

	// Advanced Setup Feedback

	// External Setup Feedback

	// Detail Setup Feedback

	// Gamma Setup Feedback

	// Other Feedback

	this.setFeedbackDefinitions(feedbacks)

	return Object.fromEntries(Object.entries(feedbacks).sort())
}
