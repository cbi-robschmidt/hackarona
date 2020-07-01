from django.urls import path

from .views import scan_form_view

urlpatterns = [
    path('', scan_form_view, name='scan'),
]