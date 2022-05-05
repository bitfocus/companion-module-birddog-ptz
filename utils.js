// #################
// #### Utils	####
// #################

function addStringToBinary(binaryStr, string) {
	let data = Buffer.from(binaryStr, 'binary').toString('hex')
	let sum = parseInt(data, 16) + parseInt(string, 16)
	return String.fromCharCode(sum.toString())
}

function createPositionArray(max, min, steps, maxhex) {
	var array = []
	ratio = maxhex / max
	for (let i = max; i >= min; i = i - steps) {
		id = i < 0 ? ((ratio * i) >>> 0).toString(16).slice(4) : ('0000' + Math.round(ratio * i).toString(16)).slice(-4)
		array.push({ id: id, label: i + String.fromCharCode(176) })
	}
	return array
}

function createZoomArray(max, min, steps, maxhex) {
	var array = []
	ratio = maxhex / (max - 1)
	for (let i = max; i >= min; i = i - steps) {
		id = ('0000' + Math.round(ratio * (i - 1)).toString(16)).slice(-4)
		array.push({ id: id, label: i + 'X' })
	}
	return array
}

function getPositionLabel(array, value) {
	// returns label from closest id in array to value
	// array.id contains hex as strings, value is a hex string
	if (!Array.isArray(array)) {
		return
	} else if (!value) {
		return '0' + String.fromCharCode(176)
	}
	// use two's compliment to return negative number as required
	else value = ~~parseInt(value[0] == 'f' ? 'FFFF' + value : value, 16)
	closest = array.reduce((a, b) => {
		a_int = ~~parseInt(a.id[0] == 'f' ? 'FFFF' + a.id : a.id, 16)
		b_int = ~~parseInt(b.id[0] == 'f' ? 'FFFF' + b.id : b.id, 16)
		return Math.abs(b_int - value) < Math.abs(a_int - value) ? b : a
	})
	return closest.label
}

function strToPQRS(string) {
	return (
		addStringToBinary('\x00', string[0]) +
		addStringToBinary('\x00', string[1]) +
		addStringToBinary('\x00', string[2]) +
		addStringToBinary('\x00', string[3])
	)
}

module.exports = { addStringToBinary, createPositionArray, createZoomArray, getPositionLabel, strToPQRS }
