const PROXY_CONFIG = [
  {
    context: ['/api'],
    target: 'http://localhost:9000/api/',
    secure: false,
    logLevel: 'debug',
    pathRewrite: { '^/api': '' }
  }
]

module.exports = PROXY_CONFIG;
