import { Panlr } from '@/core/panlr';
import { type TGridGenerator } from '@/types/generator';
import { type TGridConfig } from '@/types/grid';

const usePanlr = (settings: TGridConfig): TGridGenerator => {
    return new Panlr(settings);
};

export { usePanlr };
