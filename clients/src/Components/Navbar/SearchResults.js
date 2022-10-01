import React from "react"
import {Link, useParams} from "react-router-dom"
import { BiRupee } from "react-icons/bi";
import AddToCartBtn from "../AddToCart Button/AddToCartBtn";
import { useState ,useEffect} from "react";


function SearchResults({searchResult,handlAllo}) {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    fetch(`/fraazo/${id}`)
      .then((res) => res.json())
      .then((res) => setProduct(res));
    window.scrollTo(0, 0);
  }, [id]);

  
  return (
    <div  className="list-group">
        {
            searchResult.map(e=>(
        <Link  to={`/products/${e._id}`} key={e._id} onClick={()=>handlAllo()} className="list-group-item list-group-item-action">
                    
                    <div style={{display:"flex",justifyContent:"space-around",alignItems:"center"}}>
                    <img style={{width:"80px"}} src={e.image} alt=""/>
                    <p>{e.name}</p> 
                    
                    <p><BiRupee /> {e.prize}</p>
                    <p style={{textDecoration:"line-through", color:"brown"}}>{e.old_prize }<BiRupee /></p>
                    <p>{e.weight}</p>
                    <AddToCartBtn prod={product} />


                    </div>
            
            
        </Link>
            ))
        }
  

  
</div>
  );
}

export default SearchResults;