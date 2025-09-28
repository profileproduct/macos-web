<script lang="ts">
	// Svelte imports - removed onMount as it's not used
	
	// Icon imports using the existing icon system
	import Archive from '~icons/ic/outline-archive';
	import ArrowLeft from '~icons/ic/outline-arrow-back';
	import Bell from '~icons/ic/outline-notifications';
	import Check from '~icons/ic/outline-check';
	import ChevronDown from '~icons/ic/outline-keyboard-arrow-down';
	import Command from '~icons/ic/outline-terminal';
	// Removed unused File and FileText imports for better performance
	import Forward from '~icons/ic/outline-forward';
	import Inbox from '~icons/ic/outline-inbox';
	import ListFilter from '~icons/ic/outline-filter-list';
	import MailOpen from '~icons/ic/outline-mark-email-read';
	import MailQuestion from '~icons/ic/outline-help';
	import MailX from '~icons/ic/outline-mark-email-unread';
	import Paperclip from '~icons/ic/outline-attach-file';
	import PenLine from '~icons/ic/outline-edit';
	import Plus from '~icons/ic/outline-add';
	import Reply from '~icons/ic/outline-reply';
	import Search from '~icons/ic/outline-search';
	import Send from '~icons/ic/outline-send';
	import Settings from '~icons/ic/outline-settings';
	import ShoppingCart from '~icons/ic/outline-shopping-cart';
	import Star from '~icons/ic/outline-star';
	import Tag from '~icons/ic/outline-local-offer';
	import Trash2 from '~icons/ic/outline-delete';
	import Users from '~icons/ic/outline-people';
	import HelpCircle from '~icons/ic/outline-help-outline';
	import Grid from '~icons/ic/outline-apps';
	import ChevronLeft from '~icons/ic/outline-chevron-left';
	import ChevronRight from '~icons/ic/outline-chevron-right';
	import MoreVertical from '~icons/ic/outline-more-vert';
	import Clock from '~icons/ic/outline-schedule';
	import FolderPlus from '~icons/ic/outline-create-new-folder';
	import Menu from '~icons/ic/outline-menu';

	// Types
	type Folder = {
		id: string;
		name: string;
		icon: any;
		count?: number;
	};

	type EmailLabel = {
		id: string;
		name: string;
		color: string;
	};

	type EmailAttachment = {
		id: string;
		name: string;
		size: string;
		type: string;
		url: string;
	};

	type Email = {
		id: string;
		from: {
			name: string;
			email: string;
			avatar?: string;
		};
		to: {
			name: string;
			email: string;
			avatar?: string;
		};
		subject: string;
		message: string;
		time: string;
		labels: string[];
		read: boolean;
		starred: boolean;
		important: boolean;
		attachments?: EmailAttachment[];
		thread?: Email[];
	};

	type User = {
		name: string;
		email: string;
		avatar?: string;
	};

	// Mock data
	const currentUser: User = {
		name: "Alex Morgan",
		email: "alex@example.com",
		avatar: "/placeholder.svg?height=40&width=40",
	};

	const folders: Folder[] = [
		{ id: "inbox", name: "Inbox", icon: Inbox, count: 128 },
		{ id: "drafts", name: "Drafts", icon: File, count: 9 },
		{ id: "sent", name: "Sent", icon: Send },
		{ id: "starred", name: "Starred", icon: Star, count: 24 },
		{ id: "important", name: "Important", icon: MailQuestion, count: 56 },
		{ id: "trash", name: "Trash", icon: Trash2 },
		{ id: "archive", name: "Archive", icon: Archive },
	];

	const categories: Folder[] = [
		{ id: "social", name: "Social", icon: Users, count: 972 },
		{ id: "updates", name: "Updates", icon: Bell, count: 342 },
		{ id: "forums", name: "Forums", icon: Command, count: 128 },
		{ id: "promotions", name: "Promotions", icon: Tag, count: 221 },
		{ id: "shopping", name: "Shopping", icon: ShoppingCart, count: 8 },
	];

	const labels: EmailLabel[] = [
		{ id: "work", name: "Work", color: "bg-blue-500" },
		{ id: "personal", name: "Personal", color: "bg-green-500" },
		{ id: "important", name: "Important", color: "bg-red-500" },
		{ id: "travel", name: "Travel", color: "bg-amber-500" },
		{ id: "meeting", name: "Meeting", color: "bg-purple-500" },
		{ id: "finance", name: "Finance", color: "bg-emerald-500" },
		{ id: "project", name: "Project", color: "bg-indigo-500" },
	];

	// State variables
	let selectedFolder = $state("inbox");
	let selectedEmail = $state<Email | null>(null);
	let selectedEmails = $state<string[]>([]);
	let searchQuery = $state("");
	let isComposeOpen = $state(false);
	let composeData = $state({
		to: "",
		subject: "",
		message: "",
	});
	let isCollapsed = $state(false);

	// Utility functions
	function getInitials(name: string) {
		return name
			.split(" ")
			.map((part) => part[0])
			.join("")
			.toUpperCase()
			.substring(0, 2);
	}

	// Removed unused utility functions for better performance

	// Sample emails data
	const emails: Email[] = [
		{
			id: "1",
			from: {
				name: "Sophia White",
				email: "sophiawhite@example.com",
				avatar: "/placeholder.svg?height=40&width=40",
			},
			to: {
				name: "Alex Morgan",
				email: "alex@example.com",
				avatar: "/placeholder.svg?height=40&width=40",
			},
			subject: "Team Dinner Next Week",
			message: `Hi Alex, Let's have a team dinner next week to celebrate our success. I've made reservations at Bistro Garden for Thursday at 7:00 PM. Please confirm your availability. Best regards, Sophia`,
			time: "Today, 10:32 AM",
			labels: ["work", "meeting"],
			read: false,
			starred: true,
			important: true,
		},
		{
			id: "2",
			from: {
				name: "Daniel Johnson",
				email: "daniel@example.com",
				avatar: "/placeholder.svg?height=40&width=40",
			},
			to: {
				name: "Alex Morgan",
				email: "alex@example.com",
				avatar: "/placeholder.svg?height=40&width=40",
			},
			subject: "Feedback Request on Q4 Financial Report",
			message: `Hello Alex, I'd like your feedback on the latest Q4 financial report. The report shows a 15% increase in revenue compared to Q3. Could you please provide your thoughts by Friday? Thanks, Daniel`,
			time: "Yesterday, 4:15 PM",
			labels: ["work", "finance"],
			read: true,
			starred: false,
			important: true,
		},
		{
			id: "3",
			from: {
				name: "Ava Taylor",
				email: "ava@example.com",
				avatar: "/placeholder.svg?height=40&width=40",
			},
			to: {
				name: "Alex Morgan",
				email: "alex@example.com",
				avatar: "/placeholder.svg?height=40&width=40",
			},
			subject: "Project Timeline Update",
			message: `Hi Alex, Here's the updated timeline for our project. Development completes end of month, followed by two weeks of testing. Soft launch by the 15th of next month. Please review and let me know if you have concerns. Best, Ava`,
			time: "May 10, 2:30 PM",
			labels: ["project", "work"],
			read: true,
			starred: true,
			important: false,
		},
	];

	// Computed values
	// Optimized filtering with early returns and performance improvements
	const filteredEmails = $derived(() => {
		// Cache search query to avoid repeated toLowerCase calls
		const query = searchQuery.toLowerCase();

		return emails.filter((email) => {
			// Optimize search by checking most likely matches first
			let matchesSearch = true;
			if (searchQuery !== "") {
				matchesSearch =
					email.subject.toLowerCase().includes(query) ||
					email.from.name.toLowerCase().includes(query) ||
					email.message.toLowerCase().includes(query);
			}

			// Early return if search doesn't match
			if (!matchesSearch) return false;

			// Optimize folder filtering
			switch (selectedFolder) {
				case "inbox": return true;
				case "starred": return email.starred;
				case "important": return email.important;
				case "sent": return false; // For demo purposes
				case "drafts": return false; // For demo purposes
				case "trash": return false; // For demo purposes
				case "archive": return false; // For demo purposes
				case "social": return email.labels.includes("personal");
				case "updates": return email.labels.includes("work");
				case "forums": return email.labels.includes("project");
				case "promotions": return email.labels.includes("finance");
				case "shopping": return email.labels.includes("travel");
				default: return true;
			}
		});
	});

	// Performance optimization: limit visible emails for faster rendering
	const visibleEmails = $derived(() => filteredEmails().slice(0, 50));

	// Event handlers
	function handleSelectAllEmails() {
		const filtered = filteredEmails();
		if (selectedEmails.length === filtered.length) {
			selectedEmails = [];
		} else {
			selectedEmails = filtered.map((email) => email.id);
		}
	}

	function handleSelectEmail(emailId: string) {
		if (selectedEmails.includes(emailId)) {
			selectedEmails = selectedEmails.filter((id) => id !== emailId);
		} else {
			selectedEmails = [...selectedEmails, emailId];
		}
	}

	function handleStarEmail(emailId: string, event: Event) {
		event.stopPropagation();
		console.log("Star email:", emailId);
	}

	function handleDeleteEmails() {
		console.log("Delete emails:", selectedEmails);
		selectedEmails = [];
	}

	function handleArchiveEmails() {
		console.log("Archive emails:", selectedEmails);
		selectedEmails = [];
	}

	function handleMarkAsRead() {
		console.log("Mark as read:", selectedEmails);
		selectedEmails = [];
	}

	function handleMarkAsUnread() {
		console.log("Mark as unread:", selectedEmails);
		selectedEmails = [];
	}

	function handleReply(email: Email) {
		composeData = {
			to: email.from.email,
			subject: `Re: ${email.subject}`,
			message: `\n\n-------- Original Message --------\nFrom: ${email.from.name} <${email.from.email}>\nDate: ${email.time}\nSubject: ${email.subject}\n\n${email.message}`,
		};
		isComposeOpen = true;
	}

	function handleForward(email: Email) {
		composeData = {
			to: "",
			subject: `Fwd: ${email.subject}`,
			message: `\n\n-------- Forwarded Message --------\nFrom: ${email.from.name} <${email.from.email}>\nDate: ${email.time}\nSubject: ${email.subject}\n\n${email.message}`,
		};
		isComposeOpen = true;
	}

	function handleCompose() {
		composeData = {
			to: "",
			subject: "",
			message: "",
		};
		isComposeOpen = true;
	}

	function handleSendEmail() {
		console.log("Send email:", composeData);
		isComposeOpen = false;
	}
