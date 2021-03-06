function BranchData() {
    this.position = -1;
    this.nodeLength = -1;
    this.src = null;
    this.evalFalse = 0;
    this.evalTrue = 0;

    this.init = function(position, nodeLength, src) {
        this.position = position;
        this.nodeLength = nodeLength;
        this.src = src;
        return this;
    }

    this.ranCondition = function(result) {
        if (result)
            this.evalTrue++;
        else
            this.evalFalse++;
    };

    this.pathsCovered = function() {
        var paths = 0;
        if (this.evalTrue > 0)
          paths++;
        if (this.evalFalse > 0)
          paths++;
        return paths;
    };

    this.covered = function() {
        return this.evalTrue > 0 && this.evalFalse > 0;
    };

    this.toJSON = function() {
        return '{"position":' + this.position
            + ',"nodeLength":' + this.nodeLength
            + ',"src":' + jscoverage_quote(this.src)
            + ',"evalFalse":' + this.evalFalse
            + ',"evalTrue":' + this.evalTrue + '}';
    };

    this.message = function() {
        if (this.evalTrue === 0 && this.evalFalse === 0)
            return 'Condition never evaluated         :\t' + this.src;
        else if (this.evalTrue === 0)
            return 'Condition never evaluated to true :\t' + this.src;
        else if (this.evalFalse === 0)
            return 'Condition never evaluated to false:\t' + this.src;
        else
            return 'Condition covered';
    };
}

BranchData.fromJson = function(jsonString) {
    var json = eval('(' + jsonString + ')');
    var branchData = new BranchData();
    branchData.init(json.position, json.nodeLength, json.src);
    branchData.evalFalse = json.evalFalse;
    branchData.evalTrue = json.evalTrue;
    return branchData;
};

BranchData.fromJsonObject = function(json) {
    var branchData = new BranchData();
    branchData.init(json.position, json.nodeLength, json.src);
    branchData.evalFalse = json.evalFalse;
    branchData.evalTrue = json.evalTrue;
    return branchData;
};

function buildBranchMessage(conditions) {
    var message = 'The following was not covered:';
    for (var i = 0; i < conditions.length; i++) {
        if (conditions[i] !== undefined && conditions[i] !== null && !conditions[i].covered())
          message += '\n- '+ conditions[i].message();
    }
    return message;
};

function convertBranchDataConditionArrayToJSON(branchDataConditionArray) {
    var array = [];
    var length = branchDataConditionArray.length;
    for (var condition = 0; condition < length; condition++) {
        var branchDataObject = branchDataConditionArray[condition];
        if (branchDataObject === undefined || branchDataObject === null) {
            value = 'null';
        } else {
            value = branchDataObject.toJSON();
        }
        array.push(value);
    }
    return '[' + array.join(',') + ']';
}

function convertBranchDataLinesToJSON(branchData) {
    if (branchData === undefined) {
        return '{}'
    }
    var json = '';
    for (var line in branchData) {
        if (json !== '')
            json += ','
        json += '"' + line + '":' + convertBranchDataConditionArrayToJSON(branchData[line]);
    }
    return '{' + json + '}';
}

function convertBranchDataLinesFromJSON(jsonObject) {
    if (jsonObject === undefined) {
        return {};
    }
    for (var line in jsonObject) {
        var branchDataJSON = jsonObject[line];
        if (branchDataJSON !== null) {
            for (var conditionIndex = 0; conditionIndex < branchDataJSON.length; conditionIndex ++) {
                var condition = branchDataJSON[conditionIndex];
                if (condition !== null) {
                    branchDataJSON[conditionIndex] = BranchData.fromJsonObject(condition);
                }
            }
        }
    }
    return jsonObject;
}
function jscoverage_quote(s) {
    return '"' + s.replace(/[\u0000-\u001f"\\\u007f-\uffff]/g, function (c) {
        switch (c) {
            case '\b':
                return '\\b';
            case '\f':
                return '\\f';
            case '\n':
                return '\\n';
            case '\r':
                return '\\r';
            case '\t':
                return '\\t';
            // IE doesn't support this
            /*
             case '\v':
             return '\\v';
             */
            case '"':
                return '\\"';
            case '\\':
                return '\\\\';
            default:
                return '\\u' + jscoverage_pad(c.charCodeAt(0).toString(16));
        }
    }) + '"';
}

