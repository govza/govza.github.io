<template>
    <main>
        <div class="flex flex-wrap">
            <div
                v-for="(image, index) in links"
                :key="index"
                class="m-2 before:content-[''] before:rounded-md before:absolute before:inset-0 before:bg-black before:bg-opacity-20 relative"
                :class="{
                    'w-1/4': !isNatural,
                    overlay: isHidden,
                    'relative mb-4  before:content-[``] before:rounded-md before:absolute before:inset-0 before:bg-black before:bg-opacity-20': true,
                }"
            >
                <img
                    :ref="setItemRef"
                    class="rounded-md"
                    :src="getImageSrc(image)"
                    :alt="image.alt"
                    loading="lazy"
                    :width="getWidth"
                    :height="getHeight"
                    @load="onImageLoad"
                />
                <div class="absolute right-0 top-0 p-2 text-blue-600 cursor-pointer z-51">
                    <font-awesome-icon
                        :icon="['fas', 'link']"
                        size="lg"
                        :border="true"
                        @click="handleLinkClick(index)"
                    />
                </div>
                <div class="absolute right-10 top-0 p-2 text-green-600 cursor-pointer z-51">
                    <font-awesome-icon
                        :icon="['fas', 'eye']"
                        size="lg"
                        :border="true"
                        @click="handleModelClick(index)"
                    />
                </div>
                <div class="absolute top-10 p-8 text-pink-300 flex flex-col z-50">
                    <div class="relative text-ellipsis overflow-hidden">
                        <h1 class="text-lg font-bold mb-3">{{ image.alt }}</h1>
                        <p class="text-sm">w/h {{ imageWidth }}x{{ imageHeight }}</p>
                        <p class="text-sm">natural w/h {{ naturalWidth }}x{{ naturalHeight }}</p>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
<script lang="ts">
import { classifyAsync } from "~/helpers/tfjs"
import type { Prediction } from "~/helpers/tfjs"

export default {
    name: "Gallery",
    props: {
        links: {
            required: true,
            type: Array as () => ImgApiSource[],
            default: () => [],
        },
        isHidden: {
            required: false,
            type: Boolean,
            default: false,
        },
        isNatural: {
            required: false,
            type: Boolean,
            default: false,
        },
        size: {
            required: false,
            type: String as () => ImgSource,
            default: "original",
        },
    },
    data() {
        return {
            itemRefs: [] as unknown[],
            highLightedImages: [] as unknown[],
            imageWidth: 0,
            imageHeight: 0,
            naturalWidth: 0,
            naturalHeight: 0,
        }
    },
    computed: {
        getWidth() {
            if (this.isNatural) {
                return ""
            }
            return "1000"
        },
        getHeight() {
            if (this.isNatural) {
                return ""
            }
            return "1000"
        },
    },
    methods: {
        setItemRef(el: unknown) {
            if (el) {
                this.itemRefs.push(el)
            }
        },
        getImageSrc(image: ImgApiSource): string {
            if (this.size === "micro") {
                return image.src.original + "?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=34&w=34"
            }
            return image.src[this.size]
        },
        onImageLoad(event: Event) {
            const imageElement = event.target as HTMLImageElement
            this.imageWidth = imageElement.width
            this.imageHeight = imageElement.height
            this.naturalWidth = imageElement.naturalWidth
            this.naturalHeight = imageElement.naturalHeight
        },
        async handleModelClick(index: number) {
            // Access the image element using this.$refs
            const img = this.itemRefs[index] as unknown
            if (this.highLightedImages.includes(img)) {
                Array.from(document.getElementsByClassName("highlighter")).forEach((element: Element) => {
                    element.remove(); 
                });
                this.highLightedImages = this.highLightedImages.filter(item => item !== img);
                return;
            }
            if (img instanceof HTMLImageElement) {
                const result = await classifyAsync(img)
                for (const prediction of result) {
                    if (prediction.position) {
                        const { top, left, width, height } = prediction.position;
                        const highlighter = document.createElement("div");
                        highlighter.setAttribute("class", "highlighter");
                        highlighter.style.top = `${top}px`;
                        highlighter.style.left = `${left}px`;
                        highlighter.style.width = `${width}px`;
                        highlighter.style.height = `${height}px`;
                        img.parentElement?.appendChild(highlighter);
                    }
                    this.$forceUpdate();
                }
                this.highLightedImages.push(img);
                console.log("prediction: ", result)
                console.log("boxes: ", result.map((p: Prediction) => p.boxes))
                console.log("position: ", result.map((p: Prediction) => p.position))
            } else {
                console.error("Image element is not an instance of HTMLImageElement.")
            }
        },
        handleLinkClick(index: number) {
            const image = this.links[index]
            if (import.meta.client) {
                window.open(image.src.original, "_blank");
            }
        },
    },
}
</script>
<style>
.overlay {
    position: relative;
}
.overlay:before {
    content: "";
    position: absolute;
    top: 5%;
    left: 5%;
    height: 90%;
    width: 90%;
    background: rgba(255, 255, 255, 0.98);
}
.highlighter {
  background: rgba(0, 255, 0, 0.25);
  border: 1px dashed #fff;
  z-index: 1;
  position: absolute;
}
</style>
