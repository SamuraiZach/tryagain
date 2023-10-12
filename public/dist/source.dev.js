"use strict";

//create pushes table 

/*var google_provider = new firebase.auth.GoogleAuthProvider();
google_provider.setCustomParameters({ prompt: 'select_account' });*/
var pages = ['page1', 'page2', 'page3'];
var currentPageIndex = -1;
console.log(currentPageIndex + " top of js");
var username = " "; //document.querySelector('.namereg'); same as user.displayName

var password = " ";
var email = " ";
var signtype = "";
var loggedInPerson = false;
console.log(currentPageIndex);

var showNextPage = function showNextPage() {
  currentPageIndex = (currentPageIndex + 1) % pages.length;
  console.log("page index = ", currentPageIndex);
  var template = document.getElementById(pages[currentPageIndex]).innerHTML; //do stuff to template here

  display.innerHTML = template;

  if (currentPageIndex == 2) {
    renderTournament();
    console.log("populate? full html means to use AJAX and pull stuff from DB about it");
  }
};

var showPreviousPage = function showPreviousPage() {
  currentPageIndex = (currentPageIndex - 1) % pages.length;
  console.log("page index = ", currentPageIndex);
  var template = document.getElementById(pages[currentPageIndex]).innerHTML; //do stuff to template here

  display.innerHTML = template;
};
/*
firebase.auth().onAuthStateChanged(user => {
    if (!!user) {
        //currentPageIndex = 0;
        console.log(signtype, ": sty ", username, " : uname");
        if (signtype === "free" && user.displayName == null) {
            console.log("enter HERE!");
            user.updateProfile({ displayName: username.toString() }).then(function() {
                    console.log(user.displayName, " inside 1");
                })
                .catch(function(error) {
                    console.log("error");
                });
            console.log(user.displayName, " after catch");
        } else {
            username = user.displayName;
        }
        showNextPage();
        console.log(user + " : after sign in") ///////////////////////////////////////////////////////////////////
        console.log("after login");
        startApp(user);
    } else {
        if (currentPageIndex == 1) {
            showPreviousPage();
        }
        console.log(user + " : initial null user") //////////////////////////////////////////////////////////////
        console.log("First AUTH");
        renderLogin();
    }
});
*/

/*let renderTournament = () => {

};*/


var renderLogin = function renderLogin() {
  /*var google_provider = new firebase.auth.GoogleAuthProvider();
  google_provider.setCustomParameters({ prompt: 'select_account' });*/
  var google_provider = new firebase.auth.GoogleAuthProvider();
  google_provider.setCustomParameters({
    prompt: 'select_account'
  });
  console.log("entered");
  console.log($("#logbutton")[0]);
  $("#logbutton").on("click", function () {
    firebase.auth().signInWithRedirect(google_provider); //const tryF = firebase.auth().currentUser;
    //console.log(tryF.displayName, " test");
    //showNextPage();
  });
  $("#logbuttonDB").on("click", function () {
    var logReg = $("#logReg")[0];
    $("#fnameL").val("");
    $("#pwdL").val("");
    $("#emailL").val("");
    logReg.showModal();
    $("#closeLog").click(function () {
      var logReg = $("#logReg")[0];
      password = $("#pwdL").val();
      email = $("#emailL").val();
      ;
      firebase.auth().signInWithEmailAndPassword(email, password).then(function (userCredential) {
        username = $("#fnameL").val(); // Signed in

        var user = userCredential.user; // ...
      })["catch"](function (error) {
        var errorMessage = error.message;
        alert(errorMessage);
      });
      logReg.close();
    });
  });
  $("#registerbutton").on("click", function () {
    var modalReg = $("#modalReg")[0];
    $("#fnameR").val("");
    $("#pwdR").val("");
    $("#email").val("");
    modalReg.showModal();
    $("#closeReg").click(function () {
      console.log("reach");
      var modalReg = $("#modalReg")[0];
      username = $("#fnameR").val();
      password = $("#pwdR").val();
      email = $("#email").val();
      ;
      var obj = {
        "Username": username,
        "Password": password,
        "Email": email
      };
      modalReg.close();
      firebase.auth().createUserWithEmailAndPassword(email, password).then(function (userCredentials) {
        var pp = userCredentials.user;
        console.log(pp.displayName, " dd");
        user.updateProfile({
          displayName: username.toString()
        }).then(function () {
          console.log(user.displayName, " inside 2");
        })["catch"](function (error) {
          console.log("error");
        });
        console.log(user.displayName, " after catch");
      });
      console.log("teehee");
      signtype = "free";
      console.log(signtype);
    });
  });
};

