import {
    type TGridGenerator,
    type TGridGeneratorState,
} from '@/types/generator';
import { type TGridConfig, type TPanelLimits } from '@/types/grid';
import {
    createEmptyGrid,
    fillPanelsInGrid,
    gridToString,
} from '@/utils/loggerUtils';
import { getNextPanelRange, getNextStartingIndexes } from '@/utils/matrixUtils';

export class Panlr implements TGridGenerator {
    /** IMPORTANT: never expose this directly
     * Always use getCurrentState() to expose the
     * immutable copy of current state to consumers.
     */
    private _state: TGridGeneratorState;

    constructor(_config: TGridConfig) {
        this._state = {
            settings: _config,
            panels: [],
            isComplete: false,
        };
    }

    public generateNext(): TGridGeneratorState {
        if (this._isGridAreaFull()) {
            return this.getCurrentState();
        }

        // Generate the next panel
        const { panels } = this._state;
        const nextPanelIndexes = getNextStartingIndexes(
            panels,
            this._state.settings
        );
        if (nextPanelIndexes === null) {
            this._state.isComplete = true;
            return this.getCurrentState();
        }
        const nextPanelRanges = getNextPanelRange(
            panels,
            this._state.settings,
            nextPanelIndexes
        );
        const nextPanelSize = this._generateRandomPanelSize(nextPanelRanges);
        panels.push({
            ...nextPanelIndexes,
            ...nextPanelSize,
        });

        // Check if the grid is full
        if (this._isGridAreaFull()) {
            this._state.isComplete = true;
        }

        // Return the shallow copy of the state
        return this.getCurrentState();
    }

    public getCurrentState(): TGridGeneratorState {
        // Deep clone the state to avoid passing by reference
        return {
            ...this._state,
            panels: this._state.panels.map((panel) => ({ ...panel })),
        };
    }

    public toString(): string {
        const { rows, cols } = this._state.settings;
        const { panels } = this._state;
        const grid = createEmptyGrid(rows, cols);
        fillPanelsInGrid(grid, panels);
        return gridToString(grid);
    }

    private _generateRandomPanelSize(range: TPanelLimits): TPanelLimits {
        // Generate a random panel size using the range
        const { cols: maxCols, rows: maxRows } = range;
        const cols = Math.floor(Math.random() * (maxCols - 1)) + 1;
        const rows = Math.floor(Math.random() * (maxRows - 1)) + 1;
        // return panel
        return {
            cols,
            rows,
        };
    }

    private _isGridAreaFull(): boolean {
        if (this._state.isComplete) {
            return true;
        }
        const { rows, cols } = this._state.settings;
        // Calculate the total max area of the grid
        const gridArea = rows * cols;

        // Calculate the total area of all panels
        const panelsArea = this._state.panels.reduce((acc, panel) => {
            return acc + panel.cols * panel.rows;
        }, 0);

        // Throw an error here, shouldn't ever happen
        if (gridArea < panelsArea) {
            throw new Error('The total area of panels exceeds the grid area');
        }

        return gridArea === panelsArea;
    }
}
