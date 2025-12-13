# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

This is a Turborepo monorepo. Run all commands from the root:

```bash
npm install          # Install dependencies
npm run dev          # Run dev mode for all packages
npm run build        # Build all packages
npm run test         # Run all tests
npm run lint         # Lint all packages
npm run lint:fix     # Auto-fix lint issues
```

### Package-specific commands

For the core library (`packages/panlr`):
```bash
cd packages/panlr
npm run test              # Run Jest tests with coverage
npm run build             # Build with tsup
```

Run a single test file:
```bash
cd packages/panlr && npx jest tests/panlr.test.ts
```

For the demo app (`apps/pages`):
```bash
cd apps/pages
npm run dev               # Astro dev server
npm run preview           # Preview production build
```

## Architecture

### Monorepo Structure

- `packages/panlr` - Core library published to npm as `panlr`
- `apps/pages` - Astro demo application using Tailwind

### Core Library (`packages/panlr`)

The library generates comic panel layouts on a grid following left-to-right reading order.

**Entry point:** `src/index.ts` exports `usePanlr(config)` which returns a `Panlr` generator instance.

**Source structure:**
- `src/core/panlr.ts` - Main `Panlr` class implementing `TGridGenerator` interface
- `src/types/` - TypeScript types (`TGridConfig`, `TPanel`, `TGridGeneratorState`, `TGridGenerator`)
- `src/utils/matrixUtils.ts` - Panel positioning logic (`getNextStartingIndexes`, `getNextPanelRange`)
- `src/utils/generatorUtils.ts` - Random panel size generation
- `src/utils/loggerUtils.ts` - Grid visualization helpers

**Path aliases:** Uses `@/` alias mapping to `src/` (configured in tsconfig and jest).

### Testing

Unit tests are mandatory for the core package with 80% coverage threshold. Tests are in `packages/panlr/tests/`.

### Code Style

- ESLint with TypeScript, Prettier
- Imports must be sorted (simple-import-sort)
- Use type imports with inline syntax: `import { type Foo } from './bar'`
