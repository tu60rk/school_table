import os, datetime

import pandas as pd
import django

from collections import namedtuple

from django.shortcuts import render
from django.http import JsonResponse

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


def index(request):
    """
    This is controller function.
    :param request: instance class HttpReuqest has info about request.
    :return: instance class HttpResponse
    """
    if request.method == 'POST':
        POST = dict(request.POST)
        try:
            print(POST)
            classes_settings = prepared_classes(
                POST['class_number'],
                POST['class_letter'],
                #POST['classes-max-lessons'],
                POST['classes-study-day']
            )

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
            if result:
                print('Ok')
                
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
    return render(request, 'lending/index.html')