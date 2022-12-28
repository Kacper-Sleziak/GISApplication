import { map, subwayStationAreaLayerGroup } from '../../map'
import { Draw, Snap } from 'ol/interaction'
import { Vector as VectorSource } from 'ol/source'
import { Vector as VectorLayer } from 'ol/layer'
import { Feature } from 'ol'
import { GeometryCollection, Point, Polygon } from 'ol/geom.js'
import { circular } from 'ol/geom/Polygon.js'
import { getDistance } from 'ol/sphere.js'
import { subwayPointStyle } from '../../styles'
import axios from 'axios'
import Collection from 'ol/Collection'
import { drawStyle } from '../../styles'

const source = new VectorSource()
const vectorDrawLayer = new VectorLayer({
  source,
  title: 'DrawLayer',
  style: drawStyle
})

map.addLayer(vectorDrawLayer)

// variables for later use
let center, radius

const geometryFunction = function (coordinates, geometry, projection) {
  if (!geometry) {
    geometry = new GeometryCollection([
      new Polygon([]),
      new Point(coordinates[0])
    ])
  }

  const geometries = geometry.getGeometries()
  center = coordinates[0]
  const last = coordinates[1]
  radius = getDistance(center, last)
  const circle = circular(center, radius, 128)

  geometries[0].setCoordinates(circle.getCoordinates())
  geometry.setGeometries(geometries)

  return geometry
}

const draw = new Draw({
  source,
  type: 'Circle',
  active: false,
  geometryFunction
})

const snap = new Snap({ source })
map.addInteraction(snap)

// Event listener on drawing end
draw.on('drawend', function () {
  const X = center[0]
  const Y = center[1]

  const subwayCollection = new Collection()

  axios
    .post('http://127.0.0.1:8000/subway/area/', {
      X,
      Y,
      radius
    })
    .then((response) => {
      const subwayStations = response.data
      subwayStations.forEach(station => {
        // Reading x and y from API
        const x = station.coordinates[0]
        const y = station.coordinates[1]

        // Seting feature
        const featurePoint = new Feature({
          name: 'Subway',
          label: station.name,
          geometry: new Point([x, y])
        })

        const layerVector = new VectorLayer({
          source: new VectorSource({}),
          title: 'SubwaysLayer',
          style: subwayPointStyle
        })

        // Adding Layer to collection
        layerVector.getSource().addFeature(featurePoint)
        subwayCollection.push(layerVector)
      })

      // Setting layersGroup
      subwayStationAreaLayerGroup.setLayers(subwayCollection)
      subwayStationAreaLayerGroup.setVisible(true)
      map.removeLayer(subwayStationAreaLayerGroup)
      map.addLayer(subwayStationAreaLayerGroup)
    })

  map.removeInteraction(draw)
  const drawButton = document.getElementById('drawBT')
  drawButton.innerText = 'Draw'
  drawButton.className = 'btn btn-success'
})

draw.on('drawstart', function () {
  source.clear()
})

export default draw
export { source }