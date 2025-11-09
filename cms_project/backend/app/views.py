from rest_framework import viewsets, filters, generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Concurso, Area
from .serializers import ConcursoSerializer, AreaSerializer
from .permissions import GrupoPermission, IsSuperuserOrReadOnly
import unicodedata


def normalize(s: str) -> str:
    if not s:
        return ""
    s = unicodedata.normalize("NFKD", s.lower().strip())
    return "".join(c for c in s if not unicodedata.combining(c))


# ✅ NOVO ENDPOINT /me/
class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            "id": request.user.id,
            "username": request.user.username,
            "email": request.user.email,
            "groups": list(request.user.groups.values_list("name", flat=True)),
        })


class ConcursoPublicListView(generics.ListAPIView):
    queryset = Concurso.objects.filter(ativo=True).select_related("area")
    serializer_class = ConcursoSerializer
    permission_classes = [AllowAny]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ("titulo", "orgao", "cargo", "descricao")
    ordering_fields = ("data_publicacao", "titulo")
    ordering = ("-data_publicacao",)


class AreaViewSet(viewsets.ModelViewSet):
    queryset = Area.objects.all()
    serializer_class = AreaSerializer
    permission_classes = [IsSuperuserOrReadOnly]


class ConcursoViewSet(viewsets.ModelViewSet):
    serializer_class = ConcursoSerializer
    permission_classes = [GrupoPermission]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ("titulo", "orgao", "cargo", "descricao")
    ordering_fields = ("data_publicacao", "titulo", "criado_em")
    ordering = ("-data_publicacao",)

    def get_queryset(self):
        qs = Concurso.objects.select_related("area", "criado_por").filter(ativo=True)
        user = self.request.user

        # Visitante
        if not user.is_authenticated:
            return qs

        # Admin e grupo Geral
        if user.is_superuser or user.groups.filter(name__iexact='Geral').exists():
            return qs

        # Grupos do usuário
        user_groups = [normalize(g) for g in user.groups.values_list("name", flat=True)]
        if not user_groups:
            return qs.none()

        # Filtra concursos pela área
        allowed_ids = [c.pk for c in qs if normalize(c.area.nome) in user_groups]
        return qs.filter(pk__in=allowed_ids)

    def perform_create(self, serializer):
        serializer.save(criado_por=self.request.user)
