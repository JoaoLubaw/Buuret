from rest_framework import permissions


class IsUserOrReadOnly(permissions.BasePermission):
    """
    Permissão personalizada para permitir que apenas o usuário proprietário
    atualize seus próprios dados.
    """

    def has_object_permission(self, request, view, obj):
        # Permite métodos de leitura (GET, HEAD, OPTIONS)
        if request.method in permissions.SAFE_METHODS:
            return True

        # Permite atualizações se o usuário for o proprietário do objeto
        return obj == request.user
