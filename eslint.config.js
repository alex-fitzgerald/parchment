import js from "@eslint/js";
import ts from "typescript-eslint";
import stylistic from '@stylistic/eslint-plugin';

export default ts.config(
  js.configs.recommended,
  ts.configs.recommendedTypeChecked,
  ts.configs.stylistic,
  stylistic.configs["recommended-flat"],
  stylistic.configs.customize({
    indent: 4,
    semi: true
  }),
  {
    plugins: {
      "@stylistic": stylistic,
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
);