from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from viewer.views import upload_and_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', upload_and_view, name='home')
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
