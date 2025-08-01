    function isRunningAsExtension() {
      return location.protocol === 'chrome-extension:' || location.protocol === 'moz-extension:';
    }
    if (isRunningAsExtension()) {
      document.documentElement.classList.add('is-extension');
      console.log("EXTENSION");
    }
    else
    {
      console.log("WEB");
    }