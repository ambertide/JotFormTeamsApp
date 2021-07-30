/**
 * JotForm.js 0.1.0
 *
 *  (c) 2013 JotForm Easiest Form Builder
 *
 * JotForm.js may be freely distributed under the MIT license.
 * For all details and documentation:
 * http://api.jotform.com
 */

/*
 * INITIAL SETUP
 * =============
 *
 * Include JotForm.js script to your page
 *
 * __<script src="//js.jotform.com/JotForm.js"></script>__
 *
 * Initialize SDK
 *
 *      JF.initialize({ apiKey: YOUR_API_KEY })
 *
 * In case of you are using SDK in a 3rd pary app
 *
 *      JF.initialize({ appName: YOUR_APP_NAME })
 *
 */

/* eslint-disable */

/*global _readCookie, _createCookie, root, _getWindowDimensions, removeElement, _createCORSRequest, console*/
var JF = (function(base) {

  var _apiKey = null,
      _appName,
      _baseURL = '//www.jotform.com',
      _requestURL = '//api.jotform.com',
      _requestURLEU = '//eu-api.jotform.com',
      _requestURLHIPAA = '//hipaa-api.jotform.com',
      _authPath = '/api/oauth.php',
      _loginWindowURL = 'https://www.jotform.com' + _authPath,
      _accessType = 'readOnly',
      _authType = 'login',
      _autocomplete = false,
      _enableCookie = false,
      _oauthFrameWidth = 450,
      _oauthFrameHeight = 450
      root = {};

  var _config = function (options) {

      if(typeof options !== 'object') {
          return
      }
      /**
       * if set true JF will remember user on next visit
       * will set jf_auth cookie
       */
      if (options.enableCookieAuth) {
          _enableCookie = options.enableCookieAuth;
          if(_enableCookie) {
              _apiKey = _readCookie("jf_auth");
          }
          root.login = _login;
      }
      /**
       * if set API requests will be transported to this URL
       * useful for working on development environment
       */
      if(options.requestUrl !== undefined) {
          _requestURL = options.requestUrl;
      }
      /**
       * if set login request will be transported to this URL
       */
      if(options.baseUrl !== undefined) {
          _baseURL = options.baseUrl;
          _loginWindowURL = _baseURL + _authPath;
      }
      if(options.authPath !== undefined) {
          _authPath = options.authPath;
          _loginWindowURL = _baseURL + _authPath;
      }
      /*
       *  application access type parameter shuld be given on initialize
       *  if not given defult is readOnly
       */
      if ( options.accessType === 'readOnly' ||  options.accessType === 'full' ) {
          _accessType = options.accessType;
      }
      /**
       * if set, autocomplete will initiate for username and email only
       * if not given, no autocomplete will set
       */
      if ( options.autocomplete !== undefined && typeof options.autocomplete === 'object' ) {
          _autocomplete = JSON.stringify(options.autocomplete);
      }

      /**
       * application authType will show the login or signup modal if user is not logged in
       * if not given default is login
       */
      if ( options.authType !== undefined ) {
          _authType = options.authType;
      }

      /**
       * application name for 3rd party applications
       */
      if (typeof options.appName === 'string') {
          _appName = options.appName;
      }

      // if(_enableCookie) {

      // }
      /*
       * initialize SDK with API Key
       *
       *     default: undefined
       *
       * Note that you can't call any method without a valid API Key
       */
      if (typeof options.apiKey === 'string') {
          _apiKey = options.apiKey;
          //keep API key as cookie for later use
          if(true) {
              if(_enableCookie) {
                  _createCookie("jf_auth", _apiKey);
              }
          }
      }

      if(typeof options.oauthFrameWidth === 'number') {
          _oauthFrameWidth = options.oauthFrameWidth;
      }

      if(typeof options.oauthFrameHeight === 'number') {
          _oauthFrameHeight = options.oauthFrameHeight;
      }
  }
  /**
   * SDK can be initialized with apiKey and appName parameters
   */
  root.initialize = function(options) {

      if (options === undefined) {
          return;
      }
      _config(options);
  };

  root.init = function(options) {
      root.initialize(options);
  };

  root.login = _login;
  /*
   * returns _apiKey
   *
   * returns null if user is not logged in
   */
  root.getAPIKey = function() {
      return _apiKey;
  };


  root.logout = function() {
      _eraseCookie("jf_auth");
  };

  /**
   * use the api endpoint for EU(eu-api.jotform.com)
   */
  root.useEU = function() {
      _requestURL = _requestURLEU;
  };

  /**
   * use the api endpoint for HIPAA(hipaa-api.jotform.com)
   */
  root.useHIPAA = function() {
      _requestURL = _requestURLHIPAA;
  }

  /**
   * for all functions successful result will be passed into next (callback) function given as argumen
   */

//-------------------USER----------------------------------------

  /**
   * __POST http://api.jotform.com/user/register__
   * -----------------------------------
   */
  root.register = function(user, callback, errback) {
      if (typeof user !== 'object') {
          console.error("User (first argument) should be object");
          return;
      }

      user = preparePOST(user, '');

      _xdr( _requestURL + "/user/register", "post", serialize(user), function(resp) {
          callback(resp)
      }, errback);
  };

  /**
   * __POST http://api.jotform.com/user/login__
   * -----------------------------------
   */
  root.userLogin = function(user, callback, errback) {
      if (typeof user !== 'object') {
          console.error("User (first argument) should be object");
          return;
      }

      user = preparePOST(user, '');

      _xdr( _requestURL + "/user/login", "post", serialize(user), function(resp) {
          callback(resp)
      }, errback);
  };

//--------------------------------END JS API FUNCTIONS---------------------

  //---Prepare for POST - labelize object (eg properties[labelWidth])
  function preparePOST(obj,label) {
      postData = new Object();
      for (var key in obj) {
          value = obj[key];
          if(label) {
              if(key.indexOf('_') !== -1) {
                  keys = key.split('_');
                  key = keys[0] + "][" + keys[1];
              }
              key = "[" + key + "]";
          }
          postData[ label + key] = value;
      }
      return postData;
  }

  //---Serialize objects for POST and PUT
  function serialize(data) {
        var str = [];
        for(var p in data)
           str.push(encodeURIComponent(p) + "=" + encodeURIComponent(data[p]));
        return str.join("&");
  }

  function _xdr(url, method, data, callback, errback) {
      var req;
      if(XMLHttpRequest) {
          createXHRRequest(url, method, data, callback, errback);
      } else if(XDomainRequest) {
          req = new XDomainRequest();
          req.open(method, url);
          req.onerror = errback;
          req.onload = function() {
              callback(req.responseText);
          };
          req.send(data);
      } else {
          errback(new Error('CORS not supported'));
      }
  }

  function createXHRRequest(url, method, data, callback, errback) {
      var req = new XMLHttpRequest();
      if('withCredentials' in req) {
          req.open(method, url, true);
          req.setRequestHeader("Content-type","application/x-www-form-urlencoded");
          req.onerror = errback;
          req.onreadystatechange = function() {
              if (req.readyState === 4) {
                  if (req.status >= 200 && req.status < 400) {
                      var resp = JSON.parse(req.responseText);
                      var responseErrorCodes = [400, 404, 401, 503, 301];
                      if(responseErrorCodes.indexOf(resp.responseCode) > -1) {
                          if(resp.responseCode === 301) {
                              // HIPAA
                              if (resp.location.indexOf('hipaa') > -1) {
                                  url = url.replace('api.', 'hipaa-api.');
                                  root.useHIPAA();
                              }
                              // EU
                              else {
                                  url = url.replace('api.', 'eu-api.');
                                  root.useEU();
                              }
                              createXHRRequest(url, method, data, callback, errback);
                              return;
                          }
                          errback(resp.message, resp.responseCode);
                          return;
                      }
                      callback(JSON.parse(req.responseText).content);
                  } else {
                      errback(new Error('Response returned with non-OK status'));
                  }
              }
          };
          req.send(data);
      }
  }

  function _getWindowDimensions() {
      var viewportwidth,
          viewportheight;
       // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
      if (window.innerWidth !== undefined) {
          viewportwidth = window.innerWidth;
          viewportheight = window.innerHeight;
      } else if (document.documentElement !== undefined && document.documentElement.clientWidth !== undefined && document.documentElement.clientWidth !== 0) {
          viewportwidth = document.documentElement.clientWidth;
          viewportheight = document.documentElement.clientHeight;
      } else {
          viewportwidth = document.getElementsByTagName('body')[0].clientWidth;
          viewportheight = document.getElementsByTagName('body')[0].clientHeight;
      }
      return {
          width: viewportwidth,
          height: viewportheight
      };
  };
  /** http://www.onlineaspect.com/2010/01/15/backwards-compatible-postmessage/ **/
  var XD = function() {
      var interval_id,
          last_hash,
          cache_bust = 1,
          attached_callback,
          window = this;
      return {
          postMessage : function(message, target_url, target) {
              if (!target_url) {
                  return;
              }
              target = target || parent;  // default to parent
              if (window.postMessage) {
                  // the browser supports window.postMessage, so call it with a targetOrigin
                  // set appropriately, based on the target_url parameter.
                  target.postMessage(message, target_url.replace( /([^:]+:\/\/[^\/]+).*/, '$1' ) );
              } else if (target_url) {
                  // the browser does not support window.postMessage, so use the window.location.hash fragment hack
                  target.location = target_url.replace(/#.*$/, '') + '#' + (+new Date) + (cache_bust++) + '&' + message;
              }
          },
          receiveMessage : function(callback, source_origin) {
              // browser supports window.postMessage
              if (window.postMessage) {
                  // bind the callback to the actual event associated with window.postMessage
                  if (callback) {
                      attached_callback = function(e) {
                          if ((typeof source_origin === 'string' && e.origin !== source_origin)
                                  || (Object.prototype.toString.call(source_origin) === "[object Function]" && source_origin(e.origin) === !1)) {
                              return !1;
                          }
                          callback(e);
                      };
                  }
                  if (window['addEventListener']) {
                      window[callback ? 'addEventListener' : 'removeEventListener']('message', attached_callback, !1);
                  } else {
                      window[callback ? 'attachEvent' : 'detachEvent']('onmessage', attached_callback);
                  }
               } else {
                   // a polling loop is started & callback is called whenever the location.hash changes
                   interval_id && clearInterval(interval_id);
                   interval_id = null;
                   if (callback) {
                       interval_id = setInterval(function() {
                           var hash = document.location.hash,
                           re = /^#?\d+&/;
                           if (hash !== last_hash && re.test(hash)) {
                               last_hash = hash;
                               callback({data: hash.replace(re, '')});
                           }
                       }, 100);
                   }
               }
           }
      };
  }();
  function removeElement(EId)
  {
      return (EObj = document.getElementById(EId)) ? EObj.parentNode.removeChild(EObj) : false;
  }

  root.bindXD = function(_baseURL){

      XD.receiveMessage(function(message){

          //parse message
          var msg = message.data;

          if(msg === false) {
              removeElement("jotform_oauth_frame_mask");
              if(typeof root.unsuccessfulLoginCallback === 'function'){
                  root.unsuccessfulLoginCallback();
              }
              return;
          }
          //successful login message must be in the form login:{API_KEY}
          if(typeof msg === 'string' && msg.match(/login:(.*)/) !== null) {
              var key = msg.match(/login:(.*)/)[1];
              removeElement("jotform_oauth_frame_mask");
              var key = msg.split(':')[1];
              if(!key){
                  if(typeof root.unsuccessfulLoginCallback === 'function'){
                      root.unsuccessfulLoginCallback();
                  }
                  return;
              }
              JF.initialize({apiKey: key});
              if(typeof root.successfulLoginCallback === 'function'){
                  root.successfulLoginCallback();
              }
          }

          //successful register
          if(typeof msg === 'string' && msg.match(/register:(.*)/) !== null) {
              removeElement("jotform_oauth_frame_mask");
              if(typeof root.successfulLoginCallback === 'function'){
                  root.successfulLoginCallback();
              }
          }
          // auto-resize oAuth iframe
          if(typeof msg === 'string' && msg.match(/resizeFrame:(.*)/)) {
              var frameHeight = msg.split(':')[1];
              document.getElementById('jotform_oauth_frame').style.height = frameHeight  + 'px';
          }

      });
  }

  //call it once
  root.bindXD(_baseURL);

  function _createCookie(name,value,days) {
      if (days) {
          var date = new Date();
          date.setTime(date.getTime()+(days*24*60*60*1000));
          var expires = "; expires="+date.toGMTString();
      }
      else var expires = "";
      document.cookie = name+"="+value+expires+"; path=/; SameSite=None; Secure;";
  }
  function _readCookie(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for(var i=0;i < ca.length;i++) {
          var c = ca[i];
          while (c.charAt(0)==' ') c = c.substring(1,c.length);
          if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
      }
      return null;
  }
  function _eraseCookie(name) {
      _createCookie(name,"",-1);
  }
  function _setTextContent(element, text) {
      while (element.firstChild!==null)
          element.removeChild(element.firstChild); // remove all existing content
      element.appendChild(document.createTextNode(text));
  }
  /**
   * open http://www.jotform.com/api/oauth.php iframe if __apiKey is undefined
   *
   *
   * executes "success" callback function after successful login
   *
   *
   * executes "error" callback function if user does not allow
   *
   */
  function _login(success, error, onCloseCallback, isGuest) {
      if (_apiKey !== null) {
          if(success && typeof success === 'function') {
              success();
              return;
          }
      }

      var container = document.body,
          innerWidth = _getWindowDimensions().width,
          dimmer = document.createElement("div"),
          frame = document.createElement('IFRAME'),
          wrapperDiv = document.createElement("div"),
          margin = (innerWidth - 450) / 2,
          closeButton = document.createElement("a"),
          ref = document.location.href;
      dimmer.setAttribute("id", "jotform_oauth_frame_mask");
      dimmer.style.position = "fixed";
      dimmer.style.width = "100%";
      dimmer.style.height = "100%";
      dimmer.style.top = "0";
      dimmer.style.left = "0";
      dimmer.style.zIndex = "999999";
      // handle IE8 errors
      try {
          dimmer.style.background = "rgba(0,0,0,0.7)";
      } catch (e) {
      }

      wrapperDiv.setAttribute("id", "jotform_oauth_frame_wrapper");
      wrapperDiv.style.position = "absolute";
      wrapperDiv.style.top = 0;
      wrapperDiv.style.right = 0;
      wrapperDiv.style.bottom = 0;
      wrapperDiv.style.left = 0;
      wrapperDiv.style.zIndex = 9999;
      wrapperDiv.style.marginLeft = margin + "px";
      wrapperDiv.style.width = _oauthFrameWidth + "px";
      closeButton.style.display = "block";
      closeButton.style.left = "200px";
      _setTextContent(closeButton, 'Close X');
      // handle IE8 errors
      try {
          closeButton.style.backgroundColor = "transparent";
      } catch (e) {
      }
      closeButton.style.color = "white";
      closeButton.style.fontSize = "14px";
      closeButton.style.padding = "5px 8px";
      closeButton.style.cursor = "pointer";
      closeButton.style.styleFloat = "right";
      closeButton.style.cssFloat = "right";

      closeButton.onclick = function() {
          if(onCloseCallback !== undefined) {
              onCloseCallback();
          }
          removeElement("jotform_oauth_frame_mask");
      };

      wrapperDiv.appendChild(closeButton);
      if (ref[ref.length - 1] === '#') {
          ref = ref.substr(0, ref.length - 1);
      }

      var loginWindowParams = [
          'registrationType=oauth', 
          'ref=' + encodeURIComponent(ref),
          'client_id=' + (_appName !== undefined ? _appName : window.location.host),
          'access_type=' + _accessType, 
          'auth_type=' + _authType,
      ];

      if(isGuest !== undefined) {
          loginWindowParams.push('guest=true');
      }

      // push autocomplete params if existed
      if (_autocomplete) {
          loginWindowParams.push('autocomplete=' + encodeURIComponent(_autocomplete));
      }
      if(_authType == 'signup'){
          frame.setAttribute("scrolling", "yes");
          loginWindowParams.push('fullscreen=1');
      }else{
          frame.setAttribute("scrolling", "no");
      }

      frame.setAttribute("src", _loginWindowURL + "?" + loginWindowParams.join('&'));
      frame.setAttribute("id", "jotform_oauth_frame");
      
      frame.style.width = _oauthFrameWidth + "px";
      frame.style.height = _oauthFrameHeight + "px" ;
      frame.style.backgroundColor = "white";
      frame.style.border = "4px solid #aaa";
      frame.style.borderRadius = "4px";

      wrapperDiv.appendChild(frame);
      dimmer.appendChild(wrapperDiv);

      container.appendChild(dimmer);

      root.successfulLoginCallback = success;
      root.unsuccessfulLoginCallback = error;
  };
  return root;

})(JF || {});