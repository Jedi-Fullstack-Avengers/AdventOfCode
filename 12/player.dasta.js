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
    }
  };
};

const getCelestialSystem = celestialObjects => {
  return {
    celestialObjects: celestialObjects,
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

  let next = true;

  do {
    CelestialSystem.updateSystem();
    CelestialSystem.moveSystem();
    timeLapse++;

    if (
      CelestialSystem.celestialObjects[0].getKineticEnergy() === 0 &&
      CelestialSystem.celestialObjects[1].getKineticEnergy() === 0 &&
      CelestialSystem.celestialObjects[2].getKineticEnergy() === 0 &&
      CelestialSystem.celestialObjects[3].getKineticEnergy() === 0
    ) {
      next = false;
    }
  } while (next);

  return timeLapse * 2;
};

module.exports = { part1, part2 };
