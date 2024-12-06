// Function to fetch random dog fact and image
async function fetchDogData() {
    const factElement = document.getElementById('dogFact');
    const imageElement = document.getElementById('dogPic');

    // Dog facts to randomly choose from
    const dogFacts = [
        "Dogs have three eyelids!",
        "A dog’s sense of smell is at least 40 times better than ours.",
        "Some dogs are incredible swimmers.",
        "Dogs have been human companions for over 14,000 years.",
        "A Greyhound can run up to 45 miles per hour!",
        "Dogs have a unique nose print, just like human fingerprints.",
        "The world’s oldest dog lived to be 29 years old!",
        "Dogs can learn over 100 words and commands.",
        "A dog’s hearing is four times more sensitive than humans."
    ];

    // Select a random fact
    const randomFact = dogFacts[Math.floor(Math.random() * dogFacts.length)];
    factElement.innerText = randomFact;

    // Fetch a random dog breed image
    try {
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        const data = await response.json();
        if (data.message) {
            imageElement.src = data.message;
        } else {
            imageElement.src = 'placeholder.jpg';
            factElement.innerText = 'Sorry, we couldn’t load an image. Try again!';
        }
    } catch (error) {
        console.error("Error fetching dog data:", error);
        factElement.innerText = 'Oops! Something went wrong. Please try again.';
    }
}

// Breed facts to display when searching for specific breeds
const breedFacts = {
    "bulldog": "Bulldogs are known for their loose, wrinkled skin and their friendly, courageous demeanor.",
    "beagle": "Beagles are incredibly friendly and make great family pets, they also have one of the best noses in the dog world!",
    "poodle": "Poodles are known for their intelligence and hypoallergenic coat. They come in three sizes: Standard, Miniature, and Toy.",
    "germanshepherd": "German Shepherds are famous for their loyalty, bravery, and intelligence, often working as service dogs.",
    "labrador": "Labradors are known for their friendly, outgoing personality and make excellent family dogs.",
    "husky": "Huskies are known for their endurance, ability to pull sleds, and their striking blue eyes and thick coats.",
    "rottweiler": "Rottweilers are known for their strength and protective nature, often serving as guard dogs or police dogs.",
    "chihuahua": "Chihuahuas are one of the smallest dog breeds but have huge personalities. They are known for being brave and loyal.",
    "dalmatian": "Dalmatians are famous for their distinctive black and white coat and their history as firehouse dogs.",
    "boxer": "Boxers are known for their boundless energy, playful nature, and loyalty. They are great with families and kids.",
    "dachshund": "Dachshunds are small, long-bodied dogs originally bred for hunting small animals, and they have a spunky personality.",
    "schnauzer": "Schnauzers are known for their distinctive bearded snout and their versatility, making them great family dogs and watchdogs.",
    "pug": "Pugs are small, sturdy dogs known for their charming personalities, wrinkled faces, and curly tails.",

    
};

// Function to search for a specific dog breed
async function searchDogBreed() {
    const breedInput = document.getElementById('breedSearch').value.trim().toLowerCase();
    const factElement = document.getElementById('dogFact');
    const imageElement = document.getElementById('dogPic');

    if (breedInput === "") {
        alert("Please enter a breed!");
        return;
    }

    // Fetch image and fact for a specific breed
    try {
        const response = await fetch(`https://dog.ceo/api/breed/${breedInput}/images/random`);
        const data = await response.json();

        if (data.status === "success" && data.message) {
            // Display the breed image
            imageElement.src = data.message;

            // Display the breed fact, if available
            if (breedFacts[breedInput]) {
                factElement.innerText = `${breedInput.charAt(0).toUpperCase() + breedInput.slice(1)}: ${breedFacts[breedInput]}`;
            } else {
                factElement.innerText = `No specific facts available for this breed. But here's a random fact: Dogs are amazing creatures!`;
            }
        } else {
            imageElement.src = 'placeholder.jpg';
            factElement.innerText = `No images found for breed: ${breedInput}. Please try another.`;
        }
    } catch (error) {
        console.error("Error fetching dog breed data:", error);
        factElement.innerText = 'Oops! Something went wrong. Please try again.';
    }
}







