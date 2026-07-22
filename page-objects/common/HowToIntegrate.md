 How to integrate

Place these under page-objects/.

Update imports in your tests to include:
	const { AlertsNotificationsPage } = require(‘…/page-objects/alerts-notifications.page’);
	const { AuditLogsPage } = require(‘…/page-objects/audit-logs.page’);
	const { DatasetExplorerPage } = require(‘…/page-objects/dataset-explorer.page’);

Optionally extend BasePage with environment-specific logging hooks or a shared logger.