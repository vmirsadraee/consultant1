import React from "react";

const Homepage = () => {
  return (
    <div className="container my-4">

      {/* Header */}
      <div className="row mb-4">
        <div className="col-12 bg-info p-3 rounded text-center">
          <h5 className="Titlem mb-0">به سایت محاسبه حق الزحمه مشاوران خوش آمدید</h5>
        </div>
      </div>

      {/* Content */}
      <div className="row align-items-center">

        {/* Left Column */}
        <div className="col-md-7" dir="rtl">
          <p className="Titlem">
            این برنامه به شما کمک میکند صورت حساب حق الزحمه خود را تهیه نمائید .
          </p>
          <p className="mb-3">
           یک پروژه جدید را شروع نمائید یا اطلاعات قبلی خود را دانلود نمائید . 
          </p>
        </div>

        {/* Right Column */}
        <div className="col-md-5 d-flex flex-column align-items-center" style={{ marginTop: "80px" }}>

          {/* Card for Select + New Project */}
          <div className="card p-4 mt-1 w-75 text-center shadow-sm" >
            <select className="form-select form-select-sm mb-3 text-center">
              <option value="">بخشنامه تنظیم قرارداد</option>
              <option value="1">سال 1400</option>
              <option value="2">سال 1401</option>
              <option value="3">سال 1402</option>
              <option value="3">سال 1403</option>
              <option value="3">سال 1404</option>
            </select>
            
            
            <button type="button" className="btn btn-primary" 
                onClick={() => {
                if (window.confirm("همه داده‌ها پاک شود؟")) {
                localStorage.clear();
                //localStorage.removeItem("monitoringRows_Sitepage");

                 }
                 }}
                    style={{ marginTop: "20px" }} >
              پروژه جدید
            </button>
          
                    
          
          </div>

          <h1>        </h1>
          <h1>          </h1>
          
          {/* Space between buttons */}
          <button
            type="button"
            className="btn btn-success mt-2 w-75" style={{ marginBlockEnd: "20px" }}>
            باز کردن پروژه
          </button>

        </div>
      </div>
    </div>
  );
};

export default Homepage;
