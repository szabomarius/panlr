import tsPlugin from '@typescript-eslint/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';
import eslintPluginYml from 'eslint-plugin-yml';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';

export const baseConfig = tseslint.config(
    eslint.configs.recommended,
    eslintConfigPrettier,
    ...tseslint.configs.recommended,
    ...eslintPluginYml.configs['flat/recommended'],
    {
        files: ['*.ts', '**/*.ts'],
        plugins: {
            'unused-imports': eslintPluginUnusedImports,
            'simple-import-sort': eslintPluginSimpleImportSort,
            '@typescript-eslint': tsPlugin,
        },
        languageOptions: {
            parser: tsParser,
        },
        rules: {
            'simple-import-sort/imports': 'error',
            'simple-import-sort/exports': 'error',
            'unused-imports/no-unused-imports': 'error',
            '@typescript-eslint/consistent-type-imports': [
                'error',
                {
                    prefer: 'type-imports',
                    fixStyle: 'inline-type-imports',
                },
            ],
            'vue/first-attribute-linebreak': 'off',
        },
    },
    {
        ignores: ['dist/**', 'node_modules/**', 'coverage/**'],
    }
);

export default baseConfig;
