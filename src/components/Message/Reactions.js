import React from "react";


export default function Reactions({reactions}) {
  let t = reactions.map(r => {
    let emoji = String.fromCodePoint(r.reactId);
    let getUserReactedName = r.uIds.length === 0 ?
    'No reactions, react to this message!' :
    r.usersReacted.reduce((acc, curr) => acc + '\n' + curr.handleStr, `${emoji} by:`);

    return ( 
      r.uIds.length === 0 ?
      null :
      <div style={{fontSize: 10}} title={getUserReactedName} >
        {`${r.uIds.length}${emoji}`}
      </div>
    );
  });
  return t;
}

