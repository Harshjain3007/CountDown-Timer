(function () {
  var hour = document.querySelector(".hour");
  var min = document.querySelector(".minute");
  var sec = document.querySelector(".sec");

  var startbtn = document.querySelector(".start");
  var stopbtn = document.querySelector(".stop");
  var resetbtn = document.querySelector(".reset");

  var countdownTimer = null;

  startbtn.addEventListener("click", function () {
    if (hour.value == 0 && min.value == 0 && sec.value == 0) {
      return;
    }

    function startInterval() {
      startbtn.style.display = "none";
      stopbtn.style.display = "initial";

      countdownTimer = setInterval(() => {
        timer();
      }, 1000);
    }

    startInterval();
  });

  function stopInterval(state) {
    startbtn.innerHTML = state === "pause" ? "Continue" : "Start";

    startbtn.style.display = "initial";
    stopbtn.style.display = "none";
    clearInterval(countdownTimer);
  }

  function timer() {
    if (sec.value > 60) {
      min.value++;
      sec.value = parseInt(sec.value) - 59;
    }

    if (min.value > 60) {
      hour.value++;
      min.value = parseInt(min.value) - 60;
    }

    if (hour.value == 0 && min.value == 0 && sec.value == 0) {
      hour.value = "";
      min.value = "";
      sec.value = "";
      stopInterval();
    } else if (sec.value != 0) {
      sec.value = `${sec.value <= 10 ? "0" : ""}${sec.value - 1}`;
    } else if (min.value != 0 && sec.value == 0) {
      sec.value = 59;
      min.value = `${min.value <= 10 ? "0" : ""}${min.value - 1}`;
    } else if (hour.value != 0 && min.value == 0) {
      min.value = 60;
      hour.value = `${hour.value <= 10 ? "0" : ""}${hour.value - 1}`;
    }
  }

  stopbtn.addEventListener("click", function () {
    stopInterval("pause");
  });

  resetbtn.addEventListener("click", function () {
    hour.value = "";
    min.value = "";
    sec.value = "";
  });
})();
