/**
 * @fileoverview Assistive methods
 * @author  Weich
 */

'use strict';

const fs = require('fs-extra');
const os = require('os');
const path = require('path');
const signale = require('signale');

const Util = {
  /**
   * Get ibaby Directory
   */
  getIbabyPath: function () {
    const ibabyPath = path.join(this.homedir(), '.ibaby');
    if (!fs.existsSync(ibabyPath)) {
      fs.mkdirSync(ibabyPath);
    }
    return ibabyPath;
  },
  /**
   * Get user Directory
   */
  homedir: function () {
    function homedir() {
      const env = process.env;
      const home = env.HOME;
      const user = env.LOGNAME || env.USER || env.LNAME || env.USERNAME;

      if (process.platform === 'win32') {
        return env.USERPROFILE || env.HOMEDRIVE + env.HOMEPATH || home || null;
      }

      if (process.platform === 'darwin') {
        return home || (user ? '/Users/' + user : null);
      }

      if (process.platform === 'linux') {
        return home || (process.getuid() === 0 ? '/root' : (user ? '/home/' + user : null));
      }

      return home || null;
    }
    return typeof os.homedir === 'function' ? os.homedir : homedir;
  } (),
  /**
   * Get root directory
   */
  getRootPath: function () {
    return path.resolve(__dirname, '../../');
  },

  /**
   * Get package.json
   */
  getPkgInfo: function () {
    let info = {};
    try {
      info = JSON.parse(String(fs.readFileSync(path.join(this.getRootPath(), 'package.json'))));
    } catch (e) {
      signale.error('Error reading Package.json');
    }
    return info;
  }
};

module.exports = Util;
