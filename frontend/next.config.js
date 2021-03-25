module.exports = {
  publicRuntimeConfig: {
    imageDomains: ['www.aceshowbiz.com', 'firebasestorage.googleapis.com'],
  },
  images: {
    domains: ['www.aceshowbiz.com', 'firebasestorage.googleapis.com'],
  },
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    return config
  },
};
