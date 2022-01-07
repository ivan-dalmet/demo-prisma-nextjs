# Demo Prisma NextJS

⚠️ This repo is not a final example but the code made during a live on [twitch.tv/bearstudiolive](https://www.twitch.tv/bearstudiolive)

## Installation

```bash
yarn install
yarn build
```

## Development

```bash
yarn dev
```

### Storybook

```bash
yarn storybook
```

## Show hint on development environments

Setup the `NEXT_PUBLIC_DEV_ENV_NAME` env variable with the name of the environment.

```
NEXT_PUBLIC_DEV_ENV_NAME=staging
NEXT_PUBLIC_DEV_ENV_COLOR_SCHEME=teal
```

## Production

```bash
yarn storybook:build # Optional: Will expose the Storybook at `/storybook`
yarn build
yarn start
```
