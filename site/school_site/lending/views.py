from django.shortcuts import render


def index(request):
    """
    This is controller function.
    :param request: instance class HttpReuqest has info about request.
    :return: instance class HttpResponse
    """
    return render(request, 'lending/index.html')