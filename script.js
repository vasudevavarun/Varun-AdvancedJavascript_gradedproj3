let timeLimit = 60;

let quotes = [
    "Happiness can be found even in the darkest of times, if one only remembers to turn on the light.",
    "We’ve all got both light and dark inside us. What matters is the part we choose to act on. That’s who we really are.",
    "Soon we must all face the choice between what is right and what is easy.",
    "You are braver than you believe, stronger than you seem, and smarter than you think.",
    "The past can hurt. But the way I see it, you can either run from it, or learn from it.",
    "Laughter is timeless, imagination has no age, dreams are forever.",
    "No amount of money ever bought a second of time."
];

let timer_text = document.querySelector(".time");
let accuracy_text = document.querySelector(".currentAccuracy");
let error_text = document.querySelector(".currentErrors");
let cpm_text = document.querySelector(".currentCPM");
let wpm_text = document.querySelector(".currentWPM");
let quote_text = document.querySelector(".quote");
let input_area = document.querySelector(".input");
let restart_btn = document.querySelector(".restart");
let cpm_group = document.querySelector(".cpm");
let wpm_group = document.querySelector(".wpm");
let error_group = document.querySelector(".errors");
let accuracy_group = document.querySelector(".accuracy");

let timeLeft = timeLimit;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
let current_quote = "";
let quoteNo = 0;
let timer = null;

function startTest() {
    resetValues();
    changeQuote();

    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
}

/* Change quote function is just to show each quote in the array one after the other and if needed repeat the cycle once again. */

function changeQuote() {
    quote_text.textContent = null;
    current_quote = quotes[quoteNo];

    current_quote.split('').forEach(char => {
        const charSpan = document.createElement('span')
        charSpan.innerText = char
        quote_text.appendChild(charSpan)
    })

    if (quoteNo < quotes.length - 1)
        quoteNo++;

    else
        quoteNo = 0;

}

/* Update timer function reduces the time left and when it reaches 0 calls finish test function to end test. */

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;

        timeElapsed++;

        timer_text.textContent = timeLeft + "s";

    } else {
        finishTest();
    }
}


function checkInputText() {
    curr_input = input_area.value;
    curr_input_array = curr_input.split('');

    characterTyped++;

    errors = 0;

    quoteSpanArray = quote_text.querySelectorAll('span');
    quoteSpanArray.forEach((char, index) => {

        /* This function sorts the correct and incorrect characters to give them green and red color respectively */

        let typedChar = curr_input_array[index]

        if (typedChar == null) {
            char.classList.remove('correct_char');
            char.classList.remove('incorrect_char');

        } else if (typedChar === char.innerText) {
            char.classList.add('correct_char');
            char.classList.remove('incorrect_char');

        } else {
            char.classList.add('incorrect_char');
            char.classList.remove('correct_char');

            errors++;
        }
    });

    error_text.textContent = total_errors + errors;

    let correctCharacters = (characterTyped - (total_errors + errors));
    let accuracyVal = ((correctCharacters / characterTyped) * 100);
    accuracy_text.textContent = Math.round(accuracyVal);

    if (curr_input.length == current_quote.length) {
        changeQuote();

        total_errors += errors;

        input_area.value = "";
    }
}

/* Finish test function will display test results including
CPM , WPM , Errors , Time Left (which is 0 at he end) and Accuracy Percentage.

It also displays Restart button wich will allow retaking of the test.*/

function finishTest() {
    clearInterval(timer);

    input_area.disabled = true;

    quote_text.textContent = "Click on restart to start a new game.";

    restart_btn.style.display = "block";

    cpm = Math.round(((characterTyped / timeElapsed) * 60));
    wpm = Math.round((((characterTyped / 5) / timeElapsed) * 60));

    cpm_text.textContent = cpm;
    wpm_text.textContent = wpm;

    cpm_group.style.display = "block";
    wpm_group.style.display = "block";
}

function resetValues() {
    timeLeft = timeLimit;
    timeElapsed = 0;
    errors = 0;
    total_errors = 0;
    accuracy = 0;
    characterTyped = 0;
    quoteNo = 0;
    input_area.disabled = false;

    input_area.value = "";
    quote_text.textContent = 'Click on the area below to start the game.';
    accuracy_text.textContent = 100;
    timer_text.textContent = timeLeft + 's';
    error_text.textContent = 0;
    restart_btn.style.display = "none";
    cpm_group.style.display = "none";
    wpm_group.style.display = "none";
}