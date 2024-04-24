$(document).ready(function() {
    $(".card-reactions-like").click(function(e) {
        e.preventDefault();

        var id = $(this).prop("id");
        
        $(this).find("i.bi-heart").removeClass("bi-heart").addClass("bi-heart-fill");
    });

    $(".card-reactions-comment").click(function(e){
        e.preventDefault();

        var id = $(this).prop("id");

        $("#card-comment-text-" + id).focus();
    });
});