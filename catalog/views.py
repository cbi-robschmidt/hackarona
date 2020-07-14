from django.shortcuts import render
from django.urls import reverse
from django.shortcuts import redirect

from django.views import View
from django.views.generic import ListView, DetailView

from scanner.models import ScanPhoto

from urllib.parse import urlencode
from django.http import HttpResponseRedirect

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
    if(request.method == "POST") :
        base_url = reverse('catalog')
        query = request.POST['query']
        return HttpResponseRedirect( base_url + "?query={}".format(query))

    return render(request, 'catalog.html')
