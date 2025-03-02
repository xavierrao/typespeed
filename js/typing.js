var text_data = {};
var isDataFetched = false;
var keydownListenerAttached = false;

var quote = "";
var word_string = "";

var timerRunning = false;
var words = 0;
var totalWords = 0;
var totalCharacters = 0;
var timer = 0;
var position = 0;
var correct = 0;
var incorrect = 0;

let t;

function getData() {
    fetch('data/info.json')
        .then(res => res.json())
        .then(data => {
            text_data = data;
            isDataFetched = true;
            if (currentMode === 'time') {
                updateTimeData(currentOption.value);
            }
            else if (currentMode === 'words') {
                updateWordData(currentOption.value);
            }
            else if (currentMode === 'quotes') {
                updateQuoteData(currentOption.value);
            }
            moveCursor(0);
        })
        .catch(error => {
            console.log(error);
        });
}

function updateTimeData(option) {
    const info = text_data;
    if (!info || !info.words) {
        return;
    }

    let word_list = info.words;
    let word_array = [];
    for (let i = 0; i < option * 5; i++) {
        word_array.push(word_list[getRandomInt(word_list.length)]);
    }

    word_string = word_array.join(' ');
    word_array = [];

    timerRunning = false;
    timer = option;
    seconds = timer / 60;
    position = 0;
    correct = 0;
    incorrect = 0;

    document.getElementById("text").innerHTML = word_string.split("")
        .map((char, pos) => `<span id="letter-${pos}">${char}</span>`)
        .join("");
    document.getElementById("counter").innerHTML = timer;

    resetGameState();

    if (!keydownListenerAttached) {
        document.addEventListener("keydown", handleKeydown);
        keydownListenerAttached = true;
    }

    document.getElementById("newGameButton").addEventListener('click', () => {
        newGame();
        document.getElementById("stats").style.display = "none";
    });

    document.getElementById("restart").addEventListener('click', () => {
        newGame();
        clearInterval(t);
        document.getElementById("restart").blur();
    });

    function newGame() {
        document.querySelector('.mode-bar').style.visibility = 'visible';

        for (let i = 0; i < option * 5; i++) {
            word_array.push(word_list[getRandomInt(word_list.length)]);
        }
        word_string = word_array.join(' ');
        word_array = [];

        timerRunning = false;
        words = 0;
        timer = option;
        seconds = timer / 60;
        position = 0;
        correct = 0;
        incorrect = 0;

        document.getElementById("text").innerHTML = word_string.split("")
            .map((char, pos) => `<span id="letter-${pos}">${char}</span>`)
            .join("");
        document.getElementById("counter").innerHTML = timer;
        document.getElementById("text").style.marginTop = '0px';
        moveCursor(0);
    }
}

function updateWordData(option) {
    const info = text_data;
    if (!info || !info.words) {
        return;
    }

    let word_list = info.words;
    let word_array = [];
    for (let i = 0; i < option; i++) {
        word_array.push(word_list[getRandomInt(word_list.length)]);
    }

    word_string = word_array.join(' ');
    word_array = [];

    timerRunning = false;
    words = 0;
    totalWords = getWordCount(word_string);
    totalCharacters = word_string.length;
    timer = 0;
    position = 0;
    correct = 0;
    incorrect = 0;

    document.getElementById("text").innerHTML = word_string.split("")
        .map((char, pos) => `<span id="letter-${pos}">${char}</span>`)
        .join("");
    document.getElementById("counter").innerHTML = words + "/" + totalWords;

    resetGameState();

    if (!keydownListenerAttached) {
        document.addEventListener("keydown", handleKeydown);
        keydownListenerAttached = true;
    }

    document.getElementById("newGameButton").addEventListener('click', () => {
        newGame();
        document.getElementById("stats").style.display = "none";
    });

    document.getElementById("restart").addEventListener('click', () => {
        newGame();
        clearInterval(t);
        document.getElementById("restart").blur();
    });

    function newGame() {
        document.querySelector('.mode-bar').style.visibility = 'visible';

        for (let i = 0; i < option; i++) {
            word_array.push(word_list[getRandomInt(word_list.length)]);
        }
        word_string = word_array.join(' ');
        word_array = [];

        timerRunning = false;
        words = 0;
        totalWords = option;
        totalCharacters = word_string.length;
        timer = 0;
        position = 0;
        correct = 0;
        incorrect = 0;

        document.getElementById("text").innerHTML = word_string.split("")
            .map((char, pos) => `<span id="letter-${pos}">${char}</span>`)
            .join("");
        document.getElementById("counter").innerHTML = words + "/" + totalWords;
        document.getElementById("text").style.marginTop = '0px';
        moveCursor(0);
    }
}

