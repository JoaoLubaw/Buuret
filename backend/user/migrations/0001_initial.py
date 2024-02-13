# Generated by Django 4.2.7 on 2024-02-09 19:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Buu",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("content", models.TextField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name="User",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("username", models.CharField(max_length=20, unique=True)),
                ("email", models.CharField(max_length=100, unique=True)),
                ("password", models.CharField(max_length=20)),
                ("description", models.TextField(max_length=100)),
                (
                    "background",
                    models.ImageField(
                        blank=True, null=True, upload_to="users_backgrounds"
                    ),
                ),
                (
                    "profile",
                    models.ImageField(
                        blank=True, null=True, upload_to="users_profiles"
                    ),
                ),
                (
                    "followers",
                    models.ManyToManyField(
                        related_name="followers_set", to="user.user"
                    ),
                ),
                (
                    "following",
                    models.ManyToManyField(
                        related_name="following_set", to="user.user"
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Ret",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("datetime", models.DateTimeField(auto_now_add=True)),
                ("content", models.TextField(max_length=300)),
                (
                    "media",
                    models.ImageField(blank=True, null=True, upload_to="ret_media"),
                ),
                ("comret", models.BooleanField(default=False)),
                ("isreret", models.BooleanField(default=False)),
                ("likes", models.ManyToManyField(related_name="liked", to="user.user")),
                (
                    "refbuu",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="ret_responses",
                        to="user.buu",
                    ),
                ),
                (
                    "replies",
                    models.ManyToManyField(
                        blank=True, related_name="replyto", to="user.ret"
                    ),
                ),
                (
                    "rerets",
                    models.ManyToManyField(
                        blank=True, related_name="rerets", to="user.user"
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="rets",
                        to="user.user",
                    ),
                ),
            ],
        ),
        migrations.AddField(
            model_name="buu",
            name="sendTo",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="buus",
                to="user.user",
            ),
        ),
        migrations.AddField(
            model_name="buu",
            name="user",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="user.user"
            ),
        ),
    ]
