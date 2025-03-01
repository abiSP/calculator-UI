const resultInput = document.getElementById('result');
let memory = 0;
let history = [];

// Toggle themes
const themeSwitch = document.getElementById('theme-switch');
themeSwitch.addEventListener('change', () => {
    document.body.classList.toggle('dark', themeSwitch.checked);
    document.body.classList.toggle('light', !themeSwitch.checked);
});

// Buttons logic
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', (e) => {
        const value = e.target.textContent;
        
        // Handle memory operation (M+)
        if (value === "M+") {
            memory = parseFloat(resultInput.value);
            return;
        }

        // Handle clear
        if (value === 'C') {
            resultInput.value = '';
            return;
        }

        // Handle equal
        if (value === '=') {
            try {
                const result = eval(resultInput.value);
                resultInput.value = result;
                history.push(`${resultInput.value} = ${result}`);
                updateHistory();
            } catch (err) {
                resultInput.value = 'Error';
            }
            return;
        }

        // Handle scientific functions
        if (['sin', 'cos', 'tan', 'log', '√'].includes(value)) {
            let inputValue = parseFloat(resultInput.value);
            let result;
            if (value === 'sin') result = Math.sin(inputValue);
            if (value === 'cos') result = Math.cos(inputValue);
            if (value === 'tan') result = Math.tan(inputValue);
            if (value === 'log') result = Math.log(inputValue);
            if (value === '√') result = Math.sqrt(inputValue);
            resultInput.value = result;
            return;
        }

        // Handle adding numbers and operators to input
        resultInput.value += value;
    });
});

// Update history UI
function updateHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = history.map(item => `<li>${item}</li>`).join('');
}
