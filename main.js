import { game } from './game'

import './style.css'

const canvas = document.createElement('canvas')
canvas.width = 800
canvas.height = 600

document.querySelector('#app').appendChild(canvas)

game(canvas)
