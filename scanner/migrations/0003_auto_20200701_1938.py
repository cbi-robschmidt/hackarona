# Generated by Django 2.1.15 on 2020-07-01 19:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('scanner', '0002_remove_scanphoto_title'),
    ]

    operations = [
        migrations.AlterField(
            model_name='scanphoto',
            name='scan',
            field=models.ImageField(upload_to='scans'),
        ),
    ]
