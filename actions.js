module.exports = {
	getActions() {
		let actions = {}
		let IRIS = [
			{ id: '17', label: 'F1.6 OPEN' },
			{ id: '16', label: 'F2.0' },
			{ id: '15', label: 'F2.4' },
			{ id: '14', label: 'F2.8' },
			{ id: '13', label: 'F3.4' },
			{ id: '12', label: 'F4.0' },
			{ id: '11', label: 'F4.8' },
			{ id: '10', label: 'F5.6' },
			{ id: '09', label: 'F6.8' },
			{ id: '08', label: 'F8.0' },
			{ id: '07', label: 'F9.6' },
			{ id: '06', label: 'F11.0' },
			{ id: '05', label: 'F14.0' },
			{ id: '00', label: 'CLOSED' },
		]

		let GAIN = [
			{ id: '15', label: '50.0 dB' },
			{ id: '14', label: '46.4 dB' },
			{ id: '13', label: '42.8 dB' },
			{ id: '12', label: '39.3 dB' },
			{ id: '11', label: '35.7 dB' },
			{ id: '10', label: '32.1 dB' },
			{ id: '9', label: '28.6 dB' },
			{ id: '8', label: '25.0 dB' },
			{ id: '7', label: '21.4 dB' },
			{ id: '6', label: '17.8 dB' },
			{ id: '5', label: '14.3 dB' },
			{ id: '4', label: '10.7 dB' },
			{ id: '3', label: '7.1 dB' },
			{ id: '2', label: '3.6 dB' },
			{ id: '1', label: '0 dB' },
		]

		let SHUTTER = [
			{ id: '21', label: '1/10000 | 1/10000' },
			{ id: '20', label: '1/6000 | 1/6000' },
			{ id: '19', label: '1/4000 | 1/3500' },
			{ id: '18', label: '1/3000 | 1/2500' },
			{ id: '17', label: '1/2000 | 1/1750' },
			{ id: '16', label: '1/1500 | 1/1250' },
			{ id: '15', label: '1/1000 | 1/1000' },
			{ id: '14', label: '1/725 | 1/600' },
			{ id: '13', label: '1/500 | 1/425' },
			{ id: '12', label: '1/350 | 1/300' },
			{ id: '11', label: '1/250 | 1/215' },
			{ id: '10', label: '1/180 | 1/150' },
			{ id: '9', label: '1/125 | 1/120' },
			{ id: '8', label: '1/100 | 1/100' },
			{ id: '7', label: '1/90 | 1/75' },
			{ id: '6', label: '1/60 | 1/50' },
			{ id: '5', label: '1/30 | 1/25' },
			{ id: '4', label: '1/15 | 1/12' },
			{ id: '3', label: '1/8 | 1/8' },
			{ id: '2', label: '1/4 | 1/4' },
			{ id: '1', label: '1/2 | 1/2' },
			{ id: '0', label: '1/1 | 1/1' },
		]

		let PRESET = [
			{ id: '63', label: 'Preset 64' },
			{ id: '62', label: 'Preset 63' },
			{ id: '61', label: 'Preset 62' },
			{ id: '60', label: 'Preset 61' },
			{ id: '59', label: 'Preset 60' },
			{ id: '58', label: 'Preset 59' },
			{ id: '57', label: 'Preset 58' },
			{ id: '56', label: 'Preset 57' },
			{ id: '55', label: 'Preset 56' },
			{ id: '54', label: 'Preset 55' },
			{ id: '53', label: 'Preset 54' },
			{ id: '52', label: 'Preset 53' },
			{ id: '51', label: 'Preset 52' },
			{ id: '50', label: 'Preset 51' },
			{ id: '49', label: 'Preset 50' },
			{ id: '48', label: 'Preset 49' },
			{ id: '47', label: 'Preset 48' },
			{ id: '46', label: 'Preset 47' },
			{ id: '45', label: 'Preset 46' },
			{ id: '44', label: 'Preset 45' },
			{ id: '43', label: 'Preset 44' },
			{ id: '42', label: 'Preset 43' },
			{ id: '41', label: 'Preset 42' },
			{ id: '40', label: 'Preset 41' },
			{ id: '39', label: 'Preset 40' },
			{ id: '38', label: 'Preset 39' },
			{ id: '37', label: 'Preset 38' },
			{ id: '36', label: 'Preset 37' },
			{ id: '35', label: 'Preset 36' },
			{ id: '34', label: 'Preset 35' },
			{ id: '33', label: 'Preset 34' },
			{ id: '32', label: 'Preset 33' },
			{ id: '31', label: 'Preset 32' },
			{ id: '30', label: 'Preset 31' },
			{ id: '29', label: 'Preset 30' },
			{ id: '28', label: 'Preset 29' },
			{ id: '27', label: 'Preset 28' },
			{ id: '26', label: 'Preset 27' },
			{ id: '25', label: 'Preset 26' },
			{ id: '24', label: 'Preset 25' },
			{ id: '23', label: 'Preset 24' },
			{ id: '22', label: 'Preset 23' },
			{ id: '21', label: 'Preset 22' },
			{ id: '20', label: 'Preset 21' },
			{ id: '19', label: 'Preset 20' },
			{ id: '18', label: 'Preset 19' },
			{ id: '17', label: 'Preset 18' },
			{ id: '16', label: 'Preset 17' },
			{ id: '15', label: 'Preset 16' },
			{ id: '14', label: 'Preset 15' },
			{ id: '13', label: 'Preset 14' },
			{ id: '12', label: 'Preset 13' },
			{ id: '11', label: 'Preset 12' },
			{ id: '10', label: 'Preset 11' },
			{ id: '9', label: 'Preset 10' },
			{ id: '8', label: 'Preset 9' },
			{ id: '7', label: 'Preset 8' },
			{ id: '6', label: 'Preset 7' },
			{ id: '5', label: 'Preset 6' },
			{ id: '4', label: 'Preset 5' },
			{ id: '3', label: 'Preset 4' },
			{ id: '2', label: 'Preset 3' },
			{ id: '1', label: 'Preset 2' },
			{ id: '0', label: 'Preset 1' },
		]

		let SPEED = [
			{ id: '18', label: 'Speed 24 (Fast)' },
			{ id: '17', label: 'Speed 23' },
			{ id: '16', label: 'Speed 22' },
			{ id: '15', label: 'Speed 21' },
			{ id: '14', label: 'Speed 20' },
			{ id: '13', label: 'Speed 19' },
			{ id: '12', label: 'Speed 18' },
			{ id: '11', label: 'Speed 17' },
			{ id: '10', label: 'Speed 16' },
			{ id: '0F', label: 'Speed 15' },
			{ id: '0E', label: 'Speed 14' },
			{ id: '0D', label: 'Speed 13' },
			{ id: '0C', label: 'Speed 12' },
			{ id: '0B', label: 'Speed 11' },
			{ id: '0A', label: 'Speed 10' },
			{ id: '09', label: 'Speed 09' },
			{ id: '08', label: 'Speed 08' },
			{ id: '07', label: 'Speed 07' },
			{ id: '06', label: 'Speed 06' },
			{ id: '05', label: 'Speed 05' },
			{ id: '04', label: 'Speed 04' },
			{ id: '03', label: 'Speed 03' },
			{ id: '02', label: 'Speed 02' },
			{ id: '01', label: 'Speed 01 (Slow)' },
		]

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
					label: 'speed setting',
					id: 'speed',
					choices: SPEED,
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
					label: 'Zoom setting',
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
					label: 'Focus setting',
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
						{ id: '0', label: 'Full auto' },
						{ id: '1', label: 'Manual' },
						{ id: '2', label: 'Shutter Pri' },
						{ id: '3', label: 'Iris Pri' },
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
					choices: GAIN,
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
					choices: IRIS,
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
					choices: SHUTTER,
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
					choices: PRESET,
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
					choices: PRESET,
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
