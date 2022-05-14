## BirdDog PTZ

This module allows you to control any [BirdDog](https://birddog.tv/ptz-range/) PTZ camera.

## Configuration

- Make sure the BirdDog PTZ camera is on the latest firmware version, which should include `LTS` in the version name. You can download the latest firmware from the [BirdDog downloads page](https://birddog.tv/downloads/).
- Enter the IP address of the BirdDog device into the module settings

## Available Actions / Feedback / Variables per Camera Model

|                      |                                |     | **Actions** | **Feedback** | **Variables** |     | **P100** | **PF120** |  **P200**  | **A200** | **A300** | **P400** | **P4K** |
| -------------------- | ------------------------------ | --- | :---------: | :----------: | :-----------: | --- | :------: | :-------: | :--------: | :------: | :------: | :------: | :-----: |
| **General Camera**   | Firmware                       |     |             |              |   Variable    |     |    Y     |     Y     |     Y      |    Y     |    Y     |    Y     |    Y    |
|                      | IP Address                     |     |             |              |   Variable    |     |    Y     |     Y     |     Y      |    Y     |    Y     |    Y     |    Y    |
|                      | Model                          |     |             |              |   Variable    |     |    Y     |     Y     |     Y      |    Y     |    Y     |    Y     |    Y    |
|                      | Name                           |     |             |              |   Variable    |     |    Y     |     Y     |     Y      |    Y     |    Y     |    Y     |    Y    |
|                      | Network Config Method          |     |             |              |   Variable    |     |    Y     |     Y     |     Y      |    Y     |    Y     |    Y     |    Y    |
|                      | Serial Number                  |     |             |              |   Variable    |     |    Y     |     Y     |     Y      |    Y     |    Y     |    Y     |    Y    |
|                      | Status                         |     |             |              |   Variable    |     |    Y     |     Y     |     Y      |    Y     |    Y     |    Y     |    Y    |
|                      |                                |     |             |              |               |     |          |           |            |          |          |          |         |
| **VISCA**            | Custom                         |     |   Action    |              |               |     |    Y     |     Y     |     Y      |    Y     |    Y     |    Y     |    Y    |
|                      | Freeze                         |     |   Action    |   Feedback   |   Variable    |     |    Y     |     Y     |     Y      |    Y     |    Y     |    Y     |    Y    |
|                      | Standby                        |     |   Action    |   Feedback   |   Variable    |     |    Y     |     Y     |     Y      |    Y     |    Y     |    Y     |    Y    |
|                      |                                |     |             |              |               |     |          |           |            |          |          |          |         |
| **Analog Audio**     | Audio In Gain                  |     |   Action    |   Feedback   |   Variable    |     |    Y     |     Y     |     Y      |    Y     |    Y     |    Y     |    Y    |
|                      | Audio Out Gain                 |     |   Action    |   Feedback   |   Variable    |     |    Y     |     Y     |     Y      |    Y     |    Y     |    Y     |    Y    |
|                      | Audio Output                   |     |   Action    |   Feedback   |   Variable    |     |    Y     |     Y     |     Y      |    Y     |    Y     |    Y     |    Y    |
|                      |                                |     |             |              |               |     |          |           |            |          |          |          |         |
| **Video Output**     | Video Output                   |     |   Action    |   Feedback   |   Variable    |     |          |           |            |          |          |    Y     |    Y    |
|                      |                                |     |             |              |               |     |          |           |            |          |          |          |         |
| **Encode Setup**     | Bandwidth Mode                 |     |   Action    |   Feedback   |   Variable    |     |    Y     |     Y     |     Y      |    Y     |    Y     |    Y     |    Y    |
|                      | Bandwidth Select               |     |   Action    |   Feedback   |   Variable    |     |    Y     |     Y     |     Y      |    Y     |    Y     |    Y     |    Y    |
|                      | NDI Audio                      |     |   Action    |   Feedback   |   Variable    |     |    Y     |     Y     |     Y      |    Y     |    Y     |    Y     |    Y    |
|                      | NDI Group                      |     |   Action    |   Feedback   |   Variable    |     |    Y     |     Y     |     Y      |    Y     |    Y     |    Y     |    Y    |
|                      | NDI Group Name                 |     |   Action    |   Feedback   |   Variable    |     |    Y     |     Y     |     Y      |    Y     |    Y     |    Y     |    Y    |
|                      | Stream Name                    |     |             |              |   Variable    |     |    Y     |     Y     |     Y      |    Y     |    Y     |    Y     |    Y    |
|                      | Tally Mode                     |     |   Action    |   Feedback   |   Variable    |     |          |     Y     |     Y      |          |          |    Y     |    Y    |
|                      | Video Format                   |     |             |              |   Variable    |     |    Y     |     Y     |     Y      |    Y     |    Y     |    Y     |    Y    |
|                      |                                |     |             |              |               |     |          |           |            |          |          |          |         |
| **Encode Transport** | Transmit Method                |     |   Action    |   Feedback   |   Variable    |     |    Y     |     Y     |     Y      |    Y     |    Y     |    Y     |    Y    |
|                      | Transmit Net Prefix            |     |             |              |   Variable    |     |    Y     |     Y     |     Y      |    Y     |    Y     |    Y     |    Y    |
|                      | Transmit Netmask               |     |             |              |   Variable    |     |    Y     |     Y     |     Y      |    Y     |    Y     |    Y     |    Y    |
|                      |                                |     |             |              |               |     |          |           |            |          |          |          |         |
| **NDI Discovery**    | NDI Discovery Server           |     |   Action    |   Feedback   |   Variable    |     |    Y     |     Y     |     Y      |    Y     |    Y     |    Y     |    Y    |
|                      | NDI Discovery Server IP        |     |             |              |   Variable    |     |    Y     |     Y     |     Y      |    Y     |    Y     |    Y     |    Y    |
|                      |                                |     |             |              |               |     |          |           |            |          |          |          |         |
| **PTZ**              | Pan/Tilt (with speed override) |     |   Action    |              |               |     |    Y     |           |     Y      |    Y     |    Y     |    Y     |    Y    |
|                      | Pan/Tilt Direct                |     |   Action    |              |               |     |    Y     |           |     Y      |    Y     |    Y     |    Y     |    Y    |
|                      | Pan Position                   |     |             |   Feedback   |   Variable    |     |    Y     |           |     Y      |    Y     |    Y     |    Y     |    Y    |
|                      | Pan Speed                      |     |             |   Feedback   |   Variable    |     |    Y     |           |     Y      |    Y     |    Y     |    Y     |    Y    |
|                      | Tilt Position                  |     |             |   Feedback   |   Variable    |     |    Y     |           |     Y      |    Y     |    Y     |    Y     |    Y    |
|                      | Tilt Speed                     |     |             |   Feedback   |   Variable    |     |    Y     |           |     Y      |    Y     |    Y     |    Y     |    Y    |
|                      | Zoom (with speed override)     |     |   Action    |   Feedback   |   Variable    |     |    Y     |     Y     |     Y      |    Y     |    Y     |    Y     |    Y    |
|                      | Zoom Direct                    |     |   Action    |   Feedback   |   Variable    |     |    Y     |     Y     |     Y      |    Y     |    Y     |    Y     |    Y    |
|                      | Zoom Postion                   |     |             |   Feedback   |   Variable    |     |    Y     |     Y     |     Y      |    Y     |    Y     |    Y     |    Y    |
|                      | Zoom Speed                     |     |   Action    |   Feedback   |   Variable    |     |    Y     |     Y     |     Y      |    Y     |    Y     |    Y     |    Y    |
|                      | Recall Preset                  |     |   Action    |   Feedback   |   Variable    |     |    Y     |     Y     |     Y      |    Y     |    Y     |    Y     |    Y    |
|                      | Save Preset                    |     |   Action    |              |               |     |    Y     |     Y     |     Y      |    Y     |    Y     |    Y     |    Y    |
|                      |                                |     |             |              |               |     |          |           |            |          |          |          |         |
| **Focus**            | Focus Action                   |     |   Action    |   Feedback   |   Variable    |     |    Y     |     Y     |     Y      |    Y     |    Y     |    Y     |    Y    |
|                      | Focus Mode                     |     |   Action    |   Feedback   |   Variable    |     |    Y     |     Y     |     Y      |    Y     |    Y     |    Y     |    Y    |
|                      |                                |     |             |              |               |     |          |           |            |          |          |          |         |
| **Exposure**         | Ae Response                    |     |   Action    |   Feedback   |   Variable    |     |          |           |            |          |          |          |         |
|                      | BackLight                      |     |   Action    |   Feedback   |   Variable    |     |          |           |     Y      |    Y     |    Y     |    Y     |    Y    |
|                      | Bright Level                   |     |   Action    |   Feedback   |   Variable    |     |    Y     |     Y     |     Y      |    Y     |    Y     |    Y     |    Y    |
|                      | Exposure Compensation          |     |   Action    |   Feedback   |   Variable    |     |    Y     |     Y     |     Y      |    Y     |    Y     |    Y     |    Y    |
|                      | Exposure Compensation Level    |     |   Action    |   Feedback   |   Variable    |     |    Y     |     Y     |     Y      |    Y     |    Y     |    Y     |    Y    |
|                      | Exposure Mode                  |     |   Action    |   Feedback   |   Variable    |     |    Y     |     Y     |     Y      |    Y     |    Y     |    Y     |    Y    |
|                      | Gain                           |     |   Action    |   Feedback   |   Variable    |     |    Y     |     Y     |     Y      |    Y     |    Y     |    Y     |    Y    |
|                      | Gain Limit                     |     |   Action    |   Feedback   |   Variable    |     |          |           |     Y      |    Y     |    Y     |    Y     |    Y    |
|                      | Gain Point                     |     |   Action    |   Feedback   |   Variable    |     |          |           |            |          |          |    Y     |    Y    |
|                      | Gain Point Position            |     |   Action    |   Feedback   |   Variable    |     |          |           |            |          |          |    Y     |    Y    |
|                      | High Sensitivity               |     |   Action    |   Feedback   |   Variable    |     |          |           |     Y      |    Y     |    Y     |    Y     |    Y    |
|                      | Iris                           |     |   Action    |   Feedback   |   Variable    |     |    Y     |     Y     |     Y      |    Y     |    Y     |    Y     |    Y    |
|                      | Shutter Control Overwrite      |     |   Action    |   Feedback   |   Variable    |     |    Y     |     Y     |            |          |          |          |         |
|                      | Shutter Max Speed              |     |   Action    |   Feedback   |   Variable    |     |          |           |            |          |          |    Y     |    Y    |
|                      | Shutter Min Speed              |     |   Action    |   Feedback   |   Variable    |     |          |           |            |          |          |    Y     |    Y    |
|                      | Shutter Speed                  |     |   Action    |   Feedback   |   Variable    |     |    Y     |     Y     |     Y      |    Y     |    Y     |    Y     |    Y    |
|                      | Shutter Speed Overwrite        |     |   Action    |   Feedback   |   Variable    |     |    Y     |     Y     |            |          |          |          |         |
|                      | Slow Shutter Enable            |     |   Action    |   Feedback   |   Variable    |     |          |           |     Y      |    Y     |    Y     |    Y     |    Y    |
|                      | Slow Shutter Limit             |     |   Action    |   Feedback   |   Variable    |     |          |           |     Y      |    Y     |    Y     |    Y     |    Y    |
|                      | Spotlight                      |     |   Action    |   Feedback   |   Variable    |     |          |           |            |          |          |    Y     |    Y    |
|                      |                                |     |             |              |               |     |          |           |            |          |          |          |         |
| **White Balance**    | BG                             |     |   Action    |   Feedback   |   Variable    |     |          |           |            |          |          |    Y     |    Y    |
|                      | BR                             |     |   Action    |   Feedback   |   Variable    |     |          |           |            |          |          |    Y     |    Y    |
|                      | Blue Gain                      |     |   Action    |   Feedback   |   Variable    |     |    Y     |     Y     |     Y      |    Y     |    Y     |    Y     |    Y    |
|                      | Color Temp                     |     |   Action    |   Feedback   |   Variable    |     |    Y     |     Y     |            |          |          |          |         |
|                      | GB                             |     |   Action    |   Feedback   |   Variable    |     |          |           |            |          |          |    Y     |    Y    |
|                      | GR                             |     |   Action    |   Feedback   |   Variable    |     |          |           |            |          |          |    Y     |    Y    |
|                      | Level                          |     |   Action    |   Feedback   |   Variable    |     |          |           |            |          |          |    Y     |    Y    |
|                      | Matrix                         |     |   Action    |   Feedback   |   Variable    |     |          |           |            |          |          |    Y     |    Y    |
|                      | Offset                         |     |   Action    |   Feedback   |   Variable    |     |          |           |            |          |          |    Y     |    Y    |
|                      | Phase                          |     |   Action    |   Feedback   |   Variable    |     |          |           |            |          |          |    Y     |    Y    |
|                      | RB                             |     |   Action    |   Feedback   |   Variable    |     |          |           |            |          |          |    Y     |    Y    |
|                      | RG                             |     |   Action    |   Feedback   |   Variable    |     |          |           |            |          |          |    Y     |    Y    |
|                      | Red Gain                       |     |   Action    |   Feedback   |   Variable    |     |    Y     |     Y     |     Y      |    Y     |    Y     |    Y     |    Y    |
|                      | Select                         |     |   Action    |   Feedback   |   Variable    |     |          |           |            |          |          |    Y     |    Y    |
|                      | Speed                          |     |   Action    |   Feedback   |   Variable    |     |          |           |            |          |          |    Y     |    Y    |
|                      | White Balance Mode             |     |   Action    |   Feedback   |   Variable    |     |    Y     |     Y     |     Y      |    Y     |    Y     |    Y     |    Y    |
|                      | White Balance One Push Trigger |     |   Action    |              |               |     |          |           |            |          |          |          |         |
|                      |                                |     |             |              |               |     |          |           |            |          |          |          |         |
| **Picture Setup**    | Backlight Compensation         |     |   Action    |   Feedback   |   Variable    |     |          |           |     Y      |    Y     |    Y     |          |         |
|                      | Chroma Suppress                |     |   Action    |   Feedback   |   Variable    |     |          |           |     Y      |    Y     |    Y     |    Y     |    Y    |
|                      | Color                          |     |   Action    |   Feedback   |   Variable    |     |    Y     |     Y     |            |          |          |          |         |
|                      | Contrast                       |     |   Action    |   Feedback   |   Variable    |     |    Y     |     Y     |            |          |          |          |         |
|                      | Effect                         |     |   Action    |   Feedback   |   Variable    |     |    Y     |     Y     |     Y      |    Y     |    Y     |          |         |
|                      | Flip                           |     |   Action    |   Feedback   |   Variable    |     |    Y     |     Y     |     Y      |    Y     |    Y     |    Y     |    Y    |
|                      | Gamma                          |     |   Action    |   Feedback   |   Variable    |     |    Y     |     Y     |     Y      |    Y     |    Y     |          |         |
|                      | Highlight Compensation         |     |   Action    |   Feedback   |   Variable    |     |          |           |     Y      |    Y     |    Y     |    Y     |    Y    |
|                      | Highlight Compensation Mask    |     |   Action    |   Feedback   |   Variable    |     |          |           |     Y      |    Y     |    Y     |          |         |
|                      | Hue                            |     |   Action    |   Feedback   |   Variable    |     |    Y     |     Y     |            |          |          |          |         |
|                      | IR Cut Filter                  |     |   Action    |   Feedback   |   Variable    |     |          |           |     Y      |    Y     |    Y     |    Y     |    Y    |
|                      | Low Latency                    |     |   Action    |   Feedback   |   Variable    |     |          |           | P200_A4_A5 |          |          |          |         |
|                      | Mirror                         |     |   Action    |   Feedback   |   Variable    |     |    Y     |     Y     |     Y      |    Y     |    Y     |    Y     |    Y    |
|                      | ND Filter                      |     |   Action    |   Feedback   |   Variable    |     |          |           |            |          |          |          |   P4K   |
|                      | Noise Reduction                |     |   Action    |   Feedback   |   Variable    |     |    Y     |     Y     |     Y      |    Y     |    Y     |          |         |
|                      | Sharpness                      |     |   Action    |   Feedback   |   Variable    |     |    Y     |     Y     |     Y      |    Y     |    Y     |          |         |
|                      | Stabilizer                     |     |   Action    |   Feedback   |   Variable    |     |          |           |     Y      |    Y     |    Y     |    Y     |    Y    |
|                      | 3D Noise Reduction             |     |   Action    |   Feedback   |   Variable    |     |          |           |            |          |          |    Y     |    Y    |
|                      | 2D Noise Reduction             |     |   Action    |   Feedback   |   Variable    |     |          |           |            |          |          |    Y     |    Y    |
|                      | Wide Dynamic Range             |     |   Action    |   Feedback   |   Variable    |     |    Y     |     Y     |            |          |          |          |         |
|                      |                                |     |             |              |               |     |          |           |            |          |          |          |         |
| **Colour Matrix**    | Blue Gain                      |     |   Action    |   Feedback   |   Variable    |     |    Y     |     Y     |     Y      |    Y     |    Y     |          |         |
|                      | Blue Hue                       |     |   Action    |   Feedback   |   Variable    |     |    Y     |     Y     |     Y      |    Y     |    Y     |          |         |
|                      | Colour Gain                    |     |   Action    |   Feedback   |   Variable    |     |          |           |     Y      |    Y     |    Y     |          |         |
|                      | Cyan Gain                      |     |   Action    |   Feedback   |   Variable    |     |    Y     |     Y     |     Y      |    Y     |    Y     |          |         |
|                      | Cyan Hue                       |     |   Action    |   Feedback   |   Variable    |     |    Y     |     Y     |     Y      |    Y     |    Y     |          |         |
|                      | Green Gain                     |     |   Action    |   Feedback   |   Variable    |     |    Y     |     Y     |     Y      |    Y     |    Y     |          |         |
|                      | Green Hue                      |     |   Action    |   Feedback   |   Variable    |     |    Y     |     Y     |     Y      |    Y     |    Y     |          |         |
|                      | Hue Phase                      |     |   Action    |   Feedback   |   Variable    |     |          |           |     Y      |    Y     |    Y     |          |         |
|                      | Mag Gain                       |     |   Action    |   Feedback   |   Variable    |     |    Y     |     Y     |     Y      |    Y     |    Y     |          |         |
|                      | Mag Hue                        |     |   Action    |   Feedback   |   Variable    |     |    Y     |     Y     |     Y      |    Y     |    Y     |          |         |
|                      | Red Gain                       |     |   Action    |   Feedback   |   Variable    |     |    Y     |     Y     |     Y      |    Y     |    Y     |          |         |
|                      | RedHue                         |     |   Action    |   Feedback   |   Variable    |     |    Y     |     Y     |     Y      |    Y     |    Y     |          |         |
|                      | Yellow Gain                    |     |   Action    |   Feedback   |   Variable    |     |    Y     |     Y     |     Y      |    Y     |    Y     |          |         |
|                      | Yellow Hue                     |     |   Action    |   Feedback   |   Variable    |     |    Y     |     Y     |     Y      |    Y     |    Y     |          |         |
|                      |                                |     |             |              |               |     |          |           |            |          |          |          |         |
| **Advanced Setup**   | Brightness                     |     |   Action    |   Feedback   |   Variable    |     |          |           |     Y      |    Y     |    Y     |          |         |
|                      | Brightness Comp                |     |   Action    |   Feedback   |   Variable    |     |          |           |     Y      |    Y     |    Y     |          |         |
|                      | Comp Level                     |     |   Action    |   Feedback   |   Variable    |     |          |           |     Y      |    Y     |    Y     |          |         |
|                      | Gamma Offset                   |     |   Action    |   Feedback   |   Variable    |     |          |           |     Y      |    Y     |    Y     |          |         |
|                      | High Resolution                |     |   Action    |   Feedback   |   Variable    |     |          |           |     Y      |    Y     |    Y     |          |         |
|                      | Video Enhancement              |     |   Action    |   Feedback   |   Variable    |     |          |           |     Y      |    Y     |    Y     |          |         |
|                      |                                |     |             |              |               |     |          |           |            |          |          |          |         |
| **External Setup**   | Aux                            |     |   Action    |   Feedback   |   Variable    |     |          |           |            |    Y     |    Y     |          |         |
|                      | Rain Wiper                     |     |   Action    |   Feedback   |   Variable    |     |          |           |            |          |    Y     |          |         |
|                      | 12v Out                        |     |   Action    |   Feedback   |   Variable    |     |          |           |            |    Y     |    Y     |          |         |
|                      |                                |     |             |              |               |     |          |           |            |          |          |          |         |
| **Detail Setup**     | Bandwidth                      |     |   Action    |   Feedback   |   Variable    |     |          |           |            |          |          |    Y     |    Y    |
|                      | BW Balance                     |     |   Action    |   Feedback   |   Variable    |     |          |           |            |          |          |    Y     |    Y    |
|                      | Crispening                     |     |   Action    |   Feedback   |   Variable    |     |          |           |            |          |          |    Y     |    Y    |
|                      | Highlight Detail               |     |   Action    |   Feedback   |   Variable    |     |          |           |            |          |          |    Y     |    Y    |
|                      | Detail                         |     |   Action    |   Feedback   |   Variable    |     |          |           |            |          |          |    Y     |    Y    |
|                      | Hv Balance                     |     |   Action    |   Feedback   |   Variable    |     |          |           |            |          |          |    Y     |    Y    |
|                      | Limit                          |     |   Action    |   Feedback   |   Variable    |     |          |           |            |          |          |    Y     |    Y    |
|                      | SuperLow                       |     |   Action    |   Feedback   |   Variable    |     |          |           |            |          |          |    Y     |    Y    |
|                      |                                |     |             |              |               |     |          |           |            |          |          |          |         |
| **Gamma Setup**      | Black Gamma Level              |     |   Action    |   Feedback   |   Variable    |     |          |           |            |          |          |    Y     |    Y    |
|                      | Black Level                    |     |   Action    |   Feedback   |   Variable    |     |          |           |            |          |          |    Y     |    Y    |
|                      | Blac kLevel Range              |     |   Action    |   Feedback   |   Variable    |     |          |           |            |          |          |    Y     |    Y    |
|                      | Effect                         |     |   Action    |   Feedback   |   Variable    |     |          |           |            |          |          |    Y     |    Y    |
|                      | Level                          |     |   Action    |   Feedback   |   Variable    |     |          |           |            |          |          |    Y     |    Y    |
|                      | Offset                         |     |   Action    |   Feedback   |   Variable    |     |          |           |            |          |          |    Y     |    Y    |
|                      | Pattern                        |     |   Action    |   Feedback   |   Variable    |     |          |           |            |          |          |    Y     |    Y    |
|                      | Pattern Fine                   |     |   Action    |   Feedback   |   Variable    |     |          |           |            |          |          |    Y     |    Y    |
|                      | Settings                       |     |   Action    |   Feedback   |   Variable    |     |          |           |            |          |          |    Y     |    Y    |
|                      | Visibility Enhancer            |     |   Action    |   Feedback   |   Variable    |     |          |           |            |          |          |    Y     |    Y    |
