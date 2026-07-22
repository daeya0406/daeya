// 모바일 GNB
$(".gnb-wrap").click(function() {  
    if(!$(".btn-gnb").hasClass("on")){  
        $(".btn-gnb").stop().addClass("on"); 
        $(".gnb-modal").stop().fadeIn();  
        $(".gnb-popup").stop().addClass("on");  
    } else{
        $(".btn-gnb").stop().removeClass("on"); 
        $(".gnb-modal").stop().fadeOut();  
        $(".gnb-popup").stop().removeClass("on");  
    }
})
$(".gnb-modal").click(function() {  
    $(".btn-gnb").stop().removeClass("on"); 
    $(".gnb-modal").stop().fadeOut();  
    $(".gnb-popup").stop().removeClass("on");  
})

// TOP 버튼
$(".btn-top").click(function() {
    window.scrollTo({ top: 0, behavior: "smooth" });
})