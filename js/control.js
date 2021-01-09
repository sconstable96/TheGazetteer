// Description: A simple scale control that shows the scale of the current center of screen in metric (m/km) and imperial (mi/ft) systems
// Source: https://leafletjs.com/reference-1.7.1.html#control-scale
// Implementation: Added Scale at the bottom left of the map.
L.control.scale().addTo(map);

// Description: A basic zoom control with two buttons (zoom in and zoom out)
// Source: https://leafletjs.com/reference-1.7.1.html#control-zoom
// Implementation: Setting Zoom control (+, -) on the top right of the map
map.zoomControl.setPosition("topright");

//Ajax for loading the country info
function LoadCountryInfo(name) {
  if ($("#country_info").css("left") !== "5px") {
    $("#country_info").animate({ left: "5px" }, 1000);
  }
  $("#country_info").block({
    message: '<img src="https://i.stack.imgur.com/FhHRx.gif" />',
  });

  $.ajax({
    url: "php/getData.php",
    type: "POST",
    data: "country=" + name,
    success: function (response) {
      $("#country_info").unblock();
      var output = $.parseJSON(response);
      // let output = JSON.parse(response);
      // console.log(output);
      $("#country_info").html(output.countryHtml); //Adding demographic information of displayed country
      $("#covid_data").html(output.covid_data); // Sending data to Covid Modal
      $("#weather_data").html(output.weather_data); // Sending data to Weather Modal
      $("#news_data").html(output.news_data); // Sending data to News Modal
      $("#country_info").height($("#country_info .card").height());
      $("#country_info .card-body").height($(window).height() - 71 - 10);
    },
  });
}
