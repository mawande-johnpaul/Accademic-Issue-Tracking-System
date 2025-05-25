from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
# Get the custom user model
User = get_user_model()

# Add a mapping of accepted lecturers and registrars per college, using all colleges from models.py
ACCEPTED_USERS = {
     # Example: College of Computing and Information Sciences
    'COCIS': {
        'lecturers': [
            {'first_name': 'Lecturer1', 'last_name': 'lecturer1', 'email': 'lecturer1@gmail.com', 'webmail': 'lecturer1.lecturer1@mak.ac.ug'},
            {'first_name': 'lecturer2', 'last_name': 'lecturer2', 'email': 'lecturer2@gmail.com', 'webmail': 'lecturer2.lecturer2@mak.ac.ug'},
        ],
        'registrars': [
            {'first_name': 'John', 'last_name': 'Kiggundu', 'email': 'jkiggundu@gmail.com', 'webmail': 'jkiggundu@mak.ac.ug'},
        ]
    },
    # Other colleges follow same structure
    'COBAMS': {
        'lecturers': [
            {'first_name': 'lecturer3', 'last_name': 'lecturer3', 'email': 'lecturer3@gmail.com', 'webmail': 'lecturer3.lecturer3@mak.ac.ug'},
            {'first_name': 'lecturer4', 'last_name': 'lecturer4', 'email': 'lecturer4@gmail.com', 'webmail': 'lecturer4.lecturer4@mak.ac.ug'},
        ],
        'registrars': [
            {'first_name': 'Grace', 'last_name': 'Namubiru', 'email': 'gnamubiru@gmail.com', 'webmail': 'gnamubiru@mak.ac.ug'},
        ]
    },
    'CONAS': {
        'lecturers': [
            {'first_name': 'lecturer5', 'last_name': 'lecturer5', 'email': 'lecturer5@gmail.com', 'webmail': 'lecturer5.lecturer5@mak.ac.ug'},
            {'first_name': 'lecturer6', 'last_name': 'lecturer6', 'email': 'lecturer6@gmail.com', 'webmail': 'lecturer6.lecturer6@mak.ac.ug'},
        ],
        'registrars': [
            {'first_name': 'Stephen', 'last_name': 'Ssewanyana', 'email': 'sssewanyana@gmail.com', 'webmail': 'sssewanyana@mak.ac.ug'},
        ]
    },
    'CEDAT': {
        'lecturers': [
            {'first_name': 'lecturer7', 'last_name': 'lecturer7', 'email': 'lecturer7@gmail.com', 'webmail': 'lecturer7.lecturer7@mak.ac.ug'},
            {'first_name': 'lecturer8', 'last_name': 'lecturer8', 'email': 'lecturer8@gmail.com', 'webmail': 'lecturer8.lecturer8@mak.ac.ug'},
        ],
        'registrars': [
            {'first_name': 'Isaac', 'last_name': 'Nabimanya', 'email': 'inabimanya@gmail.com', 'webmail': 'inabimanya@mak.ac.ug'},
        ]
    },
    'CAES': {
        'lecturers': [
            {'first_name': 'lecturer9', 'last_name': 'lecturer9', 'email': 'lecturer9@gmail.com', 'webmail': 'lecturer9.lecturer9@mak.ac.ug'},
            {'first_name': 'lecturer10', 'last_name': 'lecturer10', 'email': 'lecturer10@gmail.com', 'webmail': 'lecturer10.lecturer10@mak.ac.ug'},
        ],
        'registrars': [
            {'first_name': 'Ruth', 'last_name': 'Mbabazi', 'email': 'rmbabazi@gmail.com', 'webmail': 'rmbabazi@mak.ac.ug'},
        ]
    },
    'CHUSS': {
        'lecturers': [
            {'first_name': 'lecturer11', 'last_name': 'lecturer11', 'email': 'lecturer11@gmail.com', 'webmail': 'lecturer11.lecturer11@mak.ac.ug'},
            {'first_name': 'lecturer12', 'last_name': 'lecturer12', 'email': 'lecturer12@gmail.com', 'webmail': 'lecturer12.lecturer12@mak.ac.ug'},
        ],
        'registrars': [
            {'first_name': 'Charles', 'last_name': 'Wana-Etyem', 'email': 'cwanaetyem@gmail.com', 'webmail': 'cwanaetyem@mak.ac.ug'},
        ]
    },
    'CHS': {
        'lecturers': [
            {'first_name': 'lecturer13', 'last_name': 'lecturer13', 'email': 'lecturer13@gmail.com', 'webmail': 'lecturer1.lecturer13@mak.ac.ug'},
            {'first_name': 'lecturer14', 'last_name': 'lecturer14', 'email': 'lecturer14@gmail.com', 'webmail': 'lecturer1.lecturer14@mak.ac.ug'},
        ],
        'registrars': [
            {'first_name': 'Sarah', 'last_name': 'Nabunya', 'email': 'snabunya@gmail.com', 'webmail': 'snabunya@mak.ac.ug'},
        ]
    },
    'LAW': {
        'lecturers': [
            {'first_name': 'lecturer15', 'last_name': 'lecturer15', 'email': 'lecturer15@gmail.com', 'webmail': 'lecturer1.lecturer15@mak.ac.ug'},
            {'first_name': 'lecturer16', 'last_name': 'lecturer16', 'email': 'lecturer16@gmail.com', 'webmail': 'lecturer1.lecturer16@mak.ac.ug'},
        ],
        'registrars': [
            {'first_name': 'Harriet', 'last_name': 'Lwanga', 'email': 'hlwanga@gmail.com', 'webmail': 'hlwanga@mak.ac.ug'},
        ]
    },
    'SCHOOL_OF_EDUCATION': {
        'lecturers': [
            {'first_name': 'lecturer17', 'last_name': 'lecturer17', 'email': 'lecturer17@gmail.com', 'webmail': 'lecturer1.lecturer17@mak.ac.ug'},
            {'first_name': 'lecturer18', 'last_name': 'lecturer18', 'email': 'lecturer18@gmail.com', 'webmail': 'lecturer1.lecturer18@mak.ac.ug'},
        ],
        'registrars': [
            {'first_name': 'Joseph', 'last_name': 'Mukasa', 'email': 'jmukasa@gmail.com', 'webmail': 'jmukasa@mak.ac.ug'},
        ]
    },
    'SCHOOL_OF_BUSINESS': {
        'lecturers': [
            {'first_name': 'lecturer19', 'last_name': 'lecturer19', 'email': 'lecturer19@gmail.com', 'webmail': 'lecturer1.lecturer19@mak.ac.ug'},
            {'first_name': 'lecturer20', 'last_name': 'lecturer20', 'email': 'lecturer20@gmail.com', 'webmail': 'lecturer1.lecturer20@mak.ac.ug'},
        ],
        'registrars': [
            {'first_name': 'Emily', 'last_name': 'Nabakka', 'email': 'enabakka@gmail.com', 'webmail': 'enabakka@mak.ac.ug'},
        ]
    },
    'SCHOOL_OF_BUILT_ENVIRONMENT': {
        'lecturers': [
            {'first_name': 'lecturer21', 'last_name': 'lecturer21', 'email': 'lecturer21@gmail.com', 'webmail': 'lecturer1.lecturer21@mak.ac.ug'},
            {'first_name': 'lecturer22', 'last_name': 'lecturer22', 'email': 'lecturer22@gmail.com', 'webmail': 'lecturer1.lecturer22@mak.ac.ug'},
        ],
        'registrars': [
            {'first_name': 'Patrick', 'last_name': 'Okello', 'email': 'pokello@gmail.com', 'webmail': 'pokello@mak.ac.ug'},
        ]
    },
    # Add remaining colleges...
    # (CONAS, CEDAT, CAES, CHUSS, CHS, LAW, SCHOOL_OF_EDUCATION, etc.)
    # Each contains 'lecturers' and 'registrars' lists with specific data
}
# Helper function to validate webmail format and infer the user's role
def validate_webmail_and_role(first_name, last_name, webmail, college):
    """Validate webmail format based on first_name, last_name and deduce role."""
    local_part, _, domain = webmail.partition('@')

    fn_lower = first_name.lower()
    ln_lower = last_name.lower()
