<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit68aaf92ec1490684783bd6709400aad6
{
    public static $prefixLengthsPsr4 = array (
        'T' => 
        array (
            'TijsVerkoyen\\CssToInlineStyles\\' => 31,
        ),
        'S' => 
        array (
            'Symfony\\Component\\CssSelector\\' => 30,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'TijsVerkoyen\\CssToInlineStyles\\' => 
        array (
            0 => __DIR__ . '/..' . '/tijsverkoyen/css-to-inline-styles/src',
        ),
        'Symfony\\Component\\CssSelector\\' => 
        array (
            0 => __DIR__ . '/..' . '/symfony/css-selector',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit68aaf92ec1490684783bd6709400aad6::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit68aaf92ec1490684783bd6709400aad6::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit68aaf92ec1490684783bd6709400aad6::$classMap;

        }, null, ClassLoader::class);
    }
}
