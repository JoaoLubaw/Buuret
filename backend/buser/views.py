from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

import git


@csrf_exempt
def update(request):
    if request.method == "POST":
        '''
        pass the path of the directory where your project will be
        stored on PythonAnywhere in the git.Repo() as parameter.
        Here the name of my directory is "test.pythonanywhere.com"
        '''
        repo = git.Repo('/home/joaolubaw/Buuret/')
        origin = repo.remotes.origin

        origin.pull()
        return HttpResponse("Updated code on PythonAnywhere")
    else:
        return HttpResponse("Couldn't update the code on PythonAnywhere")
