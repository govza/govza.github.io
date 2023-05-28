import * as tf from "@tensorflow/tfjs"

export type Prediction = {
    className: string
    probability: number
    boxes?: [number, number, number, number]
    position?: { top: number; left: number; width: number; height: number }
    area?: number
}

const IMAGE_SIZE = 320
const MODEL_PATH = "/models/yolov5-people-1.0/model.json"
const MODEL_CLASSES: { [classId: number]: "people" } = {
    0: "people",
}
let model: tf.GraphModel<string | tf.io.IOHandler> | null = null

/**
 * Load tf model warm it up and return it
 * @returns
 */
export const loadModelAsync = async () => {
    if (model === null) {
        const loadedModel = await tf.loadGraphModel(MODEL_PATH)
        if (loadedModel === null) {
            throw new Error("Model not loaded")
        }
        model = loadedModel
    }
    // Warmup the model.
    await model.executeAsync(tf.zeros([1, IMAGE_SIZE, IMAGE_SIZE, 3])).then((res) => {
        tf.dispose(res)
    })

    return model
}

// When an image is clicked, let's classify it and display results!
export const classifyAsync = async (img: HTMLImageElement) => {
    if (model == null) {
        console.log("loading model")
        await loadModelAsync()
    }
    const response = await fetch(img.src);
    const imageBlob = await response.blob();
    const imageBitMap = await createImageBitmap(imageBlob);
    const image = tf.browser.fromPixels(imageBitMap);

    const input = tf.tidy(() => {
        return tf.image
            .resizeBilinear(image, [IMAGE_SIZE, IMAGE_SIZE])
            .div(255.0)
            .expandDims(0) as tf.Tensor3D
    })

    const logits = (await model?.executeAsync(input)) as tf.Tensor[]

    const [boxes, scores, classes, valid_detections] = logits

    const boxes_data = Array.from(boxes.dataSync())
    const scores_data = Array.from(scores.dataSync())
    const classes_data = Array.from(classes.dataSync())
    const valid_detections_data = valid_detections.dataSync()[0]

    tf.dispose(logits)

    const topClassesAndProbs: Prediction[] = []

    if (valid_detections_data === 0) {
        for (const classId in MODEL_CLASSES) {
            const value = MODEL_CLASSES[classId]
            topClassesAndProbs.push({
                className: value,
                probability: 0,
                boxes: [0, 0, 0, 0],
            })
        }
        return topClassesAndProbs
    }

    for (let i = 0; i < valid_detections_data; ++i) {
        const klass = MODEL_CLASSES[classes_data[i]]
        const score = scores_data[i]
        // top left [x1, y1], bottom right [x2, y2]
        const [x1, y1, x2, y2] = boxes_data.slice(i * 4, (i + 1) * 4) as [number, number, number, number]

        const top = y1 * img.height
        const left = x1 * img.width
        const width = (x2 - x1) * img.width
        const height = (y2 - y1) * img.height

        topClassesAndProbs.push({
            className: klass,
            probability: score,
            boxes: [x1, y1, x2, y2],
            position: { top, left, width, height },
            area: width * height,
        })
    }

    tf.dispose(logits)
    return topClassesAndProbs
}
