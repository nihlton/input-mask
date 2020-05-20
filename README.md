TODO:  convert to hook!

demo: http://gregtaff.com/misc/input-mask/

save input-mask.js to your project and then import it when you need it.

Usage:
```JS
import InputMask from './input-mask/input-mask'
this.phoneMask = new InputMask('(___) ___ - ____', '_')
```
```JSX
<label>
	<span>phone number</span>
	<input 
		type="text" 
		onKeyDown={this.phoneMask.keyDownHandler}
		onKeyUp={this.phoneMask.keyUpHandler} />
</label>
```

first argument is the input mask.  its a string representing decoration text, and numbers.
the numbers are indicated by the second argument.
