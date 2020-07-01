from django import forms
from .models import ScanPhoto

class UploadScanForm(forms.ModelForm):
    class Meta:
        model = ScanPhoto
        fields = ('scan',)