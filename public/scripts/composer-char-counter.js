$(document).ready(function() {
    $( '#tweet-text-area' ).bind('keyup', function() {
        $("#text-counter").text((140 - $(this).val().length));
        if($(this).val().length > 140) {
            $("#text-counter").css('color', 'red');
        } else {
            $("#text-counter").css('color', 'black');
        }
    });
});