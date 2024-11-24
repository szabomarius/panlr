import { loggr } from '@/core/logger';
import { type TPanelLimits } from '@/types/grid';

function generateRandomPanelSize(
    range: TPanelLimits,
    upperLimits: TPanelLimits,
    /** Number between 0 - 1 */
    randomizer: () => number = Math.random
): TPanelLimits {
    const maxCols = Math.min(range.cols, upperLimits.cols);
    const maxRows = Math.min(range.rows, upperLimits.rows);

    // Determine the size intervals
    const cols = Math.ceil(randomizer() * maxCols);
    const rows = Math.ceil(randomizer() * maxRows);

    loggr.table({
        range: { cols: range.cols, rows: range.rows },
        upperLimits: { cols: upperLimits.cols, rows: upperLimits.rows },
        result: { cols, rows },
    });
    return { cols: Math.max(cols, 1), rows: Math.max(rows, 1) };
}

export { generateRandomPanelSize };
