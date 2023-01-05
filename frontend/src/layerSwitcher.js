import { boundariesVectorLayer, subwayStationLayerGroup, subwayStationAreaLayerGroup } from './map'
import { source } from './subway/drawArea/setup'
import { displayStationsStatmentsCheck } from './subway/displayHandler'

// Checkboxes
const boundariesCheckbox = document.getElementById('borderLayer')
const subwaysCheckbox = document.getElementById('subwaysLayer')

// Buttons
const subwaysShowAll = document.getElementById('showAll')
const subwaysInArea = document.getElementById('inArea')

// Draw and features
const drawButton = document.getElementById('drawBT')
const featureNameLabel = document.getElementById('feature-label')
const drawMainContainer = document.getElementById('draw_main_container')

// Filters
const filterContainer = document.getElementById('filters_con')

// Handling turning on and off boundaries
boundariesCheckbox.addEventListener('click', function () {
  if (boundariesCheckbox.checked) {
    subwaysInArea.className = 'dropdown-item active'
    boundariesVectorLayer.setVisible(true)
  } else {
    boundariesVectorLayer.setVisible(false)
  }
})

subwaysCheckbox.addEventListener('click', function () {
  if (subwaysCheckbox.checked) {
    displayStationsStatmentsCheck()
    filterContainer.style.visibility = 'visible'
  } else {
    subwaysShowAll.className = 'dropdown-item active'
    subwaysInArea.className = 'dropdown-item'
    drawMainContainer.style.visibility = 'hidden'
    drawButton.innerText = 'Draw'
    drawButton.className = 'btn btn-success'
    featureNameLabel.style.visibility = 'hidden'
    filterContainer.style.visibility = 'hidden'
    subwayStationLayerGroup.setVisible(false)
    subwayStationAreaLayerGroup.setVisible(false)

    // clearing draw
    source.clear()
  }
})

const layerSwitcherInitializer = undefined
export default layerSwitcherInitializer
