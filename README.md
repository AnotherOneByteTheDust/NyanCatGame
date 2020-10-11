# ParcelTemplate

This repository is a Parcel and PostCSS setup done to start easily a simple web project.

## Starting a project using this template

First, you will need to install the *gh* tool.

You can look for more information about this [here](https://cli.github.com/manual/).

Once you have configured the tool with you github account, create a new repository from this template with this command:

```
gh repo create YourNewRepoName -p https://github.com/kevinEliezer/ParcelTemplate
```

## Changes you should do before starting your project

* *package.json:* add your name. If you are going to deploy in gh-pages, you have to add _--public-url <reponame>_ to the build script with parcel.

## Important

PostCSS is fixed to version 7 and some plugins have their version fixed to avoid incompatibilities.