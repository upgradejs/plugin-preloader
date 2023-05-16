import { PluginItem, PluginOptions, PluginTarget, TransformOptions } from "@babel/core";
import { Linter } from "eslint";

export type Name = string;
export type NameInRegistry = string;
export type SemanticVersion = string;
export type NameWithVersion = [Name, SemanticVersion];
export type Entity = Name | NameWithVersion;

type BabelPluginExtended =
  | PluginItem
  | [PluginTarget, PluginOptions, string | undefined, SemanticVersion | undefined];

export interface BabelConfigBase extends Omit<TransformOptions, "plugins" | "presets" | "env"> {
  plugins?: BabelPluginExtended | BabelPluginExtended[] | null;
  presets?: BabelPluginExtended | BabelPluginExtended[] | null;
}

export interface BabelConfig extends BabelConfigBase {
  env?: Record<string, BabelConfigBase>;
}

export interface ESLintConfig extends Omit<Linter.BaseConfig, "parser" | "extends" | "plugins"> {
  parser?: Entity;
  extends?: Entity | Entity[];
  plugins?: Entity[];
}

export interface Preload {
  babel?: BabelConfig;
  eslint?: ESLintConfig;
  withPackageDependencies?: boolean;
}

export interface MapEntity {
  nameInRegistry: NameInRegistry;
}

export interface MapEntityWithVersions extends MapEntity {
  currentVersion?: SemanticVersion;
  desiredVersion: SemanticVersion;
}

export type Map = Record<Name, MapEntity>;
export type MapWithVersions = Record<Name, MapEntityWithVersions>;
