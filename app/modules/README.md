# Modules Architecture

This directory contains the main modules of the application. Each module is designed to be independent and self-contained, sharing only common utilities and base components when necessary.

## Module Structure

Each module follows this structure:
```
module/
├── components/     # Module-specific components
├── screens/        # Module screens
├── services/       # Module-specific services (API, data handling)
├── stores/         # Module state management (MobX stores)
├── types/          # TypeScript types and interfaces
├── utils/          # Module-specific utilities
└── index.ts       # Module entry point and exports
```

## Shared Resources

Modules can share:
- Base components from `app/components`
- Theme configurations from `app/theme`
- Common utilities from `app/utils`
- Navigation types from `app/navigators`

## Guidelines

1. Keep modules independent - avoid cross-module dependencies
2. Use shared components for consistency
3. Maintain module-specific state within the module
4. Export only what's necessary through the module's index.ts
