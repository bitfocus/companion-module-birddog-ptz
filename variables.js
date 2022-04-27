var { MODELS } = require('./models.js')
const CHOICES = require('./choices.js')

// ##########################
// #### Define Variables ####
// ##########################
exports.updateVariableDefinitions = function () {
	const variables = []

	MODEL_SPEC = MODELS.find((MODELS) => MODELS.id == this.camera.model).variables

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
	MODEL_SPEC = MODELS.find((MODELS) => MODELS.id == this.camera.model).variables
	MODEL_VALUES = MODELS.find((MODELS) => MODELS.id == this.camera.model).actions

	// /about
	if (this.camera.about) {
		if (MODEL_SPEC?.firmware) {
			this.setVariable('firmware', this.camera.firmware)
		}

		if (MODEL_SPEC?.model) {
			this.setVariable('model', this.camera.model)
		}

		if (MODEL_SPEC?.standby) {
			this.setVariable('standby', this.camera.status === 'on' ? 'Cam On' : 'Standby')
		}

		if (MODEL_SPEC?.status) {
			this.setVariable('status', this.camera.about.Status)
		}
	}
	// /analogaudiosetup
	if (this.camera.audio) {
		if (MODEL_SPEC?.audio_in_gain) {
			this.setVariable('audio_in_gain', this.camera.audio.AnalogAudioInGain)
		}

		if (MODEL_SPEC?.audio_out_gain) {
			this.setVariable('audio_out_gain', this.camera.audio.AnalogAudioOutGain)
		}

		if (MODEL_SPEC?.audio_output) {
			this.setVariable('audio_output', this.camera.audio.AnalogAudiooutputselect)
		}
	}
	// /videooutputinterface
	//	if (MODEL_SPEC?.video_output) {
	//		this.setVariable('video_output',this.camera.xx.videooutput)
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
	// /birddogadvancesetup
	// /birddogexternalsetup
	// /birddogdetsetup
	if (MODEL_SPEC?.bandwidth) {
		this.setVariable('bandwidth', this.camera.detail.Bandwidth)
	}
	// /birddoggammasetup
}
