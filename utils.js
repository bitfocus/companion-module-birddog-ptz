// #################
// #### Utils	####
// #################

const merge = (...objects) => objects.reduce((acc, cur) => ({ ...acc, ...cur }))

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

function sortByLabel(a, b) {
	labelA = a[1].variable_label
	labelB = b[1].variable_label
	if (labelA < labelB) {
		return -1
	}
	if (labelA > labelB) {
		return 1
	}
	return 0
}

function sortByAction(a, b) {
	labelA = a[1].label
	labelB = b[1].label
	if (labelA < labelB) {
		return -1
	}
	if (labelA > labelB) {
		return 1
	}
	return 0
}

function getModelVariables(array, FW, model) {
	// returns an object containing all variables based on model & FW
	const variables = []
	tempArray = Object.entries(array)

	filteredArray = tempArray.filter(
		(array) =>
			// filter array based on: All cameras or Model matches, and FW matches & has 'variable_name' object
			(array[1].camera.includes(model) || array[1].camera.includes('All')) &&
			array[1].firmware.includes(FW) &&
			array[1]?.variable_name
	)
	filteredArray.sort(sortByLabel)
	filteredArray.forEach((array) =>
		variables.push({
			label: array[1].variable_label,
			name: array[1].variable_name,
		})
	)
	return variables
}

function getModelActions(array, FW, model) {
	// returns an object containing all actions based on model & FW
	const actions = []
	tempArray = Object.entries(array)
	filteredArray = tempArray.filter(
		(array) =>
			// filter array based on: All cameras or Model matches, and FW matches & has 'action' object
			(array[1].camera.includes(model) || array[1].camera.includes('All')) &&
			array[1].firmware.includes(FW) &&
			array[1]?.action
	)
	filteredArray.sort(sortByLabel)
	filteredArray.forEach((array) =>
		actions.push({
			[array[0]]: getModelActionDetails(array[1].action, FW, model),
		})
	)
	return merge(...actions)
}

function getModelActionDetails(array, FW, model) {
	// returns an object containing actions based on model & FW
	commonActions = array.filter((array) => array.camera.includes('common'))
	modelActions = array.filter(
		// filter array based on: All cameras or Model matches, and if it contains a FW filed, then if FW matches
		(array) => (array.camera.includes(model) || array.camera.includes('All')) && (array.firmware?.includes(FW) ?? true)
	)
	return merge(commonActions[0]?.action, modelActions[0]?.action)
}

module.exports = {
	addStringToBinary,
	createPositionArray,
	createZoomArray,
	getPositionLabel,
	strToPQRS,
	sortByAction,
	getModelVariables,
	getModelActions,
}
