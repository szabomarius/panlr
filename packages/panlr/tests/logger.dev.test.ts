process.env.NODE_ENV = 'development';

import { loggr } from '@/core/logger';

describe('loggr in development mode', () => {
    it('should call console.debug for debug', () => {
        const debugSpy = jest
            .spyOn(console, 'debug')
            .mockImplementation(() => {});
        loggr.debug('test debug');
        expect(debugSpy).toHaveBeenCalledWith('test debug');
        debugSpy.mockRestore();
    });

    it('should call console.table for table', () => {
        const tableSpy = jest
            .spyOn(console, 'table')
            .mockImplementation(() => {});
        loggr.table([{ key: 'value' }]);
        expect(tableSpy).toHaveBeenCalledWith([{ key: 'value' }]);
        tableSpy.mockRestore();
    });
});
