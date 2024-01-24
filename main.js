const firebaseConfig = {
  apiKey: "AIzaSyCmTXJoTJYQvYaJP8GdCzBMBqKc6CCqmKM",
  authDomain: "practice-86d5f.firebaseapp.com",
  databaseURL: "https://practice-86d5f-default-rtdb.firebaseio.com",
  projectId: "practice-86d5f",
  storageBucket: "practice-86d5f.appspot.com",
  messagingSenderId: "1031833120021",
  appId: "1:1031833120021:web:cde9f0e13019e0c01a0d1c"
}

firebase.initializeApp(firebaseConfig)
const auth = firebase.auth();
const database = firebase.database()


function chooseMyTab(evt, tabName) {
  var i, tabcontent, btn_board;
  tabcontent = document.getElementsByClassName("openTab");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  btn_board = document.getElementsByClassName("openTab-btn");
  for (i = 0; i < btn_board.length; i++) {
    btn_board[i].classList.remove("active");
  }
  if (!evt.currentTarget.classList.contains("active")) {
    evt.currentTarget.classList.add("active");
  }

  document.getElementById(tabName).style.display = "block";
}

function exitTab(ex) {
  var exit = document.getElementsByClassName(ex)[0];
  exit.style.display = "none";
  var exitLayout = document.getElementById("overlay");
  exitLayout.style.display = "none";
}

function buttonSignInClick() {
  var checking = true;
  var form = document.getElementsByClassName("popup-container")[0];
  var overlay = document.getElementById("overlay");
  if (checking == true) {
    form.style.display = "block";
    overlay.style.display = "block";
    document.getElementById('btn-1').click();
    checking = false;
  } else {
    form.style.display = "none";
    overlay.style.display = "none";
  }
}

function buttonSignUpClick() {
  var checking = true;
  var overlay = document.getElementById("overlay");
  var form = document.getElementsByClassName("popup-container")[0];
  if (checking == true) {
    form.style.display = "block";
    overlay.style.display = "block";
    document.getElementById('btn-2').click();
    checking = false;
  } else {
    form.style.display = "none";
    overlay.style.display = "none";
  }
}

function introButton() {
  var intro = document.getElementsByClassName("second-popup")[0];
  var overlay = document.getElementById("overlay");
  var checking = true;
  if (checking == true) {
    intro.style.display = "block";
    intro.style.display = "flex";
    overlay.style.display = "block";
    checking = false;
  } else {
    intro.style.display = "none";
    overlay.style.display = "none";
  }
}

function exitTabLayout(tab1, tab2) {
  var exit1 = document.getElementsByClassName(tab1)[0];
  var exit2 = document.getElementsByClassName(tab2)[0];
  var exitLayout = document.getElementById("overlay");
  if (exit1.style.display == "block") {
    exit1.style.display = "none";
    exitLayout.style.display = "none";
  } else {
    exit2.style.display = "none";
    exitLayout.style.display = "none";
  }
}


function pausePlay() {
  var video = document.getElementById("myVideo");
  var activated = document.getElementById("btn-play");
  if (video.paused) {
    video.play();
    activated.classList.remove("active");
  } else {
    video.pause();
    activated.classList.add("active");
  }
}

function muteOrNot() {
  var video = document.getElementById("myVideo");
  var activated = document.getElementById("btn-sound");
  if (video.muted) {
    video.muted = false;
    activated.classList.add("active");
  } else {
    video.muted = true;
    activated.classList.remove("active");
  }
}

// checking make clear function
var checking = false;

function makeClear() {
  // console.log("click")
  var layer = document.getElementsByClassName("blur-layer")[0];
  var makeClear = document.getElementById("btn-clear");
  checking = !checking;
  if (checking == true) {
    makeClear.classList.add("active");
    layer.style.display = "none";
  }
  else {
    makeClear.classList.remove("active");
    layer.style.display = "block";
  }

}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateSignupForm() {
  checkSignupEmail();
  checkSignupName();
  checkSignupPass();
  return checkSignupEmail() && checkSignupName() && checkSignupPass();
}


function checkSignupEmail() {
  const emailSignup = document.getElementById('emailSignup');
  const emailErr = document.getElementById('signupEmailError');
  if (emailSignup.value.trim() === '') {
    setErr(emailErr, 'Please enter your email');
    return false;
  }
  if (!isValidEmail(emailSignup.value.trim())) {
    setErr(emailErr, 'Please enter a valid email');
    return false;
  }
  emailErr.style.display = 'none';
  return true;
}

