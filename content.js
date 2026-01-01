
let blockedBrands = ['Timberland', 'Salomon'];

const browserAPI = typeof browser !== 'undefined' ? browser : chrome;
// Load blocked brands from storage
browserAPI.storage.sync.get(['blockedBrands'], (result) => {
  blockedBrands = result.blockedBrands || [];
  filterItems();
});

function normalizeBrand(brand) {
  return brand.toLowerCase().trim().replace(/[^a-z0-9]/g, '');
}

function shouldFilter(brandText) {
  if (!brandText) return false;

  const normalizedBrand = normalizeBrand(brandText);
  return blockedBrands.some(blocked =>
    normalizeBrand(blocked) === normalizedBrand
  );
}

function filterItems() {

  const itemSelector = document.querySelectorAll('.feed-grid__item');

  itemSelector.forEach(item => {
    let brand = item.querySelector('[data-testid*="--description-title"]');

    if (item.dataset.brandFiltered) return;
    item.dataset.brandFiltered = 'true';

    if (shouldFilter(titleElement.textContent)) {
      item.style.display = 'none';
      console.log(`Filtered item with brand: ${brandText}`);
    }
  })
}


// Intercepot fetch call API 
const originalFetch = window.fetch;
window.fetch = function () {
  return originalFetch.apply(this, arguments).then(response => {
    const url = args[0];
    if (typeof url === 'string' && url.includes('/api/v2/search_suggestions')) {
      setTimeout(filterItems, 200);
    }
    return response;
  })
}

removeBrands();

// Watch for dynamically loaded content (infinite scroll)
const observer = new MutationObserver(() => {
  removeBrands()
});

// Start observing the document for changes
observer.observe(document.body, {
  childList: true,
  subtree: true,
  characterData: false
});
