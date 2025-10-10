from flask import Flask, render_template
from flask_cors import CORS
from source.infrastructure.persistence.in_memory_libras_repository import InMemoryLibrasRepository
from source.use_cases.translate_text_to_libras import TranslateTextToLibrasUseCase
from source.infrastructure.web.translation_controller import translation_bp, TranslationController

app = Flask(__name__, template_folder="templates")
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

repository = InMemoryLibrasRepository()
translate_use_case = TranslateTextToLibrasUseCase(repository)
TranslationController(translate_use_case)

app.register_blueprint(translation_bp)

if __name__ == '__main__':
    app.run(debug=True)
    