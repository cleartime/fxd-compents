(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(15)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.3.4
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */
/*  */

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}
/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return typeof value === 'string' || typeof value === 'number'
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

var _toString = Object.prototype.toString;

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Remove an item from an array
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /([^-])([A-Z])/g;
var hyphenate = cached(function (str) {
  return str
    .replace(hyphenateRE, '$1-$2')
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase()
});

/**
 * Simple bind, faster than native
 */
function bind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn
}

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 */
function noop () {}

/**
 * Always return false.
 */
var no = function () { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */


/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      return JSON.stringify(a) === JSON.stringify(b)
    } catch (e) {
      // possible circular reference
      return a === b
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated'
];

/*  */

var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "production" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "production" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

var emptyObject = Object.freeze({});

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

var warn = noop;
var tip = noop;
var formatComponentName = (null); // work around flow check

if (false) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.error("[Vue warn]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var name = typeof vm === 'string'
      ? vm
      : typeof vm === 'function' && vm.options
        ? vm.options.name
        : vm._isVue
          ? vm.$options.name || vm.$options._componentTag
          : vm.name;

    var file = vm._isVue && vm.$options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  var generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

function handleError (err, vm, info) {
  if (config.errorHandler) {
    config.errorHandler.call(null, err, vm, info);
  } else {
    if (false) {
      warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    }
    /* istanbul ignore else */
    if (inBrowser && typeof console !== 'undefined') {
      console.error(err);
    } else {
      throw err
    }
  }
}

/*  */
/* globals MutationObserver */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0;
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    } )); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

/**
 * Defer a task to execute it asynchronously.
 */
var nextTick = (function () {
  var callbacks = [];
  var pending = false;
  var timerFunc;

  function nextTickHandler () {
    pending = false;
    var copies = callbacks.slice(0);
    callbacks.length = 0;
    for (var i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }

  // the nextTick behavior leverages the microtask queue, which can be accessed
  // via either native Promise.then or MutationObserver.
  // MutationObserver has wider support, however it is seriously bugged in
  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
  // completely stops working after triggering a few times... so, if native
  // Promise is available, we will use it:
  /* istanbul ignore if */
  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    var p = Promise.resolve();
    var logError = function (err) { console.error(err); };
    timerFunc = function () {
      p.then(nextTickHandler).catch(logError);
      // in problematic UIWebViews, Promise.then doesn't completely break, but
      // it can get stuck in a weird state where callbacks are pushed into the
      // microtask queue but the queue isn't being flushed, until the browser
      // needs to do some other work, e.g. handle a timer. Therefore we can
      // "force" the microtask queue to be flushed by adding an empty timer.
      if (isIOS) { setTimeout(noop); }
    };
  } else if (typeof MutationObserver !== 'undefined' && (
    isNative(MutationObserver) ||
    // PhantomJS and iOS 7.x
    MutationObserver.toString() === '[object MutationObserverConstructor]'
  )) {
    // use MutationObserver where native Promise is not available,
    // e.g. PhantomJS IE11, iOS7, Android 4.4
    var counter = 1;
    var observer = new MutationObserver(nextTickHandler);
    var textNode = document.createTextNode(String(counter));
    observer.observe(textNode, {
      characterData: true
    });
    timerFunc = function () {
      counter = (counter + 1) % 2;
      textNode.data = String(counter);
    };
  } else {
    // fallback to setTimeout
    /* istanbul ignore next */
    timerFunc = function () {
      setTimeout(nextTickHandler, 0);
    };
  }

  return function queueNextTick (cb, ctx) {
    var _resolve;
    callbacks.push(function () {
      if (cb) {
        try {
          cb.call(ctx);
        } catch (e) {
          handleError(e, ctx, 'nextTick');
        }
      } else if (_resolve) {
        _resolve(ctx);
      }
    });
    if (!pending) {
      pending = true;
      timerFunc();
    }
    if (!cb && typeof Promise !== 'undefined') {
      return new Promise(function (resolve, reject) {
        _resolve = resolve;
      })
    }
  }
})();

var _Set;
/* istanbul ignore if */
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */


var uid$1 = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid$1++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var arguments$1 = arguments;

    // avoid leaking arguments:
    // http://jsperf.com/closure-with-arguments
    var i = arguments.length;
    var args = new Array(i);
    while (i--) {
      args[i] = arguments$1[i];
    }
    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
        inserted = args;
        break
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */
var observerState = {
  shouldConvert: true,
  isSettingProps: false
};

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i], obj[keys[i]]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value)) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    observerState.shouldConvert &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
        if (Array.isArray(value)) {
          dependArray(value);
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (false) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (Array.isArray(target) && typeof key === 'number') {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (hasOwn(target, key)) {
    target[key] = val;
    return val
  }
  var ob = (target ).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "production" !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (Array.isArray(target) && typeof key === 'number') {
    target.splice(key, 1);
    return
  }
  var ob = (target ).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "production" !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (false) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (typeof childVal !== 'function') {
      "production" !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        childVal.call(this),
        parentVal.call(this)
      )
    }
  } else if (parentVal || childVal) {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm)
        : undefined;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (parentVal, childVal) {
  var res = Object.create(parentVal || null);
  return childVal
    ? extend(res, childVal)
    : res
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (parentVal, childVal) {
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key in childVal) {
    var parent = ret[key];
    var child = childVal[key];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key] = parent
      ? parent.concat(child)
      : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.computed = function (parentVal, childVal) {
  if (!childVal) { return Object.create(parentVal || null) }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  extend(ret, childVal);
  return ret
};

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    var lower = key.toLowerCase();
    if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
      warn(
        'Do not use built-in or reserved HTML elements as component ' +
        'id: ' + key
      );
    }
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (false) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  }
  options.props = res;
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (false) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if (false) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // handle boolean props
  if (isType(Boolean, prop.type)) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
      value = true;
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldConvert = observerState.shouldConvert;
    observerState.shouldConvert = true;
    observe(value);
    observerState.shouldConvert = prevShouldConvert;
  }
  if (false) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (false) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn(
      'Invalid prop: type check failed for prop "' + name + '".' +
      ' Expected ' + expectedTypes.map(capitalize).join(', ') +
      ', got ' + Object.prototype.toString.call(value).slice(8, -1) + '.',
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    valid = typeof value === expectedType.toLowerCase();
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isType (type, fn) {
  if (!Array.isArray(fn)) {
    return getType(fn) === getType(type)
  }
  for (var i = 0, len = fn.length; i < len; i++) {
    if (getType(fn[i]) === getType(type)) {
      return true
    }
  }
  /* istanbul ignore next */
  return false
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (false) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      "referenced during render. Make sure to declare reactive data " +
      "properties in the data option.",
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' &&
    Proxy.toString().match(/native code/);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

var mark;
var measure;

if (false) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      perf.clearMeasures(name);
    };
  }
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.functionalContext = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
};

var prototypeAccessors = { child: {} };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function () {
  var node = new VNode();
  node.text = '';
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.isCloned = true;
  return cloned
}

function cloneVNodes (vnodes) {
  var len = vnodes.length;
  var res = new Array(len);
  for (var i = 0; i < len; i++) {
    res[i] = cloneVNode(vnodes[i]);
  }
  return res
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      for (var i = 0; i < fns.length; i++) {
        fns[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, cur, old, event;
  for (name in on) {
    cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
      "production" !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (false) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    last = res[res.length - 1];
    //  nested
    if (Array.isArray(c)) {
      res.push.apply(res, normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i)));
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        (last).text += String(c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[res.length - 1] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function ensureCtor (comp, base) {
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  context
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function () {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      "production" !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject(
                 false
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : null
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && isDef(c.componentOptions)) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn, once$$1) {
  if (once$$1) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        this$1.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (arguments.length === 1) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (false) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        cbs[i].apply(vm, args);
      }
    }
    return vm
  };
}

/*  */

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  var defaultSlot = [];
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.functionalContext === context) &&
      child.data && child.data.slot != null
    ) {
      var name = child.data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children);
      } else {
        slot.push(child);
      }
    } else {
      defaultSlot.push(child);
    }
  }
  // ignore whitespace
  if (!defaultSlot.every(isWhitespace)) {
    slots.default = defaultSlot;
  }
  return slots
}

function isWhitespace (node) {
  return node.isComment || node.text === ' '
}

function resolveScopedSlots (
  fns, // see flow/vnode
  res
) {
  res = res || {};
  for (var i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res);
    } else {
      res[fns[i].key] = fns[i].fn;
    }
  }
  return res
}

