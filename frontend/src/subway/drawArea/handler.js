import { map, subwayStationAreaLayerGroup } from '../../map'
import draw from './setup'
import { displayStationsStatmentsCheck } from '../displayHandler'
import Collection from 'ol/Collection'

const subwaysInArea = document.getElementById('inArea')
const drawButtonContainer = document.getElementById('draw_button_con')
const subwaysShowAll = document.getElementById('showAll')
const featureNameLabel = document.getElementById('feature-name')

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

// Handling switching dropdown ,,Subway Stations"
subwaysInArea.addEventListener('click', function () {
  if (subwaysShowAll.className === 'dropdown-item active') {
    // clear previously found subways from area
    const emptyCollection = new Collection()
    subwayStationAreaLayerGroup.setLayers(emptyCollection)

    subwaysInArea.className = 'dropdown-item active'
    subwaysShowAll.className = 'dropdown-item'
    drawButtonContainer.style.visibility = 'visible'
    featureNameLabel.style.visibility = 'hidden'

    displayStationsStatmentsCheck()
  }
})

const drawAreaHandlernItializer = undefined
export default drawAreaHandlernItializer
