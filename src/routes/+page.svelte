<script>
	import { Canvas } from '@threlte/core'
	import Scene from './Scene.svelte'
</script>

<svelte:head>
	<title>CS231129 by James Wesc</title>
	<meta
		name="description"
		content="Code sketch for 29 Nov 2023. Recreating a futuristic UI element from Rogue One with Threlte (Svelte + Three.js)"
	/>
	<meta name="author" content="James Wesc" />
</svelte:head>

<div class="fixed w-full h-full top-0 left-0">
	<Canvas>
		<Scene />
	</Canvas>
</div>
