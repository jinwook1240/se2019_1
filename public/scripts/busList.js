function searchBusList() {
    const button = document.getElementById("searchButton");
    button.onclick = function() {
        const date = document.getElementById("date").value;
        const dptloc = document.getElementById("dptloc").value;
        const arvloc = document.getElementById("arvloc").value;
        const query = "?date="+date + "&dptloc="+dptloc + "&arvloc="+arvloc;
        location.href = location+"/bus"+query;
    }
}