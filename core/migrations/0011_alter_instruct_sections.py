# Generated by Django 3.2 on 2022-01-21 19:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0010_auto_20220120_0540'),
    ]

    operations = [
        migrations.AlterField(
            model_name='instruct',
            name='sections',
            field=models.CharField(max_length=10),
        ),
    ]