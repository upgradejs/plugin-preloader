import { MapEntityWithVersions, Preload } from "./types";
import { babelMap, eslintMap } from "./maps";
import {
  getEntitiesMapWithVersionsSync,
  getEntitiesMapWithVersionsAsync,
} from "./getEntitiesMapWithVersions";
import { wrappers, transform } from "@core/utils";
import log from "fancy-log";
import getPackageDependencies from "@core/getPackageDependencies";

async function asyncPreload({ babel, eslint, withPackageDependencies = true }: Preload) {
  const checkedEntities: MapEntityWithVersions[] = [];
  const packageDependencies: MapEntityWithVersions[] = withPackageDependencies
    ? getPackageDependencies()
    : [];

  if (babel) {
    const pluginsAndPresets = transform.babelConfig(babel);
    const pluginsAndPresetsMap = await getEntitiesMapWithVersionsAsync(pluginsAndPresets, {
      ...babelMap.plugins,
      ...babelMap.presets,
    });
    checkedEntities.push(...Object.values(pluginsAndPresetsMap));
  }

  if (eslint) {
    const pluginsExtendsAndParser = transform.eslintConfig(eslint);
    const pluginsExtendsAndParserMap = await getEntitiesMapWithVersionsAsync(
      pluginsExtendsAndParser,
      { ...eslintMap.extendsMap, ...eslintMap.parser, ...eslintMap.plugins }
    );
    checkedEntities.push(...Object.values(pluginsExtendsAndParserMap));
  }

  if (checkedEntities.length) {
    log("Packages to install:");
  } else {
    log("No packages need to be installed");
    return;
  }

  const packagesToInstall = [...packageDependencies, ...checkedEntities].reduce(
    (acc, { nameInRegistry, desiredVersion }) => {
      const packageWithVersion = `${nameInRegistry}@${desiredVersion}`;
      log(`- ${packageWithVersion}`);
      return acc + `${packageWithVersion} `;
    },
    ""
  );

  const command = `npm install ${packagesToInstall.trim()} --no-save --no-audit`;

  const output = (await wrappers.asyncExec(command)).stdout;

  log(output.trim());
}

function syncPreload({ babel, eslint, withPackageDependencies = true }: Preload) {
  const checkedEntities: MapEntityWithVersions[] = [];
  const packageDependencies: MapEntityWithVersions[] = withPackageDependencies
    ? getPackageDependencies()
    : [];

  if (babel) {
    const pluginsAndPresets = transform.babelConfig(babel);
    const pluginsAndPresetsMap = getEntitiesMapWithVersionsSync(pluginsAndPresets, {
      ...babelMap.plugins,
      ...babelMap.presets,
    });
    checkedEntities.push(...Object.values(pluginsAndPresetsMap));
  }

  if (eslint) {
    const pluginsExtendsAndParser = transform.eslintConfig(eslint);
    const pluginsExtendsAndParserMap = getEntitiesMapWithVersionsSync(pluginsExtendsAndParser, {
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

  const packagesToInstall = [...packageDependencies, ...checkedEntities].reduce(
    (acc, { nameInRegistry, desiredVersion }) => {
      const packageWithVersion = `${nameInRegistry}@${desiredVersion}`;
      log(`- ${packageWithVersion}`);
      return acc + `${packageWithVersion} `;
    },
    ""
  );

  const command = `npm install ${packagesToInstall.trim()} --no-save --no-audit`;

  const output = wrappers.syncExec(command, { encoding: "utf8" });

  log(output.trim());
}

export { syncPreload, asyncPreload };
