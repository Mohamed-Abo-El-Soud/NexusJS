var move_category, replaceWithSearchResults, revertToStaticContent;

window.Rails = {
  application: "Nexus"
};

window.deployToast = function(type, message) {
  var dismissLink, dismissToast, textClose, textOpen, typeClass;
  typeClass = (function() {
    switch (type) {
      case "success":
        return "green";
      case "danger":
        return "red";
      case "warning":
        return "yellow";
    }
  })();
  textOpen = "<span class=\"alert " + typeClass + "-text\">";
  textClose = message + "</span>";
  dismissToast = "$(this)[0].parentNode.parentNode.removeChild($(this)[0].parentNode)";
  dismissLink = "<a class=\"btn-flat text-accent\" onClick=\"" + dismissToast + "\">Dismiss</a>";
  return Materialize.toast("" + textOpen + textClose + dismissLink, 50000);
};

jQuery.fn.extend({
  makeRead: function() {
    return this.each(function() {
      var id, that;
      that = this;
      id = $(this).parents(".card-wrapper").attr("id");
      return move_category(id, "read", function() {
        $(that).removeClass("message-unread");
        $(that).addClass("message-read");
        $(that).removeClass("bright");
        return $(that).siblings(".badge.secondary-content").find(".badge-new").remove();
      });
    });
  }
});

jQuery.fn.extend({
  sendTo: function(item) {
    return this.each(function() {
      var category, idNumber, message, parent, that;
      that = this;
      parent = $(this).parents(".card-wrapper");
      idNumber = parent.attr("id");
      category = $(this).attr("data-category");
      message = $(this).attr("data-message");
      $(that).parents(".modal").closeModal();
      return move_category(idNumber, category, function() {
        var toastMessage;
        parent = $(that).parents(".card-wrapper");
        parent.remove();
        toastMessage = message != null ? message : 'moved to ' + category;
        return deployToast('success', toastMessage);
      });
    });
  }
});

move_category = function(id, category, callback) {
  return $.ajax({
    url: "/move_category/" + id,
    type: "GET",
    data: {
      id: id,
      category: category,
      success: function(data) {
        if (callback != null) {
          return callback(data);
        }
      }
    }
  });
};

jQuery.fn.extend({
  activation: function(callbackObject) {
    return this.each(function() {
      var activates, origin;
      origin = $(this);
      activates = $("#" + origin.attr("data-activates"));
      return origin.on("click." + origin.attr('id'), function(e) {
        activates.addClass("active");
        if (callbackObject != null) {
          callbackObject.onActivate();
        }
        return $(document).on('click.' + activates.attr('id'), function(e) {
          if (!activates.is(e.target) && !origin.is(e.target) && !activates.find(e.target).length > 0 && !origin.find(e.target).length > 0 || activates.find("button[type='reset'], button[type='reset'] *").is(e.target)) {
            if (callbackObject != null) {
              callbackObject.onDeactivate();
            }
            activates.removeClass("active");
            $(document).off('click.' + activates.attr('id'));
          }
        });
      });
    });
  }
});

jQuery.fn.extend({
  searchBar: function(callback) {
    return this.each(function() {
      $(this).keyup(function() {
        return $(this).doSearch(callback);
      });
      return $(this).siblings("button[type='reset']").click(function() {
        if (callback != null) {
          return callback.onBlank();
        }
      });
    });
  }
});

jQuery.fn.extend({
  doSearch: function(callbackObject) {
    return this.each(function() {
      var val;
      val = $(this).val();
      if (val) {
        if (val !== window.$PreviousValue) {
          window.$PreviousValue = val;
          return $.ajax({
            url: "/search",
            type: "GET",
            data: {
              type: Rails.page,
              other_account: Rails.otherAccount,
              key_terms: val
            },
            success: function(data) {
              if (callbackObject != null) {
                return callbackObject.onSearchResult(data);
              }
            }
          });
        }
      } else {
        window.$PreviousValue = null;
        if (callbackObject != null) {
          return callbackObject.onBlank();
        }
      }
    });
  }
});

window.staticContent = null;

window.staticCount = null;

replaceWithSearchResults = function(data) {
  window.staticContent || (window.staticContent = $("#content .messages").html());
  window.staticCount || (window.staticCount = $("#messages-count").html());
  $("#content .messages").modifyHTML(data);
  return $("#messages-count").html("Search results (" + $("info.search-count.hide").html() + ")");
};

revertToStaticContent = function() {
  if (window.staticContent === null) {
    throw "ERROR: no static content!";
  }
  $("#content .messages").modifyHTML(window.staticContent);
  return $("#messages-count").html(window.staticCount);
};

jQuery.fn.extend({
  modifyHTML: function(data) {
    return this.each(function() {
      $(this).html(data);
      $('.modal-trigger').leanModal();
      return $(".timeago").timeago();
    });
  }
});

$(document).ready(function() {
  $('.modal-trigger').leanModal();
  $(".button-collapse").sideNav();
  $('#password-input #shown').keypress(function() {
    return $("#password-input #hidden").removeClass("hide");
  });
  $("button[data-target='sign-up']").click(function() {
    var email, input;
    email = $(this).siblings("input").val();
    input = $("#sign-up-form #account_email");
    if (/^\s*$/.test(input.val())) {
      if (!/^\s*$/.test(email)) {
        return input.val(email).siblings("label").addClass("active");
      }
    }
  });
  $(".timeago").timeago();
  $(".message-unread").click(function() {
    return $(this).makeRead();
  });
  $(".send-button").click(function() {
    if (confirm("Are you sure?")) {
      return $(this).sendTo();
    }
  });
  $(".button-activation").activation();
  return $(".search-field").searchBar({
    onSearchResult: replaceWithSearchResults,
    onBlank: revertToStaticContent
  });
});

// ---
// generated by coffee-script 1.9.2