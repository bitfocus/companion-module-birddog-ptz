const CHOICES = require('./choices.js')

module.exports = {
	MODEL_QUERIES: {
		//Basic Device Information
		about: { camera: ['All'], firmware: ['4', '5'] },

		//Device Settings
		analogaudiosetup: { camera: ['All'], firmware: ['4', '5'] },

		// Video Output Interface Variables
		videooutputinterface: { camera: ['P400', 'P4K'], firmware: ['4', '5'] },

		//NDI Encode
		encodesetup: { camera: ['All'], firmware: ['4', '5'] },
		encodetransport: { camera: ['All'], firmware: ['4', '5'] },

		//NDI Finder
		NDIDisServer: { camera: ['All'], firmware: ['4', '5'] },

		//PTZ
		birddogptzsetup: { camera: ['All'], firmware: ['4', '5'] },
		recallPost: { camera: ['All'], firmware: ['4', '5'] },
		savePost: { camera: ['All'], firmware: ['4', '5'] },
		pt_pos: {
			camera: ['P100', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2', 'P400', 'P4K'],
			firmware: ['4', '5'],
		},

		//Exposure
		birddogexpsetup: { camera: ['All'], firmware: ['4', '5'] },

		//White Balance
		birddogwbsetup: { camera: ['All'], firmware: ['4', '5'] },

		//Picture Settings
		birddogpicsetup: { camera: ['All'], firmware: ['4', '5'] },
		birddogcmsetup: {
			camera: ['P100', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
			firmware: ['4', '5'],
		},

		//Advanced Settings
		birddogadvancesetup: {
			camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
			firmware: ['4', '5'],
		},

		//External Settings
		birddogexternalsetup: { camera: ['A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'], firmware: ['4', '5'] },

		//Detail Settings
		birddogdetsetup: { camera: ['P400', 'P4K'], firmware: ['4', '5'] },

		//Gamma Settins
		birddoggammasetup: { camera: ['P400', 'P4K'], firmware: ['4', '5'] },
	},

	MODEL_SPECS: {
		// General Camera
		firmware: {
			camera: ['All'],
			firmware: ['4', '5'],
			variable_name: 'firmware',
			variable_label: 'General - Firmware',
		},
		model: {
			camera: ['All'],
			firmware: ['4', '5'],
			variable_name: 'model',
			variable_label: 'General - Model',
		},
		hostname: {
			camera: ['All'],
			firmware: ['4', '5'],
			variable_name: 'hostname',
			variable_label: 'General - Name',
		},
		ipaddress: {
			camera: ['All'],
			firmware: ['4', '5'],
			variable_name: 'ipaddress',
			variable_label: 'General - IP Address',
		},
		netmask: {
			camera: ['All'],
			firmware: ['4', '5'],
			variable_name: 'netmask',
			variable_label: 'General - Network Mask',
		},
		network_config: {
			camera: ['All'],
			firmware: ['4', '5'],
			variable_name: 'network_config',
			variable_label: 'General - Network Config Method',
		},
		serial_number: {
			camera: ['All'],
			firmware: ['4', '5'],
			variable_name: 'serial_number',
			variable_label: 'General - Serial Number',
		},
		status: {
			camera: ['All'],
			firmware: ['4', '5'],
			variable_name: 'status',
			variable_label: 'General - Status',
		},

		// VISCA
		freeze: {
			camera: ['All'],
			firmware: ['4',], //v5 is returning incorrectly formatted VISCA msg
			variable_name: 'freeze',
			variable_label: 'VISCA - Freeze',
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.ON_OFF, default: 'on' },
				},
			],
		},
		standby: {
			camera: ['All'],
			firmware: ['4', '5'],
			variable_name: 'standby',
			variable_label: 'VISCA - Standby',
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.STANDBY, default: 'on' },
				},
			],
		},

		// Analog Audio
		analogAudioInGain: {
			camera: ['All'],
			firmware: ['4', '5'],
			variable_name: 'audio_in_gain',
			variable_label: 'Analog Audio - Audio In Gain',
			action: [
				{
					camera: ['common'],
					action: { range: { min: -50, max: 50, default: 0 } },
				},
			],
		},
		analogAudioOutGain: {
			camera: ['All'],
			firmware: ['4', '5'],
			variable_name: 'audio_out_gain',
			variable_label: 'Analog Audio - Audio Out Gain',
			action: [
				{
					camera: ['common'],
					action: { range: { min: -50, max: 50, default: 0 } },
				},
			],
		},
		analogAudioOutput: {
			camera: ['All'],
			firmware: ['4', '5'],
			variable_name: 'audio_output',
			variable_label: 'Analog Audio - Audio Output',
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.ANALOG_AUDIO_OUTPUT, default: 'DecodeComms' },
				},
			],
		},

		// Video Output Interface
		video_output: {
			camera: ['P400', 'P4K'],
			firmware: ['4', '5'],
			variable_name: 'video_output',
			variable_label: `Video Output - Video Mode`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.VIDEO_OUTPUT, default: 'NormalMode' },
				},
			],
		},

		// Encode Setup
		bandwidth_mode: {
			camera: ['All'],
			firmware: ['4', '5'],
			variable_name: 'bandwidth_mode',
			variable_label: 'Encode Setup - Bandwidth Mode',
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.ENCODE_BANDWIDTH_MODE, default: 'NDIManaged' },
				},
			],
		},
		bandwidth_select: {
			camera: ['All'],
			firmware: ['4', '5'],
			variable_name: 'bandwidth_select',
			variable_label: 'Encode Setup - Bandwidth Select',
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 80, max: 120, default: 80 } },
				},
			],
		},
		ndiAudio: {
			camera: ['All'],
			firmware: ['4', '5'],
			variable_name: 'ndi_audio',
			variable_label: `Encode Setup - NDI Audio`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.ENCODE_NDI_AUDIO, default: 'NDIAudioMute' },
				},
			],
		},
		ndiGroupEnable: {
			camera: ['All'],
			firmware: ['4', '5'],
			variable_name: 'ndi_group',
			variable_label: `Encode Setup - NDI Group`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.ENCODE_NDIGroup, default: 'NDIGroupDis' },
				},
			],
		},
		ndi_group_name: {
			camera: ['All'],
			firmware: ['4', '5'],
			variable_name: 'ndi_group_name',
			variable_label: `Encode Setup - NDI Group Name`,
		},
		stream_name: {
			camera: ['All'],
			firmware: ['4', '5'],
			variable_name: 'stream_name',
			variable_label: `Encode Setup - Stream Name`,
		},
		tally: {
			camera: ['PF120', 'P200A2A3', 'P200A4A5', 'P400', 'P4K'],
			firmware: ['4', '5'],
			variable_name: 'tally_mode',
			variable_label: `Encode Setup - Tally Mode`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.TALLY_MODE, default: 'TallyOn' },
				},
			],
		},
		video_format: {
			camera: ['All'],
			firmware: ['4', '5'],
			variable_name: 'video_format',
			variable_label: `Encode Setup - Video Format`,
		},

		// Encode Transport
		transmit_method: {
			camera: ['All'],
			firmware: ['4', '5'],
			variable_name: 'transmit_method',
			variable_label: `Encode Transport - Transmit Method`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.ENCODE_TXPM, default: 'UDP' },
				},
			],
		},
		transmit_netprefix: {
			camera: ['All'],
			firmware: ['4', '5'],
			variable_name: 'transmit_netprefix',
			variable_label: 'Encode Transport - Transmit Net Prefix',
		},
		transmit_netmask: {
			camera: ['All'],
			firmware: ['4', '5'],
			variable_name: 'transmit_netmask',
			variable_label: 'Encode Transport - Transmit Netmask',
		},

		// NDI Discovery
		ndi_discovery_server: {
			camera: ['All'],
			firmware: ['4', '5'],
			variable_name: 'ndi_discovery_server',
			variable_label: `NDI Discovery - Server`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.NDI_DIS_SVR, default: 'NDIDisServDis' },
				},
			],
		},
		ndi_discovery_server_ip: {
			camera: ['All'],
			firmware: ['4', '5'],
			variable_name: 'ndi_discovery_server_ip',
			variable_label: `NDI Discovery - Server IP`,
		},

		// PTZ
		pt: {
			camera: ['P100', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2', 'P400', 'P4K'],
			firmware: ['4', '5'],
			variable_name: 'pan_position',
			variable_label: `PTZ - Pan Position`,
			action: [
				{
					camera: ['common'],
					action: {
						choices: CHOICES.PTZ_DIRECTION,
						default: 'up',
						posPanDefault: '0000',
						posTiltChoices: CHOICES.POS_TILT,
						posTiltDefault: '0000',
					},
				},
				{
					camera: ['P100'],
					action: { posPanChoices: CHOICES.POS_PAN_P100 },
				},
				{
					camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2', 'P400', 'P4K'],
					action: { posPanChoices: CHOICES.POS_PAN_P200 },
				},
			],
		},
		panSpeed: {
			camera: ['P100', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2', 'P400', 'P4K'],
			firmware: ['4', '5'],
			variable_name: 'pan_speed',
			variable_label: `PTZ - Pan Speed`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.SPEED_CHANGES, default: 'up', range: { min: 0, max: 21, default: 11 } },
				},
			],
		},
		recallPset: {
			camera: ['All'],
			firmware: ['4', '5'],
			action: [
				{
					camera: ['common'],
					action: { range: { min: 1, max: 64, default: 1 } },
				},
			],
		},
		savePset: {
			camera: ['All'],
			firmware: ['4', '5'],
			action: [
				{
					camera: ['common'],
					action: { range: { min: 1, max: 64, default: 1 } },
				},
			],
		},
		tilt_position: {
			camera: ['P100', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2', 'P400', 'P4K'],
			firmware: ['4', '5'],
			variable_name: 'tilt_position',
			variable_label: `PTZ - Tilt Position`,
		},
		tiltSpeed: {
			camera: ['P100', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2', 'P400', 'P4K'],
			firmware: ['4', '5'],
			variable_name: 'tilt_speed',
			variable_label: `PTZ - Tilt Speed`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.SPEED_CHANGES, default: 'up', range: { min: 0, max: 18, default: 9 } },
				},
			],
		},
		zoom: {
			camera: ['All'],
			firmware: ['4', '5'],
			variable_name: 'zoom_position',
			variable_label: `PTZ - Zoom Position`,
			action: [
				{
					camera: ['common'],
					action: {
						choices: CHOICES.PTZ_ZOOM,
						default: 'in',
						posZoomDefault: '0000',
					},
				},
				{
					camera: ['P4K'],
					action: { posZoomChoices: CHOICES.POS_ZOOM_12 },
				},
				{
					camera: ['P100'],
					action: { posZoomChoices: CHOICES.POS_ZOOM_10 },
				},
				{
					camera: ['PF120', 'P400'],
					action: { posZoomChoices: CHOICES.POS_ZOOM_20 },
				},
				{
					camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					action: { posZoomChoices: CHOICES.POS_ZOOM_30 },
				},
			],
		},
		zoomSpeed: {
			camera: ['All'],
			firmware: ['4', '5'],
			variable_name: 'zoom_speed',
			variable_label: `PTZ - Zoom Speed`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.SPEED_CHANGES, default: 'up', range: { min: 0, max: 7, default: 4 } },
				},
			],
		},

		// Focus
		focus: {
			camera: ['All'],
			firmware: ['4', '5'],
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.FOCUS_CONTROL, default: 'near' },
				},
			],
		},
		focusM: {
			camera: ['All'],
			firmware: ['4', '5'],
			variable_name: 'focus_mode',
			variable_label: `Focus - Focus Mode`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.AUTO_FOCUS, default: 'Auto' },
				},
			],
		},

		// Exposure
		ae_response: {
			camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2', 'P400', 'P4K'],
			firmware: ['4', '5'],
			variable_name: 'ae_response',
			variable_label: `Exposure - Ae Response`,
			action: [
				{
					camera: ['common'],
					action: { range: { min: 1, max: 48, default: 1 } },
				},
			],
		},
		backlight: {
			camera: ['P400', 'P4K'],
			firmware: ['4', '5'],
			variable_name: 'backlight',
			variable_label: `Exposure - Backlight`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.ON_OFF, default: 'On' },
				},
			],
		},
		bright_level: {
			camera: ['All'],
			firmware: ['4', '5'],
			variable_name: 'bright_level',
			variable_label: `Exposure - Bright Level`,
			action: [
				{
					camera: ['P100', 'PF120'],
					action: { range: { min: 0, max: 27, default: 14 } },
				},
				{
					camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					action: { range: { min: 0, max: 31, default: 16 } },
				},
				{
					camera: ['P400'],
					action: { range: { min: 0, max: 41, default: 21 } },
				},
				{
					camera: ['P4K'],
					action: { range: { min: 5, max: 37, default: 21 } },
				},
			],
		},
		expComp: {
			camera: ['All'],
			firmware: ['4', '5'],
			variable_name: 'exposure_comp',
			variable_label: `Exposure - Exposure Compensation`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.ON_OFF, default: 'Off' },
				},
			],
		},
		expCompLvl: {
			camera: ['All'],
			firmware: ['4', '5'],
			variable_name: 'exposure_comp_level',
			variable_label: `Exposure - Exposure Compensation Level`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up' },
				},
				{
					camera: ['P100', 'PF120'],
					action: { range: { min: -7, max: 7, default: 0 } },
				},
				{
					camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2', 'P400', 'P4K'],
					action: { range: { min: -128, max: 127, default: 0 } },
				},
			],
		},
		exposure_mode: {
			camera: ['All'],
			firmware: ['4', '5'],
			variable_name: 'exposure_mode',
			variable_label: `Exposure - Exposure Mode`,
			action: [
				{
					camera: ['common'],
					action: { default: 'FULL-AUTO' },
				},
				{
					camera: ['P100', 'PF120', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					action: { choices: CHOICES.EXP_MODE_1 },
				},
				{
					camera: ['P200A2A3'],
					action: { choices: CHOICES.EXP_MODE_2 },
				},
				{
					camera: ['P400', 'P4K'],
					action: { choices: CHOICES.EXP_MODE_3 },
				},
			],
		},
		gain: {
			camera: ['All'],
			firmware: ['4', '5'],
			variable_name: 'gain',
			variable_label: `Exposure - Gain`,
			action: [
				{
					camera: ['P100', 'PF120'],
					action: { choices: CHOICES.GAIN_1, default: 0 },
				},
				{
					camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					action: { choices: CHOICES.GAIN_2, default: 1 },
				},
				{
					camera: ['P400', 'P4K'],
					action: { choices: CHOICES.GAIN_3, default: 1 },
				},
			],
		},
		gain_limit: {
			camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2', 'P400', 'P4K'],
			firmware: ['4', '5'],
			variable_name: 'gain_limit',
			variable_label: `Exposure - Gain Limit`,
			action: [
				{
					camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					action: { range: { min: 4, max: 15, default: 15 } },
				},
				{
					camera: ['P400', 'P4K'],
					action: { range: { min: 4, max: 13, default: 13 } },
				},
			],
		},
		gain_point: {
			camera: ['P400', 'P4K'],
			firmware: ['4', '5'],
			variable_name: 'gain_point',
			variable_label: `Exposure - Gain Point`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.ON_OFF, default: 'On' },
				},
			],
		},
		gain_point_position: {
			camera: ['P400', 'P4K'],
			firmware: ['4', '5'],
			variable_name: 'gain_point_position',
			variable_label: `Exposure - Gain Point Position `,
		},
		high_sensitivity: {
			camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2', 'P400', 'P4K'],
			firmware: ['4', '5'],
			variable_name: 'high_sensitivity',
			variable_label: `Exposure - High Sensitivity`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.ON_OFF, default: 'On' },
				},
			],
		},
		iris: {
			camera: ['All'],
			firmware: ['4', '5'],
			variable_name: 'iris',
			variable_label: `Exposure - Iris`,
			action: [
				{
					camera: ['P100', 'PF120'],
					action: { choices: CHOICES.IRIS_1, default: 8, range: { closed: 0, min: 1, max: 13 } },
				},
				{
					camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					action: { choices: CHOICES.IRIS_2, default: 12, range: { closed: 0, min: 5, max: 17 } },
				},
				{
					camera: ['P400'],
					action: { choices: CHOICES.IRIS_3, default: 17, range: { closed: 0, min: 5, max: 21 } },
				},
				{
					camera: ['P4K'],
					action: { choices: CHOICES.IRIS_4, default: 1, range: { closed: 5, min: 6, max: 21 } },
				},
			],
		},
		shutter_control_overwrite: {
			camera: ['P100', 'PF120'],
			firmware: ['4', '5'],
			variable_name: 'shutter_control_overwrite',
			variable_label: `Exposure - Shutter Control Overwrite`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.ON_OFF, default: 'On' },
				},
			],
		},
		shutter_max_speed: {
			camera: ['P400', 'P4K'],
			firmware: ['4', '5'],
			variable_name: 'shutter_max_speed',
			variable_label: `Exposure - Shutter Max Speed`,
			action: [
				{
					camera: ['common'],
					action: { range: { min: 20, max: 33, default: 20 } },
				},
			],
		},
		shutter_min_speed: {
			camera: ['P400', 'P4K'],
			firmware: ['4', '5'],
			variable_name: 'shutter_min_speed',
			variable_label: `Exposure - Shutter Min Speed`,
			action: [
				{
					camera: ['common'],
					action: { range: { min: 16, max: 33, default: 16 } },
				},
			],
		},
		shutter_speed: {
			camera: ['All'],
			firmware: ['4', '5'],
			variable_name: 'shutter_speed',
			variable_label: `Exposure - Shutter Speed`,
			action: [
				{
					camera: ['P100', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					action: {
						shutter_50: CHOICES.SHUTTER_50,
						shutter_60: CHOICES.SHUTTER_60,
						default: 6,
						range: { min: 0, max: 21 },
					},
				},
				{
					camera: ['P100', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					action: {
						shutter_24: CHOICES.SHUTTER_4K_24,
						shutter_50: CHOICES.SHUTTER_4K_50,
						shutter_60: CHOICES.SHUTTER_4K_60,
						default: 18,
						range: { min: 6, max: 33 },
					},
				},
			],
		},
		shutter_speed_overwrite: {
			camera: ['P100', 'PF120'],
			firmware: ['4', '5'],
			variable_name: 'shutter_speed_overwrite',
			variable_label: `Exposure - Shutter Speed Overwrite`,
			action: [
				{
					camera: ['common'],
					action: { range: { min: 30, max: 110, default: 60 } },
				},
			],
		},
		slow_shutter_en: {
			camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2', 'P400', 'P4K'],
			firmware: ['4', '5'],
			variable_name: 'slow_shutter_on',
			variable_label: `Exposure - Slow Shutter Enable`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.ON_OFF, default: 'Off' },
				},
			],
		},
		slow_shutter_limit: {
			camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2', 'P400', 'P4K'],
			firmware: ['4', '5'],
			variable_name: 'slow_shutter_limit',
			variable_label: `Exposure - Slow Shutter Limit`,
			action: [
				{
					camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					action: { range: { min: 1, max: 6, default: 3 } },
				},
				{
					camera: ['P400', 'P4K'],
					action: { range: { min: 6, max: 17, default: 12 } },
				},
			],
		},
		spotlight: {
			camera: ['P400', 'P4K'],
			firmware: ['4', '5'],
			variable_name: 'spotlight',
			variable_label: `Exposure - Spotlight`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.ON_OFF, default: 'Off' },
				},
			],
		},

		// White Balance
		bg: {
			camera: ['P400', 'P4K'],
			firmware: ['4', '5'],
			variable_name: 'bg',
			variable_label: `White Balance - BG`,
			action: [
				{
					camera: ['common'],
					action: { range: { min: -99, max: 99, default: 0 } },
				},
			],
		},
		blue_gain: {
			camera: ['All'],
			firmware: ['4', '5'],
			variable_name: 'blue_gain',
			variable_label: `White Balance - Blue Gain`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 255, default: 128 } },
				},
			],
		},
		br: {
			camera: ['P400', 'P4K'],
			firmware: ['4', '5'],
			variable_name: 'br',
			variable_label: `White Balance - BR`,
			action: [
				{
					camera: ['common'],
					action: { range: { min: -99, max: 99, default: 0 } },
				},
			],
		},
		color_temp: {
			camera: ['P100', 'PF120'],
			firmware: ['4', '5'],
			variable_name: 'color_temp',
			variable_label: `White Balance - Color Temp`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.COLOR_TEMP, default: '6500' },
				},
			],
		},
		gb: {
			camera: ['P400', 'P4K'],
			firmware: ['4', '5'],
			variable_name: 'gb',
			variable_label: `White Balance - GB`,
			action: [
				{
					camera: ['common'],
					action: { range: { min: -99, max: 99, default: 0 } },
				},
			],
		},
		gr: {
			camera: ['P400', 'P4K'],
			firmware: ['4', '5'],
			variable_name: 'gr',
			variable_label: `White Balance - GR`,
			action: [
				{
					camera: ['common'],
					action: { range: { min: -99, max: 99, default: 0 } },
				},
			],
		},
		level: {
			camera: ['P400', 'P4K'],
			firmware: ['4', '5'],
			variable_name: 'level',
			variable_label: `White Balance - Level`,
			action: [
				{
					camera: ['common'],
					action: { range: { min: 0, max: 14, default: 7 } },
				},
			],
		},
		matrix: {
			camera: ['P400', 'P4K'],
			firmware: ['4', '5'],
			variable_name: 'matrix',
			variable_label: `White Balance - Matrix`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.ON_OFF, default: 'Off' },
				},
			],
		},
		offset: {
			camera: ['P400', 'P4K'],
			firmware: ['4', '5'],
			variable_name: 'offset',
			variable_label: `White Balance - Offset`,
			action: [
				{
					camera: ['common'],
					action: { range: { min: 0, max: 14, default: 7 } },
				},
			],
		},
		phase: {
			camera: ['P400', 'P4K'],
			firmware: ['4', '5'],
			variable_name: 'phase',
			variable_label: `White Balance - Phase`,
			action: [
				{
					camera: ['common'],
					action: { range: { min: 0, max: 14, default: 7 } },
				},
			],
		},
		rb: {
			camera: ['P400', 'P4K'],
			firmware: ['4', '5'],
			variable_name: 'rb',
			variable_label: `White Balance - RB`,
			action: [
				{
					camera: ['common'],
					action: { range: { min: -99, max: 99, default: 0 } },
				},
			],
		},
		red_gain: {
			camera: ['All'],
			firmware: ['4', '5'],
			variable_name: 'red_gain',
			variable_label: `White Balance - Red Gain`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 255, default: 128 } },
				},
			],
		},
		rg: {
			camera: ['P400', 'P4K'],
			firmware: ['4', '5'],
			variable_name: 'rg',
			variable_label: `White Balance - RG`,
			action: [
				{
					camera: ['common'],
					action: { range: { min: -99, max: 99, default: 0 } },
				},
			],
		},
		select: {
			camera: ['P400', 'P4K'],
			firmware: ['4', '5'],
			variable_name: 'select',
			variable_label: `White Balance - Select`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.WB_SELECT, default: 'OFF' },
				},
			],
		},
		speed: {
			camera: ['P400', 'P4K'],
			firmware: ['4', '5'],
			variable_name: 'speed',
			variable_label: `White Balance - Speed`,
			action: [
				{
					camera: ['common'],
					action: { range: { min: 1, max: 5, default: 3 } },
				},
			],
		},
		wbOnePush: {
			camera: ['All'],
			firmware: ['4', '5'],
			action: [
				{
					camera: ['common'],
					action: true,
				},
			],
		},
		wb_mode: {
			camera: ['All'],
			firmware: ['4', '5'],
			variable_name: 'wb_mode',
			variable_label: `White Balance - White Balance Mode`,
			action: [
				{
					camera: ['common'],
					action: { default: 'AUTO' },
				},
				{
					camera: ['P100', 'PF120'],
					action: { choices: CHOICES.WB_MODE_1 },
				},
				{
					camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2', 'P400', 'P4K'],
					action: { choices: CHOICES.WB_MODE_2 },
				},
			],
		},

		// Picture Setup
		backlight_com: {
			camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
			firmware: ['4', '5'],
			variable_name: 'backlight_com',
			variable_label: `Picture Setup - Backlight Compensation`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.ON_OFF, default: 'Off' },
				},
			],
		},
		chroma_suppress: {
			camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2', 'P400', 'P4K'],
			firmware: ['4', '5'],
			variable_name: 'chroma_suppress',
			variable_label: `Picture Setup - Chroma Suppress`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.OFF_L_M_H, default: 'Off' },
				},
			],
		},
		color: {
			camera: ['P100', 'PF120'],
			firmware: ['4', '5'],
			variable_name: 'color',
			variable_label: `Picture Setup - Saturation`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 15, default: 8 } },
				},
			],
		},
		contrast: {
			camera: ['P100', 'PF120'],
			firmware: ['4', '5'],
			variable_name: 'contrast',
			variable_label: `Picture Setup - Contrast`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 15, default: 8 } },
				},
			],
		},
		gamma: {
			camera: ['P100', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
			firmware: ['4', '5'],
			variable_name: 'gamma',
			variable_label: `Picture Setup - Gamma`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 4, default: 2 } },
				},
			],
		},
		highlight_comp: {
			camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2', 'P400', 'P4K'],
			firmware: ['4', '5'],
			variable_name: 'highlight_comp',
			variable_label: `Picture Setup - Highlight Compensation`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.OFF_L_M_H, default: 'OFF' },
				},
			],
		},
		highlight_comp_mask: {
			camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
			firmware: ['4', '5'],
			variable_name: 'highligh_comp_mask',
			variable_label: `Picture Setup - Highlight Compensation Mask`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 3, default: 1 } },
				},
			],
		},
		hue: {
			camera: ['P100', 'PF120'],
			firmware: ['4', '5'],
			variable_name: 'hue',
			variable_label: `Picture Setup - Hue`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 15, default: 8 } },
				},
			],
		},
		ir_cutfilter: {
			camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2', 'P400', 'P4K'],
			firmware: ['4', '5'],
			variable_name: 'ir_cutfilter',
			variable_label: `Picture Setup - IR Cut Filter`,
			action: [
				{
					camera: ['P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					action: { choices: CHOICES.IR_CUT_FILTER_1, default: 'Auto' },
				},
				{
					camera: ['P400', 'P4K'],
					action: { choices: CHOICES.IR_CUT_FILTER_2, default: 'On' },
				},
				{
					camera: ['P200A2A3'],
					action: { choices: CHOICES.IR_CUT_FILTER_3, default: 'NoiseReduction' },
				},
			],
		},
		low_latency: {
			camera: ['P200A4A5'],
			firmware: ['4', '5'],
			variable_name: 'low_latency',
			variable_label: 'Picture Setup - Low Latency',
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.ON_OFF, default: 'Off' },
				},
			],
		},
		nd_filter: {
			camera: ['P4K'],
			firmware: ['4', '5'],
			variable_name: 'nd_filter',
			variable_label: 'Picture Setup - ND Filter',
			action: [
				{
					camera: ['common'],
					action: { range: { min: 0, max: 3, default: 2 } },
				},
			],
		},
		noise_reduction: {
			camera: ['P100', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
			firmware: ['4', '5'],
			variable_name: 'noise_reduction',
			variable_label: `Picture Setup - Noise Reduction`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.OFF_1_to_5, default: 'Off' },
				},
			],
		},
		picFlip: {
			camera: ['All'],
			firmware: ['4', '5'],
			variable_name: 'flip',
			variable_label: `Picture Setup - Flip`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.ON_OFF, default: 'On' },
				},
			],
		},
		picMirror: {
			camera: ['All'],
			firmware: ['4', '5'],
			variable_name: 'mirror',
			variable_label: `Picture Setup - Mirror`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.ON_OFF, default: 'On' },
				},
			],
		},
		pictureEffect: {
			camera: ['P100', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
			firmware: ['4', '5'],
			variable_name: 'effect',
			variable_label: `Picture Setup - Effect`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.PICTURE_EFFECT, default: 'BW' },
				},
			],
		},
		sharpness: {
			camera: ['P100', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
			firmware: ['4', '5'],
			variable_name: 'sharpness',
			variable_label: `Picture Setup - Sharpness`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up' },
				},
				{
					camera: ['P100', 'PF120'],
					action: { range: { min: 0, max: 15, default: 8 } },
				},
				{
					camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					action: { range: { min: -128, max: 127, default: 0 } },
				},
			],
		},
		stabilizer: {
			camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2', 'P400', 'P4K'],
			firmware: ['4', '5'],
			variable_name: 'stabilizer',
			variable_label: `Picture Setup - Stabilizer`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.ON_OFF, default: 'Off' },
				},
			],
		},
		threed_nr: {
			camera: ['P400', 'P4K'],
			firmware: ['4', '5'],
			variable_name: 'threed_nr',
			variable_label: `Picture Setup - 3D Noise Reduction`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.OFF_1_to_5, default: 'Off' },
				},
			],
		},
		twod_nr: {
			camera: ['P400', 'P4K'],
			firmware: ['4', '5'],
			variable_name: 'twod_nr',
			variable_label: `Picture Setup - 2D Noise Reduction`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.OFF_1_to_5, default: 'Off' },
				},
			],
		},
		wide_dynamic_range: {
			camera: ['P100', 'PF120'],
			firmware: ['4', '5'],
			variable_name: 'wide_dynamic_range',
			variable_label: `Picture Setup - Wide Dynamic Range`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.OFF_1_to_6, default: 'Off' },
				},
			],
		},

		// Color Matrix
		cm_blue_gain: {
			camera: ['P100', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
			firmware: ['4', '5'],
			variable_name: 'cm_blue_gain',
			variable_label: 'Color Matrix - Blue Gain',
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 64, default: 32 } },
				},
			],
		},
		cm_blue_hue: {
			camera: ['P100', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
			firmware: ['4', '5'],
			variable_name: 'cm_blue_hue',
			variable_label: 'Color Matrix - Blue Hue',
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 64, default: 32 } },
				},
			],
		},
		cm_color_gain: {
			camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
			firmware: ['4', '5'],
			variable_name: 'cm_color_gain',
			variable_label: 'Color Matrix - Color Gain',
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 255, default: 128 } },
				},
			],
		},
		cm_cyan_gain: {
			camera: ['P100', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
			firmware: ['4', '5'],
			variable_name: 'cm_cyan_gain',
			variable_label: 'Color Matrix - Cyan Gain',
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 64, default: 32 } },
				},
			],
		},
		cm_cyan_hue: {
			camera: ['P100', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
			firmware: ['4', '5'],
			variable_name: 'cm_cyan_hue',
			variable_label: 'Color Matrix - Cyan Hue',
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 64, default: 32 } },
				},
			],
		},
		cm_green_gain: {
			camera: ['P100', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
			firmware: ['4', '5'],
			variable_name: 'cm_green_gain',
			variable_label: 'Color Matrix - Green Gain',
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 64, default: 32 } },
				},
			],
		},
		cm_green_hue: {
			camera: ['P100', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
			firmware: ['4', '5'],
			variable_name: 'cm_green_hue',
			variable_label: 'Color Matrix - Green Hue',
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 64, default: 32 } },
				},
			],
		},
		cm_hue_phase: {
			camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
			firmware: ['4', '5'],
			variable_name: 'cm_hue_phase',
			variable_label: 'Color Matrix - Hue Phase',
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 255, default: 128 } },
				},
			],
		},
		cm_mag_gain: {
			camera: ['P100', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
			firmware: ['4', '5'],
			variable_name: 'cm_mag_gain',
			variable_label: 'Color Matrix - Magenta Gain',
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 64, default: 32 } },
				},
			],
		},
		cm_mag_hue: {
			camera: ['P100', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
			firmware: ['4', '5'],
			variable_name: 'cm_mag_hue',
			variable_label: 'Color Matrix - Magenta Hue',
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 64, default: 32 } },
				},
			],
		},
		cm_red_gain: {
			camera: ['P100', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
			firmware: ['4', '5'],
			variable_name: 'cm_red_gain',
			variable_label: 'Color Matrix - Red Gain',
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 64, default: 32 } },
				},
			],
		},
		cm_red_hue: {
			camera: ['P100', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
			firmware: ['4', '5'],
			variable_name: 'cm_red_hue',
			variable_label: 'Color Matrix - Red Hue',
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 64, default: 32 } },
				},
			],
		},
		cm_yellow_gain: {
			camera: ['P100', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
			firmware: ['4', '5'],
			variable_name: 'cm_yellow_gain',
			variable_label: 'Color Matrix - Yellow Gain',
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 64, default: 32 } },
				},
			],
		},
		cm_yellow_hue: {
			camera: ['P100', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
			firmware: ['4', '5'],
			variable_name: 'cm_yellow_hue',
			variable_label: 'Color Matrix - Yellow Hue',
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 64, default: 32 } },
				},
			],
		},

		// Advanced Setup
		brightness: {
			camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
			firmware: ['4', '5'],
			variable_name: 'brightness',
			variable_label: 'Advanced Setup - Brightness',
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 6, default: 3 } },
				},
			],
		},
		brightness_comp: {
			camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
			firmware: ['4', '5'],
			variable_name: 'brightness_comp',
			variable_label: 'Advanced Setup - Brightness Comp',
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.BRIGHTNESS_COMP, default: 'STANDARD' },
				},
			],
		},
		comp_level: {
			camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
			firmware: ['4', '5'],
			variable_name: 'comp_level',
			variable_label: 'Advanced Setup - Comp Level',
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.L_Mid_H, default: 'LOW' },
				},
			],
		},
		gamma_offset: {
			camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
			firmware: ['4', '5'],
			variable_name: 'gamma_offset',
			variable_label: 'Advanced Setup - Gamma Offset',
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: -16, max: 64, default: 40 } },
				},
			],
		},
		high_resolution: {
			camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
			firmware: ['4', '5'],
			variable_name: 'high_resolution',
			variable_label: 'Advanced Setup - High Resolution',
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.ON_OFF, default: 'Off' },
				},
			],
		},
		video_enhancement: {
			camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
			firmware: ['4', '5'],
			variable_name: 'video_enhancement',
			variable_label: 'Advanced Setup - Video Enhancement',
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.ON_OFF, default: 'Off' },
				},
			],
		},

		// External Setup
		aux: {
			camera: ['A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
			firmware: ['4', '5'],
			variable_name: 'aux',
			variable_label: 'External Setup - Aux',
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.ON_OFF, default: 'Off' },
				},
			],
		},
		rain_wiper: {
			camera: ['A300GEN1', 'A300GEN2'],
			firmware: ['4', '5'],
			variable_name: 'rain_wiper',
			variable_label: 'External Setup - Rain Wiper',
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.ON_OFF, default: 'Off' },
				},
			],
		},
		v12vout: {
			camera: ['A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
			firmware: ['4', '5'],
			variable_name: 'v12vout',
			variable_label: 'External Setup - 12v Out',
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.ON_OFF, default: 'Off' },
				},
			],
		},

		// Detail Setup
		bandwidth: {
			camera: ['P400', 'P4K'],
			firmware: ['4', '5'],
			variable_name: 'bandwidth',
			variable_label: `Detail Setup - Bandwidth`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.BANDWIDTH_4K, default: 'DEFAULT' },
				},
			],
		},
		bw_balance: {
			camera: ['P400', 'P4K'],
			firmware: ['4', '5'],
			variable_name: 'bw_balance',
			variable_label: `Detail Setup - BW Balance`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.BW_BALANCE_4K, default: 'TYPE1' },
				},
			],
		},
		crispening: {
			camera: ['P400', 'P4K'],
			firmware: ['4', '5'],
			variable_name: 'crispening',
			variable_label: `Detail Setup - Crispening`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 7, default: 4 } },
				},
			],
		},
		detail: {
			camera: ['P400', 'P4K'],
			firmware: ['4', '5'],
			variable_name: 'detail',
			variable_label: `Detail Setup - Detail`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.ON_OFF, default: 'Off' },
				},
			],
		},
		highlight_detail: {
			camera: ['P400', 'P4K'],
			firmware: ['4', '5'],
			variable_name: 'highlight_detail',
			variable_label: `Detail Setup - Highlight Detail`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 4, default: 0 } },
				},
			],
		},
		hv_balance: {
			camera: ['P400', 'P4K'],
			firmware: ['4', '5'],
			variable_name: 'hv_balance',
			variable_label: `Detail Setup - Hv Balance`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: -2, max: 2, default: 0 } },
				},
			],
		},
		limit: {
			camera: ['P400', 'P4K'],
			firmware: ['4', '5'],
			variable_name: 'limit',
			variable_label: `Detail Setup - Limit`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 7, default: 4 } },
				},
			],
		},
		super_low: {
			camera: ['P400', 'P4K'],
			firmware: ['4', '5'],
			variable_name: 'super_low',
			variable_label: `Detail Setup - Super Low`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 7, default: 4 } },
				},
			],
		},

		// Gamma Setup
		black_gamma_level: {
			camera: ['P400', 'P4K'],
			firmware: ['4', '5'],
			variable_name: 'black_gamma_level',
			variable_label: `Gamma Setup - Black Gamma Level`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 14, default: 7 } },
				},
			],
		},
		black_level: {
			camera: ['P400', 'P4K'],
			firmware: ['4', '5'],
			variable_name: 'black_level',
			variable_label: `Gamma Setup - Black Level`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 96, default: 48 } },
				},
			],
		},
		black_level_range: {
			camera: ['P400', 'P4K'],
			firmware: ['4', '5'],
			variable_name: 'black_level_range',
			variable_label: `Gamma Setup - Black Level Range`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.L_Mid_H, default: 'LOW' },
				},
			],
		},
		effect: {
			camera: ['P400', 'P4K'],
			firmware: ['4', '5'],
			variable_name: 'effect',
			variable_label: `Gamma Setup - Effect`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: -3, max: 3, default: 0 } },
				},
			],
		},
		level: {
			camera: ['P400', 'P4K'],
			firmware: ['4', '5'],
			variable_name: 'level',
			variable_label: `Gamma Setup - Level`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 14, default: 0 } },
				},
			],
		},
		offset: {
			camera: ['P400', 'P4K'],
			firmware: ['4', '5'],
			variable_name: 'offset',
			variable_label: `Gamma Setup - Offset`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: -64, max: 64, default: 0 } },
				},
			],
		},
		pattern: {
			camera: ['P400', 'P4K'],
			firmware: ['4', '5'],
			variable_name: 'pattern',
			variable_label: `Gamma Setup - Pattern`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 512, default: 256 } },
				},
			],
		},
		pattern_fine: {
			camera: ['P400', 'P4K'],
			firmware: ['4', '5'],
			variable_name: 'pattern_fine',
			variable_label: `Gamma Setup - Pattern Fine`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 9, default: 5 } },
				},
			],
		},
		settings: {
			camera: ['P400', 'P4K'],
			firmware: ['4', '5'],
			variable_name: 'settings',
			variable_label: `Gamma Setup - Settings`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.GAMMA_SETTINGS, default: 'PATTERN' },
				},
			],
		},
		visibility_enhancer: {
			camera: ['P400', 'P4K'],
			firmware: ['4', '5'],
			variable_name: 'visibility_enhancer',
			variable_label: `Gamma Setup - Visibilty Enhancer`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.ON_OFF, default: 'Off' },
				},
			],
		},

		// Other Actions
		custom: {
			camera: ['All'],
			firmware: ['4', '5'],
			action: [
				{
					camera: ['common'],
					action: true,
				},
			],
		},
	},
}
