var cone = null;
var gl = null;

var canvas = undefined
var near = 1.0;     // near clipping plane's distance
var far = 10.0;     // far clipping plane's distance

// Viewing transformation parameters
var V = undefined;
var M = undefined;
var angle = 0.0;
var dAngle = 0.0; //Math.PI / 10.0;
var S = undefined;
var mouseDown = false;
var lastMouseX = null;
var lastMouseY = null;
var zvalue = -0.5*(near + far);
var offset = [ 0.0,  0.0, 0.0 ];
var rotationAxis = undefined;
var xAxis = [1, 0, 0];
var yAxis = [0, 1, 0];
var speed = 1;
var stoprotating = 0;

function init() {
    var canvas = document.getElementById( "webgl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );

    if ( !gl ) {
        alert("Unable to setup WebGL");
        return;
    }
    canvas.onmousedown = function handleMouseDown(event) {
        mouseDown = true;
        lastMouseX = event.clientX;
        lastMouseY = event.clientY;
    }
    document.onmouseup = function handleMouseUp(event) {
        mouseDown = false;
        if (stoprotating) dAngle = 0.0;
        return;

    }
    document.onmousemove = function handleMouseMove(event) {
    if (!mouseDown) {
      if(stoprotating) dAngle = 0.0;
      return;
    }
    var newX = event.clientX;
    var newY = event.clientY;

    var deltaX = newX - lastMouseX;
    var deltaY = newY - lastMouseY;
    dAngle = degToRad(deltaX + deltaY) * Math.PI * 5;
    lastMouseX = newX;
    lastMouseY = newY;
    }

    gl.clearColor(0.5, 0.0, 1.0, 1.0 );
    gl.enable(gl.DEPTH_TEST);

    cone = new Cone(gl);
    window.requestAnimationFrame(render);
    render();
}



function render() {
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
    V = translate(0.0, 0.0, zvalue);
    angle += dAngle ;
    //offset = [ -3.0,  3.0, 0.0 ];
    var axis = undefined; //[ 1.0, 1.0, 1.0 ];
    if (rotationAxis != undefined) axis = rotationAxis;
    else axis = [ 1.0, 1.0, 1.0 ];
  
    ms = new MatrixStack();
    ms.push();
    ms.load(V);
    ms.translate(offset);
    ms.rotate((speed * angle), axis);
    ms.scale(1.0, 1.0, 1.0);
    cube.MV = ms.current();
    ms.pop();
    cone.render();
    windows.requestAnimationFrame(render);
}
function degToRad(degrees) {
    return degrees * Math.PI / 180;
}
window.onload = init;
