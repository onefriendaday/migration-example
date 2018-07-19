# About

Nodejs example that shows how to use Storyblok's management api to migrate content from a json.

# Installation

```
npm install
```

# How to use

1. Set the environment variable `STORYBLOK_OAUTH` to your Storyblok oauth token (We recommend to create a specific API user for this). You can manage personal access tokens under the my account section of Storyblok.
2. Execute `STORYBLOK_OAUTH=..... TARGET_SPACE=.... node index.js`