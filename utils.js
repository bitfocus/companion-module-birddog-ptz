// #################
// #### Utils	####
// #################

exports.addStringToBinary = function (binaryStr, string) {
	let data = Buffer.from(binaryStr, 'binary').toString('hex')
	let sum = parseInt(data, 16) + parseInt(string, 10)
	return String.fromCharCode(sum.toString())
}
