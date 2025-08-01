// Wrap the entire script in an IIFE to avoid polluting the global namespace
(function() {
  // Debugging log to confirm script execution
  console.log("Random image script loaded.");

  // List of image file names
  const images = [
    "alien.png", "bettyboop.png", "bunny.png", "calvin.png", "catdoor.png", "centaur.png", "cliff.png", "cow.png", "dragon.png", "dragon2.png", "foghorn.png", "garfield.png", "gary.png", "horse.png", "lizard.png", "mouse.png", "odie.png", "pegasus.png", "renstimpy.png", "spaceman.png"
  ];

  // Function to create a row of images below ASCII headers
  function createImageRow() {
    console.log("Executing createImageRow function.");
    // Updated to include both .ascii-title and .ascii-logo
    const asciiTitles = document.querySelectorAll(".ascii-title, .ascii-logo");
    console.log("Found ASCII titles:", asciiTitles); // Log the ASCII titles to confirm they are being targeted

    if (asciiTitles.length === 0) {
      console.error("No ASCII titles found on the page.");
      return;
    }

    asciiTitles.forEach((title, index) => {
      console.log(`Processing ASCII title ${index + 1}`);

      // Create a container for the image row
      const imageRow = document.createElement("div");
      imageRow.style.display = "flex";
      imageRow.style.justifyContent = "space-between";
      imageRow.style.alignItems = "center";
      imageRow.style.margin = "2rem 0"; // Add consistent spacing
      imageRow.style.overflow = "hidden";
      imageRow.style.width = "100%"; // Set width to 100% of the parent container
      imageRow.style.position = "relative";
      imageRow.style.left = "0"; // Remove offset for better alignment

      // Shuffle the images array to randomize the order
      const shuffledImages = images.sort(() => Math.random() - 0.5);

      // Add images to the row in the randomized order
      for (let i = 0; i < 15; i++) {
        const imgElement = document.createElement("img");
        const randomIndex = i % shuffledImages.length; // Cycle through shuffled images
        imgElement.src = shuffledImages[randomIndex]; // Select a random image
        imgElement.alt = "Random Image";
        imgElement.style.maxWidth = "10vw"; // Scale width relative to viewport
        imgElement.style.height = "auto"; // Maintain aspect ratio
        imgElement.style.margin = "0 1vw"; // Add spacing between images
        imgElement.classList.add("filtered-image"); // Add a class to dynamically generated images
        imageRow.appendChild(imgElement);
      }

      // Insert the image row below the ASCII title
      title.parentNode.insertBefore(imageRow, title.nextSibling);
    });
  }

  // Call the function on page load
  document.addEventListener("DOMContentLoaded", createImageRow);

  // Ensure the container has proper margins to avoid overlap
  const randomImageContainer = document.getElementById('random-image-container');
  if (randomImageContainer) {
    randomImageContainer.style.marginBottom = "3rem"; // Add spacing below the container
  }
})();