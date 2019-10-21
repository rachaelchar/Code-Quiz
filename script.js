// define variables
var highscoresArray = [];
var newHighScore = "";
var $viewScoresBtn = $(".view-scores-btn");
var $startBtn = $("#startQuizBtn");
var $timerElement = $("#timer");
var secondsLeft = 75;
var $contentDiv = $("#content");
var currentQ = 0;
var lastQuestion = questions.length;
var $outcomeAlert = $("#outcome-alert");
var $highscoresOl = $("#high-scores-list");



$(document).ready(function () {

    function storeHighscores() {
        // function to stringify the highscores array and save it to the "highscores" key in localStorage
        var highscoresJSON = JSON.stringify(highscoresArray);
        localStorage.setItem("highscoresArray", highscoresJSON);

        // ** NOT CURRENTLY WORKING **
        // // Create and append Go Back button 
        // var $goBackBtn = $("<button class='btn-success'>Go Back</button>");
        // $highscoresOl.append($goBackBtn);

        // // set GoBack button click function to reload page
        // $goBackBtn.on("click", function () {
        //     // source: https://stackoverflow.com/questions/29884654/button-that-refreshes-the-page-on-click
        //     window.location.reload();
        // });

        // // Create and append Clear Highscores button
        // var $clearScoresBtn = $("<button class='btn-warning'>Clear Highscores</button>");
        // $highscoresOl.append($clearScoresBtn);

        // // set GoBack button click function to reload page
        // $clearScoresBtn.on("click", function () {
        //      $highscoresOl.html("");
        //      localStorage.removeItem(storedHighscores);
        // });


    }
    // START BUTTON CLICK EVENT & TIMER //

    $startBtn.on("click", function () {
        // clear the landing page content
        content.innerHTML = "";

        // call the function to render the questions
        renderQuestions();

        // start countdown
        var timerInterval = setInterval(function () {
            // decrement seconds left by 1
            secondsLeft--;
            // set the text content of the timer element to the seconds left
            $timerElement.text("Time Left/Score: " + secondsLeft);

            // When the timer reaches 0 or if the user incurs time penalties that decrement below 0...
            if (secondsLeft <= 0 || currentQ === lastQuestion) {

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

                    // set a variable to what the user entered
                    var $initials = $("#initials").val();

                    // concatenate the new string with the number of seconds left to create the high score
                    newHighScore = $initials + " - " + secondsLeft;


                    // This is supposed to add the new highscore to highscores array, but there is only ever 1 item in the array
                    highscoresArray.push(newHighScore);

                    // clear the input area
                    $("#initials").val('');

                    storeHighscores();
                    renderHighScores();

                    console.log(highscoresArray);

                });

            }
            // pass in the second argument which tells it to decrement once per second
        }, 1000);



        // RENDER QUESTIONS //

        function renderQuestions() {
            content.innerHTML = "";
            var $newQuestionTitle = $("<div class='text-muted'><br><h3>" + questions[currentQ].title + "</h3></div>");
            $contentDiv.append($newQuestionTitle);

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

            // *Note* There is definitely somthing wrong with this section of code... My outcome alerts are not working properly and I had to add the || currentQ === lastQuestion part in the if statement above because its equivalent wasn't working here.
            $(".choices-btn").on("click", function (event) {
                // set a variable to represent the option the user clicked on
                var clickedChoice = this;

                // check that the option they chose is the correct answer; decrement the seconds if wrong
                if (clickedChoice.textContent === questions[currentQ].answer) {

                    // ALERTS ARE ONLY WORKING ON THE FIRST QUESTION //
                    // alert("correct!")
                    $outcomeAlert.html("<h3 class='text-success'><br>Nice job!<hr></h3>");
                    // delay keeps the new text on the page for 1/2 second then fades away 
                    // source: https://stackoverflow.com/questions/39391782/add-element-to-document-and-then-remove-it-using-jquery
                    $outcomeAlert.delay(500).fadeOut(100);

                } else {
                    $outcomeAlert.html("<h3 class='text-warning'><br>Nope!<hr></h3>");
                    $outcomeAlert.delay(500).fadeOut(100);
                    secondsLeft = secondsLeft - 15;
                }

                // if user has reached the end of the last question, stop the game
                if (currentQ !== lastQuestion) {
                    currentQ++;
                    renderQuestions();
                }

            });

        }

    });



    // ** FOR HIGHSCORES ** //

    // The following block of code is based on the Todos activity
    function renderHighScores() {

        // Clear highscores element and content div 
        // * Scores list not currently clearing
        $(".scores-list").innerHTML = "";
        content.innerHTML = "";

        var storedHighscores = JSON.parse(localStorage.getItem("highscoresArray"));
        highscoresArray = storedHighscores;

        // Render a new li for each highscore
        for (var j = 0; j < highscoresArray.length; j++) {
            var highscoreLi = highscoresArray[j];

            var li = $("<li class='m4 scores-list'>" + highscoreLi + "</li>");
            // li.text(highscoreLi);
            $highscoresOl.append(li);
        }

        console.log(newHighScore);
    }

    $viewScoresBtn.on("click", function () {
        renderHighScores();
    });


});