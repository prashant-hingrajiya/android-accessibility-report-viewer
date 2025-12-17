/**
 * Accessibility Scanner Viewer
 * A web-based viewer for Android Accessibility Scanner reports
 */

// Application State Management
const APP = {
    // Application state
    state: {
        currentScreen: 1,
        totalScreens: 0,
        currentReport: null,
        selectedIssueIndex: null,
        selectedFiles: {},
        folderName: ''
    },

    // Constants - Issue Types
    ISSUE_TYPES: [
        'Touch target',
        'Item label',
        'Item descriptions',
        'Text Scaling',
        'Image contrast',
        'Item type label',
        'Low contrast',
        'Clickable span',
        'Editable item',
        'Unexposed Text',
        'Text contrast',
        'Multiple items'
    ],

    // Constants - SVG Icons for issue types
    ICONS: {
        'Touch target': `<svg class="issue-icon" viewBox="0 0 24 24" fill="#ff6f00"><path d="M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z"/></svg>`,
        'Item label': `<svg class="issue-icon" viewBox="0 0 24 24" fill="#ff6f00"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/></svg>`,
        'Item descriptions': `<svg class="issue-icon" viewBox="0 0 24 24" fill="#ff6f00"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/></svg>`,
        'Text Scaling': `<svg class="issue-icon" viewBox="0 0 24 24" fill="#ff6f00"><path d="M9 4v3h5v12h3V7h5V4H9zm-6 8h3v7h3v-7h3V9H3v3z"/></svg>`,
        'Image contrast': `<svg class="issue-icon" viewBox="0 0 24 24" fill="#ff6f00"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14v12c3.31 0 6-2.69 6-6s-2.69-6-6-6z"/></svg>`,
        'Item type label': `<svg class="issue-icon" viewBox="0 0 24 24" fill="#ff6f00"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/></svg>`,
        'Low contrast': `<svg class="issue-icon" viewBox="0 0 24 24" fill="#ff6f00"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14v12c3.31 0 6-2.69 6-6s-2.69-6-6-6z"/></svg>`,
        'Clickable span': `<svg class="issue-icon" viewBox="0 0 24 24" fill="#ff6f00"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>`,
        'Editable item': `<svg class="issue-icon" viewBox="0 0 24 24" fill="#ff6f00"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>`,
        'Unexposed Text': `<svg class="issue-icon" viewBox="0 0 24 24" fill="#ff6f00"><path d="M11.5 9C10.12 9 9 10.12 9 11.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5S12.88 9 11.5 9zM20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8.5 9.67l-1.69-2.03-2.48 3.22-3.33-4.15L1 16h22l-5.5-7.33-6 4.67z"/></svg>`,
        'Text contrast': `<svg class="issue-icon" viewBox="0 0 24 24" fill="#ff6f00"><path d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"/></svg>`,
        'Multiple items': `<svg class="issue-icon" viewBox="0 0 24 24" fill="#ff6f00"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>`,
        'default': `<svg class="issue-icon" viewBox="0 0 24 24" fill="#ff6f00"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>`
    },

    /**
     * Initialize the application
     */
    init() {
        const folderInput = document.getElementById('folderInput');
        if (folderInput) {
            folderInput.addEventListener('change', this.handleFolderSelect.bind(this));
        }
        document.addEventListener('keydown', this.handleKeyboard.bind(this));
    },

    /**
     * Handle folder selection event
     * @param {Event} event - File input change event
     */
    handleFolderSelect(event) {
        const files = Array.from(event.target.files);
        if (files.length === 0) return;

        // Extract folder name from first file path
        const firstFilePath = files[0].webkitRelativePath;
        this.state.folderName = firstFilePath.split('/')[0];

        // Initialize file storage
        this.state.selectedFiles = { reports: [], screenshots: [] };

        // Organize files by type
        files.forEach(file => {
            const fileName = file.name.toLowerCase();
            const match = fileName.match(/\d+/);
            if (!match) return;

            const screenNum = parseInt(match[0]);
            if (fileName.startsWith('report') && fileName.endsWith('.txt')) {
                this.state.selectedFiles.reports[screenNum] = file;
            } else if (fileName.startsWith('screen') && fileName.endsWith('.png')) {
                this.state.selectedFiles.screenshots[screenNum] = file;
            }
        });

        // Calculate total screens
        this.state.totalScreens = Math.max(
            this.state.selectedFiles.reports.filter(f => f).length,
            this.state.selectedFiles.screenshots.filter(f => f).length
        );

        // Display result
        const folderInfo = document.getElementById('folderInfo');
        if (this.state.totalScreens === 0) {
            folderInfo.innerHTML = '<span class="message-error">❌ No report files found. Please select a valid folder.</span>';
            return;
        }

        folderInfo.innerHTML = `<span class="message-success">✓ Loaded ${this.state.totalScreens} screens from "${this.state.folderName}"</span>`;

        // Show viewer
        setTimeout(() => {
            document.getElementById('folderSelector').style.display = 'none';
            document.getElementById('viewerContent').classList.add('active');
            document.getElementById('folderName').textContent = this.state.folderName + ' - Accessibility Issues';
            this.loadScreen(1);
        }, 500);
    },

    /**
     * Reset and show folder selector
     */
    changeFolder() {
        document.getElementById('viewerContent').classList.remove('active');
        document.getElementById('folderSelector').style.display = 'block';
        document.getElementById('folderInput').value = '';
        document.getElementById('folderInfo').innerHTML = '';
        
        // Reset state
        this.state = {
            currentScreen: 1,
            totalScreens: 0,
            currentReport: null,
            selectedIssueIndex: null,
            selectedFiles: {},
            folderName: ''
        };
    },

    /**
     * Load and display a specific screen
     * @param {number} screenNum - Screen number to load
     */
    async loadScreen(screenNum) {
        this.state.currentScreen = screenNum;
        this.state.selectedIssueIndex = null;
        
        // Update navigation UI
        document.getElementById('screenInfo').textContent = `Screen ${screenNum} of ${this.state.totalScreens}`;
        document.getElementById('prevBtn').disabled = screenNum <= 1;
        document.getElementById('nextBtn').disabled = screenNum >= this.state.totalScreens;

        this.updateThumbnails();

        // Show loading state
        const screenshotPanel = document.getElementById('screenshotPanel');
        screenshotPanel.innerHTML = '<div class="loading">Loading...</div>';

        try {
            const reportFile = this.state.selectedFiles.reports[screenNum];
            if (!reportFile) {
                screenshotPanel.innerHTML = '<div class="loading">No report file found for screen ${screenNum}</div>';
                return;
            }

            // Parse report
            const reportText = await reportFile.text();
            this.state.currentReport = this.parseReport(reportText);

            // Display content
            this.displayScreenshot(screenNum);
            this.displayIssues();
            
            // Update suggestion count
            const count = this.state.currentReport.length;
            document.getElementById('suggestionCount').textContent = 
                `${count} suggestion${count !== 1 ? 's' : ''}`;
        } catch (error) {
            screenshotPanel.innerHTML = '<div class="loading">Error loading screen ${screenNum}</div>';
            console.error('Error loading screen:', error);
        }
    },

    /**
     * Parse report text into structured data
     * @param {string} reportText - Raw report text content
     * @returns {Array} Array of parsed issues
     */
    parseReport(reportText) {
        const issues = [];
        const lines = reportText.split('\n');
        let currentIssue = null;

        lines.forEach(line => {
            line = line.trim();
            
            // Skip empty lines and intro
            if (!line || line.startsWith('The following is a list')) return;

            const isIssueType = this.ISSUE_TYPES.some(type => line === type);
            const isResourceId = line.includes(':id/');
            const boundsMatch = line.match(/\[(\d+),(\d+)\]\[(\d+),(\d+)\]/);

            if (isIssueType) {
                // Start new issue
                currentIssue = {
                    bounds: null,
                    type: line,
                    description: [],
                    resourceId: null
                };
                issues.push(currentIssue);
            } else if (boundsMatch && currentIssue) {
                // Extract bounds
                const [_, x1, y1, x2, y2] = boundsMatch;
                if (!currentIssue.bounds) {
                    currentIssue.bounds = { 
                        x1: parseInt(x1), 
                        y1: parseInt(y1), 
                        x2: parseInt(x2), 
                        y2: parseInt(y2) 
                    };
                }
                
                // Add description text if present
                const textWithoutBounds = line.replace(/\[\d+,\d+\]\[\d+,\d+\]/, '').trim();
                if (textWithoutBounds) {
                    currentIssue.description.push(textWithoutBounds);
                }
            } else if (isResourceId && currentIssue) {
                // Add resource ID
                currentIssue.resourceId = line;
            } else if (currentIssue) {
                // Add to description
                currentIssue.description.push(line);
            }
        });

        return issues.filter(issue => issue.type);
    },

    /**
     * Display screenshot with issue overlays
     * @param {number} screenNum - Screen number to display
     */
    displayScreenshot(screenNum) {
        const screenshotPanel = document.getElementById('screenshotPanel');
        const screenshotFile = this.state.selectedFiles.screenshots[screenNum];

        if (!screenshotFile) {
            screenshotPanel.innerHTML = '<div class="loading">No screenshot found for screen ${screenNum}</div>';
            return;
        }

        const img = new Image();
        
        img.onload = () => {
            const wrapper = document.createElement('div');
            wrapper.className = 'screenshot-wrapper';
            
            const screenshot = document.createElement('img');
            screenshot.src = img.src;
            screenshot.className = 'screenshot';
            screenshot.alt = `Screen ${screenNum}`;
            
            wrapper.appendChild(screenshot);
            screenshotPanel.innerHTML = '';
            screenshotPanel.appendChild(wrapper);

            // Add overlays after image is rendered
            setTimeout(() => {
                const scaleX = screenshot.width / screenshot.naturalWidth;
                const scaleY = screenshot.height / screenshot.naturalHeight;

                this.state.currentReport.forEach((issue, index) => {
                    if (issue.bounds) {
                        const overlay = document.createElement('div');
                        overlay.className = 'highlight-overlay';
                        overlay.dataset.index = index;
                        
                        // Scale bounds to display size
                        const scaledX1 = issue.bounds.x1 * scaleX;
                        const scaledY1 = issue.bounds.y1 * scaleY;
                        const scaledX2 = issue.bounds.x2 * scaleX;
                        const scaledY2 = issue.bounds.y2 * scaleY;
                        
                        overlay.style.left = `${scaledX1}px`;
                        overlay.style.top = `${scaledY1}px`;
                        overlay.style.width = `${scaledX2 - scaledX1}px`;
                        overlay.style.height = `${scaledY2 - scaledY1}px`;
                        
                        overlay.onclick = () => this.selectIssue(index);
                        wrapper.appendChild(overlay);
                    }
                });
            }, 50);
        };

        img.onerror = () => {
            screenshotPanel.innerHTML = '<div class="loading">Failed to load screenshot</div>';
        };

        img.src = URL.createObjectURL(screenshotFile);
    },

    /**
     * Display list of issues in the sidebar
     */
    displayIssues() {
        const issueList = document.getElementById('issueList');
        issueList.innerHTML = '';

        this.state.currentReport.forEach((issue, index) => {
            const issueItem = document.createElement('div');
            issueItem.className = 'issue-item';
            if (!issue.bounds) issueItem.classList.add('no-bounds');
            
            issueItem.dataset.index = index;
            issueItem.onclick = () => this.selectIssue(index);

            const icon = this.ICONS[issue.type] || this.ICONS['default'];
            const resourceIdHtml = issue.resourceId 
                ? `<div class="issue-resource-id">${issue.resourceId}</div>` 
                : '';
            const boundsHtml = issue.bounds 
                ? `<div class="issue-bounds">[${issue.bounds.x1},${issue.bounds.y1}][${issue.bounds.x2},${issue.bounds.y2}]</div>` 
                : '';

            issueItem.innerHTML = `
                <div class="issue-type">${icon}${issue.type}</div>
                ${resourceIdHtml}
                <div class="issue-description">${issue.description.join('<br>')}</div>
                ${boundsHtml}
            `;

            issueList.appendChild(issueItem);
        });
    },

    /**
     * Select and highlight an issue
     * @param {number} index - Issue index to select
     */
    selectIssue(index) {
        // Clear previous selection
        document.querySelectorAll('.issue-item.selected').forEach(el => el.classList.remove('selected'));

        // Update state
        this.state.selectedIssueIndex = index;
        const issueItem = document.querySelector(`.issue-item[data-index="${index}"]`);
        const overlay = document.querySelector(`.highlight-overlay[data-index="${index}"]`);

        // Highlight issue item
        if (issueItem) {
            issueItem.classList.add('selected');
            issueItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        // Scroll to overlay if it exists
        if (overlay) {
            overlay.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    },

    /**
     * Navigate to a different screen
     * @param {number} direction - Direction to navigate (-1 for previous, 1 for next)
     */
    navigateScreen(direction) {
        const newScreen = this.state.currentScreen + direction;
        if (newScreen >= 1 && newScreen <= this.state.totalScreens) {
            this.loadScreen(newScreen);
        }
    },

    /**
     * Update thumbnail strip UI
     */
    updateThumbnails() {
        const thumbnailStrip = document.getElementById('thumbnailStrip');
        
        // Create thumbnails on first load
        if (thumbnailStrip.children.length === 0) {
            for (let i = 1; i <= this.state.totalScreens; i++) {
                const screenshotFile = this.state.selectedFiles.screenshots[i];
                if (screenshotFile) {
                    const thumb = document.createElement('img');
                    thumb.src = URL.createObjectURL(screenshotFile);
                    thumb.className = 'thumbnail';
                    thumb.alt = `Screen ${i}`;
                    thumb.onclick = () => this.loadScreen(i);
                    thumb.dataset.screen = i;
                    thumbnailStrip.appendChild(thumb);
                }
            }
        }

        // Update active state
        document.querySelectorAll('.thumbnail').forEach(thumb => {
            const isActive = parseInt(thumb.dataset.screen) === this.state.currentScreen;
            thumb.classList.toggle('active', isActive);
        });

        // Scroll active thumbnail into view
        const activeThumbnail = document.querySelector('.thumbnail.active');
        if (activeThumbnail) {
            activeThumbnail.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest', 
                inline: 'center' 
            });
        }
    },

    /**
     * Handle keyboard navigation
     * @param {KeyboardEvent} event - Keyboard event
     */
    handleKeyboard(event) {
        if (this.state.totalScreens === 0) return;
        
        switch (event.key) {
            case 'ArrowLeft':
                this.navigateScreen(-1);
                break;
            case 'ArrowRight':
                this.navigateScreen(1);
                break;
        }
    }
};

// Initialize application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => APP.init());
} else {
    APP.init();
}
