class Thought {
    constructor(p5Context,text, xPos, yPos, xVel, yVel, size) {

        this.text = text
        this.vectorPos = p5Context.createVector(xPos,yPos)
        this.size = Math.floor(Math.random() * size) + 1
        this.vel = p5Context.createVector(xVel, yVel)
    }

    move() {

        let amount = 0.0000000000009

        this.vectorPos.add(this.vel)
        let x = this.vel.x > 0 ? amount : -amount
        let y = this.vel.y > 0 ? amount : -amount
        if (this.vectorPos.x > width) {
            this.vectorPos.x = 0
        }
        if (this.vectorPos.x < 0) {
            this.vectorPos.x = width
        }
        if (this.vectorPos.y > height) {
            this.vectorPos.y = 0
        }
        if (this.vectorPos.y < 0) {
            this.vectorPos.y = height
        }

        this.vel.sub(x,y)
    }

}

// awful globals, NEVER DO THIS
var sizeDelta = 1.0
var deltaAmount = 1.0
var backgroundColour_r = 57
var backgroundColour_g = 62
var backgroundColour_b = 65
var width = 600
var height = 600
var textMin = 10
var textMax = 100
var strings = []
// awful globals, NEVER DO THIS

function grabContents(thought) {
    return thought.innerText
}

function generateThoughts(p5Context,stringArray) {
    let tempArray = []
    strings.forEach((element) => {
        tempArray.push(
            new Thought(
                p5Context,                                                              // P5js context to create vector objects with
                element,                                                                // Text from thought db content
                Math.random() * width + 1,                                              // Starting x position
                Math.random() * height + 1,                                             // Starting y position
                Math.ceil(Math.random() * 0.1) * (Math.round(Math.random()) ? 1 : -1),  // Velocity on the X axis
                Math.ceil(Math.random() * 0.1) * (Math.round(Math.random()) ? 1 : -1),  // Velocity on the Y axis              
                Math.random() * textMax + textMin,                                      // Randomise text size given a min and 
            )
        )
    })
    return tempArray
}

export function initializeP5(elementId) {
    strings = document.getElementsByClassName("thoughtContent")
    strings = [].slice.call(strings)
    strings = strings.map(grabContents)
    new p5(sketch, elementId);
}

function sketch(p) {

    let main = document.getElementsByTagName("main")[0]

    main.className = "justify-content-center align-items-center";
    width = main.clientWidth
    height = main.clientHeight

    let containerId;
    strings = generateThoughts(p,strings)

    p.myCustomRedrawAccordingToNewCanvasSize = function () {
        if (containerId) {
            const container = document.getElementById(containerId);
            if (container) {
                p.resizeCanvas(container.offsetWidth, container.offsetHeight);
            }
        }
    }

    p.setup = () => {
        containerId = p._userNode;
        p.createCanvas(width, height).parent(containerId)
        p.background(backgroundColour_r, backgroundColour_g, backgroundColour_b)
    }

    p.draw = () => {
        p.clear();
        p.background(backgroundColour_r,backgroundColour_g,backgroundColour_b);
        strings.forEach((element) => {
            p.fill('white');
            p.textSize(element.size *sizeDelta);
            p.text(element.text, element.vectorPos.x, element.vectorPos.y)  
            element.move()
        })
    }

    p.mouseWheel = (event) => {

        if (event.delta > 0) {
            sizeDelta -= deltaAmount
        } else {
            sizeDelta += deltaAmount
        }
    }
   
    p.windowResized = () => {
        p.myCustomRedrawAccordingToNewCanvasSize();
    }
}

