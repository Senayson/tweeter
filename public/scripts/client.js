/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  //Validation error message hidden at document loading
  $("#validator").hide();
  //Function to escape XSS
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  //Function creates tweet elements
  const createTweetElement = function(tweetObj) {
    const $tweet = $(`
  <article class="tweet">
        <div class='header'>
          <h4> <img src=${tweetObj.user.avatars}>  ${tweetObj.user.name}</h4>
          <span>${tweetObj.user.handle}</span>
        </div>
        <p>${escape(tweetObj.content.text)}</p>
        <hr>
        <footer class="tweeter">
          <span class="Timestamp" datetime="2016-07-07T09:24:17Z">${tweetObj.created_at}</span>
          <div class="icons"><i class="fas fa-flag"></i> <i class="fas fa-retweet"></i> <i class="fas fa-heart"></i>
          </div>
        </footer>
      </article>`);
    return $tweet;
  };

  //Function renders all tweets
  const renderTweets = function(data) {

    for (const tweet of data) {
      const $tweet = createTweetElement(tweet);
      $('.tweetContainer').prepend($tweet);
    }

  }

  const loadTweets = function(url) {
    return $.ajax({
      url: url,
      method: 'GET',
      dataType: 'json'
    })
      .then(function(data) {
        $('.tweetContainer').empty();
        renderTweets(data); // -> undefined
      })
  }
  loadTweets('/tweets');
  //function to return validation error
  const validationError = function (errorMessage) {
    $("#validator").text(errorMessage).slideDown('slow');
    setTimeout(() => {
      $("#validator").hide()
    }, 5000)

  }
  //function to validate userinput
  const validator = function(userInput) {
    if (userInput === null || userInput === '') {
      validationError("Please enter something");
      return false;
    }

    if (userInput && userInput.length > 140) {
      validationError("Under 140 characters please");
      return false;
    }
    return true;
  }

  //Event handler for the form
  $("form").on('submit', function(event) {
    //prevent refresh page and data transmission
    event.preventDefault();
    //Change data to queryformat
    const data = ($(this).serialize());
    console.log($(this).children('.tweet-text').val());

    //Validation against empty data or overlimit character usage
    const userInput = $(this).children('.tweet-text').val();
    //If validation failed, return false and exit form
    if (!validator(userInput)) {
      return false;
    }
    //post request for the new tweet
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: data
    })
      .then(function () {
        //
        return loadTweets('/tweets')

      })
    $('form')[0].reset();
  });
});