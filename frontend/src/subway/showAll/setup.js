import Collection from 'ol/Collection'
import VectorLayer from 'ol/layer/Vector'
import axios from 'axios'
import VectorSource from 'ol/source/Vector'
import { Feature } from 'ol'
import { map, subwayStationLayerGroup } from '../../map'
import { subwayPointStyle } from '../../styles'
import Point from 'ol/geom/Point'

const addParamsToLink = (link, name, borough, express) => {
  const argsMap = new Map([
    ['name', name],
    ['borough', borough],
    ['express', express]
  ])

  for (const [key, value] of argsMap) {
    if (value === undefined) {
      argsMap.delete(key)
    }
  }

  let i = 0
  for (const [key, value] of argsMap) {
    if (i === 0) {
      link += `?${key}=${value}`
    } else {
      link += `&${key}=${value}`
    }
    i++
  }
  return link
}

const createPointsOnMap = (name, borough, express) => {
  let link = 'http://127.0.0.1:8000/subway/'
  link = addParamsToLink(link, name, borough, express)

  const subwayCollection = new Collection()

  axios
    .get(link)
    .then(response => {
      const subwayStations = response.data
      subwayStations.forEach(station => {
      // Reading x and y from API
        const x = station.coordinates[0]
        const y = station.coordinates[1]

        // Seting feature
        const featurePoint = new Feature({
          name: 'Subway',
          label_name: station.name,
          label_borough: station.borough,
          label_express: station.express,
          geometry: new Point([x, y])
        })

        const layerVector = new VectorLayer({
          source: new VectorSource({}),
          title: 'SubwaysLayer',
          style: subwayPointStyle
        })

        // Adding Layer to collection
        layerVector.getSource().addFeature(featurePoint)
        subwayCollection.push(layerVector)
      })

      // Setting layersGroup
      subwayStationLayerGroup.setLayers(subwayCollection)
    })
}

map.addLayer(subwayStationLayerGroup)
createPointsOnMap()
const subwayInitializer = undefined
export { createPointsOnMap }
export default subwayInitializer
