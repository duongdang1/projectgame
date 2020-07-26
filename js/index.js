window.onload = () => {
    
    var firebaseConfig = {
      apiKey: "AIzaSyC1JmYlOZYOoBuo_hxPkBzzeEO-03FBbBE",
      authDomain: "fir-4b212.firebaseapp.com",
      databaseURL: "https://fir-4b212.firebaseio.com",
      projectId: "fir-4b212",
      storageBucket: "fir-4b212.appspot.com",
      messagingSenderId: "139664618809",
      appId: "1:139664618809:web:cc90ecbb3b34b5316964e8",
      measurementId: "G-6WTC57Y8QT"
      };
     
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig)
    //templateQueryDatabase()
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user)
      if (user) {
        if (user.emailVerified) {
          model.currentUser = {
            displayName: user.displayName,
            email: user.email
          }
          view.setActiveScreen('menuScreen')
        } else {
          view.setActiveScreen('loginScreen')
          alert('Please verify your email')
        }
      } else {
        view.setActiveScreen('loginScreen')
      }
    })
  
  }
  
  function checkAuth() {
    firebase.auth().onAuthStateChanged(function (user) {
      console.log(user)
  
      model.currentUser = {
  
        displayName: user.displayName,
        email: user.email
      }
      if (user) {
  
        view.setActiveScreen('menuScreen')
  
      } else {
        // No user is signed in
        view.setActiveScreen('loginScreen')
      }
    })
  }