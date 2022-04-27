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
		standby: { label: 'Standby' },
		status: { label: 'Status' },
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
		// /NDIDisServer
		ndi_discovery_server: { label: `NDI Discovery Server` },
		ndi_discovery_server_ip: { label: `NDI Discovery Server IP` },
		// /birddogptzsetup
		zoom_speed: { label: `Zoom Speed` },
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
		power: { choices: CHOICES.ON_OFF, default: 'On' },
		zoomSpeed: { choices: CHOICES.ZOOM_SPEED, default: 4 },
		zoom: { choices: CHOICES.PTZ_ZOOM, default: 'in' },
		focus: { choices: CHOICES.FOCUS_CONTROL, default: 'near' },
		focusM: { choices: CHOICES.AUTO_FOCUS, default: 'AutoFocus' },
		wbOnePush: true,
		gainBlue: { choices: CHOICES.UP_DOWN_VALUE, default: 'up' },
		gainRed: { choices: CHOICES.UP_DOWN_VALUE, default: 'up' },
		savePset: true,
		recallPset: true,
		picFlip: { choices: CHOICES.ON_OFF, default: 'On' },
		picMirror: { choices: CHOICES.ON_OFF, default: 'On' },
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
			},
			actions: {
				...COMMON[2],
				pt: { choices: CHOICES.PTZ_DIRECTION, default: 'up' },
				panSpeed: { choices: CHOICES.SPEED_CHANGES, default: 'up' },
				tiltSpeed: { choices: CHOICES.SPEED_CHANGES, default: 'up' },
				expM: { choices: CHOICES.EXP_MODE_1, default: 'FULL-AUTO' },
				wb: { choices: CHOICES.WB_MODE_1, default: 'AUTO' },
				gain: { choices: CHOICES.GAIN_1, default: 0 },
				iris: { choices: CHOICES.IRIS_1, default: 1, range: { closed: 0, min: 1, max: 13 } },
				shut: { shutter_50: CHOICES.SHUTTER_50, shutter_60: CHOICES.SHUTTER_60 },
				pictureEffect: { choices: CHOICES.PICTURE_EFFECT, default: 'BW' },
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
				// /encodesetup
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
			},
			actions: {
				...COMMON[2],
				tally_mode: { choices: CHOICES.TALLY_MODE, default: 'TallyOn' },
				expM: { choices: CHOICES.EXP_MODE_1, default: 'FULL-AUTO' },
				wb: { choices: CHOICES.WB_MODE_1, default: 'AUTO' },
				gain: { choices: CHOICES.GAIN_1, default: 0 },
				iris: { choices: CHOICES.IRIS_1, default: 1,range: { closed: 0, min: 1, max: 13 }  },
				shut: { shutter_50: CHOICES.SHUTTER_50, shutter_60: CHOICES.SHUTTER_60 },
				pictureEffect: { choices: CHOICES.PICTURE_EFFECT, default: 'BW' },
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
			},
			actions: {
				...COMMON[2],
				pt: { choices: CHOICES.PTZ_DIRECTION, default: 'up' },
				panSpeed: { choices: CHOICES.SPEED_CHANGES, default: 'up' },
				tiltSpeed: { choices: CHOICES.SPEED_CHANGES, default: 'up' },
				expM: { choices: CHOICES.EXP_MODE_2, default: 'FULL-AUTO' },
				wb: { choices: CHOICES.WB_MODE_2, default: 'AUTO' },
				gain: { choices: CHOICES.GAIN_2, default: 0 },
				iris: { choices: CHOICES.IRIS_2, default: 1, range: { closed: 0, min: 5, max: 17 } },
				shut: { shutter_50: CHOICES.SHUTTER_50, shutter_60: CHOICES.SHUTTER_60 },
				highSensitivity: { choices: CHOICES.ON_OFF, default: 'On' },
				pictureEffect: { choices: CHOICES.PICTURE_EFFECT, default: 'BW' },
				irMode: { choices: CHOICES.IR_CUT_FILTER_3, default: 'NoiseReduction' },
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
			},
			actions: {
				...COMMON[2],
				pt: { choices: CHOICES.PTZ_DIRECTION, default: 'up' },
				panSpeed: { choices: CHOICES.SPEED_CHANGES, default: 'up' },
				tiltSpeed: { choices: CHOICES.SPEED_CHANGES, default: 'up' },
				expM: { choices: CHOICES.EXP_MODE_1, default: 'FULL-AUTO' },
				wb: { choices: CHOICES.WB_MODE_2, default: 'AUTO' },
				gain: { choices: CHOICES.GAIN_2, default: 0 },
				iris: { choices: CHOICES.IRIS_2, default: 1, range: { closed: 0, min: 5, max: 17 } },
				shut: { shutter_50: CHOICES.SHUTTER_50, shutter_60: CHOICES.SHUTTER_60 },
				highSensitivity: { choices: CHOICES.ON_OFF, default: 'On' },
				pictureEffect: { choices: CHOICES.PICTURE_EFFECT, default: 'BW' },
				irMode: { choices: CHOICES.IR_CUT_FILTER_1, default: 'Auto' },
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
			},
			actions: {
				...COMMON[2],
				pt: { choices: CHOICES.PTZ_DIRECTION, default: 'up' },
				panSpeed: { choices: CHOICES.SPEED_CHANGES, default: 'up' },
				tiltSpeed: { choices: CHOICES.SPEED_CHANGES, default: 'up' },
				expM: { choices: CHOICES.EXP_MODE_1, default: 'FULL-AUTO' },
				wb: { choices: CHOICES.WB_MODE_2, default: 'AUTO' },
				gain: { choices: CHOICES.GAIN_2, default: 0 },
				iris: { choices: CHOICES.IRIS_2, default: 1, range: { closed: 0, min: 5, max: 17 } },
				shut: { shutter_50: CHOICES.SHUTTER_50, shutter_60: CHOICES.SHUTTER_60 },
				highSensitivity: { choices: CHOICES.ON_OFF, default: 'On' },
				pictureEffect: { choices: CHOICES.PICTURE_EFFECT, default: 'BW' },
				irMode: { choices: CHOICES.IR_CUT_FILTER_1, default: 'Auto' },
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
			},
			actions: {
				...COMMON[2],
				pt: { choices: CHOICES.PTZ_DIRECTION, default: 'up' },
				panSpeed: { choices: CHOICES.SPEED_CHANGES, default: 'up' },
				tiltSpeed: { choices: CHOICES.SPEED_CHANGES, default: 'up' },
				expM: { choices: CHOICES.EXP_MODE_1, default: 'FULL-AUTO' },
				wb: { choices: CHOICES.WB_MODE_2, default: 'AUTO' },
				gain: { choices: CHOICES.GAIN_2, default: 0 },
				iris: { choices: CHOICES.IRIS_2, default: 1, range: { closed: 0, min: 5, max: 17 }},
				shut: { shutter_50: CHOICES.SHUTTER_50, shutter_60: CHOICES.SHUTTER_60 },
				highSensitivity: { choices: CHOICES.ON_OFF, default: 'On' },
				pictureEffect: { choices: CHOICES.PICTURE_EFFECT, default: 'BW' },
				irMode: { choices: CHOICES.IR_CUT_FILTER_1, default: 'Auto' },
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
			},
			actions: {
				...COMMON[2],
				pt: { choices: CHOICES.PTZ_DIRECTION, default: 'up' },
				panSpeed: { choices: CHOICES.SPEED_CHANGES, default: 'up' },
				tiltSpeed: { choices: CHOICES.SPEED_CHANGES, default: 'up' },
				expM: { choices: CHOICES.EXP_MODE_1, default: 'FULL-AUTO' },
				wb: { choices: CHOICES.WB_MODE_2, default: 'AUTO' },
				gain: { choices: CHOICES.GAIN_2, default: 0 },
				iris: { choices: CHOICES.IRIS_2, default: 1, range: { closed: 0, min: 5, max: 17 } },
				shut: { shutter_50: CHOICES.SHUTTER_50, shutter_60: CHOICES.SHUTTER_60 },
				highSensitivity: { choices: CHOICES.ON_OFF, default: 'On' },
				pictureEffect: { choices: CHOICES.PICTURE_EFFECT, default: 'BW' },
				irMode: { choices: CHOICES.IR_CUT_FILTER_1, default: 'Auto' },
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
			},
			actions: {
				...COMMON[2],
				pt: { choices: CHOICES.PTZ_DIRECTION, default: 'up' },
				panSpeed: { choices: CHOICES.SPEED_CHANGES, default: 'up' },
				tiltSpeed: { choices: CHOICES.SPEED_CHANGES, default: 'up' },
				expM: { choices: CHOICES.EXP_MODE_1, default: 'FULL-AUTO' },
				wb: { choices: CHOICES.WB_MODE_2, default: 'AUTO' },
				gain: { choices: CHOICES.GAIN_2, default: 0 },
				iris: { choices: CHOICES.IRIS_2, default: 1, range: { closed: 0, min: 5, max: 17 } },
				shut: { shutter_50: CHOICES.SHUTTER_50, shutter_60: CHOICES.SHUTTER_60 },
				highSensitivity: { choices: CHOICES.ON_OFF, default: 'On' },
				pictureEffect: { choices: CHOICES.PICTURE_EFFECT, default: 'BW' },
				irMode: { choices: CHOICES.IR_CUT_FILTER_1, default: 'Auto' },
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
				pt: { choices: CHOICES.PTZ_DIRECTION, default: 'up' },
				panSpeed: { choices: CHOICES.SPEED_CHANGES, default: 'up' },
				tiltSpeed: { choices: CHOICES.SPEED_CHANGES, default: 'up' },
				expM: { choices: CHOICES.EXP_MODE_3, default: 'FULL-AUTO' },
				wb: { choices: CHOICES.WB_MODE_2, default: 'AUTO' },
				gain: { choices: CHOICES.GAIN_2, default: 0 },
				iris: { choices: CHOICES.IRIS_3, default: 1, range: { closed: 0, min: 5, max: 21 } },
				shut: {
					shutter_24: CHOICES.SHUTTER_4K_24,
					shutter_50: CHOICES.SHUTTER_4K_50,
					shutter_60: CHOICES.SHUTTER_4K_60,
				},
				highSensitivity: { choices: CHOICES.ON_OFF, default: 'On' },
				irMode: { choices: CHOICES.IR_CUT_FILTER_2, default: 'On' },
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
				pt: { choices: CHOICES.PTZ_DIRECTION, default: 'up' },
				panSpeed: { choices: CHOICES.SPEED_CHANGES, default: 'up' },
				tiltSpeed: { choices: CHOICES.SPEED_CHANGES, default: 'up' },
				expM: { choices: CHOICES.EXP_MODE_3, default: 'FULL-AUTO' },
				wb: { choices: CHOICES.WB_MODE_2, default: 'AUTO' },
				gain: { choices: CHOICES.GAIN_2, default: 0 },
				iris: { choices: CHOICES.IRIS_3, default: 1, range: { closed: 0, min: 5, max: 21 } },
				shut: {
					shutter_24: CHOICES.SHUTTER_4K_24,
					shutter_50: CHOICES.SHUTTER_4K_50,
					shutter_60: CHOICES.SHUTTER_4K_60,
				},
				highSensitivity: { choices: CHOICES.ON_OFF, default: 'On' },
				irMode: { choices: CHOICES.IR_CUT_FILTER_2, default: 'On' },
			},
			feedback: {
				...COMMON[3],
			},
		},
	],
}
