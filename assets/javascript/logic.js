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



    // database to build funtions
    //a way to assign player 1 or player 2
    //listen for player 1 selection and update player 1 screen
    //llsten for player 2 selection and update player 2 screen
    //after both players make a selection show there selection, update win/loss/tie and reset game for another round.

    //create varables

    // var player1 = {
    //     playerWins: 0,
    //     playerLosses: 0,
    //     PlayerName: "",
    //     playerChoice: "",
    //     playerChoiceSet: false,
    //     playerSet: false
    // }

    // var player2 = {
    //     playerWins: 0,
    //     playerLosses: 0,
    //     PlayerName: "",
    //     playerChoice: "",
    //     playerChoiceSet: false,
    //     playerSet: false
    // }

    var player1Wins = 0;
    var player2Wins = 0;
    var player1Losses = 0;
    var player2Losses = 0;
    var ties = 0;
    var player1Set = false;
    var player2Set = false;
    var player1Name = ""
    var player2Name = "";
    var player1Choice = "";
    var player2Choice = "";
    var player1ChoiceSet = false;
    var player2ChoiceSet = false;

    database.ref().on("value", function (snapshot) {
        var sv = snapshot.val();
        if (sv == null) {

        } else if (sv.players.player1 !== null && sv.players.player2 == null) {
            player1Set = true
            player1Name = sv.players.player1.name

            $("#player1Name").text(player1Name);
            $(".player1").show();
            console.log("Player 1 " + sv.players.player1.name)

        } else if (sv.players.player1 !== null && sv.players.player2 !== null) {
            player2Set = true
            player2Name = sv.players.player2.name
            $("#player2Name").text(player2Name);
            $(".player2").show();
            console.log("Player 2 " + sv.players.player2.name)
        }
    })

    //function go grab user name input
    function playerSetup() {
        $(".player1").hide();
        $(".player2").hide();
        $("#submit").on("click", function () {
            event.preventDefault();
            var inputName = $("#inputName").val();
            $("#inputName").val("")
            if (!player1Set) {
                // player1Set = true
                player1Name = inputName
                // $("#player1Name").text(player1Name);
                // $(".player1").show();
                database.ref("players/player1").update({
                    name: player1Name
                })
            } else if (player1Set && !player2Set) {
                // player2Set = true
                player2Name = inputName
                // $("#player2Name").text(player2Name);
                // $(".player2").show();
                database.ref("players/player2").update({
                    name: player2Name
                })
            }
        })
    }


    //function to grap button click for player 1 and 2

    $("button").on("click", function () {
        var player = $(this).attr("data-player")
        var selectedButton = $(this).text()
        if (player === "player1") {
            player1Choice = selectedButton
            database.ref("players/player1").update({
                choice: player1Choice
            })

            $(".player1").hide();
            player1ChoiceSet = true
        } else if (player === "player2") {
            player2Choice = selectedButton
            database.ref("players/player2").update({
                choice: player2Choice
            })

            $(".player2").hide();
            player2ChoiceSet = true

        }
        if (player1ChoiceSet === true && player2ChoiceSet === true) {
            $("#player1Choice").text(player1Choice);
            $("#player2Choice").text(player2Choice);
            RPSLogic()

        }
    })

    //function to update screen with winner and update user wins losses and ties

    function scoreUpdate() {
        $("#wins1").text(player1Wins);
        $("#loss1").text(player1Losses);
        $("#wins2").text(player2Wins);
        $("#loss2").text(player2Losses);
        $("#ties1").text(ties)
        $("#ties2").text(ties)
    }
    // game reset upon both players makeing a choice
    function gameReset() {
        $("#player1Choice").text("");
        $(".player1").show();
        $("#player2Choice").text("");
    }

    //Rock Paper Scissors logic

    function RPSLogic() {
        if (player1Choice === "Rock" && player2Choice === "Paper") {
            $("#textResults").text("Paper Covers Rock");
            $("#playerWins").text(player2Name + " Wins");
            player2Wins++
            player1Losses++
            scoreUpdate()
            setTimeout(function () {
                gameReset()
            }, 3000)
        }

        if (player1Choice === "Paper" && player2Choice === "Scissors") {
            $("#textResults").text("Scissors Cuts Paper");
            $("#playerWins").text(player2Name + " Wins");
            player2Wins++
            player1Losses++
            scoreUpdate()
            setTimeout(function () {
                gameReset()
            }, 3000)
        }

        if (player1Choice === "Scissors" && player2Choice === "Rock") {
            $("#textResults").text("Rock Smashes Scissors");
            $("#playerWins").text(player2Name + " Wins");
            player2Wins++
            player1Losses++
            scoreUpdate()
            setTimeout(function () {
                gameReset()
            }, 3000)

        }
        if (player1Choice === "Rock" && player2Choice === "Scissors") {
            $("#textResults").text("Rock Smashes Scissors");
            $("#playerWins").text(player1Name + " Wins");
            player1Wins++
            player2Losses++
            scoreUpdate()
            setTimeout(function () {
                gameReset()
            }, 3000)
        }

        if (player1Choice === "Paper" && player2Choice === "Rock") {
            $("#textResults").text("Paper Covers Rock");
            $("#playerWins").text(player1Name + " Wins");
            player1Wins++
            player2Losses++
            scoreUpdate()
            setTimeout(function () {
                gameReset()
            }, 3000)
        }

        if (player1Choice === "Scissors" && player2Choice === "Paper") {
            $("#textResults").text("Scissors Cuts Paper");
            $("#playerWins").text(player1Name + " Wins");
            player1Wins++
            player2Losses++
            scoreUpdate()
            setTimeout(function () {
                gameReset()
            }, 3000)

        }

        if (player1Choice === "Rock" && player2Choice === "Rock") {
            $("#textResults").text("Tie");
            $("#playerWins").text("");
            ties++
            scoreUpdate()
            setTimeout(function () {
                gameReset()
            }, 3000)

        }

        if (player1Choice === "Paper" && player2Choice === "Paper") {
            $("#textResults").text("Tie");
            $("#playerWins").text("");
            ties++
            scoreUpdate()
            setTimeout(function () {
                gameReset()
            }, 3000)
        }

        if (player1Choice === "Scissors" && player2Choice === "Scissors") {
            $("#textResults").text("Tie");
            $("#playerWins").text("");
            ties++
            scoreUpdate()
            setTimeout(function () {
                gameReset()
            }, 3000)

        }
    }



    playerSetup()
    scoreUpdate()


})