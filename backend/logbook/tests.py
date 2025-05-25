# tests/test_auth.py
from rest_framework_simplejwt.tokens import RefreshToken
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model
from django.core.cache import cache
from logbook.models import *
from django.utils import timezone

User = get_user_model()

class AuthTests(APITestCase):

    def test_register_user(self):
        url = reverse('signup')
        data = {
            "email": "testuser@example.com",
            "username": "testuser",
            "password": "TestPass123!",
            "first_name": "Test",
            "last_name": "User"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("token", response.data)
        self.assertTrue(User.objects.filter(email="testuser@example.com").exists())

    def test_login_user(self):
        # Setup: Create user
        user = User.objects.create_user(
            email="testlogin@example.com",
            username="loginuser",
            password="TestLogin123!"
        )
        url = reverse('login')
        data = {
            "email": "testlogin@example.com",
            "password": "TestLogin123!"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access_token", response.data)


class PasswordResetTests(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            email="resetuser@example.com",
            username="resetuser",
            password="OldPass123!"
        )
        self.email = self.user.email
        self.code = "123456"
        self.new_password = "NewPass456!"

    def test_send_reset_code(self):
        url = reverse('send_reset_code')
        response = self.client.post(url, {"email": self.email}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()["message"], "Code sent.")
        self.assertTrue(cache.get(f"reset_code_{self.email}"))

    def test_verify_reset_code_success(self):
        cache.set(f"reset_code_{self.email}", self.code, timeout=600)
        url = reverse('verify_reset_code')
        response = self.client.post(url, {"email": self.email, "code": self.code}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()["message"], "Code verified.")

    def test_verify_reset_code_failure(self):
        cache.set(f"reset_code_{self.email}", "wrongcode", timeout=600)
        url = reverse('verify_reset_code')
        response = self.client.post(url, {"email": self.email, "code": self.code}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.json()["error"], "Invalid code.")

    def test_reset_password_success(self):
        cache.set(f"reset_code_{self.email}", self.code, timeout=600)
        url = reverse('reset_password')
        response = self.client.post(url, {
            "email": self.email,
            "code": self.code,
            "new_password": self.new_password
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()["message"], "Password reset successful.")
        # Confirm new password works
        self.assertTrue(self.client.login(email=self.email, password=self.new_password))

    def test_reset_password_with_invalid_code(self):
        url = reverse('reset_password')
        response = self.client.post(url, {
            "email": self.email,
            "code": "wrongcode",
            "new_password": self.new_password
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.json()["error"], "Invalid code.")


def get_auth_header(user):
    refresh = RefreshToken.for_user(user)
    return {"HTTP_AUTHORIZATION": f"Bearer {refresh.access_token}"}

class IssueTests(APITestCase):

    def setUp(self):
        self.student = User.objects.create_user(username='student1', email='student1@example.com', password='pass123', role='student')
        self.lecturer = User.objects.create_user(username='lecturer1', email='lect1@example.com', password='pass123', role='lecturer')
        self.registrar = User.objects.create_user(username='registrar1', email='reg@example.com', password='pass123', role='registrar')

    def test_create_issue(self):
        url = reverse('issues')
        self.client.credentials(**get_auth_header(self.student))
        data = {
            "title": "WiFi not working",
            "description": "The network in Block B is down.",
            "status": "New",
            "priority": "High"
        }
        response = self.client.post(url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(Issue.objects.filter(title="WiFi not working").exists())

    def test_list_issues_created_by_user(self):
        issue = Issue.objects.create(
            title="Sample",
            description="Something broke.",
            created_by=self.student
        )
        url = reverse('issues')
        self.client.credentials(**get_auth_header(self.student))
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("Sample", str(response.data))

    def test_assign_issue_as_registrar(self):
        issue = Issue.objects.create(title="Assign me", description="Please", created_by=self.student)
        url = reverse('edit_issue', kwargs={"action": "assign", "pk": issue.pk})
        self.client.credentials(**get_auth_header(self.registrar))
        data = {
            "assigned_to": self.lecturer.pk,
            "priority": "Medium",
            "deadline": "2025-12-31"
        }
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        issue.refresh_from_db()
        self.assertEqual(issue.assigned_to, self.lecturer)

    def test_progress_issue_as_lecturer(self):
        issue = Issue.objects.create(title="Update me", description="...", created_by=self.student, assigned_to=self.lecturer)
        url = reverse('edit_issue', kwargs={"action": "progress", "pk": issue.pk})
        self.client.credentials(**get_auth_header(self.lecturer))
        data = {
            "progress": "Started working on this."
        }
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        issue.refresh_from_db()
        self.assertEqual(issue.progress, "Started working on this.")

    def test_delete_issue_as_registrar(self):
        issue = Issue.objects.create(title="Delete me", created_by=self.student)
        url = reverse('remove', kwargs={"pk": issue.pk})
        self.client.credentials(**get_auth_header(self.registrar))
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Issue.objects.filter(pk=issue.pk).exists())


class NotificationTests(APITestCase):

    def setUp(self):
        self.registrar = User.objects.create_user(username='reg1', email='reg1@example.com', password='pass', role='registrar')
        self.lecturer = User.objects.create_user(username='lect1', email='lect1@example.com', password='pass', role='lecturer')
        self.issue = Issue.objects.create(title='Test Issue', description='...', created_by=self.lecturer)

    def test_send_notification(self):
        url = reverse('notify_lecturer', kwargs={'pk': self.issue.pk, 'id': self.lecturer.pk})
        self.client.credentials(**get_auth_header(self.registrar))
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(Notification.objects.filter(user_id_receiver=self.lecturer).exists())

    def test_get_notifications(self):
        Notification.objects.create(sender='System', user_id_receiver=self.lecturer, content='Test notice')
        url = reverse('notifications', kwargs={'pk': self.lecturer.pk})
        self.client.credentials(**get_auth_header(self.lecturer))
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(any("Test notice" in str(n['content']) for n in response.data))

    def test_delete_notification(self):
        note = Notification.objects.create(sender='System', user_id_receiver=self.lecturer, content='Delete me')
        url = reverse('delete_notification', kwargs={'pk': note.pk})
        self.client.credentials(**get_auth_header(self.lecturer))
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


class LogTests(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='loguser', email='log@example.com', password='pass')

    def test_create_log(self):
        url = reverse('logcreate')  # Add this name to your URL if missing
        data = {
            "user_id": self.user.id,
            "action": "Logged an action",
            "state": "INFO",
            "timestamp": timezone.now()
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_update_log(self):
        log = Log.objects.create(user_id=self.user, action="Old", state="INFO", timestamp=timezone.now())
        url = reverse('log-detail', kwargs={"pk": log.pk})
        data = {
            "action": "Updated action",
            "state": "SUCCESS",
            "user": {"id": self.user.id}
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        log.refresh_from_db()
        self.assertEqual(log.action, "Updated action")

    def test_delete_log(self):
        log = Log.objects.create(user_id=self.user, action="To delete", state="INFO", timestamp=timezone.now())
        url = reverse('log-detail', kwargs={"pk": log.pk})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


class LecturerListTests(APITestCase):

    def setUp(self):
        self.lecturer = User.objects.create_user(
            username='lect2', email='lect2@example.com', password='pass',
            role='lecturer', department='Engineering'
        )
        self.issue = Issue.objects.create(
            title='Issue with dept', description='..',
            created_by=self.lecturer, department='Engineering'
        )

    def test_list_lecturers_by_issue_department(self):
        url = reverse('list_lecturers', kwargs={'id': self.issue.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertTrue(any(user['email'] == self.lecturer.email for user in response.data))


class TokenTests(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='tokenuser', email='token@example.com', password='pass123')

    def test_token_obtain_pair(self):
        url = reverse('token_obtain_pair')
        data = {
            "email": self.user.email,
            "password": "pass123"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)

    def test_token_refresh(self):
        from rest_framework_simplejwt.tokens import RefreshToken
        refresh = RefreshToken.for_user(self.user)
        url = reverse('token_refresh')
        response = self.client.post(url, {"refresh": str(refresh)}, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertIn("access", response.data)