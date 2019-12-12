function searchBus(){
    var formData = new FormData(document.getElementById("busSearchForm"));
    var xhr = new XMLHttpRequest(formData);
    if (!xhr) {
        alert('Giving up :( Cannot create an XMLHTTP instance');
        return false;
    }
    xhr.onreadystatechange = ()=>{
        document.getElementById("busTable").innerHTML = xhr.responseText;
    };
    let formstr = "";
    for(let key of formData.keys()){
        formstr +=key+"="+formData.get(key)+"&";
    }
    xhr.open('GET', '/buslist?'+formstr);
    xhr.send();
}
function searchUser(){
    var formData = new FormData(document.getElementById("userSearchForm"));
    var xhr = new XMLHttpRequest();
    if (!xhr) {
        alert('Giving up :( Cannot create an XMLHTTP instance');
        return false;
    }
    xhr.onreadystatechange = ()=>{
        document.getElementById("userTable").innerHTML = xhr.responseText;
    };
    let formstr = "";
    for(let key of formData.keys()){
        formstr +=key+"="+formData.get(key)+"&";
    }
    xhr.open('GET', '/memberlist?'+formstr);
    xhr.send();
}

function updateCoin(id, coinInput){
    var xhr = new XMLHttpRequest();
    if (!xhr) {
        alert('Giving up :( Cannot create an XMLHTTP instance');
        return false;
    }
    xhr.onload = ()=>{
        alert(xhr.responseText);
    };
    xhr.open('GET', '/member/updateCoin?coin='+document.getElementById(coinInput).value+"&id="+id);
    xhr.send();
}

function searchReservations() {
    
}