

// State
const coords = []
const colors = []
// Constants
const RGB_COLORS = 3
const PIXEL_SIZE = 2
const JITTER = 3

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(240);
  let points = max(windowWidth, windowHeight) / 6
  while (points > 0) {
    coords.push([])
    points--
  }
  coords.forEach((coord) => {
    coord.push(width / 2);
    coord.push(height / 2)
  })
  for (let i = 0; i < RGB_COLORS; i++) {
    colors.push(random(255))
  }
}



let count = 0
function draw() {
  noStroke()
  fill(colors[0], colors[1], colors[2])
  coords.forEach((coord) => {
    [x, y] = coord
    rect(x, y, PIXEL_SIZE, PIXEL_SIZE)
    coord[0] = x + random(-JITTER, JITTER)
    coord[1] = y + random(-JITTER, JITTER)
  }

  )
  const indx = floor(random(RGB_COLORS))
  colors[indx] = (colors[indx] + random(1)) % 255
}