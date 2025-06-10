// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

// 기존 설정을 유지하면서 추천 규칙 세트를 추가하여 더 강력하게 만듭니다.
export default tseslint.config(
  // 1. ESLint가 추천하는 기본 규칙들을 활성화합니다.
  eslint.configs.recommended,

  // 2. TypeScript-ESLint가 추천하는 규칙들을 활성화합니다.
  ...tseslint.configs.recommended,

  // 3. 기존에 직접 작성하셨던 커스텀 규칙들을 여기에 적용합니다.
  {
    rules: {
      // 기존 규칙 유지
      "@typescript-eslint/naming-convention": [
        "warn",
        {
          selector: "import",
          format: ["camelCase", "PascalCase"],
        },
      ],
      curly: "warn",
      eqeqeq: "warn",
      "no-throw-literal": "warn",
      // 'warn'만 있는 것보다 'always'나 'never'를 명시하는 것이 좋습니다.
      semi: ["warn", "always"],
    },
  },

  // 4. 린트 검사에서 제외할 폴더를 지정합니다.
  {
    ignores: ["out/", "dist/", "node_modules/"],
  }
);
