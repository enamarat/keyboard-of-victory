const words = [
  "cat", "dog", "hat", "rat", "book", "hook", "picture", "music",
  "robot", "knight", "sorcerer", "man", "bird", "lion", "boy", "girl",
  "woman", "tree", "tiger", "wolf", "bear", "snake", "reptile", "fox", "rabbit",
  "wizard", "barbarian", "skeleton", "alien", "mutant", "moose", "bull", "cow", "crow",
  "petrol", "oil", "gas", "refrigerator"
];


let displayedWords = [];
console.log(document.querySelector("#arena").offsetWidth);
const arenaWidth = document.querySelector("#arena").offsetWidth;

//let totalWidth = 0;
const generateWord = () => {
  let totalWidth = 0;
    const myFunction = function() {
      /**********/
      const word = document.createElement("div");
      word.className = "word";
      const randomIndex = Math.floor(Math.random() * words.length);
      const randomWord = words[randomIndex];
      for (let i = 0; i < randomWord.length; i++) {
        word.innerHTML  +=  `<span>${randomWord[i]}</span>`;
      }
      document.querySelector("#arena").appendChild(word);
      const generatedWords = document.querySelectorAll(".word");
  const screenWidth = window.screen.width;
      displayedWords.push({name:randomWord, count:0});
      generatedWords[generatedWords.length-1].style.left = totalWidth + "px";
      /************/



      if (arenaWidth-totalWidth < generatedWords[generatedWords.length-1].offsetWidth) {
  console.log(`element's width: ${generatedWords[generatedWords.length-1].offsetWidth}`);
  console.log(`remaining width: ${arenaWidth-totalWidth}`);
        totalWidth = 0;
      } else {
        totalWidth += generatedWords[generatedWords.length-1].offsetWidth;
      }
      /*************/
      //generatedWords[generatedWords.length-1].addEventListener("animationend", () => console.log("Game over!"), false);
      /************/

      return totalWidth;
    }
    return myFunction;

}

const foo = generateWord();
const timer = window.setInterval(()=> {
  foo();
}, 1000);

setTimeout(() => {
  window.clearInterval(timer);
}, 20000);


console.log(displayedWords);

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
