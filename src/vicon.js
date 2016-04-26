(function($) {
    var icons = {
        "plus": {
            "width": 100,
            "height": 100,
            "polygons": [
                "25,40 75,40 75,60 25,60",
                "40,25 40,75 60,75 60,25"
            ]
        },
        "minus": {
            "width": 100,
            "height": 100,
            "polygons": [
                "25,40 75,40 75,60 25,60"
            ]
        },
        "play":{
            "width": 100,
            "height": 100,
            "polygons": [
                "35,25 35,75 80,50"
            ]
        }
    }

    function scale(val, kx, ky) {
        var pts = val.split(" ");
        $.each(pts, function(i, pt) {
            var pt = pt.split(","),
                x = parseFloat(pt[0]),
                y = parseFloat(pt[1]);
            x = Math.round(x * kx * 100) / 100;
            y = Math.round(y * ky * 100) / 100;
            pts[i] = x.toString() + "," + y.toString();
        });
        return pts.join(" ");
    }
    $.icons=icons;
    $.fn.icon = function(name) {
        var svg = $(this),
            data;
        if (name instanceof Object) {
            data = name;
        } else if ((typeof name) === "string") {
            data = icons[name];
        }
        if (data) {
            $.each(data['polygons'], function(idx, val) {
                var p = $("<polygon></polygon>"),
                    kx = svg.width() / data["width"],
                    ky = svg.height() / data["height"];
                pts = scale(val, kx, ky);
                p.attr("fill", "#171b26");
                p.attr("points", pts);
                // p.attr("stroke", );
                // p.attr("stroke-width", );
                svg.append(p);
                svg.html(svg.html());
            })
        }

    }
}(jQuery));
