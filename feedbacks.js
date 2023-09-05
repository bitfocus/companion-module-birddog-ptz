import { getModelActions, sortByLabel } from './utils.js'
import { MODEL_SPECS } from './models.js'
import CHOICES from './choices.js'
import { combineRgb } from '@companion-module/base'

export function getFeedbacks() {
	const ColorWhite = combineRgb(255, 255, 255) // White
	const ColorBlack = combineRgb(0, 0, 0) // Black
	const ColorRed = combineRgb(255, 0, 0) // Red
	const ColorGreen = combineRgb(0, 255, 0) // Green
	const ColorOrange = combineRgb(255, 102, 0) // Orange

	let MODEL_ACTIONS = getModelActions(MODEL_SPECS, this.camera.firmware.major, this.camera.model)

	const feedbacks = {}

	// General Camera Feedback

	if (MODEL_ACTIONS?.standby) {
		feedbacks.standby_status = {
			type: 'boolean',
			name: MODEL_ACTIONS.standby.name,
			description: 'If the camera is in standby, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'On/Standby',
					id: 'val',
					choices: MODEL_ACTIONS.standby.choices,
					default: MODEL_ACTIONS.standby.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.standby == feedback.options.val
			},
		}
	}

	if (MODEL_ACTIONS?.freeze) {
		feedbacks.freeze_status = {
			type: 'boolean',
			name: MODEL_ACTIONS.freeze.name,
			description: 'If the camera matches the selected freeze status, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'On / Off',
					id: 'val',
					choices: MODEL_ACTIONS.freeze.choices,
					default: MODEL_ACTIONS.freeze.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.freeze == feedback.options.val
			},
		}
	}
	// Analog Audio Feedback

	if (MODEL_ACTIONS?.analogAudioInGain) {
		feedbacks.analogAudioInGain = {
			type: 'boolean',
			name: MODEL_ACTIONS.analogAudioInGain.name,
			description: 'If the camera matches the selected Audio Out Gain, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label:
						'Analog Audio In Gain (dB) (' +
						MODEL_ACTIONS.analogAudioInGain.range.min +
						' to ' +
						MODEL_ACTIONS.analogAudioInGain.range.max +
						')',
					id: 'val',
					default: MODEL_ACTIONS.analogAudioInGain.range.default,
					min: MODEL_ACTIONS.analogAudioInGain.range.min,
					max: MODEL_ACTIONS.analogAudioInGain.range.max,
				},
			],
			callback: (feedback) => {
				return this.camera?.analogAudioInGain == feedback.options.val
			},
		}
	}

	if (MODEL_ACTIONS?.analogAudioOutGain) {
		feedbacks.analogAudioOutGain = {
			type: 'boolean',
			name: MODEL_ACTIONS.analogAudioOutGain.name,
			description: 'If the camera matches the selected Audio Out Gain, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label:
						'Analog Audio Out Gain (dB) (' +
						MODEL_ACTIONS.analogAudioOutGain.range.min +
						' to ' +
						MODEL_ACTIONS.analogAudioOutGain.range.max +
						')',
					id: 'val',
					default: MODEL_ACTIONS.analogAudioOutGain.range.default,
					min: MODEL_ACTIONS.analogAudioOutGain.range.min,
					max: MODEL_ACTIONS.analogAudioOutGain.range.max,
				},
			],
			callback: (feedback) => {
				return this.camera?.analogAudioOutGain == feedback.options.val
			},
		}
	}

	if (MODEL_ACTIONS?.analogAudioOutput) {
		feedbacks.analogAudioOutput = {
			type: 'boolean',
			name: MODEL_ACTIONS.analogAudioOutput.name,
			description: 'If the camera matches the selected audio ouptut selector, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Decode Comms / Decode Loop',
					id: 'val',
					choices: MODEL_ACTIONS.analogAudioOutput.choices,
					default: MODEL_ACTIONS.analogAudioOutput.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.analogAudioOutput == feedback.options.val
			},
		}
	}

	// Video Output Interface Feedback

	if (MODEL_ACTIONS?.video_output) {
		feedbacks.video_output = {
			type: 'boolean',
			name: MODEL_ACTIONS.video_output.name,
			description: 'If the camera matches the selected Video Output mode, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Mode',
					id: 'val',
					choices: MODEL_ACTIONS.video_output.choices,
					default: MODEL_ACTIONS.video_output.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.video_output == feedback.options.val
			},
		}
	}

	// Encode Setup Feedback

	if (MODEL_ACTIONS?.bandwidth_mode) {
		feedbacks.bandwidth_mode = {
			type: 'boolean',
			name: MODEL_ACTIONS.bandwidth_mode.name,
			description: 'If the camera matches the selected encode bandwidth mode, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Manual / NDI Managed',
					id: 'val',
					choices: MODEL_ACTIONS.bandwidth_mode.choices,
					default: MODEL_ACTIONS.bandwidth_mode.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.bandwidth_mode == feedback.options.val
			},
		}
	}

	if (MODEL_ACTIONS?.ndiAudio) {
		feedbacks.ndiAudio = {
			type: 'boolean',
			name: MODEL_ACTIONS.ndiAudio.name,
			description: 'If the camera matches the selected NDI Audio selector, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Analog / Mute',
					id: 'val',
					choices: MODEL_ACTIONS.ndiAudio.choices,
					default: MODEL_ACTIONS.ndiAudio.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.ndiAudio == feedback.options.val
			},
		}
	}

	if (MODEL_ACTIONS?.ndiGroupEnable) {
		feedbacks.ndiGroupEnable = {
			type: 'boolean',
			name: MODEL_ACTIONS.ndiGroupEnable.name,
			description:
				'If the camera matches the selected NDI Group Enable  selector, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'NDI Group Enable',
					id: 'val',
					choices: MODEL_ACTIONS.ndiGroupEnable.choices,
					default: MODEL_ACTIONS.ndiGroupEnable.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.ndiGroupEnable == feedback.options.val
			},
		}
	}

	if (MODEL_ACTIONS?.screensaver_mode) {
		feedbacks.screensaver_mode = {
			type: 'boolean',
			name: MODEL_ACTIONS.screensaver_mode.name,
			description: 'If the camera matches the selected ScreenSaver Mode, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'ScreenSaver Mode',
					id: 'val',
					choices: MODEL_ACTIONS.screensaver_mode.choices,
					default: MODEL_ACTIONS.screensaver_mode.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.screensaver_mode == feedback.options.val
			},
		}
	}

	if (MODEL_ACTIONS?.stream_to_network) {
		feedbacks.stream_to_network = {
			type: 'boolean',
			name: MODEL_ACTIONS.stream_to_network.name,
			description: 'If the camera matches the selected Stream to Network state, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'On/Off',
					id: 'val',
					choices: MODEL_ACTIONS.stream_to_network.choices,
					default: MODEL_ACTIONS.stream_to_network.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.stream_to_network == feedback.options.val
			},
		}
	}

	if (MODEL_ACTIONS?.tally_mode) {
		feedbacks.tally_mode = {
			type: 'boolean',
			name: MODEL_ACTIONS.tally_mode.name,
			description: 'If the camera tally matches the selected mode, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Mode',
					id: 'mode',
					choices: MODEL_ACTIONS.tally_mode.choices,
					default: MODEL_ACTIONS.tally_mode.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.tally_mode == feedback.options.mode
			},
		}
	}

	// Encode Transport Feedback

	if (MODEL_ACTIONS?.transmit_method) {
		feedbacks.transmit_method = {
			type: 'boolean',
			name: MODEL_ACTIONS.transmit_method.name,
			description: 'If the camera matches the selected transmit method, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Method',
					id: 'val',
					choices: MODEL_ACTIONS.transmit_method.choices,
					default: MODEL_ACTIONS.transmit_method.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.transmit_method == feedback.options.val
			},
		}
	}

	// NDI Discovery Server Feedback

	if (MODEL_ACTIONS?.ndi_discovery_server) {
		feedbacks.ndi_discovery_server = {
			type: 'boolean',
			name: MODEL_ACTIONS.ndi_discovery_server.name,
			description:
				'If the camera matches the selected NDI Discovery Server status, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Enabled / Disabled',
					id: 'val',
					choices: MODEL_ACTIONS.ndi_discovery_server.choices,
					default: MODEL_ACTIONS.ndi_discovery_server.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.ndi_discovery_server == feedback.options.val
			},
		}
	}

	// PTZ Feedback
	let speedMode = !this.camera.speedControl || this.camera.speedControl === 'standard' ? true : false
	let panSpeedMax = speedMode ? 21 : 255
	let panSpeedDefault = speedMode ? 11 : 255
	let tiltSpeedMax = speedMode ? 18 : 255
	let tiltSpeedDefault = speedMode ? 9 : 255

	if (MODEL_ACTIONS?.pt) {
		feedbacks.posPan = {
			type: 'boolean',
			name: `PTZ - Pan Position`,
			description: 'If the camera matches the selected Pan Position, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Pan Position',
					id: 'posPan',
					choices: MODEL_ACTIONS.pt.posPanChoices,
					default: MODEL_ACTIONS.pt.posPanDefault,
				},
			],
			callback: (feedback) => {
				return this.camera?.pan_position == feedback.options.posPan
			},
		}

		feedbacks.posTilt = {
			type: 'boolean',
			name: `PTZ - Tilt Position`,
			description: 'If the camera matches the selected Tilt Position, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Tilt Position',
					id: 'posTilt',
					choices: MODEL_ACTIONS.pt.posTiltChoices,
					default: MODEL_ACTIONS.pt.posTiltDefault,
				},
			],
			callback: (feedback) => {
				return this.camera?.tilt_position == feedback.options.posTilt
			},
		}
	}

	if (MODEL_ACTIONS?.zoom) {
		feedbacks.posZoom = {
			type: 'boolean',
			name: `PTZ - Zoom Position`,
			description: 'If the camera matches the selected Zoom Position, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Zoom Position',
					id: 'posZoom',
					choices: MODEL_ACTIONS.zoom.posZoomChoices,
					default: MODEL_ACTIONS.zoom.posZoomDefault,
				},
			],
			callback: (feedback) => {
				return this.camera?.zoom_position == feedback.options.posZoom
			},
		}
	}

	if (MODEL_ACTIONS?.panSpeed) {
		feedbacks.panSpeed = {
			type: 'boolean',
			name: MODEL_ACTIONS.panSpeed.name,
			description: 'If the camera matches the selected Pan Speed, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: `Speed (0 to ${panSpeedMax})`,
					id: 'value',
					default: panSpeedDefault,
					min: 0,
					max: panSpeedMax,
					range: true,
				},
			],
			callback: (feedback) => {
				return this.camera?.panSpeed == feedback.options.value
			},
		}
	}

	if (MODEL_ACTIONS?.preset) {
		feedbacks.preset = {
			type: 'boolean',
			name: MODEL_ACTIONS.preset.name,
			description: 'If the camera matches the selected Preset Mode, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Preset Mode',
					id: 'val',
					choices: MODEL_ACTIONS.preset.choices,
					default: MODEL_ACTIONS.preset.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.preset == feedback.options.val
			},
		}
	}

	if (MODEL_ACTIONS?.preset_speed) {
		feedbacks.preset_speed = {
			type: 'boolean',
			name: MODEL_ACTIONS.preset_speed.name,
			description: 'If the camera matches the selected Preset Speed, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Speed (' + MODEL_ACTIONS.preset_speed.range.min + ' to ' + MODEL_ACTIONS.preset_speed.range.max + ')',
					id: 'value',
					default: MODEL_ACTIONS.preset_speed.range.default,
					min: MODEL_ACTIONS.preset_speed.range.min,
					max: MODEL_ACTIONS.preset_speed.range.max,
				},
			],
			callback: (feedback) => {
				return this.camera?.preset_speed == feedback.options.value
			},
		}
	}

	if (MODEL_ACTIONS?.tiltSpeed) {
		feedbacks.tiltSpeed = {
			type: 'boolean',
			name: MODEL_ACTIONS.tiltSpeed.name,
			description: 'If the camera matches the selected Tilt Speed, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: `Speed (0 to ${tiltSpeedMax})`,
					id: 'value',
					default: tiltSpeedDefault,
					min: 0,
					max: tiltSpeedMax,
					range: true,
				},
			],
			callback: (feedback) => {
				return this.camera?.tiltSpeed == feedback.options.value
			},
		}
	}

	if (MODEL_ACTIONS?.zoomSpeed) {
		feedbacks.zoomSpeed = {
			type: 'boolean',
			name: MODEL_ACTIONS.zoomSpeed.name,
			description: 'If the camera matches the selected Zoom Speed, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Speed (' + MODEL_ACTIONS.zoomSpeed.range.min + ' to ' + MODEL_ACTIONS.zoomSpeed.range.max + ')',
					id: 'value',
					default: MODEL_ACTIONS.zoomSpeed.range.default,
					min: MODEL_ACTIONS.zoomSpeed.range.min,
					max: MODEL_ACTIONS.zoomSpeed.range.max,
				},
			],
			callback: (feedback) => {
				return this.camera?.zoomSpeed == feedback.options.value
			},
		}
	}

	if (MODEL_ACTIONS?.speedControl) {
		feedbacks.speedControl = {
			type: 'boolean',
			name: MODEL_ACTIONS.speedControl.name,
			description: 'If the camera matches the selected speed mode, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Speed Mode',
					id: 'val',
					choices: MODEL_ACTIONS.speedControl.choices,
					default: MODEL_ACTIONS.speedControl.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.speedControl == feedback.options.val
			},
		}
	}

	// Focus Feedback

	if (MODEL_ACTIONS?.focusM) {
		feedbacks.focusMode = {
			type: 'boolean',
			name: MODEL_ACTIONS.focusM.name,
			description: 'If the camera matches the selected focus mode, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Mode',
					id: 'mode',
					choices: MODEL_ACTIONS.focusM.choices,
					default: MODEL_ACTIONS.focusM.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.focusM == feedback.options.mode
			},
		}
	}

	// Exposure Feedback

	if (MODEL_ACTIONS?.ae_response) {
		feedbacks.ae_response = {
			type: 'boolean',
			name: MODEL_ACTIONS.ae_response.name,
			description: 'If the camera matches the selected Ae Response level, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label:
						'Ae Response (' + MODEL_ACTIONS.ae_response.range.min + ' to ' + MODEL_ACTIONS.ae_response.range.max + ')',
					id: 'level',
					default: MODEL_ACTIONS.ae_response.range.default,
					min: MODEL_ACTIONS.ae_response.range.min,
					max: MODEL_ACTIONS.ae_response.range.max,
				},
			],
			callback: (feedback) => {
				return this.camera?.ae_response == feedback.options.level
			},
		}
	}

	if (MODEL_ACTIONS?.backlight) {
		feedbacks.backlight = {
			type: 'boolean',
			name: MODEL_ACTIONS.backlight.name,
			description: 'If the camera has Backlight on, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'On / Off',
					id: 'mode',
					choices: MODEL_ACTIONS.backlight.choices,
					default: MODEL_ACTIONS.backlight.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.backlight == feedback.options.mode
			},
		}
	}

	if (MODEL_ACTIONS?.bright_level) {
		feedbacks.bright_level = {
			type: 'boolean',
			name: MODEL_ACTIONS.bright_level.name,
			description: 'If the camera matches the selected Bright Level, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Level (' + MODEL_ACTIONS.bright_level.range.min + ' to ' + MODEL_ACTIONS.bright_level.range.max + ')',
					id: 'level',
					default: MODEL_ACTIONS.bright_level.range.default,
					min: MODEL_ACTIONS.bright_level.range.min,
					max: MODEL_ACTIONS.bright_level.range.max,
				},
			],
			callback: (feedback) => {
				return this.camera?.bright_level == feedback.options.level
			},
		}
	}

	if (MODEL_ACTIONS?.expComp) {
		feedbacks.exposureoCmpEn = {
			type: 'boolean',
			name: MODEL_ACTIONS.expComp.name,
			description:
				'If the camera matches the selected exposure compensation status, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'On / Off',
					id: 'mode',
					choices: MODEL_ACTIONS.expComp.choices,
					default: MODEL_ACTIONS.expComp.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.expComp == feedback.options.mode
			},
		}
	}

	if (MODEL_ACTIONS?.expCompLvl) {
		feedbacks.exposureCompLvl = {
			type: 'boolean',
			name: MODEL_ACTIONS.expCompLvl.name,
			description:
				'If the camera matches the selected exposure compensation level, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label:
						'Exposure Compensation Level (' +
						MODEL_ACTIONS.expCompLvl.range.min +
						' to ' +
						MODEL_ACTIONS.expCompLvl.range.max +
						')',
					id: 'level',
					default: MODEL_ACTIONS.expCompLvl.range.default,
					min: MODEL_ACTIONS.expCompLvl.range.min,
					max: MODEL_ACTIONS.expCompLvl.range.max,
				},
			],
			callback: (feedback) => {
				return this.camera?.expCompLvl == feedback.options.level
			},
		}
	}

	if (MODEL_ACTIONS?.exposure_mode) {
		feedbacks.exposureMode = {
			type: 'boolean',
			name: MODEL_ACTIONS.exposure_mode.name,
			description: 'If the camera matches the selected exposure mode, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Mode',
					id: 'mode',
					choices: MODEL_ACTIONS.exposure_mode.choices,
					default: MODEL_ACTIONS.exposure_mode.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.exposure_mode == feedback.options.mode
			},
		}
	}

	if (MODEL_ACTIONS?.gain) {
		feedbacks.gain = {
			type: 'boolean',
			name: MODEL_ACTIONS.gain.name,
			description: 'If the camera matches the selected gain, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Gain (dB)',
					id: 'gain',
					choices: MODEL_ACTIONS.gain.choices,
					default: MODEL_ACTIONS.gain.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.gain == feedback.options.gain
			},
		}
	}

	if (MODEL_ACTIONS?.gain_limit) {
		feedbacks.gain_limit = {
			type: 'boolean',
			name: MODEL_ACTIONS.gain_limit.name,
			description: 'If the camera matches the selected gain limit, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Gain Limit (dB)',
					id: 'gain',
					choices: MODEL_ACTIONS.gain.choices.slice(
						MODEL_ACTIONS.gain_limit.range.min - 1,
						MODEL_ACTIONS.gain_limit.range.max + 1
					),
					default: MODEL_ACTIONS.gain_limit.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.gain_limit == feedback.options.gain
			},
		}
	}

	if (MODEL_ACTIONS?.gain_point) {
		feedbacks.gain_point = {
			type: 'boolean',
			name: MODEL_ACTIONS.gain_point.name,
			description: 'If the camera has gain point on, change the default style of the button',
			defaultStyle: {
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
				return this.camera?.gain_point == feedback.options.val
			},
		}
	}

	if (MODEL_ACTIONS?.gain_point_position) {
		feedbacks.gain_point_position = {
			type: 'boolean',
			name: MODEL_ACTIONS.gain_point_position.name,
			description: 'If the camera matches the selected gain point, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Gain Point (dB)',
					id: 'gain',
					choices: MODEL_ACTIONS.gain.choices,
					default: MODEL_ACTIONS.gain.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.gain_point_position == feedback.options.gain
			},
		}
	}

	if (MODEL_ACTIONS?.high_sensitivity) {
		feedbacks.high_sensitivity = {
			type: 'boolean',
			name: MODEL_ACTIONS.high_sensitivity.name,
			description: 'If the camera has high sensitivity turned on, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'On / Off',
					id: 'val',
					choices: MODEL_ACTIONS.high_sensitivity.choices,
					default: MODEL_ACTIONS.high_sensitivity.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.high_sensitivity == feedback.options.val
			},
		}
	}

	if (MODEL_ACTIONS?.iris) {
		feedbacks.iris = {
			type: 'boolean',
			name: MODEL_ACTIONS.iris.name,
			description: 'If the camera matches the selected Iris value, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Iris',
					id: 'val',
					choices: MODEL_ACTIONS.iris.choices,
					default: MODEL_ACTIONS.iris.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.iris == feedback.options.val
			},
		}
	}

	if (MODEL_ACTIONS?.shutter_control_overwrite) {
		feedbacks.shutter_control_overwrite = {
			type: 'boolean',
			name: MODEL_ACTIONS.shutter_control_overwrite.name,
			description: 'If the camera has Shutter Control Overwrite turned on, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'On/Off',
					id: 'val',
					choices: MODEL_ACTIONS.shutter_control_overwrite.choices,
					default: MODEL_ACTIONS.shutter_control_overwrite.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.shutter_control_overwrite == feedback.options.val
			},
		}
	}

	if (MODEL_ACTIONS?.shutter_max_speed) {
		feedbacks.shushutter_max_speedt = {
			type: 'boolean',
			name: MODEL_ACTIONS.shutter_max_speed.name,
			description: 'If the camera matches the selected shutter max speed, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Shutter Speed',
					id: 'val',
					choices: MODEL_ACTIONS.shut?.['shutter_' + [this.camera.shutter_table]].slice(
						MODEL_ACTIONS.shutter_max_speed.range.min,
						MODEL_ACTIONS.shutter_max_speed.range.max + 1
					),
					default: MODEL_ACTIONS.shutter_max_speed.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.shutter_max_speed == feedback.options.val
			},
		}
	}

	if (MODEL_ACTIONS?.shutter_min_speed) {
		feedbacks.shushutter_min_speedt = {
			type: 'boolean',
			name: MODEL_ACTIONS.shutter_min_speed.name,
			description: 'If the camera matches the selected shutter max speed, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Shutter Speed',
					id: 'val',
					choices: MODEL_ACTIONS.shut?.['shutter_' + [this.camera.shutter_table]].slice(
						MODEL_ACTIONS.shutter_min_speed.range.min,
						MODEL_ACTIONS.shutter_min_speed.range.max + 1
					),
					default: MODEL_ACTIONS.shutter_min_speed.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.shutter_min_speed == feedback.options.val
			},
		}
	}

	if (MODEL_ACTIONS?.shutter_speed) {
		feedbacks.shut = {
			type: 'boolean',
			name: MODEL_ACTIONS.shutter_speed.name,
			description: 'If the camera matches the selected shutter speed, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Shutter Speed',
					id: 'val',
					choices: MODEL_ACTIONS.shutter_speed?.['shutter_' + [this.camera.shutter_table]],
					default: MODEL_ACTIONS.shutter_speed.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.shutter_speed == feedback.options.val
			},
		}
	}

	if (MODEL_ACTIONS?.shutter_speed_overwrite) {
		feedbacks.shutter_speed_overwrite = {
			type: 'boolean',
			name: MODEL_ACTIONS.shutter_speed_overwrite.name,
			description:
				'If the camera matches the selected Shutter Speed Overwrite level, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label:
						'Hz (' +
						MODEL_ACTIONS.shutter_speed_overwrite.range.min +
						' to ' +
						MODEL_ACTIONS.shutter_speed_overwrite.range.max +
						')',
					id: 'level',
					default: MODEL_ACTIONS.shutter_speed_overwrite.range.default,
					min: MODEL_ACTIONS.shutter_speed_overwrite.range.min,
					max: MODEL_ACTIONS.shutter_speed_overwrite.range.max,
				},
			],
			callback: (feedback) => {
				return this.camera?.shutter_speed_overwrite == feedback.options.level
			},
		}
	}

	if (MODEL_ACTIONS?.slow_shutter_en) {
		feedbacks.slow_shutter_en = {
			type: 'boolean',
			name: MODEL_ACTIONS.slow_shutter_en.name,
			description: 'If the camera matches the Slow Shutter state, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'On/Off',
					id: 'val',
					choices: MODEL_ACTIONS.slow_shutter_en.choices,
					default: MODEL_ACTIONS.slow_shutter_en.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.slow_shutter_en == feedback.options.val
			},
		}
	}

	if (MODEL_ACTIONS?.slow_shutter_limit) {
		feedbacks.slow_shutter_limit = {
			type: 'boolean',
			name: MODEL_ACTIONS.slow_shutter_limit.name,
			description: 'If the camera matches the selected slow shutter limit, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Shutter Speed',
					id: 'val',
					choices: MODEL_ACTIONS.slow_shutter_limit?.['shutter_' + [this.camera.shutter_table]],
					default: MODEL_ACTIONS.slow_shutter_limit.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.slow_shutter_limit == feedback.options.val
			},
		}
	}

	if (MODEL_ACTIONS?.spotlight) {
		feedbacks.spotlight = {
			type: 'boolean',
			name: MODEL_ACTIONS.spotlight.name,
			description: 'If the camera matches the Spotlight state, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'On/Off',
					id: 'val',
					choices: MODEL_ACTIONS.spotlight.choices,
					default: MODEL_ACTIONS.spotlight.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.spotlight == feedback.options.val
			},
		}
	}

	// White Balance Feedback

	if (MODEL_ACTIONS?.bg) {
		feedbacks.bg = {
			type: 'boolean',
			name: MODEL_ACTIONS.bg.name,
			description: 'If the camera matches the selected BG level, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_ACTIONS.bg.range.min + ' to ' + MODEL_ACTIONS.bg.range.max + ')',
					id: 'level',
					default: MODEL_ACTIONS.bg.range.default,
					min: MODEL_ACTIONS.bg.range.min,
					max: MODEL_ACTIONS.bg.range.max,
				},
			],
			callback: (feedback) => {
				return this.camera?.bg == feedback.options.level
			},
		}
	}

	if (MODEL_ACTIONS?.br) {
		feedbacks.br = {
			type: 'boolean',
			name: MODEL_ACTIONS.br.name,
			description: 'If the camera matches the selected BR level, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_ACTIONS.br.range.min + ' to ' + MODEL_ACTIONS.br.range.max + ')',
					id: 'level',
					default: MODEL_ACTIONS.br.range.default,
					min: MODEL_ACTIONS.br.range.min,
					max: MODEL_ACTIONS.br.range.max,
				},
			],
			callback: (feedback) => {
				return this.camera?.br == feedback.options.level
			},
		}
	}

	if (MODEL_ACTIONS?.blue_gain) {
		feedbacks.blue_gain = {
			type: 'boolean',
			name: MODEL_ACTIONS.blue_gain.name,
			description: 'If the camera matches the selected BR level, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_ACTIONS.blue_gain.range.min + ' to ' + MODEL_ACTIONS.blue_gain.range.max + ')',
					id: 'level',
					default: MODEL_ACTIONS.blue_gain.range.default,
					min: MODEL_ACTIONS.blue_gain.range.min,
					max: MODEL_ACTIONS.blue_gain.range.max,
				},
			],
			callback: (feedback) => {
				return this.camera?.blue_gain == feedback.options.level
			},
		}
	}

	if (MODEL_ACTIONS?.color_temp) {
		feedbacks.color_temp = {
			type: 'boolean',
			name: MODEL_ACTIONS.color_temp.name,
			description:
				'If the camera color temperature matches the selected color temperature, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Color Temperature (k)',
					id: 'val',
					choices: MODEL_ACTIONS.color_temp.choices,
					default: MODEL_ACTIONS.color_temp.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.color_temp == feedback.options.val
			},
		}
	}

	if (MODEL_ACTIONS?.gb) {
		feedbacks.gb = {
			type: 'boolean',
			name: MODEL_ACTIONS.gb.name,
			description: 'If the camera matches the selected GB level, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_ACTIONS.gb.range.min + ' to ' + MODEL_ACTIONS.gb.range.max + ')',
					id: 'level',
					default: MODEL_ACTIONS.gb.range.default,
					min: MODEL_ACTIONS.gb.range.min,
					max: MODEL_ACTIONS.gb.range.max,
				},
			],
			callback: (feedback) => {
				return this.camera?.gb == feedback.options.level
			},
		}
	}

	if (MODEL_ACTIONS?.gr) {
		feedbacks.gr = {
			type: 'boolean',
			name: MODEL_ACTIONS.gr.name,
			description: 'If the camera matches the selected GR level, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_ACTIONS.gr.range.min + ' to ' + MODEL_ACTIONS.gr.range.max + ')',
					id: 'level',
					default: MODEL_ACTIONS.gr.range.default,
					min: MODEL_ACTIONS.gr.range.min,
					max: MODEL_ACTIONS.gr.range.max,
				},
			],
			callback: (feedback) => {
				return this.camera?.gr == feedback.options.level
			},
		}
	}

	if (MODEL_ACTIONS?.level) {
		feedbacks.level = {
			type: 'boolean',
			name: MODEL_ACTIONS.level.name,
			description: 'If the camera matches the selected level, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_ACTIONS.level.range.min + ' to ' + MODEL_ACTIONS.level.range.max + ')',
					id: 'level',
					default: MODEL_ACTIONS.level.range.default,
					min: MODEL_ACTIONS.level.range.min,
					max: MODEL_ACTIONS.level.range.max,
				},
			],
			callback: (feedback) => {
				return this.camera?.level == feedback.options.level
			},
		}
	}

	if (MODEL_ACTIONS?.matrix) {
		feedbacks.matrix = {
			type: 'boolean',
			name: MODEL_ACTIONS.matrix.name,
			description: 'If the camera matches the selected Matrix mode, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'On/Off',
					id: 'val',
					choices: MODEL_ACTIONS.matrix.choices,
					default: MODEL_ACTIONS.matrix.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.matrix == feedback.options.white_balance
			},
		}
	}

	if (MODEL_ACTIONS?.offset) {
		feedbacks.offset = {
			type: 'boolean',
			name: MODEL_ACTIONS.offset.name,
			description: 'If the camera matches the selected Offset level, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_ACTIONS.offset.range.min + ' to ' + MODEL_ACTIONS.offset.range.max + ')',
					id: 'value',
					default: MODEL_ACTIONS.offset.range.default,
					min: MODEL_ACTIONS.offset.range.min,
					max: MODEL_ACTIONS.offset.range.max,
				},
			],
			callback: (feedback) => {
				return this.camera?.offset == feedback.options.level
			},
		}
	}

	if (MODEL_ACTIONS?.phase) {
		feedbacks.phase = {
			type: 'boolean',
			name: MODEL_ACTIONS.phase.name,
			description: 'If the camera matches the selected Phase level, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_ACTIONS.phase.range.min + ' to ' + MODEL_ACTIONS.phase.range.max + ')',
					id: 'value',
					default: MODEL_ACTIONS.phase.range.default,
					min: MODEL_ACTIONS.phase.range.min,
					max: MODEL_ACTIONS.phase.range.max,
				},
			],
			callback: (feedback) => {
				return this.camera?.phase == feedback.options.level
			},
		}
	}

	if (MODEL_ACTIONS?.rb) {
		feedbacks.rb = {
			type: 'boolean',
			name: MODEL_ACTIONS.rb.name,
			description: 'If the camera matches the selected RB level, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_ACTIONS.rb.range.min + ' to ' + MODEL_ACTIONS.rb.range.max + ')',
					id: 'value',
					default: MODEL_ACTIONS.rb.range.default,
					min: MODEL_ACTIONS.rb.range.min,
					max: MODEL_ACTIONS.rb.range.max,
				},
			],
			callback: (feedback) => {
				return this.camera?.rb == feedback.options.level
			},
		}
	}

	if (MODEL_ACTIONS?.rg) {
		feedbacks.rg = {
			type: 'boolean',
			name: MODEL_ACTIONS.rg.name,
			description: 'If the camera matches the selected RG level, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_ACTIONS.rg.range.min + ' to ' + MODEL_ACTIONS.rg.range.max + ')',
					id: 'value',
					default: MODEL_ACTIONS.rg.range.default,
					min: MODEL_ACTIONS.rg.range.min,
					max: MODEL_ACTIONS.rg.range.max,
				},
			],
			callback: (feedback) => {
				return this.camera?.rg == feedback.options.level
			},
		}
	}

	if (MODEL_ACTIONS?.red_gain) {
		feedbacks.red_gain = {
			type: 'boolean',
			name: MODEL_ACTIONS.red_gain.name,
			description: 'If the camera matches the selected Red Gain level, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_ACTIONS.red_gain.range.min + ' to ' + MODEL_ACTIONS.red_gain.range.max + ')',
					id: 'level',
					default: MODEL_ACTIONS.red_gain.range.default,
					min: MODEL_ACTIONS.red_gain.range.min,
					max: MODEL_ACTIONS.red_gain.range.max,
				},
			],
			callback: (feedback) => {
				return this.camera?.red_gain == feedback.options.level
			},
		}
	}

	if (MODEL_ACTIONS?.select) {
		feedbacks.select = {
			type: 'boolean',
			name: MODEL_ACTIONS.select.name,
			description: 'change the default style of the button based on the WB mode',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'On/Off',
					id: 'val',
					choices: MODEL_ACTIONS.select.choices,
					default: MODEL_ACTIONS.select.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.select == feedback.options.val
			},
		}
	}

	if (MODEL_ACTIONS?.speed) {
		feedbacks.speed = {
			type: 'boolean',
			name: MODEL_ACTIONS.speed.name,
			description: 'If the camera matches the selected Speed level, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_ACTIONS.speed.range.min + ' to ' + MODEL_ACTIONS.speed.range.max + ')',
					id: 'value',
					default: MODEL_ACTIONS.speed.range.default,
					min: MODEL_ACTIONS.speed.range.min,
					max: MODEL_ACTIONS.speed.range.max,
				},
			],
			callback: (feedback) => {
				return this.camera?.speed == feedback.options.level
			},
		}
	}

	if (MODEL_ACTIONS?.wb_mode) {
		feedbacks.wb_mode = {
			type: 'boolean',
			name: MODEL_ACTIONS.wb_mode.name,
			description: 'change the default style of the button based on the WB mode',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'White Balance Mode',
					id: 'mode',
					choices: MODEL_ACTIONS.wb_mode.choices,
					default: MODEL_ACTIONS.wb_mode.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.wb_mode == feedback.options.mode
			},
		}
	}

	// Picture Setup Feedback

	if (MODEL_ACTIONS?.backlight_com) {
		feedbacks.backlight_com = {
			type: 'boolean',
			name: MODEL_ACTIONS.backlight_com.name,
			description: 'If the camera matches the selected Backlight Compensation, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'On/Off',
					id: 'val',
					choices: MODEL_ACTIONS.backlight_com.choices,
					default: MODEL_ACTIONS.backlight_com.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.backlight_com == feedback.options.val
			},
		}
	}

	if (MODEL_ACTIONS?.chroma_suppress) {
		feedbacks.chroma_suppress = {
			type: 'boolean',
			name: MODEL_ACTIONS.chroma_suppress.name,
			description: 'If the camera matches the selected Chroma Suppression, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Mode',
					id: 'val',
					choices: MODEL_ACTIONS.chroma_suppress.choices,
					default: MODEL_ACTIONS.chroma_suppress.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.chroma_suppress == feedback.options.val
			},
		}
	}

	if (MODEL_ACTIONS?.contrast) {
		feedbacks.contrast = {
			type: 'boolean',
			name: MODEL_ACTIONS.contrast.name,
			description: 'If the camera matches the selected Contrast level, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_ACTIONS.contrast.range.min + ' to ' + MODEL_ACTIONS.contrast.range.max + ')',
					id: 'value',
					min: MODEL_ACTIONS.contrast.range.min,
					max: MODEL_ACTIONS.contrast.range.max,
					default: MODEL_ACTIONS.contrast.range.default,
					isVisible: (action) => action.options.val === 'value',
				},
			],
			callback: (feedback) => {
				return this.camera?.contrast == feedback.options.value
			},
		}
	}

	if (MODEL_ACTIONS?.pictureEffect) {
		feedbacks.pictureEffect = {
			type: 'boolean',
			name: MODEL_ACTIONS.pictureEffect.name,
			description: 'If the camera matches the selected Effect mode, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Effect',
					id: 'val',
					choices: MODEL_ACTIONS.pictureEffect.choices,
					default: MODEL_ACTIONS.pictureEffect.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.pictureEffect == feedback.options.val
			},
		}
	}

	if (MODEL_ACTIONS?.picFlip) {
		feedbacks.picFlip = {
			type: 'boolean',
			name: MODEL_ACTIONS.picFlip.name,
			description: 'If the camera matches the selected Flip mode, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'On / Off',
					id: 'val',
					choices: MODEL_ACTIONS.picFlip.choices,
					default: MODEL_ACTIONS.picFlip.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.picFlip == feedback.options.val
			},
		}
	}

	if (MODEL_ACTIONS?.gamma) {
		feedbacks.gamma = {
			type: 'boolean',
			name: MODEL_ACTIONS.gamma.name,
			description: 'If the camera matches the selected Gamma value, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_ACTIONS.gamma.range.min + ' to ' + MODEL_ACTIONS.gamma.range.max + ')',
					id: 'value',
					min: MODEL_ACTIONS.gamma.range.min,
					max: MODEL_ACTIONS.gamma.range.max,
					default: MODEL_ACTIONS.gamma.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.gamma == feedback.options.value
			},
		}
	}

	if (MODEL_ACTIONS?.highlight_comp) {
		feedbacks.highlight_comp = {
			type: 'boolean',
			name: MODEL_ACTIONS.highlight_comp.name,
			description:
				'If the camera matches the selected Highlight Compensation mode, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Highlight Compensation',
					id: 'val',
					choices: MODEL_ACTIONS.highlight_comp.choices,
					default: MODEL_ACTIONS.highlight_comp.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.highlight_comp == feedback.options.val
			},
		}
	}

	if (MODEL_ACTIONS?.highlight_comp_mask) {
		feedbacks.highlight_comp_mask = {
			type: 'boolean',
			name: MODEL_ACTIONS.highlight_comp_mask.name,
			description:
				'If the camera matches the selected Highlight Compensation Mask value, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label:
						'Value (' +
						MODEL_ACTIONS.highlight_comp_mask.range.min +
						' to ' +
						MODEL_ACTIONS.highlight_comp_mask.range.max +
						')',
					id: 'value',
					min: MODEL_ACTIONS.highlight_comp_mask.range.min,
					max: MODEL_ACTIONS.highlight_comp_mask.range.max,
					default: MODEL_ACTIONS.highlight_comp_mask.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.highlight_comp_mask == feedback.options.value
			},
		}
	}

	if (MODEL_ACTIONS?.hue) {
		feedbacks.hue = {
			type: 'boolean',
			name: MODEL_ACTIONS.hue.name,
			description: 'If the camera matches the selected Hue value, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_ACTIONS.hue.range.min + ' to ' + MODEL_ACTIONS.hue.range.max + ')',
					id: 'value',
					min: MODEL_ACTIONS.hue.range.min,
					max: MODEL_ACTIONS.hue.range.max,
					default: MODEL_ACTIONS.hue.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.hue == feedback.options.value
			},
		}
	}

	if (MODEL_ACTIONS?.ir_cutfilter) {
		feedbacks.ir_cutfilter = {
			type: 'boolean',
			name: MODEL_ACTIONS.ir_cutfilter.name,
			description: 'If the camera matches the selected IR Cut Filter mode, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Mode',
					id: 'val',
					choices: MODEL_ACTIONS.ir_cutfilter.choices,
					default: MODEL_ACTIONS.ir_cutfilter.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.ir_cutfilter == feedback.options.val
			},
		}
	}

	if (MODEL_ACTIONS?.low_latency) {
		feedbacks.low_latency = {
			type: 'boolean',
			name: MODEL_ACTIONS.low_latency.name,
			description: 'If the camera matches the selected Low Latency mode, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'On / Off',
					id: 'val',
					choices: MODEL_ACTIONS.low_latency.choices,
					default: MODEL_ACTIONS.low_latency.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.low_latency == feedback.options.val
			},
		}
	}

	if (MODEL_ACTIONS?.picMirror) {
		feedbacks.picMirror = {
			type: 'boolean',
			name: MODEL_ACTIONS.picMirror.name,
			description: 'If the camera matches the selected Picture Mirror mode, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'On / Off',
					id: 'val',
					choices: MODEL_ACTIONS.picMirror.choices,
					default: MODEL_ACTIONS.picMirror.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.picMirror == feedback.options.val
			},
		}
	}

	if (MODEL_ACTIONS?.nd_filter) {
		feedbacks.nd_filter = {
			type: 'boolean',
			name: MODEL_ACTIONS.nd_filter.name,
			description: 'If the camera matches the selected ND Filter value, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_ACTIONS.nd_filter.range.min + ' to ' + MODEL_ACTIONS.nd_filter.range.max + ')',
					id: 'value',
					min: MODEL_ACTIONS.nd_filter.range.min,
					max: MODEL_ACTIONS.nd_filter.range.max,
					default: MODEL_ACTIONS.nd_filter.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.nd_filter == feedback.options.value
			},
		}
	}

	if (MODEL_ACTIONS?.noise_reduction) {
		feedbacks.noise_reduction = {
			type: 'boolean',
			name: MODEL_ACTIONS.noise_reduction.name,
			description: 'If the camera matches the selected Noise Reduction mode, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Noise Reduction',
					id: 'val',
					choices: MODEL_ACTIONS.noise_reduction.choices,
					default: MODEL_ACTIONS.noise_reduction.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.noise_reduction == feedback.options.val
			},
		}
	}

	if (MODEL_ACTIONS?.saturation) {
		feedbacks.saturation = {
			type: 'boolean',
			name: MODEL_ACTIONS.saturation.name,
			description: 'If the camera matches the selected saturation level, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_ACTIONS.saturation.range.min + ' to ' + MODEL_ACTIONS.saturation.range.max + ')',
					id: 'value',
					min: MODEL_ACTIONS.saturation.range.min,
					max: MODEL_ACTIONS.saturation.range.max,
					default: MODEL_ACTIONS.saturation.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.saturation == feedback.options.value
			},
		}
	}

	if (MODEL_ACTIONS?.sharpness) {
		feedbacks.sharpness = {
			type: 'boolean',
			name: MODEL_ACTIONS.sharpness.name,
			description: 'If the camera matches the selected Sharpness value, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_ACTIONS.sharpness.range.min + ' to ' + MODEL_ACTIONS.sharpness.range.max + ')',
					id: 'value',
					min: MODEL_ACTIONS.sharpness.range.min,
					max: MODEL_ACTIONS.sharpness.range.max,
					default: MODEL_ACTIONS.sharpness.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.sharpness == feedback.options.value
			},
		}
	}

	if (MODEL_ACTIONS?.stabilizer) {
		feedbacks.stabilizer = {
			type: 'boolean',
			name: MODEL_ACTIONS.stabilizer.name,
			description: 'If the camera matches the selected Stabilizer mode, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'On / Off',
					id: 'val',
					choices: MODEL_ACTIONS.stabilizer.choices,
					default: MODEL_ACTIONS.stabilizer.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.stabilizer == feedback.options.val
			},
		}
	}

	if (MODEL_ACTIONS?.threed_nr) {
		feedbacks.threed_nr = {
			type: 'boolean',
			name: MODEL_ACTIONS.threed_nr.name,
			description: 'If the camera matches the selected 3D Noise Reduction mode, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: '3D NR',
					id: 'val',
					choices: MODEL_ACTIONS.threed_nr.choices,
					default: MODEL_ACTIONS.threed_nr.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.threed_nr == feedback.options.val
			},
		}
	}

	if (MODEL_ACTIONS?.twod_nr) {
		feedbacks.twod_nr = {
			type: 'boolean',
			name: MODEL_ACTIONS.twod_nr.name,
			description: 'If the camera matches the selected 2D Noise Reduction mode, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: '2D NR',
					id: 'val',
					choices: MODEL_ACTIONS.twod_nr.choices,
					default: MODEL_ACTIONS.twod_nr.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.twod_nr == feedback.options.val
			},
		}
	}

	if (MODEL_ACTIONS?.wide_dynamic_range) {
		feedbacks.wide_dynamic_range = {
			type: 'boolean',
			name: MODEL_ACTIONS.wide_dynamic_range.name,
			description: 'If the camera matches the selected Wide Dynamic Range mode, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Wide Dynamic Range',
					id: 'val',
					choices: MODEL_ACTIONS.wide_dynamic_range.choices,
					default: MODEL_ACTIONS.wide_dynamic_range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.wide_dynamic_range == feedback.options.val
			},
		}
	}

	// Color Matrix Feedback

	if (MODEL_ACTIONS?.cm_blue_gain) {
		feedbacks.cm_blue_gain = {
			type: 'boolean',
			name: MODEL_ACTIONS.cm_blue_gain.name,
			description: 'If the camera matches the selected Blue Gain value, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_ACTIONS.cm_blue_gain.range.min + ' to ' + MODEL_ACTIONS.cm_blue_gain.range.max + ')',
					id: 'value',
					min: MODEL_ACTIONS.cm_blue_gain.range.min,
					max: MODEL_ACTIONS.cm_blue_gain.range.max,
					default: MODEL_ACTIONS.cm_blue_gain.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.cm_blue_gain == feedback.options.value
			},
		}
	}

	if (MODEL_ACTIONS?.cm_blue_hue) {
		feedbacks.cm_blue_hue = {
			type: 'boolean',
			name: MODEL_ACTIONS.cm_blue_hue.name,
			description: 'If the camera matches the selected Blue Hue value, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_ACTIONS.cm_blue_hue.range.min + ' to ' + MODEL_ACTIONS.cm_blue_hue.range.max + ')',
					id: 'value',
					min: MODEL_ACTIONS.cm_blue_hue.range.min,
					max: MODEL_ACTIONS.cm_blue_hue.range.max,
					default: MODEL_ACTIONS.cm_blue_hue.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.cm_blue_hue == feedback.options.value
			},
		}
	}

	if (MODEL_ACTIONS?.cm_color_gain) {
		feedbacks.cm_color_gain = {
			type: 'boolean',
			name: MODEL_ACTIONS.cm_color_gain.name,
			description: 'If the camera matches the selected Color Gain value, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label:
						'Value (' + MODEL_ACTIONS.cm_color_gain.range.min + ' to ' + MODEL_ACTIONS.cm_color_gain.range.max + ')',
					id: 'value',
					min: MODEL_ACTIONS.cm_color_gain.range.min,
					max: MODEL_ACTIONS.cm_color_gain.range.max,
					default: MODEL_ACTIONS.cm_color_gain.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.cm_color_gain == feedback.options.value
			},
		}
	}

	if (MODEL_ACTIONS?.cm_cyan_gain) {
		feedbacks.cm_cyan_gain = {
			type: 'boolean',
			name: MODEL_ACTIONS.cm_cyan_gain.name,
			description: 'If the camera matches the selected Cyan Gain value, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_ACTIONS.cm_cyan_gain.range.min + ' to ' + MODEL_ACTIONS.cm_cyan_gain.range.max + ')',
					id: 'value',
					min: MODEL_ACTIONS.cm_cyan_gain.range.min,
					max: MODEL_ACTIONS.cm_cyan_gain.range.max,
					default: MODEL_ACTIONS.cm_cyan_gain.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.cm_cyan_gain == feedback.options.value
			},
		}
	}

	if (MODEL_ACTIONS?.cm_cyan_hue) {
		feedbacks.cm_cyan_hue = {
			type: 'boolean',
			name: MODEL_ACTIONS.cm_cyan_hue.name,
			description: 'If the camera matches the selected Cyan Hue value, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_ACTIONS.cm_cyan_hue.range.min + ' to ' + MODEL_ACTIONS.cm_cyan_hue.range.max + ')',
					id: 'value',
					min: MODEL_ACTIONS.cm_cyan_hue.range.min,
					max: MODEL_ACTIONS.cm_cyan_hue.range.max,
					default: MODEL_ACTIONS.cm_cyan_hue.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.cm_cyan_hue == feedback.options.value
			},
		}
	}

	if (MODEL_ACTIONS?.cm_green_gain) {
		feedbacks.cm_green_gain = {
			type: 'boolean',
			name: MODEL_ACTIONS.cm_green_gain.name,
			description: 'If the camera matches the selected Green Gain value, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label:
						'Value (' + MODEL_ACTIONS.cm_green_gain.range.min + ' to ' + MODEL_ACTIONS.cm_green_gain.range.max + ')',
					id: 'value',
					min: MODEL_ACTIONS.cm_green_gain.range.min,
					max: MODEL_ACTIONS.cm_green_gain.range.max,
					default: MODEL_ACTIONS.cm_green_gain.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.cm_green_gain == feedback.options.value
			},
		}
	}

	if (MODEL_ACTIONS?.cm_green_hue) {
		feedbacks.cm_green_hue = {
			type: 'boolean',
			name: MODEL_ACTIONS.cm_green_hue.name,
			description: 'If the camera matches the selected Green Hue value, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_ACTIONS.cm_green_hue.range.min + ' to ' + MODEL_ACTIONS.cm_green_hue.range.max + ')',
					id: 'value',
					min: MODEL_ACTIONS.cm_green_hue.range.min,
					max: MODEL_ACTIONS.cm_green_hue.range.max,
					default: MODEL_ACTIONS.cm_green_hue.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.cm_green_hue == feedback.options.value
			},
		}
	}

	if (MODEL_ACTIONS?.cm_hue_phase) {
		feedbacks.cm_hue_phase = {
			type: 'boolean',
			name: MODEL_ACTIONS.cm_hue_phase.name,
			description: 'If the camera matches the selected Hue Phase value, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_ACTIONS.cm_hue_phase.range.min + ' to ' + MODEL_ACTIONS.cm_hue_phase.range.max + ')',
					id: 'value',
					min: MODEL_ACTIONS.cm_hue_phase.range.min,
					max: MODEL_ACTIONS.cm_hue_phase.range.max,
					default: MODEL_ACTIONS.cm_hue_phase.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.cm_hue_phase == feedback.options.value
			},
		}
	}

	if (MODEL_ACTIONS?.cm_mag_gain) {
		feedbacks.cm_mag_gain = {
			type: 'boolean',
			name: MODEL_ACTIONS.cm_mag_gain.name,
			description: 'If the camera matches the selected Magenta Gain value, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_ACTIONS.cm_mag_gain.range.min + ' to ' + MODEL_ACTIONS.cm_mag_gain.range.max + ')',
					id: 'value',
					min: MODEL_ACTIONS.cm_mag_gain.range.min,
					max: MODEL_ACTIONS.cm_mag_gain.range.max,
					default: MODEL_ACTIONS.cm_mag_gain.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.cm_mag_gain == feedback.options.value
			},
		}
	}

	if (MODEL_ACTIONS?.cm_mag_hue) {
		feedbacks.cm_mag_hue = {
			type: 'boolean',
			name: MODEL_ACTIONS.cm_mag_hue.name,
			description: 'If the camera matches the selected Magenta Hue value, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_ACTIONS.cm_mag_hue.range.min + ' to ' + MODEL_ACTIONS.cm_mag_hue.range.max + ')',
					id: 'value',
					min: MODEL_ACTIONS.cm_mag_hue.range.min,
					max: MODEL_ACTIONS.cm_mag_hue.range.max,
					default: MODEL_ACTIONS.cm_mag_hue.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.cm_mag_hue == feedback.options.value
			},
		}
	}

	if (MODEL_ACTIONS?.cm_red_gain) {
		feedbacks.cm_red_gain = {
			type: 'boolean',
			name: MODEL_ACTIONS.cm_red_gain.name,
			description: 'If the camera matches the selected Red Gain value, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_ACTIONS.cm_red_gain.range.min + ' to ' + MODEL_ACTIONS.cm_red_gain.range.max + ')',
					id: 'value',
					min: MODEL_ACTIONS.cm_red_gain.range.min,
					max: MODEL_ACTIONS.cm_red_gain.range.max,
					default: MODEL_ACTIONS.cm_red_gain.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.cm_red_gain == feedback.options.value
			},
		}
	}

	if (MODEL_ACTIONS?.cm_red_hue) {
		feedbacks.cm_red_hue = {
			type: 'boolean',
			name: MODEL_ACTIONS.cm_red_hue.name,
			description: 'If the camera matches the selected Red Hue value, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_ACTIONS.cm_red_hue.range.min + ' to ' + MODEL_ACTIONS.cm_red_hue.range.max + ')',
					id: 'value',
					min: MODEL_ACTIONS.cm_red_hue.range.min,
					max: MODEL_ACTIONS.cm_red_hue.range.max,
					default: MODEL_ACTIONS.cm_red_hue.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.cm_red_hue == feedback.options.value
			},
		}
	}

	if (MODEL_ACTIONS?.cm_yellow_gain) {
		feedbacks.cm_yellow_gain = {
			type: 'boolean',
			name: MODEL_ACTIONS.cm_yellow_gain.name,
			description: 'If the camera matches the selected Yellow Gain value, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label:
						'Value (' + MODEL_ACTIONS.cm_yellow_gain.range.min + ' to ' + MODEL_ACTIONS.cm_yellow_gain.range.max + ')',
					id: 'value',
					min: MODEL_ACTIONS.cm_yellow_gain.range.min,
					max: MODEL_ACTIONS.cm_yellow_gain.range.max,
					default: MODEL_ACTIONS.cm_yellow_gain.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.cm_yellow_gain == feedback.options.value
			},
		}
	}

	if (MODEL_ACTIONS?.cm_yellow_hue) {
		feedbacks.cm_yellow_hue = {
			type: 'boolean',
			name: MODEL_ACTIONS.cm_yellow_hue.name,
			description: 'If the camera matches the selected Yellow Hue value, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label:
						'Value (' + MODEL_ACTIONS.cm_yellow_hue.range.min + ' to ' + MODEL_ACTIONS.cm_yellow_hue.range.max + ')',
					id: 'value',
					min: MODEL_ACTIONS.cm_yellow_hue.range.min,
					max: MODEL_ACTIONS.cm_yellow_hue.range.max,
					default: MODEL_ACTIONS.cm_yellow_hue.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.cm_yellow_hue == feedback.options.value
			},
		}
	}

	// Advanced Setup Feedback

	if (MODEL_ACTIONS?.brightness) {
		feedbacks.brightness = {
			type: 'boolean',
			name: MODEL_ACTIONS.brightness.name,
			description: 'If the camera matches the selected Brightness value, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_ACTIONS.brightness.range.min + ' to ' + MODEL_ACTIONS.brightness.range.max + ')',
					id: 'value',
					min: MODEL_ACTIONS.brightness.range.min,
					max: MODEL_ACTIONS.brightness.range.max,
					default: MODEL_ACTIONS.brightness.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.brightness == feedback.options.value
			},
		}
	}

	if (MODEL_ACTIONS?.brightness_comp) {
		feedbacks.brightness_comp = {
			type: 'boolean',
			name: MODEL_ACTIONS.brightness_comp.name,
			description:
				'If the camera matches the selected Brightness Compensation mode, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Mode',
					id: 'val',
					choices: MODEL_ACTIONS.brightness_comp.choices,
					default: MODEL_ACTIONS.brightness_comp.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.brightness_comp == feedback.options.val
			},
		}
	}

	if (MODEL_ACTIONS?.comp_level) {
		feedbacks.comp_level = {
			type: 'boolean',
			name: MODEL_ACTIONS.comp_level.name,
			description: 'If the camera matches the selected Compensation Level, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Level',
					id: 'val',
					choices: MODEL_ACTIONS.comp_level.choices,
					default: MODEL_ACTIONS.comp_level.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.comp_level == feedback.options.val
			},
		}
	}

	if (MODEL_ACTIONS?.gamma_offset) {
		feedbacks.gamma_offset = {
			type: 'boolean',
			name: MODEL_ACTIONS.gamma_offset.name,
			description: 'If the camera matches the selected Gamma Offset value, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_ACTIONS.gamma_offset.range.min + ' to ' + MODEL_ACTIONS.gamma_offset.range.max + ')',
					id: 'value',
					min: MODEL_ACTIONS.gamma_offset.range.min,
					max: MODEL_ACTIONS.gamma_offset.range.max,
					default: MODEL_ACTIONS.gamma_offset.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.gamma_offset == feedback.options.value
			},
		}
	}

	if (MODEL_ACTIONS?.high_resolution) {
		feedbacks.high_resolution = {
			type: 'boolean',
			name: MODEL_ACTIONS.high_resolution.name,
			description: 'If the camera matches the selected High Resolution mode, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'On / Off',
					id: 'val',
					choices: MODEL_ACTIONS.high_resolution.choices,
					default: MODEL_ACTIONS.high_resolution.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.high_resolution == feedback.options.val
			},
		}
	}

	if (MODEL_ACTIONS?.video_enhancement) {
		feedbacks.video_enhancement = {
			type: 'boolean',
			name: MODEL_ACTIONS.video_enhancement.name,
			description: 'If the camera matches the selected Video Enhancement mode, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'On / Off',
					id: 'val',
					choices: MODEL_ACTIONS.video_enhancement.choices,
					default: MODEL_ACTIONS.video_enhancement.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.video_enhancement == feedback.options.val
			},
		}
	}

	// External Setup Feedback

	if (MODEL_ACTIONS?.aux) {
		feedbacks.aux = {
			type: 'boolean',
			name: MODEL_ACTIONS.aux.name,
			description: 'If the camera matches the selected Aux mode, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'On / Off',
					id: 'val',
					choices: MODEL_ACTIONS.aux.choices,
					default: MODEL_ACTIONS.aux.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.aux == feedback.options.val
			},
		}
	}

	if (MODEL_ACTIONS?.rain_wiper) {
		feedbacks.rain_wiper = {
			type: 'boolean',
			name: MODEL_ACTIONS.rain_wiper.name,
			description: 'If the camera matches the selected Rain Wiper mode, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'On / Off',
					id: 'val',
					choices: MODEL_ACTIONS.rain_wiper.choices,
					default: MODEL_ACTIONS.rain_wiper.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.rain_wiper == feedback.options.val
			},
		}
	}

	if (MODEL_ACTIONS?.v12vout) {
		feedbacks.v12vout = {
			type: 'boolean',
			name: MODEL_ACTIONS.v12vout.name,
			description: 'If the camera matches the selected 12v Out mode, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'On / Off',
					id: 'val',
					choices: MODEL_ACTIONS.v12vout.choices,
					default: MODEL_ACTIONS.v12vout.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.v12vout == feedback.options.val
			},
		}
	}

	// Detail Setup Feedback

	if (MODEL_ACTIONS?.bandwidth) {
		feedbacks.bandwidth = {
			type: 'boolean',
			name: MODEL_ACTIONS.bandwidth.name,
			description: 'If the camera matches the selected Bandwidth mode, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Mode',
					id: 'val',
					choices: MODEL_ACTIONS.bandwidth.choices,
					default: MODEL_ACTIONS.bandwidth.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.bandwidth == feedback.options.val
			},
		}
	}

	if (MODEL_ACTIONS?.bw_balance) {
		feedbacks.bw_balance = {
			type: 'boolean',
			name: MODEL_ACTIONS.bw_balance.name,
			description: 'If the camera matches the selected BW Bandwidth mode, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Mode',
					id: 'val',
					choices: MODEL_ACTIONS.bw_balance.choices,
					default: MODEL_ACTIONS.bw_balance.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.bw_balance == feedback.options.val
			},
		}
	}

	if (MODEL_ACTIONS?.crispening) {
		feedbacks.crispening = {
			type: 'boolean',
			name: MODEL_ACTIONS.crispening.name,
			description: 'If the camera matches the selected Crispening value, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_ACTIONS.crispening.range.min + ' to ' + MODEL_ACTIONS.crispening.range.max + ')',
					id: 'value',
					min: MODEL_ACTIONS.crispening.range.min,
					max: MODEL_ACTIONS.crispening.range.max,
					default: MODEL_ACTIONS.crispening.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.crispening == feedback.options.value
			},
		}
	}

	if (MODEL_ACTIONS?.detail) {
		feedbacks.detail = {
			type: 'boolean',
			name: MODEL_ACTIONS.detail.name,
			description: 'If the camera matches the selected Detail value, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'On / Off',
					id: 'val',
					choices: MODEL_ACTIONS.detail.choices,
					default: MODEL_ACTIONS.detail.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.detail == feedback.options.val
			},
		}
	}

	if (MODEL_ACTIONS?.highlight_detail) {
		feedbacks.highlight_detail = {
			type: 'boolean',
			name: MODEL_ACTIONS.highlight_detail.name,
			description: 'If the camera matches the selected Highlight Detail value, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label:
						'Value (' +
						MODEL_ACTIONS.highlight_detail.range.min +
						' to ' +
						MODEL_ACTIONS.highlight_detail.range.max +
						')',
					id: 'value',
					min: MODEL_ACTIONS.highlight_detail.range.min,
					max: MODEL_ACTIONS.highlight_detail.range.max,
					default: MODEL_ACTIONS.highlight_detail.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.highlight_detail == feedback.options.value
			},
		}
	}

	if (MODEL_ACTIONS?.hv_balance) {
		feedbacks.hv_balance = {
			type: 'boolean',
			name: MODEL_ACTIONS.hv_balance.name,
			description: 'If the camera matches the selected Hv Balance value, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_ACTIONS.hv_balance.range.min + ' to ' + MODEL_ACTIONS.hv_balance.range.max + ')',
					id: 'value',
					min: MODEL_ACTIONS.hv_balance.range.min,
					max: MODEL_ACTIONS.hv_balance.range.max,
					default: MODEL_ACTIONS.hv_balance.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.hv_balance == feedback.options.value
			},
		}
	}

	if (MODEL_ACTIONS?.limit) {
		feedbacks.limit = {
			type: 'boolean',
			name: MODEL_ACTIONS.limit.name,
			description: 'If the camera matches the selected Limit value, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_ACTIONS.limit.range.min + ' to ' + MODEL_ACTIONS.limit.range.max + ')',
					id: 'value',
					min: MODEL_ACTIONS.limit.range.min,
					max: MODEL_ACTIONS.limit.range.max,
					default: MODEL_ACTIONS.limit.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.limit == feedback.options.value
			},
		}
	}

	if (MODEL_ACTIONS?.super_low) {
		feedbacks.super_low = {
			type: 'boolean',
			name: MODEL_ACTIONS.super_low.name,
			description: 'If the camera matches the selected Super Low value, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_ACTIONS.super_low.range.min + ' to ' + MODEL_ACTIONS.super_low.range.max + ')',
					id: 'value',
					min: MODEL_ACTIONS.super_low.range.min,
					max: MODEL_ACTIONS.super_low.range.max,
					default: MODEL_ACTIONS.super_low.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.super_low == feedback.options.value
			},
		}
	}

	// Gamma Setup Feedback

	if (MODEL_ACTIONS?.black_gamma_level) {
		feedbacks.black_gamma_level = {
			type: 'boolean',
			name: MODEL_ACTIONS.black_gamma_level.name,
			description: 'If the camera matches the selected Black Gamma Level, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label:
						'Level (' +
						MODEL_ACTIONS.black_gamma_level.range.min +
						' to ' +
						MODEL_ACTIONS.black_gamma_level.range.max +
						')',
					id: 'value',
					min: MODEL_ACTIONS.black_gamma_level.range.min,
					max: MODEL_ACTIONS.black_gamma_level.range.max,
					default: MODEL_ACTIONS.black_gamma_level.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.black_gamma_level == feedback.options.value
			},
		}
	}

	if (MODEL_ACTIONS?.black_level) {
		feedbacks.black_level = {
			type: 'boolean',
			name: MODEL_ACTIONS.black_level.name,
			description: 'If the camera matches the selected Black Level, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Level (' + MODEL_ACTIONS.black_level.range.min + ' to ' + MODEL_ACTIONS.black_level.range.max + ')',
					id: 'value',
					min: MODEL_ACTIONS.black_level.range.min,
					max: MODEL_ACTIONS.black_level.range.max,
					default: MODEL_ACTIONS.black_level.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.black_level == feedback.options.value
			},
		}
	}

	if (MODEL_ACTIONS?.black_level_range) {
		feedbacks.black_level_range = {
			type: 'boolean',
			name: MODEL_ACTIONS.black_level_range.name,
			description: 'If the camera matches the selected Black Level Range, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Black Level Range',
					id: 'val',
					choices: MODEL_ACTIONS.black_level_range.choices,
					default: MODEL_ACTIONS.black_level_range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.black_level_range == feedback.options.val
			},
		}
	}

	if (MODEL_ACTIONS?.effect) {
		feedbacks.effect = {
			type: 'boolean',
			name: MODEL_ACTIONS.effect.name,
			description: 'If the camera matches the selected Effect Range, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_ACTIONS.effect.range.min + ' to ' + MODEL_ACTIONS.effect.range.max + ')',
					id: 'value',
					min: MODEL_ACTIONS.effect.range.min,
					max: MODEL_ACTIONS.effect.range.max,
					default: MODEL_ACTIONS.effect.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.effect == feedback.options.value
			},
		}
	}

	if (MODEL_ACTIONS?.level) {
		feedbacks.level = {
			type: 'boolean',
			name: MODEL_ACTIONS.level.name,
			description: 'If the camera matches the selected Level, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_ACTIONS.level.range.min + ' to ' + MODEL_ACTIONS.level.range.max + ')',
					id: 'value',
					min: MODEL_ACTIONS.level.range.min,
					max: MODEL_ACTIONS.level.range.max,
					default: MODEL_ACTIONS.level.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.level == feedback.options.value
			},
		}
	}

	if (MODEL_ACTIONS?.offset) {
		feedbacks.offset = {
			type: 'boolean',
			name: MODEL_ACTIONS.offset.name,
			description: 'If the camera matches the selected Offset level, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_ACTIONS.offset.range.min + ' to ' + MODEL_ACTIONS.offset.range.max + ')',
					id: 'value',
					min: MODEL_ACTIONS.offset.range.min,
					max: MODEL_ACTIONS.offset.range.max,
					default: MODEL_ACTIONS.offset.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.offset == feedback.options.value
			},
		}
	}

	if (MODEL_ACTIONS?.pattern) {
		feedbacks.pattern = {
			type: 'boolean',
			name: MODEL_ACTIONS.pattern.name,
			description: 'If the camera matches the selected Pattern level, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_ACTIONS.pattern.range.min + ' to ' + MODEL_ACTIONS.pattern.range.max + ')',
					id: 'value',
					min: MODEL_ACTIONS.pattern.range.min,
					max: MODEL_ACTIONS.pattern.range.max,
					default: MODEL_ACTIONS.pattern.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.pattern == feedback.options.value
			},
		}
	}

	if (MODEL_ACTIONS?.pattern_fine) {
		feedbacks.pattern_fine = {
			type: 'boolean',
			name: MODEL_ACTIONS.pattern_fine.name,
			description: 'If the camera matches the selected Pattern Fine level, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label: 'Value (' + MODEL_ACTIONS.pattern_fine.range.min + ' to ' + MODEL_ACTIONS.pattern_fine.range.max + ')',
					id: 'value',
					min: MODEL_ACTIONS.pattern_fine.range.min,
					max: MODEL_ACTIONS.pattern_fine.range.max,
					default: MODEL_ACTIONS.pattern_fine.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.pattern_fine == feedback.options.value
			},
		}
	}

	if (MODEL_ACTIONS?.settings) {
		feedbacks.settings = {
			type: 'boolean',
			name: MODEL_ACTIONS.settings.name,
			description: 'If the camera matches the selected Settings mode, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Settings',
					id: 'value',
					choices: MODEL_ACTIONS.settings.choices,
					default: MODEL_ACTIONS.settings.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.settings == feedback.options.value
			},
		}
	}

	if (MODEL_ACTIONS?.visibility_enhancer) {
		feedbacks.visibility_enhancer = {
			type: 'boolean',
			name: MODEL_ACTIONS.visibility_enhancer.name,
			description:
				'If the camera matches the selected Visibility Enhancer mode, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Settings',
					id: 'value',
					choices: MODEL_ACTIONS.visibility_enhancer.choices,
					default: MODEL_ACTIONS.visibility_enhancer.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.visibility_enhancer == feedback.options.value
			},
		}
	}

	// BirdDog Scope Feedback

	if (MODEL_ACTIONS?.scope_size) {
		feedbacks.scope_size = {
			type: 'boolean',
			name: MODEL_ACTIONS.scope_size.name,
			description: 'If the camera matches the selected Scope Size, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'On/Off',
					id: 'value',
					choices: MODEL_ACTIONS.scope_size.choices,
					default: MODEL_ACTIONS.scope_size.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.scope_size == feedback.options.value
			},
		}
	}

	if (MODEL_ACTIONS?.scope_gamma_gain) {
		feedbacks.scope_gamma_gain = {
			type: 'boolean',
			name: MODEL_ACTIONS.scope_gamma_gain.name,
			description: 'If the camera matches the selected Scope Gamma Gain, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'number',
					label:
						'Value (' +
						MODEL_ACTIONS.scope_gamma_gain.range.min +
						' to ' +
						MODEL_ACTIONS.scope_gamma_gain.range.max +
						')',
					id: 'value',
					min: MODEL_ACTIONS.scope_gamma_gain.range.min,
					max: MODEL_ACTIONS.scope_gamma_gain.range.max,
					default: MODEL_ACTIONS.scope_gamma_gain.range.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.scope_gamma_gain == feedback.options.value
			},
		}
	}

	if (MODEL_ACTIONS?.scope_mode) {
		feedbacks.scope_mode = {
			type: 'boolean',
			name: MODEL_ACTIONS.scope_mode.name,
			description: 'If the camera matches the selected Scope Mode, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Mode',
					id: 'value',
					choices: MODEL_ACTIONS.scope_mode.choices,
					default: MODEL_ACTIONS.scope_mode.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.scope_mode == feedback.options.value
			},
		}
	}

	if (MODEL_ACTIONS?.scope_position) {
		feedbacks.scope_position = {
			type: 'boolean',
			name: MODEL_ACTIONS.scope_position.name,
			description: 'If the camera matches the selected scope position, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Position',
					id: 'value',
					choices: MODEL_ACTIONS.scope_position.choices,
					default: MODEL_ACTIONS.scope_position.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.scope_position == feedback.options.value
			},
		}
	}

	if (MODEL_ACTIONS?.scope_preview) {
		feedbacks.scope_preview = {
			type: 'boolean',
			name: MODEL_ACTIONS.scope_preview.name,
			description: 'If the camera matches the selected scope preview mode, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'On/Off',
					id: 'value',
					choices: MODEL_ACTIONS.scope_preview.choices,
					default: MODEL_ACTIONS.scope_preview.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.scope_preview == feedback.options.value
			},
		}
	}

	if (MODEL_ACTIONS?.scope_program) {
		feedbacks.scope_program = {
			type: 'boolean',
			name: MODEL_ACTIONS.scope_program.name,
			description: 'If the camera matches the selected scope program mode, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'On/Off',
					id: 'value',
					choices: MODEL_ACTIONS.scope_program.choices,
					default: MODEL_ACTIONS.scope_program.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.scope_program == feedback.options.value
			},
		}
	}

	if (MODEL_ACTIONS?.scope_transparency) {
		feedbacks.scope_transparency = {
			type: 'boolean',
			name: MODEL_ACTIONS.scope_transparency.name,
			description: 'If the camera matches the selected scope transparency mode, change the default style of the button',
			defaultStyle: {
				color: ColorBlack,
				bgcolor: ColorGreen,
			},
			options: [
				{
					type: 'dropdown',
					label: 'On/Off',
					id: 'value',
					choices: MODEL_ACTIONS.scope_transparency.choices,
					default: MODEL_ACTIONS.scope_transparency.default,
				},
			],
			callback: (feedback) => {
				return this.camera?.scope_transparency == feedback.options.value
			},
		}
	}

	// Other Feedback

	this.setFeedbackDefinitions(feedbacks)

	return Object.fromEntries(Object.entries(feedbacks).sort(sortByLabel))
}
