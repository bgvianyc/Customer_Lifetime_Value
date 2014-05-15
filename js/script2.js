function Round2Cent(v) {
    return Math.round(v*100)/100;
}

$(document).ready(function () {
    $("#btext").hide();


    //Updates when new number is entered   
    $("#form input").keyup(function (event) {
        if (event.keyCode == 9) return; // 9 = tab
        fun_list()
    });

    function ShowValue (selector, v) {
        $(selector).html(isNaN(v) ? "Error" : "$" + Round2Cent(v)); 
    }

    //Functions to update on input change
    function fun_list() {
        get_values();
        window.clval = ((revenue * margin) * (1 - churn) / 
                        (1 + discount - (1 - churn)));
        window.clpa = (lead + (hours * hr) / closing);
        window.nltval = clval - clpa;
//        clv();
//        cpa();
//        nltv();
        ShowValue("#clv", clval);
        ShowValue("#cpa", clpa);
        ShowValue("#nltv", nltval);
        result();
        return;
    }

    // updates values

    function get_values() {
        window.revenue = parse_currency($("#form input[name='revenue']").val());
        window.margin = parse_percent($("#form input[name='margin']").val());
        window.churn = parse_percent($("#form input[name='churn']").val());
        window.discount = parse_percent($("#form input[name='discount']").val());
        window.lead = parse_currency($("#form input[name='lead']").val());
        window.closing = parse_percent($("#form input[name='closing']").val());
        window.hours = parse_currency($("#form input[name='hours']").val());
        window.hr = parse_currency($("#form input[name='hr']").val());

    };

    // Takes a string like "$123,456.789" and returns 123456.789 - from start-up death clock
    function parse_currency(str) {
        return parseFloat(str.replace(/\$|,/g, "")) || "";
    }

    function parse_percent(str) {
        return parseFloat(str.replace(/%|./, "") && (str, ".".concat(str)));
    }
    function clv() {
        if (!isNaN(clval)) {
            $("#clv").html("$" + Round2Cent(clval));
        } else {
            $("#clv").html("error");
        };
        return
    };

    function cpa() {
        if (!isNaN(clpa)) {
            $("#cpa").html("$" + Round2Cent(clpa));
        } else {
            $("#cpa").html("error");
        }
        return;
    }

    function nltv() {
        if (!isNaN(nltval)) {
            $("#nltv").html("$" + Round2Cent(nltval));
        } else {
            $("#nltv").html("error");
        };

        return;
    };

    function result() {
        if (revenue > 0) {
            if (clval / clpa >= 3) {
                $("#result").html("Sweet Lifetime Value<br />You're doing something right!");
                $("#result_box").css("background-color", "green");
                return;
            } else if (clval / clpa <= 3 && clval / clpa >= 1) {
                $("#result").html("Cutting it close...<br />Your LTV should be at least 3X your CAC");
                $("#result_box").css("background-color", "#FF4500");
                return;
            } else if (nltval < 0) {
                $("#result").html("Negitive LTV!<br />Time to rethink the model?");
                $("#result_box").css("background-color", "Crimson");
                return;nlt
            };
        };
        return;
    };

    $("#bslide").click(function () {
        $("#btext").slideToggle("slow", function () {});
    });

});
