import { type TGridConfig, type TPanel } from '@/types/grid';

type TGridGeneratorState = {
    settings: TGridConfig;
    panels: TPanel[];
    isComplete: boolean;
};

type TGridGenerator = {
    generateNext(): TGridGeneratorState;
    reset(): void;
    getCurrentState(): TGridGeneratorState;
    log(): void;
};

export { TGridGenerator, TGridGeneratorState };
