import { type TGridConfig } from '@/types/grid';
import { getNextPanelRange, getNextStartingIndexes } from '@/utils/matrixUtils';

const cases = [
    {
        panels: [
            { startColIndex: 0, startRowIndex: 0, cols: 3, rows: 1 },
            { startColIndex: 0, startRowIndex: 1, cols: 3, rows: 1 },
        ],
        limits: { cols: 3, rows: 3 },
        expectedIndexes: { startColIndex: 0, startRowIndex: 2 },
        expectedRange: { cols: 3, rows: 1 },
    },
    {
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
        panels: [
            { startColIndex: 0, startRowIndex: 0, cols: 3, rows: 3 },
            { startColIndex: 3, startRowIndex: 0, cols: 1, rows: 1 },
        ],
        limits: { cols: 4, rows: 4 },
        expectedIndexes: { startColIndex: 0, startRowIndex: 1 },
        expectedRange: { cols: 3, rows: 1 },
    },
    {
        panels: [{ startColIndex: 0, startRowIndex: 0, cols: 1, rows: 2 }],
        limits: { cols: 5, rows: 5 },
        expectedIndexes: { startColIndex: 1, startRowIndex: 0 },
        expectedRange: { cols: 1, rows: 2 },
    },
    {
        panels: [
            { startColIndex: 0, startRowIndex: 0, cols: 3, rows: 1 },
            { startColIndex: 0, startRowIndex: 1, cols: 2, rows: 2 },
        ],
        limits: { cols: 3, rows: 3 },
        expectedIndexes: { startColIndex: 2, startRowIndex: 1 },
        expectedRange: { cols: 2, rows: 1 },
    },
];
describe('matrixUtils', () => {
    let panelLimits: TGridConfig;
    beforeEach(() => {
        panelLimits = { cols: 3, rows: 3 };
    });
    describe('getNextStartingIndexes', () => {
        describe('with multiple variants', () => {
            cases.forEach((testCase, index) => {
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
            cases.forEach((testCase, index) => {
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
    });
});
