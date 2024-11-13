type TPanel = {
    startRowIndex: number;
    startColIndex: number;
    cols: number;
    rows: number;
};

type TPanelLimits = Pick<TPanel, 'cols' | 'rows'>;

type TGridConfig = TPanelLimits & {
    cols: number;
    rows: number;
    maxPanelSize?: TPanelLimits;
    minPanelSize?: TPanelLimits;
};

export { TGridConfig, TPanel, TPanelLimits };
