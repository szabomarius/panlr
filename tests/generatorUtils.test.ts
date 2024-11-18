import { generateRandomPanelSize } from '@/utils/generatorUtils';

describe('generatorUtils', () => {
    describe('generateRandomPanelSize', () => {
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

        it('should generate a mid-size panel size within the range', () => {
            const range = { cols: 4, rows: 4 };
            const upperLimits = { cols: 3, rows: 3 };
            const panelSize = generateRandomPanelSize(
                range,
                upperLimits,
                () => 0.8
            );
            expect(panelSize).toEqual({ cols: 2, rows: 2 });
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
});
