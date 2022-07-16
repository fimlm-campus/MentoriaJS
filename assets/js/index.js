// Importación de archivos necesarios
import {users} from './../data/users.js';
import {avatars} from './../data/avatars.js';

const tBody = document.getElementById('tBody'); // comunicación con HTML

(()=>{
    'use strict'; // Hacer que el código JS sea estricto en su ejecución

    const getAvatar = (documentUser) => {
        return new Promise((cumpli,noCumpli)=>{ // resolve , reject
            const image = avatars.find( img => img.id == documentUser )?.url // si la encuentra obtenga la URL (imagen)
            //image ? resolve(image) : reject('404 - Image not found')
            if(image){
                cumpli(image)
            } else {
                noCumpli('404 - Image not found')
            }
        })
    }
    
    const getUser = (identif) => {
        return new Promise((cumplida,noCumplida)=>{
            const user = users.find( u => u.id == identif )
            user ? cumplida(user) : noCumplida('401 - User not found') // algo ? entonces algo : otra cosa
        })
    }
    
     /*
    getUser(2)
        .then(console.log) // CUANDO SE CUMPLE LA PROMESA
        .catch(console.log) // CUANDO NO SE CUMPLE LA PROMESA
    */
    
    const callUser = () => {
        for (let i = 1; i < 5; i++) {
            getUser(i)
                .then((userFound) => {
                    getAvatar(userFound.dni)
                        .then( imgFound => {
                            tBody.innerHTML += `<tr>
                                                    <th> ${userFound.id} </th>
                                                    <td><img src="${imgFound}" id="avatarUser"></td>
                                                    <td>${userFound.dni}</td>
                                                    <td>${userFound.names}</td>
                                                    <td>${userFound.lastNames}</td>
                                                </tr>`;
                        } )
                        .catch( () => {
                            const imageRamdom = 'https://icons.iconarchive.com/icons/graphicloads/flat-finance/256/person-icon.png';
                            tBody.innerHTML += `<tr>
                                                    <th> ${userFound.id} </th>
                                                    <td><img src="${imageRamdom}" id="avatarUser"></td>
                                                    <td>${userFound.dni}</td>
                                                    <td>${userFound.names}</td>
                                                    <td>${userFound.lastNames}</td>
                                                </tr>`;
                        } )
                })
                .catch(console.log)
                .finally(console.log('Terminé el proceso')) // Para indicar que el proceso finalizó, siempre ingresa sin importar si la promesa se cumple o no
        }
    }
    callUser();
})();
