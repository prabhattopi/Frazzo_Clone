import React from "react"
import {Link, useParams} from "react-router-dom"
import { BiRupee } from "react-icons/bi";
import AddToCartBtn from "../AddToCart Button/AddToCartBtn";
import { useState ,useEffect} from "react";


function SearchResults({searchResult,handlAllo}) {
//   const { _id } = useParams();
//   const [product, setProduct] = useState({});
//   useEffect(() => {
//     fetch(`/fraazo/products/${_id}`)
//       .then((res) => res.json())
//       .then((res) => setProduct(res));
//     window.scrollTo(0, 0);
//   }, [id]);

  
  return (
    <div  className="list-group" style={{maxHeight:'70vh',padding:"0",overflow:"scroll"}}>
        {
            searchResult.map(e=>(
          <div  className="list-group-item list-group-item-action d-flex justify-content-center align-items-center gap-2 ">

        <Link  to={`/products/${e._id}`} key={e._id} onClick={()=>handlAllo()} className="list-group-item list-group-item-action">
                    
                    <div style={{display:"flex",justifyContent:"space-around",alignItems:"center"}}>
                    <img style={{width:"80px",objectFit:"cover"}} src={e.image} alt=""/>
                    <p>{e.name.split(" ").length<2?e.name:e.name.split(" ").splice(0,1).join(" ")+"..."}</p> 
                    
                    <p><BiRupee /> {e.prize}</p>
                    <p style={{textDecoration:"line-through", color:"brown"}}>{!e.old_prize?e.prize+10:e.old_prize }<BiRupee /></p>
                    <p>{e.weight}</p>
                   
                  

                    </div>
                    </Link>
                    <div className="w-3">
                <AddToCartBtn prod={e} />
                </div>
                </div>
            
            
 
            ))
        }
  

  
</div>
  );
}

export default SearchResults;