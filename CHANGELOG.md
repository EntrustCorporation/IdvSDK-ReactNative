## 100.9.0

### Changed

- Update Android SDK to 100.15.0
- Update iOS SDK to 100.14.0

## 100.8.1

### Changed

- Update iOS SDK to 100.12.1
- Native module package READMEs now state the install command including peer dependencies, and link to the SDK Integration guide

## 100.8.0

### Added

- Added support for custom remote fonts. Integrators can supply a remote font via URL in the theme resources, which is applied systematically across all native and web modules. When a list of remote fonts is provided, only the first one is used for now.
- Added support for custom local fonts. Integrators can now bundle a font natively per-platform and pass it via `Theme.resources.fonts` using the new `resolveLocalFont` helper, applied consistently across native and web modules. Missing/unbundled fonts are automatically reported through the `onError` callback of any constructed `EntrustIdv` instance.
- Add dedicated React Native packages for the Entrust IDV native modules (Welcome, Face Photo, Face Motion, Document, NFC, Biometric Token and the Android-only Consent module). Each package automatically links its iOS frameworks and/or Android artifact, so no manual Xcode or build.gradle setup is required — install it alongside @entrust.corporation/idvsdk-reactnative and let autolinking do the rest.

### Changed

- Update Android SDK to 100.13.0
- Update iOS SDK to 100.12.0
- Align the Android namespace of the React Native wrapper with the native Entrust IDV SDK. The wrapper module moves from com.entrustidv.reactnativesdk to com.entrust.identity.verification.sdk.reactnative, and each native module package follows the same pattern (for example com.entrustidv.reactnativesdk.document becomes com.entrust.identity.verification.sdk.reactnative.document). Autolinking resolves the new packages automatically, so no integration change is required unless you reference the old package explicitly — for instance in ProGuard/R8 keep rules or a manual ReactPackage registration in MainApplication.
- Update Android SDK to 100.11.0
- Update iOS SDK to 100.11.0

### Fixed

- Corrected the Capture API media result types so they describe what the native modules actually send. `MediaFile.fileData` is now `number[]` instead of `Blob`, `MediaFile.fileName` is gone because neither platform emits it, and `MediaResult` is a discriminated union on the `type` field both platforms already include. The payload on the wire is unchanged, so this is a type-level fix with no runtime behaviour change.

## 100.6.0

### Changed

- Update Android SDK to 100.6.3
- Update Android SDK to 100.7.0
- Update iOS SDK to 100.5.0

## 100.5.0

### Changed

- Update iOS SDK to 100.3.0

### Fixed

- Fixed an issue where the SDK failed to present when called from a screen that was already presented modally
