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
    private _state: TGridGeneratorState;

    constructor(_config: TGridConfig) {
        this._state = {
            settings: _config,
            panels: [],
            isComplete: false,
        };
    }

    generateNext(): TGridGeneratorState {
        throw new Error('Method not implemented.');
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
}
