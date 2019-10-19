// define variables
var highScoresList = "";
var newHighScore = "";
var $viewScoresBtn = $("#viewScoresBtn");
var $startBtn = $("#startQuizBtn");
var $timerElement = $("#timer");
var secondsLeft = 75;
var $contentDiv = $("#content");
var currentQ = 0;
// var choices = ["while loop", "prompt", "alert", "for loop"];


// while loop -- while secondsLeft !== 0 && < questions.length
// Within while loop, call renderQuestions(questions[i])
// Change to setTimeout?


$(document).ready(function () {

    $startBtn.on("click", function () {
        // clear the landing page content
        content.innerHTML = "";
        // start countdown
        var timerInterval = setInterval(function() {
            // decrement seconds left by 1
            secondsLeft--;
            // set the text content of the timer element to the seconds left
            $timerElement.text("Time Left/Score: " + secondsLeft);

            // When the timer reaches 0...
            if (secondsLeft === 0) {
                // clear the html (which will be whatever question they are on)
                content.innerHTML = "";

                // stop the countdown
                clearInterval(timerInterval);

                // create a new h1 that says "all done!"
                var $newTitleElement = $("<div><h1>All done!</h1></div>");

                // append the h1 to the content div
                $contentDiv.append($newTitleElement);

                // create a new element telling the user their final score
                var $newSubElement = $("<div><p>Your final score is " + secondsLeft + ".</p></div>");

                // append the p element to the content div
                $newTitleElement.append($newSubElement);

                // create a new input element within a form. Use input type="submit" so that the button will work with the input field
                // Source: https://stackoverflow.com/questions/290215/difference-between-input-type-button-and-input-type-submit
                var $newInputElement = $("<div><p>Enter intials: <form><input id='initials'></input> <input type='submit' id='newSubmitButton'></button></form></p></div>");

                // append the input element
                $newTitleElement.append($newInputElement);


                // create a new submit button
                $(newSubmitButton).on("click", function (event) {
                    // prevent default, otherwise the page will reload after the user clicks submit
                    event.preventDefault();

                    // set a variable to the input ID
                    var $initials = $("#initials");

                    // get the value of the user's input and turn it into a string 
                    var $newInputElementString = JSON.stringify($initials.val());

                    // concatenate the new string with the number of seconds left to create the high score
                    newHighScore = $newInputElementString + " - " + secondsLeft;

                    // store the high score
                    localStorage.setItem("newScore", newHighScore);

                    // console.log to check that it worked -- it did!
                    console.log(newHighScore);

                });
            }
            // pass in the second argument which tells it to decrement once per second
        }, 1000);



        // QUESTIONS //

        // x will help us loop through the array of questions

        function renderQuestions() {
            content.innerHTML = "";
            var $newQuestionTitle = $("<div class='text-muted'><br><h3>"+questions[currentQ].title+"</h3></div>");
            $contentDiv.append($newQuestionTitle);
            console.log(questions[currentQ].choices);

            for (var i = 0; i < questions[currentQ].choices.length; i++){
                var $choicesBtn = $("<button>", {
                    class: "btn-outline-success m-4 h5 p-2"
                });

                $choicesBtn.attr("data-choices", questions[currentQ].choices[i]);
                $choicesBtn.text(questions[currentQ].choices[i]);
                $contentDiv.append($choicesBtn);
            }

            // // Need to list as an ordered list
            // var $newChoices = $("<div class='text-muted'><br><ol></ol></div>");
            // $newQuestionTitle.append($newChoices);
    }
        renderQuestions();

    });

    // function renderHighScores() {
    //     // clear the HTML every time this function runs
    //     highScoresList.innerHTML = "";
    // }

    $viewScoresBtn.on("click", function () {
        renderHighScores();
    });

    // ** FOR HIGHSCORES PAGE** //

    $("#goBackBtn").on("click", function () {


    });
});