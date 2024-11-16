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
    minPanelSize?: TPanelLimits;
};

export { TGridConfig, TPanel, TPanelIndex, TPanelLimits };
