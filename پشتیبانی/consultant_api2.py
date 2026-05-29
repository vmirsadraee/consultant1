from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
from sqlalchemy import create_engine
import os
import numpy as np

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SQLITE_FILE = os.path.join(BASE_DIR, "consultant-database.sqlite")
engine = create_engine(f"sqlite:///{SQLITE_FILE}")


#   ------------- خواندن اطلاعات از react ----------------
@app.route("/data", methods=["GET"])
def get_data():

    # خواندن پارامتر tablename از query string
    tablename = request.args.get("table")  # 'table' نام پارامتر است
    if not tablename:
        return {"error": "پارامتر tablename ارسال نشده است"}, 400

    print(f"Received table name: {tablename}")
    # مثلاً از دیتابیس بخوانید یا پردازش کنید
    return {"status": "success", "table": tablename}


#   ------------- ایجاد دیتابیس مورد نظر ----------------


@app.route("/befor")
def get_before():
    df = pd.read_sql("SELECT * FROM " + tablename + " WHERE type_s = 'befor'", engine)

    df = df.replace({np.nan: None})

    for col in df.select_dtypes(include=["datetime64[ns]"]).columns:
        df[col] = df[col].astype(str)

    return jsonify(df.to_dict(orient="records"))


# ----------- حین اجرا -----------
@app.route("/Durringpage")
def get_Durringpage():
    df = pd.read_sql("SELECT * FROM " + tablename + " WHERE type_s = 'monthly'", engine)

    df = df.replace({np.nan: None})

    for col in df.select_dtypes(include=["datetime64[ns]"]).columns:
        df[col] = df[col].astype(str)

    return jsonify(df.to_dict(orient="records"))


# ----------- موردی -----------
@app.route("/Casepage")
def get_Casepage():
    df = pd.read_sql("SELECT * FROM " + tablename + " WHERE type_s = 'special'", engine)

    df = df.replace({np.nan: None})

    for col in df.select_dtypes(include=["datetime64[ns]"]).columns:
        df[col] = df[col].astype(str)

    return jsonify(df.to_dict(orient="records"))


# ----------- بعد از اجرا -----------
@app.route("/Afterpage")
def get_Afterpage():
    df = pd.read_sql("SELECT * FROM " + tablename + " WHERE type_s = 'after'", engine)

    df = df.replace({np.nan: None})

    for col in df.select_dtypes(include=["datetime64[ns]"]).columns:
        df[col] = df[col].astype(str)

    return jsonify(df.to_dict(orient="records"))


# -----------  محاسبات صورت وضعیت پیمانکاران- ----------
@app.route("/Billpage")
def get_Billpage():
    df = pd.read_sql("SELECT * FROM contractor_bill", engine)

    df = df.replace({np.nan: None})

    for col in df.select_dtypes(include=["datetime64[ns]"]).columns:
        df[col] = df[col].astype(str)

    return jsonify(df.to_dict(orient="records"))


@app.route("/Supportpage")
def get_Supportpage():
    df = pd.read_sql("SELECT * FROM " + tablename + " WHERE type_s ='support'", engine)

    df = df.replace({np.nan: None})

    for col in df.select_dtypes(include=["datetime64[ns]"]).columns:
        df[col] = df[col].astype(str)

    return jsonify(df.to_dict(orient="records"))


@app.route("/download-excel")
def download_excel():
    return send_from_directory(BASE_DIR, "a.xlsx", as_attachment=True)


# ----------- اجرای برنامه -----------
if __name__ == "__main__":
    app.run(port=5000, debug=True)
