function format(date, dpt_time, arv_time, rate) {
    const ret = new Array();
    ret['date'] = "20"+date.slice(0,2)+"년 "+date.slice(2,4)+"월 "+date.slice(4,6)+"일";
    ret['dpt_time'] = dpt_time.slice(0,2)+"시 "+dpt_time.slice(2,4)+"분";
    ret['arv_time'] = arv_time.slice(0,2)+"시 "+arv_time.slice(2,4)+"분";
    ret['rate'] = rate+"원";
    return ret;
}

window.onload = ()=>{
    const obj = format(
        pay_info.bus.date, 
        pay_info.bus.departure_time,
        pay_info.bus.arrival_time,
        pay_info.bus.rate
    )
    document.getElementById("date").innerText = obj.date;
    document.getElementById("dptloc").innerText = pay_info.bus.departure_location;
    document.getElementById("arvloc").innerText = pay_info.bus.arrival_location;
    document.getElementById("dpttime").innerText = obj.dpt_time;
    document.getElementById("arvtime").innerText = obj.arv_time;
    document.getElementById("rate").innerText = obj.rate;

    document.getElementById("bus_code").value = pay_info.bus.bus_code;
    document.getElementById("seat_sel").value = pay_info.seat;
    document.getElementById("seat_cnt").value = pay_info.seat.length;
    document.getElementById("total").value = pay_info.seat.length*pay_info.bus.rate;
};

function onPaymentClick() {
    window.location.href =
        "/payment/confirm?bus_code="+document.getElementById("bus_code").value
        +"&seat_sel="+JSON.stringify(pay_info.seat);
}