function checkSignupName() {
  const nameSignup = document.getElementById('nameSignup');
  const nameErr = document.getElementById('signupNameError');
  if (nameSignup.value.trim() === '') {
    setErr(nameErr, 'Please enter your username');
    return false;
  }
  if (nameSignup.value.length < 4) {
    setErr(nameErr, 'Please enter at least 4 characters for your username');
    return false;
  }
  nameErr.style.display = 'none';
  return true;
}

function checkSignupPass() {
  const passSignup = document.getElementById('passSignup');
  const passErr = document.getElementById('signupPassError');
  if (passSignup.value.trim() === '') {
    setErr(passErr, 'Please enter your password');
    return false;
  }
  if (passSignup.value.length < 6) {
    setErr(passErr, 'Please enter at least 6 chacracters for your password');
    return false
  }
  passErr.style.display = 'none';
  return true;
}

function setErr(element, note) {
  element.innerHTML = '';
  element.textContent = note;
  element.style.display = 'block';
}

function validateSigninForm() {
  checkSigninEmail();
  checkSigninPass();
  return checkSigninEmail() && checkSigninPass();
}

function checkSigninEmail() {
  const emailSignin = document.getElementById('emailSignin');
  const emailErr = document.getElementById('signinEmailError');
  if (emailSignin.value.trim() === '') {
    setErr(emailErr, 'Please enter your email');
    return false;
  }
  if (!isValidEmail(emailSignin.value.trim())) {
    setErr(emailErr, 'Please enter a valid email');
    return false;
  }
  emailErr.style.display = 'none';
  return true;
}

function checkSigninPass() {
  const passSignin = document.getElementById('passSignin');
  const passErr = document.getElementById('signinPassError');
  if (passSignin.value.trim() === '') {
    setErr(passErr, 'Please enter your password');
    return false;
  }
  passErr.style.display = 'none';
  return true;
}



const submitSignup = document.getElementById('signupForm');
const submitSignin = document.getElementById('signinForm');
submitSignin.addEventListener('submit', (event) => {
  event.preventDefault();
  if (validateSigninForm()) {
    var emailErr = document.getElementById('signinEmailError');
    var accountStorage = JSON.parse(localStorage.getItem('accountStorage')) || [];
    var emailSignin = document.getElementById('emailSignin').value;
    var passSignin = document.getElementById('passSignin').value;
    var checkingEmail = accountStorage.find(account => account.email === emailSignin);
    var checkingPass = accountStorage.find(account => account.password === passSignin);
    console.log(passSignin, checkingPass);
    if (checkingEmail === undefined) {
      setErr(emailErr, 'This email is new to us, please sign up first');
    } else {
      if (checkingPass === undefined) {
        setErr(emailErr, 'Wrong password or email, please try again');
      } else {

        auth.signInWithEmailAndPassword(emailSignin, passSignin)
          .then(() => {
            // Declare user variable
            var user = auth.currentUser;

            // Add this user to Firebase Database
            var database_ref = database.ref();

            // Create User data
            var user_data = {
              last_login: Date.now()
            };

            // Push to Firebase Database
            database_ref.child('users/' + user.uid).update(user_data);

            // DOne
            alert('User Logged In!!!');

            setTimeout(() => {
              window.location.replace('public/view/wiki/wiki.html');
            }, 1000);

          })
          .catch((error) => {
            // Firebase will use this to alert of its errors
            var error_message = error.message;

            alert(error_message);
          })
      }
    }
  }
});

submitSignup.addEventListener('submit', (event) => {
  event.preventDefault();
  if (validateSignupForm()) {
    var accountStorage = JSON.parse(localStorage.getItem('accountStorage')) || [];
    var checking = accountStorage.find(account => account.email === emailSignup.value);
    if (checking) {
      var emailErr = document.getElementById('signupEmailError');
      emailErr.style.display = 'block';
      emailErr.textContent = 'This email is already registered';
    } else {
      var emailA = emailSignup.value;
      var nameA = nameSignup.value;
      var passA = passSignup.value;
      var account = {
        username: nameA,
        email: emailA,
        password: passA,
        last_login: Date.now()
      };
      accountStorage.push(account);
      localStorage.setItem('accountStorage', JSON.stringify(accountStorage));

      auth.createUserWithEmailAndPassword(emailA, passA)
        .then(() => {
          // Declare user variable
          var user = auth.currentUser;

          // Add this user to Firebase Database
          var database_ref = database.ref();

          // Push to Firebase Database
          database_ref.child('users/' + user.uid).set(account);

          // DOne
          alert('User Created!!!');

          setTimeout(() => {
            window.location.replace('public/view/wiki/wiki.html');
          }, 1000);
        })
        .catch((error) => {
          // Firebase will use this to alert of its errors
          var error_message = error.message;

          alert(error_message);
        })
    }
  }
});
