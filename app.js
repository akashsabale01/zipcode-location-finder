// Listen to the submit event of form
document.querySelector("#zipForm").addEventListener("submit", getLocationInfo);

// Listen to delete event
document.querySelector("body").addEventListener("click", deleteLocationInfo);

function getLocationInfo(e) {
  e.preventDefault();
  // Get zipcode
  let zip = document.querySelector(".zip").value;
  let select = document.querySelector("select");
  let country = select.options[select.selectedIndex].value;

  // show loader
  document.querySelector(".loader").style.display = "block";

  //   Make API request using fetch
  fetch(`https://api.zippopotam.us/${country}/${zip}`)
    .then((response) => {
      // hide loader
      document.querySelector(".loader").style.display = "none";
      if (response.status == 200) {
        showIcon("check");
        return response.json();
      } else {
        showIcon("remove");
        document.querySelector(
          "#output"
        ).innerHTML = `<article class="message is-danger">  
        <div class="message-body">
         Invalid Zipcode, Please enter valid Zipcode.
        </div>
      </article>`;
      }
      throw Error(response.statusText);
    })
    .then((data) => {
      let output = " ";
      data.places.forEach((place) => {
        output += `<article class="message is-success">
            <div class="message-header">
              <p>Location Information</p>
              <button class="delete" aria-label="delete"></button>
            </div>
            <div class="message-body">
            <ul>
                <li><strong>State: </strong>${place.state}</li>
                <li><strong>Place Name: </strong>${place["place name"]}</li>
                <li><strong>Latitude: </strong>${place.latitude}</li>
                <li><strong>Longitude: </strong>${place.longitude}</li>
            </ul>
            </div>
          </article>`;
      });
      document.querySelector("#output").innerHTML = output;
    })
    .catch((err) => {
      console.log(err);
    });
}

function showIcon(icon) {
  document.querySelector(".icon-check").style.display = "none";
  document.querySelector(".icon-remove").style.display = "none";
  document.querySelector(`.icon-${icon}`).style.display = "inline-flex";
}

function deleteLocationInfo(e) {
  if (e.target.className == "delete") {
    document.querySelector(".message").remove();
    document.querySelector(".icon-check").style.display = "none";
    document.querySelector(".zip").value = "";
  }
}
