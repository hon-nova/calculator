
let display=document.getElementById('display')
let topCopy = document.getElementById('top-copy')

 const buttonTexts = (id) => {
   let outputStr = '';
   let btn = document.getElementById(id);
   outputStr = btn.textContent;
 
   let operators = [];
   const isOperator = (char) => {
     return ['*', '/', '+', '-'].includes(char);
   };
 
   let topCopyContent = topCopy.textContent;     

   if (isOperator(outputStr) && isOperator(topCopyContent.charAt(0))) {
      topCopyContent = topCopyContent.slice(1);
      return;
   }
   if (isOperator(outputStr)) {
     
     const lastChar = topCopyContent.slice(-1);
     if (isOperator(lastChar) && isOperator(outputStr)) {
       
       return;
     }
   } 
  
   topCopyContent += outputStr;

   topCopy.textContent = topCopyContent;
   if (topCopyContent.length > 20) {
      display.value = 'DIGITS EXCEEDED';
      // alert(display.value);
     
      const buttons = document.getElementsByTagName('button');
      for (let i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
      }
      return;

   }
 };

const calcResult =()=>{
   let topCopyContent = topCopy.textContent;
   let operators = [];
   let numbers = [];
   let currentNumber = '';

   const isOperator = (char) => {
      return ['*', '/', '+', '-'].includes(char);
   }

   for (let i = 0; i < topCopyContent.length; i++) {
      if (isOperator(topCopyContent[i])) {
         operators.push(topCopyContent[i]);
        
         numbers.push(Number(currentNumber));
         currentNumber = '';
      } else if (!isNaN(topCopyContent[i]) || topCopyContent[i] === '.') {
         currentNumber += topCopyContent[i];
      }

      if (topCopyContent[i] === '=') {
         break;
      }
   }
  
   if (currentNumber !== '') {
      numbers.push(Number(currentNumber));
   }
   
   if (operators.length >= 1 && numbers.length >= 2) {
      let result = numbers[0];
      for (let i = 0; i < operators.length; i++) {
         switch (operators[i]) {
            case '*':
               result *= numbers[i + 1];
               break;
            case '/':
               result /= numbers[i + 1];
               break;
            case '+':
               result += numbers[i + 1];
               break;
            case '-':
               result -= numbers[i + 1];
               break;
         }
      }
      display.value = result.toFixed(3)
   }

}
const onClear = ()=>{
   display.value ='';
   topCopy.textContent=''
}