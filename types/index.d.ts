export { ImgApiSource, ImgSource }

declare global {
    type ImgSource = "micro"| "original" | "small" | "medium" | "large" | "large2x"
    interface ImgApiSource {
        src: {
            [key in ImgSource]: string
        }
        alt: string
        width: number
        height: number
    }
}
