const list = require('./open-weather-map-city-list/index');
console.log('Loaded list');

const search = (keyword) => {
    const results = [];
    if (keyword.length <= 2) return results;

    const regex = new RegExp("@([^@]*"+keyword+"[^@]*)@",'gi');

    let i = 0, result = regex.exec(list);

    while (result && i < 100) {
        results.push(result[1]);
        result = regex.exec(list)
        i++;
    }
    return results;
}

const sortResults = (results, limit) => {
    const transformed = results.map((item) => {
        const country = item.slice(-2);
        const cityWithCoords = item.slice(0, item.length - 3);

        const coordsStr = cityWithCoords.replace('/[^\d.- ]/g','');

        const split = coordsStr.split(' ');

        const lon = split[split.length - 2]
        const lat = split[split.length - 1];

        const city = cityWithCoords.replace(lon, "").replace(lat, "").slice(0, -2);

        const raw = city + " " + country;
        return {city, country, lon, lat, raw};
    });

    const alphabeticallySorted = transformed.sort((a, b) => {
        return (a.raw).localeCompare(b.raw);
    });

    const sorted = alphabeticallySorted.sort((a, b) => {
        return (a.raw).length - (b.raw).length;
    });

    const uniqueAndSorted = sorted.filter((item, index, self) => {
        return index  === self.findIndex((i) => {
            return i.city === item.city && i.country === item.country;
        });
    }).slice(0, 20);

    return uniqueAndSorted;
}

onmessage = (e) => {
    postMessage(sortResults(search(e.data), 10));
}

export default list;