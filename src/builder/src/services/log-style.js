/* eslint-disable no-useless-escape */
let ffSupport;
let formats;
let getOrderedMatches;
let hasMatches;
let isFF;
let isIE;
let isOpera;
let isSafari;
let makeArray;
let operaSupport;
let safariSupport;
let stringToArgs;
let _log;

export const log = function () {
  let args;
  args = [];
  makeArray(arguments).forEach((arg) => {
    if (typeof arg === 'string') {
      return args = args.concat(stringToArgs(arg));
    }
    return args.push(arg);

  });
  return _log.apply(window, args);
};
_log = function () {
  return console.log.apply(console, makeArray(arguments));
};
makeArray = function (arrayLikeThing) {
  return Array.prototype.slice.call(arrayLikeThing);
};
formats = [
  {
    regex: /\*([^\*]+)\*/,
    replacer(m, p1) {
      return `%c${p1}%c`;
    },
    styles() {
      return ['font-style: italic', ''];
    },
  }, {
    regex: /\_([^\_]+)\_/,
    replacer(m, p1) {
      return `%c${p1}%c`;
    },
    styles() {
      return ['font-weight: bold', ''];
    },
  }, {
    regex: /\`([^\`]+)\`/,
    replacer(m, p1) {
      return `%c${p1}%c`;
    },
    styles() {
      return ['background: rgb(255, 255, 219); padding: 1px 5px; border: 1px solid rgba(0, 0, 0, 0.1)', ''];
    },
  }, {
    regex: /\[c\=(?:\"|\')?((?:(?!(?:\"|\')\]).)*)(?:\"|\')?\]((?:(?!\[c\]).)*)\[c\]/,
    replacer(m, p1, p2) {
      return `%c${p2}%c`;
    },
    styles(match) {
      return [match[1], ''];
    },
  },
];
hasMatches = function (str) {
  let _hasMatches;
  _hasMatches = false;
  formats.forEach((format) => {
    if (format.regex.test(str)) {
      return _hasMatches = true;
    }
  });
  return _hasMatches;
};
getOrderedMatches = function (str) {
  let matches;
  matches = [];
  formats.forEach((format) => {
    let match;
    match = str.match(format.regex);
    if (match) {
      return matches.push({
        format,
        match,
      });
    }
  });
  return matches.sort((a, b) => a.match.index - b.match.index);
};
stringToArgs = function (str) {
  let firstMatch; let matches; let
    styles;
  styles = [];
  while (hasMatches(str)) {
    matches = getOrderedMatches(str);
    firstMatch = matches[0];
    str = str.replace(firstMatch.format.regex, firstMatch.format.replacer);
    styles = styles.concat(firstMatch.format.styles(firstMatch.match));
  }
  return [str].concat(styles);
};
isSafari = function () {
  return /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
};
isOpera = function () {
  return /OPR/.test(navigator.userAgent) && /Opera/.test(navigator.vendor);
};
isFF = function () {
  return /Firefox/.test(navigator.userAgent);
};
isIE = function () {
  return /MSIE/.test(navigator.userAgent);
};
safariSupport = function () {
  let m;
  m = navigator.userAgent.match(/AppleWebKit\/(\d+)\.(\d+)(\.|\+|\s)/);
  if (!m) {
    return false;
  }
  return parseInt(m[1], 10) + (parseInt(m[2], 10) / 100) >= 537.38;
};
operaSupport = function () {
  let m;
  m = navigator.userAgent.match(/OPR\/(\d+)\./);
  if (!m) {
    return false;
  }
  return parseInt(m[1], 10) >= 15;
};
ffSupport = function () {
  return window.console.firebug || window.console.exception;
};
// if (isIE() || (isFF() && !ffSupport()) || (isOpera() && !operaSupport()) || (isSafari() && !safariSupport())) {
//   window.log = _log;
// } else {
//   window.log = log;
// }
// window.log.l = _log;
