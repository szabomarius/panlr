import { type TGridConfig, type TPanel, type TPanelIndex } from '@/types/grid';

/**
 * @param panels
 * @param limits
 * @returns index of the next panel or null if there is no space left
 */
const getNextStartingIndexes = (
    panels: TPanel[],
    limits: TGridConfig
): TPanelIndex | null => {
    if (!panels.length) {
        return { startColIndex: 0, startRowIndex: 0 };
    }
    const { cols, rows } = limits;
    const {
        startRowIndex,
        startColIndex,
        rows: panelRows,
        cols: panelCols,
    } = panels[panels.length - 1];
    const nextColIndex = startColIndex + panelCols;
    const nextRowIndex = startRowIndex + panelRows;
    /** Given the following grid:
     *          '┌───────┐',
                '│ 1 1 1 │',
                '│ 2 2 . │',
                '│ 2 2 . │',
                '└───────┘',
        nextColIndex: 0, nextRowIndex: 1, panelRows: 2, panelCols: 2,
        desiredIndex: x: 1, y: 2
     */

    if (nextColIndex < cols) {
        return { startColIndex: nextColIndex, startRowIndex };
    }

    if (nextRowIndex < rows) {
        return { startColIndex: 0, startRowIndex: nextRowIndex };
    }

    return null;
};

const getNextPanelRange = (
    panels: TPanel[],
    limits: TGridConfig,
    nextIndex: TPanelIndex
) => {
    /** Given the following grid:
     *  '┌───────┐',
        '│ 1 1 1 │',
        '│ 2 . . │',
        '│ 2 . . │',
        '└───────┘',
        cols: 2, rows: 2
     */
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
