/**
 * Created by User on 29.12.2016.
 */
var columns = 0;
var ajaxRequest;
function ajaxFunction() {
    // The variable that makes Ajax possible!
    try {
        // Opera 8.0+, Firefox, Safari
        ajaxRequest = new XMLHttpRequest();
    } catch (e) {
        try {
            ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                // Something went wrong
                alert("Your browser broke!");
                return false;
            }
        }
    }
}


$(document).ready(function () {
    $("input[name = 'insert']").click(function () {
        var a = parseFloat($('#a').val());
        var b = parseFloat($('#b').val());
        var c = parseFloat($('#c').val());
        var p = '<div class="button calculate" ">Calculate</div>';

        $('table').append("<tr " + (columns % 2 == 0 ? "class = 'light'" : "") + ">" +
            "<td class = 'check'>" + "<input type='checkbox' />" + "</td>" +
            "<td class = 'a'>" + a + "</td>" +
            "<td class = 'b'>" + b + "</td>" +
            "<td class = 'c'>" + c + "</td>" +
            "<td>" + p + "</td>" +
            "<td class = 'p'></td>"
            + "</tr>");
        columns += 1;
        $(document).on("click", ".calculate", function () {
            //$(this).fadeOut();
            var row = $(this).closest("tr")[0].childNodes;
            // calculate on ajax
            calculate(row, parseFloat(row[1].innerHTML), parseFloat(row[2].innerHTML), parseFloat(row[3].innerHTML));

        });
        $(document).on("click", '#del', function () {
            $('.check').each(function () {
                var $row = $(this)[0];
                //console.log($row);
                if ($row.firstChild.checked) {
                    $(this).closest("tr").remove();
                    columns -= 1;
                }
            });
            console.log("start recolor with columns = " + columns);
            recolor();
        });
    });
    /*    $('#del').click(function () {
     $('tr').each(function (i, e) {
     console.log($(e).childNodes);
     if ($(e).firstChild.checked) $(this).remove();
     });
     });*/
});

function recolor() {
    var $rows = $('table')[0].childNodes[1].childNodes;
    for (var i = 1; i < $rows.length; i++)
        if (i % 2 == 0)
            $($rows[i]).addClass("light");
        else
            $($rows[i]).removeClass("light");
}

function calculate(row, a, b, c) {
    ajaxFunction();
    ajaxRequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            row[5].innerHTML = this.responseText;
        }
    };
    ajaxRequest.open("GET", "MyServlet?a=" +a + "&b=" + b + "&c=" + c, true);
    ajaxRequest.send();
}

/*var d = b*b - 4*a*c;
 if (d<0)
 return "No roots";
 else
 if (d == 0)
 return b/(2*a);
 else
 return (b+Math.sqrt(d))/(2*a) + " " + (b-Math.sqrt(d))/(2*a);
 */
