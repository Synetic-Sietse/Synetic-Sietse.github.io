// getting places from APIs
function loadPlaces(position) {
  const endpoint = `http://localhost:8080/api/${position.latitude},${position.longitude}`;
  return fetch(endpoint)
    .then((res) => {
      return res.json()
        .then((resp) => {
          return resp.four;
        })
    })
    .catch((err) => {
      console.error('Error with ThisPlace API', err);
    })
}

window.onload = () => {
  const scene = document.querySelector('a-scene');

  // first get current user location
  return navigator.geolocation.getCurrentPosition(function (position) {

      // than use it to load from remote APIs a fourword place nearby
      loadPlaces(position.coords)
        .then(place => {
            console.log('test: ', position.coords);
            console.log('test999 :', place.toString());
            console.log('test2 :', place);

            // const placeText = document.createElement('a-text');
            // // placeText.setAttribute('gps-entity-place', `latitude: ${position.coords.latitude}; longitude: ${position.coords.longitude};`);
            // placeText.setAttribute('gps-entity-place', `latitude: 52.388610; longitude: 4.63720;`);
            // placeText.setAttribute('value', place.toString());
            // // placeText.setAttribute('value', "testTEXT");
            // placeText.setAttribute('look-at', "[gps-camera]");
            // placeText.setAttribute('scale', '5 5 5');
            //
            // placeText.addEventListener('loaded', () => {
            //   window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
            // });
            //
            // scene.appendChild(placeText);

            const testText = document.createElement('a-text');
            // testText.setAttribute('gps-entity-place', `latitude: ${position.coords.latitude}; longitude: ${position.coords.longitude};`);
            testText.setAttribute('gps-entity-place', `latitude: 52.388610; longitude: 4.63720;`);
            testText.setAttribute('value', "Zomaar iets....");
            // testText.setAttribute('value', "testTEXT");
            testText.setAttribute('look-at', "[gps-camera]");
            testText.setAttribute('scale', '5 5 5');

            testText.addEventListener('loaded', () => {
              console.log('in eventlistener');
              window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
            });

            scene.appendChild(testText);
          // });


          // places.forEach((place) => {
          //   const latitude = place.location.lat;
          //   const longitude = place.location.lng;
          //
          //   // add place name
          //   const placeText = document.createElement('a-link');
          //   placeText.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
          //   placeText.setAttribute('title', place.name);
          //   placeText.setAttribute('scale', '15 15 15');
          //
          //   placeText.addEventListener('loaded', () => {
          //     window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
          //   });
          //
          //   scene.appendChild(placeText);
          });

    },
    (err) => console.error('Error in retrieving position', err),
    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 27000,
    }
  );
};
