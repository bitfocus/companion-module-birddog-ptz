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
					choices: [
						{ id: '0', label: 'On' },
						{ id: '1', label: 'Off' },
					],
					default: '0',
				},
			],
		}
		actions['initalize'] = {
			label: 'Initalize / Reset',
			options: [
				{
					type: 'dropdown',
					label: 'Lens/Reset',
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
					label: 'Pan/Tilt',
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
					label: 'Speed Setting',
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
					label: 'Slow Mode On/Off',
					id: 'bol',
					choices: [
						{ id: '1', label: 'Off' },
						{ id: '0', label: 'On' },
					],
				},
			],
		}
		actions['zoom'] = {
			label: 'Zoom',
			options: [
				{
					type: 'dropdown',
					label: 'Zoom Setting',
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
		actions['ciZoom'] = {
			label: 'Clear Image Zoom',
			options: [
				{
					type: 'dropdown',
					label: 'Clear Image On/Off',
					id: 'bol',
					choices: [
						{ id: '0', label: 'Off' },
						{ id: '1', label: 'On' },
					],
				},
			],
		}
		actions['focus'] = {
			label: 'Focus',
			options: [
				{
					type: 'dropdown',
					label: 'Focus Setting',
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
					label: 'Auto / Manual Focus',
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
					label: 'Mode setting',
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
			label: 'White Balance',
			options: [
				{
					type: 'dropdown',
					label: 'Mode setting',
					id: 'val',
					choices: [
						{ id: '0', label: 'Auto' },
						{ id: '1', label: 'Indoor' },
						{ id: '2', label: 'Outdoor' },
						{ id: '3', label: 'One Push Mode' },
						{ id: '4', label: 'ATW' },
						{ id: '5', label: 'Manual' },
						{ id: '6', label: 'One Push Trigger' },
						{ id: '7', label: 'Outdoor Auto' },
						{ id: '8', label: 'Sodium Lamp Auto' },
						{ id: '9', label: 'Sodium Lamp' },
						{ id: '10', label: 'Sodium Lamp Outdoor Auto' },
					],
					default: '0',
				},
			],
		}
		actions['gain'] = {
			label: 'Gain',
			options: [
				{
					type: 'dropdown',
					label: 'Gain setting',
					id: 'val',
					choices: [
						{ id: 'up', label: 'UP' },
						{ id: 'down', label: 'DOWN' },
						{ id: 'reset', label: 'RESET' },
						{ id: 'value', label: 'VALUE' },
					],
					default: 'up',
				},
				{
					type: 'dropdown',
					label: 'VALUE',
					id: 'value',
					choices: this.GAIN,
					default: 01,
				},
			],
		}
		actions['gainRed'] = {
			label: 'Gain Red',
			options: [
				{
					type: 'dropdown',
					label: 'Gain Red setting',
					id: 'val',
					choices: [
						{ id: 'up', label: 'UP' },
						{ id: 'down', label: 'DOWN' },
						{ id: 'reset', label: 'RESET' },
						{ id: 'value', label: 'VALUE' },
					],
					default: 'up',
				},
				{
					type: 'dropdown',
					label: 'VALUE',
					id: 'value',
					choices: { id: 'up', label: 'UP' }, //FIX ME
					default: '200',
				},
			],
		}
		actions['gainBlue'] = {
			label: 'Gain Blue',
			options: [
				{
					type: 'dropdown',
					label: 'Gain Blue setting',
					id: 'val',
					choices: [
						{ id: 'up', label: 'UP' },
						{ id: 'down', label: 'DOWN' },
						{ id: 'reset', label: 'RESET' },
						{ id: 'value', label: 'VALUE' },
					],
					default: 'up',
				},
				{
					type: 'dropdown',
					label: 'VALUE',
					id: 'value',
					choices: { id: 'up', label: 'UP' }, //FIX ME
					default: '200',
				},
			],
		}
		actions['iris'] = {
			label: 'Iris',
			options: [
				{
					type: 'dropdown',
					label: 'Iris setting',
					id: 'val',
					choices: [
						{ id: 'up', label: 'UP' },
						{ id: 'down', label: 'DOWN' },
						{ id: 'reset', label: 'RESET' },
						{ id: 'value', label: 'VALUE' },
					],
					default: 'up',
				},
				{
					type: 'dropdown',
					label: 'VALUE',
					id: 'value',
					choices: this.IRIS,
					default: 11,
				},
			],
		}
		actions['shut'] = {
			label: 'Shutter',
			options: [
				{
					type: 'dropdown',
					label: 'Shutter setting',
					id: 'val',
					choices: [
						{ id: 'up', label: 'UP' },
						{ id: 'down', label: 'DOWN' },
						{ id: 'reset', label: 'RESET' },
						{ id: 'value', label: 'VALUE' },
					],
					default: 'up',
				},
				{
					type: 'dropdown',
					label: 'VALUE',
					id: 'value',
					choices: this.SHUTTER,
					default: 11,
				},
			],
		}
		actions['savePset'] = {
			label: 'Save Preset',
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
			label: 'Picture Effect Setting',
			options: [
				{
					type: 'dropdown',
					label: 'Effect',
					id: 'val',
					choices: [
						{ id: '0', label: 'Off' },
						{ id: '1', label: 'Neg.Art' },
						{ id: '2', label: 'Black White' },
					],
					default: '0',
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
					id: 'bol',
					choices: [
						{ id: '0', label: 'Off' },
						{ id: '1', label: 'On' },
					],
					default: '0',
				},
			],
		}
		actions['highSensitivity'] = {
			label: 'High Sensitivity on/off',
			options: [
				{
					type: 'dropdown',
					label: 'On / Off',
					id: 'bol',
					choices: [
						{ id: '0', label: 'Off' },
						{ id: '1', label: 'On' },
					],
					default: '0',
				},
			],
		}
		actions['tally'] = {
			label: 'Tally on/off',
			options: [
				{
					type: 'dropdown',
					label: 'On / Off',
					id: 'bol',
					choices: [
						{ id: '0', label: 'Off' },
						{ id: '1', label: 'On' },
					],
					default: '0',
				},
			],
		}
		actions['freeze'] = {
			label: 'Freeze',
			options: [
				{
					type: 'dropdown',
					label: 'Freeze On/Off',
					id: 'val',
					choices: [
						{ id: '0', label: 'On' },
						{ id: '1', label: 'Off' },
					],
					default: '0',
				},
			],
		}
		actions['picFlip'] = {
			label: 'Picture Flip',
			options: [
				{
					type: 'dropdown',
					label: 'Flip On/Off',
					id: 'val',
					choices: [
						{ id: '0', label: 'Off' },
						{ id: '1', label: 'On' },
					],
					default: '0',
				},
			],
		}
		actions['picMirror'] = {
			label: 'Picture Mirror',
			options: [
				{
					type: 'dropdown',
					label: 'Mirror On/Off',
					id: 'val',
					choices: [
						{ id: '0', label: 'Off' },
						{ id: '1', label: 'On' },
					],
					default: '0',
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
