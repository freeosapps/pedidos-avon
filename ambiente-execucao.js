/*
Dependências:
- jQuery
- FontAwesome
*/

var AmbienteDeExecucao = {
  possivelExecutar: function() {
    return (/Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor));
  },
  exibirMensagemDeErro: function(elemento) {
    var icon = $('<i>');
    icon.addClass('fa');
    icon.addClass('fa-exclamation-circle');
    icon.addClass('fa-4x');
    icon.css({
      'zIndex': 1,
      'display': 'block',
      'marginBottom': 10
    });

    var anchor = $('<a href="intent://' + window.location.href.replace(window.location.protocol, '') + '#Intent;scheme=http;package=com.android.chrome;end">');
    anchor.text('Abrir no Google Chrome');
    anchor.css({
      'display': 'inline-block',
      'color': 'lightskyblue',
      'marginTop': '20px',
      'font-size': '120%'
    });

    var divA = $('<div>');
    divA.css({
      'width': '100vw',
      'height': 150,
      'marginTop': -75,
      'position': 'absolute',
      'top': '50%',
      'left': 0,
      'font-weight': 'bold',
      'font-family': 'sans-serif',
      'backgroundColor': 'transparent',
      'color': 'coral'
    });
    divA.text('Não é possível abrir o aplicativo aqui.');
    divA.append('<br>');
    divA.append(anchor);

    var divB = $('<div>');
    divB.css({
      'width': '100vw',
      'height': '100vh',
      'position': 'absolute',
      'textAlign': 'center',
      'top': 0,
      'left': 0,
      'backgroundColor': 'darkred'
    });

    $(divA).prepend(icon);
    $(divB).append(divA);
    $(elemento).append(divB);
  }
}
