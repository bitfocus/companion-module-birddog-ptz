import CHOICES from './choices.js'

export const MODEL_QUERIES = {
	//Basic Device Information
	about: { camera: ['All'], firmware: ['4', '5', '6'] },

	//Device Settings
	analogaudiosetup: { camera: ['All'], firmware: ['4', '5'] },
	devicesettings: { camera: ['All'], firmware: ['5'] },
	videooutputinterface: { camera: ['P240', 'P400', 'P4K', 'X1', 'X1Ultra', 'X4Ultra', 'MAX'], firmware: ['4', '5', '6'] },

	//NDI Encode
	encodesetup: { camera: ['All'], firmware: ['4', '5', '6'] },
	encodetransport: { camera: ['All'], firmware: ['4', '5'] },

	//NDI Finder
	NDIDisServer: { camera: ['All'], firmware: ['4', '5', '6'] },

	//PTZ
	birddogptzsetup: { camera: ['All'], firmware: ['4', '5', '6'] },
	recallPost: { camera: ['All'], firmware: ['4', '5', '6'] },
	savePost: { camera: ['All'], firmware: ['4', '5', '6'] },
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
			'P240',
			'P400',
			'P4K',
		],
		firmware: ['4', '5'],
	},

	//Exposure
	birddogexpsetup: { camera: ['All'], firmware: ['4', '5', '6'] },

	//White Balance
	birddogwbsetup: { camera: ['All'], firmware: ['4', '5', '6'] },

	//Picture Settings
	birddogpicsetup: { camera: ['All'], firmware: ['4', '5', '6'] },
	birddogcmsetup: {
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
			'X1',
			'X1Ultra',
			'X4Ultra',
		],
		firmware: ['4', '5', '6'],
	},

	//Advanced Settings
	birddogadvancesetup: {
		camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2', 'X1', 'X1Ultra', 'X4Ultra', 'MAX'],
		firmware: ['4', '5', '6'],
	},
	tally: {
		camera: ['X1', 'X1Ultra', 'X4Ultra', 'MAX'],
		firmware: ['6'],
	},

	//External Settings
	birddogexternalsetup: { camera: ['A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'], firmware: ['4', '5'] },

	//Detail Settings
	birddogdetsetup: { camera: ['P240', 'P400', 'P4K'], firmware: ['4', '5'] },

	//Gamma Settings
	birddoggammasetup: { camera: ['P240', 'P400', 'P4K'], firmware: ['4', '5'] },

	//Scope Settings
	birddogscope: { camera: ['All'], firmware: ['5'] },
}

