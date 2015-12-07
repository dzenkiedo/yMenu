(function($){
	var methods = {
		init : function ( options ) {
			var yMenu = this.selector;
			var settings = $.extend( {
				yMenu                   : '.yMenu',
				yMenuContainer          : '.yMenuContainer',
				yMenuButtonTouchLayer   : '.yMenuButtonTouchLayer',
				yMenuButton             : '.yMenuButton',
				yMenuCurrentName        : '.yMenuCurrentName',
				yMenuBar                : '.yMenuBar',
				yMenuMask               : '.yMenuMask',
				yMenuActiveColor        : 'default',
				yMenuActiveTextColor    : 'default',
				yMenuOpeners            : 'c-arrow',
				yMenuOpenersOrientation : 'c-right',
				yMultilevel             : false,
				yMenuContainerWidth     : 240,
				yMenuShowBar            : false,
				yMenuShowCurrentName    : true,
				yMenuBodyReact          : true,
				yMenuRemember           : false,
				closeOnOutClick         : false,
				yMenuText               : 'MENU',
				yMenuCloseText          : 'CLOSE'
			}, options);
			yMenuSettings = settings;

			var defaultWidth = 240,
			    css = '',
			    cssContainerWidth = '',
			    cssCurrent = '',
			    cssCurrentName = '',
			    cssBar = '';

			function show_hide_menu () {
				$( settings.yMenuContainer ).toggleClass( 'opened' );
				$( settings.yMenuButton ).toggleClass( 'opened' );
				$( settings.yMenuBar ).toggleClass( 'opened' );
				if( settings.yMenuBodyReact ) {
					$( 'body' ).toggleClass( 'opened' );
					$( 'html' ).toggleClass( 'opened' );
					$( settings.yMenuMask ).toggleClass( 'opened' );
				}

				if ( $( settings.yMenuContainer ).hasClass('opened') ) $( settings.yMenuCurrentName ).html( settings.yMenuCloseText ); else $( settings.yMenuCurrentName ).html( settings.yMenuText );

			}

			function show_menu () {
				$( settings.yMenuCurrentName ).html( settings.yMenuCloseText );
				$( settings.yMenuContainer ).addClass( 'opened' );
				$( settings.yMenuButton ).addClass( 'opened' );
				$( settings.yMenuBar ).addClass( 'opened' );
				if( settings.yMenuBodyReact ) {
					$( 'body' ).addClass( 'opened' );
					$( 'html' ).addClass( 'opened' );
					$( settings.yMenuMask ).addClass( 'opened' );
				}
			}

			function hide_menu () {
				$( settings.yMenuCurrentName ).html ( settings.yMenuText );
				$( settings.yMenuContainer ).removeClass( 'opened' );
				$( settings.yMenuButton ).removeClass( 'opened' );
				$( settings.yMenuBar ).removeClass( 'opened' );
				if( settings.yMenuBodyReact ) {
					$( 'body' ).removeClass( 'opened' );
					$( 'html' ).removeClass( 'opened' );
					$( settings.yMenuMask ).removeClass( 'opened' );
				}
			}

			function initWidth () {
				cssContainerWidth = settings.yMenuContainer + ',' + settings.yMenuContainer + '>.inner>ul>li{width:' + settings.yMenuContainerWidth + 'px;}';
				var cssCurrentNameWidth = settings.yMenuContainerWidth - parseInt( $( settings.yMenuButton ).css('width') )
				cssCurrentName = yMenuCurrentName + '{width:' + cssCurrentNameWidth + 'px;}';
				cssBar = settings.yMenuBar + '{left:' + settings.yMenuContainerWidth + 'px;}';
			}

			function closeOnOutClick() {
				$( document ).on( 'click', function( event ) {
					if ( $( event.target ).closest( yMenu ).length ) return;
					hide_menu();
					event.stopPropagation();
				});
			}

			function yRemember() {
				settings.closeOnOutClick = false;
			}

			function yMultiLevel() {
				$( settings.yMenuContainer ).find( 'li' ).each( function() {
					if ($( this ).find( 'ul' ).length > 0) {
						$( this ).children( 'a' ).eq( 0 ).addClass( 'list' );
						$( this ).children( 'span.show' ).eq( 0 ).addClass( 'open' );
					}
				});

				$( settings.yMenuContainer ).find( 'span.show' ).on( 'click', function(){
					if ( $( this ).parent().hasClass( 'active-li' ) ) {
							$( this ).closest( 'ul' ).find( 'li' ).removeClass( 'active-li' );
							$( this ).parent().removeClass( 'active-li' );
						} else {
							$( this ).closest( 'ul' ).find( '.active-li' ).removeClass( 'active-li' );
							$( this ).parent().addClass( 'active-li' );
						}
				});
			}

			$( settings.yMenuCurrentName ).html( settings.yMenuText );

			this.addClass( settings.yMenuColorScheme );
			this.addClass( settings.yMenuOpeners );
			this.addClass( settings.yMenuOpenersOrientation );
/* Settings IFS */
			if ( settings.yMenuRemember == true )  yRemember();
			if ( settings.closeOnOutClick == true ) closeOnOutClick();

			if ( settings.yMenuContainerWidth != defaultWidth ) initWidth();

			if ( settings.yMenuActiveColor != 'default' ) {
				if ( settings.yMenuActiveTextColor != 'default' ) {
					cssCurrent += settings.yMenuContainer + ' a.current,' + settings.yMenuContainer + ' a.current:hover{background-color: ' + settings.yMenuActiveColor + ';' + 'color:' + settings.yMenuActiveTextColor + ';}';
				} else {
					cssCurrent += settings.yMenuContainer + ' a.current,' + settings.yMenuContainer + ' a.current:hover{background-color: ' + settings.yMenuActiveColor + ';}';
				}
			} else {
				if ( settings.yMenuActiveTextColor != 'default' ) {
					cssCurrent += settings.yMenuContainer + ' a.current,' + settings.yMenuContainer + ' a.current:hover{color:' + settings.yMenuActiveTextColor + ';}';
				}
			}

			if ( settings.yMenuShowCurrentName ) cssCurrentName += settings.yMenuCurrentName + '{display:block;}' + settings.yMenuBar + '{left:' + settings.yMenuContainerWidth + 'px;}';
			if ( settings.yMenuShowBar ) cssBar += settings.yMenuBar + '{display:block}';
			if ( settings.yMultiLevel == true ) yMultiLevel();
			css = '<style>' + cssCurrent + cssCurrentName + cssBar + '</style>';
			if ( css != '<style></style>' ) $( 'html' ).append( css );
/* Settings IFS end */
			this.find( 'a' ).on( 'click', function( e ) {
				if ( $( this ).hasClass( 'current' ) ) {
					e.preventDefault();
				}
			});

			$( settings.yMenuButtonTouchLayer ).on( 'click', function() {
				show_hide_menu();
			});

			if ( settings.yMenuShowCurrentName ) {
				$( settings.yMenuCurrentName ).on( 'click', function() {
					show_hide_menu();
				});
			}

			return ' yMenu has initializated ';
		},
		destroy : function ( options ) {

			$( yMenuSettings.yMenuButtonTouchLayer ).off( 'click' );
			$( yMenuSettings.yMenuCurrentName ).off( 'click' );
			$( yMenuSettings.yMenuContainer ).find( 'span.show' ).off( 'click' );

			this.find( '.active-li' ).removeClass( 'active-li' );
			this.find( '.opened' ).removeClass( 'opened' );
			this.find( 'a' ).off( 'click' );
			$( 'body' ).removeClass( 'opened' );
			$( 'html' ).removeClass( 'opened' );

			return ' yMenu has destroyed ';
		}
	}

	$.fn.yMenu = function ( method ) {
		var yMenuSettings;
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ) );
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Метод с именем ' +  method + ' не существует для jQuery.yMenu' );
		}
	}

})( jQuery );