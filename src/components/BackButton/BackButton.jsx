export default function BackButton({backFunction}) {
    return (
      <>
        <button className="back-btn" type="button" onClick={() => {backFunction()}}>
          Back
        </button>
      </>
    );
  }
  