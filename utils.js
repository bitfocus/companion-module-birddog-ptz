var { MODELS } = require('./models.js')
const VISCA = require('./constants')

// #########################
// #### Get Camera Info ####
// #########################
exports.getCameraInfo = function () {
	MODEL_SPEC = MODELS.find((MODELS) => MODELS.id == this.camera.model).apicalls
	// Common API Calls
	this.debug('----Getting Camera Info----')
	this.sendCommand('about', 'GET')
	this.sendCommand('analogaudiosetup', 'GET')
	this.sendCommand('encodetransport', 'GET')
	// this.sendCommand('encodesetup', 'GET') Temporary skip to avoid BirdDog API bug
	this.sendCommand('NDIDisServer', 'GET')
	this.sendCommand('birddogptzsetup', 'GET')
	this.sendCommand('birddogexpsetup', 'GET')
	this.sendCommand('birddogwbsetup', 'GET')
	this.sendCommand('birddogpicsetup', 'GET')
	this.sendVISCACommand(VISCA.MSG_QRY + VISCA.CAM_POWER + VISCA.END_MSG, '\x4a') // Query Standby status
	this.sendVISCACommand(VISCA.MSG_QRY + VISCA.CAM_FOCUS_AUTO + VISCA.END_MSG, '\x5a') // Query Auto Focus Mode
	// Model Specific API Calls
	if (MODEL_SPEC?.birddogcmsetup) {
		this.debug('----Getting Camera CMS Info')
		this.sendCommand('birddogcmsetup', 'GET')
	}
	if (MODEL_SPEC?.birddogadvancesetup) {
		this.sendCommand('birddogadvancesetup', 'GET')
	}
	if (MODEL_SPEC?.birddogexternalsetup) {
		this.sendCommand('birddogadvancesetup', 'GET')
	}
	if (MODEL_SPEC?.birddogdetsetup) {
		this.sendCommand('birddogdetsetup', 'GET')
	}
	if (MODEL_SPEC?.birddoggammasetup) {
		this.sendCommand('birddoggammasetup', 'GET')
	}
	this.debug('----Camera Setup----', this.camera)
}

// #################
// #### Utils	####
// #################

exports.addStringToBinary = function (binaryStr, string) {
	var data = Buffer.from(binaryStr, 'binary').toString('hex')
	var sum = parseInt(data, 16) + parseInt(string, 16)
	return String.fromCharCode(sum.toString())
}
