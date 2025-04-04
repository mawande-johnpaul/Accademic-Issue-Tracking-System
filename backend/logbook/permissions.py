from django.contrib.auth.models import Group, Permission
from django.core.management.base import BaseCommand
from django.contrib.contenttypes.models import ContentType
from logbook.models import CustomUser, Issue

class Command(BaseCommand):
    help = "Setup roles and permissions"

    def handle(self, *args, **kwargs):
        # Create groups
        student_group, _ = Group.objects.get_or_create(name="Students")
        registrar_group, _ = Group.objects.get_or_create(name="Registrars")

        # ContentType for Issue model
        content_type = ContentType.objects.get_for_model(Issue)

        # Create or get permissions
        report_permission, _ = Permission.objects.get_or_create(
            codename="report_issue",
            name="Can report issue",
            content_type=content_type
        )

        assign_permission, _ = Permission.objects.get_or_create(
            codename="assign_issue",
            name="Can assign issue",
            content_type=content_type
        )

        # Assign permissions to groups
        student_group.permissions.add(report_permission)
        registrar_group.permissions.add(assign_permission)

        self.stdout.write(self.style.SUCCESS("Roles and permissions have been set up successfully!"))
