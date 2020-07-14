from django.urls import path
from .views import ResultsView, CatalogView

urlpatterns = [
    path('', CatalogView.as_view(), name='catalog'),
    path('results/<uuid:pk>/', ResultsView.as_view(), name='results'),
]