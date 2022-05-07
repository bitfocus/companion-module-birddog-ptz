var { MODELS } = require('./models.js')
const CHOICES = require('./choices.js')

module.exports = {
	getActions() {
		this.debug(this?.camera?.model)

		MODEL_VALUES = MODELS.find((MODELS) => MODELS.id == this.camera.model).actions

		let actions = {}

		// General Camera Actions

		actions['standby'] = {
			label: 'Standby On/Off',
			options: [
				{
					type: 'dropdown',
					label: 'On/Standby',
					id: 'val',
					choices: CHOICES.STANDBY,
					default: 'On',
				},
			],
		}

		// Analog Audio Actions
		actions['analogAudioInGain'] = {
			label: 'Analog Audio In Gain',
			options: [
				{
					type: 'number',
					label: 'Analog Audio In Gain (dB)',
					id: 'val',
					default: 0,
					min: -50,
					max: 50,
				},
			],
		}
		actions['analogAudioOutGain'] = {
			label: 'Analog Audio Out Gain',
			options: [
				{
					type: 'number',
					label: 'Analog Audio Out Gain (dB)',
					id: 'val',
					default: 0,
					min: -50,
					max: 50,
				},
			],
		}
		actions['analogAudioOutput'] = {
			label: 'Analog Audio Output Select',
			options: [
				{
					type: 'dropdown',
					label: 'Decode Comms / Decode Loop',
					id: 'val',
					choices: CHOICES.ANALOG_AUDIO_OUTPUT,
					default: 'DecodeComms',
				},
			],
		}

		// Video Output Interface Actions

		// Encode Setup Actions

		actions['encodeBandwidth'] = {
			label: 'Encode Bandwidth',
			options: [
				{
					type: 'dropdown',
					label: 'Manual / NDI Managed',
					id: 'val',
					choices: CHOICES.ENCODE_BANDWIDTH_MODE,
					default: 'NDIManaged',
				},
				{
					type: 'number',
					label: 'Bandwidth Select',
					id: 'bandwidth',
					default: 120,
					min: 80,
					max: 180,
					isVisible: (action) => action.options.val === 'Manual',
				},
			],
		}
		actions['ndiAudio'] = {
			label: 'NDI Audio',
			options: [
				{
					type: 'dropdown',
					label: 'Analog / Mute',
					id: 'val',
					choices: CHOICES.ENCODE_NDI_AUDIO,
					default: 'NDIAudioMute',
				},
			],
		}
		actions['ndiGroupEnable'] = {
			label: 'NDI Group Enable',
			options: [
				{
					type: 'dropdown',
					label: 'NDI Group Enable',
					id: 'val',
					choices: CHOICES.ENCODE_NDIGroup,
					default: 'NDIGroupDis',
				},
			],
		}
		if (MODEL_VALUES?.tally) {
			actions['tally'] = {
				label: 'Tally',
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

		// NDI Discovery Server Actions

		// PTZ Actions

		if (MODEL_VALUES?.pt) {
			actions['pt'] = {
				label: 'Pan/Tilt',
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
						type: 'dropdown',
						label: 'Pan Speed',
						id: 'panSpeed',
						choices: CHOICES.PAN_SPEED,
						default: 11,
						isVisible: (action) => action.options.override === true || action.options.val === 'direct',
					},
					{
						type: 'dropdown',
						label: 'Tilt Speed',
						id: 'tiltSpeed',
						choices: CHOICES.TILT_SPEED,
						default: 9,
						isVisible: (action) => action.options.override === true || action.options.val === 'direct',
					},
				],
			}
		}
		actions['zoom'] = {
			label: 'Zoom',
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
					label: 'Speed',
					id: 'speed',
					choices: CHOICES.ZOOM_SPEED,
					default: 4,
					isVisible: (action) => action.options.override === true,
				},
			],
		}
		if (MODEL_VALUES?.panSpeed) {
			actions['panSpeed'] = {
				label: 'Pan Speed',
				options: [
					{
						type: 'dropdown',
						label: 'Action',
						id: 'type',
						choices: CHOICES.SPEED_CHANGES,
						default: 'up',
					},
					{
						type: 'dropdown',
						label: 'Value',
						id: 'value',
						choices: CHOICES.PAN_SPEED,
						default: 11,
						isVisible: (action) => action.options.type === 'value',
					},
				],
			}
		}
		if (MODEL_VALUES?.tiltSpeed) {
			actions['tiltSpeed'] = {
				label: 'Tilt Speed',
				options: [
					{
						type: 'dropdown',
						label: 'Action',
						id: 'type',
						choices: CHOICES.SPEED_CHANGES,
						default: 'up',
					},
					{
						type: 'dropdown',
						label: 'Value',
						id: 'value',
						choices: CHOICES.TILT_SPEED,
						default: 9,
						isVisible: (action) => action.options.type === 'value',
					},
				],
			}
		}
		actions['zoomSpeed'] = {
			label: 'Zoom Speed',
			options: [
				{
					type: 'dropdown',
					label: 'Action',
					id: 'type',
					choices: CHOICES.SPEED_CHANGES,
					default: 'up',
				},
				{
					type: 'dropdown',
					label: 'Value',
					id: 'value',
					choices: CHOICES.ZOOM_SPEED,
					default: 4,
					isVisible: (action) => action.options.type === 'value',
				},
			],
		}
		actions['savePset'] = {
			label: 'Save Preset',
			options: [
				{
					type: 'number',
					label: 'Preset Number',
					id: 'val',
					default: 1,
					min: 1,
					max: 64,
				},
			],
		}
		actions['recallPset'] = {
			label: 'Recall Preset',
			options: [
				{
					type: 'number',
					label: 'Preset Number',
					id: 'val',
					default: 1,
					min: 1,
					max: 64,
				},
			],
		}

		// Focus Actions

		actions['focus'] = {
			label: 'Focus',
			options: [
				{
					type: 'dropdown',
					label: 'Direction',
					id: 'val',
					choices: CHOICES.FOCUS_CONTROL,
					default: '0',
				},
			],
		}
		actions['focusM'] = {
			label: 'Focus Mode',
			options: [
				{
					type: 'dropdown',
					label: 'Mode',
					id: 'val',
					choices: CHOICES.AUTO_FOCUS,
					default: 'Auto',
				},
			],
		}

		// Exposure Actions

		if (MODEL_VALUES?.expM) {
			actions['expM'] = {
				label: 'Exposure Mode',
				options: [
					{
						type: 'dropdown',
						label: 'Mode',
						id: 'val',
						choices: MODEL_VALUES.expM.choices,
						default: MODEL_VALUES.expM.default,
					},
				],
			}
		}

		if (MODEL_VALUES?.gain) {
			actions['gain'] = {
				label: 'Gain',
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
		if (MODEL_VALUES?.iris) {
			actions['iris'] = {
				label: 'Iris',
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
		if (MODEL_VALUES?.shut) {
			actions['shut'] = {
				label: 'Shutter',
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
						choices: MODEL_VALUES.shut?.['shutter_' + [this.camera.framerate]]?.label,
						default: MODEL_VALUES.shut.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
			}
		}

		if (MODEL_VALUES?.high_sensitivity) {
			actions['highSensitivity'] = {
				label: 'High Sensitivity Mode',
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

		// White Balance Actions

		if (MODEL_VALUES?.wb) {
			actions['wb'] = {
				label: 'White Balance Mode',
				options: [
					{
						type: 'dropdown',
						label: 'Mode',
						id: 'val',
						choices: MODEL_VALUES.wb.choices,
						default: MODEL_VALUES.wb.default,
					},
				],
			}
		}
		actions['wbOnePush'] = {
			label: 'White Balance One Push Trigger',
			description: 'Camera must be in One Push mode in order to use this action',
		}
		actions['gainBlue'] = {
			label: 'Gain Blue',
			options: [
				{
					type: 'dropdown',
					label: 'Gain Blue',
					id: 'val',
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
				},
				{
					type: 'number',
					label: 'Value',
					id: 'value',
					default: 127,
					min: 0,
					max: 255,
					isVisible: (action) => action.options.val === 'value',
				},
			],
		}
		actions['gainRed'] = {
			label: 'Gain Red',
			options: [
				{
					type: 'dropdown',
					label: 'Gain Red',
					id: 'val',
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
				},
				{
					type: 'number',
					label: 'Value',
					id: 'value',
					default: 127,
					min: 0,
					max: 255,
					isVisible: (action) => action.options.val === 'value',
				},
			],
		}
		if (MODEL_VALUES?.color_temp) {
			actions['color_temp'] = {
				label: 'Color Temperature',
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

		// Picture Setup Actions

		actions['picFlip'] = {
			label: 'Picture Flip',
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
		actions['picMirror'] = {
			label: 'Picture Mirror',
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
		if (MODEL_VALUES?.contrast) {
			actions['contrast'] = {
				label: 'Contrast',
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
						label: 'Value (0 to 15)',
						id: 'value',
						min: 0,
						max: 15,
						default: 7,
						isVisible: (action) => action.options.val === 'value',
					},
				],
			}
		}
		if (MODEL_VALUES?.pictureEffect) {
			actions['pictureEffect'] = {
				label: 'Picture Effect',
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

		if (MODEL_VALUES?.irMode) {
			actions['irMode'] = {
				label: 'IR Cut Filter',
				options: [
					{
						type: 'dropdown',
						label: 'On / Off',
						id: 'val',
						choices: MODEL_VALUES.irMode.choices,
						default: MODEL_VALUES.irMode.default,
					},
				],
			}
		}

		// Color Matrix Actions

		// Advanced Setup Actions

		// External Setup Actions

		// Detail Setup Actions

		// Gamma Setup Actions

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
				label: 'Defog',
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
				label: 'High Resolution Mode',
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
		if (MODEL_VALUES?.freeze) {
			actions['freeze'] = {
				label: 'Freeze',
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
		return Object.fromEntries(Object.entries(actions).sort())
	},
}
