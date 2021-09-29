# Contributing to this repository <!-- omit in toc -->

## Getting started <!-- omit in toc -->

Before you begin:
- This site is powered by React.js.
- Have you read the [code of conduct](CODE_OF_CONDUCT.md)?
- Check out the [existing issues](https://github.com/tuum-tech/getDIDs.com) to see if an issue exists already for the change you want to make.

### Don't see your issue? Open one

If you spot something new, open an issue using a [template](https://github.com/tuum-tech/getDIDs.com/issues/new). We'll use the issue to have a conversation about the problem you want to fix.

### Ready to make a change? Fork the repo

Fork using GitHub Desktop:

- [Getting started with GitHub Desktop](https://docs.github.com/en/desktop/installing-and-configuring-github-desktop/getting-started-with-github-desktop) will guide you through setting up Desktop.
- Once Desktop is set up, you can use it to [fork the repo](https://docs.github.com/en/desktop/contributing-and-collaborating-using-github-desktop/cloning-and-forking-repositories-from-github-desktop)!

Fork using the command line:

- [Fork the repo](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo#fork-an-example-repository) so that you can make your changes without affecting the original project until you're ready to merge them.

Fork with [GitHub Codespaces](https://github.com/features/codespaces):

- [Fork, edit, and preview](https://docs.github.com/en/free-pro-team@latest/github/developing-online-with-codespaces/creating-a-codespace) using [GitHub Codespaces](https://github.com/features/codespaces) without having to install and run the project locally.

### Make your update:
Make your changes to the file(s) you'd like to update. Here are some tips and tricks for using the docs codebase.
  - Are you making changes to the application code? You'll need **Node.js v12 or later** to run the site locally.
  - Are you contributing to markdown? We use GitHub Markdown.

### Open a pull request
When you're done making changes and you'd like to propose them for review, open your PR (pull request).

### Submit your PR & get it reviewed
- Once you submit your PR, others from the Docs community will review it with you. The first thing you're going to want to do is a self review.
- After that, we may have questions, check back on your PR to keep up with the conversation.
- Did you have an issue, like a merge conflict? Check out our [git tutorial](https://lab.github.com/githubtraining/managing-merge-conflicts) on how to resolve merge conflicts and other issues.

### Your PR is merged!
Congratulations! The whole GitHub community thanks you. :sparkles:

Once your PR is merged, you will be proudly listed as a contributor in the [contributor chart](https://github.com/tuum-tech/getDIDs.com/graphs/contributors).

### Keep contributing as you use GitHub Docs

Now that you're a part of the GitHub Docs community, you can keep participating in many ways.

## Types of contributions :memo:

You can contribute to the GitHub Docs content and site in several ways. This repo is a place to discuss and collaborate on getDIDs.com! Our small, but mighty :muscle: docs team is maintaining this repo, to preserve our bandwidth, off topic conversations will be closed.

### :mega: Discussions

Discussions are where we have conversations.

### :beetle: Issues

If you've found something in the content or the website that should be updated, search open issues to see if someone else has reported the same thing. If it's something new, open an issue using a [template](https://github.com/tuum-tech/getDIDs.com/issues/new/choose). We'll use the issue to have a conversation about the problem you want to fix.

### :hammer_and_wrench: Pull requests
A pull request is a way to suggest changes in our repository.

When we merge those changes, they should be deployed to the live site within 24 hours. :earth_africa:

### :question: Support
We are a small team working hard to keep up with the documentation demands of a continuously changing product. 

### :earth_asia: Translations

**We do not currently accept contributions for translated content**, but we hope to in the future.

## Starting with an issue
You can browse existing issues to find something that needs help!

## Opening a pull request
You can use the GitHub user interface :pencil2: for some small changes, like fixing a typo or updating a readme. You can also fork the repo and then clone it locally, to view changes and run your tests on your machine.

## Reviewing
We review every single PR. The purpose of reviews is to create the best content we can for people who use GitHub.

:yellow_heart: Reviews are always respectful, acknowledging that everyone did the best possible job with the knowledge they had at the time.  
:yellow_heart: Reviews discuss content, not the person who created it.  
:yellow_heart: Reviews are constructive and start conversation around feedback.  

### Self review
You should always review your own PR first.

For content changes, make sure that you:
- [ ] Confirm that the changes meet the user experience and goals outlined in the content design plan (if there is one).
- [ ] Compare your pull request's source changes to staging to confirm that the output matches the source and that everything is rendering as expected. This helps spot issues like typos, content that doesn't follow the style guide, or content that isn't rendering due to versioning problems. Remember that lists and tables can be tricky.
- [ ] Review the content for technical accuracy.
- [ ] Review the entire pull request.
- [ ] Copy-edit the changes for grammar and spelling.
- [ ] Check new or updated Liquid statements to confirm that versioning is correct.
- [ ] If there are any failing checks in your PR, troubleshoot them until they're all passing.

### Pull request label
When you open a pull request, you must select the "pull request review" label before we can review your PR. This template helps reviewers understand your changes and the purpose of your pull request.

### Suggested changes
We may ask for changes to be made before a PR can be merged. You can apply suggested changes directly through the UI. You can make any other changes in your fork, then commit them to your branch.

## Windows

This site can be developed on Windows, however a few potential gotchas need to be kept in mind:

1. Regular Expressions: Windows uses `\r\n` for line endings, while Unix based systems use `\n`. Therefore when working on Regular Expressions, use `\r?\n` instead of `\n` in order to support both environments. The Node.js [`os.EOL`](https://nodejs.org/api/os.html#os_os_eol) property can be used to get an OS-specific end-of-line marker.
1. Paths: Windows systems use `\` for the path separator, which would be returned by `path.join` and others. You could use `path.posix`, `path.posix.join` etc and the [slash](https://ghub.io/slash) module, if you need forward slashes - like for constructing URLs - or ensure your code works with either.
1. Bash: Not every Windows developer has a terminal that fully supports Bash, so it's generally preferred to write [scripts](/script) in JavaScript instead of Bash.
1. Filename too long error: There is a 260 character limit for a filename when Git is compiled with `msys`. While the suggestions below are not guaranteed to work and could possibly cause other issues, a few workarounds include:
    - Shorten the path by cloning this repo directly into `C:\`
    - Use a different Git client on Windows
    - Update Git configuration: `git config --system core.longpaths true`
