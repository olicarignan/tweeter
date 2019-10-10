/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {


  $( "#write_tweet" ).click(function() {     
    $('#new_tweet').toggleClass('toggled');
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
              <div class="social-logos"></div>
            </footer>
          </article>`;
  return $tweet;
}

const $form = $('.post-tweet');
const $input = $('#text');




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
  // .fail()
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


function formatAMPM() {
  let d = new Date(),
    minutes = d.getMinutes().toString().length === 1 ? '0' + d.getMinutes() : d.getMinutes(),
    hours = d.getHours().toString().length === 1 ? '0' + d.getHours() : d.getHours(),
    ampm = d.getHours() >= 12 ? 'pm' : 'am',
    months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  return days[d.getDay()] + ' ' + months[d.getMonth()] + ' ' + d.getDate() + ' ' + d.getFullYear() + ' ' + hours + ':' + minutes + ampm;
 };
});

