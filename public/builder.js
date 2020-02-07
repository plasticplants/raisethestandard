//-------------canvas construction------------------
let canvas = this.__canvas = new fabric.Canvas('c', {
  // isDrawingMode: true
  width: window.innerWidth - 200,
  height: window.innerHeight - 160
});
fabric.Object.prototype.transparentCorners = false;


//construct the background
let canvasBackground = new fabric.Rect({
  fill: '#ffffff',
  width: canvas.width,
  height: canvas.height,
  selectable: false,
  evented: false,
  strokewidth: 1,
  stroke: '#ffffff',
  hasControls: false
});

let flagPaddingLeft = (canvas.width - 500) / 2;
let flagPaddingTop = (canvas.height - 330) / 2;

//construct the flag's border
let flagBorder = new fabric.Rect({
  fill: '#ffffff',
  width: 500,
  height: 330,
  selectable: false,
  evented: false,
  strokewidth: 3,
  stroke: '#cccccc',
  hasControls: false,
  left: flagPaddingLeft,
  top: flagPaddingTop
});

canvas.hoverCursor = 'pointer';
canvas.add(canvasBackground);
canvas.add(flagBorder);
 
fabric.loadSVGFromURL('https://cdn.glitch.com/81356b19-3300-460f-813c-f2d7801cd2a8%2Fmsflag.svg?v=1578928331653', (objects) => {
  canvas.add.apply(canvas, objects);
  canvas.renderAll();  
  canvas.discardActiveObject();
  
  var sel = new fabric.ActiveSelection(canvas.getObjects().splice(2), {
    canvas: canvas,
  })
  canvas.setActiveObject(sel);
  sel.set({
    top: flagPaddingTop,
    left: flagPaddingLeft,
    
  });
  canvas.getActiveObject().toActiveSelection();
  canvas.discardActiveObject();
  canvas.requestRenderAll();
});

let fc = "#002868";
let sc = "#000000";
let sw = 0;

const fcs = ["#fda08a", "#fb933d", "#fcd9dd", "#3fa9f5", "#F55039", "#050b8a"]


//---------end canvas construction------------------





// Undo function via key stroke












const Remove_Object = () => {
  let activeObjects = canvas.getActiveObjects();
  canvas.discardActiveObject();  
  if (activeObjects.length) {
    canvas.remove.apply(canvas, activeObjects);
  }
  canvas.remove(canvas.getActiveObject());
};


// Function that sends currently selected object backwards
const Send_Back = () => {
  let activeObjects = canvas.getActiveObject();
  canvas.sendBackwards(activeObjects);
  canvas.requestRenderAll();
};


// Function that sends currently selected object forwards
const Send_Front = () => {
  let activeObjects = canvas.getActiveObject();
  canvas.bringForward(activeObjects)
  canvas.requestRenderAll();
}


// Get guide tag in order to toggle on/off
const guideTag = document.querySelector(".overlaygrid")


// Event Listeners for tool keys
document.addEventListener("keyup", function (event) {
	if (event.key == "Backspace") {
    Remove_Object()
  }
  if (event.key == "g") {
    guideTag.classList.toggle("no-guide")
  }
  if (event.key == "[") {
    Send_Back()
  }
  if (event.key == "]") {
    Send_Front()
  }
});

const Clear_Canvas = () => {
  canvas.clear();
  canvas.add(canvasBackground);
  canvas.add(flagBorder);
}

const Load_SVG = () => {
  Clear_Canvas();
  fabric.loadSVGFromURL('https://cdn.glitch.com/81356b19-3300-460f-813c-f2d7801cd2a8%2Fmsflag.svg?v=1578928331653', (objects) => {
    canvas.add.apply(canvas, objects);
    canvas.renderAll();
    canvas.discardActiveObject();
  	var sel = new fabric.ActiveSelection(canvas.getObjects().splice(2), {
    	canvas: canvas,
  	});
  	canvas.setActiveObject(sel);
  	sel.set({
    	top: flagPaddingTop,
    	left: flagPaddingLeft,
      hasControls: true,
      borderColor: '#ffffff00',
      cornerColor: 'black',
      cornerSize: 5
  	});
  	canvas.getActiveObject().toActiveSelection();
  	canvas.discardActiveObject();
  	canvas.requestRenderAll();
  });
}

const Add_Star = () => {
  let path = new fabric.Path('M0,-1 L0.58779,0.80902 L-0.95106,-0.30902 L0.95106,-0.30902 L-0.58779,0.80902z');
  path.set({
    left: canvas.width / 2 - 11,
    top: canvas.height / 2 - 11,
    strokeWidth: 0,
    stroke: fcs[Math.floor(Math.random()*6)],
    fill: fcs[Math.floor(Math.random()*6)],
    hoverCursor: 'pointer',
    hasControls: true,
    borderColor: '#ffffff00',
    cornerColor: 'black',
    cornerSize: 5
  });
  path.scale(12);
  canvas.add(path);
}

