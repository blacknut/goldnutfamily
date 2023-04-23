counter = 0;
score = 0;
scoreTeam1 = 0;
scoreTeam2 = 0;

$(document).ready(function(){
  // Here setup the match
  let team1 = "eric"
  let team2 = "yohan"


  // Load the match
  loadTeams(team1, team2);
  cleanup();

  
  $( "#newquestion" ).click(function() {
    cleanup()
    loadQuestion(0);
  });

  $( "#team1win" ).click(function() {
    scoreTeam1 = scoreTeam1 + score
    score = 0
    $("#team1-score").html(scoreTeam1);
    $("#score").html(score);
  });

  $( "#team2win" ).click(function() {
    scoreTeam2 = scoreTeam2 + score
    score = 0
    $("#team2-score").html(scoreTeam2);
    $("#score").html(score);
  });
});


function loadTeams(t1, t2) {
  $("#team1").html(t1);
  $("#team2").html(t2);
  $("#team1-score").html(0);
  $("#team2-score").html(0);
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
  $("#score").html(score);
  $("#error1").hide();
  $("#error2").hide();
  $("#error3").hide();
}

function loadQuestion(id) {
  $.getJSON('http://localhost/questions.json', function(jd) {
    // Show question & reponses
    let question = jd.questions[0];
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
        $("#score").html(score);
      }
    });
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