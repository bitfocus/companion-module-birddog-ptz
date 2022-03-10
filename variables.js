exports.updateVariableDefinitions = function () {
	const variables = []

	variables.push({
		label: `Pan Speed`,
		name: `pan_speed`,
	})
	variables.push({
		label: `Tilt Speed`,
		name: `tilt_speed`,
	})
	variables.push({
		label: `Zoom Speed`,
		name: `zoom_speed`,
	})

	variables.push({
		label: `Exposure Mode`,
		name: `exposure_mode`,
	})

	variables.push({
		label: `Gain`,
		name: `gain`,
	})

	variables.push({
		label: `Gain Limit`,
		name: `gain_limit`,
	})

	variables.push({
		label: `Iris`,
		name: `iris`,
	})

	variables.push({
		label: `Shutter Speed`,
		name: `shutter_speed`,
	})

	variables.push({
		label: `White Balance Mode`,
		name: `wb_mode`,
	})

	variables.push({
		label: `White Balance - Blue Gain`,
		name: `wb_blue_gain`,
	})

	variables.push({
		label: `White Balance - Red Gain`,
		name: `wb_red_gain`,
	})

	variables.push({
		label: `Video Format`,
		name: `video_format`,
	})

	this.setVariableDefinitions(variables)
}
