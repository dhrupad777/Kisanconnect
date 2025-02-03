
const YOUTUBE_API_KEY = "AIzaSyBNpc7nWC0ZOYecVqRY2DDQjfHut7pLqVs";
const districts = {
  "UTTAR_PRADESH": [
    "Agra", "Aligarh", "Allahabad", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Ayodhya", "Azamgarh", "Baghpat"
  ],
  "RAJASTHAN": [
    "Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bharatpur", "Bhilwara", "Bikaner", "Bundi", "Chittorgarh"
  ],
  "HARYANA": [
    "Faridabad", "Gurugram", "Jhajjar", "Jind", "Karnal", "Kaithal", "Kurukshetra", "Mahendragarh", "Nuh", "Palwal"
  ],
  "PUNJAB": [
    "Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Ferozepur", "Gurdaspur", "Hoshiarpur", "Jalandhar"
  ],
  "KARNATAKA": [
    "Bengaluru", "Mysuru", "Mangaluru", "Hubballi-Dharwad", "Belagavi", "Vijayapura", "Kalaburagi", "Davanagere", "Shivamogga", "Hassan"
  ],
  "KERALA": [
    "Thiruvananthapuram", "Kochi", "Kozhikode", "Kannur", "Thrissur", "Malappuram", "Kollam", "Palakkad", "Wayanad", "Idukki"
  ],
  "TAMIL_NADU": [
    "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Vellore", "Erode", "Thanjavur", "Kanchipuram"
  ],
  "TELANGANA": [
    "Hyderabad", "Warangal", "Karimnagar", "Nalgonda", "Khammam", "Ranga Reddy", "Medak", "Adilabad", "Nizamabad", "Mahabubnagar"
  ],
  "ANDHRA_PRADESH": [
    "Visakhapatnam", "Vijayawada", "Guntur", "Kurnool", "Nellore", "Tirupati", "Kadapa", "Anantapur", "Chittoor", "East Godavari"
  ],
  "MADHYA_PRADESH": [
    "Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain", "Sagar", "Khandwa", "Mandla", "Chhindwara", "Sehore"
  ],
  "GUJARAT": [
    "Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Gandhinagar", "Mehsana", "Junagadh", "Patan", "Nadiad"
  ],
  "MAHARASHTRA": [
    "Mumbai", "Pune", "Nagpur", "Nashik", "Thane", "Solapur", "Aurangabad", "Kolhapur", "Satara", "Raigad"
  ],
  "BIHAR": [
    "Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia", "Nalanda", "Samastipur", "Darbhanga", "Sasaram", "Begusarai"
  ],
  "WEST_BENGAL": [
    "Kolkata", "Howrah", "Darjeeling", "Siliguri", "Medinipur", "Durgapur", "Asansol", "Burdwan", "Malda", "Bankura"
  ],
  "ODISHA": [
    "Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Puri", "Sambalpur", "Bargarh", "Angul", "Kendrapara", "Jeypore"
  ],
  "CHHATTISGARH": [
    "Raipur", "Bilaspur", "Durg", "Korba", "Jagdalpur", "Raigarh", "Ambikapur", "Janjgir-Champa", "Dhamtari", "Kanker"
  ],
  "JHARKHAND": [
    "Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh", "Deoghar", "Giridih", "Chaibasa", "Jamtara", "Palamu"
  ],
  "ASSAM": [
    "Guwahati", "Dibrugarh", "Jorhat", "Silchar", "Nagaon", "Tinsukia", "Tezpur", "Barpeta", "Karimganj", "Golaghat"
  ],
  "MEGHALAYA": [
    "Shillong", "Tura", "Jowai", "Nongpoh", "Williamnagar", "Baghmara", "Mawkyrwat", "Rangdap", "Jaintia Hills", "East Khasi Hills"
  ],
  "ARUNACHAL_PRADESH": [
    "Itanagar", "Tawang", "Ziro", "Bomdila", "Pasighat", "Tezu", "Changlang", "Naharlagun", "Roing", "Aalo"
  ],
  "NAGALAND": [
    "Kohima", "Dimapur", "Mokokchung", "Wokha", "Peren", "Tuensang", "Mon", "Zunheboto", "Phek", "Longleng"
  ],
  "MANIPUR": [
    "Imphal", "Thoubal", "Churachandpur", "Bishnupur", "Senapati", "Tamenglong", "Chandel", "Ukhrul", "Jiribam", "Kakching"
  ],
  "TRIPURA": [
    "Agartala", "Udaipur", "Sabroom", "Dharmanagar", "Belonia", "Kailashahar", "Melaghar", "Khowai", "Ambassa", "Sonamura"
  ],
  "MIZORAM": [
    "Aizawl", "Lunglei", "Siaha", "Champhai", "Mamit", "Kolasib", "Lawngtlai", "Serchhip", "Hnahthial", "Khawzawl"
  ],
  "SIKKIM": [
    "Gangtok", "Namchi", "Jorethang", "Mangan", "Rangpo", "Singhik", "Sang", "Sikkim", "Ravangla", "Dikchu"
  ],
  "GOA": [
    "Panaji", "Vasco da Gama", "Mapusa", "Margao", "Ponda", "Bicholim", "Cortalim", "Quepem", "Canacona", "Dona Paula"
  ],
  "DAMAN_AND_DIU": [
    "Daman", "Diu", "Moti Daman", "Nani Daman", "Daman District", "Diu District", "Jampore", "Devka Beach", "Fazal", "Nani Daman"
  ],
  "LAKSHADWEEP": [
    "Kavaratti", "Agatti", "Minicoy", "Andrott", "Amini", "Kalapeni", "Suheli Par", "Kadmat", "Chetlat", "Bitra"
  ],
  "DELHI": [
    "Central Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi", "North West Delhi", "South West Delhi", "Shahdara", "New Delhi", "North East Delhi"
  ],
  "PUDUCHERRY": [
    "Puducherry", "Karaikal", "Mahe", "Yanam", "Ousteri", "Villupuram", "Cuddalore", "Tindivanam", "Puducherry City", "Villianur"
  ]
};

