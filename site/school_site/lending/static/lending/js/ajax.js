$('#loading_box').hide();

function create_table(response){
    let div = document.createElement('div');
    div.innerHTML = response.timetable_grah;
    document.getElementsByClassName('landing-choose-finish')[0].getElementsByClassName('boxer')[0].appendChild(div);
};

function add_link(response, link){
    document.body.classList.add('loaded_hiding');
    window.setTimeout(function () {
        document.body.classList.add('loaded');
        document.body.classList.remove('loaded_hiding');
    }, 500);
    link.href = response.file_path + response.file_name;
    link.classList.remove("not-display");
    link.download = response.file_name;
    link.innerText = 'Скачать результат';
};

// send form with data of courses
$(document).ready(function () {
    $('#main_form').submit(function () {
        $.ajax({
            data: $(this).serialize(),
            type: $(this).attr('method'),
            url: "/lending/",
            send_data: {"csrfmiddlewaretoken":"{{ csrf_token }}"},
            beforeSend: function (data) {
                window.scrollTo(0,5000);
                timer = setTimeout(function(){
                    $('#loading_box').show();
                }, 500);
            },
            complete: function() {
                clearTimeout(timer);
                $('#loading_box').hide();
            },
            // если успешно, то
            success: function (response) {
                let link = document.getElementById('link-link');
                if (response.code===200){
                    // add link for download
                    add_link(response, link);
                    // add table
                    create_table(response);
                }else{
                    link.innerText = 'Упс! Алгоритм не смог обработать данные. Попробуйте поменять их и повторите снова.';
              }
            },
            error: function (response) {
                let link = document.getElementById('link-link');
                link.innerText = 'Упс! Алгоритм не смог обработать данные. Попробуйте поменять их и повторите снова.';
            }
        });
        return false;
    });
})

function add_subjects(response){
    delAllInput('input-subject-');

    let subjects = new Set();
    for (let data of response.data){
        subjects.add(data.subject_name);
    };
    subjects.forEach((value, key, map) => {
        if (key == 'Математика') {
            let subject_name = document.getElementById('input-subject-0').querySelector('input[type="text"]');
            subject_name.value = key;
        } else {
            addInputSubject(key, value);
        };
    });
};

function add_teachers(response){
    delAllInput('input-teacher-');

    let teachers = {};
    for (let data of response.data){
        if (teachers[data.teacher_fio] === undefined) {
            teachers[data.teacher_fio] = new Set([data.subject_name]);
        } else {
            teachers[data.teacher_fio] = teachers[data.teacher_fio].add(data.subject_name); 
        };
    }

    let counter = 0;
    $.each(teachers, function(key, value){
        if (counter === 0) {
            let teacher_name = document.getElementById('input-teacher-0').querySelector('input[type="text"]');
            teacher_name.value = key;
            // remove options
            for (let element of document.getElementById('input-teacher-0').getElementsByTagName('option')){
                element.remove();
            };
            // add options
            for (let element of value) {
                let new_element = document.createElement('option');
                new_element.value = element;
                new_element.innerText = element;
                new_element.setAttribute('selected','selected');
                document.getElementById('input-teacher-0').getElementsByTagName('select')[0].appendChild(new_element);
            };
            $('.list-of-subjects-using-select').selectpicker('refresh');
        } else {
            addInputTeacher(key, value);
        };    
        counter += 1;
    });
};

function add_classes(response){
    delAllInput('input-classes-');
    let classes = new Set();
    for (let data of response.data){
        classes.add(data.class_number + ';' + data.count_study_day)
    }

    let counter = 0; 
    classes.forEach((value, key, map) => {
        let class_name = key.split(';')[0];
        let count_study_day = key.split(';')[1];
        if (counter === 0){
            document.getElementById('input-classes-0').getElementsByTagName('input')[1].value = get_letter_class(class_name);
            document.getElementById('input-classes-0').getElementsByTagName('input')[0].value = get_number_class(class_name);
            for (let element of document.getElementById('input-classes-0').getElementsByTagName('option')){
                if (element.value === count_study_day){
                    element.setAttribute('selected','selected');
                } else {
                    element.removeAttribute('selected');
                }
            };
        } else {
            addInputClasses(class_name, count_study_day);
        };
        counter += 1;
    })

};

function add_courses(response){

    let datas = new Set();
    for (let data of response.data){
        datas.add(data.class_number + ';' + data.teacher_fio + ';' + data.subject_name + ';' + data.count_lessons_per_week);
    };

    let classes = getClasses();
    for (let class_ of classes){
        if (document.getElementById('input-courses-' + String(class_)) === null ){
            
            let counter = 0;
            for (let data of datas){
                let teacher_fio = data.split(';')[1];
                let subject_name = data.split(';')[2];
                let count_lessons_per_week = data.split(';')[3];
                if (data.includes(class_) && counter === 0){
                    createBox(class_, teacher_fio, subject_name, count_lessons_per_week);
                    counter += 1;
                } else if (data.includes(class_)) {
                    addInputCourses('input-courses-' + class_, teacher_fio, subject_name, count_lessons_per_week);
                    counter += 1;
                };
            };
        } else {
            for (let div of document.getElementById('input-courses-' + String(class_)).getElementsByClassName('item')){
                div.remove();
            };

            let counter = 0;
            for (let data of datas){
                let teacher_fio = data.split(';')[1];
                let subject_name = data.split(';')[2];
                let count_lessons_per_week = data.split(';')[3];

                if (data.includes(class_)) {
                    addInputCourses(class_, teacher_fio, subject_name, count_lessons_per_week);
                    counter += 1;
                }
            };
        };
    };
};

// send request about havinf data in bd
$(document).ready(function () {
    $('#use_data').submit(function () {
        $.ajax({
            data: $(this).serialize(),
            type: $(this).attr('method'),
            url: "/lending/",
            send_data: {"csrfmiddlewaretoken":"{{ csrf_token }}"},
            success: function (response) {
                
                if (response.code === 200){
                    add_subjects(response);
                    add_teachers(response);
                    add_classes(response);
                    add_courses(response);
                    let div = document.getElementById('havt-data');
                    div.innerText = response.text;
                    div.classList.add('activate');
                };

                if (response.code === 201){
                    let div = document.getElementById('havt-data');
                    div.innerText = response.text;
                    div.classList.add('activate');
                };
            },
            error: function (response) {
                let div = document.getElementById('havt-data');
                div.innerText = 'Упс! У нас что-то сломалось:( Скоро мы это починем!';
            }
        });
        return false;
    });
})