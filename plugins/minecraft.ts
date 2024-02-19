import {MinecraftTextureLoader, ElementMesh} from '@sceat/three-mcmodel'
import {MinecraftModel} from '@oran9e/minecraft-model'
import {ElementGeometry} from '@sceat/three-mcmodel/dist/geometry'
import {ref, onMounted, onBeforeUnmount} from 'vue'

/*
const normalize_json_display = ({display: {fixed}, ...item}) => ({
    ...item,
    display: {
        fixed,
    },
})*/


export default defineNuxtPlugin({
    name: 'minecraft',
    env: {
        islands: false
    },
    setup() {
        return {
            provide: {
                renderModel: async ({
                                        model_json,
                                        model_mcmeta_json: {animation: {frametime = 2} = {}} = {},
                                        model_texture_blob,
                                    }) => {

                    const {elements, textures} = MinecraftModel.fromJson(
                        normalize_json_display(model_json),
                        []
                    )
                    const textureLoader = new MinecraftTextureLoader()
                    const texture = await textureLoader.load(
                        URL.createObjectURL(model_texture_blob)
                    )

                    return elements.map(element => {
                        const geometry = new ElementGeometry(element, textures).translate(
                            -8,
                            -4,
                            -8
                        )
                        const mesh = new ElementMesh(geometry, textures)
                        mesh.resolveTextures(() => texture)
                    })
                }
            }
        }
    }

})
