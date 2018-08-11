function error(error_text) {
  var status = document.getElementById("status");
  status.textContent = error_text;
  status.className = "red";
  document.getElementById("checkmark").style.display = "none";
  document.getElementById("cross").style.display = "none";
}

var short_check = false;

function nomatch() {
  if (!short_check) {
    document.getElementById("checkmark").style.display = "none";
    document.getElementById("cross").style.display = "block";
  }
}

function success(success_text) {
  if (short_check) {
    alert("Check Full Ticket!");
    return;
  }
  var status = document.getElementById("status");
  status.textContent = success_text;
  status.className = "green";
  document.getElementById("checkmark").style.display = "block";
  document.getElementById("cross").style.display = "none";
}

var run_once = false;

function clear() {
  run_once = false;
  document.getElementById("check_field").value = "";
  document.getElementById("status").textContent = "";
  document.getElementById("code").textContent = "";
  document.getElementById("yearmonth").textContent = "";
  document.getElementById("checkmark").style.display = "none";
  document.getElementById("cross").style.display = "none";
}

function validate_and_getmap(scanned) {
  var code = scanned.substring(2, 10);
  document.getElementById("code").textContent = code;
  var code_is_valid = /^\d{8}$/.test(code);
  if (!code_is_valid) {
    error("Error: Invalid Data for Code");
    return false;
  }
  var yearmonth = scanned.substring(10, 15);
  document.getElementById("yearmonth").textContent = yearmonth;
  var yearmonth_is_valid = /^[1]\d{4}$/.test(yearmonth);
  if (!yearmonth_is_valid) {
    error("Error: Invalid Data for Year and Month");
    return false;
  }

  var check_yearmonth = yearmonth_map.get(yearmonth);
  if (!check_yearmonth) {
    error("Error: No Data for Year and Month");
    return false;
  }
  return {
    check_yearmonth,
    code
  };
}
