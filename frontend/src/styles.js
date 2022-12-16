import { Style, Fill, Stroke, Icon } from 'ol/style'

const subwayPointStyle = new Style({
  zIndex: -2,
  fill: new Fill({
    color: [40, 119, 247, 1]
  }),

  image: new Icon({
    src: 'img\\icons8-location-50.png',
    scale: 0.5
  })
})

const subwayPointStyleClicked = new Style({
  zIndex: -2,
  fill: new Fill({
    color: [40, 119, 247, 1]
  }),

  image: new Icon({
    src: 'img\\icons8-location-50-2.png',
    scale: 0.5
  })
})

const boundariesCityStyle = new Style({
  fill: new Fill({
    color: [45, 64, 89, 0.1]
  }),
  stroke: new Stroke({
    color: [45, 64, 89, 1],
    width: 3,
    lineDash: [10, 20]
  })
})

export { subwayPointStyle, subwayPointStyleClicked, boundariesCityStyle }
