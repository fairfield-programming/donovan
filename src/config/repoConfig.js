const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch-commonjs')

const { execSync } = require('child_process')

const marked = require('marked');

function findRootName() {

    return path.basename(process.cwd())

}

function findReadmeContents() {

    const filePaths = fs.readdirSync(process.cwd())
    const readmePaths = filePaths.filter(i => i.toLowerCase().startsWith('readme')).sort((a, b) => a.length - b.length)
    const readmePath = readmePaths[0]

    if (readmePath == undefined) return "";

    return fs.readFileSync(readmePath, 'utf-8');

}

function getRemoteUrls() {

    try {

        return execSync(`git config --get remote.origin.url`).toString().split('\n');

    } catch (e) {

        return [];

    }

}

async function defaultRepoConfig() {

    const readmeContents = findReadmeContents();
    const readmeAST = marked.lexer(readmeContents);
    
    const remoteUrl = getRemoteUrls()[0] || "";
    let repoName = "";
    let ownerName = "";

    if (remoteUrl.includes("github.com")) {

        const remoteParts = remoteUrl.split(/[\/\.]/);

        repoName = remoteParts[remoteParts.length - 2];
        ownerName = remoteParts[remoteParts.length - 3];

    }

    const repoRequestInfo = await fetch(`https://api.github.com/repos/${ownerName}/${repoName}`);
    const repoInfo = await repoRequestInfo.json();

    return {
        name:  findRootName(),
        description: repoInfo?.description || "This is a really simple description for a project.",
        template: "https://github.com/fairfield-programming/donovan-spacey",
        owner: {
            name: repoInfo?.owner?.login || "Unknown Owner",
            website: repoInfo?.owner?.html_url || "",
            github: repoInfo?.owner?.login || ""
        },
        langs: []
    };

}

async function cleanRepoConfig(config) {

    const _default = await defaultRepoConfig();

    if (config == undefined) return _default;
    if (typeof config != 'object') return _default;

    return {
        "name": config.name || _default.name,
        "description": config.description || _default.description,
        "template": config.template || _default.template,
        "owner": config.owner || _default.owner,
        "langs": config.langs.map(e => e.toLowerCase()) || _default.langs,
    };

}

async function findRepoConfig() {

    const configPath = path.join(process.cwd() + "/.github/donovan.json");

    if (!fs.existsSync(configPath)) return await defaultRepoConfig();

    const configData = fs.readFileSync(configPath, 'utf-8');
    const configJson = JSON.parse(configData);

    return await cleanRepoConfig(configJson);

}

module.exports = {
    defaultRepoConfig,
    findRepoConfig,
    cleanRepoConfig
}