const CHOICES = require('./choices.js')

module.exports = {
	MODEL_QUERIES: {
		//Basic Device Information
		about: { camera: ['All'], firmware: ['4', '5'] },

		//Device Settings
		analogaudiosetup: { camera: ['All'], firmware: ['4', '5'] },
		devicesettings: { camera: ['All'], firmware: ['5'] },
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
			camera: [
				'P100',
				'P110',
				'P120',
				'P200A2A3',
				'P200A4A5',
				'A200GEN1',
				'A200GEN2',
				'A300GEN1',
				'A300GEN2',
				'P400',
				'P4K',
			],
			firmware: ['4', '5'],
		},

		//Exposure
		birddogexpsetup: { camera: ['All'], firmware: ['4', '5'] },

		//White Balance
		birddogwbsetup: { camera: ['All'], firmware: ['4', '5'] },

		//Picture Settings
		birddogpicsetup: { camera: ['All'], firmware: ['4', '5'] },
		birddogcmsetup: {
			camera: ['P100', 'P110', 'P120', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
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

		//Gamma Settings
		birddoggammasetup: { camera: ['P400', 'P4K'], firmware: ['4', '5'] },

		//Scope Settings
		birddogscope: { camera: ['All'], firmware: ['5'] },
	},

	MODEL_SPECS: {
		// General Camera
		firmware: {
			camera: ['All'],
			firmware: ['4', '5'],
			store_state: true,
			variable_name: 'firmware',
			variable_label: 'General - Firmware',
		},
		framerate: {
			camera: ['All'],
			firmware: ['4', '5'],
			store_state: true,
		},
		hostname: {
			camera: ['All'],
			firmware: ['4', '5'],
			store_state: true,
			api_endpoint: ['about'],
			api_variable: ['HostName'],
			variable_name: 'hostname',
			variable_label: 'General - Name',
		},
		ipaddress: {
			camera: ['All'],
			firmware: ['4', '5'],
			store_state: true,
			api_endpoint: ['about'],
			api_variable: ['IPAddress'],
			variable_name: 'ipaddress',
			variable_label: 'General - IP Address',
		},
		model: {
			camera: ['All'],
			firmware: ['4', '5'],
			store_state: true,
			variable_name: 'model',
			variable_label: 'General - Model',
		},
		netmask: {
			camera: ['All'],
			firmware: ['4', '5'],
			store_state: true,
			api_endpoint: ['about'],
			api_variable: ['NetworkMask'],
			variable_name: 'netmask',
			variable_label: 'General - Network Mask',
		},
		network_config: {
			camera: ['All'],
			firmware: ['4', '5'],
			store_state: true,
			api_endpoint: ['about'],
			api_variable: ['NetworkConfigMethod'],
			variable_name: 'network_config',
			variable_label: 'General - Network Config Method',
		},
		serial_number: {
			camera: ['All'],
			firmware: ['4', '5'],
			store_state: true,
			api_endpoint: ['about'],
			api_variable: ['SerialNumber'],
			variable_name: 'serial_number',
			variable_label: 'General - Serial Number',
		},
		status: {
			camera: ['All'],
			firmware: ['4', '5'],
			store_state: true,
			api_endpoint: ['about'],
			api_variable: ['Status'],
			variable_name: 'status',
			variable_label: 'General - Status',
		},

		// VISCA
		freeze: {
			camera: ['All'],
			firmware: ['4'], //v5 is returning incorrectly formatted VISCA msg
			store_state: true,
			variable_name: 'freeze',
			variable_label: 'VISCA - Freeze',
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.ON_OFF, default: 'On' },
				},
			],
		},
		standby: {
			camera: ['All'],
			firmware: ['4', '5'],
			store_state: true,
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
			store_state: true,
			api_endpoint: ['analogaudiosetup'],
			api_variable: ['AnalogAudioInGain'],
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
			store_state: true,
			api_endpoint: ['analogaudiosetup'],
			api_variable: ['AnalogAudioOutGain'],
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
			store_state: true,
			api_endpoint: ['analogaudiosetup'],
			api_variable: ['AnalogAudiooutputselect'],
			variable_name: 'audio_output',
			variable_label: 'Analog Audio - Audio Output',
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.ANALOG_AUDIO_OUTPUT, default: 'DecodeComms' },
				},
			],
		},

		// Device Settings
		oled: {
			camera: ['P110', 'P120'],
			firmware: ['5'],
			store_state: true,
			api_endpoint: ['devicesettings'],
			api_variable: ['Oled'],
			variable_name: 'oled',
			variable_label: 'Device Settings - OLED',
		},

		// Video Output Interface
		video_output: {
			camera: ['P400', 'P4K'],
			firmware: ['4', '5'],
			store_state: true,
			api_endpoint: ['videooutputinterface'],
			api_variable: ['videooutput'],
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
			store_state: true,
			api_endpoint: ['encodesetup'],
			api_variable: ['BandwidthMode'],
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
			store_state: true,
			api_endpoint: ['encodesetup'],
			api_variable: ['BandwidthSelect'],
			variable_name: 'bandwidth_select',
			variable_label: 'Encode Setup - Bandwidth Select',
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 80, max: 120, default: 80 } },
				},
			],
		},
		capture_screensaver: {
			camera: ['All'],
			firmware: ['5'],
			action: [
				{
					camera: ['common'],
					action: true,
				},
			],
		},
		color_bitdepth: {
			camera: ['All'],
			firmware: ['5'],
			store_state: true,
			api_endpoint: ['encodesetup'],
			api_variable: ['ColorBitDepth'],
			variable_name: 'color_bitdepth',
			variable_label: 'Encode Setup - Color Bit Depth',
		},
		ndiAudio: {
			camera: ['All'],
			firmware: ['4', '5'],
			store_state: true,
			api_endpoint: ['encodesetup'],
			api_variable: ['NDIAudio'],
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
			store_state: true,
			api_endpoint: ['encodesetup'],
			api_variable: ['NDIGroup'],
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
			store_state: true,
			api_endpoint: ['encodesetup'],
			api_variable: ['NDIGroupName'],
			variable_name: 'ndi_group_name',
			variable_label: `Encode Setup - NDI Group Name`,
		},
		screensaver_mode: {
			camera: ['All'],
			firmware: ['5'],
			store_state: true,
			api_endpoint: ['encodesetup'],
			api_variable: ['ScreenSaverMode'],
			variable_name: 'screensaver_mode',
			variable_label: `Encode Setup - Screensaver Mode`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.SCREEN_SAVER_MODE, default: 'BirdDogSS' },
				},
			],
		},
		stream_name: {
			camera: ['All'],
			firmware: ['4', '5'],
			store_state: true,
			api_endpoint: ['encodesetup'],
			api_variable: ['StreamName'],
			variable_name: 'stream_name',
			variable_label: `Encode Setup - Stream Name`,
		},
		stream_to_network: {
			camera: ['All'],
			firmware: ['5'],
			store_state: true,
			api_endpoint: ['encodesetup'],
			api_variable: ['StreamToNetwork'],
			variable_name: 'stream_to_network',
			variable_label: `Encode Setup - Stream to Network`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.ON_OFF, default: 'On' },
				},
			],
		},
		tally_mode: {
			camera: ['P110', 'P120', 'PF120', 'P200A2A3', 'P200A4A5', 'P400', 'P4K'],
			firmware: ['4', '5'],
			store_state: true,
			api_endpoint: ['encodesetup'],
			api_variable: ['TallyMode'],
			variable_name: 'tally_mode',
			variable_label: `Encode Setup - Tally Mode`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.TALLY_MODE, default: 'TallyOn' },
				},
			],
		},
		video_csc: {
			camera: ['All'],
			firmware: ['5'],
			store_state: true,
			api_endpoint: ['encodesetup'],
			api_variable: ['VideoCSC'],
			variable_name: 'video_csc',
			variable_label: `Encode Setup - Video CSC`,
		},
		video_format: {
			camera: ['All'],
			firmware: ['4', '5'],
			store_state: true,
			api_endpoint: ['encodesetup'],
			api_variable: ['VideoFormat'],
			variable_name: 'video_format',
			variable_label: `Encode Setup - Video Format`,
		},
		video_sample_rate: {
			camera: ['All'],
			firmware: ['5'],
			store_state: true,
			api_endpoint: ['encodesetup'],
			api_variable: ['VideoSampleRate'],
			variable_name: 'video_sample_rate',
			variable_label: `Encode Setup - Video Sample Rate`,
		},

		// Encode Transport
		transmit_method: {
			camera: ['All'],
			firmware: ['4', '5'],
			store_state: true,
			api_endpoint: ['encodetransport'],
			api_variable: ['txpm', 'Txpm'],
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
			store_state: true,
			api_endpoint: ['encodetransport'],
			api_variable: ['txnetprefix', 'Txnetprefix'],
			variable_name: 'transmit_netprefix',
			variable_label: 'Encode Transport - Transmit Net Prefix',
		},
		transmit_netmask: {
			camera: ['All'],
			firmware: ['4', '5'],
			store_state: true,
			api_endpoint: ['encodetransport'],
			api_variable: ['txnetmask', 'Txnetmask'],
			variable_name: 'transmit_netmask',
			variable_label: 'Encode Transport - Transmit Netmask',
		},
		transmit_ttl: {
			camera: ['All'],
			firmware: ['4', '5'],
			store_state: true,
			api_endpoint: ['encodetransport'],
			api_variable: ['txmcttl', 'Txmcttl'],
			variable_name: 'transmit_ttl',
			variable_label: 'Encode Transport - Transmit TTL',
		},

		// NDI Discovery
		ndi_discovery_server: {
			camera: ['All'],
			firmware: ['4', '5'],
			store_state: true,
			api_endpoint: ['NDIDisServer'],
			api_variable: ['NDIDisServ'],
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
			store_state: true,
			api_endpoint: ['NDIDisServer'],
			api_variable: ['NDIDisServIP'],
			variable_name: 'ndi_discovery_server_ip',
			variable_label: `NDI Discovery - Server IP`,
		},

		// PTZ
		freed: {
			camera: ['All'],
			firmware: ['5'],
			store_state: true,
			api_endpoint: ['birddogptzsetup'],
			api_variable: ['Freed'],
			variable_name: 'freed',
			variable_label: `PTZ - FreeD`,
		},
		freed_ip_address: {
			camera: ['All'],
			firmware: ['5'],
			store_state: true,
			api_endpoint: ['birddogptzsetup'],
			api_variable: ['FreedIpAddr'],
			variable_name: 'freed_ip_address',
			variable_label: `PTZ - FreeD IP Address`,
		},
		freed_port: {
			camera: ['All'],
			firmware: ['5'],
			store_state: true,
			api_endpoint: ['birddogptzsetup'],
			api_variable: ['FreedPort'],
			variable_name: 'freed_port',
			variable_label: `PTZ - FreeD Port`,
		},
		pt: {
			camera: [
				'P100',
				'P110',
				'P120',
				'P200A2A3',
				'P200A4A5',
				'A200GEN1',
				'A200GEN2',
				'A300GEN1',
				'A300GEN2',
				'P400',
				'P4K',
			],
			firmware: ['4', '5'],
			store_state: false,
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
					camera: ['P100', 'P110', 'P120'],
					action: { posPanChoices: CHOICES.POS_PAN_P100 },
				},
				{
					camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2', 'P400', 'P4K'],
					action: { posPanChoices: CHOICES.POS_PAN_P200 },
				},
			],
		},
		pan_position: {
			camera: [
				'P100',
				'P110',
				'P120',
				'P200A2A3',
				'P200A4A5',
				'A200GEN1',
				'A200GEN2',
				'A300GEN1',
				'A300GEN2',
				'P400',
				'P4K',
			],
			firmware: ['4', '5'],
			store_state: true,
			variable_name: 'pan_position',
			variable_label: `PTZ - Pan Position`,
		},
		panSpeed: {
			camera: [
				'P100',
				'P110',
				'P120',
				'P200A2A3',
				'P200A4A5',
				'A200GEN1',
				'A200GEN2',
				'A300GEN1',
				'A300GEN2',
				'P400',
				'P4K',
			],
			firmware: ['4', '5'],
			store_state: true,
			api_endpoint: ['birddogptzsetup'],
			api_variable: ['PanSpeed'],
			variable_name: 'pan_speed',
			variable_label: `PTZ - Pan Speed`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.SPEED_CHANGES, default: 'up', range: { min: 0, max: 21, default: 11 } },
				},
			],
		},
		preset: {
			camera: ['All'],
			firmware: ['5'],
			store_state: true,
			api_endpoint: ['birddogptzsetup'],
			api_variable: ['Preset'],
			variable_name: 'preset',
			variable_label: `PTZ - Preset`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.PRESET_MODE, default: 'Birddog' },
				},
			],
		},
		preset_speed: {
			camera: ['All'],
			firmware: ['5'],
			store_state: true,
			api_endpoint: ['birddogptzsetup'],
			api_variable: ['PresetSpeed'],
			variable_name: 'preset_speed',
			variable_label: `PTZ - Preset Speed`,
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
			store_state: false,
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
			store_state: false,
			action: [
				{
					camera: ['common'],
					action: { range: { min: 1, max: 64, default: 1 } },
				},
			],
		},
		tilt_position: {
			camera: [
				'P100',
				'P110',
				'P120',
				'P200A2A3',
				'P200A4A5',
				'A200GEN1',
				'A200GEN2',
				'A300GEN1',
				'A300GEN2',
				'P400',
				'P4K',
			],
			firmware: ['4', '5'],
			store_state: true,
			variable_name: 'tilt_position',
			variable_label: `PTZ - Tilt Position`,
		},
		tiltSpeed: {
			camera: [
				'P100',
				'P110',
				'P120',
				'P200A2A3',
				'P200A4A5',
				'A200GEN1',
				'A200GEN2',
				'A300GEN1',
				'A300GEN2',
				'P400',
				'P4K',
			],
			firmware: ['4', '5'],
			store_state: true,
			api_endpoint: ['birddogptzsetup'],
			api_variable: ['TiltSpeed'],
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
			store_state: false,
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
					camera: ['P100', 'P110'],
					action: { posZoomChoices: CHOICES.POS_ZOOM_10 },
				},
				{
					camera: ['PF120', 'P120', 'P400'],
					action: { posZoomChoices: CHOICES.POS_ZOOM_20 },
				},
				{
					camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					action: { posZoomChoices: CHOICES.POS_ZOOM_30 },
				},
			],
		},
		zoom_position: {
			camera: ['All'],
			firmware: ['4', '5'],
			store_state: true,
			variable_name: 'zoom_position',
			variable_label: `PTZ - Zoom Position`,
		},
		zoomSpeed: {
			camera: ['All'],
			firmware: ['4', '5'],
			store_state: true,
			api_endpoint: ['birddogptzsetup'],
			api_variable: ['ZoomSpeed'],
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
			store_state: false,
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
			store_state: true,
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
			store_state: true,
			api_endpoint: ['birddogexpsetup'],
			api_variable: ['AeResponse'],
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
			store_state: true,
			api_endpoint: ['birddogexpsetup'],
			api_variable: ['BackLight'],
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
			store_state: true,
			api_endpoint: ['birddogexpsetup'],
			api_variable: ['BrightLevel'],
			variable_name: 'bright_level',
			variable_label: `Exposure - Bright Level`,
			action: [
				{
					camera: ['P100', 'P110', 'P120', 'PF120'],
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
			store_state: true,
			api_endpoint: ['birddogexpsetup'],
			api_variable: ['ExpCompEn'],
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
			store_state: true,
			api_endpoint: ['birddogexpsetup'],
			api_variable: ['ExpCompLvl'],
			variable_name: 'exposure_comp_level',
			variable_label: `Exposure - Exposure Compensation Level`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up' },
				},
				{
					camera: ['P100', 'P110', 'P120', 'PF120'],
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
			store_state: true,
			api_endpoint: ['birddogexpsetup'],
			api_variable: ['ExpMode'],
			variable_name: 'exposure_mode',
			variable_label: `Exposure - Exposure Mode`,
			action: [
				{
					camera: ['common'],
					action: { default: 'FULL-AUTO' },
				},
				{
					camera: ['P100', 'P110', 'P120', 'PF120', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
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
			store_state: true,
			api_endpoint: ['birddogexpsetup'],
			api_variable: ['GainLevel'],
			variable_name: 'gain',
			variable_label: `Exposure - Gain`,
			action: [
				{
					camera: ['P100', 'P110', 'P120', 'PF120'],
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
			store_state: true,
			api_endpoint: ['birddogexpsetup'],
			api_variable: ['GainLimit'],
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
			store_state: true,
			api_endpoint: ['birddogexpsetup'],
			api_variable: ['GainPoint'],
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
			store_state: true,
			api_endpoint: ['birddogexpsetup'],
			api_variable: ['GainPointPosition'],
			variable_name: 'gain_point_position',
			variable_label: `Exposure - Gain Point Position `,
		},
		high_sensitivity: {
			camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2', 'P400', 'P4K'],
			firmware: ['4', '5'],
			store_state: true,
			api_endpoint: ['birddogexpsetup'],
			api_variable: ['HighSensitivity'],
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
			store_state: true,
			api_endpoint: ['birddogexpsetup'],
			api_variable: ['IrisLevel'],
			variable_name: 'iris',
			variable_label: `Exposure - Iris`,
			action: [
				{
					camera: ['P100', 'P110', 'P120', 'PF120'],
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
			camera: ['P100', 'P110', 'P120', 'PF120'],
			firmware: ['4', '5'],
			store_state: true,
			api_endpoint: ['birddogexpsetup'],
			api_variable: ['ShutterControlOverwrite'],
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
			store_state: true,
			api_endpoint: ['birddogexpsetup'],
			api_variable: ['ShutterMaxSpeed'],
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
			store_state: true,
			api_endpoint: ['birddogexpsetup'],
			api_variable: ['ShutterMinSpeed'],
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
			store_state: true,
			api_endpoint: ['birddogexpsetup'],
			api_variable: ['ShutterSpeed'],
			variable_name: 'shutter_speed',
			variable_label: `Exposure - Shutter Speed`,
			action: [
				{
					camera: [
						'P100',
						'P110',
						'P120',
						'PF120',
						'P200A2A3',
						'P200A4A5',
						'A200GEN1',
						'A200GEN2',
						'A300GEN1',
						'A300GEN2',
					],
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
			camera: ['P100', 'P110', 'P120', 'PF120'],
			firmware: ['4', '5'],
			store_state: true,
			api_endpoint: ['birddogexpsetup'],
			api_variable: ['ShutterSpeedOverwrite'],
			variable_name: 'shutter_speed_overwrite',
			variable_label: `Exposure - Shutter Speed Overwrite`,
			action: [
				{
					camera: ['common'],
					action: { range: { min: 30, max: 110, default: 60 } },
				},
			],
		},
		shutter_table: {
			camera: ['All'],
			firmware: ['4', '5'],
			store_state: true,
		},
		slow_shutter_en: {
			camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2', 'P400', 'P4K'],
			firmware: ['4', '5'],
			store_state: true,
			api_endpoint: ['birddogexpsetup'],
			api_variable: ['SlowShutterEn'],
			variable_name: 'slow_shutter_en',
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
			store_state: true,
			api_endpoint: ['birddogexpsetup'],
			api_variable: ['SlowShutterLimit'],
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
			store_state: true,
			api_endpoint: ['birddogexpsetup'],
			api_variable: ['Spotlight'],
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
			store_state: true,
			api_endpoint: ['birddogwbsetup'],
			api_variable: ['BG'],
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
			store_state: true,
			api_endpoint: ['birddogwbsetup'],
			api_variable: ['BlueGain'],
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
			store_state: true,
			api_endpoint: ['birddogwbsetup'],
			api_variable: ['BR'],
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
			camera: ['P100', 'P110', 'P120', 'PF120'],
			firmware: ['4', '5'],
			store_state: true,
			api_endpoint: ['birddogwbsetup'],
			api_variable: ['ColorTemp'],
			variable_name: 'color_temp',
			variable_label: `White Balance - Color Temp`,
			action: [
				{
					camera: ['common'],
					action: {
						choices: CHOICES.UP_DOWN_VALUE,
						default: 'up',
						value: { choices: CHOICES.COLOR_TEMP, default: '4200' },
						range: { min: 28, max: 65, default: 42 },
					},
				},
			],
		},
		gb: {
			camera: ['P400', 'P4K'],
			firmware: ['4', '5'],
			store_state: true,
			api_endpoint: ['birddogwbsetup'],
			api_variable: ['GB'],
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
			store_state: true,
			api_endpoint: ['birddogwbsetup'],
			api_variable: ['GR'],
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
			store_state: true,
			api_endpoint: ['birddogwbsetup'],
			api_variable: ['Level'],
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
			store_state: true,
			api_endpoint: ['birddogwbsetup'],
			api_variable: ['Matrix'],
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
			store_state: true,
			api_endpoint: ['birddogwbsetup'],
			api_variable: ['Offset'],
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
			store_state: true,
			api_endpoint: ['birddogwbsetup'],
			api_variable: ['Phase'],
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
			store_state: true,
			api_endpoint: ['birddogwbsetup'],
			api_variable: ['RB'],
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
			store_state: true,
			api_endpoint: ['birddogwbsetup'],
			api_variable: ['RedGain'],
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
			store_state: true,
			api_endpoint: ['birddogwbsetup'],
			api_variable: ['RG'],
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
			store_state: true,
			api_endpoint: ['birddogwbsetup'],
			api_variable: ['Select'],
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
			store_state: true,
			api_endpoint: ['birddogwbsetup'],
			api_variable: ['Speed'],
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
			store_state: true,
			api_endpoint: ['birddogwbsetup'],
			api_variable: ['WbMode'],
			variable_name: 'wb_mode',
			variable_label: `White Balance - White Balance Mode`,
			action: [
				{
					camera: ['common'],
					action: { default: 'AUTO' },
				},
				{
					camera: ['P100', 'P110', 'P120', 'PF120'],
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
			store_state: true,
			api_endpoint: ['birddogpicsetup'],
			api_variable: ['BackLightCom'],
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
			store_state: true,
			api_endpoint: ['birddogpicsetup'],
			api_variable: ['ChromeSuppress'],
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
			camera: ['P100', 'P110', 'P120', 'PF120'],
			firmware: ['4', '5'],
			store_state: true,
			api_endpoint: ['birddogpicsetup'],
			api_variable: ['Color'],
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
			camera: ['P100', 'P110', 'P120', 'PF120'],
			firmware: ['4', '5'],
			store_state: true,
			api_endpoint: ['birddogpicsetup'],
			api_variable: ['Contrast'],
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
			camera: ['P100', 'P110', 'P120', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
			firmware: ['4', '5'],
			store_state: true,
			api_endpoint: ['birddogpicsetup'],
			api_variable: ['Gamma'],
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
			store_state: true,
			api_endpoint: ['birddogpicsetup'],
			api_variable: ['HighlightComp'],
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
			store_state: true,
			api_endpoint: ['birddogpicsetup'],
			api_variable: ['HighlightCompMask'],
			variable_name: 'highlight_comp_mask',
			variable_label: `Picture Setup - Highlight Compensation Mask`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 3, default: 1 } },
				},
			],
		},
		hue: {
			camera: ['P100', 'P110', 'P120', 'PF120'],
			firmware: ['4', '5'],
			store_state: true,
			api_endpoint: ['birddogpicsetup'],
			api_variable: ['Hue'],
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
			store_state: true,
			api_endpoint: ['birddogpicsetup'],
			api_variable: ['IRCutFilter'],
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
			store_state: true,
			api_endpoint: ['birddogpicsetup'],
			api_variable: ['LowLatency'],
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
			store_state: true,
			api_endpoint: ['birddogpicsetup'],
			api_variable: ['NDFilter'],
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
			camera: ['P100', 'P110', 'P120', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
			firmware: ['4', '5'],
			store_state: true,
			api_endpoint: ['birddogpicsetup'],
			api_variable: ['NoiseReduction'],
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
			store_state: true,
			api_endpoint: ['birddogpicsetup'],
			api_variable: ['Flip'],
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
			store_state: true,
			api_endpoint: ['birddogpicsetup'],
			api_variable: ['Mirror'],
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
			camera: ['P100', 'P110', 'P120', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
			firmware: ['4', '5'],
			store_state: true,
			api_endpoint: ['birddogpicsetup'],
			api_variable: ['Effect'],
			variable_name: 'bw_effect',
			variable_label: `Picture Setup - BW Effect`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.PICTURE_EFFECT, default: 'BW' },
				},
			],
		},
		sharpness: {
			camera: ['P100', 'P110', 'P120', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
			firmware: ['4', '5'],
			store_state: true,
			api_endpoint: ['birddogpicsetup'],
			api_variable: ['Sharpness'],
			variable_name: 'sharpness',
			variable_label: `Picture Setup - Sharpness`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up' },
				},
				{
					camera: ['P100', 'P110', 'P120', 'PF120'],
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
			store_state: true,
			api_endpoint: ['birddogpicsetup'],
			api_variable: ['Stabilizer'],
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
			store_state: true,
			api_endpoint: ['birddogpicsetup'],
			api_variable: ['ThreeDNR'],
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
			store_state: true,
			api_endpoint: ['birddogpicsetup'],
			api_variable: ['TWODNR'],
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
			camera: ['P100', 'P110', 'P120', 'PF120'],
			firmware: ['4', '5'],
			store_state: true,
			api_endpoint: ['birddogpicsetup'],
			api_variable: ['WideDynamicRange'],
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
			camera: ['P100', 'P110', 'P120', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
			firmware: ['4', '5'],
			store_state: true,
			api_endpoint: ['birddogcmsetup'],
			api_variable: ['cam_cm_blu_gain', 'BlueGain'],
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
			camera: ['P100', 'P110', 'P120', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
			firmware: ['4', '5'],
			store_state: true,
			api_endpoint: ['birddogcmsetup'],
			api_variable: ['cam_cm_blu_hue', 'BlueHue'],
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
			store_state: true,
			api_endpoint: ['birddogcmsetup'],
			api_variable: ['ColourGain'],
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
			camera: ['P100', 'P110', 'P120', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
			firmware: ['4', '5'],
			store_state: true,
			api_endpoint: ['birddogcmsetup'],
			api_variable: ['cam_cm_cya_gain', 'CyanGain'],
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
			camera: ['P100', 'P110', 'P120', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
			firmware: ['4', '5'],
			store_state: true,
			api_endpoint: ['birddogcmsetup'],
			api_variable: ['cam_cm_cya_hue', 'CyanHue'],
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
			camera: ['P100', 'P110', 'P120', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
			firmware: ['4', '5'],
			store_state: true,
			api_endpoint: ['birddogcmsetup'],
			api_variable: ['cam_cm_gre_gain', 'GreenGain'],
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
			camera: ['P100', 'P110', 'P120', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
			firmware: ['4', '5'],
			store_state: true,
			api_endpoint: ['birddogcmsetup'],
			api_variable: ['cam_cm_gre_hue', 'GreenHue'],
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
			store_state: true,
			api_endpoint: ['birddogcmsetup'],
			api_variable: ['HuePhase'],
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
			camera: ['P100', 'P110', 'P120', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
			firmware: ['4', '5'],
			store_state: true,
			api_endpoint: ['birddogcmsetup'],
			api_variable: ['cam_cm_mag_gain', 'MagGain'],
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
			camera: ['P100', 'P110', 'P120', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
			firmware: ['4', '5'],
			store_state: true,
			api_endpoint: ['birddogcmsetup'],
			api_variable: ['cam_cm_mag_hue', 'MagHue'],
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
			camera: ['P100', 'P110', 'P120', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
			firmware: ['4', '5'],
			store_state: true,
			api_endpoint: ['birddogcmsetup'],
			api_variable: ['cam_cm_red_gain', 'RedGain'],
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
			camera: ['P100', 'P110', 'P120', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
			firmware: ['4', '5'],
			store_state: true,
			api_endpoint: ['birddogcmsetup'],
			api_variable: ['cam_cm_red_hue', 'RedHue'],
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
			camera: ['P100', 'P110', 'P120', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
			firmware: ['4', '5'],
			store_state: true,
			api_endpoint: ['birddogcmsetup'],
			api_variable: ['cam_cm_yel_gain', 'YellowGain'],
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
			camera: ['P100', 'P110', 'P120', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
			firmware: ['4', '5'],
			store_state: true,
			api_endpoint: ['birddogcmsetup'],
			api_variable: ['cam_cm_yel_hue', 'YellowHue'],
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
			store_state: true,
			api_endpoint: ['birddogadvancesetup'],
			api_variable: ['Brightness'],
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
			store_state: true,
			api_endpoint: ['birddogadvancesetup'],
			api_variable: ['BrightnessComp'],
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
			store_state: true,
			api_endpoint: ['birddogadvancesetup'],
			api_variable: ['CompLevel'],
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
			store_state: true,
			api_endpoint: ['birddogadvancesetup'],
			api_variable: ['GammaOffset'],
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
			store_state: true,
			api_endpoint: ['birddogadvancesetup'],
			api_variable: ['HighResolution'],
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
			store_state: true,
			api_endpoint: ['birddogadvancesetup'],
			api_variable: ['VideoEnhancement'],
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
			store_state: true,
			api_endpoint: ['birddogexternalsetup'],
			api_variable: ['Aux'],
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
			store_state: true,
			api_endpoint: ['birddogexternalsetup'],
			api_variable: ['RainWiper'],
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
			store_state: true,
			api_endpoint: ['birddogexternalsetup'],
			api_variable: ['V12vOut'],
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
			store_state: true,
			api_endpoint: ['birddogdetsetup'],
			api_variable: ['Bandwidth'],
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
			store_state: true,
			api_endpoint: ['birddogdetsetup'],
			api_variable: ['BwBalance'],
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
			store_state: true,
			api_endpoint: ['birddogdetsetup'],
			api_variable: ['Crispening'],
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
			store_state: true,
			api_endpoint: ['birddogdetsetup'],
			api_variable: ['Detail'],
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
			store_state: true,
			api_endpoint: ['birddogdetsetup'],
			api_variable: ['HighLightDetail'],
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
			store_state: true,
			api_endpoint: ['birddogdetsetup'],
			api_variable: ['HvBalance'],
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
			store_state: true,
			api_endpoint: ['birddogdetsetup'],
			api_variable: ['Limit'],
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
			store_state: true,
			api_endpoint: ['birddogdetsetup'],
			api_variable: ['SuperLow'],
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
			store_state: true,
			api_endpoint: ['birddoggammasetup'],
			api_variable: ['BlackGammaLevel'],
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
			store_state: true,
			api_endpoint: ['birddoggammasetup'],
			api_variable: ['BlackLevel'],
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
			store_state: true,
			api_endpoint: ['birddoggammasetup'],
			api_variable: ['BlackLevelRange'],
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
			store_state: true,
			api_endpoint: ['birddoggammasetup'],
			api_variable: ['Effect'],
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
			store_state: true,
			api_endpoint: ['birddoggammasetup'],
			api_variable: ['Level'],
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
			store_state: true,
			api_endpoint: ['birddoggammasetup'],
			api_variable: ['Offset'],
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
			store_state: true,
			api_endpoint: ['birddoggammasetup'],
			api_variable: ['Pattern'],
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
			store_state: true,
			api_endpoint: ['birddoggammasetup'],
			api_variable: ['PatternFine'],
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
			store_state: true,
			api_endpoint: ['birddoggammasetup'],
			api_variable: ['Settings'],
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
			store_state: true,
			api_endpoint: ['birddoggammasetup'],
			api_variable: ['VisibilityEnhancer'],
			variable_name: 'visibility_enhancer',
			variable_label: `Gamma Setup - Visibilty Enhancer`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.ON_OFF, default: 'Off' },
				},
			],
		},

		// BirdDog Scope
		scope_size: {
			camera: ['All'],
			firmware: ['5'],
			store_state: true,
			api_endpoint: ['birddogscope'],
			api_variable: ['DoubleSizeEnable'],
			variable_name: 'scope_size',
			variable_label: `Scope - Size`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.ON_OFF, default: 'Off' },
				},
			],
		},
		scope_gamma_gain: {
			camera: ['All'],
			firmware: ['5'],
			store_state: true,
			api_endpoint: ['birddogscope'],
			api_variable: ['GammaGain'],
			variable_name: 'scope_gamma_gain',
			variable_label: `Scope - Gamma Gain`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 7, default: 4 } },
				},
			],
		},
		scope_mode: {
			camera: ['All'],
			firmware: ['5'],
			store_state: true,
			api_endpoint: ['birddogscope'],
			api_variable: ['Mode'],
			variable_name: 'scope_mode',
			variable_label: `Scope - Mode`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.SCOPE_MODE, default: 'Histogram' },
				},
			],
		},
		scope_position: {
			camera: ['All'],
			firmware: ['5'],
			store_state: true,
			api_endpoint: ['birddogscope'],
			api_variable: ['Position'],
			variable_name: 'scope_position',
			variable_label: `Scope - Position`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.SCOPE_POSITION, default: 'TopLeft' },
				},
			],
		},
		scope_preview: {
			camera: ['All'],
			firmware: ['5'],
			store_state: true,
			api_endpoint: ['birddogscope'],
			api_variable: ['PreviewEnable'],
			variable_name: 'scope_preview',
			variable_label: `Scope - Preview`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.ON_OFF, default: 'Off' },
				},
			],
		},
		scope_program: {
			camera: ['All'],
			firmware: ['5'],
			store_state: true,
			api_endpoint: ['birddogscope'],
			api_variable: ['ProgramEnable'],
			variable_name: 'scope_program',
			variable_label: `Scope - Program`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.ON_OFF, default: 'Off' },
				},
			],
		},
		scope_transparency: {
			camera: ['All'],
			firmware: ['5'],
			store_state: true,
			api_endpoint: ['birddogscope'],
			api_variable: ['TransparencyEnable'],
			variable_name: 'scope_transparency',
			variable_label: `Scope - Transparency`,
			action: [
				{
					camera: ['common'],
					action: { choices: CHOICES.ON_OFF, default: 'Off' },
				},
			],
		},

		// WebSocket Variables

		avbr: {
			camera: ['All'],
			firmware: ['5'],
			store_state: true,
			api_endpoint: ['WebSocket'],
			api_variable: ['avbr'],
			variable_name: 'avbr',
			variable_label: `Dashboard - Average Bitrate`,
		},

		aud_ch: {
			camera: ['All'],
			firmware: ['5'],
			store_state: true,
			api_endpoint: ['WebSocket'],
			api_variable: ['aud_ch'],
			variable_name: 'aud_ch',
			variable_label: `Dashboard - Audio Channels`,
		},

		aud_sr: {
			camera: ['All'],
			firmware: ['5'],
			store_state: true,
			api_endpoint: ['WebSocket'],
			api_variable: ['aud_sr'],
			variable_name: 'aud_sr',
			variable_label: `Dashboard - Audio Sample Rate`,
		},

		aud_stat: {
			camera: ['All'],
			firmware: ['5'],
			store_state: true,
			api_endpoint: ['WebSocket'],
			api_variable: ['aud_stat'],
			variable_name: 'aud_stat',
			variable_label: `Dashboard - Audio Status`,
		},

		dashboard_vid_status: {
			camera: ['All'],
			firmware: ['5'],
			store_state: true,
			api_endpoint: ['WebSocket'],
			api_variable: ['dashboard_vid_status'],
			variable_name: 'dashboard_vid_status',
			variable_label: `Dashboard - Status`,
		},

		dev_mode: {
			camera: ['All'],
			firmware: ['5'],
			store_state: true,
			api_endpoint: ['WebSocket'],
			api_variable: ['dev_mode'],
			variable_name: 'dev_mode',
			variable_label: `Dashboard - Device Mode`,
		},

		gen_status: {
			camera: ['All'],
			firmware: ['5'],
			store_state: true,
			api_endpoint: ['WebSocket'],
			api_variable: ['gen_status'],
			variable_name: 'gen_status',
			variable_label: `Dashboard - Genlock Status`,
		},

		mcu_ver: {
			camera: ['All'],
			firmware: ['5'],
			store_state: true,
			api_endpoint: ['WebSocket'],
			api_variable: ['mcu_ver'],
			variable_name: 'mcu_ver',
			variable_label: `Dashboard - MCU Version`,
		},

		net_band_perc: {
			camera: ['All'],
			firmware: ['5'],
			store_state: true,
			api_endpoint: ['WebSocket'],
			api_variable: ['net_band_perc'],
			variable_name: 'net_band_perc',
			variable_label: `Dashboard - Network Bandwidth`,
		},

		net_mode: {
			camera: ['All'],
			firmware: ['5'],
			store_state: true,
			api_endpoint: ['WebSocket'],
			api_variable: ['net_mode'],
			variable_name: 'net_mode',
			variable_label: `Dashboard - Network Mode`,
		},

		net_speed: {
			camera: ['All'],
			firmware: ['5'],
			store_state: true,
			api_endpoint: ['WebSocket'],
			api_variable: ['net_speed'],
			variable_name: 'net_speed',
			variable_label: `Dashboard - Network Speed`,
		},

		src_stat: {
			camera: ['All'],
			firmware: ['5'],
			store_state: true,
			api_endpoint: ['WebSocket'],
			api_variable: ['src_stat'],
			variable_name: 'src_stat',
			variable_label: `Dashboard - Source Status`,
		},

		sys_info_perc: {
			camera: ['All'],
			firmware: ['5'],
			store_state: true,
			api_endpoint: ['WebSocket'],
			api_variable: ['sys_info_perc'],
			variable_name: 'sys_info_perc',
			variable_label: `Dashboard - CPU Usage`,
		},

		vid_fmt: {
			camera: ['All'],
			firmware: ['5'],
			store_state: true,
			api_endpoint: ['WebSocket'],
			api_variable: ['vid_fmt'],
			variable_name: 'vid_fmt',
			variable_label: `Dashboard - Video Format`,
		},

		vid_fr: {
			camera: ['All'],
			firmware: ['5'],
			store_state: true,
			api_endpoint: ['WebSocket'],
			api_variable: ['vid_fr'],
			variable_name: 'vid_fr',
			variable_label: `Dashboard - Video Frame Rate`,
		},

		vid_res: {
			camera: ['All'],
			firmware: ['5'],
			store_state: true,
			api_endpoint: ['WebSocket'],
			api_variable: ['vid_res'],
			variable_name: 'vid_res',
			variable_label: `Dashboard - Video Resolution`,
		},

		vid_sra: {
			camera: ['All'],
			firmware: ['5'],
			store_state: true,
			api_endpoint: ['WebSocket'],
			api_variable: ['vid_sra'],
			variable_name: 'vid_sra',
			variable_label: `Dashboard - Video Sample Rate`,
		},

		vid_str_name: {
			camera: ['All'],
			firmware: ['5'],
			store_state: true,
			api_endpoint: ['WebSocket'],
			api_variable: ['vid_str_name'],
			variable_name: 'vid_str_name',
			variable_label: `Dashboard - NDI Video Stream Name`,
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
