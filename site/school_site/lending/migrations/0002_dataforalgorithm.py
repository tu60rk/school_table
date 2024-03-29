# Generated by Django 3.1.1 on 2022-06-24 17:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('lending', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='DataForAlgorithm',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('counter', models.IntegerField()),
                ('class_number', models.CharField(max_length=3)),
                ('teacher_fio', models.CharField(max_length=100)),
                ('subject_name', models.CharField(max_length=50)),
                ('count_lessons_per_week', models.IntegerField()),
                ('count_study_day', models.IntegerField()),
                ('hashsum', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='lending.users')),
            ],
        ),
    ]
