# Vinted Brand Remover

A browser extension that removes brand information from Vinted search results.

## Features

- Automatically removes brand labels from item listings
- Works with dynamically loaded content (infinite scroll)
- Compatible with Chrome and Firefox

## Installation

### Chrome/Chromium

1. Clone or download this repository
2. Open `chrome://extensions/` in your browser
3. Enable "Developer mode" (top-right corner)
4. Click "Load unpacked"
5. Select the `vinted-brand-remover` directory

### Firefox

1. Clone or download this repository
2. Open `about:debugging` in your browser
3. Click "This Firefox" in the left sidebar
4. Click "Load Temporary Add-on"
5. Select the `manifest.json` file from the `vinted-brand-remover` directory

**Note:** For Firefox, temporary add-ons are unloaded when the browser restarts. To make it permanent, you'll need to package and sign it through Mozilla's Add-on Store.

## How it works

The extension:
- Runs a content script on all Vinted pages
- Identifies and hides brand-related elements
- Uses a MutationObserver to catch dynamically loaded items
- Removes brand information while preserving other product details

## Customization

To modify which elements are hidden, edit the `brandSelectors` array in `content.js` to target different CSS classes or data attributes used by Vinted's current UI.

## Troubleshooting

If brand information is still visible:
1. Inspect the page (F12) and find the CSS class/ID of the brand element
2. Add it to the `brandSelectors` array in `content.js`
3. Reload the extension

## License

MIT
# Vinted-brand-remover
