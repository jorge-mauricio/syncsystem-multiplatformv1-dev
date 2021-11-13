(async () => {
  if (typeof fetchDataFiltersGenericImport !== 'object') {
    // Fetch data.
    /**/
    // fetchDataFiltersGenericImport = await fetch('https://catalogo.leroymerlin.com.br/catalogo_interativo_v2/app_js/data-loader-xls.php?fileName=data-filters-generic-listing-v1.xls', {
    fetchDataFiltersGenericImport = await fetch('https://catalogo.leroymerlin.com.br/catalogo_interativo_v2/backend_php/data-loader-xls.php?fileName=data-filters-generic-listing-v1.xls', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      return res.json();
    });
  }
  
  // Logic.
  //fetchDataFiltersGenericImport.map()
  
  dataFiltersGenericImport.filters_generic = [];
  let countRecords = 0;
  
  /* */
  //dataFiltersGenericImport = fetchDataFiltersGenericImport.dataSheetListing.map((objRow) => {
  fetchDataFiltersGenericImport.dataSheetListing.map((objRow) => {
    // Variables.
    let arrIdsFiles = [];
    let arrIdsFilters = [];
    
    // Add objects to new collection.
    // dataFiltersGenericImport.files.push(...objRow);
    dataFiltersGenericImport.filters_generic.push(objRow);
    
    // Data redefinition.
    dataFiltersGenericImport.filters_generic[countRecords].id = parseInt(objRow.id);
    dataFiltersGenericImport.filters_generic[countRecords].sort_order = parseInt(objRow.sort_order);
    dataFiltersGenericImport.filters_generic[countRecords].activation = parseInt(objRow.activation);
    
    countRecords++;
    
    // Debug.
    // console.log('objRow=', objRow);
    // console.log('countRecords=', countRecords);
  });

  // const dataJSObjetcFilesImegesGalleryMosaicListing = dataFilesImagesImport;
  const dataJSObjetcFiltersGenericListing = Object.assign({}, dataFiltersGenericImport);
  console.log('dataJSObjetcFiltersGenericListing=', dataJSObjetcFiltersGenericListing);
  /*
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
    ]
  };
  */
 
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
