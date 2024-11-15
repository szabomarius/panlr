import {
    type TGridGenerator,
    type TGridGeneratorState,
} from '@/types/generator';
import { type TGridConfig } from '@/types/grid';
import {
    createEmptyGrid,
    fillPanelsInGrid,
    gridToString,
} from '@/utils/loggerUtils';

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

    generateNext(): TGridGeneratorState {
        if (this._isGridAreaFull()) {
            return this.getCurrentState();
        }

        // Generate the next panel
        const { panels } = this._state;
        let startRowIndex = 0;
        let startColIndex = 0;
        // Find the next available start row and col index
        panels.forEach((panel) => {
            startRowIndex = Math.max(
                startRowIndex,
                panel.startRowIndex + panel.rows
            );
            startColIndex = Math.max(
                startColIndex,
                panel.startColIndex + panel.cols
            );
        });
        panels.push({
            startRowIndex,
            startColIndex,
            cols: 1,
            rows: 1,
        });

        // Check if the grid is full
        if (this._isGridAreaFull()) {
            this._state.isComplete = true;
        }

        // Return the shallow copy of the state
        return this.getCurrentState();
    }

    reset(): void {
        throw new Error('Method not implemented.');
    }

    getCurrentState(): TGridGeneratorState {
        // Deep clone the state to avoid passing by reference
        return {
            ...this._state,
            panels: this._state.panels.map((panel) => ({ ...panel })),
        };
    }

    toString(): string {
        const { rows, cols } = this._state.settings;
        const { panels } = this._state;
        const grid = createEmptyGrid(rows, cols);
        fillPanelsInGrid(grid, panels);
        return gridToString(grid);
    }

    private _isGridAreaFull(): boolean {
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
