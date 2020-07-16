from django.views.generic.edit import FormView
from django.shortcuts import render, redirect

from django.views.generic.base import View
from django.http import JsonResponse

from .forms import UploadScanForm
from .models import ScanPhoto

import requests
import json

# Create your views here.
def scan_form_view(request):
    if request.method == 'POST':
        form = UploadScanForm(request.POST, request.FILES)
        if form.is_valid():
            instance = form.save()
            return redirect('results', pk=str(instance.uuid))
        else:
            return redirect('scan')
    else:
        form = UploadScanForm()
        return render(request, 'scan.html', {
            'form': form
        })
    
class GetScanData(View):
    ''' 
        API call which returns a JSON formatted dict
        containing the list of words detected and the
        related recipes
    '''
    # restrict the http allowed methods to only GET 
    http_method_names = ['get']

    def get(self, request, *args, **kwargs):
        # api call urls
        textract_url = 'https://0y0h6tom4a.execute-api.us-east-1.amazonaws.com/get-text'
        recipes_url = 'https://0y0h6tom4a.execute-api.us-east-1.amazonaws.com/get-recipes'
        spellcheck_url = 'https://api.datamuse.com/words'

        # filename is passed as get parameter to the view
        filename = request.GET.get('filename', None)
        if not filename:
            return JsonResponse({'message': 'No filename'})

        # get the AWS Textract detection objects
        textract_response = requests.get(textract_url, params={'filename': filename})
        words = []
        ret_words = []
        textract = textract_response.json()['words']
        # process each returned word
        for entry in textract:
            # avoid small words to increase specificity 
            if len(entry['word']) < 4:
                continue

            # words with a confidence above 85 are printed as-is
            if entry['score'] > 85:
                words.append(entry['word'].upper())
                ret_words.append({'word': entry['word'].upper(), 'score': entry['score']})
            # words with a confidence of 70 < x <= 85 are autocorrected
            elif entry['score'] > 70:
                # attempt to correct
                corrections = requests.get(spellcheck_url, params={'sp': entry['word']}).json()
                # if a non-zero amount of corrections have been returned, add the first
                # since the list is ordered by score/confidence descending
                if corrections:
                    words.append(corrections[0]['word'].upper())
                    ret_words.append({'word': entry['word'].upper(), 'score': entry['score']})

        # send the list of words to the recipe AWS Lambda function
        getrecipe_response = requests.post(recipes_url, json={'query': words})
        getrecipe_response = getrecipe_response.json()
        recipes = []
        # append each entry as an element in a list
        for entry in getrecipe_response:
            recipes.append(entry)
        
        # return the JSON formatted response containing the words and recipes
        return JsonResponse({'words': ret_words, 'recipes': recipes})
