import { type TGridConfig, type TPanel } from '@/types/grid';

type TGridGeneratorState = {
    settings: TGridConfig;
    panels: TPanel[];
    isComplete: boolean;
};

type TGridGenerator = {
    generateNext(): TGridGeneratorState;
    getCurrentState(): TGridGeneratorState;
    toString(): string;
};

export { TGridGenerator, TGridGeneratorState };
