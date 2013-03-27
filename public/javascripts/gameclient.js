'use strict';
var app = {};

var ajax = {
    ajaxurl: window.location.protocol + '//' + window.location.host + '/ajax/',
    loadData: function(id, load_success) {
        var loadData = {
            session_id: id
        };
        var loadString = JSON.stringify(loadData);
        $.ajax(this.ajaxurl + 'load', {
            data: {
                data: loadString
            },
            success: load_success
        });
    },
    send_signup: function(form, signup_success) {
        $.ajax(this.ajaxurl + 'save_signup', {
            data: form.serialize(),
            success: signup_success
        });
    },
    send_login: function(form, login_success) {
        $.ajax(this.ajaxurl + 'do_login', {
            data: form.serialize(),
            success: login_success
        });
    },
    listData: function(maxcount, list_success) {
        var loadData = {
            maxcount: maxcount
        };
        var loadString = JSON.stringify(loadData);
        $.ajax(this.ajaxurl + 'list', {
            data: {
                data: loadString
            },
            success: list_success
        });
    },
    saveData: function(data) {
        $.ajax(this.ajaxurl + 'save', {
            data: {
                data: data
            },
            success: app.save_success
        });
    },
    uploadBackground: function(fileName, fileData) {
        $.ajax(this.ajaxurl + 'uploadBackground', {
            data: {
                fileName: fileName,
                fileData: fileData
            },
            success: app.backgroundSuccess
        });
    }
};


app = {
    masterurl: window.location.protocol + '//' + window.location.host + '/',
    setBrowserUrl: function(newid) {
        var testurl = /\/i\/.{16}$/;
        if (!testurl.test(document.location.href))
            if (window.history.pushState)
                window.history.pushState(null, null, '/i/' + newid);
            else
                window.location.href = imgUrl;
    },
    setTopMessage: function(message) {
        $('#topMessage').html(message);
    },
};
app.init = {
    install_events: function() {
        var event_element;
        for (event_element in app.events)
            $(event_element).on(app.events[event_element]);
    },
    setup: function() {
        $.ajaxSetup({
            dataType: 'json',
            type: 'POST'
        });
    }
};
app.events = {
    '#btn_login': {
        click: function(e) {
            e.stopPropagation();
            e.preventDefault();
            $('#messageBox').html('');
            $('.error').removeClass('error');
            ajax.send_login($('#frm_login'), app.login_success);
        }
    },
    '#btn_run': {
        click: function(e) {
            e.stopPropagation();
            e.preventDefault();
            $("#content").load(ajax.ajaxurl + "content");
        }}
};

$(window).on('load', app.init.setup);
$(window).on('load', app.init.install_events);