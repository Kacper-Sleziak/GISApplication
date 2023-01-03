import { map, subwayStationAreaLayerGroup } from '../../map'
import draw from './setup'
import { changeDrawType } from './setup'
import { displayStationsStatmentsCheck } from '../displayHandler'
import Collection from 'ol/Collection'

const subwaysInArea = document.getElementById('inArea')
const subwaysShowAll = document.getElementById('showAll')
const featureNameLabel = document.getElementById('feature-label')
const drawMainContainer = document.getElementById('draw_main_container')
const filterContainer = document.getElementById('filters_con')

const offsetSlider = document.getElementById('offsetSlider')
const offsetDisplay = document.getElementById('offsetDisplay')

// Setup default value exported from setup file
// Value will be changed later
let drawInteraction = draw

// Hanling switching to drawing mode
const drawButton = document.getElementById('drawBT')
drawButton.addEventListener('click', function () {
  if (drawButton.innerText === 'Draw') {
    drawButton.innerText = 'Drawing in progress...'
    drawButton.className = 'btn btn-warning'
    chooseDrawModeBT.className = 'btn btn-light dropdown-toggle disabled'
    map.addInteraction(drawInteraction)
  } else {
    drawButton.innerText = 'Draw'
    drawButton.className = 'btn btn-success'
    chooseDrawModeBT.className = 'btn btn-light dropdown-toggle'
    map.removeInteraction(drawInteraction)
  }
})

// Handling switching dropdown ,,Subway Stations"
subwaysInArea.addEventListener('click', function () {
  if (subwaysShowAll.className === 'dropdown-item active') {
    // clear previously found subways from area
    const emptyCollection = new Collection()
    subwayStationAreaLayerGroup.setLayers(emptyCollection)

    offsetSlider.value = 0
    offsetDisplay.innerHTML = `${offsetSlider.value}`

    subwaysInArea.className = 'dropdown-item active'
    subwaysShowAll.className = 'dropdown-item'
    drawMainContainer.style.visibility = 'visible'
    featureNameLabel.style.visibility = 'hidden'
    filterContainer.style.visibility = 'hidden'

    displayStationsStatmentsCheck()
  }
})

const drawModes = document.getElementById('chooseDrawMode').children
const chooseDrawModeBT = document.getElementById('chooseDrawModeBT')

const clearActualMode = () => {
  for (const drawMode of drawModes) {
    drawMode.className = 'dropdown-item'
  }
}

// Handling chaning drawing mode
for (const drawMode of drawModes) {
  drawMode.addEventListener('click', function () {
    // Prevent from choosing again same mode
    if (drawMode.className !== 'dropdown-item active') {
      clearActualMode()
      drawMode.className = 'dropdown-item active'

      const mode = drawMode.id
      chooseDrawModeBT.innerText = drawMode.innerText
      drawInteraction = changeDrawType(mode)
    }
  })
}

// Handling displaing slider value
offsetSlider.addEventListener('input', function () {
  offsetDisplay.innerHTML = `${offsetSlider.value}`
})

const drawAreaHandlernItializer = undefined
export default drawAreaHandlernItializer
