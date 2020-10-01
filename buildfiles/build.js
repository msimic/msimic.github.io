const minify = require('@node-minify/core');
const noCompress = require('@node-minify/no-compress');
const cleanCSS = require('@node-minify/clean-css');
const terser = require('@node-minify/terser');
const htmlMinifier = require('@node-minify/html-minifier');

function minifyHtml(next) {
    minify({
        compressor: htmlMinifier,
        input: './buildfiles/index-prod.html',
        output: './dist/index.html',
        options: {
            'minifyURLs': true,
            'collapseWhitespace': true,
            'collapseInlineTagWhitespace': false,
            'caseSensitive': false,
            'minifyJS': true,
            'minifyCSS': true,
            'sortAttributes': true,
            'sortClassName': true,
        },
        callback: function(err, min) {if (!err && next) next();}
      });
}

function minifyJs(next) {
    minify({
        compressor: terser,
        input: ['./sitefiles/iv-viewer.min.js', './sitefiles/jquery-3.2.1.min.js', './sitefiles/plugins.min.js', './sitefiles/rplayer.js', './sitefiles/simplebar.min.js', './sitefiles/main.js'],
        output: './sitefiles/all.js',
        callback: function(err, min) { if (!err && next) next();}
      });
}

function minifyCss(next) {
    minify({
        compressor: cleanCSS,
        input: ['./sitefiles/berkshire.css', './sitefiles/yantramanov.css', './sitefiles/iv-viewer.min.css', './sitefiles/plugins.min.css', './sitefiles/simplebar.min.css', './sitefiles/style.css'],
        output: './sitefiles/all.css',
        callback: function(err, min) { if (!err && next) next();}
      });
}

function mergeHtml(next) {
    minify({
    compressor: noCompress,
    input: ['header.html', 'content.html', 'footer.html'],
    output: './buildfiles/index-prod.html',
    callback: function(err, min) { if (!err && next) next(); }
    });
}

mergeHtml(() => minifyCss(() => minifyJs(() => minifyHtml())));