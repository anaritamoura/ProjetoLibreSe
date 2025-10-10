document.addEventListener('DOMContentLoaded', () => {
    // Referências aos elementos
    const toggleButton = document.getElementById('theme-toggle-btn');
    const body = document.body;
    const appLogo = document.getElementById('app-logo');

    // **NOTA:** A classe no CSS que ativa o tema escuro é 'dark-mode'.
    const DARK_MODE_CLASS = 'dark-mode'; 
    const LIGHT_ICON = '☀︎'; // Usado para sugerir mudança para o tema Claro (quando está no Escuro)
    const DARK_ICON = '☾';  // Usado para sugerir mudança para o tema Escuro (quando está no Claro)


    // Função para aplicar o tema e atualizar o botão
    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.add(DARK_MODE_CLASS);
            // Mostrar o ícone do SOL, sugerindo que o usuário pode voltar para o Claro
            toggleButton.textContent = LIGHT_ICON; 
            
            // Verifica se o elemento existe antes de tentar mudar a src
            if (appLogo) appLogo.src = '/static/images/logo_escuro.png';
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove(DARK_MODE_CLASS);
            // Mostrar o ícone da LUA, sugerindo que o usuário pode ir para o Escuro
            toggleButton.textContent = DARK_ICON; 
            
            if (appLogo) appLogo.src = '/static/images/logo_claro.png';
            localStorage.setItem('theme', 'light');
        }
    }

    // 1. Lógica ao Clicar no Botão
    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            // Verifica se o modo atual é Escuro (usando a classe correta)
            const isDark = body.classList.contains(DARK_MODE_CLASS);
            
            // Aplica o tema oposto
            if (isDark) {
                applyTheme('light');
            } else {
                applyTheme('dark');
            }
        });
    }


    // 2. Lógica ao Carregar a Página (Para manter a preferência do usuário)
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        // Se a preferência foi salva, aplica
        applyTheme(savedTheme);
    } else if (prefersDark) {
        // Se o navegador prefere Escuro e não há preferência salva, aplica Escuro
        applyTheme('dark');
    } else {
        // Padrão: Claro
        applyTheme('light');
    }
});