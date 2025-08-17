import React, { useState, useEffect } from "react";
import { Elasticsearch, Results } from "../src";
import { url } from "./utils";

export default {
  title: "Results",
  component: Results,
};

export const Vanilla = () => {
  return (
    <Elasticsearch url={url}>
      <Results
        id="result"
        items={data =>
          data.map(({ _source, _id, _score }) => (
            <div key={_id}>
              <b>{_source.TICO}</b> - score: {_score} - id: {_id}
            </div>
          ))
        }
      />
    </Elasticsearch>
  );
};

export const WithCustomPagination = () => {
  return (
    <Elasticsearch url={url}>
      <Results
        id="result"
        items={data =>
          data.map(({ _source, _id, _score }) => (
            <div key={_id}>
              <b>{_source.TICO}</b> - score: {_score} - id: {_id}
            </div>
          ))
        }
        pagination={(total, itemsPerPage, page) => (
          <div style={{ color: "green" }}>
            Total : {total} - ItemsPerPage : {itemsPerPage} - Page: {page} CUSTOM!
          </div>
        )}
      />
    </Elasticsearch>
  );
};

export const WithCustomStats = () => {
  return (
    <Elasticsearch url={url}>
      <Results
        id="result"
        items={data =>
          data.map(({ _source, _id, _score }) => (
            <div key={_id}>
              <b>{_source.TICO}</b> - score: {_score} - id: {_id}
            </div>
          ))
        }
        stats={total => <div style={{ color: "green" }}>{total} results CUSTOM!</div>}
      />
    </Elasticsearch>
  );
};

export const SortableDmisDesc = () => {
  const [sortKey, setSortKey] = useState("DMIS.keyword");
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortQuery, setSortQuery] = useState([{ [sortKey]: { order: sortOrder } }]);

  useEffect(() => {
    setSortQuery([{ [sortKey]: { order: sortOrder } }]);
  }, [sortKey, sortOrder]);

  return (
    <Elasticsearch url={url}>
      Sort by:{" "}
      <select onChange={e => setSortKey(e.target.value)} value={sortKey}>
        {["AUTR.keyword", "DMIS.keyword", "DMAJ.keyword", "TICO.keyword"].map(e => (
          <option key={e} value={e}>
            {e.replace(".keyword", "")}
          </option>
        ))}
      </select>
      <select onChange={e => setSortOrder(e.target.value)} value={sortOrder}>
        <option value="asc">asc</option>
        <option value="desc">desc</option>
      </select>
      <Results
        id="result"
        sort={sortQuery}
        items={data =>
          data.map(({ _source, _id }) => (
            <div key={_id}>
              {_source.DMIS} - {_source.TICO.substr(0, 50)}
            </div>
          ))
        }
      />
    </Elasticsearch>
  );
};
