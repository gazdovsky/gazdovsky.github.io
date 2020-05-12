class Cross {
  constructor(options) {
      this.width = options.width,
      this.length = options.length,
      this.sidesCount = options.sidesCount,
      this.startX = options.startX,
      this.startY = options.startY,
      this.color = options.color,
      this.mass = options.mass
  }
}
class SideType extends Cross{
  constructor(options){
    super(options)
  }
   sideOptions() {
     return {
    mass: this.mass / this.sidesCount,
    render: {
      fillStyle: this.color
    }
  }}

  rect(){
    return Bodies.rectangle(this.startX, this.startY, this.length, this.width, this.sideOptions())
  }
  circle(){
  return Bodies.circle(this.startX, this.startY, this.width, this.sideOptions())
  }
  complexRect(){
    var rects = []
    var complex = 4
    var options = this.sideOptions()
    for(var i = 0;i<complex;i++ ){
options.render.fillStyle = "#814300"
    rects.push(Bodies.rectangle(this.startX-(this.length/complex)*complex/2+(this.length/complex)*i, this.startY, this.length/complex, this.width+i,options))
rects[i].label = 'complexSide'+i
// rects[i].mass  = 0.1
    }
    return Body.create({
      parts: rects
    });
  }
}
class Sides extends Cross{
  constructor(options) {
    super(options)
  }
  separateBodies(){
    var sides = []
    var rotateAngl = 0
    for (let i = 0; i < this.sidesCount; i++) {
    rotateAngl = i == 0 ? 0 : (6.28319/this.sidesCount)*i
    sides.push(new SideType(this).rect())
    sides[i].label = 'crossSide'+i
    Body.rotate(sides[i], rotateAngl, {x:this.startX+this.length/2,y:this.startY})
    console.log(sides[i]);
    }
    return sides
  }

}
class Solid extends Cross {
  constructor(options) {
    super(options)
  }

  Body() {
// var sides = new Sides(this).separateBodies()
    return Body.create({
      parts: new Sides(this).separateBodies()
    });
  }
}

const solidCross = new Solid({
  width: 3,
  length: 20,
  sidesCount:6,
  startX: 500,
  startY: 120,
  color: "#dc6a6a",
  mass: 2
})
