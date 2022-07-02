let sub = 0;

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
 function getHtmlSubjects(class_name, selected_subjects = new Set()) {
    let elements = getSubjects();
    let name_tag = 'name="teacher-subject" ';
    let add_to_select = '';

    if (class_name === 'list-of-subjects-using-select') {
        add_to_select = 'required multiple title="Выберите предметы..." data-selected-text-format="count > 2" data-size="5" data-actions-box="true" data-live-search="true" data-header="Готово" data-width="250px">'
    } else {
        add_to_select = 'required>'
    };
    let html = '<select class = "' + class_name + '" ' + name_tag + add_to_select;

    if (class_name === 'list-of-subjects') {
        html += '<option class = "option-disabled" value="" disabled selected>Выбери предмет</option>';    
    };

    for (let element of elements) {
        if (selected_subjects.has(element.value )){
            html += '<option value = "'+ element.value + '" selected="selected">' + element.value + '</option>';
        } else {
            html += '<option value = "'+ element.value + '">' + element.value + '</option>';
        };
    };
    return html += '</select>';
};

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
    let profile = document.getElementById('input-subject');
    let div = document.createElement('div');
    div.id = 'input-subject-' + res;
    div.classList.add('item');
    div.innerHTML = '<div class="input-subject">\
                          <input type="text" name="subject" class="subject-name" value="'+ name_subject +'" placeholder="Название предмета" pattern="^[А-Яа-яЁё\\s]+$" required>\
                     </div>\
                     <div class="counter" onclick="delInput(\'input-subject-\',' + res + ')">\
                        <svg class="trash" viewBox="0 0 50 50" fill="none" overflow="visible" xmlns="http://www.w3.org/2000/svg"><path d="M32 17H28.5L27.5 16H22.5L21.5 17H18V19H32V17ZM19 32C19 32.5304 19.2107 33.0391 19.5858 33.4142C19.9609 33.7893 20.4696 34 21 34H29C29.5304 34 30.0391 33.7893 30.4142 33.4142C30.7893 33.0391 31 32.5304 31 32V20H19V32Z" fill="#979797"/></svg>\
                     </div>';
    profile.appendChild(div);

    let scroll_to_bottom = document.getElementsByClassName('boxer')[0];
	scrollBottom(scroll_to_bottom);
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

    for (let i of [1,2,3,4]){
        for (let main_elem of document.getElementsByTagName('select')) {
            if (main_elem.classList.contains('list-of-subjects-using-select')) {

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
                        //console.log('CREATE!', subject);
                        let new_option = document.createElement('option');
                        new_option.value = subject;
                        new_option.innerHTML = subject;
                        main_elem.appendChild(new_option);
                    };
                };           
            };
        };
    };
    $('.list-of-subjects-using-select').selectpicker('refresh');
};