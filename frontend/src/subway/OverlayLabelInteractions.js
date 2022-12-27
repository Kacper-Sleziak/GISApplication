import { Select } from 'ol/interaction'
import { map } from '../map'
import { subwayPointStyleClicked } from '../styles'
import { singleClick } from 'ol/events/condition'
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

// Changing overlay offset deppending of zoom level
map.on('moveend', function (e) {
  const newZoom = map.getView().getZoom()
  if (currZoom !== newZoom) {
    const newOffset = -currZoom
    overlayLayer.setOffset([0, newOffset])
    currZoom = newZoom
  }
})

// Setting new Interaction
const selectInteraction = new Select({
  condition: singleClick,
  layers: function (layer) {
    return layer.get('title') === 'SubwaysLayer'
  },
  style: subwayPointStyleClicked,
  hitTolerance: 5
})
map.addInteraction(selectInteraction)
// Appear overlayerLayer on select
selectInteraction.on('select', function (e) {
  overlayLayer.setPosition(undefined)
  const selectedFeature = e.selected

  if (selectedFeature[0]) {
    const featureNameLabel = document.getElementById('feature-name')
    featureNameLabel.style.visibility = 'visible'

    const subwayLabel = selectedFeature[0].values_.label
    const coordinates = selectedFeature[0].values_.geometry.flatCoordinates
    overlayFeatureName.innerHTML = subwayLabel
    overlayLayer.setPosition(coordinates)
  }
})

const interactionsHandlerInitializer = undefined
export default interactionsHandlerInitializer
