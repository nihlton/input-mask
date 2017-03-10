Sorry its not in an easily imported package.  just save input-mask to your project and then import it when you need it.

Usage:
```js
{
	import InputMask from './input-mask/input-mask'
	this.phoneMask = new InputMask('(___) ___ - ____', '_')
}

```html
{
	<label>
		<span>phone number</span>
		<input 
			type="text" 
			onKeyDown={this.phoneMask.keyDownHandler}
			onKeyUp={this.phoneMask.keyUpHandler} />
	</label>
}

first argument is the input mask.  its a string representing decoration text, and numbers.

the numbers are indicated by the second argument.
