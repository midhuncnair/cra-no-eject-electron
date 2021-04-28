const { when, whenDev, whenProd, whenTest, ESLINT_MODES, POSTCSS_MODES } = require("@craco/craco");

module.exports = {
    reactScriptsVersion: "react-scripts",
    webpack: {
        configure: (webpackConfig, { env, paths }) => {
            let entry_point_decide_val = process.env.ELECTRON_ENTRY;
            // console.log("ELECTRON_ENTRY", entry_point_decide_val);

            // Electron gives support for using node modules such as require, fs, etc.
            // and to utilize that we need to tell the webpack, that the target is electron and not browser.
            // look in package.json script for ``start:react:electron`` && ``build:react:electron``
            // to know how ELECTRON_ENTRY is passed.
            if (entry_point_decide_val === 'react-electron-render') {
                webpackConfig.target = 'electron-renderer';
                delete webpackConfig['node'];
            }

            // console.log("The webpackConfig = ", webpackConfig);
            return webpackConfig;
        },
    }
}