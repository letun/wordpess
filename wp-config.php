<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
if ( file_exists( dirname( __FILE__ ) . '/wp-config.local.php' ) ) {
	include( dirname( __FILE__ ) . '/wp-config.local.php' );
}
else {
	/** The name of the database for WordPress */
	define('DB_NAME', '');

	/** MySQL database username */
	define('DB_USER', '');

	/** MySQL database password */
	define('DB_PASSWORD', '');

	/** MySQL hostname */
	define('DB_HOST', '');
}

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         ';Wm}lAEw93sFuvf]Iz)_IPSlxv*p5NX3aut2Sw+lK@<ohFXWBU=9T+.AF]uL&Txo');
define('SECURE_AUTH_KEY',  'A:}wY(%x`}-D+,i1@(%wXCfn:5mq1-7X)w2?%PF!2&mba&^%QOYB82GsCH_yNP,u');
define('LOGGED_IN_KEY',    'Ts=Rvw+?;I>vB~(Z6=xh<.dd9U1w=3i!L}_@{{H~K9K3NuItqd)86^)WPCpUwBBz');
define('NONCE_KEY',        '6C{TzG9*XE1i]+Su.xq-_&.J}>:|y89HBr@pRTR;0~GfaEb^;yg>klI8qAxDCgU~');
define('AUTH_SALT',        'A1++zx?.--L=6EK_#2opnmwa9iJF8Qzlg6 `uzciU1>JsMoae*yl;O]bwJlBbwU4');
define('SECURE_AUTH_SALT', 'mhx+o{@M[z-7t?[bS(`6.HE6&xu cuZ}Lm9hx?<M8qr21k>s`GmQm:EkkyC9=-8n');
define('LOGGED_IN_SALT',   '&* }*YEq?.(flF!O}NHc?ImCT?QEJF#|B;6af[4gO:HEmg-tW=PLKge:!u?ag,(y');
define('NONCE_SALT',       'a`Vcn13tPi`n?fG=GE*]hGHEu5J`R!ZXh|^;?4<B(TSGWxjFp4DZc2AY|+ZY$s2-');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

//define ( 'SCRIPT_DEBUG', true);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');

