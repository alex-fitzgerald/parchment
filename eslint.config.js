import js from "@eslint/js";
import ts from "typescript-eslint";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import reactPlugin from "eslint-plugin-react";
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
    rules: {
      // "@stylistic/jsx-indent-props": ["error", 2],
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
);