function updateQuoteData(option) {
    const info = text_data;

    if (!info || !info[option]) return;

    let selectedQuote = info[option][getRandomInt(info[option].length)];
    quote = selectedQuote.text;

    timerRunning = false;
    words = 0;
    totalWords = getWordCount(quote);
    totalCharacters = selectedQuote.length;
    timer = 0;
    position = 0;
    correct = 0;
    incorrect = 0;

    document.getElementById("text").innerHTML = quote.split("")
        .map((char, pos) => `<span id="letter-${pos}">${char}</span>`)
        .join("");
    document.getElementById("counter").innerHTML = words + "/" + totalWords;

    resetGameState();

    if (!keydownListenerAttached) {
        document.addEventListener("keydown", handleKeydown);
        keydownListenerAttached = true;
    }

    document.getElementById("newGameButton").addEventListener('click', () => {
        newGame();
        document.getElementById("stats").style.display = "none";
    });

    document.getElementById("restart").addEventListener('click', () => {
        newGame();
        clearInterval(t);
        document.getElementById("restart").blur();
    });

    function newGame() {
        document.querySelector('.mode-bar').style.visibility = 'visible';

        selectedQuote = info[option][getRandomInt(info[option].length)];
        quote = selectedQuote.text;

        timerRunning = false;
        clearInterval(t);
        words = 0;
        totalWords = getWordCount(quote);
        totalCharacters = selectedQuote.length;
        timer = 0;
        position = 0;
        correct = 0;
        incorrect = 0;

        document.getElementById("text").innerHTML = quote.split("")
            .map((char, pos) => `<span id="letter-${pos}">${char}</span>`)
            .join("");
        document.getElementById("counter").innerHTML = words + "/" + totalWords;
        document.getElementById("text").style.marginTop = '0px';
        moveCursor(0);
    }
}

function handleKeydown(event) {
    if (!/^[A-Za-z]$/.test(event.key) && position == 0) return;
    let currentChar = document.getElementById(`letter-${position}`);

    if (currentMode === 'time') {
        if (timer <= 0) {
            return;
        }
        if (event.key.length == 1) {
            currentChar.classList.add(event.key == word_string[position] ? "correct" : "incorrect");
            if (event.key == word_string[position]) { correct++; }
            else { incorrect++; }
            position++;
            console.log(event.key);
        }
        else if (event.key == "Backspace" && position > 0) {
            position--;
            currentChar = document.getElementById(`letter-${position}`);
            currentChar.classList.remove("correct", "incorrect");
            console.log(event.key);
        }
    }

    if (currentMode === 'words') {
        if (event.key.length == 1) {
            currentChar.classList.add(event.key == word_string[position] ? "correct" : "incorrect");
            if (event.key == word_string[position]) { correct++; }
            else { incorrect++; }
            position++;
            console.log(event.key);
        }
        else if (event.key == "Backspace" && position > 0) {
            position--;
            currentChar = document.getElementById(`letter-${position}`);
            currentChar.classList.remove("correct", "incorrect");
            console.log(event.key)
        }
        if (/^[A-Za-z]$|^ $/.test(event.key) && (word_string[position - 1] === " " || position == totalCharacters)) {
            words++;
            document.getElementById("counter").innerHTML = words + "/" + totalWords;
        }
        if (event.key === "Backspace" && word_string[position] === " " && words > 0) {
            words--;
            document.getElementById("counter").innerHTML = words + "/" + totalWords;
        }
    }

    else if (currentMode === 'quotes') {
        if (event.key.length == 1) {
            currentChar.classList.add(event.key == quote[position] ? "correct" : "incorrect");
            if (event.key == quote[position]) { correct++; }
            else { incorrect++; }
            position++;
            console.log(event.key);
        }
        else if (event.key == "Backspace" && position > 0) {
            position--;
            currentChar = document.getElementById(`letter-${position}`);
            currentChar.classList.remove("correct", "incorrect");
            console.log(event.key)
        }
        if (/^[A-Za-z]$|^ $/.test(event.key) && (quote[position - 1] === " " || position == totalCharacters)) {
            words++;
            document.getElementById("counter").innerHTML = words + "/" + totalWords;
        }
        if (event.key === "Backspace" && quote[position] === " " && words > 0) {
            words--;
            document.getElementById("counter").innerHTML = words + "/" + totalWords;
        }
    }

    moveCursor(position);

    if (position == 1) {
        timeGame();
        document.querySelector('.mode-bar').style.visibility = 'hidden';
    }

    // Scroll the text but keep it at 3 lines
    if (currentChar.getBoundingClientRect().top > 400) {
        const text = document.getElementById("text");
        let margin = parseInt(text.style.marginTop || '0px')
        text.style.marginTop = (margin - 35) + 'px';
    }
}

