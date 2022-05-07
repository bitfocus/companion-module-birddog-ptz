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

	this.setFeedbackDefinitions(feedbacks)

	return Object.fromEntries(Object.entries(feedbacks).sort())
}
