# NatiTube

NatiTube is a lightweight project designed to replace the standard YouTube web player with the native system player on iOS and Android devices. This bypasses web interface restrictions and enables native system features like Picture-in-Picture and native gesture controls.

## Installation

### Android
The stable script for Android devices can be found in the root or the designated script file.
- **File:** android-version.js
- **Compatible with:** InjecThor, Kiwi Browser, and Tampermonkey.
- **Target:** m.youtube.com

### iOS
The iOS version is distributed via an official Apple Shortcut for seamless integration with Safari.
- **Link:** iOS-url
- **Instructions:** Open the link on your iPhone or iPad to add the shortcut. Once added, run it from the Safari Share Sheet while watching a YouTube video.

### Beta Testing
For users who want to test the latest experimental features and fixes before they reach the stable release.
- **Folder:** beta-version
- **Note:** Beta versions may contain bugs and are intended for testing purposes.

## Technical Details
The scripts function by isolating the HTML5 video element and re-parenting it to the document root or adjusting its CSS properties to override the YouTube UI overlays. This ensures that the browser triggers the native system controller instead of the custom YouTube player.

## License
Distributed under the MIT License. See LICENSE for more information.
