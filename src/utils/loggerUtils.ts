import { type TPanel } from '@/types/grid';

function createEmptyGrid(rows: number, cols: number): string[][] {
    const grid: string[][] = [];
    for (let i = 0; i < rows; i++) {
        grid.push(Array(cols).fill('.'));
    }
    return grid;
}

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

export { createEmptyGrid, fillPanelsInGrid, gridToString };
