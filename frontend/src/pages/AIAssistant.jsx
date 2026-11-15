
import { useState } from "react";
import "./AIAssistant.css";

function AIAssistant() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSend(event) {
    event.preventDefault();

    const question = message.trim();
    if (!question || loading) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", text: question },
    ]);
    setMessage("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://127.0.0.1:8000/api/v1/ai/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ message: question }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Unable to get an AI response."
        );
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: data.response },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: `Error: ${error.message}` },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="ai-page">
      <h1>AI Business Assistant</h1>
      <p>Ask questions about your business data.</p>

      <div className="ai-chat-card">
        <div className="ai-chat-messages">
          {messages.length === 0 && (
            <p>
              Hello! Ask me about total revenue, top products,
              customers, employees, or low-stock products.
            </p>
          )}

          {messages.map((item, index) => (
            <div
              key={index}
              className={`ai-message-row ${item.role}`}
            >
              <strong>
                {item.role === "user" ? "You" : "AI"}:
              </strong>
              <div className="ai-message-bubble">{item.text}</div>
            </div>
          ))}

          {loading && <p>AI is thinking...</p>}
        </div>

        <form className="ai-chat-form" onSubmit={handleSend}>
          <input
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Ask a business question..."
            maxLength={2000}
            disabled={loading}
          />

          <button
            type="submit"
            disabled={loading || !message.trim()}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AIAssistant;
