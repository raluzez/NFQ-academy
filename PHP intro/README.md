## PHP intro namų darbas

- [x] Namų darbo projektas sukurtas naudojant composer
- [x] Pridėta spalvota konsolės išvestis
- [x] Sukurtos 4 funkcijos tokiu pat pavadinimu, tačiau skirtingais namespace
- [x] Kviečiant funkcijas gaudomi error ir exeptions
- [x] Kiekviena funkcija konsolėje išspausdinama pridedant jai atitinkanti namespace

## Funkcijų paaiškinimai

1. Naudojant pirmąją funkciją, kur argumentams nėra taikomi apribojimai gautas atsakymas 6.2. Duodami argumentai yra integer, float ir string. Php integer sudeda su float ir rezultatas tampa float, prie to prideda iš string į integer paversta string ir vėl gauna float, kurį ir išspausdina.
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
    
    output
    // integer (1st arrg)
    // double (2nd arrg)
    // string (3rd arrg)
    // double (sum)
    
    // fuction return double
  ```
2. Naudojant antrąją funkcija notTyped kur prašoma, jog funkcija gražintų :int viskas vyksta taip pat, tik prieš išspausdinant funkcija gražinamą kintamajį pakeičia is float į integer, todėl išspausdinama 6.
    
    ```php
    function calculateHomeWorkSum(...$numbers):int{
        $sum = 0;
        foreach (func_get_args() as $number) {
            echo gettype($number);
            $sum += $number;
        }
        echo gettype($sum);
        return $sum; 
    }
    calculateHomeWorkSum(3,2.2,'1');
    
    output
    // integer (1st arrg)
    // double (2nd arrg)
    // string (3rd arrg)
    // double (sum)
    
    // fuction return integer
    ```
  
3. Naudojant soft funkcija yra sąlyga, kad funkcija dirba tik su int. Tai reiškia, kad nors ir gauna integer, float ir string, prieš pradedant veiksmus php visus argumentus paverčia į integer. Taip pat yra ir :int funkcijos gražinimo sąlyga, tačiau atlikus veiksmus su integer nieko nebereikia keisti. Išspausdinama 6.

    ```php
    function calculateHomeWorkSum(int...$numbers):int{
        $sum = 0;
        foreach (func_get_args() as $number) {
            echo gettype($number);
            $sum += $number;
        }
        echo gettype($sum);
        return $sum; 
    }
    calculateHomeWorkSum(3,2.2,'1');
    
    output
    // integer (1st arrg)
    // integer (2nd arrg)
    // integer (3rd arrg)
    // integer (sum)
    
    // fuction return integer
    ```
  
4. Naudojant declare(strict_types=1) sąlyga strict funcijos faile atliekami tie pat veiksmai kaip ir soft funkcijos atveju ir gaunama 6, tačiau jei naudojamos antrosios funkcijos sąlygos, kur dirbama su integer, string ir float, atlikus skaičiavimus nebegalime rezultato pakeisti į integer.
    ```php
    function calculateHomeWorkSum(...$numbers):int{
        $sum = 0;
        foreach (func_get_args() as $number) {
            echo gettype($number);
            $sum += $number;
        }
        echo gettype($sum);
        return $sum; 
    }
    calculateHomeWorkSum(3,2.2,'1');
    
    output
    // integer (1st arrg)
    // double (2nd arrg)
    // string (3rd arrg)
    // double (sum)
    
    // fuction return TypeError
  ```


