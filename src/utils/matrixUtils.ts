import { type TGridConfig, type TPanel, type TPanelIndex } from '@/types/grid';

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
    const { cols: maxCols, rows: maxRows } = limits;
    const {
        startRowIndex: prevPanelRowIndex,
        startColIndex: prevPanelColIndex,
        rows: prevPanelRows,
        cols: prevPanelCols,
    } = panels[panels.length - 1];
    // We try to do the logic by taking last panel added as reference
    const nextColIndex = prevPanelColIndex + prevPanelCols;
    const nextRowIndex = prevPanelRowIndex + prevPanelRows;

    // If it's not the last column, we fill in the remaining columns
    if (nextColIndex < maxCols) {
        return {
            startColIndex: nextColIndex,
            startRowIndex: prevPanelRowIndex,
        };
    }

    if (nextRowIndex < maxRows) {
        return { startColIndex: 0, startRowIndex: nextRowIndex };
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
