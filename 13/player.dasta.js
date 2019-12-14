const { getIntCodeController } = require('./intcode.dasta');

const getGame = () => {
  return {
    gameLayout: [],
    gameElements: [' ', '|', '#', '_', '·'],
    blocks: 0,
    score: 0,
    ballPosition: [0, 0],
    paddlePosition: [0, 0],
    gameStarted: false,
    printGame: function() {
      this.gameLayout.forEach(rows => {
        rows.forEach(element => {
          process.stdout.write(element);
        });
        console.log();
      });
    },
    isScore: function(data) {
      return data && data[0] === -1 && data[1] === 0;
    },
    getScore: function(data) {
      if (data && data[0] === -1 && data[1] === 0) {
        this.score = data[2];
        return this.score;
      }
    }
  };
};

const part1 = input => {
  const intCode = [...input];
  const Controller = getIntCodeController(intCode, 3);
  const Game = getGame();

  while (Controller.getOpCode() !== 99) {
    Controller.runIntComputer();
    if (Controller.getOpCode() === 4) {
      const x = Controller.output[0];
      const y = Controller.output[1];
      const element = Controller.output[2];
      if (Game.gameLayout[y] === undefined) Game.gameLayout[y] = [];
      if (element < Game.gameElements.length) {
        Game.gameLayout[y][x] = Game.gameElements[element];
        if (element === 2) Game.blocks++;
      } else {
        Game.gameLayout[y][x] = Game.gameElements[0];
        console.log(element, 'Not a valid element!');
      }
      Controller.resetOutput();
    }
  }

  //Game.printGame();

  return Game.blocks;
};
const part2 = input => {
  const intCode = [...input];
  const Controller = getIntCodeController(intCode, 3);
  const Game = getGame();

  Controller.intCode[0] = 2;

  while (Controller.getOpCode() !== 99) {
    Controller.runIntComputer();
    if (Controller.getOpCode() === 4) {
      if (Game.isScore(Controller.output)) {
        Game.gameStarted = true;
        //console.log('Score:', Game.getScore(Controller.output));
        Game.getScore(Controller.output);
      } else {
        const x = Controller.output[1];
        const y = Controller.output[0];
        const element = Controller.output[2];
        if (Game.gameLayout[x] === undefined) Game.gameLayout[x] = [];
        if (element < Game.gameElements.length) {
          if (element === 3) {
            Game.gameLayout[Game.paddlePosition[0]][Game.paddlePosition[1]] = ' ';
            Game.paddlePosition = [x, y];
          }
          if (element === 4) {
            Game.gameLayout[Game.ballPosition[0]][Game.ballPosition[1]] = ' ';
            Game.ballPosition = [x, y];
          }
          if (element === 2) Game.blocks++;
          Game.gameLayout[x][y] = Game.gameElements[element];
        } else {
          Game.gameLayout[x][y] = Game.gameElements[0];
          console.log(element, 'Not a valid element!');
        }
      }
    }

    if (Controller.getOpCode() === 3) {
      //Game.printGame();
      const direction = Math.sign(Game.ballPosition[1] - Game.paddlePosition[1]);
      Controller.runIntComputer([direction]);
    }

    Controller.resetOutput();
  }

  return Game.score;
};

module.exports = { part1, part2 };

// Joystick

// 0 - Neutral position
// -1 - Left
// 1 - Right

// Game Layout

// 0 Empty
// 1 Wall - |
// 2 Block - #
// 3 Horizontal Paddle - _
// 4 Ball - ·

// |||||||||||||||||||||||||||||||||||||
// |                                   |
// | #### #   # ###### ### # # ## ## # |
// | #  # ### ######### ## ##### ###   |
// | # ###  #### # #  ####### ## #  #  |
// | # #### ##     #####     ###  #  # |
// |  #    # # ####  # ##  ## # #### # |
// | ## ##     # #  ### ## #### ####   |
// | ###### # ### ##############  # #  |
// | #####  # # ##    #  ######   ###  |
// |  ####  # ##      ######## ###   # |
// | # ### # #### ####  ##  #   ####   |
// | # #######  #  ###  ## # # ##### # |
// | ### # ## #####   ## ## #    ###   |
// | ##  ###  # ###  ###  ####   # ### |
// |     ## ## ## ###   ##  ## #  ## # |
// | # # ##  ## # # ## #  ## ## ###### |
// | #  # ### ######  #  ##  ####  ##  |
// | #### ### ####  ### # # ## ##  ##  |
// | #####   ###### ### ## #####   ##  |
// |                                   |
// |               ·                   |
// |                                   |
// |                                   |
// |                 _                 |
// |                                   |
