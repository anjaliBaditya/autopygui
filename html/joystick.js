var JOYSTICK_DIV = null;

function __init_joystick_div()
{
	JOYSTICK_DIV = document.createElement('div');
	var div_style = JOYSTICK_DIV.style;
	div_style.background = 'rgba(255,255,255,0)';
	div_style.position = 'absolute';
	div_style.top = '0px';
	div_style.bottom = '0px';
	div_style.left = '0px';
	div_style.right = '0px';
	div_style.margin = '0px';
	div_style.padding = '0px';
	div_style.borderWidth = '0px';
	div_style.position = 'absolute';
	div_style.overflow = 'hidden';
	div_style.zIndex = '10000';
	document.body.appendChild( JOYSTICK_DIV );
}
var JoyStick = function( attrs ) {
	this.radius = attrs.radius || 50;
	this.inner_radius = attrs.inner_radius || this.radius / 2;
	this.x = attrs.x || 0;
	this.y = attrs.y || 0;
	this.mouse_support = attrs.mouse_support || true;

	if ( attrs.visible === undefined )
	{
		attrs.visible = true;
	}

	if ( attrs.visible )
	{
		this.__create_fullscreen_div();
	}
};

JoyStick.prototype.left = false;
JoyStick.prototype.right = false;
JoyStick.prototype.up = false;
JoyStick.prototype.down = false;

JoyStick.prototype.__is_up = function ( dx, dy )
{
	if( dy >= 0 )
	{
		return false;
	}
	if( Math.abs(dx) > 2*Math.abs(dy) )
	{
		return false;
	}
	return true;
};

JoyStick.prototype.__is_down = function down( dx, dy )
{
	if( dy <= 0 )
	{
		return false;
	}
	if( Math.abs(dx) > 2*Math.abs(dy) )
	{
		return false;
	}
	return true;	
};

JoyStick.prototype.__is_left = function( dx, dy )
{
	if( dx >= 0 )
	{
		return false;
	}
	if( Math.abs(dy) > 2*Math.abs(dx) )
	{
		return false;
	}
	return true;	
};

JoyStick.prototype.__is_right = function( dx, dy )
{
	if( dx <= 0 )
	{
		return false;
	}
	if( Math.abs(dy) > 2*Math.abs(dx) )
	{
		return false;
	}
	return true;	
};

