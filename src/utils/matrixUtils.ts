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
    const { cols, rows } = limits;
    const { startRowIndex, startColIndex } = nextIndex;
    const nextPanel = panels[panels.length - 1];
    const nextColIndex = startColIndex + nextPanel.cols;
    const nextRowIndex = startRowIndex + nextPanel.rows;
    const nextPanelCols = nextColIndex < cols ? nextPanel.cols : 1;
    const nextPanelRows = nextRowIndex < rows ? nextPanel.rows : 1;
    return { cols: nextPanelCols, rows: nextPanelRows };
};

export { getNextPanelRange, getNextStartingIndexes };
