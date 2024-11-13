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
            minPanelSize: { cols: 1, rows: 1 },
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
    });

    describe('log', () => {
        it('should log the empty grid nicely', () => {
            const logSpy = jest.spyOn(console, 'log');
            panlr.log();
            // The expected grid string with proper spacing
            const expectedGrid = [
                '┌───────┐',
                '│ . . . │',
                '│ . . . │',
                '│ . . . │',
                '└───────┘',
            ].join('\n');

            expect(logSpy).toHaveBeenCalledWith(expectedGrid);
        });
    });

    describe('panel generation', () => {
        it('should generate a valid first panel within constraints', () => {});
        it('should generate a valid second panel within constraints', () => {});
        it('should finish generation on a 3x3 in less than 10 iterations', () => {});
        it('should reset the generator state', () => {});
    });

    describe('validation', () => {
        it('should throw error if maxPanelSize exceeds grid size', () => {});
        it('should throw error if minPanelSize is larger than maxPanelSize', () => {});
    });
});
