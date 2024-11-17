import { type TPanel } from '@/types/grid';
import { type BinaryMatrix } from '@/types/matrix';

// TODO: concatenate with matrixUtils
function createEmptyGrid(rows: number, cols: number): string[][] {
    const grid: string[][] = [];
    for (let i = 0; i < rows; i++) {
        grid.push(Array(cols).fill('.'));
    }
    return grid;
}

// TODO: concatenate with matrixUtils
function fillPanelsInGrid(grid: string[][], panels: TPanel[]): void {
    panels.forEach((panel, index) => {
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
                grid[row][col] = (index + 1).toString();
            }
        }
    });
}

// TODO: concatenate with matrixUtils
function gridToString(grid: string[][]): string {
    const numCols = grid[0].length;
    const horizontalBorder = '─'.repeat(numCols * 2 + 1);
    const formattedRows = grid.map((row) => '│ ' + row.join(' ') + ' │');

    return [
        `┌${horizontalBorder}┐`,
        ...formattedRows,
        `└${horizontalBorder}┘`,
    ].join('\n');
}

const printMatrix = (matrix: BinaryMatrix): string => {
    const numCols = matrix[0].length;
    const horizontalBorder = '─'.repeat(numCols * 2 + 1);
    const formattedRows = matrix.map((row) => '│ ' + row.join(' ') + ' │');

    return [
        `┌${horizontalBorder}┐`,
        ...formattedRows,
        `└${horizontalBorder}┘`,
    ].join('\n');
};

export { createEmptyGrid, fillPanelsInGrid, gridToString, printMatrix };
