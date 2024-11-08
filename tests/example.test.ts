describe('this is a unit test', () => {
    let consoleLogSpy: jest.SpyInstance;
    beforeEach(() => {
        consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    });
    it('passes as an example', () => {
        console.log('Hello, world!');
        expect(consoleLogSpy).toHaveBeenCalledTimes(1);
        expect(consoleLogSpy).toHaveBeenCalledWith(`Hello, world!`);
    });
});