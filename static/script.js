const qrText = document.getElementById("qrText");
const generateBtn = document.getElementById("generateBtn");
const qrImage = document.getElementById("qrImage");
const downBtn = document.getElementById("downBtn");

// Hide download link until a QR is generated
downBtn.style.display = "none";

async function generateQR() {
    const text = qrText.value.trim();

    if (text === "") {
        alert("Please enter a URL or text!");
        qrText.focus();
        return;
    }

    generateBtn.textContent = "Generating...";
    generateBtn.disabled = true;

    const apiUrl =
        "https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=10&data=" +
        encodeURIComponent(text);

    try {
        // Fetch as blob so the download button works (cross-origin download fix)
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("QR request failed");

        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);

        qrImage.src = blobUrl;
        qrImage.style.display = "block";

        downBtn.href = blobUrl;
        downBtn.style.display = "block";
    } catch (error) {
        alert("Could not generate QR code. Check your internet connection.");
    } finally {
        generateBtn.textContent = "Generate QR Code";
        generateBtn.disabled = false;
    }
}

generateBtn.addEventListener("click", generateQR);

// Press Enter to generate
qrText.addEventListener("keydown", (e) => {
    if (e.key === "Enter") generateQR();
});