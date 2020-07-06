from django.db import models
import uuid
import os


# Create your models here.
class ScanPhoto(models.Model):
    uuid = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False,
    )
    created_at = models.DateTimeField(auto_now_add=True) 
    scan = models.ImageField(upload_to='')