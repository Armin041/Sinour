import TemplatePointers from "./components/TemplatePointers"
import sinorLogo from '../../assets/sinorLogo.png'


function LandingIntro() {

  return (
    <div className="hero min-h-full rounded-l-xl bg-base-200">
      <div className="hero-content py-12">
        <div className="max-w-md">


          <div className="text-center mt-12"><img src={sinorLogo} alt="Dashwind Admin Template" className="w-48 inline-block"></img></div>
          <h1 className='text-3xl text-center font-bold '>پنل مدیریت سینور</h1>




        </div>

      </div>
    </div>
  )

}

export default LandingIntro