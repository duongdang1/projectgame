const model = {}
model.currentUser = undefined
model.collectionName = 'rooms'
model.currentConversation = undefined
model.listRoom = []
model.currentRoom = undefined
model.rooms = undefined
model.register = (firstName, lastName, email, password) => {
    firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
        console.log(user)
        firebase.auth().currentUser.sendEmailVerification()
        firebase.auth().currentUser.updateProfile({
            displayName: firstName + '' + lastName
        })
        alert('register success, please check your email!')
        view.setActiveScreen('loginScreen')

    }).catch((err) => {
        alert(err.message)
        console.log(err)
    })
}

model.login = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
        console.log(user)
        // if (user.user.emailVerified) {
        //     model.currentUser = {
        //         displayName: user.user.displayName,
        //         email: user.user.email
        //     }
        //     view.setActiveScreen('welcomeScreen')
        // } else {
        //     alert('Please verify your email!')
        // }


    }).catch((err) => {
        alert(err.message)
        console.log(err)
    })
}
model.createNewGame = (room) =>{
    firebase.firestore().collection(model.collectionName).add(room)
}

model.listenRoomChange = () =>{
   let isFistRun = false
    firebase.firestore().collection(model.collectionName).onSnapshot((res)=>{
        // if(!isFistRun) {
        //     isFistRun = true
        //     return
        //   }
          const docChanges = res.docChanges()
          
          for(oneChange of docChanges) {
            const type = oneChange.type
            const oneChangeData = utils.getDataFromDoc(oneChange.doc)
            if(type === 'added') {
              model.listRoom.push(oneChangeData)
              view.createNewGame(oneChangeData)
              
            }
        }
    
    })
}

model.listenGameChange=(id)=>{
    let isFistRun = false
    firebase.firestore().collection(model.collectionName).doc(id).onSnapshot((res)=>{
        console.log(res)
    const docChange = utils.getDataFromDoc(res)
    console.log(docChange)
    })
    if(!isFistRun){
        isFistRun = true
        return
      }
    

}
model.addUser = (email) =>{
    const dataToUpdate = {
        users: firebase.firestore.FieldValue.arrayUnion(email)
    }
    firebase.firestore().collection(model.collectionName).doc(model.currentRoom.id).update(dataToUpdate)
}
model.addlocation = (location) =>{
    const dataToUpdate = {
        locations: firebase.firestore.FieldValue.arrayUnion(location)
    }
    firebase.firestore().collection(model.collectionName).doc(model.currentRoom.id).update(dataToUpdate)
}
// model.loadconversations=()=>{
//     firebase.firestore().collection(model.collectionName).where('users','array-contains', model.currentUser.email).get().then(res=>{
//       const data = utils.getDataFromDocs(res.docs)
//       model.conversations = data
//       if(data.length >0){
//         model.currentConversation = data[0]
//         view.showCurrentConversation()
//       }
//       view.showConversation()
//       // console.log(data)
//     })
//   }