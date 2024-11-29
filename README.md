# PANLR Monorepo

## Packages

-   [`panlr`](https://github.com/szabomarius/panlr/tree/main/packages/panlr) - Comic panel layout generator library
-   [`@panlr/demo`](https://github.com/szabomarius/panlr/tree/main/apps/pages) - Astro-based demo application

## Documentation

For detailed package documentation and API reference, see the [PANLR package documentation](https://github.com/szabomarius/panlr/tree/main/packages/panlr#readme).

## Contributing

### This is a monorepo

Make sure you run all commands in root, note that turbo is used to manage the monorepo

```bash
npm install
```

```bash
npm run dev
```

### Core package

`packages/panlr`

This is basically the core package that is published to npm

### Demo app

`apps/pages`

This is the demo page

### Unit Tests First

For core package, unit tests are mandatory and aim is 100% coverage, even though that might be hard to manage in the future. This package won't grow and will have few features.

```bash
npm run test
```

### License

This project is licensed under the MIT License - see the LICENSE.md file for details.
