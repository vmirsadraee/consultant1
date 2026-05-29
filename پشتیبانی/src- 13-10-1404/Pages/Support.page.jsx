import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import "./Page.css";

export default function Supportpage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [manualForm, setManualForm] = useState({
    serial: "",
    subject: "",
    deliver: "",
    unitprice: "",
  });

  const navigate = useNavigate();
   const goTonext = () => {
    navigate("/Billpage");
  };

 
  /* =========================
     بارگذاری اولیه ردیف‌ها
     ========================= */
  useEffect(() => {
    const saved = localStorage.getItem("monitoringRows_Support");
    if (saved) {
      setRows(JSON.parse(saved));
      setLoading(false);
    } else {
      fetch("http://127.0.0.1:5000/Supportpage")
        .then((res) => res.json())
        .then((data) => {
          const mapped = (Array.isArray(data) ? data : []).map((r) => ({
            ...r,
            // c: r.c ?? 0, 
            
            isManual: false,
          }));
          setRows(mapped);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, []);


 /* =========================
     ذخیره خودکار
     ========================= */
  useEffect(() => {
    if (!loading) {
      localStorage.setItem("monitoringRows_Support", JSON.stringify(rows));
    }
  }, [rows, loading]);

  /* =========================
     فرمت‌ها
     ========================= */
  const formatInteger = (v) =>
    v === null || v === undefined
      ? ""
      : Math.trunc(Number(v)).toLocaleString("fa-ir", {
          useGrouping: false,
        });

  const formatPrice = (v) =>
    v === null || v === undefined
      ? ""
      : Math.trunc(Number(v)).toLocaleString("fa-ir");

  /* =========================
     محاسبه قیمت هر ردیف
     ========================= */
  const getCalculatedPrice = useCallback(
    (row) => {
      const unit = Number(row.unitprice);
      const cVal = Number(row.c);

      if (!row.calculate) return 0;
      if (!unit || !cVal ) return 0;

      return Math.trunc( cVal * unit);
    },
    []
  );
  /* =========================
     جمع کل (FIX useMemo)
     ========================= */
  const totalCalculatedPrice = useMemo(() => {
    if (!rows.length) return 0;

    return rows.reduce(
      (sum, r) => sum + getCalculatedPrice(r),
      0
    );
  }, [rows, getCalculatedPrice]);

  useEffect(() => {
    localStorage.setItem(
      "Final_support",
      totalCalculatedPrice.toString()
    );
  }, [totalCalculatedPrice]);

  /* =========================
     افزودن ردیف دستی
     ========================= */
  const addManualRow = () => {
    if (manualForm.unitprice === "" || isNaN(Number(manualForm.unitprice))) {
      alert("قیمت واحد باید عدد معتبر باشد");
      return;
    }

    const newRow = {
      ID: `manual-${Date.now()}`,
      serial: manualForm.serial,
      subject: manualForm.subject,
      unitprice: Number(manualForm.unitprice),
           
      isManual: true,
    };

    setRows((prev) => [...prev, newRow]);
    setShowModal(false);
    setManualForm({
      serial: "",
      subject: "",
      unitprice: "",
    });
  };

  const removeManualRows = () => {
    if (!window.confirm("آیا از حذف ردیف‌های دستی مطمئن هستید؟")) return;
    setRows((prev) => prev.filter((r) => !r.isManual));
  };

  
const clearGrid = () => {
  if (window.confirm("داده‌های جدول پاک شود؟")) {
    localStorage.removeItem("monitoringRows_support");
    setRows([]);
     fetch("http://127.0.0.1:5000/Supportpage")
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

  /* =========================
     ستون‌ها
     ========================= */
  const columns = [
    {
      field: "serial",
      headerName: "شماره ردیف",
      width: 160,
      headerClassName: "header",
      align: "center",
      headerAlign: "center",
      renderCell: (p) => formatInteger(p.value),
      cellClassName: (params) =>
        params.row.calculate === 0 ? "row-zero" : "row-normal",
    },
    
    {
      field: "subject",
      headerName: "شرح",
      width: 530,
      headerClassName: "header",
      align: "right",
      Height:"auto",
      headerAlign: "center",
      cellClassName: (params) =>
        params.row.calculate === 0 ? "row-zero" : "row-normal",
      renderCell: (p) => (
        <div className="wrap-cell" style={{ direction: "rtl", whiteSpace: "normal"  }}>
          {p.value}</div> ),    
    },
    {
      field: "unitprice",
      headerName: "قیمت واحد",
      width: 180,
      headerClassName: "header",
      align: "center",
      headerAlign: "center",
      cellClassName: (params) =>
        params.row.calculate === 0 ? "row-zero" : "row-normal",
      renderCell: (p) => formatPrice(p.value),
    },
    {
      field: "c",
      headerName: "تعداد",
      width: 100,
      headerClassName: "header",
      type: "number",
      editable: (params) => params.row.calculate !== 0,
      align: "center",
      headerAlign: "center",
      cellClassName: (params) =>
        params.row.calculate === 0 ? "row-zero" : "row-normal",
    },
    {
      field: "totalprice",
      headerName: "قیمت نهایی",
      width: 200,
      headerClassName: "header",
      align: "center",
      headerAlign: "center",
      cellClassName: (params) =>
        params.row.calculate === 0 ? "row-zero" : "row-normal",
      renderCell: (p) =>
        p.row.calculate
          ? formatPrice(getCalculatedPrice(p.row))
          : "",
    },
  ];

  if (loading) return <h4>در حال بارگذاری...</h4>;
 return (
    <div style={{ padding: 20, direction: "rtl" }}>
      <div className="d-flex justify-content-between mb-2">
        <h4 className="Titlem">خدمات پشتیبانی مشاور</h4>
        <strong>
          مجموع: {formatPrice(totalCalculatedPrice)} ریال
        </strong>
      </div>

      <div className="mb-3 d-flex gap-2">
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          افزودن ردیف
        </button>
        <button className="btn btn-warning" onClick={removeManualRows}>
          حذف ردیف دستی
        </button>
        <button className="btn btn-outline-light" onClick={clearGrid}>
       صفحه جدید
       </button>
        <button className="btn btn-secondary" onClick={() => navigate("/Invoicepage")}>
          مرحله بعد
        </button>
      </div>

<DataGrid
  rows={rows}
  columns={columns}
  getRowId={(r) => r.ID}
  pageSizeOptions={[10]}
  editMode="cell"
  width="100%"
  getRowHeight={(params) => {
    if (!params?.row) return 52;
    return params.row.calculate === 0 ? 120 : 'auto';
  }}
  processRowUpdate={(updatedRow) => {
    setRows((prevRows) =>
      prevRows.map((r) =>
        r.ID === updatedRow.ID ? updatedRow : r
      )
    );

    return updatedRow;
  }}
  sx={{
    '& .MuiDataGrid-cell': {
      whiteSpace: 'normal',
      lineHeight: '1.4',
      alignItems: 'flex-start',
      py: 1,
    },
  }}
/>



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
    </div>
  );
}