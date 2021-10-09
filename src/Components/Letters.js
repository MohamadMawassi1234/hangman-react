import React from "react"
function Letters(props){
    return (
        <div className={props.containerName}>
        {props.letterArray.map(ltr => 
          <div className={props.lettersDivName} key={Math.random()} >
            <p style={{color: ltr === "__" ? "white" : "initial"}} className={props.letterName}>{ltr}</p>
          </div>
          )}
      </div>
    )
}

export default Letters