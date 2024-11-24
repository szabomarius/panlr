import { type TGridConfig } from '@/types/grid';
import { getNextPanelRange, getNextStartingIndexes } from '@/utils/matrixUtils';

const cases = [
    {
        /**
        '┌───────┐'
        '│ 1 1 1 │'
        '│ 2 2 2 │'
        '│ . . . │'
        '└───────┘'
         */
        panels: [
            { startColIndex: 0, startRowIndex: 0, cols: 3, rows: 1 },
            { startColIndex: 0, startRowIndex: 1, cols: 3, rows: 1 },
        ],
        limits: { cols: 3, rows: 3 },
        expectedIndexes: { startColIndex: 0, startRowIndex: 2 },
        expectedRange: { cols: 3, rows: 1 },
    },
    {
        /**
        '┌─────┐'
        '│ 1 1 │'
        '│ 2 2 │'
        '│ 3 . │'
        '└─────┘'
         */
        panels: [
            { startColIndex: 0, startRowIndex: 0, cols: 2, rows: 1 },
            { startColIndex: 0, startRowIndex: 1, cols: 2, rows: 1 },
            { startColIndex: 0, startRowIndex: 2, cols: 1, rows: 1 },
        ],
        limits: { cols: 2, rows: 3 },
        expectedIndexes: { startColIndex: 1, startRowIndex: 2 },
        expectedRange: { cols: 1, rows: 1 },
    },
    {
        /**
        '┌─────────┐'
        '│ 1 1 1 2 │'
        '│ 1 1 1 . │'
        '│ . . . . │'
        '│ . . . . │'
        '└─────────┘'
         */
        panels: [
            { startColIndex: 0, startRowIndex: 0, cols: 3, rows: 2 },
            { startColIndex: 3, startRowIndex: 0, cols: 1, rows: 1 },
        ],
        limits: { cols: 4, rows: 4 },
        expectedIndexes: { startColIndex: 3, startRowIndex: 1 },
        expectedRange: { cols: 1, rows: 1 },
    },
    {
        /**
        '┌───────────┐'
        '│ 1 1 1 2 2 │'
        '│ 1 1 1 . . │'
        '│ 1 1 1 . . │'
        '│ . . . . . │'
        '└───────────┘'
         */
        panels: [
            { startColIndex: 0, startRowIndex: 0, cols: 3, rows: 3 },
            { startColIndex: 3, startRowIndex: 0, cols: 2, rows: 1 },
        ],
        limits: { cols: 5, rows: 4 },
        expectedIndexes: { startColIndex: 3, startRowIndex: 1 },
        expectedRange: { cols: 2, rows: 2 },
    },
    {
        /**
        '┌───────────┐'
        '│ 1 1 1 2 3 │'
        '│ 1 1 1 . . │'
        '│ 1 1 1 . . │'
        '│ . . . . . │'
        '└───────────┘'
         */
        panels: [
            { startColIndex: 0, startRowIndex: 0, cols: 3, rows: 3 },
            { startColIndex: 3, startRowIndex: 0, cols: 1, rows: 1 },
            { startColIndex: 4, startRowIndex: 0, cols: 1, rows: 1 },
        ],
        limits: { cols: 5, rows: 4 },
        expectedIndexes: { startColIndex: 3, startRowIndex: 1 },
        expectedRange: { cols: 2, rows: 2 },
    },
    {
        /**
        '┌───────────┐'
        '│ 1 1 1 2 2 │'
        '│ 1 1 1 3 . │'
        '│ . . . . . │'
        '│ . . . . . │'
        '└───────────┘'
         */
        panels: [
            { startColIndex: 0, startRowIndex: 0, cols: 3, rows: 2 },
            { startColIndex: 3, startRowIndex: 0, cols: 2, rows: 1 },
            { startColIndex: 3, startRowIndex: 1, cols: 1, rows: 1 },
        ],
        limits: { cols: 5, rows: 4 },
        expectedIndexes: { startColIndex: 4, startRowIndex: 1 },
        expectedRange: { cols: 1, rows: 1 },
    },
    {
        /**
        '┌─────────┐'
        '│ 1 1 1 2 │'
        '│ 3 3 4 . │'
        '│ 3 3 . . │'
        '│ . . . . │'
        '└─────────┘'
         */
        panels: [
            { startColIndex: 0, startRowIndex: 0, cols: 3, rows: 1 },
            { startColIndex: 3, startRowIndex: 0, cols: 1, rows: 1 },
            { startColIndex: 0, startRowIndex: 1, cols: 2, rows: 2 },
            { startColIndex: 2, startRowIndex: 1, cols: 1, rows: 1 },
        ],
        limits: { cols: 4, rows: 4 },
        expectedIndexes: { startColIndex: 3, startRowIndex: 1 },
        expectedRange: { cols: 1, rows: 1 },
    },
    {
        /**
        '┌───────────┐'
        '│ 1 . . . . │'
        '│ 1 . . . . │'
        '│ . . . . . │'
        '│ . . . . . │'
        '│ . . . . . │'
        '└───────────┘'
         */
        panels: [{ startColIndex: 0, startRowIndex: 0, cols: 1, rows: 2 }],
        limits: { cols: 5, rows: 5 },
        expectedIndexes: { startColIndex: 1, startRowIndex: 0 },
        expectedRange: { cols: 4, rows: 2 },
    },
    {
        /**
        '┌───────────┐'
        '│ 1 1 1 1 2 │'
        '│ 1 1 1 1 2 │'
        '│ . . . . . │'
        '│ . . . . . │'
        '│ . . . . . │'
        '└───────────┘'
         */
        panels: [
            { startColIndex: 0, startRowIndex: 0, cols: 4, rows: 2 },
            { startColIndex: 0, startRowIndex: 0, cols: 1, rows: 2 },
        ],
        limits: { cols: 4, rows: 4 },
        expectedIndexes: { startColIndex: 0, startRowIndex: 2 },
        expectedRange: { cols: 4, rows: 4 },
    },
    {
        /**
        '┌───────┐'
        '│ 1 1 1 │'
        '│ 2 2 . │'
        '│ 2 2 . │'
        '└───────┘'
         */
        panels: [
            { startColIndex: 0, startRowIndex: 0, cols: 3, rows: 1 },
            { startColIndex: 0, startRowIndex: 1, cols: 2, rows: 2 },
        ],
        limits: { cols: 3, rows: 3 },
        expectedIndexes: { startColIndex: 2, startRowIndex: 1 },
        expectedRange: { cols: 1, rows: 2 },
    },
    {
        /**
        '┌───────┐'
        '│ 1 1 1 │'
        '│ 2 . . │'
        '│ 2 . . │'
        '└───────┘'
         */
        panels: [
            { startColIndex: 0, startRowIndex: 0, cols: 3, rows: 1 },
            { startColIndex: 0, startRowIndex: 1, cols: 1, rows: 2 },
        ],
        limits: { cols: 3, rows: 3 },
        expectedIndexes: { startColIndex: 1, startRowIndex: 1 },
        expectedRange: { cols: 2, rows: 2 },
    },
    {
        /**
        '┌───────┐'
        '│ 1 1 1 │'
        '│ 2 2 2 │'
        '│ . . . │'
        '└───────┘'
         */
        panels: [
            { startColIndex: 0, startRowIndex: 0, cols: 3, rows: 1 },
            { startColIndex: 0, startRowIndex: 1, cols: 3, rows: 1 },
        ],
        limits: { cols: 3, rows: 3 },
        expectedIndexes: { startColIndex: 0, startRowIndex: 2 },
        expectedRange: { cols: 3, rows: 1 },
    },
];
// for easier debugging
const runCases = [...cases];

