export default function CheckoutTemp() {
  const submitBtnClk = () => {
    console.log("Submit Button Clicked");
  };

  return (
    <div>
      <h1>Temporary Placeholder Component for Testing</h1>
      <button
        type="button"
        onClick={submitBtnClk}>
        TEST SUBMIT
      </button>
    </div>
  );
}
