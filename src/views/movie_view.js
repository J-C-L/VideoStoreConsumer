import Backbone from 'backbone';


var MovieView = Backbone.View.extend({
  initialize: function()
  {
    this.template = _.template($('#movie-card-template').html());
  },
  render: function () {
    var templateHTML = this.template(this.model.toJSON() );
    this.$el.html(templateHTML);

    return this;
  }
});

export default MovieView;
