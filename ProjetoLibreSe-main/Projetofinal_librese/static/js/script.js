document.addEventListener('DOMContentLoaded', () => {
    // Referências aos elementos
    const toggleButton = document.getElementById('theme-toggle-btn');
    const body = document.body;
    const appLogo = document.getElementById('app-logo');
    const inputTextArea = document.getElementById('textInput'); 
    const btnApagar = document.getElementById('btn-apagar'); 
    const caixaVideo = document.getElementById('caixa-traducao-video'); 

    // Variáveis de Tema
    const DARK_MODE_CLASS = 'dark-mode'; 
    const LIGHT_ICON = '☀︎';
    const DARK_ICON = '☾';

    // --- LÓGICA DE TEMA ---
    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.add(DARK_MODE_CLASS);
            toggleButton.textContent = LIGHT_ICON; 
            if (appLogo) appLogo.src = '/static/images/logo_escuro.png';
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove(DARK_MODE_CLASS);
            toggleButton.textContent = DARK_ICON; 
            if (appLogo) appLogo.src = '/static/images/logo_claro.png';
            localStorage.setItem('theme', 'light');
        }
    }

    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            const isDark = body.classList.contains(DARK_MODE_CLASS);
            applyTheme(isDark ? 'light' : 'dark');
        });
    }

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (prefersDark) {
        applyTheme('dark');
    } else {
        applyTheme('light');
    }

    // --- LÓGICA DE TRADUÇÃO (com integração VLibras) ---
    window.traduzirTexto = function() {
        const text = inputTextArea.value.trim();

        if (!text) {
            caixaVideo.innerHTML = '<p style="color:red;">Por favor, digite um texto para traduzir.</p>';
            return;
        }

        // Mostra mensagem de carregamento
        caixaVideo.innerHTML = `<p style="color:#003bb3;">Traduzindo: "${text}"</p>`;

        // Aguarda e envia o texto ao VLibras
        setTimeout(() => {
            const span = document.createElement('span');
            span.setAttribute('vw-text', text);
            span.style.display = 'none';
            document.body.appendChild(span);

            // Recarrega o interpretador VLibras
            if (window.VLibras && window.VLibras.Widget) {
                new window.VLibras.Widget('https://vlibras.gov.br/app');
                console.log("VLibras ativo e texto enviado.");
            } else {
                console.warn("VLibras ainda não carregou.");
            }
        }, 500);
    };

    // --- LÓGICA DE APAGAR ---
    if (btnApagar) {
        btnApagar.addEventListener('click', () => {
            inputTextArea.value = ''; 
            caixaVideo.innerHTML = '<p>A tradução em LIBRAS (vídeo) aparecerá aqui.</p>';
        });
    }
});
