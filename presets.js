exports.getPresets = function () {
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

	presets.push({
		category: 'Pan/Tilt',
		label: 'UP',
		bank: {
			style: 'png',
			text: '',
			png64: image_up,
			pngalignment: 'center:center',
			size: '18',
			color: '16777215',
			bgcolor: this.rgb(0, 0, 0),
		},
		actions: [
			{
				action: 'pt',
				options: {
					val: '2',
				},
			},
		],
		release_actions: [
			{
				action: 'pt',
				options: {
					val: '8',
				},
			},
		],
	})
	presets.push({
		category: 'Pan/Tilt',
		label: 'DOWN',
		bank: {
			style: 'png',
			text: '',
			png64: image_down,
			pngalignment: 'center:center',
			size: '18',
			color: '16777215',
			bgcolor: this.rgb(0, 0, 0),
		},
		actions: [
			{
				action: 'pt',
				options: {
					val: '3',
				},
			},
		],
		release_actions: [
			{
				action: 'pt',
				options: {
					val: '8',
				},
			},
		],
	})
	presets.push({
		category: 'Pan/Tilt',
		label: 'LEFT',
		bank: {
			style: 'png',
			text: '',
			png64: image_left,
			pngalignment: 'center:center',
			size: '18',
			color: '16777215',
			bgcolor: this.rgb(0, 0, 0),
		},
		actions: [
			{
				action: 'pt',
				options: {
					val: '0',
				},
			},
		],
		release_actions: [
			{
				action: 'pt',
				options: {
					val: '8',
				},
			},
		],
	})
	presets.push({
		category: 'Pan/Tilt',
		label: 'RIGHT',
		bank: {
			style: 'png',
			text: '',
			png64: image_right,
			pngalignment: 'center:center',
			size: '18',
			color: '16777215',
			bgcolor: this.rgb(0, 0, 0),
		},
		actions: [
			{
				action: 'pt',
				options: {
					val: '1',
				},
			},
		],
		release_actions: [
			{
				action: 'pt',
				options: {
					val: '8',
				},
			},
		],
	})
	presets.push({
		category: 'Pan/Tilt',
		label: 'UP RIGHT',
		bank: {
			style: 'png',
			text: '',
			png64: image_up_right,
			pngalignment: 'center:center',
			size: '18',
			color: '16777215',
			bgcolor: this.rgb(0, 0, 0),
		},
		actions: [
			{
				action: 'pt',
				options: {
					val: '5',
				},
			},
		],
		release_actions: [
			{
				action: 'pt',
				options: {
					val: '8',
				},
			},
		],
	})
	presets.push({
		category: 'Pan/Tilt',
		label: 'UP LEFT',
		bank: {
			style: 'png',
			text: '',
			png64: image_up_left,
			pngalignment: 'center:center',
			size: '18',
			color: '16777215',
			bgcolor: this.rgb(0, 0, 0),
		},
		actions: [
			{
				action: 'pt',
				options: {
					val: '4',
				},
			},
		],
		release_actions: [
			{
				action: 'pt',
				options: {
					val: '8',
				},
			},
		],
	})
	presets.push({
		category: 'Pan/Tilt',
		label: 'DOWN LEFT',
		bank: {
			style: 'png',
			text: '',
			png64: image_down_left,
			pngalignment: 'center:center',
			size: '18',
			color: '16777215',
			bgcolor: this.rgb(0, 0, 0),
		},
		actions: [
			{
				action: 'pt',
				options: {
					val: '6',
				},
			},
		],
		release_actions: [
			{
				action: 'pt',
				options: {
					val: '8',
				},
			},
		],
	})
	presets.push({
		category: 'Pan/Tilt',
		label: 'DOWN RIGHT',
		bank: {
			style: 'png',
			text: '',
			png64: image_down_right,
			pngalignment: 'center:center',
			size: '18',
			color: '16777215',
			bgcolor: this.rgb(0, 0, 0),
		},
		actions: [
			{
				action: 'pt',
				options: {
					val: '7',
				},
			},
		],
		release_actions: [
			{
				action: 'pt',
				options: {
					val: '8',
				},
			},
		],
	})
	presets.push({
		category: 'Pan/Tilt',
		label: 'Home',
		bank: {
			style: 'text',
			text: 'HOME',
			size: '18',
			color: '16777215',
			bgcolor: this.rgb(0, 0, 0),
		},
		actions: [
			{
				action: 'pt',
				options: {
					val: '9',
				},
			},
		],
	})
	presets.push({
		category: 'Pan/Tilt',
		label: 'Speed Up',
		bank: {
			style: 'text',
			text: 'SPEED\\nUP',
			size: '18',
			color: '16777215',
			bgcolor: this.rgb(0, 0, 0),
		},
		actions: [
			{
				action: 'ptSpeedU',
			},
		],
	})
	presets.push({
		category: 'Pan/Tilt',
		label: 'Speed Down',
		bank: {
			style: 'text',
			text: 'SPEED\\nDOWN',
			size: '18',
			color: '16777215',
			bgcolor: this.rgb(0, 0, 0),
		},
		actions: [
			{
				action: 'ptSpeedD',
			},
		],
	})
	presets.push({
		category: 'Lens',
		label: 'Zoom In',
		bank: {
			style: 'text',
			text: 'ZOOM\\nIN',
			size: '18',
			color: '16777215',
			bgcolor: this.rgb(0, 0, 0),
		},
		actions: [
			{
				action: 'zoom',
				options: {
					val: '0',
				},
			},
		],
		release_actions: [
			{
				action: 'zoom',
				options: {
					val: '2',
				},
			},
		],
	})
	presets.push({
		category: 'Lens',
		label: 'Zoom Out',
		bank: {
			style: 'text',
			text: 'ZOOM\\nOUT',
			size: '18',
			color: '16777215',
			bgcolor: this.rgb(0, 0, 0),
		},
		actions: [
			{
				action: 'zoom',
				options: {
					val: '1',
				},
			},
		],
		release_actions: [
			{
				action: 'zoom',
				options: {
					val: '2',
				},
			},
		],
	})
	presets.push({
		category: 'Lens',
		label: 'Focus Near',
		bank: {
			style: 'text',
			text: 'FOCUS\\nNEAR',
			size: '18',
			color: '16777215',
			bgcolor: this.rgb(0, 0, 0),
		},
		actions: [
			{
				action: 'focus',
				options: {
					val: '0',
				},
			},
		],
		release_actions: [
			{
				action: 'focus',
				options: {
					val: '2',
				},
			},
		],
	})
	presets.push({
		category: 'Lens',
		label: 'Focus Far',
		bank: {
			style: 'text',
			text: 'FOCUS\\nFAR',
			size: '18',
			color: '16777215',
			bgcolor: this.rgb(0, 0, 0),
		},
		actions: [
			{
				action: 'focus',
				options: {
					val: '1',
				},
			},
		],
		release_actions: [
			{
				action: 'focus',
				options: {
					val: '2',
				},
			},
		],
	})
	presets.push({
		category: 'Lens',
		label: 'Auto Focus',
		bank: {
			style: 'text',
			text: 'AUTO\\nFOCUS',
			size: '18',
			color: '16777215',
			bgcolor: this.rgb(0, 0, 0),
			latch: true,
		},
		actions: [
			{
				action: 'focusM',
				options: {
					bol: 0,
				},
			},
		],
		release_actions: [
			{
				action: 'focusM',
				options: {
					bol: 1,
				},
			},
		],
	})
	presets.push({
		category: 'Lens',
		label: 'One Push Auto Focus',
		bank: {
			style: 'text',
			text: 'O.P.\\nAF',
			size: '18',
			color: '16777215',
			bgcolor: this.rgb(0, 0, 0),
		},
		actions: [
			{
				action: 'focus',
				options: {
					val: '3',
				},
			},
		],
	})
	presets.push({
		category: 'Exposure',
		label: 'Exposure Mode',
		bank: {
			style: 'text',
			text: 'EXP\\nMODE',
			size: '18',
			color: '16777215',
			bgcolor: this.rgb(0, 0, 0),
		},
		actions: [
			{
				action: 'expM',
				options: {
					bol: 0,
				},
			},
		],
	})
	presets.push({
		category: 'Exposure',
		label: 'Gain Up',
		bank: {
			style: 'text',
			text: 'GAIN\\nUP',
			size: '18',
			color: '16777215',
			bgcolor: this.rgb(0, 0, 0),
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
			text: 'GAIN\\nDOWN',
			size: '18',
			color: '16777215',
			bgcolor: this.rgb(0, 0, 0),
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
	presets.push({
		category: 'Exposure',
		label: 'Iris Up',
		bank: {
			style: 'text',
			text: 'IRIS\\nUP',
			size: '18',
			color: '16777215',
			bgcolor: this.rgb(0, 0, 0),
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
			text: 'IRIS\\nDOWN',
			size: '18',
			color: '16777215',
			bgcolor: this.rgb(0, 0, 0),
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
	presets.push({
		category: 'Exposure',
		label: 'Shutter Up',
		bank: {
			style: 'text',
			text: 'Shut\\nUP',
			size: '18',
			color: '16777215',
			bgcolor: this.rgb(0, 0, 0),
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
			text: 'Shut\\nDOWN',
			size: '18',
			color: '16777215',
			bgcolor: this.rgb(0, 0, 0),
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
	presets.push({
		category: 'Color',
		label: 'Red Gain Up',
		bank: {
			style: 'text',
			text: 'Red\\nUp',
			size: '18',
			color: '16777215',
			bgcolor: this.rgb(0, 0, 0),
		},
		actions: [
			{
				action: 'gainRed',
				options: {
					val: 'up',
				},
			},
		],
	})
	presets.push({
		category: 'Color',
		label: 'Red Gain Down',
		bank: {
			style: 'text',
			text: 'Red\\nDown',
			size: '18',
			color: '16777215',
			bgcolor: this.rgb(0, 0, 0),
		},
		actions: [
			{
				action: 'gainRed',
				options: {
					val: 'down',
				},
			},
		],
	})
	presets.push({
		category: 'Color',
		label: 'Blue Gain Up',
		bank: {
			style: 'text',
			text: 'Blue\\nUp',
			size: '18',
			color: '16777215',
			bgcolor: this.rgb(0, 0, 0),
		},
		actions: [
			{
				action: 'gainBlue',
				options: {
					val: 'up',
				},
			},
		],
	})
	presets.push({
		category: 'Color',
		label: 'Blue Gain Down',
		bank: {
			style: 'text',
			text: 'Blue\\nDown',
			size: '18',
			color: '16777215',
			bgcolor: this.rgb(0, 0, 0),
		},
		actions: [
			{
				action: 'gainBlue',
				options: {
					val: 'down',
				},
			},
		],
	})

	let save
	for (save = 0; save < 16; save++) {
		presets.push({
			category: 'Save Preset',
			label: 'Save Preset ' + parseInt(save + 1),
			bank: {
				style: 'text',
				text: 'SAVE\\nPRESET\\n' + parseInt(save + 1),
				size: '14',
				color: '16777215',
				bgcolor: this.rgb(0, 0, 0),
			},
			actions: [
				{
					action: 'savePset',
					options: {
						val: '0' + save.toString(16).toUpperCase(),
					},
				},
			],
		})
	}

	let recall
	for (recall = 0; recall < 16; recall++) {
		presets.push({
			category: 'Recall Preset',
			label: 'Recall Preset ' + parseInt(recall + 1),
			bank: {
				style: 'text',
				text: 'Recall\\nPRESET\\n' + parseInt(recall + 1),
				size: '14',
				color: '16777215',
				bgcolor: this.rgb(0, 0, 0),
			},
			actions: [
				{
					action: 'recallPset',
					options: {
						val: '0' + recall.toString(16).toUpperCase(),
					},
				},
			],
		})
	}
	return presets
}
