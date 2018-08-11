function remove_first_char (part, index, arr) {
  arr[index] = arr[index].substring(1);
}

function check_match (arr, code) {
  if (arr) {
    if (arr.indexOf(code) > -1) {
      return "match";
    }
    return "nomatch";
  }
  return "error";
}

function check_code (text) {
  var retval = validate_and_getmap(text);
  if (retval === false) {
    return;
  }
  var code = retval["code"];

  var result = check_match(retval["check_yearmonth"]["10M"], code);
  if (result === "match") {
      success("You won NTD 10 million");
      return;
  } else if (result === "error") {
    error("Error: Special Not Defined");
    return;
  }

  result = check_match(retval["check_yearmonth"]["2M"], code);
  if (result === "match") {
      success("You won NTD 2 million");
      return;
  } else if (result === "error") {
    error("Error: Grand Not Defined");
    return;
  }

  var first_arr = retval["check_yearmonth"]["200K"].slice();
  result = check_match(first_arr, code);
  if (result === "match") {
      success("You won NTD 200,000");
      return;
  } else if (result === "error") {
    error("Error: First Not Defined");
    return;
  } else if (result === "nomatch") {
    first_arr.forEach(remove_first_char);
    result = check_match(first_arr, code.substring(1));
    if (result === "match") {
      success("You won NTD 40,000");
      return;
    }
    first_arr.forEach(remove_first_char);
    result = check_match(first_arr, code.substring(2));
    if (result === "match") {
      success("You won NTD 10,000");
      return;
    }
    first_arr.forEach(remove_first_char);
    result = check_match(first_arr, code.substring(3));
    if (result === "match") {
      success("You won NTD 4000");
      return;
    }
    first_arr.forEach(remove_first_char);
    result = check_match(first_arr, code.substring(4));
    if (result === "match") {
      success("You won NTD 1000");
      return;
    }
    first_arr.forEach(remove_first_char);
    result = check_match(first_arr, code.substring(5));
    if (result === "match") {
      success("You won NTD 200");
      return;
    }
  }

  result = check_match(retval["check_yearmonth"]["200"], code.substring(5));
  if (result === "match") {
      success("You won NTD 200");
      return;
  } else if (result === "error") {
    error("Error: Additional Not Defined");
    return;
  }
  nomatch();
}

function check(text_element) {
  if (event.keyCode === 27) {
    clear();
    return;
  } else if (!run_once && event.keyCode === 13) {
    run_once = true;
    if (text_element.value.length === 3) {
      short_check = true;
      check_code("0000000" + text_element.value + "10611");
      setTimeout(function(){check_code("0000000" + text_element.value + "10701");},50);
      setTimeout(function(){check_code("0000000" + text_element.value + "10703");},100);
      setTimeout(function(){check_code("0000000" + text_element.value + "10705");},150);
    } else {
      short_check = false;
      check_code(text_element.value);
    }
    setTimeout(function(){clear();},1000);
  }
}
