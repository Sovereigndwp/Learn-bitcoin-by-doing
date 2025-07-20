# GitHub Pages Setup Guide

If you're getting permission errors like:
```
remote: Permission to Sovereigndwp/Learn-bitcoin-by-doing.git denied to github-actions[bot].
fatal: unable to access 'https://github.com/...' The requested URL returned error: 403
```

This means GitHub Pages is not properly configured for GitHub Actions deployment.

## Steps to Fix:

### 1. Enable GitHub Pages with GitHub Actions
1. Go to your repository: `https://github.com/Sovereigndwp/Learn-bitcoin-by-doing`
2. Click on **Settings** tab
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select **"GitHub Actions"** (NOT "Deploy from a branch")
5. Click **Save**

### 2. Verify Repository Permissions
1. In the same **Settings** tab
2. Go to **Actions** → **General**
3. Under **Workflow permissions**, ensure **"Read and write permissions"** is selected
4. Make sure **"Allow GitHub Actions to create and approve pull requests"** is checked
5. Click **Save**

### 3. Check if Pages is Enabled
- In **Settings** → **Pages**, you should see:
  - ✅ Source: GitHub Actions
  - ✅ Your site is live at: `https://sovereigndwp.github.io/Learn-bitcoin-by-doing/`

### 4. Manual Trigger Test
1. Go to **Actions** tab in your repository
2. Click on **"Build & Deploy Bitcoin Learning App"** workflow
3. Click **"Run workflow"** button
4. Click **"Run workflow"** to trigger manually

## What Our Current Workflow Does:

1. **Build Job**: Compiles your React app into static files
2. **Deploy Job**: Uses GitHub's official Pages deployment actions (NOT the old peaceiris action)
3. **Health Check**: Verifies the deployed site is working

## Current Workflow Uses Modern GitHub Actions:
- ✅ `actions/upload-pages-artifact@v3` (correct for Pages)
- ✅ `actions/deploy-pages@v4` (official GitHub deployment)
- ❌ NO `peaceiris/actions-gh-pages` (this is what was causing the error)

After following these steps, push any commit to trigger the workflow, or use the manual trigger.
