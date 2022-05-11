const CHOICES = require('./choices.js')
const COMMON = [
	{
		//API Calls
		//Basic Device Information
		about: true,
		//Device Settings
		analogaudiosetup: true,
		//NDI Encode
		encodesetup: true,
		encodetransport: true,
		//NDI Finder
		NDIDisServer: true,
		//PTZ
		birddogptzsetup: true,
		recallPost: true,
		savePost: true,
		//Exposure
		birddogexpsetup: true,
		//White Balance
		birddogwbsetup: true,
		//Picture Settings
		birddogpicsetup: true,
	},
	{
		//Variables
		// /about
		firmware: { label: 'Firmware' },
		model: { label: 'Model' },
		hostname: { label: 'Name' },
		ipaddress: { label: 'IP Address' },
		netmask: { label: ' Network Mask' },
		network_config: { label: 'Network Config Method' },
		serial_number: { label: ' Serial Number' },
		status: { label: 'Status' },
		// VISCA Variables
		standby: { label: 'Standby' },
		freeze: { label: 'Freeze' },
		// API Variables
		// /analogaudiosetup
		audio_in_gain: { label: 'Audio In Gain' },
		audio_out_gain: { label: 'Audio Out Gain' },
		audio_output: { label: 'Audio Output' },
		// /encodesetup
		bandwidth_mode: { label: 'Bandwidth Mode' },
		bandwidth_select: { label: 'Bandwidth Select' },
		ndi_audio: { label: `NDI Audio` },
		ndi_group: { label: `NDI Group` },
		ndi_group_name: { label: `NDI Group Name` },
		stream_name: { label: `Stream Name` },
		video_format: { label: `Video Format` },
		// /encodeTransport
		transmit_method: { label: `Transmit Method` },
		transmit_netprefix: { label: 'Transmit Net Prefix' },
		transmit_netmask: { label: 'Transmit Netmask' },
		// /NDIDisServer
		ndi_discovery_server: { label: `NDI Discovery Server` },
		ndi_discovery_server_ip: { label: `NDI Discovery Server IP` },
		// /birddogptzsetup
		zoom_speed: { label: `Zoom Speed` },
		zoom_position: { label: `Zoom Position` },
		// Focus Settings
		focus_mode: { label: `Focus Mode` },
		// /birddogexpsetup
		bright_level: { label: `Bright Level` },
		exposure_comp: { label: `Exposure Compensation` },
		exposure_comp_level: { label: `Exposure Compensation Level` },
		exposure_mode: { label: `Exposure Mode` },
		gain: { label: `Gain` },
		iris: { label: `Iris` },
		shutter_speed: { label: `Shutter Speed` },
		// /birddogwbsetup
		blue_gain: { label: `Blue Gain` },
		red_gain: { label: `Red Gain` },
		wb_mode: { label: `White Balance Mode` },
		// /birddogpicsetup
		flip: { label: `Flip` },
		mirror: { label: `Mirror` },
	},
	{
		//actions
		/////////
		// General Camera Actions
		standby: { choices: CHOICES.STANDBY, default: 'on' },
		freeze: { choices: CHOICES.ON_OFF, default: 'On' },
		// Analog Audio Actions
		analogAudioInGain: { range: { min: -50, max: 50, default: 0 } },
		analogAudioOutGain: { range: { min: -50, max: 50, default: 0 } },
		analogAudioOutput: { choices: CHOICES.ANALOG_AUDIO_OUTPUT, default: 'DecodeComms' },
		// Video Output Interface Actions
		// Encode Setup Actions
		encodeBandwidth: {
			choices: CHOICES.ENCODE_BANDWIDTH_MODE,
			default: 'NDIManaged',
			range: { min: 80, max: 120, default: 80 },
		},
		ndiAudio: { choices: CHOICES.ENCODE_NDI_AUDIO, default: 'NDIAudioMute' },
		ndiGroupEnable: { choices: CHOICES.ENCODE_NDIGroup, default: 'NDIGroupDis' },
		// Encode Transport Actions
		transmit_method: { choices: CHOICES.ENCODE_TXPM, default: 'UDP' },
		// NDI Discovery Server Actions
		// PTZ Actions
		zoomSpeed: {choices: CHOICES.SPEED_CHANGES, default: 'up',range: { min: 0, max: 7, default: 4 } },
		zoom: { choices: CHOICES.PTZ_ZOOM, default: 'in' },
		savePset: { range: { min: 1, max: 64, default: 1 } },
		recallPset: { range: { min: 1, max: 64, default: 1 } },
		// Focus Actions
		focus: { choices: CHOICES.FOCUS_CONTROL, default: 'near' },
		focusM: { choices: CHOICES.AUTO_FOCUS, default: 'Auto' },
		// Exposure Actions
		expComp: { choices: CHOICES.ON_OFF, default: 'Off' },
		expCompLvl: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: -7, max: 7, default: 0 } },
		// White Balance Actions
		wbOnePush: true,
		gainBlue: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 255, default: 127 } },
		gainRed: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 255, default: 127 } },
		// Picture Setup Actions
		picFlip: { choices: CHOICES.ON_OFF, default: 'On' },
		picMirror: { choices: CHOICES.ON_OFF, default: 'On' },
		// Other Actions
		custom: true,
	},
	{
		//feedback
		wb_mode: true,
		standby_status: true,
	},
]

