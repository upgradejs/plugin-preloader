import log from "fancy-log";
import { BabelConfig, Entity } from "@core/types";

function transformBabelConfig(config: BabelConfig): Entity[] {
  const itemsToProcess = new Map();

  const { presets = [], plugins = [], env = {} } = config;

  const pluginsAndPresets = [
    ...(Array.isArray(presets) ? presets : []),
    ...(Array.isArray(plugins) ? plugins : []),
  ];

  Object.values(env).forEach((envConfig) => {
    pluginsAndPresets.push(
      ...(Array.isArray(envConfig.plugins) ? envConfig.plugins : []),
      ...(Array.isArray(envConfig.presets) ? envConfig.presets : [])
    );
  });

  for (const pluginOrPreset of pluginsAndPresets) {
    if (typeof pluginOrPreset === "string") {
      if (!itemsToProcess.has(pluginOrPreset)) {
        itemsToProcess.set(pluginOrPreset, pluginOrPreset);
      }
    } else if (Array.isArray(pluginOrPreset)) {
      if (!itemsToProcess.has(pluginOrPreset[0])) {
        itemsToProcess.set(
          pluginOrPreset[0],
          typeof pluginOrPreset[3] === "string"
            ? [pluginOrPreset[0], pluginOrPreset[3]]
            : pluginOrPreset[0]
        );
      }
    } else {
      log.error("This type of declaring the plugin is not supported yet");
    }
  }

  return [...itemsToProcess.values()];
}

export default transformBabelConfig;
