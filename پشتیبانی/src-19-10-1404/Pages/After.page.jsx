import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import "./Page.css";

export default function Afterpage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editPriceRow, setEditPriceRow] = useState(null);
  const [priceInput, setPriceInput] = useState("");
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [manualForm, setManualForm] = useState({
    serial: "",
    subject: "",
    deliver: "",
    unitprice: "",
  });

  const [a, setCoefficient1] = useState(0);
  const navigate = useNavigate();

  const faToEn = (str) =>
  str.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));

  const formatPriceInput = (value) => {
  const cleaned = faToEn(value).replace(/[^\d]/g, "");
  if (!cleaned) return "";
  return Number(cleaned).toLocaleString("fa-IR");
  };


  // بارگذاری اولیه داده‌ها
  
  useEffect(() => {
    const savedRows1 = localStorage.getItem("monitoringRows_after");
    if (savedRows1) {
      setRows(JSON.parse(savedRows1));
      setLoading(false);
    } else {
      fetch("http://127.0.0.1:5000/Afterpage")
        .then((res) => res.json())
        .then((data) => {
          const mapped = (Array.isArray(data) ? data : []).map((r) => ({
            ...r,
            enableCalc: false,
            isManual: false,
          }));
          setRows(mapped);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, []);

  // بارگذاری ضرایب a و b
  useEffect(() => {
    const a  = localStorage.getItem("field_19");
    if (a) setCoefficient1(Number(a));
    }, []);
    
  // ذخیره خودکار لوکال
  useEffect(() => {
    if (!loading) {
      localStorage.setItem("monitoringRows_after", JSON.stringify(rows));
    }
  }, [rows, loading]);

  // فرمت اعداد
  const formatInteger = (v) =>
    v === null || v === undefined
      ? ""
      : Math.trunc(Number(v)).toLocaleString("fa-ir", { useGrouping: false });

  const formatPrice = (v) =>
    v === null || v === undefined
      ? ""
      : Math.trunc(Number(v)).toLocaleString("fa-ir");

  const getCalculatedPrice = (row) => {
    if (row.calculate === 0) return null;
    if ((row.calculate === 1 || row.calculate === 2) && row.enableCalc) {
      const unit = Number(row.unitprice);
      if (isNaN(unit)) return "";
      return Math.trunc(a *  unit);
    }
    return "";
  };

  // دکمه‌ها
  const enableAllValidCalculations = () => {
    setRows((prev) =>
      prev.map((r) => {
        if (r.calculate === 1) return { ...r, enableCalc: true };
        if (r.calculate === 2 && Number(r.unitprice) > 0)
          return { ...r, enableCalc: true };
        return r;
      })
    );
  };

  const disableAllCalculations = () => {
    setRows((prev) =>
      prev.map((r) =>
        r.calculate === 1 || r.calculate === 2
          ? { ...r, enableCalc: false }
          : r
      )
    );
  };

  const addManualRow = () => {
    if (manualForm.unitprice === "" || isNaN(Number(manualForm.unitprice))) {
      alert("قیمت واحد باید یک عدد معتبر باشد!");
      return;
    }
    const newRow = {
      ID: `manual-${Date.now()}`,
      serial: manualForm.serial,
      subject: manualForm.subject,
      deliver: manualForm.deliver,
      unitprice: manualForm.unitprice,
      calculate: 1,
      enableCalc: true,
      isManual: true,
    };
    setRows((prev) => [...prev, newRow]);
    setShowModal(false);
    setManualForm({ serial: "", subject: "", deliver: "", unitprice: "" });
  };

  const removeManualRows = () => {
    const confirmDelete = window.confirm("آیا می‌خواهید این ردیف را حذف نمائید؟");
    if (!confirmDelete) return;
    setRows((prev) => prev.filter((r) => !r.isManual));
  };

  const goTonext = () => {
    navigate("/Billpage");
  };

   
  const totalCalculatedPrice = rows.reduce((sum, r) => {
    const val = getCalculatedPrice(r);
    return sum + (val || 0);
  }, 0);
  
  
const clearGrid = () => {
  if (window.confirm("داده‌های جدول پاک شود؟")) {
    localStorage.removeItem("monitoringRows_after");
    setRows([]);
     fetch("http://127.0.0.1:5000/Afterpage")
        .then((res) => res.json())
        .then((data) => {
          const mapped = (Array.isArray(data) ? data : []).map((r) => ({
            ...r,
            enableCalc: false,
            isManual: false,
          }));
          setRows(mapped);
          setLoading(false);
        })
        .catch(() => setLoading(false));
  }
};

const handleSubmitPrice = () => {
  if (!editPriceRow) return;

  const numericPrice = Number(
    faToEn(priceInput).replace(/[^\d]/g, "")
  );

  if (!numericPrice || numericPrice <= 0) {
    alert("قیمت باید عدد مثبت باشد");
    return;
  }

  setRows((prev) =>
    prev.map((r) =>
      r.ID === editPriceRow.ID
        ? { ...r, unitprice: numericPrice }
        : r
    )
  );

  setEditPriceRow(null);
  setPriceInput("");
};

  // ستون‌های DataGrid
  const columns = [
    {
      field: "serial",
      headerName: "شماره ردیف",
      width: 150,
      headerClassName: "header",
      headerAlign: "center",
      align: "center",
      cellClassName: (params) =>
        params.row.calculate === 0 ? "row-zero" : "row-normal",
      renderCell: (p) => formatInteger(p.value),
    },
{
      field: "subject",
      headerName: "شرح ردیف",
      width: 430,
      headerClassName: "header",
      headerAlign: "center",
      align: "right",
      cellClassName: (params) =>
        params.row.calculate === 0 ? "row-zero" : "row-normal",
      renderCell: (p) => (
        <div className="wrap-cell" style={{ direction: "rtl", whiteSpace: "normal"  }}>{p.value}</div>
      ),
    },
    {
      field: "deliver",
      headerName: "تحویل شدنی",
      width: 140,
      headerClassName: "header",
      headerAlign: "center",
      align: "right",
      cellClassName: (params) =>
        params.row.calculate === 0 ? "row-zero" : "row-normal",
    },
    {
      field: "unitprice",
      headerName: "قیمت واحد",
      width: 120,
      headerClassName: "header",
      headerAlign: "center",
      align: "center",
      cellClassName: (params) =>
        params.row.calculate === 0 ? "row-zero" : "row-normal",
      renderCell: (p) => formatPrice(p.value),
    },
    {
      field: "a",
      headerName: "اصلاح",
      width: 80,
      headerClassName: "header",
      headerAlign: "center",
      align: "center",
      cellClassName: (params) =>
        params.row.calculate === 0 ? "row-zero" : "row-normal",
      renderCell: (p) => (p.row.calculate !== 0 && p.row.enableCalc ? a : ""),
    },
  
    {
      field: "totalprice",
      headerName: "قیمت نهایی",
      width: 150,
      headerClassName: "header",
      headerAlign: "center",
      align: "center",
      cellClassName: (params) =>
        params.row.calculate === 0 ? "row-zero" : "row-normal",
      renderCell: (p) => formatPrice(getCalculatedPrice(p.row)),
    },
    {
      field: "enableCalc",
      headerName: "انتخاب ردیف",
      headerClassName: "header",
      headerAlign: "center",
      align: "center",
      cellClassName: (params) =>
        params.row.calculate === 0 ? "row-zero" : "row-normal",
      renderCell: (p) =>
        p.row.calculate === 0 ? null : (
          <input
            type="checkbox"
            checked={p.row.enableCalc}
            onChange={(e) =>
              setRows((prev) =>
                prev.map((r) =>
                  r.ID === p.row.ID ? { ...r, enableCalc: e.target.checked } : r
                )
              )
            }
          />
        ),
    },
  ];

  if (loading) return <h3>در حال بارگذاری...</h3>;

  return (
    <div style={{ width: "100%", padding: 20, direction: "rtl" }}>
      <div className="d-flex justify-content-between mb-2">
        <h4 className="Titlem rtl">نظارت بعد از اجرا</h4>
        <strong>
          مجموع: {totalCalculatedPrice.toLocaleString("fa-ir")} ریال
        </strong>
      </div>
 {/* دکمه‌ها */}
      <div className="mb-3 d-flex gap-2">
        <button className="btn btn-success" onClick={enableAllValidCalculations}>
          انتخاب همه
        </button>
        <button className="btn btn-danger" onClick={disableAllCalculations}>
          پاک کردن همه
        </button>
        
         <button className="btn btn-info" onClick={() => {
         if (!selectedRowId) { alert("یک ردیف برای ویرایش انتخاب کنید"); return; }
         const row = rows.find(r => r.ID === selectedRowId);
         setEditPriceRow(row);
         setPriceInput(row.unitprice ? formatPrice(row.unitprice) : "");
         }}>ویرایش قیمت</button>
       
     
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          افزودن ردیف جدید
        </button>
        <button className="btn btn-warning" onClick={removeManualRows}>
          حذف ردیف جدید
        </button>
        <button className="btn btn-outline-light" onClick={clearGrid}>
       صفحه جدید
       </button>
        <button className="btn btn-secondary" onClick={goTonext}>
          مرحله بعد
        </button>
      </div>


      
        <DataGrid
        sx={{
        direction: "rtl",
        '& .MuiDataGrid-virtualScrollerContent': {
        marginLeft: 0,
        },
        }}

        rows={rows}
        columns={columns}
        getRowId={(r) => r.ID}
        pageSize={10}
               getRowHeight={(params) => {
              // چک امن
        if (!params?.row) return 50; // ارتفاع پیش‌فرض
        return params.row.calculate === 0 ? 120 : 'auto'; // تیتر ثابت، بقیه داینامیک
        }}     
        
        getRowClassName={(p) => (p.row.isManual ? "manual-row" : "")}
        onRowClick={(params) => {
       if (params.row.calculate === 2)
       setSelectedRowId(params.row.ID);
       }}

        onCellEditCommit={(params) => {
          setRows((prev) =>
            prev.map((r) =>
              r.ID === params.id ? { ...r, [params.field]: params.value } : r
            )
          );
        }}
        
      />
      

      {/* Modal افزودن ردیف دستی */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-box">
            <h5>افزودن ردیف دستی</h5>
            {["serial", "subject", "deliver", "unitprice"].map((f) => (
              <input
                key={f}
                placeholder={f}
                value={manualForm[f]}
                onChange={(e) =>
                  setManualForm({ ...manualForm, [f]: e.target.value })
                }
              />
            ))}
            <div className="mt-2 d-flex gap-2">
              <button className="btn btn-success" onClick={addManualRow}>
                ثبت
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                انصراف
              </button>
            </div>
          </div>
        </div>
      )}

       {/* Modal ویرایش قیمت */}
      {editPriceRow && (
        <div className="modal-backdrop">
          <div className="modal-box">
            <h5>ویرایش قیمت</h5>
            <input
              value={priceInput}
              onChange={(e) =>
                setPriceInput(formatPriceInput(e.target.value))
              }
              placeholder="قیمت جدید"
            />
            <div className="mt-2 d-flex gap-2">
              <button className="btn btn-success" onClick={handleSubmitPrice}>
                ثبت
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setEditPriceRow(null)}
              >
                انصراف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}