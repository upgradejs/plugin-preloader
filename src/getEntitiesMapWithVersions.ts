import { Entity, Map, MapWithVersions, Name } from "./types";
import { resolve } from "path";
import log from "fancy-log";
import { wrappers } from "./utils";

function getEntitiesMapWithVersions(entities: Entity[], entitiesMap: Map): MapWithVersions {
  const mapWithVersions: MapWithVersions = {};
  for (const entity of entities) {
    const name: Name = Array.isArray(entity) ? entity[0] : entity;
    try {
      const { nameInRegistry } = entitiesMap[name];
      mapWithVersions[name] = {
        nameInRegistry,
        desiredVersion: Array.isArray(entity) ? entity[1] : "latest",
      };
      const currentDir = process.cwd();
      const packagePath = resolve(currentDir, "node_modules", nameInRegistry);
      const packageIsInstalled = wrappers.syncExists(packagePath);
      if (packageIsInstalled) {
        const { version } = require(packagePath + "/package.json");
        mapWithVersions[name].currentVersion = version;
        if (mapWithVersions[name].desiredVersion === "latest") {
          const command = `npm view ${nameInRegistry} version`;
          const remoteVersion = wrappers.syncExec(command, { encoding: "utf8" });
          mapWithVersions[name].desiredVersion = remoteVersion.trim();
        }
      }
    } catch (e) {
      delete mapWithVersions[name];
      log.error(`Plugin ${name} is not handled yet.`);
    }
  }
  return mapWithVersions;
}

export default getEntitiesMapWithVersions;
