from django.urls import path

from .views import scan_form_view, GetScanData

urlpatterns = [
    path('', scan_form_view, name='scan'),
    path('get-scan-data/', GetScanData.as_view(), name='get-scan-data'),
]
