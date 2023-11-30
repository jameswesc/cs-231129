<script lang="ts">
	import { T, useThrelte } from '@threlte/core'
	import { MeshLineGeometry, MeshLineMaterial } from '@threlte/extras'
	import { createCirclePoints } from './utils'
	import { AdditiveBlending } from 'three'

	export let color = '#343A91'

	const { size } = useThrelte()
	$: radius = Math.min($size.width, $size.height) / 2

	const sectionTheta = Math.PI / 8

	$: middleRing1 = createCirclePoints(radius * 0.275, -sectionTheta, 3 * sectionTheta)
	$: middleRing3 = createCirclePoints(
		radius * 0.275,
		5 * sectionTheta,
		2 * Math.PI - 3 * sectionTheta
	)
	$: middleRing2 = createCirclePoints(radius * 0.4, -sectionTheta, 2 * Math.PI - 3 * sectionTheta)

	const materialProps = {
		color,
		width: 4,
		attenuate: false
		// blending: AdditiveBlending
	}
</script>

<!-- Middle Rings -->
<T.Mesh>
	<MeshLineGeometry points={middleRing1} />
	<MeshLineMaterial {...materialProps} />
</T.Mesh>

<T.Mesh>
	<MeshLineGeometry points={middleRing2} />
	<MeshLineMaterial {...materialProps} />
</T.Mesh>

<T.Mesh>
	<MeshLineGeometry points={middleRing3} />
	<MeshLineMaterial {...materialProps} />
</T.Mesh>
