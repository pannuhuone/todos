if(Meteor.isClient) {
    Template.login.events({
        'submit form': function(event){
            event.preventDefault();
            var email = $('[name=email').val();
            var password = $('[name=password]').val();
            Meteor.loginWithPassword(email, password, function(error){
                //console.log("You initiated login process.");
                //console.log(error);
                if(error){
                    console.log(error.reason);
                } else {
                    Router.go('home');
                }

            });
        }
    });
}

if(Meteor.isServer) {
    // Code here
}

Router.route('/login', {
    name: 'login'
});