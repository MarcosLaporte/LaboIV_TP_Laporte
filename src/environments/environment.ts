import Swal from "sweetalert2";

export const environment = {
  firebase: {
    projectId: 'sala-de-juegos-111655',
    appId: '1:921460635953:web:7e465e792d7aab6d521810',
    storageBucket: 'sala-de-juegos-111655.appspot.com',
    apiKey: 'AIzaSyAIREoSZruRzjpvz0-JN-UW1zHyr9xIH5A',
    authDomain: 'sala-de-juegos-111655.firebaseapp.com',
    messagingSenderId: '921460635953',
  },
};

export const Toast = Swal.mixin({
	toast: true,
	position: 'top-right',
	iconColor: 'white',
	showConfirmButton: false,
	timer: 1500,
});

export const Loader = Swal.mixin({
	allowEscapeKey: false,
	allowOutsideClick: false,
	didOpen: () => {
		Swal.showLoading();
	}
});