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
    var date = new Date();
    var yy = date.getYear();
    var mm = date.getMonth() + 1;
    var dd = date.getDate();
    if (yy < 2000) { yy += 1900; }
    if (mm < 10) { mm = "0" + mm; }
    if (dd < 10) { dd = "0" + dd; }
    $("#entry_0").attr("value", mm + "/" + dd + "/" + yy).datepicker();
    $(".ss-choices").buttonset();
    $("#entry_1, #entry_7").change(function(){
        if ($(this).children(":selected").text() === "NOT A REGULAR") {
            $(this).next().show();
        } else {
            $(this).next().hide();
        }
    })
    $("input[type=submit]").button();

    // initialize validator
    var v_conf = {
        position: 'top left',
        offset: [0, -20],
        message: '<div class="ui-state-highlight ui-corner-all"><em class="arrow"/><em class="ui-icon ui-icon-alert left"/></div>'
    }
    //add custom validation funcs.
    $.tools.validator.fn(
        "#entry_2",
        "Please complete this mandatory field.",
        function(el, v) {
            if (v === '' && $("#entry_1").val() === 'NOT A REGULAR') {
                return false;
            }
            return true;
        }
    );
    $.tools.validator.fn(
        "#entry_8",
        "Please complete this mandatory field.",
        function(el, v) {
            if (v === '' && $("#entry_7").val() === 'NOT A REGULAR') {
                return false;
            }
            return true;
        }
    );
    $.tools.validator.fn(
        "#group_5_1",
        "Please check one at least.",
        function(el, v) {
            var len = $("[name='entry.5.group']:checked").length;
            return (len === 0) ? false : true;
        }
    );
    var all_fields = $('#ss-form').validator(v_conf);
    $("[name='submit']").click(function(event) {
        all_fields.data("validator").reset();
    });
});