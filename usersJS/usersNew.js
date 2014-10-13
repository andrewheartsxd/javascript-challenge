
$(function() {

  var User = Backbone.Model.extend({

    defaults: {
      userFirstName: '',
      userLastName: '',
      userEmail: ''
    },

  });


  var UserView = Backbone.View.extend({

    tagName: "form",

    render: function() {
      var userObj = this.model.toJSON();
      var template = _.template($('#user-data-template').html(), userObj);
      this.$el.html(template);
      return this;
    },

    events: {

      'click button.save-button': 'saveUser',
      'click button.del-button': 'delUser'
    },

    delUser: function(e) {
      e.preventDefault();
      this.model.destroy();
      this.remove();
    },
    saveUser: function(e) {
      e.preventDefault();
      var form = $(e.target).parent();
      if (form.valid()) {
        var userFirstName = form.find('#user-First-Name').val();
        var userLastName = form.find('#user-Last-Name').val();
        var userEmail = form.find('#user-Email').val();
        this.model.save({userFirstName: userFirstName, userLastName: userLastName, userEmail: userEmail});
      }
    },
  });

  // *****************************************

  var UserGroup = Backbone.Collection.extend({

    model: User,
    localStorage: new Backbone.LocalStorage('UserGroup')

  });

  // *****************************************

  var UserGroupView = Backbone.View.extend({

    el: $('#user-panel'),

    initialize: function() {
      this.userGroup = new UserGroup();
      this.userGroup.fetch();
      this.userGroup.on('add', this.renderUser, this);
      this.render();
    },

    events: {
      'click button#add-button': 'addUser'
    },

    addUser: function() {
      var user = new User();
      this.userGroup.add(user);
    },

    render: function() {
      var that = this;
      _.each(this.userGroup.models, function(item) {
        that.renderUser(item);
      }, this);
    },

    renderUser: function(user) {
      var userView = new UserView({ model: user });
      this.$el.find('#add-button').before(userView.render().el);
    }

  });

  var userGroupView = new UserGroupView();

  $.extend($.validator.messages, {
    required: "",
    email: ""
  });

});
