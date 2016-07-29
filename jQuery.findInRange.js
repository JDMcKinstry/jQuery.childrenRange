;(function($) {
	/**	$(ele).findInRange(MIXED VAR);
	 *	Select a range of find elements using either integers or string selectors.
	 *
	 *		With Int Params
	 *	@param (Integer) arg1 The lowest child's index value
	 *	@param (Integer) arg2 The highest child's index value (not required)
	 *
	 *		With String Params
	 *	@param (String) arg1 jQuery string selector for first child sought
	 *	@param (String) arg1 jQuery string selector for last child sought (Not Required)
	 *	*/
	function findInRange() {
		var $ele = arguments[0],
			args = Array.prototype.slice.call(arguments, 1)
		if ($ele && !($ele instanceof jQuery) && (typeof $ele == 'string' || $ele instanceof HTMLCollection || $ele instanceof Array)) $ele = $($ele);
		if ($ele) {
			var first = $ele.find(':first'),
				last = $ele.find(':last'),
				full = $ele.find('*'),
				iFirst = 0, iLast = 0;
			if (!args.length) return $ele.find();
			if (1 <= args.length) {
				if ('number' == typeof args[0]) first = $ele.find('*').eq(args[0]);
				else if ('string' == typeof args[0]) first = $ele.find(args[0]).first();
				iFirst = function() { for(var i=0;i<full.length;i++) if (full[i] == first.get(0)) return i; }();
			}
			if (2 == args.length) {
				if ('number' == typeof args[1]) last = $ele.find('*').eq(args[1]);
				else if ('string' == typeof args[1]) last = $ele.find(args[1]).last();
				iLast = function() { for(var i=0;i<full.length;i++) if (full[i] == last.get(0)) return i; }();
			}
			
			return full.map(function(i) { if (i >= 5 && i <= 7) return this; });
		}
		throw new Error("Invalid Parent Selector");
	}
	$.extend({ findInRange: findInRange });
	$.fn.extend({
		findInRange: function() {
			var args = [this];
			if (arguments.length) for (x in arguments) args.push(arguments[x]);
			return $.findInRange.apply($, args);
		}
	});
})(jQuery);
