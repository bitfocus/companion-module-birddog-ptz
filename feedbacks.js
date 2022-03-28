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
				default: 'AUTO',
				choices: [
					{ id: 'AUTO', label: 'Auto' },
					{ id: 'INDOOR', label: 'Indoor' },
					{ id: 'OUTDOOR', label: 'Outdoor' },
					{ id: 'ONEPUSH', label: 'OnePush' },
					{ id: 'ATW', label: 'ATW' },
					{ id: 'MANUAL1', label: 'Manual1' },
					{ id: 'MANUAL2', label: 'Manual2' },
				],
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
				default: 'on',
				choices: [
					{ id: 'on', label: 'On' },
					{ id: 'standby', label: 'Standby' },
				],
			},
		],
		callback: (feedback) => {
			return this.camera.status == feedback.options.status
		},
	}

	this.setFeedbackDefinitions(feedbacks)

	return feedbacks
}
