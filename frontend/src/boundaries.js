import { boundariesCityStyle } from './styles'
import VectorSource from 'ol/source/Vector'
import Polygon from 'ol/geom/Polygon'
import { Feature } from 'ol'
import VectorLayer from 'ol/layer/Vector'
import axios from 'axios'
import { map } from './map'

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

    const vectorLayer = new VectorLayer({
      source: new VectorSource({}),
      visible: true,
      title: 'BoundariesLayer',
      style: boundariesCityStyle
    })

    vectorLayer.getSource().addFeature(feature)
    map.addLayer(vectorLayer)
  })

const boundariesInitializer = undefined
export default boundariesInitializer
