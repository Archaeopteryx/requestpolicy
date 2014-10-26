PAGE_STRINGS = [
  'basic',
  'advanced',
  'webPages',
  'indicateBlockedImages',
  'autoReload',
  'menu',
  'allowAddingNonTemporaryRulesInPBM'
];

$(function () {
  common.localize(PAGE_STRINGS);
});

Cu.import("resource://gre/modules/Services.jsm");

var prefsChangedObserver = null;


function updateDisplay() {
  document.getElementById('pref-indicateBlockedObjects').checked =
      Prefs.prefs.getBoolPref('indicateBlockedObjects');

  document.getElementById('pref-autoReload').checked =
      Prefs.prefs.getBoolPref('autoReload');

  document.getElementById('pref-privateBrowsingPermanentWhitelisting').checked =
      Prefs.prefs.getBoolPref('privateBrowsingPermanentWhitelisting');

//  if (Prefs.prefs.getBoolPref('defaultPolicy.allow')) {
//    var word = 'allow';
//  } else {
//    var word = 'block';
//  }
//  document.getElementById('defaultpolicyword').innerHTML = word;
}


function onload() {
  updateDisplay();

  document.getElementById('pref-indicateBlockedObjects').addEventListener('change',
      function (event) {
        Prefs.prefs.setBoolPref('indicateBlockedObjects', event.target.checked);
        Services.prefs.savePrefFile(null);
      }
  );

  document.getElementById('pref-autoReload').addEventListener('change',
    function(event) {
      Prefs.prefs.setBoolPref('autoReload', event.target.checked);
      Services.prefs.savePrefFile(null);
    }
  );

  document.getElementById('pref-privateBrowsingPermanentWhitelisting').addEventListener('change',
      function (event) {
        Prefs.prefs.setBoolPref('privateBrowsingPermanentWhitelisting', event.target.checked);
        Services.prefs.savePrefFile(null);
      }
  );

  prefsChangedObserver = new common.PrefsChangedObserver(
      function(subject, topic, data) {
        updateDisplay();
      });
  window.addEventListener("beforeunload", function(event) {
    prefsChangedObserver.unregister();
  });
}
