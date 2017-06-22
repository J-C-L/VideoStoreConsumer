import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

import CustomerView from './customer_view';
import CustomerList from '../collections/customer_list';


var CustomerListView = Backbone.View.extend({
  initialize: function(customerListParams){

    var self = this;
    this.customerViewList = [];

    this.model.forEach(function(rawCustomer){
      self.addCustomer(rawCustomer);
    });

    this.listenTo(this.model, 'add', this.addCustomer);
    this.listenTo(this.model, 'remove', this.removeCustomer);
    this.listenTo(this.model, "update", this.render);
  },

  render: function(){
    var self = this;
    // console.log(this.model.type);
    // console.log(this.model);


    this.$(".customer-heading").html("Customers");


    self.$('.customer-list').empty();

    this.customerViewList.forEach(function(customerView) {
      customerView.render();
      self.$('.customer-list').prepend(customerView.$el);

    });

    // this.delegateEvents();
    return this;
  },

  events: {
  },

  getCustomerList: function(e){
    this.customerViewList = [];
    this.model.reset();
    this.model.fetch();
  },


  addCustomer: function(customer){
    var customerView = new CustomerView({
      model: customer
    });
    this.customerViewList.push(customerView);
  }

});


export default CustomerListView;
