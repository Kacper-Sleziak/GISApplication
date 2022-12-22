import '../style.css'
import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import LayerGroup from 'ol/layer/Group'
import ScaleLine from 'ol/control/ScaleLine'
import FullScreen from 'ol/control/FullScreen'
import ZoomSlider from 'ol/control/ZoomSlider'
import { useGeographic } from 'ol/proj'

useGeographic()

// Getting coordinates of subway stations from backend
const map = new Map({
  target: 'map',
  view: new View({
    center: [-74.01, 40.70],
    zoom: 10.7
  }),
  controls: ([
    new ScaleLine(),
    new FullScreen(),
    new ZoomSlider()
  ])
})

const subwayStationLayerGroup = new LayerGroup({
  visible: false
})

const subwayStationAreaLayerGroup = new LayerGroup({
  visible: false
})

const openStreetMapStandard = new TileLayer({
  source: new OSM(),
  visible: true,
  title: 'OSMStandard'
})

const stamenWaterColored = new TileLayer({
  source: new OSM({
    url: 'https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg'
  }),
  visible: false,
  title: 'StamenColoredWater'
})

const stamenTerrain = new TileLayer({
  source: new OSM({
    url: 'https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg'
  }),
  visible: false,
  title: 'StamenTerrain'
})

// Layer Group
const baseLayerGroup = new LayerGroup({
  layers: [
    openStreetMapStandard, stamenWaterColored, stamenTerrain
  ]
})

map.addLayer(baseLayerGroup)

// Layer Switcher

// Get Radio Buttons
const layerElements = document.querySelectorAll('.form-check > input[type=radio]')

// Event listener of changing layer
for (const layerElement of layerElements) {
  layerElement.addEventListener('change', function () {
    const choosenLayerValue = this.value

    // Comparing values from button group with values from baseLayerGroup
    baseLayerGroup.getLayers().forEach(function (element, index, array) {
      const layerTitle = element.get('title')
      element.setVisible(layerTitle === choosenLayerValue)
    })
  })
}

export { map, subwayStationLayerGroup, subwayStationAreaLayerGroup }
