// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '155953398151066', // your App ID
        'clientSecret'  : '1106251e23972cc7c0f778cc653eecd3', // your App Secret
        'callbackURL'   : 'http://fedtime-test-yrwang-test.1d35.starter-us-east-1.openshiftapps.com/auth/facebook/callback'
    },

    /*'twitterAuth' : {
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : 'your-secret-clientID-here',
        'clientSecret'  : 'your-client-secret-here',
        'callbackURL'   : 'http://localhost:8080/auth/google/callback'
    }*/

};