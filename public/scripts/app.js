/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Fake data taken from tweets.json
const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];
  
function createTweetElement(tweetObject) {
    
    let $newTweet = $("<article>").addClass("tweet-container");
    let header = $(`<header class="tweet-header">
                        <img class="tweet-avatar" src=${tweetObject.user.avatars.small}>
                        <h4 class= "tweet-name">${tweetObject.user.name}</h4>
                        <h6 class="tweet-handle">${tweetObject.user.handle}</h6>
                    </header>`);
    let body = $(`<p class="tweet-body">${tweetObject.content.text}</p>`);
    let footer = $(`<footer class="tweet-footer"> 
                        <div class ="footer-items">
                            <p class="date">${tweetObject.created_at}</p>
                        </div>
                        <div class="footer-items">
                            <img class="glyphs" src="/images/flag.png">
                            <img class="glyphs" src="/images/retweet.png">
                            <img class="glyphs" src="/images/heart.png">
                        </div>
                    </footer>`);
    $($newTweet).append(header, [body, footer]);
    return $newTweet;
}

function renderTweets(tweets) {
    tweets.forEach(function(tweet) {
        let $currentTweet = createTweetElement(tweet);
        $('.container').append($currentTweet);
    });
}

$( document ).ready(function() {
    renderTweets(data);
});