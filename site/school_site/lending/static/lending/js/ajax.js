$('#loading_box').hide();
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
                    document.body.classList.add('loaded_hiding');
                    window.setTimeout(function () {
                      document.body.classList.add('loaded');
                      document.body.classList.remove('loaded_hiding');
                    }, 500);
                   link.href = response.file_path + response.file_name;
                   link.classList.remove("not-display");
                   link.download = response.file_name;
                   link.innerText = 'Скачать результат';
                   let div = document.createElement('div');
                   div.innerHTML = response.timetable_grah;
                   document.getElementsByClassName('landing-choose-finish')[0].getElementsByClassName('boxer')[0].appendChild(div);
                  }else{
                    link.innerText = 'Упс! Алгоритм не смог обработать данные.</br> Попробуйте поменять их и повторите снова.';
              }
            },
            // если ошибка, то
            error: function (response) {
                // предупредим об ошибке
                alert(response.responseJSON.errors);
                console.log(response.responseJSON.errors)
            }
        });
        return false;
    });
})