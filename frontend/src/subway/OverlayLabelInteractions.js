import { Select } from 'ol/interaction'
import { map } from '../map'
import { subwayPointStyleClicked } from '../styles'
import { singleClick } from 'ol/events/condition'
import { Overlay } from 'ol'

let currZoom = map.getView().getZoom()

// Ading overlay
const overlayFeature = document.getElementById('feature-label')
const overlayLayer = new Overlay({
  element: overlayFeature,
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
    overlayFeature.style.visibility = 'visible'

    const featureNameLabel = document.getElementById('feature-name')
    const featureBorough = document.getElementById('feature-borough')
    const featureExpress = document.getElementById('feature-express')

    const subway = selectedFeature[0].values_
    const coordinates = subway.geometry.flatCoordinates

    featureNameLabel.innerHTML = subway.label_name
    featureBorough.innerHTML = subway.label_borough
    featureExpress.innerHTML = subway.label_express

    overlayLayer.setPosition(coordinates)
  }
})

const interactionsHandlerInitializer = undefined
export default interactionsHandlerInitializer
