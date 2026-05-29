import React , { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Page.css";

export default function Invoicepage() {

  const [durringprice_befor , setTototalPrice_durring] = useState(0);
  const [siteprice_befor    , setTototalPrice_site] = useState(0);

   const [a1, setCoefficient1] = useState(0);
   const [a2, setCoefficient2] = useState(0);
   const [a3, setCoefficient3] = useState(0);
   const [a4, setCoefficient4] = useState(0);
   const [a5, setCoefficient5] = useState(0);
   const [a6, setCoefficient6] = useState(0);
   const [a7, setCoefficient7] = useState(0);
   const [a8, setCoefficient8] = useState(0);
   const [a9, setCoefficient9] = useState(0);

   const navigate = useNavigate();

     // بارگذاری ضرایب a و b
       useEffect(() => {
         const a1  = localStorage.getItem("field_7"); 
         if (a1) setCoefficient1(Number(a1));
         const a2 = localStorage.getItem("billpage_field_3"); // کارکرد اصلاح شده پیمانکار در این ماه
         if (a2) setCoefficient2(Number(a2));
         const a3 = localStorage.getItem("field_11"); 
         if (a3) setCoefficient3(Number(a3)); 
         const a4 = localStorage.getItem("field_20"); //ضریب ویژگی کار
         if (a4) setCoefficient4(Number(a4));
         const a5 = localStorage.getItem("field_22"); // تردد کارگاهی
         if (a5) setCoefficient5(Number(a5));
         const a6 = localStorage.getItem("field_23"); // منطقه ای
         if (a6) setCoefficient6(Number(a6));
         const a7 = localStorage.getItem("field_21"); // ضذریب تطابق
         if (a7) setCoefficient7(Number(a7));
         const a8 = localStorage.getItem("field_8"); //صقف معاملات کوچک
         if (a8) setCoefficient8(Number(a8));
         
         const durringprice_befor = localStorage.getItem("totalPrice_durring");
         if (durringprice_befor) { setTototalPrice_durring(Number(durringprice_befor));}  
         
         const siteprice_befor = localStorage.getItem("totalPrice_site");
         if (siteprice_befor) { setTototalPrice_site(Number(siteprice_befor));}    
      
       }, []);
       
   



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

      <h4>خلاصه مالی حق الزحمه مشاوران</h4>
    <div className="mb-1 d-flex gap-0">
        <button className="btn btn-secondary" onClick={goToHome}>   
        گزارش - Excel
        </button>
    
        <button className="btn btn-secondary" onClick={goToHome}>   
        گزارش -Word
        </button>
        
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
