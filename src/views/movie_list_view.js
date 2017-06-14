import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

import MovieView from './movie_view';
import MovieList from '../models/movie';


var MovieListView = Backbone.View.extend({
  initialize: function(){

    var self = this;
    this.movieViewList = [];

    this.model.forEach(function(rawMovie){
      self.addMovie(rawMovie);
    });

    this.listenTo(this.model, 'add', this.addMovie);
    this.listenTo(this.model, 'remove', this.removeMovie);
    this.listenTo(this.model, "update", this.render);

  },
  render: function(){

    var self = this;
    self.$('.movie-list').empty();

    this.movieViewList.forEach(function(movieView) {
      movieView.render();
      self.$('.movie-list').append(movieView.$el);

    });
    this.delegateEvents();
    console.log("RENDER ")
    return this;


  },
  events: {
    'click .search': "submitSearch"
  },

  addMovie: function(movie){
    var movieView = new MovieView({
      model: movie
    });
    this.movieViewList.push(movieView);
  },

  submitSearch: function(event) {
    var search_term = this.$(".search-form input[name='search']").val();
    console.log(search_term);
    this.model.fetch({data: $.param({'query': search_term})});
  }
});



export default MovieListView;
