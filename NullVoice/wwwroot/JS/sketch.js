
var strings = []

function grabContents(thought) {
    return thought.innerText
}

export function initializeP5(elementId) {
    strings = document.getElementsByClassName("thoughtContent")
    strings = [].slice.call(strings)
    strings = strings.map(grabContents)
    new p5(sketch, elementId);
}

function sketch(p) {
    let containerId;

    p.myCustomRedrawAccordingToNewCanvasSize = function () {
        if (containerId) {
            const container = document.getElementById(containerId);
            if (container) {
                p.resizeCanvas(container.offsetWidth, container.offsetHeight);
            }
        }
    };

    p.setup = () => {
        containerId = p._userNode;
        p.createCanvas(400, 200).parent(containerId);
        p.background(220);
        
    };

    p.draw = () => {
        let i = 0
        strings.forEach((element) => {
            i += 100
            p.text(element, i, i);
               
        })
    };

   
    p.windowResized = () => {
        p.myCustomRedrawAccordingToNewCanvasSize();
    };
}

