process.env.NODE_ENV = 'production'; // Set NODE_ENV before importing

import { loggr } from '@/core/logger';

describe('loggr in production mode', () => {
    it('should not call console.debug for debug', () => {
        const debugSpy = jest
            .spyOn(console, 'debug')
            .mockImplementation(() => {});
        loggr.debug('test debug');
        expect(debugSpy).not.toHaveBeenCalled();
        debugSpy.mockRestore();
    });

    it('should not call console.table for table', () => {
        const tableSpy = jest
            .spyOn(console, 'table')
            .mockImplementation(() => {});
        loggr.table([{ key: 'value' }]);
        expect(tableSpy).not.toHaveBeenCalled();
        tableSpy.mockRestore();
    });
});
