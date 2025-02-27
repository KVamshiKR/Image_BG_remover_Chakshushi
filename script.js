const imageUpload = document.getElementById("imageUpload");
const removeBgBtn = document.getElementById("removeBgBtn");
const resultImage = document.getElementById("resultImage");
const downloadLink = document.getElementById("downloadLink");
const resultContainer = document.getElementById("resultContainer");
const droparea = document.getElementById("droparea");


const API_KEY = "32XjoLf9Dd9KiLnjYTcCe8o1";


imageUpload.addEventListener("change", doimageUpload);

function doimageUpload(){
  const file = imageUpload.files[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file);
    resultImage.src = imageUrl;
    resultImage.style.display = "block";
  }
};


droparea.addEventListener("dragover",(e) => {
  e.preventDefault();
  });

  droparea.addEventListener("drop",(e) => {
    e.preventDefault();
    imageUpload.files = e.dataTransfer.files;
    doimageUpload();

   });

removeBgBtn.addEventListener("click", async () => {
  const file = imageUpload.files[0];
  if (!file) {
    alert("Please upload an image first.");
    return;
  }

  const formData = new FormData();
  formData.append("image_file", file);

  try {
    const response = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: {
        "X-Api-Key": API_KEY,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to remove background.");
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    resultImage.src = url;
    downloadLink.href = url;


  } catch (error) {
    console.error(error);
    alert("An error occurred while removing the background.");
  }
});
