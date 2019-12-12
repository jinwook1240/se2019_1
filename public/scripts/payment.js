window.onload = ()=>{
    document.getElementById("date").innerText = pay_info.bus.date;
    document.getElementById("dptloc").innerText =pay_info.bus.departure_location;
    document.getElementById("arvloc").innerText =pay_info.bus.arrival_location;
    document.getElementById("dpttime").innerText =pay_info.bus.departure_time;
    document.getElementById("arvtime").innerText =pay_info.bus.arrival_time;
    document.getElementById("rate").innerText =pay_info.bus.rate;


    document.getElementById("bus_code").value =pay_info.bus.bus_code;
    document.getElementById("seat_sel").value =pay_info.seat;
    document.getElementById("seat_cnt").value =pay_info.seat.length;
    document.getElementById("total").value =pay_info.seat.length*pay_info.bus.rate;
    
};
function onPaymentClick(){
    window.location.href =
        "/payment/confirm?bus_code="+document.getElementById("bus_code").value
        +"&seat_sel="+JSON.stringify(pay_info.seat);
}