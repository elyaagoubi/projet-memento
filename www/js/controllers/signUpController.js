app.controller('UserCtrl', function($scope, $state, Auth, $ionicPopup, $timeout){


/*
  function logout(){
    Auth.ref().unauth();
    var authNow = Auth.ref().getAuth();
    console.log(authNow);
  }
  logout();
  */
  var isNewUser = true;
  var getUserData = Auth.ref().getAuth();

  $scope.user = {};

  $scope.showAlert = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Don\'t eat that!',
      template: 'It might taste good'
    });

    $timeout(function() {
      alertPopup.close(); //close the popup after 3 seconds for some reason
    }, 3000);
  };

  $scope.register = function() { //creation du compte dans la base de donnée

   $scope.error = null;
   $scope.message = null;

   Auth.ref().createUser({ // fonction createUser ( fonction firebase native) permet de d'enregistrer pass et mail
     email: $scope.user.email,
     password: $scope.user.password
   },function(error, authData){ // authData contient les info de l'user
       if (error) {
         console.log("Error creating user:", error);
       } else if(!error) {
         console.log("Successfully created user account with uid:", authData.uid);
         Auth.ref().authWithPassword({ // ici on connecte immédiatement l'user apres l'enregistrement
           email: $scope.user.email, // fonction AutWithPassword (firebase function native) permet de connecter l'user
           password: $scope.user.password
         });
         console.log("Authenticated successfully with payload:", authData.uid);
         $state.go('UserData')
       }
    })

 };

  $scope.userData = function(error){ //creation du profile de l'user avec des info complémentaire

    Auth.ref().onAuth(function(authData){ //function onAuth = recupère l'user actuellement connecté
      if(authData && isNewUser){
        Auth.ref().child(authData.uid).set({ // ici on sélectionne l'id de l'user grace a authData.uid,
          provider: authData.provider, // puis on crée un "child" (enfant) et on y insere l'username et le provider
          name: $scope.user.username // dans BDD, on a genre  =  firebase > UID > username & provider
        });

        Auth.ref().child(authData.uid).child("markers").set({
          lat: 48.90107,
          lng: 2.35133
        });

        $state.go('tab.dash');//redirection vers home

        $scope.showAlert = function() { // affichage d'une popup d'alert apres inscription success

          Auth.ref().on("child_added", function (snapshot) { // ici on recupère les donnée enregsitrer dans le new child

            var userData = snapshot.val(); //snapshot.val permet de recuperer des données dans firebase
            console.log(userData.name);  // cette variable contient le username

            var alertPopup = $ionicPopup.alert({
              title: 'Bienvenu ' + userData.name,
              template: 'Votre compte à correctement été créé !'
            });

            $timeout(function() {
              alertPopup.close(); //close the popup after 3 seconds for some reason
            }, 6000);

          }, function (errorObject) {
            console.log("fail :" + errorObject.code)
          });
        };

        $scope.showAlert();
      }else{
        console.log("Datase error", error)
      }
    })
  };

  $scope.login= function() {

    $scope.error = null;
    $scope.message = null ;

    Auth.ref().authWithPassword({ // ici authWithPassword permet de comparer pass/email entré avec pass/email dans firebase.
      email: $scope.user.email,
      password: $scope.user.password
    },function(error, authData){
      if (error) {
        console.log("Login failed:", error);
      } else {
        console.log("Authenticated successfully with payload:", authData.uid);
      }
    })
  };


});
