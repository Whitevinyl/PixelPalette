import RGBA = require("./RGBA");
declare class PixelPalette {
    private imgPath;
    constructor(imgPath: string);
    Load(callback: (palette: RGBA[]) => void): void;
}
export = PixelPalette;
