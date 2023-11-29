<script lang="ts">
	import { T, useThrelte } from '@threlte/core'
	import { MeshLineGeometry, MeshLineMaterial } from '@threlte/extras'
	import { Vector3 } from 'three'

	const { size } = useThrelte()

	function createCirclePoints(
		radius = 1,
		thetaStart = 0,
		thetaEnd = 2 * Math.PI,
		numberOfPoints = 360
	) {
		const points = []
		const deltaTheta = (thetaEnd - thetaStart) / (numberOfPoints - 1)
		for (let i = 0; i < numberOfPoints; i++) {
			const theta = thetaStart + i * deltaTheta
			points.push(new Vector3(radius * Math.cos(theta), radius * Math.sin(theta), 0))
		}
		return points
	}

	$: radius = Math.min($size.width, $size.height) / 2

	$: outerRingPoints = createCirclePoints(radius * 0.95)
	$: innerRingPoints = createCirclePoints(radius * 0.1)

	const s = Math.PI / 8

	$: middleRing1 = createCirclePoints(radius * 0.275, -s, 3 * s)
	$: middleRing3 = createCirclePoints(radius * 0.275, 5 * s, 2 * Math.PI - 3 * s)
	$: middleRing2 = createCirclePoints(radius * 0.4, -s, 2 * Math.PI - 3 * s)

	$: horizontalPoints = [new Vector3(-$size.width, 0, 0), new Vector3($size.width, 0, 0)]
	$: verticalPoints = [new Vector3(0, -$size.height, 0), new Vector3(0, $size.height, 0)]

	function genSectionLine(radius: number, s: number) {
		return [
			new Vector3(0.225 * radius * Math.cos(s), 0.225 * radius * Math.sin(s), 0),
			new Vector3(0.9 * radius * Math.cos(s), 0.9 * radius * Math.sin(s), 0)
		]
	}

	$: sectionLines = [1, 3, 5, 7, 9, 11, 13, 15].map((i) => genSectionLine(radius, i * s))

	const blues = ['#343A91', '#6C85E8', '#D9E1F6']
</script>

<T.OrthographicCamera makeDefault position={[0, 0, 100]} zoom={1} />

<T.Mesh scale.x={$size.width} scale.y={$size.height} position.z={-1}>
	<T.PlaneGeometry />
	<T.MeshBasicMaterial color="#121113" />
</T.Mesh>

<!-- Outer Ring -->
<T.Mesh>
	<MeshLineGeometry points={outerRingPoints} />
	<MeshLineMaterial color={blues[1]} width={4} attenuate={false} />
</T.Mesh>

<!-- Inner Ring -->
<T.Mesh>
	<MeshLineGeometry points={innerRingPoints} />
	<MeshLineMaterial color={blues[1]} width={4} attenuate={false} />
</T.Mesh>

<!-- Middle Rings -->
<T.Mesh>
	<MeshLineGeometry points={middleRing1} />
	<MeshLineMaterial color={blues[1]} width={4} attenuate={false} />
</T.Mesh>

<T.Mesh>
	<MeshLineGeometry points={middleRing2} />
	<MeshLineMaterial color={blues[1]} width={4} attenuate={false} />
</T.Mesh>

<T.Mesh>
	<MeshLineGeometry points={middleRing3} />
	<MeshLineMaterial color={blues[1]} width={4} attenuate={false} />
</T.Mesh>

<!-- Cross -->
<T.Mesh>
	<MeshLineGeometry points={horizontalPoints} />
	<MeshLineMaterial color={blues[1]} width={2} attenuate={false} />
</T.Mesh>

<T.Mesh>
	<MeshLineGeometry points={verticalPoints} />
	<MeshLineMaterial color={blues[1]} width={2} attenuate={false} />
</T.Mesh>

<!-- Section Lines -->
{#each sectionLines as sectionLine}
	<T.Mesh>
		<MeshLineGeometry points={sectionLine} />
		<MeshLineMaterial color={blues[1]} width={2} attenuate={false} />
	</T.Mesh>
{/each}
