class Seat {
    constructor(seat_number, reserved) {
        this.seat_number = seat_number;
        this.reserved = reserved;
    }

    static make_seats_display(seats) {
        var seatNum = 1;
        document.write("<table>")
        for(var row = 1; row <= 9; row++){
            for(var column = 1; column <= 4; column++){
                if(row == 1 && column == 3)
                    document.write('<td rowspan="8">'+ seatNum + "</td>");
                else if (row == 9 || column != 3)
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