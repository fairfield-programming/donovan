# [![Donovan](https://github.com/fairfield-programming/donovan/blob/master/.github/media/cover.png?raw=true)](https://github.com/fairfield-programming/donovan)

A documentation generator for smart and lazy people.

## Usage

We hate configuration files, long build processes, thousands of dependencies, and all the other nonsense that there is with other tools. So, we built Donovan to be as simple as possible. To generate a documentation website with Donovan, just run `npx donovan`. It's that easy.

Before running, you should [install node](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) so that the npx command is accessible.

```bash
npx donovan
```

### Automating Documentation Generation

If you have a large project on Github and want to automate things, we built Donovan for you too. Just copy the below code into a Github actions file, and you are ready to go.

```yaml
name: Setup Documentation with Donovan

on:
  push:
    branches: ["master"]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout the Current Code
        uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 16
      - name: Generate Docs with Donovan
        run: npx donovan
      - name: Deploy
        uses: s0/git-publish-subdir-action@develop
        env:
          REPO: self
          BRANCH: gh-pages
          FOLDER: public
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

```

### Configuring Your Setup

Sometimes, people want a bit more control over their setups. We built Donovan for you too! And, we built it for those developers who want clean directories. To get additional customization, just add a file called `donovan.json` in your `.github` folder. If you want an example `.github/donovan.json` file, this is the one that [libiii](https://github.com/fairfield-programming/libiii) uses.

```json
{
    "name": "libiii",
    "description": "An embeddable library for the Interpolated Image Interchange format.",
    "template": "https://github.com/fairfield-programming/donovan-spacey",
    "owner": {
        "name": "The Fairfield Programming Association Inc.",
        "website": "https://fairfieldprogramming.org",
        "github": "fairfield-programming"
    },
    "langs": [
        "C"
    ]
}
```

## Contributing 

1. Please make sure that you understand the project and its code before contributing to it. We want to make sure that all submissions are high quality, and work well with the project. This will help us maintain the longevity of the project. 
2. If you are submitting code in response to an Issue, please make sure that you understand what the issue is saying. It's perfectly fine to ask a few questions about what the issue means or is trying to accomplish.
3. The FPA is a strong believer in the idea that kindness makes the world go around. Because of this, we ask that you refrain from using foul language, saying rude comments, or being a mean person in general. If you're wondering if you should say it, ask yourself, "would I say it to a ten-year-old version of myself?"
4. If you're contribution got rejected– don't worry! Tons of awesome things get rejected, but here are some suggestions. We always attach a note when we close a pull request– maybe it's great code but doesn't do what intended, maybe there are a few more changes to be made before it's ready, or maybe it's just not the direction we're taking the project right now. But, in any case, if at first you don't succeed, try, try again. 
