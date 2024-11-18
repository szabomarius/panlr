type TPanelIndex = {
    startRowIndex: number;
    startColIndex: number;
};

type TPanelLimits = {
    cols: number;
    rows: number;
};

type TPanel = TPanelIndex & TPanelLimits;

type TGridConfig = TPanelLimits & {
    maxPanelSize?: TPanelLimits;
    /** 0 - 1 , like Math.random, but used for testing and non-random generation */
    randomizer?: () => number;
};

export { TGridConfig, TPanel, TPanelIndex, TPanelLimits };
