const passwordInput = document.getElementById('password-input');
const toggleVisibility = document.getElementById('toggle-visibility');
const eyeIcon = document.getElementById('eye-icon');
const strengthRating = document.getElementById('strength-rating');
const strengthBarFill = document.getElementById('strength-bar-fill');
const suggestionsList = document.getElementById('suggestions-list');

const lengthCheck = document.getElementById('length-check');
const uppercaseCheck = document.getElementById('uppercase-check');
const lowercaseCheck = document.getElementById('lowercase-check');
const numberCheck = document.getElementById('number-check');
const symbolCheck = document.getElementById('symbol-check');
const patternCheck = document.getElementById('pattern-check');

toggleVisibility.addEventListener('click', () => {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;

    // Toggle between eye and eye-slash SVG icons
    if (type === 'password') {
        eyeIcon.innerHTML = `
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
            </svg>
        `;
    } else {
        eyeIcon.innerHTML = `
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
            </svg>
        `;
    }
});

// Collapsible info section - start collapsed to save space
const infoTitle = document.querySelector('.info-section h3');
const infoText = document.querySelector('.info-section p');
infoTitle.classList.add('collapsed');
infoText.classList.add('collapsed');

infoTitle.addEventListener('click', () => {
    infoTitle.classList.toggle('collapsed');
    infoText.classList.toggle('collapsed');
});

passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    analyzePassword(password);
});

function analyzePassword(password) {
    if (password.length === 0) {
        resetAnalysis();
        return;
    }

    const checks = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        symbol: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
        pattern: !hasRepeatedPatterns(password) && !hasCommonWeakStructure(password)
    };

    updateCriteriaDisplay(checks);

    const strength = calculateStrength(checks, password);
    updateStrengthDisplay(strength);

    const suggestions = generateSuggestions(checks, password);
    updateSuggestions(suggestions);
}

function hasRepeatedPatterns(password) {
    if (/(.)\1{2,}/.test(password)) {
        return true;
    }

    if (password.length >= 3) {
        for (let i = 0; i <= password.length - 3; i++) {
            const pattern = password.substring(i, i + 3);
            const remaining = password.substring(i + 3);
            if (remaining.includes(pattern)) {
                return true;
            }
        }
    }

    if (/012|123|234|345|456|567|678|789|890/.test(password) ||
        /987|876|765|654|543|432|321|210/.test(password) ||
        /abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/i.test(password)) {
        return true;
    }

    return false;
}

function hasCommonWeakStructure(password) {
    const weakPatterns = [
        /^password/i,
        /^123456/,
        /^qwerty/i,
        /^admin/i,
        /^letmein/i,
        /^welcome/i,
        /^monkey/i,
        /^dragon/i,
        /^master/i,
        /^sunshine/i,
        /^iloveyou/i
    ];

    return weakPatterns.some(pattern => pattern.test(password));
}

function calculateStrength(checks, password) {
    let score = 0;

    if (checks.length) score++;
    if (checks.uppercase) score++;
    if (checks.lowercase) score++;
    if (checks.number) score++;
    if (checks.symbol) score++;
    if (checks.pattern) score++;

    if (password.length >= 12) score++;
    if (password.length >= 16) score++;

    if (score <= 2) return { level: 'Weak', percentage: 25, class: 'weak' };
    if (score <= 4) return { level: 'Average', percentage: 50, class: 'average' };
    if (score <= 6) return { level: 'Strong', percentage: 75, class: 'strong' };
    return { level: 'Very Strong', percentage: 100, class: 'very-strong' };
}

function updateCriteriaDisplay(checks) {
    updateCheckItem(lengthCheck, checks.length);
    updateCheckItem(uppercaseCheck, checks.uppercase);
    updateCheckItem(lowercaseCheck, checks.lowercase);
    updateCheckItem(numberCheck, checks.number);
    updateCheckItem(symbolCheck, checks.symbol);
    updateCheckItem(patternCheck, checks.pattern);
}

function updateCheckItem(element, passed) {
    const icon = element.querySelector('.icon');
    if (passed) {
        element.classList.remove('unchecked');
        element.classList.add('checked');
        icon.textContent = '✓';
    } else {
        element.classList.remove('checked');
        element.classList.add('unchecked');
        icon.textContent = '✗';
    }
}

function updateStrengthDisplay(strength) {
    strengthRating.textContent = strength.level;
    strengthRating.className = strength.class;
    strengthBarFill.style.width = strength.percentage + '%';
    strengthBarFill.className = strength.class;
}

function generateSuggestions(checks, password) {
    const suggestions = [];

    if (!checks.length) {
        suggestions.push('Increase password length to at least 8 characters.');
    } else if (password.length < 12) {
        suggestions.push('Consider using 12 or more characters for better security.');
    }

    if (!checks.uppercase) {
        suggestions.push('Add at least one uppercase letter (A-Z).');
    }

    if (!checks.lowercase) {
        suggestions.push('Add at least one lowercase letter (a-z).');
    }

    if (!checks.number) {
        suggestions.push('Add at least one number (0-9).');
    }

    if (!checks.symbol) {
        suggestions.push('Add at least one symbol (!@#$%^&*, etc.).');
    }

    if (!checks.pattern) {
        suggestions.push('Avoid repeating characters or predictable sequences (e.g., "aaa", "123", "abc").');
    }

    if (hasCommonWeakStructure(password)) {
        suggestions.push('Avoid using common words like "password", "admin", or "welcome".');
    }

    if (suggestions.length === 0) {
        suggestions.push('Great job! Your password is strong.');
        suggestions.push('Remember to use unique passwords for different accounts.');
        suggestions.push('Consider using a password manager to store your passwords securely.');
    }

    return suggestions;
}

function updateSuggestions(suggestions) {
    suggestionsList.innerHTML = '';
    suggestions.forEach(suggestion => {
        const li = document.createElement('li');
        li.textContent = suggestion;
        suggestionsList.appendChild(li);
    });
}

function resetAnalysis() {
    strengthRating.textContent = '-';
    strengthRating.className = '';
    strengthBarFill.style.width = '0%';
    strengthBarFill.className = '';

    [lengthCheck, uppercaseCheck, lowercaseCheck, numberCheck, symbolCheck, patternCheck].forEach(check => {
        updateCheckItem(check, false);
    });

    suggestionsList.innerHTML = '<li>Enter a password to see suggestions</li>';
}