/*  */

var activeInstance = null;

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // remove reference to DOM nodes (prevents leak)
    vm.$options._parentElm = vm.$options._refElm = null;
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    if (false) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if (false) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure((name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure((name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  vm._watcher = new Watcher(vm, updateComponent, noop);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render
  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update props
  if (propsData && vm.$options.props) {
    observerState.shouldConvert = false;
    if (false) {
      observerState.isSettingProps = true;
    }
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      props[key] = validateProp(key, vm.$options.props, propsData, vm);
    }
    observerState.shouldConvert = true;
    if (false) {
      observerState.isSettingProps = false;
    }
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  // update listeners
  if (listeners) {
    var oldListeners = vm.$options._parentListeners;
    vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, oldListeners);
  }
  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
}

/*  */


var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (false) {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (false) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdateHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdateHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options
) {
  this.vm = vm;
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  false
    ? expOrFn.toString()
    : '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      "production" !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  if (this.user) {
    try {
      value = this.getter.call(vm, vm);
    } catch (e) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    }
  } else {
    value = this.getter.call(vm, vm);
  }
  // "touch" every property so they are all tracked as
  // dependencies for deep watching
  if (this.deep) {
    traverse(value);
  }
  popTarget();
  this.cleanupDeps();
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
var seenObjects = new _Set();
function traverse (val) {
  seenObjects.clear();
  _traverse(val, seenObjects);
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || !Object.isExtensible(val)) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch) { initWatch(vm, opts.watch); }
}

var isReservedProp = {
  key: 1,
  ref: 1,
  slot: 1
};

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  observerState.shouldConvert = isRoot;
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (false) {
      if (isReservedProp[key] || config.isReservedAttr(key)) {
        warn(
          ("\"" + key + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (vm.$parent && !observerState.isSettingProps) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {
      defineReactive$$1(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  observerState.shouldConvert = true;
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    "production" !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var i = keys.length;
  while (i--) {
    if (props && hasOwn(props, keys[i])) {
      "production" !== 'production' && warn(
        "The data property \"" + (keys[i]) + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(keys[i])) {
      proxy(vm, "_data", keys[i]);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  try {
    return data.call(vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  var watchers = vm._computedWatchers = Object.create(null);

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if (false) {
      if (getter === undefined) {
        warn(
          ("No getter function has been defined for computed property \"" + key + "\"."),
          vm
        );
        getter = noop;
      }
    }
    // create internal watcher for the computed property.
    watchers[key] = new Watcher(vm, getter, noop, computedWatcherOptions);

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (false) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (target, key, userDef) {
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = createComputedGetter(key);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop;
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
    if (false) {
      if (methods[key] == null) {
        warn(
          "method \"" + key + "\" has an undefined value in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
    }
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (vm, key, handler) {
  var options;
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  vm.$watch(key, handler, options);
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (false) {
    dataDef.set = function (newData) {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (false) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {
        defineReactive$$1(vm, key, result[key]);
      }
    });
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    // isArray here
    var isArray = Array.isArray(inject);
    var result = Object.create(null);
    var keys = isArray
      ? inject
      : hasSymbol
        ? Reflect.ownKeys(inject)
        : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = isArray ? key : inject[key];
      var source = vm;
      while (source) {
        if (source._provided && provideKey in source._provided) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
    }
    return result
  }
}

/*  */

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  context,
  children
) {
  var props = {};
  var propOptions = Ctor.options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || {});
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var _context = Object.create(context);
  var h = function (a, b, c, d) { return createElement(_context, a, b, c, d, true); };
  var vnode = Ctor.options.render.call(null, h, {
    data: data,
    props: props,
    children: children,
    parent: context,
    listeners: data.on || {},
    injections: resolveInject(Ctor.options.inject, context),
    slots: function () { return resolveSlots(children, context); }
  });
  if (vnode instanceof VNode) {
    vnode.functionalContext = context;
    vnode.functionalOptions = Ctor.options;
    if (data.slot) {
      (vnode.data || (vnode.data = {})).slot = data.slot;
    }
  }
  return vnode
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

// hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (
    vnode,
    hydrating,
    parentElm,
    refElm
  ) {
    if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,
        refElm
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    } else if (vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (false) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  if (isUndef(Ctor.cid)) {
    Ctor = resolveAsyncComponent(Ctor, baseCtor, context);
    if (Ctor === undefined) {
      // return nothing if this is indeed an async component
      // wait for the callback to trigger parent update.
      return
    }
  }

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  data = data || {};

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners
    data = {};
  }

  // merge component management hooks onto the placeholder node
  mergeHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children }
  );
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var vnodeComponentOptions = vnode.componentOptions;
  var options = {
    _isComponent: true,
    parent: parent,
    propsData: vnodeComponentOptions.propsData,
    _componentTag: vnodeComponentOptions.tag,
    _parentVnode: vnode,
    _parentListeners: vnodeComponentOptions.listeners,
    _renderChildren: vnodeComponentOptions.children,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnodeComponentOptions.Ctor(options)
}

function mergeHooks (data) {
  if (!data.hook) {
    data.hook = {};
  }
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var fromParent = data.hook[key];
    var ours = componentVNodeHooks[key];
    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
  }
}

function mergeHook$1 (one, two) {
  return function (a, b, c, d) {
    one(a, b, c, d);
    two(a, b, c, d);
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    "production" !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (isDef(vnode)) {
    if (ns) { applyNS(vnode, ns); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    return
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && isUndef(child.ns)) {
        applyNS(child, ns);
      }
    }
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  if (isDef(ret)) {
    (ret)._isVList = true;
  }
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      extend(props, bindObject);
    }
    return scopedSlotFn(props) || fallback
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes && "production" !== 'production') {
      slotNodes._rendered && warn(
        "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
        "- this will likely cause render errors.",
        this
      );
      slotNodes._rendered = true;
    }
    return slotNodes || fallback
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

/**
 * Runtime helper for checking keyCodes from config.
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInAlias
) {
  var keyCodes = config.keyCodes[key] || builtInAlias;
  if (Array.isArray(keyCodes)) {
    return keyCodes.indexOf(eventKeyCode) === -1
  } else {
    return keyCodes !== eventKeyCode
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp
) {
  if (value) {
    if (!isObject(value)) {
      "production" !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      for (var key in value) {
        if (key === 'class' || key === 'style') {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];
        }
      }
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var tree = this._staticTrees[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree by doing a shallow clone.
  if (tree && !isInFor) {
    return Array.isArray(tree)
      ? cloneVNodes(tree)
      : cloneVNode(tree)
  }
  // otherwise, render a fresh tree.
  tree = this._staticTrees[index] =
    this.$options.staticRenderFns[index].call(this._renderProxy);
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null;
  var parentVnode = vm.$vnode = vm.$options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(vm.$options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };
}

function renderMixin (Vue) {
  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var staticRenderFns = ref.staticRenderFns;
    var _parentVnode = ref._parentVnode;

    if (vm._isMounted) {
      // clone slot nodes on re-renders
      for (var key in vm.$slots) {
        vm.$slots[key] = cloneVNodes(vm.$slots[key]);
      }
    }

    vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject;

    if (staticRenderFns && !vm._staticTrees) {
      vm._staticTrees = [];
    }
    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render function");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (false) {
        vnode = vm.$options.renderError
          ? vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e)
          : vm._vnode;
      } else {
        vnode = vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (false) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };

  // internal render helpers.
  // these are exposed on the instance prototype to reduce generated render
  // code size.
  Vue.prototype._o = markOnce;
  Vue.prototype._n = toNumber;
  Vue.prototype._s = toString;
  Vue.prototype._l = renderList;
  Vue.prototype._t = renderSlot;
  Vue.prototype._q = looseEqual;
  Vue.prototype._i = looseIndexOf;
  Vue.prototype._m = renderStatic;
  Vue.prototype._f = resolveFilter;
  Vue.prototype._k = checkKeyCodes;
  Vue.prototype._b = bindObjectProps;
  Vue.prototype._v = createTextVNode;
  Vue.prototype._e = createEmptyVNode;
  Vue.prototype._u = resolveScopedSlots;
}

/*  */

var uid = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid++;

    var startTag, endTag;
    /* istanbul ignore if */
    if (false) {
      startTag = "vue-perf-init:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (false) {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if (false) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(((vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  opts.parent = options.parent;
  opts.propsData = options.propsData;
  opts._parentVnode = options._parentVnode;
  opts._parentListeners = options._parentListeners;
  opts._renderChildren = options._renderChildren;
  opts._componentTag = options._componentTag;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;
  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified
}

function dedupe (latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res
  } else {
    return latest
  }
}

function Vue$3 (options) {
  if (false
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue$3);
stateMixin(Vue$3);
eventsMixin(Vue$3);
lifecycleMixin(Vue$3);
renderMixin(Vue$3);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    /* istanbul ignore if */
    if (plugin.installed) {
      return this
    }
    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    plugin.installed = true;
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if (false) {
      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
        warn(
          'Invalid component name: "' + name + '". Component names ' +
          'can only contain alphanumeric characters and the hyphen, ' +
          'and must start with a letter.'
        );
      }
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (false) {
          if (type === 'component' && config.isReservedTag(id)) {
            warn(
              'Do not use built-in or reserved HTML elements as component ' +
              'id: ' + id
            );
          }
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

var patternTypes = [String, RegExp];

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (cache, current, filter) {
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        if (cachedNode !== current) {
          pruneCacheEntry(cachedNode);
        }
        cache[key] = null;
      }
    }
  }
}

function pruneCacheEntry (vnode) {
  if (vnode) {
    vnode.componentInstance.$destroy();
  }
}

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes
  },

  created: function created () {
    this.cache = Object.create(null);
  },

  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache[key]);
    }
  },

  watch: {
    include: function include (val) {
      pruneCache(this.cache, this._vnode, function (name) { return matches(val, name); });
    },
    exclude: function exclude (val) {
      pruneCache(this.cache, this._vnode, function (name) { return !matches(val, name); });
    }
  },

  render: function render () {
    var vnode = getFirstComponentChild(this.$slots.default);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      if (name && (
        (this.include && !matches(this.include, name)) ||
        (this.exclude && matches(this.exclude, name))
      )) {
        return vnode
      }
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (this.cache[key]) {
        vnode.componentInstance = this.cache[key].componentInstance;
      } else {
        this.cache[key] = vnode;
      }
      vnode.data.keepAlive = true;
    }
    return vnode
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (false) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue$3);

Object.defineProperty(Vue$3.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue$3.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode.ssrContext
  }
});

