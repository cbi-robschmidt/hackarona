from django.shortcuts import render

from django.views import View
from django.views.generic import ListView, DetailView

from scanner.models import ScanPhoto

import os
import requests
import json

# Create your views here.
class IndexView(ListView):
    queryset = ScanPhoto.objects.all()
    template_name = 'index.html'

class ResultsView(DetailView):
    model = ScanPhoto
    template_name = 'results.html'

def get_catalog(request):
    return render(request, 'catalog.html')
