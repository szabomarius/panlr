import tsPlugin from '@typescript-eslint/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';
import eslintPluginYml from 'eslint-plugin-yml';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';

export default tseslint.config(
    eslint.configs.recommended,
    eslintConfigPrettier,
    ...tseslint.configs.recommended,
    ...eslintPluginYml.configs['flat/recommended'],
    {
        files: ['*.vue', '**/*.vue', '*.ts', '**/*.ts'],
        plugins: {
            'unused-imports': eslintPluginUnusedImports,
            'simple-import-sort': eslintPluginSimpleImportSort,
            '@typescript-eslint': tsPlugin,
        },
        languageOptions: {
            parser: tsParser,
        },
        rules: {
            // Import sorting rules
            'simple-import-sort/imports': 'error',
            'simple-import-sort/exports': 'error',

            // Remove unused imports automatically
            'unused-imports/no-unused-imports': 'error',

            // Consistent type imports for TypeScript
            '@typescript-eslint/consistent-type-imports': [
                'error',
                {
                    prefer: 'type-imports',
                    fixStyle: 'inline-type-imports',
                },
            ],

            // Disable specific Vue rules if needed
            'vue/first-attribute-linebreak': 'off',
        },
    },
    {
        files: ['jest.config.js'],
        languageOptions: {
            sourceType: 'commonjs',
            globals: {
                ...globals.node,
            },
        },
    },
    {
        ignores: [
            'server/types/db/generated.ts',
            'dist/**',
            'node_modules/**',
            'coverage/**',
        ],
    }
);
