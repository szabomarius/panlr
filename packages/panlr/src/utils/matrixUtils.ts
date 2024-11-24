import {
    type TGridConfig,
    type TPanel,
    type TPanelIndex,
    type TPanelLimits,
} from '@/types/grid';
import { type BinaryMatrix } from '@/types/matrix';
// TODO: this should be named gridUtils and move the matrix logic into matrixUtils
// TODO: this can probably be a class that takes in panels and limits and returns the next panel indexes

// TODO: concatenate with loggerUtils gridToString utils
const getEmptyMatrix = (rows: number, cols: number): BinaryMatrix => {
    const matrix: BinaryMatrix = [];
    for (let i = 0; i < rows; i++) {
        matrix.push(Array(cols).fill(0));
    }
    return matrix;
};

// TODO: concatenate with loggerUtils gridToString utils
// TODO: this algo is trash and needs improvements but it's good enough for now
const fillMatrix = (panels: TPanel[], matrix: (0 | 1)[][]): BinaryMatrix => {
    panels.forEach((panel) => {
        for (
            let row = panel.startRowIndex;
            row < panel.startRowIndex + panel.rows;
            row++
        ) {
            for (
                let col = panel.startColIndex;
                col < panel.startColIndex + panel.cols;
                col++
            ) {
                if (
                    matrix[row] !== undefined &&
                    matrix[row][col] !== undefined
                ) {
                    matrix[row][col] = 1;
                }
            }
        }
    });
    return matrix;
};

/**
 * See tests/matrixUtils.test.ts for visual examples
 * @returns indexes of the next panel or null if there is no space left
 */
const getNextStartingIndexes = (
    panels: TPanel[],
    limits: TGridConfig
): TPanelIndex | null => {
    if (!panels.length) {
        return { startColIndex: 0, startRowIndex: 0 };
    }
    const matrix: (0 | 1)[][] = fillMatrix(
        panels,
        getEmptyMatrix(limits.rows, limits.cols)
    );
    // You can use printMatrix from loggerUtils to visualize the matrix
    // e.g. console.log(printMatrix(matrix));

    for (let row = 0; row < limits.rows; row++) {
        for (let col = 0; col < limits.cols; col++) {
            if (matrix[row][col] === 0) {
                return { startColIndex: col, startRowIndex: row };
            }
        }
    }

    return null;
};

/**
 * See tests/matrixUtils.test.ts for visual examples
 * @returns maximum cols and rows for the next panel that fit nicely in the comic grid
 * TODO: this can be moved into the getNextStartingIndexes function as we already
 * have the matrix loop and we can calculate the cols and rows from there
 */
const getNextPanelRange = (
    panels: TPanel[],
    limits: TGridConfig,
    nextIndex: TPanelIndex
): TPanelLimits => {
    if (!panels.length) {
        return { cols: limits.cols, rows: limits.rows };
    }

    const matrix: (0 | 1)[][] = fillMatrix(
        panels,
        getEmptyMatrix(limits.rows, limits.cols)
    );
    let colsRange = 0;
    let rowsRange = 0;
    for (let row = 0; row < limits.rows; row++) {
        if (row < nextIndex.startRowIndex) {
            continue;
        }
        if (
            row > nextIndex.startRowIndex &&
            matrix[row][nextIndex.startColIndex - 1] !== 1 &&
            // Here is handling for when we start on empty row, we can
            // expand all the way down if col === 0 which means at the
            // start of a new row
            nextIndex.startColIndex > 0
        ) {
            break;
        }
        rowsRange++;
        for (let col = 0; col < limits.cols; col++) {
            if (col < nextIndex.startColIndex) {
                continue;
            }
            /**
        '┌───────────┐'
        '│ 1 1 1 1 2 │'
        '│ 1 1 1 1 2 │'
        '│ . . . . . │'
        '│ . . . . . │'
        '│ . . . . . │'
        '└───────────┘'
         */
            // Alright so the logic is the following, starting from the colIndex
            // we fill up to the right until we reach a new row, once we reach a new
            // row we check if there's space on the right of the colIndex

            if (matrix[row][col] === 0) {
                colsRange++;
                continue;
            }
        }
    }
    // TODO: once we concatenate this with the getNextStartingIndexes function
    // we can remove this throw Error, in theory it should never happen but
    // we rely on the nextIndex's correctness
    if (rowsRange === 0) {
        throw new Error('Something wacky happened');
    }
    // TODO: this is a hack, but we divide cols by rows because we count all the cols
    // for multiple rows, so we need to divide by the rows to get the actual cols span
    colsRange = colsRange / rowsRange;
    return { cols: colsRange, rows: rowsRange };
};

export { getNextPanelRange, getNextStartingIndexes };
