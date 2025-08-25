const password = document.getElementById("password");
const strengthBar = document.getElementById("strength-bar");
const strengthText = document.getElementById("strength-text");
const tips = document.getElementById("tips");
const togglePassword = document.getElementById("toggle-password");

// Função para alternar visibilidade da senha
togglePassword.addEventListener("click", () => {
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
    togglePassword.textContent = type === "password" ? "👁️" : "🙈";
});

// Função de verificação
password.addEventListener("input", checkPassword);

function checkPassword() {
    const val = password.value;
    let strength = 0;
    let requirements = [];

    if (val.length >= 12) strength++;
    else requirements.push("Use pelo menos 12 caracteres");

    if (/[A-Z]/.test(val)) strength++;
    else requirements.push("Adicione letras maiúsculas");

    if (/[0-9]/.test(val)) strength++;
    else requirements.push("Adicione números");

    if (/[^A-Za-z0-9]/.test(val)) strength++;
    else requirements.push("Use símbolos (!@#$%)");

    // Atualiza barra
    let bar = strengthBar.querySelector("div");
    if (!bar) {
        bar = document.createElement("div");
        strengthBar.appendChild(bar);
    }
    bar.style.width = (strength * 25) + "%";

    let color, text;
    switch (strength) {
        case 0:
        case 1:
            color = "red";
            text = "Senha fraca ❌";
            break;
        case 2:
            color = "orange";
            text = "Senha média ⚠️";
            break;
        case 3:
            color = "dodgerblue";
            text = "Senha boa 👍";
            break;
        case 4:
            color = "green";
            text = "Senha forte ✅";
            break;
    }
    bar.style.background = color;
    strengthText.textContent = text;

    // Atualiza dicas
    tips.innerHTML = requirements.map(r => `<li>${r}</li>`).join("");
}

// Função para gerar senhas seguras
function generatePassword(length = 16) {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{};:,.<>?";
    let newPass = "";
    for (let i = 0; i < length; i++) {
        newPass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return newPass;
}

// Botão de gerar senha
document.getElementById("generate-btn").addEventListener("click", () => {
    const newPass = generatePassword(16);
    password.value = newPass;
    // Mostra a senha gerada automaticamente
    password.setAttribute("type", "text");
    togglePassword.textContent = "🙈";
    checkPassword(); // força verificação
});