</script>

<div class="email-app">
	<!-- Header - Gmail style -->
	<header class="header">
		<div class="header-left">
			<button class="menu-btn">
				<Menu />
			</button>
			<div class="logo">
				<img src="/app-icons/mail/32.png" alt="Gmail" class="gmail-logo" loading="eager" decoding="sync" />
				<span class="gmail-text">Gmail</span>
			</div>
		</div>

		<!-- Gmail search bar -->
		<div class="search-container">
			<div class="search-bar">
				<Search />
				<input
					type="text"
					placeholder="Search mail"
					bind:value={searchQuery}
					class="search-input"
				/>
				<button class="filter-btn">
					<ListFilter />
				</button>
			</div>
		</div>

		<div class="header-right">
			<button class="icon-btn" title="Support">
				<HelpCircle />
			</button>
			<button class="icon-btn" title="Settings">
				<Settings />
			</button>
			<button class="icon-btn" title="Google apps">
				<Grid />
			</button>
			<div class="user-avatar">
				<div class="avatar">
					{getInitials(currentUser.name)}
				</div>
			</div>
		</div>
	</header>

	<div class="main-content">
		<!-- Gmail-style sidebar -->
		<div class="sidebar" class:collapsed={isCollapsed}>
			<!-- Gmail's compose button -->
			<div class="compose-section">
				<button class="compose-btn" on:click={handleCompose}>
					<PenLine />
					{#if !isCollapsed}
						<span>Compose</span>
					{/if}
				</button>
			</div>

			<div class="sidebar-content">
				<div class="folders-section">
					{#each folders as folder}
						<button
							class="sidebar-item"
							class:active={selectedFolder === folder.id}
							on:click={() => selectedFolder = folder.id}
						>
							<svelte:component this={folder.icon} />
							{#if !isCollapsed}
								<span class="sidebar-text">{folder.name}</span>
								{#if folder.count !== undefined}
									<span class="count">{folder.count}</span>
								{/if}
							{/if}
						</button>
					{/each}
				</div>

				<div class="separator"></div>

				<div class="categories-section">
					{#if !isCollapsed}
						<h3 class="section-title">Categories</h3>
					{/if}
					{#each categories as category}
						<button
							class="sidebar-item"
							class:active={selectedFolder === category.id}
							on:click={() => selectedFolder = category.id}
						>
							<svelte:component this={category.icon} />
							{#if !isCollapsed}
								<span class="sidebar-text">{category.name}</span>
								{#if category.count !== undefined}
									<span class="count">{category.count}</span>
								{/if}
							{/if}
						</button>
					{/each}
				</div>

				<div class="separator"></div>

				<div class="labels-section">
					<div class="labels-header">
						{#if !isCollapsed}
							<h3 class="section-title">Labels</h3>
							<button class="icon-btn">
								<Plus />
							</button>
						{/if}
					</div>
					{#each labels as label}
						<button class="sidebar-item">
							<div class="label-color {label.color}"></div>
							{#if !isCollapsed}
								<span class="sidebar-text">{label.name}</span>
							{/if}
						</button>
					{/each}
				</div>
			</div>

			<div class="sidebar-footer">
				<button class="icon-btn" on:click={() => isCollapsed = !isCollapsed}>
					{#if isCollapsed}
						<ChevronRight />
					{:else}
						<ChevronLeft />
					{/if}
				</button>
			</div>
		</div>

		<!-- Main email content -->
		<div class="email-content">
			<!-- Email list toolbar -->
			<div class="toolbar">
				<div class="toolbar-left">
					<input
						type="checkbox"
						checked={selectedEmails.length > 0 && selectedEmails.length === filteredEmails().length}
						on:change={handleSelectAllEmails}
						class="select-all-checkbox"
						aria-label="Select all"
					/>
					<button class="icon-btn" title="Refresh">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
							<path d="M21 3v5h-5" />
							<path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
							<path d="M3 21v-5h5" />
						</svg>
					</button>
					<button class="icon-btn">
						<MoreVertical />
					</button>
				</div>

				{#if selectedEmails.length > 0}
					<div class="toolbar-actions">
						<button class="icon-btn" on:click={handleArchiveEmails} title="Archive">
							<Archive />
						</button>
						<button class="icon-btn" on:click={handleDeleteEmails} title="Delete">
							<Trash2 />
						</button>
						<button class="icon-btn" on:click={handleMarkAsRead} title="Mark as read">
							<MailOpen />
						</button>
						<button class="icon-btn" on:click={handleMarkAsUnread} title="Mark as unread">
							<MailX />
						</button>
						<button class="icon-btn" title="Snooze">
							<Clock />
						</button>
						<button class="icon-btn" title="Add to Tasks">
							<FolderPlus />
						</button>
						<button class="icon-btn" title="Labels">
							<Tag />
						</button>
					</div>
				{:else}
					<div class="toolbar-tabs">
						<div class="tabs">
							<button class="tab active">Primary</button>
							<button class="tab">Social</button>
							<button class="tab">Promotions</button>
							<button class="tab">Updates</button>
						</div>
					</div>
				{/if}
			</div>

			<!-- Email list -->
			<div class="email-list">
				{#if visibleEmails().length > 0}
					{#each visibleEmails() as email}
						<div
							class="email-item"
							class:unread={!email.read}
							class:selected={selectedEmail?.id === email.id}
							class:checked={selectedEmails.includes(email.id)}
							on:click={() => selectedEmail = email}
							role="button"
							tabindex="0"
						>
							<div class="email-controls">
								<input
									type="checkbox"
									checked={selectedEmails.includes(email.id)}
									on:change={() => handleSelectEmail(email.id)}
									on:click={(e) => e.stopPropagation()}
									class="email-checkbox"
								/>
								<button
									class="star-btn"
									class:starred={email.starred}
									on:click={(e) => handleStarEmail(email.id, e)}
								>
									<Star />
								</button>
								<button
									class="important-btn"
									class:important={email.important}
									on:click={(e) => e.stopPropagation()}
								>
									<MailQuestion />
								</button>
							</div>

							<div class="email-content-preview">
								<div class="sender-name">{email.from.name}</div>
								<div class="email-preview">
									<span class="subject" class:bold={!email.read}>{email.subject}</span>
									<span class="message-preview">- {email.message.split('\n')[0]}</span>
								</div>
								<div class="email-meta">
									{#if email.labels.length > 0}
										<div class="labels">
											{#each email.labels.slice(0, 2) as labelId}
												{@const label = labels.find(l => l.id === labelId)}
												{#if label}
													<div class="label-dot {label.color}"></div>
												{/if}
											{/each}
										</div>
									{/if}
									{#if email.attachments && email.attachments.length > 0}
										<Paperclip class="attachment-icon" />
									{/if}
									<span class="time">{email.time}</span>
								</div>
							</div>
						</div>
					{/each}
				{:else}
					<div class="empty-state">
						<div class="empty-icon">
							<Inbox />
						</div>
						<h3>No emails found</h3>
						<p>
							{searchQuery
								? "Try a different search term"
								: "Your inbox is empty"}
						</p>
					</div>
				{/if}
			</div>
		</div>
	</div>

	<!-- Email detail view -->
	{#if selectedEmail}
		<div class="email-detail-overlay">
			<div class="email-detail">
				<div class="detail-header">
					<button class="icon-btn" on:click={() => selectedEmail = null}>
						<ArrowLeft />
					</button>
					<button class="icon-btn" on:click={handleArchiveEmails}>
						<Archive />
					</button>
					<button class="icon-btn" on:click={handleDeleteEmails}>
						<Trash2 />
					</button>
					<button class="icon-btn" on:click={handleMarkAsUnread}>
						<MailX />
					</button>
				</div>

				<div class="detail-content">
					<div class="email-header">
						<h2 class="email-subject">{selectedEmail.subject}</h2>
						<div class="email-from">
							<div class="sender-info">
								<div class="sender-avatar">
									{getInitials(selectedEmail.from.name)}
								</div>
								<div class="sender-details">
									<div class="sender-name">{selectedEmail.from.name}</div>
									<div class="sender-email">&lt;{selectedEmail.from.email}&gt;</div>
								</div>
							</div>
							<div class="email-time">{selectedEmail.time}</div>
						</div>
					</div>

					<div class="email-body">
						{#each selectedEmail.message.split('\n') as paragraph}
							{#if paragraph.trim()}
								<p>{paragraph}</p>
							{/if}
						{/each}
					</div>

					<div class="email-actions">
						<button class="action-btn" on:click={() => handleReply(selectedEmail)}>
							<Reply />
							Reply
						</button>
						<button class="action-btn" on:click={() => handleForward(selectedEmail)}>
							<Forward />
							Forward
						</button>
					</div>
				</div>
			</div>
		</div>
	{/if}

	<!-- Compose modal -->
	{#if isComposeOpen}
		<div class="compose-overlay">
			<div class="compose-modal">
				<div class="compose-header">
					<h3>New Message</h3>
					<button class="icon-btn" on:click={() => isComposeOpen = false}>
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<line x1="18" y1="6" x2="6" y2="18"></line>
							<line x1="6" y1="6" x2="18" y2="18"></line>
						</svg>
					</button>
				</div>

				<div class="compose-form">
					<div class="form-field">
						<label>To:</label>
						<input type="email" bind:value={composeData.to} placeholder="Recipients" />
					</div>
					<div class="form-field">
						<label>Subject:</label>
						<input type="text" bind:value={composeData.subject} placeholder="Subject" />
					</div>
					<div class="form-field">
						<textarea bind:value={composeData.message} placeholder="Compose email" rows="10"></textarea>
					</div>
				</div>

				<div class="compose-footer">
					<button class="send-btn" on:click={handleSendEmail}>
						<Send />
						Send
					</button>
					<button class="cancel-btn" on:click={() => isComposeOpen = false}>
						Cancel
					</button>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	.email-app {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
		background: white;
		font-family: var(--system-font-family);
		overflow: hidden;
		/* Performance optimizations */
		contain: layout style paint;
		will-change: transform;
	}

	/* Header Styles */
	.header {
		display: flex;
		align-items: center;
		gap: 1rem;
		height: 64px;
		border-bottom: 1px solid #e5e7eb;
		background: #f8f9fa;
		padding: 0 1.5rem;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
	}

	.header-left {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.menu-btn {
		display: none;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		border: none;
		background: transparent;
		color: #6b7280;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.menu-btn:hover {
		background: #f3f4f6;
	}

	.logo {
		display: flex;
		align-items: center;
	}

	.gmail-logo {
		height: 24px;
		width: 24px;
		object-fit: contain;
	}

	.gmail-text {
		margin-left: 0.5rem;
		font-size: 1.25rem;
		font-weight: 400;
		color: #6b7280;
	}

	.search-container {
		flex: 1;
		max-width: 32rem;
		margin: 0 1rem;
	}

	.search-bar {
		display: flex;
		align-items: center;
		height: 48px;
		background: #f3f4f6;
		border-radius: 0.5rem;
		padding: 0 1rem;
		transition: all 0.2s;
	}

	.search-bar:hover,
	.search-bar:focus-within {
		background: white;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
	}

	.search-input {
		flex: 1;
		border: none;
		background: transparent;
		outline: none;
		margin: 0 0.5rem;
		font-size: 1rem;
	}

	.filter-btn {
		width: 32px;
		height: 32px;
		border: none;
		background: transparent;
		color: #6b7280;
		cursor: pointer;
		border-radius: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.header-right {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.icon-btn {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		border: none;
		background: transparent;
		color: #6b7280;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: background-color 0.2s;
	}

	.icon-btn:hover {
		background: #f3f4f6;
	}

	.user-avatar {
		margin-left: 0.5rem;
	}

	.avatar {
		width: 36px;
		height: 36px;
		border-radius: 50%;
		background: #3b82f6;
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.875rem;
		font-weight: 500;
	}

	/* Main Content */
	.main-content {
		display: flex;
		flex: 1;
		overflow: hidden;
	}

	/* Sidebar Styles */
	.sidebar {
		width: 280px;
		background: #f8f9fa;
		border-right: 1px solid #dadce0;
		display: flex;
		flex-direction: column;
		transition: width 0.3s ease;
	}

	.sidebar.collapsed {
		width: 80px;
	}

	.compose-section {
		padding: 1.5rem 1rem 1rem;
	}

	.compose-btn {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		gap: 0.75rem;
		width: 100%;
		height: 56px;
		background: #c2e7ff;
		border: none;
		border-radius: 1.5rem;
		padding: 0 1.5rem;
		color: #1f2937;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s;
		box-shadow: 0 1px 2px rgba(60, 64, 67, 0.3), 0 1px 3px 1px rgba(60, 64, 67, 0.15);
	}

	.compose-btn:hover {
		background: #b4deff;
		box-shadow: 0 1px 3px rgba(60, 64, 67, 0.3), 0 4px 8px 3px rgba(60, 64, 67, 0.15);
	}

	.sidebar-content {
		flex: 1;
		overflow-y: auto;
		padding: 0 0.5rem;
	}

	.folders-section,
	.categories-section,
	.labels-section {
		margin-bottom: 0.75rem;
	}

	.section-title {
		font-size: 0.875rem;
		font-weight: 500;
		color: #5f6368;
		margin: 1rem 1.5rem 0.5rem;
	}

	.sidebar-item {
		display: flex;
		align-items: center;
		width: 100%;
		padding: 0.75rem 1.5rem;
		border: none;
		background: transparent;
		color: #3c4043;
		cursor: pointer;
		border-radius: 0 1.5rem 1.5rem 0;
		font-weight: 400;
		transition: all 0.2s;
		font-size: 0.875rem;
		min-height: 40px;
	}

	.sidebar-item:hover {
		background: #f1f3f4;
	}

	.sidebar-item.active {
		background: #fce8e6;
		color: #d93025;
		font-weight: 500;
	}

	.sidebar-text {
		margin-left: 1rem;
		flex: 1;
	}

	.count {
		font-size: 0.875rem;
		color: #6b7280;
	}

	.sidebar-item.active .count {
		color: #041e49;
	}

	.separator {
		height: 1px;
		background: #e5e7eb;
		margin: 0.75rem 0;
	}

	.labels-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 1.5rem;
	}

	.label-color {
		width: 12px;
		height: 12px;
		border-radius: 50%;
	}

	.sidebar-footer {
		padding: 0.5rem;
	}

	/* Email Content Styles */
	.email-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		background: white;
	}

	.toolbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.75rem 1.5rem;
		border-bottom: 1px solid #dadce0;
		background: white;
		min-height: 48px;
	}

	.toolbar-left {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.select-all-checkbox,
	.email-checkbox {
		width: 16px;
		height: 16px;
		border: 1px solid #d1d5db;
		border-radius: 2px;
	}

	.toolbar-actions {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-left: 1rem;
	}

	.toolbar-tabs {
		margin-left: auto;
	}

	.tabs {
		display: flex;
		gap: 0.5rem;
	}

	.tab {
		padding: 0.5rem 0.75rem;
		border: none;
		background: transparent;
		color: #6b7280;
		cursor: pointer;
		border-bottom: 2px solid transparent;
		font-size: 0.875rem;
	}

	.tab.active {
		color: #3b82f6;
		border-bottom-color: #3b82f6;
	}

	/* Email List */
	.email-list {
		flex: 1;
		overflow-y: auto;
		background: white;
		/* Performance optimizations */
		contain: layout style paint;
		transform: translateZ(0); /* Force hardware acceleration */
	}

	.email-item {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 0.75rem 1.5rem;
		border-bottom: 1px solid #f0f0f0;
		cursor: pointer;
		transition: box-shadow 0.2s ease; /* Optimize transition */
		min-height: 60px;
		/* Performance optimizations */
		contain: layout style;
		will-change: box-shadow;
	}

	.email-item:hover {
		box-shadow: inset 1px 0 0 #dadce0, inset -1px 0 0 #dadce0, 0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 1px 3px 1px rgba(60, 64, 67, 0.15);
		z-index: 1;
	}

	.email-item.unread {
		background: white;
		font-weight: 600;
	}

	.email-item.selected,
	.email-item.checked {
		background: #fce8e6;
		border-color: #d93025;
	}

	.email-controls {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.star-btn,
	.important-btn {
		width: 24px;
		height: 24px;
		border: none;
		background: transparent;
		color: #6b7280;
		cursor: pointer;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.star-btn.starred,
	.important-btn.important {
		color: #f59e0b;
	}

	.email-content-preview {
		flex: 1;
		display: flex;
		align-items: center;
		gap: 1rem;
		overflow: hidden;
		padding: 0.25rem 0;
	}

	.sender-name {
		width: 200px;
		flex-shrink: 0;
		font-weight: 400;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: #3c4043;
		font-size: 0.875rem;
	}

	.email-item.unread .sender-name {
		font-weight: 600;
	}

	.email-preview {
		flex: 1;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		overflow: hidden;
	}

	.subject {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: #3c4043;
		font-size: 0.875rem;
	}

	.subject.bold {
		font-weight: 600;
	}

	.message-preview {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: #5f6368;
		font-size: 0.875rem;
		margin-left: 0.25rem;
	}

	.email-meta {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-left: auto;
	}

	.labels {
		display: flex;
		gap: 0.25rem;
	}

	.label-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
	}

	.attachment-icon {
		width: 16px;
		height: 16px;
		color: #6b7280;
	}

	.time {
		font-size: 0.75rem;
		color: #6b7280;
		white-space: nowrap;
	}

	/* Empty State */
	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 3rem;
		text-align: center;
	}

	.empty-icon {
		width: 48px;
		height: 48px;
		background: #f3f4f6;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #9ca3af;
		margin-bottom: 1rem;
	}

	.empty-state h3 {
		font-size: 1.125rem;
		font-weight: 500;
		margin-bottom: 0.5rem;
	}

	.empty-state p {
		color: #6b7280;
		font-size: 0.875rem;
	}

	/* Email Detail Overlay */
	.email-detail-overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: white;
		z-index: 10;
		display: flex;
		flex-direction: column;
	}

	.email-detail {
		flex: 1;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.detail-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		border-bottom: 1px solid #e5e7eb;
	}

	.detail-content {
		flex: 1;
		overflow-y: auto;
		padding: 1.5rem;
	}

	.email-header {
		margin-bottom: 2rem;
	}

	.email-subject {
		font-size: 1.5rem;
		font-weight: 400;
		margin-bottom: 1rem;
		color: #1f2937;
	}

	.email-from {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.sender-info {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.sender-avatar {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: #3b82f6;
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.875rem;
		font-weight: 500;
	}

	.sender-details {
		display: flex;
		flex-direction: column;
	}

	.sender-name {
		font-weight: 500;
		color: #1f2937;
	}

	.sender-email {
		font-size: 0.875rem;
		color: #6b7280;
	}

	.email-time {
		font-size: 0.875rem;
		color: #6b7280;
	}

	.email-body {
		line-height: 1.6;
		color: #374151;
		margin-bottom: 2rem;
	}

	.email-body p {
		margin-bottom: 1rem;
	}

	.email-actions {
		display: flex;
		gap: 0.75rem;
	}

	.action-btn {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		border: 1px solid #d1d5db;
		background: white;
		color: #374151;
		border-radius: 0.375rem;
		cursor: pointer;
		font-size: 0.875rem;
		transition: all 0.2s;
	}

	.action-btn:hover {
		background: #f9fafb;
		border-color: #9ca3af;
	}

	/* Compose Modal */
	.compose-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 50;
	}

	.compose-modal {
		background: white;
		border-radius: 0.5rem;
		box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
		width: 90%;
		max-width: 600px;
		max-height: 80vh;
		display: flex;
		flex-direction: column;
	}

	.compose-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 1.5rem;
		border-bottom: 1px solid #e5e7eb;
	}

	.compose-header h3 {
		font-size: 1.125rem;
		font-weight: 500;
		color: #1f2937;
	}

	.compose-form {
		flex: 1;
		padding: 1.5rem;
		overflow-y: auto;
	}

	.form-field {
		margin-bottom: 1rem;
	}

	.form-field label {
		display: block;
		font-size: 0.875rem;
		font-weight: 500;
		color: #374151;
		margin-bottom: 0.25rem;
	}

	.form-field input,
	.form-field textarea {
		width: 100%;
		padding: 0.5rem 0.75rem;
		border: 1px solid #d1d5db;
		border-radius: 0.375rem;
		font-size: 0.875rem;
		outline: none;
		transition: border-color 0.2s;
	}

	.form-field input:focus,
	.form-field textarea:focus {
		border-color: #3b82f6;
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
	}

	.form-field textarea {
		resize: vertical;
		min-height: 200px;
		font-family: inherit;
	}

	.compose-footer {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 1rem 1.5rem;
		border-top: 1px solid #e5e7eb;
	}

	.send-btn {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		background: #3b82f6;
		color: white;
		border: none;
		border-radius: 0.375rem;
		cursor: pointer;
		font-size: 0.875rem;
		font-weight: 500;
		transition: background-color 0.2s;
	}

	.send-btn:hover {
		background: #2563eb;
	}

	.cancel-btn {
		padding: 0.5rem 1rem;
		background: transparent;
		color: #6b7280;
		border: none;
		border-radius: 0.375rem;
		cursor: pointer;
		font-size: 0.875rem;
		transition: all 0.2s;
	}

	.cancel-btn:hover {
		background: #f3f4f6;
		color: #374151;
	}

	/* Color classes for labels */
	.bg-blue-500 { background-color: #3b82f6; }
	.bg-green-500 { background-color: #10b981; }
	.bg-red-500 { background-color: #ef4444; }
	.bg-amber-500 { background-color: #f59e0b; }
	.bg-purple-500 { background-color: #8b5cf6; }
	.bg-emerald-500 { background-color: #10b981; }
	.bg-indigo-500 { background-color: #6366f1; }

	/* Responsive adjustments */
	@media (max-width: 1024px) {
		.sidebar {
			width: 240px;
		}

		.sender-name {
			width: 160px;
		}
	}

	@media (max-width: 768px) {
		.sidebar {
			width: 200px;
		}

		.sidebar.collapsed {
			width: 60px;
		}

		.search-container {
			max-width: 20rem;
		}

		.sender-name {
			width: 120px;
		}

		.email-item {
			padding: 0.5rem 1rem;
			min-height: 50px;
		}

		.compose-btn {
			height: 48px;
		}
	}
</style>
