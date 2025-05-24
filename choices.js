import { createPositionArray, createZoomArray } from './utils.js'

// Create Color Temp Array
let COLOR_TEMP = []
for (let i = 28; i <= 65; i++) {
	COLOR_TEMP.push({ id: i + '00', label: i + '00k' })
}

let COLOR_TEMP_X_SERIES = []
for (let i = 25; i <= 90; i++) {
	COLOR_TEMP_X_SERIES.push({ id: i + '00', label: i + '00k' })
}

// Create Postion Arrays with Max degress, Min degrees, step degree, & Hex vlaue of MAx degrees
const POS_PAN_P100 = createPositionArray(175, -175, 5, 0x08da)
const POS_PAN_P200 = createPositionArray(175, -175, 5, 0x067b)
const POS_TILT = createPositionArray(90, -30, 5, 0x049d)
const POS_ZOOM_10 = createZoomArray(10, 1, 1, 0x4000)
const POS_ZOOM_12 = createZoomArray(12, 1, 1, 0x4000)
const POS_ZOOM_20 = createZoomArray(20, 1, 1, 0x4000)
const POS_ZOOM_30 = createZoomArray(30, 1, 1, 0x4000)

export default {
	// ############
	// Basic Look Ups
	// ############

	CAMERAS: [
		{ id: 'Auto', label: 'Auto Detect' },
		{ id: 'X1', label: 'X1' },
		{ id: 'X1Ultra', label: 'X1 Ultra', other: ['X1 Ultra'] },
		{ id: 'X4Ultra', label: 'X4 Ultra', other: ['X4 Ultra'] },
		{ id: 'P100', label: 'P100' },
		{ id: 'MAKIUltra', label: 'MAKI Ultra', other: ['MAKI Ultra'] },
		{ id: 'P110', label: 'P110' },
		{ id: 'P120', label: 'P120' },
		{ id: 'PF120', label: 'PF120' },
		{ id: 'P200A2A3', label: 'P200 A2_A3', other: ['P200A2_A3'] },
		{ id: 'P200A4A5', label: 'P200 A4_A5', other: ['P200A4_A5'] },
		{ id: 'P240', label: 'P240' },
		{ id: 'P400', label: 'P400', other: ['EYES P400', 'EYESP400'] },
		{ id: 'P4K', label: 'P4K', other: ['EYES P4K', 'EYESP4K'] },
		{ id: 'A200GEN1', label: 'A200 GEN1' },
		{ id: 'A200GEN2', label: 'A200 GEN2' },
		{ id: 'A300GEN1', label: 'A300 GEN1' },
		{ id: 'A300GEN2', label: 'A300 GEN2' },
		{ id: 'KBD', label: 'KBD' },
	],

	ON_OFF: [
		{ id: 'On', label: 'On' },
		{ id: 'Off', label: 'Off' },
	],

	STANDBY: [
		{ id: 'on', label: 'Cam On' },
		{ id: 'standby', label: 'Standby' },
	],

	L_M_H: [
		{ id: 'LOW', label: 'Low' },
		{ id: 'MEDIUM', label: 'Medium' },
		{ id: 'HIGH', label: 'High' },
	],

	L_Mid_H: [
		{ id: 'LOW', label: 'Low' },
		{ id: 'MID', label: 'Mid' },
		{ id: 'HIGH', label: 'High' },
	],

	OFF_L_M_H: [
		{ id: 'OFF', label: 'Off' },
		{ id: 'LOW', label: 'Low' },
		{ id: 'MEDIUM', label: 'Medium' },
		{ id: 'HIGH', label: 'High' },
	],

	UP_DOWN_VALUE: [
		{ id: 'up', label: 'Up' },
		{ id: 'down', label: 'Down' },
		{ id: 'value', label: 'Value' },
	],

	UP_DOWN_RESET_VALUE: [
		{ id: 'up', label: 'Up' },
		{ id: 'down', label: 'Down' },
		{ id: 'reset', label: 'Reset' },
		{ id: 'value', label: 'Value' },
	],

	OFF_1_to_5: [
		{ id: '0', label: 'Off' },
		{ id: '1', label: '1' },
		{ id: '2', label: '2' },
		{ id: '3', label: '3' },
		{ id: '4', label: '4' },
		{ id: '5', label: '5' },
	],

	OFF_1_to_6: [
		{ id: '0', label: 'Off' },
		{ id: '1', label: '1' },
		{ id: '2', label: '2' },
		{ id: '3', label: '3' },
		{ id: '4', label: '4' },
		{ id: '5', label: '5' },
		{ id: '6', label: '6' },
	],

	// ############
	// IRIS Look Ups
	// ############

	IRIS_1: [
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

	IRIS_2: [
		{ id: '4', label: 'CLOSED' },
		{ id: '5', label: 'F14.0' },
		{ id: '6', label: 'F11.0' },
		{ id: '7', label: 'F9.6' },
		{ id: '8', label: 'F8.0' },
		{ id: '9', label: 'F6.8' },
		{ id: '10', label: 'F5.6' },
		{ id: '11', label: 'F4.8' },
		{ id: '12', label: 'F4.0' },
		{ id: '13', label: 'F3.4' },
		{ id: '14', label: 'F2.8' },
		{ id: '15', label: 'F2.4' },
		{ id: '16', label: 'F2.0' },
		{ id: '17', label: 'F1.6' },
	],

	IRIS_3: [
		{ id: '0', label: 'CLOSED' },
		{ id: '5', label: 'F11.0' },
		{ id: '6', label: 'F10.0' },
		{ id: '7', label: 'F9.6' },
		{ id: '8', label: 'F8.7' },
		{ id: '9', label: 'F8.0' },
		{ id: '10', label: 'F7.3' },
		{ id: '11', label: 'F6.8' },
		{ id: '12', label: 'F6.2' },
		{ id: '13', label: 'F5.6' },
		{ id: '14', label: 'F5.2' },
		{ id: '15', label: 'F4.8' },
		{ id: '16', label: 'F4.4' },
		{ id: '17', label: 'F4.0' },
		{ id: '18', label: 'F3.7' },
		{ id: '19', label: 'F3.4' },
		{ id: '20', label: 'F3.1' },
		{ id: '21', label: 'F2.8' },
	],

	IRIS_4: [
		{ id: '5', label: 'F11.0' },
		{ id: '6', label: 'F10.0' },
		{ id: '7', label: 'F9.6' },
		{ id: '8', label: 'F8.7' },
		{ id: '9', label: 'F8.0' },
		{ id: '10', label: 'F7.3' },
		{ id: '11', label: 'F6.8' },
		{ id: '12', label: 'F6.2' },
		{ id: '13', label: 'F5.6' },
		{ id: '14', label: 'F5.2' },
		{ id: '15', label: 'F4.8' },
		{ id: '16', label: 'F4.4' },
		{ id: '17', label: 'F4.0' },
		{ id: '18', label: 'F3.7' },
		{ id: '19', label: 'F3.4' },
		{ id: '20', label: 'F3.1' },
		{ id: '21', label: 'F2.8' },
	],

	// ############
	// GAIN Look Ups
	// ############
	//P100, PF120
	GAIN_1: [
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
	//P200, A200, A300
	GAIN_2: [
		{ id: '1', label: '0 dB' },
		{ id: '2', label: '3.6 dB' },
		{ id: '3', label: '7.1 dB' },
		{ id: '4', label: '10.7 dB' },
		{ id: '5', label: '14.3 dB' },
		{ id: '6', label: '17.8 dB' },
		{ id: '7', label: '21.4  dB' },
		{ id: '8', label: '25 dB' },
		{ id: '9', label: '28.6 dB' },
		{ id: '10', label: '32.1 dB' },
		{ id: '11', label: '35.7 dB' },
		{ id: '12', label: '39.3 dB' },
		{ id: '13', label: '42.8 dB' },
		{ id: '14', label: '46.4 dB' },
		{ id: '15', label: '50 dB' },
	],
	//P400, P4K
	GAIN_3: [
		{ id: '1', label: '0 dB' },
		{ id: '2', label: '3 dB' },
		{ id: '3', label: '6 dB' },
		{ id: '4', label: '9 dB' },
		{ id: '5', label: '12 dB' },
		{ id: '6', label: '15 dB' },
		{ id: '7', label: '18 dB' },
		{ id: '8', label: '21 dB' },
		{ id: '9', label: '24 dB' },
		{ id: '10', label: '27 dB' },
		{ id: '11', label: '30 dB' },
		{ id: '12', label: '33 dB' },
		{ id: '13', label: '36 dB' },
	],
	//X1, X1Ultra, X4Ultra
	GAIN_4: [
		{ id: '0', label: '0 dB' },
		{ id: '1', label: '3 dB' },
		{ id: '2', label: '6 dB' },
		{ id: '3', label: '9 dB' },
		{ id: '4', label: '12 dB' },
		{ id: '5', label: '15 dB' },
		{ id: '6', label: '18 dB' },
		{ id: '7', label: '21 dB' },
		{ id: '8', label: '24 dB' },
		{ id: '9', label: '27 dB' },
		{ id: '10', label: '30 dB' },
		{ id: '11', label: '33 dB' },
		{ id: '12', label: '36 dB' },
		{ id: '13', label: '39 dB' },
		{ id: '14', label: '42 dB' },
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

	SLOW_SHUTTER_60: [
		{ id: '6', label: '1/1' },
		{ id: '5', label: '1/2' },
		{ id: '4', label: '1/4' },
		{ id: '3', label: '1/8' },
		{ id: '2', label: '1/15' },
		{ id: '1', label: '1/30' },
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

	SLOW_SHUTTER_50: [
		{ id: '6', label: '1/1' },
		{ id: '5', label: '1/2' },
		{ id: '4', label: '1/3' },
		{ id: '3', label: '1/6' },
		{ id: '2', label: '1/12' },
		{ id: '1', label: '1/25' },
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

	SLOW_SHUTTER_4K_60: [
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

	SLOW_SHUTTER_4K_50: [
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

	SLOW_SHUTTER_4K_24: [
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
	],

	// ############
	// PTZ Look Ups
	// ############

	SPEED_CHANGES: [
		{ id: 'up', label: 'Speed Up' },
		{ id: 'down', label: 'Speed Down' },
		{ id: 'value', label: 'Speed Value' },
	],

	SPEED_TYPE: [
		{ id: 'standard', label: 'Standard' },
		{ id: 'advanced', label: 'Super Fine' },
	],

	PTZ_DIRECTION: [
		{ id: 'left', label: 'Left' },
		{ id: 'right', label: 'Right' },
		{ id: 'up', label: 'Up' },
		{ id: 'down', label: 'Down' },
		{ id: 'up_left', label: 'Up Left' },
		{ id: 'up_right', label: 'Up Right' },
		{ id: 'down_left', label: 'Down Left' },
		{ id: 'down_right', label: 'Down Right' },
		{ id: 'stop', label: 'P/T Stop' },
		{ id: 'home', label: 'P/T Home' },
		{ id: 'direct', label: 'Direct' },
	],

	PTZ_ZOOM: [
		{ id: 'in', label: 'Zoom In' },
		{ id: 'out', label: 'Zoom Out' },
		{ id: 'direct', label: 'Zoom Direct' },
		{ id: 'stop', label: 'Zoom Stop' },
	],

	// PTZ Position Look Ups

	POS_PAN_P100,
	POS_PAN_P200,
	POS_TILT,
	POS_ZOOM_10,
	POS_ZOOM_12,
	POS_ZOOM_20,
	POS_ZOOM_30,

	PRESET_MODE: [
		{ id: 'Camera', label: 'Camera' },
		{ id: 'Birddog', label: 'PTZ Only' },
	],

	// ############
	// Focus Look Ups
	// ############

	AUTO_FOCUS: [
		{ id: 'Auto', label: 'Auto Focus' },
		{ id: 'Manual', label: 'Manual' },
	],

	FOCUS_CONTROL: [
		{ id: 'near', label: 'Focus Near' },
		{ id: 'far', label: 'Focus Far' },
		{ id: 'stop', label: 'Focus Stop' },
		{ id: 'trigger', label: 'Focus One Push Auto' },
	],
	//X1, X1Ultra, X4Ultra
	AF_ZONE: [
		{ id: 'ALL', label: 'All' },
		{ id: 'Top', label: 'Top' },
		{ id: 'Center', label: 'Center' },
		{ id: 'Bottom', label: 'Bottom' },
		{ id: 'Left', label: 'Left' },
		{ id: 'Right', label: 'Right' },
	],
	SCENE: [
		{ id: 'Normal', label: 'Normal' },
		{ id: 'Macro', label: 'Macro' },
		{ id: 'Live', label: 'Live' },
	],
	AF_SENSITIVITY: [
		{ id: 'Low', label: 'Low' },
		{ id: 'Middle', label: 'Middle' },
		{ id: 'High', label: 'High' },
	],

	// ############
	// Device Settings Look Ups
	// ############

	ANALOG_AUDIO_OUTPUT: [
		{ id: 'DecodeComms', label: 'Comms' },
		{ id: 'DecodeLoop', label: 'Loop' },
	],

	VIDEO_OUTPUT: [
		{ id: 'NormalMode', label: 'Normal' },
		{ id: 'LowLatency', label: 'Low Latency' },
	],

	OUTPUT_MODE: [
		{ id: 'Encode', label: 'Encode' },
		{ id: 'Decode', label: 'Decode' },
	],

	DEFLICKER: [
		{ id: 'default', label: 'OFF' },
		{ id: '50Hz', label: '50Hz' },
		{ id: '60Hz', label: '60Hz' },
	],

	// ############
	// NDI ENCODE Look Ups
	// ############

	ENCODE_TXPM: [
		{ id: 'Multicast', label: 'Multicast' },
		{ id: 'TCP', label: 'TCP' },
		{ id: 'Multi-TCP', label: 'Multi-TCP' },
		{ id: 'UDP', label: 'UDP' },
		{ id: 'RUDP', label: 'RUDP' },
	],

	ENCODE_NDI_AUDIO: [
		{ id: 'NDIAudioAnalog', label: 'Analog' },
		{ id: 'NDIAudioMute', label: 'Mute' },
	],

	ENCODE_BANDWIDTH_MODE: [
		{ id: 'Manual', label: 'Manual' },
		{ id: 'NDIManaged', label: 'NDI Managed' },
	],

	ENCODE_NDIGroup: [
		{ id: 'NDIGroupEn', label: 'Enabled' },
		{ id: 'NDIGroupDis', label: 'Disabled' },
	],

	TALLY_MODE: [
		{ id: 'TallyOn', label: 'Tally On' },
		{ id: 'TallyOff', label: 'Tally Off' },
	],

	TALLY_REST_STATE: [
		{ id: 'white', label: 'White' },
		{ id: 'Off', label: 'Off' },
	],

	SCREEN_SAVER_MODE: [
		{ id: 'BirdDogSS', label: 'BirdDog' },
		{ id: 'BlackSS', label: 'Black' },
		{ id: 'CaptureSS', label: 'Capture' },
	],

	// ############
	// NDI Discovery Look Ups
	// ############

	NDI_DIS_SVR: [
		{ id: 'NDIDisServEn', label: 'On' },
		{ id: 'NDIDisServDis', label: 'Off' },
	],

	// ############
	// Exposure Mode Look Ups
	// ############
	//P100, PF120, P200_A4_A5, A200_GEN1, A200_GEN2, A300_GEN1, A300_GEN2, X1, X1Ultra, X4Ultra
	EXP_MODE_1: [
		{ id: 'FULL-AUTO', label: 'FULL-AUTO' },
		{ id: 'MANUAL', label: 'MANUAL' },
		{ id: 'SHUTTER-PRI', label: 'SHUTTER-PRI' },
		{ id: 'IRIS-PRI', label: 'IRIS-PRI' },
		{ id: 'BRIGHT', label: 'BRIGHT' },
	],
	//P200_A2_A3
	EXP_MODE_2: [
		{ id: 'FULL-AUTO', label: 'FULL-AUTO' },
		{ id: 'MANUAL', label: 'MANUAL' },
		{ id: 'SHUTTER-PRI', label: 'SHUTTER-PRI' },
		{ id: 'IRIS-PRI', label: 'IRIS-PRI' },
	],
	//P400, P4K
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

	//P100, PF120
	WB_MODE_1: [
		{ id: 'AUTO', label: 'Auto' },
		{ id: 'INDOOR', label: 'Indoor' },
		{ id: 'OUTDOOR', label: 'Outdoor' },
		{ id: 'ONEPUSH', label: 'One Push Mode' },
		{ id: 'ATW', label: 'ATW' },
		{ id: 'USER', label: 'User' },
		{ id: 'MANUAL2', label: 'Manual 2' },
	],

	WB_MODE_1b: [
		{ id: 'AUTO', label: 'Auto' },
		{ id: 'INDOOR', label: 'Indoor' },
		{ id: 'OUTDOOR', label: 'Outdoor' },
		{ id: 'ONEPUSH', label: 'One Push Mode' },
		{ id: 'ATW', label: 'ATW' },
		{ id: 'USER', label: 'User' },
		{ id: 'MANUAL2', label: 'Manual 2' },
	],

	WB_MODE_1c: [
		{ id: 'AUTO', label: 'Auto' },
		{ id: 'INDOOR', label: 'Indoor' },
		{ id: 'OUTDOOR', label: 'Outdoor' },
		{ id: 'ONEPUSH', label: 'One Push Mode' },
		{ id: 'ColorTemp', label: 'Color Temp' },
		{ id: 'MANUAL', label: 'Manual' },
	],

	//P200, A200, P400, P4K
	WB_MODE_2: [
		{ id: 'AUTO', label: 'Auto' },
		{ id: 'INDOOR', label: 'Indoor' },
		{ id: 'OUTDOOR', label: 'Outdoor' },
		{ id: 'OUTDOOR-AUTO', label: 'Outdoor Auto' },
		{ id: 'ONEPUSH', label: 'One Push Mode' },
		{ id: 'ATW', label: 'ATW' },
		{ id: 'USER', label: 'User' },
		{ id: 'SLV-AUTO', label: 'Sodium Lamp Auto' },
		{ id: 'SLV', label: 'Sodium Lamp' },
		{ id: 'SLV-OUTDOOR-AUTO', label: 'Sodium Lamp Outdoor Auto' },
	],

	WB_SELECT: [
		{ id: 'FL LIGHT', label: 'FL LIGHT' },
		{ id: 'STD', label: 'STD' },
		{ id: 'OFF', label: 'OFF' },
		{ id: 'HIGH SAT', label: 'HIGH SAT' },
	],

	COLOR_TEMP,
	COLOR_TEMP_X_SERIES,

	// ############
	// Picture Setup Look Ups
	// ############

	PICTURE_EFFECT: [
		{ id: 'BW', label: 'B&W' },
		{ id: 'Off', label: 'Off' },
	],

	IR_CUT_FILTER_1: [
		{ id: 'Auto', label: 'Auto' },
		{ id: 'On', label: 'On' },
		{ id: 'Off', label: 'Off' },
	],

	IR_CUT_FILTER_2: [
		{ id: 'On', label: 'On' },
		{ id: 'Off', label: 'Off' },
	],

	IR_CUT_FILTER_3: [{ id: 'NoiseReduction', label: 'Noise Reduction' }],

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

	GAMMA_X_SERIES: [
		{ id: 'default', label: 'Default' },
		{ id: '0.45', label: '0.45' },
		{ id: '0.50', label: '0.50' },
		{ id: '0.55', label: '0.55' },
		{ id: '0.63', label: '0.63' },
	],

	// ############
	// BirdDog Scope Settings Look Ups
	// ############

	SCOPE_MODE: [
		{ id: 'Histogram', label: 'Histogram' },
		{ id: 'Waveform', label: 'Waveform' },
		{ id: 'RGBParade', label: 'RGB Parade' },
		{ id: 'Vectorscope', label: 'Vectorscope' },
	],

	SCOPE_POSITION: [
		{ id: 'TopLeft', label: 'Top Left' },
		{ id: 'TopRight', label: 'Top Right' },
		{ id: 'BottomLeft', label: 'Bottom Left' },
		{ id: 'BottomRight', label: 'Bottom Right' },
	],

	SCOPE_SIZE: [
		{ id: 'Off', label: 'Small' },
		{ id: 'On', label: 'Large' },
	],
}
