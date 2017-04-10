var sports = ["Soccer", "Football", "Basketball", "Rugby", "Hockey", "Fencing", "Archery", "Swimming", "Tennis", "Baseball", "Volleyball", "Racing", "Lacrosse", "Diving", "Golf", "Croquet", "Chess", "Gymnastics"];

/**
 * Displays gifs for the clicked sport button
 */
function displayGifs() {
  // this refers to sport button clicked
  removeClickedClass();
  $(this).addClass("clicked");
  var sport = $(this).attr("sport-name");
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + sport + "&api_key=dc6zaTOxFJmzC&limit=10&rating=pg-13";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    // clear out gifs area
    $("#gifs").empty();
    var gifs = response.data;
    // iterate through result of 10 gifs received from API call
    $.each(gifs, function(index, gif) {
      // create divs with gif and rating
      var containerDiv = $('<div class="gif-div">');
      var imgElement = $('<img class="gif-img">');
      var ratingElement = $('<p class="rating">');
      imgElement.attr("src", gif.images.fixed_height_still.url);
      imgElement.attr("type", "paused");
      ratingElement.html("Rating: " + gif.rating.toUpperCase());
      containerDiv.append(imgElement);
      containerDiv.append(ratingElement);

      $("#gifs").append(containerDiv);

      // on click event handler for when gif is clicked
      imgElement.on("click", function() {
        var src = $(this).attr("type");
        // if gif is still, change src to gif that is playing
        // otherwise, change it to still gif
        if (src.includes("paused")) {
          $(this).attr("type", "playing");
          $(this).attr("src", gif.images.fixed_height.url);
        } else {
          $(this).attr("type", "paused");
          $(this).attr("src", gif.images.fixed_height_still.url);
        }
      });
    });
  });
}

/**
 * Buttons in sports array are rendered in the page
 */
function renderButtons() {
  $("#sports-buttons").empty();

  $.each(sports, function(index, sport) {
    var buttonElement = $("<button>");
    buttonElement.addClass("sport");
    buttonElement.attr("sport-name", sport);
    buttonElement.text(sport);
    buttonElement.appendTo("#sports-buttons");
  });
}

// Removes the clicked class from all buttons
function removeClickedClass() {
  $.each(sports, function(index, sport) {
    $("button[sport-name=\"" + sport + "\"]").removeClass("clicked");
  });
}

// on click event handler for Go! button to add
// sport button to list
$("#add-sport").on("click", function(event) {
  event.preventDefault();
  var sport = $("#sport-input").val().trim();
  sports.push(sport);
  $("#sport-input").val("");

  renderButtons();
});

// on click event handler for sport buttons
$(document).on("click", ".sport", displayGifs);

renderButtons();
