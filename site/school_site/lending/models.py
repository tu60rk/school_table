from django.db import models


class Users(models.Model):
    city = models.CharField(max_length=200)
    country = models.CharField(max_length=10)
    ip = models.CharField(max_length=20)
    loc = models.CharField(max_length=50)
    region = models.CharField(max_length=50)
    hashsum = models.CharField(max_length=32, primary_key=True)

# class DataForAlgorithm(models.Model):
#     hashsum = models.CharField(max_length=32)
#     counter = models.IntegerField()