function timeGame() {
    if (currentMode === 'time') {
        if (timerRunning) return;
        timerRunning = true;

        t = setInterval(function () {
            timer--;
            document.getElementById("counter").innerHTML = timer;
            if (timer <= 0) {
                clearInterval(t);
                endTest();
            }
        }, 1000);
    }
    else if (currentMode === 'words' || currentMode === 'quotes') {
        if (timerRunning) return;
        timerRunning = true;

        t = setInterval(function () {
            timer++;
            if (position == totalCharacters) {
                clearInterval(t);
                endTest();
            }
        }, 100);
    }
}

function endTest() {
    calculateResults();
    document.getElementById("stats").style.display = "block";
}

function calculateResults() {
    if (currentMode === 'time') {
        const wpm = position / 5 / seconds;
        const accuracy = correct / (correct + incorrect) * 100;
        const type = currentMode.charAt(0).toUpperCase() + currentMode.slice(1) + ' (' + currentOption.value + ' seconds)';
        document.getElementById("wpm").innerHTML = "WPM: " + wpm.toFixed(0);
        // document.getElementById("morewpm").innerHTML = wpm.toFixed(2) + " wpm";
        document.getElementById("accuracy").innerHTML = "Accuracy: " + accuracy.toFixed(0) + "%";
        // document.getElementById("moreaccuracy").innerHTML = "Accuracy: " + accuracy.toFixed(2) + "% (" + correct + " correct / " + incorrect + " incorrect)";
        document.getElementById("type").innerHTML = "Test Type: " + type;
    }
    if (currentMode === 'words') {
        const wpm = totalCharacters / 5 / timer * 600;
        const accuracy = correct / (correct + incorrect) * 100;
        const type = currentMode.charAt(0).toUpperCase() + currentMode.slice(1) + ' (x' + currentOption.value + ')';
        document.getElementById("wpm").innerHTML = "WPM: " + wpm.toFixed(0);
        // document.getElementById("morewpm").innerHTML = wpm.toFixed(2) + " wpm";
        document.getElementById("accuracy").innerHTML = "Accuracy: " + accuracy.toFixed(0) + "%";
        // document.getElementById("moreaccuracy").innerHTML = "Accuracy: " + accuracy.toFixed(2) + "% (" + correct + " correct / " + incorrect + " incorrect)";
        document.getElementById("type").innerHTML = "Test Type: " + type;
    }
    else if (currentMode === 'quotes') {
        const wpm = totalCharacters / 5 / timer * 600;
        const accuracy = correct / (correct + incorrect) * 100;
        const type = currentMode.charAt(0).toUpperCase() + currentMode.slice(1) + ' (' + currentOption.value.charAt(0).toUpperCase() + currentOption.value.slice(1) + ')';
        document.getElementById("wpm").innerHTML = "WPM: " + wpm.toFixed(0);
        // document.getElementById("morewpm").innerHTML = wpm.toFixed(2) + " wpm";
        document.getElementById("accuracy").innerHTML = "Accuracy: " + accuracy.toFixed(0) + "%";
        // document.getElementById("moreaccuracy").innerHTML = "Accuracy: " + accuracy.toFixed(2) + "% (" + correct + " correct / " + incorrect + " incorrect)";
        document.getElementById("type").innerHTML = "Test Type: " + type;
    }
}

function resetGameState() {
    timerRunning = false;
    words = 0;
    position = 0;
    correct = 0;
    incorrect = 0;
}

function getWordCount(str) {
    const words = str.trim().split(/\s+/);
    return words.length;
}

function moveCursor(currentPos) {
    const currentChar = document.getElementById(`letter-${currentPos}`);
    const cursor = document.querySelector(".cursor");
    cursor.style.top = currentChar.getBoundingClientRect().top + 'px';
    cursor.style.left = currentChar.getBoundingClientRect().left + 'px';
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}