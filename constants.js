module.exports = {
	// ############
	// Basic VISCA Constants
	// ############

	// ############
	// CAM QUERIES
	// ############
	QRY_STANDBY: '\x81\x09\x04\x00\xFF', // returns 90 50 ww FF - ww: 02 On, 03 Standby
	QRY_FOCUS_MODE: '\x81\x09\x04\x38\xFF', // returns 90 50 ww FF - ww: 02 Auto Focus, 03 Manual
}
