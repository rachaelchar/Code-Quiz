// define variables
var highScoresList = "";
var $viewScoresBtn = $("#viewScoresBtn");
var $startBtn = $("#startQuizBtn");
var $timerElement = $("#timer");
var secondsLeft = 75;
var $contentDiv = $("#content");



// When the document is ready, run the function.
$(document).ready(function() {

    $startBtn.on("click", function(){
        // clear the landing page content
        content.innerHTML = "";
        // start countdown
        var timerInterval = setInterval(function(){
            // decrement seconds left by 1
            secondsLeft--;
            // set the text content of the timer element to the seconds left
            $timerElement.text("Time Left/Score: " + secondsLeft);
            // pass in the second argument which tells the decrement function to run once per second

            // When the timer reaches 0,
            if (secondsLeft === 0){
                // clear the html (which will be whatever question they are on)
                content.innerHTML = "";
                // stop the countdown
                clearInterval(timerInterval);
                // create a new h1 that says "all done!"
                var $newTitleElement = $("<h1>All done!</h1>");
                // append the h1 to the content div
                $contentDiv.append($newTitleElement);
            }
        }, 1000);



    });

    // function renderHighScores() {
    //     // clear the HTML every time this function runs
    //     highScoresList.innerHTML = "";
    // }

    $viewScoresBtn.on("click", function(){
        renderHighScores();
    });

});