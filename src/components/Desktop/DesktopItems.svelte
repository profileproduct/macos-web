<script lang="ts">
	import { apps } from '🍎/state/apps.svelte';

	// Desktop folders configuration
	const desktopFolders = [
		{
			id: 'wedding-memories',
			name: 'Wedding Memories',
			icon: '💕',
			position: { x: 50, y: 50 },
			contents: [
				{ name: 'ceremony-photos', type: 'folder', icon: '📸' },
				{ name: 'reception-photos', type: 'folder', icon: '🎉' },
				{ name: 'honeymoon-pics', type: 'folder', icon: '🌴' },
				{ name: 'love-letter.txt', type: 'text', icon: '💌' },
			],
		},
		{
			id: 'love-letters',
			name: 'Love Letters',
			icon: '💌',
			position: { x: 50, y: 180 },
			contents: [
				{ name: 'first-date.txt', type: 'text', icon: '📝' },
				{ name: 'anniversary-note.txt', type: 'text', icon: '💝' },
				{ name: 'future-plans.txt', type: 'text', icon: '✨' },
			],
		},
		{
			id: 'our-playlist',
			name: 'Our Playlist',
			icon: '🎵',
			position: { x: 50, y: 310 },
			contents: [
				{ name: 'wedding-song.mp3', type: 'audio', icon: '🎶' },
				{ name: 'first-dance.mp3', type: 'audio', icon: '💃' },
				{ name: 'our-favorites.m3u', type: 'playlist', icon: '🎼' },
			],
		},
	];

	let selectedFolder = $state(null);
	let folderWindowOpen = $state(false);

	function openFolder(folder) {
		selectedFolder = folder;
		folderWindowOpen = true;
	}

	function closeFolderWindow() {
		folderWindowOpen = false;
		selectedFolder = null;
	}

	function openItem(item) {
		if (item.type === 'folder') {
			// Could open nested folders
			console.log('Opening nested folder:', item.name);
		} else {
			console.log('Opening file:', item.name);
		}
	}
</script>

<!-- Desktop Folder Icons -->
{#each desktopFolders as folder}
	<div
		class="desktop-folder"
		style:left="{folder.position.x}px"
		style:top="{folder.position.y}px"
		ondblclick={() => openFolder(folder)}
	>
		<div class="folder-icon">
			{folder.icon}
		</div>
		<div class="folder-name">
			{folder.name}
		</div>
	</div>
{/each}

<!-- Folder Window -->
{#if folderWindowOpen && selectedFolder}
	<div class="folder-window">
		<div class="folder-window-header">
			<div class="window-controls">
				<button class="close-btn" onclick={closeFolderWindow}>×</button>
				<button class="minimize-btn">−</button>
				<button class="maximize-btn">+</button>
			</div>
			<div class="window-title">
				{selectedFolder.icon}
				{selectedFolder.name}
			</div>
		</div>

		<div class="folder-content">
			<div class="folder-items">
				{#each selectedFolder.contents as item}
					<div class="folder-item" ondblclick={() => openItem(item)}>
						<div class="item-icon">
							{item.icon}
						</div>
						<div class="item-name">
							{item.name}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
{/if}

<style>
	.desktop-folder {
		position: absolute;
		width: 80px;
		height: 100px;
		display: flex;
		flex-direction: column;
		align-items: center;
		cursor: pointer;
		user-select: none;
		z-index: 10;
	}

	.desktop-folder:hover {
		transform: scale(1.05);
		transition: transform 0.2s ease;
	}

	.folder-icon {
		font-size: 48px;
		margin-bottom: 8px;
		filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
	}

	.folder-name {
		font-size: 12px;
		color: white;
		text-align: center;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
		font-weight: 500;
		line-height: 1.2;
		max-width: 80px;
		word-wrap: break-word;
	}

	.folder-window {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 500px;
		height: 400px;
		background: rgba(245, 245, 247, 0.95);
		backdrop-filter: blur(20px);
		border-radius: 12px;
		box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
		z-index: 1000;
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	.folder-window-header {
		display: flex;
		align-items: center;
		padding: 12px 16px;
		background: rgba(255, 255, 255, 0.1);
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	}

	.window-controls {
		display: flex;
		gap: 8px;
	}

	.close-btn,
	.minimize-btn,
	.maximize-btn {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		border: none;
		font-size: 8px;
		font-weight: bold;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.close-btn {
		background: #ff5f57;
		color: white;
	}

	.minimize-btn {
		background: #ffbd2e;
		color: white;
	}

	.maximize-btn {
		background: #28ca42;
		color: white;
	}

	.window-title {
		flex: 1;
		text-align: center;
		font-weight: 600;
		font-size: 14px;
		color: #1d1d1f;
	}

	.folder-content {
		padding: 20px;
		height: calc(100% - 60px);
		overflow-y: auto;
	}

	.folder-items {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
		gap: 20px;
	}

	.folder-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		cursor: pointer;
		padding: 10px;
		border-radius: 8px;
		transition: background-color 0.2s ease;
	}

	.folder-item:hover {
		background: rgba(0, 122, 255, 0.1);
	}

	.item-icon {
		font-size: 32px;
		margin-bottom: 8px;
	}

	.item-name {
		font-size: 11px;
		text-align: center;
		color: #1d1d1f;
		line-height: 1.2;
		max-width: 70px;
		word-wrap: break-word;
	}
</style>
