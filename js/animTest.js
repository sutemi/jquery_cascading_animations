//----------------------------------------------
//----------------------------------------------

$(function() { // document ready

	/*
	*	fadeIn (default)
	*	slideDownFadeIn | slideUpFadeIn | slideRightFadeIn | slideLeftFadeIn
	*	scaleUpFadeIn | scaleDownFadeIn
	*	cardFlipYFadeIn1 | cardFlipYFadeIn2 | cardFlipXFadeIn1 | cardFlipXFadeIn2
	*	cardFlip3
	*/
	
	
	/* 
		Create plugin instances with
		custom default override settings
		NOTE: Don't forget commas between key/value
		pairs if overriding default settings
	*/ 
//	var test	= $('.test').bcuxAnimCascade({}).data('plugin_bcuxAnimCascade');
//	var cin		= $('.cascade-in').bcuxAnimCascade({}).data('plugin_bcuxAnimCascade');
//	var cx		= $('.cascadex').bcuxAnimCascade({}).data('plugin_bcuxAnimCascade');
	
	var test	= $('.test').bcuxAnimCascade({
		anim: 'slideUpFadeIn',
//		time: 1000,
//		delay: 1000
//		easing: 'ease-in-out'
		random: true
//		reverse: true
	}).data('plugin_bcuxAnimCascade');
	
	var cin		= $('.cascade-in').bcuxAnimCascade({
//		anim: 'cardFlipYFadeIn1',
//		time: 300
//		delay: 80
//		easing: 'ease-in-out'
		random: true
//		reverse: true
	}).data('plugin_bcuxAnimCascade');
	
	var cx		= $('.cascadex').bcuxAnimCascade({
		anim: 'cardFlip3'
//		time: 300
//		delay: 70
//		easing: 'ease-in-out'
//		random: true
//		reverse: true
	}).data('plugin_bcuxAnimCascade');
	
	
	/*
		Assign button actions using public methods:
		reset() – transitions out elements
		play() – transition in elements
	*/
	
	// reset() by group
	$('#btn-reset-1').click(function() {
		test.reset();
	});
	
	$('#btn-reset-2').click(function() {
		cin.reset();
	});
	
	$('#btn-reset-3').click(function() {
		cx.reset();
	});
	
	// play() by group
	$('#btn-play-1').click(function() {
		test.play();
	});
	
	$('#btn-play-2').click(function() {
		cin.play();
	});
	
	$('#btn-play-3').click(function() {
		cx.play();
	});
	
	
	// reset() all
	$('#btn-reset').click(function() {
		test.reset();
		cin.reset();
		cx.reset();
	});	
	
	
	// play() all
	$('#btn-play').click(function() {
		test.play();
		cin.play();
		cx.play();
	});



}); // ./document-ready