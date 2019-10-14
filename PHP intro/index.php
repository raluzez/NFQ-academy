<?php
    require 'vendor/autoload.php';
    require 'vendor/codedungeon/php-cli-colors/src/Color.php';

    $root = new Nfq\Akademija\Root();
    $notTyped = new Nfq\Akademija\NotTyped\NotTyped();
    $soft = new Nfq\Akademija\Soft\Soft();
    $strict = new Nfq\Akademija\Strict\Strict();
    $color = new Codedungeon\PHPCliColors\Color();

    $colorReset = $color::RESET;

    try {
        echo $color::GREEN
             .'calculateHomeWorkSum: '
             .$root->calculateHomeWorkSum(3,2.2,'1')
             ."\n".PHP_EOL.$colorReset;
    } catch (\Throwable $e){
        $errorType = strtok($e->__toString(),':');
        echo $color::GREEN
             .'calculateHomeWorkSum: '
             .$errorType
             ."\n".PHP_EOL.$colorReset;
    }
    try {
        echo $color::YELLOW
             .'Nfq\Akademija\NotTyped\calculateHomeWorkSum: '
             .$notTyped->calculateHomeWorkSum(3,2.2,'1')
             ."\n".PHP_EOL.$colorReset;
    } catch (\Throwable $e){
        $errorType = strtok($e->__toString(),':');
        echo $color::YELLOW
             .'Nfq\Akademija\NotTyped\calculateHomeWorkSum: '
             .$errorType
             ."\n".PHP_EOL.$colorReset;
    }
    try {
        echo $color::CYAN
             .'Nfq\Akademija\Soft\calculateHomeWorkSum: '
             .$soft->calculateHomeWorkSum(3,2.2,'1')
             ."\n".PHP_EOL.$colorReset;
    } catch (\Throwable $e){
        $errorType = strtok($e->__toString(),':');
        echo $color::CYAN
             .'Nfq\Akademija\Soft\calculateHomeWorkSum: '
             .$errorType."\n"
             .PHP_EOL.$colorReset;
    }
    try {
        echo $color::RED.'Nfq\Akademija\Strict\calculateHomeWorkSum: '
             .$strict->calculateHomeWorkSum(3,2.2,'1')
             ."\n".PHP_EOL.$colorReset;
    } catch (\Throwable $e){
        $errorType = strtok($e->__toString(),':');
        echo $color::RED
             .'Nfq\Akademija\Strict\calculateHomeWorkSum: '
             .$errorType
             ."\n".PHP_EOL.$colorReset;
    }
?>