export const upgradeScripts = [
	function (context, props) {
		//choicesUpgrade
		let changed = {
			updatedConfig: null,
			updatedActions: [],
			updatedFeedbacks: [],
		}

		props.actions.forEach((action) => {
			if (action.actionId === 'freeze') {
				if (action.options.val == '0') {
					action.options.val = 'On'
				} else if (action.options.val == '1') {
					action.options.val = 'Off'
				}
				changed.updatedActions.push(action)
			}
			if (action.actionId === 'power') {
				action.actionId = 'standby'
				if (action.options.val == '0') {
					action.options.val = 'on'
				} else if (action.options.val == '1') {
					action.options.val = 'standby'
				}
				changed.updatedActions.push(action)
			}
			if (action.actionId === 'hrMode' || action.actionId === 'highSensitivity') {
				if (action.options.bol == '1') {
					action.options.val = 'On'
				} else if (action.options.bol == '0') {
					action.options.val = 'Off'
				}
				changed.updatedActions.push(action)
			}
			if (action.actionId === 'picFlip' || action.actionId === 'picMirror') {
				if (action.options.val == '1') {
					action.options.val = 'On'
				} else if (action.options.val == '0') {
					action.options.val = 'Off'
				}
				changed.updatedActions.push(action)
			}
			if (action.actionId === 'wb') {
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
				changed.updatedActions.push(action)
			}
			if (action.actionId === 'expM') {
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
				changed.updatedActions.push(action)
			}
			if (action.actionId === 'pictureEffect') {
				if (action.options.val == '1' || action.options.val == '2') {
					action.options.val = 'BW'
				} else if (action.options.val == '0') {
					action.options.val = 'Off'
				}
				changed.updatedActions.push(action)
			}
			if (action.actionId === 'focusM') {
				if (action.options.bol == '0') {
					action.options.val = 'Auto'
				} else if (action.options.bol == '1') {
					action.options.val = 'Manual'
				}
				changed.updatedActions.push(action)
			}
			if (action.actionId === 'tally') {
				if (action.options.bol == '1') {
					action.options.val = 'TallyOn'
				} else if (action.options.bol == '0') {
					action.options.val = 'TallyOff'
				}
				changed.updatedActions.push(action)
			}
			if (action.actionId === 'irMode') {
				action.actionId = 'ir_cutfilter'
				if (action.options.bol == '0') {
					action.options.val = 'On'
				} else if (action.options.bol == '1') {
					action.options.val = 'Off'
				}
				changed.updatedActions.push(action)
			}
			if (action.actionId === 'ptSpeedU') {
				action.actionId = 'panSpeed'
				action.options.type = 'up'
				changed.updatedActions.push(action)
			}
			if (action.actionId === 'ptSpeedD') {
				action.actionId = 'panSpeed'
				action.options.type = 'down'
				changed.updatedActions.push(action)
			}
			if (action.actionId === 'ptSpeedS') {
				action.actionId = 'panSpeed'
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
				changed.updatedActions.push(action)
			}
			if (action.actionId === 'pt') {
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
				changed.updatedActions.push(action)
			}
			if (action.actionId === 'zoom') {
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
				changed.updatedActions.push(action)
			}
			if (action.actionId === 'focus') {
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
				changed.updatedActions.push(action)
			}
			if (action.actionId === 'gainBlue') {
				action.actionId = 'blue_gain'
				changed.updatedActions.push(action)
			}
			if (action.actionId === 'gainRed') {
				action.actionId = 'red_gain'
				changed.updatedActions.push(action)
			}
			if (action.actionId === 'wb') {
				action.actionId = 'wb_mode'
				changed.updatedActions.push(action)
			}
		})
		return changed
	},
	function (context, props) {
		//autoDetectDefault
		let changed = {
			updatedConfig: null,
			updatedActions: [],
			updatedFeedbacks: [],
		}
		if (props.config !== null) {
			let config = props.config
			if (config.model == undefined || config.model == '') {
				config.model = 'Auto'
				changed.updatedConfig = config
			}
		}
		return changed
	},

	function (context, props) {
		//colorTempChange
		let changed = {
			updatedConfig: null,
			updatedActions: [],
			updatedFeedbacks: [],
		}
		props.actions.forEach((action) => {
			if (action.actionId === 'color_temp') {
				if (!['up', 'down', 'value'].includes(action.options.val)) {
					let val = action.options.val
					action.options.val = 'value'
					action.options.value = val
					changed.updatedActions.push(action)
				}
			}
		})
		return changed
	},
	function (context, props) {
		//tallyMode
		let changed = {
			updatedConfig: null,
			updatedActions: [],
			updatedFeedbacks: [],
		}
		props.actions.forEach((action) => {
			if (action.actionId === 'tally') {
				action.actionId = 'tally_mode'
				changed.updatedActions.push(action)
			}
		})
		return changed
	},
	function (context, props) {
		//actionsValueUpgrade
		let changed = {
			updatedConfig: null,
			updatedActions: [],
			updatedFeedbacks: [],
		}
		props.actions.forEach((action) => {
			if (action.actionId === 'analogAudioInGain') {
				action.options.value = action.options.val
				action.options.val = 'value'
				changed.updatedActions.push(action)
			}

			if (action.actionId === 'analogAudioOutGain') {
				action.options.value = action.options.val
				action.options.val = 'value'
				changed.updatedActions.push(action)
			}

			if (action.actionId === 'noise_reduction') {
				action.options.value = action.options.val
				action.options.val = 'value'
				changed.updatedActions.push(action)
			}

			if (action.actionId === 'wide_dynamic_range') {
				action.options.value = action.options.val
				action.options.val = 'value'
				changed.updatedActions.push(action)
			}

			if (action.actionId === 'color') {
				action.actionId = 'saturation'
				changed.updatedActions.push(action)
			}

			if (action.actionId === 'ae_response') {
				action.options.value = action.options.level
				action.options.val = 'value'
				changed.updatedActions.push(action)
			}

			if (action.actionId === 'bright_level') {
				action.options.value = action.options.level
				action.options.val = 'value'
				changed.updatedActions.push(action)
			}

			if (action.actionId === 'shutter_speed_overwrite') {
				action.options.value = action.options.val
				action.options.val = 'value'
				changed.updatedActions.push(action)
			}

			if (action.actionId === 'bg') {
				action.options.value = action.options.val
				action.options.val = 'value'
				changed.updatedActions.push(action)
			}

			if (action.actionId === 'br') {
				action.options.value = action.options.val
				action.options.val = 'value'
				changed.updatedActions.push(action)
			}

			if (action.actionId === 'gb') {
				action.options.value = action.options.val
				action.options.val = 'value'
				changed.updatedActions.push(action)
			}

			if (action.actionId === 'level') {
				action.options.value = action.options.val
				action.options.val = 'value'
				changed.updatedActions.push(action)
			}

			if (action.actionId === 'offset') {
				action.options.value = action.options.val
				action.options.val = 'value'
				changed.updatedActions.push(action)
			}

			if (action.actionId === 'phase') {
				action.options.value = action.options.val
				action.options.val = 'value'
				changed.updatedActions.push(action)
			}

			if (action.actionId === 'rb') {
				action.options.value = action.options.val
				action.options.val = 'value'
				changed.updatedActions.push(action)
			}

			if (action.actionId === 'rg') {
				action.options.value = action.options.val
				action.options.val = 'value'
				changed.updatedActions.push(action)
			}

			if (action.actionId === 'speed') {
				action.options.value = action.options.val
				action.options.val = 'value'
				changed.updatedActions.push(action)
			}

			if (action.actionId === 'threed_nr') {
				action.options.value = action.options.val
				action.options.val = 'value'
				changed.updatedActions.push(action)
			}

			if (action.actionId === 'twod_nr') {
				action.options.value = action.options.val
				action.options.val = 'value'
				changed.updatedActions.push(action)
			}
		})
		return changed
	},
	function (context, props) {
		//expCompLvlSplit
		let changed = {
			updatedConfig: null,
			updatedActions: [],
			updatedFeedbacks: [],
		}
		props.actions.forEach((action) => {
			if (action.actionId === 'expComp') {
				if (action.options.val === 'On' && action.options.level) {
					action.actionId = 'expCompLvl'
					action.options.val = 'value'
					action.options.value = action.options.level
					delete action.options.level
					changed.updatedActions.push(action)
				} else if (action.options.val === 'O' && action.options.val) {
					delete action.options.level
					changed.updatedActions.push(action)
				} else {
				}
			}
		})
		return changed
	},
]
