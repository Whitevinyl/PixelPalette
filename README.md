PixelPalette
============

This is a simple way to import a .gif palette to use in your Javascript/Canvas/HTML5 projects.


I made it to make colour managing much easier when using vectors,text & UI elements, and remove the need to deal with Hex codes/RGBA colour values.
Editing a colour palette mid-project is less of a chore, and it's particularly handy if you want to have unified colour adjustments across the whole palette (by applying colour/level adjustment layers to a screengrab of your project in Photoshop, then dragging those adjustments onto your palette .gif and re-saving it).
Each colour is a single pixel in the .gif.


Load a palette:

   loadPalette("img/palette1.gif");


Load a palette, with a callback function:

   loadPalette("img/palette1.gif",paletteLoaded);


By default colours are saved in an array called "col".
Setting a colour for drawing:

   context.fillStyle = col[0];


You can upload multiple palettes and switch between them any time:

   col = palettes[3];


This example loads a 7 colour palette, draws them onscreen and cycles through them in the background colour:

http://whitevinyl.github.io/PixelPalette/example/
