declare class PixelPalette {
    private imgPath;
    constructor(imgPath: string);
    Load(callback: (palette: string[]) => void): void;
}
export = PixelPalette;
