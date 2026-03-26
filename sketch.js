
const coords = []
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(240);
  let points = max(windowWidth, windowHeight) / 6
  while(points > 0) {
  coords.push([])
    points--
  }
  coords.forEach((coord) => {
    coord.push(width/2); 
    coord.push(height/2)})
}

const col = [0, 0, 0]


let count = 0
function draw() {
  fill(col[0],col[1],col[2])
  noStroke()
  coords.forEach((coord) => {
    [x, y] = coord
    const size = 2
    rect(x,y, size, size)
  let distorsion = 3
  coord[0] = x + random(-distorsion, distorsion)
  coord[1] = y + random(-distorsion, distorsion)
  }
                
                )
  const indx = floor(random(3))
  col[indx] = (col[indx] + random(20)) % 255
}