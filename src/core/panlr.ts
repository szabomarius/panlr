type PanelSettings = {
    cols: number;
    rows: number;
};
const withPanel = (panelSettings: PanelSettings) => {
    return {
        log: () => {
            console.log(`${panelSettings.cols} x ${panelSettings.rows}`);
            console.log(`
   . . .
   . . .
   . . .
                `);
        },
    };
};

export { withPanel };
