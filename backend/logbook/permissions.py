from django.contrib.auth.models import Group, Permission
from django.core.management.base import BaseCommand
from django.contrib.contenttypes.models import ContentType
from logbook.models import CustomUser, Issue
from rest_framework.permissions import BasePermission

class Command(BaseCommand):
    help = "Setup roles and permissions"

    def handle(self, *args, **kwargs):
        # Create groups
        student_group, _ = Group.objects.get_or_create(name="Students")
        registrar_group, _ = Group.objects.get_or_create(name="Registrars")
        admin_group,_ = Group.objects.get_or_create(name='Lecturer')        

        # ContentType for Issue model
        content_type = ContentType.objects.get_for_model(Issue)

        # Create or get permissions
        resolve_permission, _ = Permission.objects.get_or_create(
            codename="resolve_issue",
            name="Can resolve issue",
            content_type=content_type
        )

        assign_permission, _ = Permission.objects.get_or_create(
            codename="assign_issue",
            name="Can assign issue",
            content_type=content_type
        )
       
        

        # Assign permissions to groups
        lecturer_group.permissions.add(resolve_permission)
        registrar_group.permissions.add(assign_permission)
        # assign admin to group
        Group.objects.get(name="Admin")
        user.groups.add(admin_group)

        self.stdout.write(self.style.SUCCESS("Roles and permissions have been set up!"))

# for the technical personnel
class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'admin'
