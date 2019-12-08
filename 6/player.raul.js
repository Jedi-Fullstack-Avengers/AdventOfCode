const part1 = data => {
   const map = createMap(data)()();
   
   return getAllOrbits(map);
   //return JSON.stringify(map);
};

const part2 = data => {
   const map = createMap(data)()();
   const youPlanet = map.YOU ? map.YOU.parents[0] : null;
   const sanPlanet = map.SAN ? map.SAN.parents[0] : null;
   
   //return youPlanet.parents[youPlanet.parents.length-1];

   if (!youPlanet && !sanPlanet) return 'MISSED!';
   return getOrbitsBetween(map)(youPlanet)(sanPlanet);
};

const getAllOrbits = map => {
   return Object.keys(map).reduce((acc, curr) => acc + map[curr].distance, 0);
};

const getOrbitsBetween = map => planetA => planetB => {
    let index = map[planetA].parents.indexOf(planetB);
	
	if (index === -1) index = map[planetB].parents.indexOf(planetA);
	
	if (index >= 0) {
		return index + 1;
	} else {
		return 1 + getOrbitsBetween(map)(map[planetA].parents[0])(planetB);
	}
};

const createMap = data => ({...map} = {}) => (i=0) => {
   const [planet, satellite] = data[i].split(")");
   const satelliteData = map[satellite] || {satellites: []};
  
   if (map[planet]) {
      map[planet].satellites.push(satellite);
      satelliteData.distance = map[planet].distance + 1;
      satelliteData.parents = [planet, ...map[planet].parents];
   } else {
      map[planet] = {
         distance: 0,
         parents: [],
         satellites: [satellite]
      };
      satelliteData.distance = 1;
      satelliteData.parents = [planet];
   }

   map[satellite] = satelliteData;
   refreshOrbits(map)(satellite);
   
   if (++i < data.length) return createMap(data)(map)(i);
   return map;
};

const refreshOrbits = map => planet => {
   map[planet].satellites.forEach(satellite => {
      map[satellite].distance = map[planet].distance + 1;
      map[satellite].parents = [planet, ...map[planet].parents];
      refreshOrbits(map)(satellite);
   });
};

module.exports = {part1, part2};