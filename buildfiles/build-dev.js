const minify = require('@node-minify/core');
const noCompress = require('@node-minify/no-compress');

function mergeHtml(next) {
    minify({
    compressor: noCompress,
    input: ['header-dev.html', 'content.html', 'footer.dev.html'],
    output: './buildfiles/index-dev.html',
    callback: function(err, min) { if (!err && next) next(); }
    });
}

mergeHtml();