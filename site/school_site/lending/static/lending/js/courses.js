let courses = 0;


/**
 * @name addInputCourses
 * @description create element div for input "courses"
 * 
 * @param {string} idd 
 * 
 */
 function addInputCourses(idd) {
    let res = ++courses;

    var profile = document.getElementById(idd).getElementsByTagName('div')[0];
    
    var div = document.createElement('div');
    div.id = 'input-courses-' + String(res);

    div.classList.add('item');
    // <select name="courses_teacher" class="list-of-teachers" required><option class = "option-disabled" value="" disabled selected>Выбери учителя</option></select> \
    div.innerHTML = '<div class="input-courses"> \
                        <input type="text" name="courses_classes" value="'+ String(idd.split('-')[2]) +'" class="not-display">' + getHtmlTeachers() + '\
                        <select class="list-of-subjects-using-select" name="teacher-subject" required disabled title="Выберите предмет..." data-size="5" data-live-search="true"></select>\
                        <div>\
                            <span class="description-text">Кол-во занятий:</span> \
                            <select name="courses_count_lessons" class="choose-count" disabled>\
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
                    </div> \
                    <div class="counter" onclick="delInput(\'input-courses-\',' + res + ')"> \
                        <svg class="trash" viewBox="0 0 50 50" fill="none" overflow="visible" xmlns="http://www.w3.org/2000/svg"> \
                        <path d="M32 17H28.5L27.5 16H22.5L21.5 17H18V19H32V17ZM19 32C19 32.5304 19.2107 33.0391 19.5858 33.4142C19.9609 33.7893 20.4696 34 21 34H29C29.5304 34 30.0391 33.7893 30.4142 33.4142C30.7893 33.0391 31 32.5304 31 32V20H19V32Z" fill="#979797"/>\
                        </svg> \
                    </div>' 
    profile.appendChild(div)
    $('.list-of-subjects-using-select').selectpicker('refresh');
    $('.list-of-teachers-using-select').selectpicker('refresh');
    $('.choose-count').selectpicker('refresh');
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

/**
 * @name createBox
 * @description create html element in block 'courses'
 * 
 * @param {string} id
 *  
 */
function createBox(id){

    //check_active_classes();

    let box = document.createElement('div');
    box.id = 'input-courses-' + String(id);
    box.classList.add('landing-form');
    box.classList.add('unvis-box');
    box.classList.add('box');
    box.innerHTML = '\
                    <div id="input-courses">\
                    <div id="input-courses-0" class="item">\
                            <div class="input-courses">\
                                    <input type="text" name="courses_classes" value="'+ String(id) +'" class="not-display">' + getHtmlTeachers() + '\
                                    <select class="list-of-subjects-using-select" name="teacher-subject" required disabled title="Выберите предмет..." data-size="5" data-live-search="true"></select>\
                                    <div>\
                                        <span class="description-text">Кол-во занятий:</span>\
                                        <select name="courses_count_lessons" class="choose-count" disabled>\
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
                            </div>\
                            <div class="psevdo-trash"></div>\
                        </div>\
                    </div>\
                    <div class="item">\
                        <div class="input-psevdo"></div>\
                        <div class="counter-add-circle" onclick="addInputCourses(this.parentNode.parentNode.id)"><div class="counter-add-plus"></div></div>\
                    </div>';

    document.getElementById('box-courses').appendChild(box);
    $('.list-of-subjects-using-select').selectpicker('refresh');
    $('.list-of-teachers-using-select').selectpicker('refresh');
    $('.choose-count').selectpicker('refresh');
};

$('select').on('change', function(e){
    console.log(this.value,
                this.options[this.selectedIndex].value,
                $(this).find("option:selected").val(),);
  });

// function upd(){
//     // $('select').on('change', function(e){
//     //     console.log(this.value,
//     //                 this.options[this.selectedIndex].value,
//     //                 $(this).find("option:selected").val(),);
//     //   });
//     console.log('upd!');
//     let n = document.querySelectorAll('list-of-teachers-using-select');
//     for (let el of n) {
//       if (el.value) {
//           console.log(el.value);
//           el.nextElementSibling.removeAttribute('disabled')
//       }  
//     };
// };
// setInterval(upd, 1);

// function get_available(element){
//     console.log('ELEMENT!', element);
//     console.log('ELEMENT NEXT!', element.nextElementSibling);
// };

// for (let item of document.querySelectorAll(".list-of-teachers-using-select")) {
//     console.log('HERE!');
//     item.addEventListener('click', but => {
//         //remove_class();
//         console.log(item.nextElementSibling);
//         item.nextElementSibling.removeAttribute('disabled');//classList.add("class-active");
//         $('.list-of-teachers-using-select').selectpicker('refresh');
//     });
// };

// document.querySelectorAll(".list-of-teachers-using-select").onclick = function(event) {
//     let td = event.target.closest('select'); // (1)
  
//     if (!td) return; // (2)
  
//     //if (!table.contains(td)) return; // (3)
//     console.log('HERE!', td);
//     //highlight(td); // (4)
//   };

// select.onclick() = function(event){
    
//     console.log('XM', event.target);
// }

// const select = document.querySelector('select');
// select.addEventListener('change', addMe);
// select.addEventListener('mouseup', changeMe);
// let chosen = [];

// function changeMe(e) {
//   select.removeEventListener('mouseup', changeMe);
//   select.dispatchEvent(new Event('change'));
// }

// function addMe(e) {
//   chosen.push(e.target.options[e.target.selectedIndex].value);
//   console.log(chosen);
// }

$('.btn').on('click', function() {
    // действия, которые будут выполнены при наступлении события...
    console.log('123');
    console.log($(this).text());
  });