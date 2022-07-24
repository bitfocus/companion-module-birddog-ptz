const CHOICES = require('./choices.js')

module.exports = {
	// Model Specific
	MODELS: [
		{
			apicalls: {
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
			variables: {
				// General Camera Variables
				firmware: { camera: ['All'], firmware: ['4', '5'], label: 'General - Firmware' },
				model: { camera: ['All'], firmware: ['4', '5'], label: 'General - Model' },
				hostname: { camera: ['All'], firmware: ['4', '5'], label: 'General - Name' },
				ipaddress: { camera: ['All'], firmware: ['4', '5'], label: 'General - IP Address' },
				netmask: { camera: ['All'], firmware: ['4', '5'], label: 'General - Network Mask' },
				network_config: { camera: ['All'], firmware: ['4', '5'], label: 'General - Network Config Method' },
				serial_number: { camera: ['All'], firmware: ['4', '5'], label: 'General - Serial Number' },
				status: { camera: ['All'], firmware: ['4', '5'], label: 'General - Status' },

				// VISCA Variables
				freeze: { camera: ['All'], firmware: ['4', '5'], label: 'VISCA - Freeze' },
				standby: { camera: ['All'], firmware: ['4', '5'], label: 'VISCA - Standby' },

				// Analog Audio Variables
				audio_in_gain: { camera: ['All'], firmware: ['4', '5'], label: 'Analog Audio - Audio In Gain' },
				audio_out_gain: { camera: ['All'], firmware: ['4', '5'], label: 'Analog Audio - Audio Out Gain' },
				audio_output: { camera: ['All'], firmware: ['4', '5'], label: 'Analog Audio - Audio Output' },

				// Video Output Interface Variables
				video_output: { camera: ['P400', 'P4K'], firmware: ['4', '5'], label: `Video Output - Video Mode` },

				// Encode Setup Variables
				bandwidth_mode: { camera: ['All'], firmware: ['4', '5'], label: 'Encode Setup - Bandwidth Mode' },
				bandwidth_select: { camera: ['All'], firmware: ['4', '5'], label: 'Encode Setup - Bandwidth Select' },
				ndi_audio: { camera: ['All'], firmware: ['4', '5'], label: `Encode Setup - NDI Audio` },
				ndi_group: { camera: ['All'], firmware: ['4', '5'], label: `Encode Setup - NDI Group` },
				ndi_group_name: { camera: ['All'], firmware: ['4', '5'], label: `Encode Setup - NDI Group Name` },
				stream_name: { camera: ['All'], firmware: ['4', '5'], label: `Encode Setup - Stream Name` },
				tally_mode: {
					camera: ['PF120', 'P200A2A3', 'P200A4A5', 'P400', 'P4K'],
					firmware: ['4', '5'],
					label: `Encode Setup - Tally Mode`,
				},
				video_format: { camera: ['All'], firmware: ['4', '5'], label: `Encode Setup - Video Format` },

				// Encode Transport Variables
				transmit_method: { camera: ['All'], firmware: ['4', '5'], label: `Encode Transport - Transmit Method` },
				transmit_netprefix: { camera: ['All'], firmware: ['4', '5'], label: 'Encode Transport - Transmit Net Prefix' },
				transmit_netmask: { camera: ['All'], firmware: ['4', '5'], label: 'Encode Transport - Transmit Netmask' },

				// NDI Discovery Variables
				ndi_discovery_server: { camera: ['All'], firmware: ['4', '5'], label: `NDI Discovery - Server` },
				ndi_discovery_server_ip: { camera: ['All'], firmware: ['4', '5'], label: `NDI Discovery - Server IP` },

				// PTZ Variables
				pan_position: {
					camera: ['P100', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2', 'P400', 'P4K'],
					firmware: ['4', '5'],
					label: `PTZ - Pan Position`,
				},
				pan_speed: {
					camera: ['P100', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2', 'P400', 'P4K'],
					firmware: ['4', '5'],
					label: `PTZ - Pan Speed`,
				},
				tilt_position: {
					camera: ['P100', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2', 'P400', 'P4K'],
					firmware: ['4', '5'],
					label: `PTZ - Tilt Position`,
				},
				tilt_speed: {
					camera: ['P100', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2', 'P400', 'P4K'],
					firmware: ['4', '5'],
					label: `PTZ - Tilt Speed`,
				},
				zoom_position: { camera: ['All'], firmware: ['4', '5'], label: `PTZ - Zoom Position` },
				zoom_speed: { camera: ['All'], firmware: ['4', '5'], label: `PTZ - Zoom Speed` },

				// Focus Variables
				focus_mode: { camera: ['All'], firmware: ['4', '5'], label: `Focus - Focus Mode` },

				// Exposure Variables
				ae_response: {
					camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2', 'P400', 'P4K'],
					firmware: ['4', '5'],
					label: `Exposure - Ae Response`,
				},
				backlight: { camera: ['P400', 'P4K'], firmware: ['4', '5'], label: `Exposure - Backlight` },
				bright_level: { camera: ['All'], firmware: ['4', '5'], label: `Exposure - Bright Level` },
				exposure_comp: { camera: ['All'], firmware: ['4', '5'], label: `Exposure - Exposure Compensation` },
				exposure_comp_level: { camera: ['All'], firmware: ['4', '5'], label: `Exposure - Exposure Compensation Level` },
				exposure_mode: { camera: ['All'], firmware: ['4', '5'], label: `Exposure - Exposure Mode` },
				gain: { camera: ['All'], firmware: ['4', '5'], label: `Exposure - Gain` },
				gain_limit: {
					camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2', 'P400', 'P4K'],
					firmware: ['4', '5'],
					label: `Exposure - Gain Limit`,
				},
				gain_point: { camera: ['P400', 'P4K'], firmware: ['4', '5'], label: `Exposure - Gain Point` },
				gain_point_position: {
					camera: ['P400', 'P4K'],
					firmware: ['4', '5'],
					label: `Exposure - Gain Point Position `,
				},
				high_sensitivity: {
					camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2', 'P400', 'P4K'],
					firmware: ['4', '5'],
					label: `Exposure - High Sensitivity`,
				},
				iris: { camera: ['All'], firmware: ['4', '5'], label: `Exposure - Iris` },
				shutter_control_overwrite: {
					camera: ['P100', 'PF120'],
					firmware: ['4', '5'],
					label: `Exposure - Shutter Control Overwrite`,
				},
				shutter_max_speed: { camera: ['P400', 'P4K'], firmware: ['4', '5'], label: `Exposure - Shutter Max Speed` },
				shutter_min_speed: { camera: ['P400', 'P4K'], firmware: ['4', '5'], label: `Exposure - Shutter Min SPeed` },
				shutter_speed: { camera: ['All'], firmware: ['4', '5'], label: `Exposure - Shutter Speed` },
				shutter_speed_overwrite: {
					camera: ['P100', 'PF120'],
					firmware: ['4', '5'],
					label: `Exposure - Shutter Speed Overwrite`,
				},
				slow_shutter_en: {
					camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2', 'P400', 'P4K'],
					firmware: ['4', '5'],
					label: `Exposure - Slow Shutter Enable`,
				},
				slow_shutter_limit: {
					camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2', 'P400', 'P4K'],
					firmware: ['4', '5'],
					label: `Exposure - Slow Shutter Limit`,
				},
				spotlight: { camera: ['P400', 'P4K'], firmware: ['4', '5'], label: `Exposure - Spotlight` },

				// White Balance Variables
				bg: { camera: ['P400', 'P4K'], firmware: ['4', '5'], label: `White Balance - BG` },
				blue_gain: { camera: ['All'], firmware: ['4', '5'], label: `White Balance - Blue Gain` },
				br: { camera: ['P400', 'P4K'], firmware: ['4', '5'], label: `White Balance - BR` },
				color_temp: { camera: ['P100', 'PF120'], firmware: ['4', '5'], label: `White Balance - Color Temp` },
				gb: { camera: ['P400', 'P4K'], firmware: ['4', '5'], label: `White Balance - GB` },
				gr: { camera: ['P400', 'P4K'], firmware: ['4', '5'], label: `White Balance - GR` },
				level: { camera: ['P400', 'P4K'], firmware: ['4', '5'], label: `White Balance - Level` },
				matrix: { camera: ['P400', 'P4K'], firmware: ['4', '5'], label: `White Balance - Matrix` },
				offset: { camera: ['P400', 'P4K'], firmware: ['4', '5'], label: `White Balance - Offset` },
				phase: { camera: ['P400', 'P4K'], firmware: ['4', '5'], label: `White Balance - Phase` },
				red_gain: { camera: ['All'], firmware: ['4', '5'], label: `White Balance - Red Gain` },
				rb: { camera: ['P400', 'P4K'], firmware: ['4', '5'], label: `White Balance - RB` },
				rg: { camera: ['P400', 'P4K'], firmware: ['4', '5'], label: `White Balance - RG` },
				select: { camera: ['P400', 'P4K'], firmware: ['4', '5'], label: `White Balance - Select` },
				speed: { camera: ['P400', 'P4K'], firmware: ['4', '5'], label: `White Balance - Speed` },
				wb_mode: { camera: ['All'], firmware: ['4', '5'], label: `White Balance - White Balance Mode` },

				// Picture Setup Variables
				backlight_com: {
					camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					label: `Picture Setup - Backlight Compensation`,
				},
				chroma_suppress: {
					camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2', 'P400', 'P4K'],
					firmware: ['4', '5'],
					label: `Picture Setup - Chroma Suppress`,
				},
				color: { camera: ['P100', 'PF120'], firmware: ['4', '5'], label: `Picture Setup - Saturation` },
				contrast: { camera: ['P100', 'PF120'], firmware: ['4', '5'], label: `Picture Setup - Contrast` },
				effect: {
					camera: ['P100', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					label: `Picture Setup - Effect`,
				},
				flip: { camera: ['All'], firmware: ['4', '5'], label: `Picture Setup - Flip` },
				gamma: {
					camera: ['P100', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					label: `Picture Setup - Gamma`,
				},
				highlight_comp: {
					camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2', 'P400', 'P4K'],
					firmware: ['4', '5'],
					label: `Picture Setup - Highlight Compensation`,
				},
				highlight_comp_mask: {
					camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					label: `Picture Setup - Highlight Compensation Mask`,
				},
				ir_cutfilter: {
					camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2', 'P400', 'P4K'],
					firmware: ['4', '5'],
					label: `Picture Setup - IR Cut Filter`,
				},
				hue: { camera: ['P100', 'PF120'], firmware: ['4', '5'], label: `Picture Setup - Hue` },
				mirror: { camera: ['All'], firmware: ['4', '5'], label: `Picture Setup - Mirror` },
				noise_reduction: {
					camera: ['P100', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					label: `Picture Setup - Noise Reduction`,
				},
				sharpness: {
					camera: ['P100', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					label: `Picture Setup - Sharpness`,
				},
				stabilizer: {
					camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2', 'P400', 'P4K'],
					firmware: ['4', '5'],
					label: `Picture Setup - Stabilizer`,
				},
				threed_nr: { camera: ['P400', 'P4K'], firmware: ['4', '5'], label: `Picture Setup - 3D Noise Reduction` },
				twod_nr: { camera: ['P400', 'P4K'], firmware: ['4', '5'], label: `Picture Setup - 2D Noise Reduction` },
				wide_dynamic_range: {
					camera: ['P100', 'PF120'],
					firmware: ['4', '5'],
					label: `Picture Setup - Wide Dynamic Range`,
				},

				// Color Matrix Variables
				cm_blue_gain: {
					camera: ['P100', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					label: 'Color Matrix - Blue Gain',
				},
				cm_blue_hue: {
					camera: ['P100', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					label: 'Color Matrix - Blue Hue',
				},
				cm_color_gain: {
					camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					label: 'Color Matrix - Color Gain',
				},
				cm_cyan_gain: {
					camera: ['P100', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					label: 'Color Matrix - Cyan Gain',
				},
				cm_cyan_hue: {
					camera: ['P100', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					label: 'Color Matrix - Cyan Hue',
				},
				cm_green_gain: {
					camera: ['P100', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					label: 'Color Matrix - Green Gain',
				},
				cm_green_hue: {
					camera: ['P100', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					label: 'Color Matrix - Green Hue',
				},
				cm_hue_phase: {
					camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					label: 'Color Matrix - Hue Phase',
				},
				cm_mag_gain: {
					camera: ['P100', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					label: 'Color Matrix - Magenta Gain',
				},
				cm_mag_hue: {
					camera: ['P100', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					label: 'Color Matrix - Magenta Hue',
				},
				cm_red_gain: {
					camera: ['P100', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					label: 'Color Matrix - Red Gain',
				},
				cm_red_hue: {
					camera: ['P100', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					label: 'Color Matrix - Red Hue',
				},
				cm_yellow_gain: {
					camera: ['P100', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					label: 'Color Matrix - Yellow Gain',
				},
				cm_yellow_hue: {
					camera: ['P100', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					label: 'Color Matrix - Yellow Hue',
				},

				// Advanced Setup Variables
				brightness: {
					camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					label: 'Advanced Setup - Brightness',
				},
				brightness_comp: {
					camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					label: 'Advanced Setup - Brightness Comp',
				},
				comp_level: {
					camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					label: 'Advanced Setup - Comp Level',
				},
				gamma_offset: {
					camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					label: 'Advanced Setup - Gamma Offset',
				},
				high_resolution: {
					camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					label: 'Advanced Setup - High Resolution',
				},
				video_enhancement: {
					camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					label: 'Advanced Setup - Video Enhancement',
				},

				// External Setup Variables
				aux: {
					camera: ['A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					label: 'External Setup - Aux',
				},
				rain_wiper: { camera: ['A300GEN1', 'A300GEN2'], firmware: ['4', '5'], label: 'External Setup - Rain Wiper' },
				v12vout: {
					camera: ['A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					label: 'External Setup - 12v Out',
				},

				// Detail Setup Variables
				bandwidth: { camera: ['P400', 'P4K'], firmware: ['4', '5'], label: `Detail Setup - Bandwidth` },
				bw_balance: { camera: ['P400', 'P4K'], firmware: ['4', '5'], label: `Detail Setup - BW Balance` },
				crispening: { camera: ['P400', 'P4K'], firmware: ['4', '5'], label: `Detail Setup - Crispening` },
				detail: { camera: ['P400', 'P4K'], firmware: ['4', '5'], label: `Detail Setup - Detail` },
				highlight_detail: { camera: ['P400', 'P4K'], firmware: ['4', '5'], label: `Detail Setup - Highlight Detail` },
				hv_balance: { camera: ['P400', 'P4K'], firmware: ['4', '5'], label: `Detail Setup - Hv Balance` },
				limit: { camera: ['P400', 'P4K'], firmware: ['4', '5'], label: `Detail Setup - Limit` },
				super_low: { camera: ['P400', 'P4K'], firmware: ['4', '5'], label: `Detail Setup - Super Low` },

				// Gamma Setup Variables
				black_gamma_level: { camera: ['P400', 'P4K'], firmware: ['4', '5'], label: `Gamma Setup - Black Gamma Level` },
				black_level: { camera: ['P400', 'P4K'], firmware: ['4', '5'], label: `Gamma Setup - Black Level` },
				black_level_range: { camera: ['P400', 'P4K'], firmware: ['4', '5'], label: `Gamma Setup - Black Level Range` },
				effect: { camera: ['P400', 'P4K'], firmware: ['4', '5'], label: `Gamma Setup - Effect` },
				level: { camera: ['P400', 'P4K'], firmware: ['4', '5'], label: `Gamma Setup - Level` },
				offset: { camera: ['P400', 'P4K'], firmware: ['4', '5'], label: `Gamma Setup - Offset` },
				pattern: { camera: ['P400', 'P4K'], firmware: ['4', '5'], label: `Gamma Setup - Pattern` },
				pattern_fine: { camera: ['P400', 'P4K'], firmware: ['4', '5'], label: `Gamma Setup - Pattern Fine` },
				settings: { camera: ['P400', 'P4K'], firmware: ['4', '5'], label: `Gamma Setup - Settings` },
				visibility_enhancer: {
					camera: ['P400', 'P4K'],
					firmware: ['4', '5'],
					label: `Gamma Setup - Visibilty Enhancer`,
				},
			},
			actions: {
				// General Camera Actions
				freeze: { camera: ['All'], firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'On' },
				standby: { camera: ['All'], firmware: ['4', '5'], choices: CHOICES.STANDBY, default: 'on' },

				// Analog Audio Actions
				analogAudioInGain: { camera: ['All'], firmware: ['4', '5'], range: { min: -50, max: 50, default: 0 } },
				analogAudioOutGain: { camera: ['All'], firmware: ['4', '5'], range: { min: -50, max: 50, default: 0 } },
				analogAudioOutput: {
					camera: ['All'],
					firmware: ['4', '5'],
					choices: CHOICES.ANALOG_AUDIO_OUTPUT,
					default: 'DecodeComms',
				},
				// Video Output Interface Actions
				video_output: {
					camera: ['P400', 'P4K'],
					firmware: ['4', '5'],
					choices: CHOICES.VIDEO_OUTPUT,
					default: 'NormalMode',
				},

				// Encode Setup Actions
				bandwidth_mode: {
					camera: ['All'],
					firmware: ['4', '5'],
					choices: CHOICES.ENCODE_BANDWIDTH_MODE,
					default: 'NDIManaged',
				},
				bandwidth_select: {
					camera: ['All'],
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 80, max: 120, default: 80 },
				},
				ndiAudio: { camera: ['All'], firmware: ['4', '5'], choices: CHOICES.ENCODE_NDI_AUDIO, default: 'NDIAudioMute' },
				ndiGroupEnable: {
					camera: ['All'],
					firmware: ['4', '5'],
					choices: CHOICES.ENCODE_NDIGroup,
					default: 'NDIGroupDis',
				},
				tally: {
					camera: ['PF120', 'P200A2A3', 'P200A4A5'],
					firmware: ['4', '5'],
					choices: CHOICES.TALLY_MODE,
					default: 'TallyOn',
				},

				// Encode Transport Actions
				transmit_method: { camera: ['All'], firmware: ['4', '5'], choices: CHOICES.ENCODE_TXPM, default: 'UDP' },

				// NDI Discovery Server Actions
				ndi_discovery_server: {
					camera: ['All'],
					firmware: ['4', '5'],
					choices: CHOICES.NDI_DIS_SVR,
					default: 'NDIDisServDis',
				},

				// PTZ Actions
				panSpeed: {
					camera: ['P100', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2', 'P400', 'P4K'],
					firmware: ['4', '5'],
					choices: CHOICES.SPEED_CHANGES,
					default: 'up',
					range: { min: 0, max: 21, default: 11 },
				},
				pt: {
					camera: ['P100'],
					firmware: ['4', '5'],
					choices: CHOICES.PTZ_DIRECTION,
					default: 'up',
					posPanChoices: CHOICES.POS_PAN_P100,
					posPanDefault: '0000',
					posTiltChoices: CHOICES.POS_TILT,
					posTiltDefault: '0000',
				},
				pt: {
					camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2', 'P400', 'P4K'],
					firmware: ['4', '5'],
					choices: CHOICES.PTZ_DIRECTION,
					default: 'up',
					posPanChoices: CHOICES.POS_PAN_P200,
					posPanDefault: '0000',
					posTiltChoices: CHOICES.POS_TILT,
					posTiltDefault: '0000',
				},
				recallPset: { camera: ['All'], firmware: ['4', '5'], range: { min: 1, max: 64, default: 1 } },
				savePset: { camera: ['All'], firmware: ['4', '5'], range: { min: 1, max: 64, default: 1 } },
				tiltSpeed: {
					camera: ['P100', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2', 'P400', 'P4K'],
					firmware: ['4', '5'],
					choices: CHOICES.SPEED_CHANGES,
					default: 'up',
					range: { min: 0, max: 18, default: 9 },
				},
				zoom: {
					camera: ['P100'],
					firmware: ['4', '5'],
					choices: CHOICES.PTZ_ZOOM,
					default: 'in',
					posZoomChoices: CHOICES.POS_ZOOM_10,
					posZoomDefault: '0000',
				},
				zoom: {
					camera: ['P4K'],
					firmware: ['4', '5'],
					choices: CHOICES.PTZ_ZOOM,
					default: 'in',
					posZoomChoices: CHOICES.POS_ZOOM_12,
					posZoomDefault: '0000',
				},
				zoom: {
					camera: ['PF120', 'P400'],
					firmware: ['4', '5'],
					choices: CHOICES.PTZ_ZOOM,
					default: 'in',
					posZoomChoices: CHOICES.POS_ZOOM_20,
					posZoomDefault: '0000',
				},
				zoom: {
					camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					choices: CHOICES.PTZ_ZOOM,
					default: 'in',
					posZoomChoices: CHOICES.POS_ZOOM_30,
					posZoomDefault: '0000',
				},
				zoomSpeed: {
					camera: ['All'],
					firmware: ['4', '5'],
					choices: CHOICES.SPEED_CHANGES,
					default: 'up',
					range: { min: 0, max: 7, default: 4 },
				},

				// Focus Actions
				focus: { camera: ['All'], firmware: ['4', '5'], choices: CHOICES.FOCUS_CONTROL, default: 'near' },
				focusM: { camera: ['All'], firmware: ['4', '5'], choices: CHOICES.AUTO_FOCUS, default: 'Auto' },

				// Exposure Actions
				ae_response: {
					camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2', 'P400', 'P4K'],
					firmware: ['4', '5'],
					range: { min: 1, max: 48, default: 1 },
				},
				backlight: { camera: ['P400', 'P4K'], firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'On' },
				bright_level: { camera: ['P100', 'PF120'], firmware: ['4', '5'], range: { min: 0, max: 27, default: 14 } },
				bright_level: {
					camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					range: { min: 0, max: 31, default: 16 },
				},
				bright_level: { camera: ['P400'], firmware: ['4', '5'], range: { min: 0, max: 41, default: 21 } },
				bright_level: { camera: ['P4K'], firmware: ['4', '5'], range: { min: 5, max: 37, default: 21 } },
				expComp: { camera: ['All'], firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
				expCompLvl: {
					camera: ['P100', 'PF120'],
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: -7, max: 7, default: 0 },
				},
				expCompLvl: {
					camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2', 'P400', 'P4K'],
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: -128, max: 127, default: 0 },
				},
				exposure_mode: {
					camera: ['P100', 'PF120', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					choices: CHOICES.EXP_MODE_1,
					default: 'FULL-AUTO',
				},
				exposure_mode: {
					camera: ['P200A2A3'],
					firmware: ['4', '5'],
					choices: CHOICES.EXP_MODE_2,
					default: 'FULL-AUTO',
				},
				exposure_mode: {
					camera: ['P400', 'P4K'],
					firmware: ['4', '5'],
					choices: CHOICES.EXP_MODE_3,
					default: 'FULL-AUTO',
				},
				gain: { camera: ['P100', 'PF120'], firmware: ['4', '5'], choices: CHOICES.GAIN_1, default: 0 },
				gain: {
					camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					choices: CHOICES.GAIN_2,
					default: 1,
				},
				gain: { camera: ['P400', 'P4K'], firmware: ['4', '5'], choices: CHOICES.GAIN_3, default: 1 },
				gain_limit: {
					camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					range: { min: 4, max: 15, default: 15 },
				},
				gain_limit: { camera: ['P400', 'P4K'], firmware: ['4', '5'], range: { min: 4, max: 13, default: 13 } },
				gain_point: { camera: ['P400', 'P4K'], firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'On' },
				highSensitivity: {
					camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2', 'P400', 'P4K'],
					firmware: ['4', '5'],
					choices: CHOICES.ON_OFF,
					default: 'On',
				},
				iris: {
					camera: ['P100', 'PF120'],
					firmware: ['4', '5'],
					choices: CHOICES.IRIS_1,
					default: 8,
					range: { closed: 0, min: 1, max: 13 },
				},
				iris: {
					camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					choices: CHOICES.IRIS_2,
					default: 12,
					range: { closed: 0, min: 5, max: 17 },
				},
				iris: {
					camera: ['P400'],
					firmware: ['4', '5'],
					choices: CHOICES.IRIS_3,
					default: 17,
					range: { closed: 0, min: 5, max: 21 },
				},
				iris: {
					camera: ['P4K'],
					firmware: ['4', '5'],
					choices: CHOICES.IRIS_4,
					default: 1,
					range: { closed: 5, min: 6, max: 21 },
				},
				shutter_control_overwrite: {
					camera: ['P100', 'PF120'],
					firmware: ['4', '5'],
					choices: CHOICES.ON_OFF,
					default: 'On',
				},
				shutter_max_speed: { camera: ['P400', 'P4K'], firmware: ['4', '5'], range: { min: 20, max: 33, default: 20 } },
				shutter_min_speed: { camera: ['P400', 'P4K'], firmware: ['4', '5'], range: { min: 16, max: 33, default: 16 } },
				shutter_speed: {
					camera: ['P100', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					shutter_50: CHOICES.SHUTTER_50,
					shutter_60: CHOICES.SHUTTER_60,
					default: 6,
					range: { min: 0, max: 21 },
				},
				shutter_speed: {
					camera: ['P400', 'P4K'],
					firmware: ['4', '5'],
					shutter_24: CHOICES.SHUTTER_4K_24,
					shutter_50: CHOICES.SHUTTER_4K_50,
					shutter_60: CHOICES.SHUTTER_4K_60,
					default: 18,
					range: { min: 6, max: 33 },
				},
				shutter_speed_overwrite: {
					camera: ['P100', 'PF120'],
					firmware: ['4', '5'],
					range: { min: 30, max: 110, default: 60 },
				},
				slow_shutter_en: {
					camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2', 'P400', 'P4K'],
					firmware: ['4', '5'],
					choices: CHOICES.ON_OFF,
					default: 'Off',
				},
				slow_shutter_limit: {
					camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					range: { min: 1, max: 6, default: 3 },
				},
				slow_shutter_limit: { camera: ['P400', 'P4K'], firmware: ['4', '5'], range: { min: 6, max: 17, default: 12 } },
				spotlight: { camera: ['P400', 'P4K'], firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },

				// White Balance Actions
				bg: { camera: ['P400', 'P4K'], firmware: ['4', '5'], range: { min: -99, max: 99, default: 0 } },
				blue_gain: {
					camera: ['All'],
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 255, default: 128 },
				},
				br: { camera: ['P400', 'P4K'], firmware: ['4', '5'], range: { min: -99, max: 99, default: 0 } },
				color_temp: { camera: ['P100', 'PF120'], firmware: ['4', '5'], choices: CHOICES.COLOR_TEMP, default: '6500' },
				gb: { camera: ['P400', 'P4K'], firmware: ['4', '5'], range: { min: -99, max: 99, default: 0 } },
				gr: { camera: ['P400', 'P4K'], firmware: ['4', '5'], range: { min: -99, max: 99, default: 0 } },
				level: { camera: ['P400', 'P4K'], firmware: ['4', '5'], range: { min: 0, max: 14, default: 7 } },
				matrix: { camera: ['P400', 'P4K'], firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
				offset: { camera: ['P400', 'P4K'], firmware: ['4', '5'], range: { min: 0, max: 14, default: 7 } },
				phase: { camera: ['P400', 'P4K'], firmware: ['4', '5'], range: { min: 0, max: 14, default: 7 } },
				rb: { camera: ['P400', 'P4K'], firmware: ['4', '5'], range: { min: -99, max: 99, default: 0 } },
				red_gain: {
					camera: ['All'],
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 255, default: 128 },
				},
				rg: { camera: ['P400', 'P4K'], firmware: ['4', '5'], range: { min: -99, max: 99, default: 0 } },
				select: { camera: ['P400', 'P4K'], firmware: ['4', '5'], choices: CHOICES.WB_SELECT, default: 'OFF' },
				speed: { camera: ['P400', 'P4K'], firmware: ['4', '5'], range: { min: 1, max: 5, default: 3 } },
				wbOnePush: { camera: ['All'], firmware: ['4', '5'] },
				wb_mode: { camera: ['P100', 'PF120'], firmware: ['4', '5'], choices: CHOICES.WB_MODE_1, default: 'AUTO' },
				wb_mode: {
					camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2', 'P400', 'P4K'],
					firmware: ['4', '5'],
					choices: CHOICES.WB_MODE_2,
					default: 'AUTO',
				},

				// Picture Setup Actions
				backlight_com: {
					camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					choices: CHOICES.ON_OFF,
					default: 'Off',
				},
				chroma_suppress: {
					camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2', 'P400', 'P4K'],
					firmware: ['4', '5'],
					choices: CHOICES.OFF_L_M_H,
					default: 'OFF',
				},
				color: {
					camera: ['P100', 'PF120'],
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 15, default: 8 },
				},
				contrast: {
					camera: ['P100', 'PF120'],
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 15, default: 8 },
				},
				gamma: {
					camera: ['P100', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 4, default: 2 },
				},
				highlight_comp: {
					camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2', 'P400', 'P4K'],
					firmware: ['4', '5'],
					choices: CHOICES.OFF_L_M_H,
					default: 'OFF',
				},
				highlight_comp_mask: {
					camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 3, default: 1 },
				},
				hue: {
					camera: ['P100', 'PF120'],
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 15, default: 8 },
				},
				ir_cutfilter: {
					camera: ['P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					choices: CHOICES.IR_CUT_FILTER_1,
					default: 'Auto',
				},
				ir_cutfilter: {
					camera: ['P400', 'P4K'],
					firmware: ['4', '5'],
					choices: CHOICES.IR_CUT_FILTER_2,
					default: 'On',
				},
				ir_cutfilter: {
					camera: ['P200A2A3'],
					firmware: ['4', '5'],
					choices: CHOICES.IR_CUT_FILTER_3,
					default: 'NoiseReduction',
				},
				low_latency: { camera: ['P200A4A5'], firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
				nd_filter: { camera: ['P4K'], firmware: ['4', '5'], range: { min: 0, max: 3, default: 2 } },
				noise_reduction: {
					camera: ['P100', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					choices: CHOICES.OFF_1_to_5,
					default: 'Off',
				},
				picFlip: { camera: ['All'], firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'On' },
				picMirror: { camera: ['All'], firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'On' },
				pictureEffect: {
					camera: ['P100', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					choices: CHOICES.PICTURE_EFFECT,
					default: 'BW',
				},
				sharpness: {
					camera: ['P100', 'PF120'],
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 15, default: 8 },
				},
				sharpness: {
					camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: -128, max: 127, default: 0 },
				},
				stabilizer: {
					camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2', 'P400', 'P4K'],
					firmware: ['4', '5'],
					choices: CHOICES.ON_OFF,
					default: 'Off',
				},
				threed_nr: { camera: ['P400', 'P4K'], firmware: ['4', '5'], choices: CHOICES.OFF_1_to_5, default: 'Off' },
				twod_nr: { camera: ['P400', 'P4K'], firmware: ['4', '5'], choices: CHOICES.OFF_1_to_5, default: 'Off' },
				wide_dynamic_range: {
					camera: ['P100', 'PF120'],
					firmware: ['4', '5'],
					choices: CHOICES.OFF_1_to_6,
					default: 'Off',
				},

				// Color Matrix Actions
				cm_blue_gain: {
					camera: ['P100', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_blue_hue: {
					camera: ['P100', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_color_gain: {
					camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 255, default: 128 },
				},
				cm_cyan_gain: {
					camera: ['P100', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_cyan_hue: {
					camera: ['P100', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_green_gain: {
					camera: ['P100', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_green_hue: {
					camera: ['P100', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_hue_phase: {
					camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 255, default: 128 },
				},
				cm_mag_gain: {
					camera: ['P100', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_mag_hue: {
					camera: ['P100', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_red_gain: {
					camera: ['P100', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_red_hue: {
					camera: ['P100', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_yellow_gain: {
					camera: ['P100', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},
				cm_yellow_hue: {
					camera: ['P100', 'PF120', 'P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 64, default: 32 },
				},

				// Advanced Setup Actions
				brightness: {
					camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 6, default: 3 },
				},
				brightness_comp: {
					camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					choices: CHOICES.BRIGHTNESS_COMP,
					default: 'STANDARD',
				},
				comp_level: {
					camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					choices: CHOICES.L_Mid_H,
					default: 'LOW',
				},
				gamma_offset: {
					camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: -16, max: 64, default: 40 },
				},
				high_resolution: {
					camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					choices: CHOICES.ON_OFF,
					default: 'Off',
				},
				video_enhancement: {
					camera: ['P200A2A3', 'P200A4A5', 'A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					choices: CHOICES.ON_OFF,
					default: 'Off',
				},

				// External Setup Actions
				aux: {
					camera: ['A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					choices: CHOICES.ON_OFF,
					default: 'Off',
				},
				rain_wiper: { camera: ['A300GEN1', 'A300GEN2'], firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
				v12vout: {
					camera: ['A200GEN1', 'A200GEN2', 'A300GEN1', 'A300GEN2'],
					firmware: ['4', '5'],
					choices: CHOICES.ON_OFF,
					default: 'Off',
				},

				// Detail Setup Actions
				bandwidth: { camera: ['P400', 'P4K'], firmware: ['4', '5'], choices: CHOICES.BANDWIDTH_4K, default: 'DEFAULT' },
				bw_balance: { camera: ['P400', 'P4K'], firmware: ['4', '5'], choices: CHOICES.BW_BALANCE_4K, default: 'TYPE1' },
				crispening: {
					camera: ['P400', 'P4K'],
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 7, default: 4 },
				},
				detail: { camera: ['P400', 'P4K'], firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },
				highlight_detail: {
					camera: ['P400', 'P4K'],
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 4, default: 0 },
				},
				hv_balance: {
					camera: ['P400', 'P4K'],
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: -2, max: 2, default: 0 },
				},
				limit: {
					camera: ['P400', 'P4K'],
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 7, default: 4 },
				},
				super_low: {
					camera: ['P400', 'P4K'],
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 7, default: 4 },
				},

				// Gamma Setup Actions
				black_gamma_level: {
					camera: ['P400', 'P4K'],
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 14, default: 7 },
				},
				black_level: {
					camera: ['P400', 'P4K'],
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 96, default: 48 },
				},
				black_level_range: { camera: ['P400', 'P4K'], firmware: ['4', '5'], choices: CHOICES.L_Mid_H, default: 'LOW' },
				effect: {
					camera: ['P400', 'P4K'],
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: -3, max: 3, default: 0 },
				},
				level: {
					camera: ['P400', 'P4K'],
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 14, default: 0 },
				},
				offset: {
					camera: ['P400', 'P4K'],
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: -64, max: 64, default: 0 },
				},
				pattern: {
					camera: ['P400', 'P4K'],
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 512, default: 256 },
				},
				pattern_fine: {
					camera: ['P400', 'P4K'],
					firmware: ['4', '5'],
					choices: CHOICES.UP_DOWN_VALUE,
					default: 'up',
					range: { min: 0, max: 9, default: 5 },
				},
				settings: {
					camera: ['P400', 'P4K'],
					firmware: ['4', '5'],
					choices: CHOICES.GAMMA_SETTINGS,
					default: 'PATTERN',
				},
				visibility_enhancer: { camera: ['P400', 'P4K'], firmware: ['4', '5'], choices: CHOICES.ON_OFF, default: 'Off' },

				// Other Actions
				custom: { camera: ['All'], firmware: ['4', '5'] },
			},
			feedback: {
				wb_mode: { camera: ['All'], firmware: ['4', '5'] },
				standby_status: { camera: ['All'], firmware: ['4', '5'] },
			},
		},
	],
}
