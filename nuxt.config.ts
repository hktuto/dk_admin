import { defineNuxtConfig } from 'nuxt'
import ElementPlus from 'unplugin-element-plus/vite'
// https://v3.nuxtjs.org/api/configuration/nuxt.config
const lifecycle = process.env.npm_lifecycle_event;
export default defineNuxtConfig({
    css:[
        '~/assets/index.scss'
    ],
    watchQuery: true,
    buildModules:['@nuxtjs/color-mode'],
    colorMode:{
        classPrefix:'',
        classSuffix:'',
    },
    publicRuntimeConfig:{
        public:{
            API_ENDPOINT: process.env.API_ENDPOINT
        }
    },
    build: {
        transpile: lifecycle === "build" ? ["element-plus"] : [],
      },
    // vite:{
    //     plugins:[
    //         ElementPlus()
    //     ]
    // }
})
