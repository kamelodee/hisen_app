import { isMobileOnly } from "react-device-detect";
import find from "lodash/find";
import uniqBy from "lodash/uniqBy";
import omit from "lodash/omit";
import orderBy from "lodash/orderBy";
class Utils {
  static getLogo({ logo, logoDark, logoLight, mobileLogo }) {
    let logoUrl;
    if (isMobileOnly) {
      logoUrl = mobileLogo;
    }
    if (logo === "logoDark") {
      logoUrl = logoDark;
    } else {
      logoUrl = logoLight;
    }
    return logoUrl;
  }
  static validateQuatity(step, min, max, value) {
    let errMessage = false;

    let isStepvalid = this.ValidateStep(step, min, value);
    if (value) {
      if (parseFloat(value) < parseFloat(min)) {
        errMessage = "Enter minimum value of " + min;
      } else {
        if (isStepvalid) {
          if (parseFloat(value) > parseFloat(max)) {
            errMessage = "Enter maximum value of " + max;
          }
        } else {
          errMessage = "Enter in multiples of " + step;
        }
      }
    } else {
      errMessage = "Required ";
    }

    return errMessage;
  }
  static ValidateStep(step, stepBase, value) {
    let valueDecimals = this.countDecimals(value);
    let stepBaseDecimals = this.countDecimals(stepBase);
    let stepDecimals = this.countDecimals(step);
    let decimalCount = Math.max(valueDecimals, stepBaseDecimals, stepDecimals);
    let multiplier = Math.pow(10, decimalCount);
    value = value * multiplier;
    stepBase = stepBase * multiplier;
    step = step * multiplier;
    return (value - stepBase) % step === 0;
  }
  static countDecimals(value) {
    let numString = value.toString();
    let decimalSymbolIndex = numString.indexOf(".");

    if (decimalSymbolIndex === -1) {
      if (-1 < value && value < 1) {
        // It may be in the exponential notation format (`1e-X`)
        let match = /e-(\d+)$/.exec(numString);

        if (match) {
          return Number(match[1]);
        }
      }

      return 0;
    }

    return numString.length - decimalSymbolIndex - 1;
  }
  static GetProductImages(data, placeholderImg) {
    let img;
    if (data) {
      if (data.length === 0) {
        img = placeholderImg;
      } else {
        var datas = find(data, function (o) {
          return o.isDefault;
        });
        if (datas) {
          img = datas.source;
        } else {
          img = data[0].source;
        }
      }
    } else {
      img = placeholderImg;
    }
    return img;
  }
  static BuildProductQuery(params, isProduct) {
    const { action, actionparam, sort, urlquerydata, size, from = 0 } = params;

    const actions = this.getActionFromUrl(action, isProduct);
    const must = [];
    if (actions) {
      must.push({
        term: {
          [actions]: actionparam,
        },
      });
    }
    const must_not = [
      {
        match: {
          [`${!isProduct ? "pgIndexName" : "prodgrpIndexName"}`]: {
            query: "PrdGrp0*",
          },
        },
      },
    ];
    const First_must = [];
    if (actions) {
      First_must.push({
        term: {
          [actions]: actionparam,
        },
      });
    }
    const First_must_not = [
      {
        match: {
          [`${!isProduct ? "pgIndexName" : "prodgrpIndexName"}`]: {
            query: "PrdGrp0*",
          },
        },
      },
    ];
    let json = {
      from,
      size,
      post_filter: {
        bool: {
          must,
          must_not,
        },
      },
    };
    const aggs = this.BuildAggs(action, First_must, First_must_not, isProduct);
    if (!json.aggs && isProduct) {
      json.aggs = aggs;
    }
    if (isProduct) {
      if (sort === "2") {
        json["sort"] = [{ unitListPrice: { order: "desc" } }];
      } else if (sort === "3") {
        json["sort"] = [{ unitListPrice: { order: "asc" } }];
      } else {
        delete json["sort"];
      }
    }
    if (urlquerydata) {
      const ParsedJSON = JSON.parse(urlquerydata);

      Object.keys(ParsedJSON).forEach((data) => {
        if (!isProduct) {
          delete ParsedJSON["productgroups"];
        }
        if (ParsedJSON[data]) {
          if (ParsedJSON[data].length > 1) {
            let should = [];
            ParsedJSON[data].forEach((data1) => {
              should.push({
                term: {
                  [this.getActionFromUrl(data, isProduct)]: data1.replace(
                    /~/g,
                    "&"
                  ),
                },
              });
            });
            json.post_filter.bool.must.push({ bool: { should } });
          } else {
            ParsedJSON[data].forEach((data1) => {
              json.post_filter.bool.must.push({
                term: {
                  [this.getActionFromUrl(data, isProduct)]: data1.replace(
                    /~/g,
                    "&"
                  ),
                },
              });
            });
          }
        }
      });
    }
    if (!isProduct) {
      json["_source"] = ["variantAttributeses"];
    }
    return json;
  }

