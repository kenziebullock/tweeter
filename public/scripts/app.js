/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Fake data taken from tweets.json

// code refactor starts here!
// $(`<header class="tweet-header">
//                         <img class="tweet-avatar" src=${tweetObject.user.avatars.small}>
//                         <h4 class= "tweet-name">${tweetObject.user.name}</h4>
//                         <h6 class="tweet-handle">${tweetObject.user.handle}</h6>
//                     </header>`);


// const tweetHeader = function(headerInput) {
//     let $header = $('<header>', {'class': 'tweet-header'})
//         .append($('<img>', {'class': 'tweet-avatar', 'src': headerInput.avatars.small}))
//         .append($('<h4>', {'class': 'tweet-name'}).text(headerInput.name))
//         .append('<h6>', {'class': 'tweet-handle'}).text(headerInput.handle);
//     console.log($header);
//     return $header;
// }

// const tweetBody = function(bodyInput) {

// }



const createTweetElement = function(tweetObject) {
    
    let $newTweet = $("<article>").addClass("tweet-container");
    let header = $(`<header class="tweet-header">
                        <img class="tweet-avatar" src=${tweetObject.user.avatars.small}>
                        <h4 class= "tweet-name">${tweetObject.user.name}</h4>
                        <h6 class="tweet-handle">${tweetObject.user.handle}</h6>
                    </header>`);
    let body = $('<p>', {'class': 'tweet-body'}).text(tweetObject.content.text);
    // $(`<p class="tweet-body">${tweetObject.content.text}</p>`);
    let footer = $(`<footer class="tweet-footer"> 
                        <div class ="footer-items">
                            <p class="date">${Date(tweetObject.created_at)}</p>
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
        $('.new-tweets').prepend($currentTweet);
    });
}

$( document ).ready(function() {
    function loadTweets() {
        $.ajax('/tweets', { method: 'GET' })
        .then(function(tweets) {
            renderTweets(tweets);
        });
    }
    loadTweets();
    
    $('#submitTweet').on('click', function(event) {
        event.preventDefault();
        
        // grab content of tweet
        let tweetData = $('#tweet-text-area').serialize();
        
        // error handling
        if (tweetData.length < 6) {
            $('#error-messages').text('Text area blank!');
            $('#error-messages').show();
            return;
        } else if (tweetData.length > 147) {
            $('#error-messages').text('Tweet must be 140 chars or less!');
            $('#error-messages').show();
            return;
        } else {
            // ajax submit
            $.ajax('/tweets', { 
                method: 'POST',
                data: tweetData
            }).then(function() {
                // clear the form and load current tweet
                $('#error-messages').hide();
                $('#tweet-text-area').val('');
                $('#text-counter').text(140);
                
                // remove all tweets and load list with newest tweet
                // (could it be possible to just add on the last one without reloading all)
                $('article').detach();
                loadTweets();
            });
        }
    });

    $('#compose-button').on('click', function() {
        $('#new-tweet-id').slideToggle(500);
        $('#tweet-text-area').focus();
    })

});