Vue$3.version = '2.3.4';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return genClassFromData(data)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function genClassFromData (data) {
  var dynamicClass = data.class;
  var staticClass = data.staticClass;
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (isUndef(value)) {
    return ''
  }
  if (typeof value === 'string') {
    return value
  }
  var res = '';
  if (Array.isArray(value)) {
    var stringified;
    for (var i = 0, l = value.length; i < l; i++) {
      if (isDef(value[i])) {
        if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
          res += stringified + ' ';
        }
      }
    }
    return res.slice(0, -1)
  }
  if (isObject(value)) {
    for (var key in value) {
      if (value[key]) { res += key + ' '; }
    }
    return res.slice(0, -1)
  }
  /* istanbul ignore next */
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);



var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      "production" !== 'production' && warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setAttribute (node, key, val) {
  node.setAttribute(key, val);
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	setAttribute: setAttribute
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!key) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (Array.isArray(refs[key]) && refs[key].indexOf(ref) < 0) {
        refs[key].push(ref);
      } else {
        refs[key] = [ref];
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *

/*
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key &&
    a.tag === b.tag &&
    a.isComment === b.isComment &&
    isDef(a.data) === isDef(b.data) &&
    sameInputType(a, b)
  )
}

// Some browsers do not support dynamically changing type for <input>
// so they need to be treated as different nodes
function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove$$1 () {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove$$1.listeners = listeners;
    return remove$$1
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  var inPre = 0;
  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if (false) {
        if (data && data.pre) {
          inPre++;
        }
        if (
          !inPre &&
          !vnode.ns &&
          !(config.ignoredElements.length && config.ignoredElements.indexOf(tag) > -1) &&
          config.isUnknownElement(tag)
        ) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }
      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if (false) {
        inPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref) {
    if (isDef(parent)) {
      if (isDef(ref)) {
        if (ref.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    var ancestor = vnode;
    while (ancestor) {
      if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
        nodeOps.setAttribute(vnode.elm, i, '');
      }
      ancestor = ancestor.parent;
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, elmToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null;
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        } else {
          elmToMove = oldCh[idxInOld];
          /* istanbul ignore if */
          if (false) {
            warn(
              'It seems there are duplicate keys that is causing an update error. ' +
              'Make sure each v-for item has a unique key.'
            );
          }
          if (sameVnode(elmToMove, newStartVnode)) {
            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          }
        }
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }
    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.elm = oldVnode.elm;
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }
    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }
    var elm = vnode.elm = oldVnode.elm;
    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var bailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  var isRenderedModule = makeMap('attrs,style,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue) {
    if (false) {
      if (!assertNodeMatch(elm, vnode)) {
        return false
      }
    }
    vnode.elm = elm;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          var childrenMatch = true;
          var childNode = elm.firstChild;
          for (var i$1 = 0; i$1 < children.length; i$1++) {
            if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue)) {
              childrenMatch = false;
              break
            }
            childNode = childNode.nextSibling;
          }
          // if childNode is not null, it means the actual childNodes list is
          // longer than the virtual children list.
          if (!childrenMatch || childNode) {
            if (false
            ) {
              bailed = true;
              console.warn('Parent: ', elm);
              console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
            }
            return false
          }
        }
      }
      if (isDef(data)) {
        for (var key in data) {
          if (!isRenderedModule(key)) {
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode) {
    if (isDef(vnode.tag)) {
      return (
        vnode.tag.indexOf('vue-component') === 0 ||
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else if (false) {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }
        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        if (isDef(vnode.parent)) {
          // component root element replaced.
          // update parent placeholder node element, recursively
          var ancestor = vnode.parent;
          while (ancestor) {
            ancestor.elm = vnode.elm;
            ancestor = ancestor.parent;
          }
          if (isPatchable(vnode)) {
            for (var i = 0; i < cbs.create.length; ++i) {
              cbs.create[i](emptyNode, vnode.parent);
            }
          }
        }

        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  /* istanbul ignore if */
  if (isIE9 && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, key);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, value);
    }
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;



function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + "," + args)
  }
}

/*  */

/*  */

/**
 * Cross-platform code generation for component v-model
 */


/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */


/**
 * parse directive model to do the array update transform. a[idx] = val => $$a.splice($$idx, 1, val)
 *
 * for loop possible cases:
 *
 * - test
 * - test[idx]
 * - test[test1[idx]]
 * - test["a"][idx]
 * - xxx.test[a[a].test1[idx]]
 * - test.xxx.a["asa"][test1[idx]]
 *
 */

var str;
var index$1;

