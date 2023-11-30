<script lang="ts">
	import { T, useThrelte } from '@threlte/core'
	import { createNoise2D } from 'simplex-noise'
	import { Smush32 } from '@thi.ng/random'
	import { AdditiveBlending } from 'three'

	export let noiseRadius = 1
	export let sections = 64

	const rnd = new Smush32(231129)
	const randomFn = () => rnd.float()
	const noise2d = createNoise2D(randomFn)

	// sectionTheta
	$: st = (2 * Math.PI) / sections
	// angleBuffer
	const ab = (Math.PI / 180) * 0.5

	const { size } = useThrelte()
	$: radius = Math.min($size.width, $size.height) / 2

	// normalised polar noise
	$: npn = (i: number) => {
		const n = noise2d(noiseRadius * Math.cos(i * st), noiseRadius * Math.sin(i * st))
		return (n + 1) / 2
	}
</script>

{#each new Array(sections) as _, i}
	<T.Mesh>
		<T.RingGeometry
			args={[
				0.41 * radius,
				(0.45 + 0.5 * npn(i)) * radius,
				4,
				1,
				(i + 0.5) * st + ab,
				st - 2 * ab
			]}
		/>
		<T.MeshBasicMaterial
			color="#6B89FF"
			transparent
			opacity={0.7}
			blending={AdditiveBlending}
		/>
	</T.Mesh>
{/each}
