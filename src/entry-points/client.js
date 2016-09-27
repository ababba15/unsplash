import Unsplash, { toJson } from 'unsplash-js';
import "../styles/main.scss";
import perphoto from 'components/perphoto';
import $ from 'jquery';

const unsplash = new Unsplash({
  applicationId: "a6e1edc78c6ee6ce2b940bcd4a23dbdd3f457c3ae847d0376f6c67c621ad3545",
  secret: "b4f4f9bed1e2afee4ed364cdfaf51a8310bf8031b96d1e1f926f31abdabe4a12",
  callbackUrl: "http://twitter.com/shafeeqonline"
});

$('#search-form').on('submit', (evt) => {
  evt.preventDefault();
  $('#search-results').addClass("loading");
  $('#search-results').html("");
  const searchQuery = $("#search-input").val();
  unsplash.photos.searchPhotos(searchQuery,[], 1, 20)
  .then(toJson)
  .then(json => {
    $('#search-results').removeClass("loading");
    for (var key in json) {
      if (json.hasOwnProperty(key)) {
        perphoto(json[key]);
      }
    }
  });
})
