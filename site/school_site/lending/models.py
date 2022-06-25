from django.db import models
from sklearn.preprocessing import minmax_scale


class Users(models.Model):
    city = models.CharField(max_length=200)
    country = models.CharField(max_length=10)
    ip = models.CharField(max_length=20)
    loc = models.CharField(max_length=50)
    region = models.CharField(max_length=50)
    hashsum = models.CharField(max_length=32, primary_key=True)

class DataForAlgorithm(models.Model):
    hashsum = models.ForeignKey(Users, on_delete=models.CASCADE, db_column="hashsum")
    counter = models.IntegerField()
    class_number = models.CharField(max_length=3)
    teacher_fio = models.CharField(max_length=100)
    subject_name = models.CharField(max_length=50)
    count_lessons_per_week = models.IntegerField()
    count_study_day = models.IntegerField()


# hash	
# number_load	
# class_number	
# teacher_fio	
# subject_name	
# count_lessons_per_week	
# count_study_day