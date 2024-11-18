import { Panlr } from '@/core/panlr';
import { type TGridGeneratorState } from '@/types/generator';

import { type TGridConfig } from '../src/types/grid';

describe('Comic Panel Generator', () => {
    let defaultConfig: TGridConfig;
    let panlr: Panlr;
    let expectedInitialState: TGridGeneratorState;

    beforeEach(() => {
        defaultConfig = {
            cols: 3,
            rows: 3,
            maxPanelSize: { cols: 2, rows: 2 },
            randomizer: () => 1,
        };
        panlr = new Panlr(defaultConfig);
        expectedInitialState = {
            settings: defaultConfig,
            panels: [],
            isComplete: false,
        };
    });

    describe('getCurrentState', () => {
        it('should create a generator with initial empty state', () => {
            const state = panlr.getCurrentState();
            expect(state).toEqual({
                settings: defaultConfig,
                panels: [],
                isComplete: false,
            });
        });

        it('should never pass state by reference', () => {
            const state = panlr.getCurrentState();
            state.isComplete = true;
            state.settings.cols = 10;
            state.panels.push({
                startRowIndex: 0,
                startColIndex: 0,
                cols: 1,
                rows: 1,
            });
            expect(panlr.getCurrentState()).toEqual(expectedInitialState);
        });

        it('should never return state by reference', () => {
            const state = panlr.generateNext();
            state.isComplete = true;
            state.settings.cols = 10;
            state.panels.push({
                startRowIndex: 0,
                startColIndex: 0,
                cols: 1,
                rows: 1,
            });
            expect(panlr.getCurrentState()).not.toEqual(state);
        });
    });

    describe('log', () => {
        it('should log the empty grid on a 3x3', () => {
            const log = panlr.toString();
            const expectedGridLog = [
                '┌───────┐',
                '│ . . . │',
                '│ . . . │',
                '│ . . . │',
                '└───────┘',
            ].join('\n');
            expect(log).toBe(expectedGridLog);
        });
        it('should log the grid on a 2x2', () => {
            panlr = new Panlr({
                cols: 2,
                rows: 2,
                maxPanelSize: { cols: 1, rows: 1 },
            });
            const log = panlr.toString();
            const expectedGridLog = [
                '┌─────┐',
                '│ . . │',
                '│ . . │',
                '└─────┘',
            ].join('\n');
            expect(log).toBe(expectedGridLog);
        });
    });

    describe('panel generation with maximum sizes', () => {
        it('should generate a valid first panel with 1x1 constraints', () => {
            panlr = new Panlr({
                cols: 3,
                rows: 3,
                maxPanelSize: { cols: 1, rows: 1 },
            });
            const state = panlr.generateNext();
            expect(state.panels).toEqual([
                {
                    startRowIndex: 0,
                    startColIndex: 0,
                    cols: 1,
                    rows: 1,
                },
            ]);
        });
        it('should generate a valid second panel within 1x1 constraints', () => {
            panlr = new Panlr({
                cols: 3,
                rows: 3,
                maxPanelSize: { cols: 1, rows: 1 },
            });
            panlr.generateNext();
            const { panels } = panlr.generateNext();
            expect(panels).toEqual([
                {
                    startRowIndex: 0,
                    startColIndex: 0,
                    cols: 1,
                    rows: 1,
                },
                {
                    startRowIndex: 0,
                    startColIndex: 1,
                    cols: 1,
                    rows: 1,
                },
            ]);
        });
        it('should finish generation on a 3x3 with 1x1 in exactly 9 iterations', () => {
            panlr = new Panlr({
                cols: 3,
                rows: 3,
                maxPanelSize: { cols: 1, rows: 1 },
            });
            let state = panlr.getCurrentState();
            for (let i = 0; i < 9; i++) {
                state = panlr.generateNext();
            }
            expect(state.isComplete).toBe(true);
            expect(state.panels.length).toBe(9);
            expect(panlr.generateNext()).toEqual(state);
        });

        it('should return the same state if generation is complete', () => {
            panlr = new Panlr({
                cols: 2,
                rows: 2,
                maxPanelSize: { cols: 1, rows: 1 },
            });
            let state = panlr.getCurrentState();
            while (!state.isComplete) {
                state = panlr.generateNext();
            }
            const completedState = state;
            expect(panlr.generateNext()).toEqual(completedState);
        });
    });

    describe('panel generation without limits', () => {
        beforeEach(() => {
            panlr = new Panlr({
                cols: 6,
                rows: 6,
                randomizer: () => 0.5,
            });
        });
        it('should generate a valid first panel without constraints', () => {
            const state = panlr.generateNext();
            const { startColIndex, startRowIndex, cols, rows } =
                state.panels[0];
            expect(startColIndex).toBe(0);
            expect(startRowIndex).toBe(0);
            expect(cols).toBeLessThanOrEqual(6);
            expect(rows).toBeLessThanOrEqual(6);
        });

        it('should generate a valid second panel without constraints', () => {
            panlr.generateNext();
            const { panels } = panlr.generateNext();
            expect(panels).toHaveLength(2);
            expect(panels[1].cols).toBeLessThanOrEqual(3);
            expect(panels[1].rows).toBeLessThanOrEqual(3);
        });

        it('should generate full matrix without any spaces using 1x1', () => {
            const panlr = new Panlr({
                cols: 3,
                rows: 3,
                randomizer: () => 0, // basically smallest panel size
            });
            let state = panlr.getCurrentState();
            while (!state.isComplete) {
                state = panlr.generateNext();
            }
            const area = state.panels.reduce(
                (acc, panel) => (acc += panel.cols * panel.rows),
                0
            );
            expect(area).toBe(9);
        });

        it('should generate full matrix without any spaces using 3x3', () => {
            const panlr = new Panlr({
                cols: 3,
                rows: 3,
                randomizer: () => 1, // basically largest panel size
            });
            const state = panlr.generateNext();
            expect(state.panels.length).toBe(1);
            expect(state.panels[0].cols * state.panels[0].rows).toBe(9);
        });
    });

    describe('validation', () => {
        it('should throw error if maxPanelSize exceeds grid size', () => {});
    });
});
