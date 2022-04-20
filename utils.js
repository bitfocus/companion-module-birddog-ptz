var { MODELS } = require('./models.js')
const CHOICES = require('./choices.js')
const VISCA = require('./constants')

// #########################
// #### Get Camera Info ####
// #########################
exports.getCameraInfo = function () {
    this.sendCommand('about', 'GET')
    this.sendCommand('analogaudiosetup', 'GET')
    this.sendCommand('encodetransport', 'GET')
    this.sendCommand('encodesetup', 'GET')
    this.sendCommand('NDIDisServer', 'GET')
    this.sendCommand('birddogptzsetup', 'GET')
    this.sendCommand('birddogexpsetup', 'GET')
    this.sendCommand('birddogwbsetup', 'GET')
    this.sendCommand('birddogpicsetup', 'GET')
    this.sendCommand('birddogcmsetup', 'GET')
    this.sendCommand('birddogadvancesetup', 'GET')
    // Query Standby status
	this.sendVISCACommand(VISCA.QRY_STANDBY, '\x4a')
	// Query Auto Focus Mode
	this.sendVISCACommand(VISCA.QRY_FOCUS_MODE, '\x5a')
   
}