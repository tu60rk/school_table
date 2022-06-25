function create_element(tag, name, value){
    let element = document.createElement(tag);
    element.type = "text";
    element.name = name;
    element.value = value;
    return element;
};

function get_user_info(){
    $.get("https://ipinfo.io", function (response) {
        let user_info = [
            'city..' + response.city,
            'country..' + response.country,
            'ip..' + response.ip,
            'loc..' + response.loc,
            'region..' + response.region,
        ];
        console.log(response);
        for (let user of user_info){
            let name = user.split('..')[0];
            let value = user.split('..')[1];
            document.getElementById('info-user').appendChild(create_element('input', name, value));
        };
    }, "jsonp")
};