/*  */

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  var event;
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    // Chrome fires microtasks in between click/change, leads to #4521
    event = isChrome ? 'click' : 'change';
    on[event] = [].concat(on[CHECKBOX_RADIO_TOKEN], on[event] || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function add$1 (
  event,
  handler,
  once$$1,
  capture,
  passive
) {
  if (once$$1) {
    var oldHandler = handler;
    var _target = target$1; // save current target element in closure
    handler = function (ev) {
      var res = arguments.length === 1
        ? oldHandler(ev)
        : oldHandler.apply(null, arguments);
      if (res !== null) {
        remove$2(event, handler, capture, _target);
      }
    };
  }
  target$1.addEventListener(
    event,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  event,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(event, handler, capture);
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (isUndef(props[key])) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, vnode, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (
  elm,
  vnode,
  checkVal
) {
  return (!elm.composing && (
    vnode.tag === 'option' ||
    isDirty(elm, checkVal) ||
    isInputChanged(elm, checkVal)
  ))
}

function isDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is not equal to the updated value
  return document.activeElement !== elm && elm.value !== checkVal
}

function isInputChanged (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if ((isDef(modifiers) && modifiers.number) || elm.type === 'number') {
    return toNumber(value) !== toNumber(newVal)
  }
  if (isDef(modifiers) && modifiers.trim) {
    return value.trim() !== newVal.trim()
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var prefixes = ['Webkit', 'Moz', 'ms'];

var testEl;
var normalize = cached(function (prop) {
  testEl = testEl || document.createElement('div');
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in testEl.style)) {
    return prop
  }
  var upper = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < prefixes.length; i++) {
    var prefixed = prefixes[i] + upper;
    if (prefixed in testEl.style) {
      return prefixed
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likley wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    el.setAttribute('class', cur.trim());
  }
}

/*  */

function resolveTransition (def$$1) {
  if (!def$$1) {
    return
  }
  /* istanbul ignore else */
  if (typeof def$$1 === 'object') {
    var res = {};
    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }
    extend(res, def$$1);
    return res
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser && window.requestAnimationFrame
  ? window.requestAnimationFrame.bind(window)
  : setTimeout;

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  (el._transitionClasses || (el._transitionClasses = [])).push(cls);
  addClass(el, cls);
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

function toMs (s) {
  return Number(s.slice(0, -1)) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if (false) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      addTransitionClass(el, toClass);
      removeTransitionClass(el, startClass);
      if (!cb.cancelled && !userWantsControl) {
        if (isValidDuration(explicitEnterDuration)) {
          setTimeout(cb, explicitEnterDuration);
        } else {
          whenTransitionEnds(el, type, cb);
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if (false) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        addTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled && !userWantsControl) {
          if (isValidDuration(explicitLeaveDuration)) {
            setTimeout(cb, explicitLeaveDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var model$1 = {
  inserted: function inserted (el, binding, vnode) {
    if (vnode.tag === 'select') {
      var cb = function () {
        setSelected(el, binding, vnode.context);
      };
      cb();
      /* istanbul ignore if */
      if (isIE || isEdge) {
        setTimeout(cb, 0);
      }
    } else if (vnode.tag === 'textarea' || el.type === 'text' || el.type === 'password') {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        if (!isAndroid) {
          el.addEventListener('compositionstart', onCompositionStart);
          el.addEventListener('compositionend', onCompositionEnd);
        }
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },
  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var needReset = el.multiple
        ? binding.value.some(function (v) { return hasNoMatchingOption(v, el.options); })
        : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, el.options);
      if (needReset) {
        trigger(el, 'change');
      }
    }
  }
};

function setSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    "production" !== 'production' && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  for (var i = 0, l = options.length; i < l; i++) {
    if (looseEqual(getValue(options[i]), value)) {
      return false
    }
  }
  return true
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition && !isIE9) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (value === oldValue) { return }
    vnode = locateNode(vnode);
    var transition = vnode.data && vnode.data.transition;
    if (transition && !isIE9) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: model$1,
  show: show
};

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) { return c.tag; });
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if (false) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if (false
    ) {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
      child.data.show = true;
    }

    if (oldChild && oldChild.data && !isSameChild(child, oldChild)) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild && (oldChild.data.transition = extend({}, data));
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
};

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final desired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else if (false) {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  beforeUpdate: function beforeUpdate () {
    // force removing pass
    this.__patch__(
      this._vnode,
      this.kept,
      false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    var body = document.body;
    var f = body.offsetHeight; // eslint-disable-line

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      if (this._hasMove != null) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue$3.config.mustUseProp = mustUseProp;
Vue$3.config.isReservedTag = isReservedTag;
Vue$3.config.isReservedAttr = isReservedAttr;
Vue$3.config.getTagNamespace = getTagNamespace;
Vue$3.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue$3.options.directives, platformDirectives);
extend(Vue$3.options.components, platformComponents);

// install platform patch function
Vue$3.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
setTimeout(function () {
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue$3);
    } else if (false) {
      console[console.info ? 'info' : 'log'](
        'Download the Vue Devtools extension for a better development experience:\n' +
        'https://github.com/vuejs/vue-devtools'
      );
    }
  }
  if (false
  ) {
    console[console.info ? 'info' : 'log'](
      "You are running Vue in development mode.\n" +
      "Make sure to turn on production mode when deploying for production.\n" +
      "See more tips at https://vuejs.org/guide/deployment.html"
    );
  }
}, 0);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue$3);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(10)))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bus = undefined;

var _vue = __webpack_require__(3);

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bus = new _vue2.default(); /**
                                * Created by gxx on 2017/7/6.
                                */
exports.bus = bus;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(28)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(30),
  /* template */
  __webpack_require__(31),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(33)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(35),
  /* template */
  __webpack_require__(36),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-40f9a029",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by gxx on 2017/7/6.
 */
var json = [{
    type: 'name',
    name: '姓名',
    maxlength: 6,
    textType: 'text',
    reg: /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3])*$/
}, {
    type: 'idCard',
    name: '身份证号码',
    maxlength: 15,
    textType: 'number',
    reg: /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3])*$/
}, {
    type: 'mobile',
    name: '手机号',
    maxlength: 11,
    textType: 'number',
    reg: /^(1[3|4|5|7|8][0-9])\d{8}$/
}, {
    type: 'code',
    name: '手机验证码',
    maxlength: 6,
    textType: 'text',
    reg: /^\d{0,6}$/
}, {
    type: 'imgCode',
    name: '图形验证码',
    maxlength: 6,
    textType: 'text',
    reg: /^\d{0,6}$/
}];
exports.default = json;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = __webpack_require__(3);

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toask = __webpack_require__(41); /**
                                     * Created by gxx on 2017/7/10.
                                     */

var ToastConstructor = _vue2.default.extend(toask); //获取toask构造器
var toastPool = []; //

var getAnInstance = function getAnInstance() {
    //获取当前的实例
    if (toastPool.length > 0) {
        var instance = toastPool[0];
        toastPool.splice(0, 1);
        return instance;
    }
    return new ToastConstructor({
        el: document.createElement('div')
    });
};

var returnAnInstance = function returnAnInstance(instance) {
    if (instance) {
        toastPool.push(instance);
    }
};

var removeDom = function removeDom(event) {
    //移除dom节点
    if (event.target.parentNode) {
        event.target.parentNode.removeChild(event.target);
    }
};

ToastConstructor.prototype.close = function () {
    //关闭toask
    this.visible = false;
    this.$el.addEventListener('transitionend', removeDom);
    this.closed = true;
    returnAnInstance(this);
};

var Toast = function Toast() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var duration = options.duration || 2000; //延迟时间

    var instance = getAnInstance();
    instance.closed = false;
    clearTimeout(instance.timer);
    instance.message = typeof options === 'string' ? options : options.message;

    document.body.appendChild(instance.$el);
    _vue2.default.nextTick(function () {
        instance.visible = true;
        instance.$el.removeEventListener('transitionend', removeDom);
        instance.timer = setTimeout(function () {
            if (instance.closed) return;
            instance.close();
        }, duration);
    });
    return instance;
};

exports.default = Toast;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _evenbus = __webpack_require__(4);

var _loading = __webpack_require__(11);

var _loading2 = _interopRequireDefault(_loading);

var _alert = __webpack_require__(23);

var _alert2 = _interopRequireDefault(_alert);

var _button = __webpack_require__(6);

var _button2 = _interopRequireDefault(_button);

var _mask = __webpack_require__(5);

var _mask2 = _interopRequireDefault(_mask);

var _cell = __webpack_require__(37);

var _cell2 = _interopRequireDefault(_cell);

var _radioTip = __webpack_require__(47);

var _radioTip2 = _interopRequireDefault(_radioTip);

var _mobileVerify = __webpack_require__(52);

var _mobileVerify2 = _interopRequireDefault(_mobileVerify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var install = function install(Vue) {
  if (install.installed) return;
  Vue.component(_loading2.default.name, _loading2.default);
  Vue.component(_alert2.default.name, _alert2.default);
  Vue.component(_button2.default.name, _button2.default);
  Vue.component(_mask2.default.name, _mask2.default);
  Vue.component(_cell2.default.name, _cell2.default);
  Vue.component(_radioTip2.default.name, _radioTip2.default);
  Vue.component(_mobileVerify2.default.name, _mobileVerify2.default);

  // Vue.$messagebox = Vue.prototype.$messagebox = MessageBox;
  // Vue.$toast = Vue.prototype.$toast = Toast;
  // Vue.$indicator = Vue.prototype.$indicator = Indicator;
};

// auto install

// //

//  module.exports = {
//     bus,
//     loading : require('./components/common/loading/loading.vue'),
//     input : require('./components/ui/cell1/cell.vue'),
//     radioTip : require('./components/ui/radioTip/radioTip.vue'),
//     mobileVerify: require('./components/feature/mobileVerify/mobileVerify.vue'),
// }

// module.exports = {
//     'abc':'abc'
// }

// 正确
// const a = 1;
// export default a;

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};

module.exports = {
  bus: _evenbus.bus,
  install: install,
  version: '2.0.5',
  Loading: _loading2.default,
  Alert: _alert2.default,
  Button: _button2.default,
  Mask: _mask2.default,
  Cell: _cell2.default,
  RadioTip: _radioTip2.default,
  MobileVerify: _mobileVerify2.default
};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__(3);

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Indicator = _vue2.default.extend(__webpack_require__(12));
var instance = void 0;
var timer = void 0;

