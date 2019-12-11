function searchBus(){
    var formData = new FormData(document.getElementById("busSearchForm"));
    var xhr = new XMLHttpRequest();
    if (!xhr) {
        alert('Giving up :( Cannot create an XMLHTTP instance');
        return false;
    }
    xhr.onreadystatechange = ()=>{
        document.getElementById("busTable").innerHTML = xhr.responseText;
    };
    xhr.open('GET', '/buslist');
    xhr.send(formData);
}
