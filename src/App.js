import "./App.css";
import OrderPage from "./pages/OrderPage/OrderPage";
import { OrderContextProvider } from "./contexts/OrderContext";
import { useState } from "react";
import SummaryPage from "./pages/SummaryPage/SummaryPage";
import CompletePage from "./pages/CompletePage/CompletePage";
function App() {
  const [step, setStep] = useState(0);
  return (
    <div className="App">
      <header style={{ padding: "4rem" }}>
        <OrderContextProvider>
          {step === 0 && <OrderPage setStep={setStep} />}
          {step === 1 && <SummaryPage setStep={setStep} />}
          {step === 2 && <CompletePage setStep={setStep} />}
        </OrderContextProvider>
      </header>
    </div>
  );
}

export default App;
