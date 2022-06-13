from django.urls import path

from .views import index

urlpatterns = [
    path('', index, name='lending')
    # path('download/', DownloadView.as_view(), name='download'),
]