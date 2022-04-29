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
				id: 'status',
				choices: CHOICES.STANDBY,
				default: 'on',
			},
		],
		callback: (feedback) => {
			return this.camera.status == feedback.options.status
		},
	}

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

	this.setFeedbackDefinitions(feedbacks)

	return feedbacks
}
