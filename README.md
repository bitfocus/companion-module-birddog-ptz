# companion-module-birddog-ptz

This module allows you to control any [BirdDog](https://birddog.tv/ptz-range/) PTZ camera running LTS firmware.

## Getting Started

See [HELP.md](https://github.com/bitfocus/companion-module-birddog-ptz/blob/main/HELP.md)

## Changes

### v2.0.3

- New Actions

  - Ae Response
  - Exposure Compensation
  - Exposure Compensation Level
  - Gain Limit
  - NDI Audio
  - NDI Group Enable
  - Transmit Method

- New Feedbacks
  - Ae Response
  - Exposure Compensation
  - Exposure Compensation Level
  - Gain
  - Gain Limit
  - NDI Audio
  - NDI Group Enable
  - Transmit Method

### v2.0.2

- Make API calls depending on model
- Added Speed override on PTZ movement actions
- Added ability to Pan/Tilt drive to a location
- Added ability Zoom direct
- Show values depending on model

  - Gain
  - Iris
  - Shutter

- New Actions
  - Analog Audio In Gain
  - Analog Audio Out Gain
  - Analog Audio Output
  - Color Temperature
  - Contrast
  - Encode Bandwidth
  - Freeze
  - Pan/Tilt Direct
  - Pan/Tilt Speed Override
  - Tally Mode
  - Zoom Direct
- New Variables
  - Analog Audio In Gain
  - Analog Audio In Gain
  - Analog Audio Output
  - Bandwidth Mode
  - Bandwidth Select
  - Brightness
  - Brightness Comp
  - Color Matrix
  - Color Temperature
  - Comp Level
  - Gamma Offset
  - High Resolution
  - Hostname
  - IP Address
  - Netmask
  - Network Config
  - Pan Position
  - Serial Number
  - Tilt Position
  - Transmit Netmask
  - Transmit Netprefix
  - Video Enhancement
  - Zoom Position
- New Feedbacks
  - Analog Audio Output Select
  - Color Temperature
  - Encode Bandwidth Mode
  - Exposure Mode
  - Focus Mode
  - Freeze Status
  - Tally Mode

### v2.0.1

- Rename module to companion-module-birddog-ptz to better reflect module
- Display only applicable variables based on BirdDog camera model

### v2.0.0

- Refactor for Birddog API v2.0
- New Variables
- New Feedbacks

### v1.0.0

- Legacy VISCA module