module.exports = {
	// Model Specific
	MODELS: [
		{
			id: 'P100',
			apicalls: {
				...COMMON[0],
				birddogcmsetup: true,
			},
			variables: {
				...COMMON[1],
				// /birddogptzsetup
				pan_speed: { label: `Pan Speed` },
				tilt_speed: { label: `Tilt Speed` },
				pan_position: { label: `Pan Position` },
				tilt_position: { label: `Tilt Position` },
				// /birddogexpsetup
				shutter_control_overwrite: { label: `Shutter Control Overwrite` },
				shutter_speed_overwrite: { label: `Shutter Speed Overwrite` },
				// /birddogwbsetup
				color_temp: { label: `Color Temp` },
				// /birddogpicsetup
				contrast: { label: `Contrast` },
				effect: { label: `Effect` },
				gamma: { label: `Gamma` },
				hue: { label: `Hue` },
				noise_reduction: { label: `Noise Reduction` },
				saturation: { label: `Saturation` },
				sharpness: { label: `Sharpness` },
				wide_dynamic_range: { label: `Wide Dynamic Range` },
				// /birddogcmsetup
				cm_blue_gain: { label: 'Blue Gain' },
				cm_blue_hue: { label: 'Blue Hue' },
				cm_cyan_gain: { label: 'Cyan Gain' },
				cm_cyan_hue: { label: 'Cyan Hue' },
				cm_green_gain: { label: 'Green Gain' },
				cm_green_hue: { label: 'Green Hue' },
				cm_mag_gain: { label: 'Magenta Gain' },
				cm_mag_hue: { label: 'Magenta Hue' },
				cm_red_gain: { label: 'Red Gain' },
				cm_red_hue: { label: 'Red Hue' },
				cm_yellow_gain: { label: 'Yellow Gain' },
				cm_yellow_hue: { label: 'Yellow Hue' },
			},
			actions: {
				...COMMON[2],
				// General Camera Actions
				// Analog Audio Actions
				// Video Output Interface Actions
				// Encode Setup Actions
				// Encode Transport Actions
				// NDI Discovery Server Actions
				// PTZ Actions
				pt: {
					choices: CHOICES.PTZ_DIRECTION,
					default: 'up',
					posPanChoices: CHOICES.POS_PAN_P100,
					posPanDefault: '0000',
					posTiltChoices: CHOICES.POS_TILT,
					posTiltDefault: '0000',
				},
				zoom: { ...COMMON[2].zoom, posZoomChoices: CHOICES.POS_ZOOM_10, posZoomDefault: '0000' },
				panSpeed: { choices: CHOICES.SPEED_CHANGES, default: 'up',range: { min: 0, max: 21, default: 11 } },
				tiltSpeed: { choices: CHOICES.SPEED_CHANGES, default: 'up',range: { min: 0, max: 18, default: 9 } },
				// Focus Actions
				// Exposure Actions
				expM: { choices: CHOICES.EXP_MODE_1, default: 'FULL-AUTO' },
				gain: { choices: CHOICES.GAIN_1, default: 0 },
				iris: { choices: CHOICES.IRIS_1, default: 1, range: { closed: 0, min: 1, max: 13 } },
				shutter_control_overwrite: { choices: CHOICES.ON_OFF, default: 'On' },
				shutter_speed: {
					shutter_50: CHOICES.SHUTTER_50,
					shutter_60: CHOICES.SHUTTER_60,
					default: 6,
					range: { min: 0, max: 21 },
				},
				// White Balance Actions
				wb: { choices: CHOICES.WB_MODE_1, default: 'AUTO' },
				color_temp: { choices: CHOICES.COLOR_TEMP, default: '6500' },
				// Picture Setup Actions
				contrast: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 15, default: 7 } },
				pictureEffect: { choices: CHOICES.PICTURE_EFFECT, default: 'BW' },
				// Color Matrix Actions
				// Advanced Setup Actions
				// External Setup Actions
				// Detail Setup Actions
				// Gamma Setup Actions
				// Other Actions
			},
			feedback: {
				...COMMON[3],
			},
		},
		{
			id: 'PF120',
			apicalls: {
				...COMMON[0],
				birddogcmsetup: true,
			},
			variables: {
				...COMMON[1],
				// General Camera Actions
				// Analog Audio Actions
				// Video Output Interface Actions
				// Encode Setup Actions
				tally_mode: { label: `Tally Mode` },
				// /birddogexpsetup
				shutter_control_overwrite: { label: `Shutter Control Overwrite` },
				shutter_speed_overwrite: { label: `Shutter Speed Overwrite` },
				// /birddogwbsetup
				color_temp: { label: `Color Temp` },
				// /birddogpicsetup
				contrast: { label: `Contrast` },
				effect: { label: `Effect` },
				gamma: { label: `Gamma` },
				hue: { label: `Hue` },
				noise_reduction: { label: `Noise Reduction` },
				saturation: { label: `Saturation` },
				sharpness: { label: `Sharpness` },
				wide_dynamic_range: { label: `Wide Dynamic Range` },
				// /birddogcmsetup
				cm_blue_gain: { label: 'Blue Gain' },
				cm_blue_hue: { label: 'Blue Hue' },
				cm_cyan_gain: { label: 'Cyan Gain' },
				cm_cyan_hue: { label: 'Cyan Hue' },
				cm_green_gain: { label: 'Green Gain' },
				cm_green_hue: { label: 'Green Hue' },
				cm_mag_gain: { label: 'Magenta Gain' },
				cm_mag_hue: { label: 'Magenta Hue' },
				cm_red_gain: { label: 'Red Gain' },
				cm_red_hue: { label: 'Red Hue' },
				cm_yellow_gain: { label: 'Yellow Gain' },
				cm_yellow_hue: { label: 'Yellow Hue' },
			},
			actions: {
				...COMMON[2],
				// General Camera Actions
				// Analog Audio Actions
				// Video Output Interface Actions
				// Encode Setup Actions
				tally: { choices: CHOICES.TALLY_MODE, default: 'TallyOn' },
				// Encode Transport Actions
				// NDI Discovery Server Actions
				// PTZ Actions
				zoom: { ...COMMON[2].zoom, posZoomChoices: CHOICES.POS_ZOOM_20, posZoomDefault: '0000' },
				// Focus Actions
				// Exposure Actions
				expM: { choices: CHOICES.EXP_MODE_1, default: 'FULL-AUTO' },
				gain: { choices: CHOICES.GAIN_1, default: 0 },
				iris: { choices: CHOICES.IRIS_1, default: 1, range: { closed: 0, min: 1, max: 13 } },
				shutter_control_overwrite: { choices: CHOICES.ON_OFF, default: 'On' },
				shutter_speed: {
					shutter_50: CHOICES.SHUTTER_50,
					shutter_60: CHOICES.SHUTTER_60,
					default: 6,
					range: { min: 0, max: 21 },
				},
				// White Balance Actions
				wb: { choices: CHOICES.WB_MODE_1, default: 'AUTO' },
				color_temp: { choices: CHOICES.COLOR_TEMP, default: '6500' },
				// Picture Setup Actions
				contrast: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 15, default: 7 } },
				pictureEffect: { choices: CHOICES.PICTURE_EFFECT, default: 'BW' },
				// Color Matrix Actions
				// Advanced Setup Actions
				// External Setup Actions
				// Detail Setup Actions
				// Gamma Setup Actions
				// Other Actions
			},
			feedback: {
				...COMMON[3],
			},
		},
		{
			id: 'P200_A2_A3',
			apicalls: {
				...COMMON[0],
				birddogcmsetup: true,
				birddogadvancesetup: true,
			},
			variables: {
				...COMMON[1],
				// /encodesetup
				tally_mode: { label: `Tally Mode` },
				// /birddogptzsetup
				pan_speed: { label: `Pan Speed` },
				tilt_speed: { label: `Tilt Speed` },
				pan_position: { label: `Pan Position` },
				tilt_position: { label: `Tilt Position` },
				// /birddogexpsetup
				ae_response: { label: `Ae Response` },
				gain_limit: { label: `Gain Limit` },
				high_sensitivity: { label: `High Sensitivity` },
				slow_shutter: { label: `Slow Shutter ` },
				slow_shutter_limit: { label: `Slow Shutter Limit` },
				// /birddogpicsetup
				backlight_com: { label: `Backlight Com` },
				chroma_suppress: { label: `Chroma Suppress` },
				effect: { label: `Effect` },
				gamma: { label: `Gamma` },
				hlc_mode: { label: `HLC Mode` },
				ir_cutfilter: { label: `IR Cut Filter` },
				noise_reduction: { label: `Noise Reduction` },
				sharpness: { label: `Sharpness` },
				stabilizer: { label: `Stabilizer` },
				// /birddogcmsetup
				cm_blue_gain: { label: 'Blue Gain' },
				cm_blue_hue: { label: 'Blue Hue' },
				cm_color_gain: { label: 'Color Gain' },
				cm_cyan_gain: { label: 'Cyan Gain' },
				cm_cyan_hue: { label: 'Cyan Hue' },
				cm_green_gain: { label: 'Green Gain' },
				cm_green_hue: { label: 'Green Hue' },
				cm_hue_phase: { label: 'Hue Phase' },
				cm_mag_gain: { label: 'Magenta Gain' },
				cm_mag_hue: { label: 'Magenta Hue' },
				cm_red_gain: { label: 'Red Gain' },
				cm_red_hue: { label: 'Red Hue' },
				cm_yellow_gain: { label: 'Yellow Gain' },
				cm_yellow_hue: { label: 'Yellow Hue' },
				// /birddogadvancesetup
				brightness: { label: 'Brightness' },
				brightness_comp: { label: 'Brightness Comp' },
				comp_level: { label: 'Comp Level' },
				gamma_offset: { label: 'Gamma Offset' },
				high_resolution: { label: 'High Resolution' },
				video_enhancement: { label: 'Video Enhancement' },
			},
			actions: {
				...COMMON[2],
				// General Camera Actions
				// Analog Audio Actions
				// Video Output Interface Actions
				// Encode Setup Actions
				tally: { choices: CHOICES.TALLY_MODE, default: 'TallyOn' },
				// Encode Transport Actions
				// NDI Discovery Server Actions
				// PTZ Actions
				pt: {
					choices: CHOICES.PTZ_DIRECTION,
					default: 'up',
					posPanChoices: CHOICES.POS_PAN_P200,
					posPanDefault: '0000',
					posTiltChoices: CHOICES.POS_TILT,
					posTiltDefault: '0000',
				},
				zoom: { ...COMMON[2].zoom, posZoomChoices: CHOICES.POS_ZOOM_30, posZoomDefault: '0000' },
				panSpeed: { choices: CHOICES.SPEED_CHANGES, default: 'up',range: { min: 0, max: 21, default: 11 } },
				tiltSpeed: { choices: CHOICES.SPEED_CHANGES, default: 'up',range: { min: 0, max: 18, default: 9 }},
				// Focus Actions
				// Exposure Actions
				ae_response: { range: { min: 1, max: 48, default: 1 } },
				expM: { choices: CHOICES.EXP_MODE_2, default: 'FULL-AUTO' },
				gain: { choices: CHOICES.GAIN_2, default: 1 },
				gain_limit: { range: { min: 4, max: 15, default: 15 } },
				iris: { choices: CHOICES.IRIS_2, default: 1, range: { closed: 0, min: 5, max: 17 } },
				highSensitivity: { choices: CHOICES.ON_OFF, default: 'On' },
				shutter_speed: {
					shutter_50: CHOICES.SHUTTER_50,
					shutter_60: CHOICES.SHUTTER_60,
					default: 6,
					range: { min: 0, max: 21 },
				},
				// White Balance Actions
				wb: { choices: CHOICES.WB_MODE_2, default: 'AUTO' },
				// Picture Setup Actions
				pictureEffect: { choices: CHOICES.PICTURE_EFFECT, default: 'BW' },
				irMode: { choices: CHOICES.IR_CUT_FILTER_3, default: 'NoiseReduction' },
				// Color Matrix Actions
				// Advanced Setup Actions
				// External Setup Actions
				// Detail Setup Actions
				// Gamma Setup Actions
				// Other Actions
			},
			feedback: {
				...COMMON[3],
			},
		},
		{
			id: 'P200_A4_A5',
			apicalls: {
				...COMMON[0],
				birddogcmsetup: true,
				birddogadvancesetup: true,
			},
			variables: {
				...COMMON[1],
				// /encodesetup
				tally_mode: { label: `Tally Mode` },
				// /birddogptzsetup
				pan_speed: { label: `Pan Speed` },
				tilt_speed: { label: `Tilt Speed` },
				pan_position: { label: `Pan Position` },
				tilt_position: { label: `Tilt Position` },
				// /birddogexpsetup
				ae_response: { label: `Ae Response` },
				gain_limit: { label: `Gain Limit` },
				high_sensitivity: { label: `High Sensitivity` },
				slow_shutter: { label: `Slow Shutter ` },
				slow_shutter_limit: { label: `Slow Shutter Limit` },
				// /birddogpicsetup
				backlight_com: { label: `Backlight Com` },
				chroma_suppress: { label: `Chroma Suppress` },
				effect: { label: `Effect` },
				gamma: { label: `Gamma` },
				hlc_mode: { label: `HLC Mode` },
				ir_cutfilter: { label: `IR Cut Filter` },
				low_latency: { label: `Low Latency` },
				noise_reduction: { label: `Noise Reduction` },
				sharpness: { label: `Sharpness` },
				stabilizer: { label: `Stabilizer` },
				// /birddogcmsetup
				cm_blue_gain: { label: 'Blue Gain' },
				cm_blue_hue: { label: 'Blue Hue' },
				cm_color_gain: { label: 'Color Gain' },
				cm_cyan_gain: { label: 'Cyan Gain' },
				cm_cyan_hue: { label: 'Cyan Hue' },
				cm_green_gain: { label: 'Green Gain' },
				cm_green_hue: { label: 'Green Hue' },
				cm_hue_phase: { label: 'Hue Phase' },
				cm_mag_gain: { label: 'Magenta Gain' },
				cm_mag_hue: { label: 'Magenta Hue' },
				cm_red_gain: { label: 'Red Gain' },
				cm_red_hue: { label: 'Red Hue' },
				cm_yellow_gain: { label: 'Yellow Gain' },
				cm_yellow_hue: { label: 'Yellow Hue' },
				// /birddogadvancesetup
				brightness: { label: 'Brightness' },
				brightness_comp: { label: 'Brightness Comp' },
				comp_level: { label: 'Comp Level' },
				gamma_offset: { label: 'Gamma Offset' },
				high_resolution: { label: 'High Resolution' },
				video_enhancement: { label: 'Video Enhancement' },
			},
			actions: {
				...COMMON[2],
				// General Camera Actions
				// Analog Audio Actions
				// Video Output Interface Actions
				// Encode Setup Actions
				tally: { choices: CHOICES.TALLY_MODE, default: 'TallyOn' },
				// Encode Transport Actions
				// NDI Discovery Server Actions
				// PTZ Actions
				pt: {
					choices: CHOICES.PTZ_DIRECTION,
					default: 'up',
					posPanChoices: CHOICES.POS_PAN_P200,
					posPanDefault: '0000',
					posTiltChoices: CHOICES.POS_TILT,
					posTiltDefault: '0000',
				},
				zoom: { ...COMMON[2].zoom, posZoomChoices: CHOICES.POS_ZOOM_30, posZoomDefault: '0000' },
				panSpeed: { choices: CHOICES.SPEED_CHANGES, default: 'up',range: { min: 0, max: 21, default: 11 } },
				tiltSpeed: { choices: CHOICES.SPEED_CHANGES, default: 'up',range: { min: 0, max: 18, default: 9 }},
				// Focus Actions
				// Exposure Actions
				ae_response: { range: { min: 1, max: 48, default: 1 } },
				expM: { choices: CHOICES.EXP_MODE_1, default: 'FULL-AUTO' },
				gain: { choices: CHOICES.GAIN_2, default: 1 },
				gain_limit: { range: { min: 4, max: 15, default: 15 } },
				iris: { choices: CHOICES.IRIS_2, default: 1, range: { closed: 0, min: 5, max: 17 } },
				highSensitivity: { choices: CHOICES.ON_OFF, default: 'On' },
				shutter_speed: {
					shutter_50: CHOICES.SHUTTER_50,
					shutter_60: CHOICES.SHUTTER_60,
					default: 6,
					range: { min: 0, max: 21 },
				},
				// White Balance Actions
				wb: { choices: CHOICES.WB_MODE_2, default: 'AUTO' },
				// Picture Setup Actions
				pictureEffect: { choices: CHOICES.PICTURE_EFFECT, default: 'BW' },
				irMode: { choices: CHOICES.IR_CUT_FILTER_1, default: 'Auto' },
				// Color Matrix Actions
				// Advanced Setup Actions
				// External Setup Actions
				// Detail Setup Actions
				// Gamma Setup Actions
				// Other Actions
			},
			feedback: {
				...COMMON[3],
			},
		},
		{
			id: 'A200_GEN1',
			apicalls: {
				...COMMON[0],
				birddogcmsetup: true,
				birddogadvancesetup: true,
				birddogexternalsetup: true,
			},
			variables: {
				...COMMON[1],
				// /birddogptzsetup
				pan_speed: { label: `Pan Speed` },
				tilt_speed: { label: `Tilt Speed` },
				pan_position: { label: `Pan Position` },
				tilt_position: { label: `Tilt Position` },
				// /birddogexpsetup
				ae_response: { label: `Ae Response` },
				gain_limit: { label: `Gain Limit` },
				high_sensitivity: { label: `High Sensitivity` },
				slow_shutter: { label: `Slow Shutter ` },
				slow_shutter_limit: { label: `Slow Shutter Limit` },
				// /birddogpicsetup
				backlight_com: { label: `Backlight Com` },
				chroma_suppress: { label: `Chroma Suppress` },
				effect: { label: `Effect` },
				gamma: { label: `Gamma` },
				hlc_mode: { label: `HLC Mode` },
				ir_cutfilter: { label: `IR Cut Filter` },
				noise_reduction: { label: `Noise Reduction` },
				sharpness: { label: `Sharpness` },
				stabilizer: { label: `Stabilizer` },
				// /birddogcmsetup
				cm_blue_gain: { label: 'Blue Gain' },
				cm_blue_hue: { label: 'Blue Hue' },
				cm_color_gain: { label: 'Color Gain' },
				cm_cyan_gain: { label: 'Cyan Gain' },
				cm_cyan_hue: { label: 'Cyan Hue' },
				cm_green_gain: { label: 'Green Gain' },
				cm_green_hue: { label: 'Green Hue' },
				cm_hue_phase: { label: 'Hue Phase' },
				cm_mag_gain: { label: 'Magenta Gain' },
				cm_mag_hue: { label: 'Magenta Hue' },
				cm_red_gain: { label: 'Red Gain' },
				cm_red_hue: { label: 'Red Hue' },
				cm_yellow_gain: { label: 'Yellow Gain' },
				cm_yellow_hue: { label: 'Yellow Hue' },
				// /birddogadvancesetup
				brightness: { label: 'Brightness' },
				brightness_comp: { label: 'Brightness Comp' },
				comp_level: { label: 'Comp Level' },
				gamma_offset: { label: 'Gamma Offset' },
				high_resolution: { label: 'High Resolution' },
				video_enhancement: { label: 'Video Enhancement' },
			},
			actions: {
				...COMMON[2],
				// General Camera Actions
				// Analog Audio Actions
				// Video Output Interface Actions
				// Encode Setup Actions
				// Encode Transport Actions
				// NDI Discovery Server Actions
				// PTZ Actions
				pt: {
					choices: CHOICES.PTZ_DIRECTION,
					default: 'up',
					posPanChoices: CHOICES.POS_PAN_P200,
					posPanDefault: '0000',
					posTiltChoices: CHOICES.POS_TILT,
					posTiltDefault: '0000',
				},
				zoom: { ...COMMON[2].zoom, posZoomChoices: CHOICES.POS_ZOOM_30, posZoomDefault: '0000' },
				panSpeed: { choices: CHOICES.SPEED_CHANGES, default: 'up',range: { min: 0, max: 21, default: 11 } },
				tiltSpeed: { choices: CHOICES.SPEED_CHANGES, default: 'up',range: { min: 0, max: 18, default: 9 }},
				// Focus Actions
				// Exposure Actions
				ae_response: { range: { min: 1, max: 48, default: 1 } },
				expM: { choices: CHOICES.EXP_MODE_1, default: 'FULL-AUTO' },
				gain: { choices: CHOICES.GAIN_2, default: 1 },
				gain_limit: { range: { min: 4, max: 15, default: 15 } },
				highSensitivity: { choices: CHOICES.ON_OFF, default: 'On' },
				iris: { choices: CHOICES.IRIS_2, default: 1, range: { closed: 0, min: 5, max: 17 } },
				shutter_speed: {
					shutter_50: CHOICES.SHUTTER_50,
					shutter_60: CHOICES.SHUTTER_60,
					default: 6,
					range: { min: 0, max: 21 },
				},
				// White Balance Actions
				wb: { choices: CHOICES.WB_MODE_2, default: 'AUTO' },
				// Picture Setup Actions
				pictureEffect: { choices: CHOICES.PICTURE_EFFECT, default: 'BW' },
				irMode: { choices: CHOICES.IR_CUT_FILTER_1, default: 'Auto' },
				// Color Matrix Actions
				// Advanced Setup Actions
				// External Setup Actions
				// Detail Setup Actions
				// Gamma Setup Actions
				// Other Actions
			},
			feedback: {
				...COMMON[3],
			},
		},
		{
			id: 'A200_GEN2',
			apicalls: {
				...COMMON[0],
				birddogcmsetup: true,
				birddogadvancesetup: true,
				birddogexternalsetup: true,
			},
			variables: {
				...COMMON[1],
				// /birddogptzsetup
				pan_speed: { label: `Pan Speed` },
				tilt_speed: { label: `Tilt Speed` },
				pan_position: { label: `Pan Position` },
				tilt_position: { label: `Tilt Position` },
				// /birddogexpsetup
				ae_response: { label: `Ae Response` },
				gain_limit: { label: `Gain Limit` },
				high_sensitivity: { label: `High Sensitivity` },
				slow_shutter: { label: `Slow Shutter ` },
				slow_shutter_limit: { label: `Slow Shutter Limit` },
				// /birddogpicsetup
				backlight_com: { label: `Backlight Com` },
				chroma_suppress: { label: `Chroma Suppress` },
				effect: { label: `Effect` },
				gamma: { label: `Gamma` },
				hlc_mode: { label: `HLC Mode` },
				ir_cutfilter: { label: `IR Cut Filter` },
				noise_reduction: { label: `Noise Reduction` },
				sharpness: { label: `Sharpness` },
				stabilizer: { label: `Stabilizer` },
				// /birddogcmsetup
				cm_blue_gain: { label: 'Blue Gain' },
				cm_blue_hue: { label: 'Blue Hue' },
				cm_color_gain: { label: 'Color Gain' },
				cm_cyan_gain: { label: 'Cyan Gain' },
				cm_cyan_hue: { label: 'Cyan Hue' },
				cm_green_gain: { label: 'Green Gain' },
				cm_green_hue: { label: 'Green Hue' },
				cm_hue_phase: { label: 'Hue Phase' },
				cm_mag_gain: { label: 'Magenta Gain' },
				cm_mag_hue: { label: 'Magenta Hue' },
				cm_red_gain: { label: 'Red Gain' },
				cm_red_hue: { label: 'Red Hue' },
				cm_yellow_gain: { label: 'Yellow Gain' },
				cm_yellow_hue: { label: 'Yellow Hue' },
				// /birddogadvancesetup
				brightness: { label: 'Brightness' },
				brightness_comp: { label: 'Brightness Comp' },
				comp_level: { label: 'Comp Level' },
				gamma_offset: { label: 'Gamma Offset' },
				high_resolution: { label: 'High Resolution' },
				video_enhancement: { label: 'Video Enhancement' },
			},
			actions: {
				...COMMON[2],
				// General Camera Actions
				// Analog Audio Actions
				// Video Output Interface Actions
				// Encode Setup Actions
				// Encode Transport Actions
				// NDI Discovery Server Actions
				// PTZ Actions
				pt: {
					choices: CHOICES.PTZ_DIRECTION,
					default: 'up',
					posPanChoices: CHOICES.POS_PAN_P200,
					posPanDefault: '0000',
					posTiltChoices: CHOICES.POS_TILT,
					posTiltDefault: '0000',
				},
				zoom: { ...COMMON[2].zoom, posZoomChoices: CHOICES.POS_ZOOM_30, posZoomDefault: '0000' },
				panSpeed: { choices: CHOICES.SPEED_CHANGES, default: 'up',range: { min: 0, max: 21, default: 11 } },
				tiltSpeed: { choices: CHOICES.SPEED_CHANGES, default: 'up',range: { min: 0, max: 18, default: 9 }},
				// Focus Actions
				// Exposure Actions
				ae_response: { range: { min: 1, max: 48, default: 1 } },
				expM: { choices: CHOICES.EXP_MODE_1, default: 'FULL-AUTO' },
				gain: { choices: CHOICES.GAIN_2, default: 1 },
				gain_limit: { range: { min: 4, max: 15, default: 15 } },
				highSensitivity: { choices: CHOICES.ON_OFF, default: 'On' },
				iris: { choices: CHOICES.IRIS_2, default: 1, range: { closed: 0, min: 5, max: 17 } },
				shutter_speed: {
					shutter_50: CHOICES.SHUTTER_50,
					shutter_60: CHOICES.SHUTTER_60,
					default: 6,
					range: { min: 0, max: 21 },
				},
				// White Balance Actions
				wb: { choices: CHOICES.WB_MODE_2, default: 'AUTO' },
				// Picture Setup Actions
				pictureEffect: { choices: CHOICES.PICTURE_EFFECT, default: 'BW' },
				irMode: { choices: CHOICES.IR_CUT_FILTER_1, default: 'Auto' },
				// Color Matrix Actions
				// Advanced Setup Actions
				// External Setup Actions
				// Detail Setup Actions
				// Gamma Setup Actions
				// Other Actions
			},
			feedback: {
				...COMMON[3],
			},
		},
		{
			id: 'A300_GEN1',
			apicalls: {
				...COMMON[0],
				birddogcmsetup: true,
				birddogadvancesetup: true,
				birddogexternalsetup: true,
			},
			variables: {
				...COMMON[1],
				// /birddogptzsetup
				pan_speed: { label: `Pan Speed` },
				tilt_speed: { label: `Tilt Speed` },
				pan_position: { label: `Pan Position` },
				tilt_position: { label: `Tilt Position` },
				// /birddogexpsetup
				ae_response: { label: `Ae Response` },
				gain_limit: { label: `Gain Limit` },
				high_sensitivity: { label: `High Sensitivity` },
				slow_shutter: { label: `Slow Shutter ` },
				slow_shutter_limit: { label: `Slow Shutter Limit` },
				// /birddogpicsetup
				backlight_com: { label: `Backlight Com` },
				chroma_suppress: { label: `Chroma Suppress` },
				effect: { label: `Effect` },
				gamma: { label: `Gamma` },
				hlc_mode: { label: `HLC Mode` },
				ir_cutfilter: { label: `IR Cut Filter` },
				noise_reduction: { label: `Noise Reduction` },
				sharpness: { label: `Sharpness` },
				stabilizer: { label: `Stabilizer` },
				// /birddogcmsetup
				cm_blue_gain: { label: 'Blue Gain' },
				cm_blue_hue: { label: 'Blue Hue' },
				cm_color_gain: { label: 'Color Gain' },
				cm_cyan_gain: { label: 'Cyan Gain' },
				cm_cyan_hue: { label: 'Cyan Hue' },
				cm_green_gain: { label: 'Green Gain' },
				cm_green_hue: { label: 'Green Hue' },
				cm_hue_phase: { label: 'Hue Phase' },
				cm_mag_gain: { label: 'Magenta Gain' },
				cm_mag_hue: { label: 'Magenta Hue' },
				cm_red_gain: { label: 'Red Gain' },
				cm_red_hue: { label: 'Red Hue' },
				cm_yellow_gain: { label: 'Yellow Gain' },
				cm_yellow_hue: { label: 'Yellow Hue' },
				// /birddogadvancesetup
				brightness: { label: 'Brightness' },
				brightness_comp: { label: 'Brightness Comp' },
				comp_level: { label: 'Comp Level' },
				gamma_offset: { label: 'Gamma Offset' },
				high_resolution: { label: 'High Resolution' },
				video_enhancement: { label: 'Video Enhancement' },
			},
			actions: {
				...COMMON[2],
				// General Camera Actions
				// Analog Audio Actions
				// Video Output Interface Actions
				// Encode Setup Actions
				// Encode Transport Actions
				// NDI Discovery Server Actions
				// PTZ Actions
				pt: {
					choices: CHOICES.PTZ_DIRECTION,
					default: 'up',
					posPanChoices: CHOICES.POS_PAN_P200,
					posPanDefault: '0000',
					posTiltChoices: CHOICES.POS_TILT,
					posTiltDefault: '0000',
				},
				zoom: { ...COMMON[2].zoom, posZoomChoices: CHOICES.POS_ZOOM_30, posZoomDefault: '0000' },
				panSpeed: { choices: CHOICES.SPEED_CHANGES, default: 'up',range: { min: 0, max: 21, default: 11 } },
				tiltSpeed: { choices: CHOICES.SPEED_CHANGES, default: 'up',range: { min: 0, max: 18, default: 9 }},
				// Focus Actions
				// Exposure Actions
				ae_response: { range: { min: 1, max: 48, default: 1 } },
				expM: { choices: CHOICES.EXP_MODE_1, default: 'FULL-AUTO' },
				gain: { choices: CHOICES.GAIN_2, default: 1 },
				gain_limit: { range: { min: 4, max: 15, default: 15 } },
				highSensitivity: { choices: CHOICES.ON_OFF, default: 'On' },
				iris: { choices: CHOICES.IRIS_2, default: 1, range: { closed: 0, min: 5, max: 17 } },
				shutter_speed: {
					shutter_50: CHOICES.SHUTTER_50,
					shutter_60: CHOICES.SHUTTER_60,
					default: 6,
					range: { min: 0, max: 21 },
				},
				// White Balance Actions
				wb: { choices: CHOICES.WB_MODE_2, default: 'AUTO' },
				// Picture Setup Actions
				pictureEffect: { choices: CHOICES.PICTURE_EFFECT, default: 'BW' },
				irMode: { choices: CHOICES.IR_CUT_FILTER_1, default: 'Auto' },
				// Color Matrix Actions
				// Advanced Setup Actions
				// External Setup Actions
				// Detail Setup Actions
				// Gamma Setup Actions
				// Other Actions
			},
			feedback: {
				...COMMON[3],
			},
		},
		{
			id: 'A300_GEN2',
			apicalls: {
				...COMMON[0],
				birddogcmsetup: true,
				birddogadvancesetup: true,
				birddogexternalsetup: true,
			},
			variables: {
				...COMMON[1],
				// /birddogptzsetup
				pan_speed: { label: `Pan Speed` },
				tilt_speed: { label: `Tilt Speed` },
				pan_position: { label: `Pan Position` },
				tilt_position: { label: `Tilt Position` },
				// /birddogexpsetup
				ae_response: { label: `Ae Response` },
				gain_limit: { label: `Gain Limit` },
				high_sensitivity: { label: `High Sensitivity` },
				slow_shutter: { label: `Slow Shutter ` },
				slow_shutter_limit: { label: `Slow Shutter Limit` },
				// /birddogpicsetup
				backlight_com: { label: `Backlight Com` },
				chroma_suppress: { label: `Chroma Suppress` },
				effect: { label: `Effect` },
				gamma: { label: `Gamma` },
				hlc_mode: { label: `HLC Mode` },
				ir_cutfilter: { label: `IR Cut Filter` },
				noise_reduction: { label: `Noise Reduction` },
				sharpness: { label: `Sharpness` },
				stabilizer: { label: `Stabilizer` },
				// /birddogcmsetup
				cm_blue_gain: { label: 'Blue Gain' },
				cm_blue_hue: { label: 'Blue Hue' },
				cm_color_gain: { label: 'Color Gain' },
				cm_cyan_gain: { label: 'Cyan Gain' },
				cm_cyan_hue: { label: 'Cyan Hue' },
				cm_green_gain: { label: 'Green Gain' },
				cm_green_hue: { label: 'Green Hue' },
				cm_hue_phase: { label: 'Hue Phase' },
				cm_mag_gain: { label: 'Magenta Gain' },
				cm_mag_hue: { label: 'Magenta Hue' },
				cm_red_gain: { label: 'Red Gain' },
				cm_red_hue: { label: 'Red Hue' },
				cm_yellow_gain: { label: 'Yellow Gain' },
				cm_yellow_hue: { label: 'Yellow Hue' },
				// /birddogadvancesetup
				brightness: { label: 'Brightness' },
				brightness_comp: { label: 'Brightness Comp' },
				comp_level: { label: 'Comp Level' },
				gamma_offset: { label: 'Gamma Offset' },
				high_resolution: { label: 'High Resolution' },
				video_enhancement: { label: 'Video Enhancement' },
			},
			actions: {
				...COMMON[2],
				// General Camera Actions
				// Analog Audio Actions
				// Video Output Interface Actions
				// Encode Setup Actions
				// Encode Transport Actions
				// NDI Discovery Server Actions
				// PTZ Actions
				pt: {
					choices: CHOICES.PTZ_DIRECTION,
					default: 'up',
					posPanChoices: CHOICES.POS_PAN_P200,
					posPanDefault: '0000',
					posTiltChoices: CHOICES.POS_TILT,
					posTiltDefault: '0000',
				},
				zoom: { ...COMMON[2].zoom, posZoomChoices: CHOICES.POS_ZOOM_30, posZoomDefault: '0000' },
				panSpeed: { choices: CHOICES.SPEED_CHANGES, default: 'up',range: { min: 0, max: 21, default: 11 } },
				tiltSpeed: { choices: CHOICES.SPEED_CHANGES, default: 'up',range: { min: 0, max: 18, default: 9 }},
				// Focus Actions
				// Exposure Actions
				ae_response: { range: { min: 1, max: 48, default: 1 } },
				expM: { choices: CHOICES.EXP_MODE_1, default: 'FULL-AUTO' },
				gain: { choices: CHOICES.GAIN_2, default: 1 },
				gain_limit: { range: { min: 4, max: 15, default: 15 } },
				highSensitivity: { choices: CHOICES.ON_OFF, default: 'On' },
				iris: { choices: CHOICES.IRIS_2, default: 1, range: { closed: 0, min: 5, max: 17 } },
				shutter_speed: {
					shutter_50: CHOICES.SHUTTER_50,
					shutter_60: CHOICES.SHUTTER_60,
					default: 6,
					range: { min: 0, max: 21 },
				},
				// White Balance Actions
				wb: { choices: CHOICES.WB_MODE_2, default: 'AUTO' },
				// Picture Setup Actions
				pictureEffect: { choices: CHOICES.PICTURE_EFFECT, default: 'BW' },
				irMode: { choices: CHOICES.IR_CUT_FILTER_1, default: 'Auto' },
				// Color Matrix Actions
				// Advanced Setup Actions
				// External Setup Actions
				// Detail Setup Actions
				// Gamma Setup Actions
				// Other Actions
			},
			feedback: {
				...COMMON[3],
			},
		},
		{
			id: 'P400',
			apicalls: {
				...COMMON[0],
				birddogdetsetup: true,
				birddoggammasetup: true,
			},
			variables: {
				...COMMON[1],
				// /videooutputinterface
				video_output: {},
				// /encodesetup
				tally_mode: { label: `Tally Mode` },
				// /birddogptzsetup
				pan_speed: { label: `Pan Speed` },
				tilt_speed: { label: `Tilt Speed` },
				pan_position: { label: `Pan Position` },
				tilt_position: { label: `Tilt Position` },
				// /birddogexpsetup
				ae_response: { label: `Ae Response` },
				backlight: {},
				gain_limit: { label: `Gain Limit` },
				gain_point: {},
				gain_point_position: {},
				high_sensitivity: { label: `High Sensitivity` },
				shutter_max_speed: {},
				shutter_min_speed: {},
				slow_shutter: { label: `Slow Shutter ` },
				slow_shutter_limit: { label: `Slow Shutter Limit` },
				spotlight: {},
				// /birddogpicsetup
				chroma_suppress: { label: `Chroma Suppress` },
				hlc_mode: { label: `HLC Mode` },
				ir_cutfilter: { label: `IR Cut Filter` },
				stabilizer: { label: `Stabilizer` },
				twod_nr: {},
				threed_nr: {},
				// /birddogdetsetup
				bandwidth: {},
			},
			actions: {
				...COMMON[2],
				// General Camera Actions
				// Analog Audio Actions
				// Video Output Interface Actions
				// Encode Setup Actions
				// Encode Transport Actions
				// NDI Discovery Server Actions
				// PTZ Actions
				pt: {
					choices: CHOICES.PTZ_DIRECTION,
					default: 'up',
					posPanChoices: CHOICES.POS_PAN_P200,
					posPanDefault: '0000',
					posTiltChoices: CHOICES.POS_TILT,
					posTiltDefault: '0000',
				},
				zoom: { ...COMMON[2].zoom, posZoomChoices: CHOICES.POS_ZOOM_20, posZoomDefault: '0000' },
				panSpeed: { choices: CHOICES.SPEED_CHANGES, default: 'up',range: { min: 0, max: 21, default: 11 } },
				tiltSpeed: { choices: CHOICES.SPEED_CHANGES, default: 'up',range: { min: 0, max: 18, default: 9 }},
				// Focus Actions
				// Exposure Actions
				ae_response: { range: { min: 4, max: 48, default: 1 } },
				backlight: { choices: CHOICES.ON_OFF, default: 'On' },
				expM: { choices: CHOICES.EXP_MODE_3, default: 'FULL-AUTO' },
				gain: { choices: CHOICES.GAIN_3, default: 1 },
				gain_limit: { range: { min: 4, max: 13, default: 13 } },
				gain_point: { choices: CHOICES.ON_OFF, default: 'On' },
				highSensitivity: { choices: CHOICES.ON_OFF, default: 'On' },
				iris: { choices: CHOICES.IRIS_3, default: 1, range: { closed: 0, min: 5, max: 21 } },
				shutter_speed: {
					shutter_24: CHOICES.SHUTTER_4K_24,
					shutter_50: CHOICES.SHUTTER_4K_50,
					shutter_60: CHOICES.SHUTTER_4K_60,
					default: 18,
					range: { min: 6, max: 33 },
				},
				shutter_max_speed: { range: { min: 20, max: 33, default: 20 } },
				// White Balance Actions
				wb: { choices: CHOICES.WB_MODE_2, default: 'AUTO' },
				// Picture Setup Actions
				irMode: { choices: CHOICES.IR_CUT_FILTER_2, default: 'On' },
				// Color Matrix Actions
				// Advanced Setup Actions
				// External Setup Actions
				// Detail Setup Actions
				// Gamma Setup Actions
				// Other Actions
			},
			feedback: {
				...COMMON[3],
			},
		},
		{
			id: 'P4K',
			apicalls: {
				...COMMON[0],
				birddogdetsetup: true,
				birddoggammasetup: true,
			},
			variables: {
				...COMMON[1],
				// /videooutputinterface
				video_output: {},
				// /encodesetup
				tally_mode: { label: `Tally Mode` },
				// /birddogptzsetup
				pan_speed: { label: `Pan Speed` },
				tilt_speed: { label: `Tilt Speed` },
				pan_position: { label: `Pan Position` },
				tilt_position: { label: `Tilt Position` },
				// /birddogexpsetup
				ae_response: { label: `Ae Response` },
				backlight: {},
				gain_limit: { label: `Gain Limit` },
				gain_point: {},
				gain_point_position: {},
				high_sensitivity: { label: `High Sensitivity` },
				shutter_max_speed: {},
				shutter_min_speed: {},
				slow_shutter: { label: `Slow Shutter ` },
				slow_shutter_limit: { label: `Slow Shutter Limit` },
				spotlight: {},
				// /birddogpicsetup
				chroma_suppress: { label: `Chroma Suppress` },
				hlc_mode: { label: `HLC Mode` },
				ir_cutfilter: { label: `IR Cut Filter` },
				stabilizer: { label: `Stabilizer` },
				twod_nr: {},
				threed_nr: {},
				// /birddogdetsetup
				bandwidth: {},
			},
			actions: {
				...COMMON[2],
				// General Camera Actions
				// Analog Audio Actions
				// Video Output Interface Actions
				// Encode Setup Actions
				// Encode Transport Actions
				// NDI Discovery Server Actions
				// PTZ Actions
				pt: {
					choices: CHOICES.PTZ_DIRECTION,
					default: 'up',
					posPanChoices: CHOICES.POS_PAN_P200,
					posPanDefault: '0000',
					posTiltChoices: CHOICES.POS_TILT,
					posTiltDefault: '0000',
				},
				zoom: { ...COMMON[2].zoom, posZoomChoices: CHOICES.POS_ZOOM_12, posZoomDefault: '0000' },
				panSpeed: { choices: CHOICES.SPEED_CHANGES, default: 'up',range: { min: 0, max: 21, default: 11 } },
				tiltSpeed: { choices: CHOICES.SPEED_CHANGES, default: 'up',range: { min: 0, max: 18, default: 9 }},
				// Focus Actions
				// Exposure Actions
				ae_response: { range: { min: 1, max: 48, default: 1 } },
				backlight: { choices: CHOICES.ON_OFF, default: 'On' },
				expM: { choices: CHOICES.EXP_MODE_3, default: 'FULL-AUTO' },
				gain: { choices: CHOICES.GAIN_3, default: 1 },
				gain_limit: { range: { min: 4, max: 13, default: 13 } },
				gain_point: { choices: CHOICES.ON_OFF, default: 'On' },
				highSensitivity: { choices: CHOICES.ON_OFF, default: 'On' },
				iris: { choices: CHOICES.IRIS_4, default: 1, range: { closed: 5, min: 6, max: 21 } },
				shutter_speed: {
					shutter_24: CHOICES.SHUTTER_4K_24,
					shutter_50: CHOICES.SHUTTER_4K_50,
					shutter_60: CHOICES.SHUTTER_4K_60,
					default: 18,
					range: { min: 6, max: 33 },
				},
				shutter_max_speed: { range: { min: 20, max: 33, default: 20 } },
				shutter_min_speed: { range: { min: 16, max: 33, default: 16 } },
				// White Balance Actions
				wb: { choices: CHOICES.WB_MODE_2, default: 'AUTO' },
				// Picture Setup Actions
				irMode: { choices: CHOICES.IR_CUT_FILTER_2, default: 'On' },
				// Color Matrix Actions
				// Advanced Setup Actions
				// External Setup Actions
				// Detail Setup Actions
				// Gamma Setup Actions
				// Other Actions
			},
			feedback: {
				...COMMON[3],
			},
		},
	],
}
