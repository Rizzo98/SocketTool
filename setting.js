var $ = require('jQuery');
var keyConverter = require('./keyConverter.js')
var conf = require('./readConf.js')

var key1 = false
var key2 = false
var key3 = false
var newKeys = []
var keysNumber;

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
	newKeys.push(arr[0])
	newKeys.push(arr[1])
	$("#key2").prop("checked", true)
	keysNumber = 2
	if(arr.length==3){
		$('#btnkey3').html(arr[2])
		newKeys.push(arr[2])
		$("#key3").prop("checked", true)
		$('#btnkey3').prop('disabled',false)
		keysNumber = 3
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
			var s =newKeys[0];
			for (i = 1; i < newKeys.length; i++) {
					s += '+' + newKeys[i];
			}
			conf.setKeys(s,()=>{})
		});
	})
})

$('input[type=radio][name=radioKey]').change(function(e) {
		if(this.id=='key2'){
			$('#btnkey3').prop('disabled',true)
			newKeys.pop()
			keysNumber = 2
		}else if(this.id=='key3'){
			newKeys.push(null)
			keysNumber = 3
			$('#btnkey3').prop('disabled',false)
			$('#btnkey3').trigger('click')
		}
});


$('#btnkey1').click(function(){
	key1 = true
	$('#btnkey1').addClass('btn-info')
	$('#name').prop('disabled',true)
	$('#file').prop('disabled',true)
	$('#confirm').prop('disabled',true)
	$('#btnkey2').prop('disabled',true)
	$('#btnkey3').prop('disabled',true)

})

$('#btnkey2').click(function(){
	key2 = true
	$('#btnkey2').addClass('btn-info')
	$('#name').prop('disabled',true)
	$('#file').prop('disabled',true)
	$('#confirm').prop('disabled',true)
	$('#btnkey1').prop('disabled',true)
	$('#btnkey3').prop('disabled',true)

})

$('#btnkey3').click(function(){
	key3 = true
	$('#btnkey3').addClass('btn-info')
	$('#name').prop('disabled',true)
	$('#file').prop('disabled',true)
	$('#confirm').prop('disabled',true)
	$('#btnkey2').prop('disabled',true)
	$('#btnkey1').prop('disabled',true)

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
	$('#confirm').prop('disabled',false)
	$('#btnkey1').prop('disabled',false)
	$('#btnkey2').prop('disabled',false)
	if(keysNumber==3)
		$('#btnkey3').prop('disabled',false)
});
