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
4) Create a function that will randomly select an active task and highlight that task.

*/
var itemsLeft = function(completedCount) {
    var activeCount = ($('.toDoNote').length)
    var finalCount = activeCount - completedCount
    $('#itemsLeft').html(finalCount);

}

var loadTasks = function() {

    $.ajax({
        type: 'GET',
        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=17',
        dataType: 'json',
        success: function (response, textStatus) {
            var completedCount = 0;

            response.tasks.forEach(function(task) {
                $('.toDoBody').prepend($('<div class="toDoNote d-flex col-12"><input type="checkbox" id="checkBox" class="align-self-center mr-2 mb-2"' + (task.completed ? "checked" : "") + '><label class="pl-3 mt-1" for="checkBox">' + task.content + '</label><button class="btn pb-2 removeTask" data-id="' + task.id +'"><span class="buttonText">X</span></button></div>'))

                if(task.completed) {
                    completedCount++
                }
            })
            
            itemsLeft(completedCount);
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
            $('.toDoBody').prepend($('<div class="toDoNote d-flex col-12"><input type="checkbox" id="checkBox" class="align-self-center mr-2 mb-2"' + (response.task.completed ? "checked" : "") + '><label class="pl-3 mt-1" for="checkBox">' + response.task.content + '</label><button class="btn pb-2 removeTask" data-id="' + response.task.id +'"><span class="buttonText">X</span></button></div>'))
            
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
});









//                    <div class="toDoNote d-flex col-12">
//<input type="checkbox" id="cake" class="align-self-center mr-2 mb-2">
//<label class="pl-3 mt-1" for="cake">Test</label>
//<button class="btn pb-2 removeTask"><span class="buttonText">X</span></button>
//</div>



    /*var httpRequest = new XMLHttpRequest();

    httpRequest.onload = function() {
        if (httpRequest.readyState === XMLHttpRequest.DONE && httpRequest.status === 200) {
            console.log(JSON.parse(httpRequest.responseText)["tasks"])
            return httpRequest.responseText
            //returns a parsed JS array of nested JS objects for all tasks
        } else {
            console.log(httpRequest.statusText);
        }
    }
    httpRequest.onerror = function() {
        console.log(httpRequest.statusText);
    }
    
    httpRequest.open('GET', 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=17');

    httpRequest.send();*/




    /*var httpRequest = new XMLHttpRequest();
    httpRequest.onload = function() {
        if (httpRequest.readyState === XMLHttpRequest.DONE && httpRequest.status === 200) {
            
            //returns the parsed JS object being added

        } else {
            console.log(httpRequest.statusText);
        }
    }
    httpRequest.onerror = function() {
        console.log(httpRequest.statusText);
    }
    httpRequest.open('POST', 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=17');
    httpRequest.setRequestHeader("Content-Type", "application/json");

    httpRequest.send(JSON.stringify({
        task: {
            content: "Wash laundry; ADD WITH POST /TASKS"
        }
    }));*/