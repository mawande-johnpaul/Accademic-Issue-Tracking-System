from django.shortcuts import render
from rest_framework.views import APIView
from .models import *
from rest_framework.response import Response
from .serializer import *
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets
from logbook.models import *

# Create your views here.
class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all().filter(role='student')
    serializer_class = StudentSerializer

<<<<<<< Updated upstream

class IssueViewSet(viewsets.ModelViewSet):
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer    
=======

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save() # saves the user to db
            user_data = serializer.data
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': user_data
            }, status=status.HTTP_201_CREATED)
        return  Response(serializer.errors, status=400)

class LoginView(generics.GenericAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer
>>>>>>> Stashed changes

class LecturerViewSet(viewsets.ModelViewSet):
    queryset = Lecturer.objects.all()
    serializer_class = LecturerSerializer 

class RegistrarViewSet(viewsets.ModelViewSet):
    queryset = Registrar.objects.all()
    serializer_class = RegistrarSerializer 

class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer 

class LogViewSet(viewsets.ModelViewSet):
    queryset = Log.objects.all()
    serializer_class = LogSerializer 



def dashboard(request):
    return render(request, 'dashboard.html')

@csrf_exempt
def login(request):
    if request.method == "POST":
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        return JsonResponse({"status": "success", "message": f"Welcome, {email}!{password}"})
def signup(request):
    first_name = request.POST['first-name']
    last_name = request.POST['last-name']
    email = request.POST['email']
    student_number = request.POST['student-number']
    password1 = request.POST['password1']
    password2 = request.POST['password2']
    return render(request, 'login.html')
