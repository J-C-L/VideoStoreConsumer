import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

import CustomerView from './customer_view';


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
    // this.listenTo(this.model, "sync", this.render);
    // this.listenTo(this.model, "reset", this.render);
  },

  render: function(){
    console.log("Customer rendered!!!");
    var self = this;
    // console.log(this.model.type);
    // console.log(this.model);

    this.$(".customer-heading").html("Customers");

    if (this.model.type === "forCheckout"){
      this.$(".customer-heading").html("<h3> Which customer is checking out?  </h3>");
    }
    //  LOOOK HERE TO DEBUG CUSTOMER LISTEN EVENTS"
    self.$('.customer-list').empty();

    this.customerViewList.forEach(function(customerView) {
      customerView.render();
      self.$('.customer-list').prepend(customerView.$el);

      if (self.model.type === "forCheckout"){
        self.listenTo(customerView, "customerSelected", self.assignCustomer);
      }

    });
    this.delegateEvents();
    return this;
  },

  events: {
  },

  getCustomerList: function(e){
    // console.log("Hi from getCustomerList");
    this.customerViewList = [];
    this.model.reset();
    this.model.fetch();


      console.log(this);
    // console.log(this.customerViewList);
    // this.render();
  },


  addCustomer: function(customer){
    var customerView = new CustomerView({
      model: customer
    });
    this.customerViewList.push(customerView);
  },

  assignCustomer: function(customer){
    this.trigger("customerChosen", customer);
  }
});


export default CustomerListView;
