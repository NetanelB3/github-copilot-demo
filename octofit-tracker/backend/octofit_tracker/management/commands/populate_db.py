# FILE: octofit-tracker/backend/octofit_tracker/management/commands/populate_db.py

from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from django.conf import settings
from pymongo import MongoClient
from datetime import timedelta
from bson import ObjectId

class Command(BaseCommand):
    help = 'Populate the database with test data for users, teams, activity, leaderboard, and workouts'

    def handle(self, *args, **kwargs):
        # Connect to MongoDB
        client = MongoClient(settings.DATABASES['default']['HOST'], settings.DATABASES['default']['PORT'])
        db = client[settings.DATABASES['default']['NAME']]

        # Drop existing collections
        self.stdout.write(self.style.WARNING('Dropping existing collections...'))
        db.users.drop()
        db.teams.drop()
        db.activity.drop()
        db.leaderboard.drop()
        db.workouts.drop()

        # Create users - Adapted for OctoFit Tracker at Mergington High School
        self.stdout.write(self.style.SUCCESS('Creating users...'))
        users = [
            User(_id=ObjectId(), username='thundergod', email='thundergod@mergington.edu', password='thundergodpassword'),
            User(_id=ObjectId(), username='metalgeek', email='metalgeek@mergington.edu', password='metalgeekpassword'),
            User(_id=ObjectId(), username='zerocool', email='zerocool@mergington.edu', password='zerocoolpassword'),
            User(_id=ObjectId(), username='crashoverride', email='crashoverride@mergington.edu', password='crashoverridepassword'),
            User(_id=ObjectId(), username='sleeptoken', email='sleeptoken@mergington.edu', password='sleeptokenpassword'),
        ]
        User.objects.bulk_create(users)
        self.stdout.write(self.style.SUCCESS(f'Created {len(users)} users'))

        # Create teams
        self.stdout.write(self.style.SUCCESS('Creating teams...'))
        blue_team = Team(_id=ObjectId(), name='Blue Team')
        blue_team.save()
        
        gold_team = Team(_id=ObjectId(), name='Gold Team')
        gold_team.save()
        
        # Add members to Gold Team
        for user in users:
            gold_team.members.add(user)
        
        self.stdout.write(self.style.SUCCESS('Created 2 teams'))

        # Create activities
        self.stdout.write(self.style.SUCCESS('Creating activities...'))
        activities = [
            Activity(_id=ObjectId(), user=users[0], activity_type='Cycling', duration=timedelta(hours=1)),
            Activity(_id=ObjectId(), user=users[1], activity_type='Crossfit', duration=timedelta(hours=2)),
            Activity(_id=ObjectId(), user=users[2], activity_type='Running', duration=timedelta(hours=1, minutes=30)),
            Activity(_id=ObjectId(), user=users[3], activity_type='Strength', duration=timedelta(minutes=30)),
            Activity(_id=ObjectId(), user=users[4], activity_type='Swimming', duration=timedelta(hours=1, minutes=15)),
        ]
        Activity.objects.bulk_create(activities)
        self.stdout.write(self.style.SUCCESS(f'Created {len(activities)} activities'))

        # Create leaderboard entries
        self.stdout.write(self.style.SUCCESS('Creating leaderboard entries...'))
        leaderboard_entries = [
            Leaderboard(_id=ObjectId(), user=users[0], score=100),
            Leaderboard(_id=ObjectId(), user=users[1], score=90),
            Leaderboard(_id=ObjectId(), user=users[2], score=95),
            Leaderboard(_id=ObjectId(), user=users[3], score=85),
            Leaderboard(_id=ObjectId(), user=users[4], score=80),
        ]
        Leaderboard.objects.bulk_create(leaderboard_entries)
        self.stdout.write(self.style.SUCCESS(f'Created {len(leaderboard_entries)} leaderboard entries'))

        # Create workouts
        self.stdout.write(self.style.SUCCESS('Creating workouts...'))
        workouts = [
            Workout(_id=ObjectId(), name='Cycling Training', description='Training for a road cycling event'),
            Workout(_id=ObjectId(), name='Crossfit', description='Training for a crossfit competition'),
            Workout(_id=ObjectId(), name='Running Training', description='Training for a marathon'),
            Workout(_id=ObjectId(), name='Strength Training', description='Training for strength'),
            Workout(_id=ObjectId(), name='Swimming Training', description='Training for a swimming competition'),
        ]
        Workout.objects.bulk_create(workouts)
        self.stdout.write(self.style.SUCCESS(f'Created {len(workouts)} workouts'))

        self.stdout.write(self.style.SUCCESS('Successfully populated the database with test data for OctoFit Tracker!'))
