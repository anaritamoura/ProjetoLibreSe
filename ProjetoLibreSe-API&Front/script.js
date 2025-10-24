document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // CÓDIGO 1: LÓGICA DO TEMA (Modo Claro/Escuro)
    // ----------------------------------------------------
    
    // Referências aos elementos do Tema
    const toggleButton = document.getElementById('theme-toggle-btn');
    const body = document.body;
    const appLogo = document.getElementById('app-logo');

    // **NOTA:** A classe no CSS que ativa o tema escuro é 'dark-mode'.
    const DARK_MODE_CLASS = 'dark-mode'; 
    const LIGHT_ICON = '☀︎'; 
    const DARK_ICON = '☾';

    // Função para aplicar o tema e atualizar o botão
    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.add(DARK_MODE_CLASS);
            toggleButton.textContent = LIGHT_ICON; 
            if (appLogo) appLogo.src = 'logo_escuro.png';
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove(DARK_MODE_CLASS);
            toggleButton.textContent = DARK_ICON; 
            if (appLogo) appLogo.src = 'logo_claro.png';
            localStorage.setItem('theme', 'light');
        }
    }

    // 1. Lógica ao Clicar no Botão
    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            const isDark = body.classList.contains(DARK_MODE_CLASS);
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
        applyTheme(savedTheme);
    } else if (prefersDark) {
        applyTheme('dark');
    } else {
        applyTheme('light');
    }
    
    // ----------------------------------------------------
    // CÓDIGO 2: LÓGICA DOS BOTÕES (Input/Output)
    // ----------------------------------------------------

    // Referências aos elementos
    const areaDeTexto = document.getElementById('inputTexto');
    // 💡 NOVO: Referência ao container onde as caixas serão adicionadas
    const resultadosContainer = document.getElementById('resultadosContainer'); 
    

    // Função para apagar TUDO (limpar input e esconder resultado)
    function limparTudo() {
        if (areaDeTexto) {
            areaDeTexto.value = '';
        }
        // 💡 NOVO: Limpa todos os resultados gerados dentro do container
        if (resultadosContainer) { 
            resultadosContainer.innerHTML = '';
        }
        // Nota: A caixa principal de VLibras (se houver) não é afetada aqui.
    }
    
    // Função para apagar apenas o INPUT
    function limparInput() {
        if (areaDeTexto) {
            areaDeTexto.value = '';
        }
    }

    // 💡 FUNÇÃO ATUALIZADA: Agora cria e anexa uma nova caixa a cada clique
    function gerarTraducao() {
        if (areaDeTexto && resultadosContainer) {
            const textoParaTraduzir = areaDeTexto.value.trim();

            if (textoParaTraduzir === '') {
                // Em vez de usar alert(), que bloqueia, podemos usar console.error
                console.error('Nenhum texto digitado para gerar.'); 
                return; 
            }
            
            // 1. Cria a nova caixa de resultado (elemento div)
            const novaCaixa = document.createElement('div');
            
            // 2. Aplica a classe de estilo (que você deve criar no CSS) e o conteúdo
            // Usei 'resultado-item' para a classe de estilo no CSS.
            novaCaixa.className = 'resultado-item'; 
            novaCaixa.textContent = textoParaTraduzir; 
            
            // 3. Adiciona a nova caixa ao TOPO do container (prepend para o mais recente ficar em cima)
            resultadosContainer.prepend(novaCaixa);

            // 4. Limpa o input após a geração
            areaDeTexto.value = '';
            
            // 🚨 Seu código de chamada da API de tradução/VLibras viria aqui!
        }
    }


    // ----------------------------------------------------
    // VINCULANDO OS BOTÕES AOS EVENTOS
    // ----------------------------------------------------

    const botaoLimpar = document.getElementById('botaoApagar'); // apagar apenas o texto digitado
    const botaoApagarTudo = document.getElementById('botaoApagarTudo'); //zerar conteúdo de entrada e saída
    const botaoGerar = document.getElementById('botaoGerarTraducao'); //enviar o texto digitado para função que faz a tradução

    if (botaoLimpar) { //ao clicar no botão será executada a função limparinput
        botaoLimpar.addEventListener('click', limparInput);
    }
    
    if (botaoApagarTudo) { //limpar completamente o conteúdo
        botaoApagarTudo.addEventListener('click', limparTudo);
    }

    if (botaoGerar) { //envia o texto digitado para o API do Libras, gerando o resultado traduzido
        botaoGerar.addEventListener('click', gerarTraducao);
    }
    
    
}); // Fim do bloco DOMContentLoaded
