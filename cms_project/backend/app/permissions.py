from rest_framework.permissions import BasePermission, SAFE_METHODS
import unicodedata

def normalize(s: str) -> str:
    if not s:
        return ""
    s = s.lower().strip()
    s = unicodedata.normalize("NFKD", s)
    return "".join(c for c in s if not unicodedata.combining(c))


class IsSuperuserOrReadOnly(BasePermission):
    """
    Admin pode tudo, visitantes só leem
    """
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_superuser)


class GrupoPermission(BasePermission):
    """
    - visitante → só leitura
    - superuser → tudo
    - usuário → só cria/edita concursos da sua área
    """

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        
        return bool(request.user and request.user.is_authenticated)

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        user = request.user
        
        if not user or not user.is_authenticated:
            return False
        
        if user.is_superuser:
            return True
        
        # usuário só pode editar se o concurso for da sua área
        user_groups = [normalize(g) for g in user.groups.values_list('name', flat=True)]
        area_name = normalize(obj.area.nome)

        return area_name in user_groups