describe('matrixUtils', () => {
    let panelLimits: TGridConfig;
    beforeEach(() => {
        panelLimits = { cols: 3, rows: 3 };
    });
    describe('getNextStartingIndexes', () => {
        describe('with multiple variants', () => {
            runCases.forEach((testCase, index) => {
                it(`should return correct indexes for case:${index} `, () => {
                    const result = getNextStartingIndexes(
                        testCase.panels,
                        testCase.limits
                    );
                    expect(result).not.toBeNull();
                    expect(result).toStrictEqual(testCase.expectedIndexes);
                });
            });
        });

        it('should return 0, 0 when no panels are present', () => {
            const result = getNextStartingIndexes([], { cols: 3, rows: 3 });
            expect(result).toEqual({ startColIndex: 0, startRowIndex: 0 });
        });

        it('should return correct indexes when there is space on the right', () => {
            const panels = [
                { startColIndex: 0, startRowIndex: 0, cols: 3, rows: 1 },
            ];
            const result = getNextStartingIndexes(panels, panelLimits);
            expect(result).toEqual({ startColIndex: 0, startRowIndex: 1 });
        });

        it('should return null when matrix is full with one panel', () => {
            const panels = [
                { startColIndex: 0, startRowIndex: 0, cols: 3, rows: 3 },
            ];
            const result = getNextStartingIndexes(panels, panelLimits);
            expect(result).toBeNull();
        });

        it('should return null when matrix is full with multiple panels', () => {
            const panels = [
                { startColIndex: 0, startRowIndex: 0, cols: 3, rows: 3 },
                { startColIndex: 0, startRowIndex: 1, cols: 3, rows: 2 },
                { startColIndex: 0, startRowIndex: 3, cols: 3, rows: 1 },
            ];
            const result = getNextStartingIndexes(panels, panelLimits);
            expect(result).toBeNull();
        });
    });
    describe('getNextPanelRange', () => {
        describe('with multiple variants', () => {
            runCases.forEach((testCase, index) => {
                it(`should return correct range for case ${index}`, () => {
                    const result = getNextPanelRange(
                        testCase.panels,
                        testCase.limits,
                        testCase.expectedIndexes
                    );
                    expect(result).toStrictEqual(testCase.expectedRange);
                });
            });
        });
        describe('with edge cases', () => {
            it('should return full range when no panels are present', () => {
                const limits = { cols: 10, rows: 10 };
                const result = getNextPanelRange([], limits, {
                    startColIndex: 0,
                    startRowIndex: 0,
                });
                expect(result).toStrictEqual({ cols: 10, rows: 10 });
            });
            it('shoudld throw and error when bad indexes are provided', () => {
                const panels = [
                    { startColIndex: 0, startRowIndex: 0, cols: 3, rows: 3 },
                ];
                const badIndexes = { startColIndex: 3, startRowIndex: 3 };
                const errorCaller = () => {
                    getNextPanelRange(panels, panelLimits, badIndexes);
                };
                expect(errorCaller).toThrow('Something wacky happened');
            });
        });
    });
});