function getArrayJSON(coverage) {
    var array = [];
    if (coverage === undefined)
        return array;

    var length = coverage.length;
    for (var line = 0; line < length; line++) {
        var value = coverage[line];
        if (value === undefined || value === null) {
            value = 'null';
        }
        array.push(value);
    }
    return array;
}

function jscoverage_serializeCoverageToJSON() {
    var json = [];
    for (var file in _$jscoverage) {
        var lineArray = getArrayJSON(_$jscoverage[file].lineData);
        var fnArray = getArrayJSON(_$jscoverage[file].functionData);

        json.push(jscoverage_quote(file) + ':{"lineData":[' + lineArray.join(',') + '],"functionData":[' + fnArray.join(',') + '],"branchData":' + convertBranchDataLinesToJSON(_$jscoverage[file].branchData) + '}');
    }
    return '{' + json.join(',') + '}';
}


function jscoverage_pad(s) {
    return '0000'.substr(s.length) + s;
}

function jscoverage_html_escape(s) {
    return s.replace(/[<>\&\"\']/g, function (c) {
        return '&#' + c.charCodeAt(0) + ';';
    });
}
try {
  if (typeof top === 'object' && top !== null && typeof top.opener === 'object' && top.opener !== null) {
    // this is a browser window that was opened from another window

    if (! top.opener._$jscoverage) {
      top.opener._$jscoverage = {};
    }
  }
}
catch (e) {}

try {
  if (typeof top === 'object' && top !== null) {
    // this is a browser window

    try {
      if (typeof top.opener === 'object' && top.opener !== null && top.opener._$jscoverage) {
        top._$jscoverage = top.opener._$jscoverage;
      }
    }
    catch (e) {}

    if (! top._$jscoverage) {
      top._$jscoverage = {};
    }
  }
}
catch (e) {}

