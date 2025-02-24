const options = document.getElementById("mode-options");
const time_button = document.getElementById("mode-time");
const words_button = document.getElementById("mode-words");
const quotes_button = document.getElementById("mode-quotes");

time_button.addEventListener("click", function() {
    options.innerHTML = "<li><button>15</button></li><li><button>30</button></li><li><button>60</button></li>";
})

words_button.addEventListener("click", function() {
    options.innerHTML = "<li><button>10</button></li><li><button>25</button></li><li><button>50</button></li>";
})

quotes_button.addEventListener("click", function() {
    options.innerHTML = "<li><button>Short</button></li><li><button>Medium</button></li><li><button>Long</button></li>";
})

var timer = 30;
var seconds = timer / 60;
var position = 0;
var correct = 0;
var incorrect = 0;

const quotes = ["The old clock on the wall ticked loudly, echoing through the empty room. Sarah sat at her desk, fingers hovering over the keyboard, searching for inspiration. Outside, raindrops pattered against the window pane, creating a soothing rhythm. She took a deep breath, closed her eyes, and began to type, letting the words flow freely from her imagination.", 
                "As the sun dipped below the horizon, painting the sky in vibrant oranges and pinks, Jack hurried along the busy street. He clutched a small package tightly, weaving through the crowd of commuters heading home. The city hummed with energy, a symphony of car horns, chatter, and footsteps on concrete. Jack checked his watch, quickening his pace.",
                "The aroma of freshly baked bread wafted through the air, drawing customers into the small bakery. Emma kneaded dough with practiced hands, her mind wandering to the day ahead. She loved the early morning quiet, broken only by the whir of mixers and the occasional ding of the oven timer. As the first rays of sunlight streamed through the window, Emma smiled text-displayedly.",
                "Dr. Martinez peered into the microscope, adjusting the focus carefully. The tiny organisms danced in his field of view, a microscopic ballet of life. He jotted down notes, his excitement growing with each observation. This could be the breakthrough he'd been searching for, the key to unlocking a medical mystery that had puzzled scientists for decades. He leaned back, mind racing with possibilities."];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

var quote = quotes[getRandomInt(quotes.length)];

quote = quotes[getRandomInt(quotes.length)];
document.getElementById("quote").innerHTML = quote.split("")
    .map((char, pos) => `<span id="letter-${pos}">${char}</span>`)
    .join("");
document.getElementById("timer").innerHTML = timer.toString();

document.addEventListener("keydown", handleKeydown);

document.getElementById("newGameButton").addEventListener('click', () => {
    newGame();
    document.getElementById("stats").style.display = "none";
});


function timeGame() {
    const visibility = document.getElementById("timer");
    visibility.style.visibility = "visible";
    var t = setInterval(function() {
        timer--;
        document.getElementById("timer").innerHTML = timer;
        if (timer <= 0) {
            clearInterval(t);
            endTest();
        }
    }, 1000);
}

function handleKeydown(event) {
    if (timer <= 0) {
        return;
    }
    let currentChar = document.getElementById(`letter-${position}`);
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
    moveCursor(position);
    if (position == 1) {
        timeGame();
    }
}

function moveCursor(currentPos) {
    const currentChar = document.getElementById(`letter-${currentPos}`);
    const cursor = document.querySelector(".cursor");
    cursor.style.top = currentChar.getBoundingClientRect().top + 'px';
    cursor.style.left = currentChar.getBoundingClientRect().left + 'px';
}

function endTest() {
    calculateResults();
    document.getElementById("stats").style.display = "block";
}

function calculateResults() {
    const wpm = position / 5 / seconds;
    const accuracy = correct / (correct + incorrect) * 100;
    var type = "30 seconds";
    document.getElementById("wpm").innerHTML = "WPM: " + wpm.toFixed(0);
    // document.getElementById("morewpm").innerHTML = wpm.toFixed(2) + " wpm";
    document.getElementById("accuracy").innerHTML = "Accuracy: " + accuracy.toFixed(0) + "%";
    // document.getElementById("moreaccuracy").innerHTML = "Accuracy: " + accuracy.toFixed(2) + "% (" + correct + " correct / " + incorrect + " incorrect)";
    document.getElementById("type").innerHTML = "Test Type: " + type;
}

function newGame() {        
    timer = 30;
    seconds = timer/60;
    position = 0;
    correct = 0;
    incorrect = 0;

    quote = quotes[getRandomInt(quotes.length)];
    document.getElementById("quote").innerHTML = quote.split("")
        .map((char, pos) => `<span id="letter-${pos}">${char}</span>`)
        .join("");
    document.getElementById("timer").innerHTML = timer.toString();
}