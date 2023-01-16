import { map, subwayStationAreaLayerGroup } from '../../map'
import { Draw } from 'ol/interaction'
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

// global variables
let source, draw, coords

const vectorDrawLayer = new VectorLayer({
  title: 'DrawLayer',
  style: drawStyle
})
map.addLayer(vectorDrawLayer)

const circleGeometryFunction = function (coordinates, geometry) {
  if (!geometry) {
    geometry = new GeometryCollection([
      new Polygon([]),
      new Point(coordinates[0])
    ])
  }

  const geometries = geometry.getGeometries()
  const center = coordinates[0]
  const last = coordinates[1]
  const radius = getDistance(center, last)
  const circle = circular(center, radius, 128)

  coords = circle.getCoordinates()
  geometries[0].setCoordinates(coords)
  geometry.setGeometries(geometries)

  return geometry
}

const createDrawInteraction = (type, freehand) => {
  source = new VectorSource({})
  vectorDrawLayer.setSource(source)

  if (type === 'Circle') {
    draw = new Draw({
      source,
      type,
      freehand,
      geometryFunction: circleGeometryFunction
    })
  } else {
    draw = new Draw({
      source,
      type,
      freehand
    })
  }
  // Event listeneres
  source.on('addfeature', function (evt) {
    const feature = evt.feature

    // If type === Circle, coords are taking from custome geometryFunction
    if (type !== 'Circle') {
      coords = feature.getGeometry().getCoordinates()
    }
    createPointsOnDrawnArea()
  })

  draw.on('drawstart', function () {
    source.clear()
  })

  draw.on('drawend', function () {
    map.removeInteraction(draw)
    const drawButton = document.getElementById('drawBT')
    const chooseDrawModeBT = document.getElementById('chooseDrawModeBT')

    chooseDrawModeBT.className = 'btn btn-light dropdown-toggle'
    drawButton.innerText = 'Draw'
    drawButton.className = 'btn btn-success'
  })
}

const createPointsOnDrawnArea = () => {
  const subwayCollection = new Collection()
  const radius = document.getElementById('offsetSlider').value

  axios
    .post('http://127.0.0.1:8000/subway/area/', {
      coords,
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
          label_name: station.name,
          label_borough: station.borough,
          label_express: station.express,
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
}

// Setting Default Value
createDrawInteraction('Circle', false)

// Handling Change of Draw Type
const changeDrawType = (mode) => {
  if (mode === 'Circle') {
    createDrawInteraction('Circle', false)
  } else if (mode === 'FreeHand') {
    createDrawInteraction('Polygon', true)
  } else if (mode === 'Polygon') {
    createDrawInteraction('Polygon', false)
  }
  return draw
}
export default draw
export { source, changeDrawType }
