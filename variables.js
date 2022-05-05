const { getPositionLabel } = require('./utils')

var { MODELS } = require('./models.js')
const CHOICES = require('./choices.js')

// ##########################
// #### Define Variables ####
// ##########################
exports.updateVariableDefinitions = function () {
	const variables = []

	MODEL_SPEC = MODELS.find((MODELS) => MODELS.id == this.camera.model)?.variables

	sortedlist = Object.fromEntries(Object.entries(MODEL_SPEC).sort())

	for (i in sortedlist) {
		variables.push({
			label: sortedlist[i].label,
			name: i,
		})
	}

	this.setVariableDefinitions(variables)
}

// #########################
// #### Update Variables ####
// #########################
exports.updateVariables = function () {
	MODEL_SPEC = MODELS.find((MODELS) => MODELS.id == this.camera.model)?.variables
	MODEL_VALUES = MODELS.find((MODELS) => MODELS.id == this.camera.model)?.actions

	// /about
	if (this.camera.about) {
		if (MODEL_SPEC?.firmware) {
			this.setVariable('firmware', this.camera.firmware)
		}

		if (MODEL_SPEC?.model) {
			this.setVariable('model', this.camera.model)
		}

		if (MODEL_SPEC?.hostname) {
			this.setVariable('hostname', this.camera.about.HostName)
		}

		if (MODEL_SPEC?.ipaddress) {
			this.setVariable('ipaddress', this.camera.about.IPAddress)
		}

		if (MODEL_SPEC?.netmask) {
			this.setVariable('netmask', this.camera.about.NetworkMask)
		}

		if (MODEL_SPEC?.network_config) {
			this.setVariable('network_config', this.camera.about.NetworkConfigMethod)
		}

		if (MODEL_SPEC?.serial_number) {
			this.setVariable('serial_number', this.camera.about.SerialNumber)
		}

		if (MODEL_SPEC?.status) {
			this.setVariable('status', this.camera.about.Status)
		}
	}
	// VISCA Variables
	if (MODEL_SPEC?.standby) {
		this.setVariable('standby', this.camera.standby)
	}

	if (MODEL_SPEC?.freeze) {
		this.setVariable('freeze', this.camera.freeze)
	}

	// API Variables
	// /analogaudiosetup
	if (this.camera.audio) {
		if (MODEL_SPEC?.audio_in_gain) {
			this.setVariable('audio_in_gain', this.camera.audio.AnalogAudioInGain - 50 + 'DB') //Convert API range to action range
		}

		if (MODEL_SPEC?.audio_out_gain) {
			this.setVariable('audio_out_gain', this.camera.audio.AnalogAudioOutGain - 50 + 'DB') //Convert API range to action range
		}

		if (MODEL_SPEC?.audio_output) {
			this.setVariable('audio_output', this.camera.audio.AnalogAudiooutputselect)
		}
	}
	// /videooutputinterface
	//	if (MODEL_SPEC?.video_output) {
	//		this.setVariable('video_output',this.camera.video.videooutput)
	//	}

	// /encodesetup
	if (this.camera.encode) {
		if (MODEL_SPEC?.bandwidth_mode) {
			this.setVariable('bandwidth_mode', this.camera.encode.BandwidthMode)
		}

		if (MODEL_SPEC?.bandwidth_select) {
			this.setVariable('bandwidth_select', this.camera.encode.BandwidthSelect)
		}

		if (MODEL_SPEC?.ndi_audio) {
			this.setVariable('ndi_audio', this.camera.encode.NDIAudio)
		}

		if (MODEL_SPEC?.ndi_group) {
			this.setVariable('ndi_group', this.camera.encode.NDIGroup)
		}

		if (MODEL_SPEC?.ndi_group_name) {
			this.setVariable('ndi_group_name', this.camera.encode.NDIGroupName)
		}

		if (MODEL_SPEC?.stream_name) {
			this.setVariable('stream_name', this.camera.encode.StreamName)
		}

		if (MODEL_SPEC?.tally_mode) {
			this.setVariable('tally_mode', this.camera.encode.TallyMode)
		}

		if (MODEL_SPEC?.video_format) {
			this.setVariable('video_format', this.camera.encode.VideoFormat)
		}
	}
	// /encodeTransport
	if (this.camera.transport) {
		if (MODEL_SPEC?.transmit_method) {
			this.setVariable('transmit_method', this.camera.transport.txpm)
		}

		if (MODEL_SPEC?.transmit_netprefix) {
			this.setVariable('transmit_netprefix', this.camera.transport.txnetprefix)
		}

		if (MODEL_SPEC?.transmit_netmask) {
			this.setVariable('transmit_netmask', this.camera.transport.txnetmask)
		}
	}
	// /NDIDisServer
	if (this.camera.ndiserver) {
		if (MODEL_SPEC?.ndi_discovery_server) {
			this.setVariable('ndi_discovery_server', this.camera.ndiserver.NDIDisServ === 'NDIDisServEn' ? 'On' : 'Off')
		}

		if (MODEL_SPEC?.ndi_discovery_server_ip) {
			this.setVariable('ndi_discovery_server_ip', this.camera.ndiserver.NDIDisServIP)
		}
	}
	// /birddogptzsetup
	if (this.camera.ptz) {
		if (MODEL_SPEC?.pan_speed) {
			this.setVariable('pan_speed', this.camera.ptz.PanSpeed)
		}

		if (MODEL_SPEC?.tilt_speed) {
			this.setVariable('tilt_speed', this.camera.ptz.TiltSpeed)
		}

		if (MODEL_SPEC?.zoom_speed) {
			this.setVariable('zoom_speed', this.camera.ptz.ZoomSpeed)
		}
	}
	// PTZ Position
	if (this.camera.position) {
		if (MODEL_SPEC?.zoom_position) {

			this.setVariable('zoom_position', getPositionLabel(MODEL_VALUES.zoom.posZoomChoices, this.camera.position.zoom))
		}

		if (MODEL_SPEC?.pan_position) {
			this.setVariable('pan_position', getPositionLabel(MODEL_VALUES.pt.posPanChoices, this.camera.position.pan))
		}

		if (MODEL_SPEC?.tilt_position) {
			this.setVariable('tilt_position', getPositionLabel(MODEL_VALUES.pt.posTiltChoices, this.camera.position.tilt))
		}
	}
	// Focus Settings
	if (this.camera.focus) {
		if (MODEL_SPEC?.focus_mode) {
			this.setVariable('focus_mode', this.camera.focus.mode)
		}
	}
	// /birddogexpsetup
	if (this.camera.expsetup) {
		if (MODEL_SPEC?.ae_response) {
			this.setVariable('ae_response', this.camera.expsetup.AeResponse)
		}

		if (MODEL_SPEC?.backlight) {
			this.setVariable('backlight', this.camera.expsetup.BackLight)
		}

		if (MODEL_SPEC?.bright_level) {
			this.setVariable('bright_level', this.camera.expsetup.BrightLevel)
		}

		if (MODEL_SPEC?.exposure_comp) {
			this.setVariable('exposure_comp', this.camera.expsetup.ExpCompEn)
		}

		if (MODEL_SPEC?.exposure_comp_level) {
			this.setVariable('exposure_comp_level', this.camera.expsetup.ExpCompLvl)
		}

		if (MODEL_SPEC?.exposure_mode) {
			this.setVariable('exposure_mode', this.camera.expsetup.ExpMode)
		}

		if (MODEL_SPEC?.gain) {
			this.setVariable('gain', MODEL_VALUES.gain.choices.find((o) => o.id == this.camera.expsetup.GainLevel)?.label)
		}

		if (MODEL_SPEC?.gain_limit) {
			this.setVariable(
				'gain_limit',
				MODEL_VALUES.gain.choices.find((o) => o.id == this.camera.expsetup.GainLimit)?.label
			)
		}

		if (MODEL_SPEC?.gain_point) {
			this.setVariable('gain_point', this.camera.expsetup.GainPoint)
		}

		if (MODEL_SPEC?.gain_point_position) {
			this.setVariable('gain_point_position', this.camera.expsetup.GainPointPosition)
		}

		if (MODEL_SPEC?.high_sensitivity) {
			this.setVariable('high_sensitivity', this.camera.expsetup.HighSensitivity)
		}

		if (MODEL_SPEC?.iris) {
			this.setVariable('iris', MODEL_VALUES.iris.choices.find((o) => o.id == this.camera.expsetup.IrisLevel)?.label)
		}

		if (MODEL_SPEC?.shutter_control_overwrite) {
			this.setVariable('shutter_control_overwrite', this.camera.expsetup.ShutterControlOverwrite)
		}

		if (MODEL_SPEC?.shutter_max_speed) {
			this.setVariable('shutter_max_speed', this.camera.expsetup.ShutterMaxSpeed)
		}

		if (MODEL_SPEC?.shutter_min_speed) {
			this.setVariable('shutter_min_speed', this.camera.expsetup.ShutterMinSpeed)
		}

		if (MODEL_SPEC?.shutter_speed) {
			this.setVariable(
				'shutter_speed',
				MODEL_VALUES.shut?.['shutter_' + [this.camera.framerate]].find((o) => o.id == this.camera.expsetup.ShutterSpeed)
					?.label
			)
		}

		if (MODEL_SPEC?.shutter_speed_overwrite) {
			this.setVariable('shutter_speed_overwrite', this.camera.expsetup.ShutterSpeedOverwrite)
		}

		if (MODEL_SPEC?.slow_shutter) {
			this.setVariable('slow_shutter', this.camera.expsetup.SlowShutterEn)
		}

		if (MODEL_SPEC?.slow_shutter_limit) {
			this.setVariable('slow_shutter_limit', this.camera.expsetup.SlowShutterLimit)
		}

		if (MODEL_SPEC?.spotlight) {
			this.setVariable('spotlight', this.camera.expsetup.Spotlight)
		}
	}
	// /birddogwbsetup
	if (this.camera.wbsetup) {
		if (MODEL_SPEC?.blue_gain) {
			this.setVariable('blue_gain', this.camera.wbsetup.BlueGain)
		}

		if (MODEL_SPEC?.color_temp) {
			this.setVariable('color_temp', this.camera.wbsetup.ColorTemp)
		}
		if (MODEL_SPEC?.red_gain) {
			this.setVariable('red_gain', this.camera.wbsetup.RedGain)
		}

		if (MODEL_SPEC?.wb_mode) {
			this.setVariable('wb_mode', this.camera.wbsetup.WbMode)
		}
	}
	// /birddogpicsetup
	if (this.camera.picsetup) {
		if (MODEL_SPEC?.backlight_com) {
			this.setVariable('backlight_com', this.camera.picsetup.BackLightCom)
		}

		if (MODEL_SPEC?.chroma_suppress) {
			this.setVariable('chroma_suppress', this.camera.picsetup.ChromeSuppress)
		}

		if (MODEL_SPEC?.contrast) {
			this.setVariable('contrast', this.camera.picsetup.Contrast)
		}

		if (MODEL_SPEC?.effect) {
			this.setVariable('effect', this.camera.picsetup.Effect)
		}

		if (MODEL_SPEC?.flip) {
			this.setVariable('flip', this.camera.picsetup.Flip)
		}

		if (MODEL_SPEC?.gamma) {
			this.setVariable('gamma', this.camera.picsetup.Gamma)
		}

		if (MODEL_SPEC?.hlc_mode) {
			this.setVariable('hlc_mode', this.camera.picsetup.HighlightComp)
		}

		if (MODEL_SPEC?.hue) {
			this.setVariable('hue', this.camera.picsetup.Hue)
		}

		if (MODEL_SPEC?.ir_cutfilter) {
			this.setVariable('ir_cutfilter', this.camera.picsetup.IRCutFilter)
		}

		if (MODEL_SPEC?.low_latency) {
			this.setVariable('low_latency', this.camera.picsetup.LowLatency)
		}

		if (MODEL_SPEC?.mirror) {
			this.setVariable('mirror', this.camera.picsetup.Mirror)
		}

		if (MODEL_SPEC?.nd_filter) {
			this.setVariable('nd_filter', this.camera.picsetup.NDFilter)
		}

		if (MODEL_SPEC?.noise_reduction) {
			this.setVariable('noise_reduction', this.camera.picsetup.NoiseReduction)
		}

		if (MODEL_SPEC?.saturation) {
			this.setVariable('saturation', this.camera.picsetup.Color)
		}

		if (MODEL_SPEC?.sharpness) {
			this.setVariable('sharpness', this.camera.picsetup.Sharpness)
		}

		if (MODEL_SPEC?.stabilizer) {
			this.setVariable('stabilizer', this.camera.picsetup.Stabilizer)
		}

		if (MODEL_SPEC?.twod_nr) {
			this.setVariable('twod_nr', this.camera.picsetup.TWODNR)
		}

		if (MODEL_SPEC?.threed_nr) {
			this.setVariable('threed_nr', this.camera.picsetup.ThreeDNR)
		}

		if (MODEL_SPEC?.wide_dynamic_range) {
			this.setVariable('wide_dynamic_range', this.camera.picsetup.WideDynamicRange)
		}
	}
	// /birddogcmsetup
	if (this.camera.cmsetup) {
		if (MODEL_SPEC?.cm_blue_gain) {
			this.setVariable(
				'cm_blue_gain',
				this.camera.model == 'P100' || this.camera.model == 'PF120'
					? this.camera.cmsetup.cam_cm_blu_gain
					: this.camera.cmsetup.cm_BlueGain
			)
		}

		if (MODEL_SPEC?.cm_blue_hue) {
			this.setVariable(
				'cm_blue_hue',
				this.camera.model == 'P100' || this.camera.model == 'PF120'
					? this.camera.cmsetup.cam_cm_blu_hue
					: this.camera.cmsetup.cm_BlueHue
			)
		}

		if (MODEL_SPEC?.cm_color_gain) {
			this.setVariable('cm_color_gain', this.camera.cmsetup.ColourGain)
		}

		if (MODEL_SPEC?.cm_cyan_gain) {
			this.setVariable(
				'cm_cyan_gain',
				this.camera.model == 'P100' || this.camera.model == 'PF120'
					? this.camera.cmsetup.cam_cm_cya_gain
					: this.camera.cmsetup.cm_CyanGain
			)
		}

		if (MODEL_SPEC?.cm_cyan_hue) {
			this.setVariable(
				'cm_cyan_hue',
				this.camera.model == 'P100' || this.camera.model == 'PF120'
					? this.camera.cmsetup.cam_cm_cya_hue
					: this.camera.cmsetup.cm_CyanHue
			)
		}

		if (MODEL_SPEC?.cm_green_gain) {
			this.setVariable(
				'cm_green_gain',
				this.camera.model == 'P100' || this.camera.model == 'PF120'
					? this.camera.cmsetup.cam_cm_gre_gain
					: this.camera.cmsetup.cm_GreenGain
			)
		}

		if (MODEL_SPEC?.cm_green_hue) {
			this.setVariable(
				'cm_green_hue',
				this.camera.model == 'P100' || this.camera.model == 'PF120'
					? this.camera.cmsetup.cam_cm_gre_hue
					: this.camera.cmsetup.cm_GreenHue
			)
		}

		if (MODEL_SPEC?.cm_hue_phase) {
			this.setVariable('cm_hue_phase', this.camera.cmsetup.HuePhase)
		}

		if (MODEL_SPEC?.cm_mag_gain) {
			this.setVariable(
				'cm_mag_gain',
				this.camera.model == 'P100' || this.camera.model == 'PF120'
					? this.camera.cmsetup.cam_cm_mag_gain
					: this.camera.cmsetup.cm_MagGain
			)
		}

		if (MODEL_SPEC?.cm_mag_hue) {
			this.setVariable(
				'cm_mag_hue',
				this.camera.model == 'P100' || this.camera.model == 'PF120'
					? this.camera.cmsetup.cam_cm_mag_hue
					: this.camera.cmsetup.cm_MagHue
			)
		}

		if (MODEL_SPEC?.cm_red_gain) {
			this.setVariable(
				'cm_red_gain',
				this.camera.model == 'P100' || this.camera.model == 'PF120'
					? this.camera.cmsetup.cam_cm_red_gain
					: this.camera.cmsetup.cm_RedGain
			)
		}

		if (MODEL_SPEC?.cm_red_hue) {
			this.setVariable(
				'cm_red_hue',
				this.camera.model == 'P100' || this.camera.model == 'PF120'
					? this.camera.cmsetup.cam_cm_red_hue
					: this.camera.cmsetup.cm_RedHue
			)
		}

		if (MODEL_SPEC?.cm_yellow_gain) {
			this.setVariable(
				'cm_yellow_gain',
				this.camera.model == 'P100' || this.camera.model == 'PF120'
					? this.camera.cmsetup.cam_cm_yel_gain
					: this.camera.cmsetup.cm_YellowGain
			)
		}

		if (MODEL_SPEC?.cm_yellow_hue) {
			this.setVariable(
				'cm_yellow_hue',
				this.camera.model == 'P100' || this.camera.model == 'PF120'
					? this.camera.cmsetup.cam_cm_yel_hue
					: this.camera.cmsetup.cm_YellowHue
			)
		}
	}
	// /birddogadvancesetup
	if (this.camera.advancesetup) {
		if (MODEL_SPEC?.brightness) {
			this.setVariable('brightness', this.camera.advancesetup.Brightness)
		}

		if (MODEL_SPEC?.brightness_comp) {
			this.setVariable('brightness_comp', this.camera.advancesetup.BrightnessComp)
		}

		if (MODEL_SPEC?.comp_level) {
			this.setVariable('comp_level', this.camera.advancesetup.CompLevel)
		}

		if (MODEL_SPEC?.gamma_offset) {
			this.setVariable('gamma_offset', this.camera.advancesetup.GammaOffset)
		}

		if (MODEL_SPEC?.high_resolution) {
			this.setVariable('high_resolution', this.camera.advancesetup.HighResolution)
		}

		if (MODEL_SPEC?.video_enhancement) {
			this.setVariable('video_enhancement', this.camera.advancesetup.VideoEnhancement)
		}
	}
	// /birddogexternalsetup
	// /birddogdetsetup
	if (this.camera.detail) {
		if (MODEL_SPEC?.bandwidth) {
			this.setVariable('bandwidth', this.camera.detail.Bandwidth)
		}
	}
	// /birddoggammasetup
}
