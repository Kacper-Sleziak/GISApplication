import Collection from 'ol/Collection'
import VectorLayer from 'ol/layer/Vector'
import axios from 'axios'
import VectorSource from 'ol/source/Vector'
import { Feature } from 'ol'
import { map, subwayStationLayerGroup } from '../map'
import { subwayPointStyle } from '../styles'
import Point from 'ol/geom/Point'

const subwayCollection = new Collection()

axios
  .get('http://127.0.0.1:8000/subway/')
  .then(response => {
    const subwayStations = response.data
    subwayStations.forEach(station => {
      // Reading x and y from API
      const x = station.coordinates[0]
      const y = station.coordinates[1]

      // Seting feature
      const featurePoint = new Feature({
        name: 'Subway',
        label: station.name,
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
    map.addLayer(subwayStationLayerGroup)
  })

const subwayInitializer = undefined
export default subwayInitializer
