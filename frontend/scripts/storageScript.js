function updateDistricts() {
    // Get the state selected by the user
    const state = document.getElementById("state").value;

    // Get the district dropdown
    const districtDropdown = document.getElementById("district");

    // Clear existing district options
    districtDropdown.innerHTML = '<option value="">--Select District--</option>';

    // District options for each state
    const districts = {
        "Rajasthan": [
            "Ajmer",
            "Alwar",
            "Banswara",
            "Baran",
            "Barmer",
            "Bhilwara",
            "Bikaner",
            "Bundi",
            "Chittorgarh",
            "Churu",
            "Dausa",
            "Dholpur",
            "Dungarpur",
            "Hanumangarh",
            "Jaipur",
            "Jaisalmer",
            "Jalore",
            "Jhalawar",
            "Jodhpur",
            "Karauli",
            "Kota",
            "Nagaur",
            "Pali",
            "Pratapgarh",
            "Rajsamand",
            "Sawai Madhopur",
            "Sikar",
            "Sirohi",
            "Tonk",
            "Udaipur"
            // these districts of R ajasthan have mostly real data from official government websites unlike other states which is dummy 
        ],
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

        "Sikkim": ["Gangtok", "Pelling", "Namchi", "Gyalshing", "Mangan", "Singtam", "Jorethang", "Ravangla", "Soreng", "Yuksom"],
        "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Vellore", "Erode", "Thanjavur", "Dindigul"],
        "Telangana": ["Hyderabad", "Warangal", "Karimnagar", "Nalgonda", "Khammam", "Adilabad", "Ranga Reddy", "Medak", "Mahabubnagar", "Nizamabad"],
        "Tripura": ["Agartala", "Dharmanagar", "Kailashahar", "Udaipur", "Sabroom", "Ambassa", "Belonia", "Kumarghat", "Amarpur", "Teliamura"],
        "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra", "Ghaziabad", "Meerut", "Aligarh", "Bareilly", "Moradabad", "Gorakhpur"],
        "Uttarakhand": ["Dehradun", "Haridwar", "Nainital", "Mussoorie", "Rishikesh", "Uttarkashi", "Tehri Garhwal", "Chamoli", "Pithoragarh", "Almora"],
        "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri", "Bardhaman", "Hooghly", "Nadia", "Murshidabad", "Bankura"]

    };

    // Check if the selected state has districts
    if (districts[state]) {
        // Loop through districts and add to the dropdown
        districts[state].forEach(function (district) {
            const option = document.createElement("option");
            option.value = district;
            option.textContent = district;
            districtDropdown.appendChild(option);
        });
    }

    // Automatically trigger the visibility of the search button
    toggleSearchButton();
}

function toggleSearchButton() {
    // Get the selected state and district
    const state = document.getElementById("state").value;
    const district = document.getElementById("district").value;

    // Get the search button container
    const searchButtonContainer = document.getElementById("searchButtonContainer");

    // Show the search button only if both state and district are selected
    if (state && district) {
        searchButtonContainer.style.display = "block";  // Show the search button
    } else {
        searchButtonContainer.style.display = "none";  // Hide the search button
    }
}

function searchStorage() {
    const state = document.getElementById("state").value;
    const district = document.getElementById("district").value;

    if (state && district) {
        // Fetch storage data from the backend
        fetch(`http://localhost:5000/api/storage?district=${district}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    alert(data.error);
                } else {
                    displayStorageData(data); // Display the fetched data
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                alert("An error occurred while fetching data.");
            });
    } else {
        alert("Please select both a state and a district to search.");
    }
}
function displayStorageData(data) {
    const resultsContainer = document.getElementById("resultsContainer");
    resultsContainer.innerHTML = "";

    data.forEach((warehouse) => {
        const card = document.createElement("div");
        card.className = "card";

        // Create map container
        const mapContainer = document.createElement("div");
        mapContainer.className = "map-container";
        mapContainer.style.height = "200px";
        mapContainer.style.margin = "10px 0";

        card.innerHTML = `
          <h2>${warehouse.Location}</h2>
          <p><span class="label">Name:</span> ${warehouse.Name}</p>
          <p><span class="label">Designation:</span> ${warehouse.Designation}</p>
          <p><span class="label">Phone:</span> <a href="tel:${warehouse.PhoneNumber.replace(/\D/g, "")}" class="phone">${warehouse.PhoneNumber}</a></p>
          <p><span class="label">Email:</span> <a href="mailto:${warehouse.Email.toLowerCase()}" class="email">${warehouse.Email.toLowerCase()}</a></p>
          <p><span class="label">Utilization:</span> ${warehouse.PercentUtilization}%</p>
          ${warehouse.Coordinates ?
                `<p><span class="label">Coordinates:</span> ${warehouse.Coordinates.join(', ')}</p>` :
                '<p class="label">Coordinates: Not available</p>'}
      `;

        // Add map if coordinates exist
        if (warehouse.Coordinates) {
            card.appendChild(mapContainer);
            initializeMap(mapContainer, warehouse.Coordinates);
        }

        resultsContainer.appendChild(card);
    });
}
function initializeMap(container, coordinates) {
    const map = L.map(container).setView(coordinates, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    L.marker(coordinates).addTo(map)
        .bindPopup('Storage Location');
}