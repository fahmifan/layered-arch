module.exports = {
  web: {
    port: process.env.PORT || 8080,
  },
  logging: {
    appenders: [
      { type: 'console', layout: { type: 'basic' } },
    ],
  },
};
