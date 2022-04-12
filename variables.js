var { MODELS } = require('./models.js')
const CHOICES = require('./choices.js')

// ##########################
// #### Define Variables ####
// ##########################
exports.updateVariableDefinitions = function () {
	const variables = []

	var MODEL = {}

	MODEL = MODELS.find((MODELS) => MODELS.group == 'variables')

	if (MODEL.twod_nr.includes(this.camera.model)) {
		variables.push({
			label: `2D NR`,
			name: `twod_nr`,
		})
	}

	if (MODEL.threed_nr.includes(this.camera.model)) {
		variables.push({
			label: `3D NR`,
			name: `threed_nr`,
		})
	}
	if (MODEL.ae_response.includes(this.camera.model)) {
		variables.push({
			label: `Ae Response`,
			name: `ae_response`,
		})
	}

	if (MODEL.af_mode.includes(this.camera.model)) {
		variables.push({
			label: `Auto Focus Mode`,
			name: `af_mode`,
		})
	}

	if (MODEL.audio_in_gain.includes(this.camera.model)) {
		variables.push({
			label: `Audio In Gain`,
			name: `audio_in_gain`,
		})
	}

	if (MODEL.audio_out_gain.includes(this.camera.model)) {
		variables.push({
			label: `Audio Out Gain`,
			name: `audio_out_gain`,
		})
	}

	if (MODEL.audio_output.includes(this.camera.model)) {
		variables.push({
			label: `Audio Output`,
			name: `audio_output`,
		})
	}

	if (MODEL.backlight.includes(this.camera.model)) {
		variables.push({
			label: `Backlight`,
			name: `backlight`,
		})
	}

	if (MODEL.backlight_com.includes(this.camera.model)) {
		variables.push({
			label: `Backlight Com`,
			name: `backlight_com`,
		})
	}

	if (MODEL.bandwidth.includes(this.camera.model)) {
		variables.push({
			label: `Bandwidth`,
			name: `bandwidth`,
		})
	}

	if (MODEL.bandwidth_mode.includes(this.camera.model)) {
		variables.push({
			label: `Bandwidth Mode`,
			name: `bandwidth_mode`,
		})
	}

	if (MODEL.bandwidth_select.includes(this.camera.model)) {
		variables.push({
			label: `Bandwidth Select`,
			name: `bandwidth_select`,
		})
	}

	if (MODEL.blue_gain.includes(this.camera.model)) {
		variables.push({
			label: `Blue Gain`,
			name: `blue_gain`,
		})
	}

	if (MODEL.bright_level.includes(this.camera.model)) {
		variables.push({
			label: `Bright Level`,
			name: `bright_level`,
		})
	}

	if (MODEL.chroma_suppress.includes(this.camera.model)) {
		variables.push({
			label: `Chroma Suppress`,
			name: `chroma_suppress`,
		})
	}

	if (MODEL.color_temp.includes(this.camera.model)) {
		variables.push({
			label: `Color Temp`,
			name: `color_temp`,
		})
	}

	if (MODEL.contrast.includes(this.camera.model)) {
		variables.push({
			label: `Contrast`,
			name: `contrast`,
		})
	}

	if (MODEL.effect.includes(this.camera.model)) {
		variables.push({
			label: `Effect`,
			name: `effect`,
		})
	}

	if (MODEL.exposure_mode.includes(this.camera.model)) {
		variables.push({
			label: `Exposure Mode`,
			name: `exposure_mode`,
		})
	}

	if (MODEL.exposure_comp.includes(this.camera.model)) {
		variables.push({
			label: `Exposure Compensation`,
			name: `exposure_comp`,
		})
	}

	if (MODEL.exposure_comp_level.includes(this.camera.model)) {
		variables.push({
			label: `Exposure Compensation Level`,
			name: `exposure_comp_level`,
		})
	}

	if (MODEL.firmware.includes(this.camera.model)) {
		variables.push({
			label: `Firmware`,
			name: `firmware`,
		})
	}

	if (MODEL.flip.includes(this.camera.model)) {
		variables.push({
			label: `Flip`,
			name: `flip`,
		})
	}

	if (MODEL.gain.includes(this.camera.model)) {
		variables.push({
			label: `Gain`,
			name: `gain`,
		})
	}

	if (MODEL.gain_limit.includes(this.camera.model)) {
		variables.push({
			label: `Gain Limit`,
			name: `gain_limit`,
		})
	}

	if (MODEL.gain_point.includes(this.camera.model)) {
		variables.push({
			label: `Gain Point`,
			name: `gain_point`,
		})
	}

	if (MODEL.gain_point_position.includes(this.camera.model)) {
		variables.push({
			label: `Gain Point Position`,
			name: `gain_point_position`,
		})
	}

	if (MODEL.gamma.includes(this.camera.model)) {
		variables.push({
			label: `Gamma`,
			name: `gamma`,
		})
	}

	if (MODEL.high_sensitivity.includes(this.camera.model)) {
		variables.push({
			label: `High Sensitivity`,
			name: `high_sensitivity`,
		})
	}

	if (MODEL.hlc_mode.includes(this.camera.model)) {
		variables.push({
			label: `HLC Mode`,
			name: `hlc_mode`,
		})
	}

	if (MODEL.hue.includes(this.camera.model)) {
		variables.push({
			label: `Hue`,
			name: `hue`,
		})
	}

	if (MODEL.iris.includes(this.camera.model)) {
		variables.push({
			label: `Iris`,
			name: `iris`,
		})
	}

	if (MODEL.ir_cutfilter.includes(this.camera.model)) {
		variables.push({
			label: `IR Cut Filter`,
			name: `ir_cutfilter`,
		})
	}

	if (MODEL.low_latency.includes(this.camera.model)) {
		variables.push({
			label: `Low Latency`,
			name: `low_latency`,
		})
	}

	if (MODEL.mirror.includes(this.camera.model)) {
		variables.push({
			label: `Mirror`,
			name: `mirror`,
		})
	}

	if (MODEL.model.includes(this.camera.model)) {
		variables.push({
			label: `Model`,
			name: `model`,
		})
	}

	if (MODEL.nd_filter.includes(this.camera.model)) {
		variables.push({
			label: `ND Filter`,
			name: `nd_filter`,
		})
	}

	if (MODEL.ndi_audio.includes(this.camera.model)) {
		variables.push({
			label: `NDI Audio`,
			name: `ndi_audio`,
		})
	}

	if (MODEL.ndi_discovery_server.includes(this.camera.model)) {
		variables.push({
			label: `NDI Discovery Server`,
			name: `ndi_discovery_server`,
		})
	}

	if (MODEL.ndi_discovery_server_ip.includes(this.camera.model)) {
		variables.push({
			label: `NDI Discovery Server IP`,
			name: `ndi_discovery_server_ip`,
		})
	}

	if (MODEL.ndi_group.includes(this.camera.model)) {
		variables.push({
			label: `NDI Group`,
			name: `ndi_group`,
		})
	}

	if (MODEL.ndi_group_name.includes(this.camera.model)) {
		variables.push({
			label: `NDI Group Name`,
			name: `ndi_group_name`,
		})
	}

	if (MODEL.noise_reduction.includes(this.camera.model)) {
		variables.push({
			label: `Noise Reduction`,
			name: `noise_reduction`,
		})
	}

	if (MODEL.pan_speed.includes(this.camera.model)) {
		variables.push({
			label: `Pan Speed`,
			name: `pan_speed`,
		})
	}

	if (MODEL.red_gain.includes(this.camera.model)) {
		variables.push({
			label: `Red Gain`,
			name: `red_gain`,
		})
	}

	if (MODEL.saturation.includes(this.camera.model)) {
		variables.push({
			label: `Saturation`,
			name: `saturation`,
		})
	}

	if (MODEL.sharpness.includes(this.camera.model)) {
		variables.push({
			label: `Sharpness`,
			name: `sharpness`,
		})
	}

	if (MODEL.shutter_control_overwrite.includes(this.camera.model)) {
		variables.push({
			label: `Shutter Control Overwrite`,
			name: `shutter_control_overwrite`,
		})
	}

	if (MODEL.shutter_max_speed.includes(this.camera.model)) {
		variables.push({
			label: `Shutter Max Speed`,
			name: `shutter_max_speed`,
		})
	}

	if (MODEL.shutter_min_speed.includes(this.camera.model)) {
		variables.push({
			label: `Shutter Min Speed`,
			name: `shutter_min_speed`,
		})
	}

	if (MODEL.shutter_speed.includes(this.camera.model)) {
		variables.push({
			label: `Shutter Speed`,
			name: `shutter_speed`,
		})
	}

	if (MODEL.shutter_speed_overwrite.includes(this.camera.model)) {
		variables.push({
			label: `Shutter Speed Overwrite`,
			name: `shutter_speed_overwrite`,
		})
	}

	if (MODEL.slow_shutter.includes(this.camera.model)) {
		variables.push({
			label: `Slow Shutter `,
			name: `slow_shutter`,
		})
	}

	if (MODEL.slow_shutter_limit.includes(this.camera.model)) {
		variables.push({
			label: `Slow Shutter Limit`,
			name: `slow_shutter_limit`,
		})
	}

	if (MODEL.spotlight.includes(this.camera.model)) {
		variables.push({
			label: `Spotlight`,
			name: `spotlight`,
		})
	}

	if (MODEL.stabilizer.includes(this.camera.model)) {
		variables.push({
			label: `Stabilizer`,
			name: `stabilizer`,
		})
	}

	if (MODEL.standby.includes(this.camera.model)) {
		variables.push({
			label: `Standby`,
			name: `standby`,
		})
	}

	if (MODEL.status.includes(this.camera.model)) {
		variables.push({
			label: `Status`,
			name: `status`,
		})
	}

	if (MODEL.stream_name.includes(this.camera.model)) {
		variables.push({
			label: `Stream Name`,
			name: `stream_name`,
		})
	}

	if (MODEL.tally_mode.includes(this.camera.model)) {
		variables.push({
			label: `Tally Mode`,
			name: `tally_mode`,
		})
	}

	if (MODEL.tilt_speed.includes(this.camera.model)) {
		variables.push({
			label: `Tilt Speed`,
			name: `tilt_speed`,
		})
	}

	if (MODEL.transmit_method.includes(this.camera.model)) {
		variables.push({
			label: `Transmit Method`,
			name: `transmit_method`,
		})
	}

	if (MODEL.video_format.includes(this.camera.model)) {
		variables.push({
			label: `Video Format`,
			name: `video_format`,
		})
	}

	if (MODEL.video_output.includes(this.camera.model)) {
		variables.push({
			label: `Video Output`,
			name: `video_output`,
		})
	}

	if (MODEL.wb_mode.includes(this.camera.model)) {
		variables.push({
			label: `White Balance Mode`,
			name: `wb_mode`,
		})
	}

	if (MODEL.wide_dynamic_range.includes(this.camera.model)) {
		variables.push({
			label: `Wide Dynamic Range`,
			name: `wide_dynamic_range`,
		})
	}

	if (MODEL.zoom_speed.includes(this.camera.model)) {
		variables.push({
			label: `Zoom Speed`,
			name: `zoom_speed`,
		})
	}

	this.setVariableDefinitions(variables)
}

