var sub = 0;
var teach = 0;
var classes = 0;
var courses = 0;

console.log(navigator.userAgent);

/**
 * @name addInputSubject
 * @description create html text for unput subject
 * @param {*} name_subject 
 * @param {*} cost_subject 
 * 
 * @returns None
 */
function addInputSubject(name_subject = '', cost_subject = 1) {
  let res = ++sub;
  var profile = document.getElementById('input-subject');
  var div = document.createElement('div');
  div.id = 'input-subject-' + res;
  div.classList.add('item');
  div.innerHTML = '<div class="input-subject"><input type="text" class="subject-name" value="'+ name_subject +'" placeholder="Название предмета" pattern="[А-Яа-я ]" required><span class="description-text">Сложность:</span><input type="number" class="subject-cost" value="' + cost_subject +'" min="1" max="2" step="0.5" required><div class="number-input"><div><button onclick="this.parentNode.parentNode.parentNode.querySelector(\'input[type=number]\').stepUp()" class="plus up"></button></div><div><button onclick="this.parentNode.parentNode.parentNode.querySelector(\'input[type=number]\').stepDown()" class="down"></button></div></div></div><div class="counter" onclick="delInput(\'input-subject-\',' + res + ')"><svg class="trash" viewBox="0 0 50 50" fill="none" overflow="visible" xmlns="http://www.w3.org/2000/svg"><path d="M32 17H28.5L27.5 16H22.5L21.5 17H18V19H32V17ZM19 32C19 32.5304 19.2107 33.0391 19.5858 33.4142C19.9609 33.7893 20.4696 34 21 34H29C29.5304 34 30.0391 33.7893 30.4142 33.4142C30.7893 33.0391 31 32.5304 31 32V20H19V32Z" fill="#979797"/></svg></div>';
  profile.appendChild(div);
};

/**
 * @name getSubjects
 * @description get subjects
 * @returns {*} getSubjects
 */
function getSubjects() {
    return document.getElementById('input-subject').getElementsByClassName('subject-name');
};

/**
 * @name getHtmlSubjects
 * @description create html tag 'select' with options including name subjects
 * @returns {string} getHtmlSubjects
 */
function getHtmlSubjects() {
    let elements = getSubjects();
    let html = '<select class = "list-of-subjects" onchange="getComboA(this)">'
    for (let element of elements) {
        html += '<option value = "'+ element.value + '">' + element.value + '</option>'
  }
    return html += '</select>'
};

/**
 * @name checkSelectionSubjects
 * @description check every 1 seconds list of subjects which user input. And update option in select class = 'list-of-subjects'.
 * 
 * @returns None
 */
