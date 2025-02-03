

const modal = document.getElementById('addListingModal');
const addItemBtn = document.querySelector('.add-item-btn');
const closeModal = document.querySelector('.close');

// State-District Mapping
const stateDistrictMap = {
    "Andhra Pradesh": ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Kadapa", "Krishna", "Kurnool", "Prakasam", "Srikakulam", "Visakhapatnam"],
    "Arunachal Pradesh": ["Itanagar", "Pasighat", "Tawang", "Ziro", "Bomdila", "Namsai", "Anjaw", "Changlang", "Lohit", "Lower Dibang Valley"],
    "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Sivasagar", "Nagaon", "Golaghat", "Dhubri", "Barpeta", "Kokrajhar"],
    "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga", "Purnia", "Begusarai", "Siwan", "Saharsa", "Madhubani"],
    "Chhattisgarh": ["Raipur", "Bilaspur", "Durg", "Raigarh", "Korba", "Janjgir-Champa", "Surguja", "Koriya", "Balod", "Dhamtari"],
    "Goa": ["Panaji", "Vasco da Gama", "Mapusa", "Margao", "Ponda", "Old Goa", "Calangute", "Baga", "Candolim", "Mormugao"],
    "Gujarat": ["Ahmedabad", "Vadodara", "Surat", "Rajkot", "Bhavnagar", "Gandhinagar", "Jamnagar", "Junagadh", "Porbandar", "Dwarka"],
    "Haryana": ["Faridabad", "Gurgaon", "Panipat", "Ambala", "Hisar", "Karnal", "Rohtak", "Jind", "Bhiwani", "Panchkula"],
    "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala", "Solan", "Kullu", "Chamba", "Kangra", "Hamirpur", "Una", "Bilaspur"],
    "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribag", "Daltonganj", "Deoghar", "Dumka", "Lohardaga", "Palamau"],
    "Karnataka": ["Bangalore", "Mysore", "Mangalore", "Hubli-Dharwad", "Belgaum", "Gulbarga", "Bidar", "Raichur", "Bellary", "Davanagere"],
    "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Trivandrum", "Kollam", "Kannur", "Palakkad", "Malappuram", "Thrissur", "Alappuzha"],
    "Madhya Pradesh": ["Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain", "Sagar", "Rewa", "Satna", "Guna", "Dewas"],
    "Maharashtra": ["Mumbai", "Pune", "Nashik", "Nagpur", "Aurangabad", "Solapur", "Amravati", "Nanded", "Jalgaon", "Akola"],
    "Manipur": ["Imphal", "Churachandpur", "Ukhrul", "Thoubal", "Senapati", "Tamenglong", "Chandel", "Bishnupur", "Jiribam", "Kakching"],
    "Meghalaya": ["Shillong", "Tura", "Jowai", "Nongstoin", "Williamnagar", "Baghmara", "Mawkyrwat", "Raliang", "Nongpoh", "Mawlai"],
    "Mizoram": ["Aizawl", "Lunglei", "Champhai", "Saiha", "Lawngtlai", "Mamit", "Kolasib", "Serchhip", "Aizawl West", "Aizawl East"],
    "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Wokha", "Zunheboto", "Phek", "Mon", "Tuensang", "Kiphire", "Longleng"],
    "Odisha": ["Bhubaneswar", "Cuttack", "Puri", "Rourkela", "Sambalpur", "Berhampur", "Balasore", "Bhadrak", "Jajpur", "Kendrapara"],
    "Punjab": ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Hoshiarpur", "Moga", "Firozpur", "Faridkot"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Ajmer", "Kota", "Bikaner", "Jaisalmer", "Bharatpur", "Alwar", "Bundi"],
    "Sikkim": ["Gangtok", "Pelling", "Namchi", "Gyalshing", "Mangan", "Singtam", "Jorethang", "Ravangla", "Soreng", "Yuksom"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Vellore", "Erode", "Thanjavur", "Dindigul"],
    "Telangana": ["Hyderabad", "Warangal", "Karimnagar", "Nalgonda", "Khammam", "Adilabad", "Ranga Reddy", "Medak", "Mahabubnagar", "Nizamabad"],
    "Tripura": ["Agartala", "Dharmanagar", "Kailashahar", "Udaipur", "Sabroom", "Ambassa", "Belonia", "Kumarghat", "Amarpur", "Teliamura"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra", "Ghaziabad", "Meerut", "Aligarh", "Bareilly", "Moradabad", "Gorakhpur"],
    "Uttarakhand": ["Dehradun", "Haridwar", "Nainital", "Mussoorie", "Rishikesh", "Uttarkashi", "Tehri Garhwal", "Chamoli", "Pithoragarh", "Almora"],
    "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri", "Bardhaman", "Hooghly", "Nadia", "Murshidabad", "Bankura"]
};

// Initialize Filters
const filters = {
    search: '',
    type: '',
    state: '',
    district: '',
    equipment: '',
    date: '',
    price: ''
};

