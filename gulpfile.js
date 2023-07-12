/* eslint-env node */

const gulp = require('gulp');
const glob = require("glob")
const fs = require('fs-extra')

function clean(obj) {
    for (var propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined) {
            delete obj[propName];
        }
    }
    return obj
}


gulp.task('default', function (done) {
    // options is optional
    glob("docs/**/*.md", function (er, files) {
        let result = [];
        let level = { result };

        files.forEach(path => {
            path = path.replace('docs/', '');
            let tags = [];
            path.split('/').reduce((dir, subDir, i, a) => {
                if (!dir[subDir]) {
                    dir[subDir] = { result: [] };
                    if (subDir.endsWith('.md')) {
                        tags.push(subDir.replace('.md', ''));
                        dir.result.push({
                            title: subDir.replace('.md', ''),
                            items: dir[subDir].result,
                            path: path,
                            tags: tags
                        });
                    } else {
                        tags.push(subDir);
                        dir.result.push({
                            title: subDir,
                            items: dir[subDir].result,
                        });
                    }
                }

                return dir[subDir];
            }, level)
        })
        if (result.length > 0) {
            fs.writeJSON('src/meta.json', result);
            fs.writeJSON('src/build.json', {
                buildTime: new Date().toLocaleString(),
                repoUrl: 'https://github.com/sj-net'
            });
        }
    })
    done();
});


var ghpages = require('gh-pages');


gulp.task('pages', function (done) {
    ghpages.publish('gh-pages', {
        branch: 'gh-pages',
        history: false,
        message: `Auto-generated commit. Time - ${new Date().toLocaleString() }`,
        repo: 'https://github.com/sj-net/sj-net.github.io'
    }, (err) => {
        console.log(err);
        console.log(JSON.stringify(err));
     });
    done();
});