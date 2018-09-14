/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$( document ).ready(function() {
    
    // function to convert milliseconds to time ago
    const timeConversion = function(millisec) {
        
        // was using moment, some dates in database are saved as 'a few seconds ago'
        if (!millisec) {
            millisec = Date.now() - 1536945395171;
        }
        let seconds = Math.floor((millisec / 1000).toFixed(1));
        let minutes = Math.floor((millisec / (1000 * 60)).toFixed(1));
        let hours = Math.floor((millisec / (1000 * 60 * 60)).toFixed(1));
        let days = Math.floor((millisec / (1000 * 60 * 60 * 24)).toFixed(1));
        
        if (seconds < 60) {
            return (seconds === 1) ? seconds + ' second ago' : seconds + ' seconds ago';
        } else if (minutes < 60) {
            return (minutes === 1) ? minutes + ' minute ago' : minutes + ' minutes ago';
        } else if (hours < 60) {
            return (hours === 1) ? hours + ' hour ago' : hours + ' hours ago';
        } else {
            return (days === 1) ? days + ' day ago' : days + ' days ago';
        }
    }

    // creates tweet element html
    const createTweetElement = function(tweetObject) {
        let $newTweet = $("<article>").addClass("tweet-container");
        let header = $(`<header class="tweet-header">
                            <img class="tweet-avatar" src=${tweetObject.user.avatars.small}>
                            <h3 class= "tweet-name">${tweetObject.user.name}</h3>
                            <h6 class="tweet-handle">${tweetObject.user.handle}</h6>
                        </header>`);
        let body = $('<p>', {'class': 'tweet-body'}).text(tweetObject.content.text);
        let footer = $(`<footer class="tweet-footer"> 
                            <div class ="footer-items">
                                <p class="date">${timeConversion(Date.now() - tweetObject.created_at)}</p>
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
    
    // renders tweets
    function renderTweets(tweets) {
        tweets.forEach(function(tweet) {
            let $currentTweet = createTweetElement(tweet);
            $('.new-tweets').prepend($currentTweet);
        });
    }
    
    // loads tweets from database
    function loadTweets() {
        $.ajax('/tweets', { method: 'GET' })
        .then(function(tweets) {
            renderTweets(tweets);
        });
    }
    loadTweets();
    
    // async ajax submit
    $('#submit-tweet').on('click', function(event) {
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

    // compose button to hide and show compose tweet
    $('#compose-button').on('click', function() {
        $('#new-tweet-id').slideToggle(500);
        $('#tweet-text-area').focus();
    });

});