// Initialize all DOM elements when the page loads
document.addEventListener("DOMContentLoaded", function() {
    initializeDropdowns();
    initializeFormSubmission();
    initializeStateDistrictHandler();
});

// Initialize Crop Type Dropdown
function initializeDropdowns() {
    const dropdownButton = document.getElementById('dropdownButton');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const hiddenInput = document.createElement('input');
    
    // Create hidden input for crop type
    hiddenInput.type = 'hidden';
    hiddenInput.id = 'cropType';
    hiddenInput.name = 'cropType';
    dropdownButton.parentNode.appendChild(hiddenInput);

    // Toggle dropdown on button click
    dropdownButton.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdownMenu.classList.toggle('show');
    });

    // Handle option selection
    const options = dropdownMenu.getElementsByTagName('a');
    Array.from(options).forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const selectedValue = e.target.closest('a').getAttribute('data-value');
            const selectedText = e.target.closest('a').textContent;
            const imgSrc = e.target.closest('a').querySelector('img').src;
            
            dropdownButton.innerHTML = `${selectedText} <img src="${imgSrc}" alt="${selectedText}" style="width: 20px; height: 20px; margin-left: 10px;">`;
            hiddenInput.value = selectedValue;
            dropdownMenu.classList.remove('show');
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!dropdownButton.contains(e.target)) {
            dropdownMenu.classList.remove('show');
        }
    });
}

// Initialize State-District Handler
function initializeStateDistrictHandler() {
    const stateSelect = document.getElementById("state");
    stateSelect.addEventListener('change', updateDistricts);
}

