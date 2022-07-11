const CHOICES = require('./choices.js')
const COMMON = [
	{
		//API Calls
		//Basic Device Information
		about: { firmware: ['4', '5'] },
		//Device Settings
		analogaudiosetup: { firmware: ['4', '5'] },
		//NDI Encode
		encodesetup: { firmware: ['4', '5'] },
		encodetransport: { firmware: ['4', '5'] },
		//NDI Finder
		NDIDisServer: { firmware: ['4', '5'] },
		//PTZ
		birddogptzsetup: { firmware: ['4', '5'] },
		recallPost: { firmware: ['4', '5'] },
		savePost: { firmware: ['4', '5'] },
		//Exposure
		birddogexpsetup: { firmware: ['4', '5'] },
		//White Balance
		birddogwbsetup: { firmware: ['4', '5'] },
		//Picture Settings
		birddogpicsetup: { firmware: ['4', '5'] },
	},
	{
		//Variables
		// General Camera Variables
		firmware: { firmware: ['4', '5'], label: 'General - Firmware' },
		model: { firmware: ['4', '5'], label: 'General - Model' },
		hostname: { firmware: ['4', '5'], label: 'General - Name' },
		ipaddress: { firmware: ['4', '5'], label: 'General - IP Address' },
		netmask: { firmware: ['4', '5'], label: 'General - Network Mask' },
		network_config: { firmware: ['4', '5'], label: 'General - Network Config Method' },
		serial_number: { firmware: ['4', '5'], label: 'General - Serial Number' },
		status: { firmware: ['4', '5'], label: 'General - Status' },
		// VISCA Variables
		standby: { firmware: ['4', '5'], label: 'VISCA - Standby' },
		freeze: { firmware: ['4', '5'], label: 'VISCA - Freeze' },
		// Analog Audio Variables
		audio_in_gain: { firmware: ['4', '5'], label: 'Analog Audio - Audio In Gain' },
		audio_out_gain: { firmware: ['4', '5'], label: 'Analog Audio - Audio Out Gain' },
		audio_output: { firmware: ['4', '5'], label: 'Analog Audio - Audio Output' },
		// Video Output Interface Variables
		// Encode Setup Variables
		bandwidth_mode: { firmware: ['4', '5'], label: 'Encode Setup - Bandwidth Mode' },
		bandwidth_select: { firmware: ['4', '5'], label: 'Encode Setup - Bandwidth Select' },
		ndi_audio: { firmware: ['4', '5'], label: `Encode Setup - NDI Audio` },
		ndi_group: { firmware: ['4', '5'], label: `Encode Setup - NDI Group` },
		ndi_group_name: { firmware: ['4', '5'], label: `Encode Setup - NDI Group Name` },
		stream_name: { firmware: ['4', '5'], label: `Encode Setup - Stream Name` },
		video_format: { firmware: ['4', '5'], label: `Encode Setup - Video Format` },
		// Encode Transport Variables
		transmit_method: { firmware: ['4', '5'], label: `Encode Transport - Transmit Method` },
		transmit_netprefix: { firmware: ['4', '5'], label: 'Encode Transport - Transmit Net Prefix' },
		transmit_netmask: { firmware: ['4', '5'], label: 'Encode Transport - Transmit Netmask' },
		// NDI Discovery Variables
		ndi_discovery_server: { firmware: ['4', '5'], label: `NDI Discovery - Server` },
		ndi_discovery_server_ip: { firmware: ['4', '5'], label: `NDI Discovery - Server IP` },
		// PTZ Variables
		zoom_speed: { firmware: ['4', '5'], label: `PTZ - Zoom Speed` },
		zoom_position: { firmware: ['4', '5'], label: `PTZ - Zoom Position` },
		// Focus Variables
		focus_mode: { firmware: ['4', '5'], label: `Focus - Focus Mode` },
		// Exposure Variables
		bright_level: { firmware: ['4', '5'], label: `Exposure - Bright Level` },
		exposure_comp: { firmware: ['4', '5'], label: `Exposure - Exposure Compensation` },
		exposure_comp_level: { firmware: ['4', '5'], label: `Exposure - Exposure Compensation Level` },
		exposure_mode: { firmware: ['4', '5'], label: `Exposure - Exposure Mode` },
		gain: { firmware: ['4', '5'], label: `Exposure - Gain` },
		iris: { firmware: ['4', '5'], label: `Exposure - Iris` },
		shutter_speed: { firmware: ['4', '5'], label: `Exposure - Shutter Speed` },
		// White Balance Variables
		blue_gain: { firmware: ['4', '5'], label: `White Balance - Blue Gain` },
		red_gain: { firmware: ['4', '5'], label: `White Balance - Red Gain` },
		wb_mode: { firmware: ['4', '5'], label: `White Balance - White Balance Mode` },
		// Picture Setup Variables
		flip: { firmware: ['4', '5'], label: `Picture Setup - Flip` },
		mirror: { firmware: ['4', '5'], label: `Picture Setup - Mirror` },
	},
	{
		//actions
		/////////
		// General Camera Actions
		standby: { firmware: ['4', '5'], choices: CHOICES.STANDBY, default: 'on' },
		freeze: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'On' },
		// Analog Audio Actions
		analogAudioInGain: { firmware: ['4', '5'], range: { min: -50, max: 50, default: 0 } },
		analogAudioOutGain: { firmware: ['4', '5'], range: { min: -50, max: 50, default: 0 } },
		analogAudioOutput: { firmware: ['4', '5'], choices: CHOICES.ANALOG_AUDIO_OUTPUT, default: 'DecodeComms' },
		// Video Output Interface Actions
		// Encode Setup Actions
		bandwidth_mode: {
			firmware: ['4', '5'],
			choices: CHOICES.ENCODE_BANDWIDTH_MODE,
			default: 'NDIManaged',
		},
		bandwidth_select: {
			firmware: ['4', '5'],
			choices: CHOICES.UP_DOWN_VALUE,
			default: 'up',
			range: { min: 80, max: 120, default: 80 },
		},
		ndiAudio: { firmware: ['4', '5'], choices: CHOICES.ENCODE_NDI_AUDIO, default: 'NDIAudioMute' },
		ndiGroupEnable: { firmware: ['4', '5'], choices: CHOICES.ENCODE_NDIGroup, default: 'NDIGroupDis' },
		// Encode Transport Actions
		transmit_method: { firmware: ['4', '5'], choices: CHOICES.ENCODE_TXPM, default: 'UDP' },
		// NDI Discovery Server Actions
		ndi_discovery_server: { firmware: ['4', '5'], choices: CHOICES.NDI_DIS_SVR, default: 'NDIDisServDis' },
		// PTZ Actions
		zoomSpeed: {
			firmware: ['4', '5'],
			choices: CHOICES.SPEED_CHANGES,
			default: 'up',
			range: { min: 0, max: 7, default: 4 },
		},
		zoom: { firmware: ['4', '5'], choices: CHOICES.PTZ_ZOOM, default: 'in' },
		savePset: { firmware: ['4', '5'], range: { min: 1, max: 64, default: 1 } },
		recallPset: { firmware: ['4', '5'], range: { min: 1, max: 64, default: 1 } },
		// Focus Actions
		focus: { firmware: ['4', '5'], choices: CHOICES.FOCUS_CONTROL, default: 'near' },
		focusM: { firmware: ['4', '5'], choices: CHOICES.AUTO_FOCUS, default: 'Auto' },
		// Exposure Actions
		expComp: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
		// White Balance Actions
		wbOnePush: { firmware: ['4', '5'] },
		blue_gain: {
			firmware: ['4', '5'],
			choices: CHOICES.UP_DOWN_VALUE,
			default: 'up',
			range: { min: 0, max: 255, default: 128 },
		},
		red_gain: {
			firmware: ['4', '5'],
			choices: CHOICES.UP_DOWN_VALUE,
			default: 'up',
			range: { min: 0, max: 255, default: 128 },
		},
		// Picture Setup Actions
		picFlip: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'On' },
		picMirror: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'On' },
		// Other Actions
		custom: { firmware: ['4', '5'] },
	},
	{
		//feedback
		wb_mode: { firmware: ['4', '5'] },
		standby_status: { firmware: ['4', '5'] },
	},
]

