<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit48dfd6c9e2766af22e41deeff191cb00
{
    public static $classMap = array (
        'Base' => __DIR__ . '/../..' . '/Classes/Base.php',
        'DB_Helper' => __DIR__ . '/../..' . '/Classes/DB_Helper.php',
        'Task' => __DIR__ . '/../..' . '/Classes/Task.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->classMap = ComposerStaticInit48dfd6c9e2766af22e41deeff191cb00::$classMap;

        }, null, ClassLoader::class);
    }
}
