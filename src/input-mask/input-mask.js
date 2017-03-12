export default class InputMask {

  constructor (pattern, numberMask) {
    this.keyDownHandler = this.filterKeys(pattern, numberMask)
    this.keyUpHandler = this.maskInput(pattern, numberMask)
  }

  filterKeys = (pattern, numberMask) => {
    return (event) => {
      const isControl = event.ctrlKey || event.metaKey
      const thisInput = event.target
      const isInputKey = event.key.length === 1
      const hasSelection = thisInput.selectionStart !== thisInput.selectionEnd
      const isNotNumberKey = !parseInt(event.key, 10) && isInputKey && event.key !== '0'
      const patternComplete = !hasSelection && thisInput.value.length === pattern.length && isInputKey
      const matchesPattern = event.key === pattern.charAt(thisInput.selectionStart) && event.key !== numberMask

      if ( !matchesPattern && !isControl && (isNotNumberKey || patternComplete)) {
        event.preventDefault()
      }
    }
  }

  static applyMask = (val, assets, length) => {
    let outValue = ''
    for (let x = 0; x < length; x++) {
      outValue += assets[x] + val[x]
    }
    return outValue
  }

  getValidCaretPosition = (position, pattern, numberMask)=>{
    while(pattern.charAt(position) !== numberMask && position < pattern.length ){ position++ }
    return position
  }
  
  nOnly = ( inputStr ) => {
    return inputStr.replace(/\D/g, '')
  }
  
  pOnly = ( inputStr ) => {
    return inputStr.replace(/[0-9]/g, '')
  }
  
  maskInput = (pattern, numberMask) => {
    return (event) => {
      const thisInput = event.target
      const caretStart = thisInput.selectionStart
      const caretEnd = thisInput.selectionEnd
      const patternAssets = pattern.split(numberMask)
      const numbersInPattern = patternAssets.length - 1

      // are they following the pattern?
      const matchesPattern = (thisInput.value.toString()).replace(/[0-9]/g, numberMask)
      if( matchesPattern === pattern.substr(0, matchesPattern.length)){ return }

      let inValue = this.nOnly(thisInput.value).split('')
      let numbersAdded
      let decorationAdded
      let outLength = Math.min(numbersInPattern, inValue.length)
      let outValue = InputMask.applyMask(inValue, patternAssets, outLength)

      numbersAdded = this.nOnly(outValue).length - this.nOnly(thisInput.value).length
      decorationAdded = this.pOnly(outValue.substr(0,caretStart+numbersAdded)).length - this.pOnly(thisInput.value.substr(0,caretStart+numbersAdded)).length
      
      // user deletes decorative text
      // delete the nearest number instead
      if (
        caretEnd !== thisInput.value.length &&
        event.key === 'Backspace' &&
        thisInput.value.length !== outValue.length &&
        thisInput.value.replace(/\D/g, '') === outValue.replace(/\D/g, '')
      ) {
        let firstHalf = thisInput.value.substr(0, caretStart).replace(/\D/g, '').slice(0, -1)
        let lastHalf = thisInput.value.substr(caretStart).replace(/\D/g, '')
        let newCaretPos = InputMask.applyMask(firstHalf.split(''), patternAssets, Math.min(numbersInPattern, firstHalf.length)).length
        inValue = (firstHalf + lastHalf).split('')
        outLength = Math.min(numbersInPattern, inValue.length)
        
        thisInput.value = InputMask.applyMask(inValue, patternAssets, outLength)

        thisInput.selectionStart = this.getValidCaretPosition(newCaretPos, pattern, numberMask)
        thisInput.selectionEnd = this.getValidCaretPosition(newCaretPos, pattern, numberMask)
        return
      }

      thisInput.value = outValue
      thisInput.selectionStart = this.getValidCaretPosition(caretStart + numbersAdded, pattern, numberMask) + decorationAdded
      thisInput.selectionEnd = this.getValidCaretPosition(caretStart + numbersAdded, pattern, numberMask) + decorationAdded
      return
    }
  }
}

