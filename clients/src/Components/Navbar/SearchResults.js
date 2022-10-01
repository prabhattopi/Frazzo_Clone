import React from "react"
import {Link} from "react-router-dom"

function SearchResults({searchResult,handlAllo}) {
  return (
    <div  className="list-group">
        {
            searchResult.map(e=>(
<Link  to={`/products/${e._id}`} key={e._id} onClick={()=>handlAllo()} className="list-group-item list-group-item-action">
    {e.name}
</Link>
            ))
        }
  

  
</div>
  );
}

export default SearchResults;