module.exports = {
	// Model Specific
	MODELS: [
		{
			id: 'P100',
			apicalls: {
				...COMMON[0],
				birddogcmsetup: { firmware: ['4', '5'] },
				pt_pos: { firmware: ['4', '5'] },
			},
			variables: {
				...COMMON[1],
				// PTZ Variables
				pan_speed: { firmware: ['4', '5'], label: `PTZ - Pan Speed` },
				tilt_speed: { firmware: ['4', '5'], label: `PTZ - Tilt Speed` },
				pan_position: { firmware: ['4', '5'], label: `PTZ - Pan Position` },
				tilt_position: { firmware: ['4', '5'], label: `PTZ - Tilt Position` },
				// Exposure Variables
				shutter_control_overwrite: { firmware: ['4', '5'], label: `Exposure - Shutter Control Overwrite` },
				shutter_speed_overwrite: { firmware: ['4', '5'], label: `Exposure - Shutter Speed Overwrite` },
				// White Balance Variables
				color_temp: { firmware: ['4', '5'], label: `White Balance - Color Temp` },
				// Picture Setup Variables
				color: { firmware: ['4', '5'], label: `Picture Setup - Saturation` },
				contrast: { firmware: ['4', '5'], label: `Picture Setup - Contrast` },
				effect: { firmware: ['4', '5'], label: `Picture Setup - Effect` },
				gamma: { firmware: ['4', '5'], label: `Picture Setup - Gamma` },
				hue: { firmware: ['4', '5'], label: `Picture Setup - Hue` },
				noise_reduction: { firmware: ['4', '5'], label: `Picture Setup - Noise Reduction` },
				sharpness: { firmware: ['4', '5'], label: `Picture Setup - Sharpness` },
				wide_dynamic_range: { firmware: ['4', '5'], label: `Picture Setup - Wide Dynamic Range` },
				// Color Matrix Variables
				cm_blue_gain: { firmware: ['4', '5'], label: 'Color Matrix - Blue Gain' },
				cm_blue_hue: { firmware: ['4', '5'], label: 'Color Matrix - Blue Hue' },
				cm_cyan_gain: { firmware: ['4', '5'], label: 'Color Matrix - Cyan Gain' },
				cm_cyan_hue: { firmware: ['4', '5'], label: 'Color Matrix - Cyan Hue' },
				cm_green_gain: { firmware: ['4', '5'], label: 'Color Matrix - Green Gain' },
				cm_green_hue: { firmware: ['4', '5'], label: 'Color Matrix - Green Hue' },
				cm_mag_gain: { firmware: ['4', '5'], label: 'Color Matrix - Magenta Gain' },
				cm_mag_hue: { firmware: ['4', '5'], label: 'Color Matrix - Magenta Hue' },
				cm_red_gain: { firmware: ['4', '5'], label: 'Color Matrix - Red Gain' },
				cm_red_hue: { firmware: ['4', '5'], label: 'Color Matrix - Red Hue' },
				cm_yellow_gain: { firmware: ['4', '5'], label: 'Color Matrix - Yellow Gain' },
				cm_yellow_hue: { firmware: ['4', '5'], label: 'Color Matrix - Yellow Hue' },
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
					firmware: ['4', '5'],
					choices: CHOICES.PTZ_DIRECTION,
					default: 'up',
					posPanChoices: CHOICES.POS_PAN_P100,
					posPanDefault: '0000',
					posTiltChoices: CHOICES.POS_TILT,
					posTiltDefault: '0000',
				},
				zoom: { firmware: ['4', '5'], ...COMMON[2].zoom, posZoomChoices: CHOICES.POS_ZOOM_10, posZoomDefault: '0000' },
				panSpeed: {
					firmware: ['4', '5'],
					choices: CHOICES.SPEED_CHANGES,
					default: 'up',
					range: { min: 0, max: 21, default: 11 },
				},
				tiltSpeed: {
					firmware: ['4', '5'],
					choices: CHOICES.SPEED_CHANGES,
					default: 'up',
					range: { min: 0, max: 18, default: 9 },
				},
				// Focus Actions
				// Exposure Actions
				bright_level: { firmware: ['4', '5'], range: { min: 0, max: 27, default: 14 } },
				expCompLvl: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: -7, max: 7, default: 0 },
				},
				exposure_mode: { firmware: ['4', '5'], choices: CHOICES.EXP_MODE_1, default: 'FULL-AUTO' },
				gain: { firmware: ['4', '5'], choices: CHOICES.GAIN_1, default: 0 },
				iris: { firmware: ['4', '5'], choices: CHOICES.IRIS_1, default: 8, range: { closed: 0, min: 1, max: 13 } },
				shutter_control_overwrite: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'On' },
				shutter_speed: {
					firmware: ['4', '5'],
					shutter_50: CHOICES.SHUTTER_50,
					shutter_60: CHOICES.SHUTTER_60,
					default: 6,
					range: { min: 0, max: 21 },
				},
				shutter_speed_overwrite: { firmware: ['4', '5'], range: { min: 30, max: 110, default: 60 } },
				// White Balance Actions
				wb_mode: { firmware: ['4', '5'], choices: CHOICES.WB_MODE_1, default: 'AUTO' },
				color_temp: { firmware: ['4', '5'], choices: CHOICES.COLOR_TEMP, default: '6500' },
				// Picture Setup Actions
				color: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 15, default: 8 },
				},
				contrast: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 15, default: 8 },
				},
				pictureEffect: { firmware: ['4', '5'], choices: CHOICES.PICTURE_EFFECT, default: 'BW' },
				gamma: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 4, default: 2 },
				},
				hue: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 15, default: 8 },
				},
				noise_reduction: { firmware: ['4', '5'], choices: CHOICES.OFF_1_to_5, default: 'Off' },
				sharpness: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 15, default: 8 },
				},
				wide_dynamic_range: { firmware: ['4', '5'], choices: CHOICES.OFF_1_to_6, default: 'Off' },
				// Color Matrix Actions
				cm_blue_gain: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_blue_hue: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_cyan_gain: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_cyan_hue: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_green_gain: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_green_hue: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_mag_gain: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_mag_hue: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_red_gain: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_red_hue: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_yellow_gain: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_yellow_hue: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
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
				birddogcmsetup: { firmware: ['4', '5'] },
			},
			variables: {
				...COMMON[1],
				// General Camera Actions
				// Analog Audio Actions
				// Video Output Interface Actions
				// Encode Setup Actions
				tally_mode: { firmware: ['4', '5'], label: `Encode Setup - Tally Mode` },
				// Exposure Variables
				shutter_control_overwrite: { firmware: ['4', '5'], label: `Exposure - Shutter Control Overwrite` },
				shutter_speed_overwrite: { firmware: ['4', '5'], label: `Exposure - Shutter Speed Overwrite` },
				// White Balance Variables
				color_temp: { firmware: ['4', '5'], label: `White Balance - Color Temp` },
				// Picture Setup Variables
				color: { firmware: ['4', '5'], label: `Picture Setup - Saturation` },
				contrast: { firmware: ['4', '5'], label: `Picture Setup - Contrast` },
				effect: { firmware: ['4', '5'], label: `Picture Setup - Effect` },
				gamma: { firmware: ['4', '5'], label: `Picture Setup - Gamma` },
				hue: { firmware: ['4', '5'], label: `Picture Setup - Hue` },
				noise_reduction: { firmware: ['4', '5'], label: `Picture Setup - Noise Reduction` },
				sharpness: { firmware: ['4', '5'], label: `Picture Setup - Sharpness` },
				wide_dynamic_range: { firmware: ['4', '5'], label: `Picture Setup - Wide Dynamic Range` },
				// Color Matrix Variables
				cm_blue_gain: { firmware: ['4', '5'], label: 'Color Matrix - Blue Gain' },
				cm_blue_hue: { firmware: ['4', '5'], label: 'Color Matrix - Blue Hue' },
				cm_cyan_gain: { firmware: ['4', '5'], label: 'Color Matrix - Cyan Gain' },
				cm_cyan_hue: { firmware: ['4', '5'], label: 'Color Matrix - Cyan Hue' },
				cm_green_gain: { firmware: ['4', '5'], label: 'Color Matrix - Green Gain' },
				cm_green_hue: { firmware: ['4', '5'], label: 'Color Matrix - Green Hue' },
				cm_mag_gain: { firmware: ['4', '5'], label: 'Color Matrix - Magenta Gain' },
				cm_mag_hue: { firmware: ['4', '5'], label: 'Color Matrix - Magenta Hue' },
				cm_red_gain: { firmware: ['4', '5'], label: 'Color Matrix - Red Gain' },
				cm_red_hue: { firmware: ['4', '5'], label: 'Color Matrix - Red Hue' },
				cm_yellow_gain: { firmware: ['4', '5'], label: 'Color Matrix - Yellow Gain' },
				cm_yellow_hue: { firmware: ['4', '5'], label: 'Color Matrix - Yellow Hue' },
			},
			actions: {
				...COMMON[2],
				// General Camera Actions
				// Analog Audio Actions
				// Video Output Interface Actions
				// Encode Setup Actions
				tally: { firmware: ['4', '5'], choices: CHOICES.TALLY_MODE, default: 'TallyOn' },
				// Encode Transport Actions
				// NDI Discovery Server Actions
				// PTZ Actions
				zoom: { firmware: ['4', '5'], ...COMMON[2].zoom, posZoomChoices: CHOICES.POS_ZOOM_20, posZoomDefault: '0000' },
				// Focus Actions
				// Exposure Actions
				bright_level: { firmware: ['4', '5'], range: { min: 0, max: 27, default: 14 } },
				expCompLvl: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: -7, max: 7, default: 0 },
				},
				exposure_mode: { firmware: ['4', '5'], choices: CHOICES.EXP_MODE_1, default: 'FULL-AUTO' },
				gain: { firmware: ['4', '5'], choices: CHOICES.GAIN_1, default: 0 },
				iris: { firmware: ['4', '5'], choices: CHOICES.IRIS_1, default: 8, range: { closed: 0, min: 1, max: 13 } },
				shutter_control_overwrite: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'On' },
				shutter_speed: {
					firmware: ['4', '5'],
					shutter_50: CHOICES.SHUTTER_50,
					shutter_60: CHOICES.SHUTTER_60,
					default: 6,
					range: { min: 0, max: 21 },
				},
				shutter_speed_overwrite: { firmware: ['4', '5'], range: { min: 30, max: 110, default: 60 } },
				// White Balance Actions
				wb_mode: { firmware: ['4', '5'], choices: CHOICES.WB_MODE_1, default: 'AUTO' },
				color_temp: { firmware: ['4', '5'], choices: CHOICES.COLOR_TEMP, default: '6500' },
				// Picture Setup Actions
				color: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 15, default: 8 },
				},
				contrast: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 15, default: 8 },
				},
				pictureEffect: { firmware: ['4', '5'], choices: CHOICES.PICTURE_EFFECT, default: 'BW' },
				gamma: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 4, default: 2 },
				},
				hue: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 15, default: 8 },
				},
				noise_reduction: { firmware: ['4', '5'], choices: CHOICES.OFF_1_to_5, default: 'Off' },
				sharpness: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 15, default: 8 },
				},
				wide_dynamic_range: { firmware: ['4', '5'], choices: CHOICES.OFF_1_to_6, default: 'Off' },
				// Color Matrix Actions
				cm_blue_gain: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_blue_hue: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_cyan_gain: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_cyan_hue: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_green_gain: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_green_hue: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_mag_gain: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_mag_hue: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_red_gain: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_red_hue: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_yellow_gain: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_yellow_hue: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
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
			id: 'P200A2A3',
			apicalls: {
				...COMMON[0],
				birddogcmsetup: { firmware: ['4', '5'] },
				birddogadvancesetup: { firmware: ['4', '5'] },
				pt_pos: { firmware: ['4', '5'] },
			},
			variables: {
				...COMMON[1],
				// Encode Setup Variables
				tally_mode: { firmware: ['4', '5'], label: `Encode Setup - Tally Mode` },
				// PTZ Variables
				pan_speed: { firmware: ['4', '5'], label: `PTZ - Pan Speed` },
				tilt_speed: { firmware: ['4', '5'], label: `PTZ - Tilt Speed` },
				pan_position: { firmware: ['4', '5'], label: `PTZ - Pan Position` },
				tilt_position: { firmware: ['4', '5'], label: `PTZ - Tilt Position` },
				// Exposure Variables
				ae_response: { firmware: ['4', '5'], label: `Exposure - Ae Response` },
				gain_limit: { firmware: ['4', '5'], label: `Exposure - Gain Limit` },
				high_sensitivity: { firmware: ['4', '5'], label: `Exposure - High Sensitivity` },
				slow_shutter_en: { firmware: ['4', '5'], label: `Exposure - Slow Shutter Enable` },
				slow_shutter_limit: { firmware: ['4', '5'], label: `Exposure - Slow Shutter Limit` },
				// Picture Setup Variables
				backlight_com: { firmware: ['4', '5'], label: `Picture Setup - Backlight Compensation` },
				chroma_suppress: { firmware: ['4', '5'], label: `Picture Setup - Chroma Suppress` },
				effect: { firmware: ['4', '5'], label: `Picture Setup - Effect` },
				gamma: { firmware: ['4', '5'], label: `Picture Setup - Gamma` },
				highlight_comp: { firmware: ['4', '5'], label: `Picture Setup - Highlight Compensation` },
				highlight_comp_mask: { firmware: ['4', '5'], label: `Picture Setup - Highlight Compensation Mask` },
				ir_cutfilter: { firmware: ['4', '5'], label: `Picture Setup - IR Cut Filter` },
				noise_reduction: { firmware: ['4', '5'], label: `Picture Setup - Noise Reduction` },
				sharpness: { firmware: ['4', '5'], label: `Picture Setup - Sharpness` },
				stabilizer: { firmware: ['4', '5'], label: `Picture Setup - Stabilizer` },
				// Color Matrix Variables
				cm_blue_gain: { firmware: ['4', '5'], label: 'Color Matrix - Blue Gain' },
				cm_blue_hue: { firmware: ['4', '5'], label: 'Color Matrix - Blue Hue' },
				cm_color_gain: { firmware: ['4', '5'], label: 'Color Matrix - Color Gain' },
				cm_cyan_gain: { firmware: ['4', '5'], label: 'Color Matrix - Cyan Gain' },
				cm_cyan_hue: { firmware: ['4', '5'], label: 'Color Matrix - Cyan Hue' },
				cm_green_gain: { firmware: ['4', '5'], label: 'Color Matrix - Green Gain' },
				cm_green_hue: { firmware: ['4', '5'], label: 'Color Matrix - Green Hue' },
				cm_hue_phase: { firmware: ['4', '5'], label: 'Color Matrix - Hue Phase' },
				cm_mag_gain: { firmware: ['4', '5'], label: 'Color Matrix - Magenta Gain' },
				cm_mag_hue: { firmware: ['4', '5'], label: 'Color Matrix - Magenta Hue' },
				cm_red_gain: { firmware: ['4', '5'], label: 'Color Matrix - Red Gain' },
				cm_red_hue: { firmware: ['4', '5'], label: 'Color Matrix - Red Hue' },
				cm_yellow_gain: { firmware: ['4', '5'], label: 'Color Matrix - Yellow Gain' },
				cm_yellow_hue: { firmware: ['4', '5'], label: 'Color Matrix - Yellow Hue' },
				// Advanced Setup Variables
				brightness: { firmware: ['4', '5'], label: 'Advanced Setup - Brightness' },
				brightness_comp: { firmware: ['4', '5'], label: 'Advanced Setup - Brightness Comp' },
				comp_level: { firmware: ['4', '5'], label: 'Advanced Setup - Comp Level' },
				gamma_offset: { firmware: ['4', '5'], label: 'Advanced Setup - Gamma Offset' },
				high_resolution: { firmware: ['4', '5'], label: 'Advanced Setup - High Resolution' },
				video_enhancement: { firmware: ['4', '5'], label: 'Advanced Setup - Video Enhancement' },
			},
			actions: {
				...COMMON[2],
				// General Camera Actions
				// Analog Audio Actions
				// Video Output Interface Actions
				// Encode Setup Actions
				tally: { firmware: ['4', '5'], choices: CHOICES.TALLY_MODE, default: 'TallyOn' },
				// Encode Transport Actions
				// NDI Discovery Server Actions
				// PTZ Actions
				pt: {
					firmware: ['4', '5'],
					choices: CHOICES.PTZ_DIRECTION,
					default: 'up',
					posPanChoices: CHOICES.POS_PAN_P200,
					posPanDefault: '0000',
					posTiltChoices: CHOICES.POS_TILT,
					posTiltDefault: '0000',
				},
				zoom: { firmware: ['4', '5'], ...COMMON[2].zoom, posZoomChoices: CHOICES.POS_ZOOM_30, posZoomDefault: '0000' },
				panSpeed: {
					firmware: ['4', '5'],
					choices: CHOICES.SPEED_CHANGES,
					default: 'up',
					range: { min: 0, max: 21, default: 11 },
				},
				tiltSpeed: {
					firmware: ['4', '5'],
					choices: CHOICES.SPEED_CHANGES,
					default: 'up',
					range: { min: 0, max: 18, default: 9 },
				},
				// Focus Actions
				// Exposure Actions
				ae_response: { firmware: ['4', '5'], range: { min: 1, max: 48, default: 1 } },
				bright_level: { firmware: ['4', '5'], range: { min: 0, max: 31, default: 16 } },
				expCompLvl: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: -128, max: 127, default: 0 },
				},
				exposure_mode: { firmware: ['4', '5'], choices: CHOICES.EXP_MODE_2, default: 'FULL-AUTO' },
				gain: { firmware: ['4', '5'], choices: CHOICES.GAIN_2, default: 1 },
				gain_limit: { firmware: ['4', '5'], range: { min: 4, max: 15, default: 15 } },
				iris: { firmware: ['4', '5'], choices: CHOICES.IRIS_2, default: 12, range: { closed: 0, min: 5, max: 17 } },
				highSensitivity: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'On' },
				shutter_speed: {
					firmware: ['4', '5'],
					shutter_50: CHOICES.SHUTTER_50,
					shutter_60: CHOICES.SHUTTER_60,
					default: 6,
					range: { min: 0, max: 21 },
				},
				slow_shutter_en: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
				slow_shutter_limit: { firmware: ['4', '5'], range: { min: 1, max: 6, default: 3 } },
				// White Balance Actions
				wb_mode: { firmware: ['4', '5'], choices: CHOICES.WB_MODE_2, default: 'AUTO' },
				// Picture Setup Actions
				backlight_com: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
				chroma_suppress: { firmware: ['4', '5'], choices: CHOICES.OFF_L_M_H, default: 'OFF' },
				pictureEffect: { firmware: ['4', '5'], choices: CHOICES.PICTURE_EFFECT, default: 'BW' },
				gamma: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 1, default: 1 },
				},
				highlight_comp: { firmware: ['4', '5'], choices: CHOICES.OFF_L_M_H, default: 'OFF' },
				highlight_comp_mask: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 3, default: 1 },
				},
				ir_cutfilter: { firmware: ['4', '5'], choices: CHOICES.IR_CUT_FILTER_3, default: 'NoiseReduction' },
				noise_reduction: { firmware: ['4', '5'], choices: CHOICES.OFF_1_to_5, default: 'Off' },
				sharpness: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: -128, max: 127, default: 0 },
				},
				stabilizer: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
				// Color Matrix Actions
				cm_blue_gain: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_blue_hue: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_color_gain: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 255, default: 128 },
				},
				cm_cyan_gain: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_cyan_hue: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_green_gain: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_green_hue: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_hue_phase: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 255, default: 128 },
				},
				cm_mag_gain: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_mag_hue: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_red_gain: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_red_hue: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_yellow_gain: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_yellow_hue: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				// Advanced Setup Actions
				brightness: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 6, default: 3 },
				},
				brightness_comp: { firmware: ['4', '5'], choices: CHOICES.BRIGHTNESS_COMP, default: 'STANDARD' },
				comp_level: { firmware: ['4', '5'], choices: CHOICES.L_Mid_H, default: 'LOW' },
				gamma_offset: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: -16, max: 64, default: 40 },
				},
				high_resolution: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
				video_enhancement: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
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
			id: 'P200A4A5',
			apicalls: {
				...COMMON[0],
				birddogcmsetup: { firmware: ['4', '5'] },
				birddogadvancesetup: { firmware: ['4', '5'] },
				pt_pos: { firmware: ['4', '5'] },
			},
			variables: {
				...COMMON[1],
				// Encode Setup Variables
				tally_mode: { firmware: ['4', '5'], label: `Encode Setup - Tally Mode` },
				// PTZ Variables
				pan_speed: { firmware: ['4', '5'], label: `PTZ - Pan Speed` },
				tilt_speed: { firmware: ['4', '5'], label: `PTZ - Tilt Speed` },
				pan_position: { firmware: ['4', '5'], label: `PTZ - Pan Position` },
				tilt_position: { firmware: ['4', '5'], label: `PTZ - Tilt Position` },
				// Exposure Variables
				ae_response: { firmware: ['4', '5'], label: `Exposure - Ae Response` },
				gain_limit: { firmware: ['4', '5'], label: `Exposure - Gain Limit` },
				high_sensitivity: { firmware: ['4', '5'], label: `Exposure - High Sensitivity` },
				slow_shutter_en: { firmware: ['4', '5'], label: `Exposure - Slow Shutter Enable` },
				slow_shutter_limit: { firmware: ['4', '5'], label: `Exposure - Slow Shutter Limit` },
				// Picture Setup Variables
				backlight_com: { firmware: ['4', '5'], label: `Picture Setup - Backlight Compensation` },
				chroma_suppress: { firmware: ['4', '5'], label: `Picture Setup - Chroma Suppress` },
				effect: { firmware: ['4', '5'], label: `Picture Setup - Effect` },
				gamma: { firmware: ['4', '5'], label: `Picture Setup - Gamma` },
				highlight_comp: { firmware: ['4', '5'], label: `Picture Setup - Highlight Compensation` },
				highlight_comp_mask: { firmware: ['4', '5'], label: `Picture Setup - Highlight Compensation Mask` },
				ir_cutfilter: { firmware: ['4', '5'], label: `Picture Setup - IR Cut Filter` },
				low_latency: { firmware: ['4', '5'], label: `Picture Setup - Low Latency` },
				noise_reduction: { firmware: ['4', '5'], label: `Picture Setup - Noise Reduction` },
				sharpness: { firmware: ['4', '5'], label: `Picture Setup - Sharpness` },
				stabilizer: { firmware: ['4', '5'], label: `Picture Setup - Stabilizer` },
				// Color Matrix Variables
				cm_blue_gain: { firmware: ['4', '5'], label: 'Color Matrix - Blue Gain' },
				cm_blue_hue: { firmware: ['4', '5'], label: 'Color Matrix - Blue Hue' },
				cm_color_gain: { firmware: ['4', '5'], label: 'Color Matrix - Color Gain' },
				cm_cyan_gain: { firmware: ['4', '5'], label: 'Color Matrix - Cyan Gain' },
				cm_cyan_hue: { firmware: ['4', '5'], label: 'Color Matrix - Cyan Hue' },
				cm_green_gain: { firmware: ['4', '5'], label: 'Color Matrix - Green Gain' },
				cm_green_hue: { firmware: ['4', '5'], label: 'Color Matrix - Green Hue' },
				cm_hue_phase: { firmware: ['4', '5'], label: 'Color Matrix - Hue Phase' },
				cm_mag_gain: { firmware: ['4', '5'], label: 'Color Matrix - Magenta Gain' },
				cm_mag_hue: { firmware: ['4', '5'], label: 'Color Matrix - Magenta Hue' },
				cm_red_gain: { firmware: ['4', '5'], label: 'Color Matrix - Red Gain' },
				cm_red_hue: { firmware: ['4', '5'], label: 'Color Matrix - Red Hue' },
				cm_yellow_gain: { firmware: ['4', '5'], label: 'Color Matrix - Yellow Gain' },
				cm_yellow_hue: { firmware: ['4', '5'], label: 'Color Matrix - Yellow Hue' },
				// Advanced Setup Variables
				brightness: { firmware: ['4', '5'], label: 'Advanced Setup - Brightness' },
				brightness_comp: { firmware: ['4', '5'], label: 'Advanced Setup - Brightness Comp' },
				comp_level: { firmware: ['4', '5'], label: 'Advanced Setup - Comp Level' },
				gamma_offset: { firmware: ['4', '5'], label: 'Advanced Setup - Gamma Offset' },
				high_resolution: { firmware: ['4', '5'], label: 'Advanced Setup - High Resolution' },
				video_enhancement: { firmware: ['4', '5'], label: 'Advanced Setup - Video Enhancement' },
			},
			actions: {
				...COMMON[2],
				// General Camera Actions
				// Analog Audio Actions
				// Video Output Interface Actions
				// Encode Setup Actions
				tally: { firmware: ['4', '5'], choices: CHOICES.TALLY_MODE, default: 'TallyOn' },
				// Encode Transport Actions
				// NDI Discovery Server Actions
				// PTZ Actions
				pt: {
					firmware: ['4', '5'],
					choices: CHOICES.PTZ_DIRECTION,
					default: 'up',
					posPanChoices: CHOICES.POS_PAN_P200,
					posPanDefault: '0000',
					posTiltChoices: CHOICES.POS_TILT,
					posTiltDefault: '0000',
				},
				zoom: { firmware: ['4', '5'], ...COMMON[2].zoom, posZoomChoices: CHOICES.POS_ZOOM_30, posZoomDefault: '0000' },
				panSpeed: {
					firmware: ['4', '5'],
					choices: CHOICES.SPEED_CHANGES,
					default: 'up',
					range: { min: 0, max: 21, default: 11 },
				},
				tiltSpeed: {
					firmware: ['4', '5'],
					choices: CHOICES.SPEED_CHANGES,
					default: 'up',
					range: { min: 0, max: 18, default: 9 },
				},
				// Focus Actions
				// Exposure Actions
				ae_response: { firmware: ['4', '5'], range: { min: 1, max: 48, default: 1 } },
				bright_level: { firmware: ['4', '5'], range: { min: 0, max: 31, default: 16 } },
				expCompLvl: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: -128, max: 127, default: 0 },
				},
				exposure_mode: { firmware: ['4', '5'], choices: CHOICES.EXP_MODE_1, default: 'FULL-AUTO' },
				gain: { firmware: ['4', '5'], choices: CHOICES.GAIN_2, default: 1 },
				gain_limit: { firmware: ['4', '5'], range: { min: 4, max: 15, default: 15 } },
				iris: { firmware: ['4', '5'], choices: CHOICES.IRIS_2, default: 12, range: { closed: '4', min: 5, max: 17 } },
				highSensitivity: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'On' },
				shutter_speed: {
					firmware: ['4', '5'],
					shutter_50: CHOICES.SHUTTER_50,
					shutter_60: CHOICES.SHUTTER_60,
					default: 6,
					range: { min: 0, max: 21 },
				},
				slow_shutter_en: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
				slow_shutter_limit: { firmware: ['4', '5'], range: { min: 1, max: 6, default: 3 } },
				// White Balance Actions
				wb_mode: { firmware: ['4', '5'], choices: CHOICES.WB_MODE_2, default: 'AUTO' },
				// Picture Setup Actions
				backlight_com: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
				chroma_suppress: { firmware: ['4', '5'], choices: CHOICES.OFF_L_M_H, default: 'OFF' },
				pictureEffect: { firmware: ['4', '5'], choices: CHOICES.PICTURE_EFFECT, default: 'BW' },
				gamma: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 1, default: 1 },
				},
				highlight_comp: { firmware: ['4', '5'], choices: CHOICES.OFF_L_M_H, default: 'OFF' },
				highlight_comp_mask: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 15, default: 1 },
				},
				ir_cutfilter: { firmware: ['4', '5'], choices: CHOICES.IR_CUT_FILTER_1, default: 'Auto' },
				low_latency: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
				noise_reduction: { firmware: ['4', '5'], choices: CHOICES.OFF_1_to_5, default: 'Off' },
				sharpness: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: -128, max: 127, default: 0 },
				},
				stabilizer: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
				// Color Matrix Actions
				cm_blue_gain: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_blue_hue: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_color_gain: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 255, default: 128 },
				},
				cm_cyan_gain: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_cyan_hue: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_green_gain: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_green_hue: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_hue_phase: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 255, default: 128 },
				},
				cm_mag_gain: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_mag_hue: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_red_gain: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_red_hue: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_yellow_gain: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_yellow_hue: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				// Advanced Setup Actions
				brightness: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 6, default: 3 },
				},
				brightness_comp: { firmware: ['4', '5'], choices: CHOICES.BRIGHTNESS_COMP, default: 'STANDARD' },
				comp_level: { firmware: ['4', '5'], choices: CHOICES.L_Mid_H, default: 'LOW' },
				gamma_offset: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: -16, max: 64, default: 40 },
				},
				high_resolution: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
				video_enhancement: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
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
			id: 'A200GEN1',
			apicalls: {
				...COMMON[0],
				birddogcmsetup: { firmware: ['4', '5'] },
				birddogadvancesetup: { firmware: ['4', '5'] },
				birddogexternalsetup: { firmware: ['4', '5'] },
				pt_pos: { firmware: ['4', '5'] },
			},
			variables: {
				...COMMON[1],
				// PTZ Variables
				pan_speed: { firmware: ['4', '5'], label: `PTZ - Pan Speed` },
				tilt_speed: { firmware: ['4', '5'], label: `PTZ - Tilt Speed` },
				pan_position: { firmware: ['4', '5'], label: `PTZ - Pan Position` },
				tilt_position: { firmware: ['4', '5'], label: `PTZ - Tilt Position` },
				// Exposure Variables
				ae_response: { firmware: ['4', '5'], label: `Exposure - Ae Response` },
				gain_limit: { firmware: ['4', '5'], label: `Exposure - Gain Limit` },
				high_sensitivity: { firmware: ['4', '5'], label: `Exposure - High Sensitivity` },
				slow_shutter_en: { firmware: ['4', '5'], label: `Exposure - Slow Shutter Enable` },
				slow_shutter_limit: { firmware: ['4', '5'], label: `Exposure - Slow Shutter Limit` },
				// Picture Setup Variables
				backlight_com: { firmware: ['4', '5'], label: `Picture Setup - Backlight Compensation` },
				chroma_suppress: { firmware: ['4', '5'], label: `Picture Setup - Chroma Suppress` },
				effect: { firmware: ['4', '5'], label: `Picture Setup - Effect` },
				gamma: { firmware: ['4', '5'], label: `Picture Setup - Gamma` },
				highlight_comp: { firmware: ['4', '5'], label: `Picture Setup - Highlight Compensation` },
				highlight_comp_mask: { firmware: ['4', '5'], label: `Picture Setup - Highlight Compensation Mask` },
				ir_cutfilter: { firmware: ['4', '5'], label: `Picture Setup - IR Cut Filter` },
				noise_reduction: { firmware: ['4', '5'], label: `Picture Setup - Noise Reduction` },
				sharpness: { firmware: ['4', '5'], label: `Picture Setup - Sharpness` },
				stabilizer: { firmware: ['4', '5'], label: `Picture Setup - Stabilizer` },
				// Color Matrix Variables
				cm_blue_gain: { firmware: ['4', '5'], label: 'Color Matrix - Blue Gain' },
				cm_blue_hue: { firmware: ['4', '5'], label: 'Color Matrix - Blue Hue' },
				cm_color_gain: { firmware: ['4', '5'], label: 'Color Matrix - Color Gain' },
				cm_cyan_gain: { firmware: ['4', '5'], label: 'Color Matrix - Cyan Gain' },
				cm_cyan_hue: { firmware: ['4', '5'], label: 'Color Matrix - Cyan Hue' },
				cm_green_gain: { firmware: ['4', '5'], label: 'Color Matrix - Green Gain' },
				cm_green_hue: { firmware: ['4', '5'], label: 'Color Matrix - Green Hue' },
				cm_hue_phase: { firmware: ['4', '5'], label: 'Color Matrix - Hue Phase' },
				cm_mag_gain: { firmware: ['4', '5'], label: 'Color Matrix - Magenta Gain' },
				cm_mag_hue: { firmware: ['4', '5'], label: 'Color Matrix - Magenta Hue' },
				cm_red_gain: { firmware: ['4', '5'], label: 'Color Matrix - Red Gain' },
				cm_red_hue: { firmware: ['4', '5'], label: 'Color Matrix - Red Hue' },
				cm_yellow_gain: { firmware: ['4', '5'], label: 'Color Matrix - Yellow Gain' },
				cm_yellow_hue: { firmware: ['4', '5'], label: 'Color Matrix - Yellow Hue' },
				// Advanced Setup Variables
				brightness: { firmware: ['4', '5'], label: 'Advanced Setup - Brightness' },
				brightness_comp: { firmware: ['4', '5'], label: 'Advanced Setup - Brightness Comp' },
				comp_level: { firmware: ['4', '5'], label: 'Advanced Setup - Comp Level' },
				gamma_offset: { firmware: ['4', '5'], label: 'Advanced Setup - Gamma Offset' },
				high_resolution: { firmware: ['4', '5'], label: 'Advanced Setup - High Resolution' },
				video_enhancement: { firmware: ['4', '5'], label: 'Advanced Setup - Video Enhancement' },
				// External Setup Variables
				aux: { firmware: ['4', '5'], label: 'External Setup - Aux' },
				v12vout: { firmware: ['4', '5'], label: 'External Setup - 12v Out' },
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
					firmware: ['4', '5'],
					choices: CHOICES.PTZ_DIRECTION,
					default: 'up',
					posPanChoices: CHOICES.POS_PAN_P200,
					posPanDefault: '0000',
					posTiltChoices: CHOICES.POS_TILT,
					posTiltDefault: '0000',
				},
				zoom: { firmware: ['4', '5'], ...COMMON[2].zoom, posZoomChoices: CHOICES.POS_ZOOM_30, posZoomDefault: '0000' },
				panSpeed: {
					firmware: ['4', '5'],
					choices: CHOICES.SPEED_CHANGES,
					default: 'up',
					range: { min: 0, max: 21, default: 11 },
				},
				tiltSpeed: {
					firmware: ['4', '5'],
					choices: CHOICES.SPEED_CHANGES,
					default: 'up',
					range: { min: 0, max: 18, default: 9 },
				},
				// Focus Actions
				// Exposure Actions
				ae_response: { firmware: ['4', '5'], range: { min: 1, max: 48, default: 1 } },
				bright_level: { firmware: ['4', '5'], range: { min: 0, max: 31, default: 16 } },
				expCompLvl: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: -128, max: 127, default: 0 },
				},
				exposure_mode: { firmware: ['4', '5'], choices: CHOICES.EXP_MODE_1, default: 'FULL-AUTO' },
				gain: { firmware: ['4', '5'], choices: CHOICES.GAIN_2, default: 1 },
				gain_limit: { firmware: ['4', '5'], range: { min: 4, max: 15, default: 15 } },
				highSensitivity: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'On' },
				iris: { firmware: ['4', '5'], choices: CHOICES.IRIS_2, default: 12, range: { closed: 0, min: 5, max: 17 } },
				shutter_speed: {
					firmware: ['4', '5'],
					shutter_50: CHOICES.SHUTTER_50,
					shutter_60: CHOICES.SHUTTER_60,
					default: 6,
					range: { min: 0, max: 21 },
				},
				slow_shutter_en: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
				slow_shutter_limit: { firmware: ['4', '5'], range: { min: 1, max: 6, default: 3 } },
				// White Balance Actions
				wb_mode: { firmware: ['4', '5'], choices: CHOICES.WB_MODE_2, default: 'AUTO' },
				// Picture Setup Actions
				backlight_com: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
				chroma_suppress: { firmware: ['4', '5'], choices: CHOICES.OFF_L_M_H, default: 'OFF' },
				pictureEffect: { firmware: ['4', '5'], choices: CHOICES.PICTURE_EFFECT, default: 'BW' },
				gamma: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 1, default: 1 },
				},
				highlight_comp: { firmware: ['4', '5'], choices: CHOICES.OFF_L_M_H, default: 'OFF' },
				highlight_comp_mask: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 15, default: 1 },
				},
				ir_cutfilter: { firmware: ['4', '5'], choices: CHOICES.IR_CUT_FILTER_1, default: 'Auto' },
				noise_reduction: { firmware: ['4', '5'], choices: CHOICES.OFF_1_to_5, default: 'Off' },
				sharpness: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: -128, max: 127, default: 0 },
				},
				stabilizer: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
				// Color Matrix Actions
				cm_blue_gain: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_blue_hue: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_color_gain: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 255, default: 128 },
				},
				cm_cyan_gain: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_cyan_hue: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_green_gain: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_green_hue: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_hue_phase: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 255, default: 128 },
				},
				cm_mag_gain: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_mag_hue: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_red_gain: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_red_hue: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_yellow_gain: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_yellow_hue: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				// Advanced Setup Actions
				brightness: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 6, default: 3 },
				},
				brightness_comp: { firmware: ['4', '5'], choices: CHOICES.BRIGHTNESS_COMP, default: 'STANDARD' },
				comp_level: { firmware: ['4', '5'], choices: CHOICES.L_Mid_H, default: 'LOW' },
				gamma_offset: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: -16, max: 64, default: 40 },
				},
				high_resolution: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
				video_enhancement: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
				// External Setup Actions
				aux: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
				v12vout: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
				// Detail Setup Actions
				// Gamma Setup Actions
				// Other Actions
			},
			feedback: {
				...COMMON[3],
			},
		},
		{
			id: 'A200GEN2',
			apicalls: {
				...COMMON[0],
				birddogcmsetup: { firmware: ['4', '5'] },
				birddogadvancesetup: { firmware: ['4', '5'] },
				birddogexternalsetup: { firmware: ['4', '5'] },
				pt_pos: { firmware: ['4', '5'] },
			},
			variables: {
				...COMMON[1],
				// PTZ Variables
				pan_speed: { firmware: ['4', '5'], label: `PTZ - Pan Speed` },
				tilt_speed: { firmware: ['4', '5'], label: `PTZ - Tilt Speed` },
				pan_position: { firmware: ['4', '5'], label: `PTZ - Pan Position` },
				tilt_position: { firmware: ['4', '5'], label: `PTZ - Tilt Position` },
				// Exposure Variables
				ae_response: { firmware: ['4', '5'], label: `Exposure - Ae Response` },
				gain_limit: { firmware: ['4', '5'], label: `Exposure - Gain Limit` },
				high_sensitivity: { firmware: ['4', '5'], label: `Exposure - High Sensitivity` },
				slow_shutter_en: { firmware: ['4', '5'], label: `Exposure - Slow Shutter Enable` },
				slow_shutter_limit: { firmware: ['4', '5'], label: `Exposure - Slow Shutter Limit` },
				// Picture Setup Variables
				backlight_com: { firmware: ['4', '5'], label: `Picture Setup - Backlight Compensation` },
				chroma_suppress: { firmware: ['4', '5'], label: `Picture Setup - Chroma Suppress` },
				effect: { firmware: ['4', '5'], label: `Picture Setup - Effect` },
				gamma: { firmware: ['4', '5'], label: `Picture Setup - Gamma` },
				highlight_comp: { firmware: ['4', '5'], label: `Picture Setup - Highlight Compensation` },
				highlight_comp_mask: { firmware: ['4', '5'], label: `Picture Setup - Highlight Compensation Mask` },
				ir_cutfilter: { firmware: ['4', '5'], label: `Picture Setup - IR Cut Filter` },
				noise_reduction: { firmware: ['4', '5'], label: `Picture Setup - Noise Reduction` },
				sharpness: { firmware: ['4', '5'], label: `Picture Setup - Sharpness` },
				stabilizer: { firmware: ['4', '5'], label: `Picture Setup - Stabilizer` },
				// Color Matrix Variables
				cm_blue_gain: { firmware: ['4', '5'], label: 'Color Matrix - Blue Gain' },
				cm_blue_hue: { firmware: ['4', '5'], label: 'Color Matrix - Blue Hue' },
				cm_color_gain: { firmware: ['4', '5'], label: 'Color Matrix - Color Gain' },
				cm_cyan_gain: { firmware: ['4', '5'], label: 'Color Matrix - Cyan Gain' },
				cm_cyan_hue: { firmware: ['4', '5'], label: 'Color Matrix - Cyan Hue' },
				cm_green_gain: { firmware: ['4', '5'], label: 'Color Matrix - Green Gain' },
				cm_green_hue: { firmware: ['4', '5'], label: 'Color Matrix - Green Hue' },
				cm_hue_phase: { firmware: ['4', '5'], label: 'Color Matrix - Hue Phase' },
				cm_mag_gain: { firmware: ['4', '5'], label: 'Color Matrix - Magenta Gain' },
				cm_mag_hue: { firmware: ['4', '5'], label: 'Color Matrix - Magenta Hue' },
				cm_red_gain: { firmware: ['4', '5'], label: 'Color Matrix - Red Gain' },
				cm_red_hue: { firmware: ['4', '5'], label: 'Color Matrix - Red Hue' },
				cm_yellow_gain: { firmware: ['4', '5'], label: 'Color Matrix - Yellow Gain' },
				cm_yellow_hue: { firmware: ['4', '5'], label: 'Color Matrix - Yellow Hue' },
				// Advanced Setup Variables
				brightness: { firmware: ['4', '5'], label: 'Advanced Setup - Brightness' },
				brightness_comp: { firmware: ['4', '5'], label: 'Advanced Setup - Brightness Comp' },
				comp_level: { firmware: ['4', '5'], label: 'Advanced Setup - Comp Level' },
				gamma_offset: { firmware: ['4', '5'], label: 'Advanced Setup - Gamma Offset' },
				high_resolution: { firmware: ['4', '5'], label: 'Advanced Setup - High Resolution' },
				video_enhancement: { firmware: ['4', '5'], label: 'Advanced Setup - Video Enhancement' },
				// External Setup Variables
				aux: { firmware: ['4', '5'], label: 'External Setup - Aux' },
				v12vout: { firmware: ['4', '5'], label: 'External Setup - 12v Out' },
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
					firmware: ['4', '5'],
					choices: CHOICES.PTZ_DIRECTION,
					default: 'up',
					posPanChoices: CHOICES.POS_PAN_P200,
					posPanDefault: '0000',
					posTiltChoices: CHOICES.POS_TILT,
					posTiltDefault: '0000',
				},
				zoom: { firmware: ['4', '5'], ...COMMON[2].zoom, posZoomChoices: CHOICES.POS_ZOOM_30, posZoomDefault: '0000' },
				panSpeed: {
					firmware: ['4', '5'],
					choices: CHOICES.SPEED_CHANGES,
					default: 'up',
					range: { min: 0, max: 21, default: 11 },
				},
				tiltSpeed: {
					firmware: ['4', '5'],
					choices: CHOICES.SPEED_CHANGES,
					default: 'up',
					range: { min: 0, max: 18, default: 9 },
				},
				// Focus Actions
				// Exposure Actions
				ae_response: { firmware: ['4', '5'], range: { min: 1, max: 48, default: 1 } },
				bright_level: { firmware: ['4', '5'], range: { min: 0, max: 31, default: 16 } },
				expCompLvl: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: -128, max: 127, default: 0 },
				},
				exposure_mode: { firmware: ['4', '5'], choices: CHOICES.EXP_MODE_1, default: 'FULL-AUTO' },
				gain: { firmware: ['4', '5'], choices: CHOICES.GAIN_2, default: 1 },
				gain_limit: { firmware: ['4', '5'], range: { min: 4, max: 15, default: 15 } },
				highSensitivity: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'On' },
				iris: { firmware: ['4', '5'], choices: CHOICES.IRIS_2, default: 12, range: { closed: 0, min: 5, max: 17 } },
				shutter_speed: {
					firmware: ['4', '5'],
					shutter_50: CHOICES.SHUTTER_50,
					shutter_60: CHOICES.SHUTTER_60,
					default: 6,
					range: { min: 0, max: 21 },
				},
				slow_shutter_en: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
				slow_shutter_limit: { firmware: ['4', '5'], range: { min: 1, max: 6, default: 3 } },
				// White Balance Actions
				wb_mode: { firmware: ['4', '5'], choices: CHOICES.WB_MODE_2, default: 'AUTO' },
				// Picture Setup Actions
				backlight_com: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
				chroma_suppress: { firmware: ['4', '5'], choices: CHOICES.OFF_L_M_H, default: 'OFF' },
				pictureEffect: { firmware: ['4', '5'], choices: CHOICES.PICTURE_EFFECT, default: 'BW' },
				gamma: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 1, default: 1 },
				},
				highlight_comp: { firmware: ['4', '5'], choices: CHOICES.OFF_L_M_H, default: 'OFF' },
				highlight_comp_mask: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 15, default: 1 },
				},
				ir_cutfilter: { firmware: ['4', '5'], choices: CHOICES.IR_CUT_FILTER_1, default: 'Auto' },
				noise_reduction: { firmware: ['4', '5'], choices: CHOICES.OFF_1_to_5, default: 'Off' },
				sharpness: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: -128, max: 127, default: 0 },
				},
				stabilizer: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
				// Color Matrix Actions
				cm_blue_gain: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_blue_hue: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_color_gain: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 255, default: 128 },
				},
				cm_cyan_gain: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_cyan_hue: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_green_gain: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_green_hue: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_hue_phase: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 255, default: 128 },
				},
				cm_mag_gain: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_mag_hue: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_red_gain: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_red_hue: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_yellow_gain: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_yellow_hue: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				// Advanced Setup Actions
				brightness: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 6, default: 3 },
				},
				brightness_comp: { firmware: ['4', '5'], choices: CHOICES.BRIGHTNESS_COMP, default: 'STANDARD' },
				comp_level: { firmware: ['4', '5'], choices: CHOICES.L_Mid_H, default: 'LOW' },
				gamma_offset: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: -16, max: 64, default: 40 },
				},
				high_resolution: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
				video_enhancement: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
				// External Setup Actions
				aux: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
				v12vout: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
				// Detail Setup Actions
				// Gamma Setup Actions
				// Other Actions
			},
			feedback: {
				...COMMON[3],
			},
		},
		{
			id: 'A300GEN1',
			apicalls: {
				...COMMON[0],
				birddogcmsetup: { firmware: ['4', '5'] },
				birddogadvancesetup: { firmware: ['4', '5'] },
				birddogexternalsetup: { firmware: ['4', '5'] },
				pt_pos: { firmware: ['4', '5'] },
			},
			variables: {
				...COMMON[1],
				// PTZ Variables
				pan_speed: { firmware: ['4', '5'], label: `PTZ - Pan Speed` },
				tilt_speed: { firmware: ['4', '5'], label: `PTZ - Tilt Speed` },
				pan_position: { firmware: ['4', '5'], label: `PTZ - Pan Position` },
				tilt_position: { firmware: ['4', '5'], label: `PTZ - Tilt Position` },
				// Exposure Variables
				ae_response: { firmware: ['4', '5'], label: `Exposure - Ae Response` },
				gain_limit: { firmware: ['4', '5'], label: `Exposure - Gain Limit` },
				high_sensitivity: { firmware: ['4', '5'], label: `Exposure - High Sensitivity` },
				slow_shutter_en: { firmware: ['4', '5'], label: `Exposure - Slow Shutter Enable` },
				slow_shutter_limit: { firmware: ['4', '5'], label: `Exposure - Slow Shutter Limit` },
				// Picture Setup Variables
				backlight_com: { firmware: ['4', '5'], label: `Picture Setup - Backlight Compensation` },
				chroma_suppress: { firmware: ['4', '5'], label: `Picture Setup - Chroma Suppress` },
				effect: { firmware: ['4', '5'], label: `Picture Setup - Effect` },
				gamma: { firmware: ['4', '5'], label: `Picture Setup - Gamma` },
				highlight_comp: { firmware: ['4', '5'], label: `Picture Setup - Highlight Compensation` },
				highlight_comp_mask: { firmware: ['4', '5'], label: `Picture Setup - Highlight Compensation Mask` },
				ir_cutfilter: { firmware: ['4', '5'], label: `Picture Setup - IR Cut Filter` },
				noise_reduction: { firmware: ['4', '5'], label: `Picture Setup - Noise Reduction` },
				sharpness: { firmware: ['4', '5'], label: `Picture Setup - Sharpness` },
				stabilizer: { firmware: ['4', '5'], label: `Picture Setup - Stabilizer` },
				// Color Matrix Variables
				cm_blue_gain: { firmware: ['4', '5'], label: 'Color Matrix - Blue Gain' },
				cm_blue_hue: { firmware: ['4', '5'], label: 'Color Matrix - Blue Hue' },
				cm_color_gain: { firmware: ['4', '5'], label: 'Color Matrix - Color Gain' },
				cm_cyan_gain: { firmware: ['4', '5'], label: 'Color Matrix - Cyan Gain' },
				cm_cyan_hue: { firmware: ['4', '5'], label: 'Color Matrix - Cyan Hue' },
				cm_green_gain: { firmware: ['4', '5'], label: 'Color Matrix - Green Gain' },
				cm_green_hue: { firmware: ['4', '5'], label: 'Color Matrix - Green Hue' },
				cm_hue_phase: { firmware: ['4', '5'], label: 'Color Matrix - Hue Phase' },
				cm_mag_gain: { firmware: ['4', '5'], label: 'Color Matrix - Magenta Gain' },
				cm_mag_hue: { firmware: ['4', '5'], label: 'Color Matrix - Magenta Hue' },
				cm_red_gain: { firmware: ['4', '5'], label: 'Color Matrix - Red Gain' },
				cm_red_hue: { firmware: ['4', '5'], label: 'Color Matrix - Red Hue' },
				cm_yellow_gain: { firmware: ['4', '5'], label: 'Color Matrix - Yellow Gain' },
				cm_yellow_hue: { firmware: ['4', '5'], label: 'Color Matrix - Yellow Hue' },
				// Advanced Setup Variables
				brightness: { firmware: ['4', '5'], label: 'Advanced Setup - Brightness' },
				brightness_comp: { firmware: ['4', '5'], label: 'Advanced Setup - Brightness Comp' },
				comp_level: { firmware: ['4', '5'], label: 'Advanced Setup - Comp Level' },
				gamma_offset: { firmware: ['4', '5'], label: 'Advanced Setup - Gamma Offset' },
				high_resolution: { firmware: ['4', '5'], label: 'Advanced Setup - High Resolution' },
				video_enhancement: { firmware: ['4', '5'], label: 'Advanced Setup - Video Enhancement' },
				// External Setup Variables
				aux: { firmware: ['4', '5'], label: 'External Setup - Aux' },
				rain_wiper: { firmware: ['4', '5'], label: 'External Setup - Rain Wiper' },
				v12vout: { firmware: ['4', '5'], label: 'External Setup - 12v Out' },
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
					firmware: ['4', '5'],
					choices: CHOICES.PTZ_DIRECTION,
					default: 'up',
					posPanChoices: CHOICES.POS_PAN_P200,
					posPanDefault: '0000',
					posTiltChoices: CHOICES.POS_TILT,
					posTiltDefault: '0000',
				},
				zoom: { firmware: ['4', '5'], ...COMMON[2].zoom, posZoomChoices: CHOICES.POS_ZOOM_30, posZoomDefault: '0000' },
				panSpeed: {
					firmware: ['4', '5'],
					choices: CHOICES.SPEED_CHANGES,
					default: 'up',
					range: { min: 0, max: 21, default: 11 },
				},
				tiltSpeed: {
					firmware: ['4', '5'],
					choices: CHOICES.SPEED_CHANGES,
					default: 'up',
					range: { min: 0, max: 18, default: 9 },
				},
				// Focus Actions
				// Exposure Actions
				ae_response: { firmware: ['4', '5'], range: { min: 1, max: 48, default: 1 } },
				bright_level: { firmware: ['4', '5'], range: { min: 0, max: 31, default: 16 } },
				expCompLvl: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: -128, max: 127, default: 0 },
				},
				exposure_mode: { firmware: ['4', '5'], choices: CHOICES.EXP_MODE_1, default: 'FULL-AUTO' },
				gain: { firmware: ['4', '5'], choices: CHOICES.GAIN_2, default: 1 },
				gain_limit: { firmware: ['4', '5'], range: { min: 4, max: 15, default: 15 } },
				highSensitivity: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'On' },
				iris: { firmware: ['4', '5'], choices: CHOICES.IRIS_2, default: 12, range: { closed: 0, min: 5, max: 17 } },
				shutter_speed: {
					firmware: ['4', '5'],
					shutter_50: CHOICES.SHUTTER_50,
					shutter_60: CHOICES.SHUTTER_60,
					default: 6,
					range: { min: 0, max: 21 },
				},
				slow_shutter_en: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
				slow_shutter_limit: { firmware: ['4', '5'], range: { min: 1, max: 6, default: 3 } },
				// White Balance Actions
				wb_mode: { firmware: ['4', '5'], choices: CHOICES.WB_MODE_2, default: 'AUTO' },
				// Picture Setup Actions
				backlight_com: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
				chroma_suppress: { firmware: ['4', '5'], choices: CHOICES.OFF_L_M_H, default: 'OFF' },
				pictureEffect: { firmware: ['4', '5'], choices: CHOICES.PICTURE_EFFECT, default: 'BW' },
				gamma: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 1, default: 1 },
				},
				highlight_comp: { firmware: ['4', '5'], choices: CHOICES.OFF_L_M_H, default: 'OFF' },
				highlight_comp_mask: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 15, default: 1 },
				},
				ir_cutfilter: { firmware: ['4', '5'], choices: CHOICES.IR_CUT_FILTER_1, default: 'Auto' },
				noise_reduction: { firmware: ['4', '5'], choices: CHOICES.OFF_1_to_5, default: 'Off' },
				sharpness: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: -128, max: 127, default: 0 },
				},
				stabilizer: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
				// Color Matrix Actions
				cm_blue_gain: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_blue_hue: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_color_gain: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 255, default: 128 },
				},
				cm_cyan_gain: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_cyan_hue: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_green_gain: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_green_hue: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_hue_phase: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 255, default: 128 },
				},
				cm_mag_gain: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_mag_hue: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_red_gain: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_red_hue: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_yellow_gain: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_yellow_hue: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				// Advanced Setup Actions
				brightness: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 6, default: 3 },
				},
				brightness_comp: { firmware: ['4', '5'], choices: CHOICES.BRIGHTNESS_COMP, default: 'STANDARD' },
				comp_level: { firmware: ['4', '5'], choices: CHOICES.L_Mid_H, default: 'LOW' },
				gamma_offset: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: -16, max: 64, default: 40 },
				},
				high_resolution: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
				video_enhancement: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
				// External Setup Actions
				aux: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
				rain_wiper: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
				v12vout: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
				// Detail Setup Actions
				// Gamma Setup Actions
				// Other Actions
			},
			feedback: {
				...COMMON[3],
			},
		},
		{
			id: 'A300GEN2',
			apicalls: {
				...COMMON[0],
				birddogcmsetup: { firmware: ['4', '5'] },
				birddogadvancesetup: { firmware: ['4', '5'] },
				birddogexternalsetup: { firmware: ['4', '5'] },
				pt_pos: { firmware: ['4', '5'] },
			},
			variables: {
				...COMMON[1],
				// PTZ Variables
				pan_speed: { firmware: ['4', '5'], label: `PTZ - Pan Speed` },
				tilt_speed: { firmware: ['4', '5'], label: `PTZ - Tilt Speed` },
				pan_position: { firmware: ['4', '5'], label: `PTZ - Pan Position` },
				tilt_position: { firmware: ['4', '5'], label: `PTZ - Tilt Position` },
				// Exposure Variables
				ae_response: { firmware: ['4', '5'], label: `Exposure - Ae Response` },
				gain_limit: { firmware: ['4', '5'], label: `Exposure - Gain Limit` },
				high_sensitivity: { firmware: ['4', '5'], label: `Exposure - High Sensitivity` },
				slow_shutter_en: { firmware: ['4', '5'], label: `Exposure - Slow Shutter Enable` },
				slow_shutter_limit: { firmware: ['4', '5'], label: `Exposure - Slow Shutter Limit` },
				// Picture Setup Variables
				backlight_com: { firmware: ['4', '5'], label: `Picture Setup - Backlight Compensation` },
				chroma_suppress: { firmware: ['4', '5'], label: `Picture Setup - Chroma Suppress` },
				effect: { firmware: ['4', '5'], label: `Picture Setup - Effect` },
				gamma: { firmware: ['4', '5'], label: `Picture Setup - Gamma` },
				highlight_comp: { firmware: ['4', '5'], label: `Picture Setup - Highlight Compensation` },
				highlight_comp_mask: { firmware: ['4', '5'], label: `Picture Setup - Highlight Compensation Mask` },
				ir_cutfilter: { firmware: ['4', '5'], label: `Picture Setup - IR Cut Filter` },
				noise_reduction: { firmware: ['4', '5'], label: `Picture Setup - Noise Reduction` },
				sharpness: { firmware: ['4', '5'], label: `Picture Setup - Sharpness` },
				stabilizer: { firmware: ['4', '5'], label: `Picture Setup - Stabilizer` },
				// Color Matrix Variables
				cm_blue_gain: { firmware: ['4', '5'], label: 'Color Matrix - Blue Gain' },
				cm_blue_hue: { firmware: ['4', '5'], label: 'Color Matrix - Blue Hue' },
				cm_color_gain: { firmware: ['4', '5'], label: 'Color Matrix - Color Gain' },
				cm_cyan_gain: { firmware: ['4', '5'], label: 'Color Matrix - Cyan Gain' },
				cm_cyan_hue: { firmware: ['4', '5'], label: 'Color Matrix - Cyan Hue' },
				cm_green_gain: { firmware: ['4', '5'], label: 'Color Matrix - Green Gain' },
				cm_green_hue: { firmware: ['4', '5'], label: 'Color Matrix - Green Hue' },
				cm_hue_phase: { firmware: ['4', '5'], label: 'Color Matrix - Hue Phase' },
				cm_mag_gain: { firmware: ['4', '5'], label: 'Color Matrix - Magenta Gain' },
				cm_mag_hue: { firmware: ['4', '5'], label: 'Color Matrix - Magenta Hue' },
				cm_red_gain: { firmware: ['4', '5'], label: 'Color Matrix - Red Gain' },
				cm_red_hue: { firmware: ['4', '5'], label: 'Color Matrix - Red Hue' },
				cm_yellow_gain: { firmware: ['4', '5'], label: 'Color Matrix - Yellow Gain' },
				cm_yellow_hue: { firmware: ['4', '5'], label: 'Color Matrix - Yellow Hue' },
				// Advanced Setup Variables
				brightness: { firmware: ['4', '5'], label: 'Advanced Setup - Brightness' },
				brightness_comp: { firmware: ['4', '5'], label: 'Advanced Setup - Brightness Comp' },
				comp_level: { firmware: ['4', '5'], label: 'Advanced Setup - Comp Level' },
				gamma_offset: { firmware: ['4', '5'], label: 'Advanced Setup - Gamma Offset' },
				high_resolution: { firmware: ['4', '5'], label: 'Advanced Setup - High Resolution' },
				video_enhancement: { firmware: ['4', '5'], label: 'Advanced Setup - Video Enhancement' },
				// External Setup Variables
				aux: { firmware: ['4', '5'], label: 'External Setup - Aux' },
				rain_wiper: { firmware: ['4', '5'], label: 'External Setup - Rain Wiper' },
				v12vout: { firmware: ['4', '5'], label: 'External Setup - 12v Out' },
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
					firmware: ['4', '5'],
					choices: CHOICES.PTZ_DIRECTION,
					default: 'up',
					posPanChoices: CHOICES.POS_PAN_P200,
					posPanDefault: '0000',
					posTiltChoices: CHOICES.POS_TILT,
					posTiltDefault: '0000',
				},
				zoom: { firmware: ['4', '5'], ...COMMON[2].zoom, posZoomChoices: CHOICES.POS_ZOOM_30, posZoomDefault: '0000' },
				panSpeed: {
					firmware: ['4', '5'],
					choices: CHOICES.SPEED_CHANGES,
					default: 'up',
					range: { min: 0, max: 21, default: 11 },
				},
				tiltSpeed: {
					firmware: ['4', '5'],
					choices: CHOICES.SPEED_CHANGES,
					default: 'up',
					range: { min: 0, max: 18, default: 9 },
				},
				// Focus Actions
				// Exposure Actions
				ae_response: { firmware: ['4', '5'], range: { min: 1, max: 48, default: 1 } },
				bright_level: { firmware: ['4', '5'], range: { min: 0, max: 31, default: 16 } },
				expCompLvl: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: -128, max: 127, default: 0 },
				},
				exposure_mode: { firmware: ['4', '5'], choices: CHOICES.EXP_MODE_1, default: 'FULL-AUTO' },
				gain: { firmware: ['4', '5'], choices: CHOICES.GAIN_2, default: 1 },
				gain_limit: { range: { min: 4, max: 15, default: 15 } },
				highSensitivity: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'On' },
				iris: { firmware: ['4', '5'], choices: CHOICES.IRIS_2, default: 12, range: { closed: 0, min: 5, max: 17 } },
				shutter_speed: {
					firmware: ['4', '5'],
					shutter_50: CHOICES.SHUTTER_50,
					shutter_60: CHOICES.SHUTTER_60,
					default: 6,
					range: { min: 0, max: 21 },
				},
				slow_shutter_en: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
				slow_shutter_limit: { firmware: ['4', '5'], range: { min: 1, max: 6, default: 3 } },
				// White Balance Actions
				wb_mode: { firmware: ['4', '5'], choices: CHOICES.WB_MODE_2, default: 'AUTO' },
				// Picture Setup Actions
				backlight_com: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
				chroma_suppress: { firmware: ['4', '5'], choices: CHOICES.OFF_L_M_H, default: 'OFF' },
				pictureEffect: { firmware: ['4', '5'], choices: CHOICES.PICTURE_EFFECT, default: 'BW' },
				gamma: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 1, default: 1 },
				},
				highlight_comp: { firmware: ['4', '5'], choices: CHOICES.OFF_L_M_H, default: 'OFF' },
				highlight_comp_mask: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 15, default: 1 },
				},
				ir_cutfilter: { firmware: ['4', '5'], choices: CHOICES.IR_CUT_FILTER_1, default: 'Auto' },
				noise_reduction: { firmware: ['4', '5'], choices: CHOICES.OFF_1_to_5, default: 'Off' },
				sharpness: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: -128, max: 127, default: 0 },
				},
				stabilizer: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
				// Color Matrix Actions
				cm_blue_gain: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_blue_hue: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_color_gain: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 255, default: 128 },
				},
				cm_cyan_gain: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_cyan_hue: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_green_gain: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_green_hue: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_hue_phase: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 255, default: 128 },
				},
				cm_mag_gain: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_mag_hue: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_red_gain: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_red_hue: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_yellow_gain: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_yellow_hue: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				// Advanced Setup Actions
				brightness: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 6, default: 3 },
				},
				brightness_comp: { firmware: ['4', '5'], choices: CHOICES.BRIGHTNESS_COMP, default: 'STANDARD' },
				comp_level: { firmware: ['4', '5'], choices: CHOICES.L_Mid_H, default: 'LOW' },
				gamma_offset: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: -16, max: 64, default: 40 },
				},
				high_resolution: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
				video_enhancement: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
				// External Setup Actions
				aux: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
				rain_wiper: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
				v12vout: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
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
				videooutputinterface: { firmware: ['4', '5'] },
				birddogdetsetup: { firmware: ['4', '5'] },
				birddoggammasetup: { firmware: ['4', '5'] },
				pt_pos: { firmware: ['4', '5'] },
			},
			variables: {
				...COMMON[1],
				// Video Output Interface Variables
				video_output: { firmware: ['4', '5'], label: `Video Output - Video Mode` },
				// Encode Setup Variables
				tally_mode: { firmware: ['4', '5'], label: `Encode Setup - Tally Mode` },
				// PTZ Variables
				pan_speed: { firmware: ['4', '5'], label: `PTZ - Pan Speed` },
				tilt_speed: { firmware: ['4', '5'], label: `PTZ - Tilt Speed` },
				pan_position: { firmware: ['4', '5'], label: `PTZ - Pan Position` },
				tilt_position: { firmware: ['4', '5'], label: `PTZ - Tilt Position` },
				// Exposure Variables
				ae_response: { firmware: ['4', '5'], label: `Exposure - Ae Response` },
				backlight: { firmware: ['4', '5'], label: `Exposure - Backlight` },
				gain_limit: { firmware: ['4', '5'], label: `Exposure - Gain Limit` },
				gain_point: { firmware: ['4', '5'], label: `Exposure - Gain Point` },
				gain_point_position: { firmware: ['4', '5'], label: `Exposure - Gain Point Position ` },
				high_sensitivity: { firmware: ['4', '5'], label: `Exposure - High Sensitivity` },
				shutter_max_speed: { firmware: ['4', '5'], label: `Exposure - Shutter Max Speed` },
				shutter_min_speed: { firmware: ['4', '5'], label: `Exposure - Shutter Min SPeed` },
				slow_shutter_en: { firmware: ['4', '5'], label: `Exposure - Slow Shutter Enable ` },
				slow_shutter_limit: { firmware: ['4', '5'], label: `Exposure - Slow Shutter Limit` },
				spotlight: { firmware: ['4', '5'], label: `Exposure - Spotlight` },
				// White Balance Variables
				bg: { firmware: ['4', '5'], label: `White Balance - BG` },
				br: { firmware: ['4', '5'], label: `White Balance - BR` },
				gb: { firmware: ['4', '5'], label: `White Balance - GB` },
				gr: { firmware: ['4', '5'], label: `White Balance - GR` },
				level: { firmware: ['4', '5'], label: `White Balance - Level` },
				matrix: { firmware: ['4', '5'], label: `White Balance - Matrix` },
				offset: { firmware: ['4', '5'], label: `White Balance - Offset` },
				phase: { firmware: ['4', '5'], label: `White Balance - Phase` },
				rb: { firmware: ['4', '5'], label: `White Balance - RB` },
				rg: { firmware: ['4', '5'], label: `White Balance - RG` },
				select: { firmware: ['4', '5'], label: `White Balance - Select` },
				speed: { firmware: ['4', '5'], label: `White Balance - Speed` },
				// Picture Setup Variables
				chroma_suppress: { firmware: ['4', '5'], label: `Picture Setup - Chroma Suppress` },
				highlight_comp: { firmware: ['4', '5'], label: `Picture Setup - Highlight Compensation` },
				ir_cutfilter: { firmware: ['4', '5'], label: `Picture Setup - IR Cut Filter` },
				stabilizer: { firmware: ['4', '5'], label: `Picture Setup - Stabilizer` },
				threed_nr: { firmware: ['4', '5'], label: `Picture Setup - 3D Noise Reduction` },
				twod_nr: { firmware: ['4', '5'], label: `Picture Setup - 2D Noise Reduction` },
				// Detail Setup Variables
				bandwidth: { firmware: ['4', '5'], label: `Detail Setup - Bandwidth` },
				bw_balance: { firmware: ['4', '5'], label: `Detail Setup - BW Balance` },
				crispening: { firmware: ['4', '5'], label: `Detail Setup - Crispening` },
				detail: { firmware: ['4', '5'], label: `Detail Setup - Detail` },
				highlight_detail: { firmware: ['4', '5'], label: `Detail Setup - Highlight Detail` },
				hv_balance: { firmware: ['4', '5'], label: `Detail Setup - Hv Balance` },
				limit: { firmware: ['4', '5'], label: `Detail Setup - Limit` },
				super_low: { firmware: ['4', '5'], label: `Detail Setup - Super Low` },
				// Gamma Setup Variables
				black_gamma_level: { firmware: ['4', '5'], label: `Gamma Setup - Black Gamma Level` },
				black_level: { firmware: ['4', '5'], label: `Gamma Setup - Black Level` },
				black_level_range: { firmware: ['4', '5'], label: `Gamma Setup - Black Level Range` },
				effect: { firmware: ['4', '5'], label: `Gamma Setup - Effect` },
				level: { firmware: ['4', '5'], label: `Gamma Setup - Level` },
				offset: { firmware: ['4', '5'], label: `Gamma Setup - Offset` },
				pattern: { firmware: ['4', '5'], label: `Gamma Setup - Pattern` },
				pattern_fine: { firmware: ['4', '5'], label: `Gamma Setup - Pattern Fine` },
				settings: { firmware: ['4', '5'], label: `Gamma Setup - Settings` },
				visibility_enhancer: { firmware: ['4', '5'], label: `Gamma Setup - Visibilty Enhancer` },
			},
			actions: {
				...COMMON[2],
				// General Camera Actions
				// Analog Audio Actions
				// Video Output Interface Actions
				video_output: { firmware: ['4', '5'], choices: CHOICES.VIDEO_OUTPUT, default: 'NormalMode' },
				// Encode Setup Actions
				// Encode Transport Actions
				// NDI Discovery Server Actions
				// PTZ Actions
				pt: {
					firmware: ['4', '5'],
					choices: CHOICES.PTZ_DIRECTION,
					default: 'up',
					posPanChoices: CHOICES.POS_PAN_P200,
					posPanDefault: '0000',
					posTiltChoices: CHOICES.POS_TILT,
					posTiltDefault: '0000',
				},
				zoom: { firmware: ['4', '5'], ...COMMON[2].zoom, posZoomChoices: CHOICES.POS_ZOOM_20, posZoomDefault: '0000' },
				panSpeed: {
					firmware: ['4', '5'],
					choices: CHOICES.SPEED_CHANGES,
					default: 'up',
					range: { min: 0, max: 21, default: 11 },
				},
				tiltSpeed: {
					firmware: ['4', '5'],
					choices: CHOICES.SPEED_CHANGES,
					default: 'up',
					range: { min: 0, max: 18, default: 9 },
				},
				// Focus Actions
				// Exposure Actions
				ae_response: { firmware: ['4', '5'], range: { min: 4, max: 48, default: 1 } },
				bright_level: { firmware: ['4', '5'], range: { min: 0, max: 41, default: 21 } },
				backlight: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'On' },
				expCompLvl: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: -128, max: 127, default: 0 },
				},
				exposure_mode: { firmware: ['4', '5'], choices: CHOICES.EXP_MODE_3, default: 'FULL-AUTO' },
				gain: { firmware: ['4', '5'], choices: CHOICES.GAIN_3, default: 1 },
				gain_limit: { range: { min: 4, max: 13, default: 13 } },
				gain_point: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'On' },
				highSensitivity: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'On' },
				iris: { firmware: ['4', '5'], choices: CHOICES.IRIS_3, default: 17, range: { closed: 0, min: 5, max: 21 } },
				shutter_speed: {
					firmware: ['4', '5'],
					shutter_24: CHOICES.SHUTTER_4K_24,
					shutter_50: CHOICES.SHUTTER_4K_50,
					shutter_60: CHOICES.SHUTTER_4K_60,
					default: 18,
					range: { min: 6, max: 33 },
				},
				shutter_max_speed: { firmware: ['4', '5'], range: { min: 20, max: 33, default: 20 } },
				shutter_min_speed: { firmware: ['4', '5'], range: { min: 16, max: 33, default: 16 } },
				slow_shutter_en: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
				slow_shutter_limit: { firmware: ['4', '5'], range: { min: 6, max: 17, default: 12 } },
				spotlight: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
				// White Balance Actions
				bg: { firmware: ['4', '5'], range: { min: -99, max: 99, default: 0 } },
				br: { firmware: ['4', '5'], range: { min: -99, max: 99, default: 0 } },
				gb: { firmware: ['4', '5'], range: { min: -99, max: 99, default: 0 } },
				gr: { firmware: ['4', '5'], range: { min: -99, max: 99, default: 0 } },
				level: { firmware: ['4', '5'], range: { min: 0, max: 14, default: 7 } },
				matrix: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
				offset: { firmware: ['4', '5'], range: { min: 0, max: 14, default: 7 } },
				phase: { firmware: ['4', '5'], range: { min: 0, max: 14, default: 7 } },
				rb: { firmware: ['4', '5'], range: { min: -99, max: 99, default: 0 } },
				rg: { firmware: ['4', '5'], range: { min: -99, max: 99, default: 0 } },
				select: { firmware: ['4', '5'], choices: CHOICES.WB_SELECT, default: 'OFF' },
				speed: { firmware: ['4', '5'], range: { min: 1, max: 5, default: 3 } },
				wb_mode: { firmware: ['4', '5'], choices: CHOICES.WB_MODE_2, default: 'AUTO' },
				// Picture Setup Actions
				chroma_suppress: { firmware: ['4', '5'], choices: CHOICES.OFF_L_M_H, default: 'OFF' },
				highlight_comp: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
				ir_cutfilter: { firmware: ['4', '5'], choices: CHOICES.IR_CUT_FILTER_2, default: 'On' },
				stabilizer: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
				threed_nr: { firmware: ['4', '5'], choices: CHOICES.OFF_1_to_5, default: 'Off' },
				twod_nr: { firmware: ['4', '5'], choices: CHOICES.OFF_1_to_5, default: 'Off' },
				// Color Matrix Actions
				// Advanced Setup Actions
				// External Setup Actions
				// Detail Setup Actions
				bandwidth: { firmware: ['4', '5'], choices: CHOICES.BANDWIDTH_4K, default: 'DEFAULT' },
				bw_balance: { firmware: ['4', '5'], choices: CHOICES.BW_BALANCE_4K, default: 'TYPE1' },
				crispening: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 7, default: 4 },
				},
				detail: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
				highlight_detail: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 4, default: 0 },
				},
				hv_balance: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: -2, max: 2, default: 0 },
				},
				limit: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 7, default: 4 },
				},
				super_low: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 7, default: 4 },
				},
				// Gamma Setup Actions
				black_gamma_level: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 14, default: 7 },
				},
				black_level: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 96, default: 48 },
				},
				black_level_range: { firmware: ['4', '5'], choices: CHOICES.L_Mid_H, default: 'LOW' },
				effect: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: -3, max: 3, default: 0 },
				},
				level: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 14, default: 0 },
				},
				offset: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: -64, max: 64, default: 0 },
				},
				pattern: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 512, default: 256 },
				},
				pattern_fine: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 9, default: 5 },
				},
				settings: { firmware: ['4', '5'], choices: CHOICES.GAMMA_SETTINGS, default: 'PATTERN' },
				visibility_enhancer: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
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
				videooutputinterface: { firmware: ['4', '5'] },
				birddogdetsetup: { firmware: ['4', '5'] },
				birddoggammasetup: { firmware: ['4', '5'] },
				pt_pos: { firmware: ['4', '5'] },
			},
			variables: {
				...COMMON[1],
				// Video Output Interface Variables
				video_output: { firmware: ['4', '5'], label: `Video Mode` },
				// Encode Setup Variables
				tally_mode: { firmware: ['4', '5'], label: `Encode Setup - Tally Mode` },
				// PTZ Variables
				pan_speed: { firmware: ['4', '5'], label: `PTZ - Pan Speed` },
				tilt_speed: { firmware: ['4', '5'], label: `PTZ - Tilt Speed` },
				pan_position: { firmware: ['4', '5'], label: `PTZ - Pan Position` },
				tilt_position: { firmware: ['4', '5'], label: `PTZ - Tilt Position` },
				// Exposure Variables
				ae_response: { firmware: ['4', '5'], label: `Exposure - Ae Response` },
				backlight: { firmware: ['4', '5'], label: `Exposure - Backlight` },
				gain_limit: { firmware: ['4', '5'], label: `Exposure - Gain Limit` },
				gain_point: { firmware: ['4', '5'], label: `Exposure - Gain Point` },
				gain_point_position: { firmware: ['4', '5'], label: `Exposure - Gain Point Position ` },
				high_sensitivity: { firmware: ['4', '5'], label: `Exposure - High Sensitivity` },
				shutter_max_speed: { firmware: ['4', '5'], label: `Exposure - Shutter Max Speed` },
				shutter_min_speed: { firmware: ['4', '5'], label: `Exposure - Shutter Min SPeed` },
				slow_shutter_en: { firmware: ['4', '5'], label: `Exposure - Slow Shutter Enable` },
				slow_shutter_limit: { firmware: ['4', '5'], label: `Exposure - Slow Shutter Limit` },
				spotlight: { firmware: ['4', '5'], label: `Exposure - Spotlight` },
				// White Balance Variables
				bg: { firmware: ['4', '5'], label: `White Balance - BG` },
				br: { firmware: ['4', '5'], label: `White Balance - BR` },
				gb: { firmware: ['4', '5'], label: `White Balance - GB` },
				gr: { firmware: ['4', '5'], label: `White Balance - GR` },
				level: { firmware: ['4', '5'], label: `White Balance - Level` },
				matrix: { firmware: ['4', '5'], label: `White Balance - Matrix` },
				offset: { firmware: ['4', '5'], label: `White Balance - Offset` },
				phase: { firmware: ['4', '5'], label: `White Balance - Phase` },
				rb: { firmware: ['4', '5'], label: `White Balance - RB` },
				rg: { firmware: ['4', '5'], label: `White Balance - RG` },
				select: { firmware: ['4', '5'], label: `White Balance - Select` },
				speed: { firmware: ['4', '5'], label: `White Balance - Speed` },
				// Picture Setup Variables
				chroma_suppress: { firmware: ['4', '5'], label: `Picture Setup - Chroma Suppress` },
				highlight_comp: { firmware: ['4', '5'], label: `Picture Setup - Highlight Compensation` },
				ir_cutfilter: { firmware: ['4', '5'], label: `Picture Setup - IR Cut Filter` },
				nd_filter: { firmware: ['4', '5'], label: `Picture Setup - ND Filter` },
				stabilizer: { firmware: ['4', '5'], label: `Picture Setup - Stabilizer` },
				threed_nr: { firmware: ['4', '5'], label: `Picture Setup - 3D Noise Reduction` },
				twod_nr: { firmware: ['4', '5'], label: `Picture Setup - 2D Noise Reduction` },
				// Detail Setup Variables
				bandwidth: { firmware: ['4', '5'], label: `Detail Setup - Bandwidth` },
				bw_balance: { firmware: ['4', '5'], label: `Detail Setup - BW Balance` },
				crispening: { firmware: ['4', '5'], label: `Detail Setup - Crispening` },
				detail: { firmware: ['4', '5'], label: `Detail Setup - Detail` },
				highlight_detail: { firmware: ['4', '5'], label: `Detail Setup - Highlight Detail` },
				hv_balance: { firmware: ['4', '5'], label: `Detail Setup - Hv Balance` },
				limit: { firmware: ['4', '5'], label: `Detail Setup - Limit` },
				super_low: { firmware: ['4', '5'], label: `Detail Setup - Super Low` },
				// Gamma Setup Variables
				black_gamma_level: { firmware: ['4', '5'], label: `Gamma Setup - Black Gamma Level` },
				black_level: { firmware: ['4', '5'], label: `Gamma Setup - Black Level` },
				black_level_range: { firmware: ['4', '5'], label: `Gamma Setup - Black Level Range` },
				effect: { firmware: ['4', '5'], label: `Gamma Setup - Effect` },
				level: { firmware: ['4', '5'], label: `Gamma Setup - Level` },
				offset: { firmware: ['4', '5'], label: `Gamma Setup - Offset` },
				pattern: { firmware: ['4', '5'], label: `Gamma Setup - Pattern` },
				pattern_fine: { firmware: ['4', '5'], label: `Gamma Setup - Pattern Fine` },
				settings: { firmware: ['4', '5'], label: `Gamma Setup - Settings` },
				visibility_enhancer: { firmware: ['4', '5'], label: `Gamma Setup - Visibilty Enhancer` },
			},
			actions: {
				...COMMON[2],
				// General Camera Actions
				// Analog Audio Actions
				// Video Output Interface Actions
				video_output: { firmware: ['4', '5'], choices: CHOICES.VIDEO_OUTPUT, default: 'NormalMode' },
				// Encode Setup Actions
				// Encode Transport Actions
				// NDI Discovery Server Actions
				// PTZ Actions
				pt: {
					firmware: ['4', '5'],
					choices: CHOICES.PTZ_DIRECTION,
					default: 'up',
					posPanChoices: CHOICES.POS_PAN_P200,
					posPanDefault: '0000',
					posTiltChoices: CHOICES.POS_TILT,
					posTiltDefault: '0000',
				},
				zoom: { firmware: ['4', '5'], ...COMMON[2].zoom, posZoomChoices: CHOICES.POS_ZOOM_12, posZoomDefault: '0000' },
				panSpeed: {
					firmware: ['4', '5'],
					choices: CHOICES.SPEED_CHANGES,
					default: 'up',
					range: { min: 0, max: 21, default: 11 },
				},
				tiltSpeed: {
					firmware: ['4', '5'],
					choices: CHOICES.SPEED_CHANGES,
					default: 'up',
					range: { min: 0, max: 18, default: 9 },
				},
				// Focus Actions
				// Exposure Actions
				ae_response: { firmware: ['4', '5'], range: { min: 1, max: 48, default: 1 } },
				bright_level: { firmware: ['4', '5'], range: { min: 5, max: 37, default: 21 } },
				backlight: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'On' },
				expCompLvl: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: -128, max: 127, default: 0 },
				},
				exposure_mode: { firmware: ['4', '5'], choices: CHOICES.EXP_MODE_3, default: 'FULL-AUTO' },
				gain: { firmware: ['4', '5'], choices: CHOICES.GAIN_3, default: 1 },
				gain_limit: { range: { min: 4, max: 13, default: 13 } },
				gain_point: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'On' },
				highSensitivity: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'On' },
				iris: { firmware: ['4', '5'], choices: CHOICES.IRIS_4, default: 1, range: { closed: 5, min: 6, max: 21 } },
				shutter_speed: {
					firmware: ['4', '5'],
					shutter_24: CHOICES.SHUTTER_4K_24,
					shutter_50: CHOICES.SHUTTER_4K_50,
					shutter_60: CHOICES.SHUTTER_4K_60,
					default: 18,
					range: { min: 6, max: 33 },
				},
				shutter_max_speed: { firmware: ['4', '5'], range: { min: 20, max: 33, default: 20 } },
				shutter_min_speed: { firmware: ['4', '5'], range: { min: 16, max: 33, default: 16 } },
				slow_shutter_en: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
				slow_shutter_limit: { firmware: ['4', '5'], range: { min: 6, max: 17, default: 12 } },
				spotlight: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
				// White Balance Actions
				bg: { firmware: ['4', '5'], range: { min: -99, max: 99, default: 0 } },
				br: { firmware: ['4', '5'], range: { min: -99, max: 99, default: 0 } },
				gb: { firmware: ['4', '5'], range: { min: -99, max: 99, default: 0 } },
				gr: { firmware: ['4', '5'], range: { min: -99, max: 99, default: 0 } },
				level: { firmware: ['4', '5'], range: { min: 0, max: 14, default: 7 } },
				matrix: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
				offset: { range: { min: 0, max: 14, default: 7 } },
				phase: { range: { min: 0, max: 14, default: 7 } },
				rb: { range: { min: -99, max: 99, default: 0 } },
				rg: { range: { min: -99, max: 99, default: 0 } },
				select: { choices: CHOICES.WB_SELECT, default: 'OFF' },
				speed: { firmware: ['4', '5'], range: { min: 1, max: 5, default: 3 } },
				wb_mode: { firmware: ['4', '5'], choices: CHOICES.WB_MODE_2, default: 'AUTO' },
				// Picture Setup Actions
				chroma_suppress: { firmware: ['4', '5'], choices: CHOICES.OFF_L_M_H, default: 'OFF' },
				highlight_comp: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
				ir_cutfilter: { firmware: ['4', '5'], choices: CHOICES.IR_CUT_FILTER_2, default: 'On' },
				nd_filter: { firmware: ['4', '5'], range: { min: 0, max: 3, default: 2 } },
				stabilizer: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
				threed_nr: { firmware: ['4', '5'], choices: CHOICES.OFF_1_to_5, default: 'Off' },
				twod_nr: { firmware: ['4', '5'], choices: CHOICES.OFF_1_to_5, default: 'Off' },
				// Color Matrix Actions
				// Advanced Setup Actions
				// External Setup Actions
				// Detail Setup Actions
				bandwidth: { firmware: ['4', '5'], choices: CHOICES.BANDWIDTH_4K, default: 'DEFAULT' },
				bw_balance: { firmware: ['4', '5'], choices: CHOICES.BW_BALANCE_4K, default: 'TYPE1' },
				crispening: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 7, default: 4 },
				},
				detail: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
				highlight_detail: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 4, default: 0 },
				},
				hv_balance: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: -2, max: 2, default: 0 },
				},
				limit: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 7, default: 4 },
				},
				super_low: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 7, default: 4 },
				},
				// Gamma Setup Actions
				black_gamma_level: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 14, default: 7 },
				},
				black_level: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 96, default: 48 },
				},
				black_level_range: { firmware: ['4', '5'], choices: CHOICES.L_Mid_H, default: 'LOW' },
				effect: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: -3, max: 3, default: 0 },
				},
				level: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 14, default: 0 },
				},
				offset: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: -64, max: 64, default: 0 },
				},
				pattern: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 512, default: 256 },
				},
				pattern_fine: {
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 9, default: 5 },
				},
				settings: { firmware: ['4', '5'], choices: CHOICES.GAMMA_SETTINGS, default: 'PATTERN' },
				visibility_enhancer: { firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
				// Other Actions
			},
			feedback: {
				...COMMON[3],
			},
		},
	],
}
