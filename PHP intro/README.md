## PHP intro namų darbas

- [x] Namų darbo projektas sukurtas naudojant composer
- [x] Pridėta spalvota konsolės išvestis
- [x] Sukurtos 4 funkcijos tokiu pat pavadinimu, tačiau skirtingais namespace
- [x] Kviečiant funkcijas gaudomi error ir exeptions
- [x] Kiekviena funkcija konsolėje išspausdinama pridedant jai atitinkanti namespace

## Funkcijų paaiškinimai

1. Naudojant pirmąją funkcija, kur argumentams nėra taikomi apribojimai gautas atsakymas 6.2. 
  - Duodami argumentai yra integer, float ir string. Php integer sudeda su float ir rezultatas tampa float, prie to prideda iš string į integer paverstą string ir vėl gauną float, kurį ir išspausdina.
  ```php
    function calculateHomeWorkSum(...$numbers){
        $sum = 0;
        foreach (func_get_args() as $number) {
            echo gettype($number);
            $sum += $number;
        }
        echo gettype($sum);
        return $sum; 
    }
    calculateHomeWorkSum(3,2.2,'1');
    echo gettype(calculateHomeWorkSum(3,2.2,'1'));
    
    output
    // integer (1st arrg)
    // double (2nd arrg)
    // string (3rd arrg)
    // double (sum)
    
    function return gettype()
    // double
  ```
