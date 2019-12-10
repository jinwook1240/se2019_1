class Seat {
    constructor(seat_number, reserved) {
        this.seat_number = seat_number;
        this.reserved = reserved;
    }

    static make_seats_display(seats) {
        var seatNum = 1;
        document.write("<table>")
        for(var i = 1; i <= 9; i++){
            document.write("<tr>");
            for(var j = 1; j <= 4; j++){
                if(i == 1 && j == 3)
                    document.write('<td rowspan="8">'+ seatNum + "</td>");
                else if (i == 9 || j != 3)
                    document.write("<td>"+ seatNum + "</td>");
                else
                    continue;
                seatNum++;
            }
            document.write("</tr>");
        }
        document.write("</table>");
    }
}