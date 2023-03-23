import { Entity, ESLintConfig } from "@core/types";

function transformEslintConfig(config: ESLintConfig): Entity[] {
  const { plugins, parser, extends: extendsItems } = config;

  const extendsArr = Array.isArray(extendsItems)
    ? extendsItems
    : typeof extendsItems === "string"
    ? [extendsItems]
    : [];
  const pluginsArr = Array.isArray(plugins) ? plugins : [];
  const parserArr = parser ? [parser] : [];

  return [...extendsArr, ...pluginsArr, ...parserArr];
}

export default transformEslintConfig;
