import { map, subwayStationLayerGroup, subwayStationAreaLayerGroup } from '../map'
import { Draw, Modify, Snap } from 'ol/interaction'
import { Vector as VectorSource } from 'ol/source'
import { Vector as VectorLayer } from 'ol/layer'
import { Feature } from 'ol'
import { GeometryCollection, Point, Polygon } from 'ol/geom.js'
import { circular } from 'ol/geom/Polygon.js'
import { getDistance } from 'ol/sphere.js'
import { subwayPointStyle } from '../styles'
import axios from 'axios'
import Collection from 'ol/Collection'

const source = new VectorSource()
const vectorDrawLayer = new VectorLayer({
  source,
  title: 'DrawLayer'
})

map.addLayer(vectorDrawLayer)
const modify = new Modify({ source })
map.addInteraction(modify)

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
      map.addLayer(subwayStationAreaLayerGroup)
    })

  map.removeInteraction(draw)
})

draw.on('drawstart', function () {
  source.clear()
})

// Hanling switching to drawing mode
const drawButton = document.getElementById('drawBT')
drawButton.addEventListener('click', function () {
  if (drawButton.innerText === 'Draw') {
    drawButton.innerText = 'Drawing in progress'
    drawButton.className = 'btn btn-warning'
    map.addInteraction(draw)
  } else {
    drawButton.innerText = 'Draw'
    drawButton.className = 'btn btn-success'
    map.removeInteraction(draw)
  }
})

const subwaysInArea = document.getElementById('inArea')
const drawButtonContainer = document.getElementById('draw_button_con')
const subwaysShowAll = document.getElementById('showAll')

// Handling switching dropdown ,,Subway Stations"
subwaysInArea.addEventListener('click', function () {
  if (subwaysShowAll.className === 'dropdown-item active') {
    subwaysInArea.className = 'dropdown-item active'
    subwaysShowAll.className = 'dropdown-item'
    drawButtonContainer.style.visibility = 'visible'
  }
})

const drawAreaInitializer = undefined
export default drawAreaInitializer