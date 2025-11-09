from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ConcursoViewSet,
    AreaViewSet,
    ConcursoPublicListView,
    MeView  # ✅ adicionado
)

router = DefaultRouter()
router.register(r"concursos", ConcursoViewSet, basename="concurso")
router.register(r"areas", AreaViewSet, basename="area")

urlpatterns = [
    path("", include(router.urls)),
    
    # ✅ endpoint público para concursos
    path("public/concursos/", ConcursoPublicListView.as_view(), name='public-concursos'),

    # ✅ novo endpoint para pegar dados do usuário logado
    path("me/", MeView.as_view(), name="me"),
]
