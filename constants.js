module.exports = {
	// ############
	// VISCA Message Types
	// ############
	MSG_CAM: '\x81\x01\x04',
	MSG_OPERATION: '\x81\x01\x06',
	
	// ############
	// Basic VISCA Constants
	// ############
	DATA_RESET: '\x00',
	DATA_MORE: '\x02',
	DATA_LESS: '\x03',
	DATA_ONVAL: '\x02',
	DATA_OFFVAL:'\x03',
	DATA_TOGGLEVAL: '\x10',
	END_MSG: '\xFF',

	// ############
	// CAM SETTINGS
	// ############	
	CAM_POWER: '\x00',
	
	// ############
	// CAM QUERIES
	// ############
	QRY_STANDBY: '\x81\x09\x04\x00\xFF', // returns 90 50 ww FF - ww: 02 On, 03 Standby
	QRY_FOCUS_MODE: '\x81\x09\x04\x38\xFF', // returns 90 50 ww FF - ww: 02 Auto Focus, 03 Manual
}
