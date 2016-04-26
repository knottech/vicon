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
            var g=$("<g id='abc'> </g>"),
                gName="iconw"+svg.position().top+"h"+svg.position().left+"a";
            g.attr("id",gName)
            $.each(data['polygons'], function(idx, val) {
                var p = $("<polygon></polygon>"),
                    kx = svg.width() / data["width"],
                    ky = svg.height() / data["height"];
                pts = scale(val, kx, ky);
                p.attr("fill", "#171b26");
                p.attr("points", pts);

                var a=$("<animateTransform />");
                var cx=svg.width()/2,
                    cy=svg.height()/2;
                a.attr("attributeName","transform");
                a.attr("begin",gName+".mouseover");
                a.attr("dur","300ms");
                a.attr("type","rotate");
                a.attr("from","0 "+cx+" "+cy);
                a.attr("to","360 "+cx+" "+cy);
                p.append(a);
                g.append(p);
                // p.attr("stroke", );
                // p.attr("stroke-width", );
            })
            svg.append(g);
            svg.html(svg.html());
        }

    }
}(jQuery));
