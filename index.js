const fetchData = async () => {
  try {
    const result = await fetch('https://coauth.com/test.json');
    const data = await result.json();
    createAccordion(data);
  } catch (error) {
    console.error('Error fetching JSON:', error);
  }
};

const createAccordion = (data) => {
  const accordion = document.getElementById('accordion');

  for (const [key, value] of Object.entries(data)) {
    const item = `<div class="accordion-item">
          <h2 class="accordion-header" id="heading${key}">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${key}" aria-expanded="true" aria-controls="collapse${key}">
              ${key}
            </button>
          </h2>
          <div id="collapse${key}" class="accordion-collapse collapse show" aria-labelledby="heading${key}" data-bs-parent="#accordi${key}xample">
            <div class="accordion-body">${value}</div>
          </div>
        </div>`;
    accordion.insertAdjacentHTML('beforeend', item);
  }
};

const refreshContent = () => {
  let count = 5;
  refreshBtn.disabled = true;
  refreshBtn.textContent = `${count}..`;

  const countdown = setInterval(() => {
    count--;
    refreshBtn.textContent = `${count}..`;
    if (count === 0) {
      const accordion = document.getElementById('accordion');
      accordion.innerHTML = '';
      fetchData();

      refreshBtn.disabled = false;
      refreshBtn.textContent = 'Refresh';
      clearInterval(countdown);
    }
  }, 1000);
};

document.addEventListener('DOMContentLoaded', function () {
  fetchData();
});

const refreshBtn = document.getElementById('refreshBtn');
refreshBtn.addEventListener('click', () => {
  refreshContent();
});
