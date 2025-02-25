let currentMode = "time"; // Default mode is 'time'
let currentOption = 30; // Default option is 30 seconds

document.addEventListener("DOMContentLoaded", function () {
    selectMode(currentMode);
    selectTime(30);
});

function selectMode(mode) {
    hideOptions();

    currentMode = mode;

    const modeButtons = document.querySelectorAll('.mode-button');
    modeButtons.forEach(button => button.classList.remove('active'));

    const selectedModeButton = document.querySelector(`.mode-button[data-mode="${mode}"]`);
    if (selectedModeButton) selectedModeButton.classList.add('active');

    if (mode === 'time') {
        document.getElementById("time-options").style.display = "block";
    } else if (mode === 'words') {
        document.getElementById("words-options").style.display = "block";
        selectWords(25);
    } else if (mode === 'quotes') {
        document.getElementById("quotes-options").style.display = "block";
        selectQuote('medium');
    }
}

function hideOptions() {
    document.getElementById("time-options").style.display = "none";
    document.getElementById("words-options").style.display = "none";
    document.getElementById("quotes-options").style.display = "none";
}

function selectTime(time) {
    currentOption = time;
    console.log(`Time selected: ${time} seconds`);

    const timeButtons = document.querySelectorAll('#time-options button');
    timeButtons.forEach(button => button.classList.remove('active'));

    const selectedTimeButton = document.querySelector(`#time-options button[data-time="${time}"]`);
    if (selectedTimeButton) selectedTimeButton.classList.add('active');
}

function selectWords(words) {
    currentOption = words;
    console.log(`Words selected: ${words}`);

    const wordsButtons = document.querySelectorAll('#words-options button');
    wordsButtons.forEach(button => button.classList.remove('active'));

    const selectedWordsButton = document.querySelector(`#words-options button[data-words="${words}"]`);
    if (selectedWordsButton) selectedWordsButton.classList.add('active');
}

function selectQuote(quoteType) {
    currentOption = quoteType;
    console.log(`Quote length selected: ${quoteType}`);

    const quoteButtons = document.querySelectorAll('#quotes-options button');
    quoteButtons.forEach(button => button.classList.remove('active'));

    const selectedQuoteButton = document.querySelector(`#quotes-options button[data-quote="${quoteType}"]`);
    if (selectedQuoteButton) selectedQuoteButton.classList.add('active');
}