(async () => {
  
  //if (fetchDataFilesImagesImport.hasOwnProperty('dataSheetListing') === false || fetchDataFilesImagesImport.hasOwnProperty('dataSheetListing') === undefined) {
  if (typeof fetchDataFilesImagesImport !== 'object') {
    // Fetch data.
    /**/
    // fetchDataFilesImagesImport = await fetch('https://catalogo.leroymerlin.com.br/catalogo_interativo_v2/app_js/data-loader-xls.php?fileName=data-files-images-listing-gallery-mosaic-v1.xls', {
    fetchDataFilesImagesImport = await fetch('https://catalogo.leroymerlin.com.br/catalogo_interativo_v2/backend_php/data-loader-xls.php?fileName=data-files-images-listing-gallery-mosaic-v1.xls', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      return res.json();
    });
  }
  
  // Logic.
  //fetchDataFilesImagesImport.map()
  
  dataFilesImagesImport.files = [];
  let countRecords = 0;
  
  /* */
  //dataFilesImagesImport = fetchDataFilesImagesImport.dataSheetListing.map((objRow) => {
  fetchDataFilesImagesImport.dataSheetListing.map((objRow) => {
    // Variables.
    let arrIdsFiles = [];
    let arrIdsFilters = [];
    
    // Add objects to new collection.
    // dataFilesImagesImport.files.push(...objRow);
    dataFilesImagesImport.files.push(objRow);
    
    // Break arrays.
    if(objRow.ids_files && objRow.ids_files != 0){
      arrIdsFiles = objRow.ids_files.split(",");
    }
    if(objRow.ids_filters){
      arrIdsFilters = objRow.ids_filters.split(",");
    }
    
    // Data redefinition.
    dataFilesImagesImport.files[countRecords].id = parseInt(objRow.id);
    dataFilesImagesImport.files[countRecords].id_parent = parseInt(objRow.id_parent);
    dataFilesImagesImport.files[countRecords].sort_order = parseInt(objRow.sort_order);
    dataFilesImagesImport.files[countRecords].file_type = parseInt(objRow.file_type);
    dataFilesImagesImport.files[countRecords].file_config = parseInt(objRow.file_config);
    dataFilesImagesImport.files[countRecords].number1 = parseInt(objRow.number1);
    dataFilesImagesImport.files[countRecords].number2 = parseInt(objRow.number2);
    dataFilesImagesImport.files[countRecords].number_small1 = parseInt(objRow.number_small1);
    dataFilesImagesImport.files[countRecords].number_small2 = parseInt(objRow.number_small2);
    dataFilesImagesImport.files[countRecords].number_small3 = parseInt(objRow.number_small3);
    dataFilesImagesImport.files[countRecords].activation = parseInt(objRow.activation);
    //dataFilesImagesImport.files[countRecords].grid_column = parseInt(objRow.grid_column);
    //dataFilesImagesImport.files[countRecords].grid_row = parseInt(objRow.grid_row);
    
    dataFilesImagesImport.files[countRecords].ids_files = arrIdsFiles;
    dataFilesImagesImport.files[countRecords].ids_filters = arrIdsFilters;
    
    dataFilesImagesImport.files[countRecords].file = '../app_files_public/' + objRow.file;
    dataFilesImagesImport.files[countRecords].file_thumbnail = '../app_files_public/' + objRow.file_thumbnail;
    
    countRecords++;
    
    // Debug.
    // console.log('objRow=', objRow);
    // console.log('countRecords=', countRecords);
  });
 
  
  /*
  // fetchDataFilesImagesImport.dataSheetListing.forEach((objRow, index, dataFilesImagesImport) => {
  fetchDataFilesImagesImport.dataSheetListing.forEach((objRow, index) => {
    //theArray[index] = "hello world";
    dataFilesImagesImport.files.push(...objRow);
    
    dataFilesImagesImport.files[index].id = 0;
  });
  */
  
  
  // Debug.
  console.log('dataFilesImagesImport=', dataFilesImagesImport);
  console.log('fetchDataFilesImagesImport=', fetchDataFilesImagesImport);
  
  
  // const dataJSObjetcFilesImegesGalleryMosaicListing = dataFilesImagesImport;
  const dataJSObjetcFilesImegesGalleryMosaicListing = Object.assign({}, dataFilesImagesImport);
  
  console.log('dataJSObjetcFilesImegesGalleryMosaicListing=', dataJSObjetcFilesImegesGalleryMosaicListing);
  /*
  const dataJSObjetcFilesImegesGalleryMosaicListing = {
    files_top: [],
    files: [
      {
        id: 1,
        id_parent: 0,
        sort_order: 0,
        file_type: 1, // 1 - image | 2 - video
        file_config: 0,
        title: 'Clarificante Maxfloc',
        caption: '85173081', // Product id
        description: '1 litro. HTH.',
        number1: 0,
        number2: 0,
        number_small1: 1, // Image type:  1 - background default | 2 - backgroung feature | 3 - environment photo
        number_small2: 5, // Image position: 0 - center | 1 - top/left | 2 - top/center | 3 - top/right | 4 - middle/right | 5 - bottom/right | 6 - bottom/center | 7 - bottom/left | 8 - middle/left
        number_small3: 1, // Text position: 0 - center | 1 - top/left | 2 - top/center | 3 - top/right | 4 - middle/right | 5 - bottom/right | 6 - bottom/center | 7 - bottom/left | 8 - middle/left
        info_small1: 'https://www.leroymerlin.com.br', // External URL
        file_thumbnail: '../app_files_public/85173081.png',
        file_thumbnail_width: '60%',
        file: '../app_files_public/85173081.png',
        activation: 1,
        ids_files: [], // ids (caption) from related files
        ids_filters: ['1'], // Filters ids
        grid_column: '2',
        grid_row: '3',
      },
      {
        id: 2,
        id_parent: 0,
        sort_order: 0,
        file_type: 1, 
        file_config: 0,
        title: 'Elevador de PH',
        caption: '86420306',
        description: '1,5kg. HTH.',
        number1: 0,
        number2: 0,
        number_small1: 2, 
        number_small2: 6, 
        number_small3: 1, 
        info_small1: 'https://www.leroymerlin.com.br',
        file_thumbnail: '../app_files_public/86420306.png',
        file_thumbnail_width: '120%',
        file: '../app_files_public/g_86420306.png',
        activation: 1,
        ids_files: [],
        ids_filters: ['1'],
        grid_column: '1',
        grid_row: '3',
      },
      {
        id: 3,
        id_parent: 0,
        sort_order: 0,
        file_type: 1, 
        file_config: 0,
        title: 'Ambiente',
        caption: '65843886',
        description: 'Teste com ambiente.',
        number1: 0,
        number2: 0,
        number_small1: 3, 
        number_small2: 0, 
        number_small3: 1, 
        info_small1: 'https://www.leroymerlin.com.br',
        file_thumbnail: '../app_files_public/87785796_ambiente.jpg',
        file_thumbnail_width: '100%',
        file: '../app_files_public/g_87785796_ambiente.jpg',
        activation: 1,
        ids_files: ['90843886', '70843886'],
        ids_filters: ['1'],
        grid_column: '2',
        grid_row: '4',
      },
      {
        id: 4,
        id_parent: 0,
        sort_order: 0,
        file_type: 1, 
        file_config: 0,
        title: 'Spa Inflável',
        caption: '90901531-90901503',
        description: 'Mod. Miami, 669 litros, 180cm, <br> 127V ou 220V*. Bestway. <br> Acompanha bomba.',
        number1: 0,
        number2: 0,
        number_small1: 2, 
        number_small2: 8, 
        number_small3: 4, 
        info_small1: 'https://www.leroymerlin.com.br',
        file_thumbnail: '../app_files_public/90901531.png',
        file_thumbnail_width: '50%',
        file: '../app_files_public/g_90901531.png',
        activation: 1,
        ids_files: [],
        ids_filters: ['2'],
        grid_column: '3',
        grid_row: '2',
      },
      {
        id: 5,
        id_parent: 0,
        sort_order: 0,
        file_type: 1, 
        file_config: 0,
        title: 'Bar Flutuante',
        caption: '89267612',
        description: '89cm, 24 latas. Intex.',
        number1: 0,
        number2: 0,
        number_small1: 1, 
        number_small2: 2, 
        number_small3: 5, 
        info_small1: 'https://www.leroymerlin.com.br',
        file_thumbnail: '../app_files_public/89267612.png',
        file_thumbnail_width: '80%',
        file: '../app_files_public/g_89267612.png',
        activation: 1,
        ids_files: [],
        ids_filters: ['3'],
        grid_column: '1',
        grid_row: '2',
      },
      {
        id: 6,
        id_parent: 0,
        sort_order: 0,
        file_type: 1, 
        file_config: 0,
        title: 'Ambiente',
        caption: '90311816',
        description: 'Teste com ambientação.',
        number1: 0,
        number2: 0,
        number_small1: 3, 
        number_small2: 0, 
        number_small3: 1, 
        info_small1: 'https://www.leroymerlin.com.br',
        file_thumbnail: '../app_files_public/90311816_ambiente.jpg',
        file_thumbnail_width: '100%',
        file: '../app_files_public/g_90311816_ambiente.jpg',
        activation: 1,
        ids_files: [],
        ids_filters: ['2'],
        grid_column: '2',
        grid_row: '2',
      },
      {
        id: 7,
        id_parent: 0,
        sort_order: 0,
        file_type: 1, 
        file_config: 0,
        title: 'Capa para Piscina',
        caption: '91059675',
        description: 'Circular, 366cm. Intex.',
        number1: 0,
        number2: 0,
        number_small1: 1, 
        number_small2: 8, 
        number_small3: 3, 
        info_small1: 'https://www.leroymerlin.com.br',
        file_thumbnail: '../app_files_public/91059675.png',
        file_thumbnail_width: '50%',
        file: '../app_files_public/g_91059675.png',
        activation: 1,
        ids_files: [],
        ids_filters: ['3'],
        grid_column: '2',
        grid_row: '2',
      },
    ]
  };
  */
  
  /* HTML
                              <div style="grid-column: span 1; grid-row: span 3;">
                                  <img src="https://picsum.photos/600/600/?image=512" />
                                  <a href="#ssFrontendFilesImagesGalleryMosaicLightbox01-1">
                                      1
                                  </a>
                              </div>
                              
                          <div id="ssFrontendFilesImagesGalleryMosaicLightbox01-1">
                              <div class="content">
                                  <img src="https://picsum.photos/1920/1080/?image=512" />
                                  <div class="title">
                                      No. 512 from Picsum
                                      <a href="#" target="_blank" style="z-index: 9999;">
                                          Comprar
                                      </a>
                                  </div>
                                  <a class="close" href="#gallery"></a>
                              </div>
                          </div>
  
  */
  
  const elementHTMLFilesGalleryMosaic = document.getElementById('divFilesImagesGalleryMosaic');
  
  
  // Logic.
  for (let i = 0; i < dataJSObjetcFilesImegesGalleryMosaicListing.files.length; i++) {
    
    // Append HTML.
    elementHTMLFilesGalleryMosaic.innerHTML += `
      ${dataJSObjetcFilesImegesGalleryMosaicListing.files[i].activation === 1 ?
        `
          <div 
            class="filersGeneric
            ${dataJSObjetcFilesImegesGalleryMosaicListing.files[i].number_small1 === 2 ?
              ` ss-frontend-files-images-gallery-mosaic-feature`
              :
              ``
            }
            ${
              dataJSObjetcFilesImegesGalleryMosaicListing.files[i].ids_filters.map((value)=>{
                return (` filersGeneric${value}`);
              }).join(' ')
            }
            "
            style="
              grid-column: span ${dataJSObjetcFilesImegesGalleryMosaicListing.files[i].grid_column}; 
              grid-row: span ${dataJSObjetcFilesImegesGalleryMosaicListing.files[i].grid_row};
              ${dataJSObjetcFilesImegesGalleryMosaicListing.files[i].number_small1 === 3 ?
                `
                background-image: url(${dataJSObjetcFilesImegesGalleryMosaicListing.files[i].file});
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center center;
                `
                :
                ``
              }
            ">
              ${dataJSObjetcFilesImegesGalleryMosaicListing.files[i].number_small1 !== 3 ?
                `
                  <div class="
                  ss-frontend-files-images-gallery-mosaic-thumbnail-text
                  ${dataJSObjetcFilesImegesGalleryMosaicListing.files[i].number_small3 === 1 ?
                    ` ss-frontend-files-images-gallery-mosaic-thumbnail-text1`
                    :
                    ``
                  }
                  ${dataJSObjetcFilesImegesGalleryMosaicListing.files[i].number_small3 === 2 ?
                    ` ss-frontend-files-images-gallery-mosaic-thumbnail-text2`
                    :
                    ``
                  }
                  ${dataJSObjetcFilesImegesGalleryMosaicListing.files[i].number_small3 === 3 ?
                    ` ss-frontend-files-images-gallery-mosaic-thumbnail-text3`
                    :
                    ``
                  }
                  ${dataJSObjetcFilesImegesGalleryMosaicListing.files[i].number_small3 === 4 ?
                    ` ss-frontend-files-images-gallery-mosaic-thumbnail-text4`
                    :
                    ``
                  }
                  ${dataJSObjetcFilesImegesGalleryMosaicListing.files[i].number_small3 === 5 ?
                    ` ss-frontend-files-images-gallery-mosaic-thumbnail-text5`
                    :
                    ``
                  }
                  ${dataJSObjetcFilesImegesGalleryMosaicListing.files[i].number_small3 === 6 ?
                    ` ss-frontend-files-images-gallery-mosaic-thumbnail-text6`
                    :
                    ``
                  }
                  ${dataJSObjetcFilesImegesGalleryMosaicListing.files[i].number_small3 === 7 ?
                    ` ss-frontend-files-images-gallery-mosaic-thumbnail-text7`
                    :
                    ``
                  }
                  ${dataJSObjetcFilesImegesGalleryMosaicListing.files[i].number_small3 === 8 ?
                    ` ss-frontend-files-images-gallery-mosaic-thumbnail-text8`
                    :
                    ``
                  }
                " style="
                ${dataJSObjetcFilesImegesGalleryMosaicListing.files[i].number_small1 === 2 ?
                  `color: #ffffff !important; `
                  :
                  ``
                }
                ">
                      <h3>
                          ${dataJSObjetcFilesImegesGalleryMosaicListing.files[i].title}
                      </h3>
                      <p>
                          ${dataJSObjetcFilesImegesGalleryMosaicListing.files[i].description}
                      </p> 
                      <div>
                          Código: ${dataJSObjetcFilesImegesGalleryMosaicListing.files[i].caption}
                      </div>
                  </div>
                  
                  <img 
                    src="${dataJSObjetcFilesImegesGalleryMosaicListing.files[i].file_thumbnail}"
                    alt="${dataJSObjetcFilesImegesGalleryMosaicListing.files[i].title}"
                    class="
                    ${dataJSObjetcFilesImegesGalleryMosaicListing.files[i].number_small2 === 1 ?
                      ` ss-frontend-files-images-gallery-mosaic-thumbnail-image1`
                      :
                      ``
                    }
                    ${dataJSObjetcFilesImegesGalleryMosaicListing.files[i].number_small2 === 2 ?
                      ` ss-frontend-files-images-gallery-mosaic-thumbnail-image2`
                      :
                      ``
                    }
                    ${dataJSObjetcFilesImegesGalleryMosaicListing.files[i].number_small2 === 3 ?
                      ` ss-frontend-files-images-gallery-mosaic-thumbnail-image3`
                      :
                      ``
                    }
                    ${dataJSObjetcFilesImegesGalleryMosaicListing.files[i].number_small2 === 4 ?
                      ` ss-frontend-files-images-gallery-mosaic-thumbnail-image4`
                      :
                      ``
                    }
                    ${dataJSObjetcFilesImegesGalleryMosaicListing.files[i].number_small2 === 5 ?
                      ` ss-frontend-files-images-gallery-mosaic-thumbnail-image5`
                      :
                      ``
                    }
                    ${dataJSObjetcFilesImegesGalleryMosaicListing.files[i].number_small2 === 6 ?
                      ` ss-frontend-files-images-gallery-mosaic-thumbnail-image6`
                      :
                      ``
                    }
                    ${dataJSObjetcFilesImegesGalleryMosaicListing.files[i].number_small2 === 7 ?
                      ` ss-frontend-files-images-gallery-mosaic-thumbnail-image7`
                      :
                      ``
                    }
                    ${dataJSObjetcFilesImegesGalleryMosaicListing.files[i].number_small2 === 8 ?
                      ` ss-frontend-files-images-gallery-mosaic-thumbnail-image8`
                      :
                      ``
                    }
                    " 
                    style="
                    ${dataJSObjetcFilesImegesGalleryMosaicListing.files[i].file_thumbnail_width.includes('px') ?
                    `
                      width: ${dataJSObjetcFilesImegesGalleryMosaicListing.files[i].file_thumbnail_width};
                    `:`
                      width: ${dataJSObjetcFilesImegesGalleryMosaicListing.files[i].file_thumbnail_width}%;
                    `
                    }
                    "
                  />
                `:
                ``
              }
              <a href="#ssFrontendFilesImagesGalleryMosaicLightbox01-${dataJSObjetcFilesImegesGalleryMosaicListing.files[i].id}">
                ${/*dataJSObjetcFilesImegesGalleryMosaicListing.files[i].id*/ ''}
              </a>
          </div>
        `
        :
        ``
      }
    `;
    
    // Insert HTML after element.
    elementHTMLFilesGalleryMosaic.insertAdjacentHTML('afterend', `
      ${dataJSObjetcFilesImegesGalleryMosaicListing.files[i].activation === 1 ?
        `
          <div id="ssFrontendFilesImagesGalleryMosaicLightbox01-${dataJSObjetcFilesImegesGalleryMosaicListing.files[i].id}">
              <div class="ss-frontend-files-images-gallery-mosaic01-popup">
                  <img 
                    src="${dataJSObjetcFilesImegesGalleryMosaicListing.files[i].file}" 
                    alt="${dataJSObjetcFilesImegesGalleryMosaicListing.files[i].title}" 
                  />
                  <div class="title">
                      ${dataJSObjetcFilesImegesGalleryMosaicListing.files[i].title}
                      <a href="${dataJSObjetcFilesImegesGalleryMosaicListing.files[i].info_small1}" 
                      target="_blank" 
                      class="ss-frontend-btn-base ss-frontend-btn-action-execute"
                      style="z-index: 9999; float: right;">
                          Comprar
                      </a>
                  </div>
                  <a class="close" href="#gallery"></a>
              </div>
          </div>
        `
        :
        ``
      }
    `);
    
    // Debug.
    // console.log('dataJSObjetcFilesImegesGalleryMosaicListing.files[i].file=', dataJSObjetcFilesImegesGalleryMosaicListing.files[i].file);
  }  
})();


// Debug.
// console.log('dataJSObjetcFilesImegesGalleryMosaicListing=', dataJSObjetcFilesImegesGalleryMosaicListing);
