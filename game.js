window.onload = function() {
  // module aliases
  // var Engine = Matter.Engine,
  //   Render = Matter.Render,
  //   World = Matter.World,
  //   Bodies = Matter.Bodies,
  //   Body = Matter.Body,
  //   Vertices = Matter.Vertices,
  //   Events = Matter.Events,
  //   Svg = Matter.Svg;


  // create an engine
  var engine = Engine.create({
    timing: {
      timeScale: 0.3
    }
  });

  // create a renderer
  var render = Render.create({
    element: document.body,
    engine: engine,
    hasBounds: true,
    options: {
      width: window.document.documentElement.clientWidth,
      height: document.documentElement.clientHeight - 4, //window.document.documentElement.clientHeight,
      showAngleIndicator: false,
      wireframes: false,
      // showVelocity: true,
      showCollisions: true,
      // enableSleeping: true,
      hasBounds: true,
      background: window.getComputedStyle(document.getElementById("IDback")).backgroundColor //"#5a5a82"
    }
  });


  var dots = [],
    startX = 350,
    startY = 200,
    crossLen = 15,
    crossWidth = 3,
    step = crossLen * 3 + 6,
    curX = startX,
    curY = startY,
    crossY = 0,
    ang = 0,
    angleScore = 0,
    toDegree = 180 / Math.PI,
    dotsInLine = 10,
    dotsRows = 3,
    crossType = solidCross.Body()
  console.log(crossType);
  // console.log(crossType.render.fillStyle);

  addDots(startX)

  function addDots(addDotsStartX, addDotsStartY) {
    for (var i = 0; i < dotsRows * dotsInLine; i++) {
      if (i % dotsInLine == 0) {
        curX = addDotsStartX
        curY += step
      }
      curX += step
      var newBody = Bodies.circle(curX + rnd(-crossLen, crossLen), curY + rnd(-crossLen, crossLen), 3, {
        isStatic: true,
        label: 'dot',
        render: {
          fillStyle: window.getComputedStyle(document.getElementById("IDdot")).backgroundColor //'#b07b2d'
        }
      })
      World.add(engine.world, newBody)
    }
  }

  // var arc1 = customShape(drawCross(crossWidth, crossLen), 500, 100)
  var arc = Bodies.rectangle(500, 50, 20, 5)
  var side2 = Bodies.rectangle(515, 65, 5, 20)
  var constraint = Matter.Constraint.create({
    bodyA: arc,
    bodyB: side2,
    stiffness: 1,
    pointA: {
      x: 0,
      y: 0
    },
    pointB: {
      x: 0,
      y: 0
    }
  })
  var constraint2 = Matter.Constraint.create({
    bodyA: arc,
    bodyB: side2,
    stiffness: 1,
    pointA: {
      x: -10,
      y: 0
    },
    pointB: {
      x: 0,
      y: 10
    }
  })
  var constraint3 = Matter.Constraint.create({
    bodyA: arc,
    bodyB: side2,
    stiffness: 1,
    pointA: {
      x: 10,
      y: 0
    },
    pointB: {
      x: 0,
      y: -10
    }
  })
  World.add(engine.world, [crossType]);

  // run the engine

  Engine.run(engine);

  // run the renderer
  Render.run(render);
var counter = 0
  Events.on(engine, 'collisionActive', function(event) {
    var i, pair,
      pairs = event.pairs;
    for (i in pairs) {
      pair = pairs[i]
      if (pair.bodyA.label != 'dot') {
        var spd = pair.collision.depth
        // Matter.Composite.remove(engine.world, pair.bodyB) // удалить точку после касания
        pair.bodyB.render.fillStyle =""+ changeMatterColor( pair.bodyB.render.fillStyle, {b: -1, g: -1, r:10})
         console.log(pair.collision.depth)
       }
      if (counter ==0 ){
        console.log(pair);
      }
      counter+=1
    }
  })

  Events.on(engine, 'beforeUpdate', function(event) {
    Render.lookAt(render, crossType, {
      x: 100,
      y: 100
    });

    if (keys[37]) {
      Body.applyForce(crossType, {
        x: crossType.position.x,
        y: crossType.position.y
      }, {
        x: -0.05,
        y: 0
      });
    } else if (keys[39]) {

      Body.applyForce(crossType, {
        x: crossType.position.x,
        y: crossType.position.y
      }, {
        x: 0.05,
        y: 0
      });

    } else if (keys[38]) {
      Body.setAngularVelocity(crossType, crossType.angularSpeed + 0.001)
      // console.log(arc.angularSpeed);
    }

    if (crossY - crossType.position.y < -(step * 3)) {
      addDots(crossType.position.x - step * dotsInLine / 2)
      crossY = crossType.position.y
    }
    // angleScore += Math.abs(ang - Math.abs(crossType.angle))
    // ang = Math.abs(crossType.angle)
    // if (app != undefined) {
    //   app.$data.message = round(angleScore * toDegree, 1) + ' ' + round(crossType.position.x, 1) + ' ' + round(crossType.position.y, 1)
    // }
    // render.options.background = window.getComputedStyle(document.getElementById("IDback")).backgroundColor
    // Matter.Body.set(crossType, 'options', {
    //   'render': {
    //     'fillstile': window.getComputedStyle(document.getElementById("IDcross")).backgroundColor
    //   }
    // })
  })


  var app
  app = new Vue({
    el: '#app',
    data: {
      message: 'tet'
    }
  })

  // window.addEventListener("resize", function() {
  //   render.options.width = window.document.documentElement.clientWidth
  //   render.options.height = window.document.documentElement.clientHeight
  // })

  var keys = [];
  document.body.addEventListener("keydown", function(e) {
    keys[e.keyCode] = true;
  });
  document.body.addEventListener("keyup", function(e) {
    keys[e.keyCode] = false;
  });




  function rnd(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function round(x, n) {
    return Math.ceil(x / n) * n;
  }
}
