<script lang="ts">
	import { useThrelte, useRender } from '@threlte/core'
	import {
		EffectComposer,
		EffectPass,
		RenderPass,
		BloomEffect,
		KernelSize,
		ScanlineEffect
	} from 'postprocessing'
	import type { OrthographicCamera } from 'three'

	const { scene, renderer, camera, size } = useThrelte()

	// To use the EffectComposer we need to pass arguments to the
	// default WebGLRenderer: https://github.com/pmndrs/postprocessing#usage
	const composer = new EffectComposer(renderer)

	const setupEffectComposer = (camera: OrthographicCamera) => {
		composer.removeAllPasses()

		composer.addPass(new RenderPass(scene, camera))

		composer.addPass(
			new EffectPass(
				camera,
				new BloomEffect({
					intensity: 1,
					luminanceThreshold: 0.15,
					height: 512,
					width: 512,
					luminanceSmoothing: 0.08,
					mipmapBlur: true,
					kernelSize: KernelSize.MEDIUM
				}),
				new ScanlineEffect({
					density: 1.5
				})
			)
		)
	}

	// We need to set up the passes according to the camera in use
	$: setupEffectComposer($camera as OrthographicCamera)
	$: composer.setSize($size.width, $size.height)

	useRender((_, delta) => {
		composer.render(delta)
	})
</script>
