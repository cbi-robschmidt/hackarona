from django.urls import path
from .views import IndexView, ResultsView, get_catalog

urlpatterns = [
    path('', IndexView.as_view(), name='index'),
    path('results/<uuid:pk>/', ResultsView.as_view(), name='results'),
    path('catalog/', get_catalog, name='catalog')
]