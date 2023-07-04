const name = /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/;

const mail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

const nineDigits = /^($)|(^\d{9}$)/;

const regExp = {
  name,
  mail,
  nineDigits,
};

export default regExp;
