import { create_app_config } from '🍎/helpers/create-app-config.ts';

const wallpapers = create_app_config({
	title: 'Wallpapers',
	resizable: true,

	height: 600,
	width: 800,

	dock_breaks_before: true,
});

const calculator = create_app_config({
	title: 'Calculator',

	expandable: true,
	resizable: false,

	height: 250 * 1.414,
	width: 250,
});

const calendar = create_app_config({
	title: 'Calendar',
	resizable: true,
});
const photos = create_app_config({
	title: 'Photos',
	resizable: true,

	height: 600,
	width: 800,

	dock_breaks_before: false, // Set to true if you want a separator before it in the dock
});
const vscode = create_app_config({
	title: 'VSCode',
	resizable: true,

	height: 600,
	width: 800,
});

const finder = create_app_config({
	title: 'Finder',
	resizable: true,

	// dockBreaksBefore: true,
	should_open_window: false,
});

const safari = create_app_config({
	title: 'Safari',
	resizable: true,
});

const systemPreferences = create_app_config({
	title: 'System Preferences',
	resizable: true,
});

const purusTwitter = create_app_config({
	title: `About the Developer`,
	resizable: true,

	dock_breaks_before: true,

	height: 600,
	width: 800,
});

const viewSource = create_app_config({
	title: `View Source`,
	resizable: true,

	should_open_window: false,
	external_action: () => window.open('https://github.com/puruvj/macos-web', '_blank'),
});

const vercel = create_app_config({
	title: `Powered by Vercel`,
	resizable: true,

	should_open_window: false,
	external_action: () =>
		window.open('https://vercel.com/?utm_source=purus-projects&utm_campaign=oss', '_blank'),

	dock_breaks_before: true,
});

const appstore = create_app_config({
	title: 'App Store',
	resizable: true,
});

const email = create_app_config({
	title: 'Gmail',
	resizable: true,

	height: 750,
	width: 1200,

	dock_breaks_before: false,
});

export const apps_config = {
	finder,
	wallpapers,
	calculator,
	calendar,
	photos,
	vscode,
	appstore,
	email,
	// safari,

	// 'system-preferences': systemPreferences,

	'purus-twitter': purusTwitter,
	'view-source': viewSource,

	vercel,
};
