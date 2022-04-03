const CHOICES = require('./choices.js')

module.exports = {
	getActions() {
		let actions = {}

		actions['power'] = {
			label: 'Power On/Off',
			options: [
				{
					type: 'dropdown',
					label: 'On/Off',
					id: 'val',
					choices: CHOICES.ON_OFF,
					default: 'On',
				},
			],
		}
		actions['pt'] = {
			label: 'Pan/Tilt',
			options: [
				{
					type: 'dropdown',
					label: 'Direction',
					id: 'val',
					choices: CHOICES.PTZ_DIRECTION,
					default: '0',
				},
			],
		}
		actions['ptSpeedS'] = {
			label: 'P/T Speed',
			options: [
				{
					type: 'dropdown',
					label: 'Speed',
					id: 'speed',
					choices: this.SPEED,
					default: '0C',
				},
			],
		}
		actions['ptSpeedU'] = { label: 'P/T Speed Up' }
		actions['ptSpeedD'] = { label: 'P/T Speed Down' }
		actions['ptSlow'] = {
			label: 'P/T Slow Mode',
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
		actions['zoom'] = {
			label: 'Zoom',
			options: [
				{
					type: 'dropdown',
					label: 'Direction',
					id: 'val',
					choices: CHOICES.PTZ_ZOOM,
					default: '0',
				},
			],
		}
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
					default: 'AutoFocus',
				},
			],
		}
		let exposureMode
		if (this.camera?.about?.version == 'P400' || this.camera?.about?.version == 'P4K') {
			exposureMode = CHOICES.EXP_MODE_3
		} else if (this.camera?.about?.version == 'P100' || this.camera?.about?.version == 'PF120') {
			exposureMode = CHOICES.EXP_MODE_1
		} else {
			exposureMode = CHOICES.EXP_MODE_2
		}
		actions['expM'] = {
			label: 'Exposure Mode',
			options: [
				{
					type: 'dropdown',
					label: 'Mode',
					id: 'val',
					choices: exposureMode,
					default: 'FULL-AUTO',
				},
			],
		}
		actions['wb'] = {
			label: 'White Balance Mode',
			options: [
				{
					type: 'dropdown',
					label: 'Mode',
					id: 'val',
					choices:
						this.camera?.about?.version == 'P100' || this.camera?.about?.version == 'PF120'
							? CHOICES.WB_MODE_1
							: CHOICES.WB_MODE_2,
					default: 'AUTO',
				},
			],
		}
		actions['wbOnePush'] = {
			label: 'White Balance One Push Trigger',
			description: 'Camera must be in One Push mode in order to use this action',
		}
		actions['gain'] = {
			label: 'Gain',
			options: [
				{
					type: 'dropdown',
					label: 'Gain',
					id: 'val',
					choices: CHOICES.UP_DOWN_RESET_VALUE,
					default: 'up',
				},
				{
					type: 'dropdown',
					label: 'VALUE',
					id: 'value',
					choices: this.GAIN,
					default: 01,
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
					choices: CHOICES.UP_DOWN_RESET_VALUE,
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
		actions['gainBlue'] = {
			label: 'Gain Blue',
			options: [
				{
					type: 'dropdown',
					label: 'Gain Blue',
					id: 'val',
					choices: CHOICES.UP_DOWN_RESET_VALUE,
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
		actions['iris'] = {
			label: 'Iris',
			options: [
				{
					type: 'dropdown',
					label: 'Iris',
					id: 'val',
					choices: CHOICES.UP_DOWN_RESET_VALUE,
					default: 'up',
				},
				{
					type: 'dropdown',
					label: 'Value',
					id: 'value',
					choices: this.IRIS,
					default: 11,
					isVisible: (action) => action.options.val === 'value',
				},
			],
		}
		actions['shut'] = {
			label: 'Shutter',
			options: [
				{
					type: 'dropdown',
					label: 'Shutter',
					id: 'val',
					choices: CHOICES.UP_DOWN_RESET_VALUE,
					default: 'up',
				},
				{
					type: 'dropdown',
					label: 'VALUE',
					id: 'value',
					choices: this.SHUTTER,
					default: 11,
					isVisible: (action) => action.options.val === 'value',
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
		actions['pictureEffect'] = {
			label: 'Picture Effect',
			options: [
				{
					type: 'dropdown',
					label: 'Effect',
					id: 'val',
					choices: CHOICES.PICTURE_EFFECT,
					default: 'BW',
				},
			],
		}
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
		actions['irMode'] = {
			label: 'IR Cut Filter',
			options: [
				{
					type: 'dropdown',
					label: 'On / Off',
					id: 'val',
					choices: CHOICES.IR_CUT_FILTER,
					default: 'On',
				},
			],
		}
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
		actions['highSensitivity'] = {
			label: 'High Sensitivity Mode',
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
		actions['tally'] = {
			label: 'Tally',
			options: [
				{
					type: 'dropdown',
					label: 'On / Off',
					id: 'val',
					choices: CHOICES.TALLY_MODE,
					default: 'TallyOn',
				},
			],
		}
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
		return actions
	},
}
