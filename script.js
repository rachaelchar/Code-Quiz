// define variables
var highScoresList = "";
var newHighScore = "";
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
                $(newSubmitButton).on("click", function(event){
                    // prevent default, otherwise it will reload the page after clicking submit
                    event.preventDefault();                    
                    // set a variable to the input ID
                    var $initials = $("#initials"); 
                    // get the value of the user's input and turn it into a string 
                    var $newInputElementString = JSON.stringify($initials.val());
                    // store the string
                    localStorage.setItem("inputValue", $newInputElementString);
                    // concatenate the new string with the number of seconds left to create the high score
                    newHighScore = $newInputElementString + " - " + secondsLeft;
                    // console.log to check that it worked -- it did!
                    console.log(newHighScore);
              
                });


            }
        }, 10);



    });

    // function renderHighScores() {
    //     // clear the HTML every time this function runs
    //     highScoresList.innerHTML = "";
    // }

    $viewScoresBtn.on("click", function(){
        renderHighScores();
    });

});