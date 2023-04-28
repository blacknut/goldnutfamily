let counter = 0;
let score = 0;
let scoreTeam1 = 0;
let scoreTeam2 = 0;
let jsonpath = "https://s3.eu-west-1.amazonaws.com/blk.binaries/blacknut/elhostis/questions.json";
let generique = new Audio('generique.mp3');
let numQuestion = 0;

$(document).ready(function(){
  
  $( "#generique" ).click(function() {
    generique.play();
  });
  
  $( "#start" ).click(function() {
    generique.pause();
    $("#intro").hide();
    $("#thegame").show();
    loadTeams();
    cleanup();    
  });

  
  $( "#newquestion" ).click(function() {
    cleanup()
    loadQuestion(numQuestion);
    numQuestion = numQuestion + 1;
  });

  $( "#team1win" ).click(function() {
    scoreTeam1 = scoreTeam1 + score
    score = 0
    $("#team1-score").html(scoreTeam1 + " points");
    $("#score").html(score + " point");
  });

  $( "#team2win" ).click(function() {
    scoreTeam2 = scoreTeam2 + score
    score = 0
    $("#team2-score").html(scoreTeam2 + " points");
    $("#score").html(score + " point");
  });
});


function loadTeams() {
  $("#team1-score").html("0 point");
  $("#team2-score").html("0 point");

  $.getJSON(jsonpath, function(jd) {
    let teams = jd.teams;
    $("#team1").html(teams[0]);
    $("#team2").html(teams[1]);
  });
}

function cleanup() {
  for (var i=0;i<10;i++) {
    let Idpourcentage = "response" + i + "-1"
    let Idresponse = "response" + i + "-2"
    $("#" + Idpourcentage).html("");
    $("#" + Idpourcentage).removeClass("found")
    $("#" + Idpourcentage).removeClass("hidden")
    $("#" + Idpourcentage).removeClass("off")

    $("#" + Idresponse).html("");
    $("#" + Idresponse).removeClass("found")
    $("#" + Idresponse).removeClass("hidden")
    $("#" + Idresponse).removeClass("off")
  }
  $("#question").html("");
  score = 0;
  $("#score").html(score + " point");
  $("#error1").hide();
  $("#error2").hide();
  $("#error3").hide();
}

function loadQuestion(numQuestion) {
  $.getJSON(jsonpath, function(jd) {
    // Show question & reponses
    if (numQuestion >= jd.questions.length) {
      if (scoreTeam1 == scoreTeam2) {
        $("#question").html("Match nul ! Improbable :)");
      } else if (scoreTeam1 > scoreTeam2) {
        $("#question").html($("#team1").html() + " won the match. Congrats !");
      }else {
        $("#question").html($("#team2").html() + " won the match. Congrats !");
      }
      
    } else {
      let question = jd.questions[numQuestion];
      $("#question").html(question.text);
      for (var i=0;i<question.responses.length;i++) {
        let Idpourcentage = "response" + i + "-1"
        let Idresponse = "response" + i + "-2"
        $("#" + Idpourcentage).html(question.responses[i].rate);
        $("#" + Idpourcentage).addClass("hidden")
        $("#" + Idresponse).html(question.responses[i].text);
        $("#" + Idresponse).addClass("hidden")
      }
      for (var i=question.responses.length;i<10;i++) {
        let Idpourcentage = "response" + i + "-1"
        let Idresponse = "response" + i + "-2"
        $("#" + Idpourcentage).addClass("off")
        $("#" + Idresponse).addClass("off")
      }

      // Animate responses
      $(".hidden").click(function(){
        classes = $(this).attr('class');
        if (!classes.includes("found")) {
          $(this).addClass('found');
          $(this).prev().addClass('found');
          tmp = parseInt($(this).prev().text());
          score = score + tmp;
          new Audio('success.mp3').play();
          $("#score").html(score + " points");
        }
      });
    }
  });
}

function toto(num) {
  let obj = $("#response" + num + "-2")
  classes = obj.attr('class');
  if (classes.includes("hidden")) {
    if (!classes.includes("found")) {
      obj.addClass('found');
      obj.prev().addClass('found');
      tmp = parseInt(obj.prev().text());
      score = score + tmp;
      new Audio('success.mp3').play();
      $("#score").html(score + " points");
    }
  }
}

document.addEventListener('keydown', (event) => {
  var name = event.key;
  var code = event.code;
  
  if (code == "KeyG") { // Go generique
    generique.play();
  }
  if (code == "KeyS") { // Start the game
    generique.pause();
    $("#intro").hide();
    $("#thegame").show();
    loadTeams();
    cleanup();    
  }
  if (code == "KeyN") { // New question
    cleanup()
    loadQuestion(numQuestion);
    numQuestion = numQuestion + 1;
  }
  if ((code == "KeyA") || (code == "KeyQ")) { // Team 1 win
    scoreTeam1 = scoreTeam1 + score
    score = 0
    $("#team1-score").html(scoreTeam1 + " points");
    $("#score").html(score + " point");
  }
  if (code == "KeyB") { // Team 2 win
    scoreTeam2 = scoreTeam2 + score
    score = 0
    $("#team2-score").html(scoreTeam2 + " points");
    $("#score").html(score + " point");
  }

  if (code == "Numpad0") { // Responses
    toto(1)
  }
  if (code == "Numpad1") { 
    toto(0)
  }
  if (code == "Numpad2") {
    toto(1)
  }
  if (code == "Numpad3") {
    toto(2)
  }
  if (code == "Numpad4") { 
    toto(3)
  }
  if (code == "Numpad5") { 
    toto(4)
  }
  if (code == "Numpad6") { 
    toto(5)
  }
  if (code == "Numpad7") { 
    toto(6)
  }
  if (code == "Numpad8") { 
    toto(7)
  }
  if (code == "Numpad9") { 
    toto(8)
  }
  if (code == "Numpad0") { 
    toto(9)
  }

  if (code == "KeyR") { // Reset errors
    counter=0;
    $(".showerror").hide();
  }
  if (code == "Space") { // Error
    counter=counter+1
    id = "#error" + counter
    $(".showerror").hide();
    new Audio('wrong.mp3').play();
    $(id).addClass('showerror');
    new Audio('wrong.mp3').play();
    $(id).show();
  }
}, false);