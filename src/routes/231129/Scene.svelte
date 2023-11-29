<script lang="ts">
	import { T, useThrelte } from '@threlte/core'
	import BaseRing from './BaseRing.svelte'
	import MiddleRings from './MiddleRings.svelte'
	import NoiseRing from './NoiseRing.svelte'
	import Post from './Post.svelte'

	const { size } = useThrelte()

	const blues = ['#343A91', '#6C85E8', '#D9E1F6']
</script>

<!-- Camera -->
<T.OrthographicCamera makeDefault position={[0, 0, 100]} zoom={1} />

<!-- Background -->
<T.Mesh scale.x={$size.width} scale.y={$size.height} position.z={-1}>
	<T.PlaneGeometry />
	<T.MeshBasicMaterial color="#121113" />
</T.Mesh>

<T.Group position.z={-0.2}>
	<BaseRing color="#343A91" />
</T.Group>

<T.Group position.z={-0.1}>
	<MiddleRings color="#6C85E8" />
</T.Group>

<NoiseRing sections={16} />
<NoiseRing sections={48} />

<Post />
