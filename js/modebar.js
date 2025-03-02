class TrackedOption {
    constructor(initialValue, callback) {
        this._value = initialValue;
        this.callback = callback;
    }

    get value() {
        return this._value;
    }

    set value(newValue) {
        if (newValue !== this._value) {
            this._value = newValue;
            this.callback(newValue);
        }
    }
}

var currentMode = 'time'; // Default mode is 'time' and default option is 30 seconds
var currentOption = new TrackedOption(30, (newOption) => {
    if (currentMode === 'time') {
        updateTimeData(newOption);
    }
    else if (currentMode === 'words') {
        updateWordData(newOption);
    }
    else if (currentMode === 'quotes') {
        updateQuoteData(newOption);
    }
});

document.addEventListener("DOMContentLoaded", function () {
    selectMode(currentMode);
    if (!isDataFetched) {
        if (currentMode === 'time') {
            getData();
            updateTimeData();
        }
        else if (currentMode === 'words') {
            getData();
            updateWordData(currentOption);
        }
        else if (currentMode === 'quotes') {
            getData();
            updateQuoteData(currentOption);
        }
    }
});

function selectMode(mode) {
    hideOptions();
    currentMode = mode;
    console.log("Mode selected: " + mode);

    const modeButtons = document.querySelectorAll('.mode-button');
    modeButtons.forEach(button => button.classList.remove('active'));

    const selectedModeButton = document.querySelector(`.mode-button[data-mode="${currentMode}"]`);
    if (selectedModeButton) selectedModeButton.classList.add('active');

    modeButtons.forEach(button => {
        button.disabled = true;
        if (button !== selectedModeButton) {
            button.disabled = false;
        }
    });

    if (mode === 'time') {
        document.getElementById("time-options").style.display = "block";
        selectTime(30);
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
    currentOption.value = time;
    console.log(`Time selected: ${time} seconds`);

    const timeButtons = document.querySelectorAll('#time-options button');
    timeButtons.forEach(button => button.classList.remove('active'));

    const selectedTimeButton = document.querySelector(`#time-options button[data-time="${time}"]`);
    if (selectedTimeButton) {
        selectedTimeButton.classList.add('active');
        selectedTimeButton.blur();
    }
}

function selectWords(words) {
    currentOption.value = words;
    console.log(`Words selected: ${words} words`);

    const wordsButtons = document.querySelectorAll('#words-options button');
    wordsButtons.forEach(button => button.classList.remove('active'));

    const selectedWordsButton = document.querySelector(`#words-options button[data-words="${words}"]`);
    if (selectedWordsButton) {
        selectedWordsButton.classList.add('active');
        selectedWordsButton.blur();
    }
}

function selectQuote(quoteType) {
    currentOption.value = quoteType;
    console.log(`Quote length selected: ${quoteType}`);

    const quoteButtons = document.querySelectorAll('#quotes-options button');
    quoteButtons.forEach(button => button.classList.remove('active'));

    const selectedQuoteButton = document.querySelector(`#quotes-options button[data-quote="${quoteType}"]`);
    if (selectedQuoteButton) {
        selectedQuoteButton.classList.add('active');
        selectedQuoteButton.blur();
    }
}