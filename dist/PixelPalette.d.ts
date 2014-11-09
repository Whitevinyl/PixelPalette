declare class PixelPalette {
    private context;
    private imgPath;
    constructor(context: CanvasRenderingContext2D, imgPath: string);
    Load(callback: (palette: string[]) => void): void;
}
export = PixelPalette;
