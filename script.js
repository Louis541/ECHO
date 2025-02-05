// Redirect to About Page
document.getElementById("aboutButton").addEventListener("click", () => {
    window.location.href = "about.html"; // Redirects to the About page
});

document.querySelectorAll(".word").forEach(word => {
    let originalText = word.textContent.trim();
    word.innerHTML = ""; // Clear text

    // Convert each letter into a span
    let letters = originalText.split("").map(letter => {
        let span = document.createElement("span");
        span.textContent = letter;
        return span;
    });

    // Append letters back
    letters.forEach(span => word.appendChild(span));

    // Mouse Enter (Expand & Remove Blur)
    word.addEventListener("mouseenter", () => {
        let windowWidth = window.innerWidth; // Get the screen width
        let wordWidth = word.offsetWidth; // Get the word's current width
        let maxExpansion = (windowWidth - wordWidth) / 2; // Calculate how far it can expand

        word.style.filter = "blur(0)"; // Instantly remove blur

        letters.forEach((span, index) => {
            let moveAmount = ((index / (letters.length - 1)) - 0.5) * maxExpansion * 2; // Distribute movement evenly

            // Ensure letters don't go beyond the screen width
            moveAmount = Math.max(-maxExpansion, Math.min(maxExpansion, moveAmount));

            // Reset transition for instant effect
            span.style.transition = "none";
            requestAnimationFrame(() => {
                span.style.transform = `translateX(${moveAmount}px)`;
                span.style.color = "#fc4600";
                span.style.transition = "transform 0.1s ease-out, color 0.1s ease-out";
            });
        });
    });

    // Mouse Leave (Slowly Shrink & Blur Again)
    word.addEventListener("mouseleave", () => {
        letters.forEach((span) => {
            span.style.transition = "transform 10s linear, color 10s linear"; // Slow return
            span.style.transform = "translateX(0)"; // Back to original position
            span.style.color = "black"; // Restore original color
        });

        // Delay blur effect to happen after shrink animation completes
        setTimeout(() => {
            word.style.filter = "blur(8px)";
        }, 10000); // 10 seconds later, blur back
    });
});



// Blur for Timestamp
document.getElementById("timestamp").addEventListener("mouseenter", function() {
    this.style.filter = "blur(0)";
});

document.getElementById("timestamp").addEventListener("mouseleave", function() {
    setTimeout(() => {
        this.style.filter = "blur(8px)";
    }, 3000); // Blur again after 3 seconds
});

// About Page Redirection
document.getElementById("aboutButton").addEventListener("mouseenter", function() {
    this.style.filter = "blur(0)";
});

document.getElementById("aboutButton").addEventListener("mouseleave", function() {
    setTimeout(() => {
        this.style.filter = "blur(8px)";
    }, 3000);
});


// Real-time Timestamp (Providence, RI Time - Eastern Time Zone)
function updateTimestamp() {
    const now = new Date();
    
    // Convert to UTC and adjust for Eastern Time Zone (ET - UTC-5 / UTC-4 during DST)
    const options = {
        timeZone: "America/New_York", // Providence is in the New York time zone
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false // 24-hour format
    };

    const formattedTime = new Intl.DateTimeFormat("en-GB", options).format(now);
    const formattedDate = now.getFullYear();

    document.getElementById("timestamp").textContent = `${formattedTime}, PVD, ${formattedDate}`;
}

setInterval(updateTimestamp, 1000);
updateTimestamp();




document.querySelectorAll(".word").forEach(word => {
    word.addEventListener("click", () => {
        const modal = document.getElementById("modal");
        const modalTitle = document.getElementById("modalTitle");
        const modalDescription = document.getElementById("modalDescription");
        const modalDate = document.getElementById("modalDate");

        const fullText = word.getAttribute("data-description");
        const splitText = fullText.lastIndexOf(",");
        const description = fullText.substring(0, splitText);
        const date = fullText.substring(splitText + 1).trim();

        modalTitle.textContent = word.getAttribute("data-word");
        modalDescription.textContent = description;
        modalDate.textContent = date;

        // Get the user's current viewport position
        const viewportTop = window.scrollY; // How far the user has scrolled
        const viewportHeight = window.innerHeight; // Visible screen height

        // Generate random positions **within** the viewport
        const randomX = Math.random() * (window.innerWidth - 400); // Prevent overflow
        const randomY = viewportTop + Math.random() * (viewportHeight - 200); // Stay in view

        modal.style.left = `${randomX}px`;
        modal.style.top = `${randomY}px`;
        modal.style.display = "block";
    });
});

// Close modal functionality
document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("modal").style.display = "none";
});

// Close modal when clicking outside the box
window.addEventListener("click", (event) => {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
});


// ECHO Animation Effect
const letters = document.querySelectorAll(".echo");
let index = 0;

function animateEcho() {
    // Reset all letters to normal size
    letters.forEach(letter => letter.style.transform = "scale(1)");

    // Shrink the current letter
    letters[index].style.transform = "scale(0.6)"; // Adjust shrink size

    // Move to the next letter
    index = (index + 1) % letters.length;
}

// Speed up for smooth wave effect
setInterval(animateEcho, 150);




document.addEventListener("DOMContentLoaded", function () {
    const words = document.querySelectorAll(".word");

    // Array of echo sound file paths
    const echoSounds = [
        "sounds/echo-105584.mp3",
        "sounds/echo-pop-3-189794.mp3",
        "sounds/echo-pop-1-189792.mp3",
        "sounds/echo-pop-5-189795.mp3",
        "sounds/echo-pop-4-189796.mp3",
        "sounds/echo-pop-2-189793.mp3",

    ];

    words.forEach(word => {
        let originalText = word.textContent.trim();
        word.innerHTML = ""; // Clear text

        // Convert each letter into a span for animation
        let letters = originalText.split("").map(letter => {
            let span = document.createElement("span");
            span.textContent = letter;
            return span;
        });

        letters.forEach(span => word.appendChild(span));

        // Mouse Enter (Expand, Remove Blur, and Play Random Echo Sound)
        word.addEventListener("mouseenter", () => {
            let windowWidth = window.innerWidth;
            let wordWidth = word.offsetWidth;
            let maxExpansion = (windowWidth - wordWidth) / 2;

            word.style.filter = "blur(0)";

            letters.forEach((span, index) => {
                let moveAmount = ((index / (letters.length - 1)) - 0.5) * maxExpansion * 2;
                moveAmount = Math.max(-maxExpansion, Math.min(maxExpansion, moveAmount));

                span.style.transition = "none";
                requestAnimationFrame(() => {
                    span.style.transform = `translateX(${moveAmount}px)`;
                    span.style.color = "#fc4600";
                    span.style.transition = "transform 0.1s ease-out, color 0.1s ease-out";
                });
            });

            // Play a random echo sound
            const soundPath = echoSounds[Math.floor(Math.random() * echoSounds.length)];
            const audio = new Audio(soundPath);
            audio.play();
        });

        // Mouse Leave (Shrink, Blur Again After 5 Seconds)
        word.addEventListener("mouseleave", () => {
            letters.forEach((span) => {
                span.style.transition = "transform 10s linear, color 10s linear";
                span.style.transform = "translateX(0)";
                span.style.color = "black";
            });

            setTimeout(() => {
                word.style.filter = "blur(8px)";
            }, 10000); // Blur returns after 5 seconds
        });
    });
});