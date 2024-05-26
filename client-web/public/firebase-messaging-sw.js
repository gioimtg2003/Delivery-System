// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.9.0/firebase-analytics.js');
importScripts('https://www.gstatic.com/firebasejs/8.9.0/firebase-messaging.js')


if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../firebase-messaging-sw.js')
        .then(function (registration) {
            console.log('Registration successful, scope is:', registration.scope);
        }).catch(function (err) {
            console.log('Service worker registration failed, error:', err);
        });
}

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
    appId: "1:523912884056:web:22510ba960596dbbf6bf2d",
    measurementId: "G-FC58H58JT2",
};

// phần firebaseConfig tương tự như ở trên nhé

firebase.initializeApp(firebaseConfig);

const message = firebase.messaging()
