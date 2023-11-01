import person from "../assets/images/about_us/person.jpg";
import parts from "../assets/images/about_us/parts.jpg";

const About = () => {
  return (
    <div id="about">
      <div className="hero py-32 mt-24 bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          
          <div className="lg:w-1/2 relative">
          <img src={person} className="w-3/4 rounded-lg shadow-2xl" />
          <img src={parts} className="absolute right-24 border-8 border-white top-1/2 w-1/2 rounded-lg shadow-2xl" />
          </div>
          <div className="lg:w-1/2 space-y-5">
          <h3 className="text-[#ff3811] font-semibold text-xl">About Us</h3>
            <h1 className="text-5xl font-bold">We are qualified & of experience in this field</h1>
            <p>
            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don&apos;t look even slightly believable. 
            </p>
            <p>
            the majority have suffered alteration in some form, by injected humour, or randomised words which don&apos;t look even slightly believable. 
            </p>
            <button className="w-[100px] md:w-auto btn bg-[#FF3811] border-[#FF3811] text-white hover:bg-[#FF3811] hover:border-[#FF3811] hover:text-white">
                  Get more info
                </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
