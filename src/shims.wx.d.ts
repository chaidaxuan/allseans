declare interface IWX {
    ready(cb: () => void): void
}

declare interface Window {
    wx: IWX | undefined;
}
