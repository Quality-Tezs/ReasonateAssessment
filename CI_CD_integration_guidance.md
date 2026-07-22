Azure DevOps (Pipelines)
Goal: run Playwright tests against a dev/stage environment with seeded data.

Key steps:
	Use a self-hosted or Microsoft-hosted agent with Node.js and Chrome/Chromium.
	Install dependencies, build if needed, and run Playwright install.
	Run tests in a dedicated stage, publish test results, and artifacts (screenshots/videos).
	Optional: run in parallel across data variations; fail fast on critical tests.

Example azure-pipelines.yml (simplified):

trigger:
- main

pool:
  vmImage: 'ubuntu-latest'

variables:
  buildConfiguration: 'Release'
  CI: true

steps:
- task: NodeTool@0
  inputs:
    versionSpec: '18.x'
  displayName: 'Install Node.js'

- script: npm ci
  displayName: 'Install dependencies'

- script: npx playwright install
  displayName: 'Install browsers'

- script: npm test
  displayName: 'Run Playwright tests'

- task: PublishTestResults@2
  inputs:
    testResultsFiles: '**/test-results.xml'
  condition: succeededOrFailed()
