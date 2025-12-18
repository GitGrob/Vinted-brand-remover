// Remove brand information from Vinted search results

function removeBrands() {

  const testBrands = ['Prada', 'Autry', 'Salomon']
  // Target common brand element selectors on Vinted

  const feedItems = document.querySelectorAll('.feed-grid__item');
  feedItems.forEach(item => {
    let titleElement = item.querySelector('[data-testid*="--description-title"]');
    if(testBrands.includes(titleElement.textContent)){
      item.style.display = 'none';
    }
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
