var { MODELS } = require('./models.js')

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

	if (MODEL.wb_blue_gain.includes(this.camera.model)) {
		variables.push({
			label: `White Balance - Blue Gain`,
			name: `wb_blue_gain`,
		})
	}

	if (MODEL.wb_red_gain.includes(this.camera.model)) {
		variables.push({
			label: `White Balance - Red Gain`,
			name: `wb_red_gain`,
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
