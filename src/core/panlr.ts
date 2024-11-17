import {
    type TGridGenerator,
    type TGridGeneratorState,
} from '@/types/generator';
import { type TGridConfig } from '@/types/grid';
import { generateRandomPanelSize } from '@/utils/generatorUtils';
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
        const nextPanelSize = generateRandomPanelSize(
            nextPanelRanges,
            this._state.settings.maxPanelSize || nextPanelRanges
        );
        panels.push({
            ...nextPanelIndexes,
            ...nextPanelSize,
        });

        // Check if the grid is full
        if (getNextStartingIndexes(panels, this._state.settings) === null) {
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
}
