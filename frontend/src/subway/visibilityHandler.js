import { map, subwayStationLayerGroup } from '../map'

const drawStationsStatmentsCheck = (zoomStatment, checkboxStatment) => {
  const featureNameLabel = document.getElementById('feature-name')

  if (checkboxStatment && zoomStatment) {
    subwayStationLayerGroup.setVisible(true)
    featureNameLabel.style.visibility = 'visible'
  } else {
    subwayStationLayerGroup.setVisible(false)
    featureNameLabel.style.visibility = 'hidden'
  }
}

// Stations will show on map when both of parameters will be set on true
let zoomStatment = true
let checkboxStatment = false

const subwaysCheckbox = document.getElementById('subwayStations')

// Event Listener for displaying subway stations
subwaysCheckbox.addEventListener('click', function () {
  checkboxStatment = !checkboxStatment
  drawStationsStatmentsCheck(zoomStatment, checkboxStatment)
})

// Event Listener
// Checking if zoom is big enough to show subway stations
const currZoom = map.getView().getZoom()
map.on('moveend', function (e) {
  const newZoom = map.getView().getZoom()
  if (currZoom !== newZoom) {
    if (newZoom >= 10) {
      zoomStatment = true
    } else {
      zoomStatment = false
    }
    drawStationsStatmentsCheck(zoomStatment, checkboxStatment)
  }
})

const visibilityHandlerInitializer = undefined
export default visibilityHandlerInitializer
