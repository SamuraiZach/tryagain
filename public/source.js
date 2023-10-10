var username = " "; //document.querySelector('.namereg');
var password = " ";
var email = " ";
let renderLogin = () => {
    console.log("renderLogin reached"); /////////////////////////////////////////////////////////////////////////////
    $(".toppart").append(`<button id="logbutton" class="logbutton">Log In! Google</button>`);
    //$(".toppart").append(`<button id="registerbutton" class="registerbutton">Register Here!</button>`);
    $('.registerbutton').css('visibility', 'visible');
    $("#logbutton").on("click", () => { firebase.auth().signInWithRedirect(google_provider); });
}
let startApp = (user) => {
    console.log("startApp reached"); /////////////////////////////////////////////////////////////////////////////////////////
    console.log(user.displayName + " : User after StartApp");
    $(".logbutton").remove();
    //$(".registerbutton").remove();
    $(".toppart").append(`<p style="position:absolute;left: 5.5%;top: 50%;" id="namereg" class="namereg">${user.displayName}</p>`);
    $(".toppart").append(`<button id="logoutbutton" class="logoutbutton">Logout</button>`);
    $('.introbody').css('visibility', 'hidden');
    $('.registerbutton').css('visibility', 'hidden');
    $('.createtourney').css('visibility', 'visible');
    $('.jointourney').css('visibility', 'visible');
    console.log("waitingforclick reached"); /////////////////////////////////////////////////////////////////////////////
    $("#logoutbutton").click(() => {
        console.log(user.displayName + " : User after click logout");
        console.log("clickedSignOut reached"); ///////////////////////////////////////////////////////////////////////////////////
        $(".namereg").remove();
        $(".logoutbutton").remove();
        $('.introbody').css('visibility', 'visible');
        $('.createtourney').css('visibility', 'hidden');
        $('.jointourney').css('visibility', 'hidden');
        /*firebase.auth().onAuthStateChanged((user) => {
            if (!!user) {
                console.log(user.displayName + " newAuthUser");
                console.log("newAuthUser"); //////////////////////////////////////////////////////////////////////////////////
                startApp(user);
            } else {
                console.log(user + " noUser");
                console.log("noUser"); /////////////////////////////////////////////////////////////////////////////////
                $(".namereg").remove();
                $(".logoutbutton").remove();
                $('.introbody').css('visibility', 'visible');
                $('.createtourney').css('visibility', 'hidden');
                $('.jointourney').css('visibility', 'hidden');
                renderLogin();
            }
        });*/
        console.log(user.displayName + " :user after onAuthStatechange and before auth sign out"); ///////////////////////////////
        firebase.auth().signOut();
    });
};

var google_provider = new firebase.auth.GoogleAuthProvider();
google_provider.setCustomParameters({ prompt: 'select_account' });
firebase.auth().onAuthStateChanged(user => {
    if (!!user) {
        console.log(user + " : after sign in") ///////////////////////////////////////////////////////////////////
        console.log("after login");
        startApp(user);
    } else {
        console.log(user + " : initial null user") //////////////////////////////////////////////////////////////
        console.log("First AUTH");
        renderLogin();
    }
});
/*let startApp = (user) => {
    console.log(user.displayName);
    $(".toppart").append(`<p style="position:absolute;left: 5.5%;top: 50%;" id="namereg" class="namereg">${user.displayName}</p>`);
    $(".toppart").append(`<button id="logoutbutton" class="logoutbutton">Logout</button>`);
    $("#logbutton").remove();
    $('.logbutton').css('visibility', 'hidden');
    $('.registerbutton').css('visibility', 'hidden');
    $('.logoutbutton').css('visibility', 'visible');
    $('.introbody').css('visibility', 'hidden');
    $('.createtourney').css('visibility', 'visible');
    $('.jointourney').css('visibility', 'visible');
    $("#logoutbutton").click(() => {
        console.log("1");
        $("#namereg").remove();
        $("#logbutton").remove();
        $('.registerbutton').css('visibility', 'visible');
        $('.logoutbutton').css('visibility', 'hidden');
        $('.introbody').css('visibility', 'visible');
        $('.createtourney').css('visibility', 'hidden');
        $('.jointourney').css('visibility', 'hidden');
        firebase.auth().signOut();
        firebase.auth().onAuthStateChanged(user => {
            if (!!user) {
                console.log("3");
                startApp(user);
            } else {
                console.log("2");
                renderLogin();
            }
        });
    });
}*/
let startAppNoGoogle = (username) => {
    console.log(username);
    $(".toppart").append(`<p style="position:absolute;left: 5.5%;top: 50%;" id="namereg" class="namereg">${username}</p>`);
    $('.logbutton').css('visibility', 'hidden');
    $('.registerbutton').css('visibility', 'hidden');
    $('.logoutbutton').css('visibility', 'visible');
    $('.introbody').css('visibility', 'hidden');
    $('.createtourney').css('visibility', 'visible');
    $('.jointourney').css('visibility', 'visible');
    $("#logoutbutton").click(() => {
        username = " ";
        password = " ";
        email = " ";
        $(".namereg").remove();
        $('.registerbutton').css('visibility', 'visible');
        $('.logoutbutton').css('visibility', 'hidden');
        $('.introbody').css('visibility', 'visible');
        $('.createtourney').css('visibility', 'hidden');
        $('.jointourney').css('visibility', 'hidden');
    });
}

$("#createtourney").on("click", () => {
    const modalCreate = $("#modalCreate")[0];
    $("#tname").val("");
    $("#gname").val("");
    $("#nump").val("");
    $("#gpwd").val("");
    modalCreate.showModal();
});
$("#registerbutton").on("click", () => {
    const modalReg = $("#modalReg")[0];
    //$("#fnameR").val("dadadadada"); //sets the value
    //const jj = $("#fnameR").val(); //will get the value
    //console.log(jj);
    $("#fnameR").val("");
    $("#pwdR").val("");
    $("#email").val("");
    modalReg.showModal();
    $("#closeReg").click(() => {
        console.log("reach");
        const modalReg = $("#modalReg")[0];
        username = $("#fnameR").val();
        password = $("#pwdR").val();
        email = $("#email").val();;
        let obj = {
            "Username": username,
            "Password": password,
            "Email": email
        };
        modalReg.close();
        startAppNoGoogle(username);
    });
});