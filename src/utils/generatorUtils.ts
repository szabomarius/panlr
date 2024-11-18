import { type TPanelLimits } from '@/types/grid';

function generateRandomPanelSize(
    range: TPanelLimits,
    upperLimits: TPanelLimits,
    /** Number between 0 - 1 */
    randomizer: () => number = Math.random
): TPanelLimits {
    const maxCols = Math.min(range.cols, upperLimits.cols);
    const maxRows = Math.min(range.rows, upperLimits.rows);

    const cols = Math.max(Math.floor(randomizer() * maxCols), 1);
    const rows = Math.max(Math.floor(randomizer() * maxRows), 1);

    return { cols, rows };
}

export { generateRandomPanelSize };
