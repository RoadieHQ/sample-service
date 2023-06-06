
var fs = require('fs')
    , filename = '/Users/sblausten/Downloads/refresh_state_202305181203.json';
const locationsRaw = fs.readFileSync('/Users/sblausten/Downloads/locations_202305181224.json', 'utf8')
const locations = JSON.parse(locationsRaw).reduce(
    (accumulator, currentValue) => ([...accumulator, currentValue.target]), []
);
console.log(locations)
fs.readFile(filename, 'utf8', function(err, data) {
    if (err) throw err;
    console.log('OK: ' + filename);
    // console.log(JSON.parse(data))
    const parsedData = JSON.parse(data).map(e => {
        const entity = JSON.parse(e.unprocessed_entity)
        const managedByLocation = entity.metadata.annotations["backstage.io/managed-by-location"]
        const managedByOriginLocation = entity.metadata.annotations["backstage.io/managed-by-origin-location"]
        return { entity_ref: e.entity_ref, managedByLocation, managedByOriginLocation, entityLink: `https://yotpo.roadie.so/catalog/${entity.metadata.namespace || 'default'}/${entity.kind.toLowerCase()}/${entity.metadata.name}`}
    }).filter(e => !e.managedByLocation.startsWith('preview'))

    // console.log()
    const effectedData = parsedData.filter(e => !locations.includes(`url:${e.managedByLocation}`))
    console.log(`${parsedData.length} - ${effectedData.length}`)
    console.log(effectedData)
});

