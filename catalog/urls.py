from django.urls import path

from .views import IndexView, ResultsView

urlpatterns = [
    path('', IndexView.as_view(), name='index'),
    path('results/<uuid:pk>/', ResultsView.as_view(), name='results')
]