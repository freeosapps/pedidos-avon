var ReconhecimentoDeVoz = {
  iniciar: function() {
    navigator.getUserMedia({
      audio: true,
    }, function(stream) {
alert('foi');
      var recognition = new SpeechRecognition();

      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.lang = "en";
      recognition.start();

      recognition.onresult = function(event) {
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                document.write(event.results[i][0].transcript);
            }
        }
        //recognition.stop();
      };

      recognition.onerror = function(e) {
        recognition.stop();
      }

    }, function(e) {
      alert(e.name + ' ' + e.message + ' ' + e.constraintName);
      console.log(e);
        // Aw. No permission (or no microphone available).
    });

  }
}
