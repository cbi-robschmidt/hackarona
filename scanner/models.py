from django.db import models
import uuid
import os


def change_name(instance, filename):
    upload_to = 'static/scans'
    _, ext = os.path.splitext(filename)
    if instance.pk:
        filename = '{}{}'.format(instance.pk, ext)
    else:
        filename = '{}{}'.format(uuid.uuid4().hex, ext)

    return os.path.join(upload_to, filename)

# Create your models here.
class ScanPhoto(models.Model):
    uuid = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False,
    )
    created_at = models.DateTimeField(auto_now_add=True) 
    scan = models.ImageField(upload_to='')