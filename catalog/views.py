from django.shortcuts import render
from django.urls import reverse
from django.shortcuts import redirect

from django.views import View
from django.views.generic import ListView, DetailView
from django.views.generic.base import TemplateView

from scanner.models import ScanPhoto

from urllib.parse import urlencode
from django.http import HttpResponseRedirect

import os
import requests
import json
import logging

logger = logging.getLogger('watchtower-logger')

# Create your views here.
class ResultsView(DetailView):
    model = ScanPhoto
    template_name = 'results.html'

class CatalogView(TemplateView):
    template_name = 'catalog.html'

    def post(self, request):
        base_url = reverse('catalog')
        query = request.POST['query']
        logger.info('User searching for %s', query)
        return HttpResponseRedirect(base_url + '?query={}'.format(query))
