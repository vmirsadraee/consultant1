from docx import Document
from docx.shared import Pt, Cm, RGBColor
from docx.enum.text import WD_UNDERLINE, WD_COLOR_INDEX, WD_PARAGRAPH_ALIGNMENT
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from typing import Optional, Union

# ---------- تابع جادویی برای راست‌به‌چپ کردن کل سند ----------
def force_document_rtl(doc):
    for section in doc.sections:
        sectPr = section._sectPr
        for b in sectPr.xpath('./w:bidi'):
            sectPr.remove(b)
        bidi = OxmlElement('w:bidi')
        bidi.set(qn('w:val'), '1')
        sectPr.append(bidi)

    style = doc.styles['Normal']
    pPr = style._element.get_or_add_pPr()
    for jc in pPr.xpath('./w:jc'):
        pPr.remove(jc)
    for b in pPr.xpath('./w:bidi'):
        pPr.remove(b)

    jc = OxmlElement('w:jc')
    jc.set(qn('w:val'), 'right')
    pPr.append(jc)
    bidi = OxmlElement('w:bidi')
    bidi.set(qn('w:val'), '1')
    pPr.append(bidi)

# ---------- تابع راست نویس پاراگراف ----------
def set_paragraph_rtl(p):
    pPr = p._element.get_or_add_pPr()
    bidi = OxmlElement('w:bidi')
    bidi.set(qn('w:val'), '1')
    pPr.append(bidi)

# ---------- تابع تنظیمات فونت و استایل ----------
def set_run_rtl(run, font_name="B Nazanin", size=13, bold=False, italic=False, underline=False, color_rgb=None):
    if font_name:
        run.font.name = font_name
    if size:
        run.font.size = Pt(size)
    run.bold = bold
    run.italic = italic
    if underline:
        run.underline = underline
    if color_rgb:
        run.font.color.rgb = RGBColor.from_string(color_rgb)

# ---------- تابع افزودن جدول ----------
def add_persian_table(doc, data):
    # کدهای مربوط به جدول را اینجا قرار دهید...
    pass
