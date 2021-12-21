const core = require('@actions/core');
const github = require('@actions/github');
const fetch = require('node-fetch');

async function run() {
    const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN');
    const TENOR_TOKEN = core.getInput('TENOR_TOKEN');

    const randomPos = Math.round(Math.random() * 1000);
    console.log("random ${randomPos}");
    const url = `https://api.tenor.com/v1/search?q=thank%20you&pos=${randomPos}&limit=1&media_filter=minimal&contentfilter=high&key=${TENOR_TOKEN}`;
    console.log("url ${url}");
    const response = await fetch(url);
    console.log("response ${response}");
    const { results } = await response.json();
    console.log("results ${results}");
    const gifUrl = results[0].media[0].tinygif.url;
    console.log("gifUrl ${gifUrl}");
    

    const octokit = github.getOctokit(GITHUB_TOKEN);

    const { context = {} } = github;
    const { pull_request } = context.payload;  
    
    await octokit.rest.issues.createComment({
      ...context.repo,
      issue_number: pull_request.number,
      body: 'Vlw pela pull request, vamos analiza-la o mais rapido possivel\n\n<img src="${gifUrl}" alt="thank you" />',
    });
  }


  
  run();