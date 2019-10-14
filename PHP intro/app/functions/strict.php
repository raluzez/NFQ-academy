<?php 
    declare(strict_types=1);
    namespace Nfq\Akademija\Strict;

    class Strict
    {
        public function calculateHomeWorkSum(int...$numbers):int{
            $sum = 0;
            foreach (func_get_args() as $number) {
                $sum += $number;
            }
            return $sum; 
        }
    }
?>