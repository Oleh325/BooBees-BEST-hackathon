import React, {useEffect, useState} from 'react';
import './App.css';
import {Tldraw, TldrawApp} from '@tldraw/tldraw'
import {useNavigate} from "react-router-dom";

function Drawroom() {

    const [app, setApp] = useState();
    const [users, setUsers] = useState([])
    let navigate = useNavigate();

    let myDocument = {
        id: 'doc',
        version: TldrawApp.version,
        pages: {
            page1: {
                id: 'page1',
                shapes: [],
                bindings: {},
            },
        },
        pageStates: {
            page1: {
                id: 'page1',
                selectedIds: [],
                currentParentId: 'page1',
                camera: {
                    point: [0, 0],
                    zoom: 1,
                },
            },
        },
    }

    useEffect(() => {
        let handle = setInterval(updateShapes, 2000);
        let handleUsers = setInterval(updateUsers, 1000);
        return () => {
            clearInterval(handle);
            clearInterval(handleUsers);
        }
    }, [updateShapes, updateUsers])

    function handleMount(app) {
        console.log(app.selectAll())
        myDocument = app.document
        setApp(app)
    }

    function onPersist(e) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(e.shapes)
        };
        fetch('http://192.168.88.201:8080/saveCanvas', requestOptions)
        myDocument.pages.page1.shapes = e.shapes
        app.updateDocument(myDocument)
    }

     function updateShapes() {
         fetch('http://192.168.88.201:8080/getCanvas')
             .then(response => response.json())
             .then(data => {
                 console.log(data)
                 //myDocument.pages.page1.setShapes(data.shapes)
                 let oldDocument = myDocument.pages.page1.shapes
                 myDocument.pages.page1.shapes = data.shapes
                 console.log(myDocument.pages.page1)
                 try {
                     app.updateDocument(myDocument)
                 } catch (e) {
                     console.log("caught exception")
                     app.updateDocument(oldDocument)
                 }
             })
     }

    function updateUsers() {
        fetch('http://192.168.88.201:8080/getUsers')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setUsers(data);
                if (data.length === 0) {
                    localStorage.removeItem('userId')
                    navigate('/', {replace: true})
                }
            });
    }

  return (
      <div>
              <div className="topPanel">
                  <div className="listItem">
                      <svg width="88" height="88" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg"
                           className="avatar">
                          <g clip-path="url(#clip0_19_35)">
                              <path
                                  d="M44 87.9934C68.3005 87.9934 88 68.2954 88 43.9967C88 19.698 68.3005 0 44 0C19.6995 0 0 19.698 0 43.9967C0 68.2954 19.6995 87.9934 44 87.9934Z"
                                  fill="#009A49"/>
                              <path
                                  d="M31.7785 76.0683C30.3928 71.406 25.1259 71.8854 20.7128 67.3478C14.8812 61.359 15.6561 51.857 16.0173 47.3982C16.8579 37.1017 22.3218 26.2338 26.0782 26.6278C28.7839 26.9168 32.4615 33.1945 33.1051 38.809C33.2692 40.2143 33.2167 41.3963 34.1295 42.1974C36.0668 43.9047 39.0418 41.0679 44.3546 40.8841C50.6262 40.6345 53.8901 44.6074 56.2609 42.7293C57.3182 41.8888 57.2131 40.6674 57.5743 38.4741C58.52 33.1223 61.7116 26.0697 64.6209 25.7939C69.2179 25.3605 73.8149 41.8297 74.1761 43.0642C75.5289 47.9958 76.6388 52.2576 75.3516 57.5109C74.3484 61.3971 72.3888 64.9706 69.6513 67.9059C64.4961 73.2709 59.6101 73.1593 58.9206 77.0993C58.4149 79.9755 60.5492 82.5628 58.9206 84.4999C58.333 85.1079 57.5712 85.5186 56.7403 85.6754C51.1976 87.2908 48.4197 88.0985 43.9737 88.0197C41.666 87.9697 39.3691 87.6881 37.1176 87.1791C34.4316 86.6275 33.0722 86.3386 32.3498 85.5769C30.2221 83.2851 32.9277 79.9295 31.7785 76.0683Z"
                                  fill="#016938"/>
                          </g>
                          <defs>
                              <clipPath id="clip0_19_35">
                                  <rect width="88" height="88" fill="white"/>
                              </clipPath>
                          </defs>
                      </svg>
                      <p className="listItemText">
                          {users && users.map(user => {
                             if (user.canDraw === true) {
                                return (user.name)
                             }
                          })}
                      </p>
                  </div>
                  <p className="topPanelText">
                      {users && users.map(user => {
                          if (user.canDraw === true && user.id == localStorage.getItem('userId')) {
                              return ("It's your turn!")
                          }
                      })}
                  </p>
                  <p className="topPanelText">00:14</p>
              </div>
          <Tldraw document={myDocument} showMenu={false} showPages={false} showSponsorLink={false} showZoom={false} autofocus={false} onPersist={() => onPersist} onMount={() => handleMount}/>
      </div>
  );
}

export default Drawroom;
