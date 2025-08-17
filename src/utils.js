import fetch from "unfetch";
import qs from "qs";

// Search with msearch to antfly instance
// Todo reject.
export function msearch(url, msearchData, headers = {}) {
  return new Promise(async (resolve, reject) => {
    headers = {
      ...{ Accept: "application/json", "Content-Type": "application/x-ndjson" },
      ...headers,
    };
    const body = msearchData.reduce((acc, val) => {
      const q = JSON.stringify(val.query);
      return `${acc}${q}\n`;
    }, "");
    const rawResponse = await fetch(`${url}/query`, { method: "POST", headers, body });
    const response = await rawResponse.json();
    resolve(response);
  });
}

// Build a query from a Map of queries
export function queryFrom(queries) {
  return queries.size === 0 ? { match_all: {} } : { conjuncts: Array.from(queries.values()) };
}

// Convert fields to term queries
export function toTermQueries(fields, selectedValues) {
  const queries = [];
  for (let i in fields) {
    for (let j in selectedValues) {
      // If the field has the suffix .keyword, we use a term query
      // (exact match). Otherwise we use a match query (full text).
      if (typeof fields[i] === "string" && fields[i].endsWith(".keyword")) {
        queries.push({ field: fields[i].replace(/\.keyword$/, ""), term: selectedValues[j] });
        continue;
      }
      queries.push({ field: fields[i], match: selectedValues[j] });
    }
  }
  if (queries.length === 0) {
    return [{ match_all: {} }];
  }
  return queries;
}

// Todo: clean this ugly funtion
export function fromUrlQueryString(str) {
  return new Map([
    ...Object.entries(qs.parse(str.replace(/^\?/, ""))).map(([k, v]) => {
      try {
        return [k, JSON.parse(v)];
      } catch (e) {
        return [k, v];
      }
    }),
  ]);
}

// Todo: clean this ugly funtion
export function toUrlQueryString(params) {
  return qs.stringify(
    Object.fromEntries(
      new Map(
        Array.from(params)
          .filter(([_k, v]) => (Array.isArray(v) ? v.length : v))
          .map(([k, v]) => [k, JSON.stringify(v)])
      )
    )
  );
}

const resolved = Promise.resolve();
export const defer = (f) => {
  resolved.then(f);
};
