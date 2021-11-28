import React, {useEffect, useState} from 'react';
import './App.css';
import {Tldraw, TldrawApp} from '@tldraw/tldraw'

function Drawroom() {

    const [app, setApp] = useState();

    const myDocument = {
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
        return () => {
            clearInterval(handle);
        }
    })

    function handleMount(app) {
        console.log(app.selectAll())
        setApp(app)
    }

    function onPersist(e) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(e.shapes)
        };
        fetch('http://192.168.88.194:8080/saveCanvas', requestOptions)
        myDocument.pages.page1.shapes = e.shapes
        app.updateDocument(myDocument)
    }

     function updateShapes() {
         fetch('http://192.168.88.194:8080/getCanvas')
             .then(respone => respone.json())
             .then(data => {
                 myDocument.pages.page1.shapes = data.shapes
                 app.updateDocument(myDocument)
             })
     }

  return (
      <div>
          <Tldraw darkMode={true} document={myDocument} showMenu={false} showPages={false} showSponsorLink={false} showZoom={false} autofocus={true} onPersist={onPersist} onMount={handleMount}/>
      </div>
  );
}

export default Drawroom;
