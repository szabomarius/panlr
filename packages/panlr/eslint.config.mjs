import { baseConfig } from '../../eslint.config.mjs';
import globals from 'globals';

// Extend base config and add/override package-specific rules
export default [
    ...baseConfig,
    {
        files: ['jest.config.js'],
        languageOptions: {
            sourceType: 'commonjs',
            globals: {
                ...globals.node,
            },
        },
    },
];
