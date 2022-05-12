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

	if (MODEL_VALUES?.bright_level) {
		feedbacks.bright_level = {
			type: 'boolean',
			label: 'Bright Level',
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
				return this.camera?.expsetup?.ShutterMaxSpeed == feedback.options.val
			},
		}
	}

	if (MODEL_VALUES?.shutter_min_speed) {
		feedbacks.shushutter_min_speedt = {
			type: 'boolean',
			label: 'Shutter Min Speed',
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
			label: 'Shutter Speed Overwrite',
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
			label: 'Slow Shutter Enable',
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
			label: 'Slow Shutter Limit',
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
			label: 'Spotlight',
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
			label: 'BG',
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
				return this.camera?.expsetup?.BG == feedback.options.level
			},
		}
	}

	if (MODEL_VALUES?.br) {
		feedbacks.br = {
			type: 'boolean',
			label: 'BR',
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
				return this.camera?.expsetup?.BR == feedback.options.level
			},
		}
	}

	if (MODEL_VALUES?.blue_gain) {
		feedbacks.blue_gain = {
			type: 'boolean',
			label: 'Blue Gain',
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
				return this.camera?.expsetup?.BlueGain == feedback.options.level
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

	if (MODEL_VALUES?.gb) {
		feedbacks.gb = {
			type: 'boolean',
			label: 'GB',
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
				return this.camera?.expsetup?.GB == feedback.options.level
			},
		}
	}

	if (MODEL_VALUES?.gr) {
		feedbacks.gr = {
			type: 'boolean',
			label: 'GR',
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
				return this.camera?.expsetup?.GR == feedback.options.level
			},
		}
	}

	if (MODEL_VALUES?.level) {
		feedbacks.level = {
			type: 'boolean',
			label: 'Level',
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
				return this.camera?.expsetup?.Level == feedback.options.level
			},
		}
	}

	if (MODEL_VALUES?.matrix) {
		feedbacks.matrix = {
			type: 'boolean',
			label: 'Matrix',
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
				return this.camera?.wb?.Matrix == feedback.options.white_balance
			},
		}
	}

	if (MODEL_VALUES?.offset) {
		feedbacks.offset = {
			type: 'boolean',
			label: 'Offset',
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
				return this.camera?.expsetup?.Offset == feedback.options.level
			},
		}
	}

	if (MODEL_VALUES?.phase) {
		feedbacks.phase = {
			type: 'boolean',
			label: 'Phase',
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
				return this.camera?.expsetup?.Phase == feedback.options.level
			},
		}
	}

	if (MODEL_VALUES?.rb) {
		feedbacks.rb = {
			type: 'boolean',
			label: 'RB',
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
				return this.camera?.expsetup?.RB == feedback.options.level
			},
		}
	}

	if (MODEL_VALUES?.rg) {
		feedbacks.rg = {
			type: 'boolean',
			label: 'RG',
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
				return this.camera?.expsetup?.RG == feedback.options.level
			},
		}
	}

	if (MODEL_VALUES?.red_gain) {
		feedbacks.red_gain = {
			type: 'boolean',
			label: 'Red Gain',
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
				return this.camera?.expsetup?.RedGain == feedback.options.level
			},
		}
	}

	if (MODEL_VALUES?.select) {
		feedbacks.select = {
			type: 'boolean',
			label: 'Select',
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
				return this.camera?.wb?.Select == feedback.options.val
			},
		}
	}

	if (MODEL_VALUES?.speed) {
		feedbacks.speed = {
			type: 'boolean',
			label: 'Speed',
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
				return this.camera?.expsetup?.Speed == feedback.options.level
			},
		}
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
					choices: MODEL_VALUES.wb_mode.choices,
					default: MODEL_VALUES.wb_mode.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.wb?.WbMode == feedback.options.white_balance
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
