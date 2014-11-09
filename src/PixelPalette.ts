
declare var PxLoader;

// note: if you want to make this an amd module, you have to export it.
// e.g. export module PixelPalette

class PixelPalette {

    constructor(private context: CanvasRenderingContext2D, private imgPath: string){

    }

    public Load(callback: (palette: string[]) => void): void {
        var loader = new PxLoader(); //// Use PX Loader to handle image load
        var img = loader.addImage(this.imgPath);

        loader.addCompletionListener(() => { //// callback that will be run once image is ready

            var len = img.width; //// get number of colours
            this.context.drawImage(img, 0, 0, len, 1); //// temporarily place image
            var imgd = this.context.getImageData(0, 0, len, 1); //// get the image data
            var pal = imgd.data;

            var palette: string[] = []; //// Loop over each pixel and add the color to an array.

            for (var i = 0; i < (len*4); i += 4) {
                palette[i/4] = "rgba("+pal[i]+", "+pal[i+1]+", "+pal[i+2]+", 1)";
            }

            callback(palette);
        });

        loader.start(); //// begin downloading image
    }
}

export = PixelPalette;