export const FUNCTIONAL_QUERY_PARAMS = [
  "searchTerm",
  "page",
  "orderBy",
  "params",
];

/**
 * Sets values from router query parameters
 * @param {*} nuxt Nuxt context 'this.$nuxt'
 * @param  {...any} args Objects to set values
 */

export const assignValuesFromRouteQuery = (route, ...args) => {
  if (route.query && args.length > 0) {
    args.forEach((argElement) => {
      if (typeof argElement === "object") {
        Object.entries(argElement).forEach(([key, value]) => {
          argElement[key] = Array.isArray(value) ? [] : null;
        });

        Object.entries(route.query).forEach(([key, value]) => {
          if (Object.prototype.hasOwnProperty.call(argElement, key)) {
            if (Array.isArray(argElement[key]) && !Array.isArray(value)) {
              argElement[key].push(value);
            } else {
              argElement[key] = value;
            }
          }
        });
      } else {
        console.error(
          `Unsupported function argument! Arguments can only be objects, "${typeof argElement}" given!`,
        );
      }
    });
  }
};

/**
 * Sets values to router query parameters
 * @param {*} nuxt Nuxt context 'router'
 * @param {*} data values object
 */
export const pushValuesToRouteQuery = (router, data) => {
  const currentQuery = { ...router.query };
  delete currentQuery.params;
  replaceValuesOfRouteQuery(router, {
    ...currentQuery,
    ...data,
  });
};

/**
 * Replaces values of the router query
 * @param {*} router Next context 'router'
 * @param {*} data values object
 */
export const replaceValuesOfRouteQuery = (router, data) => {
  const pathname =
    router.asPath.indexOf("?") > 0
      ? router.asPath.substring(0, router.asPath.indexOf("?"))
      : router.asPath;
  cleanQueryData(data);
  router.replace(
    {
      pathname,
      query: data,
    },
    null,
    { shallow: true },
  );
};

export const cleanQueryData = (data) => {
  Object.keys(data).forEach((key) => {
    if (
      data[key] == null ||
      data[key] === "" ||
      (Array.isArray(data[key]) && data[key].length === 0)
    ) {
      delete data[key];
    }
  });
};

export const getSearchFilters = (route) => {
  const filters = [];
  Object.entries(route.query).forEach(([key, value]) => {
    if (!FUNCTIONAL_QUERY_PARAMS.includes(key)) {
      filters.push({
        FieldName: key,
        FieldGuids: Array.isArray(value) ? value : [value],
      });
    }
  });

  return filters;
};

export const countFilters = (route) => {
  let result = 0;
  if (route && route.query) {
    Object.entries(route.query).forEach(([key, value]) => {
      if (!FUNCTIONAL_QUERY_PARAMS.includes(key)) {
        if (Array.isArray(value)) {
          result += value.length;
        } else {
          result++;
        }
      }
    });
  }
  return result;
};
