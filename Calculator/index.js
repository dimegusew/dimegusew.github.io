window.onload = function() {
  Calculator();
  main();
}

function Calculator() {
  var methods = {
    "-": function(a, b) {
      return a - b;
    },
    "+": function(a, b) {
      return a + b;
    },
    "/": function(a, b) {
      return a / b;},
    "*": function(a, b) {
      return a * b;}
  };

this.calculate = function(str) { 
  var split = str.split(' '),
  a = +split[0],
  op = split[1],
  b = +split[2]
   
  if (!methods[op] || isNaN(a) || isNaN(b)) {
      return NaN;  
    }
  currsumm = methods[op](a, b);
    return currsumm;
  }
  this.addMethod = function(name, func) {
    methods[name] = func;
  };
}

function main(){
  var calc = new Calculator;  
  var enteredNumber=[];
  var total;
  var result;
  var items = document.querySelectorAll(".button");
  var m=0;
  var enterIsPushed=0;
  var numIsEntred;

  for (var i=0; i<items.length; i++){
    items[i].onclick= function (){

      $(this).animate({"opacity":"0.5"},50,
        function(){$(this).animate({"opacity":"1"},50)})
          
      if (this.querySelector(".number")){

        var ids = this.querySelector(".number").id
        enteredNumber.push(ids);
        total = enteredNumber.reduce(function(a, b) {
          return a + b;});
        result = calc.calculate(total);

        if (ids===" / " || ids=== " * "|| ids ===" + " || ids === " - "){
          m=m+1;
          numIsEntred = 0;
          enterIsPushed=0;
         } 
          else {numIsEntred=1;}
        
        if (m==2 ){
          enteredNumber=[result.toString() + ids]; 
          m=1;
        }   
        else if (numIsEntred && enterIsPushed) {enteredNumber=[ids];
         enterIsPushed = 0;
         numIsEntred = 0
        }   
        else {enteredNumber=enteredNumber;}
        $("#display").html(enteredNumber);
      }
   
      else if (this.querySelector(".action")) {           //if del pushed
        m=0;
        if (enteredNumber.length>1){
          enteredNumber.pop();}
        else {enteredNumber=[""]}                             
         
        total = enteredNumber.reduce(function(a, b) {
         return a + b;}); 

        if (enteredNumber.length ==0){
          $("#display").html("0");
        }                                 
        else {$("#display").html(total); 
       }                                      
     }

      else if ( this.querySelector(".entered" )) {
           m=0;
           enterIsPushed=1;                                 // if enter pushed
          $("#display").html(result);
          enteredNumber=[result.toString()];
         }                               
      }
   }
}


