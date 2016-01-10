if(Meteor.isClient) {
    Template.login.events({
        'submit form': function (event) {
            event.preventDefault();
            /*var email = $('[name=email').val();
             var password = $('[name=password]').val();
             Meteor.loginWithPassword(email, password, function(error){
             //console.log("You initiated login process.");
             //console.log(error);
             if(error){
             console.log(error.reason);
             } else {
             var currentRoute = Router.current().route.getName();
             if(currentRoute == "login") {
             Router.go('home');
             }
             }
             });*/

        }
    });

    Template.login.onCreated(function(){
        //console.log("The 'login' template was just created.");
    });

    Template.login.onRendered(function(){
        //console.log("The 'login' page was just rendeded.");
        var validator = $('.login').validate({
            submitHandler: function(event){
                var email = $('[name=email').val();
                var password = $('[name=password]').val();
                Meteor.loginWithPassword(email, password, function(error){
                    if(error){
                        //console.log(error.reason);
                        if(error.reason == "User not found") {
                            validator.showErrors({
                                //email: error.reason
                                email: "That email doesn't belong to a registered user."
                            });
                        }
                        if(error.reason == "Incorrect password"){
                            validator.showErrors({
                               //password: error.reason
                                password: "You entered an incorrect password."
                            });
                        }
                    } else {
                        var currentRoute = Router.current().route.getName();
                        if(currentRoute == "login") {
                            Router.go('home');
                        }
                    }
                });
            }
        });

        /*$('.login').validate({
            rules: {
                email: {
                    required: true,
                    email: true
                },
                password: {
                    required: true,
                    minlength: 4
                }
            },
            messages: {
                email: {
                    required: "You must enter an email address.",
                    email: "You've entered an invalid email address."
                },
                password: {
                    required: "You must enter a password.",
                    minlength: "Your password must be at least {0} characters."
                }
            }
        });*/
    });

    Template.login.onDestroyed(function(){
        //console.log("The 'login' page was just destroyed.");
    });
}

if(Meteor.isServer) {
    // Code here
}

Router.route('/login', {
    name: 'login'
});