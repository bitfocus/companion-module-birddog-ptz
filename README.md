# companion-module-birddog-ptz

This module allows you to control any [BirdDog](https://birddog.tv/ptz-range/) PTZ camera running LTS firmware.

## Getting Started

See [HELP.md](https://github.com/bitfocus/companion-module-birddog-ptz/blob/main/HELP.md)

## Changes

### v3.1.2

- Fixes
  - Further work on fixing camera wake in standby mode

### v3.1.1

- Fixes
  - Camera unable to wake after going into standby mode
  - Pan/Tilt variables intermittently displaying non-valid values
  - Only update variables when changes are detected
  - Exposure feedback values dropdown not displaying properly

### v3.1.0

- Features
  - Exposure Level adjustment action
- Fixes
  - White Balance mode name change from Manual to User

### v3.0.3

- Fixes
  - Slow Shutter Limit variable not showing actual shutter speed
  - Slow Shutter Limit action dropdown values not matching actual shutter values
  - Super Fine pan/tilt speed values not working with pan/tilt speed actions
  - Debug logging cleaned up to allow for easier troubleshooting

### v3.0.2

- Fixes
  - Possible module crash on upgrade in certain scenarios

### v3.0.1

- Fixes
  - P400 and P4K models should now properly load actions and variables

### v3.0.0

- Changes

  - Support for Companion v3
  - New variable to allow raw zoom integer to be used in triggers

- Fixes
  - Actions now properly populate in Companion UI
  - Update module status to connected after reconnection

### v2.3.3

- Changes

  - Add 'Toggle' to appropriate actions
  - Added On Screen Menu Action
  - Changed WB Mode options for v5 Cameras
  - Add full range of Presets

- Fixes
  - Corrected multiple feedbacks
  - Fixed Gain Limit Variable

### v2.3.2

- Fixes
  - Fixed Iris action

### v2.3.1

- Fixes
  - Fixed Gain and Iris variables

### v2.3.0

- Changes

  - Refactored actions to use callbacks in prep for v3
  - Added Up/Down/Value to all appropriate actions

- Fixes
  - Tidy & corrected a number of actions

### v2.2.1

- Fixes
  - Correct P110 & P120 actions
  - Updated Color Temperature action
  - Removed unneeded logging

### v2.2.0

- Changes

  - Added v5 FW API calls
  - Added Realtime variables from Camera dashboard
  - Added P110 & P120 model cameras
  - Improved model detection and initialization
  - Separated polling of camera config from camera status
  - Filter Actions / Feedback / Variables based on Model & FW
  - Improved backend to handle multiple models and firmware, and for storing device status

  New Actions

  - Capture Screensaver
  - Preset Mode
  - Preset Speed
  - Scope Size
  - Scope Gamma Gain
  - Scope Mode
  - Scope Position
  - Scope Preview
  - Scope Program
  - Scope Transparency
  - Screensaver Mode
  - Stream to Network

### v2.1.3

- Changes

  - Enable Camera model to be specified in config

- Fixes
  - Move Model detection to separate function
  - Use /version call instead of /about for Model

### v2.1.2

- Fixes
  - Actions not building for P4K and P400
  - Better handling of various camera models
  - Improved Gain Action

### v2.1.1

- Fixes
  - Shutter Up/Down action
  - Standby Variable showing correct value

### v2.1.0

- Changes

  - Changed Pan/Tilt/Zoom Speed inputs to numbers

- New Actions / Feedback

  - Analog Audio
    - Analog Audio In Gain
    - Analog Audio Out Gain
  - Video Output
    - Video Output
  - PTZ
    - Pan Position
    - Pan Speed
    - Tilt Position
    - Tilt Speed
    - Zoom Position
    - Zoom Speed
  - Encode Setup
    - NDI Audio
    - NDI Group Enable
  - Encode Transport
    - Transmit Method
  - NDI Discovery
    - NDI Discovery Server
  - Exposure
    - Ae Response
    - Backlight
    - Bright Level
    - Exposure Compensation
    - Exposure Compensation Level
    - Gain Limit
    - Gain Point
    - Gain Point Position
    - Shutter Control Overwrite
    - Shutter Max Speed
    - Shutter Min Speed
    - Shutter Speed Overwrite
    - Slow Shutter Enable
    - Slow Shutter Limit
    - Spotlight
  - White Balance
    - BG
    - BR
    - GB
    - GR
    - Level
    - Matrix
    - Offset
    - Phase
    - RB
    - RG
    - Select
    - Speed
  - Picture Settings
    - Backlight Compensation
    - Chroma Suppress
    - Color
    - Gamma
    - Highlight Compensation
    - Highlight Compensation Mask
    - Hue
    - Low Latency
    - ND Filter
    - Noise Reduction
    - Sharpness
    - Stabilizer
    - 3D Noise Reduction
    - 2D Noise Reduction
    - Wide Dynamic Range
  - Color Matrix
    - Color Matrix - Blue Gain
    - Color Matrix - Blue Hue
    - Color Matrix - Color Gain
    - Color Matrix - Cyan Gain
    - Color Matrix - Cyan Hue
    - Color Matrix - Green Gain
    - Color Matrix - Green Hue
    - Color Matrix - Hue Phase
    - Color Matrix - Magenta Gain
    - Color Matrix - Magenta Hue
    - Color Matrix - Red Gain
    - Color Matrix - Red Hue
    - Color Matrix - Yellow Gain
    - Color Matrix - Yellow Hue
  - Advanced Settings
    - Brightness
    - Brightness Compensation
    - Compensation Level
    - Gamma Offset
    - High Resolution
    - Video Enhancement
  - External Settings
    - Aux
    - Rain Wiper
    - 12v Out
  - Detail Settings
    - Bandwidth
    - BW Balance
    - Crispening
    - Detail
    - Highlight Detail
    - Hv Balance
    - Limit
    - Super Low
  - Gamma Settings
    - Black Gamma Level
    - Black Level
    - Black Level Range
    - Effect
    - Level
    - Offset
    - Pattern
    - Pattern Fine
    - Settings
    - Visibility Enhancer

- Fixes
  - Fixed shutter values in shutter actions

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
