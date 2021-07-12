# Zume PWA

This is the progressive web app for Zume Project.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Session Format Definition

This project reads session content from the public/sessions directory.
This directory contains an `index.json` file with details about the curriculum.
The index file references `sessions`, `locales` and `assets` that are composed into the curriculum.
Each `session` consists of `sections` and each section consists of `parts`.
A part can be as basic as a `title` and `description` (NOTE: these properties are always abbreviated as `t` and `d` because they appear so frequently). Another property is `info`, which is treated as an info box.
It can be as complex as defined by "part types" made available by the framework.
Part types are React functional components that take the `payload` of the part as its props.
For example, a "Video Part Type" might appear as the following in a section's file:

```
{
    "type": "cta",
    "t": "Download",
    "d": "You will be able to follow along on a PDF for this session.",
    "info": "This text goes in an infobox",
    "payload": {
        "label": "Download Guidebook",
        "url":
          "https://zume.training/wp-content/themes/zume-project-multilingual/downloads/en/33_en_zume_guidebook.pdf"
    },
}
```

## Available Scripts

Note: we are using absolute imports.
You can read more about that [here](https://medium.com/hackernoon/absolute-imports-with-create-react-app-4c6cfb66c35d). The .env file mentioned is deprecated as described [here](https://alligator.io/react/clean-import-statements-in-react/).

In the project directory, you can run:

### `yarn install`
Use yarn to install required dependencies to launch the repo.

### `yarn build`


### `yarn serve`
Local server

### 'firebase serve'

## 'firebase deploy'


### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `npm run storybook`

This project provides some reusable components in the form of a Storybook. Run this command to explore the components and test their different states.

## Deployment

The gitlab-ci.yml is designed to deploy to GitLab pages as well as an sftp server.
You specify certain environment variables to enable it to work on each commit.
For example, to get the setting for the `SSH_KNOWN_HOSTS` variable, you would run a
command like `ssh-keyscan -p2222 zumeproject.sftp.wpengine.com` and save the output in that variable.
This will enable the sftp connection to mirror the built output to the server
where it should be deployed.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
