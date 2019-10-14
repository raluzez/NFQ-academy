<?php
    namespace Nfq\Akademija\Soft;

    class Soft
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