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
        # get the original object context passed to template
        context = super(ResultsView, self).get_context_data(**kwargs)

        # get the scan that the user has navigated to
        scan_instance = ScanPhoto.objects.get(uuid=self.kwargs['pk']).scan
        imagename = os.path.basename(scan_instance.name)

        # ask AWS API Gateway to process image and extract the words from Textract
        resp = requests.get('https://0y0h6tom4a.execute-api.us-east-1.amazonaws.com/get-text?filename={}'.format(imagename))
        textract_list = resp.json()
        context['words'] = textract_list

        # use first textract word to get recipe name
        recipe_query_dict = {'query': textract_list}
        resp2 = requests.post('https://0y0h6tom4a.execute-api.us-east-1.amazonaws.com/getRecipe', json={ 'query': context['words'] }).json()['body']
        context['recipes'] = json.loads(resp2)

        return context
