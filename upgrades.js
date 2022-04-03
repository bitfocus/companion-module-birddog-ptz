module.exports = {
	choicesUpgrade: function (context, config, actions, feedbacks) {
		let changed = false

		actions.forEach((action) => {
			if (action.action === 'power' || action.action === 'freeze') {
				if (action.options.val == '0') {
					action.options.val = 'On'
					changed = true
				} else if (action.options.val == '1') {
					action.options.val = 'Off'
					changed = true
				}
			}
			if (action.action === 'ptSlow') {
				if (action.options.bol == '0') {
					action.options.val = 'On'
					changed = true
				} else if (action.options.bol == '1') {
					action.options.val = 'Off'
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
					action.options.val = 'AutoFocus'
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
		})
		return changed
	},
}
