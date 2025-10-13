document.addEventListener('DOMContentLoaded', () => {
    // Referências aos elementos
    const toggleButton = document.getElementById('theme-toggle-btn');
    const body = document.body;
    const appLogo = document.getElementById('app-logo');
    const inputTextArea = document.getElementById('textInput'); // NOVO: Referência à área de texto
    const btnApagar = document.getElementById('btn-apagar'); // NOVO: Referência ao botão Apagar
    const caixaVideo = document.getElementById('caixa-traducao-video'); // NOVO: Referência à caixa de saída

    // Variáveis de Tema
    const DARK_MODE_CLASS = 'dark-mode'; 
    const LIGHT_ICON = '☀︎';
    const DARK_ICON = '☾';

    // --- LÓGICA DE TEMA (Mantida) ---
    function applyTheme(theme) { /* ... lógica de tema ... */
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

    // Lógica de click do Toggle
    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            const isDark = body.classList.contains(DARK_MODE_CLASS);
            applyTheme(isDark ? 'light' : 'dark');
        });
    }

    // Lógica de Carregamento de Tema
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (prefersDark) {
        applyTheme('dark');
    } else {
        applyTheme('light');
    }
    
    // --- LÓGICA DE TRADUÇÃO (AJUSTADA) ---
    // A função precisa ser acessível globalmente se for chamada via onclick="traduzirTexto()"
    window.traduzirTexto = async function() {
        const text = inputTextArea.value.trim();
        
        // 1. Validação
        if (!text) {
            caixaVideo.innerHTML = '<p style="color: red;">Por favor, digite algum texto para traduzir.</p>';
            return;
        }

        // Limpa e mostra que está carregando
        caixaVideo.innerHTML = '<p>Carregando tradução...</p>';

        try {
            // 2. Chama o endpoint do Flask
            const response = await fetch('/api/translate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text: text })
            });

            const data = await response.json();

            if (!response.ok) {
                // Lida com erros do Flask (400, 500 ou erro da API VLibras)
                caixaVideo.innerHTML = `<p style="color: red;">Erro: ${data.error || 'Erro desconhecido na tradução.'}</p>`;
                return;
            }

            // 3. Processa a Resposta do VLibras
            // A API VLibras que você está usando retorna o link do vídeo final na chave 'result'
            const videoUrl = data.result; 

            if (!videoUrl) {
                 caixaVideo.innerHTML = '<p style="color: red;">A API do VLibras não retornou um link de vídeo válido para esta frase.</p>';
                 return;
            }

            // 4. Injeta o Elemento <video>
            caixaVideo.innerHTML = ''; // Limpa o "Carregando..."

            const videoElement = document.createElement('video');
            videoElement.setAttribute('controls', ''); // Mostra os controles de play/pause
            videoElement.setAttribute('autoplay', ''); // Tenta tocar automaticamente
            videoElement.setAttribute('loop', ''); // O vídeo deve ser repetido
            videoElement.setAttribute('src', videoUrl);
            videoElement.style.width = '100%'; 
            videoElement.style.height = '100%'; 
            videoElement.style.objectFit = 'contain';

            caixaVideo.appendChild(videoElement);

        } catch (error) {
            console.error('Erro de conexão ou execução:', error);
            caixaVideo.innerHTML = `<p style="color: red;">Erro de conexão com o servidor: ${error.message}</p>`;
        }
    }

    // --- LÓGICA DE APAGAR (Adicionada) ---
    if (btnApagar) {
        btnApagar.addEventListener('click', () => {
            inputTextArea.value = ''; // Limpa a área de texto
            caixaVideo.innerHTML = '<p>A tradução em LIBRAS (vídeo) aparecerá aqui.</p>'; // Volta ao texto inicial
        });
    }

});