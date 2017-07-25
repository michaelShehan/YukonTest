
$(document).ready(function(){
    browserDetect();
    heroContentPosition();
    fixedMenuToggle();
    $(".mobile-menu-link").click(function(){
        mobileMenuToggle($(this))
    })
    $(".page-nav a, a.page-nav-link").click(function(){
        pageScrollToPosition($(this));
    })
    $(".mobile-nav a").click(function(){
       mobileMenuClick($(this)); 
    })
    $("select#route-select").change(function(){
        toggleRoute($(this));
    })
    $("a.round-link.minus, a.round-link.plus").click(function(){
        ticketCounter($(this));
    })
})
$(window).resize(function(){
    heroContentPosition();
    mobileMenuReset();
})

function heroContentPosition(){
    var mq = window.matchMedia("(min-width: 1201px)");
    if(mq.matches){
        var hcHeight = $(".hero-content").height();
        var windowHeight = $(window).height();
        var paddingOffset = (windowHeight - 110 - hcHeight)/2;
        $(".hero-content").css("padding-top", paddingOffset)
    }
}

function mobileMenuToggle(elem){
    var state = elem.attr("data-state");
    var mobileMenu = $(".mobile-menu-wrapper");
    var mmPadding = parseInt(mobileMenu.css("padding-top")) + parseInt(mobileMenu.css("padding-bottom"))
    if(state == null || state == 0){
        var headerHeight = $(".hero-header").height();
        mobileMenu.height(headerHeight - mmPadding);
        mobileMenu.fadeIn();
        elem.attr("data-state", 1)
        elem.children(".link-text").html("Sluit");
        elem.children(".icon.menu").addClass("menu-close");

    }
    else{
        mobileMenu.fadeOut();
        elem.attr("data-state", 0)
        elem.children(".link-text").html("Menu");
        elem.children(".icon.menu").removeClass("menu-close");
    }
    var mq = window.matchMedia("(max-width: 768px)");
    if(mq.matches){
        if($("#site-nav").hasClass("fixed")){
            $("#site-nav").removeClass("fixed")
            $(".psudoNav").hide();
        }
    }
}

function mobileMenuReset(){
    var link = $(".mobile-menu-link");
    var mobileMenu = $(".mobile-menu-wrapper");
    var mq = window.matchMedia("(min-width: 769px)");
    if(mq.matches){
        var state = link.attr("data-state");
        if(state == 1){
            mobileMenu.hide();
            link.attr("data-state", 0)
            link.children(".link-text").html("Menu");
            link.children(".icon.menu").removeClass("menu-close");
        }
    }
    else{
        if($("#site-nav").hasClass("fixed")){
            $("#site-nav").removeClass("fixed")
            $(".psudoNav").hide();
        }
    }
}

function fixedMenuToggle(){
    $(window).scroll(function(){
        var mq = window.matchMedia("(min-width: 769px)");
        if(mq.matches){
            var contentTopVal = $("#event").offset().top;
            var heroHeight = $(".hero-header").height() -1;
            var windowTop = window.pageYOffset;

            if(windowTop > heroHeight){
                $("#site-nav").addClass("fixed"); 
                $(".psudoNav").show();
            }
            else{
                $("#site-nav").removeClass("fixed"); 
                $(".psudoNav").hide();
            }
        }

    });
        
    //}
//    else{
//        if($("#site-nav").hasClass("fixed")){
//            $("#site-nav").removeClass("fixed")
//            $(".psudoNav").hide();
//        }
//    }
}

function pageScrollToPosition(elem) {
    menuID = elem.attr("href");
console.log(menuID)
    if ((menuID.indexOf("http://") < 0) || (menuID.indexOf("https://") < 0)) {
        destinationTop = ($(menuID).offset().top) - 92
        $('html, body').animate({ scrollTop: destinationTop }, 'slow');
    }
}

function mobileMenuClick(elem){
    var elem = elem;
    var link = $(".mobile-menu-link")
    mobileMenuToggle(link);
    pageScrollToPosition(elem);
}

function toggleRoute(elem){
    var destination = elem.val();
    $(".tab-navigation a[href = '#" + destination + "']").tab("show");
}

function ticketCounter(elem){
    var toggle = elem.attr("href")
    
    var currentTicketAmount = parseInt($(".ticket-counter").html());
    var ticketAmount;
    var ticketValue;
    var ticketPrice = 50;
    
    if(toggle == "#minus"){
        
        ticketAmount = currentTicketAmount - 1;
        if(ticketAmount < 1){
            ticketAmount = 1;
        }
        
    }
    else if(toggle == "#plus"){
        
        ticketAmount = currentTicketAmount + 1;
    }
    ticketValue = ticketAmount * ticketPrice;
    
    $(".ticket-value").html(ticketValue);
    $(".ticket-amount, .ticket-counter").html(ticketAmount)
}

function browserDetect() {
    //alert(navigator.userAgent);
    var BV;
    if (navigator.userAgent.indexOf('MSIE 7') > -1) {
        BV = 'msie';
    } else if (navigator.userAgent.indexOf('MSIE 8') > -1) {
        BV = 'msie';
    } else if (navigator.userAgent.indexOf('MSIE 9') > -1) {
        BV = 'msie';
    }
    else if (navigator.userAgent.indexOf('Trident') > -1) {
        BV = 'msie';
    }
    else if (navigator.userAgent.indexOf('Firefox') > -1) {
        BV = 'firefox';
    } else if (navigator.userAgent.indexOf('Chrome') > -1) {
        BV = 'chrome';
    } else if (navigator.userAgent.indexOf('Safari') > -1) {
        BV = 'safari';
    }
    else if (navigator.userAgent.indexOf('Opera') > -1) {
        BV = 'opera';
    }
    //return BV;
    //alert(BV)
    $('html').attr('class', BV)
}
