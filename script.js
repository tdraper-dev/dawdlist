/*
    to populate the To Do List
0.5) [CHECK] An Ajax GET Request in order to fill in toDoBody with all tasks that exist (active and complete)
0.5b) [CHECK used a forEach() method within the GET request] A DOM manipulation to add these tasks to toDoBody, likely create a model .html() with associated variables within a loop and go through injecting all tasks into the DOM (probably an abstracted function).
	to add a To Do Item
1 [CHECK the function for DOM manipulation is within the AJAX POST request]) An Ajax POST Request to ADAPI for adding a To Do Item
1a [CHECK]) A DOM manipulation to append a new <input><label><button /> pair to the toDoBody with the value of the submitForm
	to delete a To Do Item
2[CHECK, the total count DOM manipulation is within everything request to update the count]) An Ajax DELETE Request to ADAPI for deleting a To Do Item using the Remove Button
2a[CHECK])  A DOM manipulation to remove the Deleted Item from the list (probably .remove() ).
	to add a total task number updater
3[CHECK updated within each AJAX request]) in the <span> element within “items left” create a jquery Dom manipulation that injects the current length of toDoNote input length.
	to add a Random Task Selector
4) [CHECK] Create a function that will randomly select an active task and highlight that task.

*/

var loadTasks = function() {

    $.ajax({
        type: 'GET',
        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=17',
        dataType: 'json',
        success: function (response, textStatus) {
            var tasksRemaining = response.tasks.length;

            response.tasks.forEach(function(task) {
                $('.toDoBody').prepend($('<div class="toDoNote col-12"><input type="checkbox" id="checkBox" class="align-self-center mr-2 mb-2"' + (task.completed ? "checked" : "") + '><label class="pl-3 mt-1" for="checkBox">' + task.content + '</label><button class="btn pb-2 removeTask" data-id="' + task.id +'"><span class="buttonText">X</span></button></div>'))

                if(task.completed) {
                    tasksRemaining--
                }
            })
            
            $('#itemsLeft').html(tasksRemaining);
        },
        error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
        }
    });
}


var uploadTask = function() {

    $.ajax({
        type: 'POST',
        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=17',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            task: {
                content: $('.taskInput').val()
            }
        }),
        success: function (response, textStatus) {
            $('.toDoBody').prepend($('<div class="toDoNote col-12"><input type="checkbox" id="checkBox" class="align-self-center mr-2 mb-2"' + (response.task.completed ? "checked" : "") + '><label class="pl-3 mt-1" for="checkBox">' + response.task.content + '</label><button class="btn pb-2 removeTask" data-id="' + response.task.id +'"><span class="buttonText">X</span></button></div>'))
            
            $('#itemsLeft').html($('.toDoNote').length);
        },
        error: function (request, textStatus, errorMessage) {
          console.log(errorMessage);
        }
    });
}


var deleteTask = function(id) {

    $.ajax({
        type: 'DELETE',
        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '?api_key=17',
        success: function (response, textStatus) {},
        error: function (request, textStatus, errorMessage) {
          console.log(errorMessage);
        }
    });

}


var completeTask = function(id) {

    $.ajax({
        type: 'PUT',
        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_complete?api_key=17',
        dataType: 'json',
        success: function(response, textStatus) {},
        error: function(request, textStatus, errorMessage) {
            console.log(errorMessage);
        }
    });


}

var markTaskActive = function(id) {

    $.ajax({
        type: 'PUT',
        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_active?api_key=17',
        dataType: 'json',
        success: function(response, textStatus) {},
        error: function(request, textStatus, errorMessage) {
            console.log(errorMessage);
        }
    });

}

function numGenerator(max) {
    return Math.floor(Math.random() * max);
}

$(document).ready(function() {

    loadTasks();

    

    $('#noteSheetForm').submit(function(event) {

        event.preventDefault();
        uploadTask();
        $('.taskInput').val('')

    }) 

    $(document).on('click', '.removeTask', function(event) {

        $(this).closest('.toDoNote').remove();
        deleteTask($(this).data('id'));

        if($(this).prev().prev().is(':checked') !== true) {
            $('#itemsLeft').html((parseInt($('#itemsLeft').text()))-1);
            
        } 
    
    })

    $(document).on('change', '#checkBox', function() {
        var itemsRemaining = parseInt($('#itemsLeft').text())

        if($(this).is(':checked')) {
            completeTask($(this).siblings('.removeTask').data('id'));
            $('#itemsLeft').html(itemsRemaining-1);

        } else  {
            markTaskActive($(this).siblings('.removeTask').data('id'))
            $('#itemsLeft').html(itemsRemaining+1);
        }

    })



                        /* Action Buttons */

    $('#clearAll').on('click', function() {
        $('input[type="checkbox"]:checked').closest('.toDoNote').remove();
    })

    $('#active').on('focus', function() {
        $('input[type="checkbox"]:checked').closest('.toDoNote').hide();
        $('input[type="checkbox"]:not(:checked)').closest('.toDoNote').show();
    })
    $('#completed').on('focus', function() {
        $('input[type="checkbox"]:not(:checked)').closest('.toDoNote').hide();
        $('input[type="checkbox"]:checked').closest('.toDoNote').show();
    })
    $('#all').on('focus', function() {
        $('input[type="checkbox"]').closest('.toDoNote').show();
    })

    $('#randomTaskButton').on('click', function() {

        $('input[type="checkbox"]').closest('.toDoNote').hide();
        
        var max = $('input[type="checkbox"]:not(:checked)').length;
        var randomTaskNumber = numGenerator(max)

        $('input[type="checkbox"]:not(:checked)').eq(randomTaskNumber).closest('.toDoNote').show();
        $('.kudos').show();

    })


                       /* Kudos Notice */
    $('#randomTaskButton').on('mouseleave', function() {
        $('.kudos').hide();
    })

});