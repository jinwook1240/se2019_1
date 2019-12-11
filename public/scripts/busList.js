const button = document.getElementById("searchButton");
button.onclick = () => {
    const date = document.getElementById("date").value;
    const dptloc = document.getElementById("dptloc").value;
    const arvloc = document.getElementById("arvloc").value;
    const query = "?date="+date + "&dptloc="+dptloc + "&arvloc="+arvloc;
    location.href = location+"busList"+query;
}