// #########################
// #### Check Variables ####
// #########################
exports.updateSourceVariables = function () {
	var MODEL = {}

	MODEL = MODELS.find((MODELS) => MODELS.group == 'variables')

	// /about
	if (MODEL.firmware.includes(this.camera.model)) {
		this.setVariable('firmware', this.camera.firmware)
	}

	if (MODEL.model.includes(this.camera.model)) {
		this.setVariable('model', this.camera.model)
	}

	if (MODEL.standby.includes(this.camera.model)) {
		this.setVariable('standby', this.camera.status)
	}

	if (MODEL.status.includes(this.camera.model)) {
		this.setVariable('status', this.camera.about.Status)
	}

	// /analogaudiosetup
	if (MODEL.audio_in_gain.includes(this.camera.model)) {
		this.setVariable('audio_in_gain', this.camera.audio.AnalogAudioInGain)
	}

	if (MODEL.audio_out_gain.includes(this.camera.model)) {
		this.setVariable('audio_out_gain', this.camera.audio.AnalogAudioOutGain)
	}

	if (MODEL.audio_output.includes(this.camera.model)) {
		this.setVariable('audio_output', this.camera.audio.AnalogAudiooutputselect)
	}

	// /videooutputinterface
	//	if (MODEL.video_output.includes(this.camera.model)) {
	//		this.setVariable('video_output',this.camera.xx.videooutput)
	//	}

	// /encodesetup
	if (MODEL.bandwidth_mode.includes(this.camera.model)) {
		this.setVariable('bandwidth_mode', this.camera.encode.BandwidthMode)
	}

	if (MODEL.bandwidth_select.includes(this.camera.model)) {
		this.setVariable('bandwidth_select', this.camera.encode.BandwidthSelect)
	}

	if (MODEL.ndi_audio.includes(this.camera.model)) {
		this.setVariable('ndi_audio', this.camera.encode.NDIAudio)
	}

	if (MODEL.ndi_group.includes(this.camera.model)) {
		this.setVariable('ndi_group', this.camera.encode.NDIGroup)
	}

	if (MODEL.ndi_group_name.includes(this.camera.model)) {
		this.setVariable('ndi_group_name', this.camera.encode.NDIGroupName)
	}

	if (MODEL.stream_name.includes(this.camera.model)) {
		this.setVariable('stream_name', this.camera.encode.StreamName)
	}

	if (MODEL.tally_mode.includes(this.camera.model)) {
		this.setVariable('tally_mode', this.camera.encode.TallyMode)
	}

	if (MODEL.video_format.includes(this.camera.model)) {
		this.setVariable('video_format', this.camera.encode.VideoFormat)
	}

	// /encodeTransport
	if (MODEL.transmit_method.includes(this.camera.model)) {
		this.setVariable('transmit_method', this.camera.transport.Txpm)
	}

	// /NDIDisServer
	if (MODEL.ndi_discovery_server.includes(this.camera.model)) {
		this.setVariable('ndi_discovery_server', this.camera.ndiserver.NDIDisServ)
	}

	if (MODEL.ndi_discovery_server_ip.includes(this.camera.model)) {
		this.setVariable('ndi_discovery_server_ip', this.camera.ndiserver.NDIDisServIP)
	}

	// /birddogptzsetup
	if (MODEL.pan_speed.includes(this.camera.model)) {
		this.setVariable('pan_speed', this.camera.ptz.PanSpeed)
	}

	if (MODEL.tilt_speed.includes(this.camera.model)) {
		this.setVariable('tilt_speed', this.camera.ptz.TiltSpeed)
	}

	if (MODEL.zoom_speed.includes(this.camera.model)) {
		this.setVariable('zoom_speed', this.camera.ptz.ZoomSpeed)
	}

	// Focus Settings
	if (MODEL.af_mode.includes(this.camera.model)) {
		this.setVariable('af_mode', this.camera.focus.mode)
	}

	// /birddogexpsetup
	if (MODEL.ae_response.includes(this.camera.model)) {
		this.setVariable('ae_response', this.camera.expsetup.AeReponse)
	}

	if (MODEL.backlight.includes(this.camera.model)) {
		this.setVariable('backlight', this.camera.expsetup.BackLight)
	}

	if (MODEL.bright_level.includes(this.camera.model)) {
		this.setVariable('bright_level', this.camera.expsetup.BrightLevel)
	}

	if (MODEL.exposure_comp.includes(this.camera.model)) {
		this.setVariable('exposure_comp', this.camera.expsetup.ExpCompEn)
	}

	if (MODEL.exposure_comp_level.includes(this.camera.model)) {
		this.setVariable('exposure_comp_level', this.camera.expsetup.ExpCompLvl)
	}

	if (MODEL.exposure_mode.includes(this.camera.model)) {
		this.setVariable('exposure_mode', this.camera.expsetup.ExpMode)
	}

	if (MODEL.gain.includes(this.camera.model)) {
		this.setVariable('gain', this.GAIN.find((o) => o.id == this.camera.expsetup.GainLevel)?.label)
	}

	if (MODEL.gain_limit.includes(this.camera.model)) {
		this.setVariable('gain_limit', this.GAIN.find((o) => o.id == this.camera.expsetup.GainLimit)?.label)
	}

	if (MODEL.gain_point.includes(this.camera.model)) {
		this.setVariable('gain_point', this.camera.expsetup.GainPoint)
	}

	if (MODEL.gain_point_position.includes(this.camera.model)) {
		this.setVariable('gain_point_position', this.camera.expsetup.GainPointPosition)
	}

	if (MODEL.high_sensitivity.includes(this.camera.model)) {
		this.setVariable('high_sensitivity', this.camera.expsetup.HighSensitivity)
	}

	if (MODEL.iris.includes(this.camera.model)) {
		this.setVariable(
			'iris',
			this.camera.expsetup.IrisLevel == '4'
				? 'CLOSED'
				: this.IRIS.find((o) => o.id == this.camera.expsetup.IrisLevel)?.label
		)
	}

	if (MODEL.shutter_control_overwrite.includes(this.camera.model)) {
		this.setVariable('shutter_control_overwrite', this.camera.expsetup.ShutterControlOverwrite)
	}

	if (MODEL.shutter_max_speed.includes(this.camera.model)) {
		this.setVariable('shutter_max_speed', this.camera.expsetup.ShutterMaxSpeed)
	}

	if (MODEL.shutter_min_speed.includes(this.camera.model)) {
		this.setVariable('shutter_min_speed', this.camera.expsetup.ShutterMinSpeed)
	}

	if (MODEL.shutter_speed.includes(this.camera.model)) {
		this.setVariable('shutter_speed', this.SHUTTER.find((o) => o.id == this.camera.expsetup.ShutterSpeed)?.label)
	}

	if (MODEL.shutter_speed_overwrite.includes(this.camera.model)) {
		this.setVariable('shutter_speed_overwrite', this.camera.expsetup.ShutterSpeedOverwrite)
	}

	if (MODEL.slow_shutter.includes(this.camera.model)) {
		this.setVariable('slow_shutter', this.camera.expsetup.SlowShutterEn)
	}

	if (MODEL.slow_shutter_limit.includes(this.camera.model)) {
		this.setVariable('slow_shutter_limit', this.camera.expsetup.SlowShutterLimit)
	}

	if (MODEL.spotlight.includes(this.camera.model)) {
		this.setVariable('spotlight', this.camera.expsetup.Spotlight)
	}

	// /birddogwbsetup
	if (MODEL.blue_gain.includes(this.camera.model)) {
		this.setVariable('blue_gain', this.camera.wbsetup.BlueGain)
	}

	if (MODEL.color_temp.includes(this.camera.model)) {
		this.setVariable('color_temp', this.camera.wbsetup.ColorTemp)
	}
	if (MODEL.red_gain.includes(this.camera.model)) {
		this.setVariable('red_gain', this.camera.wbsetup.RedGain)
	}

	if (MODEL.wb_mode.includes(this.camera.model)) {
		this.setVariable('wb_mode', this.camera.wbsetup.WbMode)
	}

	// /birddogpicsetup

	if (MODEL.backlight_com.includes(this.camera.model)) {
		this.setVariable('backlight_com', this.camera.picsetup.BackLightCom)
	}

	if (MODEL.chroma_suppress.includes(this.camera.model)) {
		this.setVariable('chroma_suppress', this.camera.picsetup.ChromeSuppress)
	}

	if (MODEL.contrast.includes(this.camera.model)) {
		this.setVariable('contrast', this.camera.picsetup.Contrast)
	}

	if (MODEL.effect.includes(this.camera.model)) {
		this.setVariable('effect', this.camera.picsetup.Effect)
	}

	if (MODEL.flip.includes(this.camera.model)) {
		this.setVariable('flip', this.camera.picsetup.Flip)
	}

	if (MODEL.gamma.includes(this.camera.model)) {
		this.setVariable('gamma', this.camera.picsetup.Gamma)
	}

	if (MODEL.hlc_mode.includes(this.camera.model)) {
		this.setVariable('hlc_mode', this.camera.picsetup.HighlightComp)
	}

	if (MODEL.hue.includes(this.camera.model)) {
		this.setVariable('hue', this.camera.picsetup.Hue)
	}

	if (MODEL.ir_cutfilter.includes(this.camera.model)) {
		this.setVariable('ir_cutfilter', this.camera.picsetup.IRCutFilter)
	}

	if (MODEL.low_latency.includes(this.camera.model)) {
		this.setVariable('low_latency', this.camera.picsetup.LowLatency)
	}

	if (MODEL.mirror.includes(this.camera.model)) {
		this.setVariable('mirror', this.camera.picsetup.Mirror)
	}

	if (MODEL.nd_filter.includes(this.camera.model)) {
		this.setVariable('nd_filter', this.camera.picsetup.NDFilter)
	}

	if (MODEL.noise_reduction.includes(this.camera.model)) {
		this.setVariable('noise_reduction', this.camera.picsetup.NoiseReduction)
	}

	if (MODEL.saturation.includes(this.camera.model)) {
		this.setVariable('saturation', this.camera.picsetup.Color)
	}

	if (MODEL.sharpness.includes(this.camera.model)) {
		this.setVariable('sharpness', this.camera.picsetup.Sharpness)
	}

	if (MODEL.stabilizer.includes(this.camera.model)) {
		this.setVariable('stabilizer', this.camera.picsetup.Stabilizer)
	}

	if (MODEL.twod_nr.includes(this.camera.model)) {
		this.setVariable('twod_nr', this.camera.picsetup.TWODNR)
	}

	if (MODEL.threed_nr.includes(this.camera.model)) {
		this.setVariable('threed_nr', this.camera.picsetup.ThreeDNR)
	}

	if (MODEL.wide_dynamic_range.includes(this.camera.model)) {
		this.setVariable('wide_dynamic_range', this.camera.picsetup.WideDynamicRange)
	}

	// //birddogcmsetup
	// /birddogadvancesetup
	// /birddogexternalsetup
	// /birddogdetsetup
	//	if (MODEL.bandwidth.includes(this.camera.model)) {
	//		this.setVariable('bandwidth',this.camera.detail.Bandwidth)
	//	}
	// /birddoggammasetup
}
