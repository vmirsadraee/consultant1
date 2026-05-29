import { useNavigate } from "react-router-dom";
import "./Page.css";

export default function Invoicepage() {

   

   const navigate = useNavigate();

 
  //===================== تبدیل عدد به حرف ===============
  function numberToPersianWords(num) {
  if (num === 0) return "صفر";

  const ones = [
    "",
    "یک",
    "دو",
    "سه",
    "چهار",
    "پنج",
    "شش",
    "هفت",
    "هشت",
    "نه",
  ];

  const tens = [
    "",
    "ده",
    "بیست",
    "سی",
    "چهل",
    "پنجاه",
    "شصت",
    "هفتاد",
    "هشتاد",
    "نود",
  ];

  const teens = [
    "ده",
    "یازده",
    "دوازده",
    "سیزده",
    "چهارده",
    "پانزده",
    "شانزده",
    "هفده",
    "هجده",
    "نوزده",
  ];

  const hundreds = [
    "",
    "صد",
    "دویست",
    "سیصد",
    "چهارصد",
    "پانصد",
    "ششصد",
    "هفتصد",
    "هشتصد",
    "نهصد",
  ];

  const thousands = ["", "هزار", "میلیون", "میلیارد", "تریلیون"];

  function convertBelowThousand(n) {
    let result = [];

    if (n >= 100) {
      result.push(hundreds[Math.floor(n / 100)]);
      n %= 100;
    }

    if (n >= 10 && n <= 19) {
      result.push(teens[n - 10]);
    } else {
      if (n >= 20) {
        result.push(tens[Math.floor(n / 10)]);
        n %= 10;
      }
      if (n > 0) {
        result.push(ones[n]);
      }
    }

    return result.join(" و ");
  }

  let words = [];
  let groupIndex = 0;

  while (num > 0) {
    const chunk = num % 1000;
    if (chunk !== 0) {
      words.unshift(
        `${convertBelowThousand(chunk)} ${thousands[groupIndex]}`.trim()
      );
    }
    num = Math.floor(num / 1000);
    groupIndex++;
  }

  return words.join(" و ");
}
//=======================================================================
  
    const goToHome = () => {
      navigate("/");
    };
    const formatPrice = (v) =>
      v === null || v === undefined
        ? ""
        : Math.trunc(Number(v)).toLocaleString("fa-ir");
  


    return (  

    <div style={{ width: "100%", padding: 5, direction: "rtl" }}>

      <h4 className="Titlem" >خلاصه مالی حق الزحمه مشاوران</h4>
    <div className="mb-1 d-flex gap-0">
        <button className="btn btn-secondary" onClick={goToHome}>   
        مرحله بعد
        </button>
       
       
    </div>

    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        direction: "rtl",
        fontFamily: "Tahoma",
        tableLayout: "fixed",
        fontSize: "13px"
      }}>

     <thead>
        <tr>
          <td className="Title" width= "5 %">     شماره فصل </td>
          <td className="Title" width= "30 %">    شرج فصل  </td>
          <td className="Title" width= "10 %">   مبلغ قراردادی (ریال)   </td>
          <td className="Title" width= "10 %"> مبلغ تجمعی تائید شده قبلی (ریال)  </td>
          <td className="Title" width= "10 %">    حق الزحمه این ماه مشاور(ریال)  </td>
          <td className="Title" width= "35 %">  مبلغ به حروف (ریال)     </td>
       </tr>
    
      </thead>

        <tbody>        
        <tr>
          <td className="cream" font="bold">2</td>
          <td className="cream">خدمات نظارت قبل از اجرا</td>
          <td className="cream">{formatPrice(localStorage.getItem("field_10"))}</td>
          <td className="cream">{formatPrice(localStorage.getItem("field_24"))}</td>
          <td className="cream">{formatPrice(localStorage.getItem("Final_befor"))}</td>
          <td className="cream">{numberToPersianWords(localStorage.getItem("Final_befor"))} ریال</td>
        </tr>   
      </tbody>
    
      <tbody>
  <tr>
    <td className="cream" rowSpan={3}>3</td>
    <td className="cream">خدمات نظارت ماهانه حین اجرا (فنی و پشتیبانی دفتر مرکزی)</td>
    <td className="cream">{formatPrice(localStorage.getItem("field_11"))}</td>
    <td className="cream">{formatPrice(localStorage.getItem("field_25"))}</td>
    <td className="cream">{formatPrice(localStorage.getItem("Final_durring"))}</td>
    <td className="cream">{numberToPersianWords(localStorage.getItem("Final_durring"))} ریال</td>
  </tr>

  <tr>
    {/* ستون اول حذف شد، بقیه ستون‌ها همون ترتیب */}
    <td className="cream">خدمات نظارت موردی حین اجرا (فنی و پشتیبانی دفتر مرکزی)</td>
    <td className="cream">{formatPrice(localStorage.getItem("field_12"))}</td>
    <td className="cream">{formatPrice(localStorage.getItem("field_26"))}</td>
    <td className="cream">{formatPrice(localStorage.getItem("Final_case"))}</td>
    <td className="cream">{numberToPersianWords(localStorage.getItem("Final_case"))} ریال</td>
  </tr>

  <tr>
    <td className="cream">خدمات نظارت فنی کارگاهی</td>
    <td className="cream">{formatPrice(localStorage.getItem("field_13"))}</td>
    <td className="cream">{formatPrice(localStorage.getItem("field_27"))}</td>
    <td className="cream">{formatPrice(localStorage.getItem("Final_site"))}</td>
    <td className="cream">{numberToPersianWords(localStorage.getItem("Final_site"))} ریال</td>
  </tr>
</tbody>

      <tbody>        
        <tr>
          <td className="cream" font="bold" >4</td>
          <td className="cream">خدمات نظارت بعد از اجرا</td>
          <td className="cream">{formatPrice(localStorage.getItem("field_14"))}</td>
          <td className="cream">{formatPrice(localStorage.getItem("field_28"))}</td>
          <td className="cream">{formatPrice(localStorage.getItem("Final_befor"))}</td>
          <td className="cream">{numberToPersianWords(localStorage.getItem("Final_befor"))} ریال</td>
        </tr>   
      </tbody>

      <tbody>        
        <tr>
          <td className="cream" font="bold" >5</td>
          <td className="cream">خدمات نظارت پشتیبانی</td>
          <td className="cream">{formatPrice(localStorage.getItem("field_15"))}</td>
          <td className="cream">{formatPrice(localStorage.getItem("field_29"))}</td>
          <td className="cream">{formatPrice(localStorage.getItem("Final_support"))}</td>
          <td className="cream">{numberToPersianWords(localStorage.getItem("Final_support"))} ریال</td>
        </tr>   
      </tbody>

      <tbody>        
        <tr>
          <td className="cream" style={{ fontWeight: "bold" }} colSpan={2}>جمع کل حق الزحمه مشاور</td>
         {/* <td className="cream"></td>*/}
          <td className="cream">{formatPrice(localStorage.getItem("field_14"))}</td>
          <td className="cream">{formatPrice(localStorage.getItem("field_28"))}</td>
          <td className="cream">{formatPrice(localStorage.getItem("Final_befor"))}</td>
          <td className="cream">{numberToPersianWords(localStorage.getItem("Final_befor"))} ریال</td>
        </tr>   
      </tbody>
            
    </table> 
    </div> 
    );
}
