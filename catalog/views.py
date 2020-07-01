from django.shortcuts import render

from django.views.generic import ListView

from scanner.models import ScanPhoto

# Create your views here.
class IndexView(ListView):
    queryset = ScanPhoto.objects.all()
    template_name = 'index.html'
