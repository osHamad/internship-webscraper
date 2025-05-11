# Contribution Guidelines

In this page, you will find some instructions, "how-to's" and guidelines for anyone who is contributing to this project

## What to contribute
### Creating an issue
If you notice something wrong (bug, documentation, fix) or you wish to add a feature (enhancement, feature), you may create an issue

### Creating a pull request
Contributions to this project are limited to resolving issues in the [Issues](https://github.com/osHamad/internship-webscraper/issues) tab. You MAY NOT submit a pull request unless it references an existing issue.

## Forking and cloning

Just like any other repo, you must fork and clone this repo to contribute

Visit the [Home Page](https://github.com/osHamad/internship-webscraper) of this repo, then click "Fork"

Then clone your copy locally to your machine:

```bash
git clone https://github.com/<your-username>/internship-webscraper.git
```
To get the project running, follow the instructions in the [README](https://github.com/osHamad/internship-webscraper/blob/master/README.md#setup-node-dependencies) file starting from "setup node dependencies"

## Create your branch
To create a new branch on your local machine (so you may add your contribution), run:
```bash
git checkout -b your-branch-name
```
### Naming branches
Your branches must follow the naming convention bellow:
```bash
<issue-number>-<short-issue-name>
```
`issue-number` is the number of the issue you are contributing to without a hashtag

`short-issue-name` is the title of the issue, summarized in 2-3 words, separated with commans. i.e. "Create a CSS popup notification template" ---> "create-notification"

## Create a pull request
### Local setup
First, you must add the original repo (not the forked one) as an upsteam on your git locally:
```bash
git remote add upstream https://github.com/original-user/original-repo.git
```
### Pulling from local
After you have [created your branch](#create-your-branch) and commited your changes to it, you may push your changes:
```bash
git push origin feature/your-change-name
```
Now, if you go to your forked GitHub repo, you will see a message that says "Compare & pull request"

Make sure you see `base: <your-branch-name <-- compare: <your-branch-name>`

In the description:
- Add `Closes <issue-num>`, where `<issue-num>` is the number of the issue you are working on, INCLUDING THE #
- Add a description of each change you made, i.e. what you added, deleted, refactored, fixed, etc.

After you submit the PR, it will be reviewed. It will be rejected and commented on, if changes must be made.
