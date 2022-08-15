const { getPositionLabel, getModelVariables, getModelActions } = require('./utils')

var { MODEL_SPECS } = require('./models.js')
const CHOICES = require('./choices.js')

// ##########################
// #### Define Variables ####
// ##########################
exports.updateVariableDefinitions = function () {
	this.setVariableDefinitions(getModelVariables(MODEL_SPECS, this.camera.firmware.major, this.camera.model))
}

// #########################
// #### Update Variables ####
// #########################
exports.updateVariables = function () {
	MODEL_VARIABLES = getModelVariables(MODEL_SPECS, this.camera.firmware.major, this.camera.model)
	MODEL_ACTIONS = getModelActions(MODEL_SPECS, this.camera.firmware.major, this.camera.model)

	// General Camera Variables
	if (this.camera.about) {
		if (MODEL_VARIABLES.some((variable) => variable.name === 'firmware')) {
			this.setVariable('firmware', this.camera.firmware.major + '.' + this.camera.firmware.minor)
		}
		if (MODEL_VARIABLES.some((variable) => variable.name === 'model')) {
			this.setVariable('model', this.camera.model)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'hostname')) {
			this.setVariable('hostname', this.camera.hostname)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'ipaddress')) {
			this.setVariable('ipaddress', this.camera.ipaddress)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'netmask')) {
			this.setVariable('netmask', this.camera.netmask)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'network_config')) {
			this.setVariable('network_config', this.camera.network_config)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'serial_number')) {
			this.setVariable('serial_number', this.camera.serial_number)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'status')) {
			this.setVariable('status', this.camera.status)
		}
	}
	// VISCA Variables
	if (MODEL_VARIABLES.some((variable) => variable.name === 'standby')) {
		this.setVariable('standby', MODEL_ACTIONS.standby.choices.find((o) => o.id == this.camera.standby)?.label)
	}

	if (MODEL_VARIABLES.some((variable) => variable.name === 'freeze')) {
		this.setVariable('freeze', this.camera.freeze)
	}

	// Analog Audio Variables

	if (this.camera.audio) {
		if (MODEL_VARIABLES.some((variable) => variable.name === 'audio_in_gain')) {
			this.setVariable('audio_in_gain', this.camera.analogAudioInGain - 50 + 'DB') //Convert API range to action range
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'audio_out_gain')) {
			this.setVariable('audio_out_gain', this.camera.analogAudioOutGain - 50 + 'DB') //Convert API range to action range
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'audio_output')) {
			this.setVariable('audio_output', this.camera.analogAudioOutput)
		}
	}
	// Video Output Interface Variables

	if (this.camera.video) {
		if (MODEL_VARIABLES.some((variable) => variable.name === 'video_output')) {
			this.setVariable('video_output', this.camera.video_output)
		}
	}
	// Encode Setup Variables

	if (this.camera.encode) {
		if (MODEL_VARIABLES.some((variable) => variable.name === 'bandwidth_mode')) {
			this.setVariable('bandwidth_mode', this.camera.bandwidth_mode)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'bandwidth_select')) {
			this.setVariable('bandwidth_select', this.camera.bandwidth_select)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'ndi_audio')) {
			this.setVariable('ndi_audio', this.camera.ndiAudio)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'ndi_group')) {
			this.setVariable('ndi_group', this.camera.ndiGroupEnable === 'NDIGroupEn' ? 'Enabled' : 'Disabled')
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'ndi_group_name')) {
			this.setVariable('ndi_group_name', this.camera.ndi_group_name)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'stream_name')) {
			this.setVariable('stream_name', this.camera.stream_name)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'tally_mode')) {
			this.setVariable('tally_mode', this.camera.tally)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'video_format')) {
			this.setVariable('video_format', this.camera.video_format)
		}
	}
	// Encode Transport Variables

	if (this.camera.transport) {
		if (MODEL_VARIABLES.some((variable) => variable.name === 'transmit_method')) {
			this.setVariable('transmit_method', this.camera.transmit_method)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'transmit_netprefix')) {
			this.setVariable('transmit_netprefix', this.camera.transmit_netprefix)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'transmit_netmask')) {
			this.setVariable('transmit_netmask', this.camera.transmit_netmask)
		}
	}
	// NDI Discovery Server Variables

	if (this.camera.ndiserver) {
		if (MODEL_VARIABLES.some((variable) => variable.name === 'ndi_discovery_server')) {
			this.setVariable(
				'ndi_discovery_server',
				this.camera.ndi_discovery_server === 'NDIDisServEn' ? 'Enabled' : 'Disabled'
			)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'ndi_discovery_server_ip')) {
			this.setVariable('ndi_discovery_server_ip', this.camera.ndi_discovery_server_ip)
		}
	}
	// PTZ Variables

	if (this.camera.ptz) {
		if (MODEL_VARIABLES.some((variable) => variable.name === 'pan_speed')) {
			this.setVariable('pan_speed', this.camera.panSpeed)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'tilt_speed')) {
			this.setVariable('tilt_speed', this.camera.tiltSpeed)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'zoom_speed')) {
			this.setVariable('zoom_speed', this.camera.zoomSpeed)
		}
	}
	if (this.camera.position) {
		if (MODEL_VARIABLES.some((variable) => variable.name === 'zoom_position')) {
			this.setVariable('zoom_position', getPositionLabel(MODEL_ACTIONS.zoom.posZoomChoices, this.camera.zoom_position))
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'pan_position')) {
			this.setVariable('pan_position', getPositionLabel(MODEL_ACTIONS.pt.posPanChoices, this.camera.pan_position))
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'tilt_position')) {
			this.setVariable('tilt_position', getPositionLabel(MODEL_ACTIONS.pt.posTiltChoices, this.camera.tilt_position))
		}
	}
	// Focus Variables

	if (this.camera.focusM) {
		if (MODEL_VARIABLES.some((variable) => variable.name === 'focus_mode')) {
			this.setVariable('focus_mode', this.camera.focusM)
		}
	}
	// Exposure Variables

	if (this.camera.expsetup) {
		if (MODEL_VARIABLES.some((variable) => variable.name === 'ae_response')) {
			this.setVariable('ae_response', this.camera.ae_response)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'backlight')) {
			this.setVariable('backlight', this.camera.backlight)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'bright_level')) {
			this.setVariable('bright_level', this.camera.bright_level)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'exposure_comp')) {
			this.setVariable('exposure_comp', this.camera.expComp)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'exposure_comp_level')) {
			//Convert API range to variable range for P100 & PF120
			let level =
				this.camera.model === 'P100' || this.camera.model === 'PF120'
					? parseInt(this.camera.expCompLvl) - 7
					: this.camera.expCompLvl
			this.setVariable('exposure_comp_level', level?.toString())
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'exposure_mode')) {
			this.setVariable('exposure_mode', this.camera.exposure_mode)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'gain')) {
			this.setVariable('gain', MODEL_ACTIONS.gain.choices.find((o) => o.id == this.camera.gain)?.label)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'gain_limit')) {
			this.setVariable('gain_limit', MODEL_ACTIONS.gain.choices.find((o) => o.id == this.camera.gain_limit)?.label)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'gain_point')) {
			this.setVariable('gain_point', this.camera.gain_point)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'gain_point_position')) {
			this.setVariable('gain_point_position', this.camera.gain_point_position)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'high_sensitivity')) {
			this.setVariable('high_sensitivity', this.camera.high_sensitivity)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'iris')) {
			this.setVariable('iris', MODEL_ACTIONS.iris.choices.find((o) => o.id == this.camera.iris)?.label)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'shutter_control_overwrite')) {
			this.setVariable('shutter_control_overwrite', this.camera.shutter_control_overwrite)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'shutter_max_speed')) {
			this.setVariable('shutter_max_speed', this.camera.shutter_max_speed)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'shutter_min_speed')) {
			this.setVariable('shutter_min_speed', this.camera.shutter_min_speed)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'shutter_speed')) {
			this.setVariable(
				'shutter_speed',
				MODEL_ACTIONS.shutter_speed?.['shutter_' + [this.camera.shutter_table]].find(
					(o) => o.id == this.camera.shutter_speed
				)?.label
			)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'shutter_speed_overwrite')) {
			this.setVariable('shutter_speed_overwrite', this.camera.shutter_speed_overwrite)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'slow_shutter_en')) {
			this.setVariable('slow_shutter_en', this.camera.slow_shutter_en)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'slow_shutter_limit')) {
			this.setVariable('slow_shutter_limit', this.camera.slow_shutter_limit)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'spotlight')) {
			this.setVariable('spotlight', this.camera.spotlight)
		}
	}
	// White Balance Variables

	if (this.camera.wbsetup) {
		if (MODEL_VARIABLES.some((variable) => variable.name === 'bg')) {
			this.setVariable('bg', this.camera.bg)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'br')) {
			this.setVariable('br', this.camera.br)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'blue_gain')) {
			this.setVariable('blue_gain', this.camera.blue_gain)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'color_temp')) {
			this.setVariable('color_temp', this.camera.color_temp)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'gb')) {
			this.setVariable('gb', this.camera.gb)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'gr')) {
			this.setVariable('gr', this.camera.gr)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'level')) {
			this.setVariable('level', this.camera.level)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'matrix')) {
			this.setVariable('matrix', this.camera.matrix)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'offset')) {
			this.setVariable('offset', this.camera.offset)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'phase')) {
			this.setVariable('phase', this.camera.phase)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'rb')) {
			this.setVariable('rb', this.camera.rb)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'rg')) {
			this.setVariable('rg', this.camera.rg)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'red_gain')) {
			this.setVariable('red_gain', this.camera.red_gain)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'select')) {
			this.setVariable('select', this.camera.select)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'speed')) {
			this.setVariable('speed', this.camera.speed)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'wb_mode')) {
			this.setVariable('wb_mode', this.camera.wb_mode)
		}
	}
	// Picture Setup Variables

	if (this.camera.picsetup) {
		if (MODEL_VARIABLES.some((variable) => variable.name === 'backlight_com')) {
			this.setVariable('backlight_com', this.camera.backlight_com)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'chroma_suppress')) {
			this.setVariable('chroma_suppress', this.camera.chroma_suppress)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'color')) {
			this.setVariable('color', this.camera.color)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'contrast')) {
			this.setVariable('contrast', this.camera.contrast)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'effect')) {
			this.setVariable('effect', this.camera.pictureEffect)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'flip')) {
			this.setVariable('flip', this.camera.picFlip)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'gamma')) {
			this.setVariable('gamma', this.camera.gamma)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'highlight_comp')) {
			this.setVariable('highlight_comp', this.camera.highlight_comp)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'highlight_comp_mask')) {
			this.setVariable('highlight_comp_mask', this.camera.highlight_comp_mask)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'hue')) {
			this.setVariable('hue', this.camera.hue)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'ir_cutfilter')) {
			this.setVariable('ir_cutfilter', this.camera.ir_cutfilter)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'low_latency')) {
			this.setVariable('low_latency', this.camera.low_latency)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'mirror')) {
			this.setVariable('mirror', this.camera.picMirror)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'nd_filter')) {
			this.setVariable('nd_filter', this.camera.nd_filter)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'noise_reduction')) {
			this.setVariable('noise_reduction', this.camera.noise_reduction)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'sharpness')) {
			this.setVariable('sharpness', this.camera.sharpness)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'stabilizer')) {
			this.setVariable('stabilizer', this.camera.stabilizer)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'threed_nr')) {
			this.setVariable('threed_nr', this.camera.threed_nr)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'twod_nr')) {
			this.setVariable('twod_nr', this.camera.twod_nr)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'wide_dynamic_range')) {
			this.setVariable('wide_dynamic_range', this.camera.wide_dynamic_range)
		}
	}

	// Color Matrix Variables

	if (this.camera.cmsetup) {
		if (MODEL_VARIABLES.some((variable) => variable.name === 'cm_blue_gain')) {
			this.setVariable('cm_blue_gain', this.camera.cm_blue_gain)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'cm_blue_hue')) {
			this.setVariable('cm_blue_hue', this.camera.cm_blue_hue)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'cm_color_gain')) {
			this.setVariable('cm_color_gain', this.camera.cm_color_gain)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'cm_cyan_gain')) {
			this.setVariable('cm_cyan_gain', this.camera.cm_cyan_gain)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'cm_cyan_hue')) {
			this.setVariable('cm_cyan_hue', this.camera.cm_cyan_hue)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'cm_green_gain')) {
			this.setVariable('cm_green_gain', this.camera.cm_green_gain)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'cm_green_hue')) {
			this.setVariable('cm_green_hue', this.camera.cm_green_hue)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'cm_hue_phase')) {
			this.setVariable('cm_hue_phase', this.camera.cm_hue_phase)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'cm_mag_gain')) {
			this.setVariable('cm_mag_gain', this.camera.cm_mag_gain)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'cm_mag_hue')) {
			this.setVariable('cm_mag_hue', this.camera.cm_mag_hue)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'cm_red_gain')) {
			this.setVariable('cm_red_gain', this.camera.cm_red_gain)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'cm_red_hue')) {
			this.setVariable('cm_red_hue', this.camera.cm_red_hue)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'cm_yellow_gain')) {
			this.setVariable('cm_yellow_gain', this.camera.cm_yellow_gain)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'cm_yellow_hue')) {
			this.setVariable('cm_yellow_hue', this.camera.cm_yellow_hue)
		}
	}

	// Advanced Setup Variables

	if (this.camera.advancesetup) {
		if (MODEL_VARIABLES.some((variable) => variable.name === 'brightness')) {
			this.setVariable('brightness', this.camera.brightness)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'brightness_comp')) {
			this.setVariable('brightness_comp', this.camera.brightness_comp)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'comp_level')) {
			this.setVariable('comp_level', this.camera.comp_level)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'gamma_offset')) {
			this.setVariable('gamma_offset', this.camera.gamma_offset)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'high_resolution')) {
			this.setVariable('high_resolution', this.camera.high_resolution)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'video_enhancement')) {
			this.setVariable('video_enhancement', this.camera.video_enhancement)
		}
	}

	// External Setup Variables

	if (this.camera.externalsetup) {
		if (MODEL_VARIABLES.some((variable) => variable.name === 'aux')) {
			this.setVariable('aux', this.camera.aux)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'rain_wiper')) {
			this.setVariable('rain_wiper', this.camera.rain_wiper)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'v12vout')) {
			this.setVariable('v12vout', this.camera.v12vout)
		}
	}

	// Detail Setup Variables

	if (this.camera.detsetup) {
		if (MODEL_VARIABLES.some((variable) => variable.name === 'bandwidth')) {
			this.setVariable('bandwidth', this.camera.bandwidth)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'bw_balance')) {
			this.setVariable('bw_balance', this.camera.bw_balance)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'crispening')) {
			this.setVariable('crispening', this.camera.crispening)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'detail')) {
			this.setVariable('detail', this.camera.detail)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'highlight_detail')) {
			this.setVariable('highlight_detail', this.camera.highlight_detail)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'hv_balance')) {
			this.setVariable('hv_balance', this.camera.hv_balance)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'limit')) {
			this.setVariable('limit', this.camera.limit)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'super_low')) {
			this.setVariable('super_low', this.camera.super_low)
		}
	}

	// Gamma Setup Variables

	if (this.camera.gammasetup) {
		if (MODEL_VARIABLES.some((variable) => variable.name === 'black_gamma_level')) {
			this.setVariable('black_gamma_level', this.camera.black_gamma_level)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'black_level')) {
			this.setVariable('black_level', this.camera.black_level)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'black_level_range')) {
			this.setVariable('black_level_range', this.camera.black_level_range)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'effect')) {
			this.setVariable('effect', this.camera.effect)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'level')) {
			this.setVariable('level', this.camera.level)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'offset')) {
			this.setVariable('offset', this.camera.offset)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'pattern')) {
			this.setVariable('pattern', this.camera.pattern)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'pattern_fine')) {
			this.setVariable('pattern_fine', this.camera.pattern_fine)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'settings')) {
			this.setVariable('settings', this.camera.settings)
		}

		if (MODEL_VARIABLES.some((variable) => variable.name === 'visibility_enhancer')) {
			this.setVariable('visibility_enhancer', this.camera.visibility_enhancer)
		}
	}
}
