function init() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight
            };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });



    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();




}

init();

var overlay = document.querySelector("#overlay");
var iscroll = document.querySelector("#scroll");

overlay.addEventListener("mouseenter",function(){
    iscroll.style.scale = 1;
})

overlay.addEventListener("mouseleave",function(){
    iscroll.style.scale = 0;
})

overlay.addEventListener("mousemove",function(dets){
    iscroll.style.left = `${dets.x - 50}px`;
    iscroll.style.top = `${dets.y - 45}px`;
})


gsap.to("#page2>#ranches",{
    rotate:5,
    y:100,
    scrollTrigger:{
        scroller:"#main",
        trigger:"#page2 img",
        start:"top 80%",
        scrub:3
    }
})

gsap.to("#logo",{
    top: "4%",
    scale: .8,
    scrollTrigger:{
        trigger:"#logo",
        scroller:"#main",
        start: "top 45%",
        end: "top -50%",
        scrub: true
    }
})

gsap.from("#page2 h1",{
    duration:0.5,
    scrollTrigger:{
        trigger:"#page2",
        scroller: "#main",
        start:"top 90%"
    },
    onStart:function(){
        $('#page2 h1').textillate({ in: { effect: 'fadeInUp' } });
    }
})

gsap.from("#page2 h2",{
    duration:0.5,
    scrollTrigger:{
        trigger:"#page2",
        scroller: "#main",
        markers: true,
        start:"top -40%"
    },
    onStart:function(){
        $('#page2 h2').textillate({ in: { effect: 'fadeInUp' } });
    }
})


var overlay2 = document.querySelector("#overlay2");
var myb = document.querySelector("#meet-your-broker");

overlay2.addEventListener("mouseenter",function(){
    myb.style.scale = 1;
})

overlay2.addEventListener("mouseleave",function(){
    myb.style.scale = 0;
})

overlay2.addEventListener("mousemove",function(dets){
    myb.style.left = dets.clientX + "px";
    myb.style.top = dets.clientY + "px";
})