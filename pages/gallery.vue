<template>
    <div class="bg-white m-10">
        <div class="flex">
            <h1 class="text-6xl font-normal leading-normal mt-0 mb-2 text-pink-800">
                Gallery <span class="text-green-500">{{ links.length }}</span>
            </h1>
            <button
                class="ml-4 my-8 px-4 border border-gray-400 rounded shadow"
                :class="{
                    'bg-blue-500 text-white': isOverlay,
                    'bg-white text-blue-500': !isOverlay,
                }"
                @click="toggleOverlay()"
            >
                Overlay
            </button>
            <button
                class="ml-4 my-8 px-4 border border-gray-400 rounded shadow"
                :class="{
                    'bg-blue-500 text-white': isNatural,
                    'bg-white text-blue-500': !isNatural,
                }"
                @click="toggleIsNatural()"
            >
                Naturalize
            </button>
        </div>
        <Gallery :links="links" :is-hidden="isOverlay" :size="size" :is-natural="isNatural" />
    </div>
</template>
<script lang="ts">
import Gallery from "~/components/Gallery.vue"
import unsafeImagesData from "~/assets/gallery-unsafe.json"
import safeImagesData from "~/assets/gallery-safe.json"

export default {
    name: "GalleryPage",
    components: {
        Gallery,
    },
    computed: {
        level() {
            return this.$route.query.level as string
        },
        isOverlay() {
            return this.$route.query.isOverlay === "true"
        },
        isNatural() {
            return this.$route.query.isNatural === "true"
        },
        size() {
            return this.$route.query.size as ImgSource
        },
        count() {
            return parseInt(this.$route.query.count as string)
        },
        isSafe() {
            return this.level === "safe"
        },
        links(): Array<ImgApiSource> {
            const data = this.level === "safe" ? safeImagesData : unsafeImagesData as unknown as Array<ImgApiSource>
            return data.slice(0, this.count) as Array<ImgApiSource>
        },
    },
    methods: {
        toggleOverlay() {
            this.$router.push({
                name: "gallery",
                query: {
                    level: this.level,
                    size: this.size,
                    count: this.count,
                    isOverlay: this.isOverlay.toString() === "true" ? "false" : "true",
                    isNatural: this.isNatural.toString(),
                },
            })
        },
        toggleIsNatural() {
            this.$router.push({
                name: "gallery",
                query: {
                    level: this.level,
                    size: this.size,
                    count: this.count,
                    isOverlay: this.isOverlay.toString(),
                    isNatural: this.isNatural.toString() === "true" ? "false" : "true" ,
                },
            })
        }
    },
}
</script>
