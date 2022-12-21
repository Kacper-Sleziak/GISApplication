import { map } from '../map'
import View from 'ol/View'
import { Draw, Modify, Snap } from 'ol/interaction'
import { OSM, Vector as VectorSource } from 'ol/source'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'
import { get } from 'ol/proj'
import { Style } from 'ol/style'

const source = new VectorSource()
const vector = new VectorLayer({
  source,
  style: new Style({
    'fill-color': 'rgba(255, 255, 255, 0.2)',
    'stroke-color': '#ffcc33',
    'stroke-width': 2,
    'circle-radius': 7,
    'circle-fill-color': '#ffcc33'
  })
})

const modify = new Modify({ source })
map.addInteraction(modify)

let draw, snap
function addInteractions () {
  draw = new Draw({
    source,
    type: 'Circle'
  })
  map.addInteraction(draw)
  snap = new Snap({ source })
  map.addInteraction(snap)
}

//console.log(modify)

const drawAreaInitializer = undefined
export default drawAreaInitializer
