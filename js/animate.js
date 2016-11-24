/**
 * Created by Administrator on 2016/10/9.
 */
$(window).scroll(function(){
    var T=$(window).scrollTop();
    if(T>200&&T<1400){
        $("#one").addClass("animated fadeInDown");
        $("#two").addClass("animated fadeInDown");
        $("#thr").addClass("animated fadeInDown");
        $("#fou").addClass("animated fadeInDown");
        $("#about p").css({
            "opacity":"1"
        })
    }else{
        $("#about p").css({
            "opacity":"0"
        })
        $("#one").removeClass("animated fadeInDown");
        $("#two").removeClass("animated fadeInDown");
        $("#thr").removeClass("animated fadeInDown");
        $("#fou").removeClass("animated fadeInDown");

    }
    if(T>2800){
        $("#fiv").addClass("animated fadeInLeft")
        $("#six").addClass("animated fadeInLeft")
        $("#sev").addClass("animated fadeInLeft")
        $("#eig").addClass("animated fadeInLeft")
        $("#nin").addClass("animated fadeInLeft")
        $("#ten").addClass("animated fadeInLeft")
        $("#eig #ele").addClass("animated fadeInLeft")
        $("#nin #twe").addClass("animated fadeInLeft")
        $("#ten #thir").addClass("animated fadeInLeft")
    }else{
        $("#fiv").removeClass("animated fadeInLeft")
        $("#six").removeClass("animated fadeInLeft")
        $("#sev").removeClass("animated fadeInLeft")
        $("#eig").removeClass("animated fadeInLeft")
        $("#nin").removeClass("animated fadeInLeft")
        $("#ten").removeClass("animated fadeInLeft")
        $("#eig #ele").removeClass("animated fadeInLeft")
        $("#nin #twe").removeClass("animated fadeInLeft")
        $("#ten #thir").removeClass("animated fadeInLeft")
    }

})









































