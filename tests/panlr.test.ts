import { withPanel } from '@/core/panlr';

describe('Panlr test', () => {
    let consoleLogSpy: jest.SpyInstance;
    beforeEach(() => {
        consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    });
    it('logs', () => {
        const panelSettings = { cols: 3, rows: 3 };
        withPanel(panelSettings).log();
        expect(consoleLogSpy).toHaveBeenCalledTimes(2);
        expect(consoleLogSpy).toHaveBeenCalledWith('3 x 3');
    });
});
