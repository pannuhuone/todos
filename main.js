Router.configure({
   layoutTemplate: 'main'
});

if(Meteor.isClient){
    Template.navigation.events({
        'click .logout': function(event){
            event.preventDefault();
            Meteor.logout();
            Router.go('login')
        }
    });
}

if(Meteor.isServer){
    // Code here
}