const CHOICES = require('./choices.js')

exports.initFeedbacks = function () {
	const feedbacks = {}

	const ColorWhite = this.rgb(255, 255, 255) // White
	const ColorBlack = this.rgb(0, 0, 0) // Black
	const ColorRed = this.rgb(255, 0, 0) // Red
	const ColorGreen = this.rgb(0, 255, 0) // Green
	const ColorOrange = this.rgb(255, 102, 0) // Orange

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
				choices:
					this.camera?.about?.version == 'P100' || this.camera?.about?.version == 'PF120'
						? CHOICES.WB_MODE_1
						: CHOICES.WB_MODE_2,
				default: 'AUTO',
			},
		],
		callback: (feedback) => {
			if (this.camera?.wb?.WbMode == feedback.options.white_balance) {
				return true
			}
		},
	}

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

	this.setFeedbackDefinitions(feedbacks)

	return feedbacks
}
