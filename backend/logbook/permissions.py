# from rest_framework import permissions

# class IsAdmin(permissions.BasePermission):
#     """
#     Allow access only to admin users.
#     """
#     def has_permission(self, request, view):
#         return request.user and request.user.is_authenticated and request.user.role == 'admin'


# class IsStudent(permissions.BasePermission):
#     """
#     Allow access only to student users.
#     """
#     def has_permission(self, request, view):
#         return request.user and request.user.is_authenticated and request.user.role == 'student'


# class IsLecturer(permissions.BasePermission):
#     """
#     Allow access only to lecturer users.
#     """
#     def has_permission(self, request, view):
#         return request.user and request.user.is_authenticated and request.user.role == 'lecturer'


# class IsRegistrar(permissions.BasePermission):
#     """
#     Allow access only to registrar users.
#     """
#     def has_permission(self, request, view):
#         return request.user and request.user.is_authenticated and request.user.role == 'registrar'



# class IsOwnerOrAdmin(permissions.BasePermission):
#     """
#     Allow access only to the owner of an object or admin users.
#     """
#     def has_object_permission(self, request, view, obj):
#         return hasattr(obj, 'user') and (obj.user == request.user or request.user.role == 'admin')

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

        self.stdout.write(self.style.SUCCESS("Roles and permissions have been set up!"))
