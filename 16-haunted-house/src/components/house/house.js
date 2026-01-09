import * as THREE from 'three'
import scene from '../../core/scene'
import walls from './walls'
import roof from './roof'
import door from './door'
import bushes from './bushes'

// Container
const house = new THREE.Group()
house.add(walls)
house.add(roof)
house.add(door)
house.add(bushes)

export default house