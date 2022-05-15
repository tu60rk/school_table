from django.shortcuts import render


def index(request):
    """
    This is controller function.
    :param request: instance class HttpReuqest has info about request.
    :return: instance class HttpResponse
    """
    print('Hello!')
    if request.GET:
        print('GET!')
    return render(request, 'lending/index.html')