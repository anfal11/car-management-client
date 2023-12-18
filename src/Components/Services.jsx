import { useContext, useEffect, useState } from "react";
import {AiOutlineArrowRight} from 'react-icons/ai'
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";

const Services = () => {

    const {loading} = useContext(AuthContext);
    const [serVice, setServices] = useState([]);
    useEffect(() => {
        fetch('https://car-management-server-nine.vercel.app/services')
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setServices(data)
        })
    },[])

    return (
        <div id="services">
            <div className="text-center mt-10 space-y-5" >
            <h3 className="text-[#ff3811] font-semibold text-2xl">Services</h3>
            <h2 className="text-5xl font-bold">Our Service Area</h2>
            <p>The majority have suffered alteration in some form, by injected humour, or randomised <br /> words which don&apos;t look even slightly believable. </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 px-3 py-10">
            {
              loading ? (
                <div className="flex justify-center"><span className="loading loading-bars loading-lg"></span></div>
              ) : (
                serVice.map((service)=> (
                    <div key={service._id} className="card bg-base-100 shadow-xl">
  <figure className="px-10 pt-10">
    <img src={service.img} alt="Shoes" className="rounded-xl h-[200px] object-cover" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{service.title}</h2>
    <div className="flex">
    <p className="text-[#FF3811] font-semibold">Price : ${service.price}</p>
    {/* <Link to={`/checkout/${service._id}`}> */}
    <Link to={`/book/${service._id}`}>
      <AiOutlineArrowRight className="text-[#FF3811] font-semibold text-2xl"></AiOutlineArrowRight>
      </Link>
    </div>
  </div>
</div>
                )))
            }
        </div>
       <div className="text-center pb-32">
       <button className="btn btn-outline text-[#FF3811] hover:bg-[#FF3811] hover:border-[#FF3811]">More services</button>
       </div>
        </div>
    );
};

export default Services;