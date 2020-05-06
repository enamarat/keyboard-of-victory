const words = [
  "cat", "dog", "hat", "rat", "book", "hook", "picture", "music",
  "robot", "knight", "sorcerer", "man", "bird", "lion", "boy", "girl",
  "woman", "tree", "tiger", "wolf", "bear", "snake", "reptile", "fox", "rabbit",
  "wizard", "barbarian", "skeleton", "alien", "mutant", "moose", "bull", "cow", "crow",
  "petrol", "oil", "gas", "refrigerator"
];
let displayedWords = [];
const arenaWidth = document.querySelector("#arena").offsetWidth;

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
      /*************/
      // gameOver
      generatedWords[generatedWords.length-1].addEventListener("animationend", () => {
        over();
      }, false);
      /************/

      return totalWidth;
    }
    return myFunction;
}

const foo = generateWord();
const timer = window.setInterval(()=> {
  foo();
}, 2000);

setTimeout(() => {
  window.clearInterval(timer);
}, 30000);

// when the game is over
const over = () => {
  window.clearInterval(timer);
  //document.querySelector("body").className = "gameEnded";
  const generatedWords = document.querySelectorAll(".word");
  for (let i = 0; i < generatedWords.length; i++) {
    generatedWords[i].className = "word paused";
  }
  document.querySelector("#final").style.display = "flex";
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
          setTimeout(() => {
            document.querySelector("#arena").removeChild(document.querySelectorAll(".word")[a]);
            displayedWords = displayedWords.filter(word => word.name != displayedWords[a].name);
          }, 1000);
        }
  }
}

window.addEventListener("keypress", typeLetters);
