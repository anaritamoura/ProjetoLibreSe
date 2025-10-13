from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import requests
import requests.exceptions # Garantir que está importado para o try/except

# Importe seu dicionário local
from source.infrastructure.persistence.bd import dicionario_libras

app = Flask(__name__, template_folder="templates")
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')


# repository = InMemoryLibrasRepository()
# translate_use_case = TranslateTextToLibrasUseCase(repository)
# TranslationController(translate_use_case)
# app.register_blueprint(translation_bp)

@app.route('/api/translate', methods=['POST'])
def translate_to_libras():
    text_input = ""
    normalized_text = ""
    
    try:
        data = request.get_json()
        text_input = data.get('text', '')
        normalized_text = text_input.strip().lower() # Normaliza para o dicionário local

        if not normalized_text:
            return jsonify({'error': 'Texto não informado'}), 400

        # 1. TENTATIVA COM A API EXTERNA (VLibras)
        try:
            response = requests.post(
                "https://traducao.vlibras.gov.br/api/v1/translate",
                json={"text": text_input, "locale": "pt-br"},
                timeout=5 # Adiciona timeout
            )

            if response.status_code == 200:
                # SUCESSO na API VLibras
                return jsonify(response.json())
            
            # Se a API retornou um erro (incluindo o 404), tratamos como falha e tentamos o fallback
            print(f"DEBUG: VLibras API retornou status {response.status_code}. Tentando dicionário local.")

        except requests.exceptions.RequestException as e:
            # Erro de conexão de rede ou timeout
            print(f"DEBUG: Erro de conexão com VLibras API ({e.__class__.__name__}). Tentando dicionário local.")
            pass 

        
        # 2. TENTATIVA COM O DICIONÁRIO INTERNO
        if normalized_text in dicionario_libras:
            # SUCESSO no dicionário local
            video_url = dicionario_libras[normalized_text]
            # O JS espera a chave 'result'
            return jsonify({"result": video_url})
        
        # 3. FALHA TOTAL
        error_detail = f"Status code: {response.status_code}" if 'response' in locals() else "Erro de rede."
        return jsonify({'error': f'Tradução falhou. A API VLibras está inacessível ({error_detail}) e o texto não está no dicionário local.'}), 503

    except Exception as e:
        return jsonify({'error': f'Erro interno: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True)