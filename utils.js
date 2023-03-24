// #################
// #### Utils	####
// #################

// Reduce an array of objects down to a list of objects
// @params - An array of objects
// @returns - A list of objects
const merge = (...objects) => objects.reduce((acc, cur) => ({ ...acc, ...cur }))

export function addStringToBinary(binaryStr, string) {
	let data = Buffer.from(binaryStr, 'binary').toString('hex')
	let sum = parseInt(data, 16) + parseInt(string, 16)
	return String.fromCharCode(sum.toString())
}

// Create Postion Arrays with Max degress, Min degrees, step degree, & Hex vlaue of MAx degrees
export function createPositionArray(max, min, steps, maxhex) {
	let array = []
	let ratio = maxhex / max
	for (let i = max; i >= min; i = i - steps) {
		let id = i < 0 ? ((ratio * i) >>> 0).toString(16).slice(4) : ('0000' + Math.round(ratio * i).toString(16)).slice(-4)
		array.push({ id: id, label: i + String.fromCharCode(176) })
	}
	return array
}

export function createZoomArray(max, min, steps, maxhex) {
	let array = []
	let ratio = maxhex / (max - 1)
	for (let i = max; i >= min; i = i - steps) {
		let id = ('0000' + Math.round(ratio * (i - 1)).toString(16)).slice(-4)
		array.push({ id: id, label: i + 'X' })
	}
	return array
}

export function getPositionLabel(array, value) {
	// returns label from closest id in array to value
	// array.id contains hex as strings, value is a hex string
	if (!Array.isArray(array)) {
		return
	} else if (!value) {
		return '0' + String.fromCharCode(176)
	}
	// use two's compliment to return negative number as required
	else value = ~~parseInt(value[0] == 'f' ? 'FFFF' + value : value, 16)
	let closest = array.reduce((a, b) => {
		let a_int = ~~parseInt(a.id[0] == 'f' ? 'FFFF' + a.id : a.id, 16)
		let b_int = ~~parseInt(b.id[0] == 'f' ? 'FFFF' + b.id : b.id, 16)
		return Math.abs(b_int - value) < Math.abs(a_int - value) ? b : a
	})
	return closest.label
}

export function strToPQRS(string) {
	return (
		addStringToBinary('\x00', string[0]) +
		addStringToBinary('\x00', string[1]) +
		addStringToBinary('\x00', string[2]) +
		addStringToBinary('\x00', string[3])
	)
}

export function sortByLabel(a, b) {
	let labelA = a[1].name
	let labelB = b[1].name
	if (labelA < labelB) {
		return -1
	}
	if (labelA > labelB) {
		return 1
	}
	return 0
}

export function sortByAction(a, b) {
	let labelA = a[1].label
	let labelB = b[1].label
	if (labelA < labelB) {
		return -1
	}
	if (labelA > labelB) {
		return 1
	}
	return 0
}

export function sortByPresetCategory(a, b) {
	return a.category.localeCompare(b.category) || a.label.localeCompare(b.label)
}

export function getModelVariables(array, FW, model) {
	// returns an object containing all variables based on model & FW
	const variables = []
	let tempArray = Object.entries(array)

	let filteredArray = tempArray.filter(
		(array) =>
			// filter array based on: All cameras or Model matches, and FW matches & has 'variable_name' object
			(array[1].camera.includes(model) || array[1].camera.includes('All')) &&
			array[1].firmware.includes(FW) &&
			array[1]?.variableId
	)
	filteredArray.sort(sortByLabel)
	filteredArray.forEach((array) =>
		variables.push({
			name: array[1].name,
			variableId: array[1].variableId,
		})
	)
	return variables
}

export function getModelActions(array, FW, model) {
	// returns an object containing all actions based on model & FW
	const actions = []
	let tempArray = Object.entries(array)
	let filteredArray = tempArray.filter(
		(array) =>
			// filter array based on: All cameras or Model matches, and FW matches & has 'action' object
			(array[1].camera.includes(model) || array[1].camera.includes('All')) &&
			array[1].firmware.includes(FW) &&
			array[1]?.action
	)
	filteredArray.sort(sortByLabel)
	filteredArray.forEach((array) =>
		actions.push({
			// Create array of objects containing the action, with it's name and all relevant action options
			[array[0]]: merge({ name: array[1].name }, getModelActionDetails(array[1].action, FW, model)),
		})
	)
	return merge(...actions)
}

export function getModelActionDetails(array, FW, model) {
	// returns an object containing actions based on model & FW
	let commonActions = array.filter((array) => array.camera.includes('common'))
	let modelActions = array.filter(
		// filter array based on: All cameras or Model matches, and if it contains a FW filed, then if FW matches
		(array) => (array.camera.includes(model) || array.camera.includes('All')) && (array.firmware?.includes(FW) ?? true)
	)
	return merge(commonActions[0]?.action, modelActions[0]?.action)
}

export function getModelQueries(array, model, FW) {
	let asArray = Object.entries(array)
	return Object.fromEntries(
		asArray.filter(
			(item) => (item[1].camera.includes(model) || item[1].camera.includes('All')) && item[1].firmware.includes(FW)
		)
	)
}

export function toggleVal(val, array) {
	// returns the other value in the given 3 choice array (including 'toggle')

	let result = array.filter((element) => element.id !== val && element.id !== 'Toggle')
	return result[0].id
}
