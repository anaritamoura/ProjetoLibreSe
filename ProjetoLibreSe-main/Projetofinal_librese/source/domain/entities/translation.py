from dataclasses import dataclass
from typing import List

@dataclass(frozen=True)
class WordMapping:
    """Entidade que representa o mapeamento de uma palavra ou frase para um vídeo em Libras."""
    key: str # Palavra ou frase
    video_url: str  

@dataclass
class TranslationResult:
    """Resultado de uma tradução: lista de URLs de vídeos."""
    video_urls: List[str]
    