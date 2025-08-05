<script lang="ts">
	import { onMount } from 'svelte';

	// Import your wedding photos
	import wedding1 from '/src/assets/photos/wedding1.jpg';
	import wedding2 from '/src/assets/photos/wedding2.jpg';
	import wedding3 from '/src/assets/photos/wedding3.jpg';

	const albums = [
		{
			name: 'All Wedding Photos',
			photos: [wedding1, wedding2, wedding3],
		},
		{
			name: 'Our Special Day 💕',
			photos: [wedding1, wedding2],
		},
		{
			name: 'Beautiful Memories',
			photos: [wedding2, wedding3],
		},
	];

	let selectedAlbum = albums[0];
	let selectedPhoto: string | null = null;
	let viewMode: 'albums' | 'photos' | 'fullscreen' = 'albums';

	function selectAlbum(album: (typeof albums)[0]) {
		selectedAlbum = album;
		viewMode = 'photos';
	}

	function openPhoto(photo: string) {
		selectedPhoto = photo;
		viewMode = 'fullscreen';
	}

	function closeFullscreen() {
		viewMode = 'photos';
		selectedPhoto = null;
	}

	function goToAlbums() {
		viewMode = 'albums';
	}
</script>

<div class="wedding-photos-app">
	<!-- Header -->
	<div class="header">
		<div class="header-controls">
			{#if viewMode === 'photos'}
				<button class="back-btn" on:click={goToAlbums}> ← Albums </button>
			{/if}
			{#if viewMode === 'fullscreen'}
				<button class="back-btn" on:click={closeFullscreen}>
					← {selectedAlbum.name}
				</button>
			{/if}
		</div>
		<h1 class="title">
			{#if viewMode === 'albums'}
				Wedding Photos 💕
			{:else if viewMode === 'photos'}
				{selectedAlbum.name}
			{:else}
				{selectedAlbum.name}
			{/if}
		</h1>
		<div class="header-actions">
			<button class="view-toggle">Grid</button>
		</div>
	</div>

	<!-- Content -->
	<div class="content">
		{#if viewMode === 'albums'}
			<!-- Albums View -->
			<div class="albums-grid">
				{#each albums as album}
					<div class="album-card" on:click={() => selectAlbum(album)}>
						<div class="album-preview">
							{#if album.photos[0]}
								<img src={album.photos[0]} alt={album.name} />
							{/if}
						</div>
						<div class="album-info">
							<h3>{album.name}</h3>
							<p>{album.photos.length} photos</p>
						</div>
					</div>
				{/each}
			</div>
		{:else if viewMode === 'photos'}
			<!-- Photos Grid View -->
			<div class="photos-grid">
				{#each selectedAlbum.photos as photo}
					<div class="photo-item" on:click={() => openPhoto(photo)}>
						<img src={photo} alt="Wedding photo" loading="lazy" />
					</div>
				{/each}
			</div>
		{:else if viewMode === 'fullscreen' && selectedPhoto}
			<!-- Fullscreen Photo View -->
			<div class="fullscreen-view">
				<img src={selectedPhoto} alt="Wedding photo" class="fullscreen-image" />
			</div>
		{/if}
	</div>
</div>

<style>
	.wedding-photos-app {
		width: 100%;
		height: 100%;
		background: #f5f5f7;
		display: flex;
		flex-direction: column;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		overflow: hidden; /* Prevent overflow from the main container */
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12px 20px;
		background: white;
		border-bottom: 1px solid #e5e5e7;
		min-height: 52px;
	}

	.header-controls,
	.header-actions {
		width: 100px;
		display: flex;
	}

	.header-controls {
		justify-content: flex-start;
	}

	.header-actions {
		justify-content: flex-end;
	}

	.back-btn {
		background: none;
		border: none;
		color: #007aff;
		font-size: 16px;
		cursor: pointer;
		padding: 6px 12px;
		border-radius: 6px;
		transition: background-color 0.2s;
	}

	.back-btn:hover {
		background: #f0f0f0;
	}

	.title {
		font-size: 20px;
		font-weight: 600;
		margin: 0;
		text-align: center;
		color: #1d1d1f;
	}

	.view-toggle {
		background: none;
		border: 1px solid #d1d1d6;
		border-radius: 6px;
		padding: 6px 12px;
		font-size: 14px;
		cursor: pointer;
		color: #1d1d1f;
		margin-left: auto;
		display: block;
	}

	.view-toggle:hover {
		background: #f0f0f0;
	}

	.content {
		flex: 1;
		overflow-y: auto;
		padding: 20px;
	}

	.albums-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 20px;
	}

	.album-card {
		background: white;
		border-radius: 12px;
		overflow: hidden;
		cursor: pointer;
		transition:
			transform 0.2s,
			box-shadow 0.2s;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	}

	.album-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
	}

	.album-preview {
		aspect-ratio: 1;
		overflow: hidden;
	}

	.album-preview img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.album-info {
		padding: 16px;
	}

	.album-info h3 {
		margin: 0 0 4px 0;
		font-size: 16px;
		font-weight: 600;
		color: #1d1d1f;
	}

	.album-info p {
		margin: 0;
		font-size: 14px;
		color: #86868b;
	}

	.photos-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
		gap: 4px;
	}

	.photo-item {
		aspect-ratio: 1;
		overflow: hidden;
		border-radius: 8px;
		cursor: pointer;
		transition: transform 0.2s;
	}

	.photo-item:hover {
		transform: scale(1.02);
	}

	.photo-item img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.fullscreen-view {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		background: #000;
	}

	.fullscreen-image {
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
	}
</style>
