var $ = require('jQuery');
var keyConverter = require('./keyConverter.js')
var conf = require('./readConf.js')

var key1 = false
var key2 = false
var key3 = false
var newKeys = [-1,-1,-1]

conf.getName(function(x){
	$('#name').val(x)
})

conf.getFolder(function(x){
	$('#path').val(x)
})

conf.getKeys(function(x){
	arr = x.split('+')
	$('#btnkey1').html(arr[0])
	$('#btnkey2').html(arr[1])
	if(arr.length==3){
		$('#btnkey3').html(arr[2])
	}
})

$( '.folder' ).each( function()
	{
		var $input	 = $( this ),
			$label	 = $input.next( 'label' ),
			labelVal = $label.html();

		$input.on( 'change', function( e )
		{
			$('#path').val(e.target.files[0].path)
		});
});

$('#confirm').click(function(){
	conf.setName($('#name').val(),()=>{
		conf.setFolder($('#path').val(),()=>{

			conf.setKeys('',()=>{})
		});
	})
})

$('input[type=radio][name=radioKey]').change(function(e) {
		if(this.id=='key2'){
			$('#btnkey3').prop('disabled',true)
		}else if(this.id=='key3'){
			$('#btnkey3').prop('disabled',false)
		}
});


$('#btnkey1').click(function(){
	key1 = true
	$('#btnkey1').addClass('btn-info')
	$('#name').prop('disabled',true)
	$('#file').prop('disabled',true)

})

$('#btnkey2').click(function(){
	key2 = true
	$('#btnkey2').addClass('btn-info')
	$('#name').prop('disabled',true)
	$('#file').prop('disabled',true)

})

$('#btnkey3').click(function(){
	key3 = true
	$('#btnkey3').addClass('btn-info')
	$('#name').prop('disabled',true)
	$('#file').prop('disabled',true)

})


$('body').keydown(function(e){
	if (key1==true){
		newKeys[0] = keyConverter.convertKey(e.keyCode)
		$('#btnkey1').html(keyConverter.convertKey(e.keyCode))
		$('#btnkey1').removeClass('btn-info')
		key1=false
	}

	if (key2==true){
		newKeys[1] = keyConverter.convertKey(e.keyCode)
		$('#btnkey2').html(keyConverter.convertKey(e.keyCode))
		$('#btnkey2').removeClass('btn-info')
		key2=false
	}

	if (key3==true){
		newKeys[2] = keyConverter.convertKey(e.keyCode)
		$('#btnkey3').html(keyConverter.convertKey(e.keyCode))
		$('#btnkey3').removeClass('btn-info')
		key3=false
	}
	$('#name').prop('disabled',false)
	$('#file').prop('disabled',false)
});
