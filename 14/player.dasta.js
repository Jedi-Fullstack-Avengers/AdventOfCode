const getNanoFactory = recipes => {
  const reactionList = {};
  let currentCargo = {};

  recipes.forEach(recipe => {
    const [ingredients, resultant] = recipe.split('=>');
    reactionList[resultant.trim().split(' ')[1]] = {
      requirements: ingredients
        .trim()
        .split(',')
        .map(ingredient => {
          const [number, type] = ingredient.trim().split(' ');
          return `${type}:${number}`;
        }),
      resultUnits: parseInt(resultant.trim().split(' ')[0])
    };
  });

  return {
    totalRawMaterial: 0,
    fuel: 0,
    getRecipe: function(material) {
      if (reactionList[material] === undefined) {
        //console.log(`Material ${material} does not have recipe!`);
        return -1;
      }

      return reactionList[material];
    },
    addCargo: function(type, number) {
      //console.log('addCargo', type, number);
      if (currentCargo[type] !== undefined) {
        currentCargo[type] += number;
      } else {
        currentCargo[type] = number;
      }
      //console.log(currentCargo[type]);
    },
    retrieveCargo: function(type, number) {
      //console.log('retrieveCargo', type, number);
      currentCargo[type] -= number;
      //console.log(currentCargo[type]);
    },
    checkCargo: function(type) {
      return currentCargo[type] === undefined ? -1 : currentCargo[type];
    },
    chemicalReaction: function(material) {
      const mainRecipe = this.getRecipe(material);
      /*console.log(
        `Chemical reaction for ${material} needs`,
        mainRecipe.requirements,
        mainRecipe.resultUnits
      );*/
      mainRecipe.requirements.forEach(subMaterial => {
        const [type, number] = subMaterial.split(':'); // A : 7

        if (type === 'ORE') {
          this.totalRawMaterial += parseInt(number);
          //console.log('Added OREx', number);
        } else if (this.checkCargo(type) !== undefined && this.checkCargo(type) >= number) {
          this.retrieveCargo(type, number);
          //console.log(`Cargo have enough ${type}`);
        } else {
          while (this.checkCargo(type) < number) {
            const result = this.chemicalReaction(type);
            this.addCargo(type, result);
          }

          this.retrieveCargo(type, number);
        }
      });

      return mainRecipe.resultUnits;
    }
  };
};

const part1 = input => {
  const NanoFactory = getNanoFactory(input);

  NanoFactory.chemicalReaction('FUEL');

  return NanoFactory.totalRawMaterial;
};
const part2 = input => {
  // const NanoFactory = getNanoFactory(input);

  // do {
  //   NanoFactory.chemicalReaction('FUEL');
  //   NanoFactory.fuel++;
  // } while (NanoFactory.totalRawMaterial <= 1000000000000);

  // return NanoFactory.fuel;
};

module.exports = { part1, part2 };

// 10 ORE => 10 A
// 1 ORE => 1 B
// 7 A, 1 B => 1 C
// 7 A, 1 C => 1 D
// 7 A, 1 D => 1 E
// 7 A, 1 E => 1 FUEL

/*FUEL: {
    requirements: ['7A', '1E'],
    requirements: {
        A: 7,
        E: 1
    }
    resultUnits: 1
}

A: {
    requirements: ['10ORE'],
    resultUnits: 10
}*/
