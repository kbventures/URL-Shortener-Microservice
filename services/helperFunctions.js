// HostName extractor: Was not used

// https://stackoverflow.com/questions/34818020/javascript-regex-url-extract-domain-only


function host_Name_from_url(url) {
  console.log('testing 123');
  console.log(url);
    var result
    var match
    if (match = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im)) {
        result = match[1]
        if (match = result.match(/^[^\.]+\.(.+\..+)$/)) {
            result = match[1]
        }
    }
    console.log('testing 123');

    return result
}


// console.log(host_Name_from_url("www.google.com"))
// console.log(host_Name_from_url("yahoo.com/something"))
// console.log(host_Name_from_url("freds.meatmarket.co.uk?someparameter"))
// console.log(host_Name_from_url("josh.meatmarket.co.uk/asldf/asdf"))

// google.com
// yahoo.com
// meatmarket.co.uk
// meatmarket.co.uk




// URL constructor: if it doesn't throw, the string is a valid URL:
// https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url


function isValidUrl(string) {
    try {
      new URL(string);
    } catch (_) {
      return false;  
    }
  
    return true;
  }


module.exports.host_Name_from_url = host_Name_from_url;
module.exports.isValidUrl = isValidUrl;