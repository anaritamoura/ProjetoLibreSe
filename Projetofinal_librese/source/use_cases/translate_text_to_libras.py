from typing import List
from source.domain.entities.translation import TranslationResult
from source.repositories.libras_repository import ILibrasRepository

class TranslateTextToLibrasUseCase:
    def __init__(self, repository: ILibrasRepository):
        self.repository = repository

    def execute(self, text: str) -> TranslationResult:
        if not text.strip():
            return TranslationResult(video_urls=[])

        text = text.lower().strip()
        words = text.split()

      
        mappings = self.repository.get_all_mappings()

      
        sorted_keys = sorted(mappings.keys(), key=lambda k: -len(k.split()))

        video_urls: List[str] = []
        i = 0
        while i < len(words):
            found = False
            for key in sorted_keys:
                key_words = key.split()
                if i + len(key_words) <= len(words) and words[i:i + len(key_words)] == key_words:
                    url = mappings.get(key)
                    if url:
                        video_urls.append(url)
                    i += len(key_words)
                    found = True
                    break
            if not found:
                url = mappings.get(words[i])
                if url:
                    video_urls.append(url)
                i += 1

        return TranslationResult(video_urls=video_urls)
    