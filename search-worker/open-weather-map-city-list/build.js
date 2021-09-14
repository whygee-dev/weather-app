const fs = require('fs');

fs.readFile('city.list.json', 'utf8', (err, data) => {
  if (err) throw err;

  const cityList = JSON.parse(data);
  let res = '"';

  for (let i = 0; i < cityList.length; i++) {
    res += `@${(cityList[i].name + " " + cityList[i].coord.lon + " " + cityList[i].coord.lat + " " + cityList[i].country).replace("'", "").replace('"', '')}@`;

  }

  res = res.slice(0, -1) + '"';

  fs.writeFile('index.js', `module.exports = ${res};`, err => {
    if (err) throw err;
  });
});
