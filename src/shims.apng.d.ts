

declare interface IAnimation {
    width: number;
    height: number;
    numPlays: number;
    playTime: number;
    frames: {
        width: number;
        height: number;
        left: number;
        top: number;
        delay: number;
        disposeOp: number;
        blendOp: number;
        img: HTMLImageElement;
    }[];

    isPlayed(): boolean;
    isFinished(): boolean;
    play(): void;
    rewind(): void;
    addContext(ctx: CanvasRenderingContext2D): void;
    removeContext(ctx: CanvasRenderingContext2D): void;
}

declare interface IAPNG {
    parseURL(url: string): Promise<IAnimation>
}


declare const APNG: IAPNG;
