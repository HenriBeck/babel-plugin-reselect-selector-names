declare module '@babel/helper-plugin-utils' {
  import { PluginObj, ConfigAPI } from '@babel/core';

  export function declare(pluginCreator: (api: ConfigAPI) => PluginObj): PluginObj;
}
