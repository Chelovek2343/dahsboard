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

// --- Курсы валют ---
const currencies = [
  { code: 'USD', flag: '🇺🇸', name: 'Доллар США' },
  { code: 'EUR', flag: '🇪🇺', name: 'Евро' },
  { code: 'RUB', flag: '🇷🇺', name: 'Рос. рубль' },
  { code: 'KZT', flag: '🇰🇿', name: 'Казах. тенге' },
];

async function fetchRates() {
  try {
    const res = await fetch('https://api.exchangerate-api.com/v4/latest/KGS');
    const data = await res.json();

    const grid = document.getElementById('rates-grid');
    const updated = document.getElementById('rates-updated');

    // время обновления
    const now = new Date();
    const time = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    updated.textContent = `обновлено в ${time}`;

    // рендерим карточки
    grid.innerHTML = currencies.map(cur => {
      // API даёт сколько единиц валюты за 1 KGS
      // нам нужно обратное: сколько KGS за 1 единицу валюты
      const rate = (1 / data.rates[cur.code]).toFixed(2);

      return `
        <div class="rate-card">
          <span class="rate-flag">${cur.flag}</span>
          <span class="rate-code">${cur.code}</span>
          <span class="rate-value">${rate} <small style="font-size:13px;font-weight:400;color:var(--gray-500)">сом</small></span>
          <span class="rate-label">${cur.name}</span>
        </div>
      `;
    }).join('');

  } catch (err) {
    document.getElementById('rates-updated').textContent = 'не удалось загрузить';
    console.error('Ошибка загрузки курсов:', err);
  }
}

fetchRates();