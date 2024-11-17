import { type TGridConfig, type TPanel, type TPanelIndex } from '@/types/grid';
import { type BinaryMatrix } from '@/types/matrix';
import { printMatrix } from '@/utils/loggerUtils';

// TODO: concatenate with loggerUtils gridToString utils
const getEmptyMatrix = (rows: number, cols: number): BinaryMatrix => {
    const matrix: BinaryMatrix = [];
    for (let i = 0; i < rows; i++) {
        matrix.push(Array(cols).fill(0));
    }
    return matrix;
};

// TODO: concatenate with loggerUtils gridToString utils
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
                // TODO: this algo needs improvements but it's good enough for now
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
    console.log(printMatrix(matrix));

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
 */
const getNextPanelRange = (
    panels: TPanel[],
    limits: TGridConfig,
    nextIndex: TPanelIndex
) => {
    // Cols will always try to expand the remaining space
    const cols = limits.cols - nextIndex.startColIndex;
    // We try to expand rows on remaining space
    let rows = limits.rows - nextIndex.startRowIndex;
    if (nextIndex.startColIndex !== 0) {
        // If we are not on the first row, then it means the previous panel
        // will dictate how to layout the next panel, mainly the rows as cols
        // can always expand
        const lastPanel = panels[panels.length - 1];
        rows = lastPanel.rows;
    }
    return { cols, rows };
};

export { getNextPanelRange, getNextStartingIndexes };
