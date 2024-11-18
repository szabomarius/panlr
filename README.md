# comic-panlr

A package to generate comic panels, dynamically and with ease.
Visualized Example given a 3x3 grid

---

1. Empty Grid

```
   . . .
   . . .
   . . .
```

---

2. Generate the first panel:

```
   A A .
   . . .
   . . .
```

---

3. After this only X space is available to be filled because of comic ltr reading nature

```
   A A X
   . . .
   . . .
```

---

4. After placing the second panel:

```
A A B
X X X
X X X
```

---

5. After placing the third panel:

```
A A B
C C X
C C X
```

---

6. Final panel:

```
A A B
C C D
C C D
```

---

## Installation

npm:

```bash
npm install comic-panlr
```

or with yarn:

```bash
yarn add comic-panlr
```

---

## Contributing

### This is a monorepo

Make sure you run all commands in root, note that turbo is used to manage the monorepo

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