// Update Districts based on State Selection
function updateDistricts() {
    const stateSelect = document.getElementById("state");
    const districtSelect = document.getElementById("district");
    const selectedState = stateSelect.value;

    districtSelect.innerHTML = '<option value="">--SELECT DISTRICT--</option>';
    districtSelect.disabled = !selectedState;

    if (selectedState) {
        const selectedDistricts = districts[selectedState] || [];
        selectedDistricts.forEach(district => {
            const option = document.createElement("option");
            option.value = district;
            option.textContent = district;
            districtSelect.appendChild(option);
        });
    }
}

// Initialize Form Submission
function initializeFormSubmission() {
    const form = document.getElementById("harvestForm");
    if (form) {
        form.addEventListener("submit", handleFormSubmit);
    }
}

// Handle Form Submission
async function handleFormSubmit(e) {
    e.preventDefault();

    const loader = document.getElementById("loader");
    const outputContainer = document.getElementById("outputContainer");
    
    // Show loader and clear previous content
    loader.style.display = "block";
    outputContainer.innerHTML = "";

    // Get form values
    const formData = {
        cropType: document.getElementById("cropType").value,
        quantity: document.getElementById("quantity").value,
        state: document.getElementById("state").value,
        district: document.getElementById("district").value,
        landArea: document.getElementById("landArea").value,
        harvestDate: document.getElementById("harvestDate").value,
        notes: document.getElementById("notes").value
    };

    // Validate required fields
    if (!formData.cropType || !formData.state || !formData.district) {
        outputContainer.innerHTML = '<p class="error-message">Please fill in all required fields</p>';
        loader.style.display = "none";
        return;
    }

    try {
        await generateInsights(formData);
        const videos = await fetchYouTubeVideos(`${formData.cropType} farming tips`);
        displayYouTubeVideos(videos);
    } catch (error) {
        console.error("Error:", error);
        outputContainer.innerHTML = `<p class="error-message">Failed to fetch insights. Please try again.</p>`;
    } finally {
        loader.style.display = "none";
    }
}

// Generate Insights
async function generateInsights(formData) {
    const prompt = generatePrompt(formData);
    const response = await fetch("http://localhost:5000/newharvest/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    document.getElementById("outputContainer").innerHTML = data.generatedText || "No insights available.";
}

// Generate Prompt
function generatePrompt(formData) {
    return `Crop Type: ${formData.cropType}, Quantity: ${formData.quantity} kg, State: ${formData.state}, 
    District: ${formData.district}, Land Area: ${formData.landArea} acres, 
    Harvest Date: ${formData.harvestDate}, Notes: ${formData.notes}. 

    Provide detailed agricultural insights formatted in HTML with:
    - Section headings (h3) for each category
    - Bullet points (ul/li) for recommendations
    - Paragraphs (p) for explanations
    - Preformatted text (pre) for schedules/measurements
    - No markdown, only HTML tags
    - Focus on soil prep, irrigation, pest control, and local market conditions for ${formData.district}, ${formData.state}
    - Include current government schemes for farmers in ${formData.district}, ${formData.state}
    - Provide weather forecasts for the next 7 days in ${formData.district}, ${formData.state}
    - Suggest crop-specific advice and market trends for ${formData.cropType}`;
}

// YouTube Video Functions
async function fetchYouTubeVideos(query) {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${YOUTUBE_API_KEY}&maxResults=3`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error("Error fetching YouTube videos:", error);
        return [];
    }
}

function displayYouTubeVideos(videos) {
    const container = document.getElementById("youtubeVideos");
    container.innerHTML = "";

    if (!videos || videos.length === 0) {
        container.innerHTML = `<p class="output-text">No videos found.</p>`;
        return;
    }

    videos.forEach(video => {
        const iframe = document.createElement("iframe");
        iframe.src = `https://www.youtube.com/embed/${video.id.videoId}`;
        iframe.className = "youtube-video";
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;
        container.appendChild(iframe);
    });
}