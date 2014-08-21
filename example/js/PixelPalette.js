// JavaScript Document


// INIT //
var canvasA;
var context;
var FPS = 1;
var scene = 0;


var bgCol = 0;


// MEASUREMENT //
var halfX = 0;
var halfY = 0;
var fullX = 0;
var fullY = 0;
var units = 0;
var dx = 0;
var dy = 0;


//-------------------------------------------------------------------------------------------
//  INITIALISE
//-------------------------------------------------------------------------------------------


function init() {
	
	// SETUP CANVAS //
	canvasA = document.getElementById("canvas");
    context = canvasA.getContext("2d");
	resize_canvas();
	
	
	// LOAD OUR PALETTE //
	loadPalette("img/palette1.gif",paletteLoaded);
}


//-------------------------------------------------------------------------------------------
//  LOOP
//-------------------------------------------------------------------------------------------


// EVERY FRAME //
setInterval(function() {
	
	if (scene==1) { 
	    drawBG();
		drawScene();
	}
	
}, Math.round(1000/FPS));


//-------------------------------------------------------------------------------------------
//  PALETTE LOADER
//-------------------------------------------------------------------------------------------

// INIT //
palettes = [];
col = [];

// FUNCTION //
// INIT //
palettes = [];
col = [];

// FUNCTION //
function loadPalette(imgPath,callback,loadNotSet) {
	
	
	var loader = new PxLoader(); //// Use PX Loader to handle image load
	var palette = loader.addImage(imgPath);
	
	loader.addCompletionListener(function() { //// callback that will be run once image is ready 
	
	    var len = palette.width; //// get number of colours
		context.drawImage(palette,0,0,len,1); //// temporarilly place image
		var imgd = context.getImageData(0,0,len,1); //// get the image data
		var pal = imgd.data;
		
		var thisPalette = []; //// Loop over each pixel and add the color to an array.
		for (var i = 0; i < (len*4); i += 4) {
			thisPalette[i/4] = "rgba("+pal[i]+", "+pal[i+1]+", "+pal[i+2]+", 1)";
		}
		
		palettes.push(thisPalette); //// Add this palette to an array containing all palletes
		
		if (!loadNotSet) { //// Make this the current palette immediately
			col = palettes[0];
		}
		
		if (callback) { //// Finished loading the pallete, run the callback if there is one
		    callback(); 
		}
	}); 
	
	loader.start(); //// begin downloading image
}

// OUR CALLBACK FUNCTION (advances scene to start drawing)
function paletteLoaded() {
	scene = 1;
}


//-------------------------------------------------------------------------------------------
//  BACKGROUND
//-------------------------------------------------------------------------------------------


function drawBG() {
	
	// Now we have the palette loaded, let's cycle through the colours in our background
	
	context.globalAlpha = 1;
	context.fillStyle = col[bgCol];
	context.fillRect(0,0,fullX,fullY);
	
	// cycle
	bgCol += 1;
	if (bgCol==col.length) {
		bgCol = 0;
	}
	
}


//-------------------------------------------------------------------------------------------
//  FOREGROUND
//-------------------------------------------------------------------------------------------


function drawScene() {

	// Now we have the palette loaded, let's just draw the colours onscreen as a test
	
	thisSize = 16;
	//shadow
	context.globalAlpha = 0.1;
	context.fillStyle = "#002";
	context.fillRect(dx-((col.length*0.5)*(thisSize*units))+(2*units),dy-(0.5*(thisSize*units))+(2*units),col.length*(thisSize*units),thisSize*units);
	
	// colours
	context.globalAlpha = 1;
	for (i=0;i<col.length;i++) {
		context.fillStyle = col[i];
		context.fillRect(dx-((col.length*0.5)*(thisSize*units))+(i*(thisSize*units)),dy-(0.5*(thisSize*units)),thisSize*units,thisSize*units);
	}
}


//-------------------------------------------------------------------------------------------
//  MEASUREMENT
//-------------------------------------------------------------------------------------------


    // this is just to scale the drawing //
function resize_canvas() {
	
	canvasA.width  = window.innerWidth;
	canvasA.height = window.innerHeight;
	
	// UNIT SIZES //
	halfX = Math.round(canvasA.width/2);
	halfY = Math.round(canvasA.height/2);
	fullX = canvasA.width;
	fullY = canvasA.height;
	dx = halfX;
	dy = halfY;
	
	units = fullX*0.0025; // SCALED UNITS FOR DRAWING
}

