export default function SelectPizza() {
  const nextPageBtnClk = (event) => {};

  return (
    <div className="select-pizza-div">
      <h1>I am the select pizza component</h1>
      <img src="images/pizza_photo.png" />
      <p>Pizza is great.</p>

      <button
        type="button"
        onClick={nextPageBtnClk}>
        Placeholder Next Page Button
      </button>
    </div>
  );
}
