const { getIntCodeController } = require('./intcode.dasta');

const getGame = () => {
  return {
    gameLayout: [],
    gameElements: [' ', '|', '#', '_', 'o'],
    blocks: 0,
    printGame: function() {
      this.gameLayout.forEach((rows, x) => {
        rows.forEach((element, y) => {
          process.stdout.write(element);
        });
        console.log();
      });
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
      if (Game.gameLayout[x] === undefined) Game.gameLayout[x] = [];
      if (element < Game.gameElements.length) {
        Game.gameLayout[x][y] = Game.gameElements[element];
        if (element === 2) Game.blocks++;
      } else {
        Game.gameLayout[x][y] = Game.gameElements[0];
        console.log(element, 'Not a valid element!');
      }
      Controller.resetOutput();
    }
  }

  Game.printGame();

  return Game.blocks;
};
const part2 = input => {};

module.exports = { part1, part2 };

// Game Layout

// 0 Empty
// 1 Wall - |
// 2 Block - #
// 3 Horizontal Paddle - _
// 4 Ball - o

// |||||||||||||||||||||||||||||||||||||||||
// |            #             #            |
// |    #      # ### #  #                  |
// |          #    ##   #        #         |
// |         #      ####  #  # #     #     |
// |     #  # #     #######  #             |
// |      ##    # #  #   #   #  #          |
// |    #   # # # #  #  #  #  # #  #       |
// |     # #  #  # ##  #   # #  #          |
// |   ##     #     #  ## # # #            |
// |  #    #  ###  # #  ##   #     #       |
// | #                 ##                  |
// |       #             # # #             |
// | #  #  #               #               |
// |                                       |
// |                             o         |
// |                                       |
// |                                       |
// |                             _         |
// |                                       |
