# Change Log

All notable changes to the "quick-info-on-cursor" extension will be documented in this file.

## [0.2.0] - 2025-06-10

### Added

- **GitLens Compatibility**: Added a new feature that checks for a conflicting GitLens setting (`gitlens.hovers.currentLine.over`). If it's set to `line`, the extension will now prompt the user to change it to `annotation` for a better experience, preventing the GitLens hover from appearing alongside type information.

- add logo

### Removed

- Removed the notification prompt related to `editor.accessibilitySupport`. This simplifies the initial setup for users.

## [0.1.0] - 2025-06-10

### Added

- Added a one-time notification prompt to help users enable the hover auto-focus feature by setting `"editor.accessibilitySupport": "on"`.

### Changed

- The hover tooltip now only triggers on keyboard-based cursor movements, ignoring mouse clicks for a more intentional experience.

## [0.0.1] - 2025-06-09

- Initial release
