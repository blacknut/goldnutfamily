counter = 0;
score = 0;
scoreTeam1 = 0;
scoreTeam2 = 0;

jsonpath = "http://localhost/questions.json";

$(document).ready(function(){
  let generique = new Audio('generique.mp3');
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

  let numQuestion = 0;
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

document.addEventListener('keydown', (event) => {
  var name = event.key;
  var code = event.code;
  if (code == "KeyR") {
    counter=0;
    $(".showerror").hide();
  }
  if (code == "Space") {
    counter=counter+1
    id = "#error" + counter
    $(".showerror").hide();
    new Audio('wrong.mp3').play();
    $(id).addClass('showerror');
    new Audio('wrong.mp3').play();
    $(id).show();
  }
}, false);