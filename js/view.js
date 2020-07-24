const view = {}
view.setActiveScreen = (screenName) =>{
    switch (screenName){
        case 'registerScreen':
            document.getElementById('app').innerHTML = components.registerScreen
            const registerForm = document.getElementById('form-register')
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault()
                const registerInfo = {
                firstName: registerForm.firstName.value,    
                lastName: registerForm.lastName.value,
                 email: registerForm.email.value,
                password: registerForm.password.value,
                confirmPassword: registerForm.confirmPassword.value,
                }
                controller.register(registerInfo)
            })
            const switchScreen = document.getElementById('redirect-to-login')
            switchScreen.addEventListener('click', (e) => {
                e.preventDefault()
                view.setActiveScreen('loginScreen')
            })


            break
        case 'loginScreen':
            document.getElementById('app').innerHTML = components.loginScreen
            const switchScreen1 = document.getElementById('redirect-to-register')
            switchScreen1.addEventListener('click', (e) => {
                e.preventDefault()
                view.setActiveScreen('registerScreen')
            })
        
            const loginForm = document.getElementById('form-login')
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault()
                const loginInfo = {
                email: loginForm.email.value,
                password: loginForm.password.value,
                }
                controller.login(loginInfo)
            })
        
            break
        case 'menuScreen':
            document.getElementById('app').innerHTML = components.menuScreen 
            const switchscreen2 = document.getElementById('redirect-to-game')
            switchscreen2.addEventListener('click',(e)=>{
                e.preventDefault()
                view.setActiveScreen('gameScreen')
            })


        }
}
view.setErrorMessage = (elementId, message) => {
    document.getElementById(elementId).innerText = message
  }
  