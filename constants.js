export const VISCA = {
	// ############
	// VISCA Message Types
	// ############
	MSG_CAM: '\x81\x01\x04',
	MSG_OPERATION: '\x81\x01\x06',
	MSG_QRY: '\x81\x09\x04',
	MSG_QRY_OPERATION: '\x81\x09\x06',

	// ############
	// Basic VISCA Constants
	// ############
	END_MSG: '\xFF',

	// ############
	// VISCA Command Constants
	// ############
	CMD_CAM_VAL_RESET: '\x00',
	CMD_CAM_VAL_CLEAR: '\x01',
	CMD_CAM_VAL_UP: '\x02',
	CMD_CAM_VAL_DOWN: '\x03',

	CMD_CAM_ZOOM_STOP: '\x00',
	CMD_CAM_ZOOM_TELE: '\x02',
	CMD_CAM_ZOOM_WIDE: '\x03',
	CMD_CAM_ZOOM_TELE_WITH_SPEED: '\x20',
	CMD_CAM_ZOOM_WIDE_WITH_SPEED: '\x30',

	CMD_CAM_FOCUS_STOP: '\x00',
	CMD_CAM_FOCUS_FAR: '\x02',
	CMD_CAM_FOCUS_NEAR: '\x03',
	CMD_CAM_FOCUS_FAR_WITH_SPEED: '\x20',
	CMD_CAM_FOCUS_NEAR_WITH_SPEED: '\x30',

	CMD_CAM_FOCUS_TRIGGER_NOW: '\x01',
	CMD_CAM_FOCUS_TRIGGER_INF: '\x02',

	CMD_CAM_WB_TRIGGER_NOW: '\x05',

	// ############
	// VISCA Data Constants
	// ############
	DATA_RESET: '\x00',
	DATA_UP: '\x02',
	DATA_DOWN: '\x03',
	DATA_ONVAL: '\x02',
	DATA_OFFVAL: '\x03',
	DATA_TOGGLEVAL: '\x10',

	DATA_PANSTOP: '\x00',
	DATA_PANLEFT: '\x01',
	DATA_PANRIGHT: '\x02',
	DATA_NOPAN: '\x03',
	DATA_TILTSTOP: '\x00',
	DATA_TILTUP: '\x01',
	DATA_TILTDOWN: '\x02',
	DATA_NOTILT: '\x03',

	// ############
	// CAM SETTINGS
	// ############
	CAM_POWER: '\x00', // (can inquire) ONVAL / OFFVAL
	CAM_ZOOM: '\x07', // (cmd only) 0x00 (stop), T/W 0x02, 0x03, 0x2p, 0x3p (variable)
	CAM_ZOOM_DIRECT: '\x47', // (can inquire) pqrs: zoom value, optional tuvw: focus value
	CAM_FOCUS: '\x08', // (cmd only) 0x00 (stop), N/F 0x02, 0x03, 0x2p, 0x3p (variable)
	CAM_FOCUS_TRIGGER: '\x18', // when followed by CMD_CAM_FOCUS_TRIGGER_NOW
	CAM_FOCUS_INFINITY: '\x18', // when followed by CMD_CAM_FOCUS_TRIGGER_INF
	CAM_FOCUS_AUTO: '\x38', // (can inquire) 0x02, 0x03, 0x10 | AUTO / MANUAL / AUTO+MANUAL (TOGGLE?)
	CAM_FOCUS_DIRECT: '\x48', // (can inquire) pqrs
	CAM_WB_TRIGGER: '\x10', // when followed by 0x05
	CAM_FREEZE: '\x62',

	// ############
	// OPERATIONAL SETTINGS
	// ############
	OP_PAN_DRIVE: '\x01', // VV WW 0p 0q
	OP_PAN_ABSOLUTE: '\x02', // VV WW 0Y 0Y 0Y 0Y 0Z 0Z 0Z 0Z
	OP_PAN_RELATIVE: '\x03', // VV WW 0Y 0Y 0Y 0Y 0Z 0Z 0Z 0Z
	OP_PAN_MAX_SPEED: '\x11', // (inquire only) VV WW
	OP_PAN_POS: '\x12', // (inquire only) 0Y 0Y 0Y 0Y 0Z 0Z 0Z 0Z
	// VV: pan speed
	// WW: tilt speed
	// p: pan move 1-left, 2-right, 3-none
	// q: tilt move 1-up, 2-down, 3-none
	// YYYY: pan 4 bit signed value from E1E5 - 1E1B
	// ZZZZ: tilt 4 bit signed from FC75 to 0FF0 (flip off) or F010 to 038B (flip on)
	OP_PAN_HOME: '\x04', // no data
	OP_PAN_RESET: '\x05', // no data

	// ############
	// CAM QUERIES
	// ############
	//QRY_STANDBY: MSG_QRY + CAM_POWER + END_MSG, // returns 90 50 ww FF - ww: 02 On, 03 Standby
	//QRY_FOCUS_MODE: MSG_QRY + CAM_FOCUS_AUTO + END_MSG, // returns 90 50 ww FF - ww: 02 Auto Focus, 03 Manual
}
