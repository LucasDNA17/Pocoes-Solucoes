/*LÓGICA DA PÁGINA DA LOJA*/

export function createPotionCard(potion) {
    const card = document.createElement('div');
    card.className = 'potion-card';

    const img = document.createElement('img');
    img.src = potion.image;
    img.alt = potion.name;

    const body = document.createElement('div');
    body.className = 'card-body';

    const name = document.createElement('h3');
    name.textContent = potion.name;

    const desc = document.createElement('p');
    desc.textContent = potion.description;

    const footer = document.createElement('div');
    footer.className = 'card-footer';

    const price = document.createElement('div');
    price.className = 'price';
    price.textContent = potion.price;
    const priceSuffix = document.createElement('small');
    priceSuffix.textContent = 'moedas';
    price.appendChild(priceSuffix);

    const btn = document.createElement('button');
    btn.className = 'btn-buy';
    btn.textContent = 'Comprar';
    btn.addEventListener('click', () =>
        alert('Funcionalidade de compra não implementada nessa entrega.')
    );

    footer.append(price, btn);
    body.append(name, desc, footer);
    card.append(img, body);
    return card;
}

async function loadPotions() {
    const container = document.getElementById('potions-container');
    if (!container) return;

    try {
        const response = await fetch('/api/potions');
        const potions = await response.json();
        container.innerHTML = '';
        if (potions.length === 0) {
            container.innerHTML = '<p class="loading-msg">Nenhuma poção cadastrada ainda.</p>';
            return;
        }
        potions.forEach(p => container.appendChild(createPotionCard(p)));
    } catch (error) {
        container.innerHTML = '<p class="loading-msg">Erro ao carregar o catálogo de poções.</p>';
    }
}

window.addEventListener('DOMContentLoaded', loadPotions);
