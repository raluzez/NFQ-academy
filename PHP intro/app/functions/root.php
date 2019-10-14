<?php
    namespace Nfq\Akademija;

    class Root
    {
        public function calculateHomeWorkSum(...$numbers){
            $sum = 0;
            foreach (func_get_args() as $number) {
                $sum += $number;
            }
            return $sum; 
        }
    }
?>    
