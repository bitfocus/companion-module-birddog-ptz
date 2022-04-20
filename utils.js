var { MODELS } = require('./models.js')
const CHOICES = require('./choices.js')

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
}