import { source } from '../drawArea/setup'
import { displayStationsStatmentsCheck } from '../displayHandler'

const subwaysShowAll = document.getElementById('showAll')
const subwaysInArea = document.getElementById('inArea')
// const drawButtonContainer = document.getElementById('draw_button_con')
const drawButton = document.getElementById('drawBT')
const featureNameLabel = document.getElementById('feature-name')
const drawMainContainer = document.getElementById('draw_main_container')

// Event Listener for displaying subway stations on click
subwaysShowAll.addEventListener('click', function () {
  if (subwaysInArea.className === 'dropdown-item active') {
    subwaysShowAll.className = 'dropdown-item active'
    subwaysInArea.className = 'dropdown-item'
    drawMainContainer.style.visibility = 'hidden'
    drawButton.innerText = 'Draw'
    drawButton.className = 'btn btn-success'
    featureNameLabel.style.visibility = 'hidden'

    displayStationsStatmentsCheck()

    // clearing draw
    source.clear()
  }
})

const visibilityHandlerInitializer = undefined
export default visibilityHandlerInitializer
