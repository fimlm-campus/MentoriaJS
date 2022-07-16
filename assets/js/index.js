import {users} from './../data/users.js';
import {avatars} from './../data/avatars.js';

const tBody = document.getElementById('tBody');

(()=>{
    'use strict';

    const getAvatar = (documentUser) => {
        return new Promise((resolve,reject)=>{
            const image = avatars.find( img => img.id == documentUser )?.url
            image ? resolve(image) : reject('404 - Image not found')
        })
    }
    
    const getUser = (identif) => {
        return new Promise((cumplida,noCumplida)=>{
            const user = users.find( u => u.id == identif )
            user ? cumplida(user) : noCumplida('401 - User not found') 
        })
    }
    
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
        }
    }
    callUser();
})();