var Physics = require('impulse')
var menuEl = document.querySelector('.pull-down-menu')
var handleEls = document.querySelectorAll('.nav-header, .close-handle')
var isOpen = false
var boundry = new Physics.Boundry({ top: 0, bottom: window.innerHeight, left: 0, right: 0 })

var menu = new Physics(menuEl)
  .style('translateY', function(x, y) { return y + 'px' })

var drag = menu.drag({ handle: handleEls, boundry: boundry, direction: 'vertical' })

function end() {
  if(this.moved()) {
    isOpen = menu.direction('down')
  } else {
    isOpen = !isOpen
    if(isOpen) {
      menu.velocity(0, 2000)
    }
  }

  if(isOpen) {
    menuEl.classList.add('open')
    menu.accelerate({ acceleration: 1500, bounceAcceleration: 4000, bounce: this.moved() })
      .to(0, boundry.bottom).start()
  } else {
    menuEl.classList.remove('open')
    menu.spring({ tension: 100, damping: 15 })
      .to(0, boundry.top).start()
  }
}

drag.on('end', end)
