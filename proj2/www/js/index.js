/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}


let saveTasklist = JSON.parse(localStorage.getItem("task"));

if(saveTasklist == null) {
    saveTasklist = [];
}
else{
    for (let i = 0; i < saveTasklist.length; i++) {
        var atr = $("ul").append("<li><a href='#page1'>"+saveTasklist[i]+"<button class='liEliminar' data-role='none'>Elimina</button></a></li>");
    }
    $('#homePage').ready(function() {
        $("a",atr).click(edita);
        $("ul").listview("refresh");
        $('ul li a button').click(function(e){
        var caller = e.target || e.srcElement;
        let tarea = $(caller.parentElement).text();
        for (let i = 0; i < saveTasklist.length; i++) {
            if(tarea == saveTasklist[i] + "Elimina") {
                saveTasklist.splice(i,1);
                localStorage.setItem("task", JSON.stringify(saveTasklist));
            }
        }
        $(caller.parentElement).remove();
        return false;
        });
    });

}
let boton = $("#afegir").click(function(){
    let addTask = prompt("Escribe el nombre de la nueva tarea: ");
    var atr = $("ul").append("<li><a href='#page1'>"+addTask+"<button class='liEliminar' data-role='none'>Elimina</button></a></li>");
    $("a",atr).click(edita);
    $("ul").listview("refresh");
    $('ul li a button').click(function(e){
        var caller = e.target || e.srcElement;
        let tarea = $(caller.parentElement).text();
        for (let i = 0; i < saveTasklist.length; i++) {
            if(tarea == saveTasklist[i] + "Elimina") {
                saveTasklist.splice(i,1);
                localStorage.setItem("task", JSON.stringify(saveTasklist));
            }
        }
        $(caller.parentElement).remove();
        return false;
    });
    saveTasklist.push(addTask);
    localStorage.setItem("task",JSON.stringify(saveTasklist));
    
});

var toEDIT = null;
function edita(e){
    var caller = e.target || e.srcElement;
    toEDIT = caller;
}

$("#guardaButton").click(saveText);
function saveText(){
    var editarTarea = $("#nouNOM").val();

    let tarea = $(toEDIT.parentElement).text();
    for (let i = 0; i < saveTasklist.length; i++) {
        if(tarea == saveTasklist[i] + "Elimina") {
            saveTasklist[i] = editarTarea;
            localStorage.setItem("task", JSON.stringify(saveTasklist));
        }
    }

    botoStr = "<button class='liEliminar'>Eliminar</button>";
    $(toEDIT).html(editarTarea+botoStr);
    $('ul li button').click(function(e){
        var tar = e.target || e.srcElement;
        $(tar.parentElement).remove();
        return false;
    });
}

