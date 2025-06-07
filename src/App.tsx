import { useState, useMemo, useEffect } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [removedCount, setRemovedCount] = useState(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const updateTheme = (e: MediaQueryListEvent | MediaQueryList) => {
      document.documentElement.className = e.matches ? "dark" : "light";
    };

    mediaQuery.addEventListener("change", updateTheme);
    updateTheme(mediaQuery); // Set initial theme

    return () => mediaQuery.removeEventListener("change", updateTheme);
  }, []);

  const handleRemoveEmDashes = () => {
    const emDashCount = (text.match(/—/g) || []).length;
    const newText = text.replace(/—/g, "-");
    setText(newText);
    setRemovedCount(emDashCount);
  };

  const highlightedText = useMemo(() => {
    return text
      .replace(/\n/g, "<br/>")
      .replace(/—/g, '<span class="highlight">—</span>');
  }, [text]);

  return (
    <div className="card">
      <h1>Em Dash Remover</h1>
      <p className="subtitle">
        Stay hidden from AI detection and don't embarrass yourself.
      </p>
      <textarea
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setRemovedCount(0);
        }}
        placeholder="Paste your text here..."
        rows={10}
      />
      {text && (
        <>
          <h3 className="preview-title">Live Highlight Preview</h3>
          <div
            className="preview-area"
            dangerouslySetInnerHTML={{ __html: highlightedText }}
          />
        </>
      )}
      <button onClick={handleRemoveEmDashes}>Remove Em Dashes</button>
      {removedCount > 0 && (
        <p className="helper-text">
          Success! Removed {removedCount} em dash{removedCount > 1 ? "es" : ""}
        </p>
      )}
    </div>
  );
}

export default App;