# Check if webmail belongs to a student
    if domain == 'students.mak.ac.ug':
        expected_local = f"{fn_lower}.{ln_lower}"
        if local_part != expected_local:
            raise serializers.ValidationError(
                "Invalid student webmail format; expected firstname.lastname@students.mak.ac.ug"
            )
        return 'student'
# Check if webmail belongs to a lecturer or registrar
    elif domain == 'mak.ac.ug':
            for lecturer in ACCEPTED_USERS[college]['lecturers']:
                if lecturer['webmail'] == webmail:
                    return 'lecturer'
                else:
                    raise serializers.ValidationError("Use a student's webmail")
            for registrar in ACCEPTED_USERS[college]['registrars']:
                if registrar['webmail'] == webmail:
                    return 'registrar'
                else:
                    raise serializers.ValidationError("Use a student's webmail")
    else:
        raise serializers.ValidationError({"message":"Invalid webmail domain."})

# Serializer for user registration
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}
# Custom validation for registration
    def validate(self, data):
         # Ensure username is unique
        if User.objects.filter(username=data['username']).exists():
            raise serializers.ValidationError('Username already exists')

        first_name = data['first_name']
        last_name = data['last_name']
        webmail = data['webmail']
        email = data['email']
        college = data['department']
# Determine user role
        role = validate_webmail_and_role(first_name, last_name, webmail, college)
 # Additional validation for lecturers and registrars
        if role in ['lecturer', 'registrar']:
            college = data['department']
            accepted_list = ACCEPTED_USERS.get(college, {}).get(role + 's', [])
            
            fn_lower = first_name.lower()
            ln_lower = last_name.lower()

            found = False
            for user in accepted_list:
                if (user['first_name'].lower() == fn_lower and
                    user['last_name'].lower() == ln_lower and
                    user['email'].lower() == email.lower()):

                    # Check webmail format dynamically
                    accepted_webmail = user['webmail'].lower()
                    if accepted_webmail == webmail.lower():
                        found = True
                        break

            if not found:
                raise serializers.ValidationError(
                    f"{role.capitalize()} not recognized for {college}. Contact admin."
                )
# Add role to validated data
        data['role'] = role
        return data
# Custom create method to handle password hashing and field population
    def create(self, validated_data):
        user = User.objects.create_user(
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            webmail=validated_data['webmail'],
            username=validated_data['username'],
            email=validated_data['email'],
            role=validated_data['role'],
            department=validated_data['department'],
            course=validated_data.get('course', ''),
            password=validated_data['password']
        )
        return user



# Serializer for user login
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=255)
    password = serializers.CharField(write_only=True, max_length=128)
     
# Validate login credentials
    def validate(self, data):
        username = data.get("username")
        password = data.get("password")

        if username and password:
             # Use Django's built-in authentication
            user = authenticate(username=username, password=password)

            if user is None or not user.is_active:  # Added check for active status
                raise serializers.ValidationError('Invalid credentials or inactive account.')
        else:
            raise serializers.ValidationError('Both username and password are required.')

        data['user'] = user
        return data
    # Serializer for returning user details
class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

# Serializer for issue reporting
class IssueSerializer(serializers.ModelSerializer):
    attachment = serializers.ImageField(use_url=True, required=False, allow_null=True)

    class Meta:
        model = Issue
        fields = '__all__'


class LogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Log
        fields = '__all__'


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'

class LecturerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
