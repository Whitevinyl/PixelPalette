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
})(PixelPalette || (PixelPalette = {}));


