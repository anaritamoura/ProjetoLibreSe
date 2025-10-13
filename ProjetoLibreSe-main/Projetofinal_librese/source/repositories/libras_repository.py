from abc import ABC, abstractmethod
from typing import Dict

class ILibrasRepository(ABC):
    """Interface para repositório de mapeamentos Libras."""

    @abstractmethod
    def get_all_mappings(self) -> Dict[str, str]:
        """Retorna todos os mapeamentos de palavras/frases para URLs de vídeos."""
        pass
    