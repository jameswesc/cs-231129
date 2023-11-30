<script lang="ts">
	import { T, useThrelte } from '@threlte/core'
	import { MeshLineGeometry, MeshLineMaterial } from '@threlte/extras'
	import { AdditiveBlending, Group, NormalBlending, Vector3 } from 'three'
	import { createCirclePoints } from './utils'

	export let color = '#6C85E8'

	const { size } = useThrelte()

	$: radius = Math.min($size.width, $size.height) / 2

	$: outerRingPoints = createCirclePoints(radius * 0.95)
	$: innerRingPoints = createCirclePoints(radius * 0.1)

	const sectionTheta = Math.PI / 8

	$: horizontalPoints = [new Vector3(-$size.width, 0, 0), new Vector3($size.width, 0, 0)]
	$: verticalPoints = [new Vector3(0, -$size.height, 0), new Vector3(0, $size.height, 0)]

	function genSectionLine(radius: number, s: number) {
		return [
			new Vector3(0.225 * radius * Math.cos(s), 0.225 * radius * Math.sin(s), 0),
			new Vector3(0.9 * radius * Math.cos(s), 0.9 * radius * Math.sin(s), 0)
		]
	}

	$: sectionLines = [1, 3, 5, 7, 9, 11, 13, 15].map((i) =>
		genSectionLine(radius, i * sectionTheta)
	)

	const materialProps = {
		color: color,
		width: 2,
		attenuate: false
		// blending: AdditiveBlending
	}
</script>

<!-- Outer Ring -->
<T.Mesh>
	<MeshLineGeometry points={outerRingPoints} />
	<MeshLineMaterial {...materialProps} width={4} />
</T.Mesh>

<!-- Inner Ring -->
<T.Mesh>
	<MeshLineGeometry points={innerRingPoints} />
	<MeshLineMaterial {...materialProps} width={4} />
</T.Mesh>

<!-- Cross -->
<T.Mesh>
	<MeshLineGeometry points={horizontalPoints} />
	<MeshLineMaterial {...materialProps} />
</T.Mesh>

<T.Mesh>
	<MeshLineGeometry points={verticalPoints} />
	<MeshLineMaterial {...materialProps} />
</T.Mesh>

<!-- Section Lines -->
{#each sectionLines as sectionLine}
	<T.Mesh>
		<MeshLineGeometry points={sectionLine} />
		<MeshLineMaterial {...materialProps} />
	</T.Mesh>
{/each}
