// FinDash — main script

// --- Фильтрация транзакций ---
const filterButtons = document.querySelectorAll('.filter-btn');
const txItems = document.querySelectorAll('.tx-item');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {

    // убираем active у всех кнопок
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    txItems.forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });

  });
});