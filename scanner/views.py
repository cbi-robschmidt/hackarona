from django.views.generic.edit import FormView
from django.shortcuts import render, redirect

from .forms import UploadScanForm
from .models import ScanPhoto

# Create your views here.
def scan_form_view(request):
    if request.method == 'POST':
        form = UploadScanForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('index')
    else:
        form = UploadScanForm()
        return render(request, 'scan.html', {
            'form': form
        })
