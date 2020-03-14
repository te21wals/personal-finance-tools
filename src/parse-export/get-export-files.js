const { resolve } = require('path');
const { readdir } = require('fs').promises;

// https://qwtel.com/posts/software/async-generators-in-the-wild/
async function* getExports(dir) {
    const dirents = await readdir(dir, { withFileTypes: true });
    for (const dirent of dirents) {
        const filepath = resolve(dir, dirent.name);
        if (dirent.isDirectory()) {
            yield* getExports(filepath);
        } else {
            const exportType = dir.split('/').pop();
            yield { filepath, exportType };
        }
    }
}

module.exports = { getExports };
