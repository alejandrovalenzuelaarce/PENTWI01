var clicked = false;

$(function () {

    $("#lnkMain").click({
        id: $("#lnkMain").attr("href")
    }, showAndHide);

    $("#lnkEvent").click({
        id: $("#lnkEvent").attr("href")
    }, showAndHide);

    $("#lnkEffect").click({
        id: $("#lnkEffect").attr("href")
    }, showAndHide);

    $("#attachingEvents").click(changeColor);

    $("#attachingEvents").mouseover({
        color: 'gray'
    }, changeBackgroundColor)
        .mouseout({
            color: 'transparent'
        }, changeBackgroundColor);

    $("#btnOff").click(function () {
        $("#attachingEvents").off();
    });

    $("#btnOn").click(function () {
        $("#attachingEvents").on("click", changeColor);
        $("#attachingEvents").on("mouseover", { color: 'lightgray' }, changeBackgroundColor);
        $("#attachingEvents").on("mouseout", { color: 'transparent' }, changeBackgroundColor);
    });

    $("#txtText").change(function () {
        $("<span>Change event</span>").insertAfter(this).fadeOut(1500);
    });

    $("#txtText").focus(function () {
        $("<span>Focu event</span>").insertAfter(this).fadeOut(1500);
    });

    $("#txtText").select(function () {
        $("<span>Select event</span>").insertAfter(this).fadeOut(1500);
    });

    $("#btnFadeIn").click(function () {
        $("#fadeBox").fadeIn("slow");
    });

    $("#btnFadeOut").click(function () {
        $("#fadeBox").fadeOut("slow");
    });

    $("#btnFadeTo").click(function () {
        $("#fadeBox").fadeTo(3000, 1);
    });

    $("#btnFadeToggle").click(function () {
        $("#fadeBox").fadeToggle("slow");
    });

    $("#btnSlideUp").click(function () {
        $("#slideBox").slideUp();
    });

    $("#btnSlideDown").click(function () {
        $("#slideBox").slideDown();
    });

    $("#btnSlideToggle").click(function () {
        $("#slideBox").slideToggle();
    });

    $("#events").hide();
    $("#effects").hide();
    $(".content").hide();
});

function changeColor() {
    var color = clicked ? "black" : "red";
    $("#attachingEvents").css("color", color);
    clicked = !clicked;
}

function changeBackgroundColor(event) {
    $("#attachingEvents").css('background-color', event.data.color);
}

function showAndHide(selector) {
    var selectorId = selector.data.id;
    $("section").hide();
    $("section ul").remove();
    $(selectorId).show();
    getSubMenu(selectorId);
}

function getSubMenu(name) {
    var jsonFile = "ajax/";
    if (name == "#events")
        jsonFile += "menuEvent.json";
    else if (name == "#effects")
        jsonFile += "menuEffect.json";
    else
        jsonFile = null;

    if (jsonFile != null) {
        $.getJSON(jsonFile, function (data) {
            var items = "";
            $.each(data, function (key, val) {
                items += "<li><a onclick='showContent(&#39;" + key + "&#39;)'>" + val + "</a></li>";
            });
            $(name).prepend("<ul>" + items + "</ul>");
        });
    } else {
        $(name).append("This is were all started =)");
    }
}

function showContent(key) {
    $(".content").hide();
    $("#" + key).show();
}