(function($) {
    var self, options;
    
    var digitClass = 'csCounter-digit';
    var tapeClass  = 'csCounter-tape';
    
    var methods = {
        'init' : function(opts) {
            options = $.extend({
                'number'          : 999,
                'spinCount'       : 3,
                'digits'          : 5,
                'autoStart'       : true,
                'staggeredStarts' : true, // randomly stagger the start of each digit
                'startEasing'     : 'counterEaseInQuad',
                'stopEasing'      : 'counterEaseOutQuad'
            }, opts);
            
            var padded = options.number.toString();
            while (padded.length < options.digits) padded = '0' + padded;
            for (var i=0; i < padded.length; i++) {
                fns.addDigit(self, padded[i]);
            };
            
            if (options.autoStart) methods.start();
            
            return self;
        },
        'start' : function() {
            self.find('.' + digitClass).each(function() {
                var $this = $(this);
                var delay = options.staggeredStarts? Math.random() * 1000 : 0;
                window.setTimeout(function() {
                    fns.startSpin($this.find('.' + tapeClass), options.spinCount, $this.attr('title'));
                }, delay);
            });
            
            return self;
        }
    };
    
    var fns = {
        'addDigit' : function($el, val) {
            val = val || 0;
            var $digit = $('<div/>').addClass(digitClass).attr('title', val).appendTo($el);
            var $tape = $('<div/>').addClass(tapeClass).appendTo($digit);
            var height = $digit.height();
            for (var i=0; i < 10; i++) {
                $('<span/>').text(i).css('top', (height * i) + 'px').appendTo($tape);
            };
    
            $('<span/>').text('0').css('top', (height * 10) + 'px').appendTo($tape);
        },
        'startSpin' : function($el, times, stop) {
            $el.animate({
                'top' : ($el.height() * -1) + 'px'
            }, 1000, options.startEasing, function() {
                $el.css('top', 0);
                fns.spin($el, times - 1, stop);
            });
        },
        'stopSpin' : function($el, stop) {
            if (stop == 0) stop = 10; // increase animation length for 0 values
            $el.animate({
                'top' : (stop * $el.parent().height() * -1) + 'px'
            }, 1000, options.stopEasing);
        },
        'spin' : function($el, times, stop, count) {
            stop = stop || 0;
            count = count || 1;
            
            $el.animate({
                'top' : ($el.height() * -1) + 'px'
            }, 350, 'linear', function() {
                $el.css('top', 0);
                if (count < times - 1) {
                    fns.spin($el, times, stop, count + 1);
                } else {
                    fns.stopSpin($el, stop);
                }
            });
        }
    }
    
    $.extend($.easing, {
        'counterEaseInQuad' : function(x, t, b, c, d) {
            return c * (t /= d) * t + b;
        },
        'counterEaseOutQuad' : function(x, t, b, c, d) {
            return -c * (t /=d) * (t - 2) + b;
        }
    });
    
    $.fn.csCounter = function(method) {
        self = this;
        if (methods[method]) {
            return methods[method].apply(self, Array.prototype.slice.call(arguments, 1));
        } else if (typeof(method) == 'object' || !method) {
            return methods.init.apply(self, arguments);
        } else {
            $.error('csCounter: Unknown method: ' + method);
        }
    };
})(jQuery);