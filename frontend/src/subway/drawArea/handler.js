import { map, subwayStationLayerGroup } from '../../map'
import draw from './setup'

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
    subwayStationLayerGroup.setVisible(false)
  }
})

const drawAreaHandlernItializer = undefined
export default drawAreaHandlernItializer
