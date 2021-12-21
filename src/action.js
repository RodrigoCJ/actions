const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN');
    const octokit = github.getOctokit(GITHUB_TOKEN);

    const { context = {} } = github;
    const { pull_request } = context.payload;  
    
    await octokit.rest.issues.createComment({
      owner: payload.repository.owner.login,
      repo: payload.repository.name,
      body: "Hello, World!",
    });
  }


  
  run();