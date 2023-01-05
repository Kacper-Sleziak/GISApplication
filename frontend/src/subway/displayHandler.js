import { map, subwayStationLayerGroup, subwayStationAreaLayerGroup } from '../map'

let zoomStatment = true
const subwaysShowAll = document.getElementById('showAll')

const displayStationsStatmentsCheck = () => {
  const featureNameLabel = document.getElementById('feature-label')
  if (zoomStatment) {
    if (subwaysShowAll.className === 'dropdown-item active') {
      subwayStationLayerGroup.setVisible(true)
      subwayStationAreaLayerGroup.setVisible(false)
    } else {
      subwayStationLayerGroup.setVisible(false)
      subwayStationAreaLayerGroup.setVisible(true)
    }
  } else {
    subwayStationLayerGroup.setVisible(false)
    subwayStationAreaLayerGroup.setVisible(false)
    featureNameLabel.style.visibility = 'hidden'
  }
}


const currZoom = map.getView().getZoom()
map.on('moveend', function (e) {
  const newZoom = map.getView().getZoom()
  let switcherStatment = document.getElementById('subwaysLayer').checked

  if (currZoom !== newZoom && switcherStatment) {
    if (newZoom >= 9) {
      zoomStatment = true
    } else {
      zoomStatment = false
    }
    displayStationsStatmentsCheck()
  }
})

const displayHandlerInitializer = undefined
export default displayHandlerInitializer

export { displayStationsStatmentsCheck }
