module.exports = {
	// ############
	// Basic Look Ups
	// ############

	ON_OFF: [
		{ id: 'On', label: 'On' },
		{ id: 'Off', label: 'Off' },
	],

	STANDBY: [
		{ id: 'on', label: 'On' },
		{ id: 'standby', label: 'Standby' },
	],

	L_M_H: [
		{ id: 'LOW', label: 'Low' },
		{ id: 'MEDIUM', label: 'Medium' },
		{ id: 'HIGH', label: 'High' },
	],

	OFF_L_M_H: [
		{ id: 'OFF', label: 'Off' },
		{ id: 'LOW', label: 'Low' },
		{ id: 'MEDIUM', label: 'Medium' },
		{ id: 'HIGH', label: 'High' },
	],

	UP_DOWN_RESET_VALUE: [
		{ id: 'up', label: 'UP' },
		{ id: 'down', label: 'DOWN' },
		{ id: 'reset', label: 'RESET' },
		{ id: 'value', label: 'VALUE' },
	],

	// ############
	// IRIS Look Ups
	// ############

	IRIS_P100: [
		{ id: '0', label: 'CLOSED' },
		{ id: '1', label: 'F14.0' },
		{ id: '2', label: 'F11.0' },
		{ id: '3', label: 'F9.6' },
		{ id: '4', label: 'F8.0' },
		{ id: '5', label: 'F6.8' },
		{ id: '6', label: 'F5.6' },
		{ id: '7', label: 'F4.8' },
		{ id: '8', label: 'F4.0' },
		{ id: '9', label: 'F3.4' },
		{ id: '10', label: 'F2.8' },
		{ id: '11', label: 'F2.4' },
		{ id: '12', label: 'F2.0' },
		{ id: '13', label: 'F1.8' },
	],

	// ############
	// GAIN Look Ups
	// ############

	GAIN_P100: [
		{ id: '0', label: '0 dB' },
		{ id: '1', label: '2 dB' },
		{ id: '2', label: '4 dB' },
		{ id: '3', label: '6 dB' },
		{ id: '4', label: '8 dB' },
		{ id: '5', label: '10 dB' },
		{ id: '6', label: '12 dB' },
		{ id: '7', label: '14 dB' },
		{ id: '8', label: '16 dB' },
		{ id: '9', label: '18 dB' },
		{ id: '10', label: '20 dB' },
		{ id: '11', label: '22 dB' },
		{ id: '12', label: '24 dB' },
		{ id: '13', label: '26 dB' },
		{ id: '14', label: '28 dB' },
		{ id: '15', label: '30 dB' },
	],

	// ############
	// Shutter Look Ups
	// ############

	SHUTTER_60: [
		{ id: '0', label: '1/1' },
		{ id: '1', label: '1/2' },
		{ id: '2', label: '1/4' },
		{ id: '3', label: '1/8' },
		{ id: '4', label: '1/15' },
		{ id: '5', label: '1/30' },
		{ id: '6', label: '1/60' },
		{ id: '7', label: '1/90' },
		{ id: '8', label: '1/100' },
		{ id: '9', label: '1/125' },
		{ id: '10', label: '1/180' },
		{ id: '11', label: '1/250' },
		{ id: '12', label: '1/350' },
		{ id: '13', label: '1/500' },
		{ id: '14', label: '1/725' },
		{ id: '15', label: '1/1000' },
		{ id: '16', label: '1/1500' },
		{ id: '17', label: '1/2000' },
		{ id: '18', label: '1/3000' },
		{ id: '19', label: '1/4000' },
		{ id: '20', label: '1/6000' },
		{ id: '21', label: '1/10000' },
	],

	SHUTTER_50: [
		{ id: '0', label: '1/1' },
		{ id: '1', label: '1/2' },
		{ id: '2', label: '1/3' },
		{ id: '3', label: '1/6' },
		{ id: '4', label: '1/12' },
		{ id: '5', label: '1/25' },
		{ id: '6', label: '1/50' },
		{ id: '7', label: '1/75' },
		{ id: '8', label: '1/100' },
		{ id: '9', label: '1/120' },
		{ id: '10', label: '1/150' },
		{ id: '11', label: '1/215' },
		{ id: '12', label: '1/300' },
		{ id: '13', label: '1/425' },
		{ id: '14', label: '1/600' },
		{ id: '15', label: '1/1000' },
		{ id: '16', label: '1/1250' },
		{ id: '17', label: '1/1750' },
		{ id: '18', label: '1/2500' },
		{ id: '19', label: '1/3500' },
		{ id: '20', label: '1/6000' },
		{ id: '21', label: '1/10000' },
	],

	SHUTTER_4K_60: [
		{ id: '6', label: '1/1' },
		{ id: '7', label: '2/3' },
		{ id: '8', label: '1/2' },
		{ id: '9', label: '1/3' },
		{ id: '10', label: '1/4' },
		{ id: '11', label: '1/6' },
		{ id: '12', label: '1/8' },
		{ id: '13', label: '1/10' },
		{ id: '14', label: '1/15' },
		{ id: '15', label: '1/20' },
		{ id: '16', label: '1/30' },
		{ id: '17', label: '1/50' },
		{ id: '18', label: '1/60' },
		{ id: '19', label: '1/90' },
		{ id: '20', label: '1/100' },
		{ id: '21', label: '1/125' },
		{ id: '22', label: '1/180' },
		{ id: '23', label: '1/250' },
		{ id: '24', label: '1/350' },
		{ id: '25', label: '1/500' },
		{ id: '26', label: '1/725' },
		{ id: '27', label: '1/1000' },
		{ id: '28', label: '1/1500' },
		{ id: '29', label: '1/2000' },
		{ id: '30', label: '1/3000' },
		{ id: '31', label: '1/4000' },
		{ id: '32', label: '1/6000' },
		{ id: '33', label: '1/10000' },
	],

	SHUTTER_4K_50: [
		{ id: '6', label: '1/1' },
		{ id: '7', label: '2/3' },
		{ id: '8', label: '1/2' },
		{ id: '9', label: '1/3' },
		{ id: '10', label: '1/4' },
		{ id: '11', label: '1/6' },
		{ id: '12', label: '1/8' },
		{ id: '13', label: '1/12' },
		{ id: '14', label: '1/15' },
		{ id: '15', label: '1/20' },
		{ id: '16', label: '1/25' },
		{ id: '17', label: '1/30' },
		{ id: '18', label: '1/50' },
		{ id: '19', label: '1/60' },
		{ id: '20', label: '1/100' },
		{ id: '21', label: '1/120' },
		{ id: '22', label: '1/150' },
		{ id: '23', label: '1/215' },
		{ id: '24', label: '1/300' },
		{ id: '25', label: '1/425' },
		{ id: '26', label: '1/600' },
		{ id: '27', label: '1/1000' },
		{ id: '28', label: '1/1250' },
		{ id: '29', label: '1/1750' },
		{ id: '30', label: '1/2500' },
		{ id: '31', label: '1/3500' },
		{ id: '32', label: '1/6000' },
		{ id: '33', label: '1/10000' },
	],

	SHUTTER_4K_24: [
		{ id: '6', label: '1/1' },
		{ id: '7', label: '2/3' },
		{ id: '8', label: '1/2' },
		{ id: '9', label: '1/3' },
		{ id: '10', label: '1/4' },
		{ id: '11', label: '1/6' },
		{ id: '12', label: '1/8' },
		{ id: '13', label: '1/12' },
		{ id: '14', label: '1/20' },
		{ id: '15', label: '1/24' },
		{ id: '16', label: '1/25' },
		{ id: '17', label: '1/40' },
		{ id: '18', label: '1/48' },
		{ id: '19', label: '1/50' },
		{ id: '20', label: '1/60' },
		{ id: '21', label: '1/96' },
		{ id: '22', label: '1/100' },
		{ id: '23', label: '1/120' },
		{ id: '24', label: '1/144' },
		{ id: '25', label: '1/192' },
		{ id: '26', label: '1/200' },
		{ id: '27', label: '1/288' },
		{ id: '28', label: '1/400' },
		{ id: '29', label: '1/576' },
		{ id: '30', label: '1/1200' },
		{ id: '31', label: '1/2400' },
		{ id: '32', label: '1/4800' },
		{ id: '33', label: '1/10000' },
	],

	// ############
	// PTZ Look Ups
	// ############

	ZOOM_SPEED: [
		{ id: 0, label: 'Speed 00 (Slow)' },
		{ id: 1, label: 'Speed 01' },
		{ id: 2, label: 'Speed 02' },
		{ id: 3, label: 'Speed 03' },
		{ id: 4, label: 'Speed 04' },
		{ id: 5, label: 'Speed 05' },
		{ id: 6, label: 'Speed 06' },
		{ id: 7, label: 'Speed 07 (Fast)' },
	],

	PAN_SPEED: [
		{ id: 0, label: 'Speed 00 (Slow)' },
		{ id: 1, label: 'Speed 01' },
		{ id: 2, label: 'Speed 02' },
		{ id: 3, label: 'Speed 03' },
		{ id: 4, label: 'Speed 04' },
		{ id: 5, label: 'Speed 05' },
		{ id: 6, label: 'Speed 06' },
		{ id: 7, label: 'Speed 07' },
		{ id: 8, label: 'Speed 08' },
		{ id: 9, label: 'Speed 09' },
		{ id: 10, label: 'Speed 10' },
		{ id: 11, label: 'Speed 11' },
		{ id: 12, label: 'Speed 12' },
		{ id: 13, label: 'Speed 13' },
		{ id: 14, label: 'Speed 14' },
		{ id: 15, label: 'Speed 15' },
		{ id: 16, label: 'Speed 16' },
		{ id: 17, label: 'Speed 17' },
		{ id: 18, label: 'Speed 18' },
		{ id: 19, label: 'Speed 19' },
		{ id: 20, label: 'Speed 20' },
		{ id: 21, label: 'Speed 21 (Fast)' },
	],

	TILT_SPEED: [
		{ id: 0, label: 'Speed 00 (Slow)' },
		{ id: 1, label: 'Speed 01' },
		{ id: 2, label: 'Speed 02' },
		{ id: 3, label: 'Speed 03' },
		{ id: 4, label: 'Speed 04' },
		{ id: 5, label: 'Speed 05' },
		{ id: 6, label: 'Speed 06' },
		{ id: 7, label: 'Speed 07' },
		{ id: 8, label: 'Speed 08' },
		{ id: 9, label: 'Speed 09' },
		{ id: 10, label: 'Speed 10' },
		{ id: 11, label: 'Speed 11' },
		{ id: 12, label: 'Speed 12' },
		{ id: 13, label: 'Speed 13' },
		{ id: 14, label: 'Speed 14' },
		{ id: 15, label: 'Speed 15' },
		{ id: 16, label: 'Speed 16' },
		{ id: 17, label: 'Speed 17' },
		{ id: 18, label: 'Speed 18 (Fast)' },
	],

	PTZ_DIRECTION: [
		{ id: '0', label: 'Left' },
		{ id: '1', label: 'Right' },
		{ id: '2', label: 'Up' },
		{ id: '3', label: 'Down' },
		{ id: '4', label: 'Up Left' },
		{ id: '5', label: 'Up Right' },
		{ id: '6', label: 'Down Left' },
		{ id: '7', label: 'Down Right' },
		{ id: '8', label: 'P/T Stop' },
		{ id: '9', label: 'P/T Home' },
	],

	// ############
	// Focus Mode Look Ups
	// ############

	ANALOG_AUDIO_OUTPUT: [
		{ id: 'AutoFocus', label: 'Auto Focus' },
		{ id: 'Manual', label: 'Manual' },
	],

	// ############
	// Device Settings Look Ups
	// ############

	ANALOG_AUDIO_OUTPUT: [
		{ id: 'DecodeMain', label: 'DecodeMain' },
		{ id: 'DecodeComms', label: 'DecodeComms' },
		{ id: 'DecodeLoop', label: 'DecodeLoop' },
	],

	// ############
	// NDI ENCODE Look Ups
	// ############

	ENCODE_TXPM: [
		{ id: 'Mulitcast', label: 'Mulitcast' },
		{ id: 'TCP', label: 'TCP' },
		{ id: 'Multi-TCP', label: 'Multi-TCP' },
		{ id: 'UDP', label: 'UDP' },
	],

	ENCODE_NDI_AUDIO: [
		{ id: 'NDIAudioMain', label: 'NDI Audio Main' },
		{ id: 'NDIAudioAnalog', label: 'NDI Audio Analog' },
		{ id: 'NDIAudioMute', label: 'NDI Audio Mute' },
	],

	ENCODE_BANDWIDTH_MODE: [
		{ id: 'Manual', label: 'Manual' },
		{ id: 'NDIManaged', label: 'NDI Managed' },
	],

	ENCODE_TALLY_MODE: [
		{ id: 'TallyOn', label: 'Tally On' },
		{ id: 'TallyOff', label: 'Tally Off' },
	],

	ENCODE_NDIGroup: [
		{ id: 'NDIGroupEn', label: 'NDI Group Enabled' },
		{ id: 'NDIGroupDis', label: 'NDI Group Disabled' },
	],

	// ############
	// Exposure Mode Look Ups
	// ############

	EXP_MODE_1: [
		{ id: 'FULL-AUTO', label: 'FULL-AUTO' },
		{ id: 'MANUAL', label: 'MANUAL' },
		{ id: 'SHUTTER-PRI', label: 'SHUTTER-PRI' },
		{ id: 'IRIS-PRI', label: 'IRIS-PRI' },
	],

	EXP_MODE_2: [
		{ id: 'FULL-AUTO', label: 'FULL-AUTO' },
		{ id: 'MANUAL', label: 'MANUAL' },
		{ id: 'SHUTTER-PRI', label: 'SHUTTER-PRI' },
		{ id: 'IRIS-PRI', label: 'IRIS-PRI' },
		{ id: 'BRIGHT', label: 'BRIGHT' },
	],

	EXP_MODE_3: [
		{ id: 'FULL-AUTO', label: 'FULL-AUTO' },
		{ id: 'MANUAL', label: 'MANUAL' },
		{ id: 'SHUTTER-PRI', label: 'SHUTTER-PRI' },
		{ id: 'IRIS-PRI', label: 'IRIS-PRI' },
		{ id: 'BRIGHT', label: 'BRIGHT' },
		{ id: 'GAIN-PRI', label: 'GAIN-PRI' },
	],

	// ############
	// White Balance Mode Look Ups
	// ############

	WB_MODE_1: [
		{ id: 'AUTO', label: 'Auto' },
		{ id: 'INDOOR', label: 'Indoor' },
		{ id: 'OUTDOOR', label: 'Outdoor' },
		{ id: 'ONEPUSH', label: 'OnePush' },
		{ id: 'ATW', label: 'ATW' },
		{ id: 'MANUAL1', label: 'Manual 1' },
		{ id: 'MANUAL2', label: 'Manual 2' },
	],

	WB_MODE_2: [
		{ id: 'AUTO', label: 'Auto' },
		{ id: 'INDOOR', label: 'Indoor' },
		{ id: 'OUTDOOR', label: 'Outdoor' },
		{ id: 'OUTDOOR-AUTO', label: 'Outdoor Auto' },
		{ id: 'ONEPUSH', label: 'OnePush' },
		{ id: 'ATW', label: 'ATW' },
		{ id: 'MANUAL1', label: 'Manual' },
		{ id: 'SVL-AUTO', label: 'Sodium Lamp Auto' },
		{ id: 'SVL', label: 'Sodium Lamp' },
		{ id: 'SVL-OUTDOOR-AUTO', label: 'Sodium Lamp Outdoor Auto' },
	],

	WB_SELECT: [
		{ id: 'FL LIGHT', label: 'FL LIGHT' },
		{ id: 'STD', label: 'STD' },
		{ id: 'OFF', label: 'OFF' },
		{ id: 'HIGH SAT', label: 'HIGH SAT' },
	],

	// ############
	// Picture Setup Look Ups
	// ############

	PICTURE_EFFECT: [
		{ id: 'BW', label: 'BW' },
		{ id: 'OFF', label: 'Off' },
	],

	IR_CUT_FILTER: [
		{ id: 'Auto', label: 'Auto' },
		{ id: 'On', label: 'On' },
		{ id: 'Off', label: 'Off' },
	],

	// ############
	// Advanced Settings Look Ups
	// ############

	BRIGHTNESS_COMP: [
		{ id: 'VERY DARK', label: 'Very Dark' },
		{ id: 'DARK', label: 'Dark' },
		{ id: 'STANDARD', label: 'Standard' },
		{ id: 'BRIGHT', label: 'Bright' },
	],

	// ############
	// P400/P4K Settings Look Ups
	// ############

	BANDWIDTH_4K: [
		{ id: 'DEFAULT', label: 'Default' },
		{ id: 'LOW', label: 'Low' },
		{ id: 'MIDDLE', label: 'Middle' },
		{ id: 'HIGH', label: 'High' },
		{ id: 'WIDE', label: 'Wide' },
	],

	BW_BALANCE_4K: [
		{ id: 'TYPE1', label: 'Type 1' },
		{ id: 'TYPE2', label: 'Type 2' },
		{ id: 'TYPE3', label: 'Type 3' },
		{ id: 'TYPE4', label: 'Type 4' },
		{ id: 'TYPE5', label: 'Type 5' },
	],

	// ############
	// Gamma Settings Look Ups
	// ############

	GAMMA_SETTINGS: [
		{ id: 'PATTERN', label: 'Pattern' },
		{ id: 'STANDARD', label: 'Standard' },
		{ id: 'STRAIGHT', label: 'Straight' },
	],
}
