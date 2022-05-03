var x = 0;

function addInput() {
  let res = ++x;
  var profile = document.getElementById('profile');
  var div = document.createElement('div');
  div.id = 'input' + res;
  div.class = 'item';
  div.innerHTML = '<input type="text" class="subject_name" placeholder="Название предмета" required pattern="[А-Яа-я ]"> <input type="number" class="subject_cost" value="1" min="1" max="2" step="0.5"> <div class="counter" onclick="delInput(' + res +')">-</div>';
  profile.appendChild(div);
}
