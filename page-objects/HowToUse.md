How to drop in and use

Place these files under your repo’s repo-root/page-objects/.

Ensure your Playwright test setup imports these pages as:
	const { LoginPage } = require(‘…/page-objects/login.page’);
	const { TriggerIngestPage } = require(‘…/page-objects/trigger-ingest.page’);
	const { PortalDashboardPage } = require(‘…/page-objects/portal-dashboard.page’);

Update selectors to match your real UI (IDs/classes may differ).

The automation script in your previous messages should work with these Page Objects as-is.