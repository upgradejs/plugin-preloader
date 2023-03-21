import { MapEntityWithVersions, Preload } from "./types";
import { babelMap, eslintMap } from './maps';
import { getEntitiesMapWithVersionsSync, getEntitiesMapWithVersionsAsync } from "./getEntitiesMapWithVersions";
import { wrappers } from "./utils";

async function asyncPreload({ babel, eslint }: Preload) {
  const checkedEntities: MapEntityWithVersions[] = [];

	if (babel) {
		if (babel.plugins) {
      const pluginsMap = await getEntitiesMapWithVersionsAsync(babel.plugins, babelMap.plugins);
      checkedEntities.push(...Object.values(pluginsMap));
    }

		if (babel.presets) {
      const presetsMap = await getEntitiesMapWithVersionsAsync(babel.presets, babelMap.presets);
      checkedEntities.push(...Object.values(presetsMap))
		}
	}

	if (eslint) {
		if (eslint.extends) {
      const extendsMap = await getEntitiesMapWithVersionsAsync(eslint.extends, eslintMap.extendsMap);
      checkedEntities.push(...Object.values(extendsMap))
		}

		if (eslint.parser) {
      const parserMap = await getEntitiesMapWithVersionsAsync([eslint.parser], eslintMap.parser);
      checkedEntities.push(...Object.values(parserMap))
		}

    if (eslint.plugins) {
      const pluginsMap = await getEntitiesMapWithVersionsAsync(eslint.plugins, eslintMap.plugins);
      checkedEntities.push(...Object.values(pluginsMap))
    }
	}

  const packagesToInstall = checkedEntities.reduce((acc, { nameInRegistry, desiredVersion, currentVersion }) => acc + `${nameInRegistry}@${desiredVersion} `, '');

  const command = `npm install ${packagesToInstall} --no-save --no-audit`;

  const output = (await wrappers.asyncExec(command)).stdout;

  console.log(output);
}

function syncPreload({ babel, eslint, performAsync = true }: Preload) {
  const checkedEntities: MapEntityWithVersions[] = [];

  if (babel) {
    if (babel.plugins) {
      const pluginsMap = getEntitiesMapWithVersionsSync(babel.plugins, babelMap.plugins);
      checkedEntities.push(...Object.values(pluginsMap));
    }

    if (babel.presets) {
      const presetsMap = getEntitiesMapWithVersionsSync(babel.presets, babelMap.presets);
      checkedEntities.push(...Object.values(presetsMap))
    }
  }

  if (eslint) {
    if (eslint.extends) {
      const extendsMap = getEntitiesMapWithVersionsSync(eslint.extends, eslintMap.extendsMap);
      checkedEntities.push(...Object.values(extendsMap))
    }

    if (eslint.parser) {
      const parserMap = getEntitiesMapWithVersionsSync([eslint.parser], eslintMap.parser);
      checkedEntities.push(...Object.values(parserMap))
    }

    if (eslint.plugins) {
      const pluginsMap = getEntitiesMapWithVersionsSync(eslint.plugins, eslintMap.plugins);
      checkedEntities.push(...Object.values(pluginsMap))
    }
  }

  const packagesToInstall = checkedEntities.reduce((acc, { nameInRegistry, desiredVersion, currentVersion }) => acc + `${nameInRegistry}@${desiredVersion} `, '');

  const command = `npm install ${packagesToInstall} --no-save --no-audit`;

  const output = wrappers.syncExec(command, { encoding: 'utf8' });

  console.log(output);
}

export { syncPreload, asyncPreload };
