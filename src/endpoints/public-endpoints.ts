import { getDataRetriever } from "@oconva/qvikchat/data-retrievers";
import { defineChatEndpoint } from "@oconva/qvikchat/endpoints";

export const definePublicEndpoints = async () => {
  /**
   * Open-ended chat
   * @link https://qvikchat.pkural.ca/chat-endpoints/open-ended-chat | Open-ended chat endpoint
   *
   * If testing from terminal, can use the following command:
   *
   * curl -X POST "http://127.0.0.1:3400/chat" -H "Content-Type: application/json"  -d '{"data": { "query": "Answer in one sentence: What is Firebase Firestore?" } }'
   *
   * For above example, update the port number to the one where the server is running.
   */
  defineChatEndpoint({
    endpoint: "chat",
  });

  /**
   * Close-ended chat endpoint
   * will only answer queries related to specified topic, in this case, 'Firebase'
   * @link https://qvikchat.pkural.ca/chat-endpoints/close-ended-chat | Close-ended chat endpoint
   *
   * If testing from terminal, can use the following command:
   * curl -X POST "http://127.0.0.1:3404/chat-close" -H "Content-Type: application/json"  -d '{"data": { "query" : "Can you help me with my calculus assignment?" } }'
   *
   * For above example, update the port number to the one where the server is running.
   */
  defineChatEndpoint({
    endpoint: "chat-close",
    agentType: "close-ended",
    topic: "Firebase",
  });

  // RAG chat endpoint

  // Index inventory data and get retriever
  const inventoryDataRetriever = await getDataRetriever({
    dataType: "csv",
    filePath: "src/data/knowledge-bases/inventory-data.csv",
    generateEmbeddings: true,
  });

  /**
   * Inventory Data chat endpoint with support for RAG
   *
   * @link https://qvikchat.pkural.ca/chat-endpoints/rag-chat | RAG chat endpoint
   *
   * If testing from terminal, can use the following command:
   * curl -X POST "http://127.0.0.1:3400/chat-rag-inventory" -H "Content-Type: application/json" -d '{"data": { "query": "What is the price of Seagate ST1000DX002?" } }'
   *
   * For above example, update the port number to the one where the server is running.
   */
  defineChatEndpoint({
    endpoint: "chat-rag-inventory",
    topic: "inventory",
    enableRAG: true,
    retriever: inventoryDataRetriever,
  });
};
