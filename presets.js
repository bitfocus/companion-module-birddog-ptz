import { getModelActions, getModelVariables } from './utils.js'
import { MODEL_SPECS } from './models.js'
import { combineRgb } from '@companion-module/base'

export function getPresets() {
	const ColorWhite = combineRgb(255, 255, 255) // White
	const ColorBlack = combineRgb(0, 0, 0) // Black
	const ColorGreen = combineRgb(0, 255, 0) // Green

	let MODEL_ACTIONS = getModelActions(MODEL_SPECS, this.camera.firmware.major, this.camera.model)
	let MODEL_VARIABLES = getModelVariables(MODEL_SPECS, this.camera.firmware.major, this.camera.model)

	let presets = {}

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
		presets.firmware = {
			type: 'button',
			category: 'General Camera',
			name: 'Firmware',
			options: {},
			style: {
				text: 'FW\\n$(birddog-ptz:firmware)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{ down: [], up: [] }],
			feedbacks: [],
		}
	}
	if (MODEL_VARIABLES.some((variable) => variable.name === 'model')) {
		presets.model = {
			type: 'button',
			category: 'General Camera',
			name: 'Model',
			options: {},
			style: {
				text: 'Model\\n$(birddog-ptz:model)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{ down: [], up: [] }],
			feedbacks: [],
		}
	}
	if (MODEL_VARIABLES.some((variable) => variable.name === 'hostname')) {
		presets.hostname = {
			type: 'button',
			category: 'General Camera',
			name: 'Hostname',
			options: {},
			style: {
				text: 'Hostname\\n$(birddog-ptz:hostname)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{ down: [], up: [] }],
			feedbacks: [],
		}
	}
	if (MODEL_VARIABLES.some((variable) => variable.name === 'ipaddress')) {
		presets.ipaddress = {
			type: 'button',
			category: 'General Camera',
			name: 'IP Address',
			options: {},
			style: {
				text: 'IP Address\\n$(birddog-ptz:ipaddress)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{ down: [], up: [] }],
			feedbacks: [],
		}
	}
	if (MODEL_VARIABLES.some((variable) => variable.name === 'netmask')) {
		presets.netmask = {
			type: 'button',
			category: 'General Camera',
			name: 'Netmask',
			options: {},
			style: {
				text: 'Netmask\\n$(birddog-ptz:netmask)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{ down: [], up: [] }],
			feedbacks: [],
		}
	}
	if (MODEL_VARIABLES.some((variable) => variable.name === 'network_config')) {
		presets.network_config = {
			type: 'button',
			category: 'General Camera',
			name: 'Network Config',
			options: {},
			style: {
				text: 'Network Config\\n$(birddog-ptz:network_config)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{ down: [], up: [] }],
			feedbacks: [],
		}
	}
	if (MODEL_VARIABLES.some((variable) => variable.name === 'serial_number')) {
		presets.serial_number = {
			type: 'button',
			category: 'General Camera',
			name: 'Serial Number',
			options: {},
			style: {
				text: 'SN\\n$(birddog-ptz:serial_number)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{ down: [], up: [] }],
			feedbacks: [],
		}
	}
	if (MODEL_VARIABLES.some((variable) => variable.name === 'status')) {
		presets.status = {
			type: 'button',
			category: 'General Camera',
			name: 'Status',
			options: {},
			style: {
				text: 'Status\\n$(birddog-ptz:status)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{ down: [], up: [] }],
			feedbacks: [],
		}
	}

	// VISCA Presets

	if (MODEL_ACTIONS?.standby) {
		presets.standby = {
			type: 'button',
			category: 'VISCA Actions',
			name: 'Standby',
			options: {},
			style: {
				text: 'Cam Standby',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'standby',
							options: {
								val: 'standby',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'standby_status',
					options: { val: 'standby' },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		}
		presets.camOn = {
			type: 'button',
			category: 'VISCA Actions',
			name: 'Cam On',
			options: {},
			style: {
				text: 'Cam On',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'standby',
							options: {
								val: 'on',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'standby_status',
					options: { val: 'on' },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		}
	}

	if (MODEL_ACTIONS?.freeze) {
		presets.freeze = {
			type: 'button',
			category: 'VISCA Actions',
			name: 'Freeze',
			options: {},
			style: {
				text: 'Freeze\\n$(birddog-ptz:freeze)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'freeze',
							options: {
								val: 'Toggle',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'freeze_status',
					options: { val: MODEL_ACTIONS.freeze.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		}
	}

	// Analog Audio Presets
	if (MODEL_ACTIONS?.analogAudioInGain) {
		presets.analogAudioInGainUp = {
			type: 'button',
			category: 'Analog Audio',
			name: 'Analog Audio In Gain Up',
			options: {},
			style: {
				text: '🔺\\nAudio In\\nGain',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'analogAudioInGain',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.analogAudioInGainDown = {
			type: 'button',
			category: 'Analog Audio',
			name: 'Analog Audio In Gain Down',
			options: {},
			style: {
				text: '$(birddog-ptz:audio_in_gain)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'analogAudioInGain',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.analogAudioOutGain) {
		presets.analogAudioOutGainUp = {
			type: 'button',
			category: 'Analog Audio',
			name: 'Analog Audio Out Gain Up',
			options: {},
			style: {
				text: '🔺\\nAudio Out\\nGain',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'analogAudioOutGain',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.analogAudioOutGainDown = {
			type: 'button',
			category: 'Analog Audio',
			name: 'Analog Audio Out Gain Down',
			options: {},
			style: {
				text: '$(birddog-ptz:audio_out_gain)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'analogAudioOutGain',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.analogAudioOutput) {
		presets.analogAudioOutput = {
			type: 'button',
			category: 'Analog Audio',
			name: 'Analog Audio Output',
			options: {},
			style: {
				text: 'Audio Output\\n$(birddog-ptz:audio_output)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'analogAudioOutput',
							options: {
								val: 'Toggle',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'analogAudioOutput',
					options: { val: MODEL_ACTIONS.analogAudioOutput.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		}
	}

	// Device Settings Variables

	if (MODEL_VARIABLES.some((variable) => variable.name === 'oled')) {
		presets.oled = {
			type: 'button',
			category: 'Device Settings',
			name: 'OLED',
			options: {},
			style: {
				text: 'OLED\\n$(birddog-ptz:oled)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{ down: [], up: [] }],
			feedbacks: [],
		}
	}

	// Video Output Interface Presets

	if (MODEL_ACTIONS?.video_output) {
		presets.video_output = {
			type: 'button',
			category: 'Video Output',
			name: 'Video Output',
			options: {},
			style: {
				text: 'Video Output\\n\\n$(birddog-ptz:video_output)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'video_output',
							options: {
								val: 'Toggle',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'video_output',
					options: { val: MODEL_ACTIONS.video_output.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		}
	}

	if (MODEL_ACTIONS?.output_mode) {
		presets.output_mode = {
			type: 'button',
			category: 'Video Output',
			name: 'Output Mode',
			options: {},
			style: {
				text: 'Output Mode\\n\\n$(birddog-ptz:output_mode)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'output_mode',
							options: {
								val: 'Toggle',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'output_mode',
					options: { val: MODEL_ACTIONS.output_mode.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		}
	}

	if (MODEL_ACTIONS?.privacy_mode) {
		presets.privacy_mode = {
			type: 'button',
			category: 'Video Output',
			name: 'Privacy Mode',
			options: {},
			style: {
				text: 'Privacy Mode\\n\\n$(birddog-ptz:privacy_mode)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'privacy_mode',
							options: {
								val: 'Toggle',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'privacy_mode',
					options: { val: MODEL_ACTIONS.privacy_mode.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		}
	}

	// Encode Setup Presets

	if (MODEL_ACTIONS?.bandwidth_mode) {
		presets.bandwidth_mode = {
			type: 'button',
			category: 'Encode Setup',
			name: 'Bandwidth Mode',
			options: {},
			style: {
				text: 'BW Mode\\n$(birddog-ptz:bandwidth_mode)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'bandwidth_mode',
							options: {
								val: MODEL_ACTIONS.bandwidth_mode.default,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'bandwidth_mode',
					options: { val: MODEL_ACTIONS.bandwidth_mode.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		}
	}

	if (MODEL_VARIABLES.some((variable) => variable.name === 'bandwidth_select')) {
		presets.bandwidth_select = {
			type: 'button',
			category: 'Encode Setup',
			name: 'BW Select',
			options: {},
			style: {
				text: 'NDI BW\\n$(birddog-ptz:bandwidth_select)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{ down: [], up: [] }],
			feedbacks: [],
		}
	}

	if (MODEL_VARIABLES.some((variable) => variable.name === 'color_bitdepth')) {
		presets.color_bitdepth = {
			type: 'button',
			category: 'Encode Setup',
			name: 'Color Bitdepth',
			options: {},
			style: {
				text: 'Color Bitdepth\\n$(birddog-ptz:color_bitdepth)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{ down: [], up: [] }],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.ndiAudio) {
		presets.ndiAudio = {
			type: 'button',
			category: 'Encode Setup',
			name: 'NDI Audio',
			options: {},
			style: {
				text: 'NDI Audio\\n$(birddog-ptz:ndi_audio)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'ndiAudio',
							options: {
								val: MODEL_ACTIONS.ndiAudio.default,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'ndiAudio',
					options: { val: MODEL_ACTIONS.ndiAudio.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		}
	}

	if (MODEL_ACTIONS?.ndiGroupEnable) {
		presets.ndiGroupEnable = {
			type: 'button',
			category: 'Encode Setup',
			name: 'NDI Group',
			options: {},
			style: {
				text: 'NDI Group\\n$(birddog-ptz:ndi_group)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'ndiGroupEnable',
							options: {
								val: MODEL_ACTIONS.ndiGroupEnable.default,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'ndiGroupEnable',
					options: { val: MODEL_ACTIONS.ndiGroupEnable.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		}
	}

	if (MODEL_VARIABLES.some((variable) => variable.name === 'ndi_group_name')) {
		presets.ndi_group_name = {
			type: 'button',
			category: 'Encode Setup',
			name: 'NDI Group Name',
			options: {},
			style: {
				text: 'NDI Group Name\\n$(birddog-ptz:ndi_group_name)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{ down: [], up: [] }],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.screensaver_mode) {
		presets.screensaver_mode = {
			type: 'button',
			category: 'Encode Setup',
			name: 'Screensaver Mode ',
			options: {},
			style: {
				text: 'SS Mode\\n$(birddog-ptz:screensaver_mode)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'screensaver_mode',
							options: {
								val: MODEL_ACTIONS.screensaver_mode.default,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'screensaver_mode',
					options: { val: MODEL_ACTIONS.screensaver_mode.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		}
	}

	if (MODEL_VARIABLES.some((variable) => variable.name === 'stream_name')) {
		presets.stream_name = {
			type: 'button',
			category: 'Encode Setup',
			name: 'Stream Name',
			options: {},
			style: {
				text: 'Stream Name\\n$(birddog-ptz:stream_name)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{ down: [], up: [] }],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.stream_to_network) {
		presets.stream_to_network = {
			type: 'button',
			category: 'Encode Setup',
			name: 'Stream to Network ',
			options: {},
			style: {
				text: 'Stream to Network\\n$(birddog-ptz:stream_to_network)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'stream_to_network',
							options: {
								val: 'Toggle',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'stream_to_network',
					options: { val: MODEL_ACTIONS.stream_to_network.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		}
	}

	if (MODEL_ACTIONS?.tally_mode) {
		presets.tally_mode = {
			type: 'button',
			category: 'Encode Setup',
			name: 'Tally Mode',
			options: {},
			style: {
				text: 'Tally Mode\\n$(birddog-ptz:tally_mode)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'tally_mode',
							options: {
								val: 'Toggle',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'tally_mode',
					options: { val: MODEL_ACTIONS.tally_mode.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		}
	}

	if (MODEL_ACTIONS?.tally_state) {
		presets.tally_state = {
			type: 'button',
			category: 'Tally',
			name: 'Tally - Onboard Tally',
			options: {},
			style: {
				text: 'Onboard Tally\\n$(birddog-ptz:tally_mode)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'tally_state',
							options: {
								val: 'Toggle',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'tally_state',
					options: { val: MODEL_ACTIONS.tally_state.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		}
	}

	if (MODEL_ACTIONS?.tally_rest_state) {
		presets.tally_rest_state = {
			type: 'button',
			category: 'Tally',
			name: 'Tally - Tally Rest State',
			options: {},
			style: {
				text: 'Tally Rest State\\n$(birddog-ptz:tally_rest_state)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'tally_rest_state',
							options: {
								val: 'white',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'tally_rest_state',
					options: { val: MODEL_ACTIONS.tally_rest_state.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		}
	}

	if (MODEL_VARIABLES.some((variable) => variable.name === 'video_csc')) {
		presets.video_csc = {
			type: 'button',
			category: 'Encode Setup',
			name: 'Video CSC',
			options: {},
			style: {
				text: 'VideoCSC\\n$(birddog-ptz:video_csc)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{ down: [], up: [] }],
			feedbacks: [],
		}
	}

	if (MODEL_VARIABLES.some((variable) => variable.name === 'video_format')) {
		presets.video_format = {
			type: 'button',
			category: 'Encode Setup',
			name: 'Video Format',
			options: {},
			style: {
				text: 'Video Format\\n$(birddog-ptz:video_format)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{ down: [], up: [] }],
			feedbacks: [],
		}
	}

	if (MODEL_VARIABLES.some((variable) => variable.name === 'video_sample_rate')) {
		presets.video_sample_rate = {
			type: 'button',
			category: 'Encode Setup',
			name: 'Video Sample Rate',
			options: {},
			style: {
				text: 'Video Sample Rate\\n$(birddog-ptz:video_sample_rate)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{ down: [], up: [] }],
			feedbacks: [],
		}
	}

	// Encode Transport Presets

	if (MODEL_ACTIONS?.transmit_method) {
		presets.transmit_method = {
			type: 'button',
			category: 'Encode Transport',
			name: 'Transmit Method',
			options: {},
			style: {
				text: 'TX Method\\n$(birddog-ptz:transmit_method)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'transmit_method',
							options: {
								val: MODEL_ACTIONS.transmit_method.default,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'transmit_method',
					options: { val: MODEL_ACTIONS.transmit_method.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		}
	}

	if (MODEL_VARIABLES.some((variable) => variable.name === 'transmit_netprefix')) {
		presets.transmit_netprefix = {
			type: 'button',
			category: 'Encode Transport',
			name: 'Multicast Net Prefix',
			options: {},
			style: {
				text: 'Multicast\\nNet Prefix\\n$(birddog-ptz:transmit_netprefix)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{ down: [], up: [] }],
			feedbacks: [],
		}
	}

	if (MODEL_VARIABLES.some((variable) => variable.name === 'transmit_netmask')) {
		presets.transmit_netmask = {
			type: 'button',
			category: 'Encode Transport',
			name: 'Multicast Netmask',
			options: {},
			style: {
				text: 'Multicast\\nNetmask\\n$(birddog-ptz:transmit_netmask)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{ down: [], up: [] }],
			feedbacks: [],
		}
	}

	if (MODEL_VARIABLES.some((variable) => variable.name === 'transmit_ttl')) {
		presets.transmit_ttl = {
			type: 'button',
			category: 'Encode Transport',
			name: 'Multicast TTL',
			options: {},
			style: {
				text: 'Multicast\\nTTL\\n$(birddog-ptz:transmit_ttl)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{ down: [], up: [] }],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.capture_screensaver) {
		presets.capture_screensaver = {
			type: 'button',
			category: 'Encode Transport',
			name: 'Capture Screensaver',
			options: {},
			style: {
				text: 'Capture Screensaver',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'capture_screensaver',
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	// NDI Discovery Presets

	if (MODEL_ACTIONS?.ndi_discovery_server) {
		presets.ndi_discovery_server = {
			type: 'button',
			category: 'NDI Discovery',
			name: 'NDI Discovery Server',
			options: {},
			style: {
				text: 'NDI Discovery\\nServer\\n$(birddog-ptz:ndi_discovery_server)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'ndi_discovery_server',
							options: {
								val: MODEL_ACTIONS.ndi_discovery_server.default,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'ndi_discovery_server',
					options: { val: MODEL_ACTIONS.ndi_discovery_server.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		}
	}

	if (MODEL_VARIABLES.some((variable) => variable.name === 'ndi_discovery_server_ip')) {
		presets.ndi_discovery_server_ip = {
			type: 'button',
			category: 'NDI Discovery',
			name: 'NDI Discovery Server IP',
			options: {},
			style: {
				text: 'NDI Discovery\\nServer IP\\n$(birddog-ptz:ndi_discovery_server_ip)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{ down: [], up: [] }],
			feedbacks: [],
		}
	}

	// PTZ Presets

	if (MODEL_VARIABLES.some((variable) => variable.name === 'freed')) {
		presets.freed = {
			type: 'button',
			category: 'FreeD',
			name: 'FreeD',
			options: {},
			style: {
				text: 'FreeD\\n$(birddog-ptz:freed)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
		}
	}

	if (MODEL_VARIABLES.some((variable) => variable.name === 'freed_ip_address')) {
		presets.freed_ip_address = {
			type: 'button',
			category: 'FreeD',
			name: 'FreeD IP Address',
			options: {},
			style: {
				text: 'FreeD\\nIP Address\\n$(birddog-ptz:freed_ip_address)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{ down: [], up: [] }],
			feedbacks: [],
		}
	}

	if (MODEL_VARIABLES.some((variable) => variable.name === 'freed_port')) {
		presets.freed_port = {
			type: 'button',
			category: 'FreeD',
			name: 'FreeD Port',
			options: {},
			style: {
				text: 'FreeD\\nPort\\n$(birddog-ptz:freed_port)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{ down: [], up: [] }],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.pt) {
		presets.ptUp = {
			type: 'button',
			category: 'Camera Control',
			name: 'UP',
			options: {},
			style: {
				text: '',
				png64: image_up,
				pngalignment: 'center:center',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'pt',
							options: {
								val: 'up',
								posPan: '0000',
								posTilt: '0000',
								override: false,
								panSpeed: 9,
								tiltSpeed: 9,
							},
						},
					],
					up: [
						{
							actionId: 'pt',
							options: {
								val: 'stop',
							},
						},
					],
				},
			],
			feedbacks: [],
		}
		presets.ptDown = {
			type: 'button',
			category: 'Camera Control',
			name: 'DOWN',
			options: {},
			style: {
				text: '',
				png64: image_down,
				pngalignment: 'center:center',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'pt',
							options: {
								val: 'down',
								posPan: '0000',
								posTilt: '0000',
								override: false,
								panSpeed: 9,
								tiltSpeed: 9,
							},
						},
					],
					up: [
						{
							actionId: 'pt',
							options: {
								val: 'stop',
							},
						},
					],
				},
			],
			feedbacks: [],
		}
		presets.ptLeft = {
			type: 'button',
			category: 'Camera Control',
			name: 'LEFT',
			options: {},
			style: {
				text: '',
				png64: image_left,
				pngalignment: 'center:center',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'pt',
							options: {
								val: 'left',
								posPan: '0000',
								posTilt: '0000',
								override: false,
								panSpeed: 9,
								tiltSpeed: 9,
							},
						},
					],
					up: [
						{
							actionId: 'pt',
							options: {
								val: 'stop',
							},
						},
					],
				},
			],
			feedbacks: [],
		}
		presets.ptRight = {
			type: 'button',
			category: 'Camera Control',
			name: 'RIGHT',
			options: {},
			style: {
				text: '',
				png64: image_right,
				pngalignment: 'center:center',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'pt',
							options: {
								val: 'right',
								posPan: '0000',
								posTilt: '0000',
								override: false,
								panSpeed: 9,
								tiltSpeed: 9,
							},
						},
					],
					up: [
						{
							actionId: 'pt',
							options: {
								val: 'stop',
							},
						},
					],
				},
			],
			feedbacks: [],
		}
		presets.ptUpRight = {
			type: 'button',
			category: 'Camera Control',
			name: 'UP RIGHT',
			options: {},
			style: {
				text: '',
				png64: image_up_right,
				pngalignment: 'center:center',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'pt',
							options: {
								val: 'up_right',
								posPan: '0000',
								posTilt: '0000',
								override: false,
								panSpeed: 9,
								tiltSpeed: 9,
							},
						},
					],
					up: [
						{
							actionId: 'pt',
							options: {
								val: 'stop',
							},
						},
					],
				},
			],
			feedbacks: [],
		}
		presets.ptUpLeft = {
			type: 'button',
			category: 'Camera Control',
			name: 'UP LEFT',
			options: {},
			style: {
				text: '',
				png64: image_up_left,
				pngalignment: 'center:center',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'pt',
							options: {
								val: 'up_left',
								posPan: '0000',
								posTilt: '0000',
								override: false,
								panSpeed: 9,
								tiltSpeed: 9,
							},
						},
					],
					up: [
						{
							actionId: 'pt',
							options: {
								val: 'stop',
							},
						},
					],
				},
			],
			feedbacks: [],
		}
		presets.ptDownLeft = {
			type: 'button',
			category: 'Camera Control',
			name: 'DOWN LEFT',
			options: {},
			style: {
				text: '',
				png64: image_down_left,
				pngalignment: 'center:center',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'pt',
							options: {
								val: 'down_left',
								posPan: '0000',
								posTilt: '0000',
								override: false,
								panSpeed: 9,
								tiltSpeed: 9,
							},
						},
					],
					up: [
						{
							actionId: 'pt',
							options: {
								val: 'stop',
							},
						},
					],
				},
			],
			feedbacks: [],
		}
		presets.ptDownRight = {
			type: 'button',
			category: 'Camera Control',
			name: 'DOWN RIGHT',
			options: {},
			style: {
				text: '',
				png64: image_down_right,
				pngalignment: 'center:center',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'pt',
							options: {
								val: 'down_right',
								posPan: '0000',
								posTilt: '0000',
								override: false,
								panSpeed: 9,
								tiltSpeed: 9,
							},
						},
					],
					up: [
						{
							actionId: 'pt',
							options: {
								val: 'stop',
							},
						},
					],
				},
			],
			feedbacks: [],
		}
		presets.ptHome = {
			type: 'button',
			category: 'Camera Control',
			name: 'Home',
			options: {},
			style: {
				text: 'HOME',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'pt',
							options: {
								val: 'home',
								posPan: '0000',
								posTilt: '0000',
								override: false,
								panSpeed: 9,
								tiltSpeed: 9,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.panSpeed) {
		presets.panSpeedUp = {
			type: 'button',
			category: 'Camera Control',
			name: 'Pan Speed Up',
			options: {},
			style: {
				text: '🔺\\nPan Speed',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'panSpeed',
							options: {
								type: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.panSpeedDown = {
			type: 'button',
			category: 'Camera Control',
			name: 'Pan Speed Down',
			options: {},
			style: {
				text: '$(birddog-ptz:pan_speed)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'panSpeed',
							options: {
								type: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.preset) {
		presets.presetMode = {
			type: 'button',
			category: 'Preset',
			name: 'Preset Mode',
			options: {},
			style: {
				text: 'Preset $(birddog-ptz:preset)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'preset',
							options: {
								val: MODEL_ACTIONS.preset.default,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.preset_speed) {
		presets.preset_speedUp = {
			type: 'button',
			category: 'Preset',
			name: 'Preset Speed Up',
			options: {},
			style: {
				text: '🔺\\nPreset Speed',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'preset_speed',
							options: {
								type: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.preset_speedDown = {
			type: 'button',
			category: 'Preset',
			name: 'Preset Speed Down',
			options: {},
			style: {
				text: '$(birddog-ptz:preset_speed)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'preset_speed',
							options: {
								type: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.recallPset) {
		let recall
		for (recall = 1; recall < 10; recall++) {
			presets[`recallPset_${recall}`] = {
				type: 'button',
				category: 'Preset',
				label: 'Recall Preset ' + parseInt(recall),
				style: {
					text: 'Recall\\nPreset\\n' + parseInt(recall),
					size: 'auto',
					color: ColorWhite,
					bgcolor: ColorBlack,
				},
				steps: [
					{
						down: [
							{
								actionId: 'recallPset',
								options: {
									val: parseInt(recall),
								},
							},
						],
						up: [],
					},
				],
				feedbacks: [],
			}
		}
	}

	if (MODEL_ACTIONS?.savePset) {
		let save
		for (save = 1; save < 10; save++) {
			presets[`savePset${save}`] = {
				type: 'button',
				category: 'Preset',
				label: 'Save Preset ' + parseInt(save),
				style: {
					text: 'Save\\nPreset\\n' + parseInt(save),
					size: 'auto',
					color: ColorWhite,
					bgcolor: ColorBlack,
				},
				steps: [
					{
						down: [
							{
								actionId: 'savePset',
								options: {
									val: parseInt(save),
								},
							},
						],
						up: [],
					},
				],
				feedbacks: [],
			}
		}
	}

	if (MODEL_ACTIONS?.tiltSpeed) {
		presets.tiltSpeedUp = {
			type: 'button',
			category: 'Camera Control',
			name: 'Tilt Speed Up',
			options: {},
			style: {
				text: '🔺\\nTilt Speed',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'tiltSpeed',
							options: {
								type: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.tiltSpeedDown = {
			type: 'button',
			category: 'Camera Control',
			name: 'Tilt Speed Down',
			options: {},
			style: {
				text: '$(birddog-ptz:tilt_speed)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'tiltSpeed',
							options: {
								type: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.zoom) {
		presets.zoomIn = {
			type: 'button',
			category: 'Camera Control',
			name: 'Zoom In',
			options: {},
			style: {
				text: 'Tele',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'zoom',
							options: {
								val: 'in',
							},
						},
					],
					up: [
						{
							actionId: 'zoom',
							options: {
								val: 'stop',
							},
						},
					],
				},
			],
			feedbacks: [],
		}
		presets.zoomOut = {
			type: 'button',
			category: 'Camera Control',
			name: 'Zoom Out',
			options: {},
			style: {
				text: 'Wide',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'zoom',
							options: {
								val: 'out',
							},
						},
					],
					up: [
						{
							actionId: 'zoom',
							options: {
								val: 'stop',
							},
						},
					],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.zoomSpeed) {
		presets.zoomSpeedUp = {
			type: 'button',
			category: 'Camera Control',
			name: 'Zoom Speed Up',
			options: {},
			style: {
				text: '🔺\\nZoom Speed',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'zoomSpeed',
							options: {
								type: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.zoomSpeedDown = {
			type: 'button',
			category: 'Camera Control',
			name: 'Zoom Speed Down',
			options: {},
			style: {
				text: '$(birddog-ptz:zoom_speed)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'zoomSpeed',
							options: {
								type: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.onScreenMenu) {
		presets.onScreenMenu = {
			type: 'button',
			category: 'Camera Control',
			name: 'On Screen Menu',
			options: {},
			style: {
				text: 'Menu ON/OFF',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'onScreenMenu',
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	// Focus Actions

	if (MODEL_ACTIONS?.focus) {
		presets.focusIn = {
			type: 'button',
			category: 'Camera Control',
			name: 'Focus In',
			options: {},
			style: {
				text: 'Focus\\nIn',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'focus',
							options: {
								val: 'near',
							},
						},
					],
					up: [
						{
							actionId: 'focus',
							options: {
								val: 'stop',
							},
						},
					],
				},
			],
			feedbacks: [],
		}
		presets.focusFar = {
			type: 'button',
			category: 'Camera Control',
			name: 'Focus Far',
			options: {},
			style: {
				text: 'Focus\\nOut',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'focus',
							options: {
								val: 'far',
							},
						},
					],
					up: [
						{
							actionId: 'focus',
							options: {
								val: 'stop',
							},
						},
					],
				},
			],

			feedbacks: [],
		}
		presets.focusMode = {
			type: 'button',
			category: 'Camera Control',
			name: 'Focus Mode',
			options: {},
			style: {
				text: 'Focus Mode\\n$(birddog-ptz:focus_mode)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'focusM',
							options: {
								val: 'Toggle',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'focusMode',
					options: { val: MODEL_ACTIONS.focusM.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		}
		presets.focusOnePush = {
			type: 'button',
			category: 'Camera Control',
			name: 'One Push Auto Focus',
			options: {},
			style: {
				text: 'O.P.\\nAF',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'focus',
							options: {
								val: 'trigger',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	// Exposure Presets

	if (MODEL_ACTIONS?.ae_response) {
		presets.ae_response = {
			type: 'button',
			category: 'Exposure',
			name: 'Ae Response',
			options: {},
			style: {
				text: 'Ae Response\\n$(birddog-ptz:ae_response)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'ae_response',
							options: {
								val: MODEL_ACTIONS.ae_response.default,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'ae_response',
					options: { val: MODEL_ACTIONS.ae_response.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		}
	}

	if (MODEL_ACTIONS?.backlight) {
		presets.backlight = {
			type: 'button',
			category: 'Exposure',
			name: 'Backlight',
			options: {},
			style: {
				text: 'Backlight\\n$(birddog-ptz:backlight)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'backlight',
							options: {
								mode: 'Toggle',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'backlight',
					options: { mode: MODEL_ACTIONS.backlight.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		}
	}

	if (MODEL_ACTIONS?.bright_level) {
		presets.bright_level = {
			type: 'button',
			category: 'Exposure',
			name: 'Bright Level',
			options: {},
			style: {
				text: 'Bright Level\\n$(birddog-ptz:bright_level)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'bright_level',
							options: {
								val: MODEL_ACTIONS.bright_level.default,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'bright_level',
					options: { val: MODEL_ACTIONS.bright_level.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		}
	}

	if (MODEL_ACTIONS?.expComp) {
		presets.expComp = {
			type: 'button',
			category: 'Exposure',
			name: 'Exposure Compensation',
			options: {},
			style: {
				text: 'Exposure\\nComp\\n$(birddog-ptz:exposure_comp)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'expComp',
							options: {
								val: MODEL_ACTIONS.expComp.default,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'exposureoCmpEn',
					options: { val: MODEL_ACTIONS.expComp.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		}
	}

	if (MODEL_ACTIONS?.expCompLvl) {
		presets.exposure_comp_level = {
			type: 'button',
			category: 'Exposure',
			name: 'Exposure Compensation Level',
			options: {},
			style: {
				text: 'Exposure\\nComp\\nLevel\\n$(birddog-ptz:exposure_comp_level)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{ down: [], up: [] }],
			feedbacks: [],
		}
		presets.expCompLvlUp = {
			type: 'button',
			category: 'Exposure',
			name: 'Exposure Comp Level Up',
			options: {},
			style: {
				text: '🔺\\nEx Comp Lvl',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'expCompLvl',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.expCompLvlDown = {
			type: 'button',
			category: 'Exposure',
			name: 'Exposure Comp Level Down',
			options: {},
			style: {
				text: '$(birddog-ptz:exposure_comp_level)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'expCompLvl',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.exposure_mode) {
		presets.exposure_mode = {
			type: 'button',
			category: 'Exposure',
			name: 'Exposure Mode',
			options: {},
			style: {
				text: 'Exposure\\nMode\\n$(birddog-ptz:exposure_mode)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'expM',
							options: {
								val: MODEL_ACTIONS.exposure_mode.default,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'exposureMode',
					options: { mode: MODEL_ACTIONS.exposure_mode.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		}
	}

	if (MODEL_ACTIONS?.gain) {
		presets.gainUp = {
			type: 'button',
			category: 'Exposure',
			name: 'Gain Up',
			options: {},
			style: {
				text: '🔺\\nGain',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'gain',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.gainDown = {
			type: 'button',
			category: 'Exposure',
			name: 'Gain Down',
			options: {},
			style: {
				text: '$(birddog-ptz:gain)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'gain',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.gain_limit) {
		presets.gain_limitUp = {
			type: 'button',
			category: 'Exposure',
			name: 'Gain Limit Up',
			options: {},
			style: {
				text: '🔺\\nGain Limit',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'gainLimit',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.gain_limitDown = {
			type: 'button',
			category: 'Exposure',
			name: 'Gain Limit Down',
			options: {},
			style: {
				text: '$(birddog-ptz:gain_limit)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'gainLimit',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.gain_point) {
		presets.gain_point = {
			type: 'button',
			category: 'Exposure',
			name: 'Gain Point',
			options: {},
			style: {
				text: 'Gain point\\n$(birddog-ptz:gain_point)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'gainPoint',
							options: {
								val: 'Toggle',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'gain_point',
					options: { val: MODEL_ACTIONS.gain_point.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		}
	}

	if (MODEL_ACTIONS?.gain_point_position) {
		presets.gain_point_positionUp = {
			type: 'button',
			category: 'Exposure',
			name: 'Gain Point Position Up',
			options: {},
			style: {
				text: '🔺\\nGain Point\\nPosition',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'gainPointPosition',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.gain_point_positionDown = {
			type: 'button',
			category: 'Exposure',
			name: 'Gain Point Position Down',
			options: {},
			style: {
				text: '$(birddog-ptz:gain_point_position)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'gainPointPosition',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.high_sensitivity) {
		presets.high_sensitivity = {
			type: 'button',
			category: 'Exposure',
			name: 'High Sensitivity',
			options: {},
			style: {
				text: 'High Sensitivity\\n$(birddog-ptz:high_sensitivity)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'highSensitivity',
							options: {
								val: 'Toggle',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'highSensitivity',
					options: { val: MODEL_ACTIONS.high_sensitivity.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		}
	}

	if (MODEL_ACTIONS?.iris) {
		presets.irisUp = {
			type: 'button',
			category: 'Exposure',
			name: 'Iris Up',
			options: {},
			style: {
				text: '🔺\\nIris',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'iris',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.irisDown = {
			type: 'button',
			category: 'Exposure',
			name: 'Iris Down',
			options: {},
			style: {
				text: '$(birddog-ptz:iris)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'iris',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.shutter_control_overwrite) {
		presets.shutter_control_overwrite = {
			type: 'button',
			category: 'Exposure',
			name: 'Shutter Control Overwrite',
			options: {},
			style: {
				text: 'Shutter Control\\nOverwrite\\n$(birddog-ptz:shutter_control_overwrite)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'shutter_control_overwrite',
							options: {
								val: 'Toggle',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'shutter_control_overwrite',
					options: { val: MODEL_ACTIONS.shutter_control_overwrite.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		}
	}

	if (MODEL_ACTIONS?.shutter_max_speed) {
		presets.shutter_max_speedUp = {
			type: 'button',
			category: 'Exposure',
			name: 'Shutter Max Speed Up',
			options: {},
			style: {
				text: '🔺\\nShutter\\nMax Speed',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'shutter_max_speed',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.shutter_max_speedDown = {
			type: 'button',
			category: 'Exposure',
			name: 'Shutter Max Speed Down',
			options: {},
			style: {
				text: '$(birddog-ptz:shutter_max_speed)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'shutter_max_speed',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.shutter_min_speed) {
		presets.shutter_min_speedUp = {
			type: 'button',
			category: 'Exposure',
			name: 'Shutter Min Speed Up',
			options: {},
			style: {
				text: '🔺\\nShutter\\nMin Speed',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'shutter_min_speed',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.shutter_min_speedDown = {
			type: 'button',
			category: 'Exposure',
			name: 'Shutter Min Speed Down',
			options: {},
			style: {
				text: '$(birddog-ptz:shutter_min_speed)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'shutter_min_speed',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.shutter_speed) {
		presets.shutter_speedUp = {
			type: 'button',
			category: 'Exposure',
			name: 'Shutter Up',
			options: {},
			style: {
				text: '🔺\\nShutter',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'shut',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.shutter_speedDown = {
			type: 'button',
			category: 'Exposure',
			name: 'Shutter Down',
			options: {},
			style: {
				text: '$(birddog-ptz:shutter_speed)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'shut',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.shutter_speed_overwrite) {
		presets.shutter_speed_overwriteUp = {
			type: 'button',
			category: 'Exposure',
			name: 'Shutter Speed Overwrite Up',
			options: {},
			style: {
				text: '🔺\\nShutter Speed\\nOverwrite',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'shutter_speed_overwrite',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.shutter_speed_overwriteDown = {
			type: 'button',
			category: 'Exposure',
			name: 'Shutter Speed Overwrite Down',
			options: {},
			style: {
				text: '$(birddog-ptz:shutter_speed_overwrite)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'shutter_speed_overwrite',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.slow_shutter_en) {
		presets.slow_shutter_en = {
			type: 'button',
			category: 'Exposure',
			name: 'Slow Shutter Enable',
			options: {},
			style: {
				text: 'Slow Shutter\\nEnable\\n$(birddog-ptz:slow_shutter_en)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'slow_shutter_en',
							options: {
								val: 'Toggle',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'slow_shutter_en',
					options: { val: MODEL_ACTIONS.slow_shutter_en.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		}
	}

	if (MODEL_ACTIONS?.slow_shutter_limit) {
		presets.slow_shutter_limitUp = {
			type: 'button',
			category: 'Exposure',
			name: 'Slow Shutter Limit Up',
			options: {},
			style: {
				text: '🔺\\nSlow Shutter\\nLimit',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'slow_shutter_limit',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.slow_shutter_limitDown = {
			type: 'button',
			category: 'Exposure',
			name: 'Slow Shutter Limit Down',
			options: {},
			style: {
				text: '$(birddog-ptz:slow_shutter_limit)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'slow_shutter_limit',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.spotlight) {
		presets.spotlight = {
			type: 'button',
			category: 'Exposure',
			name: 'Spotlight',
			options: {},
			style: {
				text: 'Spotlight\\n$(birddog-ptz:spotlight)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'spotlight',
							options: {
								val: 'Toggle',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'spotlight',
					options: { val: MODEL_ACTIONS.spotlight.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		}
	}

	// White Balance Presets

	if (MODEL_ACTIONS?.bg) {
		presets.bgUp = {
			type: 'button',
			category: 'White Balance',
			name: 'BG Up',
			options: {},
			style: {
				text: '🔺\\nBG',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'bg',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.bgDown = {
			type: 'button',
			category: 'White Balance',
			name: 'BG Down',
			options: {},
			style: {
				text: '$(birddog-ptz:bg)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'bg',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.br) {
		presets.brUp = {
			type: 'button',
			category: 'White Balance',
			name: 'BR Up',
			options: {},
			style: {
				text: '🔺\\nBR',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'br',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.brDown = {
			type: 'button',
			category: 'White Balance',
			name: 'BR Down',
			options: {},
			style: {
				text: '$(birddog-ptz:br)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'br',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.blue_gain) {
		presets.blue_gainUp = {
			type: 'button',
			category: 'White Balance',
			name: 'Blue Gain Up',
			options: {},
			style: {
				text: '🔺\\nBlue Gain',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'blue_gain',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.blue_gainDown = {
			type: 'button',
			category: 'White Balance',
			name: 'Blue Gain Down',
			options: {},
			style: {
				text: '$(birddog-ptz:blue_gain)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'blue_gain',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.color_temp) {
		presets.color_tempUp = {
			type: 'button',
			category: 'White Balance',
			name: 'Color Temp Up',
			options: {},
			style: {
				text: '🔺\\nColor Temp',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'color_temp',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.color_tempDown = {
			type: 'button',
			category: 'White Balance',
			name: 'Color Temp Down',
			options: {},
			style: {
				text: '$(birddog-ptz:color_temp)K\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'color_temp',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.gb) {
		presets.gbUp = {
			type: 'button',
			category: 'White Balance',
			name: 'GB Up',
			options: {},
			style: {
				text: '🔺\\nGB',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'gb',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.gbDown = {
			type: 'button',
			category: 'White Balance',
			name: 'GB Down',
			options: {},
			style: {
				text: '$(birddog-ptz:gb)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'gb',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.gr) {
		presets.grUp = {
			type: 'button',
			category: 'White Balance',
			name: 'GR Up',
			options: {},
			style: {
				text: '🔺\\nGR',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'gr',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.grDown = {
			type: 'button',
			category: 'White Balance',
			name: 'GR Down',
			options: {},
			style: {
				text: '$(birddog-ptz:gr)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'gr',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.level) {
		presets.levelUp = {
			type: 'button',
			category: 'White Balance',
			name: 'Level Up',
			options: {},
			style: {
				text: '🔺\\nLevel',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'level',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.levelDown = {
			type: 'button',
			category: 'White Balance',
			name: 'Level Down',
			options: {},
			style: {
				text: '$(birddog-ptz:level)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'level',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.matrix) {
		presets.matrix = {
			type: 'button',
			category: 'White Balance',
			name: 'Matrix',
			options: {},
			style: {
				text: 'Matrix\\n$(birddog-ptz:matrix)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'matrix',
							options: {
								val: 'Toggle',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'matrix',
					options: { val: MODEL_ACTIONS.matrix.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		}
	}

	if (MODEL_ACTIONS?.offset) {
		presets.offsetUp = {
			type: 'button',
			category: 'White Balance',
			name: 'Offset Up',
			options: {},
			style: {
				text: '🔺\\nOffset',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'offset',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.offsetDown = {
			type: 'button',
			category: 'White Balance',
			name: 'Offset Down',
			options: {},
			style: {
				text: '$(birddog-ptz:offset)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'offset',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.phase) {
		presets.phaseUp = {
			type: 'button',
			category: 'White Balance',
			name: 'Phase Up',
			options: {},
			style: {
				text: '🔺\\nPhase',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'phase',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.phaseDown = {
			type: 'button',
			category: 'White Balance',
			name: 'Phase Down',
			options: {},
			style: {
				text: '$(birddog-ptz:phase)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'phase',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.rb) {
		presets.rbUp = {
			type: 'button',
			category: 'White Balance',
			name: 'RB Up',
			options: {},
			style: {
				text: '🔺\\nRB',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'rb',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.rbDown = {
			type: 'button',
			category: 'White Balance',
			name: 'RB Down',
			options: {},
			style: {
				text: '$(birddog-ptz:rb)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'rb',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.rg) {
		presets.rgUp = {
			type: 'button',
			category: 'White Balance',
			name: 'RG Up',
			options: {},
			style: {
				text: '🔺\\nRG',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'rg',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.rgDown = {
			type: 'button',
			category: 'White Balance',
			name: 'RG Down',
			options: {},
			style: {
				text: '$(birddog-ptz:rg)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'rg',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.red_gain) {
		presets.red_gainUp = {
			type: 'button',
			category: 'White Balance',
			name: 'Red Gain Up',
			options: {},
			style: {
				text: '🔺\\nRed Gain',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'red_gain',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.red_gainDown = {
			type: 'button',
			category: 'White Balance',
			name: 'Red Gain Down',
			options: {},
			style: {
				text: '$(birddog-ptz:red_gain)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'red_gain',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.select) {
		presets.select = {
			type: 'button',
			category: 'White Balance',
			name: 'Select',
			options: {},
			style: {
				text: 'Select\\n$(birddog-ptz:select)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'select',
							options: {
								val: MODEL_ACTIONS.select.default,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'select',
					options: { val: MODEL_ACTIONS.select.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		}
	}

	if (MODEL_ACTIONS?.speed) {
		presets.speedUp = {
			type: 'button',
			category: 'White Balance',
			name: 'Speed Up',
			options: {},
			style: {
				text: '🔺\\nSpeed',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'speed',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.speedDown = {
			type: 'button',
			category: 'White Balance',
			name: 'Speed Down',
			options: {},
			style: {
				text: '$(birddog-ptz:speed)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'speed',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.wb_mode) {
		presets.wb_mode = {
			type: 'button',
			category: 'White Balance',
			name: 'White Balance Mode',
			options: {},
			style: {
				text: 'WB Mode\\n$(birddog-ptz:wb_mode)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'wb_mode',
							options: {
								val: MODEL_ACTIONS.wb_mode.default,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'wb_mode',
					options: { mode: MODEL_ACTIONS.wb_mode.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		}
	}

	if (MODEL_ACTIONS?.wbOnePush) {
		presets.wbOnePush = {
			type: 'button',
			category: 'White Balance',
			name: 'WB One Push',
			options: {},
			style: {
				text: 'WB\\nONE PUSH',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'wbOnePush',
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	// Picture Presets

	if (MODEL_ACTIONS?.backlight_com) {
		presets.backlight_com = {
			type: 'button',
			category: 'Picture',
			name: 'Backlight Compensation',
			options: {},
			style: {
				text: 'Backlight\\nComp\\n$(birddog-ptz:backlight_com)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'backlight_com',
							options: {
								val: MODEL_ACTIONS.backlight_com.default,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'backlight_com',
					options: { val: MODEL_ACTIONS.backlight_com.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		}
	}

	if (MODEL_ACTIONS?.chroma_suppress) {
		presets.chroma_suppress = {
			type: 'button',
			category: 'Picture',
			name: 'Backlight Compensation',
			options: {},
			style: {
				text: 'Chroma\\nSuppress\\n$(birddog-ptz:chroma_suppress)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'chroma_suppress',
							options: {
								val: MODEL_ACTIONS.chroma_suppress.default,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'chroma_suppress',
					options: { val: MODEL_ACTIONS.chroma_suppress.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		}
	}

	if (MODEL_ACTIONS?.saturation) {
		presets.saturationUp = {
			type: 'button',
			category: 'Picture',
			name: 'Saturation Up',
			options: {},
			style: {
				text: '🔺\\nSaturation',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'saturation',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.saturationDown = {
			type: 'button',
			category: 'Picture',
			name: 'Saturation Down',
			options: {},
			style: {
				text: '$(birddog-ptz:saturation)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'saturation',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.contrast) {
		presets.contrastUp = {
			type: 'button',
			category: 'Picture',
			name: 'Contrast Up',
			options: {},
			style: {
				text: '🔺\\nContrast',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'contrast',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.contrastDown = {
			type: 'button',
			category: 'Picture',
			name: 'Contrast Down',
			options: {},
			style: {
				text: '$(birddog-ptz:contrast)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'contrast',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.pictureEffect) {
		presets.pictureEffect = {
			type: 'button',
			category: 'Picture',
			name: 'Effect',
			options: {},
			style: {
				text: 'Effect\\n$(birddog-ptz:bw_effect)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'pictureEffect',
							options: {
								val: 'Toggle',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'pictureEffect',
					options: { val: MODEL_ACTIONS.pictureEffect.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		}
	}

	if (MODEL_ACTIONS?.picFlip) {
		presets.picFlip = {
			type: 'button',
			category: 'Picture',
			name: 'Flip',
			options: {},
			style: {
				text: 'Flip\\n$(birddog-ptz:flip)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'picFlip',
							options: {
								val: 'Toggle',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'picFlip',
					options: { val: MODEL_ACTIONS.picFlip.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		}
	}

	if (MODEL_ACTIONS?.gamma) {
		presets.gammaUp = {
			type: 'button',
			category: 'Picture',
			name: 'Gamma Up',
			options: {},
			style: {
				text: '🔺\\nGamma',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'gamma',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.gammaDown = {
			type: 'button',
			category: 'Picture',
			name: 'Gamma Down',
			options: {},
			style: {
				text: '$(birddog-ptz:gamma)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'gamma',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.highlight_comp) {
		presets.highlight_comp = {
			type: 'button',
			category: 'Picture',
			name: 'Highlight Compensation',
			options: {},
			style: {
				text: 'Highlight Comp.\\n$(birddog-ptz:highlight_comp)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'highlight_comp',
							options: {
								val: MODEL_ACTIONS.highlight_comp.default,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'highlight_comp',
					options: { val: MODEL_ACTIONS.highlight_comp.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		}
	}

	if (MODEL_ACTIONS?.highlight_comp_mask) {
		presets.highlight_comp_maskUp = {
			type: 'button',
			category: 'Picture',
			name: 'Highlight Comp. Mask Up',
			options: {},
			style: {
				text: '🔺\\nHigh Comp\\n Mask',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'highlight_comp_mask',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.highlight_comp_maskDown = {
			type: 'button',
			category: 'Picture',
			name: 'Highlight Comp. Mask Down',
			options: {},
			style: {
				text: '$(birddog-ptz:highlight_comp_mask)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'highlight_comp_mask',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.hue) {
		presets.hueUp = {
			type: 'button',
			category: 'Picture',
			name: 'Hue Up',
			options: {},
			style: {
				text: '🔺\\nHue',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'hue',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.hueDown = {
			type: 'button',
			category: 'Picture',
			name: 'Hue Down',
			options: {},
			style: {
				text: '$(birddog-ptz:hue)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'hue',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.ir_cutfilter) {
		presets.ir_cutfilter = {
			type: 'button',
			category: 'Picture',
			name: 'IR Cutfilter',
			options: {},
			style: {
				text: 'IR Cut Filter\\n$(birddog-ptz:ir_cutfilter)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'ir_cutfilter',
							options: {
								val: MODEL_ACTIONS.ir_cutfilter.default,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'ir_cutfilter',
					options: { val: MODEL_ACTIONS.ir_cutfilter.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		}
	}

	if (MODEL_ACTIONS?.low_latency) {
		presets.low_latency = {
			type: 'button',
			category: 'Picture',
			name: 'Low Latency',
			options: {},
			style: {
				text: 'Low Latency\\n$(birddog-ptz:low_latency)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'low_latency',
							options: {
								val: 'Toggle',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'low_latency',
					options: { val: MODEL_ACTIONS.low_latency.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		}
	}

	if (MODEL_ACTIONS?.picMirror) {
		presets.picMirror = {
			type: 'button',
			category: 'Picture',
			name: 'Mirror',
			options: {},
			style: {
				text: 'Mirror\\n$(birddog-ptz:mirror)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'picMirror',
							options: {
								val: 'Toggle',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'picMirror',
					options: { val: MODEL_ACTIONS.picMirror.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		}
	}

	if (MODEL_ACTIONS?.nd_filter) {
		presets.nd_filterUp = {
			type: 'button',
			category: 'Picture',
			name: 'ND Filter Up',
			options: {},
			style: {
				text: '🔺\\nND Filter',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'nd_filter',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.nd_filterDown = {
			type: 'button',
			category: 'Picture',
			name: 'ND Filter Down',
			options: {},
			style: {
				text: '$(birddog-ptz:nd_filter)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'nd_filter',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.noise_reduction) {
		presets.noise_reductionUp = {
			type: 'button',
			category: 'Picture',
			name: 'Noise Reduction Up',
			options: {},
			style: {
				text: '🔺\\nNR',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'noise_reduction',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.noise_reductionDown = {
			type: 'button',
			category: 'Picture',
			name: 'Noise Reduction Down',
			options: {},
			style: {
				text: '$(birddog-ptz:noise_reduction)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'noise_reduction',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.sharpness) {
		presets.sharpnessUp = {
			type: 'button',
			category: 'Picture',
			name: 'Sharpness Up',
			options: {},
			style: {
				text: '🔺\\nSharpness',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'sharpness',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.sharpnessDown = {
			type: 'button',
			category: 'Picture',
			name: 'Sharpness Down',
			options: {},
			style: {
				text: '$(birddog-ptz:sharpness)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'sharpness',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.stabilizer) {
		presets.stabilizer = {
			type: 'button',
			category: 'Picture',
			name: 'Stabilizer',
			options: {},
			style: {
				text: 'Mirror\\n$(birddog-ptz:stabilizer)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'stabilizer',
							options: {
								val: 'Toggle',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'stabilizer',
					options: { val: MODEL_ACTIONS.stabilizer.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		}
	}

	if (MODEL_ACTIONS?.threed_nr) {
		presets.threed_nrUp = {
			type: 'button',
			category: 'Picture',
			name: '3D Noise Reduction Up',
			options: {},
			style: {
				text: '🔺\\n3D NR',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'threed_nr',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.threed_nrDown = {
			type: 'button',
			category: 'Picture',
			name: '3D Noise Reduction Down',
			options: {},
			style: {
				text: '$(birddog-ptz:threed_nr)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'threed_nr',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.twod_nr) {
		presets.twod_nrUp = {
			type: 'button',
			category: 'Picture',
			name: '2D Noise Reduction Up',
			options: {},
			style: {
				text: '🔺\\n2D NR',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'twod_nr',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.twod_nrDown = {
			type: 'button',
			category: 'Picture',
			name: '2D Noise Reduction Down',
			options: {},
			style: {
				text: '$(birddog-ptz:twod_nr)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'twod_nr',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.wide_dynamic_range) {
		presets.wide_dynamic_rangeUp = {
			type: 'button',
			category: 'Picture',
			name: 'Wide Dynamics Range Up',
			options: {},
			style: {
				text: '🔺\\nWDR',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'wide_dynamic_range',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.wide_dynamic_rangeDown = {
			type: 'button',
			category: 'Picture',
			name: 'Wide Dynamics Range Down',
			options: {},
			style: {
				text: '$(birddog-ptz:wide_dynamic_range)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'wide_dynamic_range',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.wdr_enable) {
		presets.wdr_enable = {
			type: 'button',
			category: 'Picture',
			name: 'Wide Dynamic Range',
			options: {},
			style: {
				text: 'Wide Dynamic Range\\n$(birddog-ptz:wdr_enable)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'wdr_enable',
							options: {
								val: 'Toggle',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'wdr_enable',
					options: { val: MODEL_ACTIONS.wdr_enable.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		}
	}

	// Color Matrix Presets

	if (MODEL_ACTIONS?.cm_blue_gain) {
		presets.cm_blue_gainUp = {
			type: 'button',
			category: 'Color Matrix',
			name: 'Blue Gain Up',
			options: {},
			style: {
				text: '🔺\\nBlue Gain',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'cm_blue_gain',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.cm_blue_gainDown = {
			type: 'button',
			category: 'Color Matrix',
			name: 'Blue Gain Down',
			options: {},
			style: {
				text: '$(birddog-ptz:cm_blue_gain)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'cm_blue_gain',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.cm_blue_hue) {
		presets.cm_blue_hueUp = {
			type: 'button',
			category: 'Color Matrix',
			name: 'Blue Hue Up',
			options: {},
			style: {
				text: '🔺\\nBlue Hue',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'cm_blue_hue',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.cm_blue_hueDown = {
			type: 'button',
			category: 'Color Matrix',
			name: 'Blue Hue Down',
			options: {},
			style: {
				text: '$(birddog-ptz:cm_blue_hue)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'cm_blue_hue',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.cm_color_gain) {
		presets.cm_color_gainUp = {
			type: 'button',
			category: 'Color Matrix',
			name: 'Color Gain Up',
			options: {},
			style: {
				text: '🔺\\nColor Gain',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'cm_color_gain',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.cm_color_gainDown = {
			type: 'button',
			category: 'Color Matrix',
			name: 'Color Gain Down',
			options: {},
			style: {
				text: '$(birddog-ptz:cm_color_gain)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'cm_color_gain',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.cm_cyan_gain) {
		presets.cm_cyan_gainUp = {
			type: 'button',
			category: 'Color Matrix',
			name: 'Cyan Gain Up',
			options: {},
			style: {
				text: '🔺\\nCyan Gain',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'cm_cyan_gain',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.cm_cyan_gainDown = {
			type: 'button',
			category: 'Color Matrix',
			name: 'Cyan Gain Down',
			options: {},
			style: {
				text: '$(birddog-ptz:cm_cyan_gain)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'cm_cyan_gain',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.cm_cyan_hue) {
		presets.cm_cyan_hueUp = {
			type: 'button',
			category: 'Color Matrix',
			name: 'Cyan Hue Up',
			options: {},
			style: {
				text: '🔺\\nCyan Hue',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'cm_cyan_hue',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.cm_cyan_hueDown = {
			type: 'button',
			category: 'Color Matrix',
			name: 'Cyan Hue Down',
			options: {},
			style: {
				text: '$(birddog-ptz:cm_cyan_hue)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'cm_cyan_hue',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.cm_green_gain) {
		presets.cm_green_gainUp = {
			type: 'button',
			category: 'Color Matrix',
			name: 'Green Gain Up',
			options: {},
			style: {
				text: '🔺\\nGreen Gain',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'cm_green_gain',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.cm_green_gainDown = {
			type: 'button',
			category: 'Color Matrix',
			name: 'Green Gain Down',
			options: {},
			style: {
				text: '$(birddog-ptz:cm_green_gain)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'cm_green_gain',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.cm_green_hue) {
		presets.cm_green_hueUp = {
			type: 'button',
			category: 'Color Matrix',
			name: 'Green Hue Up',
			options: {},
			style: {
				text: '🔺\\nGreen Hue',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'cm_green_hue',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.cm_green_hueDown = {
			type: 'button',
			category: 'Color Matrix',
			name: 'Green Hue Down',
			options: {},
			style: {
				text: '$(birddog-ptz:cm_green_hue)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'cm_green_hue',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.cm_hue_phase) {
		presets.cm_hue_phaseUp = {
			type: 'button',
			category: 'Color Matrix',
			name: 'Hue Phase Up',
			options: {},
			style: {
				text: '🔺\\nHue Phase',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'cm_hue_phase',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.cm_hue_phaseDown = {
			type: 'button',
			category: 'Color Matrix',
			name: 'Hue Phase Down',
			options: {},
			style: {
				text: '$(birddog-ptz:cm_hue_phase)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'cm_hue_phase',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.cm_mag_gain) {
		presets.cm_mag_gainUp = {
			type: 'button',
			category: 'Color Matrix',
			name: 'Magenta Gain Up',
			options: {},
			style: {
				text: '🔺\\nMagenta Gain',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'cm_mag_gain',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.cm_mag_gainDown = {
			type: 'button',
			category: 'Color Matrix',
			name: 'Magenta Gain Down',
			options: {},
			style: {
				text: '$(birddog-ptz:cm_mag_gain)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'cm_mag_gain',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.cm_mag_hue) {
		presets.cm_mag_hueUp = {
			type: 'button',
			category: 'Color Matrix',
			name: 'Magenta Hue Up',
			options: {},
			style: {
				text: '🔺\\nMagenta Hue',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'cm_mag_hue',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.cm_mag_hueDown = {
			type: 'button',
			category: 'Color Matrix',
			name: 'Magenta Hue Down',
			options: {},
			style: {
				text: '$(birddog-ptz:cm_mag_hue)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'cm_mag_hue',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.cm_red_gain) {
		presets.cm_red_gainUp = {
			type: 'button',
			category: 'Color Matrix',
			name: 'Red Gain Up',
			options: {},
			style: {
				text: '🔺\\nRed Gain',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'cm_red_gain',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.cm_red_gainDown = {
			type: 'button',
			category: 'Color Matrix',
			name: 'Red Gain Down',
			options: {},
			style: {
				text: '$(birddog-ptz:cm_red_gain)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'cm_red_gain',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.cm_red_hue) {
		presets.cm_red_hueUp = {
			type: 'button',
			category: 'Color Matrix',
			name: 'Red Hue Up',
			options: {},
			style: {
				text: '🔺\\nRed Hue',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'cm_red_hue',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.cm_red_hueDown = {
			type: 'button',
			category: 'Color Matrix',
			name: 'Red Hue Down',
			options: {},
			style: {
				text: '$(birddog-ptz:cm_red_hue)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'cm_red_hue',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.cm_yellow_gain) {
		presets.cm_yellow_gainUp = {
			type: 'button',
			category: 'Color Matrix',
			name: 'Yellow Gain Up',
			options: {},
			style: {
				text: '🔺\\nYellow Gain',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'cm_yellow_gain',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.cm_yellow_gainDown = {
			type: 'button',
			category: 'Color Matrix',
			name: 'Yellow Gain Down',
			options: {},
			style: {
				text: '$(birddog-ptz:cm_yellow_gain)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'cm_yellow_gain',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.cm_yellow_hue) {
		presets.cm_yellow_hueUp = {
			type: 'button',
			category: 'Color Matrix',
			name: 'Yellow Hue Up',
			options: {},
			style: {
				text: '🔺\\nYellow Hue',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'cm_yellow_hue',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.cm_yellow_hueDown = {
			type: 'button',
			category: 'Color Matrix',
			name: 'Yellow Hue Down',
			options: {},
			style: {
				text: '$(birddog-ptz:cm_yellow_hue)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'cm_yellow_hue',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	// Advanced Setup Presets

	if (MODEL_ACTIONS?.brightness) {
		presets.brightnessUp = {
			type: 'button',
			category: 'Advanced Setup',
			name: 'Brightness Up',
			options: {},
			style: {
				text: '🔺\\nBrightness',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'brightness',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.brightnessDown = {
			type: 'button',
			category: 'Advanced Setup',
			name: 'Brightness Down',
			options: {},
			style: {
				text: '$(birddog-ptz:brightness)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'brightness',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.brightness_comp) {
		presets.brightness_comp = {
			type: 'button',
			category: 'Advanced Setup',
			name: 'Brightness Compensation',
			options: {},
			style: {
				text: 'Brightness\\nCompensation\\n$(birddog-ptz:brightness_comp)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'brightness_comp',
							options: {
								val: MODEL_ACTIONS.brightness_comp.default,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'brightness_comp',
					options: { val: MODEL_ACTIONS.brightness_comp.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		}
	}

	if (MODEL_ACTIONS?.comp_level) {
		presets.comp_level = {
			type: 'button',
			category: 'Advanced Setup',
			name: 'Compensation Level',
			options: {},
			style: {
				text: 'Compensation\\nLevel\\n$(birddog-ptz:comp_level)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'comp_level',
							options: {
								val: MODEL_ACTIONS.comp_level.default,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'comp_level',
					options: { val: MODEL_ACTIONS.comp_level.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		}
	}

	if (MODEL_ACTIONS?.gamma_offset) {
		presets.gamma_offsetUp = {
			type: 'button',
			category: 'Advanced Setup',
			name: 'Gamma Offset Up',
			options: {},
			style: {
				text: '🔺\\nGamma\\nOffset',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'gamma_offset',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.gamma_offsetDown = {
			type: 'button',
			category: 'Advanced Setup',
			name: 'Gamma Offset Down',
			options: {},
			style: {
				text: '$(birddog-ptz:gamma_offset)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'gamma_offset',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.high_resolution) {
		presets.high_resolution = {
			type: 'button',
			category: 'Advanced Setup',
			name: 'High Resolution',
			options: {},
			style: {
				text: 'High\\nResolution\\n$(birddog-ptz:high_resolution)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'high_resolution',
							options: {
								val: 'Toggle',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'high_resolution',
					options: { val: MODEL_ACTIONS.high_resolution.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		}
	}

	if (MODEL_ACTIONS?.video_enhancement) {
		presets.video_enhancement = {
			type: 'button',
			category: 'Advanced Setup',
			name: 'Video Enhancement',
			options: {},
			style: {
				text: 'Video\\nEnhancement\\n$(birddog-ptz:video_enhancement)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'video_enhancement',
							options: {
								val: 'Toggle',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'video_enhancement',
					options: { val: MODEL_ACTIONS.video_enhancement.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		}
	}

	// External Setup Presets

	if (MODEL_ACTIONS?.aux) {
		presets.aux = {
			type: 'button',
			category: 'External Setup',
			name: 'Aux',
			options: {},
			style: {
				text: 'Aux\\n$(birddog-ptz:aux)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'aux',
							options: {
								val: 'Toggle',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'aux',
					options: { val: MODEL_ACTIONS.aux.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		}
	}

	if (MODEL_ACTIONS?.rain_wiper) {
		presets.rain_wiper = {
			type: 'button',
			category: 'External Setup',
			name: 'Rain Wiper',
			options: {},
			style: {
				text: 'Rain Wiper\\n$(birddog-ptz:rain_wiper)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'rain_wiper',
							options: {
								val: 'Toggle',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'rain_wiper',
					options: { val: MODEL_ACTIONS.rain_wiper.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		}
	}

	if (MODEL_ACTIONS?.v12vout) {
		presets.v12vout = {
			type: 'button',
			category: 'External Setup',
			name: '12v Out',
			options: {},
			style: {
				text: '12v Out\\n$(birddog-ptz:v12vout)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'v12vout',
							options: {
								val: 'Toggle',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'v12vout',
					options: { val: MODEL_ACTIONS.v12vout.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		}
	}

	// Detail Setup Presets

	if (MODEL_ACTIONS?.bandwidth) {
		presets.bandwidth = {
			type: 'button',
			category: 'Detail Setup',
			name: 'Bandwidth',
			options: {},
			style: {
				text: 'Bandwidth\\n$(birddog-ptz:bandwidth)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'bandwidth',
							options: {
								val: MODEL_ACTIONS.bandwidth.default,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'bandwidth',
					options: { val: MODEL_ACTIONS.bandwidth.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		}
	}

	if (MODEL_ACTIONS?.bw_balance) {
		presets.bw_balance = {
			type: 'button',
			category: 'Detail Setup',
			name: 'BW Balance',
			options: {},
			style: {
				text: 'BW Balance\\n$(birddog-ptz:bw_balance)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'bw_balance',
							options: {
								val: MODEL_ACTIONS.bw_balance.default,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'bw_balance',
					options: { val: MODEL_ACTIONS.bw_balance.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		}
	}

	if (MODEL_ACTIONS?.crispening) {
		presets.crispeningUp = {
			type: 'button',
			category: 'Detail Setup',
			name: 'Crispening Up',
			options: {},
			style: {
				text: '🔺\\nCrispening',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'crispening',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.crispeningDown = {
			type: 'button',
			category: 'Advanced Setup',
			name: 'Crispening Down',
			options: {},
			style: {
				text: '$(birddog-ptz:crispening)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'crispening',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.detail) {
		presets.detail = {
			type: 'button',
			category: 'Detail Setup',
			name: 'Detail',
			options: {},
			style: {
				text: 'Detail\\n$(birddog-ptz:detail)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'detail',
							options: {
								val: 'Toggle',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'detail',
					options: { val: MODEL_ACTIONS.detail.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		}
	}

	if (MODEL_ACTIONS?.highlight_detail) {
		presets.highlight_detailUp = {
			type: 'button',
			category: 'Detail Setup',
			name: 'Highlight Detail Up',
			options: {},
			style: {
				text: '🔺\\nHighlight\\nDetail',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'highlight_detail',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.highlight_detailDown = {
			type: 'button',
			category: 'Advanced Setup',
			name: 'Highlight Detail Down',
			options: {},
			style: {
				text: '$(birddog-ptz:highlight_detail)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'highlight_detail',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.hv_balance) {
		presets.hv_balanceUp = {
			type: 'button',
			category: 'Detail Setup',
			name: 'Hv Balance Up',
			options: {},
			style: {
				text: '🔺\\nHv Balance',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'hv_balance',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.hv_balanceDown = {
			type: 'button',
			category: 'Advanced Setup',
			name: 'Hv Balance Down',
			options: {},
			style: {
				text: '$(birddog-ptz:hv_balance)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'hv_balance',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.limit) {
		presets.limitUp = {
			type: 'button',
			category: 'Detail Setup',
			name: 'Limit Up',
			options: {},
			style: {
				text: '🔺\\nLimit',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'limit',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.limitDown = {
			type: 'button',
			category: 'Advanced Setup',
			name: 'Limit Down',
			options: {},
			style: {
				text: '$(birddog-ptz:limit)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'limit',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.super_low) {
		presets.super_lowUp = {
			type: 'button',
			category: 'Detail Setup',
			name: 'Super Low Up',
			options: {},
			style: {
				text: '🔺\\nSuper Low',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'super_low',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.super_lowDown = {
			type: 'button',
			category: 'Advanced Setup',
			name: 'Super Low Down',
			options: {},
			style: {
				text: '$(birddog-ptz:super_low)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'super_low',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	// Gamma Setup Presets

	if (MODEL_ACTIONS?.black_gamma_level) {
		presets.black_gamma_levelUp = {
			type: 'button',
			category: 'Gamma Setup',
			name: 'Black Gamma Level Up',
			options: {},
			style: {
				text: '🔺\\nBlack Gamma\\nLevel',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'black_gamma_level',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.black_gamma_levelDown = {
			type: 'button',
			category: 'Gamma Setup',
			name: 'Black Gamma Level Down',
			options: {},
			style: {
				text: '$(birddog-ptz:black_gamma_level)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'black_gamma_level',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.black_level) {
		presets.black_levelUp = {
			type: 'button',
			category: 'Gamma Setup',
			name: 'Black Level Up',
			options: {},
			style: {
				text: '🔺\\nBlack\\nLevel',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'black_level',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.black_levelDown = {
			type: 'button',
			category: 'Gamma Setup',
			name: 'Black Level Down',
			options: {},
			style: {
				text: '$(birddog-ptz:black_level)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'black_level',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.black_level_range) {
		presets.black_level_range = {
			type: 'button',
			category: 'Gamma Setup',
			name: 'Black Level Range',
			options: {},
			style: {
				text: 'Black Level\\nRange\\n$(birddog-ptz:black_level_range)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'black_level_range',
							options: {
								val: MODEL_ACTIONS.black_level_range.default,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'black_level_range',
					options: { val: MODEL_ACTIONS.black_level_range.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		}
	}

	if (MODEL_ACTIONS?.effect) {
		presets.effectUp = {
			type: 'button',
			category: 'Gamma Setup',
			name: 'Effect Up',
			options: {},
			style: {
				text: '🔺\\nEffect',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'effect',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.effectDown = {
			type: 'button',
			category: 'Gamma Setup',
			name: 'Effect Down',
			options: {},
			style: {
				text: '$(birddog-ptz:effect)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'effect',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.gamma_setup_offset) {
		presets.gamma_setup_offsetUp = {
			type: 'button',
			category: 'Gamma Setup',
			name: 'Offset Up',
			options: {},
			style: {
				text: '🔺\\nOffset',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'gamma_setup_offset',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.gamma_setup_offsetDown = {
			type: 'button',
			category: 'Gamma Setup',
			name: 'Offset Down',
			options: {},
			style: {
				text: '$(birddog-ptz:gamma_setup_offset)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'gamma_setup_offset',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.pattern) {
		presets.patternUp = {
			type: 'button',
			category: 'Gamma Setup',
			name: 'Pattern Up',
			options: {},
			style: {
				text: '🔺\\nPattern',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'pattern',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.patternDown = {
			type: 'button',
			category: 'Gamma Setup',
			name: 'Pattern Down',
			options: {},
			style: {
				text: '$(birddog-ptz:pattern)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'pattern',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.pattern_fine) {
		presets.pattern_fineUp = {
			type: 'button',
			category: 'Gamma Setup',
			name: 'Pattern Fine Up',
			options: {},
			style: {
				text: '🔺\\nPattern\\nFine',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'pattern_fine',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.pattern_fineDown = {
			type: 'button',
			category: 'Gamma Setup',
			name: 'Pattern Fine Down',
			options: {},
			style: {
				text: '$(birddog-ptz:pattern_fine)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'pattern_fine',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.settings) {
		presets.settings = {
			type: 'button',
			category: 'Gamma Setup',
			name: 'Settings',
			options: {},
			style: {
				text: 'Settings\\n$(birddog-ptz:settings)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'settings',
							options: {
								val: MODEL_ACTIONS.settings.default,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'settings',
					options: { value: MODEL_ACTIONS.settings.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		}
	}

	if (MODEL_ACTIONS?.visibility_enhancer) {
		presets.visibility_enhancer = {
			type: 'button',
			category: 'Gamma Setup',
			name: 'Visibility Enhancer',
			options: {},
			style: {
				text: 'Visibility\\nEnhancer\\n$(birddog-ptz:visibility_enhancer)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'visibility_enhancer',
							options: {
								val: 'Toggle',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'visibility_enhancer',
					options: { value: MODEL_ACTIONS.visibility_enhancer.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		}
	}

	// BirdDog Scope Presets

	if (MODEL_ACTIONS?.scope_gamma_gain) {
		presets.scope_gamma_gainUp = {
			type: 'button',
			category: 'Scopes',
			name: 'Gamma Gain Up',
			options: {},
			style: {
				text: '🔺\\nGamma\\nGain',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'scope_gamma_gain',
							options: {
								val: 'up',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets.scope_gamma_gainDown = {
			type: 'button',
			category: 'Scopes',
			name: 'Gamma Gain Down',
			options: {},
			style: {
				text: '$(birddog-ptz:scope_gamma_gain)\\n🔻',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'scope_gamma_gain',
							options: {
								val: 'down',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	if (MODEL_ACTIONS?.scope_mode) {
		presets.scope_mode = {
			type: 'button',
			category: 'Scopes',
			name: 'Mode',
			options: {},
			style: {
				text: 'Mode\\n$(birddog-ptz:scope_mode)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'scope_mode',
							options: {
								val: MODEL_ACTIONS.scope_mode.default,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'scope_mode',
					options: { value: MODEL_ACTIONS.scope_mode.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		}
	}

	if (MODEL_ACTIONS?.scope_position) {
		presets.scope_position = {
			type: 'button',
			category: 'Scopes',
			name: 'Position',
			options: {},
			style: {
				text: 'Position\\n$(birddog-ptz:scope_position)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'scope_position',
							options: {
								val: MODEL_ACTIONS.scope_position.default,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'scope_position',
					options: { val: MODEL_ACTIONS.scope_position.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		}
	}

	if (MODEL_ACTIONS?.scope_preview) {
		presets.scope_preview = {
			type: 'button',
			category: 'Scopes',
			name: 'Preview Enable',
			options: {},
			style: {
				text: 'Preview\\nEnable\\n$(birddog-ptz:scope_preview)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'scope_preview',
							options: {
								val: 'Toggle',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'scope_preview',
					options: { value: 'On' },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		}
	}

	if (MODEL_ACTIONS?.scope_program) {
		presets.scope_program = {
			type: 'button',
			category: 'Scopes',
			name: 'Program Enable',
			options: {},
			style: {
				text: 'Program\\nEnable\\n$(birddog-ptz:scope_program)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'scope_program',
							options: {
								val: 'Toggle',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'scope_program',
					options: { value: 'On' },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		}
	}

	if (MODEL_ACTIONS?.scope_size) {
		presets.scope_size = {
			type: 'button',
			category: 'Scopes',
			name: 'Size',
			options: {},
			style: {
				text: 'Size\\n$(birddog-ptz:scope_size)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'scope_size',
							options: {
								val: 'Toggle',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'scope_size',
					options: { value: MODEL_ACTIONS.scope_size.default },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		}
	}

	if (MODEL_ACTIONS?.scope_transparency) {
		presets.scope_transparency = {
			type: 'button',
			category: 'Scopes',
			name: 'Transparency Enable',
			options: {},
			style: {
				text: 'Transparency\\nEnable\\n$(birddog-ptz:scope_transparency)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'scope_transparency',
							options: {
								val: 'Toggle',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'scope_transparency',
					options: { value: 'On' },
					style: {
						color: ColorBlack,
						bgcolor: ColorGreen,
					},
				},
			],
		}
	}

	// Websocket Variables Preset

	if (this.camera.firmware.major == '5') {
		presets.averageBitrate = {
			type: 'button',
			category: 'Dashboard',
			name: 'Average Bitrate',
			options: {},
			style: {
				text: 'Average\\nBitrate\\n$(birddog-ptz:avbr)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{ down: [], up: [] }],
			feedbacks: [],
		}
		presets.audioChannels = {
			type: 'button',
			category: 'Dashboard',
			name: 'Audio Channels',
			options: {},
			style: {
				text: 'Audio Ch\\n$(birddog-ptz:aud_ch)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{ down: [], up: [] }],
			feedbacks: [],
		}
		presets.audioSampleRate = {
			type: 'button',
			category: 'Dashboard',
			name: 'Audio Sample Rate',
			options: {},
			style: {
				text: 'Audio\\nSample Rate\\n$(birddog-ptz:aud_sr)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{ down: [], up: [] }],
			feedbacks: [],
		}
		presets.audioStatus = {
			type: 'button',
			category: 'Dashboard',
			name: 'Audio Status',
			options: {},
			style: {
				text: 'Audio\\nStatus\\n$(birddog-ptz:aud_stat)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{ down: [], up: [] }],
			feedbacks: [],
		}
		presets.dashboardStatus = {
			type: 'button',
			category: 'Dashboard',
			name: 'Status',
			options: {},
			style: {
				text: 'Status\\n$(birddog-ptz:dashboard_vid_status)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{ down: [], up: [] }],
			feedbacks: [],
		}
		presets.deviceMode = {
			type: 'button',
			category: 'Dashboard',
			name: 'Device Mode',
			options: {},
			style: {
				text: 'Device Mode\\n$(birddog-ptz:dev_mode)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{ down: [], up: [] }],
			feedbacks: [],
		}
		presets.genlockStatus = {
			type: 'button',
			category: 'Dashboard',
			name: 'Genlock Status',
			options: {},
			style: {
				text: 'Genlock Status\\n$(birddog-ptz:gen_status)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{ down: [], up: [] }],
			feedbacks: [],
		}
		presets.mcuVersion = {
			type: 'button',
			category: 'Dashboard',
			name: 'MCU Version',
			options: {},
			style: {
				text: 'MCU Version\\n$(birddog-ptz:mcu_ver)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{ down: [], up: [] }],
			feedbacks: [],
		}
		presets.networkBandwidth = {
			type: 'button',
			category: 'Dashboard',
			name: 'Network Bandwidth',
			options: {},
			style: {
				text: 'Network\\nBandwidth\\n$(birddog-ptz:net_band_perc)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{ down: [], up: [] }],
			feedbacks: [],
		}
		presets.networkMode = {
			type: 'button',
			category: 'Dashboard',
			name: 'Network Mode',
			options: {},
			style: {
				text: 'Network\\nMode\\n$(birddog-ptz:net_mode)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{ down: [], up: [] }],
			feedbacks: [],
		}
		presets.networkSpeed = {
			type: 'button',
			category: 'Dashboard',
			name: 'Network Speed',
			options: {},
			style: {
				text: 'Network\\nSpeed\\n$(birddog-ptz:net_speed)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{ down: [], up: [] }],
			feedbacks: [],
		}
		presets.sourceStatus = {
			type: 'button',
			category: 'Dashboard',
			name: 'Source Status',
			options: {},
			style: {
				text: 'Source\\nStatus\\n$(birddog-ptz:src_stat)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{ down: [], up: [] }],
			feedbacks: [],
		}
		presets.cpuUsage = {
			type: 'button',
			category: 'Dashboard',
			name: 'CPU Usage',
			options: {},
			style: {
				text: 'CPU Usage\\n$(birddog-ptz:sys_info_perc)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{ down: [], up: [] }],
			feedbacks: [],
		}
		presets.videoFormat = {
			type: 'button',
			category: 'Dashboard',
			name: 'Video Format',
			options: {},
			style: {
				text: 'Video\\nFormat\\n$(birddog-ptz:vid_fmt)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{ down: [], up: [] }],
			feedbacks: [],
		}
		presets.videoFrameRate = {
			type: 'button',
			category: 'Dashboard',
			name: 'Video Frame Rate',
			options: {},
			style: {
				text: 'Video\\nFrame Rate\\n$(birddog-ptz:vid_fr)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{ down: [], up: [] }],
			feedbacks: [],
		}
		presets.videoResolution = {
			type: 'button',
			category: 'Dashboard',
			name: 'Video Resolution',
			options: {},
			style: {
				text: 'Video\\nResolution\\n$(birddog-ptz:vid_res)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{ down: [], up: [] }],
			feedbacks: [],
		}
		presets.videoSampleRate = {
			type: 'button',
			category: 'Dashboard',
			name: 'Video Sample rate',
			options: {},
			style: {
				text: 'Video\\nSample Rate\\n$(birddog-ptz:vid_sra)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{ down: [], up: [] }],
			feedbacks: [],
		}
		presets.videoStreamName = {
			type: 'button',
			category: 'Dashboard',
			name: 'Video Stream Name',
			options: {},
			style: {
				text: 'Video\\nStream Name\\n$(birddog-ptz:vid_str_name)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{ down: [], up: [] }],
			feedbacks: [],
		}
		presets.irisShutterColorTempGain = {
			type: 'button',
			category: 'Dashboard',
			name: 'IRIS/Shutter/ColorTemp/Gain',
			options: {},
			style: {
				text: '$(birddog-ptz:iris) $(birddog-ptz:shutter_speed)\\n$(birddog-ptz:color_temp)K\\n$(birddog-ptz:gain)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{ down: [], up: [] }],
			feedbacks: [],
		}
		presets.cpuBitrate = {
			type: 'button',
			category: 'Dashboard',
			name: 'CPU / BR',
			options: {},
			style: {
				text: 'CPU | BR\\n$(birddog-ptz:sys_info_perc)\\n$(birddog-ptz:avbr)',
				size: 'auto',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [{ down: [], up: [] }],
			feedbacks: [],
		}
	}

	return presets
}
