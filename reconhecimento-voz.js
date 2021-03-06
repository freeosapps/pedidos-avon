var ReconhecimentoDeVoz = {
  iniciar: function(campo) {
    navigator.getUserMedia({
      audio: true,
    }, function(stream) {
      var recognition = new webkitSpeechRecognition();

      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.lang = "pt-BR";
      recognition.start();

      recognition.onresult = function(event) {
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                $(campo).val($(campo).val() + (event.results[i][0].transcript));
                recognition.stop();
            } else {
                $(campo).val($(campo).val() + (event.results[i][0].transcript));
            }
        }
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
