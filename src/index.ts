import { MapEntityWithVersions, Preload } from "./types";
import { babelMap, eslintMap } from "./maps";
import getEntitiesMapWithVersions from "./getEntitiesMapWithVersions";
import { wrappers, transform } from "@core/utils";
import log from "fancy-log";

function preload({ babel, eslint }: Preload) {
  const checkedEntities: MapEntityWithVersions[] = [];

  if (babel) {
    const pluginsAndPresets = transform.babelConfig(babel);
    const pluginsAndPresetsMap = getEntitiesMapWithVersions(pluginsAndPresets, {
      ...babelMap.plugins,
      ...babelMap.presets,
    });
    checkedEntities.push(...Object.values(pluginsAndPresetsMap));
  }

  if (eslint) {
    const pluginsExtendsAndParser = transform.eslintConfig(eslint);
    const pluginsExtendsAndParserMap = getEntitiesMapWithVersions(pluginsExtendsAndParser, {
      ...eslintMap.extendsMap,
      ...eslintMap.parser,
      ...eslintMap.plugins,
    });
    checkedEntities.push(...Object.values(pluginsExtendsAndParserMap));
  }

  if (checkedEntities.length) {
    log("Packages to install:");
  } else {
    log("No packages need to be installed");
    return;
  }

  const packagesToInstall = checkedEntities.reduce((acc, { nameInRegistry, desiredVersion }) => {
    const packageWithVersion = `${nameInRegistry}@${desiredVersion}`;
    log(`- ${packageWithVersion}`);
    return acc + `${packageWithVersion} `;
  }, "");

  const command = `npm install ${packagesToInstall.trim()} --no-save --no-audit`;

  const output = wrappers.syncExec(command, { encoding: "utf8" });

  log(output.trim());
}

export default preload;
