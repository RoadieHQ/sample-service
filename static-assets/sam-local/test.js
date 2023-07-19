"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const yaml = __importStar(require("yaml"));
const fs = __importStar(require("fs"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const github_1 = require("@actions/github");
const github = __importStar(require("@actions/github"));
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    const baseUrl = core.getInput('backstage-api-endpoint');
    const catalogInfoPath = core.getInput('catalog-info-path');
    const apiToken = core.getInput('api-token');
    if (!apiToken || apiToken === '') {
        core.setFailed(`No api-token input value found.`);
        console.warn(`No api-token input value found. Cannot continue.`);
        return;
    }
    const getDocsPath = (path, fileName) => {
        const filePath = `${path}/${fileName}`;
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            const doc = yaml.parseDocument(content);
            if (doc == null || doc == undefined) {
                core.setFailed(`No mkdocs file matching the path ${filePath} found`);
                console.warn(`No mkdocs file matching the path ${filePath} found`);
                return;
            }
            const docContent = doc.toJS();
            const docsPath = `${path}/${(docContent === null || docContent === void 0 ? void 0 : docContent.docs_dir) || 'docs'}`;
            if (docsPath.startsWith('./')) {
                return docsPath.substring(2);
            }
            return docsPath;
        }
        catch (e) {
            core.setFailed(`No mkdocs file matching the path ${filePath} found due to error ${e}`);
            console.warn(`No mkdocs file matching the path ${filePath} found due to error ${e}`);
            return;
        }
    };
    const checkIfDocsUpdated = (parsedDocs) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e;
        const githubToken = core.getInput('github-token');
        if (!githubToken) {
            console.warn(`No github token found - skipping checking if docs were updated or not.`);
            return Promise.resolve(true);
        }
        const repoName = (_a = github_1.context.payload.repository) === null || _a === void 0 ? void 0 : _a.name;
        const orgName = (_b = github_1.context.payload.organization) === null || _b === void 0 ? void 0 : _b.login;
        if (!repoName || !orgName) {
            console.warn(`Missing context info from webhook - skipping checking if docs were updated or not.`);
            return Promise.resolve(true);
        }
        const backstageDocsPaths = parsedDocs
            .map(doc => { var _a; return (_a = doc.metadata.annotations) === null || _a === void 0 ? void 0 : _a['backstage.io/techdocs-ref']; })
            .map(value => {
                if (value.startsWith('dir:')) {
                    const filePath = value.slice(4);
                    return getDocsPath(filePath, 'mkdocs.yml');
                }
                console.warn(`Techdocs annotation ${value} not a dir.`);
                return;
            });
        console.log(`Backstage docs paths found: ${backstageDocsPaths}`);
        // TODO: Add Pagination for PRS with many commits
        const octokit = github.getOctokit(githubToken);
        const res = yield octokit.request('GET /repos/{owner}/{repo}/compare/{basehead}', {
            owner: orgName,
            repo: repoName,
            basehead: `${(_c = github_1.context.payload.pull_request) === null || _c === void 0 ? void 0 : _c.base.ref}...${(_d = github_1.context.payload.pull_request) === null || _d === void 0 ? void 0 : _d.head.ref}`,
            per_page: 100,
        });
        const filesChanged = (_e = res.data.files) === null || _e === void 0 ? void 0 : _e.map((f) => f === null || f === void 0 ? void 0 : f.filename);
        console.log(`${filesChanged === null || filesChanged === void 0 ? void 0 : filesChanged.length} changed files`);
        console.log(`File change paths: ${filesChanged}`);
        const docsUpdated = filesChanged === null || filesChanged === void 0 ? void 0 : filesChanged.find((filePath) => backstageDocsPaths
            .find((docPath) => docPath && (filePath === null || filePath === void 0 ? void 0 : filePath.startsWith(docPath))));
        return docsUpdated;
    });
    try {
        // TODO: Add support for mono-repos via glob matching
        const content = fs.readFileSync(catalogInfoPath, 'utf8');
        const docs = yaml.parseAllDocuments(content);
        if (docs == null || docs == undefined || docs.length < 1) {
            core.setFailed(`No catalog-info file matching the path ${catalogInfoPath} found`);
            console.warn(`No catalog-info file matching the path ${catalogInfoPath} found`);
            return;
        }
        const parsedDocs = docs.map(yamlDoc => yamlDoc.toJS());
        // TODO: Make conditional update check optional
        if (!(yield checkIfDocsUpdated(parsedDocs))) {
            console.log(`No changes to doc files found - skipping sync`);
            return;
        }
        const syncRequestsData = parsedDocs
            .filter(doc => { var _a; return (_a = doc.metadata.annotations) === null || _a === void 0 ? void 0 : _a['backstage.io/techdocs-ref']; })
            .map(doc => {
                const namespace = doc.metadata.namespace || 'default';
                const name = doc.metadata.name;
                const kind = doc.kind.toLowerCase();
                console.log(`Found entity ${doc.kind}:${doc.metadata.namespace || 'default'}/${doc.metadata.name} with techdocs ref`);
                return {
                    url: `${baseUrl}/api/techdocs/sync/${namespace}/${kind}/${name}`,
                    name: name,
                    namespace: namespace,
                    kind: kind
                };
            });
        yield Promise.allSettled(syncRequestsData.map((requestData) => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, node_fetch_1.default)(requestData.url, { headers: { 'Authorization': `Bearer ${apiToken}` } });
            if (!res.ok) {
                console.error(`Sync failed for ${requestData.url} with ${res.status}: ${res.body}`);
            }
            if (res.ok) {
                console.log(`Synced Roadie techdocs for entity ${requestData.kind}:${requestData.namespace}/${requestData.name}`);
            }
            return res;
        })));
    }
    catch (error) {
        core.setFailed(error.message);
    }
});
run();
//# sourceMappingURL=index.js.map