function checkSelectionSubjects() {
    let subjects = new Set ();

    for (let subject of getSubjects()) {
        subjects.add(subject.value);
    };

    for (let main_elem of document.getElementsByClassName('list-of-subjects')) {
        let options = main_elem.getElementsByTagName('option');
        // delete
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

/**
 * @name getTeachers
 * @description create set of teachers which input by user.
 * @returns {object} teachers_array
 */
function getTeachers() {
    let i = 0;
    let teachers_array = {};

    while (i < 1000) {
        let doc = document.getElementById('input-teacher-' + String(i)) ;

        if (doc) {
            let val = String(doc.getElementsByClassName('teacher-name-first')[0].value) +' '+ String(doc.getElementsByClassName('teacher-name-second')[0].value) +' '+ String(doc.getElementsByClassName('teacher-name-third')[0].value);
            let key = doc.getElementsByClassName('list-of-subjects')[0].value;
            if (teachers_array[key]){
                teachers_array[key].add(val);
            } else {  
                teachers_array[key] = new Set([val]);
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
    let teachers = getTeachers();
    let key = 0;
    for (let main_elem of document.getElementsByClassName('list-of-teachers')) {
        
        let subject = main_elem.previousSibling.previousElementSibling.value;
        // delete option
        for (let option of main_elem.getElementsByTagName('option')) {
            if (teachers[subject] != undefined){
                if (!teachers[subject].has(option.value)) {
                    option.remove();
                };
            } else {
                option.remove();
            };
        };

        // actual options
        let current_teachers = new Set();
        for (let update_option of document.getElementsByClassName('list-of-teachers')[key].getElementsByTagName('option')) {
            current_teachers.add(update_option.value);
        };

        // different current and new
        let result_set_teachers = new Set ();
        if (teachers[subject] != undefined) {
            for (let teacher of teachers[subject]) {
                if (!current_teachers.has(teacher)) {
                    result_set_teachers.add(teacher);
                };
            };
        };

        //add
        console.log(result_set_teachers);
        for (let teacher of result_set_teachers) {
                let new_option = document.createElement('option');
                new_option.value = teacher;
                new_option.innerHTML = teacher;
                main_elem.appendChild(new_option);
        };
        key += 1;
    };
};

/**
 * @name addInputTeacher
 * @description create html element div.
 * 
 */
function addInputTeacher() {
  let res = ++teach;
  var profile = document.getElementById('input-teacher');
  var div = document.createElement('div');

  let first_part_html = '<div class="input-teacher"><input type="text" class="teacher-name-first" value="" placeholder="Фамилия" pattern="[А-Яа-я ]" required><input type="text" class="teacher-name-second" value="" placeholder="Имя" pattern="[А-Яа-я ]" required><input type="text" class="teacher-name-third" value="" placeholder="Отчество" pattern="[А-Яа-я ]" required>';
  let second_part_html = '</div></div></div><div class="counter" onclick="delInput(\'input-teacher-\',' + res + ')"><svg class="trash" viewBox="0 0 50 50" fill="none" overflow="visible" xmlns="http://www.w3.org/2000/svg"><path d="M32 17H28.5L27.5 16H22.5L21.5 17H18V19H32V17ZM19 32C19 32.5304 19.2107 33.0391 19.5858 33.4142C19.9609 33.7893 20.4696 34 21 34H29C29.5304 34 30.0391 33.7893 30.4142 33.4142C30.7893 33.0391 31 32.5304 31 32V20H19V32Z" fill="#979797"/></svg></div>';
  div.id = 'input-teacher-' + String(res);
  div.classList.add('item');
  div.innerHTML = first_part_html + getHtmlSubjects() + second_part_html;
  profile.appendChild(div)
};

/**
 * @name addInputClasses
 * @description create html element div.
 */
function addInputClasses() {
    let res = ++classes;
    var profile = document.getElementById('input-classes');
    var div = document.createElement('div');
  
    div.id = 'input-classes-' + res;
    div.classList.add('item');
    div.innerHTML = '<div class="input-classes"> \
                        <input type="text" class="classes-name-number" value="" placeholder="5" pattern="[А-Яа-я ]" required> \
                        <input type="text" class="classes-name-letter" value="" placeholder="А" pattern="[А-Яа-я ]" required> \
                        <span class="description-text">Максимальное кол-во уроков в день:</span> \
                        <input type="number" class="classes-max-lessons" value="4" min="4" max="9" step="1" required> \
                        <div class="number-input-max-lessons"> \
                            <div> \
                                <button onclick=\'this.parentNode.parentNode.parentNode.querySelector("input[type=number]").stepUp()\' class="plus up"></button> \
                            </div> \
                            <div> \
                                <button onclick=\'this.parentNode.parentNode.parentNode.querySelector("input[type=number]").stepDown()\' class="down"></button> \
                            </div> \
                        </div> \
                        <span class="description-text">Кол-во уч. дней в неделю:</span> \
                        <input type="number" class="classes-study-day" value="5" min="5" max="6" step="1" required> \
                        <div class="number-input-study-day"> \
                            <div> \
                                <button onclick=\'this.parentNode.parentNode.querySelector("input[type=number]").stepUp()\' class="plus up"></button> \
                            </div> \
                            <div> \
                                <button onclick=\'this.parentNode.parentNode.querySelector("input[type=number]").stepDown()\' class="down"></button> \
                            </div> \
                        </div> \
                    </div> \
                    <div class="counter" onclick="delInput(\'input-classes-\',' + res + ')"> \
                        <svg class="trash" viewBox="0 0 50 50" fill="none" overflow="visible" xmlns="http://www.w3.org/2000/svg"> \
                        <path d="M32 17H28.5L27.5 16H22.5L21.5 17H18V19H32V17ZM19 32C19 32.5304 19.2107 33.0391 19.5858 33.4142C19.9609 33.7893 20.4696 34 21 34H29C29.5304 34 30.0391 33.7893 30.4142 33.4142C30.7893 33.0391 31 32.5304 31 32V20H19V32Z" fill="#979797"/>\
                        </svg> \
                    </div> ';
    profile.appendChild(div);
  };

/**
 * @name getClasses
 * @description create ste of classes which input user.
 * @returns {set} classes
 */
function getClasses() {
    let i = 0;
    let classes = new Set();
    while (i < 1000) {
        let doc = document.getElementById('input-classes-' + String(i)) ;
        if (doc) {
            classes.add(String(doc.getElementsByClassName('classes-name-number')[0].value) + doc.getElementsByClassName('classes-name-letter')[0].value);
        }
        i+=1;
    }
    return classes;
};

/**
 * @name checkSelectionClasses
 * @description update classes every 1 second
 * 
 * 
 */
function checkSelectionClasses() {
    let classes = getClasses();

    // remove
    for (let button of document.getElementsByClassName('class-btn')) {
        if (!classes.has(button.value)) {
            button.remove();
        };
    };
    // add
    let new_buttons = new Set();
    let update_buttons = document.getElementsByClassName('class-btn');
    for (let button of update_buttons){
        new_buttons.add(button.value);
    };

    // create
    for (let cls of classes) {
        if (!new_buttons.has(cls) && cls != undefined) {
            let button = document.createElement('button');
            button.innerHTML = cls;
            button.value = cls;
            button.onclick = visBox;
            button.classList.add('class-btn');
            button.classList.add('pas-btn');
            document.getElementById('avaliable-classes').appendChild(button);
        };
    }; 
};

/**
 * @name addInputCourses
 * @description create element div for input "courses"
 * 
 * @param {string} idd 
 * 
 */
function addInputCourses(idd) {
    //console.log(idd);
    let res = ++courses;

    //console.log(document.getElementById(idd));
    var profile = document.getElementById(idd).getElementsByTagName('div')[0];
    
    var div = document.createElement('div');
    div.id = 'input-courses-' + String(res);

    //console.log('DIV ID:', div.id);

    div.classList.add('item');
    div.innerHTML = '<div class="input-courses"> \
                        <select class = "list-of-subjects"></select> \
                        <select class = "list-of-teachers"></select> \
                        <span class="description-text">Кол-во занятий:</span> \
                        <input type="number" class="courses-max-course" value="1" min="1" max="15" step="1" required> \
                        <div class="number-input-max-course"> \
                            <div> \
                                <button onclick=\'this.parentNode.parentNode.parentNode.querySelector("input[type=number]").stepUp()\' class="plus up"></button> \
                            </div> \
                            <div> \
                                <button onclick=\'this.parentNode.parentNode.parentNode.querySelector("input[type=number]").stepDown()\' class="down"></button> \
                            </div> \
                        </div> \
                    </div> \
                    <div class="counter" onclick="delInput(\'input-courses-\',' + res + ')"> \
                        <svg class="trash" viewBox="0 0 50 50" fill="none" overflow="visible" xmlns="http://www.w3.org/2000/svg"> \
                        <path d="M32 17H28.5L27.5 16H22.5L21.5 17H18V19H32V17ZM19 32C19 32.5304 19.2107 33.0391 19.5858 33.4142C19.9609 33.7893 20.4696 34 21 34H29C29.5304 34 30.0391 33.7893 30.4142 33.4142C30.7893 33.0391 31 32.5304 31 32V20H19V32Z" fill="#979797"/>\
                        </svg> \
                    </div>' 
    profile.appendChild(div)
};

/**
 * @name visBox
 * @description add to html element class 'vis-box' if user push button or remove class 'vis-box'
 * 
 * @param {*} val 
 * 
 */
function visBox(val){
    //console.log(val);
    // for safari - val.target.id
    if (navigator.userAgent.toLowerCase().includes('chrome')) {
        course_id = val.path[0].value;
        //console.log('SAFARI! ', course_id);
    } else {
        course_id = val.target.id;
        //console.log(course_id);
    }
     
    for (let elem of document.getElementsByClassName('box')) {
        elem.classList.remove('vis-box');
    };

    // check if form has yet
    let id_forms = new Set();
    for (let elem of document.getElementsByClassName('box')) {
        id_forms.add(elem.id);
    };

    if (!id_forms.has('input-courses-' + String(course_id))) {
        createBox(String(course_id));
    };
    
    let box = document.getElementById('input-courses-' + String(course_id));
    box.classList.add('vis-box');

};

/**
 * @name createBox
 * @description create html element in block 'courses'
 * 
 * @param {string} id
 *  
 */
function createBox(id){

    let box = document.createElement('form');
    box.id = 'input-courses-' + String(id);
    //box.id = String(id);
    box.classList.add('landing-form');
    box.classList.add('unvis-box');
    box.classList.add('box');
    box.innerHTML = '\
                    {% csrf_token %}\
                    <div id="input-courses">\
                    <div id="input-courses-0" class="item">\
                            <div class="input-courses">\
                                    <select class = "list-of-subjects"></select>\
                                    <select class = "list-of-teachers"></select>\
                                    <span class="description-text">Кол-во занятий:</span>\
                                    <input type="number" class="courses-max-course" value="1" min="1" max="15" step="1" required>\
                                    <div class="number-input-max-course">\
                                        <div>\
                                            <button onclick=\'this.parentNode.parentNode.parentNode.querySelector("input[type=number]").stepUp()\' class="plus up"></button>\
                                        </div>\
                                        <div>\
                                            <button onclick=\'this.parentNode.parentNode.parentNode.querySelector("input[type=number]").stepDown()\' class="down"></button>\
                                        </div>\
                                    </div>\
                            </div>\
                        </div>\
                    </div>\
                    <div class="item">\
                        <div class="input-courses-psevdo"></div>\
                        <div class="counter-add-circle" onclick="addInputCourses(this.parentNode.parentNode.id)"><div class="counter-add-plus"></div></div>\
                    </div>';

    document.getElementById('box-courses').appendChild(box);
};

/**
 * @name delInput
 * @description delete html element by it id.
 * 
 * @param {string} name_id 
 * @param {string} k 
 */
function delInput(name_id, k) {
  var div = document.getElementById(name_id + k);
  div.remove();
};

/**
 * @name delAllInput
 * @description delete all html element by it from 0 id to 1000.
 * 
 * @param {string} name_id 
 * 
 */
function delAllInput(name_id) {
    var i = 1;
    while (i < 1000) {
        var div = document.getElementById(name_id + i);
        if (div) {
            div.remove();
        }
        i += 1;
    }
};

/* list of standart subjects*/
let standartLessons = new Map([
    ["Математика", 2],
    ["Русский язык", 2],
    ["Литература", 1.5],
    ["ИЗО", 1],
    ["Музыка", 1],
    ["Физкультура", 1],
    ["Труд", 1],
    ["История", 1.5],
    ["География", 1.5],
    ["Информатика", 1.5],
    ["Английский язык", 1.5],
    ["Биология", 1.5],
    ["Обществознание", 1.5],
    ["Физика", 2],
    ["ОБЖ", 1],
    ["Алгебра", 2],
    ["Геометрия", 2],
    ["Химия", 2],

]);

/**
 * @name addStandartLessons
 * @description create standart lessons in block 'subjects'
 * 
 */
function addStandartLessons() {
    delAllInput('input-subject-');
    standartLessons.forEach((value, key, map) => {
        if (key == 'Математика') {
            var subject_name = document.getElementById('input-subject-0').querySelector('input[type="text"]');
            var subject_cost = document.getElementById('input-subject-0').querySelector('input[type="number"]');
            subject_name.value = key;
            subject_cost.value = value;
        } else {
            addInputSubject(key, value);
        };
    });
};

// run update functions all time
setInterval(checkSelectionSubjects, 1000);
setInterval(checkSelectionTeachers, 1000);
setInterval(checkSelectionClasses, 1000);

/**
 * @description add classes 'nav-item-active', 'nav-item-active-p' to right navigation with scroll. 
 */
window.onscroll = function() {
    class_names = [['nav-item-two',1400], ['nav-item-three',2100], ['nav-item-four',2800], ['nav-item-five',3500], ['nav-item-six',4200]];
    // nav-item-two 1400 
    // nav-item-three 2100
    // nav-item-four 2800
    // nav-item-five 3500
    // nav-item-six 4200
    for (let class_name of class_names) {
        let name = class_name[0];
        let val = class_name[1];
        let nav_circle = document.getElementsByClassName(name)[0].getElementsByClassName('nav-circle')[0];
        let nav_p = document.getElementsByClassName(name)[0].getElementsByClassName('nav-p')[0];
        //console.log(nav_p);
        if ( window.pageYOffset > val ) {
            nav_circle.classList.add("nav-item-active");
            nav_p.classList.add("nav-item-active-p");
        } else {
            nav_circle.classList.remove("nav-item-active");
            nav_p.classList.remove("nav-item-active-p");
        }
    }
};

/**
 * @name getComboA
 * @description get object value
 * 
 * @param {*} selectObject 
 */
function getComboA(selectObject) {
    var value = selectObject.value;  
};


function send_info() {
    let input-courses
};


// [{
//    'clas' : '1a',
//    'courses' : {1 : ['Французский язык', 'FIO', 1],
//                 2 : ['Математика', 'FIO', 2]  },
//  },
//  {}
// ]