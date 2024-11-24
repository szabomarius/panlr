import { generateRandomPanelSize } from '@/utils/generatorUtils';

describe('generatorUtils', () => {
    describe('generateRandomPanelSize', () => {
        describe('with upper (1) bounds', () => {
            it('should generate a random panel size within the range', () => {
                const range = { cols: 4, rows: 4 };
                const upperLimits = { cols: 3, rows: 3 };
                const panelSize = generateRandomPanelSize(
                    range,
                    upperLimits,
                    () => 1
                );
                expect(panelSize).toEqual({ cols: 3, rows: 3 });
            });

            it('should generate a random panel size within the range with a different seed', () => {
                const range = { cols: 2, rows: 2 };
                const upperLimits = { cols: 4, rows: 4 };
                const panelSize = generateRandomPanelSize(
                    range,
                    upperLimits,
                    () => 1
                );
                expect(panelSize).toEqual({ cols: 2, rows: 2 });
            });

            it('should keep the limits on small ranges', () => {
                const range = { cols: 1, rows: 1 };
                const upperLimits = { cols: 1, rows: 1 };
                const panelSize = generateRandomPanelSize(
                    range,
                    upperLimits,
                    () => 1
                );
                expect(panelSize).toEqual({ cols: 1, rows: 1 });
            });
        });
        describe('with min (0) bounds', () => {
            it('should generate the smallest panel size within the range', () => {
                const range = { cols: 4, rows: 4 };
                const upperLimits = { cols: 3, rows: 3 };
                const panelSize = generateRandomPanelSize(
                    range,
                    upperLimits,
                    () => 0
                );
                expect(panelSize).toEqual({ cols: 1, rows: 1 });
            });
        });

        describe('with mixed bounds', () => {
            it('should generate varying panel sizes within the range', () => {
                let random = 1;
                const generator = () => {
                    const i = random;
                    random = 0.5;
                    return i;
                };
                const range = { cols: 4, rows: 4 };
                const upperLimits = { cols: 6, rows: 6 };
                const panelSize = generateRandomPanelSize(
                    range,
                    upperLimits,
                    generator
                );
                expect(panelSize).toEqual({ cols: 4, rows: 2 });
            });

            it('should generate a mid-size panel size within the range', () => {
                const range = { cols: 4, rows: 4 };
                const upperLimits = { cols: 3, rows: 3 };
                const panelSize = generateRandomPanelSize(
                    range,
                    upperLimits,
                    () => 0.66 // [0, 0.33] [0.33, 0.66] [0.66, 1]
                );
                expect(panelSize).toEqual({ cols: 2, rows: 2 });
            });
        });

        describe('with human readable distribution bounds', () => {
            // For a 10x10 grid, each panel should have 1/100 chance
            // We map random values to specific panel sizes for clarity
            const cases = [
                { random: 0, expected: { cols: 1, rows: 1 } },
                { random: 0.01, expected: { cols: 1, rows: 1 } },
                { random: 0.1, expected: { cols: 1, rows: 1 } },
                { random: 0.2, expected: { cols: 2, rows: 2 } },
                { random: 0.25, expected: { cols: 3, rows: 3 } },
                { random: 0.5, expected: { cols: 5, rows: 5 } },
                { random: 0.75, expected: { cols: 8, rows: 8 } },
                { random: 0.9, expected: { cols: 9, rows: 9 } },
                { random: 0.98, expected: { cols: 10, rows: 10 } },
                { random: 0.99, expected: { cols: 10, rows: 10 } },
            ];

            cases.forEach(({ random, expected }) => {
                it(`should generate a ${expected.cols}x${expected.rows} panel when random value is ${random}`, () => {
                    const range = { cols: 10, rows: 10 };
                    const upperLimits = { cols: 10, rows: 10 };
                    const panelSize = generateRandomPanelSize(
                        range,
                        upperLimits,
                        () => random
                    );
                    expect(panelSize).toEqual(expected);
                });
            });
        });
    });
});
