// Map and Geo API scripts

// Setting def variables
const apiKey = "at_9eRG6wSOOxg1SLdMi7ReuMEFF7m3b",
  input = document.getElementById('input-ip'),
  button = document.getElementById('button'),
  ipHtml = document.getElementById('ip'),
  addressHtml = document.getElementById('location'),
  postalcodeHtml = document.getElementById('postalcode'),
  timezoneHtml = document.getElementById('timezone'),
  ispHtml = document.getElementById('isp')

let map = L.map('map')

// Send input when user press button
button.addEventListener('click', function (event) {
  event.preventDefault();
  noEmptyValidation()
})

// Send input when user use Enter key
input.addEventListener("keyup", function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    noEmptyValidation()
  }
})

// Validates that user doesn't send an empty value
const noEmptyValidation = () => {
  let inputValue = input.value

  if (inputValue !== '') {
    input.classList.remove('error')
    searchData(inputValue)
  } else {
    input.classList.add('error')
  }
}

// Check if the value sent by the user is a valid ip
const ipValidation = inputValue => {
  return /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/ig.test(inputValue)
}

// Shows fetched data
const setData = (ip, address, postalcode, timezone, isp, lat, lng) => {
  ipHtml.innerHTML = ip
  addressHtml.innerHTML = address
  postalcodeHtml.innerHTML = postalcode
  timezoneHtml.innerHTML = timezone
  ispHtml.innerHTML = isp
  map.remove()

  showMap(lat, lng)
}

// Show map with given latitude and longitude
const showMap = (lat, lng) => {
  map = L.map('map').setView([lat, lng], 13)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map)
  var myIcon = L.icon({
    iconUrl: './images/icon-location.svg',
    iconSize: [46, 56],
    iconAnchor: [23, 56]
  });
  var marker = L.marker([lat, lng], { icon: myIcon }).addTo(map)
}

/**
 * Search data - displays the map and the required
 * values depending on the search criteria
 */
const searchData = async (inputValue) => {
  let searchCriteria = ''

  if (inputValue) {
    let isIpAddress = ipValidation(inputValue)
    searchCriteria = (isIpAddress) ? '&ipAddress=' : '&domain='
    searchCriteria += inputValue
  }

  try {
    let response = await fetch(`https://geo.ipify.org/api/v1?apiKey=${apiKey + searchCriteria}`)

    if (response.ok) {
      let data = await response.json()
      setData(data.ip, `${data.location.city}, ${data.location.country}`, data.location.postalCode, `UTC ${data.location.timezone}`, data.isp, data.location.lat, data.location.lng)    
    } else {
      setData('192.212.174.101', 'Brooklyn, NY', '10001', 'UTC -05:00', 'SpaceX Starlink', 40.68, -73.95)
      console.error(`${error}`)
    }
  } catch(e) {
    console.log(e);
  }
}

searchData()
