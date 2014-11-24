define(["require", "exports"], function (require, exports) {
    // note: if you want to make this an amd module, you have to export it.
    // e.g. export module PixelPalette
    var PixelPalette = (function () {
        function PixelPalette(imgPath) {
            this.imgPath = imgPath;
        }
        PixelPalette.prototype.Load = function (callback) {
            var loader = new PxLoader(); //// Use PX Loader to handle image load
            var img = loader.addImage(this.imgPath);
            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');
            loader.addCompletionListener(function () {
                var len = img.width; //// get number of colours
                context.drawImage(img, 0, 0, len, 1); //// temporarily place image
                var imgd = context.getImageData(0, 0, len, 1); //// get the image data
                var pal = imgd.data;
                var palette = []; //// Loop over each pixel and add the color to an array.
                for (var i = 0; i < (len * 4); i += 4) {
                    palette[i / 4] = "rgba(" + pal[i] + ", " + pal[i + 1] + ", " + pal[i + 2] + ", 1)";
                }
                callback(palette);
            });
            loader.start(); //// begin downloading image
        };
        return PixelPalette;
    })();
    return PixelPalette;
});
