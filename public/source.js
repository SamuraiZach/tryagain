var username = " "; //document.querySelector('.namereg');
var password = " ";
var email = " ";
let renderLogin = () => {
    $(".toppart").append(`<button id="logbutton" class="logbutton">Log In! Google</button>`);
    $("#logbutton").on("click", () => { firebase.auth().signInWithRedirect(google_provider); });
}

let startApp = (user) => {
    console.log(user.displayName);
    $(".toppart").append(`<p style="position:absolute;left: 5.5%;top: 50%;" id="namereg" class="namereg">${user.displayName}</p>`);
    $("#logbutton").remove();
    //$('.logbutton').css('visibility', 'hidden');
    $('.registerbutton').css('visibility', 'hidden');
    $('.logoutbutton').css('visibility', 'visible');
    $('.introbody').css('visibility', 'hidden');
    $('.createtourney').css('visibility', 'visible');
    $('.jointourney').css('visibility', 'visible');
    $("#logoutbutton").click(() => {
        //$(".namereg").remove();
        firebase.auth().signOut();
        $('.registerbutton').css('visibility', 'visible');
        $('.logoutbutton').css('visibility', 'hidden');
        $('.introbody').css('visibility', 'visible');
        $('.createtourney').css('visibility', 'hidden');
        $('.jointourney').css('visibility', 'hidden');
    });
}
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

$("#registerbutton").click(() => {
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


var google_provider = new firebase.auth.GoogleAuthProvider();
google_provider.setCustomParameters({ prompt: 'select_account' });
firebase.auth().onAuthStateChanged(user => {
    if (!!user) {
        startApp(user);
    } else {
        renderLogin();
    }
});