# panlr

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
npm install panlr
```

or with yarn:

```bash
yarn add panlr
```

## Usage

### Generate one panel

```javascript
import { usePanlr } from 'panlr';

const config = {
    cols: 5, // grid has 5 cols
    rows: 5, // grid has 5 rows
    maxPanelSize: {
        cols: 2, // generated panels max 2 cols width
        rows: 2, // generated panels max 2 rows height
    },
};
const panlr = usePanlr(config);
// generates a max 2x2 panel in the grid
// read from left to right and tries to
// position it in comic book reading order
panlr.generateNext();
console.log(panlr.toString());
/**
'┌───────────┐
 │ 1 1 . . . │
 │ 1 1 . . . │
 │ . . . . . │
 │ . . . . . │
 │ . . . . . │
 └───────────┘'
*/
```

### Generate full

```javascript
import { usePanlr } from 'panlr';

const config = {
    cols: 5, // grid has 5 cols
    rows: 5, // grid has 5 rows
    maxPanelSize: {
        cols: 2, // generated panels max 2 cols width
        rows: 2, // generated panels max 2 rows height
    },
};
const panlr = usePanlr(config);
let state = panlr.getCurrentState();
// isCompleted === true when
// the 5x5 is full with panels
while (!state.isComplete) {
    state = panlr.generateNext();
}
console.log(state.panels[0]);
/**
   @panel
   startRowIndex: number; // 0 to 4
   startColIndex: number; // 0 to 4
   cols: number; // number of cols the panel occupies
   rows: number; // number of rows the panel occupies
*/
```

### Reference

```typescript
usePanlr(config: TGridConfig): TGridGenerator
```

`config: TGridConfig`

<table>
   <tr>
      <th>Param</th>
      <th>Mandatory</th>
      <th>Type</th>
      <th>Description</th>
   </tr>
   <tr>
      <td>cols</td>
      <td>yes</td>
      <td>number</td>
      <td>Total columns of the grid</td>
   </tr>
   <tr>
      <td>rows</td>
      <td>yes</td>
      <td>number</td>
      <td>Total rows of the grid</td>
   </tr>
   <tr>
      <td>maxPanelSize</td>
      <td>no</td>
      <td>Object</td>
      <td>Config for max panel generation limits</td>
   </tr>
   <tr>
      <td>maxPanelSize.cols</td>
      <td>no</td>
      <td>Number</td>
      <td>Config for max cols one panel can have</td>
   </tr>
   <tr>
      <td>maxPanelSize.rows</td>
      <td>no</td>
      <td>Number</td>
      <td>Config for max rows one panel can have</td>
   </tr>
</table>

`@return TGridGenerator`

<table>
   <tr>
      <th>Method</th>
      <th>Params</th>
      <th>Return</th>
      <th>Description</th>
   </tr>
      <tr>
      <td>generateNext()</td>
      <td>-</td>
      <td>TGridGeneratorState</td>
      <td>Generates a random panel given the config limits</td>
   </tr>
   <tr>
      <td>getCurrentState()</td>
      <td>-</td>
      <td>TGridGeneratorState</td>
      <td>Returns the current grid state</td>
   </tr>
   <tr>
      <td>toString()</td>
      <td>-</td>
      <td>string</td>
      <td>Returns the pretty print version of the grid. Useful for debugging</td>
   </tr>
</table>

`@return TGridGeneratorState`

<table>
   <tr>
      <th>Param</th>
      <th>Type</th>
      <th>Description</th>
   </tr>
   <tr>
      <td>settings</td>
      <td>TGridConfig</td>
      <td>The original settings given in usePanlr() function call</td>
   </tr>
   <tr>
      <td>panels</td>
      <td>TPanel[]</td>
      <td>Array of panels</td>
   </tr>
   <tr>
      <td>panels[0].startRowIndex</td>
      <td>number</td>
      <td>Starting row index of the panel (starts from 0)</td>
   </tr>
   <tr>
      <td>panels[0].startColIndex</td>
      <td>number</td>
      <td>Starting col index of the panel (starts from 0)</td>
   </tr>
   <tr>
      <td>panels[0].cols</td>
      <td>number</td>
      <td>The span in cols of the panel (basically the width)</td>
   </tr>
   <tr>
      <td>panels[0].rows</td>
      <td>number</td>
      <td>The span in rows of the panel (basically the height)</td>
   </tr>
   <tr>
      <td>isComplete</td>
      <td>boolean</td>
      <td>True when the grid/matrix is filled with panels. Any calls to generateNext() won't do anything after it is Complete</td>
   </tr>
</table>
