
    let minutes = document.getElementById('session').value;
    let seconds = 0;
    let breakTime = document.getElementById('break').value;
    let timer = document.getElementById("timer");
    let intvID;
    let breakIntvID;

console.log(breakTime)

 $('#session').change( () => { 
    minutes = document.getElementById('session').value;
   seconds = 0;
   stopTimer();
 })



 $('#break').change( () => { 
    breakTime = document.getElementById('break').value;
   seconds = 0;
   stopTimer();
 })

 function reset(){
    stopTimer();
    stopBreak();
    minutes = document.getElementById('session').value;
    seconds = 0;
    breakTime = document.getElementById('break').value;
    $('#timer').html(`<p class ="timerText">Begin Session</p>`)
}

function toggleTimer() {
  
  $('.buttonContainer').html(`<a class="waves-effect waves-light btn" onClick = "reset()">Reset</a>`)
  

  if ($(timer).hasClass('active')){
    timer.classList.toggle('active');
    stopTimer();
  }
  else if ($(timer).hasClass('break') === false && $(timer).hasClass('active') === false) {
      if (minutes > 0 || seconds > 0) {
        timer.classList.toggle('active');
        startTimer();
      }
    else {
      timer.classList.toggle('breakActive');
      timer.classList.toggle('break');
      startBreak()
      }
    }
  else if ($(timer).hasClass('break') && $(timer).hasClass('breakActive')) {
          timer.classList.toggle('breakActive');
      stopBreak();
    }
  else if ($(timer).hasClass('break') && $(timer).hasClass('breakActive') === false) {
        timer.classList.toggle('breakActive');
    startBreak();
  }
}

function stopTimer(){
   window.clearInterval(intvID);
  if ($('#timer').hasClass('active')) timer.classList.toggle('active');
}

function stopBreak(){
    window.clearInterval(breakIntvID);
}

function startTimer(){
  intvID = window.setInterval(timerActivate, 1000);
}

function startBreak(){
              $('.buttonContainer').html(`<a class="waves-effect waves-light btn" onClick = "toggleSound()">Stop Alarm</a><a class="waves-effect waves-light btn" onClick = "reset()">Reset</a>`)
  breakIntvID = window.setInterval(breakTimer, 1000);
}

function timerActivate(){
  if (seconds == 0) { 
    seconds = 59;
    if (minutes > 0) minutes -= 1;
  } else {
    seconds -= 1;
  }

  if (seconds < 10) {
    $('#timer').html(`<p class = "breakText">Session</p><div class = "time">${minutes}:0${seconds}<div>`)
  } else {
    $('#timer').html(`<p class = "breakText">Session</p><div class = "time">${minutes}:${seconds}<div>`)
  }
    if (minutes == 0 && seconds == 0){
    toggleSound();
    stopTimer();
    timer.classList.toggle('active');
      timer.classList.toggle('break');
      timer.classList.toggle('breakActive')
    setTimeout(function(){ startBreak() }, 2000);
  }
}

function breakTimer(){
  if (seconds == 0) { 
      seconds = 59;
      if (breakTime > 0) {breakTime -= 1};
    } else {
      seconds -= 1;
    }
    
    if (seconds < 10) {
          $('#timer').html(`<p class = "breakText">Break</p><div class = "time">${breakTime}:0${seconds}<div>`)
    } else {
    $('#timer').html(`<p class = "breakText">Break</p><div class = "time">${breakTime}:${seconds}<div>`)
    }
      if (breakTime == 0 && seconds == 0){
      toggleSound();
      reset();
        timer.classList.toggle("break")
        timer.classList.toggle("breakActive")
    }
  
}

function toggleSound() {
    let sound = document.getElementById("audio");
    if ($('#audio').hasClass('playing')){
        sound.pause();
        sound.currentTime = 0;
        sound.classList.toggle('playing');
    } else {
        sound.play();
        sound.classList.toggle('playing');
            $('.buttonContainer').html(`<a class="waves-effect waves-light btn" onClick = "toggleSound()">Stop Alarm</a><a class="waves-effect waves-light btn" onClick = "reset()">Reset</a>`)
    }
}

$('#timer').on('click', () => {
    toggleTimer();
})



  $('#timer').html(`<p class ="timerText">Begin Session</p>`)

