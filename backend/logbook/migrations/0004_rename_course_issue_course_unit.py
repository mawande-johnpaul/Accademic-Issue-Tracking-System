# Generated by Django 5.1.6 on 2025-04-02 16:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('logbook', '0003_issue_course_issue_semester_issue_year_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='issue',
            old_name='course',
            new_name='course_unit',
        ),
    ]
