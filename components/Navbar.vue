<template>
    <nav class="relative flex flex-wrap items-center justify-between px-2 py-3 bg-green-700 mb-3">
        <div class="container px-4 mx-auto flex flex-wrap items-center justify-between">
            <div class="w-full relative flex justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start">
                <NuxtLink
                    to="/"
                    class="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
                >
                    Gazelle
                </NuxtLink>
                <select
                    v-model="selectedCount"
                    class="mx-5 p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                    <option v-for="el in [1, 5, 25, 50]" :key="el" :value="el">{{ el }}</option>
                </select>
                <button
                    class="text-white cursor-pointer px-3 py-1 border border-solid border-transparent rounded bg-transparent outline-none focus:outline-none"
                    type="button"
                    @click="warmUpModel()"
                >
                    <font-awesome-icon v-if="isModelLoaded" :icon="['fas', 'fire']" />
                    <font-awesome-icon v-if="!isModelLoaded" :icon="['fas', 'circle-nodes']" />
                    <template v-if="isLoadingModel">
                        Loading model
                        <font-awesome-icon
                            class="text-white cursor-pointer px-3 py-1 border border-solid border-transparent rounded bg-transparent outline-none focus:outline-none"
                            :icon="['fas', 'spinner']"
                            spin
                        />
                    </template>
                </button>
                <button
                    class="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                    type="button"
                    @click="toggleNavbar()"
                >
                    <font-awesome-icon :icon="['fas', 'bars']" />
                </button>
            </div>
            <div :class="{ hidden: !showMenu, flex: showMenu }" class="lg:flex lg:flex-grow flex-col">
                <div class="flex flex-col ist-none ml-auto">
                    <template v-for="level in levels" :key="level">
                        <ul class="flex flex-col list-none py-3">
                            <li class="nav-item">
                                <font-awesome-icon
                                    v-if="level === 'safe'"
                                    class="text-blue-600"
                                    :icon="['fas', 'eye']"
                                />
                                <font-awesome-icon v-else class="text-red-600" :icon="['fas', 'eye-slash']" />
                                <template v-for="size in sizes" :key="size.key">
                                    <NuxtLink
                                        :to="{
                                            name: 'gallery',
                                            query: {
                                                level: level,
                                                size: size,
                                                count: count,
                                                isOverlay: level === 'unsafe',
                                            },
                                        }"
                                        :class="[
                                            'px-3 py-2 text-xs uppercase font-bold leading-snug hover:opacity-75',
                                            isActiveLink(level, size) ? 'bg-white text-pink-400' : 'text-white'
                                        ]"
                                    >
                                        {{ size }}
                                    </NuxtLink>
                                </template>
                            </li>
                        </ul>
                    </template>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import { loadModelAsync } from "~/helpers/tfjs"

export default {
    name: "Navbar",
    data() {
        return {
            isLoadingModel: false,
            isModelLoaded: false,
            showMenu: false,
            sizes: ["micro", "small", "medium", "large", "large2x", "original"],
            levels: ["safe", "unsafe"],
            selectedCount: 25,
        }
    },
    computed: {
        count() {
            return this.selectedCount
        },
    },
    watch: {
        selectedCount() {
            this.navigateToGallery()
        },
    },
    methods: {
        isActiveLink(level, size) {
            return (
                this.$route.query.level === level && this.$route.query.size === size && this.$route.name === "gallery"
            )
        },
        navigateToGallery() {
            const currentQuery = { ...this.$route.query }
            currentQuery.count = this.selectedCount.toString()

            if (!currentQuery.size || !currentQuery.level) {
                return
            }

            this.$router.push({
                name: "gallery",
                query: currentQuery,
            })
        },
        toggleNavbar() {
            this.showMenu = !this.showMenu
        },
        async warmUpModel() {
            this.isLoadingModel = true
            await loadModelAsync()
            this.isLoadingModel = false
            this.isModelLoaded = true
        },
    },
}
</script>
