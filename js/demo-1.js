

    var width, height, largeHeader, canvas, ctx, points, target, animateHeader = true;
    var clicked = false;
    var i = 0;
    var var1 = 0.5;
    var var2 = 0.8;
    var var3 = 0.3;
    var var4 = 0.5;
    var var5 = 0.04;
    var var6 = 0.3;
    var grow = true;
    var shrink = false;
    var radius = 300;
    var y = 0;

    // Main
    initHeader();
    initAnimation();
    addListeners();

    function initHeader() {
        width = window.innerWidth;
        height = window.innerHeight;
        target = {x: width/2, y: height/2};

        largeHeader = document.getElementById('large-header');
        largeHeader.style.height = height+'px';

        canvas = document.getElementById('demo-canvas');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');

        // create points
        points = [];
        for(var x = 0; x < width; x = x + width/30) {
            for(var y = 0; y < height; y = y + height/30) {
                var px = x + Math.random()*width/30;
                var py = y + Math.random()*height/30;
                var p = {x: px, originX: px, y: py, originY: py };
                points.push(p);
            }
        }

        // for each point find the 5 closest points
        for(var i = 0; i < points.length; i++) {
            var closest = [];
            var p1 = points[i];
            for(var j = 0; j < points.length; j++) {
                var p2 = points[j]
                if(!(p1 == p2)) {
                    var placed = false;
                    for(var k = 0; k < 5; k++) {
                        if(!placed) {
                            if(closest[k] == undefined) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }

                    for(var k = 0; k < 5; k++) {
                        if(!placed) {
                            if(getDistance(p1, p2) < getDistance(p1, closest[k])) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }
                }
            }
            p1.closest = closest;
        }

        // assign a circle to each point
        for(var i in points) {
            var c = new Circle(points[i], 2+Math.random()*2, 'rgba(255,255,255,0.3)');
            points[i].circle = c;
        }
    }

    // Event handling
    function addListeners() {
        if(!('ontouchstart' in window)) {
            window.addEventListener('mousemove', mouseMove);
        }
        window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
    }

    function mouseMove(e) {
        var posx = posy = 0;
        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        }
        else if (e.clientX || e.clientY)    {
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        target.x = posx;
        target.y = posy;
    }

    function scrollCheck() {
        if(document.body.scrollTop > height) animateHeader = false;
        else animateHeader = true;
    }

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        largeHeader.style.height = height+'px';
        canvas.width = width;
        canvas.height = height;
    }

    // animation
    function initAnimation() {
        animate();
        for(var i in points) {
            shiftPoint(points[i]);
        }
    }

    function animate() {
        width = window.innerWidth;
        height = window.innerHeight;
        if(animateHeader) {
            ctx.clearRect(0,0,width,height);
            for(var i in points) {
                // detect points in range
                if(Math.abs(getDistance(target, points[i])) < 4000) {
                    points[i].active = var1;
                    points[i].circle.active = var2;
                } else if(Math.abs(getDistance(target, points[i])) < 20000) {
                    points[i].active = var3;
                    points[i].circle.active = var4;
                } else if(Math.abs(getDistance(target, points[i])) < 40000) {
                    points[i].active = var5;
                    points[i].circle.active = var6;
                } else {
                    points[i].active = 0;
                    points[i].circle.active = 0;
                }

                drawLines(points[i]);
                points[i].circle.draw();
            }
        }
        if (clicked == true){
            circleAnimation();
            animationFade();
            circleShrink();
        }
        requestAnimationFrame(animate);
    }

    function shiftPoint(p) {
        TweenLite.to(p, 1+1*Math.random(), {x:p.originX-50+Math.random()*100,
            y: p.originY-50+Math.random()*100, ease:Circ.easeInOut,
            onComplete: function() {
                shiftPoint(p);
            }});
    }

    // Canvas manipulation
    function drawLines(p) {
        if(!p.active) return;
        for(var i in p.closest) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.closest[i].x, p.closest[i].y);
            ctx.strokeStyle = 'rgba(0,0,200,'+ p.active+')';
            ctx.stroke();
        }
    }

    function Circle(pos,rad,color) {
        var _this = this;

        // constructor
        (function() {
            _this.pos = pos || null;
            _this.radius = rad || null;
            _this.color = color || null;
        })();

        this.draw = function() {
            if(!_this.active) return;
            ctx.beginPath();
            ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'rgba(0,0,255,'+ _this.active+')';
            ctx.fill();
        };
    }

    // Util
    function getDistance(p1, p2) {
        return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }
    
    function transition1(){
        clicked = true;
    }
    function circleShrink(){
        if(y < 4){
            setTimeout(function() {
                y = y + 0.1;
                radius = radius - 1;
            }, 10);
        }
    }
    function circleAnimation(){
        ctx.beginPath();
        if(i<2){
            setTimeout(function() {
                i= i + 0.1;
            }, 100);
        }
        if(i>=2 && i<=11){
            setTimeout(function() {
                if (grow == true){
                    i= i + 0.1;
                }
                if (grow == false) {
                    i = i - 0.1;
                }
                ctx.lineWidth = i -1;
            }, 10);
            if (i <= 3){
                grow = true;
                i = 3;
            }
            if (i >= 10){
                grow = false;
                i = 10;
            }
        }
        ctx.arc((width/2),(height/2),radius,0,i*Math.PI);
        ctx.strokeStyle = "blue";
        ctx.stroke();
    }

    function animationFade(){
        var x = 0;
        if(x<2){
            setTimeout(function() {
                x= x + 0.1;
                var1 = var1 - 0.01;
                var2 = var2 - 0.01;
                var3 = var3 - 0.01;
                var4 = var4 - 0.01;
                var5 = var5 - 0.01;
                var6 = var6 - 0.01;
            }, 100);
        }
    }
    
