export type Name = string;
export type NameInRegistry = string;
export type SemanticVersion = string;
export type Options = Record<string, unknown>;
export type NameWithVersion = [Name, SemanticVersion];
export type Entity = Name | NameWithVersion;

export interface Preload {
	babel?: {
    plugins?: Entity[];
    presets?: Entity[];
	};
	eslint?: {
		parser?: Entity;
		extends?: Entity[];
    plugins?: Entity[];
	};
  performAsync?: boolean;
}

export interface MapEntity {
	nameInRegistry: NameInRegistry
}

export interface MapEntityWithVersions extends MapEntity {
	currentVersion?: SemanticVersion;
	desiredVersion: SemanticVersion;
}

export type Map = Record<Name, MapEntity>;
export type MapWithVersions = Record<Name, MapEntityWithVersions>;
