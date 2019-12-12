window.onload = ()=>{
    setSeatsId();
    loadSeats();
    setInterval(()=>{
        loadSeats();
    },10000);
};
let selectedSeatsDummy = 99999;
let reservedSeats = [];
let selectedSeats = [selectedSeatsDummy];
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
                selectedSeats = selectedSeats.filter(String);
                alert(seatnum+"번 좌석이 예약되었습니다. 다른 좌석을 선택하세요");
            }
            document.getElementById(seatid)['disabled'] = true;
        }
        else if(selectedSeats.includes(seatnum)){
            //console.log("selected :",seatid);
            document.getElementById(seatid).style.backgroundColor="#ff0000";
            document.getElementById(seatid)['disabled'] = false;
            delete document.getElementById(seatid)['disabled'];
        }else{
            //console.log("not selected :",seatid);
            document.getElementById(seatid).style.backgroundColor="#ffffff";
            document.getElementById(seatid)['disabled'] = false;
            delete document.getElementById(seatid)['disabled'];
        }
    }
    document.getElementById("cost").value=selectedSeats.length-1;
    document.getElementById("seats_num").value=(selectedSeats.length-1)*row.rate;
    if(selectedSeats.length-1>0){
        document.getElementById("doReservation")["hidden"] = false;
        delete document.getElementById("doReservation")["hidden"];
    }
    else{
        document.getElementById("doReservation")["hidden"] = true;
    }
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
    if(selectedSeats.length-1>0){
        document.getElementById("doReservation")["hidden"] = false;
        delete document.getElementById("doReservation")["hidden"];
    }
    else{
        document.getElementById("doReservation")["hidden"] = true;
    }
}
function onSubmitClicked(){
    setSeatsProps();
    if(selectedSeats.length<2){
        return;
    }
    delete selectedSeats[selectedSeats.indexOf(selectedSeatsDummy)];
    selectedSeats = selectedSeats.filter(String);
    window.location.href="/payment?bus="+JSON.stringify(row)+"&seat_list="+JSON.stringify(selectedSeats);
}