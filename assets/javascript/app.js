$(document).ready(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDTBQ1ZXVvtIPmtMWD0jCJ4Q0yG1ZGFS64",
        authDomain: "rock-paper-scissors-20c47.firebaseapp.com",
        databaseURL: "https://rock-paper-scissors-20c47.firebaseio.com",
        projectId: "rock-paper-scissors-20c47",
        storageBucket: "rock-paper-scissors-20c47.appspot.com",
        messagingSenderId: "109051506827"
    };
    firebase.initializeApp(config);
    var database = firebase.database();

    var connections = database.ref("connections");
    var con;
    var ties = 0
    var player = {
        number: 0,
        name: "",
        wins: 0,
        losses: 0,
        choice: ""
    }
    var opponent = {
        number: 0,
        name: "",
        choice: ""
    }

    function databaseSetup() {
        connections.once('value', function (snapshot) {
            if (snapshot.val() == null) {
                player.number = '1';
                opponent.number = '2';
            } else if (Object.keys(snapshot.val()).indexOf('1') === -1) {
                player.number = '1';
                opponent.number = '2';
            } else if (Object.keys(snapshot.val()).indexOf('2') === -1) {
                player.number = '2';
                opponent.number = '1';
            }


            if (player.number === "1" || player.number === "2") {

                con = connections.child(player.number);
                con.set(player);
                con.onDisconnect().remove();

            } else {
                $(".row").hide();
                app.delete();
            }
        });
    }


    connections.on('value', function (snapshot) {
        console.log(snapshot.val())
        console.log("oppenont" + opponent.choice)

        if (con) {

            if (Object.keys(snapshot.val()).indexOf(opponent.number) !== -1) {

                opponent = snapshot.val()[opponent.number];
                player = snapshot.val()[player.number];

                if (opponent.name.length > 0) {
                    $("#player" + opponent.number + "Name").text(opponent.name)
                    if (player.name.length > 0) {
                        var choice1 = snapshot.val()['1'].choice;
                        var choice2 = snapshot.val()['2'].choice;
                        var turns1 = snapshot.val()['1'].turns;

                        if (choice1.length > 0 && choice2.length > 0) {
                            $("#player" + player.number + "Choice").text(player.choice)
                            $("#player" + opponent.number + "Choice").text(opponent.choice)
                            RPSLogic()

                        } else if (choice1.length === 0 && turns1 === 0) {

                        } else if (choice1.length > 0 && choice2.length === 0) {

                        }
                    }
                }
            } else if (opponent.name.length > 0 && Object.keys(snapshot.val()).indexOf(opponent.number) === -1) {
                $('.turn').text('Opponent left. Waiting for new opponent.');
                $("#player" + opponent.number + "Name").text("Waiting");

            }
        }
    });

    function scoreUpdate() {
        $("#wins" + player.number).text(player.wins);
        $("#loss" + player.number).text(player.losses)
        $("#wins" + opponent.number).text(opponent.wins);
        $("#loss" + opponent.number).text(opponent.losses);
        $("#ties" + player.number).text(ties);
        $("#ties" + opponent.number).text(ties);
    }

    //Rock Paper Scissors logic

    function RPSLogic() {
        if (player.choice === "Rock" && opponent.choice === "Paper") {
            $("#textResults").text("Paper Covers Rock");
            $("#playerWins").text(opponent.name + " Wins");
            con.update({
                losses: +1
            })
            scoreUpdate()
            setTimeout(function () {
                choiceReset();
            }, 3000)
        }
        if (player.choice === "Paper" && opponent.choice === "Rock") {
            $("#textResults").text("Paper Covers Rock");
            $("#playerWins").text(player.name + " Wins");
            con.update({
                wins: +1
            })
            scoreUpdate()
            setTimeout(function () {
                choiceReset();
            }, 3000)
        }

        if (player.choice === "Paper" && opponent.choice === "Paper") {
            $("#textResults").text("Tie");
            ties++
            scoreUpdate()
            setTimeout(function () {
                choiceReset();
            }, 3000)
        }
        if (player.choice === "Rock" && opponent.choice === "Rock") {
            $("#textResults").text("Tie");
            ties++
            scoreUpdate()
            setTimeout(function () {
                choiceReset();
            }, 3000)
        }
        if (player.choice === "Scissors" && opponent.choice === "Scissors") {
            $("#textResults").text("Tie");
            ties++
            scoreUpdate()
            setTimeout(function () {
                choiceReset();
            }, 3000)
        }

        if (player.choice === "Scissors" && opponent.choice === "Paper") {
            $("#textResults").text("Paper Covers Rock");
            $("#playerWins").text(player.name + " Wins");
            con.update({
                wins: +1
            })
            scoreUpdate()
            setTimeout(function () {
                choiceReset();
            }, 3000)
        }
        if (player.choice === "Paper" && opponent.choice === "Scissors") {
            $("#textResults").text("Paper Covers Rock");
            $("#playerWins").text(opponent.name + " Wins");
            con.update({
                losses: +1
            })
            scoreUpdate()
            setTimeout(function () {
                choiceReset();
            }, 3000)
        }
        if (player.choice === "Rock" && opponent.choice === "Scissors") {
            $("#textResults").text("Paper Covers Rock");
            $("#playerWins").text(player.name + " Wins");
            con.update({
                wins: +1
            })
            scoreUpdate()
            setTimeout(function () {
                choiceReset();
            }, 3000)
        }
        if (player.choice === "Scissors" && opponent.choice === "Rock") {
            $("#textResults").text("Paper Covers Rock");
            $("#playerWins").text(opponent.name + " Wins");
            con.update({
                losses: +1
            })
            scoreUpdate()
            setTimeout(function () {
                choiceReset();
            }, 3000)
        }
    }

    function choiceReset() {
        con.update({
            choice: ""
        })
        $("#playerWins").text("");
        $("#textResults").text("");
        $("#player" + player.number + "Choice").text("");
        $("#player" + opponent.number + "Choice").text("");
        $(".player" + player.number).show();
    }

    $(".choice").on("click", function () {
        var choice = $(this).text()
        con.update({
            choice: choice
        })
        $(".player" + player.number).hide();

    })

    $("#submit").on("click", function (event) {
        event.preventDefault();
        var inputName = $("#inputName").val()
        $("form").hide();
        player.name = inputName
        con.update({
            name: inputName
        })
        $("#player" + player.number + "Name").text(player.name)
        $(".player" + player.number).show();
    })

    databaseSetup()
    $(".player1").hide();
    $(".player2").hide();

})