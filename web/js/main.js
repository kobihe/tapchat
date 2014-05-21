// Code to load app page
(function (App) {
	try {
		App.restore();
	} catch (err) {
		App.load('home');
	}
})(App);

$(function () {
	// Do stuff when the "Send" button is clicked
	$('#button-send').click(function () {
		var message = $('#input-message').val();
		// Shows dialog if you are not on Kik browser
		if (!kik.send) {
			App.dialog({
        title        : 'Install Kik' ,
        text         : 'This is a feature of Kik Messenger. Install it to send messages.' ,
        okButton     : 'Install' ,
        cancelButton : 'Cancel'
      }, function (status) {
        if (status) {
          var os = kik.utils.os;
          if (os.ios) {
            window.location.href = 'itms-apps://itunes.apple.com/app/kik-messenger/id357218860';
          } else if (os.android) {
            window.location.href = 'market://details?id=kik.android';
          } else {
            window.location.href = 'http://kik.com';
          }
        }
      });
      return;
		}
		// Send message to friends
		kik.send({
			title: 'Incoming Message!',
			text: 'This will self-destruct 3 seconds after opening.',
			data: {'text': message}
		});
	});
	// Do stuff if a Kik message is received
	if (kik.message) {
		// Show received message for 3 seconds
		$('#message').show();
		$('#message .message-text').text(kik.message.text);
		setTimeout(function () {
			$('#message').hide();
		}, 3000);
	}
});
