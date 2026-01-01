# FILE: octofit-tracker/backend/octofit_tracker/tests.py

from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from .models import User, Team, Activity, Leaderboard, Workout
from datetime import timedelta

class UserModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(
            username='testuser',
            email='test@example.com',
            password='testpassword123'
        )

    def test_user_creation(self):
        self.assertEqual(self.user.username, 'testuser')
        self.assertEqual(self.user.email, 'test@example.com')

class TeamModelTest(TestCase):
    def setUp(self):
        self.team = Team.objects.create(name='Test Team')

    def test_team_creation(self):
        self.assertEqual(self.team.name, 'Test Team')

class ActivityModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(
            username='testuser',
            email='test@example.com',
            password='testpassword123'
        )
        self.activity = Activity.objects.create(
            user=self.user,
            activity_type='Running',
            duration=timedelta(hours=1)
        )

    def test_activity_creation(self):
        self.assertEqual(self.activity.activity_type, 'Running')
        self.assertEqual(self.activity.user, self.user)

class LeaderboardModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(
            username='testuser',
            email='test@example.com',
            password='testpassword123'
        )
        self.leaderboard = Leaderboard.objects.create(
            user=self.user,
            score=100
        )

    def test_leaderboard_creation(self):
        self.assertEqual(self.leaderboard.score, 100)
        self.assertEqual(self.leaderboard.user, self.user)

class WorkoutModelTest(TestCase):
    def setUp(self):
        self.workout = Workout.objects.create(
            name='Morning Run',
            description='A refreshing morning run'
        )

    def test_workout_creation(self):
        self.assertEqual(self.workout.name, 'Morning Run')
        self.assertEqual(self.workout.description, 'A refreshing morning run')

class APIEndpointTest(APITestCase):
    def test_api_root(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_users_endpoint(self):
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_teams_endpoint(self):
        response = self.client.get('/api/teams/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_activities_endpoint(self):
        response = self.client.get('/api/activities/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_leaderboard_endpoint(self):
        response = self.client.get('/api/leaderboard/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_workouts_endpoint(self):
        response = self.client.get('/api/workouts/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
