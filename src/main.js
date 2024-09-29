document.addEventListener("DOMContentLoaded", () => {
    const chatArea = document.getElementById("chat-area");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");

    sendButton.addEventListener("click", async () => {
        const userText = userInput.value;
        if (userText.trim() === "") return;

        // Muestra el texto del usuario en el área del chat
        chatArea.innerHTML += `<div class="text-end"><b>Tú (en inglés):</b> ${userText}</div>`;

        // Llamada a la API para traducir el texto
        const translatedText = await translateText(userText);

        // Mostrar traducción en alemán
        chatArea.innerHTML += `<div class="text-end"><b>Tú (en alemán):</b> ${translatedText}</div>`;

        // Obtener respuesta simulada del amigo
        const friendResponse = getFriendResponse();

        // Mostrar respuesta del amigo
        chatArea.innerHTML += `<div class="text-start"><b>Amigo (en alemán):</b> ${friendResponse}</div>`;

        userInput.value = "";
        chatArea.scrollTop = chatArea.scrollHeight;
    });

    // Función para traducir texto usando la API
    async function translateText(text) {
        try {
            const response = await fetch("/api/translate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text })
            });
            const data = await response.json();
            return data.translatedText;
        } catch (error) {
            console.error("Error en la traducción:", error);
            return "Error en la traducción";
        }
    }

    // Función simulada para obtener una respuesta del amigo
    function getFriendResponse() {
        const responses = [
            "Das ist interessant!",
            "Ich finde das toll.",
            "Das verstehe ich.",
            "Was denkst du darüber?",
            "Kannst du mehr darüber erzählen?"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }
});
