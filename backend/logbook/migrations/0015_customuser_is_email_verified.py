# Generated by Django 5.1.6 on 2025-05-02 10:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('logbook', '0014_remove_notification_category'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='is_email_verified',
            field=models.BooleanField(default=False),
        ),
    ]
