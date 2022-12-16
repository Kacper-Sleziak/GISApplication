import { map } from '../map'
import { subwayPointStyle, subwayPointStyleClicked } from '../styles'
import { Overlay } from 'ol'

let currZoom = map.getView().getZoom()

// Ading overlay
const overlayFeatureName = document.getElementById('feature-name')
const overlayLayer = new Overlay({
  element: overlayFeatureName,
  positioning: 'top-center',
  offset: [0, -currZoom]
})

map.addOverlay(overlayLayer)

// Event Listener
// Drawing Labels on click
let actualLayer
let previousLayer
let previousClickedFeatureName = ''

// Changing overlay offset deppending of zoom level
map.on('moveend', function (e) {
  const newZoom = map.getView().getZoom()
  if (currZoom !== newZoom) {
    const newOffset = -currZoom
    overlayLayer.setOffset([0, newOffset])
    currZoom = newZoom
  }
})

// Handling overlay displaying
map.on('click', function (e) {
  overlayLayer.setPosition(undefined)
  if (previousLayer) { previousLayer.setStyle(subwayPointStyle) }
  map.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
    const featureLabel = feature.get('label')
    actualLayer = layer

    if (feature.get('name') === 'Subway') {
      if (previousClickedFeatureName === featureLabel) {
        previousClickedFeatureName = ''
      } else {
        actualLayer.setStyle(subwayPointStyleClicked)
        previousLayer = actualLayer

        previousClickedFeatureName = featureLabel
        overlayLayer.setPosition(e.coordinate)
        overlayFeatureName.innerHTML = featureLabel
      }
    }
  })
})

const overlayLabelHandlerInitializer = undefined
export default overlayLabelHandlerInitializer
