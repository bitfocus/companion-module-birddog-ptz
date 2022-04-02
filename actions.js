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
					default: 'on',
				},
			],
		}
		actions['initalize'] = {
			label: 'Initialize / Reset',
			options: [
				{
					type: 'dropdown',
					label: 'Type',
					id: 'val',
					choices: [
						{ id: '0', label: 'Lens Initialization' },
						{ id: '1', label: 'Camera Reset' },
					],
					default: '0',
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
					choices: [
						{ id: '0', label: 'Left' },
						{ id: '1', label: 'Right' },
						{ id: '2', label: 'Up' },
						{ id: '3', label: 'Down' },
						{ id: '4', label: 'Up Left' },
						{ id: '5', label: 'Up Right' },
						{ id: '6', label: 'Down Left' },
						{ id: '7', label: 'Down Right' },
						{ id: '8', label: 'P/T Stop' },
						{ id: '9', label: 'P/T Home' },
					],
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
					label: 'Slow Mode',
					id: 'val',
					choices: CHOICES.ON_OFF,
					default: 'on',
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
					choices: [
						{ id: '0', label: 'Zoom In' },
						{ id: '1', label: 'Zoom Out' },
						{ id: '2', label: 'Zoom Stop' },
					],
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
					choices: [
						{ id: '0', label: 'Focus Near' },
						{ id: '1', label: 'Focus Far' },
						{ id: '2', label: 'Focus Stop' },
						{ id: '3', label: 'Focus One Push Auto' },
					],
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
					id: 'bol',
					choices: [
						{ id: '0', label: 'Auto Focus' },
						{ id: '1', label: 'Manual Focus' },
					],
					default: '0',
				},
			],
		}
		actions['expM'] = {
			label: 'Exposure Mode',
			options: [
				{
					type: 'dropdown',
					label: 'Mode',
					id: 'val',
					choices: [
						{ id: '0', label: 'Full Auto' },
						{ id: '1', label: 'Manual' },
						{ id: '2', label: 'Shutter Priority' },
						{ id: '3', label: 'Iris Priority' },
					],
					default: '0',
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
					type: 'dropdown',
					label: 'Preset Number',
					id: 'val',
					choices: this.PRESET,
					default: 0,
				},
			],
		}
		actions['recallPset'] = {
			label: 'Recall Preset',
			options: [
				{
					type: 'dropdown',
					label: 'Preset Nr.',
					id: 'val',
					choices: this.PRESET,
					default: 0,
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
			label: 'IR Correction',
			options: [
				{
					type: 'dropdown',
					label: 'On / Off',
					id: 'bol',
					choices: [
						{ id: '0', label: 'Standard' },
						{ id: '1', label: 'IR Light' },
					],
					default: '0',
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
					default: 'on',
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
					default: 'on',
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
					choices: CHOICES.ON_OFF,
					default: 'on',
				},
			],
		}
		actions['freeze'] = {
			label: 'Freeze',
			options: [
				{
					type: 'dropdown',
					label: 'Freeze',
					id: 'val',
					choices: CHOICES.ON_OFF,
					default: 'on',
				},
			],
		}
		actions['picFlip'] = {
			label: 'Picture Flip',
			options: [
				{
					type: 'dropdown',
					label: 'On/Off',
					id: 'val',
					choices: CHOICES.ON_OFF,
					default: 'on',
				},
			],
		}
		actions['picMirror'] = {
			label: 'Picture Mirror',
			options: [
				{
					type: 'dropdown',
					label: 'On/Off',
					id: 'val',
					choices: CHOICES.ON_OFF,
					default: 'on',
				},
			],
		}
		actions['custom'] = {
			label: 'Custom Command',
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
