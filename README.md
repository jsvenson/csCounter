###csCounter

A jQuery plugin implementing a simple spinning counter animation.

**Usage**

<pre>
$('#counter').csCounter({
	'number'          : 12345,
	'spinCount'       : 3,
	'digits'          : 5,
	'autoStart'       : true,
	'staggeredStarts' : true
});
</pre>


**Options**

*<code>number</code>* : The final number the counter stops on.

*<code>spinCount</code>* : The number of times each digit will spin before stopping on it's ultimate value. Default <code>3</code>.

*<code>digits</code>* : Indicates the number of digits to display in the counter (the counter will be left-padded with 0's if <code>digits</code> exceeds <code>number.length</code>). Default <code>5</code>.

*<code>autoStart</code>* : Indicates whether the digits in the counter will start spinning at load or will wait for a 'start' signal. Default <code>true</code>.

*<code>staggeredStarts</code>* : Determines whether each digit in the counter will begin at once or be delayed by a random amount. Default <code>true</code>.
