import os, datetime, django

import pandas as pd
import hashlib

from collections import namedtuple

from django.shortcuts import render
from django.db.models import Max
from django.http import JsonResponse
from lending.models import Users, DataForAlgorithm

from .getting_data import get_data
from .core import SchoolTable


def prepared_classes(number, letter, count_day):
    # prepera data classes
    classes_settings = {}
    # for class_number, class_letter, classes_max_lessons, classes_study_day  in zip(number, letter, count_lessons, count_day):
    #     classes_settings_description = namedtuple('classes_settings_description', ['classes_max_lessons', 'classes_study_day'])
    #     classes_settings[str(class_number) + class_letter] = classes_settings_description(classes_max_lessons, classes_study_day)
    for class_number, class_letter, classes_study_day  in zip(number, letter, count_day):
        classes_settings_description = namedtuple('classes_settings_description', ['classes_study_day'])
        classes_settings[str(class_number) + class_letter] = classes_settings_description(classes_study_day)

    return classes_settings

def prepared_teachers(teacher, subject):
    # prepared data teacher
    teachers = pd.DataFrame([[i, j] for i, j in zip(teacher,subject)], columns=['TEACHER', 'SUBJECT'])
    return teachers

def prepared_courses(clses, teachers, subjects, count_lessons):
    # prepared courses
    courses = []
    courses_settings_description = namedtuple('courses_settings_description', ['ItemName', 'TeacherFIO', 'Class','count_lessons'])
    course = 1
    idx = 0
    for cls, teacher, subject, count_lesson in zip(clses, teachers, subjects, count_lessons):
        list_args = courses_settings_description([subject, int(count_lesson)], teacher, cls, int(count_lesson))
        if idx == 0:
            class_ = {}
            class_[course] = list_args
            course += 1
            idx += 1
            continue
        
        if clses[idx] != clses[idx-1]:
            courses.append(class_)
            class_ = {}
            course = 1
            class_[course] = list_args
            course += 1
        else:
            class_[course] = list_args
            course += 1
        idx += 1
    courses.append(class_)
    return courses

def get_hash(POST):
    return Users.objects.get(
                            city = POST['city'][0], 
                            country = POST['country'][0],
                            ip = POST['ip'][0],
                            loc = POST['loc'][0],
                            region = POST['region'][0]
                        )

def get_algorithm_filter(hash):
    return DataForAlgorithm.objects.filter(hashsum = hash)

def save_user(POST:dict) -> None:
    string_data = '{0} {1} {2} {3} {4}'.format(
                    POST['city'],
                    POST['country'],
                    POST['ip'],
                    POST['loc'],
                    POST['region']
                )
    hash_object = hashlib.md5(string_data.encode('utf-8'))
    p = Users(
        city = POST['city'][0], 
        country = POST['country'][0],
        ip = POST['ip'][0],
        loc = POST['loc'][0],
        region = POST['region'][0],
        hashsum = hash_object.hexdigest()
    )
    p.save()

def delete_last_data_and_get_counter(POST:dict) -> int:
    hash = get_hash(POST)
    alg = get_algorithm_filter(hash=hash)

    if alg.count() == 0:
        return 1
    max_counter = alg.aggregate(Max('counter'))['counter__max']
    if max_counter == 5:
        # delete
        alg.filter(counter = 1).delete()
        # update
        for i in [2,3,4,5]:
            alg.filter(counter = i).update(counter = i - 1)
            #p = alg.filter(counter = i)
            #p.update(counter=p)
            #p.counter = i - 1
            #p.save()
        return 5
    else:
        return max_counter + 1

def load_data(POST:dict) -> None:

    classes = prepared_classes(POST['class_number'], POST['class_letter'], POST['classes-study-day'])
    counter = delete_last_data_and_get_counter(POST)
    for cls, teacher, subject, count_lesson in zip(
                POST['courses_classes'],
                POST['courses_teacher'],
                POST['courses_subject'],
                POST['courses_count_lessons']
                ):
        
        p = DataForAlgorithm(
            hashsum = get_hash(POST),
            counter = counter,
            class_number = cls,
            teacher_fio = teacher,
            subject_name = subject,
            count_lessons_per_week = count_lesson,
            count_study_day = int(classes[cls].classes_study_day)
        )
        p.save()

def index_two(request):
    context = {
    'firstname': 'Linus',
    }
    return render(request, 'lending/index.html', context=context)

def go_algorithm(POST):
    try:
        save_user(POST)
        load_data(POST)

        teachers = prepared_teachers(
            POST['teacher'],
            POST['teacher-subject']
        )

        courses = prepared_courses(
            POST['courses_classes'],
            POST['courses_teacher'],
            POST['courses_subject'],
            POST['courses_count_lessons']
        )
        params = get_data(courses)
        timetable = SchoolTable(*params.get_params_default(), courses)
        result = timetable.get_timetable()
            
        timetable_grah = timetable.get_grah_timetable(result)
        timetable_grah_teacher = timetable.get_grah_teachertimetable(result)

        now = datetime.datetime.now()
        path = '/Users/romanromanov/Documents/GitHub/school_table/site/school_site/lending'
        file_path = '/static/excel/'
        file_name = '%s.xlsx'%now.strftime("%Y-%m-%d-%H-%M-%S")
        full_file_path = os.path.join(file_path, file_name)
        timetable_grah.to_excel(path + full_file_path)
        return JsonResponse({'code': 200, 'file_path': file_path, 'file_name': file_name, 'timetable_grah' : timetable_grah.to_html(index=False)})
    except django.utils.datastructures.MultiValueDictKeyError as err:
        print(err)
    

def index(request):
    """
    This is controller function.
    :param request: instance class HttpReuqest has info about request.
    :return: instance class HttpResponse
    """
    context = {}

    if request.method == 'POST' and dict(request.POST)['algorithm'][0] == 'True':
        POST = dict(request.POST)
        return go_algorithm(POST)

    if request.method == 'POST' and dict(request.POST)['algorithm'][0] == 'False':  
        GET = dict(request.POST)
        code = 200
        data = ''
        text = 'Мы прогрузили Ваши данные. Нажмите кнопку "Построить расписание", чтобы увидеть их.'
        try:
            hash = get_hash(GET)
            alg = get_algorithm_filter(hash=hash)
            max_counter = alg.aggregate(Max('counter'))['counter__max']
            alg = alg.filter(counter = max_counter)
            data = list(alg.values())
            if alg.count == 0:
                code = 201
                text = 'Данные отсутствуют! Возможно Вы у нас впервые :)'
        except Users.DoesNotExist as err:
            code = 201
            text = 'Данные отсутствуют! Возможно Вы у нас впервые :)'

        return JsonResponse({'code': code, 'data': data, 'text': text})
        
    return render(request, 'lending/index.html', context= context)