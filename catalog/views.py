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

    def get_context_data(self, **kwargs):
        context = super(ResultsView, self).get_context_data(**kwargs)
        scan_instance = ScanPhoto.objects.get(uuid=self.kwargs['pk']).scan
        imagename = os.path.basename(scan_instance.name)
        resp = requests.get('https://0y0h6tom4a.execute-api.us-east-1.amazonaws.com/get-text?filename={}'.format(imagename))
        textract_list = resp.json()
        context['words'] = textract_list
        resp2 = requests.get('https://0y0h6tom4a.execute-api.us-east-1.amazonaws.com/getRecipe?name={' + context['words'] + '}'i)
        return context
