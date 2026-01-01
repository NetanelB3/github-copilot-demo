# FILE: octofit-tracker/backend/octofit_tracker/views.py

from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer, TeamSerializer, ActivitySerializer, LeaderboardSerializer, WorkoutSerializer
from .models import User, Team, Activity, Leaderboard, Workout

@api_view(['GET', 'POST'])
def api_root(request, format=None):
    if request.method == 'POST':
        return Response({"message": "POST request received"}, status=status.HTTP_201_CREATED)

    codespace_base = 'https://zany-space-succotash-x59rgj4ww9prc679v-8000.app.github.dev/'
    localhost_base = 'http://localhost:8000/'

    def build_endpoints(base_url):
        return {
            'users': base_url + 'api/users/?format=api',
            'teams': base_url + 'api/teams/?format=api',
            'activities': base_url + 'api/activities/?format=api',
            'leaderboard': base_url + 'api/leaderboard/?format=api',
            'workouts': base_url + 'api/workouts/?format=api'
        }

    return Response({
        'codespace': build_endpoints(codespace_base),
        'localhost': build_endpoints(localhost_base)
    })

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer

class LeaderboardViewSet(viewsets.ModelViewSet):
    queryset = Leaderboard.objects.all()
    serializer_class = LeaderboardSerializer

class WorkoutViewSet(viewsets.ModelViewSet):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer
