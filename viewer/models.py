from django.db import models

class PointCloud(models.Model):
    file = models.FileField(upload_to='pointclouds/')
    uploaded = models.DateTimeField(auto_now_add=True)
