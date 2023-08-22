function startLoad() {
    //setGetFp();
}

function doIt() {
    var hash = window.decodeURI(location.hash.replace('#', ''))
    if (hash !== '') {
        var element = document.getElementById(hash)
        if (element) {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            var clientTop = document.documentElement.clientTop || document.body.clientTop || 0
            var offset = element.getBoundingClientRect().top + scrollTop - clientTop
            // Wait for the browser to finish rendering before scrolling.
            setTimeout((function() {
                window.scrollTo(0, offset - 0)
            }
            ), 0)
        }
    }
}

setCookie = function(name,value,hours) {
    var expires = "";
    if (hours) {
        var date = new Date();
        date.setTime(date.getTime() + (hours*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

getCookie = function(cName) {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie); //to be careful
    const cArr = cDecoded.split('; ');
    let res;
    cArr.forEach(val => {
        if (val.indexOf(name) === 0) res = val.substring(name.length);
    })
    return res;
}
eraseCookie = function(name) {
    document.cookie = name+'=; Max-Age=-99999999;';  
}

setGetFp = function() {
    const fpPromise = import('/fp_script.js').then(FingerprintJS => FingerprintJS.load())
    fpPromise
    .then(fp => fp.get())
    .then(result => {
        const currentFp = result.visitorId;
        window.__FP__ = currentFp;
        try {
        const getFpStorage = localStorage.getItem("gwfp_id");
        if(getFpStorage !== currentFp) {
            localStorage.setItem("gwfp_id", currentFp);
        }
        } catch(err) {
            console.error('gwfp_id ls set error');
        }
        try {
            const getFpCookie = getCookie("gwfp_id");
            if(getFpCookie !== currentFp) {
                if(getFpCookie) {
                    setCookie("gwfp_bin", getFpCookie, 1);
                }
                setCookie("gwfp_id", currentFp, 1);
            }
        } catch(err) {
                console.error(err);
         }
         fp_run = 1;
    })
    .catch(error => fp_run = 1 && console.error('gwfp_id error'))
}

document.addEventListener('DOMContentLoaded', () => startLoad());
//document.addEventListener('DOMContentLoaded', () => doIt());
