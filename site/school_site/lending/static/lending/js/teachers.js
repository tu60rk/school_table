let teach = 0;


/**
 * @name getTeachers
 * @description get subjects
 * @returns {*} getSubjects
 */
 function getTeachers() {
    return document.getElementById('input-teacher').getElementsByClassName('teacher-name-first');
};

/**
 * @name addInputTeacher
 * @description create html element div.
 */
 function addInputTeacher(teacher_name = '', selected_subjects = new Set()) {
    let res = ++teach;
    let profile = document.getElementById('input-teacher');
    let div = document.createElement('div');
  
    let first_part_html = '<div class="input-teacher"><input type="text" name="teacher" class="teacher-name-first" value="'+ teacher_name +'" placeholder="Романов Роман Алексеевич" pattern="^[а-яА-ЯЁё ]+$" required>';
    let second_part_html = '</div></div></div><div class="counter" onclick="delInput(\'input-teacher-\',' + res + ')"><svg class="trash" viewBox="0 0 50 50" fill="none" overflow="visible" xmlns="http://www.w3.org/2000/svg"><path d="M32 17H28.5L27.5 16H22.5L21.5 17H18V19H32V17ZM19 32C19 32.5304 19.2107 33.0391 19.5858 33.4142C19.9609 33.7893 20.4696 34 21 34H29C29.5304 34 30.0391 33.7893 30.4142 33.4142C30.7893 33.0391 31 32.5304 31 32V20H19V32Z" fill="#979797"/></svg></div>';
    div.id = 'input-teacher-' + String(res);
    div.classList.add('item');
    div.innerHTML = first_part_html + getHtmlSubjects('list-of-subjects-using-select', selected_subjects) + second_part_html;
    //div.innerHTML = first_part_html + getHtmlSubjects('list-of-subjects-using-select') + second_part_html;
    profile.appendChild(div)

    $('.list-of-subjects-using-select').selectpicker('refresh');
    let scroll_to_bottom = document.getElementsByClassName('boxer')[1];
	scrollBottom(scroll_to_bottom);
  };

/**
 * @name getHtmlTeachers
 * @description create html tag 'select' with options including name subjects
 * @returns {string} getHtmlTeachers
 */
 function getHtmlTeachers() {
     // <select name="courses_teacher" class="list-of-teachers" required><option class = "option-disabled" value="" disabled selected>Выбери учителя</option></select>
    let elements = getTeachers();
    let teachers = new Set();

    for (let element of elements) {
        teachers.add(element.value);
    };
    //console.log('TEACHERS! ', elements);
    let name_tag = 'name="courses_teacher" ';
    let add_to_select = 'required title="Выберите преподавателя..." data-live-search="true" data-width="auto" data-size="5">';
    let html = '<select id = "list-of-teachers-using-select" class = "list-of-teachers-using-select" ' + name_tag + add_to_select;
    //html += '<option class = "option-disabled" value="" disabled selected>Выбери учителя</option>';

    for (let element of teachers) {
        html += '<option value = "'+ element + '">' + element + '</option>';
    };
    //console.log(html);
    return html += '</select>';
};


/**
 * @name getTeachers
 * @description create set of teachers which input by user.
 * @returns {object} teachers_array
 */
 function getArrayTeachers() {
    let i = 0;
    let teachers_array = {};

    while (i < 1000) {
        let doc = document.getElementById('input-teacher-' + String(i)) ;

        if (doc) {
            let key = String(doc.getElementsByClassName('teacher-name-first')[0].value);
            let val = new Set();//doc.getElementsByClassName('list-of-subjects-using-select')[0].value;

            for (let elem of doc.getElementsByClassName('list-of-subjects-using-select')[0].getElementsByClassName('selected')) {
                val.add(elem.innerText);
            };

            //console.log('SUBJECTS IN TEACHER! ', doc.getElementsByClassName('list-of-subjects-using-select')[0].getElementsByClassName('selected'));
            if (teachers_array[key]){
                teachers_array[key].add(val);
            } else {  
                teachers_array[key] = new Set(val);
            };
        }
        i+=1;
    }
    return teachers_array
};


/**
 * @name checkSelectionTeachers
 * @description create options for select with class = 'list-of-teachers'
 * 
 */

 function checkSelectionTeachers() {
    let subjects = new Set ();

    for (let subject of getTeachers()) {
        subjects.add(subject.value);
    };

    for (let i of [1,2,3,4]){
        for (let main_elem of document.getElementsByTagName('select')) {
            if (main_elem.classList.contains('list-of-teachers-using-select')) {

                // delete
                let options = main_elem.getElementsByTagName('option');
                for (let option of options) {
                    if (!subjects.has(option.value)) {
                        option.remove();
                    };
                };
                // add
                let set_options = new Set();
                let new_options = main_elem.getElementsByTagName('option');

                for (let option of new_options){
                    set_options.add(option.value);
                };
                for (let subject of subjects) {
                    if (!set_options.has(subject)) {
                        let new_option = document.createElement('option');
                        new_option.value = subject;
                        new_option.innerHTML = subject;
                        main_elem.appendChild(new_option);
                    };
                };           
            };
        };
    };
    $('.list-of-teachers-using-select').selectpicker('refresh');
};