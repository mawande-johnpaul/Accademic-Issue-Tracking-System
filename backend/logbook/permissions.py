from rest_framework import permissions

class IsAdmin(permissions.BasePermission):
    """
    Allow access only to admin users.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.role == 'admin'


class IsStudent(permissions.BasePermission):
    """
    Allow access only to student users.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.role == 'student'


class IsLecturer(permissions.BasePermission):
    """
    Allow access only to lecturer users.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.role == 'lecturer'


class IsRegistrar(permissions.BasePermission):
    """
    Allow access only to registrar users.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.role == 'registrar'



class IsOwnerOrAdmin(permissions.BasePermission):
    """
    Allow access only to the owner of an object or admin users.
    """
    def has_object_permission(self, request, view, obj):
        return hasattr(obj, 'user') and (obj.user == request.user or request.user.role == 'admin')
