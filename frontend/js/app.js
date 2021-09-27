import SearchResult from './views/pages/searchResult.js';
import Error404 from './views/pages/error404.js';

import {parseRequestURL} from './helpers/utils.js';

const Routes = {
  '/': SearchResult
};

function router() {
  const contentContainer = document.getElementsByClassName('content-container')[0];

  const   request = parseRequestURL(),
          parsedURL = `/${request.resource || ''}`,
          page = Routes[parsedURL] ? new Routes[parsedURL]() : new Error404();
          
    page.getData().then(data => {
      page.render(data).then(html => {
        contentContainer.innerHTML = html;

        page.afterRender(data);
      });
});

  localStorage.clear();
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
