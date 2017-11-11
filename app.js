const yargs = require('yargs')
const axios = require('axios')

const argv = yargs
  .options({
    address: {
      describe: 'Address to fetch pray times for',
      demand: true,
      alias: 'a',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv

const encodedAddress = encodeURIComponent(argv.a)
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`
