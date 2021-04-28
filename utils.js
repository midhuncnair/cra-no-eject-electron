const fs = require('fs');
const path = require('path');
const terser = require("terser");

const BaseDir = process.cwd();
let myCwd = __dirname;

if (BaseDir != myCwd) {
    console.warn("The BaseDir in process and the __dirname in file is different; I hope you know what you are doing");
    myCwd = BaseDir;
}

const copy = function (src, dst) {
    const srcPath = path.join(
        myCwd,
        ...src
    );

    const dstPath = path.join(
        myCwd,
        ...dst
    );

    fs.copyFileSync(srcPath, dstPath);
    console.log("File copied from '", srcPath, "' to '", dstPath, "' successfully");
}

const move = function (src, dst) {
    const srcPath = path.join(
        myCwd,
        ...src
    );

    const dstPath = path.join(
        myCwd,
        ...dst
    );

    fs.renameSync(srcPath, dstPath);
    console.log("File moved from '", srcPath, "' to '", dstPath, "' successfully");
}


const deleteItem = function(src) {
    const srcPath = path.join(
        myCwd,
        ...src
    );
    fs.unlinkSync(srcPath);
}


const minify = function (src, dst) {

    const srcPath = path.join(
        myCwd,
        ...src
    );

    const dstPath = path.join(
        myCwd,
        ...dst
    );

    const code = fs.readFileSync(
        srcPath,
        {
            encoding:'utf8',
            flag:'r'
        }
    );

    let terserOptions = {
        ecma: 5,
        parse: {
            // We want terser to parse ecma 8 code. However, we don't want it
            // to apply any minification steps that turns valid ecma 5 code
            // into invalid ecma 5 code. This is why the 'compress' and 'output'
            // sections only apply transformations that are ecma 5 safe
            // https://github.com/facebook/create-react-app/pull/4234
            ecma: 8,
        },
        compress: {
            ecma: 5,
            warnings: false,
            // Disabled because of an issue with Uglify breaking seemingly valid code:
            // https://github.com/facebook/create-react-app/issues/2376
            // Pending further investigation:
            // https://github.com/mishoo/UglifyJS2/issues/2011
            comparisons: false,
            // Disabled because of an issue with Terser breaking valid code:
            // https://github.com/facebook/create-react-app/issues/5250
            // Pending further investigation:
            // https://github.com/terser-js/terser/issues/120
            inline: 2,
        },
        mangle: {
            safari10: true,
        },
        // Added for profiling in devtools
        keep_classnames: false,
        keep_fnames: false,
        output: {
            ecma: 5,
            beautify: false,
            comments: false,
            // Turned on because emoji and regex is not minified properly using default
            // https://github.com/facebook/create-react-app/issues/2488
            ascii_only: true,
        },
        sourceMap: { asObject: true },

        ie8: undefined,
        module: undefined,
        nameCache: undefined,
        safari10: undefined,
        toplevel: undefined,

    }

    let minResult = terser.minify(code, terserOptions);
    // console.log("minResult = ", minResult.code);
    fs.writeFileSync(
        dstPath,
        minResult.code,
        'utf8',
    );

}

let args = process.argv;
args.splice(0, 2);

if (args[0] == 'move') {
    move(args[1].split('/'), args[2].split('/'));
} else if (args[0] == 'copy') {
    copy(args[1].split('/'), args[2].split('/'));
} else if (args[0] == 'delete') {
    deleteItem(args[1].split('/'));
} else if (args[0] == 'minify') {
    minify(args[1].split('/'), args[2].split('/'))
}
