// JavaScript Document


//-------------------------------------------------------------------------------------------
//  PALETTE LOADER
//-------------------------------------------------------------------------------------------


// INIT //
palettes = [];
col = [];

// FUNCTION //
function loadPalette(imgPath,callback,loadNotSet) {
	
	var callback = callback || false;
	var loadNotSet = loadNotSet || false;
	
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
		
		if (loadNotSet==false) { //// Make this the current palette immediately
			col = palettes[0];
		}
		
		if (callback!==false) { //// Finished loading the pallete, run the callback if there is one
		    callback(); 
		}
	}); 
	
	loader.start(); //// begin downloading image
}