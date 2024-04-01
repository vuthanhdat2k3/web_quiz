
static = localStorage.getItem("static") || null;
if(static === "false") {
  window.location.href = "dang-nhap.html";
  console.log(static);

}