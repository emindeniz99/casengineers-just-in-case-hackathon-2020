import firebase from "firebase"
firebase.initializeApp({
	apiKey: "AIzaSyBXoBN0ATY_qG_4hUvdEBQCi46DW0abc-s",
	authDomain: "casengineers-ade78.firebaseapp.com",
	databaseURL: "https://casengineers-ade78.firebaseio.com",
	projectId: "casengineers-ade78",
	storageBucket: "casengineers-ade78.appspot.com",
	messagingSenderId: "159358811078",
	appId: "1:159358811078:web:b901b9bc97ed67543890c7",
	measurementId: "G-18W0R950PP",
})
var firestore = firebase.firestore()
var storage = firebase.storage()
export { firestore }

export { storage }
