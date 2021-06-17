/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {

  // const data = [
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": "https://i.imgur.com/73hZDYK.png"
  //       ,
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": "https://i.imgur.com/nlhLi3I.png",
  //       "handle": "@rd"
  //     },
  //     "content": {
  //       "text": "Je pense , donc je suis"
  //     },
  //     "created_at": 1461113959088
  //   }
  // ]

  const createTweetElement = function (tweetObj) {
    const $tweet = $(`
  <article class="tweet">
        <div class='header'>
          <h4> <img src=${tweetObj.user.avatars}>  ${tweetObj.user.name}</h4>
          <span>${tweetObj.user.handle}</span>
        </div>
        <p>${tweetObj.content.text}</p>
        <hr>
        <footer class="tweeter">
          <span class="need_to_be_rendered" datetime="2016-07-07T09:24:17Z">${tweetObj.created_at}</span>
          <div class="icons"><i class="fas fa-flag"></i> <i class="fas fa-retweet"></i> <i class="fas fa-heart"></i>
          </div>
        </footer>
      </article>`);
    return $tweet;
  };


  const renderTweets = function (data) {

    // side effect
    for (const tweet of data) {
      const $tweet = createTweetElement(tweet);
      //console.log("This is each tweet:" ,$tweet);
      $('.tweetContainer').prepend($tweet);
      // append / prepend

    }

  }
  //renderTweets(data);

  const loadTweets = function (url) {
    return $.ajax({
      url: url,
      method: 'GET',
      dataType: 'json'
    })
    .then(function (data) {
      $('.tweetContainer').empty();
      renderTweets(data); // -> undefined
    })
  }
  loadTweets('/tweets');

//EVent handler for the form
  $("form").on('submit', function (event) {
    event.preventDefault();

    const data = ($(this).serialize());
    console.log($(this).children('.tweet-text').val());
  
    //Validation against empty data or overlimit character usage
    
    if($(this).children('.tweet-text').val() === null || $(this).children('.tweet-text').val() === '') {
      alert('Error: Empty tweet');
      return;
    }
    if($(this).children('.tweet-text').val() && $(this).children('.tweet-text').val().length > 140){
      alert('Error: Over character limit, Mate!')
      return;
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