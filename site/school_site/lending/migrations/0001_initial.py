# Generated by Django 3.1.1 on 2022-06-23 19:45

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Users',
            fields=[
                ('city', models.CharField(max_length=200)),
                ('country', models.CharField(max_length=10)),
                ('ip', models.CharField(max_length=20)),
                ('loc', models.CharField(max_length=50)),
                ('region', models.CharField(max_length=50)),
                ('hashsum', models.CharField(max_length=32, primary_key=True, serialize=False)),
            ],
        ),
    ]
