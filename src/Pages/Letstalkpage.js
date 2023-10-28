import React,{useState,useEffect} from 'react'
import Navbar from '../components/Navbar'
import Comp3 from '../components/Comp3'
import "../Styles/letstalkpage.css"
import LetTalk1 from '../components/LetTalk1';
import LetTalk2 from '../components/LetTalk2';
import LetTalk3 from '../components/LetTalk3';
import { useNavigate } from 'react-router-dom';
import Services from '../components/Services';

// onClick={()=>{countHandler(1,"notincreasement")}}
// onClick={()=>{countHandler(2,"notincreasement")}}
// onClick={()=>{countHandler(3,"notincreasement")}}

const emailRegexPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

export default function Letstalkpage() {
  const [count,setCount] = useState(1);
  const [text, setText] = useState("")
  const [isFormDataValid, setFormDataValid] = useState(true)

  console.log(isFormDataValid)
  // const [buttonDisable, setButtonDisable] = useState(false)
  const [isServicesClicked, setIsServicesClicked] = useState(false);
  const [formObj,  setFormObj] = useState({
    email : "",
    selectValue : ""
  }) 

  const {email, selectValue} = formObj
  const navigate = useNavigate()
  function countHandler(number,type){
      if(type == "increment"){
        setCount(prev => prev + 1);
        return
      }
      setCount(number)
  }

    function handleClick(){
        const isValid = emailRegexPattern.test(email)
        if(!isValid || !selectValue && count < 3){
          setFormDataValid(false)
      
        }
        else if( !text && count ==3 ){
          setFormDataValid(false)
        }
        else{

          setFormDataValid(true)
          countHandler(0,"increment")
        }

        // setFormObj({})
    }
  return (
    <div className='lets-talk-page'>
      <Navbar page={"letstalk"} />
        <div className='lets-talk-page-div'>
          <div className='circle-container'>
            <div  className={count >= 1 ? "clicked": null}></div>
            <div  className={count > 1 ? "clicked": null}></div>
            <div  className={count > 2 ? "clicked": null}></div>
          </div>
          {
            count == 1
            ? <LetTalk1 validity={isFormDataValid} state={formObj} changeState={setFormObj} />
            : count == 2
            ? <LetTalk2 func={setIsServicesClicked} />
            : count == 3
            ? <LetTalk3  validity={isFormDataValid} text={text} setText={setText} />
            : (
              <>
                <div className='typewriter4'>
                  <p>Gracias! Biyi will reach out to you shortly </p>
                </div>
              </>
              ) 
          }
            { count <= 3
            ?
              (
              <button 
                // disabled={buttonDisable} 
                onClick={handleClick} 
                className={ !isFormDataValid ? "error button" :'button' }>
                proceed
              </button>
              )
            :
              (
                <button
                  className='button mount' 
                  // onClick={()=>{countHandler(1,"notincreasement")}} 
                  // className={ count == 4 ? 'button mount' : 'button' }
                  onClick={()=>{navigate("/")}}
                  >
                  Home
                </button>
              )
            }
        </div>
        <div className='socials-container'>
          <a href='#' target='_blank'>
            <svg className='whatsapp' xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M28.1574 4.83109C25.1725 1.8462 21.0489 0 16.4943 0C11.9396 0 7.81598 1.8462 4.83109 4.83109C1.8462 7.81598 0 11.9396 0 16.4943C0 21.0489 1.8462 25.1725 4.83109 28.1574C7.81598 31.1423 11.9396 32.9885 16.4943 32.9885C21.0489 32.9885 25.1725 31.1423 28.1574 28.1574C31.1423 25.1725 32.9885 21.0489 32.9885 16.4943C32.9885 11.9396 31.1423 7.81598 28.1574 4.83109ZM16.4943 1.57098C20.6153 1.57098 24.3463 3.24131 27.0467 5.94178C29.7472 8.64225 31.4175 12.3731 31.4175 16.4943C31.4175 20.6153 29.7472 24.3463 27.0467 27.0467C24.3463 29.7472 20.6154 31.4175 16.4943 31.4175C12.3732 31.4175 8.64225 29.7472 5.94178 27.0467C3.24131 24.3463 1.57098 20.6154 1.57098 16.4943C1.57098 12.3732 3.24131 8.64225 5.94178 5.94178C8.64225 3.24131 12.3731 1.57098 16.4943 1.57098ZM14.618 17.6485C13.9214 16.9363 13.3239 16.1421 12.8403 15.2855L12.8454 15.2929C12.6988 14.9389 13.1284 14.6386 13.5066 14.3774C13.516 14.371 13.5253 14.3646 13.5345 14.3582C13.6375 14.2872 13.7353 14.2198 13.8179 14.1504C14.0935 13.9805 14.3171 13.7448 14.4663 13.4669C14.537 13.3182 14.5613 13.1534 14.5362 12.992C14.5112 12.8305 14.4377 12.6794 14.3247 12.5564L12.6345 9.84432C12.6087 9.79958 12.5718 9.76152 12.5269 9.73343C12.4821 9.70535 12.4307 9.6881 12.3772 9.6832C11.9699 9.62882 11.5553 9.6522 11.1576 9.75197C10.76 9.85174 10.3874 10.0259 10.0617 10.2642C9.42626 10.7887 9.01911 11.5187 8.91941 12.3123C8.66728 13.8038 9.12781 15.3661 9.97167 16.8137C11.0013 18.5138 12.3822 19.9992 14.0315 21.1808C14.4457 21.464 14.8676 21.7227 15.2587 21.9522L15.3204 21.9888C16.0683 22.4521 16.8759 22.8221 17.7233 23.0897C18.4942 23.326 19.3119 23.3912 20.1134 23.2801C20.6523 23.2157 21.179 23.0792 21.6777 22.8749C22.2102 22.6603 22.6552 22.2877 22.946 21.813C23.1812 21.4356 23.3138 21.0086 23.3319 20.5705C23.3416 20.3814 23.3012 20.193 23.2145 20.0224C23.1277 19.8519 22.9974 19.7046 22.8354 19.5941L22.8097 19.5794L20.17 18.1392L20.1237 18.1148C19.3365 17.7657 18.773 18.4663 18.3228 19.0302C18.2281 19.156 18.125 19.2758 18.0141 19.389C17.9204 19.4923 17.8046 19.5755 17.6745 19.6331C17.6355 19.6473 17.5938 19.6535 17.5522 19.6514C17.5105 19.6493 17.4698 19.6389 17.4326 19.6209C16.3806 19.124 15.4281 18.4565 14.618 17.6485Z" fill="white"/>
            </svg>
          </a>
          <a href='#' target='_blank'>
            <svg className='mail' xmlns="http://www.w3.org/2000/svg" width="33" height="34" viewBox="0 0 33 34" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M28.1574 5.81937C25.1725 2.83448 21.0489 0.988281 16.4943 0.988281C11.9396 0.988281 7.81598 2.83448 4.83109 5.81937C1.8462 8.80427 0 12.9279 0 17.4825C0 22.0372 1.8462 26.1608 4.83109 29.1457C7.81598 32.1306 11.9396 33.9768 16.4943 33.9768C21.0489 33.9768 25.1725 32.1306 28.1574 29.1457C31.1423 26.1608 32.9885 22.0372 32.9885 17.4825C32.9885 12.9279 31.1423 8.80427 28.1574 5.81937ZM16.4943 2.55926C20.6153 2.55926 24.3463 4.22959 27.0467 6.93006C29.7472 9.63053 31.4175 13.3614 31.4175 17.4825C31.4175 21.6035 29.7472 25.3345 27.0467 28.035C24.3463 30.7355 20.6154 32.4058 16.4943 32.4058C12.3732 32.4058 8.64225 30.7355 5.94178 28.035C3.24131 25.3345 1.57098 21.6036 1.57098 17.4825C1.57098 13.3615 3.24131 9.63053 5.94178 6.93006C8.64225 4.22959 12.3731 2.55926 16.4943 2.55926ZM9.65518 22.7133V12.2535H23.3333V22.7133H9.65518ZM18.4742 17.7054L22.1935 21.5511L19.345 16.9081L22.1935 13.4157L16.5108 17.7426L10.795 13.4157L13.6737 16.9023L10.795 21.5511L14.5628 17.681L16.5108 19.7293L18.4742 17.7054Z" fill="white"/>
            </svg>
          </a>
          <a href='#' target='_blank'>
            <svg className='mail' xmlns="http://www.w3.org/2000/svg" width="33" height="34" viewBox="0 0 33 34" fill="none">
              <path d="M16.4943 0.976562C21.0489 0.976562 25.1725 2.82276 28.1574 5.80765C31.1423 8.79255 32.9885 12.9161 32.9885 17.4708C32.9885 22.0255 31.1423 26.1491 28.1574 29.134C25.1725 32.1189 21.0489 33.9651 16.4943 33.9651C11.9396 33.9651 7.81598 32.1189 4.83109 29.134C1.8462 26.1491 0 22.0255 0 17.4708C0 12.9161 1.8462 8.79255 4.83109 5.80765C7.81598 2.82276 11.9396 0.976562 16.4943 0.976562ZM14.6747 15.0041H17.3138V16.3571L17.352 16.3572C17.7195 15.6978 18.6181 15.0042 19.9582 15.0042C22.745 15.0041 23.2604 16.7384 23.2604 18.9944V23.59L20.5081 23.5901V19.5162C20.5081 18.5451 20.4879 17.2949 19.077 17.2949C17.6439 17.2949 17.4244 18.352 17.4244 19.4455V23.5901H14.6746V15.0042L14.6747 15.0041ZM12.7666 12.619C12.7666 13.4091 12.1255 14.0502 11.3355 14.0502C10.5455 14.0502 9.90415 13.4091 9.90415 12.619C9.90415 11.829 10.5454 11.188 11.3355 11.188C12.1255 11.188 12.7666 11.8291 12.7666 12.619ZM9.90415 15.0041H12.7666V23.59H9.90415V15.0041ZM27.0467 6.91834C24.3463 4.21787 20.6153 2.54754 16.4943 2.54754C12.3731 2.54754 8.64225 4.21787 5.94178 6.91834C3.24131 9.61881 1.57098 13.3498 1.57098 17.4708C1.57098 21.5919 3.24131 25.3228 5.94178 28.0233C8.64225 30.7238 12.3732 32.3941 16.4943 32.3941C20.6154 32.3941 24.3463 30.7238 27.0467 28.0233C29.7472 25.3228 31.4175 21.5918 31.4175 17.4708C31.4175 13.3497 29.7472 9.61881 27.0467 6.91834Z" fill="white"/>
            </svg>
          </a>
          <a href='#' target='_blank'>
            <svg className='behance' xmlns="http://www.w3.org/2000/svg" width="33" height="34" viewBox="0 0 33 34" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7072 11.4048C13.1939 11.4001 13.6796 11.4489 14.1556 11.5505C14.555 11.6302 14.9354 11.7859 15.276 12.0091C15.5882 12.2233 15.8379 12.5165 15.9997 12.8588C16.174 13.2028 16.2508 13.6408 16.2508 14.1625C16.2508 14.7221 16.1258 15.1853 15.8655 15.5626C15.576 15.9626 15.1859 16.2791 14.7348 16.4799C15.4228 16.6725 15.9228 17.0211 16.2612 17.5118C16.5995 18.0026 16.7635 18.6035 16.7635 19.2983C16.7783 19.8044 16.6651 20.3061 16.4343 20.7568C16.225 21.1563 15.9239 21.5006 15.5559 21.7613C15.1734 22.0282 14.7461 22.2243 14.2944 22.3404C13.8212 22.464 13.3339 22.5256 12.8448 22.5238H7.45486V11.4083H12.7072V11.4048ZM16.502 0.970412C20.2246 0.972203 23.8314 2.26439 26.7081 4.62687C29.5847 6.98934 31.5531 10.2759 32.2781 13.9268C33.003 17.5776 32.4396 21.3668 30.6838 24.6489C28.928 27.9309 26.0884 30.5028 22.6489 31.9264C19.2093 33.35 15.3825 33.5372 11.8203 32.4561C8.25821 31.375 5.18112 29.0925 3.11329 25.9975C1.04547 22.9025 0.114811 19.1864 0.479873 15.4822C0.844935 11.7781 2.48313 8.31506 5.11538 5.68311C6.61028 4.18736 8.38536 3.00085 10.3392 2.19143C12.2929 1.38201 14.3871 0.96553 16.502 0.96582V0.970412ZM27.0594 6.5041C24.6173 4.06421 21.4047 2.5464 17.9688 2.20924C14.533 1.87207 11.0865 2.7364 8.21654 4.655C5.34658 6.5736 3.23069 9.42775 2.22934 12.7312C1.22799 16.0347 1.40314 19.5831 2.72494 22.772C4.04673 25.9608 6.43341 28.5928 9.47836 30.2195C12.5233 31.8463 16.0382 32.3671 19.4241 31.6933C22.8101 31.0195 25.8576 29.1928 28.0476 26.5243C30.2376 23.8559 31.4345 20.5108 31.4345 17.0589C31.4375 15.0974 31.0525 13.1546 30.3017 11.3424C29.5508 9.53014 28.4489 7.88427 27.0594 6.49951V6.5041ZM19.2612 12.2981H23.7716V13.3988H19.2555L19.2612 12.2981ZM20.2646 20.5837C20.5938 20.9128 21.0766 21.0664 21.6947 21.0664C22.1026 21.0752 22.5032 20.9574 22.8415 20.7293C23.1603 20.5069 23.3541 20.2649 23.431 20.0138H25.3805C25.0617 20.9804 24.5984 21.6753 23.9413 22.0904C23.3037 22.5055 22.5215 22.7176 21.6144 22.7176C21.0276 22.7234 20.4446 22.622 19.8942 22.4183C19.4038 22.2282 18.9619 21.9313 18.6006 21.5492C18.2408 21.1607 17.9617 20.7047 17.7795 20.2076C17.581 19.6562 17.4828 19.0737 17.4894 18.4876C17.483 17.9135 17.5846 17.3433 17.7887 16.8067C17.9766 16.3048 18.2624 15.8453 18.6293 15.4548C19.0157 15.0569 19.4797 14.7428 19.9927 14.5319C20.5056 14.3211 21.0565 14.2179 21.611 14.229C22.2295 14.217 22.8421 14.3526 23.3977 14.6246C23.8936 14.8749 24.3235 15.2387 24.6523 15.6864C24.985 16.1441 25.2247 16.6626 25.3576 17.2126C25.503 17.7993 25.5552 18.4053 25.5124 19.0082H19.6981C19.6981 19.6366 19.9103 20.2443 20.2486 20.5631L20.2646 20.5837ZM22.8048 16.3537C22.5445 16.0648 22.1007 15.91 21.5594 15.91C21.2559 15.8972 20.954 15.9603 20.6809 16.0934C20.4652 16.2009 20.2743 16.352 20.1201 16.5372C19.9814 16.7053 19.8795 16.9006 19.8208 17.1105C19.7708 17.2847 19.7352 17.4626 19.7142 17.6425H23.3174C23.2913 17.1728 23.1111 16.7247 22.8048 16.3675V16.3537ZM12.3941 15.8951C12.775 15.9097 13.1505 15.8015 13.4652 15.5866C13.7462 15.3837 13.8815 15.0454 13.8815 14.5719C13.8884 14.3519 13.842 14.1336 13.7462 13.9355C13.657 13.7755 13.5268 13.6421 13.3689 13.549C13.2053 13.4456 13.0209 13.3794 12.8288 13.3553C12.6215 13.317 12.4111 13.2978 12.2003 13.2979H9.90672V15.8951H12.3941ZM12.5295 20.6273C12.7606 20.6303 12.9914 20.6076 13.2175 20.5596C13.4232 20.5186 13.6197 20.4409 13.7978 20.3303C13.9678 20.2208 14.1046 20.067 14.1935 19.8854C14.298 19.6622 14.3476 19.4173 14.338 19.171C14.338 18.5977 14.174 18.1861 13.8552 17.9453C13.5364 17.7045 13.112 17.5784 12.5811 17.5784H9.92048V20.6387H12.5237L12.5295 20.6273Z" fill="white"/>
            </svg>
          </a>
          <a href='#' target='_blank'>
            <svg className='pininterest' xmlns="http://www.w3.org/2000/svg" width="33" height="34" viewBox="0 0 33 34" fill="none">
              <path d="M16.4942 0.149427C20.3102 0.14941 24.0082 1.47255 26.958 3.8934C29.9079 6.31425 31.927 9.68303 32.6715 13.4257C33.416 17.1684 32.8397 21.0535 31.0409 24.4189C29.242 27.7844 26.3319 30.422 22.8064 31.8823C19.2808 33.3427 15.358 33.5354 11.7063 32.4277C8.05458 31.32 4.89992 28.9803 2.77984 25.8074C0.659759 22.6345 -0.294579 18.8247 0.0794443 15.027C0.453468 11.2294 2.13272 7.67887 4.83105 4.98052C6.36103 3.44669 8.17902 2.23028 10.1806 1.4012C12.1821 0.572128 14.3277 0.146722 16.4942 0.149427ZM12.46 25.9429C13.4924 25.022 14.2008 23.7108 14.5468 22.3662C14.6862 21.836 15.2573 19.6656 15.2573 19.6656C15.6257 20.3762 16.7134 20.9714 17.8573 20.9714C21.2837 20.9714 23.7498 17.8243 23.7498 13.901C23.7498 10.1461 20.6891 7.33895 16.7472 7.33895C11.8424 7.33895 9.24182 10.6315 9.24182 14.2136C9.24182 15.8763 10.1294 17.9521 11.5467 18.6108C11.7587 18.7168 11.8746 18.6654 11.926 18.4545C11.9593 18.2905 12.155 17.5253 12.2441 17.1656C12.2605 17.1089 12.2619 17.0488 12.2482 16.9914C12.2345 16.9339 12.2062 16.881 12.1659 16.8377C11.697 16.2687 11.3177 15.2199 11.3177 14.2486C11.3177 11.7432 13.2148 9.31587 16.4455 9.31587C19.2358 9.31587 21.1886 11.2135 21.1886 13.9365C21.1886 17.011 19.6375 19.1426 17.6174 19.1426C16.5018 19.1426 15.6645 18.2216 15.9378 17.0891C16.2614 15.7386 16.8812 14.2825 16.8812 13.3113C16.8812 12.4411 16.4177 11.7158 15.4415 11.7158C14.2975 11.7158 13.3881 12.8931 13.3881 14.4776C13.3881 15.4822 13.7226 16.1627 13.7226 16.1627C13.7226 16.1627 12.5955 20.9227 12.3889 21.8098C12.1605 22.7936 12.2496 24.1704 12.3501 25.0684L12.4507 25.95L12.4616 25.9446L12.46 25.9429ZM27.0473 6.09114C24.6058 3.65071 21.3938 2.13229 17.9583 1.79458C14.5229 1.45687 11.0766 2.32076 8.20672 4.23906C5.33681 6.15736 3.22081 9.01139 2.21923 12.3149C1.21764 15.6184 1.39244 19.167 2.71386 22.356C4.03527 25.5451 6.42153 28.1773 9.46608 29.8043C12.5106 31.4312 16.0251 31.9523 19.4107 31.2785C22.7963 30.6048 25.8436 28.778 28.0334 26.1095C30.2231 23.4409 31.4199 20.0957 31.4198 16.6437C31.4221 14.6834 31.0371 12.7421 30.2868 10.9311C29.5365 9.12018 28.4358 7.47534 27.0478 6.09114H27.0473Z" fill="white"/>
            </svg>
          </a>
        </div>
        <Services servicesState={isServicesClicked} func={setIsServicesClicked} />
      <Comp3 />
    </div>
  )
}
