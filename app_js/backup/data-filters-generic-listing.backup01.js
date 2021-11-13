(async () => {

  const dataJSObjetcFiltersGenericListing = {
    filters_generic: [
      {
        id: 1,
        sort_order: 0,
        filter_index: 101,
        title: 'Limpeza',
        activation: 1,
      },
      {
        id: 2,
        sort_order: 0,
        filter_index: 101,
        title: 'Piscinas',
        activation: 1,
      },
      {
        id: 3,
        sort_order: 0,
        filter_index: 101,
        title: 'Acessórios',
        activation: 1,
      },
      /*
      {
        id: 4,
        sort_order: 0,
        filter_index: 101,
        title: 'Filter 04',
        activation: 1,
      },
      {
        id: 5,
        sort_order: 0,
        filter_index: 101,
        title: 'Filter 05',
        activation: 1,
      },
      {
        id: 6,
        sort_order: 0,
        filter_index: 101, // 1 - image | 2 - video
        title: 'Filter 06',
        activation: 1,
      },
      */
    ]
    
  };

  const elementHTMLFiltersGeneric = document.getElementById('divFiltersGeneric');

  // Logic.
  for (let i = 0; i < dataJSObjetcFiltersGenericListing.filters_generic.length; i++) {
    // Append HTML.
    elementHTMLFiltersGeneric.innerHTML += `
      <button 
        id="btnFiltersGeneric${dataJSObjetcFiltersGenericListing.filters_generic[i].id}" 
        onclick="
          genericFilterByClassName('filersGeneric${dataJSObjetcFiltersGenericListing.filters_generic[i].id}', 'filersGeneric');
        " 
        class="ss-frontend-btn-base ss-frontend-btn-action ss-frontend-btn-action-layout"
      >
          ${dataJSObjetcFiltersGenericListing.filters_generic[i].title}
      </button>
    `;
    
    /*
    elementHTMLFiltersGeneric.innerHTML += `
      <button 
        id="btnFiltersGeneric${dataJSObjetcFiltersGenericListing.filters_generic[i].id}" 
        onclick="
          genericFilterByClassName('filersGeneric${dataJSObjetcFiltersGenericListing.filters_generic[i].id}', 'filersGeneric');
          FunctionsSyncSystem.htmlGenericStyle01('btnFiltersGeneric${dataJSObjetcFiltersGenericListing.filters_generic[i].id}', 'display', 'none');
          FunctionsSyncSystem.htmlGenericStyle01('btnFiltersGeneric${dataJSObjetcFiltersGenericListing.filters_generic[i].id}a', 'display', 'inline-block');
        " 
        class="ss-frontend-btn-base ss-frontend-btn-action ss-frontend-btn-action-layout"
      >
          ${dataJSObjetcFiltersGenericListing.filters_generic[i].title}
      </button>
      <button 
        id="btnFiltersGeneric${dataJSObjetcFiltersGenericListing.filters_generic[i].id}a" 
        onclick="
          genericFilterByClassName('filersGeneric', '');
          FunctionsSyncSystem.htmlGenericStyle01('btnFiltersGeneric${dataJSObjetcFiltersGenericListing.filters_generic[i].id}', 'display', 'inline-block');
          FunctionsSyncSystem.htmlGenericStyle01('btnFiltersGeneric${dataJSObjetcFiltersGenericListing.filters_generic[i].id}a', 'display', 'none');
        " 
        class="ss-frontend-btn-base ss-frontend-btn-action ss-frontend-btn-action-a ss-frontend-btn-action-layout" 
        style="display: none;"
      >
          ${dataJSObjetcFiltersGenericListing.filters_generic[i].title}
      </button>
    `;
    */
  }

})();
