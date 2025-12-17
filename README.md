# Accessibility Scanner Viewer

A standalone web-based viewer for Android Accessibility Scanner reports. View accessibility issues with interactive screenshots and detailed suggestions - no server or installation required!

## Features

✨ **Interactive Visualization**
- View accessibility issues overlaid on app screenshots
- Orange borders highlight issue locations
- Click issues to focus and scroll to them

📱 **Issue Details**
- Categorized by type (Touch target, Item label, Image contrast, etc.)
- Resource IDs and bounds coordinates
- Detailed descriptions and recommendations
- Visual indicators for issues without location data

🎯 **Easy Navigation**
- Thumbnail strip for quick screen access
- Previous/Next buttons for sequential navigation
- Keyboard shortcuts (← / → arrow keys)
- Screen counter showing progress

🚀 **No Installation Required**
- Pure HTML/CSS/JavaScript - runs in any modern browser
- No server needed - works offline
- Just select your accessibility scanner folder and go!

## Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Android Accessibility Scanner export folder (unzipped)

## Installation

No installation needed! Just:
1. Download all three files:
   - `index.html` (main file)
   - `styles.css` (styling)
   - `app.js` (functionality)
2. Keep them in the same folder
3. Double-click `index.html` to open in your browser

## Quick Start

### Step 1: Get Your Accessibility Scanner Report
1. Run the **Android Accessibility Scanner** app on your device
2. Scan your app screens
3. Export/share the results
4. Unzip the exported folder (e.g., "pfb onboarding")

### Step 2: Open the Viewer
1. Double-click `index.html` to open in your browser
2. Click **"📁 Select Folder"**
3. Choose your unzipped accessibility scanner folder
4. Start viewing your accessibility issues!

**Note**: Make sure `index.html`, `styles.css`, and `app.js` are in the same folder.

## Usage Guide

### Viewing Issues

**Screenshot Panel (Left)**
- Orange borders highlight issues with location data
- Click a border to select that issue
- Issues without coordinates show a blue notification banner

**Suggestions Panel (Right)**
- Lists all accessibility issues for the current screen
- Click any issue to select it
- Blue border indicates selected issue
- "📍 No location" badge shows issues without screen coordinates

**Issue Details Include:**
- 🏷️ **Type**: Touch target, Item label, Image contrast, etc.
- 🔗 **Resource ID**: Android component identifier (if available)
- 📝 **Description**: Detailed explanation and recommendation
- 📍 **Coordinates**: Screen bounds (if available)

### Navigation

**Buttons**
- Use **Previous/Next** buttons to move between screens
- **Change Folder** button to load a different report

**Keyboard Shortcuts**
- `←` Left Arrow: Previous screen
- `→` Right Arrow: Next screen

**Thumbnail Strip**
- Click any thumbnail to jump to that screen
- Orange border indicates current screen
- Auto-scrolls to keep current screen visible

### Supported Issue Types

The viewer recognizes and displays:
- ✋ **Touch target** - Clickable items too small
- 🏷️ **Item label** - Missing or inadequate labels
- 📝 **Item descriptions** - Duplicate or unclear descriptions
- 🎨 **Image contrast** - Insufficient image contrast
- 🔖 **Item type label** - Redundant type information
- 🔍 **Low contrast** - General contrast issues
- 🔗 **Clickable span** - Accessibility issues in clickable text
- ✏️ **Editable item** - Issues with editable fields
- 📏 **Text Scaling** - Fixed text that doesn't scale
- 👁️ **Unexposed Text** - Text not exposed to accessibility services
- 🎨 **Text contrast** - Insufficient text contrast
- 📋 **Multiple items** - Duplicate item issues

## Report Format

The viewer expects an Android Accessibility Scanner export folder with:
- `reportX.txt` - Text files containing issue details
- `screenX.png` - Screenshot images for each screen
- Where X is the screen number (1, 2, 3, etc.)

**Example folder structure:**
```
pfb onboarding/
├── report1.txt
├── screen1.png
├── report2.txt
├── screen2.png
├── ...
├── report38.txt
└── screen38.png
```

## Browser Compatibility

Tested and working on:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

**Note**: Requires support for:
- File System Access API (`webkitdirectory` attribute)
- ES6 JavaScript features
- CSS Grid and Flexbox

## Privacy & Security

🔒 **100% Local Processing**
- All data stays on your computer
- No internet connection required
- No data sent to external servers
- Files are read directly from your local file system

## Troubleshooting

**Q: "No overlays appearing on screenshots"**
- A: Some issues don't have location coordinates in the report file. These will show a blue notification banner when selected.

**Q: "Browser showing security errors"**
- A: Make sure you're opening the HTML file by double-clicking it or using File > Open in your browser. Don't try to drag it into the browser.

**Q: "Can't select folder"**
- A: Your browser may not support the directory picker. Try using Chrome or Edge.

**Q: "Overlays in wrong position"**
- A: This is a known issue with some report formats. The app scales coordinates based on the screenshot dimensions.

## Technical Details

**Built With:**
- Pure HTML5, CSS3, and Vanilla JavaScript
- No external dependencies or frameworks
- Modular file structure (HTML/CSS/JS separated)
- Uses File System Access API for folder selection

**File Structure:**
```
├── index.html      # Main HTML structure
├── styles.css      # All styling and layout
└── app.js          # Application logic and state management
```

**Code Quality:**
- ✅ Separation of concerns (HTML/CSS/JS in separate files)
- ✅ Semantic HTML5 with ARIA labels for accessibility
- ✅ Centralized state management pattern
- ✅ Comprehensive JSDoc comments
- ✅ Event-driven architecture
- ✅ Modular CSS with section comments
- ✅ Responsive design with flexbox and grid

## Known Limitations

- Only works with Android Accessibility Scanner export format
- Requires modern browser with File System Access API support
- Some issues may not have screen coordinates (scanner limitation)
- Large folders (100+ screens) may take a few seconds to load

## Contributing

Suggestions and improvements welcome! Feel free to:
- Report bugs via issues
- Suggest new features
- Submit pull requests
- Share feedback on UX improvements

## License

MIT License - Free to use and modify as needed.

## Credits

Created for viewing Android Accessibility Scanner reports in a user-friendly way. Based on the report format from [Google's Android Accessibility Scanner](https://play.google.com/store/apps/details?id=com.google.android.apps.accessibility.auditor).
