# Generated by Django 5.1.6 on 2025-03-18 06:58

import django.contrib.auth.models
import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='CustomUser',
            fields=[
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('username', models.CharField(max_length=100, unique=True)),
                ('email', models.EmailField(max_length=100, unique=True)),
                ('webmail', models.CharField(blank=True, max_length=100, null=True, unique=True)),
                ('password', models.CharField(max_length=100)),
                ('role', models.CharField(choices=[('student', 'Student'), ('lecturer', 'Lecturer'), ('registrar', 'Registrar'), ('admin', 'Admin')], max_length=100)),
                ('department', models.CharField(choices=[('cocis', 'CoCIS'), ('cobams', 'CoBAMS'), ('conas', 'CoNAS'), ('cedat', 'CEDAT')], max_length=10)),
                ('course', models.CharField(choices=[('CC1000', 'Electrical'), ('CC1100', 'Civil'), ('CC1200', 'Mechanical'), ('CC1300', 'Chemical')], default='none', max_length=100)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Issue',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=100)),
                ('category', models.CharField(choices=[('marks', 'Missing Marks'), ('attendance', 'Attendance'), ('resources', 'Resources'), ('environment', 'Environmental'), ('conduct', 'Conduct'), ('schedules', 'Schedules')], default='student', max_length=100)),
                ('description', models.TextField()),
                ('department', models.CharField(choices=[('cocis', 'CoCIS'), ('cobams', 'CoBAMS'), ('conas', 'CoNAS'), ('cedat', 'CEDAT')], max_length=10)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('status', models.CharField(default='Unseen', max_length=10)),
                ('assigned_to', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='assigned_issue', to=settings.AUTH_USER_MODEL)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Log',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('action', models.CharField(max_length=1000)),
                ('timestamp', models.DateTimeField(auto_now=True)),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Notification',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('content', models.CharField(max_length=1000)),
                ('category', models.CharField(max_length=50)),
                ('user_id_receiver', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL)),
                ('user_id_sender', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='sent_notifications', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
