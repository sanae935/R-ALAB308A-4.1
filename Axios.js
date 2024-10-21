/**
 * 3. Fork your own sandbox, creating a new one named "JavaScript Axios Lab."
 */
/**
 * 4. Change all of your fetch() functions to axios!
 * - axios has already been imported for you within index.js.
 * - If you've done everything correctly up to this point, this should be simple.
 * - If it is not simple, take a moment to re-evaluate your original code.
 * - Hint: Axios has the ability to set default headers. Use this to your advantage
 *   by setting a default header with your API key so that you do not have to
 *   send it manually with all of your requests! You can also set a default base URL!
 */
import axios from "axios";

axios.defaults.baseURL = "https://api.thecatapi.com/v1/";
axios.defaults.headers.common["x-api-key"] = "YOUR_API_KEY";
/**
 * 5. Add axios interceptors to log the time between request and response to the console.
 * - Hint: you already have access to code that does this!
 * - Add a console.log statement to indicate when requests begin.
 * - As an added challenge, try to do this on your own without referencing the lesson material.
 */

axios.interceptors.request.use((request) => {
  console.log("Starting Request", request);
  document.body.style.cursor = "progress";
  document.getElementById("progressBar").style.width = "0%";
  return request;
});

axios.interceptors.response.use((response) => {
  console.log("Response:", response);
  document.body.style.cursor = "default";
  return response;
});

/**
 * 6. Next, we'll create a progress bar to indicate the request is in progress.
 * - The progressBar element has already been created for you.
 *  - You need only to modify its "width" style property to align with the request progress.
 * - In your request interceptor, set the width of the progressBar element to 0%.
 *  - This is to reset the progress with each request.
 * - Research the axios onDownloadProgress config option.
 * - Create a function "updateProgress" that receives a ProgressEvent object.
 *  - Pass this function to the axios onDownloadProgress config option in your event handler.
 * - console.log your ProgressEvent object within updateProgess, and familiarize yourself with its structure.
 *  - Update the progress of the request using the properties you are given.
 * - Note that we are not downloading a lot of data, so onDownloadProgress will likely only fire
 *   once or twice per request to this API. This is still a concept worth familiarizing yourself
 *   with for future projects.
 */
const response = await axios.get(`images/search?breed_id=${breedId}&limit=5`, {
  onDownloadProgress: updateProgress,
});
/**
 * 7. As a final element of progress indication, add the following to your axios interceptors:
 * - In your request interceptor, set the body element's cursor style to "progress."
 * - In your response interceptor, remove the progress cursor style from the body element.
 */
function updateProgress(progressEvent) {
  const total = progressEvent.total;
  const current = progressEvent.loaded;
  const percentCompleted = Math.round((current / total) * 100);
  document.getElementById("progressBar").style.width = `${percentCompleted}%`;
  console.log(progressEvent);
}
/**
 * 8. To practice posting data, we'll create a system to "favourite" certain images.
 * - The skeleton of this function has already been created for you.
 * - This function is used within Carousel.js to add the event listener as items are created.
 *  - This is why we use the export keyword for this function.
 * - Post to the cat API's favourites endpoint with the given ID.
 * - The API documentation gives examples of this functionality using fetch(); use Axios!
 * - Add additional logic to this function such that if the image is already favourited,
 *   you delete that favourite using the API, giving this function "toggle" functionality.
 * - You can call this function by clicking on the heart at the top right of any image.
 */
export async function favourite(imgId) {
  const response = await axios.get(`favourites`);
  const favourites = response.data;

  const isFavourite = favourites.some((fav) => fav.image_id === imgId);

  if (isFavourite) {
    await axios.delete(`favourites/${imgId}`);
  } else {
    await axios.post(`favourites`, { image_id: imgId });
  }
}
async function getFavourites() {
  const response = await axios.get(`favourites`);
  clear(); // Clear carousel

  response.data.forEach((fav) => {
    const carouselItem = createCarouselItem(
      fav.image.url,
      fav.image.alt_description,
      fav.id
    );
    appendCarousel(carouselItem);
  });

  start();
}

// Bind event listener to button
document
  .getElementById("getFavouritesBtn")
  .addEventListener("click", getFavourites);
/**
 * 9. Test your favourite() function by creating a getFavourites() function.
 * - Use Axios to get all of your favourites from the cat API.
 * - Clear the carousel and display your favourites when the button is clicked.
 *  - You will have to bind this event listener to getFavouritesBtn yourself.
 *  - Hint: you already have all of the logic built for building a carousel.
 *    If that isn't in its own function, maybe it should be so you don't have to
 *    repeat yourself in this section.
 */

/**
 * 10. Test your site, thoroughly!
 * - What happens when you try to load the Malayan breed?
 *  - If this is working, good job! If not, look for the reason why and fix it!
 * - Test other breeds as well. Not every breed has the same data available, so
 *   your code should account for this.
 */
