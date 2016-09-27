import template from './template.hbs';
import $ from 'jquery';
import './style.scss';

export default (data) => {
  let html = template(data);
  $('#search-results').append(html);
}
