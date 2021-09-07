# JotForm Polls for Microsoft Teams

[![Tests](https://github.com/ambertide/JotFormTeamsApp/actions/workflows/linter.yml/badge.svg)](https://github.com/ambertide/JotFormTeamsApp/actions/workflows/linter.yml)

> a Poll is a a sort of form that supports a subset of JotForm’s full features that is easy to create, share and fill.

JotForm Polls is a Microsoft Teams App that supports creating, sharing and viewing Polls. As a tab app, JotForm Polls is a web app built on React and React-Northstar and is embeded as an iframe to a Microsoft Teams Tab and/or to a task module.

## Building

Due to the nature of the app, you will have to build it twice.

```
git clone https://github.com/ambertide/JotFormTeamsApp.git
npm install
cd tabs
npm install
```

Furthermore, you will have to provide your own `.fx` directory, as well as providing your own client ID in `index.tsx`.

Keep in mind that this will also install a pre-commit hook that will run tests before committing.
