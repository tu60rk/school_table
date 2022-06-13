$('.choose-count').selectpicker('refresh');

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
            subject_name.value = key;
        } else {
            addInputSubject(key, value);
        };
    });
};

let addStandartLessonsEvent = document.getElementById('addstandartlessons');
if (addStandartLessonsEvent.addEventListener) {
    addStandartLessonsEvent.addEventListener('click', addStandartLessons, false)
}

// run update functions all time
//setInterval(checkSelectionSubjects, 100);
//setInterval(checkSelectionTeachers, 100);
//setInterval(checkSelectionClasses, 100);

/**
 * @description add classes 'nav-item-active', 'nav-item-active-p' to right navigation with scroll. 
 */
window.onscroll = function() {
    class_names = [['nav-item-one', 700], ['nav-item-two',1400], ['nav-item-three',2100], ['nav-item-four',2800], ['nav-item-six',3500]];
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

        if ( window.pageYOffset > val && window.pageYOffset < val + 700 ) {
            nav_circle.classList.add("nav-item-active");
            nav_p.classList.add("nav-item-active-p");
        } else {
            nav_circle.classList.remove("nav-item-active");
            nav_p.classList.remove("nav-item-active-p");
        };
    };
};


function update_lvl(lvl) {
    switch(lvl) {
        case 'subject':
            checkSelectionSubjects();     
        case 'teacher':
            checkSelectionSubjects(); 
            checkSelectionTeachers(); 
        case 'classes':
            checkSelectionSubjects();
            checkSelectionTeachers();
            checkSelectionClasses();
      };
};