if(Meteor.isClient){
    Template.register.events({
        'submit form': function(event){
            event.preventDefault();
            /*var email = $('[name=email]').val();
            var password = $('[name=password]').val();
            Accounts.createUser({
                email: email,
                password: password
            }, function(error){
                if(error){
                    console.log(error.reason); // Output error if registration fails
                } else {
                    Router.go('home');
                }
            });*/
        }
    });

    Template.register.onRendered(function(){
        var validator = $('.register').validate({
            submitHandler: function(event){
                var email = $('[name=email]').val();
                var password = $('[name=password]').val();
                Accounts.createUser({
                    email: email,
                    password: password
                }, function(error) {
                    if (error) {
                        //console.log(error.reason);
                        if(error.reason == "Email already exists."){
                            validator.showErrors({
                                email: "That email already belongs to a registered user."
                            });
                        }
                    } else {
                        Router.go('home');
                    }
                }   );
            }
        });
    });

    $.validator.setDefaults({
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
                email: "You have entered invalid email address."
            },
            password: {
                required: "You must enter a password.",
                minlength: "Your password must be at least {0} characters."
            }
        }
    });
}

if(Meteor.isServer){
    // Server code
}

Router.route('/register', {
    name: 'register'
});