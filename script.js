const displayYear = new Date().getFullYear();
['y', 'year'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.textContent = displayYear;
});
