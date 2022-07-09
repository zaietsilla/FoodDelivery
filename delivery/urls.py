from django.urls import path

from . import views
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('', views.index, name="index"),
    path('product/<int:id>', views.product),
    path('cart', views.cart),
    path('<str:uuid>/checkout', views.checkout),
    path('create', views.create_order),
    path('promo', views.promo),
    path('info', views.info),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)