<?php
    namespace Nfq\Akademija\NotTyped;

    class NotTyped
    {
        public function calculateHomeWorkSum(...$numbers):int{
            $sum = 0;
            foreach (func_get_args() as $number) {
                $sum += $number;
            }
            return $sum; 
        }
    }
?>