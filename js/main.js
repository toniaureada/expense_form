    /*
     * script from the original page.
     */
    (function() {
                var divs = document.getElementById('ss-form').
                getElementsByTagName('div');
                var numDivs = divs.length;
                for (var j = 0; j < numDivs; j++) {
                    if (divs[j].className == 'errorbox-bad') {
                        divs[j].lastChild.firstChild.lastChild.focus();
                        return;
                    }
                }
                for (var i = 0; i < numDivs; i++) {
                    var div = divs[i];
                    if (div.className == 'ss-form-entry' &&
                    div.firstChild &&
                    div.firstChild.className == 'ss-q-title') {
                        div.lastChild.focus();
                        return;
                    }
                }
    })();

$(function() {
    /*
     * form fields preparation.
     */
    // date field
    var date = new Date();
    var yy = date.getYear();
    var mm = date.getMonth() + 1;
    var dd = date.getDate();
    if (yy < 2000) { yy += 1900; }
    if (mm < 10) { mm = "0" + mm; }
    if (dd < 10) { dd = "0" + dd; }
    $("#entry_0").attr("value", mm + "/" + dd + "/" + yy).datepicker();
    $("time").text(yy); //copyright in page footer.

    //item name & store name field
    var itemCatMap = {
            "飯": "Food / Drinks",
            "飯材料": "Food / Drinks",
            "tabaco": "Mental wares",
            "drink": "Food / Drinks",
            "snack": "Food / Drinks",
            "cafe": "Food / Drinks",
            "coffee beans": "Food / Drinks"
    }

//onload
if($("#entry_1").children(":selected").text() !== "NOT A REGULAR") {
    $("#entry_1").next().hide();
}
if($("#entry_7").children(":selected").text() !== "NOT A REGULAR") {
    $("#entry_7").next().hide();
}
//onload

    $("#entry_1, #entry_7").change(function(){
        var choice = $(this).children(":selected").text();
        $("#entry_6 option[value='" + itemCatMap[choice] + "']").prop("selected", "selected");
        if (choice === "NOT A REGULAR") {
            $(this).next().show();
        } else {
            $(this).next().hide();
        }
    })
    //checkboxs & radio buttons.
    $(".ss-choices").buttonset();
    $("input[type='checkbox']").click(function() { //jQuery UI bugfix (http://goo.gl/jKc8f3)
        $(this).next().removeClass("ui-state-focus ui-state-hover");
    });

    //submit button.
    $("input[type='submit']").button();
    $("input[type='submit']").click(function() { //jQuery UI bugfix (http://goo.gl/jKc8f3)
        $(this).removeClass("ui-state-focus ui-state-hover");
    });

    /*
     * initialize input validator
     */
    var v_conf = {
        position: 'top left',
        offset: [0, -50],
        message: '<div class="ui-state-highlight ui-corner-all"><em class="arrow"/><em class="ui-icon ui-icon-alert left"/></div>',
         onBeforeValidate: function(e, els)  {
            //reset previous errors.
             all_fields.data("validator").reset();
         },
         onFail: function (e, els) {
            //scroll to the first error position.
            $('html, body').animate({ scrollTop: els[0].input.offset().top - 32}, 500);
         }
    }
    var all_fields = $('#ss-form').validator(v_conf);
    //add custom validation funcs.
    $.tools.validator.fn( //item name fields.
        "#entry_2",
        "Please complete this mandatory field.",
        function(el, v) {
            if (v === '' && $("#entry_1").val() === 'NOT A REGULAR') {
                return false;
            }
            return true;
        }
    );
    $.tools.validator.fn( //store name fields.
        "#entry_8",
        "Please complete this mandatory field.",
        function(el, v) {
            if (v === '' && $("#entry_7").val() === 'NOT A REGULAR') {
                return false;
            }
            return true;
        }
    );
    $.tools.validator.fn( //checkboxes.
        "#group_5_1",
        "Please check one at least.",
        function(el, v) {
            var len = $("[name='entry.5.group']:checked").length;
            return (len === 0) ? false : true;
        }
    );
});
