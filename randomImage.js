// Wrap the entire script in an IIFE to avoid polluting the global namespace
(function() {
  // Debugging log to confirm script execution
  console.log("Random image script loaded.");

  // List of image file names
  const images = [
    "alien.webp", "bettyboop.webp", "bunny.webp", "calvin.webp", "catdoor.webp", "centaur.webp", "cliff.webp", "cow.webp", "dragon.webp", "dragon2.webp", "foghorn.webp", "garfield.webp", "gary.webp", "horse.webp", "lizard.webp", "mouse.webp", "odie.webp", "pegasus.webp", "renstimpy.webp", "spaceman.webp"
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

      // Add responsive <picture> elements to the row in the randomized order
      for (let i = 0; i < 15; i++) {
        const randomIndex = i % shuffledImages.length;
        const baseName = shuffledImages[randomIndex].replace(/\.webp$/, "");

        const picture = document.createElement("picture");

        const source = document.createElement("source");
        source.media = "(max-width: 600px)";
        source.srcset = `mobile-${baseName}.webp`;
        picture.appendChild(source);

        const img = document.createElement("img");
        img.src = `desktop-${baseName}.webp`;
        img.alt = "Random Image";
        img.width = 400; // Set a default width for layout stability (adjust as needed)
        img.height = 400; // Set a default height for layout stability (adjust as needed)
        img.style.maxWidth = "10vw";
        img.style.height = "auto";
        img.style.margin = "0 1vw";
        img.classList.add("filtered-image");
        picture.appendChild(img);

        imageRow.appendChild(picture);
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