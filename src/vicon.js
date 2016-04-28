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
        "signal": {
            "width": 100,
            "height": 100,
            "polygons": [
                "-40,-30 -40,-10 -25,-10 -25,-30",
                "-20,-30 -20,5 -5,5 -5,-30",
                "0,-30 0,20 15,20 15,-30",
                "20,-30 20,35 35,35 35,-30"
            ]
        },
        "step-backward": {
            "width": 100,
            "height": 100,
            "polygons": [
                "-32,-25 -32,25 -20,25 -20,-25",
                "-20,0 15,25 15,-25"
            ]
        },
        "pause": {
            "width": 100,
            "height": 100,
            "polygons": [
                "-20,-25 -20,25 -5,25 -5,-25",
                "20,-25 20,25 5,25 5,-25"
            ]
        },
        "stop": {
            "width": 100,
            "height": 100,
            "polygons": [
                "-20,-20 -20,20 20,20 20,-20"
            ]
        },
        "star": {
            "width": 120,
            "height": 120,
            "polygons": [
                "0,50 15.45,15.45 47.55,15.45 23,-8 38.3,-40.45 0,-23 -38.3,-40.45 -23,-8 -47.55,15.45 -15.45,15.45"
            ]
        },
        "pie": {
            "width": 100,
            "height": 100,
            "paths": [
                "M0,0 H30 A30,30,0,1,1,0,30 Z",
                "M5,5 h30 A30,30,0,0,0,5,35 Z"
            ]
        },
        "heart":{
          "width": 100,
          "height": 100,
          "paths": [
              "M0,-30 L-28,-12 A18,18,0,1,1,0,5 A18,18,0,1,1,28,-12 Z"
          ]
        },
        "glass":{
          "width": 100,
          "height": 100,
          "paths": [
              "M20,-30 h-40 v5 h18 v20 l-18,16 h40 z"
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
            y = -Math.round(y * ky * 100) / 100;
            pts[i] = x.toString() + "," + y.toString();
        });
        return pts.join(" ");
    };

    function scalePath(val, kx, ky) {
        var vecs = val.match(/[MmLlHhVvAa][ \.,\d-]+/g),
            new_vecs = [];
        $.each(vecs, function(idx, vec) {
                if ('MmLl'.indexOf(vec[0]) >= 0) {
                    var li = vec.match(/[\d-\.]+/g);
                    var x = li[0],
                        y = li[1];
                    x = Math.round(x * kx * 100) / 100;
                    y = -Math.round(y * ky * 100) / 100;
                    new_vecs.push(vec[0] + x.toString() + "," + y.toString());
                } else if ('Hh'.indexOf(vec[0]) >= 0) {
                    var x = (vec.match(/[\d-\.]+/g))[0];
                    x = Math.round(x * kx * 100) / 100;
                    new_vecs.push(vec[0] + x.toString());
                } else if ('Vv'.indexOf(vec[0]) >= 0) {
                    var y = (vec.match(/[\d-\.]+/g))[0];
                    y = -Math.round(y * ky * 100) / 100;
                    new_vecs.push(vec[0] + y.toString());
                } else if ('Aa'.indexOf(vec[0]) >= 0) {
                    var li = vec.match(/[\d-\.]+/g);
                    var rx = li[0],
                        ry = li[1],
                        angle = li[2],
                        flag1 = li[3],
                        flag2 = li[4],
                        x2 = li[5],
                        y2 = li[6];
                    rx = Math.round(rx * kx * 100) / 100;
                    ry = -Math.round(ry * ky * 100) / 100;
                    x2 = Math.round(x2 * kx * 100) / 100;
                    y2 = -Math.round(y2 * ky * 100) / 100;
                    new_vecs.push(vec[0] + rx.toString() + ","
                      + ry.toString() + ","
                      + angle.toString() + ","
                      + flag1.toString() + ","
                      + flag2.toString() + ","
                      + x2.toString() + ","
                      + y2.toString());
                }
            }
        );
        if(val[val.length-1]==='Z'){
          new_vecs.push('Z');
        }
        return new_vecs.join(' ');
    }
    $.icons = icons;
    $.fn.icon = function(options) {
        var defaults = {
            "width": 100,
            "height": 100,
            "animation": 'rotate',
            "polygons": [],
            "paths": []
        };
        var svg = $(this),
            data,
            width = svg.width(),
            height = svg.height(),
            settings;
        svg.attr("viewBox", "0 0 " + width + " " + height);
        if (options instanceof Object) {
            settings = $.extent(defaults, options);
        } else if ((typeof options) === "string") {
            settings = $.extend(defaults, icons[options]);
        }
        console.log(settings);
        if (true) {
            var g = $("<g> </g>"),
                gName = "icon" + svg.position().top + "x" + svg.position().left + "a";
            g.attr("id", gName)
            g.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
            $.each(settings['polygons'], function(idx, val) {
                var p = $("<polygon></polygon>"),
                    kx = width / settings["width"],
                    ky = height / settings["height"];
                console.log(val);
                pts = scale(val, kx, ky);
                console.log(pts)
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
                    var lix = [],
                        liy = [],
                        cx,
                        cy;
                    console.log("animating... ", options);
                    var pts = val.split(" ");
                    $.each(pts, function(i, pt) {
                        var pt = pt.split(","),
                            x = parseFloat(pt[0]),
                            y = parseFloat(pt[1]);
                        lix.push(x);
                        liy.push(y);
                        console.log(val, pt, x, y)
                    });
                    cx = (lix.reduce(function(a, b) {
                        return a + b
                    })) / lix.length;
                    cy = (liy.reduce(function(a, b) {
                        return a + b
                    })) / liy.length;
                    console.log('center', cx, cy);
                    a.attr("begin", gName + ".mouseover");
                    a.attr("dur", "300ms");
                    a.attr("path", "M0,0 " + cx * 3 + "," + cy * 3);
                    p.append(a);
                } else if (settings['animation'] === "scale") {
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
            });
            $.each(settings['paths'], function(idx, val) {
                var p = $("<path></path>"),
                    kx = width / settings["width"],
                    ky = height / settings["height"];
                console.log(val)
                pts = scalePath(val, kx, ky);
                console.log(pts)
                p.attr("fill", "#171b26");
                p.attr("d", pts);
                if (settings['animation'] === "rotate") {
                    var a = $("<animateTransform />");
                    a.attr("attributeName", "transform");
                    a.attr("begin", gName + ".mouseover");
                    a.attr("dur", "300ms");
                    a.attr("type", "rotate");
                    a.attr("from", "0 0 0");
                    a.attr("to", "360 0 0");
                    p.append(a);
                } else if (settings['animation'] === "scale") {
                    var a = $("<animateTransform />");
                    a.attr("attributeName", "transform");
                    a.attr("begin", gName + ".mouseover");
                    a.attr("dur", "300ms");
                    a.attr("type", "scale");
                    a.attr("from", "1");
                    a.attr("to", "3");
                    p.append(a);
                }
                g.append(p)
            });
            svg.append(g);
            svg.html(svg.html());
        }
    }
}(jQuery));
