const CHOICES = require('./choices.js')

module.exports = {
	// Includes all Actions / API Calls / Variables / Feedbacks
	MODELS: [
		{
			group: 'variables',
			//Basic Device Information
			firmware: [
				'P100',
				'PF120',
				'P200_A2_A3',
				'P200_A4_A5',
				'A200_GEN1',
				'A200_GEN2',
				'A300_GEN1',
				'A300_GEN2',
				'P400',
				'P4K',
			],
			model: [
				'P100',
				'PF120',
				'P200_A2_A3',
				'P200_A4_A5',
				'A200_GEN1',
				'A200_GEN2',
				'A300_GEN1',
				'A300_GEN2',
				'P400',
				'P4K',
			],
			standby: [
				'P100',
				'PF120',
				'P200_A2_A3',
				'P200_A4_A5',
				'A200_GEN1',
				'A200_GEN2',
				'A300_GEN1',
				'A300_GEN2',
				'P400',
				'P4K',
			],
			status: [
				'P100',
				'PF120',
				'P200_A2_A3',
				'P200_A4_A5',
				'A200_GEN1',
				'A200_GEN2',
				'A300_GEN1',
				'A300_GEN2',
				'P400',
				'P4K',
			],
			//Device Settings
			audio_in_gain: [
				'P100',
				'PF120',
				'P200_A2_A3',
				'P200_A4_A5',
				'A200_GEN1',
				'A200_GEN2',
				'A300_GEN1',
				'A300_GEN2',
				'P400',
				'P4K',
			],
			audio_out_gain: [
				'P100',
				'PF120',
				'P200_A2_A3',
				'P200_A4_A5',
				'A200_GEN1',
				'A200_GEN2',
				'A300_GEN1',
				'A300_GEN2',
				'P400',
				'P4K',
			],
			audio_output: [
				'P100',
				'PF120',
				'P200_A2_A3',
				'P200_A4_A5',
				'A200_GEN1',
				'A200_GEN2',
				'A300_GEN1',
				'A300_GEN2',
				'P400',
				'P4K',
			],
			video_output: [
				'P400',
				'P4K',
			],
			//NDI Encode
			bandwidth: [
				'P100',
				'PF120',
				'P200_A2_A3',
				'P200_A4_A5',
				'A200_GEN1',
				'A200_GEN2',
				'A300_GEN1',
				'A300_GEN2',
				'P400',
				'P4K',
			],
			bandwidth_mode: [
				'P100',
				'PF120',
				'P200_A2_A3',
				'P200_A4_A5',
				'A200_GEN1',
				'A200_GEN2',
				'A300_GEN1',
				'A300_GEN2',
				'P400',
				'P4K',
			],
			ndi_audio: [
				'P100',
				'PF120',
				'P200_A2_A3',
				'P200_A4_A5',
				'A200_GEN1',
				'A200_GEN2',
				'A300_GEN1',
				'A300_GEN2',
				'P400',
				'P4K',
			],
			ndi_group: [
				'P100',
				'PF120',
				'P200_A2_A3',
				'P200_A4_A5',
				'A200_GEN1',
				'A200_GEN2',
				'A300_GEN1',
				'A300_GEN2',
				'P400',
				'P4K',
			],
			ndi_group_name: [
				'P100',
				'PF120',
				'P200_A2_A3',
				'P200_A4_A5',
				'A200_GEN1',
				'A200_GEN2',
				'A300_GEN1',
				'A300_GEN2',
				'P400',
				'P4K',
			],
			stream_name: [
				'P100',
				'PF120',
				'P200_A2_A3',
				'P200_A4_A5',
				'A200_GEN1',
				'A200_GEN2',
				'A300_GEN1',
				'A300_GEN2',
				'P400',
				'P4K',
			],
			tally_mode: [
                'PF120',
                'P200_A2_A3',
                'P200_A4_A5',
                'P400',
                'P4K'
            ],
			transmit_method: [
				'P100',
				'PF120',
				'P200_A2_A3',
				'P200_A4_A5',
				'A200_GEN1',
				'A200_GEN2',
				'A300_GEN1',
				'A300_GEN2',
				'P400',
				'P4K',
			],
			video_format: [
				'P100',
				'PF120',
				'P200_A2_A3',
				'P200_A4_A5',
				'A200_GEN1',
				'A200_GEN2',
				'A300_GEN1',
				'A300_GEN2',
				'P400',
				'P4K',
			],
			//NDI Decode
			//NDI Finder
			ndi_discovery_server: [
				'P100',
				'PF120',
				'P200_A2_A3',
				'P200_A4_A5',
				'A200_GEN1',
				'A200_GEN2',
				'A300_GEN1',
				'A300_GEN2',
				'P400',
				'P4K',
			],
			ndi_discovery_server_ip: [
				'P100',
				'PF120',
				'P200_A2_A3',
				'P200_A4_A5',
				'A200_GEN1',
				'A200_GEN2',
				'A300_GEN1',
				'A300_GEN2',
				'P400',
				'P4K',
			],
			//PTZ
			pan_speed: [
				'P100',
				'P200_A2_A3',
				'P200_A4_A5',
				'A200_GEN1',
				'A200_GEN2',
				'A300_GEN1',
				'A300_GEN2',
				'P400',
				'P4K',
			],
			tilt_speed: [
				'P100',
				'P200_A2_A3',
				'P200_A4_A5',
				'A200_GEN1',
				'A200_GEN2',
				'A300_GEN1',
				'A300_GEN2',
				'P400',
				'P4K',
			],
			zoom_speed: [
				'P100',
				'PF120',
				'P200_A2_A3',
				'P200_A4_A5',
				'A200_GEN1',
				'A200_GEN2',
				'A300_GEN1',
				'A300_GEN2',
				'P400',
				'P4K',
			],
			//Exposure
			ae_response: [
                'P200_A2_A3',
                'P200_A4_A5',
                'A200_GEN1',
                'A200_GEN2',
                'A300_GEN1',
                'A300_GEN2',
                'P400',
                'P4K'
            ],
			backlight: [
                'P400',
                'P4K'
            ],
			bright_level: [
				'P100',
				'PF120',
				'P200_A2_A3',
				'P200_A4_A5',
				'A200_GEN1',
				'A200_GEN2',
				'A300_GEN1',
				'A300_GEN2',
				'P400',
				'P4K',
			],
			exposure_comp: [
				'P100',
				'PF120',
				'P200_A2_A3',
				'P200_A4_A5',
				'A200_GEN1',
				'A200_GEN2',
				'A300_GEN1',
				'A300_GEN2',
				'P400',
				'P4K',
			],
			exposure_comp_level: [
				'P100',
				'PF120',
				'P200_A2_A3',
				'P200_A4_A5',
				'A200_GEN1',
				'A200_GEN2',
				'A300_GEN1',
				'A300_GEN2',
				'P400',
				'P4K',
			],
			exposure_mode: [
				'P100',
				'PF120',
				'P200_A2_A3',
				'P200_A4_A5',
				'A200_GEN1',
				'A200_GEN2',
				'A300_GEN1',
				'A300_GEN2',
				'P400',
				'P4K',
			],
			gain: [
				'P100',
				'PF120',
				'P200_A2_A3',
				'P200_A4_A5',
				'A200_GEN1',
				'A200_GEN2',
				'A300_GEN1',
				'A300_GEN2',
				'P400',
				'P4K',
			],
			gain_limit: [
                'P200_A2_A3',
                'P200_A4_A5',
                'A200_GEN1',
                'A200_GEN2',
                'A300_GEN1',
                'A300_GEN2',
                'P400',
                'P4K'
            ],
			gain_point: [
                'P400',
                'P4K'
            ],
			gain_point_position: [
                'P400',
                'P4K'
            ],
			high_sensitivity: [
                'P200_A2_A3',
                'P200_A4_A5',
                'A200_GEN1',
                'A200_GEN2',
                'A300_GEN1',
                'A300_GEN2',
                'P400',
                'P4K'
            ],
			iris: [
				'P100',
				'PF120',
				'P200_A2_A3',
				'P200_A4_A5',
				'A200_GEN1',
				'A200_GEN2',
				'A300_GEN1',
				'A300_GEN2',
				'P400',
				'P4K',
			],
			shutter_control_overwrite: [
                'P100',
                'PF120'
            ],
			shutter_max_speed: [
                'P400',
                'P4K'
            ],
			shutter_min_speed: [
                'P400',
                'P4K'
            ],
			shutter_speed: [
				'P100',
				'PF120',
				'P200_A2_A3',
				'P200_A4_A5',
				'A200_GEN1',
				'A200_GEN2',
				'A300_GEN1',
				'A300_GEN2',
				'P400',
				'P4K',
			],
			shutter_speed_overwrite: [
                'P100',
                'PF120'
            ],
			slow_shutter: [
                'P200_A2_A3',
                'P200_A4_A5',
                'A200_GEN1',
                'A200_GEN2',
                'A300_GEN1',
                'A300_GEN2',
                'P400',
                'P4K'],
			slow_shutter_limit: [
				'P200_A2_A3',
				'P200_A4_A5',
				'A200_GEN1',
				'A200_GEN2',
				'A300_GEN1',
				'A300_GEN2',
				'P400',
				'P4K',
			],
			spotlight: [
                'P400',
                'P4K'
            ],
			//White Balance
			wb_blue_gain: [
				'P100',
				'PF120',
				'P200_A2_A3',
				'P200_A4_A5',
				'A200_GEN1',
				'A200_GEN2',
				'A300_GEN1',
				'A300_GEN2',
				'P400',
				'P4K',
			],
			color_temp: [
                'P100',
                'PF120'
            ],
			wb_red_gain: [
				'P100',
				'PF120',
				'P200_A2_A3',
				'P200_A4_A5',
				'A200_GEN1',
				'A200_GEN2',
				'A300_GEN1',
				'A300_GEN2',
				'P400',
				'P4K',
			],
			wb_mode: [
				'P100',
				'PF120',
				'P200_A2_A3',
				'P200_A4_A5',
				'A200_GEN1',
				'A200_GEN2',
				'A300_GEN1',
				'A300_GEN2',
				'P400',
				'P4K',
			],
			//Picture Settings
			backlight_com: [
                'P200_A2_A3',
                'P200_A4_A5',
                'A200_GEN1',
                'A200_GEN2',
                'A300_GEN1',
                'A300_GEN2'
            ],
			chroma_suppress: [
                'P200_A2_A3',
                'P200_A4_A5',
                'A200_GEN1',
                'A200_GEN2',
                'A300_GEN1',
                'A300_GEN2',
                'P400',
                'P4K'
            ],
			contrast: [
                'P100',
                'PF120'
            ],
			effect: [
                'P100',
                'PF120',
                'P200_A2_A3',
                'P200_A4_A5',
                'A200_GEN1',
                'A200_GEN2',
                'A300_GEN1',
                'A300_GEN2'],
			flip: [
				'P100',
				'PF120',
				'P200_A2_A3',
				'P200_A4_A5',
				'A200_GEN1',
				'A200_GEN2',
				'A300_GEN1',
				'A300_GEN2',
				'P400',
				'P4K',
			],
			gamma: [
                'P100',
                'PF120',
                'P200_A2_A3',
                'P200_A4_A5',
                'A200_GEN1',
                'A200_GEN2',
                'A300_GEN1',
                'A300_GEN2'],
			hlc_mode: [
                'P200_A2_A3',
                'P200_A4_A5',
                'A200_GEN1',
                'A200_GEN2',
                'A300_GEN1',
                'A300_GEN2',
                'P400',
                'P4K'],
			hue: [
                'P100',
                'PF120'
            ],
			ir_cutfilter: [
                'P200_A2_A3',
                'P200_A4_A5',
                'A200_GEN1',
                'A200_GEN2',
                'A300_GEN1',
                'A300_GEN2',
                'P400',
                'P4K'
            ],
			mirror: [
				'P100',
				'PF120',
				'P200_A2_A3',
				'P200_A4_A5',
				'A200_GEN1',
				'A200_GEN2',
				'A300_GEN1',
				'A300_GEN2',
				'P400',
				'P4K',
			],
			noise_reduction: [
				'P100',
				'PF120',
				'P200_A2_A3',
				'P200_A4_A5',
				'A200_GEN1',
				'A200_GEN2',
				'A300_GEN1',
				'A300_GEN2',
			],
			saturation: [
                'P100',
                'PF120'
            ],
			sharpness: [
                'P100',
                'PF120',
                'P200_A2_A3',
                'P200_A4_A5',
                'A200_GEN1',
                'A200_GEN2',
                'A300_GEN1',
                'A300_GEN2'
            ],
			stabilizer: [
                'P200_A2_A3',
                'P200_A4_A5',
                'A200_GEN1',
                'A200_GEN2',
                'A300_GEN1',
                'A300_GEN2',
                'P400',
                'P4K'
            ],
			twod_nr: [
                'P400',
                'P4K'
            ],
			threed_nr: [
                'P400',
                'P4K'
            ],
			wide_dynamic_range: [
                'P100',
                'PF120'
            ],
			low_latency: [
                'P200_A4_A5'
            ],
			nd_filter: [
                'P4K'
            ],
			//Focus Settings
			af_mode: [
				'P100',
				'PF120',
				'P200_A2_A3',
				'P200_A4_A5',
				'A200_GEN1',
				'A200_GEN2',
				'A300_GEN1',
				'A300_GEN2',
				'P400',
				'P4K',
			],
		},
		{
			group: 'apicalls',
			//Basic Device Information
			about: [
				'P100',
				'PF120',
				'P200_A2_A3',
				'P200_A4_A5',
				'A200_GEN1',
				'A200_GEN2',
				'A300_GEN1',
				'A300_GEN2',
				'P400',
				'P4K',
			],
			//Device Settings
			analogaudiosetup: [
				'P100',
				'PF120',
				'P200_A2_A3',
				'P200_A4_A5',
				'A200_GEN1',
				'A200_GEN2',
				'A300_GEN1',
				'A300_GEN2',
				'P400',
				'P4K',
			],
			videooutputinterface: [
                'P400',
                'P4K'
            ],
			//NDI Encode
			encodesetup: [
				'P100',
				'PF120',
				'P200_A2_A3',
				'P200_A4_A5',
				'A200_GEN1',
				'A200_GEN2',
				'A300_GEN1',
				'A300_GEN2',
				'P400',
				'P4K',
			],
			encodetransport: [
				'P100',
				'PF120',
				'P200_A2_A3',
				'P200_A4_A5',
				'A200_GEN1',
				'A200_GEN2',
				'A300_GEN1',
				'A300_GEN2',
				'P400',
				'P4K',
			],
			//NDI Decode
			connectTo: [],
			capture: [],
			//NDI Finder
			refresh: [],
			reset: [],
			NDIOffSnSrc: [],
			NDIGrpName: [],
			NDIGrpName: [],
			NDIDisServer: [
				'P100',
				'PF120',
				'P200_A2_A3',
				'P200_A4_A5',
				'A200_GEN1',
				'A200_GEN2',
				'A300_GEN1',
				'A300_GEN2',
				'P400',
				'P4K',
			],
			//PTZ
			birddogptzsetup: [
				'P100',
				'PF120',
				'P200_A2_A3',
				'P200_A4_A5',
				'A200_GEN1',
				'A200_GEN2',
				'A300_GEN1',
				'A300_GEN2',
				'P400',
				'P4K',
			],
			recallPost: [
				'P100',
				'PF120',
				'P200_A2_A3',
				'P200_A4_A5',
				'A200_GEN1',
				'A200_GEN2',
				'A300_GEN1',
				'A300_GEN2',
				'P400',
				'P4K',
			],
			savePost: [
				'P100',
				'PF120',
				'P200_A2_A3',
				'P200_A4_A5',
				'A200_GEN1',
				'A200_GEN2',
				'A300_GEN1',
				'A300_GEN2',
				'P400',
				'P4K',
			],
			//Exposure
			birddogexpsetup: [
				'P100',
				'PF120',
				'P200_A2_A3',
				'P200_A4_A5',
				'A200_GEN1',
				'A200_GEN2',
				'A300_GEN1',
				'A300_GEN2',
				'P400',
				'P4K',
			],
			//White Balance
			birddogwbsetup: [
				'P100',
				'PF120',
				'P200_A2_A3',
				'P200_A4_A5',
				'A200_GEN1',
				'A200_GEN2',
				'A300_GEN1',
				'A300_GEN2',
				'P400',
				'P4K',
			],
			//Picture Settings
			birddogpicsetup: [
				'P100',
				'PF120',
				'P200_A2_A3',
				'P200_A4_A5',
				'A200_GEN1',
				'A200_GEN2',
				'A300_GEN1',
				'A300_GEN2',
				'P400',
				'P4K',
			],
			//Color Matrix
			birddogcmsetup: [
                'P100',
                'PF120',
                'P200_A2_A3',
                'P200_A4_A5',
                'A200_GEN1',
                'A200_GEN2',
                'A300_GEN1',
                'A300_GEN2'
            ],
			//Advanced Settings
			birddogadvancesetup: [
                'P200_A2_A3',
                'P200_A4_A5',
                'A200_GEN1',
                'A200_GEN2',
                'A300_GEN1',
                'A300_GEN2'
            ],
			//External Settings
			birddogexternalsetup: [
                'A200_GEN1',
                'A200_GEN2',
                'A300_GEN1',
                'A300_GEN2'
            ],
			//Detail
			birddogdetsetup: [
                'P400',
                'P4K'
            ],
			//Gamma
			birddoggammasetup: [
                'P400',
                'P4K'
            ],
		},
		{
			group: 'actions',
			power: [],
			pt: [],
			panSpeed: [],
			tiltSpeed: [],
			zoomSpeed: [],
			zoom: [],
			focus: [],
			focusM: [],
			expM: [CHOICES.EXP_MODE_1],
			wb: [CHOICES.WB_MODE_1],
			wbOnePush: [],
			gain: [],
			gainRed: [],
			gainBlue: [],
			iris: [CHOICES.IRIS_P100],
			shut: [],
			savePset: [],
			recallPset: [],
			pictureEffect: [],
			defog: [],
			irMode: [],
			hrMode: [],
			highSensitivity: [],
			tally: [],
			freeze: [],
			picFlip: [],
			picMirror: [],
			custom: [],
		},
		{
			group: 'feedback',
			wb_mode: [],
			standby_status: [],
		},
	],
}