export const MODEL_SPECS = {
	// General Camera
	firmware: {
		camera: ['All'],
		firmware: ['4', '5'],
		store_state: true,
		variableId: 'firmware',
		name: 'General - Firmware',
	},
	fallback_IP: {
		camera: ['All'],
		firmware: ['6'],
		api_endpoint: ['about'],
		api_variable: ['FallbackIP'],
		variableId: 'fallback_ip',
		store_state: true,
	},
	firmware_version: {
		camera: ['All'],
		firmware: ['5', '6'],
		api_endpoint: ['about'],
		api_variable: ['FirmwareVersion'],
		store_state: true,
	},
	mcu_version: {
		camera: ['All'],
		firmware: ['5', '6'],
		api_endpoint: ['about'],
		api_variable: ['MCUVersion'],
		store_state: true,
	},
	format: {
		camera: ['All'],
		firmware: ['5', '6'],
		api_endpoint: ['about'],
		api_variable: ['Format'],
		store_state: true,
	},
	framerate: {
		camera: ['All'],
		firmware: ['4', '5'],
		store_state: true,
	},
	hardware_version: {
		camera: ['All'],
		firmware: ['4', '5', '6'],
		store_state: true,
		api_endpoint: ['about'],
		api_variable: ['HardwareVersion'],
		variableId: 'hardware_version',
		name: 'General - Hardware Version',
	},
	hostname: {
		camera: ['All'],
		firmware: ['4', '5', '6'],
		store_state: true,
		api_endpoint: ['about'],
		api_variable: ['HostName'],
		variableId: 'hostname',
		name: 'General - Name',
	},
	ipaddress: {
		camera: ['All'],
		firmware: ['4', '5', '6'],
		store_state: true,
		api_endpoint: ['about'],
		api_variable: ['IPAddress'],
		variableId: 'ipaddress',
		name: 'General - IP Address',
	},
	gateway: {
		camera: ['All'],
		firmware: ['5', '6'],
		api_endpoint: ['about'],
		api_variable: ['GateWay'],
		store_state: true,
	},
	model: {
		camera: ['All'],
		firmware: ['4', '5'],
		store_state: true,
		variableId: 'model',
		name: 'General - Model',
	},
	netmask: {
		camera: ['All'],
		firmware: ['4', '5', '6'],
		store_state: true,
		api_endpoint: ['about'],
		api_variable: ['NetworkMask'],
		variableId: 'netmask',
		name: 'General - Network Mask',
	},
	network_config: {
		camera: ['All'],
		firmware: ['4', '5', '6'],
		store_state: true,
		api_endpoint: ['about'],
		api_variable: ['NetworkConfigMethod'],
		variableId: 'network_config',
		name: 'General - Network Config Method',
	},
	dns: {
		camera: ['X1', 'X1Ultra', 'X4Ultra', 'MAX'],
		firmware: ['6'],
		store_state: true,
		api_endpoint: ['about'],
		api_variable: ['Dns'],
		variableId: 'dns',
		name: 'General - DNS',
	},
	wifi_config_method: {
		camera: ['X1', 'X1Ultra', 'X4Ultra', 'MAX'],
		firmware: ['6'],
		store_state: true,
		api_endpoint: ['about'],
		api_variable: ['WifiConfigMethod'],
		variableId: 'wifi_config_method',
		name: 'General - Wifi Config Method',
	},
	wifi_ip_address: {
		camera: ['X1', 'X1Ultra', 'X4Ultra', 'MAX'],
		firmware: ['6'],
		store_state: true,
		api_endpoint: ['about'],
		api_variable: ['WifiIPAddress'],
		variableId: 'wifi_ip_address',
		name: 'General - Wifi IP Address',
	},
	wifi_netmask: {
		camera: ['X1', 'X1Ultra', 'X4Ultra', 'MAX'],
		firmware: ['6'],
		store_state: true,
		api_endpoint: ['about'],
		api_variable: ['WifiMask'],
		variableId: 'wifi_netmask',
		name: 'General - Wifi Network Mask',
	},
	serial_number: {
		camera: ['All'],
		firmware: ['4', '5', '6'],
		store_state: true,
		api_endpoint: ['about'],
		api_variable: ['SerialNumber'],
		variableId: 'serial_number',
		name: 'General - Serial Number',
	},
	status: {
		camera: ['All'],
		firmware: ['4', '5', '6'],
		store_state: true,
		api_endpoint: ['about'],
		api_variable: ['Status'],
		variableId: 'status',
		name: 'General - Status',
	},

	// VISCA
	freeze: {
		camera: ['All'],
		firmware: ['4', '5'], //v5 is returning incorrectly formatted VISCA msg
		store_state: true,
		variableId: 'freeze',
		name: 'VISCA - Freeze',
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
		variableId: 'standby',
		name: 'VISCA - Standby',
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
		variableId: 'audio_in_gain',
		name: 'Analog Audio - Audio In Gain',
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: -50, max: 50, default: 0 } },
			},
		],
	},
	analogAudioOutGain: {
		camera: ['All'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['analogaudiosetup'],
		api_variable: ['AnalogAudioOutGain'],
		variableId: 'audio_out_gain',
		name: 'Analog Audio - Audio Out Gain',
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: -50, max: 50, default: 0 } },
			},
		],
	},
	analogAudioOutput: {
		camera: ['All'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['analogaudiosetup'],
		api_variable: ['AnalogAudiooutputselect'],
		variableId: 'audio_output',
		name: 'Analog Audio - Audio Output',
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
		variableId: 'oled',
		name: 'Device Settings - OLED',
	},

	// Video Output Interface
	video_output: {
		camera: ['P240', 'P400', 'P4K'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['videooutputinterface'],
		api_variable: ['videooutput'],
		variableId: 'video_output',
		name: `Video Output - Video Mode`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.VIDEO_OUTPUT, default: 'NormalMode' },
			},
		],
	},
	output_mode: {
		camera: ['X1', 'X1Ultra', 'X4Ultra', 'MAX'],
		firmware: ['6'],
		store_state: true,
		api_endpoint: ['videooutputinterface'],
		api_variable: ['OutputMode'],
		variableId: 'output_mode',
		name: `Video Output - Output Mode`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.OUTPUT_MODE, default: 'Encode' },
			},
		],
	},
	output_format: {
		camera: ['X1', 'X1Ultra', 'X4Ultra', 'MAX'],
		firmware: ['6'],
		store_state: true,
		api_endpoint: ['videooutputinterface'],
		api_variable: ['OutputFormat'],
		variableId: 'output_format',
		name: `Video Output - Output Format`,
		/* action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.OUTPUT_MODE, default: 'Encode' },
			},
		], */
	},
	privacy_mode: {
		camera: ['X1', 'X1Ultra', 'X4Ultra', 'MAX'],
		firmware: ['6'],
		store_state: true,
		api_endpoint: ['videooutputinterface'],
		api_variable: ['PrivacyMode'],
		variableId: 'privacy_mode',
		name: `Video Output - Privacy Mode`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.ON_OFF, default: 'Off' },
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
		variableId: 'bandwidth_mode',
		name: 'Encode Setup - Bandwidth Mode',
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
		variableId: 'bandwidth_select',
		name: 'Encode Setup - Bandwidth Select',
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 80, max: 180, default: 80 } },
			},
		],
	},
	capture_screensaver: {
		camera: ['All'],
		firmware: ['5', '6'],
		name: 'Encode - Capture Screensaver',
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
		variableId: 'color_bitdepth',
		name: 'Encode Setup - Color Bit Depth',
	},
	genlock: {
		camera: ['All'],
		firmware: ['5'],
		store_state: true,
		api_endpoint: ['encodesetup'],
		api_variable: ['GenLock'],
	},
	loopTally: {
		camera: ['All'],
		firmware: ['5'],
		store_state: true,
		api_endpoint: ['encodesetup'],
		api_variable: ['LoopTally'],
	},
	ndiAudio: {
		camera: ['All'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['encodesetup'],
		api_variable: ['NDIAudio'],
		variableId: 'ndi_audio',
		name: `Encode Setup - NDI Audio`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.ENCODE_NDI_AUDIO, default: 'NDIAudioMute' },
			},
		],
	},
	ndiGroupEnable: {
		camera: ['All'],
		firmware: ['4', '5', '6'],
		store_state: true,
		api_endpoint: ['encodesetup'],
		api_variable: ['NDIGroup'],
		variableId: 'ndi_group',
		name: `Encode Setup - NDI Group`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.ENCODE_NDIGroup, default: 'NDIGroupDis' },
			},
		],
	},
	ndi_group_name: {
		camera: ['All'],
		firmware: ['4', '5', '6'],
		store_state: true,
		api_endpoint: ['encodesetup'],
		api_variable: ['NDIGroupName'],
		variableId: 'ndi_group_name',
		name: `Encode Setup - NDI Group Name`,
	},
	screensaver_mode: {
		camera: ['All'],
		firmware: ['5', '6'],
		store_state: true,
		api_endpoint: ['encodesetup'],
		api_variable: ['ScreenSaverMode'],
		variableId: 'screensaver_mode',
		name: `Encode Setup - Screensaver Mode`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.SCREEN_SAVER_MODE, default: 'BirdDogSS' },
			},
		],
	},
	stream_name: {
		camera: ['All'],
		firmware: ['4', '5', '6'],
		store_state: true,
		api_endpoint: ['encodesetup'],
		api_variable: ['StreamName'],
		variableId: 'stream_name',
		name: `Encode Setup - Stream Name`,
	},
	stream_to_network: {
		camera: ['All'],
		firmware: ['5', '6'],
		store_state: true,
		api_endpoint: ['encodesetup'],
		api_variable: ['StreamToNetwork'],
		variableId: 'stream_to_network',
		name: `Encode Setup - Stream to Network`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.ON_OFF, default: 'On' },
			},
		],
	},
	tally_mode: {
		camera: ['P110', 'P120', 'PF120', 'P200A2A3', 'P200A4A5', 'P240', 'P400', 'P4K'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['encodesetup'],
		api_variable: ['TallyMode'],
		variableId: 'tally_mode',
		name: `Encode Setup - Tally Mode`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.TALLY_MODE, default: 'TallyOn' },
			},
		],
	},
	tally_state: {
		camera: ['X1', 'X1Ultra', 'X4Ultra', 'MAX'],
		firmware: ['6'],
		store_state: true,
		api_endpoint: ['tally'],
		api_variable: ['tally_state'],
		variableId: 'tally_mode',
		name: `Tally - Onboard Tally`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.ON_OFF, default: 'On' },
			},
		],
	},
	tally_rest_state: {
		camera: ['X1', 'X1Ultra'],
		firmware: ['6'],
		store_state: true,
		api_endpoint: ['tally'],
		api_variable: ['tally_rest_state'],
		variableId: 'tally_rest_state',
		name: `Tally - Tally Rest State`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.TALLY_REST_STATE, default: 'white' },
			},
		],
	},
	video_csc: {
		camera: ['All'],
		firmware: ['5'],
		store_state: true,
		api_endpoint: ['encodesetup'],
		api_variable: ['VideoCSC'],
		variableId: 'video_csc',
		name: `Encode Setup - Video CSC`,
	},
	video_format: {
		camera: ['All'],
		firmware: ['4', '5', '6'],
		store_state: true,
		api_endpoint: ['encodesetup'],
		api_variable: ['VideoFormat'],
		variableId: 'video_format',
		name: `Encode Setup - Video Format`,
	},
	video_sample_rate: {
		camera: ['All'],
		firmware: ['5'],
		store_state: true,
		api_endpoint: ['encodesetup'],
		api_variable: ['VideoSampleRate'],
		variableId: 'video_sample_rate',
		name: `Encode Setup - Video Sample Rate`,
	},

	// Encode Transport
	transmit_method: {
		camera: ['All'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['encodetransport'],
		api_variable: ['txpm', 'Txpm'],
		variableId: 'transmit_method',
		name: `Encode Transport - Transmit Method`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.ENCODE_TXPM, default: 'RUDP' },
			},
		],
	},
	transmit_netprefix: {
		camera: ['All'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['encodetransport'],
		api_variable: ['txnetprefix', 'Txnetprefix'],
		variableId: 'transmit_netprefix',
		name: 'Encode Transport - Transmit Net Prefix',
	},
	transmit_netmask: {
		camera: ['All'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['encodetransport'],
		api_variable: ['txnetmask', 'Txnetmask'],
		variableId: 'transmit_netmask',
		name: 'Encode Transport - Transmit Netmask',
	},
	transmit_ttl: {
		camera: ['All'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['encodetransport'],
		api_variable: ['txmcttl', 'Txmcttl'],
		variableId: 'transmit_ttl',
		name: 'Encode Transport - Transmit TTL',
	},

	// NDI Discovery
	ndi_discovery_server: {
		camera: ['All'],
		firmware: ['4', '5', '6'],
		store_state: true,
		api_endpoint: ['NDIDisServer'],
		api_variable: ['NDIDisServ'],
		variableId: 'ndi_discovery_server',
		name: `NDI Discovery - Server`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.NDI_DIS_SVR, default: 'NDIDisServDis' },
			},
		],
	},
	ndi_discovery_server_ip: {
		camera: ['All'],
		firmware: ['4', '5', '6'],
		store_state: true,
		api_endpoint: ['NDIDisServer'],
		api_variable: ['NDIDisServIP'],
		variableId: 'ndi_discovery_server_ip',
		name: `NDI Discovery - Server IP`,
	},

	// PTZ
	freed: {
		camera: ['All'],
		firmware: ['5'],
		store_state: true,
		api_endpoint: ['birddogptzsetup'],
		api_variable: ['Freed'],
		variableId: 'freed',
		name: `PTZ - FreeD`,
	},
	freed_ip_address: {
		camera: ['All'],
		firmware: ['5'],
		store_state: true,
		api_endpoint: ['birddogptzsetup'],
		api_variable: ['FreedIpAddr'],
		variableId: 'freed_ip_address',
		name: `PTZ - FreeD IP Address`,
	},
	freed_port: {
		camera: ['All'],
		firmware: ['5'],
		store_state: true,
		api_endpoint: ['birddogptzsetup'],
		api_variable: ['FreedPort'],
		variableId: 'freed_port',
		name: `PTZ - FreeD Port`,
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
			'P240',
			'P400',
			'P4K',
			'X1',
			'X1Ultra',
			'X4Ultra',
		],
		firmware: ['4', '5', '6'],
		store_state: false,
		name: 'PTZ - Pan/Tilt',
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
				camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2', 'P240', 'P400', 'P4K'],
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
			'P240',
			'P400',
			'P4K',
		],
		firmware: ['4', '5'],
		store_state: true,
		variableId: 'pan_position',
		name: `PTZ - Pan Position`,
	},
	pan_position_int: {
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
			'P240',
			'P400',
			'P4K',
		],
		firmware: ['4', '5'],
		store_state: true,
		variableId: 'pan_position_int',
		name: `PTZ - Pan Position (Integer)`,
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
			'P240',
			'P400',
			'P4K',
			'X1',
			'X1Ultra',
			'X4Ultra',
		],
		firmware: ['4', '5', '6'],
		store_state: true,
		api_endpoint: ['birddogptzsetup'],
		api_variable: ['PanSpeed'],
		variableId: 'pan_speed',
		name: `PTZ - Pan Speed`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.SPEED_CHANGES, default: 'up', range: { min: 0, max: 21, default: 11 } },
			},
		],
	},
	preset: {
		camera: ['All'],
		firmware: ['5', '6'],
		store_state: true,
		api_endpoint: ['birddogptzsetup'],
		api_variable: ['Preset'],
		variableId: 'preset',
		name: `PTZ - Preset`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.PRESET_MODE, default: 'Birddog' },
			},
		],
	},
	preset_speed: {
		camera: ['All'],
		firmware: ['5', '6'],
		store_state: true,
		api_endpoint: ['birddogptzsetup'],
		api_variable: ['PresetSpeed'],
		variableId: 'preset_speed',
		name: `PTZ - Preset Speed`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.SPEED_CHANGES, default: 'up', range: { min: 0, max: 21, default: 11 } },
			},
			{
				camera: ['X1', 'X1Ultra', 'X4Ultra', 'MAX'],
				action: { choices: CHOICES.SPEED_CHANGES, default: 'up', range: { min: 5, max: 200, default: 11 } },
			},
		],
	},
	recallPset: {
		camera: ['All'],
		firmware: ['4', '5', '6'],
		store_state: false,
		name: 'PTZ - Recall Preset',
		action: [
			{
				camera: ['common'],
				action: { range: { min: 1, max: 64, default: 1 } },
			},
		],
	},
	savePset: {
		camera: ['All'],
		firmware: ['4', '5', '6'],
		store_state: false,
		name: 'PTZ - Save Preset',
		action: [
			{
				camera: ['common'],
				action: { range: { min: 1, max: 128, default: 1 } },
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
			'P240',
			'P400',
			'P4K',
		],
		firmware: ['4', '5'],
		store_state: true,
		variableId: 'tilt_position',
		name: `PTZ - Tilt Position`,
	},
	tilt_position_int: {
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
			'P240',
			'P400',
			'P4K',
		],
		firmware: ['4', '5'],
		store_state: true,
		variableId: 'tilt_position_int',
		name: `PTZ - Tilt Position (Integer)`,
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
			'P240',
			'P400',
			'P4K',
			'X1',
			'X1Ultra',
			'X4Ultra',
		],
		firmware: ['4', '5', '6'],
		store_state: true,
		api_endpoint: ['birddogptzsetup'],
		api_variable: ['TiltSpeed'],
		variableId: 'tilt_speed',
		name: `PTZ - Tilt Speed`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.SPEED_CHANGES, default: 'up', range: { min: 0, max: 18, default: 9 } },
			},
		],
	},
	zoom: {
		camera: ['All'],
		firmware: ['4', '5', '6'],
		store_state: false,
		name: 'PTZ - Zoom',
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
				camera: ['P4K', 'X1 Ultra'],
				action: { posZoomChoices: CHOICES.POS_ZOOM_12 },
			},
			{
				camera: ['P100', 'P110'],
				action: { posZoomChoices: CHOICES.POS_ZOOM_10 },
			},
			{
				camera: ['PF120', 'P120', 'P240', 'P400', 'X1', 'X4Ultra'],
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
		variableId: 'zoom_position',
		name: `PTZ - Zoom Position`,
	},
	zoom_position_int: {
		camera: ['All'],
		firmware: ['4', '5'],
		store_state: true,
		variableId: 'zoom_position_int',
		name: `PTZ - Zoom Position (Integer)`,
	},
	zoomSpeed: {
		camera: ['All'],
		firmware: ['4', '5', '6'],
		store_state: true,
		api_endpoint: ['birddogptzsetup'],
		api_variable: ['ZoomSpeed'],
		variableId: 'zoom_speed',
		name: `PTZ - Zoom Speed`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.SPEED_CHANGES, default: 'up', range: { min: 0, max: 7, default: 4 } },
			},
		],
	},
	onScreenMenu: {
		camera: ['All'],
		firmware: ['5', '6'],
		store_state: false,
		name: `PTZ - Toggle OSD Menu`,
		action: [
			{
				camera: ['common'],
				action: {},
			},
		],
	},
	speedControl: {
		camera: ['All'],
		firmware: ['5', '6'],
		store_state: true,
		api_endpoint: ['birddogptzsetup'],
		api_variable: ['SpeedControl'],
		variableId: 'speed_control',
		name: `PTZ - Speed Control`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.SPEED_TYPE, default: 'standard' },
			},
		],
	},

	// Focus
	focus: {
		camera: ['All'],
		firmware: ['4', '5', '6'],
		store_state: false,
		name: 'Focus - Focus Action',
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.FOCUS_CONTROL, default: 'near' },
			},
		],
	},
	focusM: {
		camera: ['All'],
		firmware: ['4', '5', '6'],
		store_state: true,
		api_endpoint: ['birddogptzsetup'],
		api_variable: ['FocusMode'],
		variableId: 'focus_mode',
		name: `Focus - Focus Mode`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.AUTO_FOCUS, default: 'Auto' },
			},
		],
	},

	// Exposure
	ae_response: {
		camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2', 'P240', 'P400', 'P4K'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['birddogexpsetup'],
		api_variable: ['AeResponse'],
		variableId: 'ae_response',
		name: `Exposure - Ae Response`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 1, max: 48, default: 1 } },
			},
		],
	},
	backlight: {
		camera: ['P240', 'P400', 'P4K'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['birddogexpsetup'],
		api_variable: ['BackLight'],
		variableId: 'backlight',
		name: `Exposure - Backlight`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.ON_OFF, default: 'On' },
			},
		],
	},
	bright_level: {
		camera: ['All'],
		firmware: ['4', '5', '6'],
		store_state: true,
		api_endpoint: ['birddogexpsetup'],
		api_variable: ['BrightLevel'],
		variableId: 'bright_level',
		name: `Exposure - Bright Level`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up' },
			},
			{
				camera: ['X1', 'X1Ultra', 'X4Ultra', 'MAX'],
				action: { range: { min: 0, max: 17, default: 0 } },
			},
			{
				camera: ['P100', 'P110', 'P120', 'PF120'],
				action: { range: { min: 0, max: 27, default: 14 } },
			},
			{
				camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
				action: { range: { min: 0, max: 31, default: 16 } },
			},
			{
				camera: ['P240', 'P400'],
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
		variableId: 'exposure_comp',
		name: `Exposure - Exposure Compensation`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.ON_OFF, default: 'Off' },
			},
		],
	},
	expCompLvl: {
		camera: ['All'],
		firmware: ['4', '5', '6'],
		store_state: true,
		api_endpoint: ['birddogexpsetup'],
		api_variable: ['ExpCompLvl'],
		variableId: 'exposure_comp_level',
		name: `Exposure - Exposure Compensation Level`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up' },
			},
			{
				camera: ['P100', 'P110', 'P120', 'PF120', 'X1', 'X1Ultra', 'X4Ultra', 'MAX'],
				action: { range: { min: -7, max: 7, default: 0 } },
			},
			{
				camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2', 'P240', 'P400', 'P4K'],
				action: { range: { min: -128, max: 127, default: 0 } },
			},
		],
	},
	exposure_mode: {
		camera: ['All'],
		firmware: ['4', '5', '6'],
		store_state: true,
		api_endpoint: ['birddogexpsetup'],
		api_variable: ['ExpMode'],
		variableId: 'exposure_mode',
		name: `Exposure - Exposure Mode`,
		action: [
			{
				camera: ['common'],
				action: { default: 'FULL-AUTO' },
			},
			{
				camera: [
					'P100',
					'P110',
					'P120',
					'PF120',
					'P200A4A5',
					'A200GEN1',
					'A200GEN2',
					'A300GEN1',
					'A300GEN2',
					'X1',
					'X1Ultra',
					'X4Ultra',
				],
				action: { choices: CHOICES.EXP_MODE_1 },
			},
			{
				camera: ['P200A2A3'],
				action: { choices: CHOICES.EXP_MODE_2 },
			},
			{
				camera: ['P240', 'P400', 'P4K'],
				action: { choices: CHOICES.EXP_MODE_3 },
			},
		],
	},
	gain: {
		camera: ['All'],
		firmware: ['4', '5', '6'],
		store_state: true,
		api_endpoint: ['birddogexpsetup'],
		api_variable: ['GainLevel'],
		variableId: 'gain',
		name: `Exposure - Gain`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up' },
			},
			{
				camera: ['P100', 'P110', 'P120', 'PF120'],
				action: { value: { choices: CHOICES.GAIN_1, default: 0 } },
			},
			{
				camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
				action: { value: { choices: CHOICES.GAIN_2, default: 1 } },
			},
			{
				camera: ['P240', 'P400', 'P4K'],
				action: { value: { choices: CHOICES.GAIN_3, default: 1 } },
			},
			{
				camera: ['X1', 'X1Ultra', 'X4Ultra', 'MAX'],
				action: { value: { choices: CHOICES.GAIN_4, default: 0 } },
			},
		],
	},
	gain_limit: {
		camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2', 'P240', 'P400', 'P4K'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['birddogexpsetup'],
		api_variable: ['GainLimit'],
		variableId: 'gain_limit',
		name: `Exposure - Gain Limit`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up' },
			},
			{
				camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
				action: { range: { min: 4, max: 15, default: 15 } },
			},
			{
				camera: ['P240', 'P400', 'P4K'],
				action: { range: { min: 4, max: 13, default: 13 } },
			},
		],
	},
	gain_point: {
		camera: ['P240', 'P400', 'P4K'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['birddogexpsetup'],
		api_variable: ['GainPoint'],
		variableId: 'gain_point',
		name: `Exposure - Gain Point`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.ON_OFF, default: 'On' },
			},
		],
	},
	gain_point_position: {
		camera: ['P240', 'P400', 'P4K'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['birddogexpsetup'],
		api_variable: ['GainPointPosition'],
		variableId: 'gain_point_position',
		name: `Exposure - Gain Point Position `,
	},
	high_sensitivity: {
		camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2', 'P240', 'P400', 'P4K'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['birddogexpsetup'],
		api_variable: ['HighSensitivity'],
		variableId: 'high_sensitivity',
		name: `Exposure - High Sensitivity`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.ON_OFF, default: 'On' },
			},
		],
	},
	iris: {
		camera: ['All'],
		firmware: ['4', '5', '6'],
		store_state: true,
		api_endpoint: ['birddogexpsetup'],
		api_variable: ['IrisLevel'],
		variableId: 'iris',
		name: `Exposure - Iris`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up' },
			},
			{
				camera: ['P100', 'P110', 'P120', 'PF120', 'X1', 'X1Ultra', 'X4Ultra', 'MAX'],
				action: { value: { choices: CHOICES.IRIS_1, default: 8, range: { closed: 0, min: 1, max: 13 } } },
			},
			{
				camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
				action: { value: { choices: CHOICES.IRIS_2, default: 12, range: { closed: 0, min: 5, max: 17 } } },
			},
			{
				camera: ['P240', 'P400'],
				action: { value: { choices: CHOICES.IRIS_3, default: 17, range: { closed: 0, min: 5, max: 21 } } },
			},
			{
				camera: ['P4K'],
				action: { value: { choices: CHOICES.IRIS_4, default: 1, range: { closed: 5, min: 6, max: 21 } } },
			},
		],
	},
	shutter_control_overwrite: {
		camera: ['P100', 'P110', 'P120', 'PF120'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['birddogexpsetup'],
		api_variable: ['ShutterControlOverwrite'],
		variableId: 'shutter_control_overwrite',
		name: `Exposure - Shutter Control Overwrite`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.ON_OFF, default: 'On' },
			},
		],
	},
	shutter_max_speed: {
		camera: ['P240', 'P400', 'P4K'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['birddogexpsetup'],
		api_variable: ['ShutterMaxSpeed'],
		variableId: 'shutter_max_speed',
		name: `Exposure - Shutter Max Speed`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 20, max: 33, default: 20 } },
			},
		],
	},
	shutter_min_speed: {
		camera: ['P240', 'P400', 'P4K'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['birddogexpsetup'],
		api_variable: ['ShutterMinSpeed'],
		variableId: 'shutter_min_speed',
		name: `Exposure - Shutter Min Speed`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 16, max: 33, default: 16 } },
			},
		],
	},
	shutter_speed: {
		camera: ['All'],
		firmware: ['4', '5', '6'],
		store_state: true,
		api_endpoint: ['birddogexpsetup'],
		api_variable: ['ShutterSpeed'],
		variableId: 'shutter_speed',
		name: `Exposure - Shutter Speed`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up' },
			},
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
					'X1',
					'X1Ultra',
					'X4Ultra',
				],
				action: {
					shutter_50: CHOICES.SHUTTER_50,
					shutter_60: CHOICES.SHUTTER_60,
					shutter_default: 6,
					range: { min: 0, max: 21 },
				},
			},
			{
				camera: [
					'P100',
					'PF120',
					'P200A2A3',
					'P200A4A5',
					'A200GEN1',
					'A200GEN2',
					'A300GEN1',
					'A300GEN2',
					'P240',
					'P400',
					'P4K',
				],
				action: {
					shutter_24: CHOICES.SHUTTER_4K_24,
					shutter_50: CHOICES.SHUTTER_4K_50,
					shutter_60: CHOICES.SHUTTER_4K_60,
					shutter_default: 18,
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
		variableId: 'shutter_speed_overwrite',
		name: `Exposure - Shutter Speed Overwrite`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 30, max: 110, default: 60 } },
			},
		],
	},
	shutter_table: {
		camera: ['All'],
		firmware: ['4', '5'],
		store_state: true,
	},
	slow_shutter_en: {
		camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2', 'P240', 'P400', 'P4K'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['birddogexpsetup'],
		api_variable: ['SlowShutterEn'],
		variableId: 'slow_shutter_en',
		name: `Exposure - Slow Shutter Enable`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.ON_OFF, default: 'Off' },
			},
		],
	},
	slow_shutter_limit: {
		camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2', 'P240', 'P400', 'P4K'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['birddogexpsetup'],
		api_variable: ['SlowShutterLimit'],
		variableId: 'slow_shutter_limit',
		name: `Exposure - Slow Shutter Limit`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up' },
			},
			{
				camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
				action: {
					shutter_50: CHOICES.SLOW_SHUTTER_50,
					shutter_60: CHOICES.SLOW_SHUTTER_60,
					range: { min: 1, max: 6, default: 3 },
				},
			},
			{
				camera: ['P240', 'P400', 'P4K'],
				action: {
					shutter_24: CHOICES.SLOW_SHUTTER_4K_24,
					shutter_50: CHOICES.SLOW_SHUTTER_4K_50,
					shutter_60: CHOICES.SLOW_SHUTTER_4K_60,
					range: { min: 6, max: 17, default: 12 },
				},
			},
		],
	},
	spotlight: {
		camera: ['P240', 'P400', 'P4K'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['birddogexpsetup'],
		api_variable: ['Spotlight'],
		variableId: 'spotlight',
		name: `Exposure - Spotlight`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.ON_OFF, default: 'Off' },
			},
		],
	},

	// White Balance
	bg: {
		camera: ['P240', 'P400', 'P4K'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['birddogwbsetup'],
		api_variable: ['BG'],
		variableId: 'bg',
		name: `White Balance - BG`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: -99, max: 99, default: 0 } },
			},
		],
	},
	blue_gain: {
		camera: ['All'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['birddogwbsetup'],
		api_variable: ['BlueGain', 'BTuning'],
		variableId: 'blue_gain',
		name: `White Balance - Blue Gain`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 255, default: 128 } },
			},
		],
	},
	br: {
		camera: ['P240', 'P400', 'P4K'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['birddogwbsetup'],
		api_variable: ['BR'],
		variableId: 'br',
		name: `White Balance - BR`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: -99, max: 99, default: 0 } },
			},
		],
	},
	color_temp: {
		camera: ['P100', 'P110', 'P120', 'PF120', 'X1', 'X1Ultra', 'X4Ultra', 'MAX'],
		firmware: ['4', '5', '6'],
		store_state: true,
		api_endpoint: ['birddogwbsetup'],
		api_variable: ['ColorTemp'],
		variableId: 'color_temp',
		name: `White Balance - Color Temp`,
		action: [
			{
				camera: ['P100', 'P110', 'P120', 'PF120'],
				action: {
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					value: { choices: CHOICES.COLOR_TEMP, default: '4200' },
					range: { min: 28, max: 65, default: 42 },
				},
			},
			{
				camera: ['X1', 'X1Ultra', 'X4Ultra', 'MAX'],
				action: {
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					value: { choices: CHOICES.COLOR_TEMP_X_SERIES, default: '4200' },
					range: { min: 25, max: 90, default: 42 },
				},
			},
		],
	},
	gb: {
		camera: ['P240', 'P400', 'P4K'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['birddogwbsetup'],
		api_variable: ['GB'],
		variableId: 'gb',
		name: `White Balance - GB`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: -99, max: 99, default: 0 } },
			},
		],
	},
	gr: {
		camera: ['P240', 'P400', 'P4K'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['birddogwbsetup'],
		api_variable: ['GR'],
		variableId: 'gr',
		name: `White Balance - GR`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: -99, max: 99, default: 0 } },
			},
		],
	},
	level: {
		camera: ['P240', 'P400', 'P4K'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['birddogwbsetup'],
		api_variable: ['Level'],
		variableId: 'level',
		name: `White Balance - Level`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 14, default: 7 } },
			},
		],
	},
	matrix: {
		camera: ['P240', 'P400', 'P4K'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['birddogwbsetup'],
		api_variable: ['Matrix'],
		variableId: 'matrix',
		name: `White Balance - Matrix`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.ON_OFF, default: 'Off' },
			},
		],
	},
	offset: {
		camera: ['P240', 'P400', 'P4K'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['birddogwbsetup'],
		api_variable: ['Offset'],
		variableId: 'offset',
		name: `White Balance - Offset`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 14, default: 7 } },
			},
		],
	},
	phase: {
		camera: ['P240', 'P400', 'P4K'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['birddogwbsetup'],
		api_variable: ['Phase'],
		variableId: 'phase',
		name: `White Balance - Phase`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 14, default: 7 } },
			},
		],
	},
	rb: {
		camera: ['P240', 'P400', 'P4K'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['birddogwbsetup'],
		api_variable: ['RB'],
		variableId: 'rb',
		name: `White Balance - RB`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: -99, max: 99, default: 0 } },
			},
		],
	},
	red_gain: {
		camera: ['All'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['birddogwbsetup'],
		api_variable: ['RedGain', 'RTuning'],
		variableId: 'red_gain',
		name: `White Balance - Red Gain`,
		action: [
			{
				camera: ['common'],
				action: {
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 255, default: 128 },
				},
			},
		],
	},
	rg: {
		camera: ['P240', 'P400', 'P4K'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['birddogwbsetup'],
		api_variable: ['RG'],
		variableId: 'rg',
		name: `White Balance - RG`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: -99, max: 99, default: 0 } },
			},
		],
	},
	select: {
		camera: ['P240', 'P400', 'P4K'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['birddogwbsetup'],
		api_variable: ['Select'],
		variableId: 'select',
		name: `White Balance - Select`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.WB_SELECT, default: 'OFF' },
			},
		],
	},
	speed: {
		camera: ['P240', 'P400', 'P4K'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['birddogwbsetup'],
		api_variable: ['Speed'],
		variableId: 'speed',
		name: `White Balance - Speed`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 1, max: 5, default: 3 } },
			},
		],
	},
	wbOnePush: {
		camera: ['All'],
		firmware: ['5', '6'],
		store_state: true,
		api_endpoint: ['birddogwbsetup'],
		api_variable: ['OnePushTrigger'],
		name: 'White Balance - One Push Trigger',
		action: [
			{
				camera: ['common'],
				action: true,
			},
		],
	},
	wb_mode: {
		camera: ['All'],
		firmware: ['4', '5', '6'],
		store_state: true,
		api_endpoint: ['birddogwbsetup'],
		api_variable: ['WbMode'],
		variableId: 'wb_mode',
		name: `White Balance - White Balance Mode`,
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
				camera: ['X1', 'X1Ultra', 'X4Ultra', 'MAX'],
				action: { choices: CHOICES.WB_MODE_1c },
			},
			{
				camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2', 'P240', 'P400', 'P4K'],
				action: { choices: CHOICES.WB_MODE_2 },
			},
		],
	},

	// Picture Setup
	backlight_com: {
		camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2', 'X1', 'X1Ultra', 'X4Ultra', 'MAX'],
		firmware: ['4', '5', '6'],
		store_state: true,
		api_endpoint: ['birddogpicsetup'],
		api_variable: ['BackLightCom'],
		variableId: 'backlight_com',
		name: `Picture Setup - Backlight Compensation`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.ON_OFF, default: 'Off' },
			},
		],
	},
	chroma_suppress: {
		camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2', 'P240', 'P400', 'P4K'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['birddogpicsetup'],
		api_variable: ['ChromeSuppress'],
		variableId: 'chroma_suppress',
		name: `Picture Setup - Chroma Suppress`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.OFF_L_M_H, default: 'OFF' },
			},
		],
	},
	contrast: {
		camera: ['P100', 'P110', 'P120', 'PF120', 'X1', 'X1Ultra', 'X4Ultra', 'MAX'],
		firmware: ['4', '5', '6'],
		store_state: true,
		api_endpoint: ['birddogpicsetup'],
		api_variable: ['Contrast'],
		variableId: 'contrast',
		name: `Picture Setup - Contrast`,
		action: [
			{
				camera: ['P100', 'P110', 'P120', 'PF120'],
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 15, default: 8 } },
			},
			{
				camera: ['X1', 'X1Ultra', 'X4Ultra', 'MAX'],
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 100, default: 8 } },
			},
		],
	},
	gamma: {
		camera: ['P100', 'P110', 'P120', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['birddogpicsetup'],
		api_variable: ['Gamma'],
		variableId: 'gamma',
		name: `Picture Setup - Gamma`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 4, default: 2 } },
			},
		],
	},
	highlight_comp: {
		camera: [
			'P200A2A3',
			'P200A4A5',
			'A200GEN1',
			'A200GEN2',
			'A300GEN1',
			'A300GEN2',
			'P240',
			'P400',
			'P4K',
			'X1',
			'X1Ultra',
			'X4Ultra',
		],
		firmware: ['4', '5', '6'],
		store_state: true,
		api_endpoint: ['birddogpicsetup'],
		api_variable: ['HighlightComp'],
		variableId: 'highlight_comp',
		name: `Picture Setup - Highlight Compensation`,
		action: [
			{
				camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2', 'P240', 'P400', 'P4K'],
				action: { choices: CHOICES.OFF_L_M_H, default: 'OFF' },
			},
			{
				camera: ['X1', 'X1Ultra', 'X4Ultra', 'MAX'],
				action: { choices: CHOICES.ON_OFF, default: 'Off' },
			},
		],
	},
	highlight_comp_mask: {
		camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['birddogpicsetup'],
		api_variable: ['HighlightCompMask'],
		variableId: 'highlight_comp_mask',
		name: `Picture Setup - Highlight Compensation Mask`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 15, default: 1 } },
			},
		],
	},
	hue: {
		camera: ['P100', 'P110', 'P120', 'PF120', 'X1', 'X1Ultra', 'X4Ultra', 'MAX'],
		firmware: ['4', '5', '6'],
		store_state: true,
		api_endpoint: ['birddogpicsetup'],
		api_variable: ['Hue'],
		variableId: 'hue',
		name: `Picture Setup - Hue`,
		action: [
			{
				camera: ['P100', 'P110', 'P120', 'PF120'],
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 15, default: 8 } },
			},
			{
				camera: ['X1', 'X1Ultra', 'X4Ultra', 'MAX'],
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 100, default: 50 } },
			},
		],
	},
	ir_cutfilter: {
		camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2', 'P240', 'P400', 'P4K'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['birddogpicsetup'],
		api_variable: ['IRCutFilter'],
		variableId: 'ir_cutfilter',
		name: `Picture Setup - IR Cut Filter`,
		action: [
			{
				camera: ['P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
				action: { choices: CHOICES.IR_CUT_FILTER_1, default: 'Auto' },
			},
			{
				camera: ['P240', 'P400', 'P4K'],
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
		variableId: 'low_latency',
		name: 'Picture Setup - Low Latency',
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
		variableId: 'nd_filter',
		name: 'Picture Setup - ND Filter',
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 3, default: 2 } },
			},
		],
	},
	noise_reduction: {
		camera: ['P100', 'P110', 'P120', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['birddogpicsetup'],
		api_variable: ['NoiseReduction'],
		variableId: 'noise_reduction',
		name: `Picture Setup - Noise Reduction`,
		action: [
			{
				camera: ['common'],
				action: {
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					value: { choices: CHOICES.OFF_1_to_5, default: '0' },
					range: { min: 0, max: 5 },
				},
			},
		],
	},
	picFlip: {
		camera: ['All'],
		firmware: ['4', '5', '6'],
		store_state: true,
		api_endpoint: ['birddogpicsetup'],
		api_variable: ['Flip'],
		variableId: 'flip',
		name: `Picture Setup - Flip`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.ON_OFF, default: 'On' },
			},
		],
	},
	picMirror: {
		camera: ['All'],
		firmware: ['4', '5', '6'],
		store_state: true,
		api_endpoint: ['birddogpicsetup'],
		api_variable: ['Mirror'],
		variableId: 'mirror',
		name: `Picture Setup - Mirror`,
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
		variableId: 'bw_effect',
		name: `Picture Setup - BW Effect`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.PICTURE_EFFECT, default: 'BW' },
			},
		],
	},
	saturation: {
		camera: ['P100', 'P110', 'P120', 'PF120', 'X1', 'X1Ultra', 'X4Ultra', 'MAX'],
		firmware: ['4', '5', '6'],
		store_state: true,
		api_endpoint: ['birddogpicsetup'],
		api_variable: ['Color'],
		variableId: 'saturation',
		name: `Picture Setup - Saturation`,
		action: [
			{
				camera: ['P100', 'P110', 'P120', 'PF120'],
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 15, default: 8 } },
			},
			{
				camera: ['X1', 'X1Ultra', 'X4Ultra', 'MAX'],
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 100, default: 50 } },
			},
		],
	},
	sharpness: {
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
			'X1',
			'X1Ultra',
			'X4Ultra',
		],
		firmware: ['4', '5', '6'],
		store_state: true,
		api_endpoint: ['birddogpicsetup'],
		api_variable: ['Sharpness'],
		variableId: 'sharpness',
		name: `Picture Setup - Sharpness`,
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
			{
				camera: ['X1', 'X1Ultra', 'X4Ultra', 'MAX'],
				action: { range: { min: 0, max: 100, default: 0 } },
			},
		],
	},
	stabilizer: {
		camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2', 'P240', 'P400', 'P4K'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['birddogpicsetup'],
		api_variable: ['Stabilizer'],
		variableId: 'stabilizer',
		name: `Picture Setup - Stabilizer`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.ON_OFF, default: 'Off' },
			},
		],
	},
	threed_nr: {
		camera: ['P240', 'P400', 'P4K', 'X1', 'X1Ultra', 'X4Ultra', 'MAX'],
		firmware: ['4', '5', '6'],
		store_state: true,
		api_endpoint: ['birddogpicsetup'],
		api_variable: ['ThreeDNR'],
		variableId: 'threed_nr',
		name: `Picture Setup - 3D Noise Reduction`,
		action: [
			{
				camera: ['P240', 'P400', 'P4K'],
				action: {
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					value: { choices: CHOICES.OFF_1_to_5, default: '0' },
					range: { min: 0, max: 5 },
				},
			},
			{
				camera: ['X1', 'X1Ultra', 'X4Ultra', 'MAX'],
				action: {
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					value: { choices: CHOICES.OFF_1_to_5, default: '0' },
					range: { min: 0, max: 100 },
				},
			},
		],
	},
	twod_nr: {
		camera: ['P240', 'P400', 'P4K', 'X1', 'X1Ultra', 'X4Ultra', 'MAX'],
		firmware: ['4', '5', '6'],
		store_state: true,
		api_endpoint: ['birddogpicsetup'],
		api_variable: ['TWODNR'],
		variableId: 'twod_nr',
		name: `Picture Setup - 2D Noise Reduction`,
		action: [
			{
				camera: ['P240', 'P400', 'P4K'],
				action: {
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					value: { choices: CHOICES.OFF_1_to_5, default: '0' },
					range: { min: 0, max: 5 },
				},
			},
			{
				camera: ['X1', 'X1Ultra', 'X4Ultra', 'MAX'],
				action: {
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					value: { choices: CHOICES.OFF_1_to_5, default: '0' },
					range: { min: 0, max: 100 },
				},
			},
		],
	},
	wide_dynamic_range: {
		camera: ['P100', 'P110', 'P120', 'PF120'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['birddogpicsetup'],
		api_variable: ['WideDynamicRange'],
		variableId: 'wide_dynamic_range',
		name: `Picture Setup - Wide Dynamic Range`,
		action: [
			{
				camera: ['common'],
				action: {
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					value: { choices: CHOICES.OFF_1_to_6, default: '0' },
					range: { min: 0, max: 6 },
				},
			},
		],
	},
	wdr_enable: {
		camera: ['X1', 'X1Ultra', 'X4Ultra', 'MAX'],
		firmware: ['6'],
		store_state: true,
		api_endpoint: ['birddogpicsetup'],
		api_variable: ['WDREnable'],
		variableId: 'wdr_enable',
		name: `Picture Setup - Wide Dynamic Range`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.ON_OFF, default: 'Off' },
			},
		],
	},
	brightnessPic: {
		camera: ['X1', 'X1Ultra', 'X4Ultra', 'MAX'],
		firmware: ['6'],
		store_state: true,
		api_endpoint: ['birddogpicsetup'],
		api_variable: ['Brightness'],
		variableId: 'brightness',
		name: 'Picture Setup - Brightness',
		action: [
			{
				camera: ['X1', 'X1Ultra', 'X4Ultra', 'MAX'],
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 100, default: 50 } },
			},
		],
	},
	deflicker: {
		camera: ['X1', 'X1Ultra', 'X4Ultra', 'MAX'],
		firmware: ['6'],
		store_state: true,
		api_endpoint: ['birddogpicsetup'],
		api_variable: ['DeFlicker'],
		variableId: 'deflicker',
		name: 'Picture Setup - DeFlicker',
		action: [
			{
				camera: ['X1', 'X1Ultra', 'X4Ultra', 'MAX'],
				action: { choices: CHOICES.DEFLICKER, default: 'default' },
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
		variableId: 'cm_blue_gain',
		name: 'Color Matrix - Blue Gain',
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 64, default: 32 } },
			},
		],
	},
	cm_blue_hue: {
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
			'X1',
			'X1Ultra',
			'X4Ultra',
		],
		firmware: ['4', '5', '6'],
		store_state: true,
		api_endpoint: ['birddogcmsetup'],
		api_variable: ['cam_cm_blu_hue', 'BlueHue'],
		variableId: 'cm_blue_hue',
		name: 'Color Matrix - Blue Hue',
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
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 64, default: 32 } },
			},
			{
				camera: ['X1', 'X1Ultra', 'X4Ultra', 'MAX'],
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 100, default: 50 } },
			},
		],
	},
	cm_color_gain: {
		camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['birddogcmsetup'],
		api_variable: ['ColourGain'],
		variableId: 'cm_color_gain',
		name: 'Color Matrix - Color Gain',
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
		variableId: 'cm_cyan_gain',
		name: 'Color Matrix - Cyan Gain',
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 64, default: 32 } },
			},
		],
	},
	cm_cyan_hue: {
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
			'X1',
			'X1Ultra',
			'X4Ultra',
		],
		firmware: ['4', '5', '6'],
		store_state: true,
		api_endpoint: ['birddogcmsetup'],
		api_variable: ['cam_cm_cya_hue', 'CyanHue'],
		variableId: 'cm_cyan_hue',
		name: 'Color Matrix - Cyan Hue',
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
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 64, default: 32 } },
			},
			{
				camera: ['X1', 'X1Ultra', 'X4Ultra', 'MAX'],
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 100, default: 50 } },
			},
		],
	},
	cm_green_gain: {
		camera: ['P100', 'P110', 'P120', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['birddogcmsetup'],
		api_variable: ['cam_cm_gre_gain', 'GreenGain'],
		variableId: 'cm_green_gain',
		name: 'Color Matrix - Green Gain',
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 64, default: 32 } },
			},
		],
	},
	cm_green_hue: {
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
			'X1',
			'X1Ultra',
			'X4Ultra',
		],
		firmware: ['4', '5', '6'],
		store_state: true,
		api_endpoint: ['birddogcmsetup'],
		api_variable: ['cam_cm_gre_hue', 'GreenHue'],
		variableId: 'cm_green_hue',
		name: 'Color Matrix - Green Hue',
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
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 64, default: 32 } },
			},
			{
				camera: ['X1', 'X1Ultra', 'X4Ultra', 'MAX'],
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 100, default: 50 } },
			},
		],
	},
	cm_hue_phase: {
		camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['birddogcmsetup'],
		api_variable: ['HuePhase'],
		variableId: 'cm_hue_phase',
		name: 'Color Matrix - Hue Phase',
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
		variableId: 'cm_mag_gain',
		name: 'Color Matrix - Magenta Gain',
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 64, default: 32 } },
			},
		],
	},
	cm_mag_hue: {
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
			'X1',
			'X1Ultra',
			'X4Ultra',
		],
		firmware: ['4', '5', '6'],
		store_state: true,
		api_endpoint: ['birddogcmsetup'],
		api_variable: ['cam_cm_mag_hue', 'MagHue'],
		variableId: 'cm_mag_hue',
		name: 'Color Matrix - Magenta Hue',
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
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 64, default: 32 } },
			},
			{
				camera: ['X1', 'X1Ultra', 'X4Ultra', 'MAX'],
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 100, default: 50 } },
			},
		],
	},
	cm_red_gain: {
		camera: ['P100', 'P110', 'P120', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['birddogcmsetup'],
		api_variable: ['cam_cm_red_gain', 'RedGain'],
		variableId: 'cm_red_gain',
		name: 'Color Matrix - Red Gain',
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 64, default: 32 } },
			},
		],
	},
	cm_red_hue: {
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
			'X1',
			'X1Ultra',
			'X4Ultra',
		],
		firmware: ['4', '5', '6'],
		store_state: true,
		api_endpoint: ['birddogcmsetup'],
		api_variable: ['cam_cm_red_hue', 'RedHue'],
		variableId: 'cm_red_hue',
		name: 'Color Matrix - Red Hue',
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
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 64, default: 32 } },
			},
			{
				camera: ['X1', 'X1Ultra', 'X4Ultra', 'MAX'],
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 100, default: 50 } },
			},
		],
	},
	cm_yellow_gain: {
		camera: ['P100', 'P110', 'P120', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['birddogcmsetup'],
		api_variable: ['cam_cm_yel_gain', 'YellowGain'],
		variableId: 'cm_yellow_gain',
		name: 'Color Matrix - Yellow Gain',
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 64, default: 32 } },
			},
		],
	},
	cm_yellow_hue: {
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
			'X1',
			'X1Ultra',
			'X4Ultra',
		],
		firmware: ['4', '5', '6'],
		store_state: true,
		api_endpoint: ['birddogcmsetup'],
		api_variable: ['cam_cm_yel_hue', 'YellowHue'],
		variableId: 'cm_yellow_hue',
		name: 'Color Matrix - Yellow Hue',
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
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 64, default: 32 } },
			},
			{
				camera: ['X1', 'X1Ultra', 'X4Ultra', 'MAX'],
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 100, default: 50 } },
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
		variableId: 'brightness',
		name: 'Advanced Setup - Brightness',
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
		variableId: 'brightness_comp',
		name: 'Advanced Setup - Brightness Comp',
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
		variableId: 'comp_level',
		name: 'Advanced Setup - Comp Level',
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
		variableId: 'gamma_offset',
		name: 'Advanced Setup - Gamma Offset',
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
		variableId: 'high_resolution',
		name: 'Advanced Setup - High Resolution',
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
		variableId: 'video_enhancement',
		name: 'Advanced Setup - Video Enhancement',
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.ON_OFF, default: 'Off' },
			},
		],
	},
	af_zone: {
		camera: ['X1', 'X1Ultra', 'X4Ultra', 'MAX'],
		firmware: ['6'],
		store_state: true,
		api_endpoint: ['birddogadvancesetup'],
		api_variable: ['AFZone'],
		variableId: 'af_zone',
		name: 'Advanced Setup - AF Zone',
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.AF_ZONE, default: 'ALL' },
			},
		],
	},
	scene: {
		camera: ['X1', 'X1Ultra', 'X4Ultra', 'MAX'],
		firmware: ['6'],
		store_state: true,
		api_endpoint: ['birddogadvancesetup'],
		api_variable: ['Scene'],
		variableId: 'scene',
		name: 'Advanced Setup - Scene',
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.SCENE, default: 'Normal' },
			},
		],
	},
	af_sensitivity: {
		camera: ['X1', 'X1Ultra', 'X4Ultra', 'MAX'],
		firmware: ['6'],
		store_state: true,
		api_endpoint: ['birddogadvancesetup'],
		api_variable: ['AFSensitivity'],
		variableId: 'af_zone',
		name: 'Advanced Setup - AF Sensitivity',
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.AF_SENSITIVITY, default: 'Middle' },
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
		variableId: 'aux',
		name: 'External Setup - Aux',
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
		variableId: 'rain_wiper',
		name: 'External Setup - Rain Wiper',
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
		variableId: 'v12vout',
		name: 'External Setup - 12v Out',
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.ON_OFF, default: 'Off' },
			},
		],
	},

	// Detail Setup
	bandwidth: {
		camera: ['P240', 'P400', 'P4K'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['birddogdetsetup'],
		api_variable: ['Bandwidth'],
		variableId: 'bandwidth',
		name: `Detail Setup - Bandwidth`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.BANDWIDTH_4K, default: 'DEFAULT' },
			},
		],
	},
	bw_balance: {
		camera: ['P240', 'P400', 'P4K'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['birddogdetsetup'],
		api_variable: ['BwBalance'],
		variableId: 'bw_balance',
		name: `Detail Setup - BW Balance`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.BW_BALANCE_4K, default: 'TYPE1' },
			},
		],
	},
	crispening: {
		camera: ['P240', 'P400', 'P4K'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['birddogdetsetup'],
		api_variable: ['Crispening'],
		variableId: 'crispening',
		name: `Detail Setup - Crispening`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 7, default: 4 } },
			},
		],
	},
	detail: {
		camera: ['P240', 'P400', 'P4K'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['birddogdetsetup'],
		api_variable: ['Detail'],
		variableId: 'detail',
		name: `Detail Setup - Detail`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.ON_OFF, default: 'Off' },
			},
		],
	},
	highlight_detail: {
		camera: ['P240', 'P400', 'P4K'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['birddogdetsetup'],
		api_variable: ['HighLightDetail'],
		variableId: 'highlight_detail',
		name: `Detail Setup - Highlight Detail`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 4, default: 0 } },
			},
		],
	},
	hv_balance: {
		camera: ['P240', 'P400', 'P4K'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['birddogdetsetup'],
		api_variable: ['HvBalance'],
		variableId: 'hv_balance',
		name: `Detail Setup - Hv Balance`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: -2, max: 2, default: 0 } },
			},
		],
	},
	limit: {
		camera: ['P240', 'P400', 'P4K'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['birddogdetsetup'],
		api_variable: ['Limit'],
		variableId: 'limit',
		name: `Detail Setup - Limit`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 7, default: 4 } },
			},
		],
	},
	super_low: {
		camera: ['P240', 'P400', 'P4K'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['birddogdetsetup'],
		api_variable: ['SuperLow'],
		variableId: 'super_low',
		name: `Detail Setup - Super Low`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 7, default: 4 } },
			},
		],
	},

	// Gamma Setup
	black_gamma_level: {
		camera: ['P240', 'P400', 'P4K'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['birddoggammasetup'],
		api_variable: ['BlackGammaLevel'],
		variableId: 'black_gamma_level',
		name: `Gamma Setup - Black Gamma Level`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 14, default: 7 } },
			},
		],
	},
	black_level: {
		camera: ['P240', 'P400', 'P4K'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['birddoggammasetup'],
		api_variable: ['BlackLevel'],
		variableId: 'black_level',
		name: `Gamma Setup - Black Level`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 96, default: 48 } },
			},
		],
	},
	black_level_range: {
		camera: ['P240', 'P400', 'P4K'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['birddoggammasetup'],
		api_variable: ['BlackLevelRange'],
		variableId: 'black_level_range',
		name: `Gamma Setup - Black Level Range`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.L_Mid_H, default: 'LOW' },
			},
		],
	},
	effect: {
		camera: ['P240', 'P400', 'P4K'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['birddoggammasetup'],
		api_variable: ['Effect'],
		variableId: 'effect',
		name: `Gamma Setup - Effect`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: -3, max: 3, default: 0 } },
			},
		],
	},
	gamma_setup_level: {
		camera: ['P240', 'P400', 'P4K'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['birddoggammasetup'],
		api_variable: ['Level'],
		variableId: 'gamma_setup_level',
		name: `Gamma Setup - Level`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 14, default: 0 } },
			},
		],
	},
	gamma_setup_offset: {
		camera: ['P240', 'P400', 'P4K'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['birddoggammasetup'],
		api_variable: ['Offset'],
		variableId: 'gamma_setup_offset',
		name: `Gamma Setup - Offset`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: -64, max: 64, default: 0 } },
			},
		],
	},
	pattern: {
		camera: ['P240', 'P400', 'P4K'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['birddoggammasetup'],
		api_variable: ['Pattern'],
		variableId: 'pattern',
		name: `Gamma Setup - Pattern`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 512, default: 256 } },
			},
		],
	},
	pattern_fine: {
		camera: ['P240', 'P400', 'P4K'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['birddoggammasetup'],
		api_variable: ['PatternFine'],
		variableId: 'pattern_fine',
		name: `Gamma Setup - Pattern Fine`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.UP_DOWN_VALUE, default: 'up', range: { min: 0, max: 9, default: 5 } },
			},
		],
	},
	settings: {
		camera: ['P240', 'P400', 'P4K'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['birddoggammasetup'],
		api_variable: ['Settings'],
		variableId: 'settings',
		name: `Gamma Setup - Settings`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.GAMMA_SETTINGS, default: 'PATTERN' },
			},
		],
	},
	visibility_enhancer: {
		camera: ['P240', 'P400', 'P4K'],
		firmware: ['4', '5'],
		store_state: true,
		api_endpoint: ['birddoggammasetup'],
		api_variable: ['VisibilityEnhancer'],
		variableId: 'visibility_enhancer',
		name: `Gamma Setup - Visibilty Enhancer`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.ON_OFF, default: 'Off' },
			},
		],
	},

	// BirdDog Scope
	scope_gamma_gain: {
		camera: ['All'],
		firmware: ['5'],
		store_state: true,
		api_endpoint: ['birddogscope'],
		api_variable: ['GammaGain'],
		variableId: 'scope_gamma_gain',
		name: `Scope - Gamma Gain`,
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
		variableId: 'scope_mode',
		name: `Scope - Mode`,
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
		variableId: 'scope_position',
		name: `Scope - Position`,
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
		variableId: 'scope_preview',
		name: `Scope - Preview`,
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
		variableId: 'scope_program',
		name: `Scope - Program`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.ON_OFF, default: 'Off' },
			},
		],
	},
	scope_size: {
		camera: ['All'],
		firmware: ['5'],
		store_state: true,
		api_endpoint: ['birddogscope'],
		api_variable: ['DoubleSizeEnable'],
		variableId: 'scope_size',
		name: `Scope - Size`,
		action: [
			{
				camera: ['common'],
				action: { choices: CHOICES.SCOPE_SIZE, default: 'Off' },
			},
		],
	},
	scope_transparency: {
		camera: ['All'],
		firmware: ['5'],
		store_state: true,
		api_endpoint: ['birddogscope'],
		api_variable: ['TransparencyEnable'],
		variableId: 'scope_transparency',
		name: `Scope - Transparency`,
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
		variableId: 'avbr',
		name: `Dashboard - Average Bitrate`,
	},

	aud_ch: {
		camera: ['All'],
		firmware: ['5'],
		store_state: true,
		api_endpoint: ['WebSocket'],
		api_variable: ['aud_ch'],
		variableId: 'aud_ch',
		name: `Dashboard - Audio Channels`,
	},

	aud_sr: {
		camera: ['All'],
		firmware: ['5'],
		store_state: true,
		api_endpoint: ['WebSocket'],
		api_variable: ['aud_sr'],
		variableId: 'aud_sr',
		name: `Dashboard - Audio Sample Rate`,
	},

	aud_stat: {
		camera: ['All'],
		firmware: ['5'],
		store_state: true,
		api_endpoint: ['WebSocket'],
		api_variable: ['aud_stat'],
		variableId: 'aud_stat',
		name: `Dashboard - Audio Status`,
	},

	dashboard_vid_status: {
		camera: ['All'],
		firmware: ['5'],
		store_state: true,
		api_endpoint: ['WebSocket'],
		api_variable: ['dashboard_vid_status'],
		variableId: 'dashboard_vid_status',
		name: `Dashboard - Status`,
	},

	dev_mode: {
		camera: ['All'],
		firmware: ['5'],
		store_state: true,
		api_endpoint: ['WebSocket'],
		api_variable: ['dev_mode'],
		variableId: 'dev_mode',
		name: `Dashboard - Device Mode`,
	},

	gen_status: {
		camera: ['All'],
		firmware: ['5'],
		store_state: true,
		api_endpoint: ['WebSocket'],
		api_variable: ['gen_status'],
		variableId: 'gen_status',
		name: `Dashboard - Genlock Status`,
	},

	mcu_ver: {
		camera: ['All'],
		firmware: ['5'],
		store_state: true,
		api_endpoint: ['WebSocket'],
		api_variable: ['mcu_ver'],
		variableId: 'mcu_ver',
		name: `Dashboard - MCU Version`,
	},

	net_band_perc: {
		camera: ['All'],
		firmware: ['5'],
		store_state: true,
		api_endpoint: ['WebSocket'],
		api_variable: ['net_band_perc'],
		variableId: 'net_band_perc',
		name: `Dashboard - Network Bandwidth`,
	},

	net_mode: {
		camera: ['All'],
		firmware: ['5'],
		store_state: true,
		api_endpoint: ['WebSocket'],
		api_variable: ['net_mode'],
		variableId: 'net_mode',
		name: `Dashboard - Network Mode`,
	},

	net_speed: {
		camera: ['All'],
		firmware: ['5'],
		store_state: true,
		api_endpoint: ['WebSocket'],
		api_variable: ['net_speed'],
		variableId: 'net_speed',
		name: `Dashboard - Network Speed`,
	},

	src_stat: {
		camera: ['All'],
		firmware: ['5'],
		store_state: true,
		api_endpoint: ['WebSocket'],
		api_variable: ['src_stat'],
		variableId: 'src_stat',
		name: `Dashboard - Source Status`,
	},

	sys_info_perc: {
		camera: ['All'],
		firmware: ['5'],
		store_state: true,
		api_endpoint: ['WebSocket'],
		api_variable: ['sys_info_perc'],
		variableId: 'sys_info_perc',
		name: `Dashboard - CPU Usage`,
	},

	vid_fmt: {
		camera: ['All'],
		firmware: ['5'],
		store_state: true,
		api_endpoint: ['WebSocket'],
		api_variable: ['vid_fmt'],
		variableId: 'vid_fmt',
		name: `Dashboard - Video Format`,
	},

	vid_fr: {
		camera: ['All'],
		firmware: ['5'],
		store_state: true,
		api_endpoint: ['WebSocket'],
		api_variable: ['vid_fr'],
		variableId: 'vid_fr',
		name: `Dashboard - Video Frame Rate`,
	},

	vid_res: {
		camera: ['All'],
		firmware: ['5'],
		store_state: true,
		api_endpoint: ['WebSocket'],
		api_variable: ['vid_res'],
		variableId: 'vid_res',
		name: `Dashboard - Video Resolution`,
	},

	vid_sra: {
		camera: ['All'],
		firmware: ['5'],
		store_state: true,
		api_endpoint: ['WebSocket'],
		api_variable: ['vid_sra'],
		variableId: 'vid_sra',
		name: `Dashboard - Video Sample Rate`,
	},

	vid_str_name: {
		camera: ['All'],
		firmware: ['5'],
		store_state: true,
		api_endpoint: ['WebSocket'],
		api_variable: ['vid_str_name'],
		variableId: 'vid_str_name',
		name: `Dashboard - NDI Video Stream Name`,
	},

	// Other Actions
	custom: {
		camera: ['All'],
		firmware: ['4', '5'],
		name: 'Custom Visca Command',
		action: [
			{
				camera: ['common'],
				action: true,
			},
		],
	},
}
