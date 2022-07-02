let courses = 0;


/**
 * @name addInputCourses
 * @description create element div for input "courses"
 * 
 * @param {string} idd 
 * 
 */
 function addInputCourses(idd, input_teacher = '', input_subject = '', input_count_lessons = '') {
    let res = ++courses;
    
    let profile = document.getElementById(idd).getElementsByTagName('div')[0];
    let div = document.createElement('div');
    div.id = 'input-courses-' + String(res);

    div.classList.add('item');

    let first_create_box = '\
            <div class="input-courses">\
                    <input type="text" name="courses_classes" value="'+ String(idd.split('-')[2]) +'" class="not-display">';

    let second_create_box = '</div> \
    <div class="counter" onclick="delInput(\'input-courses-\',' + res + ')"> \
        <svg class="trash" viewBox="0 0 50 50" fill="none" overflow="visible" xmlns="http://www.w3.org/2000/svg"> \
        <path d="M32 17H28.5L27.5 16H22.5L21.5 17H18V19H32V17ZM19 32C19 32.5304 19.2107 33.0391 19.5858 33.4142C19.9609 33.7893 20.4696 34 21 34H29C29.5304 34 30.0391 33.7893 30.4142 33.4142C30.7893 33.0391 31 32.5304 31 32V20H19V32Z" fill="#979797"/>\
        </svg> \
    </div>';
    
    let disabled = '';
    if (input_teacher === '' && input_subject === '' && input_count_lessons === ''){
        disabled = 'disabled';
        div.innerHTML = first_create_box + getHtmlTeachers() + '\
        <select id="list-of-subjects-using-select" class="list-of-subjects-using-select" data-width="auto" name="courses_subject" required title="Выберите предмет..." data-size="5" data-live-search="true" ' + disabled + '>\
        </select>\
        <div>\
            <span class="description-text not-active-description-text">Кол-во занятий:</span> \
            <select name="courses_count_lessons" class="choose-count" '+ disabled +' data-size="5">\
                    <option value="1" selected>1</option>\
                    <option value="2">2</option>\
                    <option value="3">3</option>\
                    <option value="4">4</option>\
                    <option value="5">5</option>\
                    <option value="6">6</option>\
                    <option value="7">7</option>\
                    <option value="8">8</option>\
                    <option value="9">9</option>\
                    <option value="10">10</option>\
            </select>\
        </div>' + second_create_box
    } else {
        div.innerHTML = first_create_box + getHtmlTeachers(input_teacher) + '\
        <select id="list-of-subjects-using-select" class="list-of-subjects-using-select" data-width="auto" name="courses_subject" required title="Выберите предмет..." data-size="5" data-live-search="true" ' + disabled + '>\
        ' + create_subjects(input_teacher, input_subject) +'\
        </select>\
        <div>\
            <span class="description-text not-active-description-text">Кол-во занятий:</span> \
            <select name="courses_count_lessons" class="choose-count" '+ disabled +' data-size="5">\
            '+ create_count_lessons(input_count_lessons) +'\
            </select>\
        </div>' + second_create_box
    }

    // div.innerHTML = '<div class="input-courses"> \
    //                     <input type="text" name="courses_classes" value="'+ String(idd.split('-')[2]) +'" class="not-display">' + getHtmlTeachers() + '\
    //                     <select id="list-of-subjects-using-select" class="list-of-subjects-using-select" data-width="auto" name="courses_subject" required disabled title="Выберите предмет..." data-size="5" data-live-search="true"></select>\
    //                     <div>\
    //                         <span class="description-text not-active-description-text">Кол-во занятий:</span> \
    //                         <select name="courses_count_lessons" class="choose-count" disabled data-size="5">\
    //                                 <option value="1" selected>1</option>\
    //                                 <option value="2">2</option>\
    //                                 <option value="3">3</option>\
    //                                 <option value="4">4</option>\
    //                                 <option value="5">5</option>\
    //                                 <option value="6">6</option>\
    //                                 <option value="7">7</option>\
    //                                 <option value="8">8</option>\
    //                                 <option value="9">9</option>\
    //                                 <option value="10">10</option>\
    //                         </select>\
    //                     </div>\
    //                 </div> \
    //                 <div class="counter" onclick="delInput(\'input-courses-\',' + res + ')"> \
    //                     <svg class="trash" viewBox="0 0 50 50" fill="none" overflow="visible" xmlns="http://www.w3.org/2000/svg"> \
    //                     <path d="M32 17H28.5L27.5 16H22.5L21.5 17H18V19H32V17ZM19 32C19 32.5304 19.2107 33.0391 19.5858 33.4142C19.9609 33.7893 20.4696 34 21 34H29C29.5304 34 30.0391 33.7893 30.4142 33.4142C30.7893 33.0391 31 32.5304 31 32V20H19V32Z" fill="#979797"/>\
    //                     </svg> \
    //                 </div>' 
    profile.appendChild(div)
    $('.list-of-subjects-using-select').selectpicker('refresh');
    $('.list-of-teachers-using-select').selectpicker('refresh');
    $('.choose-count').selectpicker('refresh');

    let scroll_to_bottom = document.getElementsByClassName('landing-choose-courses')[0].getElementsByClassName('box');
    for (let box of scroll_to_bottom){
        scrollBottom(box);
    };
};

