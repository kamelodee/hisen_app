class Elasticquery {
  static HeaderSearchQuery(searchText) {
    const fields = [
      "name",
      "brandProductId^5",
      "productShortDescription^7",
      "description",
      "pgName",
      "variantAttributeses.name",
      "productSeries",
      "brandsName",
      "variantAttributeses.options",
      "productSpecifications.key",
      "productSpecifications.value",
      "productGroupSpecifications.key",
      "productGroupSpecifications.value",
      "productsSubCategories.categoryName",
      "productsSubCategories.subCategoryName",
      "productsSubCategories.majorCategoryName",
      "ean",
    ];
    let query = {
      size: 24,
      _source: [
        "brandProductId",
        "productShortDescription",
        "productAssetss.source",
        "productAssetss.isDefault",
        "brandsName",
        "productsSubCategories.subCategoryName",
        "productId",
        "productIndexName",
        "ean",
      ],
      query: {
        bool: {
          minimum_number_should_match: 1,
          should: [
            {
              query_string: {
                query: sanitizeValue(searchText),
                analyzer: "my_analyzer",
                analyze_wildcard: true,
                auto_generate_phrase_queries: true,
                default_operator: "AND",
                fields,
                boost: 200,
              },
            },
            {
              multi_match: {
                query: searchText,
                type: "phrase_prefix",
                boost: 190,
                fields,
              },
            },
            {
              multi_match: {
                query: searchText,
                type: "cross_fields",
                minimum_should_match: "90%",
                analyzer: "my_analyzer",
                boost: 98,
                fields: [
                  "brandsName",
                  "productsSubCategories.categoryName",
                  "productsSubCategories.subCategoryName",
                  "productsSubCategories.majorCategoryName",
                ],
              },
            },
            {
              multi_match: {
                query: searchText,
                type: "best_fields",
                analyzer: "my_analyzer",
                fields,
              },
            },
          ],

          must_not: [
            {
              match: {
                prodgrpIndexName: {
                  query: "PrdGrp0*",
                },
              },
            },
            {
              term: {
                internal: true,
              },
            },
          ],
        },
      },
    };

    return query;
  }
}

export default Elasticquery;
function sanitizeValue(value) {
  return value
    .replace(/[<>]/g, ``)
    .replace(/([+-=&|><!(){}[\]^"~*?:\\/])/g, "\\$1");
}
