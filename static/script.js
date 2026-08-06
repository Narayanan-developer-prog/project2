const generateBtn = document.getElementById("generateBtn");
const qrText = document.getElementById("qrText");
const qrImage = document.getElementById("qrImage");
const downBtn = document.getElementById("downBtn");
console.log(qrText);

generateBtn.addEventListener("click", () => {
    const text = qrText.value.trim();

    if (text === "") {
        alert("Please enter a URL or Text");
        return;
    }

    
    const qrUrl =
        "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=" +
        encodeURIComponent(text);

    qrImage.src = qrUrl;
    qrImage.style.display = "block";

    
    downBtn.href = qrUrl;
});