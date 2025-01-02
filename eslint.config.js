import js from '@eslint/js';
import ts from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';

export default ts.config(
    {
        ignores: ['dist', 'node_modules', '*.js'],
    },
    js.configs.recommended,
    ts.configs.recommendedTypeChecked,
    ts.configs.stylistic,
    stylistic.configs['recommended-flat'],
    stylistic.configs.customize({
        indent: 4,
        semi: true,
    }),
    {
        plugins: {
            '@stylistic': stylistic,
        },
        languageOptions: {
            parserOptions: {
                projectFolderIgnoreList: ['node_modules', 'dist'],
                projectService: {
                    defaultProject: 'tsconfig.json',
                    allowDefaultProject: ['*.js'],
                },
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
);
