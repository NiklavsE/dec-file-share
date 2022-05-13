require('dotenv').config()

module.exports = {
  migrations_directory: './migrations',
  networks: {
    development: {
      host: 'localhost',
      port: 7545,
      network_id: '*'
    }
  },
  compilers: {
    solc: {
      version: 'pragma',
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
