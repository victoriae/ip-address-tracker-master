var map = L.map('map').setView([51.505, -0.09],13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
var myIcon = L.icon({
  iconUrl: './images/icon-location.svg',
  iconSize: [46, 56],
  iconAnchor: [23, 56]
});
var marker = L.marker([51.5, -0.09], {icon: myIcon}).addTo(map);


// var ip = "8.8.8.8";
// var api_key = "at_9eRG6wSOOxg1SLdMi7ReuMEFF7m3b";
// $(function () {
//    $.ajax({
//        url: "https://geo.ipify.org/api/v1",
//        data: {apiKey: api_key, ipAddress: ip},
//        success: function(data) {
//            $("body").append("<pre>"+ JSON.stringify(data,"",2)+"</pre>");
//        }
//    });
// });