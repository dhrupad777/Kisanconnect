// Fetch Market Trades from API

async function fetchMarketTrades() {
    try {
        console.log('Fetching market trades from API...');
        const response = await fetch('http://localhost:5000/api/trades');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched trades:', data);  // Log the response
        return data;
    } catch (error) {
        console.error('Error fetching trades:', error);
        return [];  // Return an empty array in case of an error
    }
}

// Populate Market Trades in the Grid
function populateMarketTrades(section, data) {
    if (!section) {
        console.error('Market trades section not found!');
        return;
    }

    const grid = section.querySelector('.contracts-grid');
    if (!grid) {
        console.error('Grid element not found');
        return;
    }
    
    grid.innerHTML = ''; // Clear existing content
    data.forEach((trade) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="card-header">
                <span class="badge">${trade.trade_type}</span>
            </div>
            <h3>${trade.name}</h3>
            <p><strong>Needs:</strong> ${trade.needs}</p>
            <p><strong>Deadline:</strong> ${new Date(trade.deadline).toLocaleDateString()}</p>
            <p><strong>Price:</strong> ₹${trade.price.toLocaleString()}</p>
            <p><strong>Email:</strong> 
                <a href="mailto:${trade.email}" class="email-link" title="${trade.email}">
                    ${trade.email.length > 20 ? trade.email.slice(0, 17) + "..." : trade.email}
                </a>
            </p>
            <p><strong>Phone:</strong> 
                <a href="tel:${trade.phone}" class="phone-link">${trade.phone}</a>
            </p>
        `;
        grid.appendChild(card);
    });
}

// Fetch and Populate Market Trades
(async () => {
    const trades = await fetchMarketTrades();  // Get market trades from the API
    const section = document.querySelector('.market-trades-section');

    if (!section) {
        console.error("Market trades section not found on the page.");
        return;
    }

    if (trades.length > 0) {
        populateMarketTrades(section, trades);  // Populate grid with fetched data
    } else {
        console.warn("No trades found or error in fetching data.");
    }
})();

// Add New Trade (via Popup Form)
document.getElementById('addTradeButton').addEventListener('click', function() {
    document.getElementById('tradeModal').style.display = 'block';
});

// Close Modal
document.getElementById('closeModal').addEventListener('click', function() {
    document.getElementById('tradeModal').style.display = 'none';
});

// Submit New Trade
document.getElementById('submitTradeButton').addEventListener('click', async function() {
    const tradeType = document.getElementById('tradeType').value;
    const name = document.getElementById('name').value;
    const needs = document.getElementById('needs').value;
    const deadline = document.getElementById('deadline').value;
    const price = document.getElementById('price').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    const tradeData = { trade_type: tradeType, name, needs, deadline, price, email, phone };

    try {
        const response = await fetch('http://localhost:5000/api/trades', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tradeData),
        });

        if (!response.ok) {
            throw new Error('Failed to add trade');
        }

        // Reload trades after successful addition
        const trades = await fetchMarketTrades();
        const section = document.querySelector('.market-trades-section');
        populateMarketTrades(section, trades);

        // Close modal after adding trade
        document.getElementById('tradeModal').style.display = 'none';
    } catch (error) {
        console.error('Error adding trade:', error);
        alert('Error adding trade!');
    }
});
