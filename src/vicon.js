(function($) {
    var icons = {
        "plus": {
            "width": 100,
            "height": 100,
            "polygons": [
                "-30,10 30,10 30,-10 -30,-10",
                "-10,30 10,30 10,-30 -10,-30"
            ]
        },
        "minus": {
            "width": 100,
            "height": 100,
            "polygons": [
                "-30,10 30,10 30,-10 -30,-10",
            ]
        },
        "play": {
            "width": 100,
            "height": 100,
            "polygons": [
                "-35,25 -35,-25 25,0"
            ]
        },
        "block": {
            "width": 100,
            "height": 100,
            "polygons": [
                "0,0 20,0 20,20 0,20",
                "0,0 -20,0 -20,20 0,20",
                "0,0 -20,0 -20,-20 0,-20",
                "0,0 20,0 20,-20 0,-20"
            ]
        },
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
    $.icons = icons;
    $.fn.icon = function(options) {
        var defaults = {
            'name': 'plus',
            'animation': 'assembly'
        };
        var svg = $(this),
            data,
            width=svg.width(),
            height=svg.height(),
            settings;
        svg.attr("viewBox","0 0 "+width+" "+height);
        if (options instanceof Object) {
            settings = $.extent(defaults, options);
        } else if ((typeof name) === "string") {
            settings = $.extend(defaults, {
                'name': options
            });
            settings['data'] = icons[options];
        }
        data = settings['data'];
        if (data) {
            var g = $("<g> </g>"),
                gName = "iconw" + svg.position().top + "h" + svg.position().left + "a";
            g.attr("id", gName)
            g.attr("transform","translate("+width/2+","+height/2+")");
            $.each(data['polygons'], function(idx, val) {
                var p = $("<polygon></polygon>"),
                    kx = width / data["width"],
                    ky = height / data["height"];
                pts = scale(val, kx, ky);
                p.attr("fill", "#171b26");
                p.attr("points", pts);

                if (settings['animation'] === "rotate") {
                    var a = $("<animateTransform />");
                    a.attr("attributeName", "transform");
                    a.attr("begin", gName + ".mouseover");
                    a.attr("dur", "300ms");
                    a.attr("type", "rotate");
                    a.attr("from", "0 0 0");
                    a.attr("to", "360 0 0");
                    p.append(a);
                } else if (settings['animation'] === "assembly") {
                    var a = $("<animateMotion />");
                    var lix=[],
                        liy=[],
                        cx,
                        cy;
                    $.each(val.split(" "), function(i, pt) {
                        var pt = pt.split(","),
                            x = parseFloat(pt[0]),
                            y = parseFloat(pt[1]);
                        lix.push(x);
                        liy.push(y);
                        cx=(lix.reduce(function(a,b){return a+b}))/lix.length;
                        cy=(lix.reduce(function(a,b){return a+b}))/liy.length;
                    });
                    a.attr("begin", gName + ".mouseover");
                    a.attr("dur", "300ms");
                    a.attr("path", "M0,0 "+cx*2+","+cy*2);
                    p.append(a);
                }else if(settings['animation'] === "scale") {
                    var a = $("<animateTransform />");
                    a.attr("attributeName", "transform");
                    a.attr("begin", gName + ".mouseover");
                    a.attr("dur", "300ms");
                    a.attr("type", "scale");
                    a.attr("from", "1");
                    a.attr("to", "3");
                    p.append(a);
                }
                g.append(p);
                // p.attr("stroke", );
                // p.attr("stroke-width", );
            })
            svg.append(g);
            svg.html(svg.html());
        }

    }
}(jQuery));
