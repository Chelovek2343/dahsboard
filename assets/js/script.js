// FinDash — main script

// --- Бургер-меню ---
const burger = document.getElementById('burger');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

if (burger && sidebar && overlay) {

  function openMenu() {
    sidebar.classList.add('open');
    overlay.classList.add('active');
    burger.classList.add('open');
  }

  function closeMenu() {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
    burger.classList.remove('open');
  }

  burger.addEventListener('click', () => {
    sidebar.classList.contains('open') ? closeMenu() : openMenu();
  });

  overlay.addEventListener('click', closeMenu);

  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', closeMenu);
  });

}

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