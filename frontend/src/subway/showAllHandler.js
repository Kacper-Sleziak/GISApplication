import { map, subwayStationLayerGroup } from '../map'

const drawStationsStatmentsCheck = (zoomStatment, checkboxStatment) => {
  const featureNameLabel = document.getElementById('feature-name')

  if (checkboxStatment && zoomStatment) {
    subwayStationLayerGroup.setVisible(true)
  } else {
    subwayStationLayerGroup.setVisible(false)
    featureNameLabel.style.visibility = 'hidden'
  }
}

// Stations will show on map when both of parameters will be set on true
let zoomStatment = true
let buttonStatment = true

const subwaysShowAll = document.getElementById('showAll')
const subwaysInArea = document.getElementById('inArea')
const drawButtonContainer = document.getElementById('draw_button_con')
const drawButton = document.getElementById('drawBT')

// Event Listener for displaying subway stations
subwaysShowAll.addEventListener('click', function () {
  if (subwaysInArea.className === 'dropdown-item active') {
    subwaysShowAll.className = 'dropdown-item active'
    subwaysInArea.className = 'dropdown-item'
    drawButtonContainer.style.visibility = 'hidden'
    drawButton.innerText = 'Draw'
    drawButton.className = 'btn btn-success'

    buttonStatment = !buttonStatment
  }
  drawStationsStatmentsCheck(zoomStatment, buttonStatment)
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
    drawStationsStatmentsCheck(zoomStatment, buttonStatment)
  }
})

const visibilityHandlerInitializer = undefined
export default visibilityHandlerInitializer
