// Your web app's Firebase configuration

        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        var firebaseConfig = {
                apiKey: "AIzaSyCNbNqoE1n8D7KHRqaZwn61nNu6nmhd2Ko",
                authDomain: "good-bye-birds.firebaseapp.com",
                projectId: "good-bye-birds",
                storageBucket: "good-bye-birds.appspot.com",
                messagingSenderId: "74490965349",
                appId: "1:74490965349:web:d4cfe7a10223695900458c",
                measurementId: "G-45LZVDE4YT"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        firebase.analytics();
      
      // Refernece contactInfo collections
      let contactInfo = firebase.database().ref("infos");
      
      // Listen for a submit
      document.querySelector(".ContactForm").addEventListener("submit", submitForm);
      
      function submitForm(e) {
        e.preventDefault();
      
        //   Get input Values
        let name = document.querySelector(".FullName").value;
        let phone = document.querySelector(".phone").value;
        let email = document.querySelector(".email").value;
        let message = document.querySelector(".message").value;
        console.log(name, phone, email, message);
      
        saveContactInfo(name, phone, email, message);
      
        document.querySelector(".ContactForm").reset();
        SendEmail(name, phone, email, message);
      }
      
      // Save infos to Firebase
      function saveContactInfo(name, phone, email, message) {
        let newContactInfo = contactInfo.push();
      
        newContactInfo.set({
          name: name,
          phone: phone,
          email: email,
          message: message,
        });

        retrieveInfos();
      }

      //Retrieve Infos
      function retrieveInfo(){
        let ref =firebase.database().ref("infos");
        ref.on("value", gtData);
      }

      function gotData(data){
        let info = data.val();
        let keys = object.keys(info);

        for(let i= 0; i<keys.length; i++){
          let infoData = keys[i];
          let name = info[infoData].name;
          let phone = info[infoData].phone;
          let email = info[infoData].email;
          let message = info[infoData].message;
          console.log(name, phone, email, message);

          let infoResults = document.querySelector(".infoResults");

          infosResults.innerHTML += `<div>
          <p><strong>Name: </strong>${name}<br/>
          <strong>phone: </strong>${phone}<br/>
          <a><strong>Email: </strong>${email}</a><br/>
          <a><strong>Name: </strong>${name}</a>
          </p>
          </div>`;
        }
      }

      retrieveInfos();

      function SendEmail(name, phone, email, message){
         Email.send({
           Host: "smtp.gmail.com",
           Username: 'bhavya.thakkar01@gmail.com',
           Password: "qeufiiznxkhmnnpa",
           To: 'bhavya.thakkar01@gmail.com',
           Form: 'bhavya.thakkar01@gmail.com',
           Subject: `${name} Sent You a message form website`,
           Body: `Name: ${name} <br/> Phone: ${phone} <br/> Email: ${email} <br/> Message: ${message}`,
         }).then((message) => alert("Mail Sent Successfully"))
      }
