// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withSentryConfig } = require("@sentry/nextjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  sentry: {
    hideSourceMaps: true,
    disableServerWebpackPlugin: process.env.NEXT_PUBLIC_ENV === "development",
    disableClientWebpackPlugin: process.env.NEXT_PUBLIC_ENV === "development",
  },
};

const sentryWebpackPluginOptions = {
  silent: false,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
};

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
