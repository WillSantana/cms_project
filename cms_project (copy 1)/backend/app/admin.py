from django.contrib import admin
from .models import Concurso, Area
import unicodedata


def normalize(s: str) -> str:
    if not s:
        return ""
    s = s.lower().strip()
    s = unicodedata.normalize("NFKD", s)
    return "".join(c for c in s if not unicodedata.combining(c))


@admin.register(Area)
class AreaAdmin(admin.ModelAdmin):
    list_display = ("nome",)
    search_fields = ("nome",)


@admin.register(Concurso)
class ConcursoAdmin(admin.ModelAdmin):
    list_display = ("titulo", "orgao", "area", "status", "ativo", "data_publicacao")
    list_filter = ("area", "ativo", "situacao_manual")
    search_fields = ("titulo", "orgao", "cargo", "descricao")
    readonly_fields = ("criado_por", "criado_em", "atualizado_em")

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        user = request.user

        if user.is_superuser or user.groups.filter(name__iexact='Geral').exists():
            return qs

        user_groups = [normalize(g) for g in user.groups.values_list("name", flat=True)]
        if not user_groups:
            return qs.none()

        allowed_ids = [c.pk for c in qs if normalize(c.area.nome) in user_groups]
        return qs.filter(pk__in=allowed_ids)

    def has_change_permission(self, request, obj=None):
        if not obj:
            return True
        if request.user.is_superuser:
            return True
        user_groups = [normalize(g) for g in request.user.groups.values_list("name", flat=True)]
        return normalize(obj.area.nome) in user_groups

    def has_delete_permission(self, request, obj=None):
        if not obj:
            return True
        if request.user.is_superuser:
            return True
        user_groups = [normalize(g) for g in request.user.groups.values_list("name", flat=True)]
        return normalize(obj.area.nome) in user_groups

    def save_model(self, request, obj, form, change):
        if not obj.pk:
            obj.criado_por = request.user
        super().save_model(request, obj, form, change)
