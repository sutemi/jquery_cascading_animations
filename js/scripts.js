

//----------------------------------------------
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
	
	var test	= $('.test').bcuxAnimCascade({
//		anim: 'slideDownFadeIn'
//		time: 300
//		delay: 70
//		easing: 'ease-in-out'
//		random: true
//		reverse: true
	}).data('plugin_bcuxAnimCascade');
	
	var cin		= $('.cascade-in').bcuxAnimCascade({
//		anim: 'slideRightFadeIn'
//		time: 300
//		delay: 80
//		easing: 'ease-in-out'
//		random: true
//		reverse: true
	}).data('plugin_bcuxAnimCascade');
	
	var cx		= $('.cascadex').bcuxAnimCascade({
//		anim: 'slideRightFadeIn'
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

//----------------------------------------------

// ---------------------------------––––
// ---------- bcuxAnimCascade ----------
/* ---------------------------------––––
*	Plugin for creating a cascading animation
*	for a collection of elements that use	
*	standard CSS animations
*
*	fadeIn (default)
*	slideDownFadeIn | slideUpFadeIn | slideRightFadeIn | slideLeftFadeIn
*	scaleUpFadeIn | scaleDownFadeIn
*	cardFlipYFadeIn1 | cardFlipYFadeIn2 | cardFlipXFadeIn1 | cardFlipXFadeIn2
*	cardFlip3
*
*------------------------ */

/*
    The semi-colon before the function invocation is a safety net against
    concatenated scripts and/or other plugins which may not be closed properly.

    "undefined" is used because the undefined global variable in ECMAScript 3
    is mutable (ie. it can be changed by someone else). Because we don't pass a
    value to undefined when the anonymyous function is invoked, we ensure that
    undefined is truly undefined. Note, in ECMAScript 5 undefined can no
    longer be modified.

    "window" and "document" are passed as local variables rather than global.
    This (slightly) quickens the resolution process.
*/
;(function ( $, window, document, undefined ) {
    /*
        Store the name of the plugin in the "pluginName" variable. This
        variable is used in the "Plugin" constructor below, as well as the
        plugin wrapper to construct the key for the "$.data" method.

        More: http://api.jquery.com/jquery.data/
    */
    var pluginName = 'bcuxAnimCascade';

    /*
        The "Plugin" constructor, builds a new instance of the plugin for the
        DOM node(s) that the plugin is called on. For example,
        "$('h1').pluginName();" creates a new instance of pluginName for
        all h1's.
    */
    // Create the plugin constructor
    function Plugin ( element, options, index, selector ) {
        /*
            Provide local access to the DOM node(s) that called the plugin,
            as well local access to the plugin name and default options.
        */
        this.element = element;
		this.selector = selector;
        this._name = pluginName;
        this._defaults = $.fn.bcuxAnimCascade.defaults;
        /*
            The "$.extend" method merges the contents of two or more objects,
            and stores the result in the first object. The first object is
            empty so that we don't alter the default options for future
            instances of the plugin.

            More: http://api.jquery.com/jquery.extend/
        */
        this.options = $.extend( {}, this._defaults, options );
		this.index	= index;
		console.log('\n\n\tindex: ' + this.index);
		console.log('\t..................................');
        /*
            The "init" method is the starting point for all plugin logic.
            Calling the init method here in the "Plugin" constructor function
            allows us to store all methods (including the init method) in the
            plugin's prototype. Storing methods required by the plugin in its
            prototype lowers the memory footprint, as each instance of the
            plugin does not need to duplicate all of the same methods. Rather,
            each instance can inherit the methods from the constructor
            function's prototype.
        */
        this.init();
    }

    // Avoid Plugin.prototype conflicts
    $.extend(Plugin.prototype, {

        // Initialization logic
        init: function () {
			
			console.log('\t\t– prototype init');
			
            /*
                Create additional methods below and call them via
                "this.myFunction(arg1, arg2)", ie: "this.buildCache();".

                Note, you can cccess the DOM node(s), plugin name, default
                plugin options and custom plugin options for a each instance
                of the plugin by using the variables "this.element",
                "this._name", "this._defaults" and "this.options" created in
                the "Plugin" constructor function (as shown in the buildCache
                method below).
            */
			
            this.buildCache();
            this.bindEvents();
			this._createCSSRules();
			this._setDelayTime();
			this._assignCSSRules();
			this._createPerspective();
			

			

        },

        // Remove plugin instance completely
        destroy: function() {
            /*
                The destroy method unbinds all events for the specific instance
                of the plugin, then removes all plugin data that was stored in
                the plugin instance using jQuery's .removeData method.

                Since we store data for each instance of the plugin in its
                instantiating element using the $.data method (as explained
                in the plugin wrapper below), we can call methods directly on
                the instance outside of the plugin initalization, ie:
                $('selector').data('plugin_myPluginName').someOtherFunction();

                Consequently, the destroy method can be called using:
                $('selector').data('plugin_myPluginName').destroy();
            */
            this.unbindEvents();
            this.$element.removeData();
        },

        // Cache DOM nodes for performance
        buildCache: function () {
            /*
                Create variable(s) that can be accessed by other plugin
                functions. For example, "this.$element = $(this.element);"
                will cache a jQuery reference to the element that initialized
                the plugin. Cached variables can then be used in other methods. 
            */
            this.$element	= $(this.element);
			this.$selector	= this.selector;
			this.$options	= this.options;
			this.$index		= this.index;
			this.$myTransition				= 'transition';
			this.$myPerspective				= 'perspective';
			this.$transitionProperty		= 'all';
			this.$transitionDuration		= this.$options.time + 'ms';
			this.$transitionTimingFunction	= this.$options.easing;
			this.$delayVal			= 0;
			this.$perspectiveVal	= '1000px';
			this.$myPlayClass		= '';
			this.$myInitClass		= '';
        },

        // Bind events that trigger methods
        bindEvents: function() {
            var plugin = this;
            
            /*
                Bind event(s) to handlers that trigger other functions, ie:
                "plugin.$element.on('click', function() {});". Note the use of
                the cached variable we created in the buildCache method.

                All events are namespaced, ie:
                ".on('click'+'.'+this._name', function() {});".
                This allows us to unbind plugin-specific events using the
                unbindEvents method below.
            */
//            plugin.$element.on('click'+'.'+plugin._name, function() {
//                /*
//                    Use the "call" method so that inside of the method being
//                    called, ie: "someOtherFunction", the "this" keyword refers
//                    to the plugin instance, not the event handler.
//
//                    More: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call
//                */
//				console.log('clicked');
//                plugin.someMethod.call(plugin);
//            });

        },

        // Unbind events that trigger methods
        unbindEvents: function() {
            /*
                Unbind all events in our plugin's namespace that are attached
                to "this.$element".
            */
            this.$element.off('.'+this._name);
        },

        /*
            "someOtherFunction" is an example of a custom method in your
            plugin. Each method should perform a specific task. For example,
            the buildCache method exists only to create variables for other
            methods to access. The bindEvents method exists only to bind events
            to event handlers that trigger other methods. Creating custom
            plugin methods this way is less confusing (separation of concerns)
            and makes your code easier to test.
        */
        // Custom methods
		
		/*
			Create CSS animation rules once
			to be used by all plugin instances
		*/
		_createCSSRules: function() {
//			console.log('building styles...');
			if ( !$('#bcux-anim-styles').length) {
//				console.log('...creating');
				return $("<style>")
					.attr("id", "bcux-anim-styles")
					.prop("type", "text/css")
					.html("	.fadein-init { opacity: 0; }\n\
							.fadein-play { opacity: 1; }\n\
							.slidedownfadein-init { opacity: 0; transform : translateY( -150% ); }\n\
							.slidedownfadein-play { opacity: 1; transform : translateY( 0 ); }\n\
							.slideupfadein-init { opacity: 0; transform : translateY( 150% ); }\n\
							.slideupfadein-play { opacity: 1; transform : translateY( 0 ); }\n\
							.sliderightfadein-init { opacity: 0; transform : translateX( -150% ); }\n\
							.sliderightfadein-play { opacity: 1; transform : translateX( 0 ); }\n\
							.slideleftfadein-init { opacity: 0; transform : translateX( 150% ); }\n\
							.slideleftfadein-play { opacity: 1; transform : translateX( 0 ); }\n\
							.scaleupfadein-init { opacity: 0; transform : scale( 0 ); }\n\
							.scaleupfadein-play { opacity: 1; transform : scale( 1 ); }\n\
							.scaledownfadein-init { opacity: 0; transform : scale( 1.25 ); }\n\
							.scaledownfadein-play { opacity: 1; transform : scale( 1 ); }\n\
							.cardflipy1-init { opacity: 0; transform : rotateY( 90deg ); }\n\
							.cardflipy1-play { opacity: 1; transform : rotateY( 0deg ); }\n\
							.cardflipy2-init { opacity: 0; transform : rotateY( -90deg ); }\n\
							.cardflipy2-play { opacity: 1; transform : rotateY( 0deg ); }\n\
							.cardflipx1-init { opacity: 0; transform : rotateX( 90deg ); }\n\
							.cardflipx1-play { opacity: 1; transform : rotateX( 0deg ); }\n\
							.cardflipx2-init { opacity: 0; transform : rotateX( -90deg ); }\n\
							.cardflipx2-play { opacity: 1; transform : rotateX( 0deg ); }\n\
							.cardflip3-init { opacity: 0; transform : rotateX( 90deg ) rotateZ( 30deg ); }\n\
							.cardflip3-play { opacity: 1; transform : rotateX( 0deg ) rotateZ( 0deg ); }")
					.appendTo("head");
			} else {
//				return console.log('...already exists.');
			};
		},
		
		/*
			Assign CSS rules based on animation type
			declared for each plugin instance
		*/	
		_assignCSSRules: function() {
			switch(this.$options.anim) {
				case 'fadeIn':
					this.$myPlayClass = 'fadein-play';
					this.$myInitClass = 'fadein-init';
					break;
				case 'slideDownFadeIn':
					this.$myPlayClass = 'slidedownfadein-play';
					this.$myInitClass = 'slidedownfadein-init';
					break;
				case 'slideUpFadeIn':
					this.$myPlayClass = 'slideupfadein-play';
					this.$myInitClass = 'slideupfadein-init';
					break;
				case 'slideRightFadeIn':
					this.$myPlayClass = 'sliderightfadein-play';
					this.$myInitClass = 'sliderightfadein-init';
					break;
				case 'slideLeftFadeIn':
					this.$myPlayClass = 'slideleftfadein-play';
					this.$myInitClass = 'slideleftfadein-init';
					break;
				case 'scaleUpFadeIn':
					this.$myPlayClass = 'scaleupfadein-play';
					this.$myInitClass = 'scaleupfadein-init';
					break;
				case 'scaleDownFadeIn':
					this.$myPlayClass = 'scaledownfadein-play';
					this.$myInitClass = 'scaledownfadein-init';
					break;
				case 'cardFlipYFadeIn1':
					this.$myPlayClass = 'cardflipy1-play';
					this.$myInitClass = 'cardflipy1-init';
					break;
				case 'cardFlipYFadeIn2':
					this.$myPlayClass = 'cardflipy2-play';
					this.$myInitClass = 'cardflipy2-init';
					break;
				case 'cardFlipXFadeIn1':
					this.$myPlayClass = 'cardflipx1-play';
					this.$myInitClass = 'cardflipx1-init';
					break;
				case 'cardFlipXFadeIn2':
					this.$myPlayClass = 'cardflipx2-play';
					this.$myInitClass = 'cardflipx2-init';
					break;
				case 'cardFlip3':
					this.$myPlayClass = 'cardflip3-play';
					this.$myInitClass = 'cardflip3-init';
					break;
				default:
					console.log('ERROR: ' + this.$options.anim + ' is not a defined animation.');
					break;
			};

			this.$element.addClass( this.$myInitClass );	
		},		
		
		_setDelayTime: function() {
			var myDelay	= 0,
				el	= this.$element,
				r	= this.$options.random,
				t	= this.$options.time,
				d	= this.$options.delay,
				dv	= this.$delayVal,
				i	= this.$index,
				rn	= this._getRandomArbitrary( 1, t*2 );
			
			this.$element.each(function() {
				try {
					if (r) {
						myDelay = rn + 'ms';
					} else {
						myDelay = dv + d*i + 'ms';
					};
					
				} catch(err) {
					console.log('ERROR: ' + err.message);
				};
//				console.log('myDelay: ' + myDelay);
				this.style.transitionDelay = myDelay;
				i++;
			});
		},
		
		_getRandomArbitrary: function(min, max) {
			return Math.random() * (max - min) + min;
		},
		
		_createPerspective: function() {
			/*
				Set parent perspective for 3DTransform effects
				and the general transition parameters
				for each DOM element in the collection
			*/
			this.$element.css( 'transition-property', this.$transitionProperty ).css( 'transition-duration', this.$transitionDuration ).css( 'transitionTimingFunction', this.$transitionTimingFunction ).parent().css( 'perspective', this.$perspectiveVal );	
		},
		
		/*
			Triggers cascading animation intro
		*/
        play: function() {
//			console.log('selector: ' + this.$selector);
			$(this.$selector).addClass( this.$myPlayClass);
			
//            console.log('I will PLAY ' + this.$selector + '!');
//            this.callback();
        },

		/*
			Triggers cascading animation outro
		*/
		reset: function() {
//			console.log('selector: ' + this.$selector);
			$(this.$selector).removeClass( this.$myPlayClass);
//            console.log('I will RESET ' + this.$selector + '!');
//            this.callback();
        },
		
        callback: function() {
            // Cache onComplete option
            var onComplete = this.options.onComplete;

            if ( typeof onComplete === 'function' ) {
                /*
                    Use the "call" method so that inside of the onComplete
                    callback function the "this" keyword refers to the
                    specific DOM node that called the plugin.

                    More: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call
                */
                onComplete.call(this.element);
            }
        }

    });

    /*
        Create a lightweight plugin wrapper around the "Plugin" constructor,
        preventing against multiple instantiations.

        More: http://learn.jquery.com/plugins/basic-plugin-creation/
    */
    $.fn.bcuxAnimCascade = function ( options ) {

		console.log('\n\n\n\nINSTANTIATED – reversed: ' + options.reverse +
					'\n___________________________________________________________');
//					'\n...........................................................');
		
		var selector	= this.selector;
		
		// Check for condition to cause a reveersal of the collection order
		if ( options.anim === 'slideDownFadeIn' || options.anim === 'slideRightFadeIn' && !window.matchMedia('(max-width: 767px)').matches || options.reverse ) {
			// Requires jquery-reverse.js
			this.reverse();
		};
		
        return this.each(function( index ) {
//			console.log(index);
			
			if ( !$.data( this, "plugin_" + pluginName ) ) {
				 /*
                    Use "$.data" to save each instance of the plugin in case
                    the user wants to modify it. Using "$.data" in this way
                    ensures the data is removed when the DOM element(s) are
                    removed via jQuery methods, as well as when the userleaves
                    the page. It's a smart way to prevent memory leaks.

                    More: http://api.jquery.com/jquery.data/
                */
                $.data( this, "plugin_" + pluginName, new Plugin( this, options, index, selector ) );
			}
        });
        /*
            "return this;" returns the original jQuery object. This allows
            additional jQuery methods to be chained.
        */
        return this;
    };
	
    /*
        Attach the default plugin options directly to the plugin object. This
        allows users to override default plugin options globally, instead of
        passing the same option(s) every time the plugin is initialized.

        For example, the user could set the "property" value once for all
        instances of the plugin with
        "$.fn.pluginName.defaults.property = 'myValue';". Then, every time
        plugin is initialized, "property" will be set to "myValue".

        More: http://learn.jquery.com/plugins/advanced-plugin-concepts/
    */
    $.fn.bcuxAnimCascade.defaults = {
		anim: 'fadeIn',
		time: 400,
		delay: 60,
		random: false,
		easing: 'ease',
		reverse: false,
        onComplete: null
    };

})( jQuery, window, document );

//----------------------------------------------
/*
*	Plugin for reversing the order
*	of a jquery collection of elements	
*/

// start
(function ( $ ) {
	
	$.fn.reverse = [].reverse;
//	console.log('\tcollection reversed!');
}( jQuery ));
// end