import random

import pandas as pd

class SchoolTable():
    """
    Use analitic logic, we try create algorithm, that made good school timetable for old school.
    """
    def __init__(self,
                BASIC_LVL_LESSONS, 
                CLASSES_STANDART_SETTINGS, 
                COUNT_LESSONS_WEEK, 
                MIN_LVL_AVG_COST, 
                MAX_LVL_AVG_COST,  
                MAX_STUDY_LESSON,
                COURSES
                ):
        """
        Need to get info about current user, that post params for algorithm.

        params:
            BASIC_LVL_LESSONS : dict - cost of lessons.
            CLASSES_STANDART_SETTINGS : list - count lessons in day for class and mean complexity in day.
            COUNT_LESSONS_WEEK : list - count all lessons in every day for sshool.
        """

        self.BASIC_LVL_LESSONS = BASIC_LVL_LESSONS
        self.CLASSES_STANDART_SETTINGS = CLASSES_STANDART_SETTINGS
        self.COUNT_LESSONS_WEEK = COUNT_LESSONS_WEEK
        self.MIN_LVL_AVG_COST = MIN_LVL_AVG_COST
        self.MAX_LVL_AVG_COST = MAX_LVL_AVG_COST
        self.COURSES = COURSES
        self.MAX_STUDY_LESSON = MAX_STUDY_LESSON

        self.RESULT_TIMETABLE = []

    def get_timetable(self, count_of_increment = 1000) -> list:
        """ 
        It's main function, that start algorithm.    
        """
        
        increment = 0
        while True:
            if increment > count_of_increment:
                break

            for idx_day, count_lessons_day in enumerate(self.COUNT_LESSONS_WEEK):
                increment += 1  
                timetable_day = self.get_timetable_day(idx_day, count_lessons_day)
                if not timetable_day or increment > count_of_increment:
                    break 

                self.RESULT_TIMETABLE[idx_day] = timetable_day
            
            if timetable_day:
                return self.RESULT_TIMETABLE
            else:
                self.RESULT_TIMETABLE = []
      
    def get_timetable_day(self, idx_day : int, count_lessons_day : int) -> list:

        """
        Function return 
        """

        count_lessons = 0
        for idx_clas in range(len(self.CLASSES_STANDART_SETTINGS)):
            timetable_class = self.insert_courses(idx_clas, idx_day)           
            if not timetable_class:
                return False
            
            #  Insert into timetable a new class
            if len(self.RESULT_TIMETABLE) == 0 or idx_clas == 0:
                self.RESULT_TIMETABLE.append([timetable_class])
            else:
                self.RESULT_TIMETABLE[idx_day].append(timetable_class)

            count_lessons += sum([0 if i == 0 else 1 for i in timetable_class])
                
        #assert count_lessons == count_lessons_day, 'кол-во уроков заданных в базе не совпадает с количеством добавленных уроков!'       
        #print(f'Get timetable class! \n {timetable_class}')
        return self.RESULT_TIMETABLE[idx_day]
        
    def insert_courses(self, idx_clas : int, idx_day : int, count_of_increment = 100) -> list:
        """
        Заходим в класс. Проставляем расписание класса за день.
        Рандомно ставим первый урок. После идет проверка на ограничение : Если урок уже был 2 раза проставлен, больше не    может учавствовать в этом дне.
        
        Нагрузка должна быть больше наименьшего порога. Если порог не достигнут или наоборот - превыше, то заново пересчитываем.
        Ограничения, которые поступают сюда, должны учитывать прошлые расчеты. То есть для каждого класса фиксировать использованные уроки.
        """
        
        count_lesson = self.CLASSES_STANDART_SETTINGS[idx_clas][idx_day]
        flag_constraint = False
        increment = 0
        courses = self.COURSES[idx_clas]
        
        while True:
            increment += 1
            # for current course
            class_course = []
            # access courses from all timetable
            access_courses = []
            # if in this day class hasn't lessons create list with zeros.
            if count_lesson == 0:
                return [0] * self.MAX_STUDY_LESSON
            # if increment out of count_of_increment then out.
            if increment >= count_of_increment:
                return False
                
            for lesson in range(0, self.MAX_STUDY_LESSON):
                #print(f' day {idx_day} clas {idx_clas} lesson {lesson}')
                if lesson <= count_lesson and count_lesson != 0:
                    if idx_day == 0 and idx_clas == 0 and lesson == 0:
                        class_course.append(random.choice(list(courses.keys())))
                    else:
                        access_courses = self.get_access_courses(lesson, idx_day, idx_clas, courses, class_course)
                        if len(access_courses) == 0 or len(class_course) == count_lesson: 
                            class_course.append(0)
                        else:
                            class_course.append(random.choice(access_courses))   
                else:
                    class_course.append(0)
            
            flag_constraint = self.constrains(idx_clas, class_course)
            if flag_constraint:
                return class_course

    def get_access_courses(self, idx_lesson : int, idx_day : int, idx_clas : int, courses : dict, class_course : list) -> list :
        """ 
        Moduls of check access courses.
        """       
        # out of lessons
        access_courses = self.check_count_lesson_in_day(courses, class_course)
        # out of courses
        access_courses = self.out_cours(idx_day, idx_clas, class_course, access_courses, courses)   
        # check teachers
        access_courses = self.check_teachers(idx_day, idx_clas, idx_lesson, access_courses)

        return access_courses

    def check_count_lesson_in_day(self, courses : dict, class_course : list, parametr : int = 2) -> list:
        """
        Out of lesson in day if more then parametr
        """
        access_courses = list(courses.keys())
        
        # уберем курсы, которые 2 раза были в этом дне
        for course in set(class_course):
            if class_course.count(course) >= parametr and course != 0:
                access_courses.remove(course)

        return access_courses

    def out_cours(self, idx_day : int, idx_clas : int, class_course : list, access_courses : list, courses : dict):
        """
        Out corses, that haven't access on count in week yet.
        """

        if idx_day == 0:
            used_course = class_course
        else:
            used_course = [course for id_day, day in enumerate(self.RESULT_TIMETABLE) if id_day < idx_day for course in day[idx_clas]] + class_course
        
        for course in set(used_course):
            if course == 0 or course not in list(courses.keys()):
                continue
            if used_course.count(course) >= courses[course].count_lessons:
                try:
                    access_courses.remove(course)
                except:
                    continue
        return access_courses

    def check_teachers(self, idx_day : int, idx_clas : int, idx_lesson : int, access_courses : list) -> list:
        """
        Check teachers.
        """

        if idx_clas == 0:
            pass
        else:                
            courses_in_lesson = [value[idx_lesson] for idx, value in enumerate(self.RESULT_TIMETABLE[idx_day]) if idx != idx_clas]
            interseption_teachers = set([i.TeacherFIO for i in self.COURSES[idx_clas].values()]) & set([self.COURSES[idx][course].TeacherFIO for idx, course in enumerate(courses_in_lesson) if course != 0])

            if len(interseption_teachers) > 0:
                for course_key, course_value in self.COURSES[idx_clas].items():
                    if course_value.TeacherFIO in interseption_teachers:
                        try:
                            access_courses.remove(course_key)
                        except:
                            continue
        
        return access_courses

    def constrains(self, idx_clas :int, class_course : list) -> bool:
        """
        Check cost of study for class.
        """
        
        copy_class_course = class_course.copy()
        while True:
            try:
                copy_class_course.remove(0)
            except:
                break
                
        cost = sum([self.BASIC_LVL_LESSONS[ self.COURSES[idx_clas][course].ItemName[0] ] for course in copy_class_course])       
        avg_cost = round(self.CLASSES_STANDART_SETTINGS[idx_clas][-1])

        if avg_cost - self.MIN_LVL_AVG_COST <= cost <= avg_cost + self.MAX_LVL_AVG_COST:
            return True
        else:
            return False

    def get_grah_timetable(self, timetable : list) -> None:
    
        result_df = pd.DataFrame()
        for day in timetable:        
            df_day = pd.DataFrame()
            for idx, clas in enumerate(day):
                temp_df = pd.DataFrame([self.COURSES[idx][values].ItemName[0] if values != 0 else 0 for values in clas], columns = [f'{idx}'])
                df_day = pd.concat([df_day, temp_df], axis = 1)

            result_df = pd.concat([result_df, df_day])  

        return result_df

    def get_grah_teachertimetable(self, timetable : list) -> None:
    
        result_df = pd.DataFrame()
        for day in timetable:        
            df_day = pd.DataFrame()
            for idx, clas in enumerate(day):
                temp_df = pd.DataFrame([self.COURSES[idx][values].TeacherFIO if values != 0 else 0 for values in clas], columns = [f'{idx}'])
                df_day = pd.concat([df_day, temp_df], axis = 1)

            result_df = pd.concat([result_df, df_day])  

        return result_df