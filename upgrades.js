module.exports = {
	choicesUpgrade: function (context, config, actions, feedbacks) {
		let changed = false

		actions.forEach((action) => {
			if (action.action === 'freeze') {
				if (action.options.val == '0') {
					action.options.val = 'On'
					changed = true
				} else if (action.options.val == '1') {
					action.options.val = 'Off'
					changed = true
				}
			}
			if (action.action === 'power') {
				action.action = 'standby'
				if (action.options.val == '0') {
					action.options.val = 'on'
					changed = true
				} else if (action.options.val == '1') {
					action.options.val = 'standby'
					changed = true
				}
			}
			if (action.action === 'hrMode' || action.action === 'highSensitivity') {
				if (action.options.bol == '1') {
					action.options.val = 'On'
					changed = true
				} else if (action.options.bol == '0') {
					action.options.val = 'Off'
					changed = true
				}
			}
			if (action.action === 'picFlip' || action.action === 'picMirror') {
				if (action.options.val == '1') {
					action.options.val = 'On'
					changed = true
				} else if (action.options.val == '0') {
					action.options.val = 'Off'
					changed = true
				}
			}
			if (action.action === 'wb') {
				let val
				if (!isNaN(action.options.val)) {
					switch (action.options.val) {
						case '0':
							val = 'AUTO'
							break
						case '1':
							val = 'INDOOR'
							break
						case '2':
							val = 'OUTDOOR'
							break
						case '3':
							val = 'ONEPUSH'
							break
						case '4':
							val = 'ATW'
							break
						case '5':
							val = 'MANUAL1'
							break
						case '6':
							val = 'ONEPUSH'
							break
						case '7':
							val = 'OUTDOOR-AUTO'
							break
						case '8':
							val = 'SLV-AUTO'
							break
						case '9':
							val = 'SLV'
							break
						case '10':
							val = 'SLV-OUTDOOR-AUTO'
							break
					}
				} else {
					val = action.options.val
				}
				action.options.val = val
				changed = true
			}
			if (action.action === 'expM') {
				let val
				if (!isNaN(action.options.val)) {
					switch (action.options.val) {
						case '0':
							val = 'FULL-AUTO'
							break
						case '1':
							val = 'MANUAL'
							break
						case '2':
							val = 'SHUTTER-PRI'
							break
						case '3':
							val = 'IRIS-PRI'
							break
					}
				} else {
					val = action.options.val
				}
				action.options.val = val
				changed = true
			}
			if (action.action === 'pictureEffect') {
				if (action.options.val == '1' || action.options.val == '2') {
					action.options.val = 'BW'
					changed = true
				} else if (action.options.val == '0') {
					action.options.val = 'Off'
					changed = true
				}
			}
			if (action.action === 'focusM') {
				if (action.options.bol == '0') {
					action.options.val = 'Auto'
					changed = true
				} else if (action.options.bol == '1') {
					action.options.val = 'Manual'
					changed = true
				}
			}
			if (action.action === 'tally') {
				if (action.options.bol == '1') {
					action.options.val = 'TallyOn'
					changed = true
				} else if (action.options.bol == '0') {
					action.options.val = 'TallyOff'
					changed = true
				}
			}
			if (action.action === 'irMode') {
				if (action.options.bol == '0') {
					action.options.val = 'On'
					changed = true
				} else if (action.options.bol == '1') {
					action.options.val = 'Off'
					changed = true
				}
			}
			if (action.action === 'ptSpeedU') {
				action.action = 'panSpeed'
				action.options.type = 'up'
				changed = true
			}
			if (action.action === 'ptSpeedD') {
				action.action = 'panSpeed'
				action.options.type = 'down'
				changed = true
			}
			if (action.action === 'ptSpeedS') {
				action.action = 'panSpeed'
				action.options.type = 'value'
				let val
				if (action.options.speed) {
					switch (action.options.speed) {
						case '01':
							val = 1
							break
						case '02':
							val = 2
							break
						case '03':
							val = 3
							break
						case '04':
							val = 4
							break
						case '05':
							val = 5
							break
						case '06':
							val = 6
							break
						case '07':
							val = 7
							break
						case '08':
							val = 8
							break
						case '09':
							val = 9
							break
						case '0A':
							val = 10
							break
						case '0B':
							val = 11
							break
						case '0C':
							val = 12
							break
						case '0D':
							val = 13
							break
						case '0E':
							val = 14
							break
						case '0F':
							val = 15
							break
						case '10':
							val = 16
							break
						case '11':
							val = 17
							break
						case '12':
							val = 18
							break
						case '13':
							val = 19
							break
						case '14':
							val = 20
							break
						case '15':
							val = 21
							break
						case '16':
							val = 21
							break
						case '17':
							val = 21
							break
						case '18':
							val = 21
							break
					}
				}
				action.options.value = val
				changed = true
			}
			if (action.action === 'pt') {
				let val
				if (!isNaN(action.options.val)) {
					switch (action.options.val) {
						case '0':
							val = 'left'
							break
						case '1':
							val = 'right'
							break
						case '2':
							val = 'up'
							break
						case '3':
							val = 'down'
							break
						case '4':
							val = 'up_left'
							break
						case '5':
							val = 'up_right'
							break
						case '6':
							val = 'down_left'
							break
						case '7':
							val = 'down_right'
							break
						case '8':
							val = 'stop'
							break
						case '9':
							val = 'home'
							break
					}
				} else {
					val = action.options.val
				}
				action.options.val = val
				changed = true
			}
			if (action.action === 'zoom') {
				let val
				if (!isNaN(action.options.val)) {
					switch (action.options.val) {
						case '0':
							val = 'in'
							break
						case '1':
							val = 'out'
							break
						case '2':
							val = 'stop'
							break
					}
				} else {
					val = action.options.val
				}
				action.options.val = val
				changed = true
			}
			if (action.action === 'focus') {
				let val
				if (!isNaN(action.options.val)) {
					switch (action.options.val) {
						case '0':
							val = 'near'
							break
						case '1':
							val = 'far'
							break
						case '2':
							val = 'stop'
							break
						case '3':
							val = 'trigger'
							break
					}
				} else {
					val = action.options.val
				}
				action.options.val = val
				changed = true
			}
		})
		return changed
	},
}
