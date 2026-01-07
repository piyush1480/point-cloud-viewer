from django.shortcuts import render
from .forms import UploadForm
from .models import PointCloud

def upload_and_view(request):
    file_url = None
    if request.method == "POST":
        form = UploadForm(request.POST, request.FILES)
        if form.is_valid():
            obj = form.save()
            file_url = obj.file.url
    else:
        form = UploadForm()

    return render(request, "viewer/home.html", {"form": form, "file_url": file_url})