module.exports = {
    open: function open() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        if (!instance) {
            instance = new Indicator({
                el: document.createElement('div')
            });
        }
        if (instance.visible) return;
        instance.text = typeof options === 'string' ? options : options.text || '';
        instance.spinnerType = options.spinnerType || 'snake';
        document.body.appendChild(instance.$el);
        if (timer) {
            clearTimeout(timer);
        }

        _vue2.default.nextTick(function () {
            instance.visible = true;
        });
    },
    close: function close() {
        if (instance) {
            instance.visible = false;
            timer = setTimeout(function () {
                if (instance.$el) {
                    instance.$el.style.display = 'none';
                }
            }, 400);
        }
    }
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(13)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(16),
  /* template */
  __webpack_require__(22),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-97813d3a",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(14);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("31fae79c", content, true);

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".mint-indicator-enter[data-v-97813d3a],.mint-indicator-leave-active[data-v-97813d3a]{opacity:0}.loading[data-v-97813d3a]{position:fixed;top:0;bottom:0;left:0;right:0;width:100%;height:100%;z-index:100;background:rgba(0,0,0,.3);box-shadow:inset 0 0 10rem .1rem rgba(0,0,0,.7)}.loading .loading-outline[data-v-97813d3a]{pointer-events:none;display:flex;align-items:center;justify-content:center;width:100%;height:100%}.loading .loading-outline img[data-v-97813d3a]{transform:scale(.7);padding:.3rem;background:rgba(0,0,0,.7);border-radius:.2rem}", ""]);

// exports


/***/ }),
/* 15 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var num = 1; //默认第一张图片，因为总共是4张
var time1 = null; //Interval定时器
var time2 = null; //Timeout定时器
var time3 = null; //AnimationFrame
exports.default = {
    name: 'loading',
    props: ['msg'],
    data: function data() {
        return {
            visible: false,
            imgUrl: ''
        };
    },
    mounted: function mounted() {
        var _this = this;

        (function () {
            //兼容requestAnimationFrame，cancelAnimationFrame不支持的浏览器
            var lastTime = 0;
            var vendors = ['ms', 'moz', 'webkit', 'o'];
            for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
                window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
                window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
            }
            if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function () {
                    callback(currTime + timeToCall);
                }, timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
            if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (id) {
                clearTimeout(id);
            };
        })();

        time3 = requestAnimationFrame(this.step); //默认Interval是从1秒后才开始工作的，所以这里开始就强制加载一次
        time1 = setInterval(function () {
            //定时每秒循环一次
            time3 = requestAnimationFrame(_this.step);
        }, 1000);
    },
    beforeDestroy: function beforeDestroy() {
        //卸载清除
        this.cancel();
    },

    methods: {
        preventDefault: function preventDefault(e) {
            //阻止冒泡
            e.preventDefault();
        },
        cancel: function cancel() {
            //取消几个定时器和AnimationFrame
            clearInterval(time1);
            clearTimeout(time2);
            cancelAnimationFrame(time3);
        },
        step: function step() {
            var _this2 = this;

            this.imgUrl = __webpack_require__(17)("./loading" + num + '.png'); //加载几个图片
            num++;
            if (num < 5) {
                //加载到第四个之后再从第一个重头再来
                time2 = setTimeout(function () {
                    time3 = requestAnimationFrame(_this2.step);
                }, 400); //每个图片间隔4秒和安卓一致
                return;
            }
            num = 1;
        }
    }
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./loading1.png": 18,
	"./loading2.png": 19,
	"./loading3.png": 20,
	"./loading4.png": 21
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 17;

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMMAAADDCAYAAAA/f6WqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzRCQzYzRTI3ODgzMTFFNUJBQ0Y4MjVBOEMxRDMyREMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzRCQzYzRTM3ODgzMTFFNUJBQ0Y4MjVBOEMxRDMyREMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozNEJDNjNFMDc4ODMxMUU1QkFDRjgyNUE4QzFEMzJEQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozNEJDNjNFMTc4ODMxMUU1QkFDRjgyNUE4QzFEMzJEQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjTT7QkAABd1SURBVHja7F0LmFxF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"

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMMAAADDCAYAAAA/f6WqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MjlEMkNEQ0E3ODgzMTFFNTlGQkI5MDc2NkIyRTMyNDAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MjlEMkNEQ0I3ODgzMTFFNTlGQkI5MDc2NkIyRTMyNDAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyOUQyQ0RDODc4ODMxMUU1OUZCQjkwNzY2QjJFMzI0MCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyOUQyQ0RDOTc4ODMxMUU1OUZCQjkwNzY2QjJFMzI0MCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PlnIRf8AABjDSURBVHja7F0LmFxF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"

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMMAAADDCAYAAAA/f6WqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RkZENDExMjA3ODgyMTFFNUEyRkU4REE0ODZGNDg1OTMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RkZENDExMjE3ODgyMTFFNUEyRkU4REE0ODZGNDg1OTMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGRkQ0MTExRTc4ODIxMUU1QTJGRThEQTQ4NkY0ODU5MyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGRkQ0MTExRjc4ODIxMUU1QTJGRThEQTQ4NkY0ODU5MyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtmQEEsAABueSURBVHja7F0LnF3T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"

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMMAAADDCAYAAAA/f6WqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTQ1QzZBMkE3ODgyMTFFNThBRTE5Qjg5NUE4MDcyQTkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTQ1QzZBMkI3ODgyMTFFNThBRTE5Qjg5NUE4MDcyQTkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFNDVDNkEyODc4ODIxMUU1OEFFMTlCODk1QTgwNzJBOSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFNDVDNkEyOTc4ODIxMUU1OEFFMTlCODk1QTgwNzJBOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PsaHSLYAAB22SURBVHja7F0JmBRF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"

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('transition', {
    attrs: {
      "name": "mint-indicator"
    }
  }, [(_vm.visible) ? _c('div', {
    staticClass: "loading",
    on: {
      "click": _vm.preventDefault
    }
  }, [_c('div', {
    staticClass: "loading-outline"
  }, [_c('img', {
    attrs: {
      "src": _vm.imgUrl,
      "alt": ""
    }
  })])]) : _vm._e()])
},staticRenderFns: []}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = __webpack_require__(3);

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var alert = __webpack_require__(24); /**
                                     * Created by gxx on 2017/7/10.
                                     */

var AlertConstructor = _vue2.default.extend(alert); //获取toask构造器

var getAnInstance = function getAnInstance() {
    //获取当前的实例
    return new AlertConstructor({
        el: document.createElement('div')
    });
};

var msgQueue = [];
var currentMsg = null;
var Alert = function Alert() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var title = ''; //标题
    var content = ''; //内容
    if (typeof options === 'string') {
        title = options; //标题
    } else {
        title = options.title; //标题
        content = options.content; //内容
    }

    var instance = getAnInstance();

    _vue2.default.nextTick(function () {
        instance.visible = true;
        document.body.appendChild(instance.$el);
        instance.title = title;
        instance.content = content;
    });

    return new Promise(function (resolve, reject) {
        // eslint-disable-line
        msgQueue.push({
            resolve: resolve,
            reject: reject
        });
        currentMsg = msgQueue.shift();
        instance.callback = defaultCallback;
    });
};

var defaultCallback = function defaultCallback(action) {
    currentMsg.resolve(action);
};

exports.default = Alert;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(25)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(27),
  /* template */
  __webpack_require__(32),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-2bc37c3a",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(26);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("d13c2b64", content, true);

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".msgbox-bounce-enter[data-v-2bc37c3a]{opacity:0;transform:translate3d(-50%,-50%,0) scale(.7)}.msgbox-bounce-leave-active[data-v-2bc37c3a]{opacity:0;transform:translate3d(-50%,-50%,0) scale(.9)}.dialog[data-v-2bc37c3a]{width:100%;height:100%;display:flex;justify-content:center;align-items:center}.dialog.text .alert[data-v-2bc37c3a]{width:80%}.alert[data-v-2bc37c3a]{height:auto;background:#fff;z-index:101;overflow:hidden;border-radius:.3rem;line-height:.22rem;padding:10px;font-size:.28rem;width:4rem}.alert h2[data-v-2bc37c3a]{text-align:center;padding:.4rem .3rem;font-weight:400;font-size:.35rem;border-bottom:1px solid #ebebeb}.alert .content[data-v-2bc37c3a]{border:1px solid #ebebeb;padding:.1rem;line-height:2;overflow:auto;max-height:calc(100vh - 4rem)}.alert .btn[data-v-2bc37c3a]{position:relative;text-align:center;display:flex;justify-content:space-around}.alert .btn span[data-v-2bc37c3a]{padding:.4rem .3rem;flex:1}.alert .btn span[data-v-2bc37c3a]:nth-child(2){height:100%;border-left:1px solid #ebebeb}.alert .submit[data-v-2bc37c3a]{color:#0ae}", ""]);

