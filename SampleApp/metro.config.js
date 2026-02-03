const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    // Allow Metro to resolve .js imports to .ts files in TypeScript source
    sourceExts: ['js', 'jsx', 'json', 'ts', 'tsx', 'cjs', 'mjs'],
    resolveRequest: (context, moduleName, platform) => {
      // If the module ends with .js, try to resolve it as .ts first
      if (moduleName.endsWith('.js')) {
        const tsModuleName = moduleName.replace(/\.js$/, '.ts');
        try {
          return context.resolveRequest(context, tsModuleName, platform);
        } catch (e) {
          // If .ts doesn't exist, fall back to default resolution
        }
      }
      // Default resolution
      return context.resolveRequest(context, moduleName, platform);
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