try {
  if (typeof top === 'object' && top !== null && top._$jscoverage) {
    this._$jscoverage = top._$jscoverage;
  }
}
catch (e) {}
if (! this._$jscoverage) {
  this._$jscoverage = {};
}
if (! _$jscoverage['/lang/set-immediate.js']) {
  _$jscoverage['/lang/set-immediate.js'] = {};
  _$jscoverage['/lang/set-immediate.js'].lineData = [];
  _$jscoverage['/lang/set-immediate.js'].lineData[5] = 0;
  _$jscoverage['/lang/set-immediate.js'].lineData[6] = 0;
  _$jscoverage['/lang/set-immediate.js'].lineData[8] = 0;
  _$jscoverage['/lang/set-immediate.js'].lineData[10] = 0;
  _$jscoverage['/lang/set-immediate.js'].lineData[11] = 0;
  _$jscoverage['/lang/set-immediate.js'].lineData[12] = 0;
  _$jscoverage['/lang/set-immediate.js'].lineData[13] = 0;
  _$jscoverage['/lang/set-immediate.js'].lineData[14] = 0;
  _$jscoverage['/lang/set-immediate.js'].lineData[16] = 0;
  _$jscoverage['/lang/set-immediate.js'].lineData[17] = 0;
  _$jscoverage['/lang/set-immediate.js'].lineData[18] = 0;
  _$jscoverage['/lang/set-immediate.js'].lineData[22] = 0;
  _$jscoverage['/lang/set-immediate.js'].lineData[23] = 0;
  _$jscoverage['/lang/set-immediate.js'].lineData[25] = 0;
  _$jscoverage['/lang/set-immediate.js'].lineData[33] = 0;
  _$jscoverage['/lang/set-immediate.js'].lineData[34] = 0;
  _$jscoverage['/lang/set-immediate.js'].lineData[35] = 0;
  _$jscoverage['/lang/set-immediate.js'].lineData[36] = 0;
  _$jscoverage['/lang/set-immediate.js'].lineData[37] = 0;
  _$jscoverage['/lang/set-immediate.js'].lineData[41] = 0;
  _$jscoverage['/lang/set-immediate.js'].lineData[42] = 0;
  _$jscoverage['/lang/set-immediate.js'].lineData[43] = 0;
  _$jscoverage['/lang/set-immediate.js'].lineData[44] = 0;
  _$jscoverage['/lang/set-immediate.js'].lineData[46] = 0;
  _$jscoverage['/lang/set-immediate.js'].lineData[47] = 0;
  _$jscoverage['/lang/set-immediate.js'].lineData[48] = 0;
  _$jscoverage['/lang/set-immediate.js'].lineData[50] = 0;
  _$jscoverage['/lang/set-immediate.js'].lineData[53] = 0;
  _$jscoverage['/lang/set-immediate.js'].lineData[56] = 0;
  _$jscoverage['/lang/set-immediate.js'].lineData[57] = 0;
  _$jscoverage['/lang/set-immediate.js'].lineData[58] = 0;
  _$jscoverage['/lang/set-immediate.js'].lineData[59] = 0;
  _$jscoverage['/lang/set-immediate.js'].lineData[61] = 0;
  _$jscoverage['/lang/set-immediate.js'].lineData[64] = 0;
  _$jscoverage['/lang/set-immediate.js'].lineData[66] = 0;
  _$jscoverage['/lang/set-immediate.js'].lineData[67] = 0;
  _$jscoverage['/lang/set-immediate.js'].lineData[68] = 0;
  _$jscoverage['/lang/set-immediate.js'].lineData[73] = 0;
  _$jscoverage['/lang/set-immediate.js'].lineData[74] = 0;
}
if (! _$jscoverage['/lang/set-immediate.js'].functionData) {
  _$jscoverage['/lang/set-immediate.js'].functionData = [];
  _$jscoverage['/lang/set-immediate.js'].functionData[0] = 0;
  _$jscoverage['/lang/set-immediate.js'].functionData[1] = 0;
  _$jscoverage['/lang/set-immediate.js'].functionData[2] = 0;
  _$jscoverage['/lang/set-immediate.js'].functionData[3] = 0;
  _$jscoverage['/lang/set-immediate.js'].functionData[4] = 0;
  _$jscoverage['/lang/set-immediate.js'].functionData[5] = 0;
  _$jscoverage['/lang/set-immediate.js'].functionData[6] = 0;
  _$jscoverage['/lang/set-immediate.js'].functionData[7] = 0;
  _$jscoverage['/lang/set-immediate.js'].functionData[8] = 0;
  _$jscoverage['/lang/set-immediate.js'].functionData[9] = 0;
}
if (! _$jscoverage['/lang/set-immediate.js'].branchData) {
  _$jscoverage['/lang/set-immediate.js'].branchData = {};
  _$jscoverage['/lang/set-immediate.js'].branchData['16'] = [];
  _$jscoverage['/lang/set-immediate.js'].branchData['16'][1] = new BranchData();
  _$jscoverage['/lang/set-immediate.js'].branchData['22'] = [];
  _$jscoverage['/lang/set-immediate.js'].branchData['22'][1] = new BranchData();
  _$jscoverage['/lang/set-immediate.js'].branchData['35'] = [];
  _$jscoverage['/lang/set-immediate.js'].branchData['35'][1] = new BranchData();
  _$jscoverage['/lang/set-immediate.js'].branchData['42'] = [];
  _$jscoverage['/lang/set-immediate.js'].branchData['42'][1] = new BranchData();
  _$jscoverage['/lang/set-immediate.js'].branchData['46'] = [];
  _$jscoverage['/lang/set-immediate.js'].branchData['46'][1] = new BranchData();
  _$jscoverage['/lang/set-immediate.js'].branchData['46'][2] = new BranchData();
  _$jscoverage['/lang/set-immediate.js'].branchData['46'][3] = new BranchData();
  _$jscoverage['/lang/set-immediate.js'].branchData['50'] = [];
  _$jscoverage['/lang/set-immediate.js'].branchData['50'][1] = new BranchData();
}
_$jscoverage['/lang/set-immediate.js'].branchData['50'][1].init(1066, 37, 'typeof MessageChannel !== "undefined"');
function visit279_50_1(result) {
  _$jscoverage['/lang/set-immediate.js'].branchData['50'][1].ranCondition(result);
  return result;
}_$jscoverage['/lang/set-immediate.js'].branchData['46'][3].init(923, 38, 'typeof process.nextTick == \'function\'');
function visit278_46_3(result) {
  _$jscoverage['/lang/set-immediate.js'].branchData['46'][3].ranCondition(result);
  return result;
}_$jscoverage['/lang/set-immediate.js'].branchData['46'][2].init(889, 30, 'typeof process !== \'undefined\'');
function visit277_46_2(result) {
  _$jscoverage['/lang/set-immediate.js'].branchData['46'][2].ranCondition(result);
  return result;
}_$jscoverage['/lang/set-immediate.js'].branchData['46'][1].init(889, 72, 'typeof process !== \'undefined\' && typeof process.nextTick == \'function\'');
function visit276_46_1(result) {
  _$jscoverage['/lang/set-immediate.js'].branchData['46'][1].ranCondition(result);
  return result;
}_$jscoverage['/lang/set-immediate.js'].branchData['42'][1].init(754, 34, 'typeof setImmediate === "function"');
function visit275_42_1(result) {
  _$jscoverage['/lang/set-immediate.js'].branchData['42'][1].ranCondition(result);
  return result;
}_$jscoverage['/lang/set-immediate.js'].branchData['35'][1].init(37, 9, '!flushing');
function visit274_35_1(result) {
  _$jscoverage['/lang/set-immediate.js'].branchData['35'][1].ranCondition(result);
  return result;
}_$jscoverage['/lang/set-immediate.js'].branchData['22'][1].init(305, 5, 'i > 1');
function visit273_22_1(result) {
  _$jscoverage['/lang/set-immediate.js'].branchData['22'][1].ranCondition(result);
  return result;
}_$jscoverage['/lang/set-immediate.js'].branchData['16'][1].init(23, 12, 'e.stack || e');
function visit272_16_1(result) {
  _$jscoverage['/lang/set-immediate.js'].branchData['16'][1].ranCondition(result);
  return result;
}_$jscoverage['/lang/set-immediate.js'].lineData[5]++;
(function(S) {
  _$jscoverage['/lang/set-immediate.js'].functionData[0]++;
  _$jscoverage['/lang/set-immediate.js'].lineData[6]++;
  var queue = [];
  _$jscoverage['/lang/set-immediate.js'].lineData[8]++;
  var flushing = 0;
  _$jscoverage['/lang/set-immediate.js'].lineData[10]++;
  function flush() {
    _$jscoverage['/lang/set-immediate.js'].functionData[1]++;
    _$jscoverage['/lang/set-immediate.js'].lineData[11]++;
    var i = 0, item;
    _$jscoverage['/lang/set-immediate.js'].lineData[12]++;
    while (item = queue[i++]) {
      _$jscoverage['/lang/set-immediate.js'].lineData[13]++;
      try {
        _$jscoverage['/lang/set-immediate.js'].lineData[14]++;
        item();
      }      catch (e) {
  _$jscoverage['/lang/set-immediate.js'].lineData[16]++;
  S.log(visit272_16_1(e.stack || e), 'error');
  _$jscoverage['/lang/set-immediate.js'].lineData[17]++;
  setTimeout(function() {
  _$jscoverage['/lang/set-immediate.js'].functionData[2]++;
  _$jscoverage['/lang/set-immediate.js'].lineData[18]++;
  throw e;
}, 0);
}
    }
    _$jscoverage['/lang/set-immediate.js'].lineData[22]++;
    if (visit273_22_1(i > 1)) {
      _$jscoverage['/lang/set-immediate.js'].lineData[23]++;
      queue = [];
    }
    _$jscoverage['/lang/set-immediate.js'].lineData[25]++;
    flushing = 0;
  }
  _$jscoverage['/lang/set-immediate.js'].lineData[33]++;
  S.setImmediate = function(fn) {
  _$jscoverage['/lang/set-immediate.js'].functionData[3]++;
  _$jscoverage['/lang/set-immediate.js'].lineData[34]++;
  queue.push(fn);
  _$jscoverage['/lang/set-immediate.js'].lineData[35]++;
  if (visit274_35_1(!flushing)) {
    _$jscoverage['/lang/set-immediate.js'].lineData[36]++;
    flushing = 1;
    _$jscoverage['/lang/set-immediate.js'].lineData[37]++;
    requestFlush();
  }
};
  _$jscoverage['/lang/set-immediate.js'].lineData[41]++;
  var requestFlush;
  _$jscoverage['/lang/set-immediate.js'].lineData[42]++;
  if (visit275_42_1(typeof setImmediate === "function")) {
    _$jscoverage['/lang/set-immediate.js'].lineData[43]++;
    requestFlush = function() {
  _$jscoverage['/lang/set-immediate.js'].functionData[4]++;
  _$jscoverage['/lang/set-immediate.js'].lineData[44]++;
  setImmediate(flush);
};
  } else {
    _$jscoverage['/lang/set-immediate.js'].lineData[46]++;
    if (visit276_46_1(visit277_46_2(typeof process !== 'undefined') && visit278_46_3(typeof process.nextTick == 'function'))) {
      _$jscoverage['/lang/set-immediate.js'].lineData[47]++;
      requestFlush = function() {
  _$jscoverage['/lang/set-immediate.js'].functionData[5]++;
  _$jscoverage['/lang/set-immediate.js'].lineData[48]++;
  process.nextTick(flush);
};
    } else {
      _$jscoverage['/lang/set-immediate.js'].lineData[50]++;
      if (visit279_50_1(typeof MessageChannel !== "undefined")) {
        _$jscoverage['/lang/set-immediate.js'].lineData[53]++;
        var channel = new MessageChannel();
        _$jscoverage['/lang/set-immediate.js'].lineData[56]++;
        channel.port1.onmessage = function() {
  _$jscoverage['/lang/set-immediate.js'].functionData[6]++;
  _$jscoverage['/lang/set-immediate.js'].lineData[57]++;
  requestFlush = realRequestFlush;
  _$jscoverage['/lang/set-immediate.js'].lineData[58]++;
  channel.port1.onmessage = flush;
  _$jscoverage['/lang/set-immediate.js'].lineData[59]++;
  flush();
};
        _$jscoverage['/lang/set-immediate.js'].lineData[61]++;
        var realRequestFlush = function() {
  _$jscoverage['/lang/set-immediate.js'].functionData[7]++;
  _$jscoverage['/lang/set-immediate.js'].lineData[64]++;
  channel.port2.postMessage(0);
};
        _$jscoverage['/lang/set-immediate.js'].lineData[66]++;
        requestFlush = function() {
  _$jscoverage['/lang/set-immediate.js'].functionData[8]++;
  _$jscoverage['/lang/set-immediate.js'].lineData[67]++;
  setTimeout(flush, 0);
  _$jscoverage['/lang/set-immediate.js'].lineData[68]++;
  realRequestFlush();
};
      } else {
        _$jscoverage['/lang/set-immediate.js'].lineData[73]++;
        requestFlush = function() {
  _$jscoverage['/lang/set-immediate.js'].functionData[9]++;
  _$jscoverage['/lang/set-immediate.js'].lineData[74]++;
  setTimeout(flush, 0);
};
      }
    }
  }
})(KISSY);
