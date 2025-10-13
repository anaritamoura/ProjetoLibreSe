from source.repositories.libras_repository import ILibrasRepository
from typing import Dict

class InMemoryLibrasRepository(ILibrasRepository):
    def __init__(self):
        self._mappings: Dict[str, str] = {
            "olá": "https://media.giphy.com/media/v1.Y2lkPTc5MGIyZTBjZjI5NTI3ZDFhMTU5NjU5MDk3MmE5NTYwOGQ0OTFmNjA5YTllZDgxNyZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/UoBFp4wT3fOqg/giphy.gif",
            "tudo bem": "https://media.giphy.com/media/v1.Y2lkPTc5MGIyZTBjMDBlMzYwNTU5OWFhYjliZDU4Mjc1NjU1NWQ2ZmFkMjA1ZDNjYTdmYSZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/Yq4dI1u73mQ4f3jM6o/giphy.gif",
            "obrigado": "https://media.giphy.com/media/v1.Y2lkPTc5MGIyZTBjY2ZlYzVkYzY4YTc5YTRiMTM5ZTY4ZWRkODU3MzEyYjlkZTljODAxNiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/d2j9G7x3G3z9F9yqC/giphy.gif",
            "como": "https://media.giphy.com/media/v1.Y2lkPTc5MGIyZTBjYjIxN2U2YmFhZjNlZjI2ZDYxMDc5YmIwZmMwYjY0ZDIxZmIxOTY2YyZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/Lq4v4r8KxJ3i8/giphy.gif",
            "bem vindo": "https://media.giphy.com/media/v1.Y2lkPTc5MGIyZTBjNjFjMWUyNzNlYmI0MjAwZTE1OWExODVjMTYzNDFhNGMyYmE1N2YxMSZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/d2j9G7x3G3z9F9yqC/giphy.gif"
        }

    def get_all_mappings(self) -> Dict[str, str]:
        return self._mappings.copy()  # Retorna cópia para imutabilidade
    