// exports


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mask = __webpack_require__(5);

var _mask2 = _interopRequireDefault(_mask);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    name: 'alert',
    data: function data() {
        return {
            visible: false,
            callback: null,
            yes: '确定',
            no: '取消'
        };
    },

    props: ['title', 'content'],
    components: {
        fMask: _mask2.default
    },
    mounted: function mounted() {},

    methods: {
        random: function random() {
            var num = Math.floor(Math.random() * 10);
            return num > 4 ? this.random() : num;
        },
        handleAction: function handleAction(type) {
            var sha = ['傻是取消不了的', '你就四傻', '系统判定你四傻', '别挣扎了你就四傻', '傻了吧'];
            this.callback(type);
            if (!type) {
                this.no = sha[this.random()];
                return;
            }
            this.content = '承认了自己很傻了吧= =';
            //                this.visible = false
        }
    }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(29);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("3b4c147a", content, true);

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "#mask{position:fixed;top:0;bottom:0;left:0;right:0;width:100%;height:100%;z-index:100;background:rgba(0,0,0,.3)}", ""]);

// exports


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


exports.default = {
  mounted: function mounted() {
    document.getElementById('mask').addEventListener('touchmove', function (e) {
      return e.stopPropagation();
    });
  },

  methods: {
    close: function close(user) {}
  }
};

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    attrs: {
      "id": "mask"
    },
    on: {
      "click": _vm.close
    }
  }, [_vm._t("default")], 2)])
},staticRenderFns: []}

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.visible) ? _c('fMask', [_c('transition', {
    attrs: {
      "name": "msgbox-bounce"
    }
  }, [_c('div', {
    staticClass: "dialog",
    class: [_vm.content ? 'text' : '']
  }, [_c('div', {
    staticClass: "alert"
  }, [_c('h2', [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), (_vm.content) ? _c('div', {
    staticClass: "content",
    attrs: {
      "id": "content"
    }
  }, [_c('p', {
    domProps: {
      "innerHTML": _vm._s(_vm.content)
    }
  })]) : _vm._e(), _vm._v(" "), _c('p', {
    staticClass: "btn"
  }, [(!_vm.content) ? _c('span', {
    staticClass: "cancel",
    on: {
      "click": function($event) {
        _vm.handleAction(0)
      }
    }
  }, [_vm._v(_vm._s(_vm.no))]) : _vm._e(), _c('span', {
    staticClass: "submit",
    on: {
      "click": function($event) {
        _vm.handleAction(1)
      }
    }
  }, [_vm._v(_vm._s(_vm.yes))])])])])])], 1) : _vm._e()
},staticRenderFns: []}

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(34);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("396d6283", content, true);

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".fxd-btn[data-v-40f9a029]{font-size:.44rem;height:1rem;line-height:1rem;border-radius:.1rem;text-align:center;background:#1da9ff;color:#fff;width:90%;margin:0 auto}.fxd-btn[data-v-40f9a029]:active{background:#77bce6}.fxd-btn.inset[data-v-40f9a029]{width:auto;height:auto;border-radius:0;font-size:.32rem;line-height:normal}.fxd-btn[disabled][data-v-40f9a029]{background:#ccc;pointer-events:none}", ""]);

// exports


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  name: 'mt-button',
  data: function data() {
    return {};
  },

  methods: {
    handleClick: function handleClick(evt) {
      this.$emit('click', evt);
    }
  },
  props: ['disabled', 'type']
};

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "fxd-btn",
    class: !!_vm.type ? _vm.type : '',
    attrs: {
      "disabled": _vm.disabled
    }
  }, [_vm._t("default")], 2)
},staticRenderFns: []}

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(38)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(40),
  /* template */
  __webpack_require__(46),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-505e535c",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(39);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("4d6d8425", content, true);

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".fxd-cell[data-v-505e535c]{display:flex;align-items:center;justify-content:center;width:90%;overflow:hidden;margin:0 auto;border:1px solid #0ae;border-radius:.15rem;height:1rem}.fxd-cell>.input[data-v-505e535c]{flex:1;width:100%;border:none;outline:none;flex:1 auto;font-size:.32rem;padding:0 .15rem;color:#0ae}.fxd-cell.imgText .imgText[data-v-505e535c]{width:.6rem;height:.5rem;margin:0 .22rem}.fxd-cell.imgText .imgText.left[data-v-505e535c]{border-right:1px solid #0ae;padding-right:.1rem}.fxd-cell.imgText .imgText.right[data-v-505e535c]{border-left:1px solid #0ae;order:1;padding-left:.1rem}.fxd-cell.btnText .btnText[data-v-505e535c]{border-top-right-radius:.15rem;border-bottom-right-radius:.15rem;display:flex;align-items:center;justify-content:center;background:#0ae;color:#fff;font-size:.32rem}.fxd-cell.btnText .btnText.dis[data-v-505e535c]{pointer-events:none;background:#ccc}.fxd-cell[error][data-v-505e535c]{border:1px solid red}", ""]);

// exports


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regular = __webpack_require__(7);

var _regular2 = _interopRequireDefault(_regular);

var _toask = __webpack_require__(8);

var _toask2 = _interopRequireDefault(_toask);

var _button = __webpack_require__(6);

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    name: 'cell',
    data: function data() {
        return {
            myValue: this.value, //input里面的值
            regObj: null, //规则对象
            myPlaceholder: this.placeholder,
            myMaxlength: this.maxlength, //最大长度控制
            myError: this.error, //是否错误
            myReadonly: this.readonly, //是否只读
            myVerify: typeof this.verify === 'boolean' ? false : true //判断要不要进行验证，默认是要的
        };
    },

    props: ['type', 'value', 'placeholder', 'maxlength', 'error', 'verify', 'readonly'],
    components: {
        'fxd-btn': _button2.default
    },
    mounted: function mounted() {
        this.init();
    },

    methods: {
        init: function init() {
            var _this = this;

            if (!!this.type && this.myVerify) {
                //获取规则json

                this.regObj = _regular2.default.filter(function (t) {

                    return t.type === _this.type;
                })[0];

                this.$refs.dom.setAttribute('type', this.regObj.textType); //设置类型默认为text

                this.myMaxlength = this.regObj.maxlength; //强制设置类型长度

                this.myPlaceholder = '\u8BF7\u8F93\u5165' + this.regObj.name;

                this.max_length();
            }
        },
        blur: function blur() {
            this.myVerify && this.verify_reg();
        },
        max_length: function max_length() {
            //设置最大长度默认不设置

            if (!!this.myMaxlength && this.myValue.length > this.myMaxlength) {

                this.myValue = this.myValue.substr(0, this.myMaxlength);
            }
        },
        verify_reg: function verify_reg() {
            var _this2 = this;

            //验证正则表达式
            this.myError = false;
            var set_dis_focus = function set_dis_focus() {
                _this2.myError = true;
                _this2.$refs.dom.focus();
            };
            if (!!this.regObj) {

                if (!this.myValue) {

                    (0, _toask2.default)(this.regObj.name + '\u4E0D\u80FD\u4E3A\u7A7A');

                    set_dis_focus();
                }

                if (!this.regObj.reg.test(this.myValue)) {

                    (0, _toask2.default)(this.regObj.name + '\u683C\u5F0F\u4E0D\u6B63\u786E');

                    set_dis_focus();
                }
            }
        }
    },
    watch: {
        myValue: function myValue() {
            //控制输入长度

            this.myVerify && this.max_length();
        }
    }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(42)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(44),
  /* template */
  __webpack_require__(45),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-9a1ec032",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(43);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("6a184fde", content, true);

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".mint-toast-pop-enter[data-v-9a1ec032],.mint-toast-pop-leave-active[data-v-9a1ec032]{opacity:0}.dialog[data-v-9a1ec032]{font-size:.32rem;z-index:101;width:100%;position:fixed;bottom:28%;display:flex;justify-content:center;align-items:center;left:0}.dialog p[data-v-9a1ec032]{padding:10px;border-radius:5px;background:rgba(0,0,0,.5);color:#fff}", ""]);

