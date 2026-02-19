const frameCount = 240;
const canvas = document.getElementById("animationCanvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Function to get image path
const currentFrame = (index) => {
  const frameNumber = String(index).padStart(3, "0");
  return `frames/ezgif-frame-${frameNumber}.jpg`;
};

// Load first image
const img = new Image();
img.src = currentFrame(1);

img.onload = function () {
  context.drawImage(img, 0, 0, canvas.width, canvas.height);
};

// Preload images
const images = [];
for (let i = 1; i <= frameCount; i++) {
  const image = new Image();
  image.src = currentFrame(i);
  images.push(image);
}

// Update frame based on scroll
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScroll;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.floor(scrollFraction * frameCount)
  );

  const img = images[frameIndex];
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(img, 0, 0, canvas.width, canvas.height);
});
