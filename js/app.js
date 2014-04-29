// MODELS
var Bernie = Backbone.Model.extend({
    idAttribute: '_id',
    defaults: {
        bernietext: 'default',
        realtext: 'default',
        description: 'default'
    }
});

var BernieCollection = Backbone.Collection.extend({
    model: Bernie,
    url: 'http://162.243.66.190'
});

// VIEWS
var ListView = Backbone.View.extend({
    initialize: function(){
        this.listenTo( this.collection, 'reset add', this.render, this );
        this.collection.fetch({reset: true});
    },

    render: function(){
        _.each(this.collection.models, function(b) {
            var view = new RowView({model: b});
        });
        return this;
    }
});

var RowView = Backbone.View.extend({
    tagName: 'li',
    rowTpl: _.template( $('#row-tpl').html() ),

    initialize: function() {
        this.$el = $('.list');
        this.render();
    },

    render: function () {
        this.$el.prepend( this.rowTpl( this.model.toJSON() ) );
        return this;
    }
});

function resetForm() {
    $('.add input, .add textarea').val('').removeClass('error');
    $('.add .form').slideUp();
}

$(document).ready(function() {
    var col = new BernieCollection({});
    var view = new ListView({
        collection: col
    });

    $('.add').click(function() {
        $('.add .form').slideToggle();
    });
    $('.add .form').click(function(e) {
        e.stopPropagation();
    });

    $('.new-cancel').click(function() {
        resetForm();
    });
    $('.new-submit').click(function() {
        var real = $('#new-real').val(),
            bernie = $('#new-bernie').val(),
            description = $('#new-description').val(),
            model = new Bernie({
                bernietext: real,
                realtext: bernie,
                description: description
            }),
            valid = true;
        // do some quick error checking
        if (real == "") {
            valid = false;
            $('#new-real').addClass('error');
        } else {
            $('#new-real').removeClass('error');
        }
        if (bernie == "") {
            valid = false;
            $('#new-bernie').addClass('error');
        } else {
            $('#new-bernie').removeClass('error');
        }
        if (description == "") {
            valid = false;
            $('#new-description').addClass('error');
        } else {
            $('#new-description').removeClass('error');
        }
        if (valid) {
            col.create(model);
            resetForm();
        }
    });
});
