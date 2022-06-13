import re, random, math

class get_data():
    def __init__(self, COURSES) -> None:
        self.COURSES = COURSES

    @staticmethod
    def greedy_alg(standart_lessons : int, add_lessons : int, basic_count_days : int, reverse : bool = False) -> list:
        """
        Function - greedy algorithm. Add remaining lessons, starting from monday if reverse = False else from friday or saturday.

        params:
            standart_lessons : int - mean count of lessons without remainder.
            add_lessons : int - remainder of lessons.
            basic_count_days : int - study days in class.
            reverse : bool (default - False) - if false then add lessons starting from monday else from friday or saturday.

        return - list.
        """

        count_lessons = [ standart_lessons + 1 if i <= add_lessons else standart_lessons for i in range(1, basic_count_days + 1) ]
        if reverse:
            count_lessons.reverse()
        return count_lessons

    @staticmethod
    def random_alg(standart_lessons : int, add_lessons : int, basic_count_days : int) -> list:
        """
        Function - random algorithm. Add remainder lessons use random.
        
        params:
            standart_lessons : int - mean count of lessons without remainder.
            add_lessons : int - remainder of lessons.
            basic_count_days : int - study days in class.

        return - list.
        """

        count_lessons = [standart_lessons for i in range(1, basic_count_days + 1)]
        while add_lessons:
            idx = random.randint(0, len(count_lessons) - 1)
            add = random.randint(0, 1)
            if add and count_lessons[idx] == standart_lessons:
                add_lessons = add_lessons - 1 if add == 1 else add_lessons 
                count_lessons[idx] = standart_lessons + add

        return count_lessons

    @staticmethod
    def middle_alg(standart_lessons : int, add_lessons : int, basic_count_days : int)-> list:
        """
        Function - middle algorithm. Add remainder lessons starting from wensday.
        
        params:
            standart_lessons : int - mean count of lessons without remainder.
            add_lessons : int - remainder of lessons.
            basic_count_days : int - study days in class.

        return - list.
        """

        count_lessons = [standart_lessons + 1 if add_lessons == basic_count_days else standart_lessons for i in range(1, basic_count_days + 1)]
        # Add wensday.
        if add_lessons == 1:
            count_lessons[2] = standart_lessons + 1
        # Add other days.
        if 1 < add_lessons < basic_count_days:
            for idx in range(1, add_lessons + 1):
                count_lessons[idx] = standart_lessons + 1
        return count_lessons


    def get_result_alg(self, name_algorithm : str, standart_lessons : int, add_lessons : int, basic_count_days : int) -> list:
        """Choose which algorithm run depend on type_algorithm.
            
            params:
                type_algorithm : str - name of algorithm

            return list if not errors
        """

        types_algorithms = {'greedy' : self.greedy_alg,
                            'greedy_reverse' : self.greedy_alg,
                            'random' : self.random_alg,
                            'middle' : self.middle_alg
                            }
        try:
            func = types_algorithms[name_algorithm]
            if 'reverse' in name_algorithm:
                return func(standart_lessons, add_lessons, basic_count_days, True)
            else:
                return func(standart_lessons, add_lessons, basic_count_days)
        except:
            print(f'ERROR! We use name algorithm {name_algorithm}. But need {list(types_algorithms.keys())}')
            return None


    def get_classes_standart_settings(self, BASIC_LVL_LESSONS : dict, BASIC_COUNT_STUDY_DAYS : list, name_algorithm : str) -> list:
        """
            Func calc two params:
            1 - Count lessons on every day for each class. For begginig classes get 4
                lessons and complexity - if one subject - 0.2 else ....
                For others algorithm calc in 2 steps:

                    1) Find mean count lessons in every day for class:
                    a) Calc all count lessons for class in week.
                    b) Devide step а. by count study'es days class.
                    c) Rounding floor step b. End step 1.

                    2) Calc count lessons remainder and summarize it's lessons with step
                    one use algorithms greedy, greedy_reverse, random, middle:
                    a) From step 1.a minus step 1.b multiplication by count study days.
                    b) Choose algorithm that place remainder lessons.
                        - greedy : add lessons from monday, tueday, wensday and continue...
                        - greedy_reverse : analogue greedy but reverse.
                        - random : use only random place.
                        - middle : starting add lessons from wensday next add tuesday, thursday, friday, monday (if 5 study days).

            2 - Mean complexity on day for class.
                1)  Sum of complexity all lessons class devide by count study days class.

            Params:
                BASIC_LVL_LESSONS - dict, price of lessons.
                BASIC_COUNT_STUDY_DAYS - list, count study days.
                name_algorithm - str, name algorithm.
        """

        # For every class define count of lessons by every study day
        CLASSES_STANDART_SETTINGS = []
        for clas, basic_count_days in zip(self.COURSES, BASIC_COUNT_STUDY_DAYS):

            number_class = list(clas.values())[0].Class
            number_class = int(re.findall('^[ 0-9]', number_class)[0])

            #  Load on begginer classes. It's bad - change! 
            if number_class <= 4:
                count_lessons = [4,4,4,4,4,0, 0.2]
            else:
                # Step 1 - define mean count lesson and how much need add lessons
                all_lessons = sum([i.count_lessons for i in clas.values()])
                standart_lessons = math.floor(all_lessons / basic_count_days)
                add_lessons = all_lessons - standart_lessons * basic_count_days
                
                # Step 2 - use algorithm destribute adding lessons
                count_lessons = self.get_result_alg(name_algorithm, standart_lessons, add_lessons, basic_count_days)
                if basic_count_days < 6:
                    count_lessons.append(0)
                
                # Step 3 - calc mean load on class.
                count_lvl_lessons = [ BASIC_LVL_LESSONS[i.ItemName[0]] * i.count_lessons for i in clas.values() ]
                avg_lvl = sum(count_lvl_lessons) / basic_count_days
                count_lessons.append(avg_lvl)

            CLASSES_STANDART_SETTINGS.append(count_lessons)
        return CLASSES_STANDART_SETTINGS


    def get_params_default(self):

        """ 
        Собрем все возможные параметы.
        """
        
        name_algorithm = 'greedy'
        # defalut - изначальная стоимость уроков. Разделяем урки на 3 уровня: Сложный (2), Средний (1.5), Легкий (1)
        BASIC_LVL_LESSONS = {
            'Алгебра' : 2,
            'Биология' : 1.5,
            'География' : 1.5,
            'Геометрия' : 2,
            'ИЗО' : 1,
            'Информатика' : 1.5,
            'История' : 1.5,
            'Литература' : 1.5,
            'Математика' : 2,
            'Музыка' : 1,
            'Немецкий язык' : 1.5,
            'ОБЖ' : 1,
            'Общестовазнание' : 1.5,
            'Русский язык' : 2,
            'Труд' : 1,
            'Физика' : 2,
            'Физкультура' : 1,
            'Французский язык' : 1.5,
            'Химия' : 2         
        }
        
        # default - кол-во учебных дней в классе. Начиная с 9 класса - 6 дней, остальные 5 дней.
        BASIC_COUNT_STUDY_DAYS = [6 if int(re.findall('^[ 0-9]', list(i.values())[0].Class)[0]) in [9,10,11] else 5 for i in self.COURSES]
        
        # Собираем информацию для каждого класса по каждому дню максимальное кол-во уроков в дне. Последним элементом сохраняем информацию о средней нагрузке в день.
        CLASSES_STANDART_SETTINGS = self.get_classes_standart_settings(BASIC_LVL_LESSONS, BASIC_COUNT_STUDY_DAYS, name_algorithm)
        
        # Собираем информацию о кол-ве уроков на каждый день. Нужно для проврки алгоритма
        COUNT_LESSONS_WEEK = []
        for day in range(6):
            COUNT_LESSONS_WEEK.append(sum([i[day] for i in CLASSES_STANDART_SETTINGS]))

        MIN_LVL_AVG_COST = 2
        MAX_LVL_AVG_COST = 2
        MAX_STUDY_LESSON = 8

        return BASIC_LVL_LESSONS, CLASSES_STANDART_SETTINGS, COUNT_LESSONS_WEEK, MIN_LVL_AVG_COST, MAX_LVL_AVG_COST, MAX_STUDY_LESSON

