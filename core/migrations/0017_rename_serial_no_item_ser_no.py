# Generated by Django 3.2.8 on 2022-01-26 18:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0016_alter_section_students'),
    ]

    operations = [
        migrations.RenameField(
            model_name='item',
            old_name='serial_no',
            new_name='ser_no',
        ),
    ]