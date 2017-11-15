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

let lat, lng, timestamp

axios.get(geocodeUrl)
  .then(res => {
    lat = res.data.results[0].geometry.location.lat
    lng = res.data.results[0].geometry.location.lng
    let formattedAddress = res.data.results[0].formatted_address

    let timestampUrl = 'http://api.aladhan.com/currentTimestamp?zone=Asia/Jakarta'

    console.log(`Address : ${formattedAddress}`)

    return axios.get(timestampUrl)
  })
  .then(res => {
    timestamp = res.data.data

    let prayTimeUrl = `http://api.aladhan.com/timings/${timestamp}?latitude=${lat}&longitude=${lng}&method=1`

    return axios.get(prayTimeUrl)
  })
  .then(res => {
    let prayTime = res.data.data.timings

    console.log('Sholah Prayer Time : ')
    console.log(`- Subuh : ${prayTime.Fajr}`)
    console.log(`- Dzuhur : ${prayTime.Dhuhr}`)
    console.log(`- 'Asar : ${prayTime.Asr}`)
    console.log(`- Magrib : ${prayTime.Maghrib}`)
    console.log(`- Isya' : ${prayTime.Isha}`)
  })
