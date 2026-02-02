// Copy install command
function copyInstallCommand() {
    const cmd = document.getElementById('install-cmd').textContent;
    copyToClipboard(cmd, event.target);
}

// Copy code from code blocks
function copyCode(button) {
    const codeBlock = button.previousElementSibling;
    const code = codeBlock.textContent;
    copyToClipboard(code, button);
}

// Copy to clipboard utility
function copyToClipboard(text, button) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text)
            .then(() => showCopyFeedback(button))
            .catch(err => {
                console.error('Failed to copy:', err);
                fallbackCopy(text, button);
            });
    } else {
        fallbackCopy(text, button);
    }
}

// Fallback copy method for older browsers
function fallbackCopy(text, button) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
        showCopyFeedback(button);
    } catch (err) {
        console.error('Fallback copy failed:', err);
    }
    document.body.removeChild(textarea);
}

// Show copy feedback
function showCopyFeedback(button) {
    const originalHTML = button.innerHTML;
    button.innerHTML = '<i data-lucide="check" class="w-4 h-4"></i><span>Copied!</span>';
    lucide.createIcons();
    button.classList.add('bg-green-500');
    button.classList.remove('bg-orange-500', 'hover:bg-orange-600');
    
    setTimeout(() => {
        button.innerHTML = originalHTML;
        lucide.createIcons();
        button.classList.remove('bg-green-500');
        button.classList.add('bg-orange-500', 'hover:bg-orange-600');
    }, 2000);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});
