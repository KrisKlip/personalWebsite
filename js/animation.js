var windowHeight = $(window).height();
var active1 = true;
var active2 = false;
var active3 = false;
var active4 = false;

$( document ).ready(function() {
    nameFade();
    setTimeout(function(){
      nameAnimation();
    }, 1000);
    setTimeout(function(){
      displayImage();
    }, 1700);
    setTimeout(function(){
      moveToTop();
    }, 4000);
    setTimeout(function(){
      navFade();
    }, 5000);
    
    $('#nav1').hover(function() {
        $(this).stop().animate({ fontSize : '1.5em' });
    },
    function() {
      if(active1 == false){
        $(this).stop().animate({ fontSize : '1em' });
      }
          //$(this).stop().animate({ fontSize : '1em' });
          
    });
    $('#nav2').hover(function() {
      $(this).stop().animate({ fontSize : '1.5em' });
      
    },
    function() {
      if(active2 == false){
        $(this).stop().animate({ fontSize : '1em' });
      }
          
    });
    $('#nav3').hover(function() {
      $(this).stop().animate({ fontSize : '1.5em' });
      
    },
    function() {
      if(active3 == false){
        $(this).stop().animate({ fontSize : '1em' });
      }
          
    });
    $('#nav4').hover(function() {
        $(this).stop().animate({ fontSize : '1.5em' });
      
    },
    function() {
      if(active4 == false){
        $(this).stop().animate({ fontSize : '1em' });
      }
          
    });
    
    $("#nav1").click(function() {
      active1 = true;
      active2 = false;
      active3 = false;
      active4 = false;
      $("#nav2").animate({ fontSize : '1em' });
      $("#nav3").animate({ fontSize : '1em' });
      $("#nav4").animate({ fontSize : '1em' });
    });
    $("#nav2").click(function() {
      active1 = false;
      active2 = true;
      active3 = false;
      active4 = false;
      $("#nav1").animate({ fontSize : '1em' });
      $("#nav3").animate({ fontSize : '1em' });
      $("#nav4").animate({ fontSize : '1em' });
    });
    $("#nav3").click(function() {
      active1 = false;
      active2 = false;
      active3 = true;
      active4 = false;
      $("#nav1").animate({ fontSize : '1em' });
      $("#nav2").animate({ fontSize : '1em' });
      $("#nav4").animate({ fontSize : '1em' });
    });
    $("#nav4").click(function() {
      active1 = false;
      active2 = false;
      active3 = false;
      active4 = true;
      $("#nav1").animate({ fontSize : '1em' });
      $("#nav2").animate({ fontSize : '1em' });
      $("#nav3").animate({ fontSize : '1em' });
    });
    
    
});

function nameFade(){
  $("#kristofer").fadeTo(1500, 1 );
  setTimeout(function(){
    $("#klipfel").fadeTo(1500, 1 );
  }, 1000);
}
function nameAnimation(){
  $("#klipfel").animate({
      marginLeft: '+=200px'
  }, 700);
}
function displayImage(){
  setTimeout(function(){
    $("#meImg").fadeTo(1000, 1 );
  }, 1000);
}
function  moveToTop(){
  $("#kristofer").fadeIn()
  .css({top:(windowHeight*0.5),position:'fixed'})
  .animate({top:(windowHeight*0.07)}, 1000, function() {
      //callback
  });
  $("#meImg").fadeIn()
  .css({top:(windowHeight*0.45),position:'fixed'})
  .animate({top:(windowHeight*.02)}, 1000, function() {
      //callback
  });
}
function navFade(){
  $("#nav1").fadeTo(1500, 1 );
  setTimeout(function(){
    $("#nav2").fadeTo(1500, 1 );
  }, 500);
  setTimeout(function(){
    $("#nav3").fadeTo(1500, 1 );
  }, 1000);
  setTimeout(function(){
    $("#nav4").fadeTo(1500, 1 );
  }, 1500);
  
  setTimeout(function(){
    $("#nav1").animate({ fontSize : '1.5em' });
  }, 2000);
}