  static getInitial(name = "") {
    return name
      .replace(/\s+/, " ")
      .split(" ")
      .slice(0, 2)
      .map((v) => v && v[0].toUpperCase())
      .join("");
  }
  static Build_Filtered_aggs(jsonaggs, urlquerydata) {
    let returnjson = {};
    if (urlquerydata) {
      const ParsedJSON = JSON.parse(urlquerydata);
      let copyjsonpost_filterbool = JSON.stringify(jsonaggs);
      copyjsonpost_filterbool = JSON.parse(copyjsonpost_filterbool);
      Object.keys(copyjsonpost_filterbool).forEach((data) => {
        const jsons = omit(ParsedJSON, data);
        Object.keys(jsons).forEach((data1) => {
          if (ParsedJSON[data1].length > 1) {
            let should = [];
            ParsedJSON[data1].forEach((data2) => {
              should.push({
                term: {
                  [this.getActionFromUrl(data1, true)]: data2.replace(
                    /~/g,
                    "&"
                  ),
                },
              });
            });
            copyjsonpost_filterbool[data].filter.bool.must.push({
              bool: { should },
            });
          } else {
            ParsedJSON[data1].forEach((data2) => {
              copyjsonpost_filterbool[data].filter.bool.must.push({
                term: {
                  [this.getActionFromUrl(data1, true)]: data2.replace(
                    /~/g,
                    "&"
                  ),
                },
              });
            });
          }
        });
      });
      returnjson = copyjsonpost_filterbool;
    }

    return returnjson;
  }
  static getFromUrlparams(data, search) {
    let query = new URLSearchParams(search);
    return query.get(data);
  }
  static getActionFromUrl(action, isProduct) {
    if (action === "c" || action === "categorys") {
      return isProduct
        ? "productsSubCategories.categoryName.keyword"
        : "productGroupSubCategorys.categoryName.keyword";
    } else if (action === "s" || action === "subcategorys") {
      return isProduct
        ? "productsSubCategories.subCategoryName.keyword"
        : "productGroupSubCategorys.subCategoryName.keyword";
    } else if (action === "m" || action === "majorcategorys") {
      return isProduct
        ? "productsSubCategories.majorCategoryName.keyword"
        : "productGroupSubCategorys.majorCategoryName.keyword";
    } else if (action === "b" || action === "brands") {
      return "brandsName.keyword";
    } else if (action === "ps" || action === "productSeries") {
      return "productSeries.keyword";
    } else if (
      action === "pg" ||
      action === "productgroups" ||
      action === "pgName"
    ) {
      return isProduct ? "pgName.keyword" : "prodgrpIndexName.keyword";
    } else {
      if (action === "collection") {
        return;
      }
      return isProduct
        ? `productAttributes.${action}.keyword`
        : "variantAttributeses.options.keyword";
    }
  }
  static FormatAggs(aggregations) {
    Object.keys(aggregations).forEach((datas) => {
      var obj = aggregations[datas];
      obj.rankSearch = 0;
      obj.name = datas;
      obj.data = obj[`${datas}_data`].buckets;
      obj.count = obj[`${datas}_count`].value;
      if (!obj[`${datas}_data`].buckets.length) {
        delete aggregations[datas];
      }
      if (datas === "productgroups") {
        obj.displayName = "Products";
        obj.rankSearch = 6;
      }
      if (datas === "majorcategorys") {
        obj.rankSearch = 5;
        obj.displayName = "Majorcategories";
      }
      if (datas === "categorys") {
        obj.rankSearch = 4;
        obj.displayName = "Categories";
      }
      if (datas === "subcategorys") {
        obj.rankSearch = 3;
        obj.displayName = "Subcategories";
      }
      if (datas === "brands") {
        obj.rankSearch = 2;
        obj.displayName = "Brands";
      }
      if (datas === "productSeries") {
        obj.rankSearch = 1;
        obj.displayName = "Product Series";
      }
    });
    return orderBy(aggregations, "rankSearch", ["desc"]);
  }
  static BuildAggs(action, must, must_not, isProduct) {
    let aggs = {};
    aggs["productgroups"] = this.BuildAggsQuery(
      "pgName",
      must,
      must_not,
      isProduct
    );
    if (action === "m") {
      aggs["brands"] = this.BuildAggsQuery("brands", must, must_not, isProduct);
      aggs["productSeries"] = this.BuildAggsQuery(
        "productSeries",
        must,
        must_not,
        isProduct
      );
      aggs["categorys"] = this.BuildAggsQuery(
        "categorys",
        must,
        must_not,
        isProduct
      );
      aggs["subcategorys"] = this.BuildAggsQuery(
        "subcategorys",
        must,
        must_not,
        isProduct
      );
    }
    if (action === "c") {
      aggs["brands"] = this.BuildAggsQuery("brands", must, must_not, isProduct);
      aggs["productSeries"] = this.BuildAggsQuery(
        "productSeries",
        must,
        must_not,
        isProduct
      );
      aggs["subcategorys"] = this.BuildAggsQuery(
        "subcategorys",
        must,
        must_not,
        isProduct
      );
    }
    if (action === "s") {
      aggs["brands"] = this.BuildAggsQuery("brands", must, must_not, isProduct);
      aggs["productSeries"] = this.BuildAggsQuery(
        "productSeries",
        must,
        must_not,
        isProduct
      );
    }
    if (action === "pg" || action === "collection") {
      aggs["brands"] = this.BuildAggsQuery("brands", must, must_not, isProduct);
      aggs["productSeries"] = this.BuildAggsQuery(
        "productSeries",
        must,
        must_not,
        isProduct
      );
      aggs["categorys"] = this.BuildAggsQuery(
        "categorys",
        must,
        must_not,
        isProduct
      );
      aggs["subcategorys"] = this.BuildAggsQuery(
        "subcategorys",
        must,
        must_not,
        isProduct
      );
    }
    if (action === "b") {
      aggs["productSeries"] = this.BuildAggsQuery(
        "productSeries",
        must,
        must_not,
        isProduct
      );
      aggs["categorys"] = this.BuildAggsQuery(
        "categorys",
        must,
        must_not,
        isProduct
      );
      aggs["subcategorys"] = this.BuildAggsQuery(
        "subcategorys",
        must,
        must_not,
        isProduct
      );
      aggs["majorcategorys"] = this.BuildAggsQuery(
        "majorcategorys",
        must,
        must_not,
        isProduct
      );
    }

    return aggs;
  }
  static getActionParamsFromUrl(action) {
    return action.replace(/~/g, "/");
  }
  static getBreadcrumbs(ProductData, action, actionparam) {
    let returnarr = [];
    let BreadCrumb;
    if (action === "c" || action === "s" || action === "m") {
      let actionName = action === "c" ? "categoryName" : null;
      if (action === "c") {
        actionName = "categoryName";
      } else if (action === "s") {
        actionName = "subCategoryName";
      } else {
        actionName = "majorCategoryName";
      }
      if (ProductData) {
        if (ProductData.length) {
          BreadCrumb = find(
            ProductData[0].productsSubCategories,
            (o) => o[actionName] === actionparam
          );
        }
      }
    }
    if (BreadCrumb) {
      if (action === "m") {
        returnarr.push({
          name: "m",
          data: BreadCrumb["majorCategoryName"],
        });
      } else if (action === "c") {
        returnarr.push(
          {
            name: "m",
            data: BreadCrumb["majorCategoryName"],
          },
          {
            name: "c",
            data: BreadCrumb["categoryName"],
          }
        );
      } else if (action === "s") {
        returnarr.push(
          {
            name: "m",
            data: BreadCrumb["majorCategoryName"],
          },
          {
            name: "c",
            data: BreadCrumb["categoryName"],
          },
          {
            name: "s",
            data: BreadCrumb["subCategoryName"],
          }
        );
      }
    } else {
      if (action === "pg") {
        returnarr.push({
          name: "pg",
          data: actionparam.replace(/~/g, "/"),
        });
      } else {
        returnarr.push({
          name: "collection",
          data: actionparam.replace(/~/g, "/"),
        });
      }
    }

    return uniqBy(returnarr, "name");
  }
  static BuildVariant_aggs(variantarr, First_must, First_must_not) {
    const variant_aggs = {};
    variantarr.forEach((data) => {
      if (data) {
        variant_aggs[data] = this.BuildAggsQuery(
          data,
          First_must,
          First_must_not,
          true
        );
      }
    });

    return variant_aggs;
  }
  static BuildAggsQuery(names, must, must_not, isProduct) {
    const name = names !== "pgName" ? names : "productgroups";
    return {
      filter: {
        bool: {
          must,
          must_not,
        },
      },
      aggs: {
        [`${name}_data`]: {
          terms: {
            field: this.getActionFromUrl(name, isProduct),
            size: 40,
          },
        },
        [`${name}_count`]: {
          cardinality: {
            field: this.getActionFromUrl(name, isProduct),
          },
        },
      },
    };
  }
}

export default Utils;
