
import { Client } from "@elastic/elasticsearch";

const esClient = new Client({
  node: "https://localhost:9200",
  auth: {
    username: "elastic",
    password: "VgQJKavCCho23mo+Q5Zf", 
  },
  tls: {
    rejectUnauthorized: false, 
  },
});

export default esClient;
