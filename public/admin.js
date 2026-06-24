const form = document.getElementById('potion-form');
const feedback = document.getElementById('form-feedback');

function createAdminPotionCard(potion) {
    const row = document.createElement('div');
    row.className = 'admin-row';

    const img = document.createElement('img');
    img.src = potion.image;
    img.alt = potion.name;

    const info = document.createElement('div');
    info.className = 'admin-row-info';

    const name = document.createElement('div');
    name.className = 'admin-row-name';
    name.textContent = potion.name;

    const price = document.createElement('div');
    price.className = 'admin-row-price';
    price.textContent = `${potion.price} moedas`;

    const btn = document.createElement('button');
    btn.className = 'btn-delete';
    btn.textContent = 'Remover';
    btn.addEventListener('click', () => deletePotion(potion.id));

    info.append(name, price);
    row.append(img, info, btn);
    return row;
}

async function loadAdminPotions() {
    const container = document.getElementById('admin-potions-container');
    if (!container) return;

    try {
        const response = await fetch('/api/potions');
        const potions = await response.json();
        container.innerHTML = '';
        if (potions.length === 0) {
            container.innerHTML = '<p class="loading-msg">Nenhuma poção cadastrada.</p>';
            return;
        }
        potions.forEach(p => container.appendChild(createAdminPotionCard(p)));
    } catch (error) {
        container.innerHTML = '<p class="loading-msg">Erro ao carregar catálogo.</p>';
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const description = document.getElementById('description').value.trim();
    const image = document.getElementById('image').value.trim();
    const price = document.getElementById('price').value;

    if (!name || !description || !image || !price || Number(price) <= 0) {
        showFeedback('Preencha todos os campos corretamente.', 'error');
        return;
    }

    try {
        const response = await fetch('/api/potions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, description, image, price })
        });

        if (response.ok) {
            showFeedback('Poção cadastrada com sucesso.', 'success');
            form.reset();
            loadAdminPotions();
        } else {
            showFeedback('Erro ao cadastrar poção.', 'error');
        }
    } catch (error) {
        showFeedback('Erro ao conectar ao servidor.', 'error');
    }
});

async function deletePotion(id) {
    if (!confirm('Deseja remover esta poção?')) return;

    try {
        const response = await fetch(`/api/potions/${id}`, { method: 'DELETE' });
        if (response.ok) {
            loadAdminPotions();
        } else {
            alert('Erro ao remover a poção.');
        }
    } catch (error) {
        alert('Erro ao conectar ao servidor.');
    }
}

function showFeedback(msg, type) {
    feedback.textContent = msg;
    feedback.className = `form-feedback ${type}`;
    setTimeout(() => {
        feedback.textContent = '';
        feedback.className = 'form-feedback';
    }, 4000);
}

window.addEventListener('DOMContentLoaded', loadAdminPotions);
