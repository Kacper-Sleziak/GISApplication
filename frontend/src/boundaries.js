import { boundariesCityStyle } from './styles'
import Polygon from 'ol/geom/Polygon'
import { Feature } from 'ol'
import axios from 'axios'
import { map, boundariesVectorLayer } from './map'

const boundaryArr = []

// Fetching boundaries of NY city from open API
axios
  .get('https://nominatim.openstreetmap.org/search.php?q=New%20York&polygon_geojson=1&format=json')
  .then(response => {
    const coordinates = response.data[0].geojson.coordinates[0][0]
    coordinates.forEach(coordinate => {
      const x = coordinate[0]
      const y = coordinate[1]

      boundaryArr.push([x, y])
    })

    const feature = new Feature({
      geometry: new Polygon([boundaryArr]),
      name: 'Boundaries'
    })

    boundariesVectorLayer.setStyle(boundariesCityStyle)

    boundariesVectorLayer.getSource().addFeature(feature)
    map.addLayer(boundariesVectorLayer)
  })

const boundariesInitializer = undefined
export default boundariesInitializer
