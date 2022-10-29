const { getModelActions, getModelVariables, sortByPresetCategory } = require('./utils')
var { MODEL_SPECS } = require('./models.js')

exports.getPresets = function () {
	const ColorWhite = this.rgb(255, 255, 255) // White
	const ColorBlack = this.rgb(0, 0, 0) // Black
	const ColorRed = this.rgb(255, 0, 0) // Red
	const ColorGreen = this.rgb(0, 255, 0) // Green
	const ColorOrange = this.rgb(255, 102, 0) // Orange

	MODEL_ACTIONS = getModelActions(MODEL_SPECS, this.camera.firmware.major, this.camera.model)
	MODEL_VARIABLES = getModelVariables(MODEL_SPECS, this.camera.firmware.major, this.camera.model)

	let presets = []

	// Variables for Base64 image data do not edit
	let image_up =
		'iVBORw0KGgoAAAANSUhEUgAAAEgAAAA6AQMAAAApyY3OAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+LUNEtwAAAARnQU1BAACxjwv8YQUAAAABc1JHQgCuzhzpAAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAAIFJREFUKM+90EEKgzAQRmFDFy49ghcp5FquVPBighcRegHBjWDJ68D8U6F7m00+EnhkUlW3ru6rdyCV0INQzSg1zFLLKmU2aeCQQMEEJXIQORRsTLNyKJhNm3IoaPBg4mQorp2Mh1+00kKN307o/bZrpt5O/FlPU/c75X91/fPd6wPRD1eHyHEL4wAAAABJRU5ErkJggg=='
	let image_down =
		'iVBORw0KGgoAAAANSUhEUgAAAEgAAAA6AQMAAAApyY3OAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+LUNEtwAAAARnQU1BAACxjwv8YQUAAAABc1JHQgCuzhzpAAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAAIlJREFUKM/F0DEOwyAMBVAjDxk5Qo7CtdiClIv1KJF6gUpZIhXxY2zTDJ2benoS8LFN9MsKbYjxF2XRS1UZ4bCeGFztFmNqphURpidm146kpwFvLDYJpPQtLSLNoySyP2bRpoqih2oSFW8K3lYAxmJGXA88XMnjeuDmih7XA8vXvNeeqX6U6aY6AacbWAQNWOPUAAAAAElFTkSuQmCC'
	let image_left =
		'iVBORw0KGgoAAAANSUhEUgAAAEgAAAA6AQMAAAApyY3OAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+LUNEtwAAAARnQU1BAACxjwv8YQUAAAABc1JHQgCuzhzpAAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAAHpJREFUKM+1kTEOgCAQBM9Q2JjwA/mJPA2fxlN4giWF8TRBBhMpbKSaZie3i8gPb4Y8FNZKGm8YIAONkNWacIruQLejy+gyug1dQhfRqZa0v6gYA6QfqSWapZnto1B6XdUuFaVHoJunr2MD21nIdJYUEhLYfoGmP777BKKIXC0eYSD5AAAAAElFTkSuQmCC'
	let image_right =
		'iVBORw0KGgoAAAANSUhEUgAAAEgAAAA6AQMAAAApyY3OAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+LUNEtwAAAARnQU1BAACxjwv8YQUAAAABc1JHQgCuzhzpAAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAAHhJREFUKM+10LERgCAMQFE4CktHcBRWcRMYzVEcwdKCI+od+fGksVCq3/AuiXOfvZnaNXzRClVrEKtMLdSqP2RTRQAFMAFGwAlw7MAk0sAzGnhVoerLKg/F5Pv4NoFNZZNGpk9sxJYeLsDdL5T7S8IFOM/R3OZ+fQeQZV9pMy+bVgAAAABJRU5ErkJggg=='
	let image_up_right =
		'iVBORw0KGgoAAAANSUhEUgAAAEgAAAA6CAMAAAAk2e+/AAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+LUNEtwAAAARnQU1BAACxjwv8YQUAAAABc1JHQgCuzhzpAAABhlBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+X02G5AAAAgXRSTlMAAte32QZhZx7d+TywDTf8/d5VstYPOxULNvKmSY8TFBrxyeGCluJeELQ5uw7ULND4BedlKuv2P/vDA8UgCk30WO41s8+5X8dABAz6QhHVaR156JpPnihSfTJDNOMBm4bzSICqr23NsRjcGRbtjTCS2lzsOmyu9+WLKb2fTL8+RPDhqO4yAAABfElEQVRYw+3WZW/CUBQG4AO0FBsOwwcMm7sLc3d3d3e388/HGGs7lpD0tsm+9P3S5CT3SdPec+8BkCNHzv9FAVAAEABYdQDkA7jo9GNUIDMBzstb5vr0/Gx8Z35zOjI36R2xbu+619eWa2xCoK0FClF5h1cWxDHEwilEOyLlQc8hokoAlMRcESBh7siQlJBWKkijNaHuPrWBED9iYiDQ7Pv1D4Z4/DXyFo2JgeAghQEkEgAvT6IgNo/PIUmgd62oj80mqEIpINoXRkmg2j2UBDIWVXKLTSXEUIOF/xbV5aRQsJvvUOoqMqjZZ+c7FcX8ThYCtTbxHV0fkEGDA73D3Dpzi/6rWEYAdSn579PZ/t3IBJChkef0dLRlHXdkJ6TSmSnmiYPq1LQIiGHX9BvZYinJ7/+R6q1czUG0j9KSOTxDc6UhshZhMIQrS78mncwZtzErrNcYL6V2Zd0tJ6i7QFtAYPcvHv25W6J+/Y3BrRA/x6WGuGN5mpUjhyyfsGtrpKE95HoAAAAASUVORK5CYII='
	let image_down_right =
		'iVBORw0KGgoAAAANSUhEUgAAAEgAAAA6CAMAAAAk2e+/AAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+LUNEtwAAAARnQU1BAACxjwv8YQUAAAABc1JHQgCuzhzpAAABXFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9jYfXuAAAAc3RSTlMAQ98Ox1j9gAtRNTqBPfgu9p/MTQ+G1Qfx7Y0VBYyJgjkGd3ysU+Zz1IQvMM20PgwBp8Mi4TSUiDvlPxylsaF2WfcjJh0S+wLzQLmY4l/ovX3ra1rPLAOSKa4RUEvgcZwbFHqPzodGbX7qPMvCtsEq1laguT+HEwAAAVlJREFUWMPt1sduwkAQgOGxDfFCIITe0nvvvZHee++992TeX4pJQIC9hPWaQ6T41x6skfY7WGPJAGZm/6qgZjIH4AMgOp2Lq32batTkdW/trPt9+qC70DVmSKS2BXF7A1fX9DDnN2FUSpe8y5hID3SZuJMmrcwmoSFm5vD0BDWSNTnCUmZoD1PZtJCDGfIgRUpBMjPkR4rEAwUtFIkHAkKRuCCaxAdRJE5IK/FCGumWF1JLEW5ILfFD2ST9UBaJA6JLPBCQ57xAJcp5NQbtSgBReJSsH8QI5No8ODo+u397ecL3T35IGhcRA4jig8E9qmjAX2OGnAV5ggrxr0ELOaByVmg6B1TGvEYyTvxcKUaMv/ii7xN/VAZYY2dfSHkkPOYY7Kpf7OmLzLfGPIFGd6izWrRUjdYt9Xfo+ULsLpgRKqGtGyadAEIUmnuhXSAwMAXD5j+omZlZRl+X30CWTm2dHwAAAABJRU5ErkJggg=='
	let image_up_left =
		'iVBORw0KGgoAAAANSUhEUgAAAEgAAAA6CAMAAAAk2e+/AAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+LUNEtwAAAARnQU1BAACxjwv8YQUAAAABc1JHQgCuzhzpAAABLFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9PVkEkAAAAY3RSTlMAAQ/6Uc0OEAvHTzL7TcudsMHvdwnfUwMcG8UGiIfTrIkg9QI+/ZTDe460km73LNovCo1vQUuR4Lwk45/OK+3UERTkekziZlSK8QQnoOsFaaXmLqOylvPZLYDRZTUWUpiTDfAuEmiSAAABUklEQVRYw+3WZ2+DMBAG4EtTygrQ7NHsJt1777333vv+/38o6gIMSo0dqf3AK1lIZ/mRjPEJgCBBgvxtQr8WqDKbCiWUG1AnYXU7C7UJqKQSR5oKQwqIPphsYW24nEPjJCYXilf9F+G+qeTmThTP5w8X8gK9NLqOGMGPhD8fdXtBkGihlmlsmF5aqK2xg9FmQe3/DupuEhTpoT41z/V1HVHfxWRRo/6ORBfyjILx9mRo+2MDlS3ggF5q4uP9qzmVNjfOA+EDdDLcWA8IW6FJEJPkCbFI3hCDZEFVPsmC7mQuyYJ0iUuyIAG4JDvEJTkgHskJcUgExC6RECmxQ4REDa24ILsU6wL/rfYHskmX9C87Pfi9aA5cUmnRx/kffDmncSCkat7X342KSzOIuesNR1WSl7GU8Xfbbs9Gyoo0TvRp6Tie8d2TOsyx51UMEiQIS94B13oTqqYgGGoAAAAASUVORK5CYII='
	let image_down_left =
		'iVBORw0KGgoAAAANSUhEUgAAAEgAAAA6CAMAAAAk2e+/AAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+LUNEtwAAAARnQU1BAACxjwv8YQUAAAABc1JHQgCuzhzpAAABg1BMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8aT76cAAAAgHRSTlMAafwJfflezc+3WA7Z5Rk6PAvpBNE73kJT89QxZ48czNIv9A1DnI3qKQUaymjT4a7HdVuGf85LR20CVHr+tLBlA0GvYSTYZEnbAcazNPX4yB4GrAgnmL6Bcj4qIVKIe8kdVadIEe27B90bOG/3Er1rYJq1wibyh+4Q5CMzRllMXDo5euMAAAGfSURBVFjD7dblUwJBGAbw5aSlBJRGQERBkLC7u7u7u7veP90jDnaEcdhjP+k9X5h9Zu43O7PLe4eQECH/KGsIaUooOEcLK75LpehH628idSrE+nMANfyQ3MY2BRm0C6mM462tUwJAJtVyUB1WmsoSFZEk46D6TBcYS3UKPpCYawxD5VxHImVD/RHIxMQbGintkGQcppkcOkuutQPYfkDfmjck556ZTSydve2YY5UWk0Mww672VPh+XFqCU8tA+whtL+KOpa+bF3Rh8B4ymDNaSnSzG9IPIpsL34/HTPZfS58auMPYuYNMWcQXOsD3U9ZDOkZkkCvqwSIqUI2WfEDmgiQxRANiIp8GKtDLO6/Znw19oOdXhKoROtEUBr1F5Y9f4dt1XygqKgh6YqcHwMQkQBWICr1H6czTgrpoQde0IGnekJEWNEwLMv/GPDDB/M/fDioVeLYA5GqoYt+xNRY4toJkCiBUG7vTEVxJu2Z549RbqXQuba7uVDZWO66mgw6d7kYaEPvvCb+REIp/srGzLP4aa0n8zKFkKUSIkD+Qb9QrYMvxAbaBAAAAAElFTkSuQmCC'

	// General Camera Variables Presets

	if (MODEL_VARIABLES.some((variable) => variable.name === 'firmware')) {
		presets.push({
			category: 'General Camera',
			label: 'Firmware',
			bank: {
				style: 'text',
				text: 'FW\\n$(birddog-ptz:firmware)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
		})
	}
	if (MODEL_VARIABLES.some((variable) => variable.name === 'model')) {
		presets.push({
			category: 'General Camera',
			label: 'Model',
			bank: {
				style: 'text',
				text: 'Model\\n$(birddog-ptz:model)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
		})
	}
	if (MODEL_VARIABLES.some((variable) => variable.name === 'hostname')) {
		presets.push({
			category: 'General Camera',
			label: 'Hostname',
			bank: {
				style: 'text',
				text: 'Hostname\\n$(birddog-ptz:hostname)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
		})
	}
	if (MODEL_VARIABLES.some((variable) => variable.name === 'ipaddress')) {
		presets.push({
			category: 'General Camera',
			label: 'IP Address',
			bank: {
				style: 'text',
				text: 'IP Address\\n$(birddog-ptz:ipaddress)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
		})
	}
	if (MODEL_VARIABLES.some((variable) => variable.name === 'netmask')) {
		presets.push({
			category: 'General Camera',
			label: 'Netmask',
			bank: {
				style: 'text',
				text: 'Netmask\\n$(birddog-ptz:netmask)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
		})
	}
	if (MODEL_VARIABLES.some((variable) => variable.name === 'network_config')) {
		presets.push({
			category: 'General Camera',
			label: 'Network Config',
			bank: {
				style: 'text',
				text: 'Network Config\\n$(birddog-ptz:network_config)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
		})
	}
	if (MODEL_VARIABLES.some((variable) => variable.name === 'serial_number')) {
		presets.push({
			category: 'General Camera',
			label: 'Serial Number',
			bank: {
				style: 'text',
				text: 'SN\\n$(birddog-ptz:serial_number)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
		})
	}
	if (MODEL_VARIABLES.some((variable) => variable.name === 'status')) {
		presets.push({
			category: 'General Camera',
			label: 'Status',
			bank: {
				style: 'text',
				text: 'Status\\n$(birddog-ptz:status)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
		})
	}

	// VISCA Presets

	if (MODEL_ACTIONS?.standby) {
		presets.push({
			category: 'VISCA Actions',
			label: 'Standby',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:standby)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'standby',
					options: {
						val: 'standby',
					},
				},
			],
			feedbacks: [
				{
					type: 'standby_status',
					options: { val: MODEL_ACTIONS.standby.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.freeze) {
		presets.push({
			category: 'VISCA Actions',
			label: 'Freeze',
			bank: {
				style: 'text',
				text: 'Freeze\\n$(birddog-ptz:freeze)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'freeze',
					options: {
						val: 'Toggle',
					},
				},
			],
			feedbacks: [
				{
					type: 'freeze_status',
					options: { val: MODEL_ACTIONS.freeze.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		})
	}

	// Analog Audio Presets
	if (MODEL_ACTIONS?.analogAudioInGain) {
		presets.push({
			category: 'Analog Audio',
			label: 'Analog Audio In Gain Up',
			bank: {
				style: 'text',
				text: '⯅\\nAudio In\\nGain',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'analogAudioInGain',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'Analog Audio',
			label: 'Analog Audio In Gain Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:audio_in_gain)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'analogAudioInGain',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.analogAudioOutGain) {
		presets.push({
			category: 'Analog Audio',
			label: 'Analog Audio Out Gain Up',
			bank: {
				style: 'text',
				text: '⯅\\nAudio Out\\nGain',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'analogAudioOutGain',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'Analog Audio',
			label: 'Analog Audio Out Gain Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:audio_out_gain)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'analogAudioOutGain',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.analogAudioOutput) {
		presets.push({
			category: 'Analog Audio',
			label: 'Analog Audio Output',
			bank: {
				style: 'text',
				text: 'Audio Output\\n$(birddog-ptz:audio_output)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'analogAudioOutput',
					options: {
						val: 'Toggle',
					},
				},
			],
			feedbacks: [
				{
					type: 'analogAudioOutput',
					options: { val: MODEL_ACTIONS.analogAudioOutput.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		})
	}

	// Device Settings Variables

	if (MODEL_VARIABLES.some((variable) => variable.name === 'oled')) {
		presets.push({
			category: 'Device Settings',
			label: 'OLED',
			bank: {
				style: 'text',
				text: 'OLED\\n$(birddog-ptz:oled)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
		})
	}

	// Video Output Interface Presets

	if (MODEL_ACTIONS?.video_output) {
		presets.push({
			category: 'Video Output',
			label: 'Video Output',
			bank: {
				style: 'text',
				text: 'Video Output\\n\\n$(birddog-ptz:video_output)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'video_output',
					options: {
						val: 'Toggle',
					},
				},
			],
			feedbacks: [
				{
					type: 'video_output',
					options: { val: MODEL_ACTIONS.video_output.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		})
	}

	// Encode Setup Presets

	if (MODEL_ACTIONS?.bandwidth_mode) {
		presets.push({
			category: 'Encode Setup',
			label: 'Bandwidth Mode',
			bank: {
				style: 'text',
				text: 'BW Mode\\n$(birddog-ptz:bandwidth_mode)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'bandwidth_mode',
					options: {
						val: MODEL_ACTIONS.bandwidth_mode.default,
					},
				},
			],
			feedbacks: [
				{
					type: 'bandwidth_mode',
					options: { val: MODEL_ACTIONS.bandwidth_mode.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		})
	}

	if (MODEL_VARIABLES.some((variable) => variable.name === 'bandwidth_select')) {
		presets.push({
			category: 'Encode Setup',
			label: 'BW Select',
			bank: {
				style: 'text',
				text: 'NDI BW\\n$(birddog-ptz:bandwidth_select)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
		})
	}

	if (MODEL_VARIABLES.some((variable) => variable.name === 'color_bitdepth')) {
		presets.push({
			category: 'Encode Setup',
			label: 'Color Bitdepth',
			bank: {
				style: 'text',
				text: 'Color Bitdepth\\n$(birddog-ptz:color_bitdepth)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
		})
	}

	if (MODEL_ACTIONS?.ndiAudio) {
		presets.push({
			category: 'Encode Setup',
			label: 'NDI Audio',
			bank: {
				style: 'text',
				text: 'NDI Audio\\n$(birddog-ptz:ndi_audio)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'ndiAudio',
					options: {
						val: MODEL_ACTIONS.ndiAudio.default,
					},
				},
			],
			feedbacks: [
				{
					type: 'ndiAudio',
					options: { val: MODEL_ACTIONS.ndiAudio.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.ndiGroupEnable) {
		presets.push({
			category: 'Encode Setup',
			label: 'NDI Group',
			bank: {
				style: 'text',
				text: 'NDI Group\\n$(birddog-ptz:ndi_group)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'ndiGroupEnable',
					options: {
						val: MODEL_ACTIONS.ndiGroupEnable.default,
					},
				},
			],
			feedbacks: [
				{
					type: 'ndiGroupEnable',
					options: { val: MODEL_ACTIONS.ndiGroupEnable.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		})
	}

	if (MODEL_VARIABLES.some((variable) => variable.name === 'ndi_group_name')) {
		presets.push({
			category: 'Encode Setup',
			label: 'NDI Group Name',
			bank: {
				style: 'text',
				text: 'NDI Group Name\\n$(birddog-ptz:ndi_group_name)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
		})
	}

	if (MODEL_ACTIONS?.screensaver_mode) {
		presets.push({
			category: 'Encode Setup',
			label: 'Screensaver Mode ',
			bank: {
				style: 'text',
				text: 'SS Mode\\n$(birddog-ptz:screensaver_mode)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'screensaver_mode',
					options: {
						val: MODEL_ACTIONS.screensaver_mode.default,
					},
				},
			],
			feedbacks: [
				{
					type: 'screensaver_mode',
					options: { val: MODEL_ACTIONS.screensaver_mode.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		})
	}

	if (MODEL_VARIABLES.some((variable) => variable.name === 'stream_name')) {
		presets.push({
			category: 'Encode Setup',
			label: 'Stream Name',
			bank: {
				style: 'text',
				text: 'Stream Name\\n$(birddog-ptz:stream_name)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
		})
	}

	if (MODEL_ACTIONS?.stream_to_network) {
		presets.push({
			category: 'Encode Setup',
			label: 'Stream to Network ',
			bank: {
				style: 'text',
				text: 'Stream to Network\\n$(birddog-ptz:stream_to_network)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'stream_to_network',
					options: {
						val: MODEL_ACTIONS.stream_to_network.default,
					},
				},
			],
			feedbacks: [
				{
					type: 'stream_to_network',
					options: { val: MODEL_ACTIONS.stream_to_network.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.tally_mode) {
		presets.push({
			category: 'Encode Setup',
			label: 'Tally Mode',
			bank: {
				style: 'text',
				text: 'Tally Mode\\n$(birddog-ptz:tally_mode)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'tally_mode',
					options: {
						val: MODEL_ACTIONS.tally_mode.default,
					},
				},
			],
			feedbacks: [
				{
					type: 'tally_mode',
					options: { val: MODEL_ACTIONS.tally_mode.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		})
	}

	if (MODEL_VARIABLES.some((variable) => variable.name === 'video_csc')) {
		presets.push({
			category: 'Encode Setup',
			label: 'Video CSC',
			bank: {
				style: 'text',
				text: 'VideoCSC\\n$(birddog-ptz:video_csc)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
		})
	}

	if (MODEL_VARIABLES.some((variable) => variable.name === 'video_format')) {
		presets.push({
			category: 'Encode Setup',
			label: 'Video Format',
			bank: {
				style: 'text',
				text: 'Video Format\\n$(birddog-ptz:video_format)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
		})
	}

	if (MODEL_VARIABLES.some((variable) => variable.name === 'video_sample_rate')) {
		presets.push({
			category: 'Encode Setup',
			label: 'Video Sample Rate',
			bank: {
				style: 'text',
				text: 'Video Sample Rate\\n$(birddog-ptz:video_sample_rate)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
		})
	}

	// Encode Transport Presets

	if (MODEL_ACTIONS?.transmit_method) {
		presets.push({
			category: 'Encode Transport',
			label: 'Transmit Method',
			bank: {
				style: 'text',
				text: 'TX Method\\n$(birddog-ptz:transmit_method)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'transmit_method',
					options: {
						val: MODEL_ACTIONS.transmit_method.default,
					},
				},
			],
			feedbacks: [
				{
					type: 'transmit_method',
					options: { val: MODEL_ACTIONS.transmit_method.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		})
	}

	if (MODEL_VARIABLES.some((variable) => variable.name === 'transmit_netprefix')) {
		presets.push({
			category: 'Encode Transport',
			label: 'Multicast Net Prefix',
			bank: {
				style: 'text',
				text: 'Multicast\\nNet Prefix\\n$(birddog-ptz:transmit_netprefix)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
		})
	}

	if (MODEL_VARIABLES.some((variable) => variable.name === 'transmit_netmask')) {
		presets.push({
			category: 'Encode Transport',
			label: 'Multicast Netmask',
			bank: {
				style: 'text',
				text: 'Multicast\\nNetmask\\n$(birddog-ptz:transmit_netmask)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
		})
	}

	if (MODEL_VARIABLES.some((variable) => variable.name === 'transmit_ttl')) {
		presets.push({
			category: 'Encode Transport',
			label: 'Multicast TTL',
			bank: {
				style: 'text',
				text: 'Multicast\\nTTL\\n$(birddog-ptz:transmit_ttl)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
		})
	}

	if (MODEL_ACTIONS?.capture_screensaver) {
		presets.push({
			category: 'Encode Transport',
			label: 'Capture Screensaver',
			bank: {
				style: 'text',
				text: 'Capture Screensaver',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'capture_screensaver',
				},
			],
		})
	}

	// NDI Discovery Presets

	if (MODEL_ACTIONS?.ndi_discovery_server) {
		presets.push({
			category: 'NDI Discovery',
			label: 'NDI Discovery Server',
			bank: {
				style: 'text',
				text: 'NDI Discovery\\nServer\\n$(birddog-ptz:ndi_discovery_server)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'ndi_discovery_server',
					options: {
						val: MODEL_ACTIONS.ndi_discovery_server.default,
					},
				},
			],
			feedbacks: [
				{
					type: 'ndi_discovery_server',
					options: { val: MODEL_ACTIONS.ndi_discovery_server.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		})
	}

	if (MODEL_VARIABLES.some((variable) => variable.name === 'ndi_discovery_server_ip')) {
		presets.push({
			category: 'NDI Discovery',
			label: 'NDI Discovery Server IP',
			bank: {
				style: 'text',
				text: 'NDI Discovery\\nServer IP\\n$(birddog-ptz:ndi_discovery_server_ip)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
		})
	}

	// PTZ Presets

	if (MODEL_VARIABLES.some((variable) => variable.name === 'freed')) {
		presets.push({
			category: 'FreeD',
			label: 'FreeD',
			bank: {
				style: 'text',
				text: 'FreeD\\n$(birddog-ptz:freed)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
		})
	}

	if (MODEL_VARIABLES.some((variable) => variable.name === 'freed_ip_address')) {
		presets.push({
			category: 'FreeD',
			label: 'FreeD IP Address',
			bank: {
				style: 'text',
				text: 'FreeD\\nIP Address\\n$(birddog-ptz:freed_ip_address)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
		})
	}

	if (MODEL_VARIABLES.some((variable) => variable.name === 'freed_port')) {
		presets.push({
			category: 'FreeD',
			label: 'FreeD Port',
			bank: {
				style: 'text',
				text: 'FreeD\\nPort\\n$(birddog-ptz:freed_port)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
		})
	}

	if (MODEL_ACTIONS?.pt) {
		presets.push({
			category: 'Camera Control',
			label: 'UP',
			bank: {
				style: 'png',
				text: '',
				png64: image_up,
				pngalignment: 'center:center',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'pt',
					options: {
						val: 'up',
					},
				},
			],
			release_actions: [
				{
					action: 'pt',
					options: {
						val: 'stop',
					},
				},
			],
		})
		presets.push({
			category: 'Camera Control',
			label: 'DOWN',
			bank: {
				style: 'png',
				text: '',
				png64: image_down,
				pngalignment: 'center:center',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'pt',
					options: {
						val: 'down',
					},
				},
			],
			release_actions: [
				{
					action: 'pt',
					options: {
						val: 'stop',
					},
				},
			],
		})
		presets.push({
			category: 'Camera Control',
			label: 'LEFT',
			bank: {
				style: 'png',
				text: '',
				png64: image_left,
				pngalignment: 'center:center',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'pt',
					options: {
						val: 'left',
					},
				},
			],
			release_actions: [
				{
					action: 'pt',
					options: {
						val: 'stop',
					},
				},
			],
		})
		presets.push({
			category: 'Camera Control',
			label: 'RIGHT',
			bank: {
				style: 'png',
				text: '',
				png64: image_right,
				pngalignment: 'center:center',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'pt',
					options: {
						val: 'right',
					},
				},
			],
			release_actions: [
				{
					action: 'pt',
					options: {
						val: 'stop',
					},
				},
			],
		})
		presets.push({
			category: 'Camera Control',
			label: 'UP RIGHT',
			bank: {
				style: 'png',
				text: '',
				png64: image_up_right,
				pngalignment: 'center:center',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'pt',
					options: {
						val: 'up_right',
					},
				},
			],
			release_actions: [
				{
					action: 'pt',
					options: {
						val: 'stop',
					},
				},
			],
		})
		presets.push({
			category: 'Camera Control',
			label: 'UP LEFT',
			bank: {
				style: 'png',
				text: '',
				png64: image_up_left,
				pngalignment: 'center:center',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'pt',
					options: {
						val: 'up_left',
					},
				},
			],
			release_actions: [
				{
					action: 'pt',
					options: {
						val: 'stop',
					},
				},
			],
		})
		presets.push({
			category: 'Camera Control',
			label: 'DOWN LEFT',
			bank: {
				style: 'png',
				text: '',
				png64: image_down_left,
				pngalignment: 'center:center',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'pt',
					options: {
						val: 'down_left',
					},
				},
			],
			release_actions: [
				{
					action: 'pt',
					options: {
						val: 'stop',
					},
				},
			],
		})
		presets.push({
			category: 'Camera Control',
			label: 'DOWN RIGHT',
			bank: {
				style: 'png',
				text: '',
				png64: image_down_right,
				pngalignment: 'center:center',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'pt',
					options: {
						val: 'down_right',
					},
				},
			],
			release_actions: [
				{
					action: 'pt',
					options: {
						val: 'stop',
					},
				},
			],
		})
		presets.push({
			category: 'Camera Control',
			label: 'Home',
			bank: {
				style: 'text',
				text: 'HOME',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'pt',
					options: {
						val: 'home',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.panSpeed) {
		presets.push({
			category: 'Camera Control',
			label: 'Pan Speed Up',
			bank: {
				style: 'text',
				text: '⯅\\nPan Speed',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'panSpeed',
					options: {
						type: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'Camera Control',
			label: 'Pan Speed Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:pan_speed)\\n⯆',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'panSpeed',
					options: {
						type: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.preset) {
		presets.push({
			category: 'Preset',
			label: 'Preset Mode',
			bank: {
				style: 'text',
				text: 'Preset $(birddog-ptz:preset)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'preset',
					options: {
						val: MODEL_ACTIONS.preset.default,
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.preset_speed) {
		presets.push({
			category: 'Preset',
			label: 'Preset Speed Up',
			bank: {
				style: 'text',
				text: '⯅\\nPreset Speed',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'preset_speed',
					options: {
						type: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'Preset',
			label: 'Preset Speed Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:preset_speed)\\n⯆',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'preset_speed',
					options: {
						type: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.recallPset) {
		let recall
		for (recall = 1; recall == 9; recall++) {
			presets.push({
				category: 'Preset',
				label: 'Recall Preset ' + parseInt(recall),
				bank: {
					style: 'text',
					text: 'Recall\\nPreset\\n' + parseInt(recall),
					size: '14',
					color: ColorWhite,
					bgcolor: ColorBlack,
				},
				actions: [
					{
						action: 'recallPset',
						options: {
							val: parseInt(recall),
						},
					},
				],
			})
		}
	}

	if (MODEL_ACTIONS?.savePset) {
		let save
		for (save = 1; save == 9; save++) {
			presets.push({
				category: 'Preset',
				label: 'Save Preset ' + parseInt(save),
				bank: {
					style: 'text',
					text: 'Save\\nPreset\\n' + parseInt(save),
					size: '14',
					color: ColorWhite,
					bgcolor: ColorBlack,
				},
				actions: [
					{
						action: 'savePset',
						options: {
							val: parseInt(save),
						},
					},
				],
			})
		}
	}

	if (MODEL_ACTIONS?.tiltSpeed) {
		presets.push({
			category: 'Camera Control',
			label: 'Tilt Speed Up',
			bank: {
				style: 'text',
				text: '⯅\\nTilt Speed',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'tiltSpeed',
					options: {
						type: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'Camera Control',
			label: 'Tilt Speed Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:tilt_speed)\\n⯆',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'tiltSpeed',
					options: {
						type: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.zoom) {
		presets.push({
			category: 'Camera Control',
			label: 'Zoom In',
			bank: {
				style: 'text',
				text: 'TELE',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'zoom',
					options: {
						val: 'in',
					},
				},
			],
			release_actions: [
				{
					action: 'zoom',
					options: {
						val: 'stop',
					},
				},
			],
		})
		presets.push({
			category: 'Camera Control',
			label: 'Zoom Out',
			bank: {
				style: 'text',
				text: 'WIDE',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'zoom',
					options: {
						val: 'out',
					},
				},
			],
			release_actions: [
				{
					action: 'zoom',
					options: {
						val: 'stop',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.zoomSpeed) {
		presets.push({
			category: 'Camera Control',
			label: 'Zoom Speed Up',
			bank: {
				style: 'text',
				text: '⯅\\nZoom Speed',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'zoomSpeed',
					options: {
						type: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'Camera Control',
			label: 'Zoom Speed Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:zoom_speed)\\n⯆',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'zoomSpeed',
					options: {
						type: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.onScreenMenu) {
		presets.push({
			category: 'Camera Control',
			label: 'On Screen Menu',
			bank: {
				style: 'text',
				text: 'Menu ON/OFF',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'onScreenMenu',
				},
			],
		})
	}

	// Focus Actions

	if (MODEL_ACTIONS?.focus) {
		presets.push({
			category: 'Camera Control',
			label: 'Focus In',
			bank: {
				style: 'text',
				text: 'Focus\\nIn',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'focus',
					options: {
						val: 'near',
					},
				},
			],
			release_actions: [
				{
					action: 'focus',
					options: {
						val: 'stop',
					},
				},
			],
		})
		presets.push({
			category: 'Camera Control',
			label: 'Focus Far',
			bank: {
				style: 'text',
				text: 'Focus\\nOut',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'focus',
					options: {
						val: 'far',
					},
				},
			],
			release_actions: [
				{
					action: 'focus',
					options: {
						val: 'stop',
					},
				},
			],
		})
		presets.push({
			category: 'Camera Control',
			label: 'Focus Mode',
			bank: {
				style: 'text',
				text: 'Focus Mode\\n$(birddog-ptz:focus_mode)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'focusM',
					options: {
						val: 'Toggle',
					},
				},
			],
			feedbacks: [
				{
					type: 'focusMode',
					options: { val: MODEL_ACTIONS.focusM.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		})
		presets.push({
			category: 'Camera Control',
			label: 'One Push Auto Focus',
			bank: {
				style: 'text',
				text: 'O.P.\\nAF',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'focus',
					options: {
						val: 'trigger',
					},
				},
			],
		})
	}

	// Exposure Presets

	if (MODEL_ACTIONS?.ae_response) {
		presets.push({
			category: 'Exposure',
			label: 'Ae Response',
			bank: {
				style: 'text',
				text: 'Ae Response\\n$(birddog-ptz:ae_response)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'ae_response',
					options: {
						val: MODEL_ACTIONS.ae_response.default,
					},
				},
			],
			feedbacks: [
				{
					type: 'ae_response',
					options: { val: MODEL_ACTIONS.ae_response.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.backlight) {
		presets.push({
			category: 'Exposure',
			label: 'Backlight',
			bank: {
				style: 'text',
				text: 'Backlight\\n$(birddog-ptz:backlight)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'backlight',
					options: {
						mode: 'Toggle',
					},
				},
			],
			feedbacks: [
				{
					type: 'backlight',
					options: { mode: MODEL_ACTIONS.backlight.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.bright_level) {
		presets.push({
			category: 'Exposure',
			label: 'Bright Level',
			bank: {
				style: 'text',
				text: 'Bright Level\\n$(birddog-ptz:bright_level)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'bright_level',
					options: {
						val: MODEL_ACTIONS.bright_level.default,
					},
				},
			],
			feedbacks: [
				{
					type: 'bright_level',
					options: { val: MODEL_ACTIONS.bright_level.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.expComp) {
		presets.push({
			category: 'Exposure',
			label: 'Exposure Compensation',
			bank: {
				style: 'text',
				text: 'Exposure Compensation\\n$(birddog-ptz:exposure_comp)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'expComp',
					options: {
						val: MODEL_ACTIONS.expComp.default,
					},
				},
			],
			feedbacks: [
				{
					type: 'exposureoCmpEn',
					options: { val: MODEL_ACTIONS.expComp.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		})
	}

	if (MODEL_VARIABLES.some((variable) => variable.name === 'exposure_comp_level')) {
		presets.push({
			category: 'Exposure',
			label: 'Exposure Compensation Level',
			bank: {
				style: 'text',
				text: 'Exposure\\nCompensation\\nLevel\\n$(birddog-ptz:exposure_comp_level)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
		})
	}

	if (MODEL_ACTIONS?.exposure_mode) {
		presets.push({
			category: 'Exposure',
			label: 'Exposure Mode',
			bank: {
				style: 'text',
				text: 'Exposure\\nMode\\n$(birddog-ptz:exposure_mode)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'expM',
					options: {
						val: MODEL_ACTIONS.exposure_mode.default,
					},
				},
			],
			feedbacks: [
				{
					type: 'exposureMode',
					options: { val: MODEL_ACTIONS.exposure_mode.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.gain) {
		presets.push({
			category: 'Exposure',
			label: 'Gain Up',
			bank: {
				style: 'text',
				text: '⯅\\nGain',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'gain',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'Exposure',
			label: 'Gain Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:gain)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'gain',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.gain_limit) {
		presets.push({
			category: 'Exposure',
			label: 'Gain Limit Up',
			bank: {
				style: 'text',
				text: '⯅\\nGain Limit',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'gainLimit',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'Exposure',
			label: 'Gain Limit Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:gain_limit)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'gainLimit',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.gain_point) {
		presets.push({
			category: 'Exposure',
			label: 'Gain Point',
			bank: {
				style: 'text',
				text: 'Gain point\\n$(birddog-ptz:gain_point)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'gainPoint',
					options: {
						val: 'Toggle',
					},
				},
			],
			feedbacks: [
				{
					type: 'gain_point',
					options: { val: MODEL_ACTIONS.gain_point.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.gain_point_position) {
		presets.push({
			category: 'Exposure',
			label: 'Gain Point Position Up',
			bank: {
				style: 'text',
				text: '⯅\\nGain Point\\nPosition',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'gainPointPosition',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'Exposure',
			label: 'Gain Point Position Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:gain_point_position)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'gainPointPosition',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.high_sensitivity) {
		presets.push({
			category: 'Exposure',
			label: 'High Sensitivity',
			bank: {
				style: 'text',
				text: 'High Sensitivity\\n$(birddog-ptz:high_sensitivity)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'highSensitivity',
					options: {
						val: 'Toggle',
					},
				},
			],
			feedbacks: [
				{
					type: 'highSensitivity',
					options: { val: MODEL_ACTIONS.high_sensitivity.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.iris) {
		presets.push({
			category: 'Exposure',
			label: 'Iris Up',
			bank: {
				style: 'text',
				text: '⯅\\nIris',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'iris',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'Exposure',
			label: 'Iris Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:iris)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'iris',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.shutter_control_overwrite) {
		presets.push({
			category: 'Exposure',
			label: 'Shutter Control Overwrite',
			bank: {
				style: 'text',
				text: 'Shutter Control\\nOverwrite\\n$(birddog-ptz:shutter_control_overwrite)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'shutter_control_overwrite',
					options: {
						val: 'Toggle',
					},
				},
			],
			feedbacks: [
				{
					type: 'shutter_control_overwrite',
					options: { val: MODEL_ACTIONS.shutter_control_overwrite.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.shutter_max_speed) {
		presets.push({
			category: 'Exposure',
			label: 'Shutter Max Speed Up',
			bank: {
				style: 'text',
				text: '⯅\\nShutter\\nMax Speed',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'shutter_max_speed',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'Exposure',
			label: 'Shutter Max Speed Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:shutter_max_speed)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'shutter_max_speed',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.shutter_min_speed) {
		presets.push({
			category: 'Exposure',
			label: 'Shutter Min Speed Up',
			bank: {
				style: 'text',
				text: '⯅\\nShutter\\nMin Speed',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'shutter_min_speed',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'Exposure',
			label: 'Shutter Min Speed Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:shutter_min_speed)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'shutter_min_speed',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.shutter_speed) {
		presets.push({
			category: 'Exposure',
			label: 'Shutter Up',
			bank: {
				style: 'text',
				text: '⯅\\nShutter',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'shut',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'Exposure',
			label: 'Shutter Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:shutter_speed)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'shut',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.shutter_speed_overwrite) {
		presets.push({
			category: 'Exposure',
			label: 'Shutter Speed Overwrite Up',
			bank: {
				style: 'text',
				text: '⯅\\nShutter Speed\\nOverwrite',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'shutter_speed_overwrite',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'Exposure',
			label: 'Shutter Speed Overwrite Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:shutter_speed_overwrite)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'shutter_speed_overwrite',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.slow_shutter_en) {
		presets.push({
			category: 'Exposure',
			label: 'Slow Shutter Enable',
			bank: {
				style: 'text',
				text: 'Slow Shutter\\nEnable\\n$(birddog-ptz:slow_shutter_en)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'slow_shutter_en',
					options: {
						val: 'Toggle',
					},
				},
			],
			feedbacks: [
				{
					type: 'slow_shutter_en',
					options: { val: MODEL_ACTIONS.slow_shutter_en.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.slow_shutter_limit) {
		presets.push({
			category: 'Exposure',
			label: 'Slow Shutter Limit Up',
			bank: {
				style: 'text',
				text: '⯅\\nSlow Shutter\\nLimit',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'slow_shutter_limit',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'Exposure',
			label: 'Slow Shutter Limit Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:slow_shutter_limit)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'slow_shutter_limit',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.spotlight) {
		presets.push({
			category: 'Exposure',
			label: 'Spotlight',
			bank: {
				style: 'text',
				text: 'Spotlight\\n$(birddog-ptz:spotlight)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'spotlight',
					options: {
						val: 'Toggle',
					},
				},
			],
			feedbacks: [
				{
					type: 'spotlight',
					options: { val: MODEL_ACTIONS.spotlight.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		})
	}

	// White Balance Presets

	if (MODEL_ACTIONS?.bg) {
		presets.push({
			category: 'White Balance',
			label: 'BG Up',
			bank: {
				style: 'text',
				text: '⯅\\nBG',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'bg',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'White Balance',
			label: 'BG Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:bg)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'bg',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.br) {
		presets.push({
			category: 'White Balance',
			label: 'BR Up',
			bank: {
				style: 'text',
				text: '⯅\\nBR',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'br',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'White Balance',
			label: 'BR Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:br)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'br',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.blue_gain) {
		presets.push({
			category: 'White Balance',
			label: 'Blue Gain Up',
			bank: {
				style: 'text',
				text: '⯅\\nBlue Gain',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'blue_gain',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'White Balance',
			label: 'Blue Gain Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:blue_gain)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'blue_gain',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.color_temp) {
		presets.push({
			category: 'White Balance',
			label: 'Color Temp Up',
			bank: {
				style: 'text',
				text: '⯅\\nColor Temp',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'color_temp',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'White Balance',
			label: 'Color Temp Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:color_temp)K\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'color_temp',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.gb) {
		presets.push({
			category: 'White Balance',
			label: 'GB Up',
			bank: {
				style: 'text',
				text: '⯅\\nGB',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'gb',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'White Balance',
			label: 'GB Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:gb)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'gb',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.gr) {
		presets.push({
			category: 'White Balance',
			label: 'GR Up',
			bank: {
				style: 'text',
				text: '⯅\\nGR',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'gr',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'White Balance',
			label: 'GR Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:gr)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'gr',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.level) {
		presets.push({
			category: 'White Balance',
			label: 'Level Up',
			bank: {
				style: 'text',
				text: '⯅\\nLevel',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'level',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'White Balance',
			label: 'Level Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:level)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'level',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.matrix) {
		presets.push({
			category: 'White Balance',
			label: 'Matrix',
			bank: {
				style: 'text',
				text: 'Matrix\\n$(birddog-ptz:matrix)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'matrix',
					options: {
						val: 'Toggle',
					},
				},
			],
			feedbacks: [
				{
					type: 'matrix',
					options: { val: MODEL_ACTIONS.matrix.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.offset) {
		presets.push({
			category: 'White Balance',
			label: 'Offset Up',
			bank: {
				style: 'text',
				text: '⯅\\nOffset',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'offset',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'White Balance',
			label: 'Offset Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:offset)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'offset',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.phase) {
		presets.push({
			category: 'White Balance',
			label: 'Phase Up',
			bank: {
				style: 'text',
				text: '⯅\\nPhase',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'phase',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'White Balance',
			label: 'Phase Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:phase)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'phase',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.rb) {
		presets.push({
			category: 'White Balance',
			label: 'RB Up',
			bank: {
				style: 'text',
				text: '⯅\\nRB',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'rb',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'White Balance',
			label: 'RB Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:rb)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'rb',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.rg) {
		presets.push({
			category: 'White Balance',
			label: 'RG Up',
			bank: {
				style: 'text',
				text: '⯅\\nRG',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'rg',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'White Balance',
			label: 'RG Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:rg)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'rg',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.red_gain) {
		presets.push({
			category: 'White Balance',
			label: 'Red Gain Up',
			bank: {
				style: 'text',
				text: '⯅\\nRed Gain',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'red_gain',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'White Balance',
			label: 'Red Gain Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:red_gain)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'red_gain',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.select) {
		presets.push({
			category: 'White Balance',
			label: 'Select',
			bank: {
				style: 'text',
				text: 'Select\\n$(birddog-ptz:select)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'select',
					options: {
						val: MODEL_ACTIONS.select.default,
					},
				},
			],
			feedbacks: [
				{
					type: 'select',
					options: { val: MODEL_ACTIONS.select.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.speed) {
		presets.push({
			category: 'White Balance',
			label: 'Speed Up',
			bank: {
				style: 'text',
				text: '⯅\\nSpeed',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'speed',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'White Balance',
			label: 'Speed Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:speed)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'speed',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.wb_mode) {
		presets.push({
			category: 'White Balance',
			label: 'White Balance Mode',
			bank: {
				style: 'text',
				text: 'WB Mode\\n$(birddog-ptz:wb_mode)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'wb_mode',
					options: {
						val: MODEL_ACTIONS.wb_mode.default,
					},
				},
			],
			feedbacks: [
				{
					type: 'wb_mode',
					options: { mode: MODEL_ACTIONS.wb_mode.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.wbOnePush) {
		presets.push({
			category: 'White Balance',
			label: 'WB One Push',
			bank: {
				style: 'text',
				text: 'WB\\nONE PUSH',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'wbOnePush',
				},
			],
		})
	}

	// Picture Presets

	if (MODEL_ACTIONS?.backlight_com) {
		presets.push({
			category: 'Picture',
			label: 'Backlight Compensation',
			bank: {
				style: 'text',
				text: 'Backlight\\nComp\\n$(birddog-ptz:backlight_com)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'backlight_com',
					options: {
						val: MODEL_ACTIONS.backlight_com.default,
					},
				},
			],
			feedbacks: [
				{
					type: 'backlight_com',
					options: { val: MODEL_ACTIONS.backlight_com.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.chroma_suppress) {
		presets.push({
			category: 'Picture',
			label: 'Backlight Compensation',
			bank: {
				style: 'text',
				text: 'Chroma\\nSuppress\\n$(birddog-ptz:chroma_suppress)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'chroma_suppress',
					options: {
						val: MODEL_ACTIONS.chroma_suppress.default,
					},
				},
			],
			feedbacks: [
				{
					type: 'chroma_suppress',
					options: { val: MODEL_ACTIONS.chroma_suppress.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.saturation) {
		presets.push({
			category: 'Picture',
			label: 'Saturation Up',
			bank: {
				style: 'text',
				text: '⯅\\nSaturation',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'saturation',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'Picture',
			label: 'Saturation Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:saturation)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'saturation',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.contrast) {
		presets.push({
			category: 'Picture',
			label: 'Contrast Up',
			bank: {
				style: 'text',
				text: '⯅\\nContrast',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'contrast',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'Picture',
			label: 'Contrast Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:contrast)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'contrast',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.pictureEffect) {
		presets.push({
			category: 'Picture',
			label: 'Effect',
			bank: {
				style: 'text',
				text: 'Effect\\n$(birddog-ptz:bw_effect)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'pictureEffect',
					options: {
						val: 'Toggle',
					},
				},
			],
			feedbacks: [
				{
					type: 'pictureEffect',
					options: { val: MODEL_ACTIONS.pictureEffect.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.picFlip) {
		presets.push({
			category: 'Picture',
			label: 'Flip',
			bank: {
				style: 'text',
				text: 'Flip\\n$(birddog-ptz:flip)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'picFlip',
					options: {
						val: 'Toggle',
					},
				},
			],
			feedbacks: [
				{
					type: 'picFlip',
					options: { val: MODEL_ACTIONS.picFlip.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.gamma) {
		presets.push({
			category: 'Picture',
			label: 'Gamma Up',
			bank: {
				style: 'text',
				text: '⯅\\nGamma',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'gamma',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'Picture',
			label: 'Gamma Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:gamma)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'gamma',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.highlight_comp) {
		presets.push({
			category: 'Picture',
			label: 'Flip',
			bank: {
				style: 'text',
				text: 'Flip\\n$(birddog-ptz:highlight_comp)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'highlight_comp',
					options: {
						val: MODEL_ACTIONS.highlight_comp.default,
					},
				},
			],
			feedbacks: [
				{
					type: 'highlight_comp',
					options: { val: MODEL_ACTIONS.highlight_comp.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.highlight_comp_mask) {
		presets.push({
			category: 'Picture',
			label: 'Highlight Compensation Mask Up',
			bank: {
				style: 'text',
				text: '⯅\\nHighlight\\nCompensation Mask',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'highlight_comp_mask',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'Picture',
			label: 'Highlight Compensation Mask Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:highlight_comp_mask)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'highlight_comp_mask',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.hue) {
		presets.push({
			category: 'Picture',
			label: 'Hue Up',
			bank: {
				style: 'text',
				text: '⯅\\nHue',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'hue',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'Picture',
			label: 'Hue Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:hue)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'hue',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.ir_cutfilter) {
		presets.push({
			category: 'Picture',
			label: 'IR Cutfilter',
			bank: {
				style: 'text',
				text: 'IR Cut Filter\\n$(birddog-ptz:ir_cutfilter)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'ir_cutfilter',
					options: {
						val: MODEL_ACTIONS.ir_cutfilter.default,
					},
				},
			],
			feedbacks: [
				{
					type: 'ir_cutfilter',
					options: { val: MODEL_ACTIONS.ir_cutfilter.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.low_latency) {
		presets.push({
			category: 'Picture',
			label: 'Low Latency',
			bank: {
				style: 'text',
				text: 'Low Latency\\n$(birddog-ptz:low_latency)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'low_latency',
					options: {
						val: 'Toggle',
					},
				},
			],
			feedbacks: [
				{
					type: 'low_latency',
					options: { val: MODEL_ACTIONS.low_latency.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.picMirror) {
		presets.push({
			category: 'Picture',
			label: 'Mirror',
			bank: {
				style: 'text',
				text: 'Mirror\\n$(birddog-ptz:mirror)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'picMirror',
					options: {
						val: 'Toggle',
					},
				},
			],
			feedbacks: [
				{
					type: 'picMirror',
					options: { val: MODEL_ACTIONS.picMirror.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.nd_filter) {
		presets.push({
			category: 'Picture',
			label: 'Hue Up',
			bank: {
				style: 'text',
				text: '⯅\\nHue',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'nd_filter',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'Picture',
			label: 'Hue Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:nd_filter)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'nd_filter',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.noise_reduction) {
		presets.push({
			category: 'Picture',
			label: 'Noise Reduction Up',
			bank: {
				style: 'text',
				text: '⯅\\nNR',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'noise_reduction',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'Picture',
			label: 'Noise Reduction Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:noise_reduction)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'noise_reduction',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.sharpness) {
		presets.push({
			category: 'Picture',
			label: 'Sharpness Up',
			bank: {
				style: 'text',
				text: '⯅\\nSharpness',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'sharpness',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'Picture',
			label: 'Sharpness Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:sharpness)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'sharpness',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.stabilizer) {
		presets.push({
			category: 'Picture',
			label: 'Stabilizer',
			bank: {
				style: 'text',
				text: 'Mirror\\n$(birddog-ptz:stabilizer)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'stabilizer',
					options: {
						val: 'Toggle',
					},
				},
			],
			feedbacks: [
				{
					type: 'stabilizer',
					options: { val: MODEL_ACTIONS.stabilizer.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.threed_nr) {
		presets.push({
			category: 'Picture',
			label: '3D Noise Reduction Up',
			bank: {
				style: 'text',
				text: '⯅\\n3D NR',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'threed_nr',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'Picture',
			label: '3D Noise Reduction Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:threed_nr)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'threed_nr',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.twod_nr) {
		presets.push({
			category: 'Picture',
			label: '2D Noise Reduction Up',
			bank: {
				style: 'text',
				text: '⯅\\n2D NR',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'twod_nr',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'Picture',
			label: '2D Noise Reduction Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:twod_nr)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'twod_nr',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.wide_dynamic_range) {
		presets.push({
			category: 'Picture',
			label: 'Wide Dynamics Range Up',
			bank: {
				style: 'text',
				text: '⯅\\nWDR',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'wide_dynamic_range',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'Picture',
			label: 'Wide Dynamics Range Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:wide_dynamic_range)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'wide_dynamic_range',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	// Color Matrix Presets

	if (MODEL_ACTIONS?.cm_blue_gain) {
		presets.push({
			category: 'Color Matrix',
			label: 'Blue Gain Up',
			bank: {
				style: 'text',
				text: '⯅\\nBlue Gain',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'cm_blue_gain',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'Color Matrix',
			label: 'Blue Gain Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:cm_blue_gain)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'cm_blue_gain',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.cm_blue_hue) {
		presets.push({
			category: 'Color Matrix',
			label: 'Blue Hue Up',
			bank: {
				style: 'text',
				text: '⯅\\nBlue Hue',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'cm_blue_hue',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'Color Matrix',
			label: 'Blue Hue Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:cm_blue_hue)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'cm_blue_hue',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.cm_color_gain) {
		presets.push({
			category: 'Color Matrix',
			label: 'Color Gain Up',
			bank: {
				style: 'text',
				text: '⯅\\nColor Gain',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'cm_color_gain',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'Color Matrix',
			label: 'Color Gain Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:cm_color_gain)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'cm_color_gain',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.cm_cyan_gain) {
		presets.push({
			category: 'Color Matrix',
			label: 'Cyan Gain Up',
			bank: {
				style: 'text',
				text: '⯅\\nCyan Gain',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'cm_cyan_gain',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'Color Matrix',
			label: 'Cyan Gain Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:cm_cyan_gain)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'cm_cyan_gain',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.cm_cyan_hue) {
		presets.push({
			category: 'Color Matrix',
			label: 'Cyan Hue Up',
			bank: {
				style: 'text',
				text: '⯅\\nCyan Hue',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'cm_cyan_hue',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'Color Matrix',
			label: 'Cyan Hue Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:cm_cyan_hue)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'cm_cyan_hue',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.cm_green_gain) {
		presets.push({
			category: 'Color Matrix',
			label: 'Green Gain Up',
			bank: {
				style: 'text',
				text: '⯅\\nGreen Gain',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'cm_green_gain',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'Color Matrix',
			label: 'Green Gain Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:cm_green_gain)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'cm_green_gain',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.cm_green_hue) {
		presets.push({
			category: 'Color Matrix',
			label: 'Green Hue Up',
			bank: {
				style: 'text',
				text: '⯅\\nGreen Hue',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'cm_green_hue',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'Color Matrix',
			label: 'Green Hue Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:cm_green_hue)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'cm_green_hue',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.cm_hue_phase) {
		presets.push({
			category: 'Color Matrix',
			label: 'Hue Phase Up',
			bank: {
				style: 'text',
				text: '⯅\\nHue Phase',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'cm_hue_phase',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'Color Matrix',
			label: 'Hue Phase Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:cm_hue_phase)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'cm_hue_phase',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.cm_mag_gain) {
		presets.push({
			category: 'Color Matrix',
			label: 'Magenta Gain Up',
			bank: {
				style: 'text',
				text: '⯅\\nMagenta Gain',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'cm_mag_gain',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'Color Matrix',
			label: 'Magenta Gain Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:cm_mag_gain)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'cm_mag_gain',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.cm_mag_hue) {
		presets.push({
			category: 'Color Matrix',
			label: 'Magenta Hue Up',
			bank: {
				style: 'text',
				text: '⯅\\nMagenta Hue',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'cm_mag_hue',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'Color Matrix',
			label: 'Magenta Hue Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:cm_mag_hue)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'cm_mag_hue',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.cm_red_gain) {
		presets.push({
			category: 'Color Matrix',
			label: 'Red Gain Up',
			bank: {
				style: 'text',
				text: '⯅\\nRed Gain',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'cm_red_gain',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'Color Matrix',
			label: 'Red Gain Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:cm_red_gain)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'cm_red_gain',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.cm_red_hue) {
		presets.push({
			category: 'Color Matrix',
			label: 'Red Hue Up',
			bank: {
				style: 'text',
				text: '⯅\\nRed Hue',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'cm_red_hue',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'Color Matrix',
			label: 'Red Hue Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:cm_red_hue)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'cm_red_hue',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.cm_yellow_gain) {
		presets.push({
			category: 'Color Matrix',
			label: 'Yellow Gain Up',
			bank: {
				style: 'text',
				text: '⯅\\nYellow Gain',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'cm_yellow_gain',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'Color Matrix',
			label: 'Yellow Gain Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:cm_yellow_gain)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'cm_yellow_gain',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.cm_yellow_hue) {
		presets.push({
			category: 'Color Matrix',
			label: 'Yellow Hue Up',
			bank: {
				style: 'text',
				text: '⯅\\nYellow Hue',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'cm_yellow_hue',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'Color Matrix',
			label: 'Yellow Hue Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:cm_yellow_hue)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'cm_yellow_hue',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	// Advanced Setup Presets

	if (MODEL_ACTIONS?.brightness) {
		presets.push({
			category: 'Advanced Setup',
			label: 'Brightness Up',
			bank: {
				style: 'text',
				text: '⯅\\nBrightness',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'brightness',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'Advanced Setup',
			label: 'Brightness Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:brightness)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'brightness',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.brightness_comp) {
		presets.push({
			category: 'Advanced Setup',
			label: 'Brightness Compensation',
			bank: {
				style: 'text',
				text: 'Brightness\\nCompensation\\n$(birddog-ptz:brightness_comp)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'brightness_comp',
					options: {
						val: MODEL_ACTIONS.brightness_comp.default,
					},
				},
			],
			feedbacks: [
				{
					type: 'brightness_comp',
					options: { val: MODEL_ACTIONS.brightness_comp.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.comp_level) {
		presets.push({
			category: 'Advanced Setup',
			label: 'Compensation Level',
			bank: {
				style: 'text',
				text: 'Compensation\\nLevel\\n$(birddog-ptz:comp_level)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'comp_level',
					options: {
						val: MODEL_ACTIONS.comp_level.default,
					},
				},
			],
			feedbacks: [
				{
					type: 'comp_level',
					options: { val: MODEL_ACTIONS.comp_level.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.gamma_offset) {
		presets.push({
			category: 'Advanced Setup',
			label: 'Gamma Offset Up',
			bank: {
				style: 'text',
				text: '⯅\\nGamma\\nOffset',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'gamma_offset',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'Advanced Setup',
			label: 'Gamma Offset Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:gamma_offset)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'gamma_offset',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.high_resolution) {
		presets.push({
			category: 'Advanced Setup',
			label: 'High Resolution',
			bank: {
				style: 'text',
				text: 'High\\nResolution\\n$(birddog-ptz:high_resolution)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'high_resolution',
					options: {
						val: 'Toggle',
					},
				},
			],
			feedbacks: [
				{
					type: 'high_resolution',
					options: { val: MODEL_ACTIONS.high_resolution.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.video_enhancement) {
		presets.push({
			category: 'Advanced Setup',
			label: 'Video Enhancement',
			bank: {
				style: 'text',
				text: 'Video\\nEnhancement\\n$(birddog-ptz:video_enhancement)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'video_enhancement',
					options: {
						val: 'Toggle',
					},
				},
			],
			feedbacks: [
				{
					type: 'video_enhancement',
					options: { val: MODEL_ACTIONS.video_enhancement.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		})
	}

	// External Setup Presets

	if (MODEL_ACTIONS?.aux) {
		presets.push({
			category: 'External Setup',
			label: 'Aux',
			bank: {
				style: 'text',
				text: 'Aux\\n$(birddog-ptz:aux)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'aux',
					options: {
						val: 'Toggle',
					},
				},
			],
			feedbacks: [
				{
					type: 'aux',
					options: { val: MODEL_ACTIONS.aux.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.rain_wiper) {
		presets.push({
			category: 'External Setup',
			label: 'Rain Wiper',
			bank: {
				style: 'text',
				text: 'Rain Wiper\\n$(birddog-ptz:rain_wiper)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'rain_wiper',
					options: {
						val: 'Toggle',
					},
				},
			],
			feedbacks: [
				{
					type: 'rain_wiper',
					options: { val: MODEL_ACTIONS.rain_wiper.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.v12vout) {
		presets.push({
			category: 'External Setup',
			label: '12v Out',
			bank: {
				style: 'text',
				text: '12v Out\\n$(birddog-ptz:v12vout)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'v12vout',
					options: {
						val: 'Toggle',
					},
				},
			],
			feedbacks: [
				{
					type: 'v12vout',
					options: { val: MODEL_ACTIONS.v12vout.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		})
	}

	// Detail Setup Presets

	if (MODEL_ACTIONS?.bandwidth) {
		presets.push({
			category: 'Detail Setup',
			label: 'Bandwidth',
			bank: {
				style: 'text',
				text: 'Bandwidth\\n$(birddog-ptz:bandwidth)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'bandwidth',
					options: {
						val: MODEL_ACTIONS.bandwidth.default,
					},
				},
			],
			feedbacks: [
				{
					type: 'bandwidth',
					options: { val: MODEL_ACTIONS.bandwidth.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.bw_balance) {
		presets.push({
			category: 'Detail Setup',
			label: 'BW Balance',
			bank: {
				style: 'text',
				text: 'BW Balance\\n$(birddog-ptz:bw_balance)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'bw_balance',
					options: {
						val: MODEL_ACTIONS.bw_balance.default,
					},
				},
			],
			feedbacks: [
				{
					type: 'bw_balance',
					options: { val: MODEL_ACTIONS.bw_balance.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.crispening) {
		presets.push({
			category: 'Detail Setup',
			label: 'Crispening Up',
			bank: {
				style: 'text',
				text: '⯅\\nCrispening',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'crispening',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'Advanced Setup',
			label: 'Crispening Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:crispening)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'crispening',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.detail) {
		presets.push({
			category: 'Detail Setup',
			label: 'Detail',
			bank: {
				style: 'text',
				text: 'Detail\\n$(birddog-ptz:detail)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'detail',
					options: {
						val: 'Toggle',
					},
				},
			],
			feedbacks: [
				{
					type: 'detail',
					options: { val: MODEL_ACTIONS.detail.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.highlight_detail) {
		presets.push({
			category: 'Detail Setup',
			label: 'Highlight Detail Up',
			bank: {
				style: 'text',
				text: '⯅\\nHighlight\\nDetail',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'highlight_detail',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'Advanced Setup',
			label: 'Highlight Detail Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:highlight_detail)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'highlight_detail',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.hv_balance) {
		presets.push({
			category: 'Detail Setup',
			label: 'Hv Balance Up',
			bank: {
				style: 'text',
				text: '⯅\\nHv Balance',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'hv_balance',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'Advanced Setup',
			label: 'Hv Balance Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:hv_balance)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'hv_balance',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.limit) {
		presets.push({
			category: 'Detail Setup',
			label: 'Limit Up',
			bank: {
				style: 'text',
				text: '⯅\\nLimit',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'limit',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'Advanced Setup',
			label: 'Limit Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:limit)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'limit',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.super_low) {
		presets.push({
			category: 'Detail Setup',
			label: 'Super Low Up',
			bank: {
				style: 'text',
				text: '⯅\\nSuper Low',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'super_low',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'Advanced Setup',
			label: 'Super Low Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:super_low)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'super_low',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	// Gamma Setup Presets

	if (MODEL_ACTIONS?.black_gamma_level) {
		presets.push({
			category: 'Gamma Setup',
			label: 'Black Gamma Level Up',
			bank: {
				style: 'text',
				text: '⯅\\nBlack Gamma\\nLevel',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'black_gamma_level',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'Gamma Setup',
			label: 'Black Gamma Level Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:black_gamma_level)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'black_gamma_level',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.black_level) {
		presets.push({
			category: 'Gamma Setup',
			label: 'Black Level Up',
			bank: {
				style: 'text',
				text: '⯅\\nBlack\\nLevel',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'black_level',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'Gamma Setup',
			label: 'Black Level Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:black_level)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'black_level',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.black_level_range) {
		presets.push({
			category: 'Gamma Setup',
			label: 'Black Level Range',
			bank: {
				style: 'text',
				text: 'Black Level\\nRange\\n$(birddog-ptz:black_level_range)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'black_level_range',
					options: {
						val: MODEL_ACTIONS.black_level_range.default,
					},
				},
			],
			feedbacks: [
				{
					type: 'black_level_range',
					options: { val: MODEL_ACTIONS.black_level_range.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.effect) {
		presets.push({
			category: 'Gamma Setup',
			label: 'Effect Up',
			bank: {
				style: 'text',
				text: '⯅\\nEffect',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'effect',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'Gamma Setup',
			label: 'Effect Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:effect)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'effect',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.level) {
		presets.push({
			category: 'Gamma Setup',
			label: 'Level Up',
			bank: {
				style: 'text',
				text: '⯅\\nLevel',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'level',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'Gamma Setup',
			label: 'Level Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:level)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'level',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.offset) {
		presets.push({
			category: 'Gamma Setup',
			label: 'Offset Up',
			bank: {
				style: 'text',
				text: '⯅\\nOffset',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'offset',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'Gamma Setup',
			label: 'Offset Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:offset)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'offset',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.pattern) {
		presets.push({
			category: 'Gamma Setup',
			label: 'Pattern Up',
			bank: {
				style: 'text',
				text: '⯅\\nPattern',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'pattern',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'Gamma Setup',
			label: 'Pattern Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:pattern)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'pattern',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.pattern_fine) {
		presets.push({
			category: 'Gamma Setup',
			label: 'Pattern Fine Up',
			bank: {
				style: 'text',
				text: '⯅\\nPattern\\nFine',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'pattern_fine',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'Gamma Setup',
			label: 'Pattern Fine Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:pattern_fine)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'pattern_fine',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.settings) {
		presets.push({
			category: 'Gamma Setup',
			label: 'Settings',
			bank: {
				style: 'text',
				text: 'Settings\\n$(birddog-ptz:settings)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'settings',
					options: {
						val: MODEL_ACTIONS.settings.default,
					},
				},
			],
			feedbacks: [
				{
					type: 'settings',
					options: { val: MODEL_ACTIONS.settings.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.visibility_enhancer) {
		presets.push({
			category: 'Gamma Setup',
			label: 'Visibility Enhancer',
			bank: {
				style: 'text',
				text: 'Visibility\\nEnhancer\\n$(birddog-ptz:visibility_enhancer)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'visibility_enhancer',
					options: {
						val: 'Toggle',
					},
				},
			],
			feedbacks: [
				{
					type: 'visibility_enhancer',
					options: { val: MODEL_ACTIONS.visibility_enhancer.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		})
	}

	// BirdDog Scope Presets

	if (MODEL_ACTIONS?.scope_gamma_gain) {
		presets.push({
			category: 'Scopes',
			label: 'Gamma Gain Up',
			bank: {
				style: 'text',
				text: '⯅\\nGamma\\nGain',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'scope_gamma_gain',
					options: {
						val: 'up',
					},
				},
			],
		})
		presets.push({
			category: 'Gamma Setup',
			label: 'Gamma Gain Down',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:scope_gamma_gain)\\n⯆',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'scope_gamma_gain',
					options: {
						val: 'down',
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.scope_mode) {
		presets.push({
			category: 'Scopes',
			label: 'Mode',
			bank: {
				style: 'text',
				text: 'Mode\\n$(birddog-ptz:scope_mode)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'scope_mode',
					options: {
						val: MODEL_ACTIONS.scope_mode.default,
					},
				},
			],
			feedbacks: [
				{
					type: 'scope_mode',
					options: { val: MODEL_ACTIONS.scope_mode.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.scope_position) {
		presets.push({
			category: 'Scopes',
			label: 'Position',
			bank: {
				style: 'text',
				text: 'Position\\n$(birddog-ptz:scope_position)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'scope_position',
					options: {
						val: MODEL_ACTIONS.scope_position.default,
					},
				},
			],
			feedbacks: [
				{
					type: 'scope_position',
					options: { val: MODEL_ACTIONS.scope_position.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.scope_preview) {
		presets.push({
			category: 'Scopes',
			label: 'Preview Enable',
			bank: {
				style: 'text',
				text: 'Preview\\nEnable\\n$(birddog-ptz:scope_preview)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'scope_preview',
					options: {
						val: 'Toggle',
					},
				},
			],
			feedbacks: [
				{
					type: 'scope_preview',
					options: { val: MODEL_ACTIONS.scope_preview.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.scope_program) {
		presets.push({
			category: 'Scopes',
			label: 'Program Enable',
			bank: {
				style: 'text',
				text: 'Program\\nEnable\\n$(birddog-ptz:scope_program)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'scope_program',
					options: {
						val: 'Toggle',
					},
				},
			],
			feedbacks: [
				{
					type: 'scope_program',
					options: { val: MODEL_ACTIONS.scope_program.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.scope_size) {
		presets.push({
			category: 'Scopes',
			label: 'Size',
			bank: {
				style: 'text',
				text: 'Size\\n$(birddog-ptz:scope_size)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'scope_size',
					options: {
						val: 'Toggle',
					},
				},
			],
			feedbacks: [
				{
					type: 'scope_size',
					options: { val: MODEL_ACTIONS.scope_size.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		})
	}

	if (MODEL_ACTIONS?.scope_transparency) {
		presets.push({
			category: 'Scopes',
			label: 'Transparency Enable',
			bank: {
				style: 'text',
				text: 'Transparency\\nEnable\\n$(birddog-ptz:scope_transparency)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			actions: [
				{
					action: 'scope_transparency',
					options: {
						val: 'Toggle',
					},
				},
			],
			feedbacks: [
				{
					type: 'scope_transparency',
					options: { val: MODEL_ACTIONS.scope_transparency.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		})
	}

	// Websocket Variables Preset

	if (this.camera.firmware.major == '5') {
		presets.push({
			category: 'Dashboard',
			label: 'Average Bitrate',
			bank: {
				style: 'text',
				text: 'Average\\nBitrate\\n$(birddog-ptz:avbr)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
		})
		presets.push({
			category: 'Dashboard',
			label: 'Audio Channels',
			bank: {
				style: 'text',
				text: 'Audio Ch\\n$(birddog-ptz:aud_ch)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
		})
		presets.push({
			category: 'Dashboard',
			label: 'Audio Sample Rate',
			bank: {
				style: 'text',
				text: 'Audio\\nSample Rate\\n$(birddog-ptz:aud_sr)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
		})
		presets.push({
			category: 'Dashboard',
			label: 'Audio Status',
			bank: {
				style: 'text',
				text: 'Audio\\nStatus\\n$(birddog-ptz:aud_stat)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
		})
		presets.push({
			category: 'Dashboard',
			label: 'Status',
			bank: {
				style: 'text',
				text: 'Status\\n$(birddog-ptz:dashboard_vid_status)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
		})
		presets.push({
			category: 'Dashboard',
			label: 'Device Mode',
			bank: {
				style: 'text',
				text: 'Device Mode\\n$(birddog-ptz:dev_mode)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
		})
		presets.push({
			category: 'Dashboard',
			label: 'Genlock Status',
			bank: {
				style: 'text',
				text: 'Genlock Status\\n$(birddog-ptz:gen_status)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
		})
		presets.push({
			category: 'Dashboard',
			label: 'MCU Version',
			bank: {
				style: 'text',
				text: 'MCU Version\\n$(birddog-ptz:mcu_ver)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
		})
		presets.push({
			category: 'Dashboard',
			label: 'Network Bandwidth',
			bank: {
				style: 'text',
				text: 'Network\\nBandwidth\\n$(birddog-ptz:net_band_perc)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
		})
		presets.push({
			category: 'Dashboard',
			label: 'Network Mode',
			bank: {
				style: 'text',
				text: 'Network\\nMode\\n$(birddog-ptz:net_mode)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
		})
		presets.push({
			category: 'Dashboard',
			label: 'Network Speed',
			bank: {
				style: 'text',
				text: 'Network\\nSpeed\\n$(birddog-ptz:net_speed)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
		})
		presets.push({
			category: 'Dashboard',
			label: 'Source Status',
			bank: {
				style: 'text',
				text: 'Source\\nStatus\\n$(birddog-ptz:src_stat)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
		})
		presets.push({
			category: 'Dashboard',
			label: 'CPU Usage',
			bank: {
				style: 'text',
				text: 'CPU Usage\\n$(birddog-ptz:sys_info_perc)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
		})
		presets.push({
			category: 'Dashboard',
			label: 'Video Format',
			bank: {
				style: 'text',
				text: 'Video\\nFormat\\n$(birddog-ptz:vid_fmt)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
		})
		presets.push({
			category: 'Dashboard',
			label: 'Video Frame Rate',
			bank: {
				style: 'text',
				text: 'Video\\nFrame Rate\\n$(birddog-ptz:vid_fr)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
		})
		presets.push({
			category: 'Dashboard',
			label: 'Video Resolution',
			bank: {
				style: 'text',
				text: 'Video\\nResolution\\n$(birddog-ptz:vid_res)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
		})
		presets.push({
			category: 'Dashboard',
			label: 'Video Sample rate',
			bank: {
				style: 'text',
				text: 'Video\\nSample Rate\\n$(birddog-ptz:vid_sra)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
		})
		presets.push({
			category: 'Dashboard',
			label: 'Video Stream Name',
			bank: {
				style: 'text',
				text: 'Video\\nStream Name\\n$(birddog-ptz:vid_str_name)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
		})
		presets.push({
			category: 'Dashboard',
			label: 'IRIS/Shutter/ColorTemp/Gain',
			bank: {
				style: 'text',
				text: '$(birddog-ptz:iris) $(birddog-ptz:shutter_speed)\\n$(birddog-ptz:color_temp)K\\n$(birddog-ptz:gain)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
		})
		presets.push({
			category: 'Dashboard',
			label: 'CPU / BR',
			bank: {
				style: 'text',
				text: 'CPU | BR\\n$(birddog-ptz:sys_info_perc)\\n$(birddog-ptz:avbr)',
				size: 'Auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
		})
	}

	return presets.sort(sortByPresetCategory)
}
