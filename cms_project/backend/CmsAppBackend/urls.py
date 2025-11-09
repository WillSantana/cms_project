from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from django.shortcuts import redirect
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

def home_redirect(request):
    if request.user.is_authenticated:
        return redirect('/admin/')
    return JsonResponse({
        'message': 'CMS Backend API',
        'endpoints': {
            'admin': '/admin/',
            'api': '/api/',
            'api_concursos': '/api/concursos/',
            'api_areas': '/api/areas/',
        }
    })

urlpatterns = [
    path('', home_redirect, name='home'),
    path('admin/', admin.site.urls),

    # ✅ JWT Authentication endpoints
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    # ✅ API do app principal
    path('api/', include('app.urls')),
]
