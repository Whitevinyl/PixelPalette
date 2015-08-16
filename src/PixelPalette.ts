import RGBA = require("./RGBA");
declare var PxLoader;

// note: if you want to make this an amd module, you have to export it.
// e.g. export module PixelPalette

class PixelPalette {

    constructor(private imgPath: string){

    }

    public Load(callback: (palette: RGBA[]) => void): void {
        var loader = new PxLoader(); //// Use PX Loader to handle image load
        var img = loader.addImage(this.imgPath);

        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');

        loader.addCompletionListener(() => { //// cb that will be run once image is ready

            var len = img.width; //// get number of colours
            context.drawImage(img, 0, 0, len, 1); //// temporarily place image
            var imgd = context.getImageData(0, 0, len, 1); //// get the image data
            var pal = imgd.data;

            var palette: RGBA[] = []; //// Loop over each pixel and add the color to an array.

            for (var i = 0; i < (len*4); i += 4) {
                palette[i/4] = new RGBA(pal[i],pal[i+1],pal[i+2],pal[i+3]);
            }

            cb(palette);
        });

        loader.start(); //// begin downloading image
    }
}

export = PixelPalette;