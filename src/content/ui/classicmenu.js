/*
 * ***** BEGIN LICENSE BLOCK *****
 *
 * RequestPolicy - A Firefox extension for control over cross-site requests.
 * Copyright (c) 2008-2012 Justin Samuel
 * Copyright (c) 2014 Martin Kimmerle
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option) any later
 * version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
 * details.
 *
 * You should have received a copy of the GNU General Public License along with
 * this program. If not, see <http://www.gnu.org/licenses/>.
 *
 * ***** END LICENSE BLOCK *****
 */

// if (!rp) {
//   var rp = {mod : {}};
// }
//
// Components.utils.import("chrome://requestpolicy/content/lib/domain-util.jsm", rp.mod);
// Components.utils.import("chrome://requestpolicy/content/lib/logger.jsm", rp.mod);
// Components.utils.import("chrome://requestpolicy/content/lib/ruleset.jsm", rp.mod);
// Components.utils.import("chrome://requestpolicy/content/lib/request-util.jsm", rp.mod);
// Components.utils.import("chrome://requestpolicy/content/lib/policy-manager.jsm",
//     rp.mod);

requestpolicy.classicmenu = {

  /**
  * Reloads the current document if the user's preferences indicate it should
  * be reloaded.
  */
  _conditionallyReloadDocument : function() {
    if (requestpolicy.overlay._rpService.prefs.getBoolPref("autoReload")) {
      content.document.location.reload(false);
    }
  },


  addMenuSeparator : function(menu) {
    var separator = document.createElement("menuseparator");
    menu.insertBefore(separator, menu.firstChild);
    return separator;
  },

  addMenuItem : function(menu, label, oncommand) {
    var menuItem = document.createElement("menuitem");
    menuItem.setAttribute("label", label);
    oncommand = oncommand +
        " requestpolicy.classicmenu._conditionallyReloadDocument();";
    menuItem.setAttribute("oncommand", oncommand);
    // menuItem.setAttribute("tooltiptext", node.getAttribute("tooltiptext"));
    menu.insertBefore(menuItem, menu.firstChild);
    return menuItem;
  },


  addMenuItemTemporarilyAllowOrigin : function(menu, originHost) {
    var label = requestpolicy.menu._strbundle.
        getFormattedString("allowOriginTemporarily", [originHost]);
    var command = "requestpolicy.overlay.temporarilyAllowOrigin('"
        + requestpolicy.menu._sanitizeJsFunctionArg(originHost) + "');";
    var item = this.addMenuItem(menu, label, command);
    item.setAttribute("class", "requestpolicyTemporary");
    return item;
  },

  addMenuItemAllowOrigin : function(menu, originHost) {
    var label = requestpolicy.menu._strbundle.
        getFormattedString("allowOrigin", [originHost]);
    var command = "requestpolicy.overlay.allowOrigin('"
        + requestpolicy.menu._sanitizeJsFunctionArg(originHost) + "');";
    return this.addMenuItem(menu, label, command);
  },


  addMenuItemTemporarilyAllowOriginToDest : function(menu, originHost,
                                                     destHost) {
    var label = requestpolicy.menu._strbundle.getFormattedString(
        "allowOriginToDestinationTemporarily", [originHost, destHost]);
    var command = "requestpolicy.overlay.temporarilyAllowOriginToDestination('"
        + requestpolicy.menu._sanitizeJsFunctionArg(originHost) + "', '"
        + requestpolicy.menu._sanitizeJsFunctionArg(destHost) + "');";
    var item = this.addMenuItem(menu, label, command);
    item.setAttribute("class", "requestpolicyTemporary");
    return item;
  },

  addMenuItemAllowOriginToDest : function(menu, originHost, destHost) {
    var label = requestpolicy.menu._strbundle.getFormattedString(
        "allowOriginToDestination", [originHost, destHost]);
    var command = "requestpolicy.overlay.allowOriginToDestination('"
        + requestpolicy.menu._sanitizeJsFunctionArg(originHost) + "', '"
        + requestpolicy.menu._sanitizeJsFunctionArg(destHost) + "');";
    var item = this.addMenuItem(menu, label, command);
    item.setAttribute("class", "requestpolicyAllowOriginToDest");
    return item;
  },


  addMenuItemTemporarilyAllowDest : function(menu, destHost) {
    var label = requestpolicy.menu._strbundle.
        getFormattedString("allowDestinationTemporarily", [destHost]);
    var command = "requestpolicy.overlay.temporarilyAllowDestination('"
        + requestpolicy.menu._sanitizeJsFunctionArg(destHost) + "');";
    var item = this.addMenuItem(menu, label, command);
    item.setAttribute("class", "requestpolicyTemporary");
    return item;
  },

  addMenuItemAllowDest : function(menu, destHost) {
    var label = requestpolicy.menu._strbundle.
        getFormattedString("allowDestination", [destHost]);
    var command = "requestpolicy.overlay.allowDestination('"
        + requestpolicy.menu._sanitizeJsFunctionArg(destHost) + "');";
    return this.addMenuItem(menu, label, command);
  }

}
