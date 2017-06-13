import Backbone from 'backbone';


var MovieView = Backbone.View.extend({
  initialize: function()
  {
    this.template = _.template($('#movie-card-template').html());
  },
});

export default MovieView;
