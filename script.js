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

           const placeText = document.createElement('a-link');
            placeText.setAttribute('gps-entity-place', `latitude: ${position.latitude}; longitude: ${position.longitude};`);
            placeText.setAttribute('title', place);
            placeText.setAttribute('scale', '15 15 15');

            placeText.addEventListener('loaded', () => {
              window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
            });

            scene.appendChild(placeText);
          });


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
          // });

    },
    (err) => console.error('Error in retrieving position', err),
    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 27000,
    }
  );
};