// Populate Districts Based on Selected State
document.getElementById('stateFilter').addEventListener('change', (e) => {
    const state = e.target.value;
    const districtFilter = document.getElementById('districtFilter');

    // Clear previous districts
    districtFilter.innerHTML = '<option value="">Select District</option>';

    if (state) {
        // Enable district filter
        districtFilter.disabled = false;

        // Populate districts
        stateDistrictMap[state].forEach(district => {
            const option = document.createElement('option');
            option.value = district;
            option.textContent = district;
            districtFilter.appendChild(option);
        });
    } else {
        // Disable district filter if no state is selected
        districtFilter.disabled = true;
    }

    // Update filters and apply
    filters.state = state;
    filters.district = ''; // Reset district filter
    filterCards();
});

// Add event listeners for filters
document.getElementById('searchInput').addEventListener('input', (e) => {
    filters.search = e.target.value.toLowerCase();
    filterCards();
});

document.getElementById('typeFilter').addEventListener('change', (e) => {
    filters.type = e.target.value;
    filterCards();
});

document.getElementById('districtFilter').addEventListener('change', (e) => {
    filters.district = e.target.value;
    filterCards();
});

document.getElementById('equipmentFilter').addEventListener('change', (e) => {
    filters.equipment = e.target.value;
    filterCards();
});

document.getElementById('datePostedFilter').addEventListener('change', (e) => {
    filters.date = e.target.value;
    filterCards();
});

document.getElementById('priceFilter').addEventListener('change', (e) => {
    filters.price = e.target.value;
    filterCards();
});

// Filter Cards Function
function filterCards() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        const type = card.dataset.type;
        const equipment = card.dataset.equipment || '';
        const state = card.dataset.state;
        const district = card.dataset.district;
        const date = card.dataset.date;
        const price = parseInt(card.dataset.price);
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        const details = card.querySelector('.card-details').textContent.toLowerCase();
        
        const matchesSearch = title.includes(filters.search) || details.includes(filters.search);
        const matchesType = !filters.type || type === filters.type;
        const matchesEquipment = !filters.equipment || equipment === filters.equipment;
        const matchesState = !filters.state || state === filters.state;
        const matchesDistrict = !filters.district || district === filters.district;
        const matchesDate = !filters.date || date === filters.date;
        const matchesPrice = checkPriceRange(price);
        
        if (matchesSearch && matchesType && matchesEquipment && matchesState && matchesDistrict && matchesDate && matchesPrice) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Check Price Range
function checkPriceRange(price) {
    if (!filters.price) return true;
    const [min, max] = filters.price.split('-').map(Number);
    return price >= min && (!max || price <= max);
}

// Fetch Listings from Backend
async function fetchListings() {
    try {
        const response = await fetch('http://localhost:5000/api/listings');
        if (!response.ok) throw new Error('Failed to fetch listings');
        const listings = await response.json();
        displayListings(listings);
    } catch (error) {
        console.error('Fetch error:', error);
        alert('Error loading listings. Please try again.');
    }
}

// Display Listings
function displayListings(listings) {
    const cardGrid = document.querySelector('.card-grid');
    cardGrid.innerHTML = ''; // Clear existing cards

    listings.forEach(listing => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.type = listing.type;
        card.dataset.equipment = listing.equipment_type || '';
        card.dataset.price = listing.price;
        card.dataset.state = listing.state;
        card.dataset.district = listing.district;
        card.dataset.date = listing.posted_on;

        card.innerHTML = `
         <img src="${listing.image_url}" alt="${listing.title}" class="card-image">
            <div class="card-content">
                <span class="card-type ${listing.type}">${listing.type}</span>
                <h2 class="card-title">${listing.title}</h2>
                <div class="card-price">₹${listing.price}${listing.type === 'equipment' ? '/day' : ''}</div>
                <div class="card-details">
                    <span><i class="fas fa-phone"></i>${listing.contact}</span>
                    ${listing.duration ? `<span><i class="fas fa-calendar-alt"></i>Min. ${listing.duration} days rental</span>` : ''}
                    <span><i class="fas fa-map-marker-alt"></i>${listing.district}, ${listing.state}</span>
                    ${listing.size ? `<span><i class="fas fa-ruler-combined"></i>${listing.size} Acres</span>` : ''}
                    ${listing.description ? `<span><i class="fas fa-info-circle"></i>${listing.description}</span>` : ''}
                    <span><i class="fas fa-clock"></i>Posted: ${new Date(listing.posted_on).toLocaleDateString()}</span>
                </div>
                <a href="#" class="contact-btn">Contact Owner</a>
            </div>
        `;

        cardGrid.appendChild(card);
    });
}

// Fetch listings on page load
document.addEventListener('DOMContentLoaded', fetchListings);


// Modal functionality
addItemBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Handle district population in modal
document.getElementById('state').addEventListener('change', (e) => {
    const state = e.target.value;
    const districtSelect = document.getElementById('district');
    
    districtSelect.innerHTML = '<option value="">Select District</option>';
    
    if (state) {
        stateDistrictMap[state].forEach(district => {
            const option = document.createElement('option');
            option.value = district;
            option.textContent = district;
            districtSelect.appendChild(option);
        });
    }
});

// Handle form submission
document.getElementById('addListingForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    
    // Add validation for required fields
    if (!document.getElementById('description').value) {
        alert('Description is required');
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/listings', {
            method: 'POST',
            body: formData
          });
        
        // ... rest of the code
    } catch (error) {
        console.error('Error:', error);
        alert(error.message);
    }
});

console.log('Serving static files from:', uploadDir);