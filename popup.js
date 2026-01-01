const brandInput = document.getElementById('brandInput');
const addBtn = document.getElementById('addBtn');
const brandsList = document.getElementById('brandsList');

// Load and display brands
function loadBrands() {
    chrome.storage.sync.get(['blockedBrands'], (result) => {
        const brands = result.blockedBrands || [];
        displayBrands(brands);
    });
}

// Display brands in the list
function displayBrands(brands) {
    if (brands.length === 0) {
        brandsList.innerHTML = '<div class="empty-state">No brands blocked yet</div>';
        return;
    }

    brandsList.innerHTML = brands.map(brand => `
    <div class="brand-item">
      <span class="brand-name">${escapeHtml(brand)}</span>
      <button class="remove-btn" data-brand="${escapeHtml(brand)}">Remove</button>
    </div>
  `).join('');

    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            removeBrand(btn.dataset.brand);
        });
    });
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Add a brand
function addBrand() {
    const brand = brandInput.value.trim();

    if (!brand) {
        return;
    }

    chrome.storage.sync.get(['blockedBrands'], (result) => {
        const brands = result.blockedBrands || [];

        // Check if brand already exists (case-insensitive)
        const exists = brands.some(b =>
            b.toLowerCase() === brand.toLowerCase()
        );

        if (exists) {
            alert('This brand is already in your block list!');
            return;
        }

        brands.push(brand);

        chrome.storage.sync.set({ blockedBrands: brands }, () => {
            brandInput.value = '';
            displayBrands(brands);
        });
    });
}

// Remove a brand
function removeBrand(brand) {
    chrome.storage.sync.get(['blockedBrands'], (result) => {
        const brands = result.blockedBrands || [];
        const filtered = brands.filter(b => b !== brand);

        chrome.storage.sync.set({ blockedBrands: filtered }, () => {
            displayBrands(filtered);
        });
    });
}

// Event listeners
addBtn.addEventListener('click', addBrand);

brandInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addBrand();
    }
});

// Load brands on popup open
loadBrands();