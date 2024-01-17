const gamesContainer = document.querySelector("#games-container");
const openNew = false;

// game class
class Game {
  constructor({ content, gameLink, wip = true }) {
    this.content = content;
    this.gameLink = gameLink;
    this.wip = wip;
  }

  createEl() {
    const div = document.createElement("div");
    div.classList.add("game");
    if (this.wip) div.classList.add("wip");
    div.innerHTML = `
    <p>${this.content}</p>
    `;
    div.addEventListener("click", () => {
      if (openNew) window.open(this.gameLink, "_blank");
      else window.location.href = this.gameLink;
    });

    return div;
  }
}

// game category class
class Category {
  constructor({ title }) {
    this.title = title;
  }

  createEl() {
    const div = document.createElement("div");
    div.classList.add("category");
    div.innerHTML = `
    <h2>${this.title}</h2>
    <div class="game-container"></div>
    `;

    return div;
  }
}

// array containing all the categories and games
const games = [
  [
    "Classics",
    new Game({
      content: "Snake",
      gameLink: "./games/classics/snake/index.html",
      wip: false,
    }),
    new Game({
      content: "Connect 4",
      gameLink: "./games/classics/connect_4/index.html",
      wip: false,
    }),
    new Game({
      content: "Tic Tac Toe",
      gameLink: "./games/classics/tic_tac_toe/index.html",
      wip: false,
    }),
    new Game({
      content: "Minesweeper",
      gameLink: "./games/classics/minesweeper/index.html",
      wip: false,
    }),
    new Game({
      content: "Sudoku",
      gameLink: "./games/classics/sudoku/index.html",
      wip: false,
    }),
    new Game({
      content: "Chess",
      gameLink: "./games/classics/chess/index.html",
      wip: false,
    }),
    new Game({
      content: "Ping Pong",
      gameLink: "./games/classics/ping_pong/index.html",
      wip: false,
    }),
  ],
  [
    "Fun",
    new Game({
      content: "2048",
      gameLink: "./games/fun/2048/index.html",
      wip: false,
    }),
    new Game({
      content: "Infinite Wordle",
      gameLink: "./games/fun/inf_wordle/index.html",
      wip: false,
    }),
  ],
  [
    "From Tutorials",
    new Game({
      content: "Ball Shooter",
      gameLink: "./games/tutorials/canvas_game/index.html",
      wip: false,
    }),
    new Game({
      content: "Space Invaders",
      gameLink: "./games/tutorials/space_invaders/index.html",
      wip: false,
    }),
    new Game({
      content: "Asteroids",
      gameLink: "./games/tutorials/asteroids/index.html",
      wip: false,
    }),
    new Game({
      content: "Steampunk Shooter",
      gameLink: "./games/tutorials/steampunk_shooter/index.html",
      wip: false,
    }),
    new Game({
      content: "Jumper Cube",
      gameLink: "./games/tutorials/jumper_cube/index.html",
      wip: false,
    }),
    new Game({
      content: "Pacman",
      gameLink: "./games/tutorials/pacman/index.html",
      wip: false,
    }),
    new Game({
      content: "Fighter",
      gameLink: "./games/tutorials/fighter/index.html",
      wip: false,
    }),
    new Game({
      content: "Hangman",
      gameLink: "./games/tutorials/hangman/index.html",
      wip: false,
    }),
  ],
];