var startApp = function startApp(user) {
  console.log(user.email + ": startApp Email");

  if (signtype === "free" && user.displayName == null) {
    user.updateProfile({
      displayName: username
    });
  }

  console.log("hi");
  console.log(user.displayName + ": udispo");
  console.log(username + ": uddddd");
  $("#namereg").text(username);
  $("#logoutbutton").on("click", function () {
    firebase.auth().signOut();
  });
  $("#createtourney").on("click", function () {
    var modalCreate = $("#modalCreate")[0];
    $("#tname").val("");
    $("#gname").val("");
    $("#nump").val("");
    $("#gpwd").val("");
    modalCreate.showModal();
    $("#closeCreate").click(function () {
      var tourneyName = $("#tname").val();
      var gamename = $("#gname").val();
      var numplayers = $("#nump").val();
      var gamepwd = $("#gpwd").val();
      var ownersArry = [user.displayName];
      var ownerDisplayName = user.displayName;
      var ownerEmail = user.email;
      var playersArry = [""];
      var matches = [""];
      var joinableLink = ("https://cisc472-tourney.web.app/", "Tournament/"); // ,tourneyName, "/", gamename, "/", ownerDisplayName);

      var obj = {
        "TournamentName": tourneyName,
        "GameName": gamename,
        "NumPlayers": numplayers,
        "GamePassword": gamepwd,
        "Owners": ownersArry,
        "Players": playersArry,
        "Games": matches,
        "OwnerEmail": ownerEmail,
        "OwnerName": ownerDisplayName,
        "JoinableLink": joinableLink
      }; //then ajax stuff into game on firebase

      var modalCreate = $("#modalCreate")[0];
      console.log("pushed");
      var newRef = firebase.database().ref("/Tournament").push();
      newRef.set({
        "TournamentName": tourneyName,
        "GameName": gamename,
        "NumPlayers": numplayers,
        "GamePassword": gamepwd,
        "Owners": ownersArry,
        "Players": playersArry,
        "Games": matches,
        "OwnerEmail": ownerEmail,
        "OwnerName": ownerDisplayName,
        id: newRef.key
      });
      modalCreate.close(); //showNextPage();
    }); //console.log("redering");
    //firebase.database().ref("/surveys").on("value", ss => {});
  });
  console.log("redering");
  firebase.database().ref("/Tournament").on("value", function (ss) {
    $("#linkGlobalTables").html("");
    $("#yourTables").html("");
    $("#linkGlobalTables").append("<h3>Global Tables</h3>");
    $("#yourTables").append("<h3>Your Tables</h3>");
    var allTournaments = ss.val() || {};
    Object.keys(allTournaments).map(function (sID) {
      var theTournament = allTournaments[sID];

      if (theTournament.OwnerName == user.displayName) {
        $("#yourTables").append("<a class=\"survey-wrap\" href=\"/Tournament/".concat(sID, "\"><h3 id=\"hyperLink\">").concat(theTournament.TournamentName, "</h3></a>"));
      }

      $("#linkGlobalTables").append("<a class=\"survey-wrap\" href=\"/Tournament/".concat(sID, "\"><h3 id=\"hyperLink\">").concat(theTournament.TournamentName, "</h3></a>"));
    });
  });
};

var routeToPage = function routeToPage(parts, user) {
  //addLogout();
  console.log(parts.length);

  if (parts.length < 3) {
    showNextPage();
    startApp(user);
  } else {
    if (parts[1] == "Tournament" && parts[2].length > 1) {
      //renderSurvey(parts[2]);
      console.log("teehee");
    } else {
      alert("Tournament Doesnt Exist / Invalid Link");
      showNextPage();
      startApp(user);
    }
  }
};
/*var google_provider = new firebase.auth.GoogleAuthProvider();
google_provider.setCustomParameters({ prompt: 'select_account' });*/


document.addEventListener('DOMContentLoaded', function () {
  var pn = document.location.pathname;
  var URLparts = pn.split("/");
  firebase.auth().onAuthStateChanged(function (user) {
    if (!!user) {
      //currentPageIndex = 0;
      loggedInPerson = user;
      console.log(signtype, ": sty ", username, " : uname");

      if (signtype === "free" && user.displayName == null) {
        console.log("enter HERE!");
        user.updateProfile({
          displayName: username.toString()
        }).then(function () {
          console.log(user.displayName, " inside 1");
        })["catch"](function (error) {
          console.log("error");
        });
        console.log(user.displayName, " after catch");
      } else {
        username = user.displayName;
      } //showNextPage();


      console.log(user + " : after sign in"); ///////////////////////////////////////////////////////////////////

      console.log("after login");
      routeToPage(URLparts, user); //startApp(user);
    } else {
      if (currentPageIndex == 1) {
        showPreviousPage();
      }

      loggedInPerson = false;
      console.log(user + " : initial null user"); //////////////////////////////////////////////////////////////

      console.log("First AUTH");
      renderLogin();
    }
  }); //Expecting /tourney/:uidhere

  /*
  firebase.auth().onAuthStateChanged(user => {
    if (!!user){
      loggedInPerson = user;
      routeToPage(URLparts);
    } else {
      loggedInPerson = false;
      $("#logout-wrap").remove();
      renderLogin();
    }
  });*/

  console.log("SPLIT!");
});
showNextPage();