/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {

  $( "#write_tweet" ).click(function() {     
    $('#new_tweet').toggleClass('toggled')
    $input.val('');
    $('#no_data').removeClass('error');
    $('#too_long').removeClass('error');
});

const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    $("#tweet_container").prepend(createTweetElement(tweet));
  }
}

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const createTweetElement = function(tweet) {
  // let $tweet = $('<article>').addClass('tweet');
  let $tweet = `<article class="tweet">
              <header>
                <div>
                  <img src=${tweet.user.avatars}>
                </div>
                <div class="user">
                  ${tweet.user.name}
                </div>
                <div class="user-id">
                  ${tweet.user.handle}
                </div>
            </header>
            <p>${escape(tweet.content.text)}</p>
            <footer>
              <div class="time">${formatAMPM()}</div>
              <div class="social-logos">
              <img src="/images/006-pin.png">
              <img src="/images/007-heart.png">
              <img id="right-img"src="/images/020-telegram.png">
              </div>
          </article>`;
  return $tweet;
}

const $form = $('.post-tweet');
const $input = $('#text');

$form.keydown(function() {
  if ($('#no_data').hasClass('error')) {
    $('#no_data').removeClass('error');
  } else if ($('#too_long').hasClass('error')) {
    $('#too_long').removeClass('error');
  }
});

$form.on('submit', function (event) {
  event.preventDefault();

  if($input.val().length < 1) {
    $('#no_data').toggleClass('error');
  } else if ($input.val().length >= 140) {
    $('#too_long').toggleClass('error');
  } else {
  $.ajax({
     method: 'POST',
     data: $input.serialize(),
     url: 'http://localhost:8080/tweets'
  })
  .done(function() {
    loadTweets();
    $input.val('');
    $('.counter').text('140');
  });
 }
})

const loadTweets = () => {
  $.ajax('/tweets/', {
    method: 'GET'
  })
  .done(function(data) {
    $('#tweet_container').empty();
    renderTweets(data);
  })
}
loadTweets();

const moment = require("moment");

function formatAMPM() {
  let d = new Date(),
    minutes = d.getMinutes().toString().length === 1 ? '0' + d.getMinutes() : d.getMinutes(),
    hours = d.getHours().toString().length === 1 ? '0' + d.getHours() : d.getHours(),
    ampm = d.getHours() >= 12 ? 'pm' : 'am',
    months = ['January','February','March','April','May','June','July','August','September','October','November','December'],
    days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  let postTime = days[d.getDay()] + ' ' + months[d.getMonth()] + ' ' + d.getDate() + ' ' + d.getFullYear() + ' ' + hours + ':' + minutes + ampm;
  return postTime;
 };
});

