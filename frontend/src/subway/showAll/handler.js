import { source } from '../drawArea/setup'
import { createPointsOnMap } from './setup'
import { displayStationsStatmentsCheck } from '../displayHandler'

// Main Switcher
const subwaysShowAll = document.getElementById('showAll')
const subwaysInArea = document.getElementById('inArea')

// Draw and features
const drawButton = document.getElementById('drawBT')
const featureNameLabel = document.getElementById('feature-label')
const drawMainContainer = document.getElementById('draw_main_container')

// Filters
const filterContainer = document.getElementById('filters_con')
const clearButton = document.getElementById('clearFilterBT')
const boroughSelect = document.getElementById('boroughSelect')
const expressSelect = document.getElementById('expressSelect')
const nameInput = document.getElementById('nameInput')

const clearFilters = () => {
  boroughSelect.selectedIndex = 0
  expressSelect.selectedIndex = 0
  nameInput.value = ''

  createPointsOnMap()
}

// Event Listener for displaying subway stations on click
subwaysShowAll.addEventListener('click', function () {
  if (subwaysInArea.className === 'dropdown-item active') {
    subwaysShowAll.className = 'dropdown-item active'
    subwaysInArea.className = 'dropdown-item'
    drawMainContainer.style.visibility = 'hidden'
    drawButton.innerText = 'Draw'
    drawButton.className = 'btn btn-success'
    featureNameLabel.style.visibility = 'hidden'
    filterContainer.style.visibility = 'visible'

    clearFilters()
    displayStationsStatmentsCheck()

    // clearing draw
    source.clear()
  }
})

const filterChangeHandler = () => {
  const boroughOption = boroughSelect.options[boroughSelect.selectedIndex].value
  const expressOption = expressSelect.options[expressSelect.selectedIndex].value
  const nameValue = nameInput.value

  let nameArg, boroughArg, expressArg

  if (boroughOption !== '---') {
    boroughArg = boroughOption
  }

  if (expressOption !== '---') {
    if (expressOption === 'YES') {
      expressArg = 'express'
    } else if (expressOption === 'NO') {
      expressArg = 'None'
    }
  }

  if (nameValue !== '') {
    nameArg = nameValue
  }

  createPointsOnMap(nameArg, boroughArg, expressArg)
}

// Event listeners for filtering
filterContainer.addEventListener('change', function () {
  filterChangeHandler()
})

nameInput.addEventListener('input', function () {
  filterChangeHandler()
})

// Event listener for clearing filters
clearButton.addEventListener('click', function () {
  clearFilters()
})

const visibilityHandlerInitializer = undefined
export default visibilityHandlerInitializer
