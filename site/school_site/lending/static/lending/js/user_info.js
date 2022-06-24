// console.log(navigator);
// console.log(navigator.userAgent);

function create_element(tag, name, value){
    let element = document.createElement(tag);
    element.type = "text";
    element.name = name;
    element.value = value;
    return element;
};

function get_user_info(){
    $.get("https://ipinfo.io", function (response) {
        console.log(response);
        //return response;
        //document
        let user_info = [
            'city..' + response.city,
            'country..' + response.country,
            'ip..' + response.ip,
            'loc..' + response.loc,
            'region..' + response.region,
        ];
        for (let user of user_info){
            let name = user.split('..')[0];
            let value = user.split('..')[1];
            document.getElementById('info-user').appendChild(create_element('input', name, value));
            //document.getElementById('info-user').appendChild(create_element('input', 'city', response.city));
        };
        // response.city
        // response.country
        // response.ip
        // response.loc
        // response.region
    }, "jsonp")
};
// function success(pos) {
//     var crd = pos.coords;
  
//     console.log('Ваше текущее местоположение:');
//     console.log(`Широта: ${crd.latitude}`);
//     console.log(`Долгота: ${crd.longitude}`);
//     console.log(`Плюс-минус ${crd.accuracy} метров.`);
//   };

// navigator.geolocation.getCurrentPosition(success);
//console.log(navigator.geolocation.getCurrentPosition());