// exports


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    name: 'toast',
    props: ['message'],
    data: function data() {
        return {
            visible: false
        };
    }
};

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('transition', {
    attrs: {
      "name": "mint-toast-pop"
    }
  }, [(_vm.visible) ? _c('div', {
    staticClass: "dialog toast"
  }, [_c('p', [_vm._v(_vm._s(_vm.message))])]) : _vm._e()])
},staticRenderFns: []}

/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "fxd-cell",
    class: !!_vm.type ? _vm.type : '',
    attrs: {
      "error": _vm.myError
    }
  }, [(_vm.type === ('imgText' || 'all')) ? _c('div', {
    staticClass: "imgText"
  }, [_vm._t("imgText")], 2) : _vm._e(), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.myValue),
      expression: "myValue"
    }],
    ref: "dom",
    staticClass: "input",
    attrs: {
      "readonly": _vm.readonly,
      "placeholder": _vm.myPlaceholder,
      "type": "text",
      "maxlength": _vm.myMaxlength
    },
    domProps: {
      "value": (_vm.myValue)
    },
    on: {
      "blur": _vm.blur,
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.myValue = $event.target.value
      }
    }
  }), _vm._v(" "), (_vm.type === ('btnText' || 'all')) ? _c('div', {
    staticClass: "btnText"
  }, [_vm._t("btnText")], 2) : _vm._e()])
},staticRenderFns: []}

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(48)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(50),
  /* template */
  __webpack_require__(51),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-36beb292",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(49);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("066453c2", content, true);

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".radioTip[data-v-36beb292]{display:flex;width:90%;margin:0 auto;position:relative;align-items:center}.radioTip .radio[data-v-36beb292]{border:1px solid #0091ff;background:#fff;border-radius:5px;width:.28rem;height:.28rem;margin-right:.1rem}.radioTip .radio.tick[data-v-36beb292]:after{content:\"\";position:absolute;width:.18rem;height:.13rem;top:.03rem;left:.012rem;border:2px solid #0091ff;border-top:none;border-right:none;transform:rotate(-55deg)}.radioTip .agree[data-v-36beb292]{color:#9fa0a0}.radioTip .agree[data-v-36beb292],.radioTip .tip[data-v-36beb292]{font-size:.24rem}.radioTip .tip[data-v-36beb292]{color:#0091ff}", ""]);

// exports


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    data: function data() {
        return {
            myTick: this.tick || true, //默认选中
            myTipList: this.tipList //组件内不能修改props的值需要用个备份变量来修改内部组件值
        };
    },

    props: ['tick', 'agreeText', 'tipList'],
    mounted: function mounted() {
        if (!!this.tipList && typeof this.tipList == "string") {
            //判断tipList是不是一个string如果是的就当成数组长度为1来处理
            this.myTipList = new Array(this.tipList);
        }
    },

    methods: {
        switch_tick: function switch_tick() {
            //点击钩子的回调
            this.myTick = !this.myTick;
            this.$emit('tick_cb', this.myTick); //返回当前选中状态
        },
        tip: function tip(item, index) {
            //点击协议的回调
            this.$emit('tip_cb', item, index); //item返回当前值，index返回当前索引
        }
    }
};

/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "radioTip"
  }, [_c('span', {
    staticClass: "radio",
    class: [_vm.myTick ? 'tick' : ''],
    on: {
      "click": _vm.switch_tick
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "agree",
    on: {
      "click": _vm.switch_tick
    }
  }, [_vm._v(_vm._s(_vm.agreeText))]), _vm._v(" "), _vm._l((_vm.myTipList), function(t, i) {
    return _c('span', {
      staticClass: "tip",
      on: {
        "click": function($event) {
          _vm.tip(t, i)
        }
      }
    }, [_vm._v("《" + _vm._s(t) + "》")])
  })], 2)
},staticRenderFns: []}

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(53)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(55),
  /* template */
  __webpack_require__(61),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-e65cdcf0",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(54);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("b789aac6", content, true);

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".mobileVerify .mobileVerify-code[data-v-e65cdcf0],.mobileVerify .mobileVerify-imgCode[data-v-e65cdcf0]{position:relative;width:90%;margin:0 auto;border:1px solid #0ae;border-radius:.15rem;display:flex;align-items:center;justify-content:center;height:1rem}.mobileVerify .mobileVerify-code .textInput[data-v-e65cdcf0],.mobileVerify .mobileVerify-imgCode .textInput[data-v-e65cdcf0]{border:none}.mobileVerify .mobileVerify-code .textInput.dis[data-v-e65cdcf0]:after,.mobileVerify .mobileVerify-imgCode .textInput.dis[data-v-e65cdcf0]:after{content:\"\";position:absolute;width:100%;height:100%;box-shadow:-1px 1px 1px red;border-radius:.15rem;top:0;left:0}.mobileVerify .mobileVerify-code .textInput.dis[data-v-e65cdcf0]:before,.mobileVerify .mobileVerify-imgCode .textInput.dis[data-v-e65cdcf0]:before{content:\"\";position:absolute;width:100%;height:100%;box-shadow:1px -1px 1px red;border-radius:.15rem;top:0;left:0}.mobileVerify .mobileVerify-code .mobileVerify-btn[data-v-e65cdcf0],.mobileVerify .mobileVerify-code .mobileVerify-imgCode-img[data-v-e65cdcf0],.mobileVerify .mobileVerify-imgCode .mobileVerify-btn[data-v-e65cdcf0],.mobileVerify .mobileVerify-imgCode .mobileVerify-imgCode-img[data-v-e65cdcf0]{width:4rem;height:100%}.mobileVerify .mobileVerify-code .mobileVerify-btn[data-v-e65cdcf0]{border-top-right-radius:.15rem;border-bottom-right-radius:.15rem;display:flex;align-items:center;justify-content:center;background:#0ae;color:#fff;font-size:.32rem}.mobileVerify .mobileVerify-code .mobileVerify-btn.dis[data-v-e65cdcf0]{pointer-events:none;background:#ccc}.mobileVerify>div[data-v-e65cdcf0]{margin-top:.3rem!important}", ""]);

// exports


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _cell = __webpack_require__(56);

var _cell2 = _interopRequireDefault(_cell);

var _evenbus = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _timeout = 59; //倒计时秒数，默认59
var _timeText = '发送验证码';
exports.default = {
    data: function data() {
        return {
            myImgCodeSwitch: this.imgCodeSwitch, //图形验证码开关
            verify: { //判断手机号和图形验证码有没有验证完成
                mobile: false,
                imgCode: false,
                code: false
            },
            item: this.data,
            //                    {
            //                    mobile:{
            //                        icon:require('../../../public/img/test.png'),
            //                        val:'',
            //                    },
            //                    imgCode:{
            //                        icon:require('../../../public/img/test.png'),
            //                        iconUrl:require('../../../public/img/test.png'),
            //                        val:'',
            //                    },
            //                    verify:{
            //                        icon:require('../../../public/img/test.png'),
            //                        val:'',
            //                    },
            //                },
            msg: '',
            time: null, //清除定时器用的
            timeout: _timeout, //这个不用解释了吧，多少秒
            timeText: _timeText, //提示的文字
            codeShow: false, //发送验证码按钮能不能点击
            myModel: this.model //组件内不能修改props的值，同时修改的值也不会同步到组件外层，即调用组件方不知道组件内部当前的状态是什么
        };
    },

    props: ['data', 'showIcon', 'iconRight', 'timeInterval', 'iconUrl', 'model', 'mobileModel', 'imgCodeSwitch'],
    components: {
        cell: _cell2.default
    },
    mounted: function mounted() {
        var _this = this;

        if (!!this.item.imgCode) {
            this.myImgCodeSwitch = !this.myImgCodeSwitch;
        }
        _evenbus.bus.$on('mobile_verify_submit_cb', function (ca) {
            //监听mobile_verify_sub事件将数据添加到callback函数参数里面，然后触发的时候就可以从返回参数里面直接获取了
            if (_this.verify.mobile && _this.verify.imgCode && _this.verify.code) {
                if (!_this.imgCodeSwitch) {
                    //如果没打开图形验证码，就只返回手机号和验证码2个对象
                    var _item = _this.item,
                        mobile = _item.mobile,
                        verify = _item.verify;

                    ca({ mobile: mobile, verify: verify });
                    return;
                }
                ca(_this.item);
                return false;
            }
            _evenbus.bus.$emit('verify_defalut_cb', _this.$children); //触发默认验证事件
        });
        if (!!this.timeInterval) {
            //倒计时秒数带入
            this.timeout = this.timeInterval;
            _timeout = this.timeInterval;
        }
    },

    methods: {
        send_code_countdown: function send_code_countdown() {
            var _this2 = this;

            //倒计时
            clearInterval(this.time);
            this.time = setInterval(function () {
                if (_this2.timeout > 0) {
                    _this2.timeText = '\u53D1\u9001(' + _this2.timeout + ')';
                    _this2.timeout--;
                    _this2.send_code_countdown();
                    return;
                }
                clearInterval(_this2.time);
                _this2.codeShow = !_this2.codeShow;
                _this2.timeText = _timeText;
                _this2.timeout = _timeout;
            }, 1000);
        },
        mobile_verify_img: function mobile_verify_img() {
            //图形验证码
            this.$emit('mobile_verify_img_cb');
        },
        mobile_verify_sendcode: function mobile_verify_sendcode() {
            var _this3 = this;

            //发送验证码
            _evenbus.bus.$emit('text_input_verify_cb', function (data) {
                //验证返回的callback
                _this3.verify[data.type] = true;
                if (_this3.imgCodeSwitch && _this3.verify.mobile && _this3.verify.imgCode || !_this3.imgCodeSwitch && _this3.verify.mobile) {
                    //如果都都验证完了才执行发送验证码事件
                    _this3.codeShow = !_this3.codeShow;
                    _this3.send_code_countdown();
                    _this3.$emit('mobile_verify_sendcode_cb');
                }
            });
            if (!this.verify.mobile) {
                _evenbus.bus.$emit('verify_defalut_cb', this.$children); //触发默认验证事件
            }
        }
    }
};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(57)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(59),
  /* template */
  __webpack_require__(60),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-a39d63e2",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(58);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("01d16d96", content, true);

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".textInput[data-v-a39d63e2]{width:90%;overflow:hidden;margin:0 auto;border:1px solid #0ae;border-radius:.15rem;display:flex;align-items:center;justify-content:center;height:1rem}.textInput.dis[data-v-a39d63e2]{border:1px solid red}.textInput img[data-v-a39d63e2]{width:.6rem;height:.5rem;margin:0 .22rem}.textInput img.left[data-v-a39d63e2]{border-right:1px solid #0ae;padding-right:.1rem}.textInput img.right[data-v-a39d63e2]{border-left:1px solid #0ae;order:1;padding-left:.1rem}.textInput input[data-v-a39d63e2]{width:100%;border:none;outline:none;flex:1 auto;font-size:.32rem;padding:0 .15rem;color:#0ae}", ""]);

