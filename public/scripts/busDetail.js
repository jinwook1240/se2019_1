window.onload = ()=>{
    setSeatsId();
    loadSeats();
    setInterval(()=>{
        loadSeats();
    },10000);
};
let reservedSeats = [9999];
let selectedSeats = [9999];
function loadSeats(){
    let xhr = new XMLHttpRequest();
    if (!xhr) {
        alert('Giving up :( Cannot create an XMLHTTP instance');
        return false;
    }
    xhr.onload = ()=>{
        //document.getElementById("seatTable").innerHTML = xhr.responseText;
        let tmpReservedSeats = [];
        console.log(xhr.responseText);
        let seatobjlist = JSON.parse(xhr.responseText);
        for(let seatobj in seatobjlist){
            tmpReservedSeats.push(seatobj['seat_number']);
        }
        reservedSeats = tmpReservedSeats;
        setSeatsProps();

    };
    xhr.open('GET', '/seat/'+row.bus_code);
    xhr.send();
    document.getElementById('seatTable');

}
function setSeatsId(){
    let table = document.getElementById("seatTable");
    for(let idx = 0; idx<table.children[0].children.length; idx++){
        if(idx<1 || idx===table.children[0].children.length-1) continue;
        for(let idx1=0; idx1<table.children[0].children[idx].children.length; idx1++){
            let seatnum = 3*(idx-1);
            seatnum+=idx1+1;
            if(idx===1){
                if(idx1===2){
                    table.children[0].children[idx].children[idx1+1].innerHTML = "<button id='seat_"+seatnum+"' onclick='onSelectSeat(event)'>"+seatnum+"</button>";
                }else if(idx1===3){
                    continue;
                }
                else{
                    table.children[0].children[idx].children[idx1].innerHTML = "<button id='seat_"+seatnum+"' onclick='onSelectSeat(event)'>"+seatnum+"</button>";
                }
            }
            else{
                table.children[0].children[idx].children[idx1].innerHTML = "<button id='seat_"+seatnum+"' onclick='onSelectSeat(event)'>"+seatnum+"</button>";
            }
        }
    }
}
function setSeatsProps(){
    for(let seatnum = 1;seatnum<29;seatnum++){
        let seatid = 'seat_'+seatnum;
        if(reservedSeats.includes(seatnum)){
            //console.log("reserved :",seatid);
            if(selectedSeats.includes(seatnum)){
                delete selectedSeats[selectedSeats.indexOf(seatnum)];
            }
            document.getElementById(seatid)['disabled'] = true;
        }
        else if(selectedSeats.includes(seatnum)){
            //console.log("selected :",seatid);
            document.getElementById(seatid).style.backgroundColor="#ff0000";
            document.getElementById(seatid)['disabled'] = false;
        }else{
            //console.log("not selected :",seatid);
            document.getElementById(seatid).style.backgroundColor="#ffffff";
            document.getElementById(seatid)['disabled'] = false;
        }
    }
    document.getElementById("cost").value=selectedSeats.length-1;
    document.getElementById("seats_num").value=(selectedSeats.length-1)*row.rate;
}
function onSelectSeat(event){
    if(!selectedSeats.includes(Number(event.target.id.replace("seat_", "")))){
        selectedSeats.push(Number(event.target.id.replace("seat_", "")));
        event.target.style.backgroundColor="#ff0000";
    }
    else{
        event.target.style.backgroundColor="#ffffff";
        delete selectedSeats[selectedSeats.indexOf(Number(event.target.id.replace("seat_", "")))];
        selectedSeats = selectedSeats.filter(String);
    }
    document.getElementById("cost").value=selectedSeats.length-1;
    document.getElementById("seats_num").value=(selectedSeats.length-1)*row.rate;
}
function onSubmitClicked(){
    window.location.href="/payment?";
}