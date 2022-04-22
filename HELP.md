## BirdDog PTZ

This module allows you to control any [BirdDog](https://birddog.tv/ptz-range/) PTZ camera.

## Configuration

- Make sure the BirdDog PTZ camera is on the latest firmware version, which should include `LTS` in the version name. You can download the latest firmware from the [BirdDog downloads page](https://birddog.tv/downloads/).
- Enter the IP address of the BirdDog device into the module settings

## Available Actions

- Pan/Tilt
- Zoom
- Pan Speed
- Tilt Speed
- Zoom Speed
- Focus (Near / Far / One Push)
- Focus Mode (Auto or Manual)
- Exposure Mode
- White Balance Mode
- White Balance One Push Trigger
- Gain
- Gain Red
- Gain Blue
- Iris
- Shutter
- Save Preset
- Recall Preset
- Preset Drive Speed
- Tally
- Freeze
- Picture Effect
- Picture Flip
- Picture Mirror
- Defog
- IR Cut Filter
- High Resolution Mode
- High Sensitivity Mode
- Custom Command (81 01 04 07 02 FF)

## Available Variables

|                                 | **P100/PF120** | **P200/A200/A300** | **P400/P4K** |
| ------------------------------- | :------------: | :----------------: | :----------: |
| **2D NR**                       |                |                    |      Y       |
| **3D NR**                       |                |                    |      Y       |
| **Ae Response**                 |                |         Y          |      Y       |
| **Auto Focus Mode**             |       Y        |         Y          |      Y       |
| **Audio In Gain**               |       Y        |         Y          |      Y       |
| **Audio Out Gain**              |       Y        |         Y          |      Y       |
| **Audio Output**                |       Y        |         Y          |      Y       |
| **Backlight**                   |                |                    |      Y       |
| **Back Light Com**              |                |         Y          |              |
| **Bandwidth**                   |       Y        |         Y          |      Y       |
| **Bandwidth Mode**              |       Y        |         Y          |      Y       |
| **Bandwidth Select**            |       Y        |         Y          |      Y       |
| **Blue Gain**                   |       Y        |         Y          |      Y       |
| **Bright Level**                |       Y        |         Y          |      Y       |
| **Chroma Suppress**             |                |         Y          |      Y       |
| **Color Temp**                  |       Y        |                    |              |
| **Contrast**                    |       Y        |                    |              |
| **Effect**                      |       Y        |         Y          |              |
| **Exposure Mode**               |       Y        |         Y          |      Y       |
| **Exposure Compensation**       |       Y        |         Y          |      Y       |
| **Exposure Compensation Level** |       Y        |         Y          |      Y       |
| **Firmware**                    |       Y        |         Y          |      Y       |
| **Flip**                        |       Y        |         Y          |      Y       |
| **Gain**                        |       Y        |         Y          |      Y       |
| **Gain Limit**                  |                |         Y          |      Y       |
| **Gain Point**                  |                |                    |      Y       |
| **Gain Point Position**         |                |                    |      Y       |
| **Gamma**                       |       Y        |         Y          |              |
| **High Sensitivity**            |                |         Y          |      Y       |
| **HLC Mode**                    |                |         Y          |      Y       |
| **Hue**                         |       Y        |                    |              |
| **Iris**                        |       Y        |         Y          |      Y       |
| **IR Cut Filter**               |                |         Y          |      Y       |
| **Low Latency**                 |                |  P200_A4_A5 ONLY   |              |
| **Mirror**                      |       Y        |         Y          |      Y       |
| **Model**                       |       Y        |         Y          |      Y       |
| **ND Filter**                   |                |                    |      Y       |
| **NDI Audio**                   |       Y        |         Y          |      Y       |
| **NDI Discovery Server**        |       Y        |         Y          |      Y       |
| **NDI Discovery Server IP**     |       Y        |         Y          |      Y       |
| **NDI Group**                   |       Y        |         Y          |      Y       |
| **NDI Group Name**              |       Y        |         Y          |      Y       |
| **Noise Reduction**             |       Y        |         Y          |              |
| **Pan Speed**                   |       Y        |         Y          |      Y       |
| **Red Gain**                    |       Y        |         Y          |      Y       |
| **Saturation**                  |       Y        |                    |              |
| **Sharpness**                   |       Y        |         Y          |              |
| **Shutter Control Overwrite**   |       Y        |                    |              |
| **Shutter Max Speed**           |                |                    |      Y       |
| **Shutter Min Speed**           |                |                    |      Y       |
| **Shutter Speed**               |       Y        |         Y          |      Y       |
| **Shutter Speed Overwrite**     |       Y        |                    |              |
| **Slow Shutter**                |                |         Y          |      Y       |
| **Slow Shutter Limit**          |                |         Y          |      Y       |
| **Spotlight**                   |                |                    |      Y       |
| **Stabilizer**                  |                |         Y          |      Y       |
| **Standby**                     |       Y        |         ?          |      ?       |
| **Status**                      |       Y        |         Y          |      Y       |
| **Stream Name**                 |       Y        |         Y          |      Y       |
| **Tally Mode**                  |       Y        |         Y          |      Y       |
| **Tilt Speed**                  |       Y        |         Y          |      Y       |
| **Transmit Method**             |       Y        |         Y          |      Y       |
| **Video Format**                |       Y        |         Y          |      Y       |
| **Video Output**                |                |                    |      Y       |
| **White Balance Mode**          |       Y        |         Y          |      Y       |
| **Wide Dynamic Range**          |       Y        |                    |              |
| **Zoom Speed**                  |       Y        |         Y          |      Y       |

## Available Feedback

- wb_mode
- standby_mode
