// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withSentryConfig } = require("@sentry/nextjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  sentry: {
    hideSourceMaps: true,
    disableServerWebpackPlugin: process.env.NEXT_PUBLIC_ENV === "development",
    disableClientWebpackPlugin: process.env.NEXT_PUBLIC_ENV === "development",
  },
  images: {
    domains: [process.env.NEXT_PUBLIC_IMAGE_DOMAIN],
  },
};

const sentryWebpackPluginOptions = {
  silent: false,
  authToken: process.env.NEXT_PUBLIC_SENTRY_AUTH_TOKEN,
  org: process.env.NEXT_PUBLIC_SENTRY_ORG,
  project: process.env.NEXT_PUBLIC_SENTRY_PROJECT,
};

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
