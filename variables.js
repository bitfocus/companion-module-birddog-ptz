import { getPositionLabel, getModelVariables, getModelActions } from './utils.js'

import { MODEL_SPECS } from './models.js'
//const CHOICES = require('./choices.js')

// ##########################
// #### Define Variables ####
// ##########################
export function updateVariableDefinitions() {
	this.setVariableDefinitions(getModelVariables(MODEL_SPECS, this.camera.firmware.major, this.camera.model))
}

// #########################
// #### Update Variables ####
// #########################
export function updateVariables() {
	let MODEL_VARIABLES = getModelVariables(MODEL_SPECS, this.camera.firmware.major, this.camera.model)
	let MODEL_ACTIONS = getModelActions(MODEL_SPECS, this.camera.firmware.major, this.camera.model)

	let updatedVariables = {}

	// General Camera Variables

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'firmware')) {
		updatedVariables.firmware = this.camera.firmware.major + '.' + this.camera.firmware.minor
	}
	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'model')) {
		updatedVariables.model = this.camera.model
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'hostname')) {
		updatedVariables.hostname = this.camera.hostname
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'hardware_version')) {
		updatedVariables.hardware_version = this.camera.hardware_version
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'ipaddress')) {
		updatedVariables.ipaddress = this.camera.ipaddress
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'fallback_ip')) {
		updatedVariables.fallback_IP = this.camera.fallback_IP
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'netmask')) {
		updatedVariables.netmask = this.camera.netmask
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'network_config')) {
		updatedVariables.network_config = this.camera.network_config
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'dns')) {
		updatedVariables.dns = this.camera.dns
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'serial_number')) {
		updatedVariables.serial_number = this.camera.serial_number
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'status')) {
		updatedVariables.status = this.camera.status
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'wifi_config_method')) {
		updatedVariables.wifi_config_method = this.camera.wifi_config_method
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'wifi_ip_address')) {
		updatedVariables.wifi_ip_address = this.camera.wifi_ip_address
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'wifi_netmask')) {
		updatedVariables.wifi_netmask = this.camera.wifi_netmask
	}

	// VISCA Variables
	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'standby')) {
		updatedVariables.standby = MODEL_ACTIONS.standby.choices.find((o) => o.id == this.camera.standby)?.label
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'freeze')) {
		updatedVariables.freeze = this.camera.freeze
	}

	// Analog Audio Variables

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'audio_in_gain')) {
		updatedVariables.audio_in_gain = this.camera.analogAudioInGain - 50 + 'dB' //Convert API range to action range
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'audio_out_gain')) {
		updatedVariables.audio_out_gain = this.camera.analogAudioOutGain - 50 + 'dB' //Convert API range to action range
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'audio_output')) {
		updatedVariables.audio_output = MODEL_ACTIONS.analogAudioOutput.choices.find(
			(o) => o.id == this.camera.analogAudioOutput,
		)?.label
	}

	// Device Settings Variables

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'oled')) {
		updatedVariables.oled = this.camera.oled
	}

	// Video Output Interface Variables

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'video_output')) {
		updatedVariables.video_output = this.camera.video_output
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'output_mode')) {
		updatedVariables.output_mode = this.camera.output_mode
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'output_format')) {
		updatedVariables.output_format = this.camera.output_format
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'privacy_mode')) {
		updatedVariables.privacy_mode = this.camera.privacy_mode
	}

	// Encode Setup Variables

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'bandwidth_mode')) {
		updatedVariables.bandwidth_mode = MODEL_ACTIONS.bandwidth_mode.choices.find(
			(o) => o.id == this.camera.bandwidth_mode,
		)?.label
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'bandwidth_select')) {
		updatedVariables.bandwidth_select = this.camera.bandwidth_select
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'color_bitdepth')) {
		updatedVariables.color_bitdepth = this.camera.color_bitdepth
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'ndi_audio')) {
		updatedVariables.ndi_audio = MODEL_ACTIONS.ndiAudio.choices.find((o) => o.id == this.camera.ndiAudio)?.label
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'ndi_group')) {
		updatedVariables.ndi_group = MODEL_ACTIONS.ndiGroupEnable.choices.find(
			(o) => o.id == this.camera.ndiGroupEnable,
		)?.label
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'ndi_group_name')) {
		updatedVariables.ndi_group_name = this.camera.ndi_group_name
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'screensaver_mode')) {
		updatedVariables.screensaver_mode = MODEL_ACTIONS.screensaver_mode.choices.find(
			(o) => o.id == this.camera.screensaver_mode,
		)?.label
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'stream_name')) {
		updatedVariables.stream_name = this.camera.stream_name
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'stream_to_network')) {
		updatedVariables.stream_to_network = this.camera.stream_to_network
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'tally_mode')) {
		updatedVariables.tally_mode = this.camera.tally_mode ?? this.camera.tally_state
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'tally_rest_state')) {
		updatedVariables.tally_rest_state = this.camera.tally_rest_state
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'video_csc')) {
		updatedVariables.video_csc = this.camera.video_csc
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'video_format')) {
		updatedVariables.video_format = this.camera.video_format
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'video_sample_rate')) {
		updatedVariables.video_sample_rate = this.camera.video_sample_rate
	}

	// Encode Transport Variables

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'transmit_method')) {
		updatedVariables.transmit_method = this.camera.transmit_method
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'transmit_netprefix')) {
		updatedVariables.transmit_netprefix = this.camera.transmit_netprefix
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'transmit_netmask')) {
		updatedVariables.transmit_netmask = this.camera.transmit_netmask
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'transmit_ttl')) {
		updatedVariables.transmit_ttl = this.camera.transmit_ttl
	}

	// NDI Discovery Server Variables

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'ndi_discovery_server')) {
		updatedVariables.ndi_discovery_server = MODEL_ACTIONS.ndi_discovery_server.choices.find(
			(o) => o.id == this.camera.ndi_discovery_server,
		)?.label
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'ndi_discovery_server_ip')) {
		updatedVariables.ndi_discovery_server_ip = this.camera.ndi_discovery_server_ip
	}

	// PTZ Variables

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'freed')) {
		updatedVariables.freed = this.camera.freed
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'freed_ip_address')) {
		updatedVariables.freed_ip_address = this.camera.freed_ip_address
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'freed_port')) {
		updatedVariables.freed_port = this.camera.freed_port
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'pan_speed')) {
		updatedVariables.pan_speed = this.camera.panSpeed
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'preset')) {
		updatedVariables.preset = MODEL_ACTIONS.preset.choices.find((o) => o.id == this.camera.preset)?.label
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'preset_speed')) {
		updatedVariables.preset_speed = this.camera.preset_speed
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'tilt_speed')) {
		updatedVariables.tilt_speed = this.camera.tiltSpeed
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'zoom_speed')) {
		updatedVariables.zoom_speed = this.camera.zoomSpeed
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'zoom_position')) {
		let label = getPositionLabel(MODEL_ACTIONS.zoom.posZoomChoices, this.camera.zoom_position)
		updatedVariables.zoom_position = label
		updatedVariables.zoom_position_int = label?.replace(/['X']/gi, '')
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'pan_position')) {
		let label = getPositionLabel(MODEL_ACTIONS.pt.posPanChoices, this.camera.pan_position)
		updatedVariables.pan_position = label
		updatedVariables.pan_position_int = label?.replace(/['°']/gi, '')
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'tilt_position')) {
		let label = getPositionLabel(MODEL_ACTIONS.pt.posTiltChoices, this.camera.tilt_position)
		updatedVariables.tilt_position = label
		updatedVariables.tilt_position_int = label?.replace(/['°']/gi, '')
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'speed_control')) {
		updatedVariables.speed_control = MODEL_ACTIONS.speedControl.choices.find(
			(o) => o.id == this.camera.speedControl,
		)?.label
	}

	// Focus Variables

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'focus_mode')) {
		updatedVariables.focus_mode = this.camera.focusM
	}

	// Exposure Variables

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'ae_response')) {
		updatedVariables.ae_response = this.camera.ae_response
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'backlight')) {
		updatedVariables.backlight = this.camera.backlight
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'bright_level')) {
		updatedVariables.bright_level = this.camera.bright_level
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'exposure_comp')) {
		updatedVariables.exposure_comp = this.camera.expComp
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'exposure_comp_level')) {
		//Convert API range to variable range for P100 & PF120
		let level =
			this.camera.model === 'P100' || this.camera.model === 'PF120'
				? parseInt(this.camera.expCompLvl) - 7
				: this.camera.expCompLvl
		updatedVariables.exposure_comp_level = level?.toString()
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'exposure_mode')) {
		updatedVariables.exposure_mode = this.camera.exposure_mode
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'gain')) {
		updatedVariables.gain = MODEL_ACTIONS.gain.value.choices.find((o) => o.id == this.camera.gain)?.label
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'gain_limit')) {
		updatedVariables.gain_limit = MODEL_ACTIONS.gain.value.choices.find((o) => o.id == this.camera.gain_limit)?.label
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'gain_point')) {
		updatedVariables.gain_point = this.camera.gain_point
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'gain_point_position')) {
		updatedVariables.gain_point_position = this.camera.gain_point_position
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'high_sensitivity')) {
		updatedVariables.high_sensitivity = this.camera.high_sensitivity
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'iris')) {
		updatedVariables.iris = MODEL_ACTIONS.iris.value.choices.find((o) => o.id == this.camera.iris)?.label
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'shutter_control_overwrite')) {
		updatedVariables.shutter_control_overwrite = this.camera.shutter_control_overwrite
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'shutter_max_speed')) {
		updatedVariables.shutter_max_speed = this.camera.shutter_max_speed
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'shutter_min_speed')) {
		updatedVariables.shutter_min_speed = this.camera.shutter_min_speed
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'shutter_speed')) {
		updatedVariables.shutter_speed = MODEL_ACTIONS.shutter_speed?.['shutter_' + [this.camera.shutter_table]]?.find(
			(o) => o.id == this.camera.shutter_speed,
		)?.label
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'shutter_speed_overwrite')) {
		updatedVariables.shutter_speed_overwrite = this.camera.shutter_speed_overwrite
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'slow_shutter_en')) {
		updatedVariables.slow_shutter_en = this.camera.slow_shutter_en
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'slow_shutter_limit')) {
		updatedVariables.slow_shutter_limit = MODEL_ACTIONS.slow_shutter_limit?.[
			'shutter_' + [this.camera.shutter_table]
		]?.find((o) => o.id == this.camera.slow_shutter_limit)?.label
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'spotlight')) {
		updatedVariables.spotlight = this.camera.spotlight
	}

	// White Balance Variables

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'bg')) {
		updatedVariables.bg = this.camera.bg
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'br')) {
		updatedVariables.br = this.camera.br
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'blue_gain')) {
		updatedVariables.blue_gain = this.camera.blue_gain
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'color_temp')) {
		updatedVariables.color_temp = this.camera.color_temp
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'gb')) {
		updatedVariables.gb = this.camera.gb
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'gr')) {
		updatedVariables.gr = this.camera.gr
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'level')) {
		updatedVariables.level = this.camera.level
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'matrix')) {
		updatedVariables.matrix = this.camera.matrix
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'offset')) {
		updatedVariables.offset = this.camera.offset
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'phase')) {
		updatedVariables.phase = this.camera.phase
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'rb')) {
		updatedVariables.rb = this.camera.rb
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'rg')) {
		updatedVariables.rg = this.camera.rg
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'red_gain')) {
		updatedVariables.red_gain = this.camera.red_gain
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'select')) {
		updatedVariables.select = this.camera.select
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'speed')) {
		updatedVariables.speed = this.camera.speed
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'wb_mode')) {
		updatedVariables.wb_mode = this.camera.wb_mode
	}

	// Picture Setup Variables

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'backlight_com')) {
		updatedVariables.backlight_com = this.camera.backlight_com
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'chroma_suppress')) {
		updatedVariables.chroma_suppress = this.camera.chroma_suppress
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'contrast')) {
		updatedVariables.contrast = this.camera.contrast
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'bw_effect')) {
		updatedVariables.bw_effect = this.camera.pictureEffect
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'flip')) {
		updatedVariables.flip = this.camera.picFlip
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'gamma')) {
		updatedVariables.gamma = this.camera.gamma
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'highlight_comp')) {
		updatedVariables.highlight_comp = this.camera.highlight_comp
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'highlight_comp_mask')) {
		updatedVariables.highlight_comp_mask = this.camera.highlight_comp_mask
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'hue')) {
		updatedVariables.hue = this.camera.hue
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'ir_cutfilter')) {
		updatedVariables.ir_cutfilter = this.camera.ir_cutfilter
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'low_latency')) {
		updatedVariables.low_latency = this.camera.low_latency
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'mirror')) {
		updatedVariables.mirror = this.camera.picMirror
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'nd_filter')) {
		updatedVariables.nd_filter = this.camera.nd_filter
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'noise_reduction')) {
		updatedVariables.noise_reduction = MODEL_ACTIONS.noise_reduction.value.choices.find(
			(o) => o.id == this.camera.noise_reduction,
		)?.label
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'saturation')) {
		updatedVariables.saturation = this.camera.saturation
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'sharpness')) {
		updatedVariables.sharpness = this.camera.sharpness
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'stabilizer')) {
		updatedVariables.stabilizer = this.camera.stabilizer
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'threed_nr')) {
		updatedVariables.threed_nr = this.camera.threed_nr
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'twod_nr')) {
		updatedVariables.twod_nr = this.camera.twod_nr
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'wide_dynamic_range')) {
		updatedVariables.wide_dynamic_range = MODEL_ACTIONS.wide_dynamic_range.value.choices.find(
			(o) => o.id == this.camera.wide_dynamic_range,
		)?.label
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'wdr_enable')) {
		updatedVariables.wdr_enable = this.camera.wdr_enable
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'deflicker')) {
		updatedVariables.deflicker = this.camera.deflicker
	}

	// Color Matrix Variables

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'cm_blue_gain')) {
		updatedVariables.cm_blue_gain = this.camera.cm_blue_gain
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'cm_blue_hue')) {
		updatedVariables.cm_blue_hue = this.camera.cm_blue_hue
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'cm_color_gain')) {
		updatedVariables.cm_color_gain = this.camera.cm_color_gain
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'cm_cyan_gain')) {
		updatedVariables.cm_cyan_gain = this.camera.cm_cyan_gain
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'cm_cyan_hue')) {
		updatedVariables.cm_cyan_hue = this.camera.cm_cyan_hue
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'cm_green_gain')) {
		updatedVariables.cm_green_gain = this.camera.cm_green_gain
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'cm_green_hue')) {
		updatedVariables.cm_green_hue = this.camera.cm_green_hue
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'cm_hue_phase')) {
		updatedVariables.cm_hue_phase = this.camera.cm_hue_phase
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'cm_mag_gain')) {
		updatedVariables.cm_mag_gain = this.camera.cm_mag_gain
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'cm_mag_hue')) {
		updatedVariables.cm_mag_hue = this.camera.cm_mag_hue
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'cm_red_gain')) {
		updatedVariables.cm_red_gain = this.camera.cm_red_gain
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'cm_red_hue')) {
		updatedVariables.cm_red_hue = this.camera.cm_red_hue
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'cm_yellow_gain')) {
		updatedVariables.cm_yellow_gain = this.camera.cm_yellow_gain
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'cm_yellow_hue')) {
		updatedVariables.cm_yellow_hue = this.camera.cm_yellow_hue
	}

	// Advanced Setup Variables

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'brightness')) {
		updatedVariables.brightness = this.camera.brightness ?? this.camera.brightnessPic
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'brightness_comp')) {
		updatedVariables.brightness_comp = this.camera.brightness_comp
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'comp_level')) {
		updatedVariables.comp_level = this.camera.comp_level
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'gamma_offset')) {
		updatedVariables.gamma_offset = this.camera.gamma_offset
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'high_resolution')) {
		updatedVariables.high_resolution = this.camera.high_resolution
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'video_enhancement')) {
		updatedVariables.video_enhancement = this.camera.video_enhancement
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'af_zone')) {
		updatedVariables.af_zone = this.camera.af_zone
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'scene')) {
		updatedVariables.scene = this.camera.scene
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'af_sensitivity')) {
		updatedVariables.af_sensitivity = this.camera.af_sensitivity
	}
	// External Setup Variables

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'aux')) {
		updatedVariables.aux = this.camera.aux
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'rain_wiper')) {
		updatedVariables.rain_wiper = this.camera.rain_wiper
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'v12vout')) {
		updatedVariables.v12vout = this.camera.v12vout
	}

	// Detail Setup Variables

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'bandwidth')) {
		updatedVariables.bandwidth = this.camera.bandwidth
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'bw_balance')) {
		updatedVariables.bw_balance = this.camera.bw_balance
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'crispening')) {
		updatedVariables.crispening = this.camera.crispening
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'detail')) {
		updatedVariables.detail = this.camera.detail
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'highlight_detail')) {
		updatedVariables.highlight_detail = this.camera.highlight_detail
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'hv_balance')) {
		updatedVariables.hv_balance = this.camera.hv_balance
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'limit')) {
		updatedVariables.limit = this.camera.limit
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'super_low')) {
		updatedVariables.super_low = this.camera.super_low
	}

	// Gamma Setup Variables

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'black_gamma_level')) {
		updatedVariables.black_gamma_level = this.camera.black_gamma_level
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'black_level')) {
		updatedVariables.black_level = this.camera.black_level
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'black_level_range')) {
		updatedVariables.black_level_range = this.camera.black_level_range
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'effect')) {
		updatedVariables.effect = this.camera.effect
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'gamma_setup_level')) {
		updatedVariables.gamma_setup_level = this.camera.gamma_setup_level
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'gamma_setup_offset')) {
		updatedVariables.gamma_setup_offset = this.camera.gamma_setup_offset
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'pattern')) {
		updatedVariables.pattern = this.camera.pattern
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'pattern_fine')) {
		updatedVariables.pattern_fine = this.camera.pattern_fine
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'settings')) {
		updatedVariables.settings = this.camera.settings
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'visibility_enhancer')) {
		updatedVariables.visibility_enhancer = this.camera.visibility_enhancer
	}

	// BirdDog Scope Variables

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'scope_gamma_gain')) {
		updatedVariables.scope_gamma_gain = this.camera.scope_gamma_gain
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'scope_mode')) {
		updatedVariables.scope_mode = this.camera.scope_mode
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'scope_position')) {
		updatedVariables.scope_position = this.camera.scope_position
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'scope_preview')) {
		updatedVariables.scope_preview = this.camera.scope_preview
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'scope_program')) {
		updatedVariables.scope_program = this.camera.scope_program
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'scope_size')) {
		updatedVariables.scope_size = MODEL_ACTIONS.scope_size.choices.find((o) => o.id == this.camera.scope_size)?.label
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'scope_transparency')) {
		updatedVariables.scope_transparency = this.camera.scope_transparency
	}

	// WebSocket Variables

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'avbr')) {
		updatedVariables.avbr = this.camera.avbr
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'aud_ch')) {
		updatedVariables.aud_ch = this.camera.aud_ch
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'aud_sr')) {
		updatedVariables.aud_sr = this.camera.aud_sr
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'aud_stat')) {
		updatedVariables.aud_stat = this.camera.aud_stat
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'dashboard_vid_status')) {
		updatedVariables.dashboard_vid_status = this.camera.dashboard_vid_status
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'dev_mode')) {
		updatedVariables.dev_mode = this.camera.dev_mode
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'gen_status')) {
		updatedVariables.gen_status = this.camera.gen_status
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'mcu_ver')) {
		updatedVariables.mcu_ver = this.camera.mcu_ver
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'net_band_perc')) {
		updatedVariables.net_band_perc = this.camera.net_band_perc + '%'
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'net_mode')) {
		updatedVariables.net_mode = this.camera.net_mode
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'net_speed')) {
		updatedVariables.net_speed = this.camera.net_speed
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'src_stat')) {
		updatedVariables.src_stat = this.camera.src_stat
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'sys_info_perc')) {
		updatedVariables.sys_info_perc = this.camera.sys_info_perc + '%'
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'vid_fmt')) {
		updatedVariables.vid_fmt = this.camera.vid_fmt
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'vid_fr')) {
		updatedVariables.vid_fr = this.camera.vid_fr
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'vid_res')) {
		updatedVariables.vid_res = this.camera.vid_res
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'vid_sra')) {
		updatedVariables.vid_sra = this.camera.vid_sra
	}

	if (MODEL_VARIABLES.some((variable) => variable.variableId === 'vid_str_name')) {
		updatedVariables.vid_str_name = this.camera.vid_str_name
	}

	this.setVariableValues(updatedVariables)
}
