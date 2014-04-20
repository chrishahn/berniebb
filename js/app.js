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
        this.listenTo( this.collection, 'reset', this.render, this );
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
		this.$el.append( this.rowTpl( this.model.toJSON() ) );
		return this;
	}
});

$(document).ready(function() {
	var col = new BernieCollection({});
	var view = new ListView({
		collection: col
	});
});
