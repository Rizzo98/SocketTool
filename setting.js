var $ = require('jQuery');

$( '.folder' ).each( function()
	{
		var $input	 = $( this ),
			$label	 = $input.next( 'label' ),
			labelVal = $label.html();

		$input.on( 'change', function( e )
		{
      console.log(e.target.files[0].path)
			$('#path').val(e.target.files[0].path)

		});
});
