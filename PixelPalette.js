define(["require", "exports"], function (require, exports) {
    var PixelPalette;
    (function (PixelPalette) {
        var Loader = (function () {
            function Loader() {
            }
            Loader.prototype.Load = function () {
                console.log("loading");
            };
            return Loader;
        })();
        PixelPalette.Loader = Loader;
    })(PixelPalette = exports.PixelPalette || (exports.PixelPalette = {}));
});


