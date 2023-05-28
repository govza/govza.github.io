export default defineNuxtConfig({
    app: {
        head: {
            title: "Gazelle v2.0.0",
            htmlAttrs: {
                lang: "en",
            },
            meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
            noscript: [{ children: "Javascript is required" }],
        },
    },

    modules: ["@nuxtjs/tailwindcss"],

    css: ["@fortawesome/fontawesome-svg-core/styles.css"],

    build: {
        transpile: ["@fortawesome/vue-fontawesome"],
    },

    compatibilityDate: "2024-11-22",
})
