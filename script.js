const passwordInput = document.getElementById('password');
const strengthBar = document.getElementById('strength-bar');
const strengthText = document.getElementById('strength-text');
const tipsList = document.getElementById('tips');

passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    const strength = calculateStrength(password);
    updateBar(strength);
    updateText(strength);
    updateTips(password);
});

function calculateStrength(password) {
    let score = 0;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score+;
    if (/[0-9]/.test(password)) score++;
    if (/[\W]/.test(password)) score++;
    return score;
}

function updateBar(score) {
    const bar = document.createElement('div');
    bar.style.width = (score*20) + '%';
    bar.style.background = score < 3 ? 'red' : score < 5 ? 'orange' : 'green';
    strengthBar.innerHTML = '';
    strengthBar.appendChild(bar);
}

function updateText(score) {
    const text = score < 3 ? 'Fraca ❌' : score < 5 ? 'Média ⚠️' : 'Forte ✅';
    strengthText.textContent = text;
}

function updateTips(password) {
    const tips = [];
    if (password.length < 12) tips.push('Use pelo menos 8 caracteres.');
    if (!/[A-Z]/.test(password)) tips.push('Adicione letras maiúsculas.');
    if (!/[a-z]/.test(password)) tips.push('Adicione letras minúsculas.');
    if (!/[0-9]/.test(password)) tips.push('Inclua números.');
    if (!/[\W]/.test(password)) tips.push('Inclua caracteres especiais.');
    
    tipsList.innerHTML = '';
    tips.forEach(tip => {
        const li = document.createElement('li');
        li.textContent = tip;
        tipsList.appendChild(li);
    });
}
