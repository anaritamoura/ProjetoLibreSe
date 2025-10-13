from flask import Blueprint, request, jsonify, render_template
from source.use_cases.translate_text_to_libras import TranslateTextToLibrasUseCase

translation_bp = Blueprint('translation', __name__)

class TranslationController:
    def __init__(self, translate_use_case: TranslateTextToLibrasUseCase):
        self.translate_use_case = translate_use_case
        self.register_routes()

    def register_routes(self):
        @translation_bp.route('/')
        def index():
            return render_template('index.html')

        @translation_bp.route('/traduzir_texto', methods=['POST'])
        def traduzir_texto_para_libras():
            data = request.get_json()
            if not data or 'texto' not in data:
                return jsonify({"error": "Nenhum texto fornecido"}), 400

            result = self.translate_use_case.execute(data['texto'])
            return jsonify({"videos": result.video_urls})

        @translation_bp.route('/dicionario_libras', methods=['GET'])
        def obter_dicionario():
            # Para expor o dicionário, mas em Clean Arch, evite expor dados crus; use um use case se necessário
            mappings = self.translate_use_case.repository.get_all_mappings()  # Acessa via use case's repo
            return jsonify(mappings)

        @translation_bp.route('/traduzir_libras_para_texto', methods=['POST'])
        def traduzir_libras_para_texto():
            # Stub: Crie um use case para isso no futuro
            return jsonify({"texto": ""})

        @translation_bp.route('/traduzir_voz_para_libras', methods=['POST'])
        def traduzir_voz_para_libras():
            # Stub: Crie um use case para isso no futuro
            return jsonify({"videos": []})
        