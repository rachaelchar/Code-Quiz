// define variables
var highScoresList = "";
var newHighScore = "";
var $viewScoresBtn = $("#viewScoresBtn");
var $startBtn = $("#startQuizBtn");
var $timerElement = $("#timer");
var secondsLeft = 75;
var $contentDiv = $("#content");
var currentQ = 0;
var lastQuestion = questions.length - 1



$(document).ready(function () {

    // START BUTTON CLICK EVENT & TIMER //

    $startBtn.on("click", function () {
        // clear the landing page content
        content.innerHTML = "";
        // start countdown
        var timerInterval = setInterval(function () {
            // decrement seconds left by 1
            secondsLeft--;
            // set the text content of the timer element to the seconds left
            $timerElement.text("Time Left/Score: " + secondsLeft);

            // When the timer reaches 0 or if the incurrs time penalties that decrement below 0...
            if (secondsLeft <= 0) {

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
                var $newInputElement = $("<div><p>Enter initials: <form><input id='initials'></input> <input type='submit' id='newSubmitButton'></button></form></p></div>");

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



        // RENDER QUESTIONS //

        function renderQuestions() {
            content.innerHTML = "";
            var $newQuestionTitle = $("<div class='text-muted'><br><h3>" + questions[currentQ].title + "</h3></div>");
            $contentDiv.append($newQuestionTitle);
            console.log(questions[currentQ].choices);

            // this for loop inspired by refridgerator acitivity for loop
            for (var i = 0; i < questions[currentQ].choices.length; i++) {
                var $choicesBtn = $("<button>", {
                    class: "choices-btn btn-outline-success m-4 h5 p-2"
                });

                // $choicesBtn.attr("data-choices", questions[currentQ].choices[i]);
                // set the text of the buttons to the choices array of the current question
                $choicesBtn.text(questions[currentQ].choices[i]);
                // append the buttons
                $contentDiv.append($choicesBtn);
            }


            // ADD CLICK EVENTS TO CHOICES BUTTONS //


            $(".choices-btn").on("click", function () {
                // set a variable to represent the option the user clicked on
                var clickedChoice = this;

                // check that the option they chose is the correct answer; decrement the seconds if wrong
                if (clickedChoice.textContent === questions[currentQ].answer) {
                    alert("correct!");
                } else {
                    alert("wrong");
                    secondsLeft = secondsLeft - 15;
                }

                // if you have reached the end of the last question, stop the game
                if (currentQ === lastQuestion){
                    alert("done");
                // otherwise, advance to the next question
                } else {
                currentQ++;
                renderQuestions();
                }

            });


        }

        if (currentQ <= lastQuestion) {
        renderQuestions();
        } else {
            alert("You're done");
        }

        // stop the game when they finish the last question
    });








    // ** FOR HIGHSCORES ** //

    $viewScoresBtn.on("click", function () {
        renderHighScores();
    });


    $("#goBackBtn").on("click", function () {
    });

});