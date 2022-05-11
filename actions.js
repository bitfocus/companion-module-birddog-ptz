var { MODELS } = require('./models.js')
const CHOICES = require('./choices.js')

module.exports = {
	getActions() {
		this.debug(this?.camera?.model)

		MODEL_VALUES = MODELS.find((MODELS) => MODELS.id == this.camera.model).actions

		let actions = {}

		// General Camera Actions

		if (MODEL_VALUES?.standby) {
			actions['standby'] = {
				label: 'Standby On/Off',
				options: [
					{
						type: 'dropdown',
						label: 'On/Standby',
						id: 'val',
						choices: MODEL_VALUES.standby.choices,
						default: MODEL_VALUES.standby.default,
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
						choices: MODEL_VALUES.freeze.choices,
						default: MODEL_VALUES.freeze.default,
					},
				],
			}
		}

		// Analog Audio Actions

		if (MODEL_VALUES?.analogAudioInGain) {
			actions['analogAudioInGain'] = {
				label: 'Analog Audio In Gain',
				options: [
					{
						type: 'number',
						label:
							'Analog Audio In Gain (dB) (' +
							MODEL_VALUES.analogAudioInGain.range.min +
							' to ' +
							MODEL_VALUES.analogAudioInGain.range.max +
							')',
						id: 'val',
						default: MODEL_VALUES.analogAudioInGain.range.default,
						min: MODEL_VALUES.analogAudioInGain.range.min,
						max: MODEL_VALUES.analogAudioInGain.range.max,
					},
				],
			}
		}
		if (MODEL_VALUES?.analogAudioOutGain) {
			actions['analogAudioOutGain'] = {
				label: 'Analog Audio Out Gain',
				options: [
					{
						type: 'number',
						label:
							'Analog Audio Out Gain (dB) (' +
							MODEL_VALUES.analogAudioOutGain.range.min +
							' to ' +
							MODEL_VALUES.analogAudioOutGain.range.max +
							')',
						id: 'val',
						default: MODEL_VALUES.analogAudioOutGain.range.default,
						min: MODEL_VALUES.analogAudioOutGain.range.min,
						max: MODEL_VALUES.analogAudioOutGain.range.max,
					},
				],
			}
		}
		if (MODEL_VALUES?.analogAudioOutput) {
			actions['analogAudioOutput'] = {
				label: 'Analog Audio Output Select',
				options: [
					{
						type: 'dropdown',
						label: 'Decode Comms / Decode Loop',
						id: 'val',
						choices: MODEL_VALUES.analogAudioOutput.choices,
						default: MODEL_VALUES.analogAudioOutput.default,
					},
				],
			}
		}

		// Video Output Interface Actions

		// Encode Setup Actions

		if (MODEL_VALUES?.encodeBandwidth) {
			actions['encodeBandwidth'] = {
				label: 'Encode Bandwidth',
				options: [
					{
						type: 'dropdown',
						label: 'Manual / NDI Managed',
						id: 'val',
						choices: MODEL_VALUES.encodeBandwidth.choices,
						default: MODEL_VALUES.encodeBandwidth.default,
					},
					{
						type: 'number',
						label:
							'Bandwidth Select (' +
							MODEL_VALUES.encodeBandwidth.range.min +
							' to ' +
							MODEL_VALUES.encodeBandwidth.range.max +
							')',
						id: 'bandwidth',
						default: MODEL_VALUES.encodeBandwidth.range.default,
						min: MODEL_VALUES.encodeBandwidth.range.min,
						max: MODEL_VALUES.encodeBandwidth.range.max,
						isVisible: (action) => action.options.val === 'Manual',
					},
				],
			}
		}
		if (MODEL_VALUES?.ndiAudio) {
			actions['ndiAudio'] = {
				label: 'NDI Audio',
				options: [
					{
						type: 'dropdown',
						label: 'Analog / Mute',
						id: 'val',
						choices: MODEL_VALUES.ndiAudio.choices,
						default: MODEL_VALUES.ndiAudio.default,
					},
				],
			}
		}
		if (MODEL_VALUES?.ndiGroupEnable) {
			actions['ndiGroupEnable'] = {
				label: 'NDI Group Enable',
				options: [
					{
						type: 'dropdown',
						label: 'NDI Group Enable',
						id: 'val',
						choices: MODEL_VALUES.ndiGroupEnable.choices,
						default: MODEL_VALUES.ndiGroupEnable.default,
					},
				],
			}
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
		if (MODEL_VALUES?.transmit_method) {
			actions['transmit_method'] = {
				label: 'Transmit Method',
				options: [
					{
						type: 'dropdown',
						label: 'Method',
						id: 'val',
						choices: MODEL_VALUES.transmit_method.choices,
						default: MODEL_VALUES.transmit_method.default,
					},
				],
			}
		}
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
						type: 'number',
						label: 'Pan Speed(' + MODEL_VALUES.panSpeed.range.min + ' to ' + MODEL_VALUES.panSpeed.range.max + ')',
						id: 'panSpeed',
						default: MODEL_VALUES.panSpeed.range.default,
						min: MODEL_VALUES.panSpeed.range.min,
						max: MODEL_VALUES.panSpeed.range.max,
						isVisible: (action) => action.options.override === true || action.options.val === 'direct',
					},
					{
						type: 'number',
						label: 'Tilt Speed (' + MODEL_VALUES.tiltSpeed.range.min + ' to ' + MODEL_VALUES.tiltSpeed.range.max + ')',
						id: 'tiltSpeed',
						default: MODEL_VALUES.tiltSpeed.range.default,
						min: MODEL_VALUES.tiltSpeed.range.min,
						max: MODEL_VALUES.tiltSpeed.range.max,
						isVisible: (action) => action.options.override === true || action.options.val === 'direct',
					},
				],
			}
		}
		if (MODEL_VALUES?.zoom) {
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
						label: 'Speed (' + MODEL_VALUES.zoomSpeed.range.min + ' to ' + MODEL_VALUES.zoomSpeed.range.max + ')',
						id: 'speed',
						default: MODEL_VALUES.zoomSpeed.range.default,
						min: MODEL_VALUES.zoomSpeed.range.min,
						max: MODEL_VALUES.zoomSpeed.range.max,
						isVisible: (action) => action.options.override === true,
					},
				],
			}
		}
		if (MODEL_VALUES?.panSpeed) {
			actions['panSpeed'] = {
				label: 'Pan Speed',
				options: [
					{
						type: 'dropdown',
						label: 'Action',
						id: 'type',
						choices: MODEL_VALUES.panSpeed.choices,
						default: MODEL_VALUES.panSpeed.default,
					},
					{
						type: 'number',
						label: 'Speed (' + MODEL_VALUES.panSpeed.range.min + ' to ' + MODEL_VALUES.panSpeed.range.max + ')',
						id: 'value',
						default: MODEL_VALUES.panSpeed.range.default,
						min: MODEL_VALUES.panSpeed.range.min,
						max: MODEL_VALUES.panSpeed.range.max,
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
						choices: MODEL_VALUES.tiltSpeed.choices,
						default: MODEL_VALUES.tiltSpeed.default,
					},
					{
						type: 'number',
						label: 'Speed (' + MODEL_VALUES.tiltSpeed.range.min + ' to ' + MODEL_VALUES.tiltSpeed.range.max + ')',
						id: 'value',
						default: MODEL_VALUES.tiltSpeed.range.default,
						min: MODEL_VALUES.tiltSpeed.range.min,
						max: MODEL_VALUES.tiltSpeed.range.max,
						isVisible: (action) => action.options.type === 'value',
					},
				],
			}
		}
		if (MODEL_VALUES?.zoomSpeed) {
			actions['zoomSpeed'] = {
				label: 'Zoom Speed',
				options: [
					{
						type: 'dropdown',
						label: 'Action',
						id: 'type',
						choices: MODEL_VALUES.zoomSpeed.choices,
						default: MODEL_VALUES.zoomSpeed.default,
					},
					{
						type: 'number',
						label: 'Speed (' + MODEL_VALUES.zoomSpeed.range.min + ' to ' + MODEL_VALUES.zoomSpeed.range.max + ')',
						id: 'value',
						default: MODEL_VALUES.zoomSpeed.range.default,
						min: MODEL_VALUES.zoomSpeed.range.min,
						max: MODEL_VALUES.zoomSpeed.range.max,
						isVisible: (action) => action.options.type === 'value',
					},
				],
			}
		}
		if (MODEL_VALUES?.savePset) {
			actions['savePset'] = {
				label: 'Save Preset',
				options: [
					{
						type: 'number',
						label: 'Preset Number (' + MODEL_VALUES.savePset.range.min + ' to ' + MODEL_VALUES.savePset.range.max + ')',
						id: 'val',
						default: MODEL_VALUES.savePset.range.default,
						min: MODEL_VALUES.savePset.range.min,
						max: MODEL_VALUES.savePset.range.max,
					},
				],
			}
		}
		if (MODEL_VALUES?.recallPset) {
			actions['recallPset'] = {
				label: 'Recall Preset',
				options: [
					{
						type: 'number',
						label: 'Preset Number (' + MODEL_VALUES.savePset.range.min + ' to ' + MODEL_VALUES.savePset.range.max + ')',
						id: 'val',
						default: MODEL_VALUES.savePset.range.default,
						min: MODEL_VALUES.savePset.range.min,
						max: MODEL_VALUES.savePset.range.max,
					},
				],
			}
		}
		// Focus Actions

		if (MODEL_VALUES?.focus) {
			actions['focus'] = {
				label: 'Focus',
				options: [
					{
						type: 'dropdown',
						label: 'Direction',
						id: 'val',
						choices: MODEL_VALUES.focus.choices,
						default: MODEL_VALUES.focus.default,
					},
				],
			}
		}
		if (MODEL_VALUES?.focusM) {
			actions['focusM'] = {
				label: 'Focus Mode',
				options: [
					{
						type: 'dropdown',
						label: 'Mode',
						id: 'val',
						choices: MODEL_VALUES.focusM.choices,
						default: MODEL_VALUES.focusM.default,
					},
				],
			}
		}

		// Exposure Actions

		if (MODEL_VALUES?.ae_response) {
			actions['ae_response'] = {
				label: 'Ae Repsonse',
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
			}
		}

		if (MODEL_VALUES?.backlight) {
			actions['backlight'] = {
				label: 'Backlight',
				options: [
					{
						type: 'dropdown',
						label: 'On / Off',
						id: 'mode',
						choices: MODEL_VALUES.backlight.choices,
						default: MODEL_VALUES.backlight.default,
					},
				],
			}
		}

		if (MODEL_VALUES?.bright_level) {
			actions['bright_level'] = {
				label: 'Bright Level',
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
			}
		}

		if (MODEL_VALUES?.expComp) {
			actions['expComp'] = {
				label: 'Exposure Compensation',
				options: [
					{
						type: 'dropdown',
						label: 'On / Off',
						id: 'val',
						choices: MODEL_VALUES.expComp.choices,
						default: MODEL_VALUES.expComp.default,
					},
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
						isVisible: (action) => action.options.val === 'On',
					},
				],
			}
		}

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
						label: this.camera.expsetup?.GainLimit ? 'Value (to Gain Limit)' : 'Value',
						id: 'value',
						choices: this.camera.expsetup?.GainLimit
							? MODEL_VALUES.gain.choices.slice(0, parseInt(this.camera.expsetup.GainLimit, 10) + 1)
							: MODEL_VALUES.gain.choices,
						default: MODEL_VALUES.gain.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
			}
		}

		if (MODEL_VALUES?.gain_limit) {
			actions['gainLimit'] = {
				label: 'Gain Limit',
				options: [
					{
						type: 'dropdown',
						label: 'Gain Limit',
						id: 'val',
						choices: CHOICES.UP_DOWN_VALUE,
						default: 'up',
					},
					{
						type: 'dropdown',
						label: 'Value',
						id: 'value',
						choices: MODEL_VALUES.gain.choices.slice(
							MODEL_VALUES.gainLimit.range.min,
							MODEL_VALUES.gainLimit.range.max + 1
						),
						default: MODEL_VALUES.gainLimit.range.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
			}
		}

		if (MODEL_VALUES?.gain_point) {
			actions['gainPoint'] = {
				label: 'Gain Point',
				options: [
					{
						type: 'dropdown',
						label: 'Gain Point',
						id: 'val',
						choices: CHOICES.ON_OFF,
						default: 'On',
					},
				],
			}
		}

		if (MODEL_VALUES?.gain_point) {
			actions['gainPointPosition'] = {
				label: 'Gain Point Position',
				options: [
					{
						type: 'dropdown',
						label: 'Gain Point',
						id: 'val',
						choices: CHOICES.UP_DOWN_VALUE,
						default: 'up',
					},
					{
						type: 'dropdown',
						label: 'Value',
						id: 'value',
						choices: MODEL_VALUES.gain.choices.slice(0, parseInt(this.camera.expsetup.GainLimit, 10) + 1),
						default: MODEL_VALUES.gain.default,
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

		if (MODEL_VALUES?.shutter_control_overwrite) {
			actions['shutter_control_overwrite'] = {
				label: 'Shutter Control Overwrite',
				options: [
					{
						type: 'dropdown',
						label: 'On/Off',
						id: 'val',
						choices: MODEL_VALUES.shutter_control_overwrite.choices,
						default: MODEL_VALUES.shutter_control_overwrite.default,
					},
				],
			}
		}

		if (MODEL_VALUES?.shutter_max_speed) {
			actions['shutter_max_speed'] = {
				label: 'Shutter Max Speed',
				options: [
					{
						type: 'dropdown',
						label: 'Shutter Max Speed',
						id: 'val',
						choices: CHOICES.UP_DOWN_VALUE,
						default: 'up',
					},
					{
						type: 'dropdown',
						label: 'Value',
						id: 'value',
						choices: MODEL_VALUES.shut?.['shutter_' + [this.camera.framerate]].slice(
							MODEL_VALUES.shutter_max_speed.range.min,
							MODEL_VALUES.shutter_max_speed.range.max + 1
						),
						default: MODEL_VALUES.shutter_max_speed.range.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
			}
		}

		if (MODEL_VALUES?.shutter_min_speed) {
			actions['shutter_min_speed'] = {
				label: 'Shutter Max Speed',
				options: [
					{
						type: 'dropdown',
						label: 'Shutter Min Speed',
						id: 'val',
						choices: CHOICES.UP_DOWN_VALUE,
						default: 'up',
					},
					{
						type: 'dropdown',
						label: 'Value',
						id: 'value',
						choices: MODEL_VALUES.shut?.['shutter_' + [this.camera.framerate]].slice(
							MODEL_VALUES.shutter_min_speed.range.min,
							parseInt(this.camera.expsetup.ShutterMaxSpeed, 10) + 1
						),
						default: MODEL_VALUES.shutter_max_speed.range.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
			}
		}

		if (MODEL_VALUES?.shutter_speed) {
			actions['shut'] = {
				label: 'Shutter Speed',
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
						choices: MODEL_VALUES.shut?.['shutter_' + [this.camera.framerate]],
						default: MODEL_VALUES.shut.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
			}
		}

		if (MODEL_VALUES?.shutter_speed_overwrite) {
			actions['shutter_speed_overwrite'] = {
				label: 'Shutter Speed Overwrite',
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
			}
		}

		if (MODEL_VALUES?.slow_shutter_en) {
			actions['slow_shutter_en'] = {
				label: 'Slow Shutter Enable',
				options: [
					{
						type: 'dropdown',
						label: 'On/Off',
						id: 'val',
						choices: MODEL_VALUES.slow_shutter_en.choices,
						default: MODEL_VALUES.slow_shutter_en.default,
					},
				],
			}
		}

		if (MODEL_VALUES?.slow_shutter_limit) {
			actions['slow_shutter_limit'] = {
				label: 'Slow Shutter Limit',
				options: [
					{
						type: 'dropdown',
						label: 'Slow Shutter Limit',
						id: 'val',
						choices: CHOICES.UP_DOWN_VALUE,
						default: 'up',
					},
					{
						type: 'dropdown',
						label: 'Value',
						id: 'value',
						choices: MODEL_VALUES.shut?.['shutter_' + [this.camera.framerate]].slice(
							MODEL_VALUES.slow_shutter_limit.range.min,
							MODEL_VALUES.slow_shutter_limit.range.max + 1
						),
						default: MODEL_VALUES.slow_shutter_limit.range.default,
						isVisible: (action) => action.options.val === 'value',
					},
				],
			}
		}

		if (MODEL_VALUES?.spotlight) {
			actions['spotlight'] = {
				label: 'Spotlight',
				options: [
					{
						type: 'dropdown',
						label: 'On/Off',
						id: 'val',
						choices: MODEL_VALUES.spotlight.choices,
						default: MODEL_VALUES.spotlight.default,
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
		if (MODEL_VALUES?.wbOnePush) {
			actions['wbOnePush'] = {
				label: 'White Balance One Push Trigger',
				description: 'Camera must be in One Push mode in order to use this action',
			}
		}
		if (MODEL_VALUES?.gainBlue) {
			actions['gainBlue'] = {
				label: 'Gain Blue',
				options: [
					{
						type: 'dropdown',
						label: 'Gain Blue',
						id: 'val',
						choices: MODEL_VALUES.gainBlue.choices,
						default: MODEL_VALUES.gainBlue.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_VALUES.gainBlue.range.min + ' to ' + MODEL_VALUES.gainBlue.range.max + ')',
						id: 'value',
						default: MODEL_VALUES.gainBlue.range.default,
						min: MODEL_VALUES.gainBlue.range.min,
						max: MODEL_VALUES.gainBlue.range.max,
						isVisible: (action) => action.options.val === 'value',
					},
				],
			}
		}
		if (MODEL_VALUES?.gainRed) {
			actions['gainRed'] = {
				label: 'Gain Red',
				options: [
					{
						type: 'dropdown',
						label: 'Gain Red',
						id: 'val',
						choices: MODEL_VALUES.gainRed.choices,
						default: MODEL_VALUES.gainRed.default,
					},
					{
						type: 'number',
						label: 'Value (' + MODEL_VALUES.gainRed.range.min + ' to ' + MODEL_VALUES.gainRed.range.max + ')',
						id: 'value',
						default: MODEL_VALUES.gainRed.range.default,
						min: MODEL_VALUES.gainRed.range.min,
						max: MODEL_VALUES.gainRed.range.max,
						isVisible: (action) => action.options.val === 'value',
					},
				],
			}
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

		if (MODEL_VALUES?.picFlip) {
			actions['picFlip'] = {
				label: 'Picture Flip',
				options: [
					{
						type: 'dropdown',
						label: 'On / Off',
						id: 'val',
						choices: MODEL_VALUES.picFlip.choices,
						default: MODEL_VALUES.picFlip.default,
					},
				],
			}
		}
		if (MODEL_VALUES?.picMirror) {
			actions['picMirror'] = {
				label: 'Picture Mirror',
				options: [
					{
						type: 'dropdown',
						label: 'On / Off',
						id: 'val',
						choices: MODEL_VALUES.picFlip.choices,
						default: MODEL_VALUES.picFlip.default,
					},
				],
			}
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
						label: 'Value (' + MODEL_VALUES.contrast.range.min + ' to ' + MODEL_VALUES.contrast.range.max + ')',
						id: 'value',
						min: MODEL_VALUES.contrast.range.min,
						max: MODEL_VALUES.contrast.range.max,
						default: MODEL_VALUES.contrast.range.default,
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
		return Object.fromEntries(Object.entries(actions).sort())
	},
}