const Add_Rectangle = () => {
  let rect = new fabric.Rect({
	  left: canvas.width / 2 - 25,
	  top: canvas.height / 2 - 25,
	  fill: fcs[Math.floor(Math.random()*6)],
	  width: 50,
	  height: 50,
	  strokeWidth: sw,
	  rx: 0,
	  ry: 0,
	  angle: 0,
	  hasControls: true,
    borderColor: '#ffffff00',
    cornerColor: 'black',
    cornerSize: 5
  });
  canvas.add(rect);
}

const Add_Circle = () => {
  let circ = new fabric.Circle({
	  left: canvas.width / 2 - 25,
	  top: canvas.height / 2 - 25,
	  fill: fcs[Math.floor(Math.random()*6)],
    radius: 25,
	  strokeWidth: sw,
	  rx: 0,
	  ry: 0,
	  angle: 0,
    hasControls: true,
    borderColor: '#ffffff00',
    cornerColor: 'black',
    cornerSize: 5
  });
  canvas.add(circ);
}

const nudgeLeft = () => {
  let newPos = canvas.getActiveObject().left - 1;
  canvas.getActiveObject().set('left', newPos);
  canvas.requestRenderAll();
}

const nudgeRight = () => {
  let newPos = canvas.getActiveObject().left + 1;
  canvas.getActiveObject().set('left', newPos);
  canvas.requestRenderAll();
}

const nudgeUp = () => {
  let newPos = canvas.getActiveObject().top - 1;
  canvas.getActiveObject().set('top', newPos);
  canvas.requestRenderAll();
}

const nudgeDown = () => {
  let newPos = canvas.getActiveObject().top + 1;
  canvas.getActiveObject().set('top', newPos);
  canvas.requestRenderAll();
}

document.addEventListener("keyup", function (event) {
  if (event.key == "ArrowLeft") {
    console.log("left")
    nudgeLeft();
  }
  if (event.key == "ArrowRight") {
    console.log("right")
    nudgeRight();
  }
  if (event.key == "ArrowUp") {
    console.log("up")
    nudgeUp();
  }
  if (event.key == "ArrowDown") {
    console.log("down")
    nudgeDown();
  }
  if (event.key == "-") {
    console.log("undo")
    canvas.undo();
  }
  
})


const Copy = () => {
	canvas.getActiveObject().clone( (cloned) => {
	  _clipboard = cloned;
	});
}

const Paste = () => {
	_clipboard.clone( (clonedObj) => {
		canvas.discardActiveObject();
		clonedObj.set({
			left: clonedObj.left + 10,
			top: clonedObj.top + 10,
			evented: true,
		});
		if (clonedObj.type === 'activeSelection') {
		  clonedObj.canvas = canvas;
			clonedObj.forEachObject( (obj) => canvas.add(obj));
			clonedObj.setCoords();
		} else {
			canvas.add(clonedObj);
		}
		_clipboard.top += 10;
		_clipboard.left += 10;
		canvas.setActiveObject(clonedObj);
		canvas.requestRenderAll();
	});
}

//change opacity while moving/////////////////////////////
canvas.on({
  'mouse:down': (e) => {
    if (e.target) {
      e.target.opacity = 0.5;
      canvas.renderAll();
    }
  },
  'mouse:up': (e) => {
    if (e.target) {
      e.target.opacity = 1;
      canvas.renderAll();
    }
  },
  'object:moved': (e) => {
    e.target.opacity = 0.5;
  },
  'object:modified': (e) => {
    e.target.opacity = 1;
  }
});
//end of moving///////////////////////////

let color1 = document.getElementById("color");
color1.addEventListener("change", () => {
  fc = color1.value
  canvas.getActiveObject().set('fill', fc);
  canvas.requestRenderAll();
});

const applyFillColor = () => {
  canvas.getActiveObject().set('fill', fc);
  canvas.requestRenderAll();
}


//end of color changer///////////////////








canvas.observe('object:selected', () => {
  if (canvas.getActiveObject().get('fill'))
  {
    fc = canvas.getActiveObject().get('fill');
    color1.value = fc;
  }
});

const hideToggle = () => document.getElementById("submission").style = "display: block";


fabric.Canvas.prototype.historyInit = function () {
  this.historyUndo = [];
  this.historyNextState = this.historyNext();

  this.on({
    "object:added": this.historySaveAction,
    "object:removed": this.historySaveAction,
    "object:modified": this.historySaveAction
  })
}

fabric.Canvas.prototype.historyNext = function () {
  return JSON.stringify(this.toDatalessJSON(this.extraProps));
}

fabric.Canvas.prototype.historySaveAction = function () {
  if (this.historyProcessing)
    return;

  const json = this.historyNextState;
  this.historyUndo.push(json);
  this.historyNextState = this.historyNext();
}

fabric.Canvas.prototype.undo = function () {
  // The undo process will render the new states of the objects
  // Therefore, object:added and object:modified events will triggered again
  // To ignore those events, we are setting a flag.
  this.historyProcessing = true;

  const history = this.historyUndo.pop();
  if (history) {
    this.loadFromJSON(history).renderAll();
  }

  this.historyProcessing = false;
}

canvas.historyInit();