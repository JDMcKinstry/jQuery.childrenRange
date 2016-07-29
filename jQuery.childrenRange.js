;(function($) {
	/**	$(ele).childrenRange(MIXED VAR);
	 *	Select a range of children elements using either integers or string selectors.
	 *
	 *		With Int Params
	 *	@param (Integer) arg1 The lowest child's index value
	 *	@param (Integer) arg2 The highest child's index value (not required)
	 *
	 *		With String Params
	 *	@param (String) arg1 jQuery string selector for first child sought
	 *	@param (String) arg1 jQuery string selector for last child sought (Not Required)
	 *	*/
	function childrenRange() {
		var $ele = arguments[0],
			args = Array.prototype.slice.call(arguments, 1)
		if ($ele && !($ele instanceof jQuery) && (typeof $ele == 'string' || $ele instanceof HTMLCollection || $ele instanceof Array)) $ele = $($ele);
		if ($ele) {
			var first = $ele.children(':first'),
				last = $ele.children(':last');
			if (!args.length) return $ele.children();
			if (1 <= args.length) {
				if ('number' == typeof args[0]) first = $ele.children().eq(args[0]);
				else if ('string' == typeof args[0]) first = $ele.children(args[0]).first();
			}
			if (2 == args.length) {
				if ('number' == typeof args[1]) last = $ele.children().eq(args[1]);
				else if ('string' == typeof args[1]) last = $ele.children(args[1]).last();
			}
			return first.nextUntil(last).andSelf().add(last);
		}
		throw new Error("Invalid Parent Selector");
	}
	$.extend({ childrenRange: childrenRange });
	$.fn.extend({
		childrenRange: function() {
			var args = [this];
			if (arguments.length) for (x in arguments) args.push(arguments[x]);
			return $.childrenRange.apply($, args);
		}
	});
})(jQuery);
