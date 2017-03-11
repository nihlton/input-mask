import React, { Component } from 'react';
import InputMask from './input-mask/input-mask'
import './App.css';

class App extends Component {
	
	constructor(props){
		super(props)
		this.phoneMask = new InputMask('(___) ___ - ____', '_')
		this.ccMask = new InputMask('#### #### #### ####', '#')
		this.dateMask = new InputMask('XX/XX/XXXX', 'X')
		this.isbnMask = new InputMask('ISBN ___-_-__-______-_', '_')
	}
	
	render() {
		return (
			<div className="App">
				<header>
					<h2>Input Masking</h2>
				</header>
				<div>
				
				<label>
					<span>phone number</span>
					<input 
						type="text" 
						placeholder='(___) ___ - ____' 
						onKeyDown={this.phoneMask.keyDownHandler}
						onKeyUp={this.phoneMask.keyUpHandler} />
				</label>
					
				<label>
					<span>credit card</span>
					<input 
						type="text" 
						placeholder='#### #### #### ####' 
						onKeyDown={this.ccMask.keyDownHandler}
						onKeyUp={this.ccMask.keyUpHandler} />
				</label>
					
				<label>
					<span>date</span>
					<input 
						type="text" 
						placeholder='XX/XX/XXXX' 
						onKeyDown={this.dateMask.keyDownHandler}
						onKeyUp={this.dateMask.keyUpHandler} />
				</label>
					
				<label>
					<span>ISBN</span>
					<input 
						type="text" 
						placeholder='ISBN ___-_-__-______-_' 
						onKeyDown={this.isbnMask.keyDownHandler}
						onKeyUp={this.isbnMask.keyUpHandler} />
				</label>
				
				</div>
			</div>
		);
	}
}

export default App;
