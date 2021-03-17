$(document).ready(function() {

    var taskInput = $('.taskInput')
    console.log('jQuery', taskInput);

   taskInput.addEventListener('click', function(e) {
       e.preventDefault();
   })


   var taskInput1 = document.getElementsByClassName('taskInput')[0];
   console.log('getElements', taskInput1);
    
    taskInput1.addEventListener('click', function(e) {
        e.preventDefault();
    })

 
});