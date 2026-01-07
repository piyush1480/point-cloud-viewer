from django import forms
from .models import PointCloud

class UploadForm(forms.ModelForm):
    class Meta:
        model = PointCloud
        fields = ['file']