/**
 * @name visBox
 * @description add to html element class 'vis-box' if user push button or remove class 'vis-box'
 * 
 * @param {*} val 
 * 
 */
function visBox(val){

    //check_active_classes();

    if (navigator.userAgent.toLowerCase().includes('chrome')) {
        // course_id = val.path[0].value;
        // Event.composedPath()'
        course_id = val.composedPath()[0].value;
    } else {
        course_id = val.target.id;
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

    //getArrayTeachers();

};


function create_subjects(teacher, input_subject){
    let result_option = '';
    let subjects = getArrayTeachers()[teacher];
    for (let subject of subjects){
        let selected = '';
        if (subject === input_subject){
            selected = 'selected';
        };

        result_option += '<option value = "' + subject + '"' + selected +'>' + subject + '</option>';
    };
    return result_option
};

function create_count_lessons(input_count_lessons){
    let result_option = '';
    for (let i = 1; i < 11; i++){
        let selected = '';
        if (String(i) === String(input_count_lessons)){
            selected = 'selected';
        }
        result_option += '<option value = "' + String(i) + '" ' + selected +'>' + String(i) + '</option>';
    };
    return result_option;
}

/**
 * @name createBox
 * @description create html element in block 'courses'
 * 
 * @param {string} id
 *  
 */
function createBox(id, input_teacher = '', input_subject = '', input_count_lessons = ''){


    let box = document.createElement('div');
    box.id = 'input-courses-' + String(id);
    box.classList.add('landing-form');
    box.classList.add('unvis-box');
    box.classList.add('box');


    let first_create_box = '\
    <div id="input-courses">\
    <div id="input-courses-0" class="item">\
            <div class="input-courses">\
                    <input type="text" name="courses_classes" value="'+ String(id) +'" class="not-display">';

    let second_create_box = '\</div>\
                        <div class="psevdo-trash"></div>\
                    </div>\
                </div>\
                <div class="item">\
                    <div class="input-psevdo"></div>\
                    <div class="counter-add-circle" onclick="addInputCourses(this.parentNode.parentNode.id)"><div class="counter-add-plus"></div></div>\
                </div>';
    
    let disabled = '';
    if (input_teacher === '' && input_subject === '' && input_count_lessons === ''){
        disabled = 'disabled';
    

        box.innerHTML = first_create_box + getHtmlTeachers(input_teacher) + '\
                        <select id="list-of-subjects-using-select" class="list-of-subjects-using-select" data-width="auto" name="courses_subject" required title="Выберите предмет..." data-size="5" data-live-search="true"'+ disabled +'></select>\
                        <div>\
                            <span class="description-text not-active-description-text">Кол-во занятий:</span>\
                            <select name="courses_count_lessons" class="choose-count" '+ disabled +' data-size="5">\
                                    <option value="1" selected>1</option>\
                                    <option value="2">2</option>\
                                    <option value="3">3</option>\
                                    <option value="4">4</option>\
                                    <option value="5">5</option>\
                                    <option value="6">6</option>\
                                    <option value="7">7</option>\
                                    <option value="8">8</option>\
                                    <option value="9">9</option>\
                                    <option value="10">10</option>\
                            </select>\
                        </div>\
                        ' + second_create_box;
    } else {
        box.innerHTML = first_create_box + getHtmlTeachers(input_teacher) + '\
        <select id="list-of-subjects-using-select" class="list-of-subjects-using-select" data-width="auto" name="courses_subject" required title="Выберите предмет..." data-size="5" data-live-search="true"'+ disabled +'> \
        ' + create_subjects(input_teacher, input_subject) +'\
        </select>\
        <div>\
            <span class="description-text not-active-description-text">Кол-во занятий:</span>\
            <select name="courses_count_lessons" class="choose-count" '+ disabled +' data-size="5">\
            '+ create_count_lessons(input_count_lessons) +'\
            </select>\
        </div>\
        ' + second_create_box;
    };

    document.getElementById('box-courses').appendChild(box);
    $('.list-of-subjects-using-select').selectpicker('refresh');
    $('.list-of-teachers-using-select').selectpicker('refresh');
    $('.choose-count').selectpicker('refresh');
};

$(document).on('change', '#list-of-teachers-using-select', function(e){

                let value = this.value;
                let elements_main = this.parentNode.parentNode.getElementsByClassName('list-of-subjects-using-select');

                if (elements_main[0].classList.contains('disabled') != -1) {
                    elements_main[0].getElementsByTagName('select')[0].disabled = false;
                    elements_main[0].getElementsByTagName('button')[0].classList.remove('disabled');
                    elements_main[0].classList.remove('disabled');
                };
                
                //console.log(subjects);
                let subjects = getArrayTeachers()[value];
                let selected = false;

                if (subjects.size == 1){
                    selected = true;
                    elements_main = this.parentNode.parentNode.getElementsByClassName('choose-count');
                    if (elements_main[0].classList.contains('disabled') != -1) {
                        elements_main[0].getElementsByTagName('select')[0].disabled = false;
                        elements_main[0].getElementsByTagName('button')[0].classList.remove('disabled');
                        this.parentNode.parentNode.getElementsByClassName('description-text')[0].classList.remove('not-active-description-text');
                        elements_main[0].classList.remove('disabled'); 
                    };
                };
                
                // remove
                let options = this.parentNode.parentNode.getElementsByClassName('list-of-subjects-using-select')[0].getElementsByTagName('option')
                let cc = 1;

                for (let option of options){
                    if (cc === 1) {
                        cc += 1;
                        continue;
                    };
                    option.remove();
                };
                
                for (let subject of subjects) {
                    let new_option = document.createElement('option');
                    new_option.value = subject;
                    new_option.innerHTML = subject;
                    new_option.defaultSelected = selected;
                    this.parentNode.parentNode.getElementsByClassName('list-of-subjects-using-select')[0].getElementsByTagName('select')[0].appendChild(new_option);
                };

                $('.list-of-subjects-using-select').selectpicker('refresh');
});


$(document).on('change', '#list-of-subjects-using-select', function(e){
    
    elements_main = this.parentNode.parentNode.getElementsByClassName('choose-count');
    if (elements_main[0].classList.contains('disabled') != -1) {
        elements_main[0].getElementsByTagName('select')[0].disabled = false;
        elements_main[0].getElementsByTagName('button')[0].classList.remove('disabled');
        this.parentNode.parentNode.getElementsByClassName('description-text')[0].classList.remove('not-active-description-text');
        elements_main[0].classList.remove('disabled'); 
    };

    $('.choose-count').selectpicker('refresh');
});