from django.urls import path

from .views import index, index_two

urlpatterns = [
    path('', index, name='lending'),
    path('', index_two, name='lending')
    # path('download/', DownloadView.as_view(), name='download'),
]