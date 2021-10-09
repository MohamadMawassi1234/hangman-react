import React from "react";

function PlayerSection(props) {
    return (
        <div className={props.className} style={props.hostDisplayed}>
            <input readOnly={props.gameOver} type="text" maxLength={props.inputMaxLength} value={props.inputValue} onChange={(e) => props.inputChange(e.target.value)} />
            <button disabled={props.gameOver} name="btn" onClick={props.btnClick}>{props.btnText}</button>
        </div>
    )
}

export default PlayerSection