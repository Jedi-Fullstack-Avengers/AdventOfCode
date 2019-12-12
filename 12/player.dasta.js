const getCelestialObject = (
  name = '',
  position = { x: 0, y: 0, z: 0 },
  velocity = { x: 0, y: 0, z: 0 }
) => {
  return {
    name: name,
    position: position,
    velocity: velocity,
    getPotentialEnergy: function() {
      return Math.abs(position.x) + Math.abs(position.y) + Math.abs(position.z);
    },
    getKineticEnergy: function() {
      return Math.abs(velocity.x) + Math.abs(velocity.y) + Math.abs(velocity.z);
    },
    getTotalEnergy: function() {
      return this.getPotentialEnergy() * this.getKineticEnergy();
    },
    calculateVelocity: function(celestialObject) {
      Object.keys(this.position).forEach(key => {
        if (this.position[key] > celestialObject.position[key]) this.velocity[key] -= 1;
        else if (this.position[key] < celestialObject.position[key]) this.velocity[key] += 1;
      });
    },
    advance: function() {
      Object.keys(this.position).forEach(key => {
        this.position[key] += this.velocity[key];
      });
    },
    checkStatus: function() {
      console.log(
        this.name,
        this.position,
        this.velocity,
        this.getPotentialEnergy(),
        this.getKineticEnergy(),
        this.getTotalEnergy(),
        this.getValue()
      );
    },
    getValue: function() {
      return (
        this.name +
        Object.values(this.position).join(',') +
        ',' +
        Object.values(this.velocity).join(',')
      );
    }
  };
};

const getCelestialSystem = celestialObjects => {
  return {
    celestialObjects: celestialObjects,
    previousState: {},
    updateSystem: function() {
      this.celestialObjects.forEach(celestialObject => {
        this.celestialObjects.forEach(co => {
          if (celestialObject !== co) celestialObject.calculateVelocity(co);
        });
      });
    },
    moveSystem: function() {
      this.celestialObjects.forEach(celestialObject => {
        celestialObject.advance();
      });
    },
    calculateTotalEnergy: function() {
      return this.celestialObjects.reduce(
        (energy, celestialObject) => energy + celestialObject.getTotalEnergy(),
        0
      );
    },
    checkStatus: function() {
      this.celestialObjects.forEach(celestialObject => {
        celestialObject.checkStatus();
      });
    },
    registerState: function() {
      const hash = this.celestialObjects.reduce(
        (accumulator, celestialObject) => accumulator + celestialObject.getValue(),
        0
      );
      this.previousState[hash] = 1;
    },
    isPreviousState: function() {
      const hash = this.celestialObjects.reduce(
        (accumulator, celestialObject) => accumulator + celestialObject.getValue(),
        0
      );
      return this.previousState[hash] === 1;
    }
  };
};

const moonNames = ['Io', 'Europa', 'Ganymede', 'Callisto'];

const part1 = input => {
  let timeLapse = 1000;
  const CelestialSystem = getCelestialSystem(
    input.map((celestialObject, index) => {
      const coordinates = celestialObject.match(/-*(\d+)/g);
      return getCelestialObject(moonNames[index], {
        x: parseInt(coordinates[0]),
        y: parseInt(coordinates[1]),
        z: parseInt(coordinates[2])
      });
    })
  );

  while (timeLapse--) {
    CelestialSystem.updateSystem();
    CelestialSystem.moveSystem();
  }

  return CelestialSystem.calculateTotalEnergy();
};

const part2 = input => {
  let timeLapse = 0;
  const CelestialSystem2 = getCelestialSystem(
    input.map((celestialObject, index) => {
      const coordinates = celestialObject.match(/-*(\d+)/g);
      return getCelestialObject(moonNames[index], {
        x: parseInt(coordinates[0]),
        y: parseInt(coordinates[1]),
        z: parseInt(coordinates[2])
      });
    })
  );

  do {
    CelestialSystem2.registerState();
    CelestialSystem2.updateSystem();
    CelestialSystem2.moveSystem();
    timeLapse++;
  } while (!CelestialSystem2.isPreviousState());

  return timeLapse;
};

module.exports = { part1, part2 };
