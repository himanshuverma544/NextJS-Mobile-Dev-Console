# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-01-29

### Added
- **`initDebug()` function** - Configure the package at runtime with custom settings
- Runtime configuration support for all settings
- Cleaner, more flexible configuration API

### Changed
- Configuration is now mutable via `initDebug()` instead of static exports
- Improved configuration documentation with three options: `initDebug()`, environment variables, or legacy imports
- Better user control over all configuration aspects

### Improved
- Removed unused `__filename` and `__dirname` variables from config.js
- Simplified configuration system for better developer experience
- Updated README with Quick Start section and comprehensive configuration examples
- Clean API with only essential exports (no legacy compatibility needed for first release)

## [1.0.0] - 2026-01-29

### Added
- Initial release of nextjs-mobile-dev-console
- `debug.terminal()` - Log to terminal with `[BROWSER]:` prefix
- `debug.file()` - Log to JSON file with timestamps and auto-incrementing IDs
- `useDebug()` - React hook for safe rendering-phase logging
- Duplicate prevention with configurable caching (3-second default window)
- Batch processing with debouncing (1-second default delay)
- HMR duplicate prevention for useDebug hook
- Configurable log file path via `LOG_FILE_PATH` environment variable
- Helper functions: cleanCache, filterDuplicates, formatTime, serializeArg
- Performance utilities: debounce, throttle, memoize
- Support for Next.js 14.x and 15.x
- MIT License

### Features
- Server-side logging without hydration errors
- Multiple argument support
- Object serialization for file logging
- Error object handling
- BigInt support
- IST timezone formatting for timestamps

[1.1.0]: https://github.com/himanshuverma544/NextJS-Mobile-Dev-Console/releases/tag/v1.1.0
[1.0.0]: https://github.com/himanshuverma544/NextJS-Mobile-Dev-Console/releases/tag/v1.0.0
