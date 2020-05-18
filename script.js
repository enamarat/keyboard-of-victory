const words = [
  "cat", "dog", "hat", "rat", "book", "hook", "picture", "music",
  "robot", "knight", "sorcerer", "man", "bird", "lion", "boy", "girl",
  "woman", "tree", "tiger", "wolf", "bear", "snake", "reptile", "fox", "rabbit",
  "wizard", "barbarian", "skeleton", "alien", "mutant", "moose", "bull", "cow", "crow",
  "petrol", "oil", "gas", "refrigerator", "horse", "meditation", "shoes", "conclusion",
  "pretext", "imagination", "strength", "avalanche", "trigonometry", "delusion", "courage",
  "serenity"
];
let displayedWords = [];
const arenaWidth = document.querySelector("#arena").offsetWidth;

// time
let startTime = null;

const generateWord = () => {
  let totalWidth = 0;
    const myFunction = function() {
      /**********/
      const word = document.createElement("div");
      word.className = "word";
      const randomIndex = () => {
        return Math.floor(Math.random() * words.length);
      }
      let randomWord = words[randomIndex()];

      /* if the same word has already been displayed on the screen and yet not destroyed
      prevent it from duplicating. Reroll random index and choose another random word */
      const isEqual = (element) => element.name === randomWord;
      while (displayedWords.some(isEqual)) {
        randomWord = words[randomIndex()];
      }

      for (let i = 0; i < randomWord.length; i++) {
        word.innerHTML  +=  `<span>${randomWord[i]}</span>`;
      }
      document.querySelector("#arena").appendChild(word);
      const generatedWords = document.querySelectorAll(".word");

      displayedWords.push({name:randomWord, count:0});
      generatedWords[generatedWords.length-1].style.left = totalWidth + "px";
      /************/
      totalWidth += generatedWords[generatedWords.length-1].offsetWidth;
      if (arenaWidth-totalWidth < generatedWords[generatedWords.length-1].offsetWidth) {
        totalWidth = 0;
      }

      // game over
      generatedWords[generatedWords.length-1].addEventListener("animationend", () => {
        over(false);
      }, false);

      return totalWidth;
    }
    return myFunction;
}


// start the game for the first time
let timer = null;
let timer2 = null;

const startGame = (event) => {
  if (event.target.textContent === "Start") {
    document.querySelector("#starting-screen").style.display = "none";
  } else if (event.target.textContent === "Restart") {
    // remove all displayed words from the screen
    const generatedWords = document.querySelectorAll(".word");
    for (let i = 0; i < generatedWords.length; i++) {
        document.querySelector("#arena").removeChild(generatedWords[i]);
    }
    displayedWords = [];

    // remove final screen
    let finalScreens = document.querySelectorAll(".final");
    for (let i = 0; i < finalScreens.length; i++) {
      finalScreens[i].style.display = "none";
    }

    // display on the screen that seconds elapsed are now equal to zero again
    document.querySelector("#secondsElapsed").textContent = `Seconds elapsed: 0`;
  }

  startTime = new Date().getTime();
  const foo = generateWord();

  // this timer generates a new word every two seconds
  timer = window.setInterval(()=> {
   foo();
  }, 2000);

   // this timer counts seconds elapsed
   timer2 = window.setInterval(()=> {
   let currentTime = new Date().getTime();
   let secondsElapsed = Math.floor(((currentTime - startTime)/1000));
   document.querySelector("#secondsElapsed").textContent = `Seconds elapsed: ${secondsElapsed}`;
   // end of the level
   if (secondsElapsed === 60) {
     over(true);
   }
  }, 1000);
}
let startButtons = document.querySelectorAll(".start");
for (let i = 0; i < startButtons.length; i++) {
  startButtons[i].addEventListener("click", startGame);
}

// when the game is over
const over = (victory) => {
  window.clearInterval(timer);
  window.clearInterval(timer2);
  const generatedWords = document.querySelectorAll(".word");
  for (let i = 0; i < generatedWords.length; i++) {
    generatedWords[i].className = "word paused";
  }
  if (victory === true) {
    document.querySelector("#victory").style.display = "flex";
  } else if (victory === false) {
    document.querySelector("#defeat").style.display = "flex";
  }
}

const typeLetters = (event) => {
  const currentWords = document.querySelectorAll(".word");
  for (let a = 0; a < displayedWords.length; a++) {
      if (event.key === displayedWords[a].name[displayedWords[a].count]) {
          currentWords[a].childNodes[displayedWords[a].count].style.color = "red";
          currentWords[a].childNodes[displayedWords[a].count].style.fontWeight = "bold";
          displayedWords[a].count += 1;
        } else {
          displayedWords[a].count = 0;
          for (let b = 0; b < document.querySelectorAll(".word")[a].childNodes.length; b++) {
             document.querySelectorAll(".word")[a].childNodes[b].style.color = "black";
             document.querySelectorAll(".word")[a].childNodes[b].style.fontWeight = "normal";
           }
        }
        // remove word if all its letters are type correctly
        if (displayedWords[a].count === displayedWords[a].name.length) {
          document.querySelectorAll(".word")[a].style.backgroundColor = "black";
          window.setTimeout(() => {
            document.querySelector("#arena").removeChild(document.querySelectorAll(".word")[a]);
            displayedWords = displayedWords.filter(word => word.name != displayedWords[a].name);
          }, 500);
        }
  }
}
window.addEventListener("keypress", typeLetters);