// exports


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regular = __webpack_require__(7);

var _regular2 = _interopRequireDefault(_regular);

var _toask = __webpack_require__(8);

var _toask2 = _interopRequireDefault(_toask);

var _evenbus = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    data: function data() {
        return {
            regObj: '', //规则json
            dis: false, //错误效果
            time: null, //清除定时器用的
            myModel: this.model, //组件内不能修改props的值，同时修改的值也不会同步到组件外层，即调用组件方不知道组件内部当前的状态是什么
            myMaxlength: this.maxlength
        };
    },

    props: ['showIcon', 'iconRight', 'iconUrl', 'placeholder', 'type', 'model', 'maxlength', 'readOnly'],
    mounted: function mounted() {
        this.init();
    },

    methods: {
        init: function init() {
            var _this = this;

            _evenbus.bus.$on('verify_defalut_cb', function (childrenArr) {
                //默认验证
                //                    _this = _this[0]
                //                    if(_this._uid !== this._uid){//如果不是自身相同的组件则不需要触发
                //                        return false
                //                    }
                //                    childrenArr.forEach(t=>{
                //                        if(!!t.model){
                //                            return
                //                        }
                //                        t.dis = true;
                //                        t.toask_switch();
                //                        t.toaskMsg = `${t.regObj.name}不能为空`;
                //                        t.$refs.dom.focus();
                //                    })
                //                    let result = childrenArr.filter(t=>{
                //                        return t._uid === this._uid
                //                    })[0]
                for (var i = 0, len = childrenArr.length; i < len; i++) {
                    var t = childrenArr[i];
                    //                        if(t._uid === this._uid){//如果不是自身相同的组件则不需要触发
                    //                            return false
                    //                        }
                    if (!t.model) {
                        t.dis = true;
                        //                            t.toask_switch();
                        //                            t.toaskMsg = `${t.regObj.name}不能为空`;
                        t.$refs.dom.focus();
                        break;
                    }
                }
            });
            !!this.readOnly && this.$refs.dom.setAttribute('readonly', !!this.readOnly); //设置类型默认为text
            if (!!this.type) {
                //获取规则json
                this.regObj = _regular2.default.filter(function (t) {
                    return t.type === _this.type;
                })[0];
                this.$refs.dom.setAttribute('type', this.regObj.textType); //设置类型默认为text
                this.myMaxlength = this.regObj.maxlength; //强制设置类型长度
            }
            this.max_length();
        },
        max_length: function max_length() {
            //设置最大长度默认不设置
            if (!!this.myMaxlength && this.myModel.length > this.myMaxlength) {
                this.myModel = this.myModel.substr(0, this.myMaxlength);
            }
        },
        verify_reg: function verify_reg() {
            var _this2 = this;

            //验证正则表达式
            if (!!this.regObj) {
                this.dis = false;
                if (!this.myModel) {
                    this.dis = true;
                    (0, _toask2.default)(this.regObj.name + '\u4E0D\u80FD\u4E3A\u7A7A');
                    this.$refs.dom.focus();
                    return false;
                }
                if (!this.regObj.reg.test(this.myModel)) {
                    this.dis = true;
                    (0, _toask2.default)(this.regObj.name + '\u683C\u5F0F\u4E0D\u6B63\u786E');
                    this.$refs.dom.focus();
                    return false;
                }
                _evenbus.bus.$on('text_input_verify_cb', function (ca) {
                    //返回验证的结果
                    ca(_this2.regObj);
                });
            }
        }
    },
    watch: {
        myModel: function myModel(val) {
            this.max_length();
            this.$emit('text_input_cb', val);
        }
    }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 60 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "textInput",
    class: [_vm.dis ? 'dis' : '']
  }, [(_vm.showIcon) ? _c('img', {
    staticClass: "icon",
    class: [_vm.iconRight ? 'right' : 'left'],
    attrs: {
      "src": _vm.iconUrl,
      "alt": ""
    }
  }) : _vm._e(), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.myModel),
      expression: "myModel"
    }],
    ref: "dom",
    attrs: {
      "type": "text",
      "placeholder": _vm.placeholder
    },
    domProps: {
      "value": (_vm.myModel)
    },
    on: {
      "blur": _vm.verify_reg,
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.myModel = $event.target.value
      }
    }
  })])
},staticRenderFns: []}

/***/ }),
/* 61 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "mobileVerify"
  }, [_c('cell', {
    attrs: {
      "showIcon": true,
      "iconUrl": _vm.item.mobile.icon,
      "placeholder": '请输入手机号码',
      "type": 'mobile',
      "model": _vm.item.mobile.val
    },
    on: {
      "text_input_cb": function (val) {
        _vm.item.mobile.val = val
      }
    }
  }), _vm._v(" "), (_vm.myImgCodeSwitch) ? _c('div', {
    staticClass: "mobileVerify-imgCode"
  }, [_c('cell', {
    attrs: {
      "showIcon": true,
      "type": 'imgCode',
      "iconUrl": _vm.item.imgCode.icon,
      "placeholder": '请输入图形验证码',
      "model": _vm.item.imgCode.val
    },
    on: {
      "text_input_cb": function (val) {
        _vm.item.imgCode.val = val
      }
    }
  }), _vm._v(" "), _c('img', {
    staticClass: "mobileVerify-imgCode-img",
    attrs: {
      "src": _vm.item.imgCode.iconUrl,
      "alt": ""
    },
    on: {
      "click": _vm.mobile_verify_img
    }
  })], 1) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "mobileVerify-code"
  }, [_c('cell', {
    attrs: {
      "showIcon": true,
      "type": 'code',
      "iconUrl": _vm.item.verify.icon,
      "placeholder": '请输入验证码',
      "model": _vm.item.verify.val
    },
    on: {
      "text_input_cb": function (val) {
        _vm.item.verify.val = val
      }
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "mobileVerify-btn",
    class: [_vm.codeShow ? 'dis' : ''],
    on: {
      "click": _vm.mobile_verify_sendcode
    }
  }, [_vm._v(_vm._s(_vm.timeText))])], 1)], 1)
},staticRenderFns: []}

/***/ })
/******/ ]);
});