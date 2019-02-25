from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
import xadmin


urlpatterns = [
    path('xadmin/', xadmin.site.urls),
    path('admin/', admin.site.urls),
    path('', include('blog.urls')),
    path('simditor/', include('simditor.urls')),
]

urlpatterns += static(
    settings.STATIC_URL,
    document_root=settings.STATIC_ROOT
)

urlpatterns += static(
    settings.MEDIA_URL,
    document_root=settings.MEDIA_ROOT
)
