// @ts-ignore
import tsPlugin from '@typescript-eslint/eslint-plugin'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort'
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports'
import eslintPluginYml from 'eslint-plugin-yml'
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

export default tseslint.config(
    eslint.configs.recommended,
    eslintConfigPrettier,
    ...tseslint.configs.recommended,
    ...eslintPluginYml.configs['flat/recommended'],
    // {
    //     files: ['*.vue', '**/*.vue', '*.ts', '**/*.ts'],
    //     plugins: {
    //         'unused-imports': eslintPluginUnusedImports,
    //         'simple-import-sort': eslintPluginSimpleImportSort,
    //         '@typescript-eslint': tsPlugin,
    //     },
    //     languageOptions: {
    //         parser: '@typescript-eslint/parser',
    //     },
    //     rules: {
    //         // Import sorting rules
    //         'simple-import-sort/imports': 'error',
    //         'simple-import-sort/exports': 'error',

    //         // Remove unused imports automatically
    //         'unused-imports/no-unused-imports': 'error',

    //         // Consistent type imports for TypeScript
    //         '@typescript-eslint/consistent-type-imports': [
    //             'error',
    //             {
    //                 prefer: 'type-imports',
    //                 fixStyle: 'inline-type-imports',
    //             },
    //         ],

    //         // Disable specific Vue rules if needed
    //         'vue/first-attribute-linebreak': 'off',
    //     },
    // },
    {
        ignores: ['server/types/db/generated.ts'],
    }
)
